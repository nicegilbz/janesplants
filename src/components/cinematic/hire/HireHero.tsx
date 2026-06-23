"use client";

/**
 * Plant-hire HERO. Full-height cinematic opener for the rent-and-style line.
 * Layered procedural foliage parallax (reused botanicals), volumetric light,
 * a split headline reveal, a magnetic CTA into the enquiry section, and an F4
 * day/night glasshouse media pair. The transparent fixed header floats over it.
 *
 * All randomness/animation lives inside useGSAP (runs after mount), so the
 * server render stays deterministic and hydration-safe.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowDown, Leaf } from "lucide-react";
import { Frond, PlantSilhouette, MistBand } from "../botanicals";
import MediaSlot from "../MediaSlot";
import MagneticCTA from "../MagneticCTA";
import { useReducedMotion } from "../hooks";

export default function HireHero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      gsap.from(".hire-hero-line", {
        yPercent: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2,
      });
      gsap.from(".hire-hero-fade", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.8,
      });

      if (reduced) return;

      // Subtle, header-friendly parallax drift on the foliage layers.
      gsap.registerPlugin(ScrollTrigger);
      const layers: [string, number][] = [
        [".hire-layer-back", -20],
        [".hire-layer-mid", -44],
        [".hire-layer-fore", -84],
      ];
      layers.forEach(([sel, dist]) => {
        gsap.to(sel, {
          yPercent: dist,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      gsap.to(".hire-hero-content", {
        yPercent: -14,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Base atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 6%, #16271b 0%, #0c1410 55%, #060c08 100%)",
        }}
      />

      {/* Volumetric light shafts */}
      <div className="absolute inset-0 opacity-40">
        {[16, 38, 70, 86].map((left, i) => (
          <div
            key={i}
            className="absolute top-[-20%] h-[140%] w-[16%]"
            style={{
              left: `${left}%`,
              transform: `rotate(${9 - i * 4}deg)`,
              background:
                "linear-gradient(180deg, rgba(159,209,91,0.2), rgba(159,209,91,0.04) 45%, transparent 70%)",
              filter: "blur(24px)",
              mixBlendMode: "screen",
            }}
          />
        ))}
      </div>

      {/* far mist band */}
      <div className="hire-layer-back absolute inset-x-0 bottom-0 h-[40%] opacity-50">
        <MistBand accent="#1f5f3f" className="h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(12,20,16,0.7))",
          }}
        />
      </div>

      {/* mid plant silhouettes */}
      <div className="hire-layer-mid absolute -bottom-16 left-[-3%] w-[30%] max-w-[420px] opacity-80 blur-[1px]">
        <PlantSilhouette accent="#2c5f3a" seed="hire-mid-a" className="w-full" />
      </div>
      <div className="hire-layer-mid absolute -bottom-20 right-[-4%] w-[30%] max-w-[420px] opacity-80 blur-[1px]">
        <PlantSilhouette accent="#356b41" seed="hire-mid-b" className="w-full" />
      </div>

      {/* foreground fronds */}
      <div className="hire-layer-fore pointer-events-none absolute -left-12 top-[-10%] w-[28%] max-w-[400px] opacity-95">
        <Frond accent="#143f28" className="w-full" />
      </div>
      <div className="hire-layer-fore pointer-events-none absolute -right-14 bottom-[-14%] w-[30%] max-w-[440px] opacity-95">
        <Frond accent="#0f3a22" flip className="w-full -rotate-6" />
      </div>

      {/* CONTENT — two columns: copy + media pair */}
      <div className="hire-hero-content relative z-20 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 pt-28 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
        <div>
          <div className="hire-hero-fade mb-6 flex items-center gap-3">
            <span className="cine-eyebrow">Plant hire and styling</span>
            <span className="h-px w-10 bg-[var(--c-brass-line)]" />
            <span className="cine-mono text-[0.7rem] uppercase tracking-[0.28em] text-[var(--c-sage)]">
              Hertford
            </span>
          </div>

          <h1 className="cine-serif text-[clamp(2.8rem,8vw,6.5rem)] text-[var(--c-bone)]">
            <span className="block overflow-hidden">
              <span className="hire-hero-line block">Living green,</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hire-hero-line block">
                on <span className="cine-accent text-[var(--c-glow)]">loan</span>.
              </span>
            </span>
          </h1>

          <p className="hire-hero-fade mt-7 max-w-md text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
            We design, deliver and look after plants for homes, offices, events
            and weddings, across Hertford and beyond. You get the jungle. We keep
            it alive.
          </p>

          <div className="hire-hero-fade mt-9 flex flex-wrap items-center gap-4">
            <MagneticCTA href="#enquire">
              <Leaf className="h-4 w-4" /> Start an enquiry
            </MagneticCTA>
            <MagneticCTA href="#packages" variant="ghost">
              See the packages
            </MagneticCTA>
          </div>

          <p className="hire-hero-fade mt-6 text-[0.8rem] text-[var(--c-sage)]">
            Prefer to buy outright?{" "}
            <Link
              href="/cinematic/shop"
              className="text-[var(--c-glow)] underline-offset-4 hover:underline"
            >
              Shop the collection
            </Link>
            .
          </p>
        </div>

        {/* F4 day/night glasshouse pair */}
        <div className="hire-hero-fade">
          <MediaSlot
            id="F4"
            src="/media/glasshouse-night.png"
            label="day / night glasshouse"
            kind="pair"
            aspect="4 / 5"
            className="mx-auto w-full max-w-md"
          />
        </div>
      </div>

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 40%, transparent 58%, rgba(6,12,8,0.8) 100%)",
        }}
      />

      {/* scroll cue */}
      <div className="hire-hero-fade absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="cine-mono text-[0.62rem] uppercase tracking-[0.3em] text-[var(--c-sage)]">
          How it works
        </span>
        <ArrowDown
          className="h-4 w-4 text-[var(--c-glow)]"
          style={{
            animation: reduced ? undefined : "cine-pulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
