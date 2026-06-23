All key facts verified. Here is the deliverable.

---

# 2026 Frontend Stack — Ultra-Dynamic Marketing/Commerce Site (Vercel + Flask + Gemini media)

**Verified as of June 2026.** Pinned versions reflect current stable releases. The non-negotiable constraints (Vercel host, Flask backend, heavy animation, Gemini-generated video/photo) shape every call below.

---

## 0. TL;DR — the recommended stack

| Layer | Choice | Pinned version |
|---|---|---|
| Framework | **Next.js App Router** | `next@16.2.7` |
| Runtime | **React** | `react@19.2` (bundled w/ Next 16) |
| Bundler | Turbopack (default in 16) | — |
| Flask role | **Separate service** (Vercel Python Service *or* Railway/Fly) behind a Next rewrite | Flask `3.1.x`, Python 3.12 |
| Core animation | **Motion** (ex-Framer Motion) | `motion@12.39+` (import `motion/react`) |
| Scroll/timeline | **GSAP + ScrollTrigger + SplitText** | `gsap@3.13` (100% free, all plugins) |
| Smooth scroll | **Lenis** | `lenis@1.3.x` (new package name) |
| 3D/WebGL | **React Three Fiber + drei** | `@react-three/fiber@9`, `@react-three/drei@10`, `three@0.17x` |
| Media | next/image (AVIF) + **Mux** for video; Cloudinary optional | — |
| CMS | **Sanity** (or Payload if you want self-host) | Sanity `v4` |

---

## 1. Frontend framework: Next.js App Router vs Vite + React

**Recommendation: Next.js App Router (`next@16.2.7`, React `19.2`). Not Vite.**

This is the rare case where it isn't close, because two of your hard constraints point the same way:

- **You're on Vercel.** Next.js is Vercel's first-party framework. Image optimization, edge/ISR caching, streaming RSC, OG image generation, and the new Services routing are tuned for it with zero config. On Vite you'd reimplement image optimization and lose ISR.
- **Marketing/commerce = SEO + LCP matter.** RSC + streaming SSR + per-route static generation give you fast, crawlable, cacheable pages. A Vite SPA ships a blank shell + hydration waterfall, which is the wrong default for a brand/commerce site that lives or dies on Core Web Vitals and shareable OG previews.

What's current and why it matters for *this* build:
- **Next.js 16** (stable since Oct 2025; current `16.2.7`) ships **Turbopack as the default bundler** for both `dev` and `build` — fast HMR despite a heavy 3D/animation bundle.
- **React 19.2** is bundled. You get the **React Compiler (stable)** — auto-memoization, which is genuinely valuable when you have many animated components re-rendering. Turn it on (`reactCompiler: true`).
- **Native View Transitions** are stabilized in 16, so cross-page morph transitions don't need a hand-rolled library.
- **Cache Components / `use cache`** (16.x) lets you cache expensive bits (Gemini-media manifests, product data from Flask) granularly.

**When Vite+React would win** (not your case): a login-walled app/dashboard, no SEO need, no Vercel image pipeline. For a public plant brand doing commerce, those don't apply.

> Caveat: if you adopt `use cache`/Cache Components, treat them as still-maturing 16.x features — pin your minor and test caching behavior before launch.

---

## 2. How Flask fits

You have three realistic patterns. Here's each, then the pick.

### (a) Flask as Python serverless functions in `/api` on Vercel
Vercel's official `nextjs-flask` template colocates a Flask app in `/api` as Python serverless functions. Locally a `next.config` rewrite proxies `/api/:path*` to Flask on `127.0.0.1:5328`; in prod those become Python functions.

- **Pros:** one repo, one deploy, one domain (no CORS), env vars shared.
- **Cons:** **serverless Flask is stateless and cold-starting** — no background workers, no long-lived connections, no persistent in-process cache. Function limits apply: with **Fluid Compute** (now the default execution model), Hobby is fixed at **2 GB / 1 vCPU**; Pro/Enterprise default 2 GB, upgradable to **4 GB / 2 vCPU**. Max duration is generous (Pro/Ent up to **800s GA, 30 min in beta**), but you pay on **Active CPU + provisioned memory (GB-hours) + invocations**. Generating/transcoding media inside a function will burn money and risk timeouts.

### (b) Flask hosted separately (Railway / Fly / Render), Next on Vercel calling it
- **Pros:** real long-running process, background jobs/queues (Celery/RQ), persistent DB pool, websockets, no per-invocation CPU billing for steady workloads. The right home for anything that orchestrates Gemini media generation (which is slow and async).
- **Cons:** second deploy target; you must manage CORS or proxy; another bill.

