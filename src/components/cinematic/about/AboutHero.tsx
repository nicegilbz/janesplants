"use client";

/**
 * About HERO — the "our story" opener. Layered procedural foliage parallax
 * (reused botanicals), a split serif headline reveal, and a soft glasshouse
 * still. The transparent fixed header floats over it.
 *
 * All randomness/animation lives inside useGSAP (runs after mount), so the
 * server render stays deterministic and hydration-safe.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowDown, Sprout } from "lucide-react";
import { Frond, MistBand, PlantSilhouette } from "../botanicals";
import MagneticCTA from "../MagneticCTA";
import { useReducedMotion } from "../hooks";

export default function AboutHero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (reduced) return;

      gsap.registerPlugin(ScrollTrigger);
      const layers: [string, number][] = [
        [".about-layer-back", -18],
        [".about-layer-mid", -42],
        [".about-layer-fore", -78],
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
      gsap.to(".about-hero-content", {
        yPercent: -12,
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
      className="relative flex min-h-[88svh] items-center overflow-hidden"
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
        {[18, 44, 72].map((left, i) => (
          <div
            key={i}
            className="absolute top-[-20%] h-[140%] w-[16%]"
            style={{
              left: `${left}%`,
              transform: `rotate(${8 - i * 4}deg)`,
              background:
                "linear-gradient(180deg, rgba(159,209,91,0.2), rgba(159,209,91,0.04) 45%, transparent 70%)",
              filter: "blur(24px)",
              mixBlendMode: "screen",
            }}
          />
        ))}
      </div>

      {/* far mist band */}
      <div className="about-layer-back absolute inset-x-0 bottom-0 h-[40%] opacity-50">
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
      <div className="about-layer-mid absolute -bottom-16 left-[-3%] w-[28%] max-w-[400px] opacity-80 blur-[1px]">
        <PlantSilhouette accent="#2c5f3a" seed="about-mid-a" className="w-full" />
      </div>
      <div className="about-layer-mid absolute -bottom-20 right-[-4%] w-[28%] max-w-[400px] opacity-80 blur-[1px]">
        <PlantSilhouette accent="#356b41" seed="about-mid-b" className="w-full" />
      </div>

      {/* foreground fronds */}
      <div className="about-layer-fore pointer-events-none absolute -left-12 top-[-8%] w-[26%] max-w-[380px] opacity-95">
        <Frond accent="#143f28" className="w-full" />
      </div>
      <div className="about-layer-fore pointer-events-none absolute -right-14 bottom-[-14%] w-[28%] max-w-[420px] opacity-95">
        <Frond accent="#0f3a22" flip className="w-full -rotate-6" />
      </div>

      {/* CONTENT */}
      <div className="about-hero-content relative z-20 mx-auto w-full max-w-4xl px-6 pt-28 pb-20 text-center lg:pt-24">
        <div className="cine-anim-fade mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[var(--c-brass-line)]" />
          <span className="cine-eyebrow">Our story</span>
          <span className="h-px w-10 bg-[var(--c-brass-line)]" />
        </div>

        <h1 className="cine-serif text-[clamp(2.8rem,8vw,6rem)] leading-[0.98] text-[var(--c-bone)]">
          <span className="block overflow-hidden">
            <span className="cine-anim-rise block">It started on a</span>
          </span>
          <span className="block overflow-hidden">
            <span className="cine-anim-rise block">
              <span className="cine-accent text-[var(--c-glow)]">windowsill</span>.
            </span>
          </span>
        </h1>

        <p className="cine-anim-fade mx-auto mt-7 max-w-xl text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
          One cutting, a south-facing ledge, and a stubborn refusal to let
          anything die. This is how a small obsession with green became a
          glasshouse in Hertford.
        </p>

        <div className="cine-anim-fade mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticCTA href="#our-story">
            <Sprout className="h-4 w-4" aria-hidden="true" /> Read the story
          </MagneticCTA>
          <MagneticCTA href="/visit" variant="ghost">
            Come and visit
          </MagneticCTA>
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
      <div className="cine-anim-fade absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="cine-mono text-[0.62rem] uppercase tracking-[0.3em] text-[var(--c-sage)]">
          Meet Jane
        </span>
        <ArrowDown
          className="h-4 w-4 text-[var(--c-glow)]"
          aria-hidden="true"
          style={{
            animation: reduced ? undefined : "cine-pulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
