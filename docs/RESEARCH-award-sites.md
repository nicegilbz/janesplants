I have more than enough to produce a rich, concrete deliverable. Writing it now.

---

# Best-in-Class Dynamic Websites (2024-2026) — Technique Catalogue for janesplants.com

A field guide to the most awarded, technically ambitious sites of the last two years, decoded into copyable techniques. Sites are grouped roughly by what makes them worth stealing from. Plant/nature/organic/skincare relevance is flagged where it exists. The prioritised **TECHNIQUE MENU** at the end maps each effect to the named reference that does it best.

---

## TIER 1 — The WebGL flagships (the "how is this a website" tier)

### 1. Igloo Inc — `igloo.inc`
**Studio:** Abeto (dev) + Vicente Lucendo. **Awwwards Site of the Year 2024 + Developer Award.**
The single most-referenced site of the cycle and the gold standard for scroll-as-camera.
- **Entire UI rendered inside WebGL** — even the text/menu are shader-driven, not DOM. This lets every interaction share one lighting/material system.
- **Scroll drives a single 3D camera descent.** A monolithic ice "shard" rotates on GSAP-eased scroll; descending the page reveals sub-ventures hidden in the iceberg (an "iceberg metaphor" — one object, many stories revealed by depth).
- **Procedurally grown ice crystals**, **HDRI-lit reflections** that shimmer as the shard turns, shader-driven displacement.
- Stack: Three.js + Svelte + GSAP + Vite.
- **Why it matters for Jane:** swap the ice shard for a hero plant/leaf/terrarium — one beautiful 3D object you orbit and descend into as scroll reveals collections. This is the most directly transposable "wow" concept on the list.

