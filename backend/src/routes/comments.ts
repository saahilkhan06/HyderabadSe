import type {
  FastifyInstance,
  FastifyRequest,
} from "fastify";

import type { ServerResponse } from "node:http";

import { CommentModel } from "../models/CommentModel.ts";
import { sendCommentNotificationEmail } from "../email.js";

type CreateCommentBody = {
  name?: string;
  comment?: string;
  website?: string;
};

type SSEClient = {
  response: ServerResponse;
};

const clients = new Set<SSEClient>();

const rateLimitMap = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

function getClientIp(request: FastifyRequest): string {
  const forwarded =
    request.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  if (Array.isArray(forwarded)) {
    return forwarded[0]?.trim() || "unknown";
  }

  return request.ip || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  const existing = rateLimitMap.get(ip);

  if (!existing || now > existing.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + 10 * 60 * 1000,
    });

    return true;
  }

  if (existing.count >= 5) {
    return false;
  }

  existing.count += 1;

  return true;
}

function broadcastComment(comment: {
  _id: unknown;
  name: string;
  comment: string;
  createdAt: Date;
}) {
  const payload =
    `data: ${JSON.stringify({
      _id: String(comment._id),
      name: comment.name,
      comment: comment.comment,
      createdAt: comment.createdAt,
    })}\n\n`;

  for (const client of clients) {
    try {
      client.response.write(payload);
    } catch {
      clients.delete(client);
    }
  }
}

export default async function commentsRoutes(
  fastify: FastifyInstance,
) {
  /*
   * GET COMMENTS
   */
  fastify.get(
    "/api/comments",
    async (_request, reply) => {
      try {
        const comments =
          await CommentModel.find()
            .sort({ createdAt: -1 })
            .limit(50)
            .lean();

        return reply.send(comments);
      } catch (error) {
        fastify.log.error(
          error,
          "Unable to load comments",
        );

        return reply.code(500).send({
          message: "Unable to load comments.",
        });
      }
    },
  );

  /*
   * CREATE COMMENT
   */
  fastify.post<{ Body: CreateCommentBody }>(
    "/api/comments",
    async (request, reply) => {
      try {
        const body = request.body ?? {};

        const name =
          typeof body.name === "string"
            ? body.name.trim()
            : "";

        const comment =
          typeof body.comment === "string"
            ? body.comment.trim()
            : "";

        const website =
          typeof body.website === "string"
            ? body.website.trim()
            : "";

        /*
         * Honeypot spam protection
         */
        if (website) {
          return reply.code(400).send({
            message: "Invalid submission.",
          });
        }

        /*
         * Name validation
         */
        if (name.length < 2) {
          return reply.code(400).send({
            message: "Please enter your name.",
          });
        }

        if (name.length > 60) {
          return reply.code(400).send({
            message: "Name is too long.",
          });
        }

        /*
         * Comment validation
         */
        if (comment.length < 2) {
          return reply.code(400).send({
            message: "Please enter a comment.",
          });
        }

        if (comment.length > 500) {
          return reply.code(400).send({
            message:
              "Comment must be 500 characters or less.",
          });
        }

        /*
         * Rate limiting
         */
        const ip = getClientIp(request);

        if (!checkRateLimit(ip)) {
          return reply.code(429).send({
            message:
              "Too many comments from this connection. Please try again later.",
          });
        }

        /*
         * Save to MongoDB
         */
        const savedComment =
          await CommentModel.create({
            name,
            comment,
          });

        const publicComment = {
          _id: savedComment._id,
          name: savedComment.name,
          comment: savedComment.comment,
          createdAt: savedComment.createdAt,
        };

        /*
         * Broadcast immediately to connected visitors
         */
        broadcastComment(publicComment);

        /*
         * Send email notification.
         *
         * Do NOT make the visitor wait for email delivery.
         */
        void sendCommentNotificationEmail({
          name: savedComment.name,
          comment: savedComment.comment,
          createdAt: savedComment.createdAt,
        }).catch((error) => {
          fastify.log.error(
            error,
            "Comment notification email failed",
          );
        });

        return reply.code(201).send({
          message: "Comment posted successfully.",
          comment: publicComment,
        });
      } catch (error) {
        fastify.log.error(
          error,
          "Unable to post comment",
        );

        return reply.code(500).send({
          message: "Unable to post comment.",
        });
      }
    },
  );

  /*
   * SERVER-SENT EVENTS
   */
  fastify.get(
    "/api/comments/stream",
    async (request, reply) => {
      /*
       * We take over the raw HTTP response because
       * SSE is a long-lived connection.
       */
      reply.hijack();

      const response: ServerResponse =
        reply.raw;

      response.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control":
          "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
        "Access-Control-Allow-Origin":
          process.env.CORS_ORIGIN || "*",
      });

      /*
       * Tell the browser that the SSE connection
       * has successfully opened.
       */
      response.write(
        "event: connected\ndata: connected\n\n",
      );

      const client: SSEClient = {
        response,
      };

      clients.add(client);

      /*
       * Keep the connection alive.
       */
      const heartbeat = setInterval(() => {
        try {
          response.write(": heartbeat\n\n");
        } catch {
          clearInterval(heartbeat);
          clients.delete(client);
        }
      }, 25000);

      /*
       * Remove disconnected visitors.
       */
      request.raw.on("close", () => {
        clearInterval(heartbeat);

        clients.delete(client);

        try {
          response.end();
        } catch {
          // Connection already closed.
        }
      });
    },
  );
}