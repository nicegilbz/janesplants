"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "./hooks";

/**
 * Lightweight scroll-reveal driver. One IntersectionObserver lifts every
 * `.cine-*-reveal`-style element into view as it is scrolled to, by toggling
 * `.is-in` (the actual fade/rise is pure CSS - see theme.css). No GSAP, so it
 * runs on phones too. Adds `.cine-js` to <html> first, which is what arms the
 * hide-then-reveal CSS - so if JS never runs, content is simply visible.
 */
const SELECTOR =
  ".cine-mani-text, .cine-promise, .cine-stat, .cine-hire-reveal, .cine-visit-reveal, .cine-coll-head";

export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("cine-js");

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    // Position-based polling (rAF, throttled) rather than IntersectionObserver:
    // it reads each element's actual on-screen position, so it is immune to the
    // things that were leaving the LAST sections hidden (the GSAP pin spacer on
    // CarePhilosophy, Lenis smooth scroll, IO edge cases). Reveals anything whose
    // top has entered the viewport, and stops once everything is in.
    const remaining = new Set(els);
    const reveal = (el: HTMLElement) => {
      el.classList.add("is-in");
      remaining.delete(el);
    };

    let raf = 0;
    let last = -Infinity;
    const check = (t: number) => {
      if (t - last > 120) {
        last = t;
        const vh = window.innerHeight || document.documentElement.clientHeight;
        for (const el of Array.from(remaining)) {
          if (el.getBoundingClientRect().top < vh * 0.92) reveal(el);
        }
      }
      raf = remaining.size ? requestAnimationFrame(check) : 0;
    };
    raf = requestAnimationFrame(check);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
