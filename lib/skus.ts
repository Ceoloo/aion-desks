export const SKUS = [
  "operator_template",
  "operator_install",
  "everyday_template",
  "everyday_install",
] as const;

export type Sku = (typeof SKUS)[number];

export const PAYMENT_LINKS: Record<Sku, string> = {
  operator_template: "https://buy.stripe.com/3cI8wPeQ4cQA8lM8A07ok03",
  operator_install: "https://buy.stripe.com/5kQeVdcHW17S1XobMc7ok04",
  everyday_template: "https://buy.stripe.com/00w6oHeQ417SdG6g2s7ok05",
  everyday_install: "https://buy.stripe.com/fZu14n7nC8Ak0Tk6rS7ok06",
};

export function isSku(value: string): value is Sku {
  return (SKUS as readonly string[]).includes(value);
}

export function packForSku(sku: Sku): { href: string; label: string } {
  const packs: Record<Sku, { href: string; label: string }> = {
    operator_template: { href: "/packs/operator-desk.zip", label: "Download Operator Desk pack" },
    operator_install: { href: "/packs/operator-desk-install.zip", label: "Download Operator Desk install pack" },
    everyday_template: { href: "/packs/everyday-desk.zip", label: "Download Everyday Desk pack" },
    everyday_install: { href: "/packs/everyday-desk-install.zip", label: "Download Everyday Desk install pack" },
  };
  return packs[sku];
}

export function priceIdForSku(_sku: Sku): string | undefined {
  return undefined;
}
