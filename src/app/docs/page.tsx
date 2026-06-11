"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Eye, Lock, FileText, ExternalLink, Check, Code, Book, Terminal, Layers, Database, Globe, Zap } from "lucide-react";
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

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        {/* Hero */}
        <section className="section-normal">
          <div className="container-auren">
            <FadeInWhenVisible>
              <SectionLabel>Documentation</SectionLabel>
              <h1 className="text-display-xl text-bone mb-6">
                Build with{" "}
                <span className="text-gradient-aurum">AUREN</span>
              </h1>
              <p className="text-body-lg max-w-2xl">
                Integrate AUREN Protocol into your applications. Access vault data,
                agent decisions, and proof-of-reserve programmatically.
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Quick Start */}
        <PageSection className="bg-surface-0/30">
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>Quick Start</SectionLabel>
            <h2 className="text-display-md text-bone">
              Up and running in{" "}
              <span className="text-gradient-signal">minutes</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Install SDK", code: "npm install @auren/sdk", icon: <Code size={24} /> },
              { step: "02", title: "Initialize Client", code: "const auren = new AUREN({ network: 'mainnet' })", icon: <Terminal size={24} /> },
              { step: "03", title: "Interact", code: "const vault = await auren.getVault('treasury')", icon: <Zap size={24} /> },
            ].map((item, i) => (
              <FadeInWhenVisible key={item.step} delay={i * 0.1}>
                <GlassCard hover className="relative">
                  <div className="text-mono text-aurum mb-4">{item.step}</div>
                  <div className="text-aurum mb-3">{item.icon}</div>
                  <h3 className="text-heading-3 text-bone mb-3">{item.title}</h3>
                  <div className="p-3 rounded-lg bg-surface-1 border border-border-primary">
                    <code className="text-mono-sm text-signal">{item.code}</code>
                  </div>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        {/* API Reference */}
        <PageSection>
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>API Reference</SectionLabel>
            <h2 className="text-display-md text-bone">
              Endpoints &{" "}
              <span className="text-gradient-aurum">Data</span>
            </h2>
          </FadeInWhenVisible>

          <div className="space-y-4">
            {[
              { method: "GET", path: "/api/v1/vault", desc: "Get vault data — NAV, APY, allocation, TVL", color: "text-verdant" },
              { method: "GET", path: "/api/v1/vault/allocations", desc: "Get current asset allocation breakdown", color: "text-verdant" },
              { method: "GET", path: "/api/v1/agents", desc: "Get all active Steward agents and their status", color: "text-verdant" },
              { method: "GET", path: "/api/v1/agents/:id/decisions", desc: "Get decision trail for a specific agent", color: "text-verdant" },
              { method: "GET", path: "/api/v1/proof/reserve", desc: "Get proof-of-reserve data — ratio, timestamp, oracle", color: "text-verdant" },
              { method: "GET", path: "/api/v1/proof/audit", desc: "Get latest audit reports and findings", color: "text-verdant" },
              { method: "GET", path: "/api/v1/assets", desc: "Get all supported RWA asset classes", color: "text-verdant" },
              { method: "POST", path: "/api/v1/vault/deposit", desc: "Deposit assets into vault (requires auth)", color: "text-aurum" },
              { method: "POST", path: "/api/v1/vault/withdraw", desc: "Withdraw assets from vault (requires auth)", color: "text-aurum" },
            ].map((endpoint, i) => (
              <FadeInWhenVisible key={endpoint.path} delay={i * 0.03}>
                <GlassCard hover>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <span className={`text-mono font-bold shrink-0 ${endpoint.color}`}>{endpoint.method}</span>
                    <code className="text-mono-sm text-bone flex-1">{endpoint.path}</code>
                    <span className="text-body-sm text-clay md:text-right">{endpoint.desc}</span>
                  </div>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        {/* Smart Contracts */}
        <PageSection className="bg-surface-0/30">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeInWhenVisible>
              <SectionLabel>Smart Contracts</SectionLabel>
              <h2 className="text-display-md text-bone mb-6">
                On-chain{" "}
                <span className="text-gradient-signal">architecture</span>
              </h2>
              <p className="text-body-lg mb-6">
                All AUREN contracts are verified on Etherscan and follow
                ERC-4626 vault standard for maximum composability.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "ERC-4626 tokenized vault shares",
                  "Multi-asset allocation support",
                  "Guardrails-enforced agent permissions",
                  "Pausable with emergency shutdown",
                  "Upgradeable via UUPS proxy pattern",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body">
                    <Check size={16} className="text-verdant mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <OutlineButton href="#">
                  <FileText size={16} />
                  Contract Addresses
                </OutlineButton>
                <OutlineButton href="#">
                  <ExternalLink size={16} />
                  Etherscan
                </OutlineButton>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <GlassCard className="font-mono text-sm">
                <div className="text-label text-muted mb-4">Contract Architecture</div>
                <pre className="text-bone/80 overflow-x-auto text-mono-sm">
{`AUREN Protocol Contracts
├── AURENVault.sol          # ERC-4626 vault
├── StewardRegistry.sol     # Agent permissions
├── AllocationModule.sol    # Asset allocation logic
├── RiskEngine.sol          # Risk limits & guards
├── ProofOracle.sol         # Reserve verification
├── AURENToken.sol          # Governance token
├── Governor.sol            # Governance module
└── Timelock.sol            # Execution delay

Interfaces
├── IAURENVault.sol
├── ISteward.sol
├── IProofOracle.sol
└── IRiskEngine.sol`}
                </pre>
              </GlassCard>
            </FadeInWhenVisible>
          </div>
        </PageSection>

        {/* SDK & Tools */}
        <PageSection>
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>SDK & Tools</SectionLabel>
            <h2 className="text-display-md text-bone">
              Everything you need to{" "}
              <span className="text-gradient-aurum">integrate</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: "JavaScript SDK", desc: "Full-featured SDK for web and Node.js", icon: "JS" },
              { name: "Python SDK", desc: "Async Python client for data analysis", icon: "PY" },
              { name: "GraphQL API", desc: "Flexible queries for complex data needs", icon: "GQ" },
              { name: "WebSocket Feed", desc: "Real-time vault and agent updates", icon: "WS" },
            ].map((tool, i) => (
              <FadeInWhenVisible key={tool.name} delay={i * 0.1}>
                <GlassCard hover className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-surface-3 flex items-center justify-center mx-auto mb-4">
                    <span className="text-mono font-bold text-aurum">{tool.icon}</span>
                  </div>
                  <h3 className="text-heading-3 text-bone mb-2">{tool.name}</h3>
                  <p className="text-body-sm">{tool.desc}</p>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        {/* CTA */}
        <section className="section-normal">
          <div className="container-auren text-center">
            <FadeInWhenVisible>
              <h2 className="text-display-md text-bone mb-4">
                Ready to build?
              </h2>
              <p className="text-body-lg max-w-xl mx-auto mb-8">
                Join the developer community and start building with AUREN Protocol.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GlowButton size="lg" href="#">
                  Get API Key
                  <ArrowRight size={18} />
                </GlowButton>
                <OutlineButton href="#">
                  Join Discord
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
