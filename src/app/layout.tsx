import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUREN — Autonomous Capital for Real-World Assets",
  description:
    "AUREN menempatkan agen AI otonom untuk mengelola aset dunia nyata yang ditokenisasi — Treasury, kredit privat, properti — 24/7, on-chain, dapat dibuktikan.",
  keywords: [
    "RWA",
    "real world assets",
    "AI agents",
    "DeFi",
    "tokenized treasuries",
    "on-chain",
    "AUREN",
  ],
  openGraph: {
    title: "AUREN — Autonomous Capital for Real-World Assets",
    description:
      "Modal otonom untuk aset dunia nyata. Agen AI mengelola portofolio RWA 24/7, on-chain, dapat dibuktikan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
