"use client";

/**
 * "Match a plant to your light" — pick Low / Medium / Bright and we filter the
 * real PLANTS by their `light` field, showing matching plants as mini cards
 * that link to /cinematic/plant/[slug].
 *
 * Fully deterministic and client-side. The light buckets are derived from the
 * plant's own `light` string with a small keyword classifier, so no external
 * data and no randomness reach render. Layout animation is gated on reduced
 * motion. Hydration-safe: matchesLight() is a pure function of static content.
 */

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PLANTS, type Plant } from "@/lib/content";
import { PlantEmblem } from "../botanicals";
import { useStaticMotion } from "../hooks";
import { cn } from "@/lib/utils";

type Level = "low" | "medium" | "bright";

const OPTIONS: { level: Level; label: string; note: string }[] = [
  { level: "low", label: "Low light", note: "A north room, a hallway, away from the window." },
  { level: "medium", label: "Medium light", note: "Bright enough to read, no direct sun on the leaves." },
  { level: "bright", label: "Bright, indirect", note: "A sunny room, just off the glass." },
];

/** Pure classifier: does this plant cope in the chosen light level? */
function matchesLight(plant: Plant, level: Level): boolean {
  const l = plant.light.toLowerCase();
  const toleratesLow = l.includes("low");
  const wantsBright = l.includes("bright") || l.includes("direct");
  const isMediumOnly = l.includes("medium");

  if (level === "low") return toleratesLow;
  if (level === "bright") return wantsBright;
  // medium: anything that is not strictly a full-sun-only plant
  return isMediumOnly || toleratesLow || l.includes("indirect");
}

export default function LightMatch() {
  const reduced = useStaticMotion();
  const [level, setLevel] = useState<Level>("medium");

  const matches = PLANTS.filter((p) => matchesLight(p, level));

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[60%] -translate-x-1/2 opacity-60"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(159,209,91,0.10), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mb-12 max-w-2xl">
        <span className="cine-eyebrow">Find your fit</span>
        <h2 className="cine-serif mt-5 text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] text-[var(--c-bone)]">
          What does your{" "}
          <span className="cine-accent text-[var(--c-glow)]">light</span> look
          like?
        </h2>
        <p className="mt-5 text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
          Light is the first thing a plant notices. Tell us your room and we will
          show you the ones that will be happy there.
        </p>
      </div>

      {/* light choices */}
      <div
        role="tablist"
        aria-label="Choose your light level"
        className="relative grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {OPTIONS.map((opt) => {
          const active = level === opt.level;
          return (
            <button
              key={opt.level}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setLevel(opt.level)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                active
                  ? "border-[var(--c-glow-line)] bg-[var(--c-surface)]/60 shadow-[0_0_30px_rgba(159,209,91,0.12)]"
                  : "border-[var(--c-brass-line)] bg-[var(--c-surface)]/20 hover:border-[var(--c-glow-line)]",
              )}
            >
              <span
                className={cn(
                  "block font-[family-name:var(--font-serif)] text-2xl transition-colors duration-300",
                  active ? "text-[var(--c-bone)]" : "text-[var(--c-bone)]/80",
                )}
              >
                {opt.label}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-[var(--c-sage)]">
                {opt.note}
              </span>
              <span
                className={cn(
                  "absolute right-5 top-5 h-2.5 w-2.5 rounded-full transition-all duration-300",
                  active
                    ? "bg-[var(--c-glow)] shadow-[0_0_12px_var(--c-glow)]"
                    : "bg-[var(--c-brass-line)]",
                )}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      {/* count line */}
      <p className="cine-mono mt-8 text-[0.66rem] uppercase tracking-[0.24em] text-[var(--c-sage)]">
        {matches.length} {matches.length === 1 ? "plant" : "plants"} for this light
      </p>

      {/* matching plants */}
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {matches.map((plant) => (
            <motion.div
              key={plant.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/plant/${plant.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl cine-glass p-4 transition-colors duration-400 hover:bg-[var(--c-surface)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-[var(--c-canvas)]/60">
                  <PlantEmblem
                    accent={plant.accent}
                    category={plant.category}
                    slug={plant.slug}
                    className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-[family-name:var(--font-serif)] text-[1.05rem] text-[var(--c-bone)]">
                      {plant.name}
                    </p>
                    <p className="cine-mono mt-1 truncate text-[0.6rem] uppercase tracking-[0.18em] text-[var(--c-sage)]">
                      {plant.light}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-0.5 h-4 w-4 flex-none text-[var(--c-sage)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--c-glow)]"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
