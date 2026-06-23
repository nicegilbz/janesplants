"use client";

/**
 * Care — the care philosophy as an interactive editorial index.
 *
 * A sticky left column holds a large rotating plate number + drawn detail;
 * the right column lists CARE_STEPS. Hovering or scrolling a step activates
 * it (ScrollTrigger drives the active index), animating the sticky figure.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CARE_STEPS } from "@/lib/content";

/* Round to 2dp so trig-derived SVG coords stringify identically on server
   (Node) and client (Chrome) — avoids float last-bit hydration mismatches. */
const r2 = (n: number) => Math.round(n * 100) / 100;

export default function Care() {
  const root = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-care-step]");
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="care"
      className="relative border-y border-[var(--ed-hair)] bg-[var(--ed-cream)]"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-28 sm:px-10 lg:px-16 lg:py-36">
        <div className="ed-mono mb-16 flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.28em] text-[var(--ed-ink-soft)]">
          <span className="text-[var(--ed-brass)]">§ 04</span>
          <span className="h-px flex-1 bg-[var(--ed-hair)]" />
          <span>Care / four honest rules</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Sticky figure */}
          <div className="lg:sticky lg:top-28 lg:h-[60vh]">
            <div className="relative flex h-full flex-col justify-between">
              <p className="ed-kicker">Keeping things alive</p>
              <div className="relative flex flex-1 items-center justify-center">
                <span
                  key={active}
                  className="ed-display ed-num pointer-events-none select-none text-[clamp(9rem,22vw,18rem)] leading-none text-[var(--ed-olive)]/14"
                  style={{ animation: "edCareNum 0.6s cubic-bezier(0.16,1,0.3,1)" }}
                >
                  0{active + 1}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <WateringCan stage={active} />
                </div>
              </div>
              <p className="ed-accent max-w-sm text-[1.4rem] italic leading-snug text-[var(--ed-ink)]">
                More plants die from kindness than neglect.
              </p>
            </div>
          </div>

          {/* Steps */}
          <ol className="border-t border-[var(--ed-hair)]">
            {CARE_STEPS.map((step, i) => {
              const on = active === i;
              return (
                <li
                  key={step.title}
                  data-care-step
                  onMouseEnter={() => setActive(i)}
                  className="group border-b border-[var(--ed-hair)] py-10 transition-colors"
                >
                  <div className="flex items-start gap-6">
                    <span
                      className="ed-mono ed-num mt-2 text-[0.72rem] tracking-[0.2em] transition-colors"
                      style={{ color: on ? "var(--ed-terra)" : "var(--ed-brass)" }}
                    >
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <h3
                        className="ed-display text-[clamp(1.7rem,3vw,2.6rem)] transition-all duration-500"
                        style={{
                          color: on ? "var(--ed-ink)" : "var(--ed-ink-soft)",
                          opacity: on ? 1 : 0.55,
                          transform: on ? "translateX(8px)" : "translateX(0)",
                        }}
                      >
                        {step.title}
                      </h3>
                      <div
                        className="grid transition-all duration-500"
                        style={{
                          gridTemplateRows: on ? "1fr" : "0fr",
                          opacity: on ? 1 : 0,
                        }}
                      >
                        <p className="ed-body overflow-hidden pt-3 text-[1.02rem] leading-relaxed text-[var(--ed-ink-soft)]">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <style jsx>{`
        @keyframes edCareNum {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

/* A small line-art figure that morphs through the four stages. */
function WateringCan({ stage }: { stage: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-44 w-44"
      fill="none"
      stroke="var(--ed-ink)"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* sun (light) — stage 0 */}
      <g
        style={{
          opacity: stage === 0 ? 1 : 0.12,
          transition: "opacity 0.5s",
        }}
      >
        <circle cx="100" cy="58" r="20" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={r2(100 + Math.cos(a) * 28)}
              y1={r2(58 + Math.sin(a) * 28)}
              x2={r2(100 + Math.cos(a) * 38)}
              y2={r2(58 + Math.sin(a) * 38)}
            />
          );
        })}
      </g>
      {/* droplet (water) — stage 1 */}
      <path
        d="M100 96 C112 116 120 130 120 142 C120 156 110 166 100 166 C90 166 80 156 80 142 C80 130 88 116 100 96 Z"
        style={{ opacity: stage === 1 ? 1 : 0.12, transition: "opacity 0.5s" }}
      />
      {/* leaf-bud (feed) — stage 2 */}
      <g
        style={{ opacity: stage === 2 ? 1 : 0.12, transition: "opacity 0.5s" }}
      >
        <path d="M100 170 C100 140 100 120 100 96" />
        <path d="M100 130 C78 126 64 108 62 84 C86 86 100 104 100 130 Z" />
        <path d="M100 112 C122 108 136 90 138 66 C114 68 100 86 100 112 Z" />
      </g>
      {/* pot (repot) — stage 3 */}
      <g
        style={{ opacity: stage === 3 ? 1 : 0.12, transition: "opacity 0.5s" }}
      >
        <path d="M70 120 L130 120 L122 168 L78 168 Z" />
        <path d="M66 120 L134 120" />
        <path d="M100 120 C100 100 100 86 100 72" />
        <path d="M100 96 C84 92 74 78 74 60 C92 62 100 78 100 96 Z" />
      </g>
    </svg>
  );
}
