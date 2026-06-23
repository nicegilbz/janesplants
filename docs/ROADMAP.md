I'll synthesize the five research streams into the definitive build roadmap. This goes straight to the client, so I'm returning it as my response.

# Jane's Plants — Build Roadmap & Implementation Plan
*janesplants.com · React + Flask · Vercel · "2026 mind-blowing" premium botanical brand*
*Prepared by: Lead Architect · 2026-06-23*

---

## A. EXECUTIVE SUMMARY

Jane's Plants is a premium, dual-revenue (retail + corporate/event plant hire) indoor-plant house from a real grower in Hertford — and right now it lives on a placeholder-grade GoDaddy site with 24 empty image slots, no prices, and a hero that reads like a directory listing. We're going to replace that with **the most alive website on the internet**: a cinematic, humid, backlit glasshouse you can almost smell, where the hero plant literally *grows from a seed as you scroll*, a brass dial flips the whole site from morning-conservatory daylight into a bioluminescent night-greenhouse glowing under grow-lights, and your cursor trails tiny unfurling leaves across the foliage. The brand's own language is already premium ("thoughtfully selected," "considered," "connected to nature") — we keep that voice and finally give it the imagery, motion, pricing, and depth it deserves. Built on Next.js 16 + React 19 with a thin Flask service for forms/commerce, Gemini-generated cinematic media, and one disciplined "wow" budget spent on a handful of unforgettable set-pieces rather than scattered effects. The result is a site that gets screenshotted and shared — and that actually sells plants and qualifies hire leads, which the current site does neither of.

---

## B. WHAT JANE'S PLANTS IS

> **Critical reframing for the client:** `indoorgrow.co.uk` is **not a competitor reference — it is Jane's Plants' own current live site** (a thin GoDaddy "Websites + Marketing" build, repurposed from the legacy "Concept Hydroponics" domain). Everything below treats it as the **"before."** janesplants.com is the "after," and the bar is "dramatically over-deliver on everything the current site lacks."

### Business model (derived from the current site + socials)
A **dual-revenue premium plant business**, regional to **London / Hertfordshire / Bedfordshire**, operating from **Unit 8A Mimram Road, Hertford**:

1. **Retail (sell)** — indoor houseplants, specimen cacti & succulents, plant pots, and growing supplies. Sold in-person at the nursery and via an online store.
2. **Plant hire + services (rent)** — premium plant rental plus professional delivery, installation, styling and ongoing maintenance for homes, offices, events, weddings, photoshoots and commercial spaces. Three current packages: House Plant Hire, Cactus Hire, Large Plant Pot Hire.
3. **Nursery / grower positioning** — "our nursery is at the heart of everything we do"; they source, nurture and maintain, not just resell. The brief's creative leans into a **Kent glasshouse** provenance story — *confirm with client whether the grow site is Hertford or Kent (the brief and the live site disagree).*

**Not** hydroponics/grow-equipment, despite the legacy domain name and stale Google snippet.

