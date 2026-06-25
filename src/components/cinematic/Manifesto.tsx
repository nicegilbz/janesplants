"use client";

/**
 * Brand manifesto + the growth set-piece.
 *
 * The growth column has two parts that coexist: a hand-built SVG Monstera that
 * GROWS (the stem draws itself in, six leaves unfurl) driven by a `grow` 0..1
 * value, and the real time-lapse (GrowthScrub) below it. On desktop `grow` is
 * scroll-scrubbed via the lazy GSAP path (useGsapReveal - GSAP never ships to
 * phones); on touch it eases in once via IntersectionObserver + rAF (no GSAP).
 */

import { useEffect, useRef, useState } from "react";
import { BRAND } from "@/lib/content";
import { MonsteraLeaf } from "./botanicals";
import GrowthScrub from "./GrowthScrub";
import { useGsapReveal } from "./useGsapReveal";
import { useRichMotion, prefersReducedMotion } from "./hooks";

const r2 = (n: number) => Math.round(n * 100) / 100;

const LEAVES = [
  { x: 0, y: -10, s: 1.0, r: 0, at: 0.0 },
  { x: -120, y: 40, s: 0.7, r: -28, at: 0.18 },
  { x: 120, y: 30, s: 0.72, r: 26, at: 0.34 },
  { x: -80, y: 150, s: 0.6, r: -44, at: 0.52 },
  { x: 90, y: 160, s: 0.58, r: 40, at: 0.66 },
  { x: 0, y: 230, s: 0.5, r: 0, at: 0.8 },
];

export default function Manifesto() {
  const root = useRef<HTMLDivElement>(null);
  const [grow, setGrow] = useState(0);
  const rich = useRichMotion();

  // Desktop: scroll-scrub the growth. useGsapReveal dynamic-imports GSAP only on
  // confirmed motion-OK desktops, so phones never download or run it.
  useGsapReveal(root, (_gsap, ScrollTrigger) => {
    ScrollTrigger.create({
      trigger: root.current,
      start: "top 70%",
      end: "bottom 60%",
      scrub: 0.6,
      onUpdate: (self) => setGrow(self.progress),
    });
  });

  // Touch / non-rich: ease the plant in once as the section enters view - no
  // GSAP, mirroring CountUp (IntersectionObserver + requestAnimationFrame).
  useEffect(() => {
    if (rich || prefersReducedMotion()) return;
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setGrow(1);
      return;
    }
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          io.disconnect();
          const t0 = performance.now();
          const duration = 1800;
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration);
            setGrow(1 - Math.pow(1 - p, 3));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rich]);

  return (
    <section
      ref={root}
      className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-32 lg:grid-cols-[1.05fr_0.95fr] lg:py-44"
    >
      {/* Text column */}
      <div>
        <div className="mb-8 flex items-center gap-4">
          <span className="cine-eyebrow">The glasshouse</span>
          <span className="h-px w-16 bg-[var(--c-brass-line)]" />
        </div>
        <p className="cine-mani-text cine-serif max-w-2xl text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.08] text-[var(--c-bone)]">
          We hand-pick characterful plants, pair them with pots worth showing
          off, and tell you{" "}
          <span className="cine-accent text-[var(--c-glow)]">
            exactly how to keep them alive
          </span>
          .
        </p>

        <ul className="cine-promise-list mt-12 space-y-4">
          {BRAND.promise.map((p) => (
            <li
              key={p}
              className="cine-promise flex items-start gap-4 text-[var(--c-sage)]"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--c-glow)] shadow-[0_0_12px_var(--c-glow)]" />
              <span className="text-[1.02rem] leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-md cine-glass rounded-2xl p-6">
          <p className="text-[0.95rem] leading-relaxed text-[var(--c-bone)]/85">
            “{BRAND.founder.note}”
          </p>
          <p className="cine-mono mt-4 text-[0.7rem] uppercase tracking-[0.22em] text-[var(--c-brass)]">
            {BRAND.founder.name}, {BRAND.founder.role}
          </p>
        </div>
      </div>

      {/* Growth column: procedural growing monstera + the real time-lapse */}
      <div className="relative">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
          {/* glow pool */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 45%, rgba(159,209,91,0.14), transparent 70%)",
            }}
          />
          {/* growing stem */}
          <svg
            viewBox="0 0 400 560"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <path
              d="M200 560 C196 440 204 360 200 280 C196 210 202 150 200 90"
              fill="none"
              stroke="#2c5f3a"
              strokeWidth="6"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: r2(1 - Math.min(1, grow * 1.1)),
              }}
            />
          </svg>

          {/* leaves unfurling */}
          <div className="absolute inset-0">
            {LEAVES.map((lf, i) => {
              const local = Math.max(0, Math.min(1, (grow - lf.at) / 0.2));
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-[42%] w-[44%]"
                  style={{
                    transform: `translate(-50%, -50%) translate(${r2(lf.x * local)}px, ${r2(lf.y * local)}px) rotate(${r2(lf.r * local)}deg) scale(${r2(0.2 + lf.s * local * 0.85)})`,
                    opacity: r2(local),
                    transformOrigin: "center bottom",
                  }}
                >
                  <MonsteraLeaf
                    accent={i === 0 ? "#9fd15b" : "#2f6b3c"}
                    t={local}
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* the real time-lapse, below the procedural growth */}
        <div className="mx-auto mt-6 max-w-md">
          <GrowthScrub
            poster="/media/leaf-macro.webp"
            video="/media/video/growth.mp4"
            aspect="4 / 3"
            label="growth time-lapse"
          />
        </div>
      </div>
    </section>
  );
}
