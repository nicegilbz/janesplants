"use client";

/**
 * Plant COLLECTION showcase. Category filter chips, procedural SVG emblems per
 * plant, name/latin/nickname, mono price in brass, light + difficulty meters.
 * Cards reveal on scroll and lift with a glowing chartreuse edge on hover.
 */

import { useRef, useState, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { Sun, Droplets, PawPrint, Sparkles } from "lucide-react";
import { PLANTS, CATEGORIES, type PlantCategory } from "@/lib/content";
import { PlantEmblem } from "./botanicals";
import { useReducedMotion } from "./hooks";

type Filter = PlantCategory | "All";

function Difficulty({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: i <= level ? "var(--c-glow)" : "rgba(169,181,163,0.25)",
            boxShadow: i <= level ? "0 0 6px var(--c-glow)" : undefined,
          }}
        />
      ))}
    </span>
  );
}

export default function Collection() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () =>
      filter === "All" ? PLANTS : PLANTS.filter((p) => p.category === filter),
    [filter],
  );

  useGSAP(
    () => {
      if (typeof window === "undefined" || reduced) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".cine-coll-head > *", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".cine-coll-head", start: "top 85%" },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section id="collection" ref={root} className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="cine-coll-head mb-12">
          <span className="cine-eyebrow">The collection</span>
          <h2 className="cine-serif mt-5 max-w-3xl text-[clamp(2.4rem,6vw,5rem)] text-[var(--c-bone)]">
            Twelve plants with{" "}
            <span className="cine-accent text-[var(--c-glow)]">character</span>.
          </h2>
          <p className="mt-5 max-w-xl text-[var(--c-sage)]">
            Nursery-fresh and hand-selected. Filter by the role you want them to
            play in the room.
          </p>
        </div>

        {/* filter chips */}
        <div className="cine-coll-head mb-10 flex flex-wrap gap-3">
          {(["All", ...CATEGORIES.map((c) => c.key)] as Filter[]).map((key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="cine-mono rounded-full border px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-300"
                style={{
                  borderColor: active
                    ? "var(--c-glow-line)"
                    : "var(--c-brass-line)",
                  color: active ? "var(--c-glow)" : "var(--c-sage)",
                  background: active ? "var(--c-glow-soft)" : "transparent",
                }}
              >
                {key === "All" ? "All plants" : key}
              </button>
            );
          })}
        </div>

        {/* grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                layout
                key={p.slug}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl cine-glass p-5 transition-all duration-500 hover:-translate-y-1"
                style={
                  {
                    "--accent": p.accent,
                  } as React.CSSProperties
                }
              >
                {/* glow edge on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [box-shadow:inset_0_0_0_1px_var(--c-glow-line),0_24px_60px_-24px_rgba(159,209,91,0.35)]" />

                {/* rare badge */}
                {p.rare && (
                  <span className="cine-mono absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full border border-[var(--c-glow-line)] bg-[rgba(12,20,16,0.5)] px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-[var(--c-glow)]">
                    <Sparkles className="h-3 w-3" /> Rare
                  </span>
                )}

                {/* emblem */}
                <div className="relative mb-4 flex h-44 items-center justify-center">
                  <div className="absolute inset-0 rounded-xl bg-[radial-gradient(60%_60%_at_50%_45%,rgba(31,95,63,0.35),transparent_70%)]" />
                  <div className="relative h-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <PlantEmblem
                      accent={p.accent}
                      category={p.category}
                      slug={p.slug}
                      className="h-full"
                    />
                  </div>
                </div>

                {/* meta */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-[family-name:var(--font-serif)] text-xl text-[var(--c-bone)]">
                      {p.name}
                    </h3>
                    <p className="cine-accent mt-0.5 text-[0.95rem] text-[var(--c-sage)]">
                      {p.nickname}
                    </p>
                  </div>
                  <span className="cine-mono whitespace-nowrap text-lg text-[var(--c-brass)]">
                    £{p.price}
                  </span>
                </div>

                <p className="mt-3 text-[0.85rem] italic text-[var(--c-sage)]/80">
                  {p.latin}
                </p>

                <div className="my-4 cine-rule" />

                <div className="flex items-center justify-between text-[var(--c-sage)]">
                  <span className="flex items-center gap-2 text-[0.78rem]">
                    <Sun className="h-3.5 w-3.5 text-[var(--c-brass)]" />
                    {p.light}
                  </span>
                  {p.petSafe && (
                    <span title="Pet-friendly">
                      <PawPrint className="h-3.5 w-3.5 text-[var(--c-glow)]" />
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[0.72rem] text-[var(--c-sage)]">
                    <Droplets className="h-3.5 w-3.5 text-[var(--c-brass)]" />
                    care
                  </span>
                  <Difficulty level={p.difficulty} />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
