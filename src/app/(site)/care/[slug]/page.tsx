import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { BRAND, CARE_GUIDES } from "@/lib/content";
import MagneticCTA from "@/components/cinematic/MagneticCTA";
import { MistBand } from "@/components/cinematic/botanicals";

/** Pre-render every care guide at build time. */
export function generateStaticParams() {
  return CARE_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = CARE_GUIDES.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide not found / Jane's Plants" };
  return {
    title: `${guide.title} / Jane's Plants`,
    description: guide.summary,
  };
}

/**
 * /care/[slug] — a single care guide.
 *
 * Server component. Layout supplies the header, footer, grain, smooth-scroll
 * and theme, so this only renders the article: a readable centred column with
 * the summary as a lead, the tips as a glow-ticked checklist, the other guides,
 * and the closing CTAs.
 */
export default async function CareGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = CARE_GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  const others = CARE_GUIDES.filter((g) => g.slug !== slug);

  return (
    <article className="relative overflow-hidden">
      {/* atmospheric glow pools behind the header */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(60% 50% at 25% 20%, rgba(31,95,63,0.40), transparent 60%), radial-gradient(45% 45% at 88% 10%, rgba(159,209,91,0.08), transparent 60%)",
        }}
        aria-hidden
      />

      {/* ---------------------------------------------------------------- *
       * Header
       * ---------------------------------------------------------------- */}
      <header className="relative mx-auto w-full max-w-3xl px-6 pt-[7rem] lg:pt-32">
        <Link
          href="/care"
          className="cine-mono group inline-flex items-center gap-2 rounded-sm text-[0.66rem] uppercase tracking-[0.22em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          All care guides
        </Link>

        <div className="mt-9 mb-6 flex items-center gap-4">
          <span className="cine-eyebrow">Care guide</span>
          <span className="h-px w-16 bg-[var(--c-brass-line)]" />
        </div>

        <h1 className="cine-serif text-[clamp(2.4rem,7vw,4.5rem)] leading-[1.0] text-[var(--c-bone)]">
          {guide.title}
        </h1>

        <p className="mt-7 text-[1.2rem] leading-relaxed text-[var(--c-sage)]">
          {guide.summary}
        </p>
      </header>

      {/* ---------------------------------------------------------------- *
       * The tips checklist
       * ---------------------------------------------------------------- */}
      <section className="relative mx-auto w-full max-w-3xl px-6 pt-12 lg:pt-16">
        <div className="cine-rule mb-10" />
        <ul className="flex flex-col gap-5">
          {guide.tips.map((tip) => (
            <li
              key={tip}
              className="group flex items-start gap-4 rounded-2xl cine-glass p-5 transition-colors duration-500 hover:bg-[var(--c-surface)]/50 sm:p-6"
            >
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--c-glow-soft)] text-[var(--c-glow)] ring-1 ring-[var(--c-glow-line)]"
                aria-hidden
              >
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <p className="text-[1.05rem] leading-relaxed text-[var(--c-bone)]/90">
                {tip}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- *
       * More care guides
       * ---------------------------------------------------------------- */}
      <section className="relative mx-auto w-full max-w-3xl px-6 pt-20 lg:pt-28">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="cine-serif text-[clamp(1.6rem,3.5vw,2.4rem)] text-[var(--c-bone)]">
            More care guides
          </h2>
          <Link
            href="/care"
            className="cine-mono group hidden items-center gap-2 rounded-sm text-[0.66rem] uppercase tracking-[0.22em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:inline-flex"
          >
            See all
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {others.map((g) => (
            <Link
              key={g.slug}
              href={`/care/${g.slug}`}
              className="group relative overflow-hidden rounded-2xl cine-glass p-6 transition-colors duration-500 hover:bg-[var(--c-surface)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(159,209,91,0.14), transparent 70%)",
                }}
                aria-hidden
              />
              <h3 className="font-[family-name:var(--font-serif)] text-xl text-[var(--c-bone)] transition-colors group-hover:text-[var(--c-glow)]">
                {g.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--c-sage)]">
                {g.summary}
              </p>
              <span className="cine-mono mt-5 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--c-brass)]">
                Read the guide
                <ArrowRight
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * Closing CTAs
       * ---------------------------------------------------------------- */}
      <section className="relative mx-auto w-full max-w-3xl px-6 pb-28 pt-20 text-center lg:pb-36 lg:pt-28">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-40" aria-hidden>
          <MistBand accent="#1f5f3f" className="h-full w-full" />
        </div>

        <div className="relative">
          <span className="cine-eyebrow">Ready when you are</span>
          <h2 className="cine-serif mx-auto mt-6 max-w-xl text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.04] text-[var(--c-bone)]">
            Put it into practice with a plant you{" "}
            <span className="cine-accent text-[var(--c-glow)]">love</span>.
          </h2>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <MagneticCTA href="/shop">Browse the plants</MagneticCTA>
            <MagneticCTA href="/visit#enquire" variant="ghost">
              Still stuck? Ask us
            </MagneticCTA>
          </div>

          <p className="mx-auto mt-10 max-w-md text-[0.95rem] leading-relaxed text-[var(--c-sage)]">
            Bring a photo of a sulking plant to the glasshouse, or drop us a
            line at{" "}
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="rounded-sm text-[var(--c-brass)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {BRAND.contactEmail}
            </a>
            . We would rather you ask than lose it.
          </p>
        </div>
      </section>
    </article>
  );
}
