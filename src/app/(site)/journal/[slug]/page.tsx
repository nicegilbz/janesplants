import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { JOURNAL, getJournalPost, BRAND } from "@/lib/content";
import MediaSlot from "@/components/cinematic/MediaSlot";
import MagneticCTA from "@/components/cinematic/MagneticCTA";
import { MistBand } from "@/components/cinematic/botanicals";
import Reveal from "@/components/cinematic/journal/Reveal";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return JOURNAL.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) {
    return { title: "Journal / Jane's Plants" };
  }
  return {
    title: `${post.title} / Jane's Plants`,
    description: post.excerpt,
  };
}

/**
 * /journal/[slug] — a single growing note.
 *
 * Server component. Renders the article in a centred, readable editorial column
 * (~65ch), with a leaf-macro header visual, the section blocks, two "keep
 * reading" links and a soft CTA. The fixed header floats over the top, so the
 * meta band carries generous top padding.
 */
export default async function JournalPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  // two other posts to carry the reader onward
  const others = JOURNAL.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="relative pb-28 pt-[7rem] sm:pt-[8rem]">
      <div
        className="pointer-events-none absolute inset-0 top-0 h-[40vh]"
        style={{
          background:
            "radial-gradient(60% 70% at 25% 0%, rgba(31,95,63,0.34), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[44rem] px-6">
        {/* back link */}
        <Link
          href="/journal"
          className="cine-mono group inline-flex items-center gap-2 rounded-sm text-[0.66rem] uppercase tracking-[0.22em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          All notes
        </Link>

        {/* meta row */}
        <div className="cine-mono mt-9 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.66rem] uppercase tracking-[0.22em] text-[var(--c-sage)]">
          <span className="text-[var(--c-glow)]">{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-[var(--c-brass-line)]" />
          <span>{post.dateLabel}</span>
          <span className="h-1 w-1 rounded-full bg-[var(--c-brass-line)]" />
          <span>{post.readMins} min read</span>
        </div>

        {/* title */}
        <h1 className="cine-serif mt-5 text-[clamp(2.1rem,5.5vw,3.8rem)] leading-[1.02] text-[var(--c-bone)]">
          {post.title}
        </h1>

        <p className="mt-6 text-[1.18rem] leading-relaxed text-[var(--c-sage)]">
          {post.excerpt}
        </p>

        {/* header visual */}
        <div className="mt-10">
          <MediaSlot id="L3" label="leaf macro" aspect="16 / 7" kind="still" />
        </div>

        <span className="my-12 block h-px w-full bg-[var(--c-brass-line)]" />

        {/* body sections */}
        <div className="space-y-9">
          {post.sections.map((section, i) => (
            <Reveal key={i} delay={Math.min(i, 4) * 50}>
              {section.heading ? (
                <h2 className="cine-serif mb-3 text-[clamp(1.4rem,3.5vw,2rem)] leading-[1.1] text-[var(--c-bone)]">
                  {section.heading}
                </h2>
              ) : null}
              <p className="text-[1.12rem] leading-[1.85] text-[var(--c-bone)]/85">
                {section.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- *
       * Keep reading
       * ---------------------------------------------------------------- */}
      <section className="relative mt-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mb-8 flex items-center gap-4">
            <span className="cine-eyebrow">Keep reading</span>
            <span className="h-px w-16 bg-[var(--c-brass-line)]" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/journal/${p.slug}`}
                className="group cine-glass relative flex flex-col rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div className="cine-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--c-sage)]">
                  <span className="text-[var(--c-glow)]">{p.category}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--c-brass-line)]" />
                  <span>{p.readMins} min read</span>
                </div>
                <h3 className="cine-serif mt-3 text-[clamp(1.3rem,3vw,1.85rem)] leading-[1.06] text-[var(--c-bone)] transition-colors group-hover:text-[var(--c-glow)]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-[var(--c-sage)]">
                  {p.excerpt}
                </p>
                <span className="cine-mono mt-5 inline-flex items-center gap-2 text-[0.64rem] uppercase tracking-[0.22em] text-[var(--c-brass)] transition-colors group-hover:text-[var(--c-glow)]">
                  Read the note
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * Soft CTA
       * ---------------------------------------------------------------- */}
      <section className="relative mt-24 overflow-hidden py-20">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44 opacity-45"
          aria-hidden
        >
          <MistBand accent="#1f5f3f" className="h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="cine-serif text-[clamp(1.8rem,5vw,3.4rem)] leading-[1.04] text-[var(--c-bone)]">
            Ready to{" "}
            <span className="cine-accent text-[var(--c-glow)]">begin</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
            Pick something forgiving and characterful from the collection, or
            read the longer care guides before you do. Either way, we are here if
            you get stuck.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <MagneticCTA href="/shop">Shop the collection</MagneticCTA>
            <MagneticCTA href="/care" variant="ghost">
              Read the care guides
            </MagneticCTA>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <Link
              href="/journal"
              className="cine-mono group inline-flex items-center gap-2 rounded-sm text-[0.66rem] uppercase tracking-[0.22em] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Back to the journal
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
    </article>
  );
}
