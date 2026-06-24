"use client";

import { useEffect, useState } from "react";

/** True when the user asked for reduced motion. SSR-safe (defaults false). */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return reduced;
}

/** True on coarse-pointer / touch devices, where we disable heavy effects. */
export function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const set = () => setTouch(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return touch;
}

/**
 * "Should we run expensive JS visuals / load motion libraries" gate.
 *
 * This is the inverse of useStaticMotion, so it DEFAULTS TO FALSE: on SSR, the
 * first client paint and all touch/reduced clients it returns false, and only
 * flips true on a confirmed non-touch, motion-OK client. That lets us put GSAP,
 * Lenis, the parallax/pin set-pieces and the decorative DOM behind it and have
 * them never load or hydrate on mobile (the main mobile CPU cost). Below-fold
 * rich features upgrade after hydration, before they are scrolled into view.
 */
export function useRichMotion() {
  return !useStaticMotion();
}

/**
 * True when we should render statically with no entrance animation/parallax:
 * reduced-motion OR touch.
 *
 * Defaults to TRUE so SSR and the first client paint create NO scroll
 * animations; we only switch to animated once we've confirmed a non-touch
 * client that hasn't asked for reduced motion. That guarantees phones never
 * build ScrollTriggers (the main mobile CPU cost) - there is no brief
 * "animated" window that would need reverting. Reveal components gate on this
 * and render the same DOM either way (content is visible by default), so there
 * is no flash on desktop.
 */
export function useStaticMotion() {
  const [isStatic, setIsStatic] = useState(true);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)");
    const set = () => setIsStatic(reduce.matches || coarse.matches);
    set();
    reduce.addEventListener("change", set);
    coarse.addEventListener("change", set);
    return () => {
      reduce.removeEventListener("change", set);
      coarse.removeEventListener("change", set);
    };
  }, []);
  return isStatic;
}
