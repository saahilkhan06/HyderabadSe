import type { FastifyInstance } from "fastify";
import { z } from "zod";

import { VoiceEnquiryModel } from "../models/VoiceEnquiry.js";

import {
  sendNewVoiceEnquiryEmail,
  sendCustomerVoiceEnquiryConfirmationEmail,
} from "../email.js";

const createVoiceEnquirySchema = z.object({
  transcript: z.string().trim().min(1).max(5000),
  email: z.string().trim().email(),
  source: z.literal("voice").optional(),
});

export async function registerVoiceEnquiryRoutes(
  app: FastifyInstance,
) {
  app.post(
    "/api/voice-enquiries",
    async (request, reply) => {
      const parsed =
        createVoiceEnquirySchema.safeParse(
          request.body,
        );

      if (!parsed.success) {
        return reply.code(400).send({
          success: false,
          message: "Invalid voice enquiry.",
          errors: parsed.error.flatten(),
        });
      }

      try {
        const enquiry =
          await VoiceEnquiryModel.create({
            transcript: parsed.data.transcript,
            email: parsed.data.email,
            source: "voice",
          });

        const referenceId = String(enquiry._id);

        // Send enquiry to HyderabadSe / admin
        await sendNewVoiceEnquiryEmail({
          referenceId,
          transcript: parsed.data.transcript,
        });

        // Send confirmation to customer
        await sendCustomerVoiceEnquiryConfirmationEmail({
          referenceId,
          transcript: parsed.data.transcript,
          email: parsed.data.email,
        });

        return reply.code(201).send({
          success: true,
          referenceId,
          message: "Your enquiry has been sent.",
        });
      } catch (error) {
        request.log.error(error);

        return reply.code(500).send({
          success: false,
          message:
            "Unable to save or send your voice enquiry.",
        });
      }
    },
  );
}