"use client";

/**
 * "How it works" — four numbered steps (Consult, Design, Install, Maintain)
 * with a connecting brass line and a tasteful scroll reveal. Transform/opacity
 * only; static when reduced motion is requested.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sprout, PencilRuler, Truck, HeartHandshake } from "lucide-react";
import { useStaticMotion } from "../hooks";

const STEPS = [
  {
    no: "01",
    icon: Sprout,
    title: "Consult",
    body: "We talk through your space, your light and the look you are after, on site or over a call. No charge, no pressure.",
  },
  {
    no: "02",
    icon: PencilRuler,
    title: "Design",
    body: "We draw up a planting scheme: the right plants, the right pots, the right places. You sign off before anything moves.",
  },
  {
    no: "03",
    icon: Truck,
    title: "Install",
    body: "We deliver, place and style everything ourselves. You come back to a room that already feels alive.",
  },
  {
    no: "04",
    icon: HeartHandshake,
    title: "Maintain",
    body: "We return on a schedule to water, feed, prune and swap. If a plant ever sulks, we replace it, no questions.",
  },
];

export default function HireProcess() {
  const root = useRef<HTMLElement>(null);
  const reduced = useStaticMotion();

  useGSAP(
    () => {
      if (typeof window === "undefined" || reduced) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".hire-step", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".hire-step-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} className="relative py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="cine-eyebrow block">How it works</span>
            <h2 className="cine-serif mt-5 text-[clamp(2.2rem,5vw,4rem)] text-[var(--c-bone)]">
              Four steps,{" "}
              <span className="cine-accent text-[var(--c-glow)]">no green thumb</span>{" "}
              required.
            </h2>
          </div>
          <p className="max-w-xs text-[0.9rem] text-[var(--c-sage)]">
            From first conversation to ongoing care, we handle the whole thing.
            You just enjoy the room.
          </p>
        </div>

        {/* connecting line */}
        <div className="relative mt-16">
          <div className="hire-step-line cine-rule absolute left-0 right-0 top-7 hidden lg:block" />

          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s) => (
              <li key={s.no} className="hire-step relative">
                <div
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--c-glow-line)] bg-[var(--c-canvas)]"
                  aria-hidden="true"
                >
                  <s.icon className="h-6 w-6 text-[var(--c-glow)]" />
                </div>
                <span className="cine-mono mt-5 block text-[0.7rem] uppercase tracking-[0.28em] text-[var(--c-brass)]">
                  Step {s.no}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl text-[var(--c-bone)]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-[var(--c-sage)]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
