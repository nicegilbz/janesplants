"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CONCEPTS } from "@/lib/content";

/**
 * Small fixed chrome shown on every concept route: a back-to-hub pill plus
 * quick links to the other three concepts. Styled per concept via props so it
 * reads correctly on both light and dark art directions.
 */
export default function ConceptNav({
  current,
  tone = "dark",
  accent,
}: {
  current: string;
  tone?: "dark" | "light";
  accent?: string;
}) {
  const isDark = tone === "dark";
  const base = isDark
    ? "bg-white/8 text-white/80 hover:text-white border-white/15 hover:bg-white/15"
    : "bg-black/5 text-black/70 hover:text-black border-black/10 hover:bg-black/10";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-5 sm:px-8">
      <Link
        href="/"
        className={`pointer-events-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur-md transition-colors ${base}`}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Concepts
      </Link>

      <div className="pointer-events-auto hidden items-center gap-1.5 rounded-full border px-1.5 py-1.5 backdrop-blur-md sm:flex"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)",
          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
        }}
      >
        {CONCEPTS.map((c) => {
          const active = c.slug === current;
          return (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="rounded-full px-3 py-1.5 text-[11px] font-medium tracking-wide transition-colors"
              style={{
                background: active ? (accent ?? c.accent) : "transparent",
                color: active
                  ? tone === "light"
                    ? "#fff"
                    : "#06120d"
                  : isDark
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(0,0,0,0.55)",
              }}
            >
              {c.index}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
