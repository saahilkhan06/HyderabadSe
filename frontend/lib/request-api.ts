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
  const response = await fetch(
    `${API_URL}/api/product-requests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const data = (await response.json().catch(() => ({}))) as {
    referenceId?: string;
    message?: string;
    error?: string;
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