### Content scope the new site must own (the elevation brief)
The current site's fatal gaps, each becoming a section of work:
- **Real imagery** (the #1 priority — currently zero) → Gemini cinematic media plan, §F.
- **Prices** (currently none, retail *or* hire) → at minimum "from £X" hire tiers + real SKU prices.
- **Server-rendered, crawlable product content** (current store is JS-only and invisible to crawlers/AI).
- **A distinctive brand system** (current site = generic GoDaddy, exposed `filler@godaddy.com`, a Gmail business address).
- **An authority/inspiration layer** — care guides, journal, project gallery, social proof (none currently exist).
- **A real hire enquiry / consultation flow** (beyond a generic contact form).
- **Locked brand basics** — "Jane's Plants" (apostrophe, consistent), one set of opening hours, real legal pages, a branded email address.

### Recommended Information Architecture / site map

```
/                   Home — the showpiece (cinematic hero + scroll growth time-lapse + day/night dial)
/story              Jane / the glasshouse / how we grow (provenance, the "walk-through" scroll)
/shop               Plant collection storefront (cursor grow-light grid, filters)
/plant/[slug]       Individual plant page (3D inspector, live vitals, care, cross-sell)
/hire               Plant hire & services — packages + "from £X" + enquiry/consultation flow  ← NEW vs brief, business-critical
/build              "Build Your Jungle" configurator (room + vibe + commitment → shoppable bundle)
/care               Care guides hub + interactive light/water simulator + per-plant guides
/journal            Editorial growing notes (SEO + brand depth)
/visit              Visit the glasshouse / contact (night-mode by default, map, book a visit)
/cart, /checkout    Commerce (if ecommerce confirmed — see §H)
/studio             Sanity CMS Studio (owner-editable, gated)
+ legal: /privacy /terms (real, not "coming soon")
```

> I've **added `/hire` as a first-class page** (the brief folded hire into the homepage). Hire is half the revenue and the highest-margin lead type; it deserves its own page with package tiers, "from £X" pricing, a project gallery proving the commercial/office/event credentials, and a proper enquiry flow (with the existing "attach a photo of your space" field — a genuinely good idea from the current site).

---

## C. CREATIVE DIRECTION

### Chosen art direction: **Lush Cinematic Jungle** (Direction B) — with bio-tech utility surfaces (Direction C)
Dark, humid, backlit. Deep shadow with shafts of light through layered foliage, macro water-beads, drifting mist, green glowing from within — everything feels *filmed, not photographed* (Gemini video loops). We borrow the clean **data-overlay restraint** of the bio-tech direction for the functional surfaces (care tools, plant vitals), so the site is emotional-wow on hero/shop and calm-utility where people need to *do* things. **Editorial Botanical (Direction A) is the documented fallback** if the client wants lower production risk.

### Color system (CSS-variable design tokens)

**Primary — "Glasshouse"** (the backbone, dark cinematic):
| Role | Hex | | Role | Hex |
|---|---|---|---|---|
| Canvas (almost-black green) | `#0E1A12` | | Aged brass (metal/rules/price) | `#B08D57` |
| Surface (deep forest) | `#16271B` | | Terracotta (pots/CTAs, warmth) | `#C0613B` |
| Glasshouse emerald (primary) | `#1F5F3F` | | Bone (cream text) | `#F4EFE3` |
| Chartreuse glow (the single "alive" accent) | `#9FD15B` | | Sage grey (muted) | `#A9B5A3` |

**Light state — "Conservatory"** (day toggle / shop grid): cream `#F6F1E7`, oat `#ECE4D4`, botanical ink `#22372B`, olive `#6B7A3F`, brass `#A67C45`.

**Showpiece — "Bioluminescent"** (night-mode hero, used *sparingly*): void `#06080A`, bio-lume green `#3DF5A0`, grow-cyan `#5BE0E6`, horti-magenta `#E15BC9`, deep teal `#0C2A2A`, soft white `#EAF3EE`.

**Discipline:** chartreuse is the *only* "alive" accent in the dark theme (hovers, cursor sprout, the one glowing leaf); terracotta only on pots/CTAs. This deliberately avoids the generic-AI "purple-gradient-on-white" tell and the "all-caps-bold-green plant-shop trap."

### Typography
**Pairing 1 — Editorial luxe (recommended):**
- **Display/Headlines:** *Fraunces* (Google) — soft serif with optical sizing; carries the human "Jane's" side. Highest optical size + slight SOFT axis for headings.
- **Body/UI:** *Satoshi* (Fontshare) — clean geometric-humanist grotesque.
- **Accent:** *Fraunces italic* for Latin names (*Monstera deliciosa*); small caps for nav.
- **Data/numerals:** a mono (JetBrains Mono or IBM Plex Mono) for prices + plant vitals — tabular treatment keeps the "data" read clean.

**Standing rules:** never more than 2 families on screen + 1 mono; Latin names always italic; size jumps **3×+** (not 1.5×); weight contrast 100/200 vs 800/900. **Explicitly banned** (the anti-slop list): Inter, Roboto, Open Sans, Arial, system fonts — *and Space Grotesk*, which is Claude's own convergence tic (the brief's bio-tech pairing names Space Grotesk for vitals UI; we substitute a mono to stay off the slop list).

