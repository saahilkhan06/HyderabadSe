import {
  ProductRequestModel,
  type ProductRequest,
} from './models/ProductRequest.js';
import { RequestStatusHistoryModel } from './models/RequestStatusHistory.js';
import { QuoteModel } from './models/Quote.js';
import type { CreateProductRequest } from './validation.js';

function generateReferenceId(): string {
  const year = new Date().getUTCFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `GH-${year}-${random}`;
}

async function uniqueReferenceId(): Promise<string> {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const referenceId = generateReferenceId();
    const exists = await ProductRequestModel.exists({ referenceId });
    if (!exists) return referenceId;
  }
  throw new Error('Could not generate a unique request reference');
}

export async function createProductRequest(input: CreateProductRequest) {
  const referenceId = await uniqueReferenceId();

  const request = await ProductRequestModel.create({
    referenceId,

    customer: {
      name: input.name,
      email: input.email,
      whatsapp: input.whatsapp,
    },

    destination: {
      country: input.destinationCountry,
      ...(input.destinationCity ? { city: input.destinationCity } : {}),
    },

    product: {
      name: input.productName,

      ...(input.preferredBrand ? { preferredBrand: input.preferredBrand } : {}),

      ...(input.productUrl ? { productUrl: input.productUrl } : {}),

      ...(input.quantity ? { quantity: input.quantity } : {}),
    },

    ...(input.budget ? { budget: input.budget } : {}),

    ...(input.shippingPreference
      ? { shippingPreference: input.shippingPreference }
      : {}),

    ...(input.desiredDeliveryDate
      ? { desiredDeliveryDate: input.desiredDeliveryDate }
      : {}),

    ...(input.notes ? { notes: input.notes } : {}),

    consent: input.consent,
    source: input.source,
    status: 'request_received',
  });

  await RequestStatusHistoryModel.create({
    referenceId,
    toStatus: 'request_received',
    note: 'Request created',
    changedBy: 'system',
  });

  return request;
}
export async function getProductRequest(referenceId: string) {
  const request = await ProductRequestModel.findOne({ referenceId }).lean();
  if (!request) return null;

  const [history, quote] = await Promise.all([
    RequestStatusHistoryModel.find({ referenceId })
      .sort({ createdAt: 1 })
      .lean(),
    QuoteModel.findOne({ referenceId }).lean(),
  ]);

  return { request, history, quote };
}

export async function listProductRequests(status?: ProductRequest['status']) {
  const filter = status ? { status } : {};
  return ProductRequestModel.find(filter)
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();
}

export async function updateProductRequestStatus(
  referenceId: string,
  status: ProductRequest['status'],
  note?: string,
) {
  const request = await ProductRequestModel.findOne({ referenceId });
  if (!request) return null;

  const fromStatus = request.status;
  request.status = status;
  await request.save();

  await RequestStatusHistoryModel.create({
    referenceId,
    fromStatus,
    toStatus: status,
    note,
    changedBy: 'admin',
  });

  return request.toObject();
}
