import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/content";
import EnquiryForm from "@/components/cinematic/EnquiryForm";
import VisitHero from "@/components/cinematic/visit/VisitHero";
import LocationCard from "@/components/cinematic/visit/LocationCard";
import VisitExpect from "@/components/cinematic/visit/VisitExpect";

export const metadata: Metadata = {
  title: "Visit the glasshouse / Jane's Plants",
  description:
    "Come and wander a working glasshouse and shop in Hertford. Opening hours, how to find us, and a quick way to say hello before you visit.",
};

/**
 * Cinematic Jungle - visit the glasshouse and contact.
 * Tokens, grain, header, footer, cursor and smooth scroll all live in the
 * cinematic layout; this file is sections only.
 */
export default function VisitPage() {
  return (
    <>
      <VisitHero />
      <LocationCard />
      <VisitExpect />

      {/* ENQUIRE — the primary landing target for the header CTA + cross-links */}
      <section id="enquire" className="relative scroll-mt-24 py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 60% at 30% 0%, rgba(159,209,91,0.14), transparent 55%), radial-gradient(70% 60% at 80% 100%, rgba(31,95,63,0.32), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* big serif mailto, full-width and unmissable */}
          <div className="mb-14 text-center">
            <span className="cine-eyebrow block">Say hello</span>
            <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
              Planning a visit, after a particular plant, or thinking about hire
              and styling? Drop us a line and a real person will write back.
            </p>
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="cine-serif group mt-8 inline-flex items-center gap-3 text-[clamp(1.9rem,5.5vw,4rem)] text-[var(--c-bone)] transition-colors hover:text-[var(--c-glow)]"
            >
              {BRAND.contactEmail}
              <ArrowUpRight className="h-[0.8em] w-[0.8em] flex-none text-[var(--c-glow)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <div className="cine-rule mx-auto mt-12 max-w-3xl" />
          </div>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <h2 className="cine-serif text-[clamp(2.2rem,5vw,4rem)] text-[var(--c-bone)]">
                Tell us you are{" "}
                <span className="cine-accent text-[var(--c-glow)]">coming</span>.
              </h2>
              <p className="mt-5 max-w-md text-[var(--c-sage)]">
                A quick message helps us have the kettle on and the right plants
                pulled aside. Tell us roughly when you fancy popping in and
                anything you are hoping to find.
              </p>

              <div className="mt-9 space-y-4 text-[0.9rem] text-[var(--c-bone)]/85">
                <p className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[var(--c-glow-line)] bg-[var(--c-glow-soft)]">
                    <Mail className="h-4 w-4 text-[var(--c-glow)]" />
                  </span>
                  <a
                    href={`mailto:${BRAND.contactEmail}`}
                    className="underline-offset-4 hover:text-[var(--c-glow)] hover:underline"
                  >
                    {BRAND.contactEmail}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[var(--c-brass-line)] bg-[rgba(12,20,16,0.5)]">
                    <MapPin className="h-4 w-4 text-[var(--c-brass)]" />
                  </span>
                  On the edge of Hertford, Hertfordshire
                </p>
              </div>

              <p className="mt-8 text-[0.85rem] text-[var(--c-sage)]">
                After plants for a space rather than a windowsill?{" "}
                <Link
                  href="/hire"
                  className="text-[var(--c-glow)] underline-offset-4 hover:underline"
                >
                  See plant hire and styling
                </Link>
                , or read our{" "}
                <Link
                  href="/care"
                  className="text-[var(--c-glow)] underline-offset-4 hover:underline"
                >
                  care guides
                </Link>
                .
              </p>
            </div>

            <EnquiryForm kind="visit" subject="Visit and contact enquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
