"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The actual Lenis + GSAP smooth-scroll wiring. This module (gsap + lenis) is
 * only ever loaded on a confirmed motion-OK desktop, via the dynamic import in
 * SmoothScroll.tsx - it never reaches phones, where it was pure overhead.
 */
export default function SmoothScrollImpl({
  children,
  options,
}: {
  children: React.ReactNode;
  options?: Record<string, unknown>;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    if (lenis) lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, smoothWheel: true, ...options }}
    >
      {children}
    </ReactLenis>
  );
}
