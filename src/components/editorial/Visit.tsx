"use client";

/**
 * Visit — closing spread + footer / colophon.
 * A big serif invitation, the glasshouse location, a real CTA to email, and a
 * magazine colophon footer with the Gemini hero-loop slot reserved.
 */

import { BRAND, ACCESSORIES } from "@/lib/content";
import { SplitReveal, MediaPlate, MagneticLink } from "./primitives";

/* Fixed at build time so the footer year is identical on server and client
   (new Date() in render would mismatch across a midnight/year boundary). */
const COPYRIGHT_YEAR = 2026;

export default function Visit() {
  const cheapestPot = Math.min(
    ...ACCESSORIES.filter((a) => a.kind === "Pot").map((a) => a.price),
  );

  return (
    <footer
      id="visit"
      className="relative border-t border-[var(--ed-hair)] bg-[var(--ed-cream)]"
    >
      <div className="mx-auto max-w-[1500px] px-5 pt-28 sm:px-10 lg:px-16 lg:pt-40">
        <div className="ed-mono mb-16 flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.28em] text-[var(--ed-ink-soft)]">
          <span className="text-[var(--ed-brass)]">§ 07</span>
          <span className="h-px flex-1 bg-[var(--ed-hair)]" />
          <span>{BRAND.location.label}</span>
        </div>

        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <SplitReveal
              as="h2"
              type="words"
              className="ed-display text-[clamp(3rem,8vw,7rem)]"
              stagger={0.07}
              y="115%"
            >
              Come and{" "}
              <span className="ed-accent italic text-[var(--ed-olive)]">
                wander
              </span>
              .
            </SplitReveal>
            <p className="ed-body mt-8 max-w-md text-[1.08rem] leading-relaxed text-[var(--ed-ink-soft)]">
              {BRAND.location.line} Find the plant that belongs in your room,
              leave with the pot to match, or talk to us about styling a whole
              space.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
              <a
                href={`mailto:${BRAND.contactEmail}`}
                className="ed-mono group inline-flex items-center gap-3 rounded-full bg-[var(--ed-ink)] px-7 py-4 text-[0.68rem] uppercase tracking-[0.24em] text-[var(--ed-cream)] transition-transform hover:-translate-y-0.5"
              >
                {BRAND.contactEmail}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <MagneticLink
                href="#collection"
                className="ed-mono text-[0.72rem] uppercase tracking-[0.22em]"
              >
                Back to the index
              </MagneticLink>
            </div>
          </div>

          {/* hero-loop slot */}
          <MediaPlate
            assetId="F1 / hero loop"
            caption="Pl. VII / The glasshouse, Hertford"
            ratio="1 / 1"
          >
            <p className="ed-accent text-[1.4rem] italic text-[var(--ed-olive)]">
              {BRAND.name}
            </p>
            <p className="ed-mono mt-1 text-[0.6rem] uppercase tracking-[0.22em] text-[var(--ed-ink-soft)]/70">
              Hertford, England
            </p>
          </MediaPlate>
        </div>

        {/* colophon */}
        <div className="ed-mono mt-28 grid grid-cols-2 gap-8 border-t border-[var(--ed-hair-strong)] py-12 text-[0.62rem] uppercase tracking-[0.2em] text-[var(--ed-ink-soft)] sm:grid-cols-4 lg:mt-36">
          <div>
            <p className="mb-3 text-[var(--ed-brass)]">Shop</p>
            <p className="ed-num normal-case tracking-normal">
              Plants from £18 · pots from £{cheapestPot}
            </p>
          </div>
          <div>
            <p className="mb-3 text-[var(--ed-brass)]">Hire</p>
            <p className="normal-case tracking-normal">
              Homes · Offices · Events · Weddings
            </p>
          </div>
          <div>
            <p className="mb-3 text-[var(--ed-brass)]">Find us</p>
            <p className="normal-case tracking-normal">
              The greenhouse, Hertford
            </p>
          </div>
          <div>
            <p className="mb-3 text-[var(--ed-brass)]">Say hello</p>
            <p className="normal-case tracking-normal">{BRAND.contactEmail}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--ed-hair)] py-8 text-[0.58rem] uppercase tracking-[0.24em] text-[var(--ed-ink-soft)]/70">
          <span className="ed-mono">
            © {COPYRIGHT_YEAR} {BRAND.name}
          </span>
          <span className="ed-mono">Issue 02 / Editorial Botanical</span>
        </div>
      </div>
    </footer>
  );
}
