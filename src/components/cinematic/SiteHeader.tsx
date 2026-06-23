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

const NAV = [
  { href: "/cinematic/shop", label: "Shop" },
  { href: "/cinematic/hire", label: "Hire" },
  { href: "/cinematic/care", label: "Care" },
  { href: "/cinematic/visit", label: "Visit" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        background: scrolled ? "rgba(10,16,12,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(120%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(120%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(176,141,87,0.18)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/cinematic" className="flex items-center gap-2.5">
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
            href="/cinematic/visit#enquire"
            className="cine-mono rounded-full border border-[var(--c-glow-line)] px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--c-glow)] transition-colors hover:bg-[var(--c-glow-soft)]"
          >
            Enquire
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--c-brass-line)] text-[var(--c-bone)] md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-[var(--c-brass-line)] bg-[rgba(10,16,12,0.95)] px-6 py-6 md:hidden">
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
              href="/cinematic/visit#enquire"
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
