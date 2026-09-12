import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { resolveCheckoutRequest } from "../lib/checkout.ts";

afterEach(() => {
  delete process.env.STRIPE_PRICE_OPERATOR_TEMPLATE;
  delete process.env.STRIPE_PRICE_OPERATOR_INSTALL;
  delete process.env.STRIPE_PRICE_EVERYDAY_TEMPLATE;
  delete process.env.STRIPE_PRICE_EVERYDAY_INSTALL;
});

describe("resolveCheckoutRequest", () => {
  it("rejects non-object bodies", () => {
    assert.deepEqual(resolveCheckoutRequest(null), {
      status: 400,
      error: "Invalid JSON",
    });
    assert.deepEqual(resolveCheckoutRequest("operator_template"), {
      status: 400,
      error: "Invalid JSON",
    });
  });

  it("rejects unknown SKUs", () => {
    assert.deepEqual(resolveCheckoutRequest({ sku: "not_a_sku" }), {
      status: 400,
      error: "Unknown SKU",
    });
    assert.deepEqual(resolveCheckoutRequest({}), {
      status: 400,
      error: "Unknown SKU",
    });
  });

  it("fails closed when price env is missing", () => {
    assert.deepEqual(resolveCheckoutRequest({ sku: "operator_template" }), {
      status: 500,
      error: "Price is not configured for this SKU",
    });
  });

  it("resolves sku + priceId when configured", () => {
    process.env.STRIPE_PRICE_OPERATOR_TEMPLATE = "price_test_operator_template";
    assert.deepEqual(resolveCheckoutRequest({ sku: "operator_template" }), {
      sku: "operator_template",
      priceId: "price_test_operator_template",
    });
  });
});
