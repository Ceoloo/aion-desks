import Link from "next/link";
import { isSku, packForSku, type Sku } from "@/lib/skus";
import { getStripe } from "@/lib/stripe";

async function skuFromSession(sessionId: string | undefined): Promise<Sku | null> {
  if (!sessionId) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const sku = session.metadata?.sku;
    if (sku && isSku(sku) && session.payment_status === "paid") {
      return sku;
    }
    if (sku && isSku(sku) && session.status === "complete") {
      return sku;
    }
  } catch {
    return null;
  }
  return null;
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const sku = await skuFromSession(session_id);
  const packs = sku
    ? [packForSku(sku)]
    : [
        packForSku("operator_template"),
        packForSku("everyday_template"),
      ];

  return (
    <main className="wrap page">
      <p className="eyebrow">Paid</p>
      <h1>Your desk is ready.</h1>
      <p>
        Download the pack zip. It is a template: documents and setup steps, not a
        robot that sends mail.
      </p>
      <div className="packs">
        {packs.map((pack) => (
          <a key={pack.href} className="btn gold" href={pack.href} download>
            {pack.label}
          </a>
        ))}
      </div>
      {!sku ? (
        <p className="fine">
          If checkout metadata is missing, both placeholder packs are listed. After
          Stripe is configured, this page shows only the desk you bought.
        </p>
      ) : null}
      <p style={{ marginTop: 28 }}>
        <Link href="/">Back to AION Desks</Link>
      </p>
    </main>
  );
}
