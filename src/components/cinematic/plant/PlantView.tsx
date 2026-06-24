"use client";

/**
 * Individual plant page view (the 3D-inspector moment). Client component so all
 * motion/hooks live here, not in the server route. Builds: an inspector hero
 * (left = MediaSlot "L1" 360 turntable with the live PlantEmblem composited;
 * right = name/price/actions + inline plant enquiry), a brass-ruled vitals panel,
 * a tailored care note pulling real CARE_GUIDES tips, and a "pairs well with" set.
 *
 * Scroll reveals are transform/opacity only, gated behind reduced-motion, with a
 * static fallback. GSAP/ScrollTrigger are registered and cleaned up via useGSAP.
 */

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  ArrowRight,
  Leaf,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import MagneticCTA from "@/components/cinematic/MagneticCTA";
import EnquiryForm from "@/components/cinematic/EnquiryForm";
import { MistBand, PlantEmblem } from "@/components/cinematic/botanicals";
import { useReducedMotion } from "@/components/cinematic/hooks";
import { CARE_GUIDES, type Plant } from "@/lib/content";
import { cn } from "@/lib/utils";
import PlantInspector from "./PlantInspector";
import PlantVitals from "./PlantVitals";

/** Pick the care guide most relevant to this plant's light/water words. */
function tailoredTips(plant: Plant): { guide: (typeof CARE_GUIDES)[number]; tips: string[] }[] {
  const light = CARE_GUIDES.find((g) => g.slug === "light")!;
  const water = CARE_GUIDES.find((g) => g.slug === "water")!;
  const humidity = CARE_GUIDES.find((g) => g.slug === "humidity")!;

  const wantsHumidity =
    /humid|moist|misting|dry air/i.test(plant.water) ||
    plant.category === "Pet-friendly";

  const second = wantsHumidity ? humidity : water;
  return [
    { guide: light, tips: [light.tips[0]] },
    { guide: second, tips: [second.tips[0]] },
  ];
}

