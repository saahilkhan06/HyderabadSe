import { Schema, model, type InferSchemaType } from "mongoose";

const VoiceEnquirySchema = new Schema(
  {
    transcript: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      enum: ["voice"],
      default: "voice",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "voice_enquiries",
  },
);

export type VoiceEnquiry = InferSchemaType<
  typeof VoiceEnquirySchema
>;

export const VoiceEnquiryModel = model(
  "VoiceEnquiry",
  VoiceEnquirySchema,
);