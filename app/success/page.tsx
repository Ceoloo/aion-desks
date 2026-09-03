import Link from "next/link";
import { isSku, packForSku } from "@/lib/skus";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ sku?: string }>;
}) {
  const { sku: raw } = await searchParams;
  const sku = raw && isSku(raw) ? raw : null;

  if (!sku) {
    return (
      <main className="wrap page">
        <p className="eyebrow">Purchase</p>
        <h1>Missing purchase.</h1>
        <p>
          We could not tell which desk you bought. This page only lists a download
          when a valid purchase is in the URL.
        </p>
        <p style={{ marginTop: 28 }}>
          <Link className="btn gold" href="/">
            Back to AION Desks
          </Link>
        </p>
      </main>
    );
  }

  const pack = packForSku(sku);

  return (
    <main className="wrap page">
      <p className="eyebrow">Paid</p>
      <h1>Your desk is ready.</h1>
      <p>
        Download the pack zip. It is a template: documents and setup steps, not a
        robot that sends mail.
      </p>
      <div className="packs">
        <a className="btn gold" href={pack.href} download>
          {pack.label}
        </a>
      </div>
      <p style={{ marginTop: 28 }}>
        <Link href="/">Back to AION Desks</Link>
      </p>
    </main>
  );
}
