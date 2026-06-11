"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MapPin, Mail, ExternalLink } from "lucide-react";
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

const team = [
  { name: "Alexandra Chen", role: "Founder & CEO", bio: "Ex-Goldman Sachs, 10+ years in structured finance. Built $2B+ in tokenized products.", avatar: "AC" },
  { name: "Marcus Rivera", role: "CTO", bio: "Former lead engineer at Chainlink. PhD in distributed systems from MIT.", avatar: "MR" },
  { name: "Sarah Kim", role: "Head of AI", bio: "Previously at DeepMind. Published 20+ papers on multi-agent systems and RL.", avatar: "SK" },
  { name: "James Okafor", role: "Head of Risk", bio: "Ex-BlackRock risk management. CFA charterholder with 15 years in asset management.", avatar: "JO" },
  { name: "Elena Volkov", role: "Head of Protocol", bio: "Former core developer at Compound. Smart contract security expert.", avatar: "EV" },
  { name: "David Park", role: "Head of Growth", bio: "Scaled DeFi protocols from $10M to $1B+ TVL. Previously at Aave and Uniswap.", avatar: "DP" },
];

const values = [
  { title: "Transparency First", desc: "Every decision, every allocation, every proof — on-chain and verifiable. No black boxes.", icon: "🔍" },
  { title: "Autonomy with Guardrails", desc: "Agents operate freely within strict risk limits. Freedom bounded by safety.", icon: "🛡" },
  { title: "Real Assets, Real Yield", desc: "No token inflation, no unsustainable APY. Yield comes from real economic activity.", icon: "🏛" },
  { title: "Community Governed", desc: "Protocol decisions are made by $AUREN holders. No corporate overlords.", icon: "🗳" },
];

const milestones = [
  { date: "Q4 2025", title: "AUREN Founded", desc: "Team assembled, initial concept validated, seed funding secured." },
  { date: "Q1 2026", title: "Testnet Launch", desc: "Steward agents deployed on testnet. First autonomous portfolio management." },
  { date: "Q2 2026", title: "Mainnet Beta", desc: "Limited mainnet launch with Treasury and Private Credit vaults." },
  { date: "Q3 2026", title: "Full Launch", desc: "All asset classes live. Governance token launch. Cross-chain expansion." },
  { date: "Q4 2026", title: "Scale", desc: "Target $500M TVL. Institutional partnerships. Layer 2 expansion." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-normal">
          <div className="container-auren">
            <FadeInWhenVisible>
              <SectionLabel>About AUREN</SectionLabel>
              <h1 className="text-display-xl text-bone mb-6">
                Building the future of{" "}
                <span className="text-gradient-aurum">asset management</span>
              </h1>
              <p className="text-body-lg max-w-2xl">
                We believe capital should work autonomously, transparently, and
                efficiently. AUREN is the protocol that makes it possible.
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Manifesto */}
        <PageSection className="bg-surface-0/30">
          <FadeInWhenVisible className="max-w-4xl mx-auto text-center">
            <SectionLabel>Our Manifesto</SectionLabel>
            <blockquote className="text-display-lg text-bone leading-tight mb-8">
              &ldquo;Money was designed to work.
              <br />
              But until now it has only been{" "}
              <span className="text-gradient-aurum">waiting</span>.&rdquo;
            </blockquote>
            <div className="text-body-lg max-w-2xl mx-auto space-y-4 text-left">
              <p>
                For centuries, asset management has been a human endeavor — slow,
                expensive, and opaque. Billions sit idle in accounts, pools, and
                portfolios, waiting for someone to make a decision.
              </p>
              <p>
                AUREN changes this. We deploy autonomous AI agents — Stewards —
                that manage real-world assets 24/7. They analyze, allocate,
                rebalance, and verify. Every decision is recorded on-chain.
                Every proof is verifiable.
              </p>
              <p>
                This is not just DeFi 2.0. This is the next evolution of asset
                management. Capital that thinks. Capital that works. Capital
                that proves.
              </p>
            </div>
          </FadeInWhenVisible>
        </PageSection>

        {/* Values */}
        <PageSection>
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="text-display-md text-bone">
              What we{" "}
              <span className="text-gradient-signal">stand for</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <FadeInWhenVisible key={value.title} delay={i * 0.1}>
                <GlassCard hover>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl shrink-0">{value.icon}</div>
                    <div>
                      <h3 className="text-heading-2 text-bone mb-2">{value.title}</h3>
                      <p className="text-body">{value.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        {/* Team */}
        <PageSection className="bg-surface-0/30">
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>Team</SectionLabel>
            <h2 className="text-display-md text-bone">
              The people behind{" "}
              <span className="text-gradient-aurum">AUREN</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <FadeInWhenVisible key={member.name} delay={i * 0.05}>
                <GlassCard hover className="text-center">
                  <div className="w-16 h-16 rounded-full bg-surface-3 flex items-center justify-center mx-auto mb-4">
                    <span className="text-heading-3 text-aurum font-mono">{member.avatar}</span>
                  </div>
                  <h3 className="text-heading-3 text-bone mb-1">{member.name}</h3>
                  <p className="text-mono text-aurum mb-3">{member.role}</p>
                  <p className="text-body-sm">{member.bio}</p>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        {/* Roadmap */}
        <PageSection>
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>Roadmap</SectionLabel>
            <h2 className="text-display-md text-bone">
              Where we're{" "}
              <span className="text-gradient-signal">headed</span>
            </h2>
          </FadeInWhenVisible>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, i) => (
              <FadeInWhenVisible key={milestone.title} delay={i * 0.1}>
                <div className="flex gap-6 mb-8 last:mb-0">
                  <div className="shrink-0 w-24 text-right">
                    <span className="text-mono text-aurum">{milestone.date}</span>
                  </div>
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-aurum mt-1.5" />
                    {i < milestones.length - 1 && (
                      <div className="absolute top-4 left-1.5 w-px h-full bg-border-primary" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-heading-3 text-bone mb-1">{milestone.title}</h3>
                    <p className="text-body-sm">{milestone.desc}</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        {/* Careers */}
        <PageSection className="bg-surface-0/30">
          <FadeInWhenVisible className="text-center">
            <SectionLabel>Careers</SectionLabel>
            <h2 className="text-display-md text-bone mb-4">
              Join the team
            </h2>
            <p className="text-body-lg max-w-xl mx-auto mb-8">
              We're looking for exceptional engineers, researchers, and
              builders who share our vision of autonomous finance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton size="lg" href="#">
                View Open Positions
                <ArrowRight size={18} />
              </GlowButton>
              <OutlineButton href="#">
                <Mail size={16} />
                Contact Us
              </OutlineButton>
            </div>
          </FadeInWhenVisible>
        </PageSection>
      </main>
      <Footer />
    </>
  );
}
