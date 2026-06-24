"use client";

/**
 * Shop storefront grid — filterable + sortable showcase of all 12 plants.
 *
 * The interactive surface for /cinematic/shop. Category chips (driven by
 * CATEGORIES + an "All" pill), a sort control (price low/high, easiest first),
 * and a Motion layout grid that re-flows smoothly. Each card is a Next <Link>
 * to the plant detail page and mirrors the native Collection card styling so it
 * reads as part of the same cinematic system.
 *
 * The ?cat= query param pre-selects a filter. Per Next 16, useSearchParams must
 * live inside a <Suspense> boundary — this whole component is the suspended
 * child, so the parent page wraps it. Everything that feeds server markup stays
 * deterministic; the only motion is transform/opacity via Motion.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Sun, PawPrint, Sparkles, ArrowUpRight, ArrowDownUp } from "lucide-react";
import HoverImage from "@/components/cinematic/HoverImage";
import {
  PLANTS,
  CATEGORIES,
  plantImage,
  type Plant,
  type PlantCategory,
} from "@/lib/content";
import { useReducedMotion } from "@/components/cinematic/hooks";
import { cn } from "@/lib/utils";

type Filter = PlantCategory | "All";
type Sort = "featured" | "price-asc" | "price-desc" | "easiest";

const SORTS: { key: Sort; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "easiest", label: "Easiest first" },
];

const FILTERS: Filter[] = ["All", ...CATEGORIES.map((c) => c.key)];

/** A category string is a valid filter only if it matches a known key. */
function normaliseCat(raw: string | null): Filter {
  if (!raw) return "All";
  const match = CATEGORIES.find(
    (c) => c.key.toLowerCase() === raw.toLowerCase(),
  );
  return match ? match.key : "All";
}

function Difficulty({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`Care level ${level} of 5`}>
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

function PlantCard({ p }: { p: Plant }) {
  return (
    <Link
      href={`/plant/${p.slug}`}
      className="group relative block overflow-hidden rounded-2xl cine-glass p-5 transition-all duration-500 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none"
      style={{ "--accent": p.accent } as React.CSSProperties}
    >
      {/* glow edge on hover/focus */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [box-shadow:inset_0_0_0_1px_var(--c-glow-line),0_24px_60px_-24px_rgba(159,209,91,0.35)]" />

      {/* rare badge */}
      {p.rare && (
        <span className="cine-mono absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full border border-[var(--c-glow-line)] bg-[rgba(12,20,16,0.5)] px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-[var(--c-glow)]">
          <Sparkles className="h-3 w-3" aria-hidden="true" /> Rare
        </span>
      )}

      {/* specimen photo */}
      <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-xl">
        <HoverImage
          src={plantImage(p.slug)}
          alt={p.name}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_38%,transparent_55%,rgba(12,20,16,0.55))]" />
      </div>

      {/* meta */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
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
          <Sun className="h-3.5 w-3.5 text-[var(--c-brass)]" aria-hidden="true" />
          {p.light}
        </span>
        {p.petSafe && (
          <span title="Pet-friendly" className="flex items-center gap-1">
            <PawPrint className="h-3.5 w-3.5 text-[var(--c-glow)]" aria-hidden="true" />
            <span className="sr-only">Pet-friendly</span>
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.14em] text-[var(--c-sage)]">
          care
        </span>
        <Difficulty level={p.difficulty} />
      </div>

      {/* view affordance */}
      <span className="cine-mono mt-5 flex items-center gap-1.5 text-[0.66rem] uppercase tracking-[0.2em] text-[var(--c-sage)] transition-colors duration-300 group-hover:text-[var(--c-glow)]">
        View plant
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export default function ShopGrid() {
  const params = useSearchParams();
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>(() =>
    normaliseCat(params.get("cat")),
  );
  const [sort, setSort] = useState<Sort>("featured");

  const filtered = useMemo(() => {
    const base =
      filter === "All" ? PLANTS : PLANTS.filter((p) => p.category === filter);
    const list = [...base];
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "easiest":
        list.sort((a, b) => a.difficulty - b.difficulty || a.price - b.price);
        break;
      default:
        break;
    }
    return list;
  }, [filter, sort]);

  const activeNote =
    filter === "All"
      ? "The whole collection, hand-picked and nursery-fresh."
      : CATEGORIES.find((c) => c.key === filter)?.note;

  return (
    <div>
      {/* controls */}
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {/* filter chips */}
        <div className="flex flex-wrap gap-3">
          {FILTERS.map((key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={active}
                className="cine-mono rounded-full border px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
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

        {/* sort control */}
        <label className="flex shrink-0 items-center gap-3 self-start lg:self-auto">
          <span className="cine-mono flex items-center gap-1.5 text-[0.66rem] uppercase tracking-[0.2em] text-[var(--c-sage)]">
            <ArrowDownUp className="h-3.5 w-3.5 text-[var(--c-brass)]" aria-hidden="true" />
            Sort
          </span>
          <span className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort plants"
              className="cine-mono cursor-pointer appearance-none rounded-full border border-[var(--c-brass-line)] bg-[rgba(12,20,16,0.5)] py-2 pl-4 pr-9 text-[0.7rem] uppercase tracking-[0.14em] text-[var(--c-bone)] outline-none transition-colors duration-300 hover:border-[var(--c-glow-line)] focus-visible:border-[var(--c-glow-line)] focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key} className="text-black">
                  {s.label}
                </option>
              ))}
            </select>
            <ArrowUpRight className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-[var(--c-sage)]" aria-hidden="true" />
          </span>
        </label>
      </div>

      {/* active filter note + count */}
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-t border-[var(--c-brass-line)] pt-5">
        <p className="max-w-xl text-[0.92rem] text-[var(--c-sage)]">{activeNote}</p>
        <span className="cine-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--c-sage)]">
          {filtered.length}{" "}
          {filtered.length === 1 ? "plant" : "plants"}
        </span>
      </div>

      {/* grid */}
      <motion.div
        layout={!reduced}
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              layout={!reduced}
              key={p.slug}
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <PlantCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
