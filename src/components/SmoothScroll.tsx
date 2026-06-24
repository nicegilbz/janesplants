"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsTouch } from "./cinematic/hooks";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Inertia smooth-scroll wired to the GSAP ticker and ScrollTrigger.
 *
 * On touch devices we leave Lenis dormant and use NATIVE scroll: the per-frame
 * lenis.raf loop is the main idle CPU/battery cost on phones, and momentum
 * scrolling is already native there. ScrollTrigger stays synced to native
 * scroll. Desktop keeps the smooth inertia.
 */
export default function SmoothScroll({
  children,
  options,
}: {
  children: React.ReactNode;
  options?: Record<string, unknown>;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const touch = useIsTouch();

  useEffect(() => {
    if (touch) {
      // native scroll: just keep ScrollTrigger fresh, no Lenis raf loop
      ScrollTrigger.refresh();
      return;
    }

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
  }, [touch]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: !touch,
        ...options,
      }}
    >
      {children}
    </ReactLenis>
  );
}
