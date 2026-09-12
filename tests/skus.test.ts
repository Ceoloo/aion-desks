import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import {
  PAYMENT_LINKS,
  SKUS,
  isSku,
  packForSku,
  priceIdForSku,
  type Sku,
} from "../lib/skus.ts";

const PRICE_ENV_KEYS = [
  "STRIPE_PRICE_OPERATOR_TEMPLATE",
  "STRIPE_PRICE_OPERATOR_INSTALL",
  "STRIPE_PRICE_EVERYDAY_TEMPLATE",
  "STRIPE_PRICE_EVERYDAY_INSTALL",
] as const;

afterEach(() => {
  for (const key of PRICE_ENV_KEYS) {
    delete process.env[key];
  }
});

describe("isSku", () => {
  it("accepts the four one-time SKUs", () => {
    for (const sku of SKUS) {
      assert.equal(isSku(sku), true);
    }
  });

  it("rejects unknown values", () => {
    assert.equal(isSku("operator_monthly"), false);
    assert.equal(isSku(""), false);
    assert.equal(isSku("OPERATOR_TEMPLATE"), false);
  });
});

describe("PAYMENT_LINKS", () => {
  it("maps every SKU to an https Stripe payment link", () => {
    for (const sku of SKUS) {
      assert.match(PAYMENT_LINKS[sku], /^https:\/\/buy\.stripe\.com\//);
    }
  });
});

describe("packForSku", () => {
  it("returns a zip href and download label for each SKU", () => {
    for (const sku of SKUS) {
      const pack = packForSku(sku);
      assert.match(pack.href, /^\/packs\/.+\.zip$/);
      assert.match(pack.label, /^Download /);
    }
  });
});

describe("priceIdForSku", () => {
  const cases: Array<{ sku: Sku; env: (typeof PRICE_ENV_KEYS)[number] }> = [
    { sku: "operator_template", env: "STRIPE_PRICE_OPERATOR_TEMPLATE" },
    { sku: "operator_install", env: "STRIPE_PRICE_OPERATOR_INSTALL" },
    { sku: "everyday_template", env: "STRIPE_PRICE_EVERYDAY_TEMPLATE" },
    { sku: "everyday_install", env: "STRIPE_PRICE_EVERYDAY_INSTALL" },
  ];

  it("returns undefined when the price env var is missing", () => {
    for (const { sku } of cases) {
      assert.equal(priceIdForSku(sku), undefined);
    }
  });

  it("returns undefined for blank price env values (fail closed)", () => {
    process.env.STRIPE_PRICE_OPERATOR_TEMPLATE = "   ";
    assert.equal(priceIdForSku("operator_template"), undefined);
  });

  it("reads trimmed Price IDs from the documented env vars", () => {
    for (const { sku, env } of cases) {
      process.env[env] = `  price_${sku}  `;
      assert.equal(priceIdForSku(sku), `price_${sku}`);
    }
  });
});