### The 6 signature interactions — each mapped to the reference that does it best
| # | Interaction | Best-in-class reference to copy |
|---|---|---|
| 1 | **Scroll-scrubbed growth time-lapse** — seed → sprout → full Monstera, scrubbed to scroll. *The* hero. | **Lando Norris / OFF+BRAND** (scroll-drives-rotation mechanic) + **Igloo Inc** (descend-into-one-object metaphor) |
| 2 | **Day/Night greenhouse dial** — brass switch flips Conservatory-day ↔ Bioluminescent-night (grow-LEDs bloom, particles drift). The single most screenshot-worthy feature. | **Microsoft.ai / Adveris** (tonal section transitions) + native **View Transitions API** for the cross-state morph |
| 3 | **Cursor that sprouts leaves** + grow-light glow on the shop grid. | **Aristide Benoist** (custom cursor / magnetic polish) + Codrops image-trail |
| 4 | **Parallax layered foliage / depth corridors** — walk *into* the jungle. | **Immersive Garden** (sculptural organic depth) + Locomotive (parallax) |
| 5 | **3D plant inspector** — drag-rotate 360°, zoom leaf veins, care hotspots. | **Scout Motors** (configurator-in-scroll that still sells) |
| 6 | **WebGL displacement / mist-on-hover** on product imagery — leaf-ripple distortion, liquid crossfade. | **Codrops** "WebGL Distortion Hover" + "Creative WebGL Image Transitions" |

*In reserve (Phase 5+):* "Build Your Jungle" configurator, leaf-unfurl SVG reveals, generative pollen particle systems, the care-page light/water simulator, a "tap to water" easter egg.

**Guardrail (non-negotiable):** the brief's biggest risk is *effect soup*. The most respected premium sites pair spectacle with **restraint** — one strong idea per section, paced and quiet. **Terminal Industries** is the "don't overdo it" calibration. We spend the wow budget on set-pieces 1 + 2 as the heroes; everything else stays calm.

---

## D. TECH ARCHITECTURE

### Final stack decision (verified June 2026)
| Layer | Choice | Pinned |
|---|---|---|
| Framework | **Next.js App Router** (Vercel-first; SEO/LCP/ISR for commerce) — **not Vite** | `next@16.2.7` |
| Runtime | React 19.2 (bundled), **React Compiler ON** (`reactCompiler: true`) | `react@19.2` |
| Bundler | Turbopack (default in 16) | — |
| Backend | **Flask** as a thin API behind a Next rewrite (single public origin, no CORS) | Flask `3.1.x`, Python `3.12` |
| Component/UI motion | **Motion** (ex-Framer Motion), `import "motion/react"` | `motion@12.39+` |
| Scroll choreography | **GSAP + ScrollTrigger + SplitText** (now 100% free — every plugin) | `gsap@3.13` |
| Smooth scroll | **Lenis** (new package name, *not* `@studio-freight/lenis`) | `lenis@1.3.x` |
| 3D/WebGL | **React Three Fiber + drei** (one hero moment only) | `@react-three/fiber@9`, `@react-three/drei@10`, `three@0.17x` |
| Designer 3D (optional) | **Spline** — only if a designer builds a scene; runtime is heavy | latest |
| Media — images | `next/image` (AVIF default, WebP fallback) | — |
| Media — video | **Mux** (`@mux/mux-player`) for hero/scroll video; Cloudinary only if one-vendor-for-both is wanted | — |
| Asset origin storage | **Vercel Blob** (public store only — see env gotcha) for raw Gemini outputs | — |
| CMS | **Sanity v4** (embedded Studio at `/studio`) + MDX for dev-authored care guides/journal | — |

**Why Next over Vite (not close, given the constraints):** you're on Vercel (first-party image optimization, ISR, OG generation, View Transitions, Services routing — all zero-config) and this is SEO/commerce (RSC + streaming SSR + per-route static = crawlable, cacheable, fast LCP). A Vite SPA would ship a blank shell + hydration waterfall — exactly the wrong default, and it would *repeat the current site's fatal "JS-only, invisible to crawlers" mistake.*

