"use client";

/** Cinematic site footer: brand, navigation, contact and a quiet link back to
 *  the concept gallery while the direction is being finalised. */

import Link from "next/link";
import { Leaf } from "lucide-react";
import { BRAND, CATEGORIES } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-[var(--c-brass-line)] bg-[#0a120d] px-6 pb-10 pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/cinematic" className="flex items-center gap-2.5">
              <Leaf className="h-5 w-5 text-[var(--c-glow)]" />
              <span className="font-[family-name:var(--font-serif)] text-lg text-[var(--c-bone)]">
                {BRAND.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[0.88rem] leading-relaxed text-[var(--c-sage)]">
              {BRAND.tagline} A working glasshouse and shop, open to wander.
            </p>
          </div>

          <div>
            <h4 className="cine-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--c-brass)]">
              Shop
            </h4>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.key}>
                  <Link
                    href={`/cinematic/shop?cat=${encodeURIComponent(c.key)}`}
                    className="text-[0.9rem] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)]"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="cine-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--c-brass)]">
              Visit
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/cinematic/hire" className="text-[0.9rem] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)]">
                  Plant hire and styling
                </Link>
              </li>
              <li>
                <Link href="/cinematic/care" className="text-[0.9rem] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)]">
                  Care guides
                </Link>
              </li>
              <li>
                <Link href="/cinematic/visit" className="text-[0.9rem] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)]">
                  The glasshouse
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="cine-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--c-brass)]">
              Say hello
            </h4>
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="mt-4 block font-[family-name:var(--font-serif)] text-xl text-[var(--c-bone)] transition-colors hover:text-[var(--c-glow)]"
            >
              {BRAND.contactEmail}
            </a>
            <p className="mt-3 text-[0.85rem] text-[var(--c-sage)]">
              Hertford, England
            </p>
          </div>
        </div>

        <div className="my-10 cine-rule" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="cine-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--c-sage)]/70">
            {BRAND.name}, Hertford. Plants with presence.
          </p>
          <Link
            href="/"
            className="cine-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--c-sage)]/60 transition-colors hover:text-[var(--c-glow)]"
          >
            View concept gallery
          </Link>
        </div>
      </div>
    </footer>
  );
}
