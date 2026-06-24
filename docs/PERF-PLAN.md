# Jane's Plants - Performance Implementation Plan

Target: **>=95 Lighthouse performance on mobile AND desktop**. This document is self-contained - an agent can execute it end to end without further context.

## Current state (live, lab Lighthouse)

| Metric | Mobile | Desktop | Good? |
|---|---|---|---|
| **Performance score** | **41** | **53** | no |
| First Contentful Paint | 2.9s | 0.7s | mobile poor |
| Largest Contentful Paint | 4.3s | 1.8s | mobile poor |
| **Total Blocking Time** | **10,060ms** | **1,940ms** | terrible |
| Speed Index | 10.6s | 4.9s | poor |
| Cumulative Layout Shift | 0 | 0 | perfect |
| Time to Interactive | 16.7s | 4.6s | terrible |

Re-run command (no API key needed):

```bash
export PATH="$HOME/.nvm/versions/node/v22.14.0/bin:$PATH"
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
npx -y lighthouse@latest "https://www.janesplants.com/" --only-categories=performance \
  --form-factor=mobile --output=json --output-path=/tmp/lh-mobile.json \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" --quiet
# desktop: add --preset=desktop, change output path
```

## Root cause (read this before touching anything)

It is **not download size**. Total JS transfer is only ~298KB across 14 files. The problem is **main-thread execution**:

- Mobile main thread: **Script Evaluation 10,868ms**, **Style & Layout 6,396ms**, Parse/Compile 970ms.
- One chunk (`3peubv2924kx4.js`, ~70KB transferred) **executes for 6,986ms on mobile / 2,252ms on desktop**. That is the hydration of a near-entirely-client component tree plus the initialisation of GSAP, Lenis and Motion.
- `forced-reflow-insight`, `legacy-javascript-insight`, `bootup-time`, `mainthread-work-breakdown`, `unused-javascript` (~49KB) all fired.

Two structural facts drive everything:

1. **`src/app/(site)/layout.tsx` wraps the entire site in `SmoothScroll`, and `src/components/SmoothScroll.tsx` imports `gsap`, `gsap/ScrollTrigger` and `lenis/react` at module level.** So GSAP + ScrollTrigger + Lenis are in the initial bundle for **every route** and are parsed + executed on mobile - even though, since the last release, Lenis is left dormant on touch and the animations are gated off. The code still ships and hydrates.
2. **34 of 53 cinematic components are `"use client"`, and ~16 import `gsap`/`motion`/`lenis` at module level.** On the home route alone the live client tree is `ThemeProvider`, `CursorLeaves`, `SiteHeader`, `SmoothScroll`, `Hero`, `Manifesto`, `Collection`, `CarePhilosophy`, `Hire`, `Stats`, `Visit`, `DayNightDial`, `HoverImage`, `MagneticCTA`, plus the procedural botanical SVGs and the Pollen canvas. All of it hydrates on mobile.

The fix is to **stop shipping and hydrating the motion stack and the decorative DOM on mobile**, where it is invisible anyway, and to shrink the client surface generally. The runtime gating (`useStaticMotion` default-true) is correct but it gates *behaviour*, not *code delivery*; this plan gates *delivery*.

## Do NOT regress (already done - keep working)

- `three.js` is dynamic-imported on first hover in `HoverImage` (off the initial bundle).
- Fonts: `Space_Grotesk` scoped to `/futuristic`; `Instrument_Serif` italic-only.
- `useStaticMotion()` (in `src/components/cinematic/hooks.ts`) defaults to **static/true** and only flips to animated on a confirmed non-touch, motion-OK client. Reveal components, `MediaSlot`, `Hero`, hire/visit heroes gate reveals/parallax/autoplay-video on it.
- `SmoothScroll` leaves Lenis dormant on touch (native scroll).
- Media: source PNGs -> WebP; videos re-encoded; `next.config.ts` serves AVIF/WebP + long cache headers on `/media`.
- CLS is 0 - do not introduce layout shift (always keep explicit `width`/`height` or `aspect-ratio` on media, and `font-display` swap with size-adjust where possible).

