"use client";

import { useState } from "react";
import type { Sku } from "@/lib/skus";

export function BuyButton({
  sku,
  children,
  variant = "gold",
}: {
  sku: Sku;
  children: React.ReactNode;
  variant?: "gold" | "ink";
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout");
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        className={`btn full ${variant === "gold" ? "gold" : ""}`}
        onClick={checkout}
        disabled={pending}
      >
        {pending ? "Opening checkout…" : children}
      </button>
      {error ? <p className="notice">{error}</p> : null}
    </div>
  );
}