### How Flask is used + deployed on/with Vercel
**Pattern: hybrid single-origin.** Next.js is the **only public origin**; Flask sits behind a Next rewrite so the browser never sees a second domain (no CORS, same-site cookies).

- **Synchronous endpoints → Vercel Python Service** (`experimentalServices` in `vercel.json`, one project, one deploy). Handles request-scoped work.
- **Async Gemini media generation → external worker (Railway/Fly)**, *only when needed.* Serverless Flask is stateless/cold-starting with no background workers — **never generate or transcode media inside a request** (timeouts + cost). The worker enqueues a job, returns a job id, generates → uploads to Mux/Blob → writes the URL back; the frontend polls or gets a webhook.

```ts
// next.config.ts — single-origin rewrite
async rewrites() {
  return [{ source: "/api/py/:path*",
    destination: process.env.FLASK_URL
      ? `${process.env.FLASK_URL}/:path*`     // external worker (Railway/Fly)
      : "http://127.0.0.1:5328/:path*" }];     // local dev
}
```

**Flask's responsibilities (keep it thin and boring):**
- **Forms** — contact + **hire enquiry** (with the "attach a photo of your space" upload), honeypot + rate-limit anti-spam, forward to email/CRM.
- **Newsletter** — proxy to ESP so the API key never hits the client.
- **Commerce** — Stripe payment intents + webhooks + order persistence (secret keys server-side only).
- **CMS proxy/cache** — optionally shape/cache Sanity, hide tokens.
- **Gemini media endpoints** — *enqueue only*, return job id; worker does the slow part.
- Signed-URL minting, server-side feature flags.

**Flask does NOT:** render HTML (Next owns that), run scroll/animation (client), or synchronously block on Gemini.

### Folder structure sketch
```
janesplants/
├─ app/                      # Next App Router (RSC-first)
│  ├─ (marketing)/page.tsx          # /
│  ├─ story/ shop/ hire/ build/ care/ journal/ visit/
│  ├─ plant/[slug]/page.tsx
│  ├─ studio/[[...index]]/page.tsx  # embedded Sanity Studio
│  ├─ api/og/                       # JS Route Handlers (OG images, tiny edge bits)
│  └─ layout.tsx                    # Lenis + design-token providers, reduced-motion guard
├─ components/
│  ├─ primitives/            # tokens-driven: Button(magnetic), Heading(SplitText), Price(mono)
│  ├─ motion/                # ScrollScrub, LeafUnfurl, ParallaxLayer, CursorSprout
│  ├─ webgl/                 # (dynamic, ssr:false) HeroPlant, DisplacementHover, PlantInspector
│  └─ blocks/                # Hero, FeaturePlant, HirePackage, ProductCard, VitalsPanel
├─ lib/                      # sanity client (GROQ), mux, tokens, gsap-lenis sync, motion-config
├─ content/                 # MDX care guides + journal
├─ sanity/                  # schema (product, plant, hirePackage, journalPost, heroMedia)
├─ api/                     # Flask (Vercel Python Service)
│  ├─ index.py  forms.py  newsletter.py  checkout.py  requirements.txt
├─ worker/                  # external Flask media worker (Railway/Fly) — gemini jobs + transcode
├─ public/                  # static, fonts (self-hosted Fraunces/Satoshi)
├─ next.config.ts  vercel.json  package.json
```

