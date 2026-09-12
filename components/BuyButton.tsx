import type { ReactNode } from "react";
import { PAYMENT_LINKS, type Sku } from "@/lib/skus";

export function BuyButton({
  sku,
  children,
  variant = "gold",
}: {
  sku: Sku;
  children: ReactNode;
  variant?: "gold" | "ink";
}) {
  return (
    <a
      className={`btn full ${variant === "gold" ? "gold" : ""}`}
      href={PAYMENT_LINKS[sku]}
    >
      {children}
    </a>
  );
}
