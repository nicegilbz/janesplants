"use client";

/**
 * Stats / credibility band. Numbers count-up on scroll-in (where the value is
 * numeric) and sit on brass hairline rules. Static fallback on reduced-motion.
 */

import { useRef } from "react";
import { STATS } from "@/lib/content";
import { useStaticMotion } from "./hooks";
import { useGsapReveal } from "./useGsapReveal";

export default function Stats() {
  const root = useRef<HTMLElement>(null);
  const reduced = useStaticMotion();

  useGsapReveal(root, (gsap) => {
    gsap.from(".cine-stat", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: root.current, start: "top 80%" },
    });

    // count up numeric prefixes
    gsap.utils.toArray<HTMLElement>(".cine-stat-num").forEach((el) => {
      const target = Number(el.dataset.target || "0");
      if (!target) return;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          el.firstChild!.textContent = String(Math.round(obj.v));
        },
      });
    });
  });

  return (
    <section ref={root} className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="cine-rule mb-14" />
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {STATS.map((s) => {
            const m = s.value.match(/^(\d+)(.*)$/);
            const num = m ? Number(m[1]) : 0;
            const suffix = m ? m[2] : s.value;
            // The always-100% figure never changes, so render it statically
            // rather than counting up from zero.
            const animate = m !== null && s.value !== "100%";
            return (
              <div key={s.label} className="cine-stat px-2 text-center lg:text-left">
                <div className="cine-serif flex items-baseline justify-center text-[clamp(3rem,7vw,5.5rem)] text-[var(--c-bone)] lg:justify-start">
                  {m ? (
                    animate ? (
                      <span className="cine-stat-num" data-target={num}>
                        <span>{reduced ? num : 0}</span>
                        <span className="text-[var(--c-glow)]">{suffix}</span>
                      </span>
                    ) : (
                      <span>
                        <span>{num}</span>
                        <span className="text-[var(--c-glow)]">{suffix}</span>
                      </span>
                    )
                  ) : (
                    <span className="text-[var(--c-glow)]">{s.value}</span>
                  )}
                </div>
                <p className="cine-mono mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--c-sage)]">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="cine-rule mt-14" />
      </div>
    </section>
  );
}
