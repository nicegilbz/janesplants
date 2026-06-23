"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Home, Building2, PartyPopper, ArrowUpRight } from "lucide-react";
import { NIGHT, withAlpha } from "./theme";
import MediaSlot from "./MediaSlot";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Home,
    title: "Homes",
    body: "Styled greenery on rotation, swapped and cared for so your rooms always feel alive.",
  },
  {
    icon: Building2,
    title: "Offices",
    body: "Planting schemes that lift a workspace, maintained on a schedule you never think about.",
  },
  {
    icon: PartyPopper,
    title: "Events & weddings",
    body: "Statement installations for a night or a week. We deliver, style, and take it all away.",
  },
];

export default function HireTeaser() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".hire-card", {
        opacity: 0,
        y: 36,
        stagger: 0.14,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".hire-grid", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(70% 60% at 20% 30%, ${withAlpha(NIGHT.deep, 0.5)} 0%, transparent 60%)`,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-end gap-10 md:grid-cols-2">
          <div>
            <p
              className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.4em]"
              style={{ color: withAlpha(NIGHT.glow, 0.7) }}
            >
              Plant hire & styling
            </p>
            <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.2rem,6vw,5rem)] font-light leading-[0.95]">
              We don&apos;t just sell plants.{" "}
              <span
                className="italic"
                style={{
                  fontFamily: "var(--font-accent)",
                  color: NIGHT.cyan,
                  textShadow: `0 0 28px ${withAlpha(NIGHT.cyan, 0.5)}`,
                }}
              >
                We move in.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-[#dff3ff]/65 md:pb-3">
            Rent and rotate living plants for homes, offices and events. We
            deliver, style, swap and care for every leaf, so the space stays
            beautiful and you stay hands-off.
          </p>
        </div>

        <div className="hire-grid mt-16 grid gap-5 md:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="hire-card group relative overflow-hidden rounded-3xl border p-8 transition-all"
                style={{
                  borderColor: withAlpha(NIGHT.glow, 0.14),
                  background: `linear-gradient(160deg, ${withAlpha(NIGHT.deep, 0.28)}, ${withAlpha(
                    NIGHT.void,
                    0.55,
                  )})`,
                }}
              >
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, ${withAlpha(NIGHT.lume, 0.25)}, transparent 70%)` }}
                />
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: withAlpha(NIGHT.lume, 0.35),
                    color: NIGHT.lume,
                    boxShadow: `0 0 18px ${withAlpha(NIGHT.lume, 0.2)}`,
                  }}
                >
                  <Icon size={20} />
                </span>
                <h3 className="mt-6 font-[family-name:var(--font-serif)] text-2xl font-light">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#dff3ff]/60">{s.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <MediaSlot
            assetId="F4 / day-night pair"
            caption="A styled interior in daylight, dissolving into its glowing night self."
          />
          <MediaSlot
            assetId="L1 / 360 turntable"
            caption="A hire centrepiece rotating slowly, lit from within."
          />
        </div>

        <a
          href="#visit"
          className="group mt-14 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] transition-all"
          style={{
            borderColor: withAlpha(NIGHT.cyan, 0.4),
            color: NIGHT.cyan,
            boxShadow: `0 0 24px ${withAlpha(NIGHT.cyan, 0.12)}`,
          }}
        >
          Enquire about hire
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
