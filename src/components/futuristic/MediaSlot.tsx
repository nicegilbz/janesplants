"use client";

import { motion } from "motion/react";

/**
 * A premium "media slot" placeholder where cinematic Gemini footage will drop
 * in later. Styled as an intentional lab-monitor frame, never a broken image.
 */
export default function MediaSlot({
  id,
  label,
  className,
  aspect = "16 / 9",
  accent = "#5cf2a0",
}: {
  id: string;
  label: string;
  className?: string;
  aspect?: string;
  accent?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-[#5cf2a0]/15 bg-[#0c2a2a]/25 ${className ?? ""}`}
      style={{ aspectRatio: aspect }}
    >
      {/* generative ambient field */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(80% 120% at 30% 20%, ${accent}22, transparent 60%), radial-gradient(70% 90% at 80% 90%, #5be0e622, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 fx-grid-flat opacity-25" />
      <div className="pointer-events-none absolute inset-0 fx-scanlines opacity-40" />

      {/* sweeping standby beam */}
      <motion.div
        aria-hidden
        initial={{ x: "-120%" }}
        animate={{ x: "220%" }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-y-0 w-1/3 skew-x-12 opacity-30"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
        }}
      />

      {/* corner brackets */}
      <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-[#5cf2a0]/50" />
      <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-[#5cf2a0]/50" />
      <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#5cf2a0]/50" />
      <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[#5cf2a0]/50" />

      <div className="relative flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#5be0e6]/70">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e15bc9] shadow-[0_0_8px_#e15bc9]" />
          awaiting feed
        </span>
        <span
          className="font-mono text-xs uppercase tracking-[0.22em] text-[#eaf3ee]/80"
        >
          {id}
        </span>
        <span className="max-w-[80%] text-[11px] text-[#dafff0]/45">{label}</span>
      </div>
    </div>
  );
}
