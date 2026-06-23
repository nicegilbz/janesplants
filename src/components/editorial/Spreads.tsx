"use client";

/**
 * Spreads — alternating asymmetric editorial spreads.
 *
 * Each spread pairs a framed media plate (clip-path reveal, Gemini slot) with
 * a text column: a category from CATEGORIES, a drop-cap intro, marginalia and
 * a magnetic link. Hairline rules and big plate numbers do the framing.
 */

import { CATEGORIES, PLANTS, type PlantCategory } from "@/lib/content";
import { SplitReveal, MediaPlate, MagneticLink } from "./primitives";
import Botanical from "./Botanical";

const FEATURED: {
  cat: PlantCategory;
  asset: string;
  pl: string;
}[] = [
  { cat: "Statement", asset: "F4 / day-night pair", pl: "Pl. III" },
  { cat: "Rare", asset: "L1 / 360 turntable", pl: "Pl. IV" },
  { cat: "Trailing", asset: "F2 / growth time-lapse", pl: "Pl. V" },
];

export default function Spreads() {
  return (
    <section className="relative mx-auto max-w-[1500px] px-5 py-28 sm:px-10 lg:px-16 lg:py-36">
      <div className="ed-mono mb-20 flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.28em] text-[var(--ed-ink-soft)]">
        <span className="text-[var(--ed-brass)]">§ 03</span>
        <span className="h-px flex-1 bg-[var(--ed-hair)]" />
        <span>Spreads / five ways to choose</span>
      </div>

      <div className="space-y-32 lg:space-y-48">
        {FEATURED.map((f, i) => {
          const cat = CATEGORIES.find((c) => c.key === f.cat)!;
          const sample = PLANTS.find((p) => p.category === f.cat)!;
          const flip = i % 2 === 1;
          return (
            <article
              key={f.cat}
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20"
            >
              {/* Media plate */}
              <div className={flip ? "lg:order-2" : ""}>
                <MediaPlate
                  assetId={f.asset}
                  caption={`${f.pl} / ${cat.label}`}
                  ratio="4 / 5"
                >
                  <Botanical
                    slug={sample.slug}
                    accent={sample.accent}
                    className="h-[62%] w-auto opacity-90"
                  />
                </MediaPlate>
              </div>

              {/* Text */}
              <div className={flip ? "lg:order-1 lg:pr-10" : "lg:pl-10"}>
                <p className="ed-kicker mb-5">
                  {String(i + 1).padStart(2, "0")} / {cat.label}
                </p>
                <SplitReveal
                  as="h3"
                  type="lines"
                  className="ed-display text-[clamp(2.2rem,4.4vw,4rem)]"
                  y="112%"
                >
                  {cat.label}
                </SplitReveal>
                <SplitReveal
                  as="p"
                  type="lines"
                  className="ed-dropcap ed-body mt-7 max-w-md text-[1.05rem] leading-[1.74] text-[var(--ed-ink-soft)]"
                  stagger={0.07}
                >
                  {cat.note} {sample.blurb}
                </SplitReveal>

                <div className="ed-mono mt-9 flex items-center gap-6 text-[0.66rem] uppercase tracking-[0.18em] text-[var(--ed-ink-soft)]">
                  <span className="ed-num text-[var(--ed-ink)]">
                    e.g. {sample.name} · £{sample.price}
                  </span>
                </div>

                <div className="mt-8">
                  <MagneticLink
                    href="#collection"
                    className="ed-mono text-[0.72rem] uppercase tracking-[0.22em]"
                  >
                    See the {cat.label.toLowerCase()} plates →
                  </MagneticLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