export default function PlantView({
  plant,
  related,
}: {
  plant: Plant;
  related: Plant[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const care = tailoredTips(plant);

  useGSAP(
    () => {
      if (typeof window === "undefined" || reduced) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray<HTMLElement>(".pv-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className="relative">
      {/* ---------------------------------------------------------------- *
       * HERO — the inspector moment
       * ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden px-6 pb-20 pt-28 lg:pt-32">
        {/* atmospheric wash tinted to the plant */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(70% 60% at 28% 24%, rgba(31,95,63,0.32), transparent 62%), radial-gradient(60% 50% at 85% 80%, rgba(159,209,91,0.08), transparent 60%)",
          }}
        />

        <div className="mx-auto max-w-7xl">
          {/* breadcrumb back to shop */}
          <Link
            href="/shop"
            className="cine-mono inline-flex items-center gap-2 rounded-sm text-[0.66rem] uppercase tracking-[0.2em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back to the shop
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            {/* LEFT — inspector */}
            <div className="pv-reveal relative">
              <PlantInspector plant={plant} />
              {plant.rare && (
                <span className="cine-mono absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-[var(--c-glow-line)] bg-[rgba(12,20,16,0.55)] px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-[var(--c-glow)] backdrop-blur-sm">
                  <Sparkles className="h-3 w-3" aria-hidden="true" /> Rare find
                </span>
              )}
            </div>

            {/* RIGHT — identity + actions */}
            <div className="pv-reveal">
              <span className="cine-eyebrow">{plant.category}</span>
              <h1 className="cine-serif mt-4 text-[clamp(2.6rem,7vw,5rem)] text-[var(--c-bone)]">
                {plant.name}
              </h1>
              <p className="cine-accent mt-2 text-[clamp(1.3rem,3vw,1.9rem)] text-[var(--c-glow)]">
                {plant.nickname}
              </p>
              <p className="mt-1 text-[0.95rem] italic text-[var(--c-sage)]/80">
                {plant.latin}
              </p>

              <div className="my-6 cine-rule" />

              <p className="max-w-xl text-[1.02rem] leading-relaxed text-[var(--c-sage)]">
                {plant.blurb}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-6">
                <span className="cine-mono text-3xl text-[var(--c-brass)]">
                  £{plant.price}
                </span>
                <MagneticCTA href="/visit#enquire">
                  Reserve / ask about this{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </MagneticCTA>
                <a
                  href="#enquire"
                  className="cine-mono rounded-sm text-[0.7rem] uppercase tracking-[0.18em] text-[var(--c-sage)] underline-offset-4 transition-colors hover:text-[var(--c-glow)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  Or ask below
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * VITALS + CARE NOTE
       * ---------------------------------------------------------------- */}
      <section className="relative px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:gap-12">
          {/* vitals */}
          <div className="pv-reveal">
            <PlantVitals plant={plant} />
          </div>

          {/* care note */}
          <div className="pv-reveal rounded-2xl cine-glass p-6 sm:p-7">
            <span className="cine-eyebrow">Keeping it happy</span>
            <h2 className="cine-serif mt-4 text-[clamp(1.6rem,3vw,2.2rem)] text-[var(--c-bone)]">
              Care, for this one in particular
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--c-sage)]">
              The {plant.name} wants {plant.light.toLowerCase()} light and
              watering {plant.water.toLowerCase()}. Get those two right and the
              rest is easy.
            </p>

            <div className="mt-6 space-y-4">
              {care.map(({ guide, tips }) => (
                <div key={guide.slug} className="flex gap-3">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--c-glow-line)] bg-[var(--c-glow-soft)]"
                    aria-hidden="true"
                  >
                    <Leaf className="h-3.5 w-3.5 text-[var(--c-glow)]" />
                  </span>
                  <div>
                    <p className="cine-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--c-brass)]">
                      {guide.title}
                    </p>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-[var(--c-sage)]">
                      {tips[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/care"
              className="cine-mono mt-7 inline-flex items-center gap-2 rounded-sm text-[0.7rem] uppercase tracking-[0.18em] text-[var(--c-glow)] transition-colors hover:text-[var(--c-bone)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" /> Read the full care
              guides
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * INLINE ENQUIRY (anchor target)
       * ---------------------------------------------------------------- */}
      <section id="enquire" className="relative scroll-mt-28 px-6 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="pv-reveal">
            <span className="cine-eyebrow">Reserve or ask</span>
            <h2 className="cine-serif mt-4 text-[clamp(1.8rem,4vw,3rem)] text-[var(--c-bone)]">
              Want this{" "}
              <span className="cine-accent text-[var(--c-glow)]">
                {plant.nickname.replace(/^The\s+/i, "").toLowerCase()}
              </span>
              ?
            </h2>
            <p className="mt-4 max-w-md text-[var(--c-sage)]">
              Reserve one to collect from the glasshouse in Hertford, ask about
              size and condition, or check if it suits your light. We reply to
              every message ourselves.
            </p>
            <p className="mt-4 text-[0.85rem] text-[var(--c-sage)]/80">
              Styling a whole room or a venue instead?{" "}
              <Link
                href="/hire"
                className="text-[var(--c-glow)] underline-offset-4 hover:underline"
              >
                See plant hire and styling
              </Link>
              .
            </p>
          </div>
          <div className="pv-reveal">
            <EnquiryForm kind="plant" subject={plant.name} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * PAIRS WELL WITH
       * ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden px-6 py-20 lg:py-28">
        <MistBand
          accent={plant.accent}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-30"
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="pv-reveal mb-10">
            <span className="cine-eyebrow">Pairs well with</span>
            <h2 className="cine-serif mt-4 text-[clamp(2rem,5vw,3.6rem)] text-[var(--c-bone)]">
              Build the{" "}
              <span className="cine-accent text-[var(--c-glow)]">jungle</span>.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/plant/${p.slug}`}
                className={cn(
                  "pv-reveal group relative overflow-hidden rounded-2xl cine-glass p-5 transition-all duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                )}
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [box-shadow:inset_0_0_0_1px_var(--c-glow-line),0_24px_60px_-24px_rgba(159,209,91,0.35)]" />

                <div className="relative mb-4 flex h-40 items-center justify-center">
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

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-[family-name:var(--font-serif)] text-lg text-[var(--c-bone)]">
                      {p.name}
                    </h3>
                    <p className="cine-accent mt-0.5 text-[0.9rem] text-[var(--c-sage)]">
                      {p.nickname}
                    </p>
                  </div>
                  <span className="cine-mono whitespace-nowrap text-[var(--c-brass)]">
                    £{p.price}
                  </span>
                </div>

                <span className="cine-mono mt-4 inline-flex items-center gap-1.5 text-[0.64rem] uppercase tracking-[0.18em] text-[var(--c-glow)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View plant <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <div className="pv-reveal mt-12">
            <Link
              href="/shop"
              className="cine-mono inline-flex items-center gap-2 rounded-sm text-[0.72rem] uppercase tracking-[0.18em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              See the whole collection{" "}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
