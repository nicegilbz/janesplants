"use client";

/**
 * The three HIRE_PACKAGES as premium cards. Each card carries a generative
 * PlantEmblem header, a forWho tag, the blurb, the "from £x cadence" price in
 * mono brass, an includes[] list with small glow ticks, and a per-card Enquire
 * CTA into the #enquire section. Cards reveal on scroll (transform/opacity only).
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowUpRight } from "lucide-react";
import { HIRE_PACKAGES } from "@/lib/content";
import { PlantEmblem } from "../botanicals";
import MagneticCTA from "../MagneticCTA";
import { useReducedMotion } from "../hooks";
import { cn } from "@/lib/utils";

/** Pair each package with a generative emblem form + accent for cohesion. */
const EMBLEM: Record<string, { category: string; accent: string }> = {
  residential: { category: "Pet-friendly", accent: "#5a8f69" },
  workspace: { category: "Easy-care", accent: "#2c5f3a" },
  events: { category: "Statement", accent: "#3a7d44" },
};

export default function HirePackages() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (typeof window === "undefined" || reduced) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".hire-pkg-card", {
        opacity: 0,
        y: 36,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      id="packages"
      ref={root}
      className="relative scroll-mt-24 py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 50% at 20% 0%, rgba(31,95,63,0.2), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="cine-eyebrow block">Three ways to hire</span>
          <h2 className="cine-serif mt-5 text-[clamp(2.2rem,5vw,4rem)] text-[var(--c-bone)]">
            Pick the green that{" "}
            <span className="cine-accent text-[var(--c-glow)]">fits the room</span>.
          </h2>
          <p className="mt-5 text-[var(--c-sage)]">
            Every package is fully managed from the glasshouse. We choose the
            plants, place them, and keep them thriving, so the only thing you
            handle is the compliments.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {HIRE_PACKAGES.map((pkg, i) => {
            const emblem = EMBLEM[pkg.slug] ?? {
              category: "Statement",
              accent: "#3a7d44",
            };
            const featured = i === 1;
            return (
              <article
                key={pkg.slug}
                className={cn(
                  "hire-pkg-card group relative flex flex-col overflow-hidden rounded-3xl cine-glass p-7 transition-transform duration-500 hover:-translate-y-1.5",
                  featured && "md:scale-[1.0] lg:-translate-y-3",
                )}
              >
                {/* emblem header */}
                <div className="relative mb-6 h-36 overflow-hidden rounded-2xl border border-[var(--c-brass-line)] bg-[rgba(12,20,16,0.5)]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(90% 80% at 70% 20%, rgba(31,95,63,0.4), transparent 60%)",
                    }}
                  />
                  <PlantEmblem
                    accent={emblem.accent}
                    category={emblem.category}
                    slug={`hire-${pkg.slug}`}
                    className="absolute -bottom-3 right-3 h-44 w-auto opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="cine-mono absolute left-4 top-4 rounded-full bg-[rgba(12,20,16,0.55)] px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--c-glow)] backdrop-blur-sm">
                    {pkg.forWho}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[var(--c-bone)]">
                  {pkg.name}
                </h3>

                <p className="mt-1 cine-mono text-[0.82rem] tracking-[0.04em] text-[var(--c-brass)]">
                  from £{pkg.from} {pkg.cadence}
                </p>

                <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--c-sage)]">
                  {pkg.blurb}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border border-[var(--c-glow-line)] bg-[var(--c-glow-soft)]">
                        <Check className="h-2.5 w-2.5 text-[var(--c-glow)]" />
                      </span>
                      <span className="text-[0.86rem] leading-snug text-[var(--c-bone)]/85">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 pt-1">
                  <div className="cine-rule mb-6" />
                  <MagneticCTA
                    href="#enquire"
                    variant={featured ? "solid" : "ghost"}
                  >
                    Enquire <ArrowUpRight className="h-4 w-4" />
                  </MagneticCTA>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
