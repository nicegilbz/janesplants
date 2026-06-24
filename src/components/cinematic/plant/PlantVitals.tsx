"use client";

/**
 * Vitals panel — brass-ruled data rows for a single plant: light, water,
 * difficulty (dot meter, matching the home collection), height and pet-safety.
 * Pure presentational, deterministic markup. Reveals are handled by the parent.
 */

import { Sun, Droplets, Gauge, Ruler, PawPrint } from "lucide-react";
import type { Plant } from "@/lib/content";

function DotMeter({ level }: { level: number }) {
  return (
    <span
      className="flex items-center gap-1.5"
      role="img"
      aria-label={`${level} of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="h-2 w-2 rounded-full"
          style={{
            background:
              i <= level ? "var(--c-glow)" : "rgba(169,181,163,0.22)",
            boxShadow: i <= level ? "0 0 7px var(--c-glow)" : undefined,
          }}
        />
      ))}
    </span>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <span className="flex items-center gap-3 text-[var(--c-sage)]">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--c-brass-line)] bg-[rgba(12,20,16,0.4)] text-[var(--c-brass)]"
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="cine-mono text-[0.66rem] uppercase tracking-[0.2em]">
          {label}
        </span>
      </span>
      <span className="text-right text-[0.92rem] text-[var(--c-bone)]">
        {children}
      </span>
    </div>
  );
}

export default function PlantVitals({ plant }: { plant: Plant }) {
  const difficultyWord = ["Effortless", "Easy", "Steady", "Attentive", "Devoted"][
    Math.min(Math.max(plant.difficulty, 1), 5) - 1
  ];

  return (
    <div className="rounded-2xl cine-glass p-6 sm:p-7">
      <span className="cine-eyebrow">Vitals</span>
      <div className="mt-4 cine-rule" />

      <div className="divide-y divide-[var(--c-brass-line)]/30">
        <Row icon={<Sun className="h-3.5 w-3.5" />} label="Light">
          {plant.light}
        </Row>
        <Row icon={<Droplets className="h-3.5 w-3.5" />} label="Water">
          {plant.water}
        </Row>
        <Row icon={<Gauge className="h-3.5 w-3.5" />} label="Care level">
          <span className="flex items-center justify-end gap-3">
            <span className="text-[0.82rem] text-[var(--c-sage)]">
              {difficultyWord}
            </span>
            <DotMeter level={plant.difficulty} />
          </span>
        </Row>
        <Row icon={<Ruler className="h-3.5 w-3.5" />} label="Height">
          {plant.height}
        </Row>
        <Row icon={<PawPrint className="h-3.5 w-3.5" />} label="Pet-safe">
          {plant.petSafe ? (
            <span className="text-[var(--c-glow)]">Safe around pets</span>
          ) : (
            <span className="text-[var(--c-sage)]">
              Keep out of reach of pets
            </span>
          )}
        </Row>
      </div>
    </div>
  );
}
