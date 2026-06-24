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

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const remaining = new Set(els);
    const reveal = (el: HTMLElement) => {
      el.classList.add("is-in");
      remaining.delete(el);
      io.unobserve(el);
    };

    // Trigger as the element approaches (positive bottom margin), threshold 0,
    // so even the LAST sections - which can never reach a negative-margin dead
    // zone - reveal reliably.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px 12% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));

    // Belt-and-braces: a rAF-throttled scroll check reveals anything whose top
    // has entered the viewport, in case any IntersectionObserver edge case (pin
    // spacers, smooth scroll) misses an element. Self-removes once all are in.
    let ticking = false;
    const sweep = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of Array.from(remaining)) {
        if (el.getBoundingClientRect().top < vh * 0.95) reveal(el);
      }
      if (!remaining.size) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(sweep);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    sweep();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