### (c) Recommended architecture — **hybrid: Next rewrite in front, Flask as a Service/separate origin**

Use Next.js as the **only public origin**. Put Flask behind a rewrite so the browser never sees a second domain (kills CORS, keeps cookies same-site). Two equally good ways to host the Flask side:

1. **Vercel Python Service** (the 2026 path): define Flask as a **Service** in `vercel.json` via `experimentalServices`. Vercel routes by path prefix within one project and auto-injects the service URL as an env var. Best if you want a single Vercel project and your Flask work is request-scoped (forms, orders, proxying).
2. **External Flask on Railway/Fly**, fronted by a Next rewrite. Best if Flask runs **background media jobs**, queues, or holds DB connections.

**Default recommendation for a plant brand:** start with **(c1) Vercel Python Service** for synchronous endpoints, and **only** move the **Gemini media-generation worker** to **(b) Railway/Fly** when you actually need async generation + a job queue. Don't generate media inside a request.

### What Flask should actually DO here
Keep it a thin, boring API:
- **Contact / forms** — validate, anti-spam (honeypot + rate limit), forward to email/CRM.
- **Newsletter** — proxy to ESP (so the API key never hits the client).
- **Orders / checkout** — create payment intents (Stripe), webhooks, order persistence. **Never** put Stripe secret keys client-side.
- **CMS proxy / cache** — fetch from Sanity/Payload, shape/normalize, cache.
- **Gemini media endpoints** — *enqueue* a generation job, return a job id; a worker generates, uploads to Mux/Blob/Cloudinary, writes the asset URL back. The frontend polls or gets a webhook. Request handlers stay fast.
- Light personalization, server-side feature flags, signed-URL minting.

What Flask should **not** do: render HTML (Next owns that), run the smooth-scroll/animation (client), or synchronously block on Gemini.

### Config notes

**`next.config.ts` rewrite (single-origin):**
```ts
async rewrites() {
  return [{ source: "/api/py/:path*",
            destination: process.env.FLASK_URL
              ? `${process.env.FLASK_URL}/:path*`           // external (Railway/Fly)
              : "http://127.0.0.1:5328/:path*" }];           // local dev
}
```

**`vercel.json` (Python Service path):**
```jsonc
{
  "experimentalServices": {
    "flask": { "root": "api", "runtime": "python3.12" }
  },
  "functions": {
    "api/**/*.py": { "memory": 2048, "maxDuration": 60 }
  }
}
```
- `api/requirements.txt` pins Flask `3.1.x`.
- Keep the namespace distinct (`/api/py/*`) so it doesn't collide with Next Route Handlers (`/api/*`), which you'll still use for tiny JS-side endpoints (OG images, edge auth).

---

## 3. Animation & interaction stack

Use **two engines deliberately**, not one of everything. Motion for component/UI state; GSAP for scroll choreography. Adding React Three Fiber only where you genuinely need 3D.

| Library | Pinned | Use it for | Don't use it for |
|---|---|---|---|
| **Motion** (`motion@12.39+`, import `motion/react`) | 12.x | Enter/exit, layout animations, hover/tap micro-interactions, shared-layout, gesture-driven UI, page-level mount transitions | Long scroll-scrubbed timelines |
| **GSAP** `3.13` + **ScrollTrigger** + **SplitText** | 3.13 | Scroll-pinned sections, scrubbed timelines, staggered hero reveals, kinetic typography (SplitText), section sequencing | Simple React state transitions (use Motion) |
| **Lenis** `1.3.x` (pkg renamed `lenis`, *not* `@studio-freight/lenis`) | 1.3 | Buttery smooth scroll feel; **sync it to ScrollTrigger** via `lenis.on('scroll', ScrollTrigger.update)` | Anything when `prefers-reduced-motion` is set — disable it |
| **React Three Fiber + drei** (`@react-three/fiber@9`, `@react-three/drei@10`, `three@0.17x`) | r3f 9 | One signature 3D moment (a hero plant model, particles), declarative Three.js in React | Decorating the whole site; mobile-first content |
| **Spline** | latest | Designer-built 3D scenes with **zero Three.js code**, fast to ship | When you need fine perf control or small bundles (Spline runtime is heavy) |
| **Lottie** (`lottie-react`) | latest | Vector micro-animations (icons, loaders) exported from After Effects | Photographic/video content; large scenes |
| **theatre.js** | 2.x | Designing/sequencing complex animations on a timeline with a visual editor (esp. with r3f) | Simple sites; it adds tooling overhead |
| **View Transitions API** | native (Next 16) | Cross-page/element morphs (product → detail). Native, no lib | Browsers needing fallback — provide a Motion fallback |

