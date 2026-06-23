I have comprehensive, well-sourced material across all five requested areas. Synthesizing now into the deliverable.

---

# Building "Unreal" Websites with Claude: The Distilled Playbook

A research synthesis of award-site design criteria, motion-design specs, and the prompting patterns (including Anthropic's own internal directives) that consistently push an AI builder from "template" to "screenshot-worthy." Sources at the end.

The single most important finding: **Anthropic ships an official anti-"AI slop" system prompt.** LLMs converge on generic output by default ("on distribution"). Premium output is not a model capability you unlock — it's a set of explicit constraints you impose. Everything below is built to be pasted into a `CLAUDE.md`, system prompt, or a `frontend-design` skill.

---

## 1. CORE DESIGN DIRECTIVES

The rules that separate award sites from templates. (Awwwards weights judging roughly **Design 40% / Usability 30% / Creativity 20% / Content 10%** — so visual craft and usability dominate, but the screenshot factor lives in that Creativity 20%.)

**Typography — the instant quality signal**
- **Ban the defaults by name.** Never Inter, Roboto, Open Sans, Lato, Arial, or system fonts. These read as "AI slop" instantly. (Note: Claude *also* over-converges on Space Grotesk — call it out too.)
- **Pick one distinctive face and commit.** Editorial: Playfair Display, Crimson Pro, Fraunces, Newsreader. Startup/display: Clash Display, Satoshi, Cabinet Grotesque, Bricolage Grotesque. Technical/code: JetBrains Mono, Fira Code, IBM Plex. State the choice *before* writing code.
- **High-contrast pairing = interesting.** Display + monospace, or serif + geometric sans. A single variable font flexed across weights also works.
- **Use extremes, not middles.** Weight contrast of 100/200 against 800/900 (not 400 vs 600). Size jumps of **3x+, not 1.5x.** Timid scales look unconsidered.

**Grid, whitespace & restraint**
- Build on an **8-point spacing grid** so everything snaps to a rhythm.
- Whitespace is the premium tell — Japanese-influenced "do less, better." Negative space is *active*, not leftover. Judges read hierarchy in seconds; let one thing breathe.
- **Restraint over density:** "The discipline to do less, better, rather than packing every page with effects."

**Color for a premium feel**
- **Commit to a cohesive aesthetic** and drive it with **CSS variables** (design tokens) so it holds across every page — consistency on page 5, not just the homepage, is a scored criterion.
- **Dominant color + sharp accent beats a timid, evenly-distributed palette.** 2–3 colors max for the base system.
- Draw palettes from **outside web defaults** — IDE themes, magazine/editorial traditions, cultural aesthetics — rather than generic brand-blue.
- **The most-flagged cliché to avoid: purple gradients on white.** It's the visual signature of generic AI output.

**Backgrounds = atmosphere**
- Never default to a flat solid. Layer CSS gradients, geometric patterns, grain/noise, or contextual effects to create **depth and atmosphere** that match the theme.

**Consistency as a system**
- Tokenise color, type scale, spacing, radius, shadow, and motion. A design system that "holds across every page, not just the homepage" is what makes a site feel professional rather than fragmented.

**The "one hero moment" principle (the single biggest lever)**
- Every recent Site-of-the-Day winner shares **one** signature interaction or visual that makes you stop scrolling — *not twenty effects, one unforgettable one.* Spend your animation/creativity budget on a single orchestrated moment, not scattered confetti.

---

## 2. MOTION DESIGN PRINCIPLES

What separates tasteful motion from gimmicky motion: **does it serve the narrative/feedback, or is it decoration?** Motion should "guide users, provide feedback, and create immersion" — never distract.

**Duration (Material Design baselines)**
- **Desktop: 150–200ms** for most transitions (desktop should be faster and simpler than mobile).
- **Mobile standard transition: ~300ms;** large/full-screen: ~375ms; **enter: 225ms; exit: 195ms** (exits are quicker — get out of the way).
- **Hard ceiling ~400ms** — beyond that, motion *feels* slow.
- Scale duration to distance travelled and surface change; don't use one duration for everything.

**Easing (cubic-bezier values)**
- **Standard / ease-in-out** — `cubic-bezier(0.4, 0, 0.2, 1)` — the default workhorse for on-screen moves; quick accelerate, slow decelerate.
- **Decelerate (enter)** — `cubic-bezier(0, 0, 0.2, 1)` — elements arriving on screen.
- **Accelerate (exit)** — `cubic-bezier(0.4, 0, 1, 1)` — elements leaving.
- **Sharp** — `cubic-bezier(0.4, 0, 0.6, 1)` — for elements that may return.
- **Never linear** for UI motion — linear reads robotic. Bezier curves feel organic.

**Stagger & orchestration**
- Use `transition-delay` / `animation-delay` to stagger reveals (menu items sliding in one-by-one) — this *creates hierarchy and relationship*, establishing rhythm and pacing.
- **One well-orchestrated page load with staggered reveals delivers more delight than scattered micro-interactions** (Anthropic's explicit guidance).

**Scroll choreography**
- Treat scroll as **narrative pacing** — motion timing serves content pacing, not spectacle. Parallax (layers at different speeds) creates depth; scroll-triggered reveals pace the story.
- Tie key beats to scroll position so the user *drives* the reveal.

**Performance & accessibility (non-negotiable for "award" tier)**
- Animate **`transform` and `opacity` only** — they're GPU-composited and avoid layout thrashing/reflow.
- Target **60fps desktop / 45–50fps mobile** — winners prove visual impact and performance coexist.
- **Honour `prefers-reduced-motion`** — provide a reduced/none path for motion-sensitive users.

**Tasteful vs gimmicky, in one line:** tasteful motion is *fast, purposeful, and you barely notice it doing its job*; gimmicky motion is *slow, ubiquitous, blocks the content, and exists to show off*.

---

## 3. WOW-FACTOR FEATURE MENU (ranked by impact ÷ effort)

Signature moves that get a site screenshotted. **Pick ONE as the hero** (see §1) — stacking them is itself an anti-pattern.

| Rank | Feature | Impact | Effort | Notes |
|---|---|---|---|---|
| 1 | **Orchestrated page-load reveal** (staggered fade/translate, masked text wipes) | High | Low | Pure CSS `animation-delay`. The cheapest "designed" feeling there is — best ROI by far. |
| 2 | **Oversized expressive type as the hero** (display face, 3x+ scale, tight tracking) | High | Low | Typography *is* the art direction. No JS needed. |
| 3 | **Scroll-triggered reveals + parallax depth** | High | Med | Use sparingly to pace narrative; respect reduced-motion. |
| 4 | **Custom cursor** (magnetic, blend-mode, hover-reactive) | High | Med | Strong "they can build this" signal; an Awwwards staple. Keep a normal cursor fallback for usability. |
| 5 | **Atmospheric layered background** (animated gradient mesh, grain, geometric pattern) | Med-High | Low | Instant depth vs. a flat fill. |
| 6 | **Infinite marquee / ticker** (logos, words, direction + speed control) | Med | Low | Cheap motion that adds life to dead space. |
| 7 | **Magnetic / springy hover micro-interactions** on cards & CTAs (`translateY(-6px)` + deepened shadow) | Med | Low | Tasteful in moderation; gimmicky if everything wiggles. |
| 8 | **WebGL / shader hero** (particles, fluid, displacement on cursor) | Very High | High | The top-tier flex — but it must hit 60fps or it backfires. Reserve for when technical showmanship *is* the brand. |
| 9 | **3D / Rive-driven interactive object** | Very High | High | Cinematic; heavy. One hero object, not a scene. |

**Effort-aware default for an AI build:** ship #1 + #2 + #5 (all low-effort, all high-impact, all CSS-only) for a site that already looks premium, then invest remaining budget in exactly **one** of #4/#8/#9 as the screenshot moment.

---

## 4. BUILD / PROMPT INSTRUCTIONS (reusable directives for an AI builder)

Phrase these as standing instructions in `CLAUDE.md` / system prompt. The first block is **Anthropic's own distilled anti-slop prompt** — paste it verbatim, then layer the project-specific directives.

**A. Drop in the anti-slop block (verbatim, Anthropic Cookbook):**
> *You tend to converge toward generic, "on distribution" outputs… this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight.* — then its Typography / Color & Theme / Motion / Backgrounds sub-directives, plus the explicit avoid-list (Inter/Roboto/Arial/system fonts; purple gradients on white; predictable layouts; the Space Grotesk convergence trap).

**B. Reusable directives to add on top:**

1. **"Define the design system before any page."** Produce tokens first — type scale (with 3x+ jumps), 2–3 color palette as CSS variables, 8-pt spacing, radius, shadow, and a **motion spec** (durations + named easing curves) — then build against them.
2. **"State your distinctive font choice and overall aesthetic *in words* before writing code."** Force an explicit creative decision so it can't default.
3. **"Build a component library, not pages."** Generate hero, feature card, pricing, testimonial, CTA as discrete polished blocks, then compose. Yields more focused, polished UI.
4. **"Reference real inspirations by name, don't clone them."** Name IDE themes, magazine traditions, or specific award sites as *direction*, not templates. (Upload screenshots for "make it feel like this.")
5. **"Commit to ONE hero moment."** Identify the single signature interaction and lavish craft there; keep everything else calm.
6. **"Write the motion spec explicitly":** desktop 150–200ms, standard easing `cubic-bezier(0.4,0,0.2,1)`, decelerate-in / accelerate-out, staggered page-load reveals via `animation-delay`, animate transform/opacity only, honour `prefers-reduced-motion`.
7. **"Set a performance budget":** 60fps desktop / ~45–50fps mobile; transform+opacity only; convert images to WebP; lazy-load below the fold. Visual impact must not cost frames.
8. **"Be specific in every build prompt."** Goal + layout + content + audience + industry + visual direction. Banned: "make a nice landing page." Required shape: *"a [aesthetic] landing page for [audience] in [industry], hero with [specific moment], using [font], [palette]."*
9. **"Iterate visually."** Run it locally, screenshot, critique against the directives, refine. Treat the first generation as a draft, not the answer.
10. **"Run parallel quality audits before done":** WCAG/contrast, performance, and a hierarchy/consistency pass — "does the system hold on every page, not just the homepage?"

**C. Per-build prompt skeleton:**
> *Build [page] for [audience] in [industry]. Aesthetic: [named direction, e.g. "Swiss editorial meets terminal/IDE dark theme"]. Font: [distinctive choice] paired with [contrast face]. Palette: [dominant + accent] as CSS variables. Hero moment: [one signature interaction]. Motion: staggered page-load reveal, 150–200ms, standard easing, reduced-motion safe. Define the design tokens first, then build components, then compose. Avoid: Inter/Space Grotesk, purple-on-white, evenly-distributed palettes, scattered micro-interactions.*

---

## 5. ANTI-PATTERNS (what makes "dynamic" sites feel cheap or annoying)

**Visual / "AI slop" tells**
- Inter / Roboto / Arial / system fonts — and Claude's tic of defaulting to **Space Grotesk** even when told to be distinctive.
- **Purple gradient on a white background** (the canonical generic-AI signature).
- Timid, evenly-distributed palettes with no dominant color and no sharp accent.
- Modest type scale (1.5x jumps, 400-vs-600 weights) — reads as unconsidered.
- Flat solid backgrounds where atmosphere/depth was possible.
- Predictable, cookie-cutter layouts with no context-specific character.

**Motion that annoys**
- **Effect soup:** 20 animations competing instead of one hero moment.
- Animations **over ~400ms** (feels sluggish); **linear** easing (robotic).
- Scroll-jacking / motion that *blocks* reading or hijacks the scroll.
- Everything hovers, wiggles, and parallaxes at once — motion as decoration, not feedback.
- Animating layout-triggering properties (width/height/top/left) → jank and dropped frames.
- **Ignoring `prefers-reduced-motion`** — actively hostile to motion-sensitive users.

**Process anti-patterns**
- Skipping the design system and prompting page-by-page (architecture mistakes compound).
- Vague prompts ("a modern landing page") that hand the model permission to default.
- Letting visual impact override the performance budget — a stuttering WebGL hero is worse than no WebGL.

---

## Sources

- [Anthropic Cookbook — Prompting for frontend aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics) (the canonical anti-slop system prompt, font lists, weight/size directives)
- [Anthropic — Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills)
- [Anthropic — Introducing Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs)
- [Utsubo — Award-Winning Website Design: Judging Criteria Decoded](https://www.utsubo.com/blog/award-winning-website-design-guide) (Awwwards weights, hero-moment, restraint)
- [Awwwards](https://www.awwwards.com/) and [Typography in Web Design collection](https://www.awwwards.com/awwwards/collections/typography-in-web-design/)
- [Material Design — Duration & Easing (M1)](https://m1.material.io/motion/duration-easing.html) and [Easing and duration (M3)](https://m3.material.io/styles/motion/easing-and-duration) (ms values + cubic-bezier curves)
- [Slider Revolution — Motion Design Principles for Websites](https://www.sliderrevolution.com/design/motion-design-principles/) (tasteful vs gimmicky, performance, reduced-motion)
- [Designsystems.com — 5 steps for motion in a design system](https://www.designsystems.com/5-steps-for-including-motion-design-in-your-system/) and [Carbon Design System — Motion](https://carbondesignsystem.com/elements/motion/overview/)
- [How to Build Beautiful Websites with Claude Code — 5 techniques (Ayushi Parmar)](https://medium.com/@ayushi.parmar.2520/how-to-build-beautiful-websites-with-claude-code-5-practical-techniques-that-make-a-real-048db2ec8092)
- [Leon Furze — Building Websites with Claude Code](https://leonfurze.com/2026/02/14/building-websites-with-claude-code/) (design-system-first workflow, parallel audits)
- [Lovable — Best Interactive Websites](https://lovable.dev/guides/best-interactive-websites) and [Orpetron — Custom cursors](https://orpetron-team.medium.com/10-websites-with-exceptional-custom-cursors-for-inspiration-8c8222ff509c) (wow-factor features, WebGL/cursor 60fps benchmarks)