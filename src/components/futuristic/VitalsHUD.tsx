"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import type { Plant } from "@/lib/content";
import Botanical, { botanicalKind } from "./Botanical";
import { Gauge, DataStream } from "./Telemetry";

const LIGHT_LEVEL: Record<string, number> = {
  Low: 1,
  Medium: 3,
  Bright: 4,
};

function lightScore(light: string): number {
  if (/low/i.test(light)) return /bright/i.test(light) ? 3 : 1.5;
  if (/medium/i.test(light)) return 3;
  if (/direct/i.test(light)) return 5;
  if (/bright/i.test(light)) return 4;
  return 3;
}

function waterScore(water: string): number {
  if (/2-3 weeks|sparingly|let it dry|dry out/i.test(water)) return 1.5;
  if (/weekly|top inch|top 2/i.test(water)) return 3;
  if (/moist|humidity/i.test(water)) return 4.5;
  return 3;
}

/** Signature set-piece: the Plant Vitals HUD telemetry panel. */
export default function VitalsHUD({
  plant,
  onClose,
}: {
  plant: Plant | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {plant && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-3 md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close panel"
            onClick={onClose}
            className="absolute inset-0 bg-[#06120d]/80 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-label={`${plant.name} vitals`}
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="relative z-10 grid w-full max-w-3xl gap-0 overflow-hidden rounded-2xl border border-[#5cf2a0]/25 bg-[#06120d]/90 md:grid-cols-[1fr_1.2fr]"
            style={{ boxShadow: "0 0 60px rgba(92,242,160,0.18)" }}
          >
            {/* scanline overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 fx-scanlines opacity-50" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-30 grid h-8 w-8 place-items-center rounded-full border border-[#5cf2a0]/30 text-[#5cf2a0] transition-colors hover:bg-[#5cf2a0]/15"
            >
              <X size={14} />
            </button>

            {/* Specimen visual */}
            <div
              className="relative flex items-center justify-center overflow-hidden p-8"
              style={{
                background: `radial-gradient(80% 80% at 50% 65%, ${plant.accent}26, transparent 70%)`,
              }}
            >
              <div className="absolute inset-0 fx-grid-flat opacity-30" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[68%]"
                style={{ filter: `drop-shadow(0 0 22px ${plant.accent}aa)` }}
              >
                <Botanical
                  kind={botanicalKind(plant.category, plant.slug)}
                  accent={plant.accent}
                  className="w-full"
                  strokeWidth={1.4}
                />
              </motion.div>
              <div className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[#5be0e6]/60">
                Specimen scan · live
              </div>
            </div>

            {/* Telemetry */}
            <div className="relative z-10 p-7 md:p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5be0e6]/70">
                {plant.rare ? "RARE SPECIMEN" : plant.category} · #{plant.slug}
              </div>
              <h3
                className="mt-2 text-2xl font-semibold text-[#eaf3ee] md:text-3xl"
                style={{ fontFamily: "var(--font-grotesk)" }}
              >
                {plant.name}
              </h3>
              <p className="font-mono text-xs italic text-[#dafff0]/45">
                {plant.latin} · {plant.nickname}
              </p>

              <div className="mt-6 space-y-4">
                <Gauge
                  label="Light demand"
                  value={lightScore(plant.light)}
                  display={plant.light}
                  color="#5be0e6"
                />
                <Gauge
                  label="Hydration"
                  value={waterScore(plant.water)}
                  display={plant.water}
                  color="#5cf2a0"
                />
                <Gauge
                  label="Care index"
                  value={plant.difficulty}
                  unit="/5"
                  color={plant.difficulty >= 4 ? "#e15bc9" : "#5cf2a0"}
                />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-[#5cf2a0]/12 font-mono">
                {[
                  { k: "HEIGHT", v: plant.height },
                  { k: "PET-SAFE", v: plant.petSafe ? "YES" : "NO" },
                  { k: "PRICE", v: `£${plant.price}` },
                ].map((m) => (
                  <div key={m.k} className="bg-[#0c2a2a]/40 px-3 py-2.5">
                    <div className="text-[8px] uppercase tracking-[0.2em] text-[#dafff0]/40">
                      {m.k}
                    </div>
                    <div className="text-sm text-[#eaf3ee] tabular-nums">
                      {m.v}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <DataStream
                  lines={[
                    `init specimen.${plant.slug}`,
                    `light_profile = "${plant.light}"`,
                    `class = ${plant.category.toUpperCase()} · ${plant.petSafe ? "non-toxic" : "keep from pets"}`,
                    `status = healthy · ready to ship 48h`,
                  ]}
                />
              </div>

              <a
                href="#visit"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[#5cf2a0]/40 bg-[#5cf2a0]/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-[#5cf2a0] transition-colors hover:bg-[#5cf2a0]/20"
              >
                Acquire · £{plant.price}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { lightScore, waterScore, LIGHT_LEVEL };
