# Jane's Plants - Completion Plan

The path from "impressive prototype that is live" to "phenomenal finished website". Written against the actual codebase, so each item names real routes and files.

Legend for who does what:
- **[C]** Claude does it in code / via the Gemini image API (no cost concern for stills).
- **[You]** needs your action (Gemini video prompts, GoDaddy DNS, a paid key, a decision).
- **[C+You]** Claude builds it, you supply one input.

---

## Where it stands (done)

- Four art directions built; **Cinematic Jungle chosen** and built into a real multi-page site: home, `/cinematic/shop`, `/cinematic/plant/[slug]` (all 12, statically generated), `/cinematic/hire`, `/cinematic/care`, `/cinematic/visit`.
- Real site header/footer, cinematic enquiry form, Flask `/api/enquiry` backend (validation, honeypot, optional email).
- **7 Gemini stills generated and wired**: photographic hero, glasshouse day/night, leaf macro, three specimens. `MediaSlot` renders real imagery when given a `src`.
- Live on **www.janesplants.com**, auto-deploys from GitHub, production build clean, hydration clean.

---

## What's left (the gaps), by priority

### Phase 1 - Make it the real site (ship-ready)   [biggest impact, do first]

1. **Flip Cinematic to the root.** [C]
   Right now `/` is the concept-comparison hub and the real site lives under `/cinematic/*`. Move the cinematic experience to the root so `janesplants.com` opens straight into it, and relocate the concept gallery to `/concepts` (keep it for reference). This is a routing move: promote `src/app/cinematic/*` to `src/app/*`, update internal links (`/cinematic/...` to `/...`), keep redirects.

2. **Real photography for every plant.** [C]
   Generate the remaining 9 plant stills with Imagen 4 (I have 3) so the **shop cards and plant pages show real plants**, not just the generative SVG emblems. Extend `scripts/gen-media.py`, add an `image` field to `PLANTS` in `content.ts`, and have the shop `ShopGrid` and `PlantInspector` use the photo when present (emblem stays as the elegant fallback / loading state).

3. **Accessories + pots photography.** [C]
   A handful of stills for the pots/tools strip on the shop page (stoneware, terracotta, fluted, brass mister, etc.).

4. **Apex domain.** [You]
   `www` works; the bare `janesplants.com` still shows the GoDaddy parked page. Add `A @ -> 76.76.21.21` at GoDaddy (or an apex-to-www redirect) so both resolve.

5. **Email delivery.** [You + C]
   The enquiry form works but only acknowledges; to actually deliver to `hello@janesplants.com`, add `RESEND_API_KEY` (and optional `ENQUIRY_FROM`) in the Vercel project env. I will give exact steps. (You said sort this later - it lives here when you are ready.)

6. **Launch basics.** [C]
   Favicon + app icons in the brand mark, a social/OG share image (generate one), `sitemap.xml`, `robots.txt`, real page metadata + Open Graph per page, a proper 404 page in the cinematic style.

### Phase 2 - Cinematic video (you generate, I wire)   [the "phenomenal" jump]

You generate these in Gemini from the prompts in `docs/VIDEO-PROMPTS.md` (no API cost to you). Drop the files into `public/media/` and I wire them in. Work needed on my side:

7. **Teach `MediaSlot` (and the hero) to play video.** [C]
   Add an optional `video`/`poster` to `MediaSlot` so a slot can autoplay a muted, looping clip with the still as poster. Swap the home hero background from `hero.png` to the **hero loop** with the still as the poster frame (instant load, then motion).

8. **The scroll growth time-lapse.** [C+You]
   Replace the generative scroll-grown Monstera in `Manifesto` with the real **seed-to-Monstera** time-lapse, scrubbed to scroll position (the canvas frame-sequence technique). Needs the clip exported as frames; prompt provided.

9. **Ambient section video.** [C]
   Leaf-macro loop and a glasshouse ambiance clip as quiet section backgrounds on care / visit.

