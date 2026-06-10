"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Eye, Zap, ChevronRight, ExternalLink, Check, Lock, Globe, BarChart3, FileText, Users, TrendingUp } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { SectionLabel, GlowButton, OutlineButton, GlassCard, PageSection, ProofBadge } from "@/components/ui";

function FadeInWhenVisible({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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
   PROTOCOL PAGE
   ═══════════════════════════════════════════ */

export default function ProtocolPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-normal">
          <div className="container-auren">
            <FadeInWhenVisible>
              <SectionLabel>Protocol</SectionLabel>
              <h1 className="text-display-xl text-bone mb-6">
                Cara kerja{" "}
                <span className="text-gradient-aurum">AUREN</span>
              </h1>
              <p className="text-body-lg max-w-2xl">
                Arsitektur berlapis yang menghubungkan agen AI otonom dengan
                aset dunia nyata — secara on-chain, transparan, dan dapat
                dibuktikan.
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* How it Works */}
        <PageSection className="bg-surface-0/30">
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-display-md text-bone">
              Dari deposit hingga{" "}
              <span className="text-gradient-signal">yield</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Deposit", desc: "Setor aset ke Vault AUREN melalui antarmuka web atau smart contract.", icon: "💰" },
              { step: "02", title: "Allocate", desc: "Allocator agen menganalisis dan menentukan alokasi optimal ke kelas aset RWA.", icon: "🎯" },
              { step: "03", title: "Manage", desc: "Stewards memantau, me-rebalance, dan menjaga portofolio 24/7 secara otonom.", icon: "⚙" },
              { step: "04", title: "Prove", desc: "Setiap keputusan tercatat on-chain. Proof-of-reserve diverifikasi real-time.", icon: "🔎" },
            ].map((item, i) => (
              <FadeInWhenVisible key={item.step} delay={i * 0.1}>
                <GlassCard hover className="relative">
                  <div className="text-mono text-aurum mb-4">{item.step}</div>
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-heading-3 text-bone mb-2">{item.title}</h3>
                  <p className="text-body-sm">{item.desc}</p>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        {/* The Vault */}
        <PageSection>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInWhenVisible>
              <SectionLabel>The Vault</SectionLabel>
              <h2 className="text-display-md text-bone mb-6">
                ERC-4626 Vault{" "}
                <span className="text-gradient-aurum">Protocol</span>
              </h2>
              <p className="text-body-lg mb-6">
                Setiap vault AUREN mengikuti standar ERC-4626 — yield-bearing token
                yang komposabel, transparan, dan dapat diaudit.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "ERC-4626 tokenized vault shares",
                  "Multi-asset allocation (Treasury, Credit, RE, Commodities)",
                  "Automated rebalancing via Steward agents",
                  "Real-time NAV calculation on-chain",
                  "Withdrawal anytime — no lock-up period",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body">
                    <Check size={16} className="text-verdant mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <GlowButton href="/docs">
                Baca Spesifikasi Teknis
                <ArrowRight size={16} />
              </GlowButton>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <GlassCard className="font-mono text-sm">
                <div className="text-label text-muted mb-4">vault.sol — Core Contract</div>
                <pre className="text-bone/80 overflow-x-auto">
{`contract AURENVault is ERC4626, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    mapping(address => uint256) public allocations;
    uint256 public constant MAX_BPS = 10_000;
    uint256 public constant REBALANCE_DRIFT = 50; // 0.5%
    
    event Deposit(address indexed user, uint256 assets, uint256 shares);
    event Rebalance(address indexed agent, uint256 timestamp);
    event ProofReserve(uint256 ratio, uint256 timestamp);
    
    modifier onlySteward() {
        require(stewards[msg.sender], "Not authorized");
        _;
    }
    
    function deposit(uint256 assets, address receiver)
        external override nonReentrant returns (uint256 shares) {
        // ... deposit logic
    }
    
    function rebalance() external onlySteward {
        require(drift() > REBALANCE_DRIFT, "Within threshold");
        // ... rebalance logic
    }
}`}
                </pre>
              </GlassCard>
            </FadeInWhenVisible>
          </div>
        </PageSection>

        {/* Proof Layer */}
        <PageSection className="bg-surface-0/30">
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>Proof Layer</SectionLabel>
            <h2 className="text-display-md text-bone mb-4">
              Kepercayaan{" "}
              <span className="text-gradient-signal">verifiable</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Bukan janji. Bukti. Setiap aset, setiap keputusan, setiap detik
              — tercatat dan dapat diverifikasi.
            </p>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Proof-of-Reserve", desc: "Verifikasi cadangan aset secara real-time melalui oracle Chainlink. Rasio 100%+ setiap saat.", icon: <Shield size={24} />, color: "text-verdant" },
              { title: "Audit Trail", desc: "Setiap keputusan agen — alokasi, rebalance, proteksi — tercatat on-chain dan dapat ditelusuri.", icon: <Eye size={24} />, color: "text-signal" },
              { title: "Custodian Verification", desc: "Kustodian teregulasi memverifikasi kepemilikan aset fisik secara berkala.", icon: <Lock size={24} />, color: "text-aurum" },
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

        {/* CTA */}
        <section id="cta" className="section-normal">
          <div className="container-auren text-center">
            <FadeInWhenVisible>
              <h2 className="text-display-md text-bone mb-4">
                Siap mulai dengan AUREN?
              </h2>
              <p className="text-body-lg max-w-xl mx-auto mb-8">
                Buka vault, deposit aset, dan biarkan Stewards bekerja.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GlowButton size="lg" href="#">
                  Buka Vault
                  <ArrowRight size={18} />
                </GlowButton>
                <OutlineButton href="/docs">
                  Dokumentasi
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
