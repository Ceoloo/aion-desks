import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AION Workforce — Deploy Your Operator Desk",
  description:
    "A lightweight, mobile-ready autonomous workforce you can deploy on Grok Bot in under an hour.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
