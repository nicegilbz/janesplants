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

/** Cheap "should we run expensive JS visuals" gate. */
export function useRichMotion() {
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  return !reduced && !touch;
}
