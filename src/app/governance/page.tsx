"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Users, Vote, Coins, Clock, CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react";
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

const proposals = [
  {
    id: "AIP-001",
    title: "Add Carbon Credits as supported asset class",
    status: "active" as const,
    votes: { for: 12400000, against: 2100000, abstain: 500000 },
    quorum: 10000000,
    endsIn: "2d 14h",
    description: "Proposal to whitelist tokenized carbon credits from Verra and Gold Standard registries as a new RWA class.",
  },
  {
    id: "AIP-002",
    title: "Reduce vault management fee from 0.5% to 0.35%",
    status: "passed" as const,
    votes: { for: 18200000, against: 4300000, abstain: 800000 },
    quorum: 10000000,
    endsIn: "Ended",
    description: "Proposal to reduce the annual management fee to remain competitive with other RWA protocols.",
  },
  {
    id: "AIP-003",
    title: "Integrate Chainlink CCIP for cross-chain vault access",
    status: "passed" as const,
    votes: { for: 21500000, against: 1200000, abstain: 300000 },
    quorum: 10000000,
    endsIn: "Ended",
    description: "Proposal to integrate Chainlink CCIP for cross-chain deposit and withdrawal capabilities.",
  },
  {
    id: "AIP-004",
    title: "Allocator risk limit increase — per asset cap from 35% to 45%",
    status: "defeated" as const,
    votes: { for: 6200000, against: 9800000, abstain: 1100000 },
    quorum: 10000000,
    endsIn: "Ended",
    description: "Proposal to increase single-asset exposure limit to allow higher concentration in high-yield assets.",
  },
  {
    id: "AIP-005",
    title: "Establish AUREN Grants Program — 500K $AUREN allocation",
    status: "active" as const,
    votes: { for: 8900000, against: 3200000, abstain: 900000 },
    quorum: 10000000,
    endsIn: "5d 8h",
    description: "Proposal to create a grants program for developers building on AUREN Protocol.",
  },
];

