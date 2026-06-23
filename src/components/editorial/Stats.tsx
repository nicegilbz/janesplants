"use client";

/**
 * Stats — credibility band. Big tabular numerals with a count-up on reveal,
 * separated by hairline rules. Editorial ledger style.
 */

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/content";

export default function Stats() {
  return (
    <section className="relative bg-[var(--ed-ink)] text-[var(--ed-cream)]">
      <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="ed-mono mb-14 flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.28em] text-[var(--ed-cream)]/55">
          <span className="text-[var(--ed-brass)]">§ 06</span>
          <span className="h-px flex-1 bg-[var(--ed-cream)]/15" />
          <span>By the numbers</span>
        </div>

        <div className="grid grid-cols-1 divide-y divide-[var(--ed-cream)]/15 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col gap-3 py-8 sm:py-0 lg:border-l lg:border-[var(--ed-cream)]/15 lg:px-8 lg:first:border-l-0"
            >
              <StatValue value={s.value} delay={i * 0.08} />
              <span className="ed-mono max-w-[12rem] text-[0.66rem] uppercase leading-relaxed tracking-[0.18em] text-[var(--ed-cream)]/60">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatValue({ value, delay }: { value: string; delay: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  // Parse a leading integer to animate; keep the suffix (+, yr, h, %).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^(\d+)(.*)$/);
    // display already initialises to `value`, so reduced-motion / non-numeric
    // stats need no further work.
    if (
      !match ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const dur = 1100;
            const tick = (now: number) => {
              const t = Math.min(1, (now - start - delay * 1000) / dur);
              const eased = t < 0 ? 0 : 1 - Math.pow(1 - t, 3);
              setDisplay(`${Math.round(target * eased)}${suffix}`);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, delay]);

  return (
    <span
      ref={ref}
      className="ed-display ed-num text-[clamp(3.2rem,7vw,5.6rem)] leading-none text-[var(--ed-cream)]"
    >
      {display}
    </span>
  );
}
