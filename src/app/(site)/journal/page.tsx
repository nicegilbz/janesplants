import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { JOURNAL, BRAND } from "@/lib/content";
import { MistBand, Frond } from "@/components/cinematic/botanicals";
import Reveal from "@/components/cinematic/journal/Reveal";

export const metadata: Metadata = {
  title: "Journal / Jane's Plants",
  description:
    "Growing notes from the glasshouse. Honest, plain-English writing on care, styling and the plants we love most.",
};

/**
 * /journal — the editorial index.
 *
 * Server component: a header band, then the JOURNAL posts as a stacked
 * editorial list. The header / footer / grain / smooth-scroll all live in the
 * (site) layout, so this only builds page sections. The fixed header floats
 * over the top, so the band carries generous top padding.
 */
export default function JournalPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- *
       * Header band
       * ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden pb-16 pt-[7rem] sm:pt-[8rem]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 18% 18%, rgba(31,95,63,0.40), transparent 62%), radial-gradient(45% 45% at 88% 12%, rgba(159,209,91,0.10), transparent 60%)",
          }}
          aria-hidden
        />
        {/* a quiet frond drifting in from the right margin */}
        <div
          className="pointer-events-none absolute -right-10 top-10 hidden h-[26rem] w-[20rem] opacity-[0.16] lg:block"
          aria-hidden
        >
          <Frond accent="#1f5f3f" className="h-full w-full" flip />
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-6">
          <div className="mb-7 flex items-center gap-4">
            <span className="cine-eyebrow">Journal</span>
            <span className="h-px w-16 bg-[var(--c-brass-line)]" />
          </div>
          <h1 className="cine-serif max-w-3xl text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.98] text-[var(--c-bone)]">
            Growing{" "}
            <span className="cine-accent text-[var(--c-glow)]">notes</span>.
          </h1>
          <p className="mt-8 max-w-xl text-[1.15rem] leading-relaxed text-[var(--c-sage)]">
            What we learn at the glasshouse, written down. No jargon, no scare
            tactics, just honest words on care, styling and the plants we keep
            coming back to.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * Posts
       * ---------------------------------------------------------------- */}
      <section className="relative pb-28">
        <div className="mx-auto w-full max-w-5xl px-6">
          <ul className="divide-y divide-[var(--c-brass-line)] border-t border-[var(--c-brass-line)]">
            {JOURNAL.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 70}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="group block py-9 outline-none sm:py-11"
                >
                  <div className="cine-mono flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.66rem] uppercase tracking-[0.22em] text-[var(--c-sage)]">
                    <span className="text-[var(--c-glow)]">{post.category}</span>
                    <span className="h-1 w-1 rounded-full bg-[var(--c-brass-line)]" />
                    <span>{post.dateLabel}</span>
                    <span className="h-1 w-1 rounded-full bg-[var(--c-brass-line)]" />
                    <span>{post.readMins} min read</span>
                  </div>

                  <h2 className="cine-serif mt-4 max-w-3xl text-[clamp(1.7rem,4.2vw,3rem)] leading-[1.04] text-[var(--c-bone)] transition-colors duration-500 group-hover:text-[var(--c-glow)]">
                    {post.title}
                  </h2>

                  <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-[var(--c-sage)]">
                    {post.excerpt}
                  </p>

                  <span className="cine-mono mt-6 inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.22em] text-[var(--c-brass)] transition-colors group-hover:text-[var(--c-glow)]">
                    Read the note
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          {/* soft CTA back to the rest of the site */}
          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href="/care"
              className="cine-mono group inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.22em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)]"
            >
              The full care guides
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/shop"
              className="cine-mono group inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.22em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)]"
            >
              Shop the collection
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="cine-mono text-[0.66rem] uppercase tracking-[0.22em] text-[var(--c-brass)] transition-colors hover:text-[var(--c-glow)]"
            >
              {BRAND.contactEmail}
            </a>
          </div>
        </div>

        {/* a low mist band closing the page out */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-40"
          aria-hidden
        >
          <MistBand accent="#1f5f3f" className="h-full w-full" />
        </div>
      </section>
    </>
  );
}
