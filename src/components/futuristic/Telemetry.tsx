"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/** Ambient environment-console readouts (temp / humidity / PAR) that drift. */
export function TelemetryStrip() {
  const [t, setT] = useState({ temp: 22.4, rh: 68, par: 410, co2: 612 });
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    const id = setInterval(() => {
      setT((p) => ({
        temp: clampWobble(p.temp, 21.5, 23.5, 0.18),
        rh: Math.round(clampWobble(p.rh, 62, 74, 0.8)),
        par: Math.round(clampWobble(p.par, 380, 460, 6)),
        co2: Math.round(clampWobble(p.co2, 580, 660, 5)),
      }));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const items = [
    { k: "AIR TEMP", v: `${t.temp.toFixed(1)}°C`, ok: t.temp < 24 },
    { k: "HUMIDITY", v: `${t.rh}%`, ok: t.rh > 60 },
    { k: "PAR", v: `${t.par} µmol`, ok: true },
    { k: "CO₂", v: `${t.co2} ppm`, ok: t.co2 < 700 },
  ];

  return (
    <div className="mx-auto grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#5cf2a0]/15 bg-[#5cf2a0]/[0.03] font-mono backdrop-blur-sm md:grid-cols-4">
      {items.map((it) => (
        <div
          key={it.k}
          className="flex flex-col gap-1 bg-[#06120d]/40 px-4 py-3"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#dafff0]/45">
            {it.k}
          </span>
          <span className="flex items-center gap-2 text-sm text-[#eaf3ee] tabular-nums">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: it.ok ? "#5cf2a0" : "#e15bc9",
                boxShadow: `0 0 8px ${it.ok ? "#5cf2a0" : "#e15bc9"}`,
              }}
            />
            {it.v}
          </span>
        </div>
      ))}
    </div>
  );
}

function clampWobble(v: number, min: number, max: number, step: number) {
  const next = v + (Math.random() - 0.5) * step * 2;
  return Math.min(max, Math.max(min, next));
}

/** A horizontal animated gauge bar with neon fill + ticks. */
export function Gauge({
  label,
  value,
  max = 5,
  unit,
  display,
  color = "#5cf2a0",
}: {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  display?: string;
  color?: string;
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
        <span className="text-[#dafff0]/50">{label}</span>
        <span className="tabular-nums text-[#eaf3ee]">
          {display ?? `${value}${unit ? unit : `/${max}`}`}
        </span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-[#0c2a2a]">
        <div className="absolute inset-0 flex">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="h-full flex-1 border-r border-[#06120d]/60 last:border-r-0"
            />
          ))}
        </div>
        <motion.div
          className="relative h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}55, ${color})`,
            boxShadow: `0 0 12px ${color}aa`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct * 100}%` }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

/** A vertical readout stream of monospace "system" lines that types in. */
export function DataStream({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-1 font-mono text-[10px] leading-relaxed text-[#5cf2a0]/70">
      {lines.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="flex gap-2"
        >
          <span className="text-[#5be0e6]/60">›</span>
          <span className="text-[#dafff0]/55">{l}</span>
        </motion.div>
      ))}
    </div>
  );
}