### Phase 3 - Signature interactions (the wow set-pieces)   [memorable, screenshot-worthy]

10. **Day / Night greenhouse dial.** [C]
    A brass sun/moon toggle in the header that flips the whole site between the "Conservatory" day palette and the "Bioluminescent" night palette, swapping the glasshouse day/night imagery, using the View Transitions API for the morph, and persisting the choice. This is the share moment.

11. **Real 360 plant inspector.** [C+You]
    The plant page inspector currently drags a composited emblem. With a 36-frame turntable per hero plant (generated or a Veo orbit), it becomes a true drag-to-rotate 3D inspector with hotspots ("new growth here", "where to cut").

12. **Build Your Jungle configurator.** [C]
    Pick a room + light + commitment level, get a shoppable, styled plant bundle. A genuinely useful, sticky interaction that also drives enquiries.

13. **WebGL displacement hover** on shop imagery (leaf-ripple distortion on hover, liquid crossfade plant <-> in-situ). [C]

14. **Care light/water simulator** - deepen the existing light-matcher into a small interactive that shows a plant thriving vs struggling by light/water choice (uses care-state image variants). [C+You]

### Phase 4 - Content depth + SEO   [makes it findable and credible]

15. **Journal** (`/journal`, `/journal/[slug]`) - a few editorial growing posts for SEO and brand depth. [C]
16. **Individual care guide pages** (`/care/[slug]`) expanded from the current hub. [C]
17. **About / the glasshouse story** as its own page, with Jane's story and provenance. [C+You] (a real portrait or approved Gemini portrait).
18. **Legal**: privacy + terms pages (real, brief, honest). [C]
19. **Structured data** (Product, LocalBusiness, BreadcrumbList) + canonical URLs + per-plant rich metadata. [C]
20. **Real opening hours, address and a tasteful map** on visit (currently invented hours + abstract map). [You provides the real details] [C builds]

### Phase 5 - Launch hardening   [quietly essential]

21. **Mobile + responsive pass** across every new page (the agents built desktop-first; audit each at 375px). [C]
22. **Accessibility audit**: focus states, reduced-motion on every effect, alt text on the new photos, colour-contrast on the dark theme, keyboard nav for the dial/configurator. [C]
23. **Performance**: convert source PNGs to optimised formats, confirm Core Web Vitals (LCP from the hero media, lazy WebGL), Lighthouse pass. [C]
24. **Analytics** (Vercel Analytics or Plausible) + basic event tracking on enquiries. [C]
25. **Decide the fate of the other three concepts** - keep at `/concepts` for reference, or remove to trim the bundle. [You decides]

---

## Asset checklist

**Stills I generate (Imagen 4, in `public/media/`):**
- [x] hero, glasshouse-day, glasshouse-night, leaf-macro, monstera, bird-of-paradise, calathea
- [ ] 9 remaining plants: fiddle-leaf-fig, pink-princess, string-of-pearls, zz-plant, snake-plant, marble-queen-pothos, rubber-plant, hoya-kerrii (+ confirm the 3 above are used on their pages)
- [ ] accessories: stoneware pot, terracotta, fluted planter, brass mister, moisture meter
- [ ] OG share image, Jane portrait (optional, your approval)
- [ ] care-state variants (thriving / yellowing / wilting) for the simulator

**Videos you generate (Gemini / Veo, prompts in `docs/VIDEO-PROMPTS.md`):**
- [ ] hero loop, growth time-lapse (as frames), leaf-macro loop, glasshouse ambiance, hire walkthrough, event reveal

---

## Suggested order of execution

Phase 1 first (it makes the live site genuinely "the real thing"), then your videos land and I wire Phase 2, then the wow set-pieces in Phase 3 one at a time, with Phase 4/5 threaded through. I can start Phase 1 immediately on your go - the highest single win is flipping Cinematic to the root and giving every plant a real photo.
