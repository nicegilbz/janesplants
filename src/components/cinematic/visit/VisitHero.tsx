"use client";

/**
 * Visit HERO. Full-height cinematic opener for the glasshouse-visit page.
 * Layered procedural foliage parallax (reused botanicals), volumetric light,
 * a split headline reveal, magnetic CTAs into #enquire, and an F4 day/night
 * glasshouse media pair. The transparent fixed header floats over it.
 *
 * All randomness/animation lives inside useGSAP (runs after mount), so the
 * server render stays deterministic and hydration-safe.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowDown, MapPin, Leaf } from "lucide-react";
import { Frond, PlantSilhouette, MistBand } from "../botanicals";
import MediaSlot from "../MediaSlot";
import MagneticCTA from "../MagneticCTA";
import { useReducedMotion } from "../hooks";

export default function VisitHero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      gsap.from(".visit-hero-line", {
        yPercent: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2,
      });
      gsap.from(".visit-hero-fade", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.8,
      });

      if (reduced) return;

      gsap.registerPlugin(ScrollTrigger);
      const layers: [string, number][] = [
        [".visit-layer-back", -20],
        [".visit-layer-mid", -44],
        [".visit-layer-fore", -84],
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
      gsap.to(".visit-hero-content", {
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
            "radial-gradient(120% 90% at 30% 6%, #16271b 0%, #0c1410 55%, #060c08 100%)",
        }}
      />

      {/* Volumetric light shafts */}
      <div className="absolute inset-0 opacity-40">
        {[12, 34, 66, 88].map((left, i) => (
          <div
            key={i}
            className="absolute top-[-20%] h-[140%] w-[16%]"
            style={{
              left: `${left}%`,
              transform: `rotate(${10 - i * 4}deg)`,
              background:
                "linear-gradient(180deg, rgba(159,209,91,0.2), rgba(159,209,91,0.04) 45%, transparent 70%)",
              filter: "blur(24px)",
              mixBlendMode: "screen",
            }}
          />
        ))}
      </div>

      {/* far mist band */}
      <div className="visit-layer-back absolute inset-x-0 bottom-0 h-[40%] opacity-50">
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
      <div className="visit-layer-mid absolute -bottom-16 left-[-3%] w-[30%] max-w-[420px] opacity-80 blur-[1px]">
        <PlantSilhouette accent="#2c5f3a" seed="visit-mid-a" className="w-full" />
      </div>
      <div className="visit-layer-mid absolute -bottom-20 right-[-4%] w-[30%] max-w-[420px] opacity-80 blur-[1px]">
        <PlantSilhouette accent="#356b41" seed="visit-mid-b" className="w-full" />
      </div>

      {/* foreground fronds */}
      <div className="visit-layer-fore pointer-events-none absolute -left-12 top-[-10%] w-[28%] max-w-[400px] opacity-95">
        <Frond accent="#143f28" className="w-full" />
      </div>
      <div className="visit-layer-fore pointer-events-none absolute -right-14 bottom-[-14%] w-[30%] max-w-[440px] opacity-95">
        <Frond accent="#0f3a22" flip className="w-full -rotate-6" />
      </div>

      {/* CONTENT — two columns: copy + media pair */}
      <div className="visit-hero-content relative z-20 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 pt-28 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
        <div>
          <div className="visit-hero-fade mb-6 flex items-center gap-3">
            <span className="cine-eyebrow">Visit</span>
            <span className="h-px w-10 bg-[var(--c-brass-line)]" />
            <span className="cine-mono flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.28em] text-[var(--c-sage)]">
              <MapPin className="h-3.5 w-3.5 text-[var(--c-brass)]" />
              Hertford
            </span>
          </div>

          <h1 className="cine-serif text-[clamp(2.8rem,8vw,6.5rem)] text-[var(--c-bone)]">
            <span className="block overflow-hidden">
              <span className="visit-hero-line block">Come and</span>
            </span>
            <span className="block overflow-hidden">
              <span className="visit-hero-line block">
                <span className="cine-accent text-[var(--c-glow)]">wander</span>.
              </span>
            </span>
          </h1>

          <p className="visit-hero-fade mt-7 max-w-md text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
            A working glasshouse and shop, open to wander. Come and meet the
            plants, breathe the warm green air, and leave with one you cannot
            stop looking at.
          </p>

          <div className="visit-hero-fade mt-9 flex flex-wrap items-center gap-4">
            <MagneticCTA href="#enquire">
              <Leaf className="h-4 w-4" /> Say hello
            </MagneticCTA>
            <MagneticCTA href="#finding-us" variant="ghost">
              How to find us
            </MagneticCTA>
          </div>

          <p className="visit-hero-fade mt-6 text-[0.8rem] text-[var(--c-sage)]">
            Want a plant ready when you arrive?{" "}
            <Link
              href="/cinematic/shop"
              className="text-[var(--c-glow)] underline-offset-4 hover:underline"
            >
              Browse the shop
            </Link>
            .
          </p>
        </div>

        {/* F4 day/night glasshouse pair */}
        <div className="visit-hero-fade">
          <MediaSlot
            id="F4"
            src="/media/glasshouse-day.png"
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
      <div className="visit-hero-fade absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="cine-mono text-[0.62rem] uppercase tracking-[0.3em] text-[var(--c-sage)]">
          Plan your visit
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
