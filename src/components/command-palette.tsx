"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, FileText, Book, Users, Shield, Zap, TrendingUp, Vote, HelpCircle, Globe } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  href: string;
  category: string;
}

const commands: CommandItem[] = [
  { id: "open-vault", label: "Open Vault", description: "Connect wallet and access dashboard", icon: <Zap size={16} />, href: "/dashboard", category: "Actions" },
  { id: "view-assets", label: "View Assets", description: "Browse RWA asset classes", icon: <TrendingUp size={16} />, href: "/assets", category: "Navigation" },
  { id: "protocol", label: "Protocol", description: "How AUREN works", icon: <Shield size={16} />, href: "/protocol", category: "Navigation" },
  { id: "trust", label: "Trust Layer", description: "Proof-of-reserve and audits", icon: <Shield size={16} />, href: "/trust", category: "Navigation" },
  { id: "agents", label: "Steward Agents", description: "Meet the AI agents", icon: <Users size={16} />, href: "/agents", category: "Navigation" },
  { id: "governance", label: "Governance", description: "Proposals and voting", icon: <Vote size={16} />, href: "/governance", category: "Navigation" },
  { id: "docs", label: "Documentation", description: "API reference and guides", icon: <Book size={16} />, href: "/docs", category: "Resources" },
  { id: "resources", label: "Resources", description: "Blog, FAQ, glossary", icon: <FileText size={16} />, href: "/resources", category: "Resources" },
  { id: "about", label: "About", description: "Team, manifesto, roadmap", icon: <Globe size={16} />, href: "/about", category: "Navigation" },
  { id: "careers", label: "Careers", description: "Join the team", icon: <Users size={16} />, href: "/careers", category: "Navigation" },
  { id: "faq", label: "FAQ", description: "Frequently asked questions", icon: <HelpCircle size={16} />, href: "/resources#faq", category: "Resources" },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  const flatFiltered = filtered;
  const flatIndex = selectedIndex;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, flatFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && flatFiltered[flatIndex]) {
      window.location.href = flatFiltered[flatIndex].href;
      setIsOpen(false);
    }
  }, [flatFiltered, flatIndex]);

  // Keep selected item in view
  useEffect(() => {
    const el = document.querySelector(`[data-index="${flatIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [flatIndex]);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-primary bg-surface-1 text-muted hover:text-bone hover:border-border-secondary transition-colors"
      >
        <Search size={14} />
        <span className="text-sm">Search...</span>
        <span className="text-mono-sm text-muted ml-4 px-1.5 py-0.5 rounded bg-surface-2">⌘K</span>
      </button>

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-clay hover:text-bone transition-colors"
      >
        <Search size={20} />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 bg-obsidian/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="glass-card-elevated w-full max-w-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-border-primary">
                <Search size={18} className="text-aurum shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, actions, resources..."
                  className="flex-1 bg-transparent text-bone text-base outline-none placeholder:text-muted"
                />
                <span className="text-mono-sm text-muted px-1.5 py-0.5 rounded bg-surface-2">ESC</span>
              </div>

              {/* Results */}
              <div className="max-h-[300px] overflow-y-auto p-2">
                {flatFiltered.length === 0 ? (
                  <div className="p-4 text-center text-muted text-sm">No results found</div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                      <div className="px-3 py-2 text-label text-muted">{category}</div>
                      {items.map((item) => {
                        const globalIndex = flatFiltered.indexOf(item);
                        return (
                          <a
                            key={item.id}
                            href={item.href}
                            data-index={globalIndex}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                              globalIndex === flatIndex
                                ? "bg-surface-2 text-bone"
                                : "text-clay hover:bg-surface-1 hover:text-bone"
                            }`}
                          >
                            <span className="text-muted shrink-0">{item.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium">{item.label}</div>
                              {item.description && (
                                <div className="text-mono-sm text-muted truncate">{item.description}</div>
                              )}
                            </div>
                            <ArrowRight size={14} className="text-muted shrink-0" />
                          </a>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-border-primary flex items-center gap-4 text-mono-sm text-muted">
                <span className="flex items-center gap-1">↑↓ Navigate</span>
                <span className="flex items-center gap-1">↵ Select</span>
                <span className="flex items-center gap-1">ESC Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
