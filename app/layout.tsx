import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AION Desks — draft-only operating packs",
  description:
    "Two digital desks. Operator Desk for owners. Everyday Desk for your own calendar and inbox. Drafts only. Never auto-send.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
