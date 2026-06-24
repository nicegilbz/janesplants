"use client";

import { useEffect, type RefObject } from "react";
import { useRichMotion } from "./hooks";

type Gsap = typeof import("gsap").default;
type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;
type SplitTextType = typeof import("gsap/SplitText").SplitText;

/**
 * Run a GSAP/ScrollTrigger reveal that is DELIVERED ONLY to motion-OK desktops.
 *
 * GSAP, ScrollTrigger and SplitText are dynamic-imported inside the effect and
 * only when useRichMotion() is true, so phones never download, parse or execute
 * them (they were the bulk of the ~10s mobile Total Blocking Time). The whole
 * animation is created inside a gsap.context scoped to `scope` and reverted on
 * cleanup. Components render their content visible by default, so skipping the
 * reveal on mobile leaves a clean static layout.
 *
 * `build` receives (gsap, ScrollTrigger, SplitText). Re-runs when `deps` change.
 */
export function useGsapReveal(
  scope: RefObject<HTMLElement | null>,
  build: (gsap: Gsap, ScrollTrigger: ScrollTriggerType, SplitText: SplitTextType) => void,
  deps: unknown[] = [],
) {
  const rich = useRichMotion();
  useEffect(() => {
    if (!rich || !scope.current) return;
    let ctx: ReturnType<Gsap["context"]> | undefined;
    let cancelled = false;
    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      if (cancelled || !scope.current) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      ctx = gsap.context(() => build(gsap, ScrollTrigger, SplitText), scope.current);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // build is intentionally not a dep; callers pass primitives via deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rich, scope, ...deps]);
}
