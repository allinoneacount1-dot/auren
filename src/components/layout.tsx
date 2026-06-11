"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GlowButton, ProofBadge } from "./ui";
import { CommandPalette } from "./command-palette";

const navLinks = [
  { label: "Protocol", href: "/protocol" },
  { label: "Assets", href: "/assets" },
  { label: "Trust", href: "/trust" },
  { label: "Agents", href: "/agents" },
  { label: "Governance", href: "/governance" },
  { label: "Docs", href: "/docs" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-primary bg-obsidian/80 backdrop-blur-xl">
      <div className="container-auren">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-aurum flex items-center justify-center">
              <span className="text-obsidian font-bold text-sm">A</span>
            </div>
            <span className="text-heading-3 text-bone tracking-tight">
              AUREN
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-clay hover:text-bone transition-colors rounded-lg hover:bg-surface-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Search + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <CommandPalette />
            <div className="hidden md:block">
              <GlowButton size="sm" href="/dashboard">
                Open Vault
              </GlowButton>
            </div>
            <button
              className="md:hidden p-2 text-clay hover:text-bone transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border-primary bg-obsidian/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="container-auren py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 text-bone hover:bg-surface-2 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 px-4">
                <GlowButton href="/dashboard" className="w-full">
                  Open Vault
                </GlowButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border-primary bg-surface-0">
      <div className="container-auren">
        {/* Main footer */}
        <div className="py-8 grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-aurum flex items-center justify-center">
                <span className="text-obsidian font-bold text-xs">A</span>
              </div>
              <span className="text-heading-3 text-bone">AUREN</span>
            </div>
            <p className="text-body-sm mb-3">
              Autonomous capital for real-world assets.
            </p>
            <ProtocolStatusBadge />
          </div>

          <div>
            <h4 className="text-label text-muted mb-3">Protocol</h4>
            <ul className="space-y-1.5">
              {[
                { label: "How it Works", href: "/protocol" },
                { label: "The Vault", href: "/protocol#vault" },
                { label: "Proof Layer", href: "/trust" },
                { label: "Agents", href: "/agents" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-body-sm hover:text-aurum transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-label text-muted mb-3">Assets</h4>
            <ul className="space-y-1.5">
              {[
                { label: "Treasuries", href: "/assets" },
                { label: "Private Credit", href: "/assets" },
                { label: "Real Estate", href: "/assets" },
                { label: "Commodities", href: "/assets" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-body-sm hover:text-aurum transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-label text-muted mb-3">Community</h4>
            <ul className="space-y-1.5">
              {[
                { label: "Governance", href: "/governance" },
                { label: "Docs", href: "/docs" },
                { label: "Resources", href: "/resources" },
                { label: "Careers", href: "/careers" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-body-sm hover:text-aurum transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-label text-muted mb-3">Company</h4>
            <ul className="space-y-1.5">
              {[
                { label: "About", href: "/about" },
                { label: "Legal", href: "/legal" },
                { label: "Twitter", href: "#" },
                { label: "Discord", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-body-sm hover:text-aurum transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-4 border-t border-border-primary flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-mono-sm text-muted">
            © 2026 AUREN Protocol. All rights reserved.
          </span>
          <div className="flex items-center gap-3">
            {["Twitter", "GitHub", "Discord"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-mono-sm text-muted hover:text-aurum transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function ProtocolStatusBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-mono-sm text-verdant">
      <span className="w-1.5 h-1.5 rounded-full bg-verdant animate-pulse-glow" />
      Protocol Active
    </span>
  );
}
