"use client";

/**
 * Plant HIRE / styling teaser — the rent-and-style revenue line. Homes,
 * offices, events, weddings. Cinematic split with an F4 day/night media slot
 * and an L1 360 turntable slot, plus a service list that reveals on scroll.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, Building2, PartyPopper, Heart, ArrowUpRight } from "lucide-react";
import MediaSlot from "./MediaSlot";
import MagneticCTA from "./MagneticCTA";
import { useReducedMotion } from "./hooks";

const SERVICES = [
  {
    icon: Home,
    title: "Homes",
    body: "Style a room for a shoot, a season, or a fresh start. We deliver, place, and maintain.",
  },
  {
    icon: Building2,
    title: "Offices & studios",
    body: "Green that works as hard as your team. Rotated and cared for on a schedule.",
  },
  {
    icon: PartyPopper,
    title: "Events",
    body: "Statement foliage for launches, dinners and pop-ups. Set up and struck for you.",
  },
  {
    icon: Heart,
    title: "Weddings",
    body: "Living installations that outlast cut flowers, and go home with someone after.",
  },
];

export default function Hire() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (typeof window === "undefined" || reduced) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".cine-hire-reveal", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section id="hire" ref={root} className="relative py-28 lg:py-40">
      {/* atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 80% 10%, rgba(31,95,63,0.25), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* left: copy + services */}
        <div>
          <span className="cine-eyebrow cine-hire-reveal block">
            Hire &amp; styling
          </span>
          <h2 className="cine-hire-reveal cine-serif mt-5 text-[clamp(2.4rem,6vw,5rem)] text-[var(--c-bone)]">
            Don&apos;t buy the jungle.{" "}
            <span className="cine-accent text-[var(--c-glow)]">Rent it.</span>
          </h2>
          <p className="cine-hire-reveal mt-5 max-w-md text-[var(--c-sage)]">
            We style and hire plants for the rooms that want to feel alive, then
            keep them that way. Delivered, placed, and maintained from the
            glasshouse.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[var(--c-brass-line)] sm:grid-cols-2">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="cine-hire-reveal group bg-[var(--c-canvas)] p-6 transition-colors duration-400 hover:bg-[var(--c-surface)]/60"
              >
                <s.icon className="h-5 w-5 text-[var(--c-glow)]" />
                <h3 className="mt-3 font-[family-name:var(--font-serif)] text-xl text-[var(--c-bone)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-[var(--c-sage)]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div className="cine-hire-reveal mt-10">
            <MagneticCTA href="#visit">
              Enquire about hire <ArrowUpRight className="h-4 w-4" />
            </MagneticCTA>
          </div>
        </div>

        {/* right: media slots */}
        <div className="cine-hire-reveal grid grid-cols-1 gap-5 sm:grid-cols-2">
          <MediaSlot
            id="F4"
            src="/media/monstera.png"
            label="day / night styling"
            kind="pair"
            aspect="3 / 4"
            className="sm:col-span-1"
          />
          <div className="flex flex-col gap-5">
            <MediaSlot
              id="F5"
              src="/media/leaf-macro.png"
              video="/media/video/leaf-loop.mp4"
              label="leaf macro"
              kind="loop"
              aspect="4 / 3"
            />
            <MediaSlot
              id="F5"
              src="/media/glasshouse-day.png"
              label="office install"
              kind="still"
              aspect="4 / 3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
