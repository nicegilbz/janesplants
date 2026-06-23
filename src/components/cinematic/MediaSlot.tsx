"use client";

/**
 * Premium "media slot" — a styled cinematic frame standing in for forthcoming
 * Google Gemini footage. Never looks broken: it reads as an intentional,
 * labelled placeholder with a play-state shimmer and corner ticks.
 */

import { Play } from "lucide-react";

export default function MediaSlot({
  id,
  label,
  aspect = "16 / 9",
  kind = "loop",
  className = "",
}: {
  id: string;
  label: string;
  aspect?: string;
  kind?: "loop" | "pair" | "turntable" | "still";
  className?: string;
}) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl cine-glass ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {/* breathing emerald light field stands in for footage */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 30% 20%, rgba(31,95,63,0.55), transparent 60%), radial-gradient(90% 90% at 80% 90%, rgba(159,209,91,0.14), transparent 55%), linear-gradient(160deg, #102017, #0a120d)",
          animation: "cine-breathe 9s ease-in-out infinite",
        }}
      />
      {/* faint scanline texture */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(244,239,227,0.5) 0 1px, transparent 1px 3px)",
        }}
      />
      {/* play-state shimmer */}
      <div className="cine-shimmer-bar" />

      {/* centre play affordance */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--c-glow-line)] bg-[rgba(12,20,16,0.5)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
          <Play
            className="h-5 w-5 translate-x-[1px] text-[var(--c-glow)]"
            fill="currentColor"
          />
        </div>
      </div>

      {/* corner ticks */}
      {(
        [
          "left-3 top-3 border-l border-t",
          "right-3 top-3 border-r border-t",
          "left-3 bottom-3 border-l border-b",
          "right-3 bottom-3 border-r border-b",
        ] as const
      ).map((c) => (
        <span
          key={c}
          className={`pointer-events-none absolute h-4 w-4 border-[var(--c-brass-line)] ${c}`}
        />
      ))}

      {/* asset id + label */}
      <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between">
        <span className="cine-mono rounded-full bg-[rgba(12,20,16,0.6)] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--c-glow)] backdrop-blur-sm">
          {id}
        </span>
        <span className="cine-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--c-sage)]">
          {kind} · {label}
        </span>
      </figcaption>
    </figure>
  );
}