export default function GovernancePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-normal">
          <div className="container-auren">
            <FadeInWhenVisible>
              <SectionLabel>Governance</SectionLabel>
              <h1 className="text-display-xl text-bone mb-6">
                Governed by{" "}
                <span className="text-gradient-aurum">holders</span>
              </h1>
              <p className="text-body-lg max-w-2xl">
                AUREN Protocol is governed by $AUREN token holders. Propose, vote,
                and shape the future of autonomous asset management.
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Stats */}
        <PageSection className="bg-surface-0/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Proposals", value: "12", icon: <Vote size={20} /> },
              { label: "Active Voters", value: "3,847", icon: <Users size={20} /> },
              { label: "$AUREN Staked", value: "24.2M", icon: <Coins size={20} /> },
              { label: "Treasury", value: "$8.4M", icon: <Coins size={20} /> },
            ].map((stat, i) => (
              <FadeInWhenVisible key={stat.label} delay={i * 0.1}>
                <GlassCard className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface-3 mb-3 text-aurum">
                    {stat.icon}
                  </div>
                  <div className="text-mono-sm text-muted mb-1">{stat.label}</div>
                  <div className="text-heading-2 text-bone font-mono">{stat.value}</div>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        {/* Proposals */}
        <PageSection>
          <FadeInWhenVisible className="mb-12">
            <SectionLabel>Proposals</SectionLabel>
            <h2 className="text-display-md text-bone">
              Active & recent{" "}
              <span className="text-gradient-signal">proposals</span>
            </h2>
          </FadeInWhenVisible>

          <div className="space-y-4">
            {proposals.map((proposal, i) => {
              const totalVotes = proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
              const forPct = totalVotes > 0 ? (proposal.votes.for / totalVotes) * 100 : 0;
              const againstPct = totalVotes > 0 ? (proposal.votes.against / totalVotes) * 100 : 0;
              const quorumPct = Math.min((totalVotes / proposal.quorum) * 100, 100);

              return (
                <FadeInWhenVisible key={proposal.id} delay={i * 0.05}>
                  <GlassCard hover>
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Left: Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-mono text-muted">{proposal.id}</span>
                          <span className={`px-2 py-0.5 rounded text-mono-sm font-medium ${
                            proposal.status === "active" ? "bg-signal/10 text-signal" :
                            proposal.status === "passed" ? "bg-verdant/10 text-verdant" :
                            "bg-ember/10 text-ember"
                          }`}>
                            {proposal.status === "active" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal mr-1 animate-pulse-glow" />}
                            {proposal.status.toUpperCase()}
                          </span>
                          {proposal.status === "active" && (
                            <span className="text-mono-sm text-muted flex items-center gap-1">
                              <Clock size={12} /> Ends in {proposal.endsIn}
                            </span>
                          )}
                        </div>
                        <h3 className="text-heading-2 text-bone mb-2">{proposal.title}</h3>
                        <p className="text-body-sm">{proposal.description}</p>
                      </div>

                      {/* Right: Votes */}
                      <div className="lg:w-64 shrink-0 space-y-3">
                        {/* For/Against bar */}
                        <div>
                          <div className="flex justify-between text-mono-sm mb-1">
                            <span className="text-verdant">For: {(proposal.votes.for / 1000000).toFixed(1)}M</span>
                            <span className="text-ember">Against: {(proposal.votes.against / 1000000).toFixed(1)}M</span>
                          </div>
                          <div className="h-2 bg-surface-3 rounded-full overflow-hidden flex">
                            <div className="h-full bg-verdant rounded-l-full" style={{ width: `${forPct}%` }} />
                            <div className="h-full bg-ember" style={{ width: `${againstPct}%` }} />
                          </div>
                        </div>

                        {/* Quorum */}
                        <div>
                          <div className="flex justify-between text-mono-sm mb-1">
                            <span className="text-muted">Quorum</span>
                            <span className={quorumPct >= 100 ? "text-verdant" : "text-aurum"}>{quorumPct.toFixed(0)}%</span>
                          </div>
                          <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${quorumPct >= 100 ? "bg-verdant" : "bg-aurum"}`} style={{ width: `${quorumPct}%` }} />
                          </div>
                        </div>

                        {proposal.status === "active" && (
                          <div className="flex gap-2 pt-2">
                            <button className="flex-1 px-3 py-2 rounded-lg bg-verdant/10 text-verdant text-sm font-medium hover:bg-verdant/20 transition-colors">
                              Vote For
                            </button>
                            <button className="flex-1 px-3 py-2 rounded-lg bg-ember/10 text-ember text-sm font-medium hover:bg-ember/20 transition-colors">
                              Vote Against
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </FadeInWhenVisible>
              );
            })}
          </div>
        </PageSection>

        {/* How Governance Works */}
        <PageSection className="bg-surface-0/30">
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-display-md text-bone">
              From proposal to{" "}
              <span className="text-gradient-aurum">execution</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Proposal", desc: "Any holder with 100K+ $AUREN can submit a proposal for consideration.", icon: "📝" },
              { step: "02", title: "Discussion", desc: "7-day discussion period for community feedback and debate.", icon: "💬" },
              { step: "03", title: "Voting", desc: "5-day voting period. Quorum of 10M tokens required.", icon: "🗳" },
              { step: "04", title: "Execution", desc: "Passed proposals execute via Timelock after 48-hour delay.", icon: "⚡" },
            ].map((item, i) => (
              <FadeInWhenVisible key={item.step} delay={i * 0.1}>
                <GlassCard hover className="text-center">
                  <div className="text-mono text-aurum mb-3">{item.step}</div>
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-heading-3 text-bone mb-2">{item.title}</h3>
                  <p className="text-body-sm">{item.desc}</p>
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
                Have an idea for AUREN?
              </h2>
              <p className="text-body-lg max-w-xl mx-auto mb-8">
                Submit a proposal and let the community decide the future of the protocol.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GlowButton size="lg" href="#">
                  Submit Proposal
                  <ArrowRight size={18} />
                </GlowButton>
                <OutlineButton href="/docs">
                  Governance Docs
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
