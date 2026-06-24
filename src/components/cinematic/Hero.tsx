"use client";

/**
 * Signature HERO — Parallax Foliage Depth Corridor.
 *
 * Layered procedural-SVG foliage (background mist -> mid plants -> foreground
 * fronds) parallaxes at different scroll speeds via GSAP ScrollTrigger so the
 * viewer "walks into" the jungle. A drifting chartreuse pollen canvas floats
 * between the layers. Volumetric light shafts + mist via layered gradients.
 * The hero headline (Fraunces, light, huge) splits in and an F1 media slot is
 * framed cinematically.
 */

import Image from "next/image";
import { useRef } from "react";
import { ArrowDown, Sprout } from "lucide-react";
import { BRAND } from "@/lib/content";
import { Frond, PlantSilhouette, MistBand } from "./botanicals";
import Pollen from "./Pollen";
import MagneticCTA from "./MagneticCTA";
import { useReducedMotion } from "./hooks";
import { useGsapReveal } from "./useGsapReveal";
import { useTheme } from "./ThemeProvider";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  // Cinematic visuals (video, foliage, pollen, shafts) render on mobile too -
  // they are the soul of the opening. We only suppress them for users who asked
  // for reduced motion. The heavier scroll-linked parallax stays desktop-only
  // (loaded lazily via useGsapReveal below), since GSAP was the real mobile
  // cost, not the visuals. The poster always sits under the video so the swap
  // cross-fades rather than flashing.
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const heroPoster =
    theme === "day" ? "/media/glasshouse-day.webp" : "/media/hero.webp";
  const heroVideo =
    theme === "day"
      ? "/media/video/glasshouse-day.mp4"
      : "/media/video/hero-loop.mp4";

  // GSAP only adds the scroll-linked PARALLAX (layers drifting as you scroll) on
  // top of the already-rendered visuals, and it loads only on motion-OK desktops.
  // Mobile keeps the full cinematic hero, just without the scroll parallax.
  useGsapReveal(root, (gsap) => {
    // Parallax depth — each layer scrolls at its own speed.
    const layers: [string, number][] = [
      [".cine-layer-mist", -8],
      [".cine-layer-back", -22],
      [".cine-layer-mid", -46],
      [".cine-layer-fore", -92],
      [".cine-layer-near", -140],
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

    // Light shafts widen slightly as you scroll, content lifts.
    gsap.to(".cine-shafts", {
      opacity: 0.25,
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(".cine-hero-content", {
      yPercent: -18,
      opacity: 0.4,
      ease: "none",
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Base cinematic media: a poster still always sits underneath, so a
          day/night swap cross-fades instead of flashing black; on desktop the
          matching video fades in over it. Touch/reduced shows just the still. */}
      <div className="absolute inset-0">
        <Image
          key={heroPoster}
          src={heroPoster}
          alt=""
          fill
          priority
          quality={50}
          sizes="100vw"
          className="object-cover"
        />
        {!reduced && (
          <video
            key={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="cine-hero-video absolute inset-0 h-full w-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 6%, rgba(22,39,27,0.28) 0%, rgba(12,20,16,0.64) 55%, rgba(6,12,8,0.92) 100%)",
          }}
        />
      </div>

      {/* Decorative depth layers: procedural SVG foliage + the drifting pollen
          canvas. These render on every device (reduced-motion users excepted);
          the scroll parallax on top is layered on lazily on desktop. */}
      {!reduced && (
        <>
      {/* Volumetric light shafts */}
      <div className="cine-shafts absolute inset-0 opacity-40">
        {[20, 42, 64, 80].map((left, i) => (
          <div
            key={i}
            className="absolute top-[-20%] h-[140%] w-[16%]"
            style={{
              left: `${left}%`,
              transform: `rotate(${8 - i * 4}deg)`,
              background:
                "linear-gradient(180deg, rgba(159,209,91,0.22), rgba(159,209,91,0.04) 45%, transparent 70%)",
              filter: "blur(22px)",
              mixBlendMode: "screen",
            }}
          />
        ))}
      </div>

      {/* DEPTH LAYERS */}
      {/* far mist band */}
      <div className="cine-layer-mist absolute inset-x-0 bottom-0 h-[42%] opacity-50">
        <MistBand accent="#1f5f3f" className="h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(12,20,16,0.7))",
          }}
        />
      </div>

      {/* background plant cluster */}
      <div className="cine-layer-back absolute -bottom-10 left-[6%] w-[26%] max-w-[360px] opacity-60 blur-[2px]">
        <PlantSilhouette accent="#1f5f3f" seed="back-a" className="w-full" />
      </div>
      <div className="cine-layer-back absolute -bottom-10 right-[8%] w-[24%] max-w-[340px] opacity-55 blur-[2px]">
        <PlantSilhouette accent="#1f5f3f" seed="back-b" className="w-full" />
      </div>

      {/* pollen between layers */}
      <Pollen count={70} className="absolute inset-0 h-full w-full" />

      {/* mid plants */}
      <div className="cine-layer-mid absolute -bottom-16 left-[-2%] w-[34%] max-w-[440px] opacity-90">
        <PlantSilhouette accent="#2c5f3a" seed="mid-a" className="w-full" />
      </div>
      <div className="cine-layer-mid absolute -bottom-16 right-[-3%] w-[32%] max-w-[420px] opacity-90">
        <PlantSilhouette accent="#356b41" seed="mid-b" className="w-full" />
      </div>
        </>
      )}

      {/* HERO CONTENT */}
      <div className="cine-hero-content relative z-20 mx-auto w-full max-w-6xl px-6 text-center">
        <div className="cine-hero-fade cine-anim-fade mb-7 flex items-center justify-center gap-3">
          <span className="cine-eyebrow" style={{ color: "#9fd15b" }}>
            {BRAND.location.label}
          </span>
          <span className="h-px w-10 bg-[rgba(176,141,87,0.5)]" />
          <span className="cine-mono text-[0.7rem] uppercase tracking-[0.28em] text-[#a9b5a3]">
            Hertford
          </span>
        </div>

        <h1 className="cine-serif mx-auto max-w-5xl text-[clamp(3.2rem,11vw,9.5rem)] text-[#f4efe3]">
          <span className="block overflow-hidden">
            <span className="cine-hero-line cine-anim-rise block" style={{ animationDelay: "0.12s" }}>Plants with</span>
          </span>
          <span className="block overflow-hidden">
            <span className="cine-hero-line cine-anim-rise block" style={{ animationDelay: "0.26s" }}>
              <span className="cine-accent text-[#9fd15b]">presence</span>.
            </span>
          </span>
        </h1>

        <p className="cine-hero-fade cine-anim-fade mx-auto mt-8 max-w-xl text-balance text-[1.05rem] leading-relaxed text-[#a9b5a3]">
          A working glasshouse in Hertford. We grow characterful houseplants,
          and we style and hire them for the rooms that want to feel alive.
        </p>

        <div className="cine-hero-fade cine-anim-fade mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticCTA href="#collection">
            <Sprout className="h-4 w-4" aria-hidden="true" /> Shop the collection
          </MagneticCTA>
          <MagneticCTA href="#hire" variant="ghost">
            Plant hire &amp; styling
          </MagneticCTA>
        </div>

      </div>

      {!reduced && (
        <>
      {/* FOREGROUND fronds (closest, fastest) */}
      <div className="cine-layer-fore pointer-events-none absolute -left-10 top-[-8%] w-[30%] max-w-[420px] opacity-95">
        <Frond accent="#1a4d30" className="w-full" />
      </div>
      <div className="cine-layer-fore pointer-events-none absolute -right-12 top-[-12%] w-[32%] max-w-[440px] opacity-95">
        <Frond accent="#1a4d30" flip className="w-full" />
      </div>
      <div className="cine-layer-near pointer-events-none absolute -bottom-24 -left-16 w-[42%] max-w-[560px] opacity-100">
        <Frond accent="#0f3a22" className="w-full rotate-[18deg]" />
      </div>
      <div className="cine-layer-near pointer-events-none absolute -bottom-28 -right-20 w-[44%] max-w-[580px] opacity-100">
        <Frond accent="#0f3a22" flip className="w-full -rotate-[16deg]" />
      </div>
        </>
      )}

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(6,12,8,0.85) 100%)",
        }}
      />

      {/* scroll cue */}
      <div className="cine-hero-fade cine-anim-fade absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="cine-mono text-[0.62rem] uppercase tracking-[0.3em] text-[var(--c-sage)]">
          Walk in
        </span>
        <ArrowDown
          className="h-4 w-4 text-[var(--c-glow)]"
          aria-hidden="true"
          style={{ animation: reduced ? undefined : "cine-pulse 2s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
