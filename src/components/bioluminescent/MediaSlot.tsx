"use client";

/**
 * On-brand placeholder for cinematic Gemini footage that drops in later.
 * Renders as a softly-glowing window — intentional, premium, never broken.
 * Shows the expected Gemini asset id as a mono label.
 */

import { useEffect, useRef } from "react";
import { NIGHT, withAlpha } from "./theme";
import { cn } from "@/lib/utils";

type Props = {
  /** Gemini asset id, e.g. "F1 — hero loop" */
  assetId: string;
  caption?: string;
  className?: string;
  /** subtle drifting glow lines inside the frame */
  ratio?: string;
};

export default function MediaSlot({ assetId, caption, className, ratio = "16 / 9" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    let t = Math.random() * 1000;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      t += 0.012;
      const p = 0.35 + (Math.sin(t) * 0.5 + 0.5) * 0.45;
      el.style.setProperty("--slot-glow", p.toFixed(3));
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl border",
        className,
      )}
      style={{
        aspectRatio: ratio,
        borderColor: withAlpha(NIGHT.glow, 0.22),
        background: `radial-gradient(120% 90% at 50% 0%, ${withAlpha(
          NIGHT.deep,
          0.7,
        )} 0%, ${withAlpha(NIGHT.void, 0.9)} 70%)`,
        boxShadow: `inset 0 0 80px ${withAlpha(NIGHT.glow, 0.08)}, 0 0 calc(40px * var(--slot-glow, .4)) ${withAlpha(
          NIGHT.lume,
          0.12,
        )}`,
        // @ts-expect-error custom prop
        "--slot-glow": 0.4,
      }}
    >
      {/* drifting horizon lines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background: `repeating-linear-gradient(115deg, transparent 0 22px, ${withAlpha(
            NIGHT.glow,
            0.04,
          )} 22px 23px)`,
        }}
      />
      {/* soft central bloom suggesting footage */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, ${withAlpha(NIGHT.lume, 0.16)} 0%, transparent 70%)`,
          opacity: "var(--slot-glow, .4)" as unknown as number,
        }}
      />
      {/* corner play / frame ticks */}
      <FrameTicks />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full border"
          style={{
            borderColor: withAlpha(NIGHT.lume, 0.4),
            boxShadow: `0 0 18px ${withAlpha(NIGHT.lume, 0.35)}`,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path d="M3 2 L12 7 L3 12 Z" fill={withAlpha(NIGHT.white, 0.85)} />
          </svg>
        </span>
        {caption && (
          <p className="max-w-xs text-sm leading-relaxed text-[#dff3ff]/55">{caption}</p>
        )}
      </div>
      <span
        className="absolute bottom-3 left-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.28em]"
        style={{ color: withAlpha(NIGHT.glow, 0.7) }}
      >
        {assetId}
      </span>
      <span
        className="absolute bottom-3 right-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[#dff3ff]/30"
      >
        Gemini · pending
      </span>
    </div>
  );
}

function FrameTicks() {
  const c = withAlpha(NIGHT.glow, 0.35);
  return (
    <>
      <span className="absolute left-3 top-3 h-4 w-4 border-l border-t" style={{ borderColor: c }} />
      <span className="absolute right-3 top-3 h-4 w-4 border-r border-t" style={{ borderColor: c }} />
      <span className="absolute bottom-9 left-3 h-4 w-4 border-b border-l" style={{ borderColor: c }} />
      <span className="absolute bottom-9 right-3 h-4 w-4 border-b border-r" style={{ borderColor: c }} />
    </>
  );
}
