export const SKUS = [
  "operator_template",
  "operator_install",
  "everyday_template",
  "everyday_install",
] as const;

export type Sku = (typeof SKUS)[number];

export function isSku(value: string): value is Sku {
  return (SKUS as readonly string[]).includes(value);
}

export function priceIdForSku(sku: Sku): string | undefined {
  const map: Record<Sku, string | undefined> = {
    operator_template: process.env.STRIPE_PRICE_OPERATOR_TEMPLATE,
    operator_install: process.env.STRIPE_PRICE_OPERATOR_INSTALL,
    everyday_template: process.env.STRIPE_PRICE_EVERYDAY_TEMPLATE,
    everyday_install: process.env.STRIPE_PRICE_EVERYDAY_INSTALL,
  };
  return map[sku];
}

export function packForSku(sku: Sku): { href: string; label: string } {
  if (sku.startsWith("operator")) {
    return { href: "/packs/operator-desk.zip", label: "Download Operator Desk pack" };
  }
  return { href: "/packs/everyday-desk.zip", label: "Download Everyday Desk pack" };
}
