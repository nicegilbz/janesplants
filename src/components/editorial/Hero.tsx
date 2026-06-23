"use client";

/**
 * Hero — the magazine cover / masthead.
 *
 * Signature wow-moment: a full-bleed editorial cover. A large procedural
 * monstera draws itself (stroke-dashoffset) behind a Fraunces masthead that
 * reveals word-by-word, framed by brass hairlines, issue marginalia and a
 * tabular price-of-entry line. Calm, expensive, exact.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BRAND, PLANTS } from "@/lib/content";
import { SplitReveal, useReducedMotion } from "./primitives";

export default function Hero() {
  const wrap = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  // Self-drawing botanical strokes
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const paths = el.querySelectorAll<SVGPathElement>("[data-draw]");
    if (reduced) {
      paths.forEach((p) => {
        p.style.strokeDashoffset = "0";
      });
      return;
    }
    const ctx = gsap.context(() => {
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 2.4,
        ease: "power2.inOut",
        stagger: 0.12,
        delay: 0.2,
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  // Subtle parallax on the cover plate
  useEffect(() => {
    if (reduced) return;
    const el = wrap.current;
    if (!el) return;
    const layers = el.querySelectorAll<HTMLElement>("[data-par]");
    const onScroll = () => {
      const y = window.scrollY;
      layers.forEach((l) => {
        const d = parseFloat(l.dataset.par || "0");
        l.style.transform = `translate3d(0, ${y * d}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  const cheapest = Math.min(...PLANTS.map((p) => p.price));

  return (
    <header
      ref={wrap}
      className="relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-5 pb-16 pt-24 sm:px-10 lg:px-16"
    >
      {/* top masthead rule */}
      <div className="ed-mono flex items-end justify-between border-b border-[var(--ed-hair-strong)] pb-4 text-[0.62rem] uppercase tracking-[0.28em] text-[var(--ed-ink-soft)]">
        <span>Issue 02 / The Glasshouse</span>
        <span className="hidden sm:inline">Hertford, England</span>
        <span className="text-[var(--ed-brass)]">Est. MMXII</span>
      </div>

      <div className="relative grid flex-1 grid-cols-1 items-center gap-8 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        {/* Left: masthead type */}
        <div className="relative z-20 max-w-[34rem]">
          <p className="ed-kicker mb-6">{BRAND.location.line}</p>

          <SplitReveal
            as="h1"
            type="words"
            className="ed-display text-[clamp(3.4rem,11vw,9rem)]"
            stagger={0.12}
            y="118%"
          >
            Plants with{" "}
            <span className="ed-accent italic text-[var(--ed-olive)]">
              presence
            </span>
            .
          </SplitReveal>

          <div className="mt-8 max-w-md">
            <SplitReveal
              as="p"
              type="lines"
              className="ed-body text-[1.02rem] leading-relaxed text-[var(--ed-ink-soft)]"
              stagger={0.1}
              delay={0.3}
            >
              An independent houseplant shop and plant-hire studio in a working
              glasshouse. We sell characterful plants and style rooms, offices
              and weddings with living green.
            </SplitReveal>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#collection"
              className="ed-mono group inline-flex items-center gap-3 rounded-full bg-[var(--ed-ink)] px-6 py-3 text-[0.66rem] uppercase tracking-[0.24em] text-[var(--ed-cream)] transition-transform hover:-translate-y-0.5"
            >
              View the collection
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <p className="ed-mono ed-num text-[0.7rem] uppercase tracking-[0.2em] text-[var(--ed-ink-soft)]">
              From £{cheapest}
              <span className="mx-2 text-[var(--ed-hair-strong)]">/</span>
              Plant hire by enquiry
            </p>
          </div>
        </div>

        {/* Right: self-drawing botanical cover plate */}
        <div className="relative">
          <div
            data-par="0.06"
            className="relative mx-auto aspect-[3/4] w-full max-w-[26rem]"
          >
            {/* frame */}
            <div className="absolute inset-0 border border-[var(--ed-brass)]" />
            <div className="absolute inset-3 border border-[var(--ed-brass)]/40" />
            <CoverBotanical />
            <span className="ed-plate-id absolute bottom-5 left-1/2 -translate-x-1/2">
              F3 / hero specimen still
            </span>
            <span className="ed-mono absolute left-5 top-5 text-[0.6rem] uppercase tracking-[0.22em] text-[var(--ed-ink-soft)]">
              Pl. I
            </span>
            <span className="ed-accent absolute right-5 top-5 text-lg italic text-[var(--ed-olive)]">
              Monstera
            </span>
          </div>
        </div>
      </div>

      {/* bottom marginalia row */}
      <div className="ed-mono mt-auto flex items-center justify-between border-t border-[var(--ed-hair-strong)] pt-4 text-[0.6rem] uppercase tracking-[0.24em] text-[var(--ed-ink-soft)]">
        <span>Retail · Hire · Styling</span>
        <span className="hidden md:inline">Scroll to begin ↓</span>
        <span className="text-[var(--ed-brass)]">{BRAND.contactEmail}</span>
      </div>
    </header>
  );
}

/* A large engraved monstera, line-art, that self-draws. */
function CoverBotanical() {
  return (
    <svg
      viewBox="0 0 400 540"
      className="absolute inset-0 h-full w-full p-6"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="var(--ed-ink)"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <radialGradient id="cover-wash" cx="50%" cy="44%" r="60%">
          <stop offset="0%" stopColor="#6b7a3f" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#6b7a3f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="400" height="540" fill="url(#cover-wash)" />

      {/* central stem */}
      <path data-draw d="M200 520 C200 420 200 340 200 270" strokeWidth="2.4" />

      {/* pairs of split leaves */}
      {[
        { y: 270, s: 1, sc: 1 },
        { y: 320, s: -1, sc: 0.92 },
        { y: 360, s: 1, sc: 0.8 },
        { y: 400, s: -1, sc: 0.66 },
      ].map((lf, i) => (
        <g
          key={i}
          transform={`translate(200 ${lf.y}) scale(${lf.s * lf.sc} ${lf.sc})`}
        >
          <path
            data-draw
            d="M0 0 C40 -10 92 -34 124 -100 C146 -146 140 -196 110 -228 C90 -174 78 -156 56 -154 C74 -124 70 -92 48 -76 C66 -50 60 -18 0 0 Z"
          />
          <path data-draw d="M20 -48 C44 -58 58 -78 66 -104" strokeWidth="0.9" />
          <path data-draw d="M40 -102 C60 -112 74 -136 78 -164" strokeWidth="0.9" />
          <path data-draw d="M62 -150 C82 -162 92 -184 92 -204" strokeWidth="0.9" />
        </g>
      ))}

      {/* crown leaf */}
      <g transform="translate(200 270)">
        <path
          data-draw
          d="M0 0 C0 -60 -8 -120 0 -178 C8 -120 0 -60 0 0 Z"
          strokeWidth="1.1"
        />
        <path
          data-draw
          d="M-2 -30 C-30 -54 -44 -96 -40 -140 M2 -30 C30 -54 44 -96 40 -140"
          strokeWidth="0.9"
        />
      </g>
    </svg>
  );
}
