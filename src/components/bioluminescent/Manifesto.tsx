"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BRAND } from "@/lib/content";
import { NIGHT, withAlpha } from "./theme";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const words = gsap.utils.toArray<HTMLElement>(".mani-word");
      if (reduce) {
        gsap.set(words, { opacity: 1 });
        gsap.set(".promise-item", { opacity: 1, y: 0 });
        return;
      }
      gsap.set(words, { opacity: 0.12 });
      gsap.to(words, {
        opacity: 1,
        stagger: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: ".mani-copy",
          start: "top 75%",
          end: "bottom 60%",
          scrub: true,
        },
      });
      gsap.from(".promise-item", {
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".promise-row", start: "top 82%" },
      });
    },
    { scope: root },
  );

  const words = BRAND.mission.split(" ");

  return (
    <section ref={root} className="relative mx-auto max-w-6xl px-6 py-32 md:py-44">
      <p
        className="mb-10 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.4em]"
        style={{ color: withAlpha(NIGHT.glow, 0.7) }}
      >
        {BRAND.tagline}
      </p>
      <p className="mani-copy max-w-4xl font-[family-name:var(--font-serif)] text-[clamp(1.6rem,3.6vw,3rem)] font-light leading-[1.25] tracking-[-0.01em]">
        {words.map((w, i) => (
          <span key={i} className="mani-word inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>

      <div className="promise-row mt-20 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-3"
        style={{ borderColor: withAlpha(NIGHT.glow, 0.16) }}
      >
        {BRAND.promise.map((p, i) => (
          <div
            key={i}
            className="promise-item relative p-8"
            style={{
              background: `linear-gradient(160deg, ${withAlpha(NIGHT.deep, 0.3)}, ${withAlpha(
                NIGHT.void,
                0.5,
              )})`,
            }}
          >
            <span
              className="font-[family-name:var(--font-mono)] text-xs"
              style={{ color: NIGHT.lume, textShadow: `0 0 12px ${withAlpha(NIGHT.lume, 0.5)}` }}
            >
              0{i + 1}
            </span>
            <p className="mt-4 text-[15px] leading-relaxed text-[#dff3ff]/80">{p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