### 2. Lusion v3 — `lusion.co`
**Studio:** Lusion (London). **Awwwards Site of the Year 2024 (Users' Choice) + multiple Site of the Month.**
- Real-time interactive 3D throughout; **fluid/particle simulations** and **GPU-driven post-processing**.
- Buttery **inertia everything** — cursor, scroll, and 3D camera all share momentum so the whole site feels like one physical material.
- Reference for: shader transitions between sections, depth-of-field focus pulls, and a cursor that pushes/distorts the scene around it.

### 3. Active Theory — `activetheory.net`
**Studio:** Active Theory (LA). **Webby "Crafted with Code" winner; the US heavyweight.**
- **Full-screen WebGL project previews** with fluid transitions between content states — thumbnails morph/dissolve into full case studies rather than hard page loads.
- Industry-leading in-house toolset; their portfolio doubles as a transition showreel (curtain, dissolve, displacement swaps).

### 4. Bruno Simon Portfolio — `bruno-simon.com`
**Creator:** Bruno Simon (Three.js Journey). **The famous drivable portfolio.**
- **Playable 3D world** — you drive a toy car around a physics playground (Three.js + Cannon.js, real-time collision).
- Not literally for a plant brand, but the lesson is **"navigation as toy"** — making movement itself fun. A draggable/clickable plant world borrows this energy at lower cost.

### 5. Messenger — `messenger.abeto.co`
**Studio:** Abeto (Vicente Lucendo + Michael Sungaila). **FWA/Awwwards.**
- Real-time WebGL **tiny planet** you walk a character around; multiplayer via WebSocket; `three-mesh-bvh` for collision; assets from Blender/Houdini, optimised to a 5.7 MB base.
- Reference for: **spherical "tiny planet" worlds** — a great metaphor for a brand's "ecosystem" of plants.

---

## TIER 2 — Scroll-driven cinematic storytelling (most copyable for a product brand)

### 6. Lando Norris (F1) — by **OFF+BRAND**
- **Cinematic scroll sequences:** a **rotating 3D helmet tracks scroll position** (scroll = rotation), with **lime-green kinetic typography** punctuating each beat.
- Template for a product hero: a single 3D product (a planter, a bottle, a seed pod) that **rotates and disassembles as you scroll**.

### 7. Scout Motors
- **3D product configurator** woven into the scroll narrative — exploration paths and immersive e-commerce flow, tuned for conversion (rare: ambitious 3D that still sells).
- Reference for the **"configure your plant/pot"** experience without it feeling like a gimmick.

### 8. Terminal Industries
- **Restraint as a technique:** subtle micro-animations and **scroll-triggered 3D→wireframe transitions**, sparse reveals.
- The antidote to over-doing it — proof that "premium" can be quiet. Good calibration reference so Jane's site doesn't tip into noisy.

### 9. Microsoft.ai — by **Adveris**
- **Soft "vegetal" shaders, tone-on-tone textures, journal-like scroll rhythm** with tonal transitions between sections.
- Directly nature-adjacent: this is exactly the *organic, calm, premium* shader mood a plant brand wants. Study the colour transitions and grain.

### 10. Cartier "Watches & Wonders 2025" — by **Immersive Garden**
- **Narrative-driven luxury scroll**; sensory translation of a physical product into paced digital chapters.
- The luxury-pacing reference: slow, confident, each scroll beat earns its reveal.

---

## TIER 3 — The studios whose *house style* you should mine

### 11. Immersive Garden — `immersivegarden.com`
**Site of the Month Jan 2025; David Whyte Experience = Site of the Day Jan 2026.**
- **Bas-relief 3D** — sculpted, tactile organic surfaces (assets crafted in Blender / Houdini / ZBrush, rendered via Three.js with custom shaders).
- **Everything dynamic & interactive** via custom shaders. This studio is the closest match to a high-end botanical aesthetic — sculptural, natural, textured. **Primary mood reference.**

### 12. Obys Agency — `obys.agency`
- **Kinetic typography system:** letters **scale, split, and morph during scroll**; heavy editorial type as the main visual.
- Built with GSAP + Shery.js + Locomotive/Lenis. Reference for **type-led** sections between the plant visuals.

### 13. Locomotive — `locomotive.ca` (studio site, **Site of the Month**)
- Makers of Locomotive Scroll (now v5, built **on top of Lenis**). Their own site is the canonical **smooth-scroll + parallax + in-view reveal** showcase.

### 14. Aristide Benoist — `aristidebenoist.com`
**Independent dev; clients: Netflix, A24, Steve Jobs Archive, Universal.**
- Signature **motion-and-interaction** craft: **WebGL displacement transitions, magnetic/elastic hover, refined custom cursors.** Best single reference for *interaction polish* (the small stuff that reads as "expensive").

### 15. Noomo Agency — `noomoagency.com` (LA)
- **Awwwards "Website of the Year" winner.** Immersive **3D + WebGL/WebGPU storytelling** for US brands. US-market sensibility reference.

### 16. Studio Lumio — `studiolumio.com`
- **Monochrome WebGL portfolio**, designer–developer duo. Reference for achieving a strong impression on a *lean* budget — disciplined, single-accent, shader-light-but-effective.

### 17. Merci-Michel "Egg Hunt" — `egghunt.merci-michel.com`
- **WebGL timing game** on floating rocks (custom engine + GSAP + Blender). Reference for an optional **interactive/gamified easter-egg** moment (a plant-care mini-game, a "grow your plant" interaction).

### 18. Codrops (Tympanus) — the open-source technique library
Not a brand site, but **the source you copy the actual code from.** Battle-tested demos for:
- **WebGL distortion / liquid hover effects** (displacement-map image hovers).
- **Creative WebGL image transitions** (fragment-shader crossfades between images).
- **Image trails / mouse-trail** effects.
- **Page transitions** with layered `clip-path` reveals, and **View Transitions API + Astro** guides.

---

## Cross-cutting technical vocabulary observed across these sites

| Category | What the winners actually use |
|---|---|
| **Smooth scroll** | **Lenis** is the de-facto standard (Locomotive v5 is built on it). Used by virtually every site above. |
| **Scroll scenes** | GSAP **ScrollTrigger** / ScrollSmoother to drive 3D camera, rotation, pinned sections, scrubbed timelines. |
| **3D** | **Three.js** dominates; **React Three Fiber** for React stacks; **WebGPU** (with WebGL fallback) is the 2025-26 bleeding edge (Samsy, IVRESS, Ameen Abdullah's sakura scene). |
| **Physics** | Cannon.js / Rapier (3D), **Matter.js** (2D draggable shapes, falling/colliding elements). |
| **Type** | Split-text mask reveals, kinetic morphing type, variable fonts (Obys, Lando Norris). |
| **Transitions** | WebGL displacement swaps, curtain/morph, **View Transitions API** (now 85%+ support, cross-document in Chrome 126+) for shared-element page morphs. |
| **Interaction polish** | Custom cursors, **magnetic buttons**, hover distortion, image trails (Aristide Benoist, Codrops). |
| **Components shelf** | **Osmo.supply** — ready-made Webflow/JS components (35+ Awwwards SOTD pedigree) for cursors, marquees, page transitions. |

---

# ⭐ TECHNIQUE MENU — prioritised for janesplants.com

Ranked by impact-to-effort for a *premium plant brand*. Each is tagged with the best site to copy.

**P0 — Foundation (do these first; they make everything feel expensive)**

1. **Lenis inertia smooth-scroll** across the whole site. The single highest baseline-quality win. → *Ref: Locomotive / Lenis (lenis.darkroom.engineering).*
2. **Split-text mask reveals** on every heading (lines slide up from behind a mask on enter). Cheap, universal, instantly "designed." → *Ref: Obys Agency.*
3. **Scroll-scrubbed hero 3D plant** — one beautiful hero object (a leaf/monstera/terrarium) that **rotates as you scroll** the first viewport. → *Ref: Lando Norris (OFF+BRAND) for the rotation mechanic; Igloo Inc for the descent metaphor.*
4. **Custom cursor + magnetic buttons** with elastic hover on CTAs and product cards. → *Ref: Aristide Benoist.*

**P1 — Signature moments (the share-worthy "wow")**

5. **WebGL displacement hover on product imagery** — leaf/water-ripple displacement map distorts the photo on hover, liquid crossfade between two shots. → *Ref: Codrops "WebGL Distortion Hover" + "Creative WebGL Image Transitions."*
6. **"Descend into the object" scroll metaphor** — adapt Igloo's single-object-reveals-collections concept: scroll through a plant/terrarium and collections emerge from within. → *Ref: Igloo Inc.*
7. **Organic, vegetal tone-on-tone shader background** with film grain and slow tonal transitions between sections (the calm, premium mood). → *Ref: Microsoft.ai (Adveris) + Immersive Garden bas-relief.*
8. **Scroll-driven product story** — a planter/bottle that gently disassembles or "grows" (soil → sprout → bloom) as you scroll its section. → *Ref: Scout Motors (configurator-in-scroll) + Cremeri (products that animate in on scroll).*

**P2 — Polish & delight (layer in once P0/P1 land)**

9. **View Transitions API page morphs** — product thumbnail smoothly flies/expands into the product hero on navigation (shared-element). → *Ref: Astro View Transitions guide (Codrops/Astro docs).*
10. **Image trail on the hero / lookbook** — a faint trail of leaf or product images follows the cursor. → *Ref: Codrops image-trail demos.*
11. **Matter.js physics drop** — a playful "tip the jar" or falling-seeds/leaves section where draggable 2D elements collide and settle. → *Ref: Matter.js draggable-shapes pattern (brm.io / Osmo).*
12. **Infinite marquee** of plant names / testimonials / "as seen in," speed-reactive to scroll. → *Ref: Obys / Osmo.supply components.*
13. **Horizontal-scroll collection gallery** — a pinned section that scrolls sideways through the range. → *Ref: Unseen Studio 2025.*

**P3 — Stretch / optional (high cost, high ceiling)**

14. **Interactive "grow your plant" mini-moment** — a small gamified easter egg (water it, watch it sprout) for repeat-visit delight. → *Ref: Merci-Michel "Egg Hunt."*
15. **Tiny-planet ecosystem view** — a spherical WebGL world you orbit, each plant a place on the globe. → *Ref: Messenger (Abeto).*

**Guardrail (read before building):** the most respected premium sites pair the spectacle with **restraint** — quiet, paced, one strong idea per section. Use *Terminal Industries* as your "don't overdo it" calibration so the botanical mood stays luxurious rather than busy, and keep WebGL on a strict performance/asset-size budget (Messenger shipped its world at ~5.7 MB).

---

### Key source URLs (for building the moodboard)
- Igloo Inc case study — https://www.awwwards.com/igloo-inc-case-study.html · live https://www.igloo.inc/
- Lusion — https://lusion.co/ · Active Theory — https://activetheory.net/
- Immersive Garden — https://www.awwwards.com/immersivegarden/ · David Whyte experience case study on Awwwards
- Obys — https://obys.agency/ · Aristide Benoist — https://aristidebenoist.com/ · Noomo — https://noomoagency.com/ · Studio Lumio — https://studiolumio.com/
- Lenis — https://lenis.darkroom.engineering/ · Locomotive Scroll docs — https://scroll.locomotive.ca/
- Codrops technique demos — https://tympanus.net/codrops/ (distortion hover, WebGL image transitions, page transitions, View Transitions+Astro)
- Osmo component library — https://www.osmo.supply/collection
- Organimo (organic product scroll, SOTD) — https://www.awwwards.com/sites/organimo · Cremeri (organic skincare 3D scroll) — https://dribbble.com/shots/22520763-CREMERI-Organic-Skincare-Products-Web
- Metabole immersive-examples breakdown (Lando Norris, Scout, Terminal, Microsoft.ai, Cartier) — https://metabole.studio/en/blog/immersive-website-examples
- Best Three.js portfolios 2025 (Bruno Simon, Samsy/WebGPU, Messenger, Egg Hunt) — https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025