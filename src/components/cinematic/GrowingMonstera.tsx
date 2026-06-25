"use client";

/**
 * The procedural growing-monstera set-piece: a stem that draws itself in and six
 * leaves that unfurl, driven by a `grow` 0..1 value tied to THIS element's own
 * scroll position (not the parent section's), so it grows exactly as it passes
 * through the viewport.
 *
 * - Desktop: scroll-scrubbed via the lazy GSAP path (GSAP never ships to phones).
 * - Touch: scrubbed by a cheap rAF-throttled scroll read of its own rect - so
 *   you watch it grow as you scroll to it, rather than it firing early off the
 *   section top or autoplaying below the fold.
 */

import { useEffect, useRef, useState } from "react";
import { MonsteraLeaf } from "./botanicals";
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

export default function GrowingMonstera({
  className = "",
}: {
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [grow, setGrow] = useState(0);
  const rich = useRichMotion();

  // Desktop: scroll-scrub via lazy GSAP, tied to this element.
  useGsapReveal(root, (_gsap, ScrollTrigger) => {
    ScrollTrigger.create({
      trigger: root.current,
      start: "top 85%",
      end: "bottom 45%",
      scrub: 0.6,
      onUpdate: (self) => setGrow(self.progress),
    });
  });

  // Touch / non-rich: scrub by this element's own position as it scrolls.
  useEffect(() => {
    if (rich || prefersReducedMotion()) return;
    const el = root.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const centre = r.top + r.height / 2;
      // 0 when the centre is at the viewport bottom, 1 once it reaches ~45% up
      const p = Math.max(0, Math.min(1, (vh - centre) / (vh * 0.55)));
      setGrow(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [rich]);

  return (
    <div ref={root} className={`relative mx-auto aspect-[3/4] w-full max-w-md ${className}`}>
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
  );
}
