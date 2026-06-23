"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { STATS } from "@/lib/content";
import { NIGHT, withAlpha } from "./theme";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // count-up on numeric stats
      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const raw = el.dataset.value || "";
        const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
        if (!isFinite(num) || reduce) {
          el.textContent = raw;
          return;
        }
        const prefix = raw.match(/^[^0-9]*/)?.[0] ?? "";
        const suffix = raw.match(/[^0-9.]*$/)?.[0] ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: num,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            const isInt = Number.isInteger(num);
            el.textContent = prefix + (isInt ? Math.round(obj.v) : obj.v.toFixed(1)) + suffix;
          },
        });
      });
      if (!reduce) {
        gsap.from(".stat-cell", {
          opacity: 0,
          y: 30,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative mx-auto max-w-7xl px-6 py-24">
      <div
        className="grid gap-px overflow-hidden rounded-3xl border sm:grid-cols-2 lg:grid-cols-4"
        style={{ borderColor: withAlpha(NIGHT.glow, 0.14) }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            className="stat-cell relative px-8 py-12 text-center"
            style={{
              background: `radial-gradient(120% 120% at 50% 0%, ${withAlpha(NIGHT.deep, 0.25)}, ${withAlpha(
                NIGHT.void,
                0.5,
              )})`,
            }}
          >
            <div
              className="stat-value font-[family-name:var(--font-serif)] text-[clamp(2.4rem,5vw,3.8rem)] font-light"
              data-value={s.value}
              style={{ color: NIGHT.lume, textShadow: `0 0 28px ${withAlpha(NIGHT.lume, 0.4)}` }}
            >
              {s.value}
            </div>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.25em] text-[#dff3ff]/55">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
