"use client";

/**
 * Manifesto — brand intro spread.
 * Asymmetric two-column editorial: a drop-capped mission paragraph with
 * marginalia, a hairline-ruled promise list, and a full-bleed founder
 * pull-quote rendered in Instrument Serif.
 */

import { BRAND } from "@/lib/content";
import { SplitReveal } from "./primitives";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative mx-auto max-w-[1500px] px-5 py-28 sm:px-10 lg:px-16 lg:py-40"
    >
      {/* kicker row */}
      <div className="ed-mono mb-14 flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.28em] text-[var(--ed-ink-soft)]">
        <span className="text-[var(--ed-brass)]">§ 01</span>
        <span className="h-px flex-1 bg-[var(--ed-hair)]" />
        <span>The shop & the studio</span>
      </div>

      <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left: marginalia + tagline */}
        <div className="lg:pt-2">
          <SplitReveal
            as="h2"
            type="lines"
            className="ed-display text-[clamp(2.4rem,4.6vw,4.2rem)]"
            y="112%"
          >
            {BRAND.tagline}
          </SplitReveal>
          <p className="ed-mono mt-8 max-w-xs text-[0.7rem] leading-relaxed uppercase tracking-[0.18em] text-[var(--ed-ink-soft)]/80">
            A working glasshouse where every plant is hand-picked, kept honest
            and styled to belong in a room you love.
          </p>
        </div>

        {/* Right: drop-cap mission + promise */}
        <div className="max-w-2xl">
          <SplitReveal
            as="p"
            type="lines"
            className="ed-dropcap ed-body text-[1.18rem] leading-[1.78] text-[var(--ed-ink)]"
            stagger={0.07}
          >
            {BRAND.mission}
          </SplitReveal>

          <ul className="mt-12 divide-y divide-[var(--ed-hair)] border-y border-[var(--ed-hair)]">
            {BRAND.promise.map((p, i) => (
              <li
                key={p}
                className="flex items-baseline gap-5 py-5"
              >
                <span className="ed-mono ed-num text-[0.7rem] text-[var(--ed-brass)]">
                  0{i + 1}
                </span>
                <span className="ed-serif text-[1.15rem] text-[var(--ed-ink)]">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* full-bleed pull-quote */}
      <figure className="mt-28 lg:mt-40">
        <SplitReveal
          as="blockquote"
          type="lines"
          className="ed-accent mx-auto max-w-5xl text-center text-[clamp(1.8rem,4.4vw,3.6rem)] italic leading-[1.18] text-[var(--ed-ink)]"
          stagger={0.09}
        >
          &ldquo;{BRAND.founder.note}&rdquo;
        </SplitReveal>
        <figcaption className="ed-mono mt-10 text-center text-[0.66rem] uppercase tracking-[0.28em] text-[var(--ed-ink-soft)]">
          {BRAND.founder.name},{" "}
          <span className="text-[var(--ed-brass)]">{BRAND.founder.role}</span>
        </figcaption>
      </figure>
    </section>
  );
}
