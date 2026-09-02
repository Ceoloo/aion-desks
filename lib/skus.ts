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
  if (sku.startsWith("operator")) {
    return { href: "/packs/operator-desk.zip", label: "Download Operator Desk pack" };
  }
  return { href: "/packs/everyday-desk.zip", label: "Download Everyday Desk pack" };
}