### Performance & a11y guardrails (where ambitious sites die)
- **LCP = a static AVIF image** via `next/image priority` — *never* a video or canvas. Animate in *after* LCP.
- **Code-split all WebGL**: `dynamic(() => import(...), { ssr: false })`; mount 3D only when its section nears viewport (IntersectionObserver); `frameloop="demand"` / pause rAF offscreen.
- **No WebGL hero on mobile** by default — serve an AVIF still or short looping video; branch via `gsap.matchMedia()`.
- **`prefers-reduced-motion`** honored everywhere: disable Lenis, skip scrub timelines, render static poster instead of scrubbed video, Motion → instant. Wire once with `gsap.matchMedia()` + Motion's `useReducedMotion()`.
- **Animate `transform`/`opacity` only** (GPU-composited, no reflow). Target 60fps desktop / 45–50fps mobile.
- **Motion spec:** desktop 150–200ms; standard easing `cubic-bezier(0.4,0,0.2,1)`, decelerate-in `(0,0,0.2,1)`, accelerate-out `(0.4,0,1,1)`; hard ceiling ~400ms; never linear; staggered page-load reveals via delay.
- **Budget:** <200KB initial gzip JS (3D/animation out of it via dynamic import); Lenis+ScrollTrigger rAF-batch scroll, no extra scroll listeners doing layout reads. Measure with Vercel Speed Insights + Lighthouse CI in the pipeline.
- **Video:** Mux adaptive HLS (AV1/VP9 + H.264 fallback), always a poster, never autoplay-with-sound, captions/controls on meaningful video.

---

## E. THE "WOW" SET-PIECES (build-level detail)

**1. Scroll-scrubbed growth time-lapse — THE hero.**
A single seed germinates → sprouts → unfurls → mature Monstera, scrubbed frame-by-frame to scroll position while value props fade in beside it.
- **Build:** GSAP **ScrollTrigger** pins the section and scrubs through a **preloaded AVIF/WebP image sequence** drawn to `<canvas>` (the "Apple AirPods" technique — smoother and more reliable cross-device than seeking a real `video.currentTime`, which stutters on mobile). Source = Gemini asset **F2** delivered as a PNG frame sequence.
- **Fallback:** `prefers-reduced-motion` / mobile → a single hero still of the mature plant (the final frame). Frame set lazy-loaded, desktop-only.

**2. Day/Night greenhouse dial — THE share moment.**
A brass sun/moon dial in the nav flips the *entire site* from "Conservatory" daylight to "Bioluminescent" night — grow-LEDs bloom magenta/cyan, plants rim-light, pollen particles drift, optional ambient mist/cricket audio (opt-in, never autoplay-with-sound).
- **Build:** CSS-variable theme swap (tokens are the whole system) wrapped in the **View Transitions API** (native in Next 16) for the cross-state morph; background photography swaps between Gemini pair **F4 day/F4 night**; particle layer (set-piece 4 tech) only renders in night state.
- **Fallback:** instant theme swap (no transition) under reduced-motion; persists choice in `localStorage`.

**3. Parallax foliage depth corridors + generative particles.**
4–6 separated foliage layers (foreground fronds → mid plants → background mist) move at different scroll speeds so you walk *into* the jungle; night-mode adds drifting chartreuse pollen.
- **Build:** GSAP ScrollTrigger parallax on transform-only layers (Gemini transparent PNG plates); particles via lightweight canvas/2D (cheap) — *not* a heavy WebGL sim. Source = **L7** pollen plates.
- **Fallback:** static layered image, particles off, under reduced-motion/low-power.

