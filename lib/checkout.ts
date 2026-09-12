import { isSku, priceIdForSku, type Sku } from "./skus";

export type CheckoutRequestError =
  | { status: 400; error: "Invalid JSON" }
  | { status: 400; error: "Unknown SKU" }
  | { status: 500; error: "Price is not configured for this SKU" };

export type CheckoutRequestOk = { sku: Sku; priceId: string };

/**
 * Pure validation for POST /api/checkout. Separated so unit tests can prove
 * fail-closed behavior without Stripe or the Next runtime.
 */
export function resolveCheckoutRequest(
  body: unknown,
): CheckoutRequestOk | CheckoutRequestError {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { status: 400, error: "Invalid JSON" };
  }

  const skuValue = (body as { sku?: unknown }).sku;
  if (typeof skuValue !== "string" || !isSku(skuValue)) {
    return { status: 400, error: "Unknown SKU" };
  }

  const priceId = priceIdForSku(skuValue);
  if (!priceId) {
    return { status: 500, error: "Price is not configured for this SKU" };
  }

  return { sku: skuValue, priceId };
}
