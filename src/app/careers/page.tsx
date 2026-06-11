"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MapPin, Clock, DollarSign, Heart, Zap } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { SectionLabel, GlowButton, GlassCard, PageSection } from "@/components/ui";

function FadeInWhenVisible({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }} className={className}>
      {children}
    </motion.div>
  );
}

const openings = [
  { title: "Senior Smart Contract Engineer", department: "Engineering", location: "Remote", type: "Full-time", salary: "$180K - $250K" },
  { title: "AI/ML Engineer — Multi-Agent Systems", department: "AI Research", location: "Remote", type: "Full-time", salary: "$200K - $280K" },
  { title: "Head of Risk & Compliance", department: "Risk", location: "New York / Remote", type: "Full-time", salary: "$190K - $260K" },
  { title: "Senior Frontend Engineer", department: "Engineering", location: "Remote", type: "Full-time", salary: "$160K - $220K" },
  { title: "DeFi Protocol Researcher", department: "Research", location: "Remote", type: "Full-time", salary: "$170K - $240K" },
  { title: "Growth Lead", department: "Marketing", location: "Remote", type: "Full-time", salary: "$150K - $200K" },
];

const benefits = [
  { title: "Competitive Salary", desc: "Top-of-market compensation with $AUREN token allocation.", icon: <DollarSign size={20} /> },
  { title: "Fully Remote", desc: "Work from anywhere in the world. Async-first culture.", icon: <MapPin size={20} /> },
  { title: "Flexible Hours", desc: "No fixed schedule. Results matter, not hours logged.", icon: <Clock size={20} /> },
  { title: "Health & Wellness", desc: "Comprehensive health insurance and wellness stipend.", icon: <Heart size={20} /> },
  { title: "Learning Budget", desc: "$5,000 annual budget for courses, conferences, and books.", icon: <Zap size={20} /> },
  { title: "Token Vesting", desc: "4-year vesting with 1-year cliff. Align incentives with protocol success.", icon: <DollarSign size={20} /> },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <section className="section-normal">
          <div className="container-auren">
            <FadeInWhenVisible>
              <SectionLabel>Careers</SectionLabel>
              <h1 className="text-display-xl text-bone mb-6">
                Build the future of{" "}
                <span className="text-gradient-aurum">finance</span>
              </h1>
              <p className="text-body-lg max-w-2xl">
                Join a world-class team building autonomous asset management.
                Remote-first, mission-driven, and backed by top investors.
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        <PageSection className="bg-surface-0/30">
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>Open Positions</SectionLabel>
            <h2 className="text-display-md text-bone">
              Find your{" "}
              <span className="text-gradient-signal">role</span>
            </h2>
          </FadeInWhenVisible>

          <div className="space-y-4 max-w-4xl mx-auto">
            {openings.map((job, i) => (
              <FadeInWhenVisible key={job.title} delay={i * 0.05}>
                <GlassCard hover>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-heading-2 text-bone mb-1">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-mono-sm text-muted">
                        <span>{job.department}</span>
                        <span>·</span>
                        <span>{job.location}</span>
                        <span>·</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-mono text-aurum">{job.salary}</span>
                      <GlowButton size="sm" href="#">
                        Apply
                        <ArrowRight size={14} />
                      </GlowButton>
                    </div>
                  </div>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        <PageSection>
          <FadeInWhenVisible className="text-center mb-16">
            <SectionLabel>Benefits</SectionLabel>
            <h2 className="text-display-md text-bone">
              Why work at{" "}
              <span className="text-gradient-aurum">AUREN</span>
            </h2>
          </FadeInWhenVisible>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, i) => (
              <FadeInWhenVisible key={benefit.title} delay={i * 0.05}>
                <GlassCard hover className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface-3 mb-3 text-aurum">
                    {benefit.icon}
                  </div>
                  <h3 className="text-heading-3 text-bone mb-2">{benefit.title}</h3>
                  <p className="text-body-sm">{benefit.desc}</p>
                </GlassCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </PageSection>

        <section className="section-normal">
          <div className="container-auren text-center">
            <FadeInWhenVisible>
              <h2 className="text-display-md text-bone mb-4">
                Don't see a role that fits?
              </h2>
              <p className="text-body-lg max-w-xl mx-auto mb-8">
                We're always looking for exceptional talent. Send us your resume
                and we'll keep you in mind.
              </p>
              <GlowButton size="lg" href="#">
                Send Application
                <ArrowRight size={18} />
              </GlowButton>
            </FadeInWhenVisible>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
