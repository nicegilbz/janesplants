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

    const els = Array.from(document.querySelectorAll(SELECTOR));
    const reduced = prefersReducedMotion();

    if (reduced || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
