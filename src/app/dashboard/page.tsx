"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Wallet, TrendingUp, TrendingDown, Clock, Shield, Check, AlertTriangle, Loader2, Copy, ExternalLink, ChevronDown } from "lucide-react";
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

/* ═══════════════════════════════════════════
   WALLET CONNECT MODAL
   ═══════════════════════════════════════════ */

const wallets = [
  { name: "MetaMask", icon: "🦊", description: "Connect using browser extension" },
  { name: "WalletConnect", icon: "🔗", description: "Scan with mobile wallet" },
  { name: "Coinbase Wallet", icon: "🔵", description: "Connect using Coinbase Wallet" },
  { name: "Phantom", icon: "👻", description: "Connect using Phantom wallet" },
];

function WalletModal({ onClose, onConnect }: { onClose: () => void; onConnect: (name: string) => void }) {
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (name: string) => {
    setConnecting(name);
    setTimeout(() => {
      onConnect(name);
      setConnecting(null);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="glass-card-elevated p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-heading-2 text-bone">Connect Wallet</h3>
          <button onClick={onClose} className="text-muted hover:text-bone transition-colors text-2xl leading-none">&times;</button>
        </div>

        <div className="space-y-2">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.name)}
              disabled={connecting !== null}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border-primary hover:border-aurum hover:bg-surface-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-2xl">{wallet.icon}</span>
              <div className="text-left flex-1">
                <div className="text-heading-3 text-bone">{wallet.name}</div>
                <div className="text-body-sm text-clay">{wallet.description}</div>
              </div>
              {connecting === wallet.name ? (
                <Loader2 size={20} className="text-aurum animate-spin" />
              ) : (
                <ArrowRight size={16} className="text-muted" />
              )}
            </button>
          ))}
        </div>

        <p className="text-mono-sm text-muted text-center mt-4">
          By connecting, you agree to AUREN Terms of Service
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════════ */

