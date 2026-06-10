"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Eye, Zap, ChevronRight, ExternalLink } from "lucide-react";
import {
  SectionLabel,
  GlowButton,
  OutlineButton,
  GlassCard,
  LiveVaultCard,
  AgentLogStream,
  ProofBadge,
  StatItem,
  StewardCard,
  AssetTile,
  TrustItem,
  PageSection,
  LiveCounter,
} from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";

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
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aurum/[0.02] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-signal/[0.02] rounded-full blur-[100px]" />

      <div className="container-auren relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Copy */}
          <div className="lg:col-span-3 space-y-8">
            <FadeInWhenVisible>
              <SectionLabel>Agentic RWA Protocol</SectionLabel>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.1}>
              <h1 className="text-display-xl text-bone">
                Uang seharusnya
                <br />
                <span className="text-gradient-aurum">bekerja.</span>
                <br />
                Sekarang ia{" "}
                <span className="text-gradient-signal">berpikir.</span>
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <p className="text-body-lg max-w-xl">
                AUREN menempatkan agen AI otonom untuk mengelola aset dunia nyata
                yang ditokenisasi — Treasury, kredit privat, properti — 24/7,
                on-chain, dapat dibuktikan.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <GlowButton size="lg" href="#cta">
                  Buka Vault
                  <ArrowRight size={18} />
                </GlowButton>
                <OutlineButton href="#how-it-works">
                  Lihat agen bekerja
                  <Eye size={18} />
                </OutlineButton>
              </div>
            </FadeInWhenVisible>

            {/* Trust badges */}
            <FadeInWhenVisible delay={0.4}>
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <ProofBadge label="Proof-of-Reserve Live" />
                <ProofBadge label="ERC-4626 Vault" />
                <span className="text-mono-sm text-muted">
                  Audited by <span className="text-bone">CertiK</span> + <span className="text-bone">OpenZeppelin</span>
                </span>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Right: Live Vault Card */}
          <div className="lg:col-span-2">
            <FadeInWhenVisible delay={0.2}>
              <LiveVaultCard />
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   STAT MARQUEE
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
    <section className="border-y border-border-primary bg-surface-0/50 overflow-hidden">
      <div className="flex animate-ticker">
        {[...stats, ...stats].map((stat, i) => (
          <StatItem key={i} {...stat} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROBLEM SECTION
   ═══════════════════════════════════════════ */

function ProblemSection() {
  return (
    <PageSection id="problem">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <FadeInWhenVisible>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="text-display-md text-bone mb-6">
              Dua dunia.
              <br />
              <span className="text-clay">Satu jurang.</span>
            </h2>
            <p className="text-body-lg">
              DeFi menjanjikan imbal hasil tanpa fondasi. TradFi punya fondasi
              tanpa kecepatan. Di tengah, uang hanya menunggu.
            </p>
          </FadeInWhenVisible>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-4">
            {/* DeFi side */}
            <FadeInWhenVisible delay={0.1}>
              <GlassCard className="h-full border-red-500/10">
                <div className="text-label text-ember mb-4">DeFi</div>
                <h3 className="text-heading-2 text-bone mb-3">
                  Yield tanpa fondasi
                </h3>
                <ul className="space-y-3">
                  {[
                    "Imbal hasil dari inflasi token",
                    "Smart contract risk tanpa jaminan",
                    "Liquidity bergantung pada sentimen",
                    "Tidak ada aset nyata di balik",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-body-sm">
                      <span className="text-ember mt-0.5">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeInWhenVisible>

            {/* TradFi side */}
            <FadeInWhenVisible delay={0.2}>
              <GlassCard className="h-full border-aurum/10">
                <div className="text-label text-aurum mb-4">TradFi</div>
                <h3 className="text-heading-2 text-bone mb-3">
                  Fondasi tanpa kecepatan
                </h3>
                <ul className="space-y-3">
                  {[
                    "Aset nyata tapi tidak likuid",
                    "Manajemen manual, biaya tinggi",
                    "Akses terbatas, gatekeeping",
                    "Settlement hari hingga minggu",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-body-sm">
                      <span className="text-aurum mt-0.5">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeInWhenVisible>
          </div>

          {/* Bridge */}
          <FadeInWhenVisible delay={0.3}>
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-signal/20 bg-signal/5">
                <Zap size={16} className="text-signal" />
                <span className="text-body text-signal font-medium">
                  AUREN menjembatani keduanya — dengan agen yang tak pernah tidur
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
   THESIS — 3 LAYERS
   ═══════════════════════════════════════════ */

function ThesisSection() {
  const layers = [
    {
      icon: "🏛",
      title: "RWA",
      subtitle: "Fondasi Nyata",
      description:
        "Aset dunia nyata — Treasury, kredit privat, properti, komoditas — ditokenisasi dan dikelola on-chain. Setiap token punya dasar yang bisa disentuh.",
      color: "aurum",
      stats: [
        { label: "Asset Classes", value: "4" },
        { label: "Custodians", value: "3" },
      ],
    },
    {
      icon: "🧠",
      title: "Agents",
      subtitle: "Kecerdasan Otonom",
      description:
        "Stewards — agen AI yang mengalokasikan, me-rebalance, dan menjaga portofolio 24/7. Setiap keputusan tercatat dan dapat diaudit.",
      color: "signal",
      stats: [
        { label: "Active Agents", value: "4" },
        { label: "Decisions/Day", value: "1,247" },
      ],
    },
    {
      icon: "🔎",
      title: "Proof",
      subtitle: "Kepercayaan Verifiable",
      description:
        "Proof-of-reserve real-time, audit kontrak publik, jejak keputusan agen yang bisa ditelusuri. Bukan janji — bukti.",
      color: "verdant",
      stats: [
        { label: "Reserve Ratio", value: "100.2%" },
        { label: "Audits", value: "2" },
      ],
    },
  ];

  return (
    <PageSection id="thesis" className="bg-surface-0/30">
      <FadeInWhenVisible className="text-center mb-16">
        <SectionLabel>Arsitektur AUREN</SectionLabel>
        <h2 className="text-display-md text-bone mb-4">
          Tiga lapisan yang{" "}
          <span className="text-gradient-aurum">menyatu</span>
        </h2>
        <p className="text-body-lg max-w-2xl mx-auto">
          Bukan sekadar tokenisasi aset. Bukan sekadar agen AI. Bukan sekadar
          bukti. Tiga lapisan ini bekerja bersama — secara otonom.
        </p>
      </FadeInWhenVisible>

      <div className="grid md:grid-cols-3 gap-6 stagger-children">
        {layers.map((layer) => (
          <GlassCard key={layer.title} hover className="relative overflow-hidden group">
            {/* Accent line */}
            <div
              className={`absolute top-0 left-0 right-0 h-px ${
                layer.color === "aurum"
                  ? "bg-gradient-to-r from-transparent via-aurum/40 to-transparent"
                  : layer.color === "signal"
                  ? "bg-gradient-to-r from-transparent via-signal/40 to-transparent"
                  : "bg-gradient-to-r from-transparent via-verdant/40 to-transparent"
              }`}
            />

            <div className="text-3xl mb-4">{layer.icon}</div>
            <h3 className="text-display-md text-bone mb-1">{layer.title}</h3>
            <p className="text-mono text-aurum mb-4">{layer.subtitle}</p>
            <p className="text-body mb-6">{layer.description}</p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-primary">
              {layer.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-mono-sm text-muted">{stat.label}</div>
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
   STEWARDS (AGENTS) SECTION
   ═══════════════════════════════════════════ */

function StewardsSection() {
  const stewards = [
    {
      name: "Allocator",
      role: "Capital Deployment",
      description:
        "Menganalisis yield, likuiditas, dan korelasi aset untuk menentukan alokasi optimal. Beroperasi dalam risk limits yang ditetapkan kontrak.",
      icon: "🎯",
      status: "active" as const,
    },
    {
      name: "Risk Sentinel",
      role: "Threat Detection",
      description:
        "Memantau drawdown, eksposur, dan anomali pasar secara real-time. Memicu proteksi otomatis saat threshold terlampaui.",
      icon: "🛡",
      status: "monitoring" as const,
    },
    {
      name: "Rebalancer",
      role: "Portfolio Maintenance",
        description:
        "Menjaga alokasi tetap on-target. Auto-rebalance saat drift melebihi threshold, dengan optimasi biaya gas dan slippage.",
      icon: "⚖",
      status: "executing" as const,
    },
    {
      name: "Auditor",
      role: "Verification & Compliance",
      description:
        "Memverifikasi proof-of-reserve, mengeksekusi audit on-chain, dan mencatat jejak keputusan untuk transparansi publik.",
      icon: "🔎",
      status: "active" as const,
    },
  ];

  return (
    <PageSection id="how-it-works">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <FadeInWhenVisible>
            <SectionLabel>The Stewards</SectionLabel>
            <h2 className="text-display-md text-bone mb-6">
              Agen yang{" "}
              <span className="text-gradient-signal">menjaga</span>
            </h2>
            <p className="text-body-lg mb-6">
              Empat agen AI otonom — masing-masing dengan spesialisasi — bekerja
              bersama mengelola portofolio AUREN 24/7. Setiap keputusan tercatat
              on-chain.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-body-sm">
                <span className="w-2 h-2 rounded-full bg-verdant" />
                <span className="text-clay">Agen mengusulkan</span>
              </div>
              <div className="flex items-center gap-3 text-body-sm">
                <span className="w-2 h-2 rounded-full bg-aurum" />
                <span className="text-clay">Kontrak menegakkan batas</span>
              </div>
              <div className="flex items-center gap-3 text-body-sm">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span className="text-clay">Jejak tercatat on-chain</span>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        <div className="lg:col-span-8">
          <div className="grid sm:grid-cols-2 gap-4 stagger-children">
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
   ASSETS SECTION
   ═══════════════════════════════════════════ */

function AssetsSection() {
  const assets = [
    {
      name: "Tokenized Treasuries",
      yield: 4.8,
      risk: "Low" as const,
      tvl: "$18.2M",
      category: "Fixed Income",
    },
    {
      name: "Private Credit",
      yield: 9.2,
      risk: "Medium" as const,
      tvl: "$12.4M",
      category: "Credit",
    },
    {
      name: "Real Estate",
      yield: 6.5,
      risk: "Low" as const,
      tvl: "$10.1M",
      category: "Property",
    },
    {
      name: "Commodities",
      yield: 5.1,
      risk: "Medium" as const,
      tvl: "$8.0M",
      category: "Physical",
    },
  ];

  return (
    <PageSection id="assets" className="bg-surface-0/30">
      <FadeInWhenVisible className="text-center mb-16">
        <SectionLabel>Asset Classes</SectionLabel>
        <h2 className="text-display-md text-bone mb-4">
          Aset nyata,{" "}
          <span className="text-gradient-aurum">yield nyata</span>
        </h2>
        <p className="text-body-lg max-w-2xl mx-auto">
          Setiap kelas aset dipilih berdasarkan profil yield, risiko, dan
          korelasi. Dikelola oleh Stewards secara otonom.
        </p>
      </FadeInWhenVisible>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {assets.map((asset) => (
          <AssetTile key={asset.name} {...asset} />
        ))}
      </div>

      <FadeInWhenVisible delay={0.4}>
        <div className="text-center mt-10">
          <OutlineButton href="/assets">
            Lihat semua aset
            <ChevronRight size={16} />
          </OutlineButton>
        </div>
      </FadeInWhenVisible>
    </PageSection>
  );
}

/* ═══════════════════════════════════════════
   MANIFESTO SECTION
   ═══════════════════════════════════════════ */

function ManifestoSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-surface-0" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="container-auren relative z-10">
        <FadeInWhenVisible className="max-w-4xl mx-auto text-center">
          <SectionLabel>Manifesto</SectionLabel>
          <blockquote className="text-display-lg text-bone leading-tight mb-8">
            &ldquo;Uang dirancang untuk bekerja.
            <br />
            Tapi selama ini ia hanya{" "}
            <span className="text-gradient-aurum">menunggu</span>.&rdquo;
          </blockquote>
          <p className="text-body-lg max-w-2xl mx-auto">
            AUREN membuat modal berpikir: agen yang tak pernah tidur, menjaga
            aset nyata, dan membuktikan setiap langkahnya. Ini bukan sekadar
            DeFi. Ini evolusi berikutnya dari manajemen aset.
          </p>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════ */

function CTASection() {
  return (
    <section id="cta" className="section-loose">
      <div className="container-auren">
        <FadeInWhenVisible>
          <div className="glass-card-elevated p-12 md:p-16 text-center relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-aurum/[0.06] rounded-full blur-[80px]" />

            <div className="relative z-10">
              <SectionLabel>Mulai dengan AUREN</SectionLabel>
              <h2 className="text-display-md text-bone mb-4">
                Modal yang{" "}
                <span className="text-gradient-aurum">bekerja untukmu</span>
              </h2>
              <p className="text-body-lg max-w-xl mx-auto mb-10">
                Buka vault, deposit aset, dan biarkan Stewards mengelola
                portofolionya. Transparan. Otonom. Dapat dibuktikan.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <GlowButton size="lg" href="#">
                  Buka Vault Sekarang
                  <ArrowRight size={18} />
                </GlowButton>
                <OutlineButton href="#">
                  Baca Dokumentasi
                  <ExternalLink size={16} />
                </OutlineButton>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-border-primary">
                {[
                  { label: "No lock-up", value: "Flexible" },
                  { label: "Min. deposit", value: "$100" },
                  { label: "Fee", value: "0.5%" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-mono-sm text-muted">{item.label}</div>
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
