"use client";

import { GlassCard } from "./ui";

/* ═══════════════════════════════════════════
   SKELETON LOADING COMPONENTS
   ═══════════════════════════════════════════ */

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-surface-2 rounded-xl ${className}`}>
      <div className="h-full w-full bg-gradient-to-r from-surface-2 via-surface-3 to-surface-2 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-xl" />
    </div>
  );
}

export function SkeletonText({ className = "", lines = 3 }: { className?: string; lines?: number }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-surface-2 rounded animate-pulse ${
            i === lines - 1 ? "w-2/3" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <GlassCard className={className}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-3 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-surface-3 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-surface-3 rounded animate-pulse w-1/2" />
          </div>
        </div>
        <div className="h-3 bg-surface-3 rounded animate-pulse w-full" />
        <div className="h-3 bg-surface-3 rounded animate-pulse w-5/6" />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-12 bg-surface-3 rounded animate-pulse" />
          <div className="h-12 bg-surface-3 rounded animate-pulse" />
        </div>
      </div>
    </GlassCard>
  );
}

export function LiveVaultSkeleton() {
  return (
    <div className="glass-card-elevated p-6 space-y-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-surface-3 rounded" />
        <div className="h-3 w-20 bg-surface-3 rounded" />
      </div>
      <div className="h-3 w-28 bg-surface-3 rounded" />
      <div className="flex items-baseline gap-2">
        <div className="h-10 w-40 bg-surface-3 rounded" />
        <div className="h-4 w-16 bg-surface-3 rounded" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-16 bg-surface-3 rounded" />
            <div className="h-6 w-20 bg-surface-3 rounded" />
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-3 w-20 bg-surface-3 rounded" />
            <div className="flex-1 h-2 bg-surface-3 rounded-full" />
            <div className="h-3 w-8 bg-surface-3 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
