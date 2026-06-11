"use client";

import { Navbar, Footer } from "@/components/layout";
import { PageSection } from "@/components/ui";

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="section-normal">
          <div className="container-auren">
            <h1 className="text-display-xl text-bone mb-6">Legal</h1>
            <p className="text-body-lg max-w-2xl mb-12">
              Terms, policies, and legal documentation for AUREN Protocol.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {[
                { title: "Terms of Service", desc: "Rules and conditions for using AUREN Protocol.", date: "Last updated: Jan 2026" },
                { title: "Privacy Policy", desc: "How we collect, use, and protect your data.", date: "Last updated: Jan 2026" },
                { title: "Cookie Policy", desc: "Information about cookies and tracking technologies used.", date: "Last updated: Jan 2026" },
                { title: "Risk Disclosure", desc: "Risks associated with using decentralized finance protocols.", date: "Last updated: Feb 2026" },
                { title: "Tokenomics", desc: "$AUREN token distribution, utility, and governance rights.", date: "Last updated: Mar 2026" },
                { title: "Compliance", desc: "Regulatory compliance framework and jurisdiction information.", date: "Last updated: Jan 2026" },
              ].map((doc) => (
                <a key={doc.title} href="#" className="glass-card p-6 aurum-hover group block">
                  <h3 className="text-heading-3 text-bone mb-2 group-hover:text-aurum transition-colors">{doc.title}</h3>
                  <p className="text-body-sm mb-3">{doc.desc}</p>
                  <span className="text-mono-sm text-muted">{doc.date}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