---

## P0 - recover the 10s TBT (do these first, in order)

These four items target the measured 10.9s Script Evaluation + 6.4s Style & Layout. Expect mobile TBT to drop from ~10s to well under 1s and the score from 41 into the 80s-90s.

### P0-1 - Never ship the smooth-scroll stack to mobile

**Problem:** `SmoothScroll` (module-level `gsap` + `lenis`) wraps the whole site, so the motion stack loads + executes on every mobile page for zero benefit (Lenis is dormant on touch). It also calls `ScrollTrigger.refresh()` on the touch path - a forced reflow.

**Change:** Split `SmoothScroll` into a static gate + a lazily-loaded implementation.

- Rename the current file's body to `src/components/SmoothScrollImpl.tsx` (the `ReactLenis` + `gsap` wiring, unchanged).
- New `src/components/SmoothScroll.tsx`:

```tsx
"use client";
import dynamic from "next/dynamic";
import { useRichMotion } from "./cinematic/hooks";

const SmoothScrollImpl = dynamic(() => import("./SmoothScrollImpl"), { ssr: false });

export default function SmoothScroll({ children, options }: { children: React.ReactNode; options?: Record<string, unknown> }) {
  const rich = useRichMotion(); // false on SSR + first paint + touch/reduced
  if (!rich) return <>{children}</>;            // mobile/SSR: native scroll, no gsap/lenis shipped
  return <SmoothScrollImpl options={options}>{children}</SmoothScrollImpl>;
}
```

Because `useRichMotion()` is false on the server and the first client paint, the `SmoothScrollImpl` chunk (gsap + lenis) is only requested on a confirmed desktop. Delete the `ScrollTrigger.refresh()` call entirely - it is unnecessary once the impl is desktop-only.

- **Files:** `src/components/SmoothScroll.tsx`, new `src/components/SmoothScrollImpl.tsx`.
- **Impact:** removes gsap + lenis from the mobile initial bundle and from desktop's critical path; biggest single TBT win. **Effort M, risk low.**
- **Verify:** in a mobile Lighthouse run, no `lenis`/`gsap` chunk in network; native scrolling still works; desktop still has inertia.

### P0-2 - Move every GSAP reveal behind a lazy hook (no module-level gsap)

**Problem:** `Manifesto`, `Collection`, `Stats`, `Hire`, `Visit`, `CarePhilosophy`, `hire/*`, `visit/*`, `about/AboutHero`, `care/*`, `shop/ShopGrid`, `plant/PlantView` each `import gsap`, `gsap/ScrollTrigger` (and some `gsap/SplitText`) at module level. Even with reveals gated at runtime, the imports pull GSAP into the shared bundle and the components hydrate.

**Change:** Add one shared hook that lazy-loads GSAP only when rich, then refactor the components to use it instead of top-level imports.

```tsx
// src/components/cinematic/useGsapReveal.ts
"use client";
import { useEffect, type RefObject } from "react";
import { useRichMotion } from "./hooks";

export function useGsapReveal(scope: RefObject<HTMLElement | null>, build: (gsap: typeof import("gsap").default, ST: typeof import("gsap/ScrollTrigger").ScrollTrigger) => void) {
  const rich = useRichMotion();
  useEffect(() => {
    if (!rich || !scope.current) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !scope.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => build(gsap, ScrollTrigger), scope.current!);
    })();
    return () => { cancelled = true; ctx?.revert(); };
  }, [rich, scope]);
}
```

Refactor each reveal component to: drop the `import gsap`/`useGSAP` lines, keep the same animation code inside `useGsapReveal(root, (gsap, ScrollTrigger) => { ... })`. For `SplitText`, `await import("gsap/SplitText")` inside the builder (it is only used by `Manifesto`).

