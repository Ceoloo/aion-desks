import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="wrap page">
      <p className="eyebrow">Checkout</p>
      <h1>No charge.</h1>
      <p>Checkout was canceled. Your card was not charged.</p>
      <p style={{ marginTop: 28 }}>
        <Link className="btn gold" href="/#buy">
          Return to the desks
        </Link>
      </p>
    </main>
  );
}
