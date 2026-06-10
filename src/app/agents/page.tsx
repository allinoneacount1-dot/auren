"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Activity, Shield, Scale, Search, Check, Zap, Clock, TrendingUp } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { SectionLabel, GlowButton, OutlineButton, GlassCard, PageSection, AgentLogStream } from "@/components/ui";

function FadeInWhenVisible({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }} className={className}>
      {children}
    </motion.div>
  );
}

const agents = [
  {
    name: "Allocator",
    role: "Capital Deployment",
    icon: "🎯",
    status: "active" as const,
    description: "Menganalisis yield, likuiditas, dan korelasi aset untuk menentukan alokasi optimal. Beroperasi dalam risk limits yang ditetapkan kontrak.",
    responsibilities: [
      "Yield analysis across RWA classes",
      "Liquidity assessment before deployment",
      "Correlation-based diversification",
      "Gas-optimized batch transactions",
    ],
    stats: [
      { label: "Allocations Today", value: "23" },
      { label: "Avg. Yield", value: "6.4%" },
      { label: "Uptime", value: "99.98%" },
    ],
  },
  {
    name: "Risk Sentinel",
    role: "Threat Detection",
    icon: "🛡",
    status: "monitoring" as const,
    description: "Memantau drawdown, eksposur, dan anomali pasar secara real-time. Memicu proteksi otomatis saat threshold terlampaui.",
    responsibilities: [
      "Real-time drawdown monitoring",
      "Exposure limit enforcement",
      "Anomaly detection via ML models",
      "Auto-protection triggers",
    ],
    stats: [
      { label: "Alerts Today", value: "7" },
      { label: "Threats Blocked", value: "2" },
      { label: "Uptime", value: "99.99%" },
    ],
  },
  {
    name: "Rebalancer",
    role: "Portfolio Maintenance",
    icon: "⚖",
    status: "executing" as const,
    description: "Menjaga alokasi tetap on-target. Auto-rebalance saat drift melebihi threshold, dengan optimasi biaya gas dan slippage.",
    responsibilities: [
      "Drift detection (threshold: 0.5%)",
      "Slippage-optimized execution",
      "Gas cost optimization",
      "Multi-DEX routing",
    ],
    stats: [
      { label: "Rebalances Today", value: "12" },
      { label: "Avg. Drift", value: "0.3%" },
      { label: "Uptime", value: "99.97%" },
    ],
  },
  {
    name: "Auditor",
    role: "Verification & Compliance",
    icon: "🔎",
    status: "active" as const,
    description: "Memverifikasi proof-of-reserve, mengeksekusi audit on-chain, dan mencatat jejak keputusan untuk transparansi publik.",
    responsibilities: [
      "Proof-of-reserve verification",
      "On-chain audit execution",
      "Decision trail recording",
      "Compliance reporting",
    ],
    stats: [
      { label: "Audits Today", value: "48" },
      { label: "Issues Found", value: "0" },
      { label: "Uptime", value: "99.99%" },
    ],
  },
];

export default function AgentsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="section-normal">
          <div className="container-auren">
            <FadeInWhenVisible>
              <SectionLabel>The Stewards</SectionLabel>
              <h1 className="text-display-xl text-bone mb-6">
                Agen yang{" "}
                <span className="text-gradient-signal">menjaga</span>
              </h1>
              <p className="text-body-lg max-w-2xl">
                Empat agen AI otonom — masing-masing dengan spesialisasi — bekerja
                bersama mengelola portofolio AUREN 24/7. Setiap keputusan tercatat
                on-chain.
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Agent Cards */}
        <PageSection className="bg-surface-0/30">
          <div className="space-y-6">
            {agents.map((agent, i) => (
              <FadeInWhenVisible key={agent.name} delay={i * 0.1}>
                <GlassCard>
                  <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left: Info */}
                    <div className="lg:col-span-5">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-surface-3 flex items-center justify-center text-2xl shrink-0">
                          {agent.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-heading-2 text-bone">{agent.name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                              agent.status === "active" ? "bg-verdant/10 text-verdant" :
                              agent.status === "monitoring" ? "bg-signal/10 text-signal" :
                              "bg-aurum/10 text-aurum"
                            }`}>
                              ● {agent.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-mono text-aurum">{agent.role}</p>
                        </div>
                      </div>
                      <p className="text-body mb-4">{agent.description}</p>
                      <ul className="space-y-2">
                        {agent.responsibilities.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-body-sm">
                            <Check size={14} className="text-verdant mt-0.5 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Stats + Live Log */}
                    <div className="lg:col-span-7">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {agent.stats.map((stat) => (
                          <div key={stat.label} className="p-4 rounded-lg bg-surface-2 border border-border-primary">
                            <div className="text-mono-sm text-muted mb-1">{stat.label}</div>
                            <div className="text-heading-3 text-bone font-mono">{stat.value}</div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-lg bg-surface-1 border border-border-primary">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-label text-muted">Live Activity</span>
                          <span className="flex items-center gap-1.5 text-mono-sm text-signal">
                            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse-glow" />
                            STREAMING
                          </span>
                        </div>
                        <AgentLogStream />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        {/* Security Model */}
        <PageSection>
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>Security Model</SectionLabel>
            <h2 className="text-display-md text-bone mb-4">
              Otonomi tanpa{" "}
              <span className="text-gradient-aurum">kepercayaan buta</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Agen mengusulkan. Kontrak menegakkan. Tidak ada agen yang bisa
              melampaui batas yang ditetapkan.
            </p>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Agent Proposes", desc: "Stewards menganalisis dan mengusulkan aksi — alokasi, rebalance, proteksi.", icon: <Zap size={24} />, color: "text-signal" },
              { title: "Contract Enforces", desc: "Smart contract memverifikasi proposal terhadap risk limits yang di-hardcode.", icon: <Shield size={24} />, color: "text-aurum" },
              { title: "Trail Recorded", desc: "Setiap keputusan tercatat on-chain — dapat diaudit siapa saja, kapan saja.", icon: <Search size={24} />, color: "text-verdant" },
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
                Lihat Stewards bekerja
              </h2>
              <p className="text-body-lg max-w-xl mx-auto mb-8">
                Buka vault dan saksikan agen-agen ini mengelola portofolio
                secara real-time.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GlowButton size="lg" href="#">
                  Buka Vault
                  <ArrowRight size={18} />
                </GlowButton>
                <OutlineButton href="/docs">
                  Dokumentasi Teknis
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