function DashboardContent({ walletName, onDisconnect }: { walletName: string; onDisconnect: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "deposit" | "withdraw" | "history">("overview");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [txStatus, setTxStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;
    setTxStatus("pending");
    setTimeout(() => setTxStatus("success"), 2000);
    setTimeout(() => { setTxStatus("idle"); setDepositAmount(""); }, 4000);
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    setTxStatus("pending");
    setTimeout(() => setTxStatus("success"), 2000);
    setTimeout(() => { setTxStatus("idle"); setWithdrawAmount(""); }, 4000);
  };

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "deposit" as const, label: "Deposit" },
    { id: "withdraw" as const, label: "Withdraw" },
    { id: "history" as const, label: "History" },
  ];

  return (
    <div className="min-h-screen bg-obsidian pt-20 pb-12">
      <div className="container-auren">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-display-lg text-bone">Vault Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-verdant animate-pulse-glow" />
              <span className="text-mono-sm text-muted">Connected via {walletName}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <OutlineButton onClick={onDisconnect} className="text-sm">
              Disconnect
            </OutlineButton>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Your Balance", value: "$12,450.00", change: "+2.4%", positive: true },
            { label: "Vault APY", value: "7.23%", change: "+0.12%", positive: true },
            { label: "Total Earned", value: "$892.34", change: "+$42.18", positive: true },
            { label: "Risk Score", value: "Low", change: "Stable", positive: true },
          ].map((stat) => (
            <GlassCard key={stat.label}>
              <div className="text-mono-sm text-muted mb-1">{stat.label}</div>
              <div className="text-heading-2 text-bone font-mono">{stat.value}</div>
              <div className={`text-mono-sm mt-1 ${stat.positive ? "text-verdant" : "text-ember"}`}>
                {stat.positive ? <TrendingUp size={12} className="inline mr-1" /> : <TrendingDown size={12} className="inline mr-1" />}
                {stat.change}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border-primary overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-aurum border-b-2 border-aurum"
                  : "text-clay hover:text-bone"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Allocation */}
                <div className="lg:col-span-2">
                  <GlassCard>
                    <h3 className="text-heading-3 text-bone mb-4">Your Allocation</h3>
                    {[
                      { name: "Tokenized Treasuries", pct: 35, value: "$4,357.50", color: "bg-aurum" },
                      { name: "Private Credit", pct: 28, value: "$3,486.00", color: "bg-signal" },
                      { name: "Real Estate", pct: 22, value: "$2,739.00", color: "bg-verdant" },
                      { name: "Commodities", pct: 15, value: "$1,867.50", color: "bg-ember" },
                    ].map((a) => (
                      <div key={a.name} className="flex items-center gap-4 mb-4 last:mb-0">
                        <div className="w-32 text-mono-sm text-clay shrink-0">{a.name}</div>
                        <div className="flex-1 h-2 bg-surface-3 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${a.color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${a.pct}%` }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                          />
                        </div>
                        <div className="w-16 text-right text-mono-sm text-bone">{a.pct}%</div>
                        <div className="w-24 text-right text-mono-sm text-clay">{a.value}</div>
                      </div>
                    ))}
                  </GlassCard>
                </div>

                {/* Agent Activity */}
                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-heading-3 text-bone">Agent Activity</h3>
                    <span className="flex items-center gap-1.5 text-mono-sm text-signal">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse-glow" />
                      LIVE
                    </span>
                  </div>
                  <AgentLogStream />
                </GlassCard>
              </div>
            </motion.div>
          )}

          {activeTab === "deposit" && (
            <motion.div key="deposit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <div className="max-w-lg mx-auto">
                <GlassCard>
                  <h3 className="text-heading-2 text-bone mb-6">Deposit into Vault</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-mono-sm text-muted block mb-2">Asset</label>
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-border-primary bg-surface-1">
                        <span className="text-2xl">💵</span>
                        <div className="flex-1">
                          <div className="text-heading-3 text-bone">USDC</div>
                          <div className="text-mono-sm text-muted">USD Coin</div>
                        </div>
                        <ChevronDown size={16} className="text-muted" />
                      </div>
                    </div>

                    <div>
                      <label className="text-mono-sm text-muted block mb-2">Amount</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full p-4 rounded-xl border border-border-primary bg-surface-1 text-heading-2 text-bone font-mono focus:border-aurum focus:outline-none transition-colors pr-20"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <span className="text-mono-sm text-muted">USDC</span>
                          <button className="px-2 py-1 rounded bg-aurum/10 text-aurum text-mono-sm font-medium">MAX</button>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-mono-sm text-muted">Available: 5,230.00 USDC</span>
                        <span className="text-mono-sm text-muted">≈ ${depositAmount || "0.00"}</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="p-4 rounded-xl bg-surface-1 border border-border-primary space-y-2">
                      <div className="flex justify-between text-body-sm">
                        <span className="text-clay">You deposit</span>
                        <span className="text-bone font-mono">{depositAmount || "0.00"} USDC</span>
                      </div>
                      <div className="flex justify-between text-body-sm">
                        <span className="text-clay">You receive</span>
                        <span className="text-bone font-mono">{depositAmount || "0.00"} aSHARE</span>
                      </div>
                      <div className="flex justify-between text-body-sm">
                        <span className="text-clay">Expected APY</span>
                        <span className="text-verdant font-mono">7.23%</span>
                      </div>
                      <div className="flex justify-between text-body-sm">
                        <span className="text-clay">Management fee</span>
                        <span className="text-bone font-mono">0.5%</span>
                      </div>
                    </div>

                    <GlowButton
                      onClick={handleDeposit}
                      disabled={!depositAmount || parseFloat(depositAmount) <= 0 || txStatus === "pending"}
                      className="w-full"
                      size="lg"
                    >
                      {txStatus === "pending" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Processing...
                        </>
                      ) : txStatus === "success" ? (
                        <>
                          <Check size={18} />
                          Deposit Successful!
                        </>
                      ) : (
                        <>
                          Deposit
                          <ArrowRight size={18} />
                        </>
                      )}
                    </GlowButton>

                    <div className="flex items-center gap-2 text-mono-sm text-muted">
                      <Shield size={14} />
                      Secured by smart contract guardrails
                    </div>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {activeTab === "withdraw" && (
            <motion.div key="withdraw" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <div className="max-w-lg mx-auto">
                <GlassCard>
                  <h3 className="text-heading-2 text-bone mb-6">Withdraw from Vault</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-mono-sm text-muted block mb-2">Amount</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full p-4 rounded-xl border border-border-primary bg-surface-1 text-heading-2 text-bone font-mono focus:border-aurum focus:outline-none transition-colors pr-20"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <span className="text-mono-sm text-muted">aSHARE</span>
                          <button className="px-2 py-1 rounded bg-aurum/10 text-aurum text-mono-sm font-medium">MAX</button>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-mono-sm text-muted">Available: 12,450.00 aSHARE</span>
                        <span className="text-mono-sm text-muted">≈ ${withdrawAmount || "0.00"}</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="p-4 rounded-xl bg-surface-1 border border-border-primary space-y-2">
                      <div className="flex justify-between text-body-sm">
                        <span className="text-clay">You withdraw</span>
                        <span className="text-bone font-mono">{withdrawAmount || "0.00"} aSHARE</span>
                      </div>
                      <div className="flex justify-between text-body-sm">
                        <span className="text-clay">You receive</span>
                        <span className="text-bone font-mono">{withdrawAmount || "0.00"} USDC</span>
                      </div>
                      <div className="flex justify-between text-body-sm">
                        <span className="text-clay">Processing time</span>
                        <span className="text-bone font-mono">~12 seconds</span>
                      </div>
                    </div>

                    <GlowButton
                      onClick={handleWithdraw}
                      disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || txStatus === "pending"}
                      className="w-full"
                      size="lg"
                    >
                      {txStatus === "pending" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Processing...
                        </>
                      ) : txStatus === "success" ? (
                        <>
                          <Check size={18} />
                          Withdrawal Successful!
                        </>
                      ) : (
                        <>
                          Withdraw
                          <ArrowRight size={18} />
                        </>
                      )}
                    </GlowButton>

                    <div className="flex items-center gap-2 text-mono-sm text-muted">
                      <Clock size={14} />
                      No lock-up period — withdraw anytime
                    </div>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <GlassCard>
                <h3 className="text-heading-3 text-bone mb-6">Transaction History</h3>
                <div className="space-y-3">
                  {[
                    { type: "Deposit", amount: "+$5,000.00", date: "2 hours ago", status: "Confirmed", hash: "0x1a2b...3c4d" },
                    { type: "Withdraw", amount: "-$1,200.00", date: "1 day ago", status: "Confirmed", hash: "0x5e6f...7g8h" },
                    { type: "Deposit", amount: "+$3,500.00", date: "3 days ago", status: "Confirmed", hash: "0x9i0j...1k2l" },
                    { type: "Deposit", amount: "+$5,150.00", date: "1 week ago", status: "Confirmed", hash: "0x3m4n...5o6p" },
                    { type: "Withdraw", amount: "-$2,000.00", date: "2 weeks ago", status: "Confirmed", hash: "0x7q8r...9s0t" },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface-1 border border-border-primary">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          tx.type === "Deposit" ? "bg-verdant/10 text-verdant" : "bg-ember/10 text-ember"
                        }`}>
                          {tx.type === "Deposit" ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                        </div>
                        <div>
                          <div className="text-heading-3 text-bone">{tx.type}</div>
                          <div className="text-mono-sm text-muted">{tx.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-heading-3 font-mono ${tx.type === "Deposit" ? "text-verdant" : "text-ember"}`}>
                          {tx.amount}
                        </div>
                        <div className="flex items-center gap-2 text-mono-sm text-muted">
                          <span className="text-verdant">{tx.status}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            {tx.hash}
                            <Copy size={10} className="cursor-pointer hover:text-aurum" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DASHBOARD PAGE (with wallet gate)
   ═══════════════════════════════════════════ */

export default function DashboardPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleConnect = (name: string) => {
    setWalletName(name);
    setWalletConnected(true);
    setShowWalletModal(false);
  };

  const handleDisconnect = () => {
    setWalletConnected(false);
    setWalletName("");
  };

  if (!walletConnected) {
    return (
      <>
        <Navbar />
        <main className="pt-24">
          <section className="section-loose">
            <div className="container-auren">
              <div className="max-w-lg mx-auto text-center">
                <FadeInWhenVisible>
                  <div className="w-20 h-20 rounded-2xl bg-surface-2 flex items-center justify-center mx-auto mb-8">
                    <Wallet size={36} className="text-aurum" />
                  </div>
                  <h1 className="text-display-lg text-bone mb-4">Connect Your Wallet</h1>
                  <p className="text-body-lg mb-8">
                    Connect your wallet to access the AUREN Vault Dashboard.
                    Deposit assets, track performance, and monitor Steward activity.
                  </p>
                  <GlowButton size="lg" onClick={() => setShowWalletModal(true)}>
                    <Wallet size={18} />
                    Connect Wallet
                  </GlowButton>
                  <p className="text-mono-sm text-muted mt-4">
                    Supports MetaMask, WalletConnect, Coinbase Wallet, and Phantom
                  </p>
                </FadeInWhenVisible>
              </div>
            </div>
          </section>
        </main>
        <Footer />

        <AnimatePresence>
          {showWalletModal && (
            <WalletModal onClose={() => setShowWalletModal(false)} onConnect={handleConnect} />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <DashboardContent walletName={walletName} onDisconnect={handleDisconnect} />
      <Footer />
    </>
  );
}
