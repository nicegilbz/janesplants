"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CARE_STEPS } from "@/lib/content";
import { DataStream } from "./Telemetry";

const PROTOCOLS = [
  ["scan ambient lux", "map to species tolerance", "place accordingly"],
  ["probe substrate moisture", "withhold if > 30%", "irrigate to field capacity"],
  ["detect growth phase", "dose nutrients spring/summer", "taper autumn/winter"],
  ["inspect root bound", "upsize vessel +2cm", "re-establish in fresh medium"],
];

export default function CarePhilosophy() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[#5cf2a0]/60">
          <span className="h-px w-12 bg-[#5cf2a0]/40" />
          <span>04 / Care protocol</span>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          {/* step list */}
          <div className="space-y-2">
            {CARE_STEPS.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.title}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group w-full overflow-hidden rounded-xl border text-left transition-all duration-300 ${
                    on
                      ? "border-[#5cf2a0]/40 bg-[#5cf2a0]/[0.06]"
                      : "border-[#eaf3ee]/8 hover:border-[#5be0e6]/25"
                  }`}
                >
                  <div className="flex items-center gap-4 p-5">
                    <span
                      className={`font-mono text-xs tabular-nums transition-colors ${
                        on ? "text-[#5cf2a0]" : "text-[#dafff0]/35"
                      }`}
                    >
                      P0{i + 1}
                    </span>
                    <span
                      className={`text-xl font-medium transition-colors md:text-2xl ${
                        on ? "text-[#eaf3ee]" : "text-[#dafff0]/55"
                      }`}
                      style={{ fontFamily: "var(--font-grotesk)" }}
                    >
                      {s.title}
                    </span>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pl-14 text-sm leading-relaxed text-[#dafff0]/65">
                      {s.body}
                    </p>
                  </motion.div>
                </button>
              );
            })}
          </div>

          {/* live protocol console */}
          <div className="relative">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-[#5cf2a0]/15 bg-[#06120d]/60 p-6 backdrop-blur-sm">
              <div className="pointer-events-none absolute inset-0 fx-scanlines opacity-40" />
              <div className="relative">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-[#5be0e6]/70">
                  <span>care.protocol</span>
                  <span className="flex items-center gap-1.5 text-[#5cf2a0]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5cf2a0] shadow-[0_0_8px_#5cf2a0]" />
                    running
                  </span>
                </div>
                <motion.h3
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 text-2xl font-semibold text-[#eaf3ee]"
                  style={{ fontFamily: "var(--font-grotesk)" }}
                >
                  {CARE_STEPS[active].title}
                </motion.h3>
                <div className="mt-5 rounded-lg border border-[#5cf2a0]/10 bg-[#0c2a2a]/30 p-4">
                  <DataStream key={active} lines={PROTOCOLS[active]} />
                </div>
                <div className="mt-5 grid grid-cols-4 gap-1.5">
                  {CARE_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        background: i <= active ? "#5cf2a0" : "#0c2a2a",
                        boxShadow: i <= active ? "0 0 6px #5cf2a0" : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