- **Files:** new `src/components/cinematic/useGsapReveal.ts`; refactor the ~12 reveal components listed above.
- **Impact:** GSAP leaves the initial/shared bundle entirely; it loads once on desktop in an idle async chunk. Cuts Script Evaluation substantially on both. **Effort L, risk med** (mechanical but touches many files - do them one at a time and Lighthouse after the first to confirm the pattern).
- **Verify:** mobile run shows no `gsap` chunk; desktop reveals still fire; no console errors.

### P0-3 - Do not render the decorative DOM on mobile

**Problem:** `Hero.tsx` always renders `MistBand`, `PlantSilhouette` x6, `Frond`, and `<Pollen count={70}>` regardless of `lite`. These procedural SVG/canvas nodes are a large share of the 6.4s Style & Layout on mobile, where they are barely visible behind the poster.

**Change:** Wrap the entire decorative layer set in `{!lite && ( ... )}` in `Hero.tsx` (the mist band, background/mid/foreground plant clusters, fronds, light shafts and `<Pollen>`). On mobile the hero is just the poster image + gradient + headline (which is what it already looks like with motion off). Do the same for the equivalent decorative layers in `hire/HireHero`, `visit/VisitHero`, `about/AboutHero`.

`CursorLeaves` and `Pollen` already `return null` when not rich, but they still ship + mount; convert `CursorLeaves` in the layout to `next/dynamic(..., { ssr:false })` gated on `useRichMotion()` so it is not in the mobile bundle at all.

- **Files:** `src/components/cinematic/Hero.tsx`, `hire/HireHero.tsx`, `visit/VisitHero.tsx`, `about/AboutHero.tsx`, `src/app/(site)/layout.tsx` (dynamic `CursorLeaves`).
- **Impact:** large cut to Style & Layout + Rendering on mobile; fewer DOM nodes to hydrate. **Effort M, risk low** (visual diff on mobile only, which is already near-static).
- **Verify:** mobile hero still looks right (poster + headline); desktop unchanged; node count down in the Performance panel.

### P0-4 - Trim the always-client tree (server components + small islands)

**Problem:** The home page is a server component but every section under it is fully `"use client"`, so all their markup hydrates. Much of it is static (headings, paragraphs, promise lists, founder quote, stat labels, footer).

**Change:** For each section, keep only the genuinely interactive part as a client island and render the static shell as a server component.

- `Manifesto`: the text column + founder quote are static - make the section a server component that renders the copy, and move only the growth `MediaSlot` (client) into a small child. The reveal can be a client wrapper around the static children.
- `Stats`: render the markup server-side; the count-up is a tiny client island over the numbers.
- `SiteFooter`: should be a pure server component (no hooks) - confirm and convert.
- `Hire`/`Visit`/`Collection`: extract static headers/copy to server, keep the interactive grid/CTA as islands.

Pattern: `<ServerSection><ClientReveal>{staticChildren}</ClientReveal></ServerSection>` where `ClientReveal` only attaches the (lazy, desktop-only) GSAP from P0-2 and passes children straight through.

- **Files:** `Manifesto.tsx`, `Stats.tsx`, `SiteFooter.tsx`, `Hire.tsx`, `Visit.tsx`, `Collection.tsx` (+ new small island files).
- **Impact:** smaller hydration payload + faster TTI on both. **Effort L, risk med.** Do after P0-1..3 and re-measure - if TBT is already <300ms, this becomes optional polish.
- **Verify:** content identical; React hydration warnings absent; fewer client components in the build output.

---

## P1 - LCP, fonts, build target

### P1-1 - Make the hero poster a clean, prioritised LCP

**Problem:** Mobile LCP 4.3s / FCP 2.9s; `lcp-breakdown-insight` + `render-blocking-insight` fired. The LCP element is the hero poster `Image`.

**Change:** In `Hero.tsx` the poster `Image` already has `priority`. Add `fetchPriority="high"`, give it an accurate `sizes="100vw"`, and add an explicit preload in the route head for the active theme's poster (night default):

```tsx
// app/(site)/layout.tsx head (or a <link> via next/head equivalent)
<link rel="preload" as="image" href="/media/hero.webp" type="image/webp" fetchpriority="high" />
```

