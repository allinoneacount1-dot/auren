"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpen, FileText, HelpCircle, Search, Calendar, User, Tag, ChevronRight } from "lucide-react";
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

const blogPosts = [
  {
    title: "Introducing AUREN: Autonomous Capital for Real-World Assets",
    excerpt: "Why we built AUREN, how Steward agents work, and what autonomous asset management means for DeFi.",
    date: "Mar 15, 2026",
    author: "AUREN Team",
    category: "Announcement",
    readTime: "8 min",
  },
  {
    title: "How Steward Agents Make Decisions: A Technical Deep Dive",
    excerpt: "Inside the decision-making process of Allocator, Risk Sentinel, Rebalancer, and Auditor agents.",
    date: "Mar 22, 2026",
    author: "Engineering",
    category: "Technical",
    readTime: "12 min",
  },
  {
    title: "Proof-of-Reserve: Why On-Chain Verification Matters",
    excerpt: "How AUREN uses Chainlink oracles to provide real-time proof-of-reserve for all managed assets.",
    date: "Apr 2, 2026",
    author: "Security Team",
    category: "Security",
    readTime: "6 min",
  },
  {
    title: "RWA Tokenization: The Bridge Between TradFi and DeFi",
    excerpt: "Understanding how real-world assets are tokenized and brought on-chain for transparent management.",
    date: "Apr 10, 2026",
    author: "Research",
    category: "Research",
    readTime: "10 min",
  },
  {
    title: "Governance Roadmap: What's Coming to AUREN DAO",
    excerpt: "Upcoming governance features, treasury management, and community-driven protocol evolution.",
    date: "Apr 18, 2026",
    author: "Governance",
    category: "Governance",
    readTime: "5 min",
  },
  {
    title: "Agent Security: How AUREN Prevents Rogue Agents",
    excerpt: "The multi-layer security model that ensures Steward agents operate within strict guardrails.",
    date: "May 1, 2026",
    author: "Security Team",
    category: "Security",
    readTime: "9 min",
  },
];

const faqItems = [
  {
    q: "What is AUREN Protocol?",
    a: "AUREN is an agentic RWA (Real-World Asset) management protocol. It uses autonomous AI agents called Stewards to manage tokenized real-world assets — Treasuries, private credit, real estate, and commodities — 24/7 on-chain.",
  },
  {
    q: "How do Steward agents work?",
    a: "Four specialized AI agents — Allocator, Risk Sentinel, Rebalancer, and Auditor — work together to manage portfolios. They analyze data, make allocation decisions, monitor risk, and verify proof-of-reserve. Every decision is recorded on-chain.",
  },
  {
    q: "What assets does AUREN manage?",
    a: "AUREN currently manages four asset classes: Tokenized Treasuries, Private Credit, Real Estate, and Commodities. Each asset is tokenized, verified, and custodied by regulated third parties.",
  },
  {
    q: "Is my deposit safe?",
    a: "AUREN uses multiple security layers: smart contract guardrails that agents cannot bypass, real-time proof-of-reserve verification, regulated custodians, and continuous audits by CertiK and OpenZeppelin.",
  },
  {
    q: "What are the fees?",
    a: "AUREN charges a 0.5% annual management fee on deposited assets. There are no deposit or withdrawal fees. Performance fees may apply to certain vault strategies.",
  },
  {
    q: "How do I withdraw?",
    a: "Deposits are flexible with no lock-up period. You can withdraw at any time through the dashboard. Withdrawals are processed within 1-2 block confirmations.",
  },
  {
    q: "What is the $AUREN token?",
    a: "$AUREN is the governance token of the protocol. Holders can propose and vote on protocol changes, stake to earn a share of protocol fees, and participate in treasury management.",
  },
  {
    q: "Which chains does AUREN support?",
    a: "AUREN currently operates on Ethereum mainnet with plans to expand to Arbitrum, Base, and Solana via Chainlink CCIP integration.",
  },
];

