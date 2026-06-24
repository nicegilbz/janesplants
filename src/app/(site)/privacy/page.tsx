import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy / Jane's Plants",
  description:
    "What Jane's Plants does with the details you share through our enquiry form, how long we keep them, and how to ask about or delete your data.",
};

/**
 * Cinematic Jungle — privacy. A readable, centered prose column. Tokens,
 * grain, header and footer live in the cinematic layout. The fixed ~72px
 * header floats over the top, so this page carries its own top padding.
 */
export default function PrivacyPage() {
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
            Privacy
          </h1>
          <p className="cine-mono mt-5 text-[0.7rem] uppercase tracking-[0.26em] text-[var(--c-sage)]">
            Last updated June 2026
          </p>
          <div className="cine-rule mx-auto mt-10 max-w-xs" />
        </header>

        <div className="mt-12 space-y-10 text-[1.02rem] leading-relaxed text-[var(--c-sage)]">
          <p>
            We like to keep this plain. Jane&apos;s Plants is a small shop, and
            we only ever want enough of your details to be useful to you.
            Here is exactly what that means.
          </p>

          <div>
            <h2 className="cine-serif text-[1.5rem] text-[var(--c-bone)]">
              What the enquiry form collects
            </h2>
            <p className="mt-4">
              When you send us a message, we collect your name, email address,
              an optional phone number, and whatever you write in the message
              itself. That is the lot. We do not ask for anything we would not
              actually use to reply to you.
            </p>
          </div>

          <div>
            <h2 className="cine-serif text-[1.5rem] text-[var(--c-bone)]">
              What we do with it
            </h2>
            <p className="mt-4">
              We use your details for one thing: to reply to your enquiry and
              carry on the conversation if you want one. We do not sell your
              data, we do not share it with third parties for marketing, and we
              do not add you to a mailing list without you asking.
            </p>
          </div>

          <div>
            <h2 className="cine-serif text-[1.5rem] text-[var(--c-bone)]">
              How long we keep it
            </h2>
            <p className="mt-4">
              We keep your message for as long as it is helpful to look after
              you, and no longer. If a conversation goes nowhere and is clearly
              finished, we clear it out. You are always welcome to ask us to do
              that sooner.
            </p>
          </div>

          <div>
            <h2 className="cine-serif text-[1.5rem] text-[var(--c-bone)]">
              Hosting and analytics
            </h2>
            <p className="mt-4">
              This site is hosted on Vercel, who run the servers that deliver
              the pages to you. We use minimal, privacy-friendly analytics to
              understand roughly how many people visit and which pages are
              useful. We are not building a profile of you or tracking you
              across the web.
            </p>
          </div>

          <div>
            <h2 className="cine-serif text-[1.5rem] text-[var(--c-bone)]">
              Seeing or deleting your data
            </h2>
            <p className="mt-4">
              You can ask us what we hold about you, ask for a copy, or ask us
              to delete it entirely. Just email{" "}
              <a
                href={`mailto:${BRAND.contactEmail}`}
                className="text-[var(--c-glow)] underline-offset-4 hover:underline"
              >
                {BRAND.contactEmail}
              </a>{" "}
              and a real person will sort it out. No forms, no hoops.
            </p>
          </div>
        </div>

        <div className="cine-rule mx-auto mt-14 max-w-xs" />
        <p className="mt-8 text-center text-[0.9rem] text-[var(--c-sage)]">
          Questions about any of this?{" "}
          <Link
            href="/visit"
            className="text-[var(--c-glow)] underline-offset-4 hover:underline"
          >
            Get in touch
          </Link>
          . You can also read our{" "}
          <Link
            href="/terms"
            className="text-[var(--c-glow)] underline-offset-4 hover:underline"
          >
            terms
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
