"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════
   AUREN COMPONENT LIBRARY
   ═══════════════════════════════════════════ */

/* ── Section Label ── */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-label text-aurum mb-4 block">
      {children}
    </span>
  );
}

/* ── Glow Button (Primary CTA) ── */
export function GlowButton({
  children,
  onClick,
  href,
  size = "md",
  className = "",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}) {
  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-3.5 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    bg-aurum text-obsidian font-semibold
    rounded-lg
    shadow-glow-aurum
    hover:shadow-[0_0_30px_rgba(200,162,75,0.25)]
    hover:bg-[#D4B05A]
    active:scale-[0.98]
    transition-all duration-200
    ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
    ${sizeClasses[size]}
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}

/* ── Outline Button (Secondary CTA) ── */
export function OutlineButton({
  children,
  onClick,
  href,
  className = "",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
}) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    border border-border-secondary text-bone
    px-8 py-3.5 text-base font-medium
    rounded-lg
    hover:border-aurum hover:text-aurum
    active:scale-[0.98]
    transition-all duration-200
    ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
    ${className}
  `;

  if (href) {
    return <a href={href} className={baseClasses}>{children}</a>;
  }

  return <button onClick={onClick} className={baseClasses}>{children}</button>;
}

/* ── Glass Card ── */
export function GlassCard({
  children,
  className = "",
  hover = false,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div
      className={`
        glass-card p-6
        ${hover ? "aurum-hover cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Live Counter (animated number) ── */
export function LiveCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(value);

  useEffect(() => {
    const start = ref.current;
    const end = value;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
      const current = start + (end - start) * eased;
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(animate);
      else ref.current = end;
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ── Agent Log Stream ── */
const agentLogs = [
  { time: "14:32:07", agent: "Allocator", action: "Rebalanced Treasury allocation +2.3%", type: "action" },
  { time: "14:31:45", agent: "Risk Sentinel", action: "Drawdown limit check — all clear", type: "ok" },
  { time: "14:31:22", agent: "Rebalancer", action: "Trimmed Real Estate exposure -1.1%", type: "action" },
  { time: "14:30:58", agent: "Auditor", action: "Proof-of-reserve verified — 100.2%", type: "ok" },
  { time: "14:30:12", agent: "Allocator", action: "Deployed $240K to Private Credit pool", type: "action" },
  { time: "14:29:45", agent: "Risk Sentinel", action: "New asset whitelisted — tokenized T-Bills", type: "info" },
  { time: "14:29:01", agent: "Rebalancer", action: "Auto-rebalance triggered — drift > 0.5%", type: "action" },
  { time: "14:28:33", agent: "Auditor", action: "On-chain verification complete", type: "ok" },
];

export function AgentLogStream() {
  const [logs, setLogs] = useState(agentLogs.slice(0, 4));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let idx = 4;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, agentLogs[idx % agentLogs.length]];
        return next.slice(-5);
      });
      idx++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="space-y-1 font-mono-sm">
      <AnimatePresence initial={false}>
        {logs.map((log, i) => (
          <motion.div
            key={`${log.time}-${i}`}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-3 py-1.5 border-b border-border-primary/50"
          >
            <span className="text-muted shrink-0">{log.time}</span>
            <span
              className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                log.type === "ok"
                  ? "bg-verdant/10 text-verdant"
                  : log.type === "info"
                  ? "bg-signal/10 text-signal"
                  : "bg-aurum/10 text-aurum"
              }`}
            >
              {log.agent}
            </span>
            <span className="text-bone/70 truncate">{log.action}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ── Proof Badge ── */
export function ProofBadge({ label = "Verified on-chain" }: { label?: string }) {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-verdant/20 bg-verdant/5 hover:bg-verdant/10 transition-colors group"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-verdant animate-pulse-glow" />
      <span className="text-mono-sm text-verdant group-hover:underline">{label}</span>
    </a>
  );
}

/* ── Stat Marquee Item ── */
export function StatItem({
  label,
  value,
  prefix = "",
  suffix = "",
}: {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-4 px-6 shrink-0">
      <div>
        <div className="text-mono-sm text-muted mb-0.5">{label}</div>
        <div className="text-heading-2 text-bone font-mono tabular-nums">
          {prefix}{value}{suffix}
        </div>
      </div>
      <div className="w-px h-10 bg-border-secondary" />
    </div>
  );
}

/* ── Live Vault Card ── */
export function LiveVaultCard() {
  const [nav, setNav] = useState(48.7);
  const [apy, setApy] = useState(7.23);

  useEffect(() => {
    const interval = setInterval(() => {
      setNav((v) => +(v + (Math.random() - 0.48) * 0.05).toFixed(2));
      setApy((v) => +(v + (Math.random() - 0.5) * 0.01).toFixed(2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card-elevated p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-label text-signal">● LIVE VAULT</span>
        <span className="text-mono-sm text-muted">Updated 2s ago</span>
      </div>

      <div>
        <div className="text-mono-sm text-clay mb-0.5">Net Asset Value</div>
        <div className="flex items-baseline gap-2">
          <span className="text-display-md text-bone font-mono tabular-nums">
            ${nav.toFixed(2)}M
          </span>
          <span className="text-verdant text-mono-sm">+2.4% (7d)</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "APY", value: `${apy.toFixed(2)}%` },
          { label: "Assets", value: "4" },
          { label: "Uptime", value: "99.97%" },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-mono-sm text-muted mb-0.5">{stat.label}</div>
            <div className="text-heading-3 text-bone font-mono">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <div className="text-mono-sm text-muted">Allocation</div>
        {[
          { name: "Treasury", pct: 35, color: "bg-aurum" },
          { name: "Private Credit", pct: 28, color: "bg-signal" },
          { name: "Real Estate", pct: 22, color: "bg-verdant" },
          { name: "Commodities", pct: 15, color: "bg-ember" },
        ].map((a) => (
          <div key={a.name} className="flex items-center gap-2">
            <div className="w-20 text-mono-sm text-clay">{a.name}</div>
            <div className="flex-1 h-1 bg-surface-3 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${a.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${a.pct}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
              />
            </div>
            <div className="w-10 text-right text-mono-sm text-bone">{a.pct}%</div>
          </div>
        ))}
      </div>

      <div className="border-t border-border-primary pt-3">
        <div className="text-mono-sm text-muted mb-1.5">Agent Activity</div>
        <AgentLogStream />
      </div>
    </div>
  );
}

/* ── Steward Card ── */
export function StewardCard({
  name,
  role,
  description,
  icon,
  status,
}: {
  name: string;
  role: string;
  description: string;
  icon: ReactNode;
  status: "active" | "monitoring" | "executing";
}) {
  const statusColors = {
    active: "bg-verdant text-verdant",
    monitoring: "bg-signal text-signal",
    executing: "bg-aurum text-aurum",
  };

  return (
    <GlassCard hover className="group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-surface-3 flex items-center justify-center text-xl">
          {icon}
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${statusColors[status]}`}>
          ● {status.toUpperCase()}
        </span>
      </div>
      <h3 className="text-heading-3 text-bone mb-1">{name}</h3>
      <p className="text-mono text-aurum mb-3">{role}</p>
      <p className="text-body-sm">{description}</p>
    </GlassCard>
  );
}

/* ── Asset Tile ── */
export function AssetTile({
  name,
  yield: yieldPct,
  risk,
  tvl,
  category,
}: {
  name: string;
  yield: number;
  risk: "Low" | "Medium" | "High";
  tvl: string;
  category: string;
}) {
  const riskColors = {
    Low: "text-verdant bg-verdant/10",
    Medium: "text-ember bg-ember/10",
    High: "text-red-400 bg-red-400/10",
  };

  return (
    <GlassCard hover className="group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-heading-3 text-bone group-hover:text-aurum transition-colors">
            {name}
          </h3>
          <span className="text-mono-sm text-muted">{category}</span>
        </div>
        <span className={`px-2 py-0.5 rounded text-mono-sm font-medium ${riskColors[risk]}`}>
          {risk}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-mono-sm text-muted">Yield</div>
          <div className="text-heading-3 text-verdant font-mono">{yieldPct}%</div>
        </div>
        <div>
          <div className="text-mono-sm text-muted">TVL</div>
          <div className="text-heading-3 text-bone font-mono">{tvl}</div>
        </div>
      </div>
    </GlassCard>
  );
}

/* ── Trust Strip Item ── */
export function TrustItem({
  name,
  description,
  verified = true,
}: {
  name: string;
  description: string;
  verified?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-r border-border-primary last:border-r-0">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-heading-3 text-bone">{name}</span>
          {verified && <span className="text-verdant text-sm">✓</span>}
        </div>
        <span className="text-mono-sm text-muted">{description}</span>
      </div>
    </div>
  );
}

/* ── Page Section Wrapper ── */
export function PageSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section-normal ${className}`}>
      <div className="container-auren">{children}</div>
    </section>
  );
}