**Licensing — verified:** **GSAP is now 100% free, including every former Club plugin** (ScrollTrigger, **SplitText**, MorphSVG, DrawSVG, ScrollSmoother). Webflow acquired GreenSock (Oct 2024) and removed all paid tiers in **April 2025** — no membership, license key, or auth token, commercial use included. This is the single biggest 2026 change: you no longer choose libraries to dodge GSAP's paywall.

**Decision rule:** Motion for *stateful component* animation, GSAP for *scroll-driven* choreography, Lenis to make scroll feel premium, R3F/Spline for *one* 3D hero — not the whole site.

---

## 4. Media pipeline for Gemini-generated assets

Gemini outputs raw MP4/PNG. Never ship those directly — they're huge and single-format. Build a transcode-on-ingest pipeline.

### Photos
- **Formats:** serve **AVIF** first (now the obvious default in 2026 — AV1-codec stills beat WebP/JPEG substantially), **WebP** fallback, JPEG last resort. `next/image` negotiates AVIF automatically (since Next 13; on by default).
- **`next/image`:** use it everywhere. `priority` on the LCP hero only; everything else lazy. Provide `sizes` so the right responsive variant is chosen.
- **Blur placeholders:** `placeholder="blur"`. For dynamic Gemini assets you don't have a static import for, generate a tiny base64 LQIP at ingest and pass via `blurDataURL`.
- **Responsive:** let `next/image` emit `srcset`; set `deviceSizes`/`imageSizes` in config for your real breakpoints.

### Video (the bigger lift)
- **Don't serve a raw MP4 hero.** Transcode once at ingest into adaptive **HLS** with **AV1/VP9 (WebM) + H.264 fallback**. Modern browsers get AV1-MP4 or VP9-WebM; older get H.264.
- **Use Mux** for hero/scroll video. Mux ingests your Gemini MP4, transcodes to adaptive streams, and gives you `@mux/mux-player` / `@mux/mux-video` with built-in poster, lazy load, and a thumbnail/storyboard API. It's the lowest-effort path to good video CWV and is fully Vercel-friendly (it's just an embed + API).
- **Cloudinary** is the alternative if you want **images and video in one tool** with AI `q_auto` (perceptual quality, up to ~90% size cut) and `f_auto` (auto AV1/VP9/WebM). Use `next-cloudinary`'s `CldImage`/`CldVideoPlayer`. Pick **Mux** if video is the star; **Cloudinary** if you want one vendor for both.
- **Vercel Blob** for storing the **original** Gemini outputs and any small derived assets — not for serving heavy adaptive video (that's Mux/Cloudinary's job). Note the Blob store gotcha from your environment: only public stores serve correctly.
- **Poster frames:** always set a poster (Mux storyboard or a Gemini still) so LCP isn't blocked on video bytes.

### Scroll-scrubbed video (a common "ultra-dynamic" effect)
Two viable approaches — choose by fidelity vs. effort:
1. **GSAP ScrollTrigger driving `video.currentTime`** — pin the section, scrub `currentTime` from a ScrollTrigger timeline. Works, but seeking long videos can stutter on mobile and needs a fully-buffered, keyframe-dense encode.
2. **Image-sequence scrub (the "Apple AirPods" technique)** — export N frames as AVIF/WebP, preload, and draw the right frame to a `<canvas>` as you scroll. Smoother and more reliable cross-device than seeking a real video, at the cost of more requests/bytes. Recommended for the *signature* scrub; lazy-load the frame set and only on desktop.

### Lazy loading
- Below-the-fold video/3D: `loading="lazy"` / `IntersectionObserver`, and only `dynamic()`-import R3F/Spline when in view.
- Poster image as the LCP candidate; swap to video after load.

---

## 5. Performance & accessibility (keeping CWV green under heavy motion)

This is where ambitious sites die. Concrete rules:

