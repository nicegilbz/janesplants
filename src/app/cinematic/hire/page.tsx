import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { BRAND } from "@/lib/content";
import EnquiryForm from "@/components/cinematic/EnquiryForm";
import HireHero from "@/components/cinematic/hire/HireHero";
import HirePackages from "@/components/cinematic/hire/HirePackages";
import HireProcess from "@/components/cinematic/hire/HireProcess";
import ProofGallery from "@/components/cinematic/hire/ProofGallery";

export const metadata: Metadata = {
  title: "Plant hire and styling / Jane's Plants",
  description:
    "Plant hire and styling for homes, offices, events and weddings across Hertford and beyond. Designed, delivered and maintained from a working glasshouse.",
};

/**
 * Cinematic Jungle - plant hire and styling.
 * The rent-and-style revenue line. Tokens, grain, header, footer, cursor and
 * smooth scroll all live in the cinematic layout; this file is sections only.
 */
export default function HirePage() {
  return (
    <>
      <HireHero />
      <HirePackages />
      <HireProcess />
      <ProofGallery />

      {/* ENQUIRY */}
      <section
        id="enquire"
        className="relative scroll-mt-24 py-24 lg:py-32"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 60% at 30% 0%, rgba(31,95,63,0.22), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="cine-eyebrow block">Start a hire enquiry</span>
            <h2 className="cine-serif mt-5 text-[clamp(2.2rem,5vw,4rem)] text-[var(--c-bone)]">
              Tell us about the{" "}
              <span className="cine-accent text-[var(--c-glow)]">space</span>.
            </h2>
            <p className="mt-5 max-w-md text-[var(--c-sage)]">
              A rough idea is plenty to start. Share the room or occasion, your
              timings and a budget if you have one, and we will come back with a
              plan and a price.
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
                {BRAND.location.line}
              </p>
            </div>

            <p className="mt-8 text-[0.85rem] text-[var(--c-sage)]">
              Rather wander the glasshouse first?{" "}
              <Link
                href="/cinematic/visit"
                className="text-[var(--c-glow)] underline-offset-4 hover:underline"
              >
                Plan a visit
              </Link>
              , or read our{" "}
              <Link
                href="/cinematic/care"
                className="text-[var(--c-glow)] underline-offset-4 hover:underline"
              >
                care guides
              </Link>
              .
            </p>
          </div>

          <EnquiryForm kind="hire" subject="Plant hire and styling enquiry" />
        </div>
      </section>
    </>
  );
}
