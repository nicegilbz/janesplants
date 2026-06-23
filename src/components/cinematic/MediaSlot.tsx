"use client";

/**
 * Cinematic media frame.
 *
 * With a `src` it renders real imagery (optimised via next/image) inside the
 * cinematic frame. Without one it falls back to a labelled, premium-looking
 * placeholder (breathing light field + play affordance + asset id) standing in
 * for forthcoming Gemini footage. Either way it never looks broken.
 */

import Image from "next/image";
import { Play } from "lucide-react";

export default function MediaSlot({
  id,
  label,
  aspect = "16 / 9",
  kind = "loop",
  className = "",
  src,
  priority = false,
}: {
  id: string;
  label: string;
  aspect?: string;
  kind?: "loop" | "pair" | "turntable" | "still";
  className?: string;
  /** When set, real imagery is shown instead of the placeholder. */
  src?: string;
  priority?: boolean;
}) {
  const corners = [
    "left-3 top-3 border-l border-t",
    "right-3 top-3 border-r border-t",
    "left-3 bottom-3 border-l border-b",
    "right-3 bottom-3 border-r border-b",
  ] as const;

  // Real media mode -------------------------------------------------------
  if (src) {
    return (
      <figure
        className={`group relative overflow-hidden rounded-2xl cine-glass ${className}`}
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={label}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
        />
        {/* legibility + cinematic grade */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,12,8,0.12), transparent 35%, rgba(6,12,8,0.35)), radial-gradient(120% 120% at 50% 40%, transparent 60%, rgba(6,12,8,0.55))",
          }}
        />
        {corners.map((c) => (
          <span
            key={c}
            className={`pointer-events-none absolute h-4 w-4 border-[var(--c-brass-line)] ${c}`}
          />
        ))}
        {kind === "loop" && (
          <span className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--c-glow-line)] bg-[rgba(12,20,16,0.5)] backdrop-blur-sm">
              <Play
                className="h-3 w-3 translate-x-[1px] text-[var(--c-glow)]"
                fill="currentColor"
              />
            </span>
            <span className="cine-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--c-bone)]/80">
              {label}
            </span>
          </span>
        )}
      </figure>
    );
  }

  // Placeholder mode ------------------------------------------------------
  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl cine-glass ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 30% 20%, rgba(31,95,63,0.55), transparent 60%), radial-gradient(90% 90% at 80% 90%, rgba(159,209,91,0.14), transparent 55%), linear-gradient(160deg, #102017, #0a120d)",
          animation: "cine-breathe 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(244,239,227,0.5) 0 1px, transparent 1px 3px)",
        }}
      />
      <div className="cine-shimmer-bar" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--c-glow-line)] bg-[rgba(12,20,16,0.5)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
          <Play
            className="h-5 w-5 translate-x-[1px] text-[var(--c-glow)]"
            fill="currentColor"
          />
        </div>
      </div>

      {corners.map((c) => (
        <span
          key={c}
          className={`pointer-events-none absolute h-4 w-4 border-[var(--c-brass-line)] ${c}`}
        />
      ))}

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
