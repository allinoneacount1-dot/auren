"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, AlertTriangle, ExternalLink } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { SectionLabel, GlowButton, OutlineButton, GlassCard, PageSection, AssetTile } from "@/components/ui";

function FadeInWhenVisible({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }} className={className}>
      {children}
    </motion.div>
  );
}

const allAssets = [
  { name: "Tokenized Treasuries", yield: 4.8, risk: "Low" as const, tvl: "$18.2M", category: "Fixed Income" },
  { name: "Private Credit", yield: 9.2, risk: "Medium" as const, tvl: "$12.4M", category: "Credit" },
  { name: "Real Estate", yield: 6.5, risk: "Low" as const, tvl: "$10.1M", category: "Property" },
  { name: "Commodities", yield: 5.1, risk: "Medium" as const, tvl: "$8.0M", category: "Physical" },
  { name: "Carbon Credits", yield: 3.9, risk: "Low" as const, tvl: "$4.2M", category: "Environmental" },
  { name: "Infrastructure", yield: 7.1, risk: "Medium" as const, tvl: "$6.8M", category: "Real Assets" },
];

export default function AssetsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="section-normal">
          <div className="container-auren">
            <FadeInWhenVisible>
              <SectionLabel>Assets</SectionLabel>
              <h1 className="text-display-xl text-bone mb-6">
                RWA{" "}
                <span className="text-gradient-aurum">Asset Classes</span>
              </h1>
              <p className="text-body-lg max-w-2xl">
                Real-world assets that are tokenized and managed by Stewards.
                Each class has a distinct yield, risk, and correlation profile.
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        <PageSection className="bg-surface-0/30">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allAssets.map((asset, i) => (
              <FadeInWhenVisible key={asset.name} delay={i * 0.05}>
                <AssetTile {...asset} />
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        <PageSection>
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>Risk Framework</SectionLabel>
            <h2 className="text-display-md text-bone mb-12">
              Every asset passes through a{" "}
              <span className="text-gradient-signal">strict filter</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Due Diligence", desc: "Deep analysis before an asset is whitelisted — legal, financial, operational.", icon: <Shield size={24} />, color: "text-verdant" },
              { title: "Risk Scoring", desc: "Each asset is rated based on volatility, liquidity, correlation, and counterparty risk.", icon: <AlertTriangle size={24} />, color: "text-ember" },
              { title: "Continuous Monitoring", desc: "Stewards monitor every asset 24/7. Auto-protection when thresholds are breached.", icon: <TrendingUp size={24} />, color: "text-signal" },
            ].map((item, i) => (
              <FadeInWhenVisible key={item.title} delay={i * 0.1}>
                <GlassCard hover className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-3 mb-4 ${item.color}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-heading-3 text-bone mb-2">{item.title}</h3>
                  <p className="text-body-sm">{item.desc}</p>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        <section className="section-normal">
          <div className="container-auren text-center">
            <FadeInWhenVisible>
              <h2 className="text-display-md text-bone mb-4">
                Want to propose a new asset?
              </h2>
              <p className="text-body-lg max-w-xl mx-auto mb-8">
                AUREN governance allows $AUREN token holders to propose and vote
                on new asset classes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GlowButton size="lg" href="/governance">
                  View Proposals
                  <ArrowRight size={18} />
                </GlowButton>
                <OutlineButton href="/docs">
                  Documentation
                  <ExternalLink size={16} />
                </OutlineButton>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
