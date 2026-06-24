"use client";

/**
 * Visit + footer. A cinematic CTA panel (glasshouse light), the location, the
 * real contact email as the primary CTA, and a brass-ruled footer. Foreground
 * fronds frame the panel so the page ends back inside the jungle.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/content";
import { Frond } from "./botanicals";
import MagneticCTA from "./MagneticCTA";
import Pollen from "./Pollen";
import { useReducedMotion } from "./hooks";

export default function Visit() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (typeof window === "undefined" || reduced) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".cine-visit-reveal", {
        opacity: 0,
        y: 36,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".cine-visit-panel", start: "top 80%" },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section id="visit" ref={root} className="relative overflow-hidden pb-16 pt-10">
      {/* framing fronds */}
      <div className="pointer-events-none absolute -left-16 top-10 w-[26%] max-w-[360px] opacity-70">
        <Frond accent="#13402780" className="w-full" />
      </div>
      <div className="pointer-events-none absolute -right-16 top-0 w-[28%] max-w-[380px] opacity-70">
        <Frond accent="#134027" flip className="w-full" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="cine-visit-panel relative overflow-hidden rounded-[2rem] cine-glass px-8 py-20 text-center lg:px-16 lg:py-28">
          {/* glasshouse glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 70% at 50% 0%, rgba(159,209,91,0.16), transparent 60%), radial-gradient(60% 60% at 50% 100%, rgba(31,95,63,0.4), transparent 70%)",
            }}
          />
          <Pollen count={40} className="absolute inset-0 h-full w-full" />

          <div className="relative">
            <span className="cine-visit-reveal cine-eyebrow block">
              {BRAND.location.label}
            </span>
            <h2 className="cine-visit-reveal cine-serif mx-auto mt-6 max-w-3xl text-[clamp(2.6rem,7vw,6rem)] text-[var(--c-bone)]">
              Come and{" "}
              <span className="cine-accent text-[var(--c-glow)]">wander</span>.
            </h2>
            <p className="cine-visit-reveal mx-auto mt-6 flex items-center justify-center gap-2 text-[var(--c-sage)]">
              <MapPin className="h-4 w-4 text-[var(--c-brass)]" aria-hidden="true" />
              {BRAND.location.line}
            </p>

            <div className="cine-visit-reveal mt-12 flex flex-wrap items-center justify-center gap-4">
              <MagneticCTA href={`mailto:${BRAND.contactEmail}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                {BRAND.contactEmail}
              </MagneticCTA>
              <MagneticCTA href="#collection" variant="ghost">
                Browse the shop <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticCTA>
            </div>
          </div>
        </div>

        {/* footer */}
        <footer className="mt-16">
          <div className="cine-rule mb-8" />
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="cine-serif text-2xl text-[var(--c-bone)]">
                {BRAND.name}
              </span>
              <span className="h-4 w-px bg-[var(--c-brass-line)]" />
              <span className="cine-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--c-sage)]">
                {BRAND.tagline}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#collection"
                className="cine-mono rounded-sm text-[0.7rem] uppercase tracking-[0.2em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Shop
              </a>
              <a
                href="#hire"
                className="cine-mono rounded-sm text-[0.7rem] uppercase tracking-[0.2em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Hire
              </a>
              <a
                href="#care"
                className="cine-mono rounded-sm text-[0.7rem] uppercase tracking-[0.2em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Care
              </a>
            </div>
          </div>
          <p className="cine-mono mt-8 text-center text-[0.62rem] uppercase tracking-[0.2em] text-[var(--c-sage)]/70">
            {BRAND.domain} · Concept 01 / Cinematic Jungle
          </p>
        </footer>
      </div>
    </section>
  );
}
