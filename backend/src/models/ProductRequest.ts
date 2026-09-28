import { Schema, model, type InferSchemaType } from 'mongoose';

export const REQUEST_STATUSES = [
  'request_received',
  'under_review',
  'quote_ready',
  'confirmed',
  'sourcing',
  'packed',
  'shipped',
  'delivered',
  'cancelled',
  'unavailable',
] as const;

const ProductRequestSchema = new Schema(
  {
    referenceId: { type: String, required: true, unique: true, index: true },

    customer: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      whatsapp: { type: String, required: true, trim: true },
    },

    destination: {
      country: { type: String, required: true, trim: true },
      city: { type: String, trim: true },
    },

    product: {
      name: { type: String, required: true, trim: true },
      preferredBrand: { type: String, trim: true },
      productUrl: { type: String, trim: true },
      quantity: { type: String, trim: true },
    },

    budget: { type: String, trim: true },

    shippingPreference: {
      type: String,
      enum: ['economy', 'express', 'not_sure'],
    },

    desiredDeliveryDate: { type: String, trim: true },

    notes: { type: String, trim: true },

    consent: { type: Boolean, required: true },

    source: {
      type: String,
      enum: ['form', 'voice'],
      default: 'form',
      index: true,
    },

    status: {
      type: String,
      enum: REQUEST_STATUSES,
      default: 'request_received',
      index: true,
    },
  },
  { timestamps: true, collection: 'product_requests' },
);

ProductRequestSchema.index({ 'customer.email': 1, createdAt: -1 });
ProductRequestSchema.index({ status: 1, createdAt: -1 });
ProductRequestSchema.index({ source: 1, createdAt: -1 });

export type ProductRequest = InferSchemaType<typeof ProductRequestSchema>;
export const ProductRequestModel = model(
  'ProductRequest',
  ProductRequestSchema,
);
