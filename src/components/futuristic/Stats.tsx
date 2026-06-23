"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { STATS } from "@/lib/content";

export default function Stats() {
  return (
    <section className="relative border-y border-[#5cf2a0]/10 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[#5cf2a0]/60">
          <span className="h-px w-12 bg-[#5cf2a0]/40" />
          <span>05 / System metrics</span>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#5cf2a0]/12 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Stat key={s.label} value={s.value} label={s.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState("0");

  // animate the numeric portion if there is one
  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(`${Math.round(target * eased)}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="relative bg-[#0c2a2a]/25 p-7 md:p-9"
    >
      <div className="pointer-events-none absolute inset-0 fx-grid-flat opacity-10" />
      <div
        className="relative font-mono text-4xl font-semibold tabular-nums text-[#5cf2a0] md:text-5xl"
        style={{ textShadow: "0 0 24px rgba(92,242,160,0.4)" }}
      >
        {display}
      </div>
      <div className="relative mt-3 text-xs uppercase tracking-[0.2em] text-[#dafff0]/50">
        {label}
      </div>
    </motion.div>
  );
}
