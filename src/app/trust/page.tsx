"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Eye, Lock, FileText, ExternalLink, Check, Globe } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { SectionLabel, GlowButton, OutlineButton, GlassCard, PageSection, ProofBadge } from "@/components/ui";

function FadeInWhenVisible({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }} className={className}>
      {children}
    </motion.div>
  );
}

export default function TrustPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="section-normal">
          <div className="container-auren">
            <FadeInWhenVisible>
              <SectionLabel>Trust Layer</SectionLabel>
              <h1 className="text-display-xl text-bone mb-6">
                Bukan janji.{" "}
                <span className="text-gradient-aurum">Bukti.</span>
              </h1>
              <p className="text-body-lg max-w-2xl">
                Setiap aset, setiap keputusan, setiap detik — tercatat on-chain
                dan dapat diverifikasi siapa saja.
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Proof-of-Reserve */}
        <PageSection className="bg-surface-0/30">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInWhenVisible>
              <SectionLabel>Proof-of-Reserve</SectionLabel>
              <h2 className="text-display-md text-bone mb-6">
                Cadangan{" "}
                <span className="text-gradient-signal">real-time</span>
              </h2>
              <p className="text-body-lg mb-6">
                Rasio cadangan diverifikasi setiap blok melalui oracle Chainlink.
                Rasio di bawah 100% memicu auto-proteksi oleh Risk Sentinel.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Oracle Chainlink untuk harga dan cadangan",
                  "Verifikasi setiap 12 detik (per blok)",
                  "Auto-proteksi saat rasio < 100%",
                  "Dashboard publik yang bisa diakses siapa saja",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body">
                    <Check size={16} className="text-verdant mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </div>
              <ProofBadge label="100.2% Reserve Ratio — Live" />
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <GlassCard className="text-center py-12">
                <div className="text-mono text-verdant mb-2">● LIVE</div>
                <div className="text-display-lg text-bone font-mono mb-2">100.2%</div>
                <div className="text-body text-clay mb-6">Reserve Ratio</div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Assets", value: "$48.7M" },
                    { label: "Liabilities", value: "$48.6M" },
                    { label: "Last Update", value: "12s ago" },
                    { label: "Oracle", value: "Chainlink" },
                  ].map((s) => (
                    <div key={s.label} className="text-left">
                      <div className="text-mono-sm text-muted">{s.label}</div>
                      <div className="text-heading-3 text-bone font-mono">{s.value}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeInWhenVisible>
          </div>
        </PageSection>

        {/* Audits */}
        <PageSection>
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>Audits & Security</SectionLabel>
            <h2 className="text-display-md text-bone">
              Diperiksa oleh{" "}
              <span className="text-gradient-aurum">terbaik</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "CertiK", type: "Smart Contract Audit", status: "Completed", date: "Q1 2026", desc: "Audit menyeluruh terhadap vault, governance, dan agent interaction contracts." },
              { name: "OpenZeppelin", type: "Security Review", status: "Completed", date: "Q1 2026", desc: "Review keamanan fokus pada access control, reentrancy, dan upgrade mechanisms." },
            ].map((audit, i) => (
              <FadeInWhenVisible key={audit.name} delay={i * 0.1}>
                <GlassCard hover>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-heading-3 text-bone">{audit.name}</h3>
                      <p className="text-mono text-aurum">{audit.type}</p>
                    </div>
                    <span className="px-2 py-1 rounded text-mono-sm bg-verdant/10 text-verdant">
                      {audit.status}
                    </span>
                  </div>
                  <p className="text-body-sm mb-4">{audit.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border-primary">
                    <span className="text-mono-sm text-muted">{audit.date}</span>
                    <a href="#" className="text-mono-sm text-aurum hover:underline inline-flex items-center gap-1">
                      Lihat Laporan <ExternalLink size={12} />
                    </a>
                  </div>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        {/* Custody */}
        <PageSection className="bg-surface-0/30">
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>Custody & Compliance</SectionLabel>
            <h2 className="text-display-md text-bone">
              Aset disimpan oleh{" "}
              <span className="text-gradient-signal">kustodian teregulasi</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Anchorage Digital", role: "Primary Custodian", desc: "Bank kripto teregulasi OCC, menyimpan Treasury dan tokenized securities." },
              { name: "Circle", role: "Stablecoin Custody", desc: "USDC reserves dan settlement infrastructure." },
              { name: "Fireblocks", role: "Operational Security", desc: "MPC-based key management untuk operational transactions." },
            ].map((c, i) => (
              <FadeInWhenVisible key={c.name} delay={i * 0.1}>
                <GlassCard hover className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-surface-3 flex items-center justify-center mx-auto mb-4">
                    <Lock size={20} className="text-aurum" />
                  </div>
                  <h3 className="text-heading-3 text-bone mb-1">{c.name}</h3>
                  <p className="text-mono text-aurum mb-3">{c.role}</p>
                  <p className="text-body-sm">{c.desc}</p>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        <section className="section-normal">
          <div className="container-auren text-center">
            <FadeInWhenVisible>
              <h2 className="text-display-md text-bone mb-4">
                Transparan dari awal hingga akhir
              </h2>
              <p className="text-body-lg max-w-xl mx-auto mb-8">
                Verifikasi sendiri. Semua data tersedia on-chain.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GlowButton size="lg" href="#">
                  Verifikasi On-Chain
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
