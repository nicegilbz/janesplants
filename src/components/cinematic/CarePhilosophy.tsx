"use client";

/**
 * Care philosophy — a horizontally-pinned scroll set-piece. The four CARE_STEPS
 * slide past horizontally while pinned vertically (GSAP ScrollTrigger pin +
 * scrub). A chartreuse progress rail tracks how far you are. On reduced-motion
 * / touch it falls back to a clean vertical stack.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CARE_STEPS } from "@/lib/content";
import { useReducedMotion, useIsTouch } from "./hooks";

export default function CarePhilosophy() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const horizontal = !reduced && !touch;

  useGSAP(
    () => {
      if (typeof window === "undefined" || !horizontal || !track.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const panels = gsap.utils.toArray<HTMLElement>(".cine-care-panel");
      const totalShift = track.current.scrollWidth - window.innerWidth;

      // On ultra-wide screens the track already fits; do not pin a section that
      // never needs to move (it would eat a viewport of scroll for nothing).
      if (totalShift < 1) return;

      const tween = gsap.to(track.current, {
        x: -totalShift,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${totalShift}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // progress rail
      gsap.to(".cine-care-rail-fill", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${totalShift}`,
          scrub: true,
        },
      });

      // per-panel number reveal
      panels.forEach((panel) => {
        gsap.from(panel.querySelector(".cine-care-num"), {
          opacity: 0,
          y: 40,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left 70%",
          },
        });
      });
    },
    { scope: root, dependencies: [horizontal] },
  );

  return (
    <section
      id="care"
      ref={root}
      className="relative overflow-hidden bg-[var(--c-surface)]/30 py-0"
    >
      {/* fallback / non-horizontal header sits above the track */}
      <div
        className={`relative z-10 ${horizontal ? "flex h-[100svh] flex-col" : "py-28"}`}
      >
        <div className="mx-auto w-full max-w-7xl px-6 pt-16">
          <span className="cine-eyebrow">Keep them thriving</span>
          <h2 className="cine-serif mt-5 max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)] text-[var(--c-bone)]">
            Four habits, and{" "}
            <span className="cine-accent text-[var(--c-glow)]">nothing dies</span>.
          </h2>
        </div>

        {horizontal ? (
          <div className="relative flex-1">
            <div
              ref={track}
              className="flex h-full items-center gap-8 px-6 will-change-transform"
              style={{ width: "max-content" }}
            >
              {CARE_STEPS.map((step, i) => (
                <article
                  key={step.title}
                  className="cine-care-panel relative flex h-[58vh] w-[min(78vw,520px)] flex-none flex-col justify-between overflow-hidden rounded-3xl cine-glass p-10"
                >
                  <div
                    className="absolute -right-10 -top-16 h-64 w-64 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(159,209,91,0.16), transparent 70%)",
                    }}
                  />
                  <span className="cine-care-num cine-serif text-[7rem] leading-none text-[var(--c-glow)]/70">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-serif)] text-3xl text-[var(--c-bone)]">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
                      {step.body}
                    </p>
                  </div>
                </article>
              ))}
              {/* tail spacer */}
              <div className="w-[10vw] flex-none" aria-hidden />
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2">
            {CARE_STEPS.map((step, i) => (
              <article
                key={step.title}
                className="rounded-3xl cine-glass p-8"
              >
                <span className="cine-serif text-5xl text-[var(--c-glow)]/70">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-serif)] text-2xl text-[var(--c-bone)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[var(--c-sage)]">{step.body}</p>
              </article>
            ))}
          </div>
        )}

        {/* progress rail */}
        {horizontal && (
          <div className="mx-auto mb-10 w-full max-w-7xl px-6">
            <div className="cine-mono mb-3 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.24em] text-[var(--c-sage)]">
              <span>The care ritual</span>
              <span>Scroll across</span>
            </div>
            <div className="relative h-px w-full bg-[var(--c-brass-line)]">
              <div className="cine-care-rail-fill absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-[var(--c-glow)] shadow-[0_0_10px_var(--c-glow)]" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
