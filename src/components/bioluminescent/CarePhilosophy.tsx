"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { CARE_STEPS } from "@/lib/content";
import { NIGHT, withAlpha } from "./theme";
import { cn } from "@/lib/utils";

export default function CarePhilosophy() {
  const [open, setOpen] = useState(0);
  const root = useRef<HTMLElement | null>(null);

  return (
    <section ref={root} className="relative mx-auto max-w-6xl px-6 py-28">
      <p
        className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.4em]"
        style={{ color: withAlpha(NIGHT.glow, 0.7) }}
      >
        Care, honestly
      </p>
      <h2 className="mb-14 max-w-2xl font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,3.6rem)] font-light leading-tight">
        Keeping things alive is{" "}
        <span
          className="italic"
          style={{ fontFamily: "var(--font-accent)", color: NIGHT.lume, textShadow: `0 0 24px ${withAlpha(NIGHT.lume, 0.5)}` }}
        >
          simpler than it looks
        </span>
      </h2>

      <div className="grid gap-10 md:grid-cols-[auto_1fr]">
        {/* glowing dew-stem progress rail */}
        <div className="relative hidden w-16 md:block">
          <span
            className="absolute left-1/2 top-2 h-full w-[2px] -translate-x-1/2"
            style={{ background: withAlpha(NIGHT.glow, 0.14) }}
          />
          {CARE_STEPS.map((_, i) => {
            const on = i <= open;
            return (
              <div
                key={i}
                className="relative mb-[88px] flex justify-center"
                style={{ height: 0 }}
              >
                <span
                  className="absolute top-3 h-4 w-4 rounded-full transition-all duration-500"
                  style={{
                    background: on ? NIGHT.lume : NIGHT.void,
                    border: `1.5px solid ${withAlpha(NIGHT.lume, on ? 0.9 : 0.3)}`,
                    boxShadow: on ? `0 0 18px ${withAlpha(NIGHT.lume, 0.8)}` : "none",
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          {CARE_STEPS.map((step, i) => {
            const isOpen = open === i;
            return (
              <button
                key={step.title}
                onClick={() => setOpen(i)}
                onMouseEnter={() => setOpen(i)}
                className={cn(
                  "group relative w-full overflow-hidden rounded-2xl border px-7 py-6 text-left transition-all",
                )}
                style={{
                  borderColor: isOpen ? withAlpha(NIGHT.lume, 0.4) : withAlpha(NIGHT.glow, 0.12),
                  background: isOpen
                    ? `linear-gradient(120deg, ${withAlpha(NIGHT.deep, 0.4)}, ${withAlpha(NIGHT.void, 0.6)})`
                    : "transparent",
                  boxShadow: isOpen ? `0 0 40px ${withAlpha(NIGHT.lume, 0.1)}` : "none",
                }}
              >
                <div className="flex items-center gap-5">
                  <span
                    className="font-[family-name:var(--font-mono)] text-sm"
                    style={{
                      color: isOpen ? NIGHT.lume : "#dff3ff55",
                      textShadow: isOpen ? `0 0 14px ${withAlpha(NIGHT.lume, 0.5)}` : "none",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-light md:text-2xl">
                    {step.title}
                  </h3>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 max-w-xl pl-[52px] text-[14px] leading-relaxed text-[#dff3ff]/65">
                    {step.body}
                  </p>
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
