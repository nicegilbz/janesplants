"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/content";
import { NIGHT, withAlpha } from "./theme";
import MediaSlot from "./MediaSlot";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function VisitFooter() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const heading = root.current?.querySelector<HTMLElement>(".visit-head");
      if (heading && !reduce) {
        const split = new SplitText(heading, { type: "chars" });
        gsap.from(split.chars, {
          opacity: 0,
          yPercent: 60,
          filter: "blur(8px)",
          stagger: 0.02,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: heading, start: "top 85%" },
        });
        return () => split.revert();
      }
    },
    { scope: root },
  );

  return (
    <footer
      ref={root}
      id="visit"
      className="relative overflow-hidden pt-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${withAlpha(NIGHT.lume, 0.5)}, transparent)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(80% 70% at 50% 100%, ${withAlpha(NIGHT.deep, 0.7)} 0%, transparent 60%)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p
          className="mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.4em]"
          style={{ color: withAlpha(NIGHT.glow, 0.7) }}
        >
          {BRAND.location.label}
        </p>
        <h2 className="visit-head font-[family-name:var(--font-serif)] text-[clamp(2.8rem,9vw,8rem)] font-light leading-[0.92]">
          Come wander
          <br />
          <span
            className="italic"
            style={{
              fontFamily: "var(--font-accent)",
              color: NIGHT.lume,
              textShadow: `0 0 40px ${withAlpha(NIGHT.lume, 0.55)}`,
            }}
          >
            after dark.
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-[#dff3ff]/60">
          {BRAND.location.line} {BRAND.founder.note}
        </p>

        <div className="mx-auto mt-12 max-w-3xl">
          <MediaSlot
            assetId="F1 / hero loop"
            caption="Slow drift through the glasshouse at night, foliage glowing, pollen adrift."
            ratio="21 / 9"
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:${BRAND.contactEmail}`}
            className="group inline-flex items-center gap-3 rounded-full px-8 py-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] transition-all"
            style={{
              background: NIGHT.lume,
              color: NIGHT.void,
              boxShadow: `0 0 36px ${withAlpha(NIGHT.lume, 0.5)}`,
            }}
          >
            <Mail size={15} />
            {BRAND.contactEmail}
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <span
            className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#dff3ff]/55"
          >
            <MapPin size={14} style={{ color: NIGHT.glow }} />
            Hertford
          </span>
        </div>
      </div>

      <div
        className="relative mt-28 border-t px-6 py-8"
        style={{ borderColor: withAlpha(NIGHT.glow, 0.12) }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span
            className="font-[family-name:var(--font-serif)] text-lg italic"
            style={{ color: NIGHT.white }}
          >
            {BRAND.name}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[#dff3ff]/35">
            {BRAND.tagline} · grown in the dark
          </span>
        </div>
      </div>
    </footer>
  );
}
