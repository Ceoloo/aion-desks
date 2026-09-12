import { NextResponse } from "next/server";
import { isSku, priceIdForSku } from "@/lib/skus";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  let body: { sku?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const sku = body.sku;
  if (!sku || !isSku(sku)) {
    return NextResponse.json({ error: "Unknown SKU" }, { status: 400 });
  }

  const price = priceIdForSku(sku);
  if (!price) {
    return NextResponse.json(
      { error: "Price is not configured for this SKU" },
      { status: 500 },
    );
  }

  const origin = new URL(request.url).origin;

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&sku=${sku}`,
      cancel_url: `${origin}/cancel`,
      metadata: { sku },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Checkout session missing URL" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
