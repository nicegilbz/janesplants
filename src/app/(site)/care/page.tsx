import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND, CARE_STEPS, CARE_GUIDES } from "@/lib/content";
import MagneticCTA from "@/components/cinematic/MagneticCTA";
import { MistBand } from "@/components/cinematic/botanicals";
import CareGuides from "@/components/cinematic/care/CareGuides";
import LightMatch from "@/components/cinematic/care/LightMatch";

export const metadata: Metadata = {
  title: "Care guides / Jane's Plants",
  description:
    "Honest, plain-English houseplant care. Read your light, water without fear, and match a plant to your room.",
};

/**
 * /cinematic/care — the care guides hub.
 *
 * Server component shell (hero + the four-rules strip + CTAs) composed with two
 * client islands: an accordion of the five CARE_GUIDES and the light-matcher.
 * Header / footer / grain / smooth-scroll / cursor all live in the layout, so
 * this only builds page sections. Hero is full-height; the fixed header floats.
 */
export default function CarePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- *
       * Hero
       * ---------------------------------------------------------------- */}
      <section className="relative flex min-h-[88svh] items-center overflow-hidden">
        {/* atmospheric glow pools */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 20% 25%, rgba(31,95,63,0.45), transparent 60%), radial-gradient(50% 50% at 85% 80%, rgba(159,209,91,0.10), transparent 60%)",
          }}
          aria-hidden
        />
        {/* far mist band at the foot of the hero */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 opacity-50" aria-hidden>
          <MistBand accent="#1f5f3f" className="h-full w-full" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-28">
          <div className="mb-7 flex items-center gap-4">
            <span className="cine-eyebrow">Care</span>
            <span className="h-px w-16 bg-[var(--c-brass-line)]" />
          </div>
          <h1 className="cine-serif max-w-4xl text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.98] text-[var(--c-bone)]">
            Keep them{" "}
            <span className="cine-accent text-[var(--c-glow)]">thriving</span>.
          </h1>
          <p className="mt-8 max-w-xl text-[1.15rem] leading-relaxed text-[var(--c-sage)]">
            No mystery, no jargon. Every plant we sell comes with honest care
            guidance, and here is the longer version. Read your light, water less
            than you think, and let the rest follow.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-4">
            <MagneticCTA href="#guides">Read the guides</MagneticCTA>
            <MagneticCTA href="/shop" variant="ghost">
              Browse the plants
            </MagneticCTA>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * Four honest rules
       * ---------------------------------------------------------------- */}
      <section className="relative border-y border-[var(--c-brass-line)] bg-[var(--c-surface)]/30 py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="cine-serif text-[clamp(1.8rem,4vw,3rem)] text-[var(--c-bone)]">
              Four honest rules
            </h2>
            <p className="cine-mono max-w-xs text-[0.66rem] uppercase leading-relaxed tracking-[0.22em] text-[var(--c-sage)]">
              Get these right and most plants forgive the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CARE_STEPS.map((step, i) => (
              <article
                key={step.title}
                className="group relative overflow-hidden rounded-2xl cine-glass p-7 transition-colors duration-500 hover:bg-[var(--c-surface)]/50"
              >
                <div
                  className="absolute -right-8 -top-12 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(159,209,91,0.14), transparent 70%)",
                  }}
                  aria-hidden
                />
                <span className="cine-serif text-5xl leading-none text-[var(--c-glow)]/70">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-[family-name:var(--font-serif)] text-xl text-[var(--c-bone)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.96rem] leading-relaxed text-[var(--c-sage)]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * The five guides (accordion island)
       * ---------------------------------------------------------------- */}
      <div id="guides" className="scroll-mt-24">
        <CareGuides />
      </div>

      {/* ---------------------------------------------------------------- *
       * Read the full guide — links to each /care/[slug] detail page
       * ---------------------------------------------------------------- */}
      <section className="relative border-t border-[var(--c-brass-line)] bg-[var(--c-surface)]/20 py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="cine-serif text-[clamp(1.8rem,4vw,3rem)] text-[var(--c-bone)]">
              Read a guide in full
            </h2>
            <p className="cine-mono max-w-xs text-[0.66rem] uppercase leading-relaxed tracking-[0.22em] text-[var(--c-sage)]">
              Each one on its own page, kept short and honest.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARE_GUIDES.map((guide, i) => (
              <Link
                key={guide.slug}
                href={`/care/${guide.slug}`}
                className="group relative overflow-hidden rounded-2xl cine-glass p-7 transition-colors duration-500 hover:bg-[var(--c-surface)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(159,209,91,0.14), transparent 70%)",
                  }}
                  aria-hidden
                />
                <span className="cine-mono text-[0.7rem] tracking-[0.24em] text-[var(--c-brass)]">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-serif)] text-xl text-[var(--c-bone)] transition-colors group-hover:text-[var(--c-glow)]">
                  {guide.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--c-sage)]">
                  {guide.summary}
                </p>
                <span className="cine-mono mt-6 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--c-brass)] transition-colors group-hover:text-[var(--c-glow)]">
                  Read the full guide
                  <ArrowRight
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * Match a plant to your light (interactive island)
       * ---------------------------------------------------------------- */}
      <div className="border-t border-[var(--c-brass-line)]">
        <LightMatch />
      </div>

      {/* ---------------------------------------------------------------- *
       * Soft closing CTA — still stuck? ask us
       * ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 50%, rgba(31,95,63,0.30), transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <span className="cine-eyebrow">Still stuck?</span>
          <h2 className="cine-serif mt-6 text-[clamp(2rem,5.5vw,4rem)] leading-[1.02] text-[var(--c-bone)]">
            Tell us the room, the plant, the problem.{" "}
            <span className="cine-accent text-[var(--c-glow)]">We will help.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
            Bring a photo of a sulking plant to the glasshouse, or drop us a line.
            We would rather you ask than lose it. We also plant and look after
            green spaces in homes and offices, if you would like the whole thing
            handled for you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticCTA href="/visit#enquire">Ask us a question</MagneticCTA>
            <MagneticCTA href="/hire" variant="ghost">
              Have us style it
            </MagneticCTA>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[var(--c-sage)]">
            <Link
              href="/"
              className="cine-mono group inline-flex items-center gap-2 rounded-sm text-[0.66rem] uppercase tracking-[0.22em] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Back to the glasshouse
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="cine-mono rounded-sm text-[0.66rem] uppercase tracking-[0.22em] text-[var(--c-brass)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {BRAND.contactEmail}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
