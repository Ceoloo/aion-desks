import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="wrap page">
      <p className="eyebrow">Checkout</p>
      <h1>No charge.</h1>
      <p>
        Checkout was canceled before payment. Your card was not charged. You can
        restart any desk purchase when ready.
      </p>
      <p style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link className="btn gold" href="/#buy">
          Return to the desks
        </Link>
        <Link href="/#faq">Read the FAQ</Link>
      </p>
    </main>
  );
}
