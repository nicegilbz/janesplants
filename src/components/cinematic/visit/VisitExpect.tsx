"use client";

/**
 * Getting here + what to expect. A short, warm three-step strip backed by a
 * soft emerald glow, plus a PlantEmblem accent so the section stays inside the
 * jungle. Scroll-reveal is gated by prefers-reduced-motion with a static
 * fallback.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, TramFront, Dog, Hand } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PlantEmblem } from "../botanicals";
import { useStaticMotion } from "../hooks";

type Item = { icon: LucideIcon; title: string; body: string };

const GETTING_HERE: Item[] = [
  {
    icon: Car,
    title: "By car",
    body: "Easy off the A414, with free parking on site right by the door. Bring a box or a blanket for the boot and your new plant will travel happily.",
  },
  {
    icon: TramFront,
    title: "By train",
    body: "Hertford has two stations, both a short ride from London. We are a quick taxi or a gentle twenty-minute walk from either one.",
  },
];

const WHAT_TO_EXPECT: Item[] = [
  {
    icon: Hand,
    title: "Wander freely",
    body: "No pressure and no hovering. Touch the leaves, ask the daft questions, and tell us how much light your room actually gets.",
  },
  {
    icon: Dog,
    title: "Bring the dog",
    body: "Well-behaved dogs are welcome, and there is a water bowl by the bench. Little ones love the big leaves, so do let them look.",
  },
];

export default function VisitExpect() {
  const root = useRef<HTMLElement>(null);
  const reduced = useStaticMotion();

  useGSAP(
    () => {
      if (typeof window === "undefined" || reduced) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".visit-expect-reveal", {
        opacity: 0,
        y: 28,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      id="finding-us"
      ref={root}
      className="relative scroll-mt-24 overflow-hidden px-6 pt-24 lg:pt-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 70% 0%, rgba(31,95,63,0.2), transparent 60%)",
        }}
      />

      {/* soft emblem accent */}
      <div className="pointer-events-none absolute -right-10 top-10 hidden w-[16%] max-w-[220px] opacity-25 lg:block">
        <PlantEmblem
          accent="#2f6b3c"
          category="Statement"
          slug="visit-expect-emblem"
          className="w-full"
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="visit-expect-reveal max-w-2xl">
          <span className="cine-eyebrow block">Getting here and what to expect</span>
          <h2 className="cine-serif mt-5 text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--c-bone)]">
            Easy to reach,{" "}
            <span className="cine-accent text-[var(--c-glow)]">
              easy to linger
            </span>
            .
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--c-sage)]">
            We are a proper working glasshouse, not a polished showroom, and that
            is the whole charm of it. Here is how to find us and what a visit
            feels like.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...GETTING_HERE, ...WHAT_TO_EXPECT].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="visit-expect-reveal group rounded-2xl cine-glass p-6 transition-colors hover:border-[var(--c-glow-line)]"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--c-brass-line)] bg-[rgba(12,20,16,0.5)] transition-colors group-hover:border-[var(--c-glow-line)]"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5 text-[var(--c-glow)]" />
                </span>
                <h3 className="mt-5 font-[family-name:var(--font-serif)] text-xl text-[var(--c-bone)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-[var(--c-sage)]">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
