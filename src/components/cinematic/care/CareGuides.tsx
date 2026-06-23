"use client";

/**
 * The five CARE_GUIDES as a sticky-index + accordion detail set.
 *
 * A left rail lists every guide as a numbered button; clicking one opens its
 * detail panel (title, summary, a clean checklist of tips). One open at a time,
 * accessible (button + aria-expanded + aria-controls), and the expand/collapse
 * is animated with Motion's height auto, which is hydration-safe (no computed
 * numbers reach server markup). Respects reduced motion.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus } from "lucide-react";
import { CARE_GUIDES } from "@/lib/content";
import { useReducedMotion } from "../hooks";
import { cn } from "@/lib/utils";

export default function CareGuides() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<string>(CARE_GUIDES[0]?.slug ?? "");

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:py-32">
      <div className="mb-14 flex items-end justify-between gap-6">
        <div>
          <span className="cine-eyebrow">The guides</span>
          <h2 className="cine-serif mt-5 max-w-2xl text-[clamp(2rem,5vw,3.8rem)] leading-[1.05] text-[var(--c-bone)]">
            Five things worth{" "}
            <span className="cine-accent text-[var(--c-glow)]">getting right</span>.
          </h2>
        </div>
        <span className="cine-mono hidden text-right text-[0.62rem] uppercase tracking-[0.24em] text-[var(--c-sage)] sm:block">
          {CARE_GUIDES.length} guides
          <br />
          tap to open
        </span>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl cine-glass">
        {CARE_GUIDES.map((guide, i) => {
          const isOpen = open === guide.slug;
          const panelId = `care-guide-panel-${guide.slug}`;
          const btnId = `care-guide-btn-${guide.slug}`;
          return (
            <div
              key={guide.slug}
              className={cn(
                "relative border-t border-[var(--c-brass-line)] transition-colors duration-500 first:border-t-0",
                isOpen && "bg-[var(--c-surface)]/40",
              )}
            >
              <h3 className="m-0">
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? "" : guide.slug)}
                  className="group flex w-full items-center gap-5 px-6 py-7 text-left sm:px-9"
                >
                  <span
                    className={cn(
                      "cine-mono w-10 flex-none text-sm tracking-[0.2em] transition-colors duration-300",
                      isOpen
                        ? "text-[var(--c-glow)]"
                        : "text-[var(--c-brass)] group-hover:text-[var(--c-bone)]",
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block font-[family-name:var(--font-serif)] text-[clamp(1.4rem,3vw,2.1rem)] leading-tight transition-colors duration-300",
                        isOpen
                          ? "text-[var(--c-bone)]"
                          : "text-[var(--c-bone)]/85 group-hover:text-[var(--c-bone)]",
                      )}
                    >
                      {guide.title}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-all duration-500",
                      isOpen
                        ? "rotate-45 border-[var(--c-glow-line)] bg-[rgba(159,209,91,0.12)] text-[var(--c-glow)]"
                        : "border-[var(--c-brass-line)] text-[var(--c-sage)] group-hover:border-[var(--c-glow-line)] group-hover:text-[var(--c-glow)]",
                    )}
                    aria-hidden
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    key="content"
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.3 },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-8 px-6 pb-9 sm:px-9 lg:grid-cols-[0.85fr_1.15fr]">
                      <p className="max-w-md pl-[3.75rem] text-[1.05rem] leading-relaxed text-[var(--c-sage)] sm:pl-0">
                        {guide.summary}
                      </p>
                      <ul className="space-y-3 pl-[3.75rem] sm:pl-0">
                        {guide.tips.map((tip) => (
                          <li
                            key={tip}
                            className="flex items-start gap-3 text-[var(--c-bone)]/90"
                          >
                            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[rgba(159,209,91,0.12)] text-[var(--c-glow)] shadow-[0_0_10px_rgba(159,209,91,0.25)]">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            <span className="text-[0.98rem] leading-relaxed">
                              {tip}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
