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

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export type AdminProductRequest = {
  _id: string;
  referenceId: string;

  customer: {
    name: string;
    email: string;
    whatsapp: string;
  };

  destination: {
    country: string;
    city?: string;
  };

  product: {
    name: string;
    preferredBrand?: string;
    productUrl?: string;
    quantity?: string;
  };

  budget?: string;
  shippingPreference?: 'economy' | 'express' | 'not_sure';
  desiredDeliveryDate?: string;
  notes?: string;
  consent?: boolean;

  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
).replace(/\/$/, '');

export async function getAdminRequests(
  apiKey: string,
  status?: RequestStatus,
) {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';

  const response = await fetch(
    `${API_URL}/api/admin/product-requests${query}`,
    {
      headers: {
        'x-admin-api-key': apiKey,
      },
      cache: 'no-store',
    },
  );

  const data = (await response.json().catch(() => ({}))) as {
    requests?: AdminProductRequest[];
    error?: string;
  };

  if (!response.ok) {
    throw new Error(data.error || 'Could not load requests.');
  }

  return data.requests ?? [];
}

export async function updateAdminRequestStatus(
  apiKey: string,
  referenceId: string,
  status: RequestStatus,
  note?: string,
) {
  const response = await fetch(
    `${API_URL}/api/admin/product-requests/${encodeURIComponent(
      referenceId,
    )}/status`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-api-key': apiKey,
      },
      body: JSON.stringify({
        status,
        note: note?.trim() || undefined,
      }),
    },
  );

  const data = (await response.json().catch(() => ({}))) as {
    request?: AdminProductRequest;
    error?: string;
  };

  if (!response.ok) {
    throw new Error(data.error || 'Could not update request.');
  }

  return data.request;
}