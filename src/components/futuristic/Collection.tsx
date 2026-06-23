"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { PLANTS, CATEGORIES, type Plant, type PlantCategory } from "@/lib/content";
import Botanical, { botanicalKind } from "./Botanical";
import VitalsHUD, { lightScore, waterScore } from "./VitalsHUD";

type Filter = "All" | PlantCategory;

export default function Collection() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Plant | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? PLANTS : PLANTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="collection" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[#5cf2a0]/60">
              <span className="h-px w-12 bg-[#5cf2a0]/40" />
              <span>02 / Specimen registry</span>
            </div>
            <h2
              className="text-4xl font-semibold tracking-tight text-[#eaf3ee] md:text-6xl"
              style={{ fontFamily: "var(--font-grotesk)" }}
            >
              The collection
            </h2>
            <p className="mt-3 max-w-md text-sm text-[#dafff0]/55">
              Tap any module to pull its live vitals. Each specimen is graded,
              scanned and nursery-fresh.
            </p>
          </div>

          {/* filters */}
          <div className="flex flex-wrap gap-2 font-mono">
            {(["All", ...CATEGORIES.map((c) => c.key)] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.18em] transition-all ${
                  filter === f
                    ? "border-[#5cf2a0]/60 bg-[#5cf2a0]/15 text-[#5cf2a0]"
                    : "border-[#eaf3ee]/12 text-[#dafff0]/50 hover:border-[#5be0e6]/40 hover:text-[#5be0e6]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {visible.map((p, i) => (
            <PlantModule
              key={p.slug}
              plant={p}
              index={i}
              onSelect={() => setSelected(p)}
            />
          ))}
        </motion.div>
      </div>

      <VitalsHUD plant={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function PlantModule({
  plant,
  index,
  onSelect,
}: {
  plant: Plant;
  index: number;
  onSelect: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: (index % 8) * 0.05, duration: 0.55 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onSelect}
      className="group relative overflow-hidden rounded-2xl fx-glass p-5 text-left transition-transform duration-300 hover:-translate-y-1"
    >
      {/* grow-light bloom on hover */}
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `${plant.accent}`, mixBlendMode: "screen" }}
      />
      <div className="pointer-events-none absolute inset-0 fx-grid-flat opacity-20" />

      <div className="relative flex items-start justify-between font-mono">
        <span className="text-[9px] uppercase tracking-[0.22em] text-[#5be0e6]/70">
          {plant.rare ? "RARE" : plant.category}
        </span>
        {plant.petSafe && (
          <span className="rounded border border-[#5cf2a0]/30 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.15em] text-[#5cf2a0]">
            pet-safe
          </span>
        )}
      </div>

      {/* specimen */}
      <div className="relative my-3 grid h-40 place-items-center">
        <motion.div
          animate={hover ? { y: -4, scale: 1.04 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="h-full w-[58%]"
          style={{ filter: `drop-shadow(0 6px 18px ${plant.accent}66)` }}
        >
          <Botanical
            kind={botanicalKind(plant.category, plant.slug)}
            accent={plant.accent}
            className="h-full w-full"
          />
        </motion.div>
        {/* scan line sweep on hover */}
        {hover && (
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute left-0 h-px w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${plant.accent}, transparent)`,
              boxShadow: `0 0 8px ${plant.accent}`,
            }}
          />
        )}
      </div>

      <h3
        className="relative text-lg font-semibold leading-tight text-[#eaf3ee]"
        style={{ fontFamily: "var(--font-grotesk)" }}
      >
        {plant.name}
      </h3>
      <p className="relative font-mono text-[10px] italic text-[#dafff0]/40">
        {plant.latin}
      </p>

      {/* mini metric bars */}
      <div className="relative mt-4 space-y-2">
        <MiniBar label="LGT" value={lightScore(plant.light)} color="#5be0e6" />
        <MiniBar label="H₂O" value={waterScore(plant.water)} color="#5cf2a0" />
        <MiniBar
          label="CARE"
          value={plant.difficulty}
          color={plant.difficulty >= 4 ? "#e15bc9" : "#5cf2a0"}
        />
      </div>

      <div className="relative mt-4 flex items-center justify-between border-t border-[#5cf2a0]/10 pt-3 font-mono">
        <span className="text-sm text-[#eaf3ee] tabular-nums">
          £{plant.price}
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#5cf2a0]/70 transition-colors group-hover:text-[#5cf2a0]">
          Vitals →
        </span>
      </div>
    </motion.button>
  );
}

function MiniBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const pct = Math.max(0.08, Math.min(1, value / 5));
  return (
    <div className="flex items-center gap-2 font-mono">
      <span className="w-8 text-[8px] tracking-[0.1em] text-[#dafff0]/40">
        {label}
      </span>
      <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-[#0c2a2a]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct * 100}%`,
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      </div>
    </div>
  );
}
