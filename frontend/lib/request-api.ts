import type { ProductRequestPayload } from "@/components/RequestForm";

export type ProductRequestResult = {
  requestId: string;
  message?: string;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
).replace(/\/$/, "");

export async function submitProductRequest(
  payload: ProductRequestPayload,
): Promise<ProductRequestResult> {
  const cleanPayload = {
    // Required fields
    name: payload.name.trim(),
    email: payload.email.trim(),
    whatsapp: payload.whatsapp.trim(),
    destinationCountry: payload.destinationCountry.trim(),
    productName: payload.productName.trim(),

    // Optional fields
    ...(payload.destinationCity?.trim()
      ? { destinationCity: payload.destinationCity.trim() }
      : {}),

    ...(payload.preferredBrand?.trim()
      ? { preferredBrand: payload.preferredBrand.trim() }
      : {}),

    ...(payload.productUrl?.trim()
      ? { productUrl: payload.productUrl.trim() }
      : {}),

    ...(payload.quantity?.trim()
      ? { quantity: payload.quantity.trim() }
      : {}),

    ...(payload.budget?.trim()
      ? { budget: payload.budget.trim() }
      : {}),

    ...(payload.shippingPreference
      ? { shippingPreference: payload.shippingPreference }
      : {}),

    ...(payload.desiredDeliveryDate?.trim()
      ? { desiredDeliveryDate: payload.desiredDeliveryDate.trim() }
      : {}),

    ...(payload.notes?.trim()
      ? { notes: payload.notes.trim() }
      : {}),

    // Consent
    consent: payload.consent,

    // Source
    ...(payload.source ? { source: payload.source } : {}),
  };

  const response = await fetch(`${API_URL}/api/product-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cleanPayload),
  });

  const data = (await response.json().catch(() => ({}))) as {
    referenceId?: string;
    message?: string;
    error?: string;
    details?: unknown;
  };

  if (!response.ok) {
  throw new Error(
    data.message ||
      data.error ||
      "We could not submit your request. Please try again.",
  );
}

  if (!data.referenceId) {
    throw new Error(
      "The request was received but no reference number was returned.",
    );
  }

  return {
    requestId: data.referenceId,
    message: data.message,
  };
}