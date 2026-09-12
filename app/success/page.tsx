import Link from "next/link";
import { isSku, packForSku } from "@/lib/skus";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ sku?: string; session_id?: string }>;
}) {
  const params = await searchParams;
  const sku = params.sku && isSku(params.sku) ? params.sku : null;
  const sessionId = params.session_id ?? null;

  if (!sku && !sessionId) {
    return (
      <main className="wrap page">
        <p className="eyebrow">Purchase</p>
        <h1>Missing purchase.</h1>
        <p>
          We could not tell which desk you bought. Open this page from a completed
          checkout so the download can be listed.
        </p>
        <p style={{ marginTop: 28 }}>
          <Link className="btn gold" href="/#buy">
            Back to AION Desks
          </Link>
        </p>
      </main>
    );
  }

  if (!sku && sessionId) {
    return (
      <main className="wrap page">
        <p className="eyebrow">Paid</p>
        <h1>Payment received.</h1>
        <p>
          Stripe confirmed checkout session{" "}
          <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 13 }}>
            {sessionId}
          </span>
          . If your pack download does not appear here, use the confirmation email
          or return to the desks page and contact support with that session id.
        </p>
        <p style={{ marginTop: 28 }}>
          <Link className="btn gold" href="/#buy">
            Back to AION Desks
          </Link>
        </p>
      </main>
    );
  }

  const pack = packForSku(sku!);

  return (
    <main className="wrap page">
      <p className="eyebrow">Paid</p>
      <h1>Your desk is ready.</h1>
      <p>
        Download the pack zip. Documents and setup steps, not a robot that sends
        mail. One-time. Not a subscription.
        {sku!.includes("_install")
          ? " This zip includes INSTALL.md for a human sit."
          : " Template only. No INSTALL.md."}
      </p>
      <div className="packs">
        <a className="btn gold" href={pack.href} download>
          {pack.label}
        </a>
      </div>
      <ol style={{ marginTop: 24, paddingLeft: 18, color: "var(--muted)", fontSize: 14 }}>
        <li>Download the zip.</li>
        <li>Open the README inside the pack.</li>
        <li>You still hit send — drafts only.</li>
      </ol>
      <p style={{ marginTop: 28 }}>
        <Link href="/">Back to AION Desks</Link>
      </p>
    </main>
  );
}
