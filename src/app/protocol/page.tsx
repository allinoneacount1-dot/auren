"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Zap, ChevronRight, ExternalLink, Check, Code, Server, Eye, Lock } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { SectionLabel, GlowButton, OutlineButton, GlassCard, PageSection } from "@/components/ui";

function FadeInWhenVisible({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ProtocolPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        {/* Hero */}
        <section className="section-normal">
          <div className="container-auren">
            <FadeInWhenVisible>
              <SectionLabel>Protocol</SectionLabel>
              <h1 className="text-display-xl text-bone mb-6">
                How{" "}
                <span className="text-gradient-aurum">AUREN</span>{" "}
                works
              </h1>
              <p className="text-body-lg max-w-2xl">
                A layered architecture connecting autonomous AI agents with
                real-world assets — on-chain, transparent, and provable.
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* How it Works */}
        <PageSection className="bg-surface-0/30">
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-display-md text-bone">
              From deposit to{" "}
              <span className="text-gradient-signal">yield</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Deposit", desc: "Deposit assets into the AUREN Vault through the interface or smart contract.", icon: "💰" },
              { step: "02", title: "Allocate", desc: "Allocator agent analyzes and determines optimal allocation across RWA classes.", icon: "🎯" },
              { step: "03", title: "Manage", desc: "Stewards monitor, rebalance, and guard the portfolio 24/7 autonomously.", icon: "⚙" },
              { step: "04", title: "Prove", desc: "Every decision is recorded on-chain. Proof-of-reserve verified in real-time.", icon: "🔎" },
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
        <PageSection id="vault">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInWhenVisible>
              <SectionLabel>The Vault</SectionLabel>
              <h2 className="text-display-md text-bone mb-6">
                ERC-4626 Vault{" "}
                <span className="text-gradient-aurum">Protocol</span>
              </h2>
              <p className="text-body-lg mb-6">
                Every AUREN vault follows the ERC-4626 standard — yield-bearing
                tokens that are composable, transparent, and auditable.
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
                Read Technical Specs
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
              Verifiable{" "}
              <span className="text-gradient-signal">trust</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Not promises. Proof. Every asset, every decision, every second
              — recorded and verifiable.
            </p>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Proof-of-Reserve", desc: "Real-time asset reserve verification through Chainlink oracles. 100%+ ratio at all times.", icon: <Shield size={24} />, color: "text-verdant" },
              { title: "Audit Trail", desc: "Every agent decision — allocation, rebalance, protection — recorded on-chain and traceable.", icon: <Eye size={24} />, color: "text-signal" },
              { title: "Custodian Verification", desc: "Regulated custodians verify physical asset ownership on a regular basis.", icon: <Lock size={24} />, color: "text-aurum" },
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

        {/* Architecture */}
        <PageSection>
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>System Architecture</SectionLabel>
            <h2 className="text-display-md text-bone">
              Layered{" "}
              <span className="text-gradient-aurum">design</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { layer: "L1", title: "Client", desc: "Web App & Agent Console", icon: "🖥" },
              { layer: "L2", title: "API / BFF", desc: "Auth, Indexer, GraphQL", icon: "🔌" },
              { layer: "L3", title: "Agent Layer", desc: "Steward Engine", icon: "🧠" },
              { layer: "L4", title: "Smart Contracts", desc: "Vault, Token, Governance", icon: "📜" },
              { layer: "L5", title: "RWA Bridge", desc: "Oracles & Custodians", icon: "🌉" },
            ].map((item, i) => (
              <FadeInWhenVisible key={item.layer} delay={i * 0.1}>
                <GlassCard hover className="text-center">
                  <div className="text-mono text-aurum mb-2">{item.layer}</div>
                  <div className="text-xl mb-2">{item.icon}</div>
                  <h3 className="text-heading-3 text-bone mb-1">{item.title}</h3>
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
                Ready to start with AUREN?
              </h2>
              <p className="text-body-lg max-w-xl mx-auto mb-8">
                Open a vault, deposit assets, and let Stewards work.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GlowButton size="lg" href="/dashboard">
                  Open Vault
                  <ArrowRight size={18} />
                </GlowButton>
                <OutlineButton href="/docs">
                  Documentation
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
