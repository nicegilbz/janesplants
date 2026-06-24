"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./hooks";

/**
 * Counts a number up from 0 to `value` the first time it scrolls into view.
 * IntersectionObserver + requestAnimationFrame, no GSAP. SSR renders the final
 * value (so it is never blank / never shifts layout); the count-up only kicks
 * in on the client when the figure enters the viewport.
 */
export default function CountUp({
  value,
  suffix,
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined" || prefersReducedMotion())
      return;

    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            io.disconnect();
            const t0 = performance.now();
            const duration = 1500;
            setDisplay(0);
            const tick = (t: number) => {
              const p = Math.min(1, (t - t0) / duration);
              const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
              setDisplay(Math.round(eased * value));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      <span>{display}</span>
      {suffix ? <span className="text-[var(--c-glow)]">{suffix}</span> : null}
    </span>
  );
}
