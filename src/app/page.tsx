"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Eye, Zap, ChevronRight, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import {
  SectionLabel,
  GlowButton,
  OutlineButton,
  GlassCard,
  LiveVaultCard,
  ProofBadge,
  StatItem,
  StewardCard,
  AssetTile,
  TrustItem,
  PageSection,
  LiveCounter,
} from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";
import { Hero3D } from "@/components/hero-3d";
import { Skeleton, LiveVaultSkeleton } from "@/components/skeleton";

/* ═══════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════ */

function FadeInWhenVisible({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION — Full viewport, direct headline
   ═══════════════════════════════════════════ */

function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-16 pb-8 overflow-hidden min-h-[80vh] flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aurum/[0.015] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-signal/[0.015] rounded-full blur-[80px]" />

      <div className="container-auren relative z-10">
        <div className="grid xl:grid-cols-12 gap-8 items-center">
          {/* Left: Copy — 6 cols */}
          <div className="xl:col-span-6 space-y-5">
            <FadeInWhenVisible>
              <SectionLabel>Agentic RWA Protocol</SectionLabel>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.1}>
              <h1 className="text-display-xl text-bone">
                Autonomous AI manages
                <br />
                your{" "}
                <span className="text-gradient-aurum">real-world assets</span>
                <br />
                <span className="text-gradient-signal">24/7.</span>
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <p className="text-body-lg max-w-lg">
                Tokenized Treasuries, Private Credit, Real Estate — managed by
                AI agents that never sleep, verified on-chain every second.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <div className="flex flex-wrap gap-3">
                <GlowButton size="lg" href="/dashboard">
                  Open Vault
                  <ArrowRight size={18} />
                </GlowButton>
                <OutlineButton href="#how-it-works">
                  See how it works
                  <Eye size={16} />
                </OutlineButton>
              </div>
            </FadeInWhenVisible>

            {/* Trust badges — prominent */}
            <FadeInWhenVisible delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-verdant/5 border border-verdant/15">
                  <span className="w-2 h-2 rounded-full bg-verdant animate-pulse-glow" />
                  <span className="text-mono text-verdant font-medium">Proof-of-Reserve: 100.2%</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-aurum/5 border border-aurum/15">
                  <Shield size={14} className="text-aurum" />
                  <span className="text-mono text-aurum font-medium">Audited by CertiK + OpenZeppelin</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-surface-2 border border-border-primary">
                  <span className="text-mono text-text-secondary font-medium">ERC-4626 Standard</span>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Right: 3D + Live Vault — 6 cols */}
          <div className="xl:col-span-6">
            {/* 3D Scene */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-50 pointer-events-none hidden xl:block">
              <Hero3D />
            </div>

            {/* Live Vault Card */}
            <FadeInWhenVisible delay={0.2}>
              <AnimatePresence mode="wait">
                {!loaded ? (
                  <LiveVaultSkeleton key="skeleton" />
                ) : (
                  <motion.div
                    key="vault"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    <LiveVaultCard />
                  </motion.div>
                )}
              </AnimatePresence>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   STAT MARQUEE — Compact
   ═══════════════════════════════════════════ */

function StatMarquee() {
  const stats = [
    { label: "Total Value Locked", value: "48.7", prefix: "$", suffix: "M" },
    { label: "Assets Under Management", value: "4", suffix: " classes" },
    { label: "Agent Uptime", value: "99.97", suffix: "%" },
    { label: "Proof-of-Reserve", value: "100.2", suffix: "%" },
    { label: "Active Stewards", value: "4", suffix: " agents" },
    { label: "Decisions Today", value: "1,247", suffix: " txns" },
  ];

  return (
    <section className="border-y border-border-primary bg-surface-0/50 overflow-hidden py-3">
      <div className="flex animate-ticker">
        {[...stats, ...stats].map((stat, i) => (
          <StatItem key={i} {...stat} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SOCIAL PROOF — Partner logos + metrics
   ═══════════════════════════════════════════ */

function SocialProofSection() {
  const partners = [
    { name: "CertiK", role: "Security Audit" },
    { name: "OpenZeppelin", role: "Contract Review" },
    { name: "Chainlink", role: "Oracle & PoR" },
    { name: "Anchorage", role: "Custodian" },
    { name: "Circle", role: "Stablecoin" },
    { name: "Fireblocks", role: "Key Management" },
  ];

  return (
    <section className="border-b border-border-primary bg-surface-0/30 py-6">
      <div className="container-auren">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-label text-text-muted shrink-0">Trusted by</span>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {partners.map((p) => (
              <div key={p.name} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-5 h-5 rounded bg-surface-3 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-text-secondary">{p.name[0]}</span>
                </div>
                <div>
                  <span className="text-mono text-text-primary font-medium">{p.name}</span>
                  <span className="text-mono-sm text-text-muted ml-1 hidden sm:inline">— {p.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROBLEM SECTION — Split screen, dramatic gap
   ═══════════════════════════════════════════ */

function ProblemSection() {
  return (
    <PageSection id="problem" className="noise-texture">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-5">
          <FadeInWhenVisible>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="text-display-md text-bone mb-4">
              Two worlds.
              <br />
              <span className="text-text-secondary">One gap.</span>
            </h2>
            <p className="text-body-lg">
              DeFi promises yield without foundation. TradFi has foundation
              without speed. In between, money just waits.
            </p>
          </FadeInWhenVisible>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DeFi side — red accent */}
            <FadeInWhenVisible delay={0.1}>
              <GlassCard className="h-full border-ember/10">
                <div className="text-label text-ember mb-3">✕ DeFi</div>
                <h3 className="text-heading-2 text-bone mb-3">
                  Yield without foundation
                </h3>
                <ul className="space-y-2">
                  {[
                    "Returns from token inflation",
                    "Smart contract risk with no guarantee",
                    "Liquidity depends on sentiment",
                    "No real assets behind the tokens",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-body-sm">
                      <span className="text-ember mt-0.5 shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeInWhenVisible>

            {/* TradFi side — gold accent */}
            <FadeInWhenVisible delay={0.2}>
              <GlassCard className="h-full border-aurum/10">
                <div className="text-label text-aurum mb-3">✕ TradFi</div>
                <h3 className="text-heading-2 text-bone mb-3">
                  Foundation without speed
                </h3>
                <ul className="space-y-2">
                  {[
                    "Real assets but illiquid",
                    "Manual management, high costs",
                    "Limited access, gatekeeping",
                    "Settlement in days to weeks",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-body-sm">
                      <span className="text-aurum mt-0.5 shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeInWhenVisible>
          </div>

          {/* Bridge */}
          <FadeInWhenVisible delay={0.3}>
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-signal/20 bg-signal/5">
                <Zap size={14} className="text-signal" />
                <span className="text-body-sm text-signal font-medium">
                  AUREN bridges both — with agents that never sleep
                </span>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </PageSection>
  );
}

/* ═══════════════════════════════════════════
   THESIS — 3 LAYERS — Featured card layout
   ═══════════════════════════════════════════ */

function ThesisSection() {
  const layers = [
    {
      icon: "🏛",
      title: "RWA",
      subtitle: "Real Foundation",
      description:
        "Real-world assets — Treasuries, private credit, real estate, commodities — tokenized and managed on-chain. Every token has tangible backing.",
      color: "aurum",
      accentClass: "from-aurum/30 to-transparent",
      borderClass: "border-aurum/15",
      stats: [
        { label: "Asset Classes", value: "4" },
        { label: "Custodians", value: "3" },
      ],
    },
    {
      icon: "🧠",
      title: "Agents",
      subtitle: "Autonomous Intelligence",
      description:
        "Stewards — AI agents that allocate, rebalance, and guard portfolios 24/7. Every decision is recorded and auditable.",
      color: "signal",
      accentClass: "from-signal/30 to-transparent",
      borderClass: "border-signal/15",
      stats: [
        { label: "Active Agents", value: "4" },
        { label: "Decisions/Day", value: "1,247" },
      ],
    },
    {
      icon: "🔎",
      title: "Proof",
      subtitle: "Verifiable Trust",
      description:
        "Real-time proof-of-reserve, public contract audit, traceable agent decision trail. Not promises — proof.",
      color: "verdant",
      accentClass: "from-verdant/30 to-transparent",
      borderClass: "border-verdant/15",
      stats: [
        { label: "Reserve Ratio", value: "100.2%" },
        { label: "Audits", value: "2" },
      ],
    },
  ];

  return (
    <PageSection id="thesis" className="bg-surface-0/30 noise-texture">
      <FadeInWhenVisible className="text-center mb-12">
        <SectionLabel>AUREN Architecture</SectionLabel>
        <h2 className="text-display-md text-bone mb-3">
          Three layers that{" "}
          <span className="text-gradient-aurum">unite</span>
        </h2>
        <p className="text-body-lg max-w-2xl mx-auto">
          Not just asset tokenization. Not just AI agents. Not just proof.
          These three layers work together — autonomously.
        </p>
      </FadeInWhenVisible>

      <div className="grid md:grid-cols-3 gap-4 stagger-children">
        {layers.map((layer) => (
          <GlassCard key={layer.title} hover className={`relative overflow-hidden group ${layer.borderClass}`}>
            {/* Accent top line */}
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${layer.accentClass}`} />

            <div className="text-2xl mb-3">{layer.icon}</div>
            <h3 className="text-display-md text-bone mb-1">{layer.title}</h3>
            <p className="text-mono text-aurum mb-3">{layer.subtitle}</p>
            <p className="text-body-sm mb-5">{layer.description}</p>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-primary">
              {layer.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-mono-sm text-text-muted">{stat.label}</div>
                  <div className="text-heading-3 text-bone font-mono">{stat.value}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </PageSection>
  );
}

/* ═══════════════════════════════════════════
   STEWARDS — 4-col horizontal on desktop
   ═══════════════════════════════════════════ */

function StewardsSection() {
  const stewards = [
    {
      name: "Allocator",
      role: "Capital Deployment",
      description:
        "Analyzes yield, liquidity, and correlation to determine optimal allocation. Operates within hard-coded risk limits.",
      icon: "🎯",
      status: "active" as const,
    },
    {
      name: "Risk Sentinel",
      role: "Threat Detection",
      description:
        "Monitors drawdown, exposure, and anomalies in real-time. Triggers automatic protection when thresholds are breached.",
      icon: "🛡",
      status: "monitoring" as const,
    },
    {
      name: "Rebalancer",
      role: "Portfolio Maintenance",
      description:
        "Keeps allocation on-target. Auto-rebalances when drift exceeds 0.5%, with gas and slippage optimization.",
      icon: "⚖",
      status: "executing" as const,
    },
    {
      name: "Auditor",
      role: "Verification & Compliance",
      description:
        "Verifies proof-of-reserve, executes on-chain audits, and records decision trails for public transparency.",
      icon: "🔎",
      status: "active" as const,
    },
  ];

  return (
    <PageSection id="how-it-works">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <FadeInWhenVisible>
            <SectionLabel>The Stewards</SectionLabel>
            <h2 className="text-display-md text-bone mb-4">
              Agents that{" "}
              <span className="text-gradient-signal">guard</span>
            </h2>
            <p className="text-body-lg mb-5">
              Four autonomous AI agents — each with a specialization — work
              together to manage AUREN portfolios 24/7.
            </p>
            <div className="space-y-2">
              {[
                { color: "bg-verdant", text: "Agents propose" },
                { color: "bg-aurum", text: "Contracts enforce limits" },
                { color: "bg-signal", text: "Trail recorded on-chain" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-body-sm">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                  <span className="text-text-secondary">{item.text}</span>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>

        <div className="lg:col-span-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 stagger-children">
            {stewards.map((s) => (
              <StewardCard key={s.name} {...s} />
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

/* ═══════════════════════════════════════════
   TRUST STRIP
   ═══════════════════════════════════════════ */

function TrustStrip() {
  return (
    <section className="border-y border-border-primary bg-surface-0/30">
      <div className="container-auren">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-primary">
          <TrustItem name="CertiK" description="Smart Contract Audit" />
          <TrustItem name="OpenZeppelin" description="Security Review" />
          <TrustItem name="Chainlink" description="Oracle & Proof-of-Reserve" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ASSETS — Compact grid
   ═══════════════════════════════════════════ */

function AssetsSection() {
  const assets = [
    { name: "Tokenized Treasuries", yield: 4.8, risk: "Low" as const, tvl: "$18.2M", category: "Fixed Income" },
    { name: "Private Credit", yield: 9.2, risk: "Medium" as const, tvl: "$12.4M", category: "Credit" },
    { name: "Real Estate", yield: 6.5, risk: "Low" as const, tvl: "$10.1M", category: "Property" },
    { name: "Commodities", yield: 5.1, risk: "Medium" as const, tvl: "$8.0M", category: "Physical" },
    { name: "Carbon Credits", yield: 3.9, risk: "Low" as const, tvl: "$4.2M", category: "Environmental" },
    { name: "Infrastructure", yield: 7.1, risk: "Medium" as const, tvl: "$6.8M", category: "Real Assets" },
  ];

  return (
    <PageSection id="assets" className="bg-surface-0/30">
      <FadeInWhenVisible className="text-center mb-10">
        <SectionLabel>Asset Classes</SectionLabel>
        <h2 className="text-display-md text-bone mb-3">
          Real assets,{" "}
          <span className="text-gradient-aurum">real yield</span>
        </h2>
        <p className="text-body-lg max-w-2xl mx-auto">
          Each asset class is selected based on yield profile, risk, and
          correlation. Managed autonomously by Stewards.
        </p>
      </FadeInWhenVisible>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
        {assets.map((asset) => (
          <AssetTile key={asset.name} {...asset} />
        ))}
      </div>

      <FadeInWhenVisible delay={0.4}>
        <div className="text-center mt-6">
          <OutlineButton href="/assets">
            View all assets
            <ChevronRight size={14} />
          </OutlineButton>
        </div>
      </FadeInWhenVisible>
    </PageSection>
  );
}

/* ═══════════════════════════════════════════
   MANIFESTO — Full bleed, cinematic
   ═══════════════════════════════════════════ */

function ManifestoSection() {
  return (
    <section className="relative py-16 overflow-hidden noise-texture scanline-effect">
      <div className="absolute inset-0 bg-surface-0" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container-auren relative z-10">
        <FadeInWhenVisible className="max-w-3xl mx-auto text-center">
          <SectionLabel>Manifesto</SectionLabel>
          <blockquote className="text-display-lg text-bone leading-tight mb-6">
            &ldquo;Money was designed to work.
            <br />
            But until now it has only been{" "}
            <span className="text-gradient-aurum">waiting</span>.&rdquo;
          </blockquote>
          <p className="text-body-lg max-w-2xl mx-auto">
            AUREN makes capital think: agents that never sleep, guarding real
            assets, proving every step. This is the next evolution of asset
            management.
          </p>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA — Single primary action
   ═══════════════════════════════════════════ */

function CTASection() {
  return (
    <section id="cta" className="section-normal">
      <div className="container-auren">
        <FadeInWhenVisible>
          <div className="glass-card-elevated p-10 md:p-12 text-center relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-aurum/[0.04] rounded-full blur-[60px]" />

            <div className="relative z-10">
              <SectionLabel>Get Started</SectionLabel>
              <h2 className="text-display-md text-bone mb-3">
                Earn{" "}
                <span className="text-gradient-aurum">7.2% APY</span>{" "}
                on real-world assets
              </h2>
              <p className="text-body-lg max-w-lg mx-auto mb-8">
                Deposit into the vault and let autonomous AI agents manage your
                portfolio 24/7. No lock-up. Withdraw anytime.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <GlowButton size="lg" href="/dashboard">
                  Open Vault — Start Earning
                  <ArrowRight size={18} />
                </GlowButton>
                <OutlineButton href="/docs">
                  Read Documentation
                </OutlineButton>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-border-primary">
                {[
                  { label: "APY", value: "7.23%" },
                  { label: "Min. Deposit", value: "$100" },
                  { label: "Management Fee", value: "0.5%" },
                  { label: "Lock-up", value: "None" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-mono-sm text-text-muted">{item.label}</div>
                    <div className="text-heading-3 text-bone font-mono">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatMarquee />
        <SocialProofSection />
        <ProblemSection />
        <ThesisSection />
        <StewardsSection />
        <TrustStrip />
        <AssetsSection />
        <ManifestoSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
