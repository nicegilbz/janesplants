"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BRAND } from "@/lib/content";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const words = BRAND.mission.split(" ");

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-6xl px-6 py-32 md:px-12 md:py-44"
    >
      <div className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[#5cf2a0]/60">
        <span className="h-px w-12 bg-[#5cf2a0]/40" />
        <span>01 / Mission log</span>
      </div>

      <p
        className="max-w-4xl text-2xl font-light leading-snug tracking-tight text-[#dafff0] md:text-4xl"
        style={{ fontFamily: "var(--font-grotesk)" }}
      >
        {words.map((w, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return <Word key={i} progress={scrollYProgress} range={[start, end]}>{w}</Word>;
        })}
      </p>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[#5cf2a0]/12 md:grid-cols-3">
        {BRAND.promise.map((p, i) => (
          <motion.div
            key={p}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="bg-[#0c2a2a]/30 p-7"
          >
            <span className="font-mono text-xs text-[#5be0e6]/70">
              0{i + 1}
            </span>
            <p className="mt-3 text-base text-[#eaf3ee]/85">{p}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["#3a6b5a", "#eaf3ee"]);
  return (
    <motion.span style={{ opacity, color }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}