Ensure no `"use client"` boundary or font load blocks the poster paint. **Effort S, risk low.** Verify mobile LCP < 2.5s.

### P1-2 - Cut the font bill

**Problem:** Four `next/font` families load (`Geist`, `Geist_Mono`, `Fraunces` with 3 axes, `Instrument_Serif`). Fonts block text paint and add requests.

**Change:** Audit real usage and reduce.
- Drop `Geist_Mono` if the mono labels can use `Fraunces`/system mono, or load it with `preload: false` (it is never the LCP).
- Drop unused `Fraunces` axes - keep only the ones actually referenced (likely `opsz`; confirm `SOFT`/`WONK` are used).
- `preload` only the LCP-critical family (Fraunces for the headline); set `preload: false` on the rest so they do not compete with the hero.
- Confirm `display: "swap"` and add `adjustFontFallback` to keep CLS at 0.

**Files:** `src/app/layout.tsx`. **Effort S, risk low.** Verify fewer font requests + no preload-mismatch warning.

### P1-3 - Modern build target (kill legacy JS)

**Problem:** `legacy-javascript-insight` fired - the bundle ships transforms/polyfills for old browsers.

**Change:** Add a tight `browserslist` to `package.json` so SWC targets modern engines:

```json
"browserslist": ["chrome 111", "edge 111", "firefox 111", "safari 16.4", "not dead"]
```

Confirm no `core-js`/polyfill imports. **Effort S, risk low.** Verify `legacy-javascript` audit passes.

---

## P2 - bundle hygiene + caching

- **P2-1 Concept routes:** `editorial/`, `futuristic/`, `bioluminescent/`, `minimal/` import `three`/`gsap` and exist only as a "View concept gallery" link. Confirm they are route-split and not pulled into shared chunks; if any shared util drags them in, `next/dynamic` them. Consider `noindex` + removing them from production entirely if they are not needed live. **Effort S-M.**
- **P2-2 Unused JS (~49KB):** after P0, re-check `unused-javascript`; code-split any remaining below-fold interactive components (`BuildConfigurator`, `PlantInspector`, `ShopGrid` filters) with `next/dynamic`. **Effort M.**
- **P2-3 Images:** verify every `next/image` `sizes` is accurate (no 100vw on a third-width card), `quality` is 60-75 not default 75 everywhere, and below-fold images are lazy (default). `image-delivery-insight` should then pass. **Effort S.**
- **P2-4 Caching headers:** extend the `/media` immutable-cache rule in `next.config.ts` to `/_next/static` (Next already hashes these; Vercel sets it, but confirm) and ensure fonts are cached. **Effort S.**
- **P2-5 Tailwind/CSS:** confirm Tailwind v4 is tree-shaking unused utilities in production; check `theme.css` size. **Effort S.**

---

## Verification protocol

After each P0 item, re-run mobile + desktop Lighthouse (command at top). Track:

| Gate | Mobile target | Desktop target |
|---|---|---|
| Performance score | >=95 | >=95 |
| Total Blocking Time | < 200ms | < 100ms |
| Largest Contentful Paint | < 2.5s | < 1.5s |
| Speed Index | < 3.4s | < 2.0s |
| CLS | 0 (no regression) | 0 |

Definition of done: both scores >=95 with TBT under target, and a manual desktop pass confirming the cinematic motion (smooth scroll, reveals, parallax, hover distortion, day/night) is unchanged. Mobile is expected to be a fast, static-but-beautiful version (poster heroes, instant content, no scroll animation) - that is the intended trade.

## Expected trajectory

- After **P0-1 + P0-2 + P0-3**: mobile TBT from ~10s to <1s; mobile score 41 -> ~80-90; desktop 53 -> ~85-95.
- After **P1**: LCP and FCP into the green; mobile/desktop into the mid-90s.
- **P0-4 + P2** close the gap to >=95 on both and keep it there.

The dominant win is P0-1 and P0-2 (stop shipping GSAP/Lenis to mobile). If time is short, do those two first and re-measure before anything else.
