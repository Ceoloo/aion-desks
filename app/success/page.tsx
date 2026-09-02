import Link from "next/link";
import { isSku, packForSku } from "@/lib/skus";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ sku?: string }>;
}) {
  const { sku: raw } = await searchParams;
  const sku = raw && isSku(raw) ? raw : null;
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
          If you came here without a desk in the URL, both packs are listed.
        </p>
      ) : null}
      <p style={{ marginTop: 28 }}>
        <Link href="/">Back to AION Desks</Link>
      </p>
    </main>
  );
}
