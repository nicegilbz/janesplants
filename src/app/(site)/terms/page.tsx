import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms / Jane's Plants",
  description:
    "The plain-English terms for using the Jane's Plants website: prices and availability can change, an enquiry is not a confirmed order, and living plants vary.",
};

/**
 * Cinematic Jungle — terms. A readable, centered prose column. Tokens, grain,
 * header and footer live in the cinematic layout. The fixed ~72px header
 * floats over the top, so this page carries its own top padding.
 */
export default function TermsPage() {
  return (
    <section className="relative px-6 pb-28 pt-[7rem] lg:pt-[8rem]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 50% at 50% 0%, rgba(31,95,63,0.22), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl">
        <header className="text-center">
          <span className="cine-eyebrow block">The small print</span>
          <h1 className="cine-serif mt-6 text-[clamp(2.4rem,6vw,4rem)] text-[var(--c-bone)]">
            Terms
          </h1>
          <p className="cine-mono mt-5 text-[0.7rem] uppercase tracking-[0.26em] text-[var(--c-sage)]">
            Last updated June 2026
          </p>
          <div className="cine-rule mx-auto mt-10 max-w-xs" />
        </header>

        <div className="mt-12 space-y-10 text-[1.02rem] leading-relaxed text-[var(--c-sage)]">
          <p>
            Nothing tricky here. These are the everyday terms for using the
            Jane&apos;s Plants website. Using the site means you are happy with
            them.
          </p>

          <div>
            <h2 className="cine-serif text-[1.5rem] text-[var(--c-bone)]">
              The site is here to inform
            </h2>
            <p className="mt-4">
              This website is here to show you what we grow and what we do. It
              is not a checkout. We have tried to keep everything accurate, but
              the site is provided as it is, and we cannot promise it will
              always be perfect or complete.
            </p>
          </div>

          <div>
            <h2 className="cine-serif text-[1.5rem] text-[var(--c-bone)]">
              Prices and availability
            </h2>
            <p className="mt-4">
              Prices, stock and the plants we have on the bench all change with
              the seasons. Anything listed here is a guide, not a fixed offer,
              and may be different by the time you get in touch. We will always
              confirm the current price and availability with you directly.
            </p>
          </div>

          <div>
            <h2 className="cine-serif text-[1.5rem] text-[var(--c-bone)]">
              An enquiry is not an order
            </h2>
            <p className="mt-4">
              Sending us a message starts a conversation, it does not confirm a
              purchase, a booking or a hire. Nothing is reserved until we have
              spoken and both agreed it. That keeps things honest on both sides.
            </p>
          </div>

          <div>
            <h2 className="cine-serif text-[1.5rem] text-[var(--c-bone)]">
              Living things vary
            </h2>
            <p className="mt-4">
              Every plant photo is representative of the variety, not a portrait
              of the exact plant you will receive. These are living things grown
              by hand, so size, shape, leaf count and colour will vary from one
              to the next. That variation is the point, and we will always help
              you pick a good one.
            </p>
          </div>

          <div>
            <h2 className="cine-serif text-[1.5rem] text-[var(--c-bone)]">
              Content and ownership
            </h2>
            <p className="mt-4">
              The words, images, branding and design on this site belong to
              Jane&apos;s Plants. You are welcome to enjoy them and share a link,
              but please do not copy or reuse them for your own commercial
              purposes without asking us first.
            </p>
          </div>

          <div>
            <h2 className="cine-serif text-[1.5rem] text-[var(--c-bone)]">
              Which law applies
            </h2>
            <p className="mt-4">
              These terms are governed by the law of England and Wales, and any
              dispute will be handled by the courts of England and Wales.
            </p>
          </div>
        </div>

        <div className="cine-rule mx-auto mt-14 max-w-xs" />
        <p className="mt-8 text-center text-[0.9rem] text-[var(--c-sage)]">
          Not sure about something?{" "}
          <a
            href={`mailto:${BRAND.contactEmail}`}
            className="text-[var(--c-glow)] underline-offset-4 hover:underline"
          >
            {BRAND.contactEmail}
          </a>
          . You can also read our{" "}
          <Link
            href="/privacy"
            className="text-[var(--c-glow)] underline-offset-4 hover:underline"
          >
            privacy notice
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