- **Code-split the heavy stuff.** `next/dynamic(() => import(...), { ssr: false })` for R3F/Spline/theatre and any WebGL. Never put Three.js in the initial bundle. The hero canvas should mount after first paint.
- **Lazy WebGL.** Mount the 3D scene only when its section is near viewport (IntersectionObserver), pause `requestAnimationFrame` when offscreen (`useFrame` + visibility check / r3f `frameloop="demand"`).
- **LCP strategy.** Make the LCP a *static, optimized image* (AVIF via `next/image`, `priority`), **not** a video or canvas. Animate *in* after LCP. Preload the hero poster. Keep the critical path free of GSAP/Three.
- **`prefers-reduced-motion`:** honor it everywhere. Disable Lenis, skip GSAP scrub timelines, render the static poster instead of scrubbed video, swap Motion transitions to instant. Wire it once with `gsap.matchMedia()` + a `useReducedMotion()` (Motion hook) guard.
- **Mobile fallbacks:** ship **no WebGL hero on mobile** by default — serve an AVIF/short looping video instead. Use `matchMedia`/`gsap.matchMedia()` to branch. Mobile GPUs + heavy R3F = jank and battery drain.
- **React Compiler on** (Next 16) to cut re-renders from animated state.
- **INP:** keep scroll handlers cheap — Lenis + ScrollTrigger already rAF-batch; don't add your own scroll listeners doing layout reads/writes.
- **Budget:** set a JS budget (~target <200KB initial gzip), and keep 3D/animation out of it via dynamic import. Measure with Vercel Speed Insights / Lighthouse CI in the pipeline.
- **A11y basics under motion:** focus states preserved, animations don't trap focus, `aria-hidden` decorative canvases, captions/controls on any meaningful video, no autoplay-with-sound.

---

## 6. CMS / content

**Recommendation for a small plant brand: a headless CMS — Sanity (`v4`).** Not hardcoded, not pure MDX.

Reasoning:
- **Commerce = content that changes** (products, plant care guides, seasonal hero media, prices, copy). Non-technical owners must edit without a deploy. Hardcoding guarantees you become the bottleneck.
- **Sanity** fits a small brand well: generous free tier, real-time **Studio** you embed at `/studio`, **GROQ** queries, **Portable Text** for rich content, and first-class image/asset handling (hotspot/crop) that pairs with `next/image`. It's the lowest-friction "marketers can edit, devs stay happy" option on Vercel + Next.
- **Payload** (`v3`, runs *inside* Next) is the better pick **only if** you specifically want to **self-host**, own the Postgres/Mongo data, and keep everything in one Next app/repo (no third-party SaaS). It's heavier to operate. Choose it for data-residency/ownership reasons, not for a typical small brand.

**Where MDX still earns its place:** long-form, dev-authored content — care guides, blog posts, docs — where you want components inline. Use MDX for *those* pages and Sanity for *everything merchandised/edited by the owner*. That hybrid (Sanity for products/marketing blocks, MDX for guides) is the sweet spot.

**Avoid hardcoding** except a tiny static site — which this explicitly is not.

> Flask's role with the CMS (from §2): optionally proxy/cache Sanity through Flask if you need server-side shaping or to hide tokens; otherwise fetch Sanity directly from RSC with a read token.

---

## Sources
- [Next.js 16 release](https://nextjs.org/blog/next-16) · [Upgrading to v16](https://nextjs.org/docs/app/guides/upgrading/version-16) · [Current version 16.2.7 (June 2026)](https://abhs.in/blog/nextjs-current-version-march-2026-stable-release-whats-new)
- [Webflow makes GSAP 100% free](https://webflow.com/blog/gsap-becomes-free) · [GSAP pricing](https://gsap.com/pricing/) · [GSAP 3.13 release](https://gsap.com/blog/3-13/)
- [Motion (ex-Framer Motion) docs](https://motion.dev/docs/react) · [Motion upgrade guide](https://motion.dev/docs/react-upgrade-guide) · [motion changelog](https://github.com/motiondivision/motion/blob/main/CHANGELOG.md)
- [React Three Fiber docs](https://r3f.docs.pmnd.rs/)
- [Vercel Next.js + Flask starter](https://vercel.com/templates/backend/nextjs-flask-starter) · [Python + JS in one app](https://vercel.com/kb/guide/how-to-use-python-and-javascript-in-the-same-application) · [nextjs-flask example](https://github.com/vercel/examples/blob/main/python/nextjs-flask/README.md)
- [Vercel Functions limits](https://vercel.com/docs/functions/limitations) · [Fluid compute pricing](https://vercel.com/docs/functions/usage-and-pricing) · [Higher Fluid defaults/limits](https://vercel.com/changelog/higher-defaults-and-limits-for-vercel-functions-running-fluid-compute)
- [Cloudinary video optimization](https://cloudinary.com/documentation/video_optimization) · [AVIF in 2026](https://dev.to/serhii_kalyna_730b636889c/avif-in-2026-why-its-the-best-format-for-web-images-epj) · [Mux vs Cloudinary](https://medium.com/@vignarajj/beyond-the-loading-spinner-a-strategic-deep-dive-into-modern-video-infrastructure-mux-vs-99c067691ed1)