**4. Cursor that sprouts leaves + shop grow-light.**
Tiny chartreuse leaves/tendrils sprout and curl from the cursor, withering after ~1s; on `/shop`, the cursor casts a soft grow-light glow that brightens the nearest plant card and triggers a small leaf sway.
- **Build:** SVG/canvas trail (performance-cheap, no WebGL); grow-light = a radial-gradient mask following the pointer + CSS brightness on the hovered card. Magnetic buttons via Motion.
- **Fallback:** normal cursor always available; effect disabled on touch + reduced-motion (the brief's honourable-mention "tap to water" replaces hover on touch).

**5. 3D plant inspector (`/plant/[slug]`).**
Drag to rotate the specimen 360°, pinch-zoom into leaf veins, tap hotspots ("new growth here," "where to cut," "root health"). Solves the #1 online-plant anxiety: *inspect before buying.*
- **Build:** a **360° turntable image sequence** (Gemini **L1**, 36 frames) driven by pointer drag — cheaper and *sharper* than a true 3D model, and far lighter than R3F. Hotspots = absolutely-positioned annotations synced to frame index. (Reserve actual R3F for one true 3D hero object only if budget allows.)
- **Fallback:** a static hero still + standard gallery; hotspots become a static labelled diagram.

**6. WebGL displacement / mist-on-hover on product imagery.**
Leaf/water-ripple displacement distorts the photo on hover; liquid crossfade between two shots (e.g., plant ↔ in-situ styled). Mist fogs the image and clears to reveal the plant.
- **Build:** Codrops "WebGL Distortion Hover" pattern — a fragment-shader displacement map on a small per-image WebGL surface, dynamically imported, mounted only on hover-capable desktop.
- **Fallback:** a simple Motion opacity/scale crossfade (no shader) on touch/reduced-motion/low-power.

---

## F. GEMINI MEDIA PLAN

### SEQUENCE — the decision (this is the one process call the client must get right)
**Generate the FIRST batch (F1–F5) BEFORE full design begins; generate the LATER batch (L1–L7) in parallel with build, after the hero is locked.**

**Reasoning — generate the hero assets first, not the whole library, and not nothing:**
- This site's entire art direction *is* the cinematic media — the hero, the scroll time-lapse, and the day/night pair are not decoration, they are the product. Designing the hero against placeholder boxes would repeat the exact failure of the current GoDaddy site (24 empty slots). The design must be built **against real footage**, so F1–F5 are a hard prerequisite for Phase 2.
- But generating the *full* catalogue (L1–L7, dozens of per-plant turntables and care-state variants) up front is wasteful — the real product range isn't locked yet (open question §H), and consistency is easier to enforce once the "house" grade is set by the hero batch. So the bulk catalogue is generated *during* build, once we know the final SKU list and have a locked colour grade to match.
- Net rule: **F-batch gates design; L-batch follows the locked range during build.** Don't let media block the *foundation* (Phase 0–1 need no media), and don't let design proceed past the hero without the F-batch.

**Global style token (append to every prompt):** *cinematic, shot on Arri Alexa, 85mm macro, shallow depth of field, volumetric backlight, soft mist/haze, dew droplets, deep forest-green and brass palette, near-black background, ultra-detailed, photoreal, no text, premium editorial.* Keep one consistent "house" grade across the whole set so the catalogue reads as one glasshouse.

### FIRST batch — gates design (Phase 2 prerequisite)
| ID | Asset | Spec | Used on |
|---|---|---|---|
| **F1** | Hero video loop (foliage, mist, golden hour, dolly push-in) | 3840×2160 16:9, AV1/WebM loop + MP4 + poster | Home hero bg |
| **F2** | **Growth time-lapse** (seed→mature Monstera, dark seamless bg) — *most important single asset; request as PNG frame sequence for scrubbing* | 2160² 1:1 + 1080×1920 9:16, PNG frames + WebM | Home/Story scroll set-piece |
| **F3** | Hero specimen stills ×3 (Monstera, Bird of Paradise, Calathea, fashion lighting) | 3000×4000 3:4, PNG (transparent + on-bg) | Value-prop blocks, featured cards |
| **F4** | Day vs Night glasshouse pair (toggle reveal) | 3840×2160 16:9 each, JPG | Day/Night dial bg; Visit |
| **F5** | Single-leaf macro loop (droplet on vein, chartreuse glow) | 1920×1080 16:9, AV1/WebM loop | Section bg; care accents |

### LATER batch — during build, after range is locked
| ID | Asset | Spec | Used on |
|---|---|---|---|
| **L1** | 360° turntable per hero product (36 frames, terracotta pot) | 2000² 1:1 PNG sequence | 3D inspector `/plant` |
| **L2** | Product grid stills, full catalogue (consistent system) | 1600×2000 4:5 PNG (transparent + on-bg) | `/shop` cards |
| **L3** | Leaf-vein extreme macro stills | 2400×1600 3:2 JPG | Care hotspots, plant detail, journal headers |
| **L4** | "Walk-through" wide pano video | 5120×2160 21:9 MP4/WebM | `/story` horizontal scroll |
| **L5** | Care-state variants ×4 per plant (thriving/yellowing/wilting/overwatered) | 1600² 1:1 PNG set | `/care` simulator |
| **L6** | Watering/droplet macro loop | 1920×1080 16:9 AV1/WebM loop | Care watering interaction, configurator |
| **L7** | Pollen/spore particle plates (+ optional Jane portrait, client-approval) | 3840×2160 16:9 PNG + 3000×4000 3:4 JPG | Night particles, dividers; `/story`,`/visit` |

**Delivery spec to the client:** seamless loops with clean in/out points; all video AV1/WebM primary + H.264 MP4 fallback + poster still; stills at 2× retina; transparent PNGs where a plant sits on different backgrounds. Raw Gemini MP4/PNG is **never** shipped directly — it goes into the Vercel Blob (public store only) and through the Mux/`next/image` transcode-on-ingest pipeline.

---

## G. PHASED ROADMAP

Buildable strictly in order. Effort is rough dev-time for one experienced frontend dev (excludes Gemini generation, which runs in parallel per §F).

### Phase 0 — Setup, repo, CI, Vercel, domain *(2–3 days)*
- Monorepo scaffold (`app/`, `api/`, `worker/`, `sanity/`); Next 16 + React 19 + Turbopack; Flask `/api` Python Service via `vercel.json`; the single-origin rewrite.
- Vercel project (team `nicos-projects-692347f6` style), `janesplants.com` domain connect + DNS; **301 the legacy `indoorgrow.co.uk`** to the new brand.
- CI: typecheck + lint + Lighthouse CI + Vercel Speed Insights; React Compiler on; `prefers-reduced-motion` provider; self-hosted fonts.
- Vercel Blob **public** store, Mux account, Sanity project, Stripe (test) keys in env.
- **Deliverable:** green "hello world" deploying on push, Flask reachable at `/api/py/health`, no media needed.

### Phase 1 — Design system & component primitives *(3–5 days)*
- **Tokens first** (per the anti-slop directive): the 3 palettes as CSS variables, type scale (3×+ jumps), 8-pt spacing, radius, shadow, **motion spec** (durations + named easing).
- Primitives: magnetic `Button`, SplitText `Heading`, mono `Price`/`Vitals`, `LeafUnfurl` reveal, `ParallaxLayer`, Lenis↔ScrollTrigger sync, Motion config + reduced-motion guards.
- Sanity schema (`product`, `plant`, `hirePackage`, `journalPost`, `heroMedia`) + Studio at `/studio`.
- **Deliverable:** a Storybook-style tokens/primitives page proving the system holds; CMS editable. *Still no hero media required.*

### Phase 2 — Home + the two hero set-pieces *(5–8 days)* — **requires Gemini F-batch**
- Home: cinematic F1 hero, **scroll growth time-lapse (set-piece 1)**, **day/night dial (set-piece 2)**, parallax foliage (set-piece 3), value-prop blocks (F3).
- Header/footer/nav; lock brand basics (apostrophe, hours, branded email).
- **Deliverable:** a shareable, screenshot-worthy homepage — the first "wow" demo for the client.

### Phase 3 — Shop + plant pages + commerce wiring *(6–9 days)*
- `/shop` grid (cursor grow-light set-piece 4, mist/displacement hover set-piece 6, leaf-unfurl cards, filters: light-level/difficulty/size), server-rendered + crawlable.
- `/plant/[slug]`: **3D inspector (set-piece 5)** from L1, live vitals panel, care, "pairs well with" cross-sell, terracotta "Add to your jungle" CTA, **real prices**.
- Flask commerce: Stripe intents + webhooks + orders; cart/checkout. *(If brochure-only — §H — this collapses to "enquire/reserve" + skip cart.)*
- **Deliverable:** browsable, purchasable (or enquirable) catalogue. Needs L1/L2.

### Phase 4 — Hire, Story, Visit + Flask forms *(4–6 days)*
- **`/hire`** (business-critical): package tiers with "from £X", project gallery proving commercial/office/event credentials, enquiry/consultation flow with photo-of-your-space upload.
- `/story` walk-through scroll (L4), `/visit` night-mode-default + map + "book a visit" + newsletter.
- Flask: contact + hire enquiry (honeypot + rate-limit), newsletter ESP proxy; real `/privacy` + `/terms`.
- **Deliverable:** the full lead-gen surface live — the half of the business the current site can't serve.

### Phase 5 — Content depth + reserve interactions *(5–7 days)*
- `/care` hub + interactive light/water simulator (L5/L6), MDX per-plant guides; `/journal` editorial (L3 headers); reviews/testimonials/social proof; "Build Your Jungle" configurator (if greenlit — see §H).
- **Deliverable:** the authority/inspiration layer + SEO engine the current site entirely lacks.

### Phase 6+ — Hardening, launch, post-launch *(3–5 days + ongoing)*
- Full perf/a11y audit (CWV green under motion, WCAG contrast, reduced-motion paths, mobile WebGL-off verification), SEO/OG/structured data, analytics; Stripe live keys; 301 final-check; launch.
- Post-launch: async **Gemini media worker** (Railway/Fly) for owner-generated seasonal hero media; configurator + easter eggs as fast-follows; monthly journal cadence.
- **Deliverable:** launched, monitored, owner-editable site with a content pipeline.

**Indicative total to a strong launch:** ~28–43 dev-days (Phases 0–4 = a complete, premium, sellable site; Phases 5–6 add depth + polish).

---

## H. OPEN QUESTIONS FOR THE CLIENT (genuinely blocking)

1. **Ecommerce vs brochure?** *The* fork. Full Stripe checkout (Phase 3 commerce, ~+4 days, ongoing payment/ops) — or brochure + "enquire/reserve" + keep selling via the existing channel? This decides cart/checkout, Stripe setup, and a chunk of Flask. **Recommendation:** launch brochure-first with online enquiry + reserve, add Stripe checkout as a fast-follow, *unless* you already have order volume that justifies it day one.
2. **Real product range + prices.** We need the actual SKU list (plants, pots, supplies) **and prices** — retail *and* "from £X" hire tiers. This blocks the L-batch media (we generate turntables/grid shots per real plant) and the shop build. The current site has *neither*; even rough tiers unblock us.
3. **Hire is half the business — confirm scope.** Are office/event/wedding hire and maintenance contracts in-scope for launch, with a project gallery to prove the commercial credentials? (Strongly recommend yes — it's the highest-margin lead.)
4. **Budget for paid tools.** Mux (video — recommended, the site is video-led), Sanity (free tier likely fine), Stripe (per-transaction), and optionally Spline (designer 3D) and a Railway/Fly worker (async media). **Mux is the one near-essential paid line** given the cinematic direction; confirm it's approved.
5. **Provenance: Kent glasshouse or Hertford nursery?** The creative brief says "grown in our Kent glasshouse"; the current site is Hertford (Unit 8A Mimram Road). The whole `/story` provenance narrative depends on the truth here.
6. **Brand basics to lock now.** Apostrophe ("Jane's Plants" everywhere), one canonical set of opening hours (current pages conflict: Mon 20:00 vs 17:00), and a **branded email** to replace the Gmail (`janesplantshertford@gmail.com`) — all three undercut "premium" until fixed.
7. **Art-direction sign-off + a real face?** Confirm Direction **B (Lush Cinematic Jungle)** over the Editorial-Botanical fallback, and whether Jane wants a real portrait (we'd shoot, not Gemini-fake, a real person) for `/story` and `/visit` — it materially lifts trust.
8. **Day/Night audio + motion intensity.** The night-mode ambient audio is opt-in by default; confirm you want it at all, and confirm appetite for the full set-piece intensity vs the more restrained Terminal-Industries calibration.

---

*Recommended one-line brief to greenlight: Art Direction B (Lush Cinematic Jungle) + bio-tech utility surfaces · Glasshouse palette primary, Bioluminescent reserved for night · Fraunces × Satoshi + mono for data · lead set-pieces = scroll growth time-lapse + day/night dial + 3D inspector + leaf-sprout cursor · Next 16/React 19 + thin Flask + Mux + Sanity · generate Gemini F1–F5 now so we build the hero against real footage.*

Key source file referenced: this synthesis draws on all five provided research streams; no repository files were required to produce it. Document is returned inline above (not written to disk, per instructions).