import { z } from 'zod';

export const createProductRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  whatsapp: z.string().trim().min(7).max(30),
  destinationCountry: z.string().trim().min(2).max(80),
  destinationCity: z.string().trim().min(2).max(100),
  productName: z.string().trim().min(2).max(200),
  preferredBrand: z.string().trim().max(120).optional(),
  productUrl: z.string().trim().url().max(1000).optional(),
  quantity: z.string().trim().min(1).max(100),
  budget: z.string().trim().max(100).optional(),
  shippingPreference: z.enum(['economy', 'express', 'not_sure']),
  desiredDeliveryDate: z.string().trim().max(30).optional(),
  notes: z.string().trim().max(2000).optional(),
  consent: z.literal(true),

  source: z.enum(['form', 'voice']).default('form'),
});
export const statusUpdateSchema = z.object({
  status: z.enum([
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
  ]),
  note: z.string().trim().max(1000).optional(),
});

export type CreateProductRequest = z.infer<typeof createProductRequestSchema>;
