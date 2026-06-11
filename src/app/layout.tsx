import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUREN — Autonomous Capital for Real-World Assets",
  description:
    "AUREN deploys autonomous AI agents to manage tokenized real-world assets — Treasuries, private credit, real estate — 24/7, on-chain, provable.",
  keywords: [
    "RWA",
    "real world assets",
    "AI agents",
    "DeFi",
    "tokenized treasuries",
    "on-chain",
    "AUREN",
    "autonomous capital",
    "agentic finance",
  ],
  openGraph: {
    title: "AUREN — Autonomous Capital for Real-World Assets",
    description:
      "Autonomous capital for real-world assets. AI agents manage RWA portfolios 24/7, on-chain, provable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
