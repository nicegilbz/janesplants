"use client";

/**
 * PlantIndex — THE signature set-piece.
 *
 * A horizontal-scroll editorial gallery. The section pins and the track
 * translates on vertical scroll (GSAP ScrollTrigger + pin), presenting the
 * twelve plants as numbered magazine plates: big Fraunces name, italic Latin,
 * "from £X" in tabular mono, and a procedural SVG botanical per plant.
 *
 * Powered by: GSAP ScrollTrigger (horizontal pin/scrub). Works with the
 * shared Lenis smooth-scroll already wired to the GSAP ticker. On touch /
 * reduced-motion it degrades to a native horizontal swipe rail.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PLANTS } from "@/lib/content";
import Botanical from "./Botanical";

export default function PlantIndex() {
  const section = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const fill = useRef<HTMLDivElement | null>(null);
  const [pinMode, setPinMode] = useState(false);

  // Decide pin vs. native swipe rail once mounted, then keep it correct on
  // resize. Kept out of the effect body via a callback so we never call
  // setState synchronously during the effect.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const decide = () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const narrow = window.matchMedia("(max-width: 860px)").matches;
      setPinMode(!(reduced || coarse || narrow));
    };
    const id = requestAnimationFrame(decide);
    window.addEventListener("resize", decide);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", decide);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !pinMode) return;

    gsap.registerPlugin(ScrollTrigger);
    const sec = section.current;
    const trk = track.current;
    if (!sec || !trk) return;

    const ctx = gsap.context(() => {
      const getDistance = () => trk.scrollWidth - window.innerWidth;

      const tween = gsap.to(trk, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (fill.current)
              fill.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      return () => {
        tween.kill();
      };
    }, sec);

    return () => ctx.revert();
  }, [pinMode]);

  return (
    <section
      id="collection"
      ref={section}
      className="relative overflow-hidden bg-[var(--ed-oat)]/40"
    >
      {/* Heading band */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-5 pt-10 sm:px-10 lg:px-16">
        <div className="ed-mono flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.28em] text-[var(--ed-ink-soft)]">
          <span className="text-[var(--ed-brass)]">§ 02</span>
          <span className="h-px flex-1 bg-[var(--ed-hair)]" />
          <span>The Plant Index / twelve plates</span>
        </div>
      </div>

      <div
        className={
          pinMode
            ? "flex min-h-[100svh] items-center"
            : "flex min-h-[80svh] items-center"
        }
      >
        <div
          ref={track}
          className={
            pinMode
              ? "flex flex-nowrap items-stretch gap-0 pl-5 pr-[12vw] sm:pl-10 lg:pl-16"
              : "flex snap-x snap-mandatory flex-nowrap items-stretch gap-0 overflow-x-auto pl-5 pr-[12vw] pb-8 sm:pl-10 lg:pl-16 [scrollbar-width:none]"
          }
        >
          {/* Intro plate */}
          <article className="flex w-[78vw] shrink-0 snap-start flex-col justify-center border-r border-[var(--ed-hair)] pr-[6vw] sm:w-[44vw] lg:w-[34vw]">
            <p className="ed-kicker mb-5">The collection</p>
            <h2 className="ed-display text-[clamp(2.6rem,5vw,5rem)]">
              Twelve plants,{" "}
              <span className="ed-accent italic text-[var(--ed-olive)]">
                catalogued
              </span>
              .
            </h2>
            <p className="ed-body mt-6 max-w-sm text-[0.98rem] leading-relaxed text-[var(--ed-ink-soft)]">
              Each plate is a plant we keep in the glasshouse. Drawn by hand,
              priced to take home, and ready to be styled in situ.
            </p>
            <p className="ed-mono mt-8 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--ed-ink-soft)]/70">
              {pinMode ? "Scroll →" : "Swipe →"}
            </p>
          </article>

          {PLANTS.map((p, i) => (
            <Plate key={p.slug} plant={p} index={i + 1} />
          ))}

          {/* Closing plate */}
          <article className="flex w-[60vw] shrink-0 snap-start flex-col items-start justify-center pl-[4vw] pr-[6vw] sm:w-[34vw] lg:w-[26vw]">
            <p className="ed-accent text-[clamp(1.6rem,3vw,2.6rem)] italic leading-tight text-[var(--ed-ink)]">
              Every plate, in person, at the glasshouse.
            </p>
            <a
              href="#visit"
              className="ed-mono mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--ed-ink)] px-6 py-3 text-[0.64rem] uppercase tracking-[0.24em] text-[var(--ed-cream)]"
            >
              Plan a visit →
            </a>
          </article>
        </div>
      </div>

      {/* progress hairline */}
      {pinMode && (
        <div className="absolute inset-x-5 bottom-8 z-20 h-px bg-[var(--ed-hair)] sm:inset-x-10 lg:inset-x-16">
          <div
            ref={fill}
            className="h-full origin-left bg-[var(--ed-brass)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      )}
    </section>
  );
}

function Plate({
  plant,
  index,
}: {
  plant: (typeof PLANTS)[number];
  index: number;
}) {
  return (
    <article className="group flex w-[80vw] shrink-0 snap-start flex-col border-r border-[var(--ed-hair)] px-[5vw] py-24 sm:w-[40vw] lg:w-[30vw]">
      {/* plate header */}
      <div className="flex items-baseline justify-between">
        <span className="ed-mono ed-num text-[0.7rem] tracking-[0.2em] text-[var(--ed-brass)]">
          Pl. {String(index).padStart(2, "0")}
        </span>
        <span className="ed-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--ed-ink-soft)]/70">
          {plant.category}
          {plant.rare ? " · rare" : ""}
        </span>
      </div>
      <hr className="ed-rule mt-3" />

      {/* botanical */}
      <div className="relative my-6 flex-1">
        <Botanical
          slug={plant.slug}
          accent={plant.accent}
          className="h-full max-h-[42vh] w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      {/* meta */}
      <div>
        <h3 className="ed-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[0.98]">
          {plant.name}
        </h3>
        <p className="ed-accent mt-1 text-[1.25rem] italic text-[var(--ed-olive)]">
          {plant.latin}
        </p>
        <p className="ed-body mt-4 max-w-xs text-[0.92rem] leading-relaxed text-[var(--ed-ink-soft)]">
          {plant.nickname}, {plant.light.toLowerCase()} light.
        </p>

        <div className="ed-mono mt-6 flex items-center justify-between border-t border-[var(--ed-hair)] pt-4 text-[0.66rem] uppercase tracking-[0.18em] text-[var(--ed-ink-soft)]">
          <span className="ed-num text-[var(--ed-ink)]">From £{plant.price}</span>
          <span className="flex items-center gap-2">
            {plant.petSafe && (
              <span className="rounded-full bg-[var(--ed-olive)]/15 px-2 py-0.5 text-[0.55rem] text-[var(--ed-olive)]">
                pet-safe
              </span>
            )}
            <span className="ed-num">
              {"·".repeat(plant.difficulty)}
              <span className="text-[var(--ed-hair-strong)]">
                {"·".repeat(5 - plant.difficulty)}
              </span>
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
