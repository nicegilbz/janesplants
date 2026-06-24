"use client";

import dynamic from "next/dynamic";
import { useRichMotion } from "./cinematic/hooks";

// The Lenis + GSAP impl is desktop-only; dynamic + ssr:false keeps it out of
// the mobile/SSR bundle entirely (it loads only once useRichMotion() is true).
const SmoothScrollImpl = dynamic(() => import("./SmoothScrollImpl"), {
  ssr: false,
});

/**
 * Smooth-scroll gate. On touch / reduced-motion / SSR / first paint we use
 * NATIVE scroll and ship no motion libraries. On a confirmed motion-OK desktop
 * we load the inertia impl. Native momentum scroll on phones is already smooth
 * and far cheaper than the dormant Lenis raf loop we used to ship.
 */
export default function SmoothScroll({
  children,
  options,
}: {
  children: React.ReactNode;
  options?: Record<string, unknown>;
}) {
  const rich = useRichMotion();
  if (!rich) return <>{children}</>;
  return <SmoothScrollImpl options={options}>{children}</SmoothScrollImpl>;
}
