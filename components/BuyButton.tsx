"use client";

import { useState } from "react";
import { PAYMENT_LINKS, type Sku } from "@/lib/skus";

/**
 * Buy CTA — prefers Checkout Session API (when Price IDs are configured),
 * falls back to Stripe Payment Link. Surfaces loading + actionable errors.
 */
export function BuyButton({
  sku,
  children,
  variant = "gold",
}: {
  sku: Sku;
  children: React.ReactNode;
  variant?: "gold" | "ink";
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Prefer governed checkout session when the API can create one.
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sku }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (res.ok && body.url) {
        window.location.assign(body.url);
        return;
      }
      // Price IDs unset → fall back to Payment Link (still a real Stripe checkout).
      const fallback = PAYMENT_LINKS[sku];
      if (fallback) {
        window.location.assign(fallback);
        return;
      }
      setError(
        body.error ??
          "Checkout is not configured for this desk. Price ID and Payment Link are both missing.",
      );
    } catch (err) {
      const fallback = PAYMENT_LINKS[sku];
      if (fallback) {
        window.location.assign(fallback);
        return;
      }
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <a
        className={`btn full ${variant === "gold" ? "gold" : ""}`}
        href={PAYMENT_LINKS[sku]}
        aria-busy={busy}
        aria-disabled={busy}
        onClick={(e) => {
          void onClick(e);
        }}
      >
        {busy ? "Starting checkout…" : children}
      </a>
      {error && (
        <p role="alert" style={{ marginTop: 8, fontSize: 13, color: "#b42318" }}>
          {error}
        </p>
      )}
    </div>
  );
}
