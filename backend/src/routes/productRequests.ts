import type { FastifyInstance, FastifyRequest } from 'fastify';
import {
  createProductRequest,
  getProductRequest,
  listProductRequests,
  updateProductRequestStatus,
} from '../repository.js';
import {
  createProductRequestSchema,
  statusUpdateSchema,
} from '../validation.js';
import { config } from '../config.js';
import {
  sendNewProductRequestEmail,
  sendCustomerRequestConfirmationEmail,
} from '../email.js';

function isAdmin(request: FastifyRequest): boolean {
  const supplied = request.headers['x-admin-api-key'];
  return typeof supplied === 'string' && supplied === config.ADMIN_API_KEY;
}

export async function registerProductRequestRoutes(app: FastifyInstance) {
  app.post('/api/product-requests', async (request, reply) => {
    const parsed = createProductRequestSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        error: 'VALIDATION_ERROR',
        message: 'Please check the request details and try again.',
        details: parsed.error.flatten(),
      });
    }

    try {
      // 1. Save the request to MongoDB
      const created = await createProductRequest(parsed.data);

      // 2. Prepare the data for the emails
      const emailData = {
        referenceId: created.referenceId,
        ...parsed.data,
      };

      // 3. Send email notifications
      // Email failure will NOT cause the request itself to fail.
      try {
        await Promise.all([
          sendNewProductRequestEmail(emailData),
          sendCustomerRequestConfirmationEmail(emailData),
        ]);
      } catch (emailError) {
        request.log.error(
          emailError,
          'Product request was saved, but email notification failed.',
        );
      }

      // 4. Tell the frontend the request was successfully created
      return reply.code(201).send({
        success: true,
        referenceId: created.referenceId,
        message:
          'Request received. We will review the details and contact you with the next step.',
      });
    } catch (error) {
      request.log.error(error);

      return reply.code(500).send({
        error: 'REQUEST_CREATE_FAILED',
        message: 'We could not save your request. Please try again.',
      });
    }
  });

  app.get('/api/product-requests/:referenceId', async (request, reply) => {
    const { referenceId } = request.params as { referenceId: string };

    const result = await getProductRequest(referenceId);

    if (!result) {
      return reply.code(404).send({
        error: 'NOT_FOUND',
      });
    }

    return reply.send(result);
  });

  app.get('/api/admin/product-requests', async (request, reply) => {
    if (!isAdmin(request)) {
      return reply.code(401).send({
        error: 'UNAUTHORIZED',
      });
    }

    const query = request.query as { status?: string };

    const result = await listProductRequests(query.status as never);

    return reply.send({
      requests: result,
    });
  });

  app.patch(
    '/api/admin/product-requests/:referenceId/status',
    async (request, reply) => {
      if (!isAdmin(request)) {
        return reply.code(401).send({
          error: 'UNAUTHORIZED',
        });
      }

      const { referenceId } = request.params as {
        referenceId: string;
      };

      const parsed = statusUpdateSchema.safeParse(request.body);

      if (!parsed.success) {
        return reply.code(400).send({
          error: 'VALIDATION_ERROR',
          details: parsed.error.flatten(),
        });
      }

      const updated = await updateProductRequestStatus(
        referenceId,
        parsed.data.status,
        parsed.data.note,
      );

      if (!updated) {
        return reply.code(404).send({
          error: 'NOT_FOUND',
        });
      }

      return reply.send({
        success: true,
        request: updated,
      });
    },
  );
}
