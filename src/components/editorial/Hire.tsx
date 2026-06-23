"use client";

/**
 * Hire — the plant-hire & styling revenue line.
 * A wide editorial spread: a directory of services (homes, offices, events,
 * weddings) as hairline-ruled rows with a framed Gemini styling-still plate.
 */

import { SplitReveal, MediaPlate, MagneticLink } from "./primitives";
import { BRAND } from "@/lib/content";

const SERVICES = [
  {
    no: "01",
    title: "Homes",
    note: "Styled green for a single room or a whole house, swapped with the seasons.",
    cadence: "Monthly hire",
  },
  {
    no: "02",
    title: "Offices",
    note: "Specified, installed and maintained planting that keeps a workspace alive.",
    cadence: "Contract hire",
  },
  {
    no: "03",
    title: "Events",
    note: "Statement plants and styling for launches, dinners and shoots.",
    cadence: "By the day",
  },
  {
    no: "04",
    title: "Weddings",
    note: "Living arrangements that go home with you, not in the bin.",
    cadence: "Bespoke",
  },
];

export default function Hire() {
  return (
    <section
      id="hire"
      className="relative mx-auto max-w-[1500px] px-5 py-28 sm:px-10 lg:px-16 lg:py-40"
    >
      <div className="ed-mono mb-16 flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.28em] text-[var(--ed-ink-soft)]">
        <span className="text-[var(--ed-brass)]">§ 05</span>
        <span className="h-px flex-1 bg-[var(--ed-hair)]" />
        <span>Hire & styling / green, on loan</span>
      </div>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* Left: headline + directory */}
        <div>
          <SplitReveal
            as="h2"
            type="words"
            className="ed-display max-w-xl text-[clamp(2.6rem,5.2vw,4.8rem)]"
            stagger={0.08}
            y="115%"
          >
            We don&rsquo;t only sell plants.{" "}
            <span className="ed-accent italic text-[var(--ed-olive)]">
              We place them.
            </span>
          </SplitReveal>

          <p className="ed-body mt-7 max-w-md text-[1.05rem] leading-relaxed text-[var(--ed-ink-soft)]">
            A second life for the glasshouse: plant hire and styling for homes,
            offices and events. We specify, deliver, style and keep it all
            thriving, then refresh it when you fancy a change.
          </p>

          <ul className="mt-12 border-t border-[var(--ed-hair)]">
            {SERVICES.map((s) => (
              <li
                key={s.no}
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 border-b border-[var(--ed-hair)] py-7 transition-colors hover:bg-[var(--ed-oat)]/40"
              >
                <span className="ed-mono ed-num text-[0.7rem] text-[var(--ed-brass)]">
                  {s.no}
                </span>
                <div>
                  <h3 className="ed-serif text-[1.5rem] text-[var(--ed-ink)] transition-transform duration-500 group-hover:translate-x-2">
                    {s.title}
                  </h3>
                  <p className="ed-body mt-1 max-w-sm text-[0.92rem] leading-relaxed text-[var(--ed-ink-soft)]">
                    {s.note}
                  </p>
                </div>
                <span className="ed-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--ed-ink-soft)]/70">
                  {s.cadence}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <MagneticLink
              href={`mailto:${BRAND.contactEmail}?subject=Plant%20hire%20enquiry`}
              className="ed-mono text-[0.74rem] uppercase tracking-[0.22em]"
            >
              Enquire about hire →
            </MagneticLink>
          </div>
        </div>

        {/* Right: styling-still plate */}
        <div className="lg:pt-10">
          <MediaPlate
            assetId="L2 / product / styling still"
            caption="Pl. VI / Styled in situ"
            ratio="3 / 4"
          >
            <p className="ed-accent text-[1.3rem] italic text-[var(--ed-olive)]">
              In situ
            </p>
            <p className="ed-mono mt-2 max-w-[14rem] text-[0.62rem] uppercase leading-relaxed tracking-[0.18em] text-[var(--ed-ink-soft)]/70">
              A styled corner of a Hertford office, hired and maintained
            </p>
          </MediaPlate>
        </div>
      </div>
    </section>
  );
}