const glossaryTerms = [
  { term: "RWA", definition: "Real-World Assets — physical or financial assets (Treasuries, credit, real estate, commodities) that are tokenized and brought on-chain." },
  { term: "Steward", definition: "An autonomous AI agent that manages a specific aspect of the AUREN portfolio — allocation, risk, rebalancing, or auditing." },
  { term: "NAV", definition: "Net Asset Value — the total value of all assets held in an AUREN vault, calculated in real-time." },
  { term: "ERC-4626", definition: "An Ethereum standard for tokenized vaults. AUREN vaults follow this standard for maximum DeFi composability." },
  { term: "Proof-of-Reserve", definition: "On-chain verification that the assets backing AUREN tokens exist and are held by regulated custodians." },
  { term: "AIP", definition: "AUREN Improvement Proposal — a formal proposal for changes to the protocol, voted on by $AUREN holders." },
  { term: "TVL", definition: "Total Value Locked — the total amount of assets deposited in AUREN vaults." },
  { term: "Drift", definition: "The deviation from target asset allocation. When drift exceeds 0.5%, the Rebalancer agent triggers a rebalance." },
];

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-normal">
          <div className="container-auren">
            <FadeInWhenVisible>
              <SectionLabel>Resources</SectionLabel>
              <h1 className="text-display-xl text-bone mb-6">
                Learn about{" "}
                <span className="text-gradient-aurum">AUREN</span>
              </h1>
              <p className="text-body-lg max-w-2xl">
                Research, guides, FAQs, and everything you need to understand
                autonomous asset management.
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Blog */}
        <PageSection className="bg-surface-0/30">
          <FadeInWhenVisible className="mb-12">
            <SectionLabel>Research & Blog</SectionLabel>
            <h2 className="text-display-md text-bone">
              Latest{" "}
              <span className="text-gradient-signal">insights</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <FadeInWhenVisible key={post.title} delay={i * 0.05}>
                <GlassCard hover className="h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-mono-sm bg-aurum/10 text-aurum">{post.category}</span>
                    <span className="text-mono-sm text-muted">{post.readTime} read</span>
                  </div>
                  <h3 className="text-heading-3 text-bone mb-2 group-hover:text-aurum transition-colors">{post.title}</h3>
                  <p className="text-body-sm mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border-primary">
                    <div className="flex items-center gap-2">
                      <span className="text-mono-sm text-muted">{post.date}</span>
                      <span className="text-muted">·</span>
                      <span className="text-mono-sm text-muted">{post.author}</span>
                    </div>
                    <ChevronRight size={16} className="text-aurum" />
                  </div>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        {/* FAQ */}
        <PageSection>
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-display-md text-bone">
              Frequently asked{" "}
              <span className="text-gradient-aurum">questions</span>
            </h2>
          </FadeInWhenVisible>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, i) => (
              <FadeInWhenVisible key={item.q} delay={i * 0.03}>
                <GlassCard>
                  <h3 className="text-heading-3 text-bone mb-3">{item.q}</h3>
                  <p className="text-body">{item.a}</p>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        {/* Glossary */}
        <PageSection className="bg-surface-0/30">
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>Glossary</SectionLabel>
            <h2 className="text-display-md text-bone">
              Key{" "}
              <span className="text-gradient-signal">terms</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {glossaryTerms.map((item, i) => (
              <FadeInWhenVisible key={item.term} delay={i * 0.03}>
                <GlassCard hover>
                  <dt className="text-heading-3 text-aurum font-mono mb-2">{item.term}</dt>
                  <dd className="text-body-sm">{item.definition}</dd>
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
                Still have questions?
              </h2>
              <p className="text-body-lg max-w-xl mx-auto mb-8">
                Join our community or reach out to the team directly.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GlowButton size="lg" href="#">
                  Join Discord
                  <ArrowRight size={18} />
                </GlowButton>
                <OutlineButton href="/docs">
                  Read Docs
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
