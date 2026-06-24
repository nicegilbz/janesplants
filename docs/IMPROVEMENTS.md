# Jane's Plants - Improvement Audit

From a three-part audit (copy/tone, design/UX, performance). Tone of voice and copy rules are in `TONE-OF-VOICE.md`. Status: **[done]** applied this pass, **[proposed]** awaiting a go.

## Done this pass
- **Copy / tone (UK):** removed the worst Americanisms and boilerplate (curating, imperial inches -> cm, "living green" -> greenery, "people queue" -> "sell the moment they land", "bring on the fussy ones" -> "happy with the fussy ones"), and de-duplicated the brand statement (rewrote `BRAND.mission` to be Hertford-glasshouse-specific so the Hero, manifesto and mission no longer say the same thing three times). Full guide in `TONE-OF-VOICE.md`.
- **Defect: prototype text live.** The home `Visit` section rendered a second `<footer>` ending "Concept 01 / Cinematic Jungle", duplicating the real `SiteFooter` and leaking prototype language. Removed.
- **Defect: day-theme contrast.** Day `--c-sage`/`--c-brass` were ~3.4-4.3:1 on cream (below WCAG AA for body text). Darkened to ~5:1.
- **Defect: 360 turntable over-promise.** "360 turntable" + "Drag to rotate" now only show on plants that actually have a turntable video; still-only plants say "Move to inspect".
- **Perf:** `next.config` now enables AVIF, a 31-day image cache, `qualities`, and `Cache-Control: immutable` headers for `/media/*` (videos + posters bypass next/image, so this is what caches them). Hero video `preload="metadata"` (was defaulting to "auto" = full eager download).

## Proposed - design (biggest levers first)
1. **Edit the motion budget (high impact).** The home has two pinned scroll-jackers back to back (`GrowthScrub` then `CarePhilosophy`) and two "growing plant" metaphors next to each other (the procedural SVG monstera and the `GrowthScrub` video). Cut one growth piece and keep only one pinned section per page. Subtraction is the main "great -> exceptional" move.
2. **The conversion funnel.** Every CTA is "Enquire", but prices and a configurator basket total are shown. Decide the model (concierge/reserve vs real checkout). At minimum, pass the configurator's chosen plants + total into the enquiry form as hidden fields (right now "Enquire about this jungle" carries nothing about the bundle).
3. **Image treatment consistency.** A plant currently appears three ways within two scrolls: HoverImage (WebGL, object-cover), plain next/image (configurator result), and the abstract `PlantEmblem` SVG (plant page "pairs well with"). Standardise on one `<PlantThumb>` everywhere a real photo exists.
4. **Give day mode its own scrims.** Many overlays/vignettes are hard-coded to night `rgba(6,12,8,…)` / `rgba(12,20,16,…)` and sit dark on the cream day theme. Promote them to `--c-overlay` / `--c-photo-scrim` vars with light day values so day is a real theme, not a tint.
5. **Smaller:** day/night toggle re-keys the hero `<video>` (black flash) - cross-fade instead; enquiry form needs instant client-side validation (email/format) not just the Flask 422 round-trip; `Stats` count-up on the always-100% stat adds nothing; `DayNightDial` has a dead `compact` prop; `CarePhilosophy` pin needs a `totalShift < 1` bail for ultra-wide screens.

## Proposed - performance (biggest win first)
1. **Lazy-load three.js (high).** `HoverImage` statically `import * as THREE from "three"` at the top, so all of three.js parses on the home route even though WebGL only fires on hover. Load it inside `initGL()` via `await import("three")`, or wrap HoverImage in `next/dynamic({ssr:false})` (the futuristic route already does this for its WebGL).
2. **Pre-convert the source media.** `public/media` is ~51 MB (27 PNGs at 0.8-1.7 MB, 7 mp4s at ~2.5 MB). Re-export the PNGs to AVIF/WebP at sensible max sizes (most render <=640px wide) and re-encode the hero/loop videos smaller (720p AV1/WebM + H.264 fallback). The hero poster especially is a 1.3 MB raw PNG that bypasses next/image.
3. **Scope per-art-direction fonts.** Root layout loads 5 next/font families globally; the cinematic site never uses Space Grotesk (only `/futuristic` does). Move concept fonts into their own route layouts.
4. **Intersection-based video play/pause** for the below-fold autoplay clips (growth, leaf-loop) so off-screen video does not decode.
5. **`CursorLeaves`** runs its rAF loop forever; gate it on having leaves + `document.visibilityState`.

## Copy: lines still worth a human eye
The legal pages (`/privacy`, `/terms`) and any future journal posts should be checked against `TONE-OF-VOICE.md` (British spelling, no "store"/"fall", £ formatting, no exclamation marks). The writing is ~80% there already; the fixes above remove the few real offenders.
