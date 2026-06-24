import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Leaf, ArrowRight } from "lucide-react";
import { PLANTS, CATEGORIES, BRAND } from "@/lib/content";
import MagneticCTA from "@/components/cinematic/MagneticCTA";
import { MistBand } from "@/components/cinematic/botanicals";
import ShopGrid from "@/components/cinematic/shop/ShopGrid";
import AccessoriesStrip from "@/components/cinematic/shop/AccessoriesStrip";

/**
 * Cinematic Jungle — the shop / storefront.
 *
 * A brand showcase, not a checkout: browse the full collection, filter and
 * sort, then enquire or reserve. Tokens, grain, header, footer and cursor live
 * in the route layout, so this file only builds page sections. The interactive
 * grid reads ?cat= via useSearchParams, so it sits inside a <Suspense> boundary
 * as Next 16 requires.
 */

export const metadata: Metadata = {
  title: "Shop the collection / Jane's Plants",
  description:
    "Browse the full collection of characterful houseplants. Filter, sort, and enquire to reserve. Plus pots, care and tools, from a working glasshouse in Hertford.",
};

const rareCount = PLANTS.filter((p) => p.rare).length;

function GridFallback() {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-hidden
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[26rem] animate-pulse rounded-2xl cine-glass opacity-40"
        />
      ))}
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Header band — leave room for the fixed floating header           */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-40 pb-12 lg:pt-48 lg:pb-16">
        {/* soft emerald wash + far mist band, all generative */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 20% 0%, rgba(31,95,63,0.35), transparent 60%), radial-gradient(60% 50% at 90% 10%, rgba(159,209,91,0.08), transparent 55%)",
          }}
        />
        <MistBand
          accent="#1f5f3f"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-40"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <nav className="cine-mono mb-8 flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--c-sage)]">
            <Link
              href="/"
              className="rounded transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Home
            </Link>
            <span className="text-[var(--c-brass)]">/</span>
            <span className="text-[var(--c-bone)]">Shop</span>
          </nav>

          <span className="cine-eyebrow">The collection</span>
          <h1 className="cine-serif mt-5 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] text-[var(--c-bone)]">
            Plants worth{" "}
            <span className="cine-accent text-[var(--c-glow)]">
              making room for
            </span>
            .
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--c-sage)]">
            Hand-picked, nursery-fresh, and chosen for character. Browse the full
            collection, find the one that fits your light, and enquire to
            reserve it. No cart, no rush, just the right plant.
          </p>

          {/* stat row */}
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <span className="flex items-center gap-2.5">
              <Leaf className="h-4 w-4 text-[var(--c-glow)]" aria-hidden="true" />
              <span className="cine-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--c-sage)]">
                {PLANTS.length} plants in the collection
              </span>
            </span>
            <span className="hidden h-4 w-px bg-[var(--c-brass-line)] sm:block" />
            <span className="cine-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--c-sage)]">
              {CATEGORIES.length} categories
            </span>
            <span className="hidden h-4 w-px bg-[var(--c-brass-line)] sm:block" />
            <span className="cine-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--c-glow)]">
              {rareCount} rare finds
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The grid — Suspense-wrapped so useSearchParams is legal          */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <Suspense fallback={<GridFallback />}>
            <ShopGrid />
          </Suspense>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Accessories                                                      */}
      {/* ---------------------------------------------------------------- */}
      <AccessoriesStrip />

      {/* ---------------------------------------------------------------- */}
      {/* Closing — not sure where to start?                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 80% at 50% 100%, rgba(31,95,63,0.28), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="cine-eyebrow">Not sure where to start?</span>
          <h2 className="cine-serif mx-auto mt-5 max-w-2xl text-[clamp(2rem,5vw,4rem)] leading-[1.02] text-[var(--c-bone)]">
            Tell us your light and your room. We will point you at the right
            plant.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[var(--c-sage)]">
            Visit the glasshouse to wander and ask, or send a quick enquiry and
            we will reserve and advise. Want a whole space styled instead? Plant
            hire covers homes, offices and events.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticCTA href="/visit#enquire">
              Enquire or reserve
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </MagneticCTA>
            <MagneticCTA href="/care" variant="ghost">
              Read the care guides
            </MagneticCTA>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/hire"
              className="cine-mono rounded text-[0.66rem] uppercase tracking-[0.2em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Plant hire & styling
            </Link>
            <span className="hidden h-3 w-px bg-[var(--c-brass-line)] sm:block" />
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="cine-mono rounded text-[0.66rem] uppercase tracking-[0.2em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {BRAND.contactEmail}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
