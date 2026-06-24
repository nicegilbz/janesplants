"use client";

/** Cinematic site footer: brand, navigation, contact and a quiet link back to
 *  the concept gallery while the direction is being finalised. */

import Link from "next/link";
import { Leaf } from "lucide-react";
import { BRAND, CATEGORIES } from "@/lib/content";
import { useTheme } from "./ThemeProvider";

export default function SiteFooter() {
  const { theme } = useTheme();
  return (
    <footer
      className="relative border-t border-[var(--c-brass-line)] px-6 pb-10 pt-16"
      style={{ background: theme === "day" ? "#e4e8d8" : "#0a120d" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              aria-label={`${BRAND.name} home`}
              className="flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Leaf className="h-5 w-5 text-[var(--c-glow)]" aria-hidden="true" />
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
                    href={`/shop?cat=${encodeURIComponent(c.key)}`}
                    className="rounded-sm text-[0.9rem] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
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
                <Link href="/hire" className="rounded-sm text-[0.9rem] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
                  Plant hire and styling
                </Link>
              </li>
              <li>
                <Link href="/care" className="rounded-sm text-[0.9rem] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
                  Care guides
                </Link>
              </li>
              <li>
                <Link href="/visit" className="rounded-sm text-[0.9rem] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
                  The glasshouse
                </Link>
              </li>
              <li>
                <Link href="/build" className="rounded-sm text-[0.9rem] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
                  Build your jungle
                </Link>
              </li>
              <li>
                <Link href="/journal" className="rounded-sm text-[0.9rem] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/about" className="rounded-sm text-[0.9rem] text-[var(--c-sage)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
                  Our story
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
              className="mt-4 block rounded-sm font-[family-name:var(--font-serif)] text-xl text-[var(--c-bone)] transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
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
          <p className="cine-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--c-sage)]/85">
            {BRAND.name}, Hertford. Plants with presence.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="cine-mono rounded-sm text-[0.66rem] uppercase tracking-[0.18em] text-[var(--c-sage)]/80 transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="cine-mono rounded-sm text-[0.66rem] uppercase tracking-[0.18em] text-[var(--c-sage)]/80 transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Terms
            </Link>
            <Link
              href="/concepts"
              className="cine-mono rounded-sm text-[0.66rem] uppercase tracking-[0.18em] text-[var(--c-sage)]/80 transition-colors hover:text-[var(--c-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              View concept gallery
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
