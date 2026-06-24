"use client";

/**
 * Build Your Jungle - a stepped configurator that turns a few simple answers
 * (room, light, care commitment, pets) into a curated, shoppable plant bundle.
 * Fully client-side and deterministic; no SSR-computed state, so it is
 * hydration-safe. Reuses the cinematic design tokens and the real plant photos.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Sofa,
  BedDouble,
  Briefcase,
  Bath,
  DoorOpen,
  Utensils,
  Moon,
  CloudSun,
  Sun,
  Plane,
  Sprout,
  Heart,
  PawPrint,
  Ban,
  ArrowLeft,
  RotateCcw,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { PLANTS, plantImage, type Plant } from "@/lib/content";
import { useReducedMotion } from "@/components/cinematic/hooks";

type LightKey = "low" | "medium" | "bright";
type CareKey = "low" | "some" | "high";

type Choices = {
  room: string;
  roomLabel: string;
  light: LightKey;
  care: CareKey;
  pets: boolean;
};

type Option = {
  v: string;
  label: string;
  sub: string;
  Icon: typeof Sofa;
};

type Step = { key: keyof Choices; q: string; intro: string; options: Option[] };

const STEPS: Step[] = [
  {
    key: "room",
    q: "Where is it going?",
    intro: "We will style the bundle to suit the space.",
    options: [
      { v: "living", label: "Living room", sub: "The room people see", Icon: Sofa },
      { v: "bedroom", label: "Bedroom", sub: "Calm and restful", Icon: BedDouble },
      { v: "office", label: "Workspace", sub: "Desk and corners", Icon: Briefcase },
      { v: "bathroom", label: "Bathroom", sub: "Warm and humid", Icon: Bath },
      { v: "hallway", label: "Hallway", sub: "First impressions", Icon: DoorOpen },
      { v: "kitchen", label: "Kitchen", sub: "Bright and busy", Icon: Utensils },
    ],
  },
  {
    key: "light",
    q: "How much light does it get?",
    intro: "Light is the single biggest thing that keeps a plant happy.",
    options: [
      { v: "low", label: "On the shady side", sub: "North-facing, away from windows", Icon: Moon },
      { v: "medium", label: "Bright but indirect", sub: "Near a window, no harsh sun", Icon: CloudSun },
      { v: "bright", label: "Lots of light", sub: "Sunny, south or west facing", Icon: Sun },
    ],
  },
  {
    key: "care",
    q: "How much attention can you give?",
    intro: "Be honest. We will match the effort to your life.",
    options: [
      { v: "low", label: "Set and forget", sub: "I travel, or I forget", Icon: Plane },
      { v: "some", label: "A little love", sub: "A weekly check is fine", Icon: Sprout },
      { v: "high", label: "I'm devoted", sub: "Happy with the fussy ones", Icon: Heart },
    ],
  },
  {
    key: "pets",
    q: "Any pets at home?",
    intro: "We will keep the bundle safe around curious paws.",
    options: [
      { v: "yes", label: "Yes, pet-safe please", sub: "Cats or dogs about", Icon: PawPrint },
      { v: "no", label: "No pets", sub: "Anything goes", Icon: Ban },
    ],
  },
];

function matchPlants(c: Choices): Plant[] {
  const maxDiff = c.care === "low" ? 2 : c.care === "some" ? 3 : 5;
  const lightOk = (p: Plant) => {
    const l = p.light.toLowerCase();
    if (c.light === "low") return l.includes("low") || l.includes("anything");
    if (c.light === "bright")
      return l.includes("bright") || l.includes("direct") || l.includes("anything");
    return (
      l.includes("medium") ||
      l.includes("indirect") ||
      l.includes("low to bright") ||
      l.includes("anything")
    );
  };

  // Pet-safe is a hard requirement when chosen: relax light + difficulty, but
  // never serve a plant that is not safe around pets, even if it means fewer.
  const petOk = (p: Plant) => !c.pets || p.petSafe;
  let pool = PLANTS.filter(
    (p) => lightOk(p) && p.difficulty <= maxDiff && petOk(p),
  );
  if (pool.length < 3) pool = PLANTS.filter((p) => lightOk(p) && petOk(p));
  if (pool.length < 3) pool = PLANTS.filter(petOk);
  if (pool.length === 0) pool = [...PLANTS];

  // Favour category variety, then fill, capped at 5 (min 3).
  const seen = new Set<string>();
  const picked: Plant[] = [];
  for (const p of pool) {
    if (!seen.has(p.category)) {
      seen.add(p.category);
      picked.push(p);
    }
    if (picked.length >= 5) break;
  }
  for (const p of pool) {
    if (picked.length >= 5) break;
    if (!picked.includes(p)) picked.push(p);
  }
  return picked.slice(0, Math.min(5, picked.length));
}

export default function BuildConfigurator() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState<Partial<Choices>>({});
  const [done, setDone] = useState(false);

  const progress = done ? 1 : step / STEPS.length;

  const result = useMemo(
    () => (done ? matchPlants(choices as Choices) : []),
    [done, choices],
  );
  const total = result.reduce((sum, p) => sum + p.price, 0);

  function choose(stepDef: Step, opt: Option) {
    const next: Partial<Choices> = { ...choices };
    if (stepDef.key === "room") {
      next.room = opt.v;
      next.roomLabel = opt.label;
    } else if (stepDef.key === "light") {
      next.light = opt.v as LightKey;
    } else if (stepDef.key === "care") {
      next.care = opt.v as CareKey;
    } else if (stepDef.key === "pets") {
      next.pets = opt.v === "yes";
    }
    setChoices(next);
    if (step >= STEPS.length - 1) setDone(true);
    else setStep(step + 1);
  }

  function restart() {
    setChoices({});
    setStep(0);
    setDone(false);
  }

  const current = STEPS[step];

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* progress rail */}
      <div className="mb-8 h-px w-full bg-[var(--c-brass-line)]">
        <motion.div
          className="h-px bg-[var(--c-glow)]"
          animate={{ width: `${Math.round(progress * 100)}%` }}
          transition={reduced ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ boxShadow: "0 0 10px var(--c-glow)" }}
        />
      </div>

      {!done ? (
          <motion.div
            key={`step-${step}`}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="cine-mono text-[0.66rem] uppercase tracking-[0.24em] text-[var(--c-glow)]">
                Step {step + 1} of {STEPS.length}
              </span>
            </div>
            <h2 className="cine-serif text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--c-bone)]">
              {current.q}
            </h2>
            <p className="mt-3 max-w-xl text-[var(--c-sage)]">{current.intro}</p>

            <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {current.options.map((opt) => (
                <button
                  key={opt.v}
                  onClick={() => choose(current, opt)}
                  aria-label={`${opt.label}. ${opt.sub}`}
                  className="group flex flex-col items-start gap-3 rounded-2xl cine-glass p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--c-glow-line)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--c-brass-line)] bg-[var(--c-glow-soft)] text-[var(--c-glow)] transition-colors group-hover:border-[var(--c-glow-line)]">
                    <opt.Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-[family-name:var(--font-serif)] text-lg text-[var(--c-bone)]">
                      {opt.label}
                    </span>
                    <span className="mt-0.5 block text-[0.82rem] text-[var(--c-sage)]">
                      {opt.sub}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                aria-label="Back to the previous step"
                className="cine-mono mt-8 inline-flex items-center gap-2 rounded text-[0.7rem] uppercase tracking-[0.18em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="cine-mono text-[0.66rem] uppercase tracking-[0.24em] text-[var(--c-glow)]">
              Your jungle
            </span>
            <h2 className="cine-serif mt-2 text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--c-bone)]">
              {result.length} plants for your{" "}
              <span className="cine-accent text-[var(--c-glow)]">
                {choices.roomLabel?.toLowerCase()}
              </span>
              .
            </h2>

            {/* choice summary */}
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                choices.roomLabel,
                choices.light === "low"
                  ? "Shady"
                  : choices.light === "bright"
                    ? "Bright"
                    : "Indirect light",
                choices.care === "low"
                  ? "Low effort"
                  : choices.care === "high"
                    ? "Devoted"
                    : "A little love",
                choices.pets ? "Pet-safe" : "No pets",
              ]
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="cine-mono flex items-center gap-1.5 rounded-full border border-[var(--c-brass-line)] px-3 py-1.5 text-[0.64rem] uppercase tracking-[0.16em] text-[var(--c-sage)]"
                  >
                    <Check className="h-3 w-3 text-[var(--c-glow)]" aria-hidden="true" />
                    {tag}
                  </span>
                ))}
            </div>

            {/* matched plants */}
            <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {result.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.4, delay: 0.05 * i }}
                >
                  <Link
                    href={`/plant/${p.slug}`}
                    className="group block overflow-hidden rounded-xl cine-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={plantImage(p.slug)}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 40vw, 18vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-[family-name:var(--font-serif)] text-[0.95rem] leading-tight text-[var(--c-bone)]">
                        {p.name}
                      </p>
                      <p className="cine-mono mt-1 text-[0.8rem] text-[var(--c-brass)]">
                        £{p.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* total + CTAs */}
            <div className="mt-9 flex flex-col gap-5 rounded-2xl cine-glass p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="cine-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--c-sage)]">
                  Your jungle, together
                </p>
                <p className="font-[family-name:var(--font-serif)] text-3xl text-[var(--c-bone)]">
                  £{total}
                  <span className="ml-2 text-base text-[var(--c-sage)]">
                    for {result.length} plants
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/visit#enquire"
                  className="cine-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  Enquire about this jungle
                </Link>
                <button
                  onClick={restart}
                  aria-label="Start the configurator over"
                  className="cine-mono inline-flex items-center gap-2 rounded-full border border-[var(--c-brass-line)] px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Start over
                </button>
              </div>
            </div>

            <Link
              href="/shop"
              className="cine-mono mt-6 inline-flex items-center gap-1.5 rounded text-[0.7rem] uppercase tracking-[0.18em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Or browse the whole collection
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </motion.div>
        )}
    </div>
  );
}
