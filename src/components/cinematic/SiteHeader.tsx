"use client";

/**
 * Cinematic site header. Transparent over the hero, condenses to a brass-lined
 * glass bar once scrolled. Real navigation for the full Jane's Plants site.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { BRAND } from "@/lib/content";
import DayNightDial from "./DayNightDial";
import { useTheme } from "./ThemeProvider";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/hire", label: "Hire" },
  { href: "/care", label: "Care" },
  { href: "/visit", label: "Visit" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const barBg = theme === "day" ? "rgba(238,241,229,0.82)" : "rgba(10,16,12,0.72)";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[90] transition-all duration-500"
      style={{
        background: scrolled ? barBg : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(120%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(120%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(176,141,87,0.18)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Leaf className="h-5 w-5 text-[var(--c-glow)]" />
          <span className="font-[family-name:var(--font-serif)] text-lg tracking-tight text-[var(--c-bone)]">
            {BRAND.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="cine-mono text-[0.72rem] uppercase tracking-[0.18em] transition-colors"
                style={{ color: active ? "var(--c-glow)" : "var(--c-sage)" }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/visit#enquire"
            className="cine-mono rounded-full border border-[var(--c-glow-line)] px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--c-glow)] transition-colors hover:bg-[var(--c-glow-soft)]"
          >
            Enquire
          </Link>
          <DayNightDial />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <DayNightDial />
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--c-brass-line)] text-[var(--c-bone)]"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div
          className="border-t border-[var(--c-brass-line)] px-6 py-6 md:hidden"
          style={{
            background:
              theme === "day" ? "rgba(238,241,229,0.97)" : "rgba(10,16,12,0.95)",
          }}
        >
          <nav className="flex flex-col gap-5">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="cine-mono text-sm uppercase tracking-[0.18em] text-[var(--c-sage)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/visit#enquire"
              className="cine-mono text-sm uppercase tracking-[0.18em] text-[var(--c-glow)]"
            >
              Enquire
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
