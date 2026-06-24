# Jane's Plants - video prompts for Gemini (Veo)

Paste each prompt into Gemini's video tool. They are written to match the cinematic stills already on the site (same dark, misty, backlit "glasshouse" grade), so the whole thing reads as one film.

How to use:
- Generate at **16:9**, the highest quality and longest length offered (aim for 8 seconds).
- Veo adds sound; choose **no music / ambient only**, or mute on export. The site plays all video muted.
- Save each file with the **filename in bold** into `public/media/` and tell me; I wire it in.
- For the growth time-lapse, if Gemini lets you **export frames / download as image sequence**, do that; otherwise send the clip and I will frame-extract it.
- If a clip will not loop cleanly, that is fine - I crossfade or fade it under the content.

Shared look to keep in mind (already baked into the prompts): cinematic, shot on Arri Alexa, 85mm, shallow depth of field, volumetric backlight, soft mist, dew droplets, deep forest-green and aged-brass palette, near-black background, photoreal, premium editorial, no text, no people.

---

## 1. Hero loop  -  **hero-loop.mp4**  (home hero background)
Used behind the headline. Slow, hypnotic, seamless.

> A slow, dreamlike cinematic push-in through a dark humid Victorian glasshouse at golden hour. A giant Monstera deliciosa with dramatic split leaves stands centre, backlit by soft shafts of light cutting through drifting mist. Tiny dust and pollen particles float in the light beams. Foliage in deep forest green recedes into near-black shadow on either side. The camera drifts forward almost imperceptibly and the mist curls gently. Shot on Arri Alexa, 85mm, shallow depth of field, volumetric backlight, photoreal, premium editorial, deep green and aged-brass palette, no people, no text. Calm, atmospheric, seamless loop.

## 2. Growth time-lapse  -  **growth.mp4** (scroll set-piece, seed to plant)
This drives a scroll animation, so a clean dark background and a clear single subject matter most. Export as frames if you can.

> A mesmerising botanical time-lapse on a seamless near-black background: a single seed sprouts, a pale green shoot rises and uncurls, then a young Monstera deliciosa grows leaf by leaf, each new leaf unfurling and splitting open with fenestrations, reaching toward a soft overhead light. Centered, symmetrical, the plant fills more of the frame as it grows. Subtle volumetric light and a faint chartreuse glow on the new growth, dew on the leaves. Shot on Arri Alexa, macro, shallow depth of field, photoreal, premium editorial, deep green palette, pure dark background, no pot visible until the end, no people, no text.

## 3. Leaf-macro loop  -  **leaf-loop.mp4** (section accent)
A small jewel-like loop for section backgrounds.

> Extreme slow-motion macro of a single Monstera leaf in near-darkness. A water droplet slowly travels along a glowing chartreuse-green vein and trembles at the leaf edge, catching a pin of light. Faint mist drifts behind. The leaf surface glistens. Shot on Arri Alexa, 100mm macro, razor-shallow depth of field, volumetric backlight, deep green and black, photoreal, jewel-like, no people, no text, seamless and slow.

## 4. Glasshouse ambiance, day  -  **glasshouse-day.mp4** (day-mode background / visit)
The bright, inviting counterpart for the day theme.

> A gentle cinematic drift through the interior of a beautiful independent houseplant shop set inside a Victorian glasshouse, soft bright morning daylight pouring through misted glass panes. Lush layered indoor plants, terracotta and hand-thrown stoneware pots on timber benches, motes of dust floating in the light. The camera glides slowly down the central aisle. Airy, calm, inviting, cream and green palette, photoreal, shot on Arri Alexa, shallow depth of field, no people, no text, seamless.

## 5. Glasshouse ambiance, night  -  **glasshouse-night.mp4** (day/night dial + night mode)
The magical after-dark version for the day/night toggle.

> The same Victorian glasshouse plant shop after dark. Plants glow softly under warm horticultural grow lights, faint magenta and cyan light bleeding through drifting mist, dew catching the light. The camera glides slowly down the central aisle past glowing foliage. Moody, magical, hushed, deep near-black with luminous greens, photoreal, shot on Arri Alexa, shallow depth of field, slow drifting fireflies of light, no people, no text, seamless.

## 6. Hire walkthrough  -  **hire-walkthrough.mp4** (hire page)
Proof that they style real spaces.

> A slow cinematic dolly through a beautifully styled modern living space filled with statement houseplants: a tall Bird of Paradise by a window, trailing pothos on a shelf, a Monstera in a sculptural pot. Warm natural light, soft shadows, editorial interiors photography feel, calm and aspirational. The camera glides smoothly through the room revealing the planting. Photoreal, shot on Arri Alexa, shallow depth of field, deep green accents, warm neutral interior, no people, no text, seamless.

## 7. Event / wedding foliage reveal  -  **event-reveal.mp4** (hire page, events)
For the events and weddings line.

> A cinematic reveal of a lush foliage installation for an event: a green archway and aisle of dense leaves, ferns and trailing greenery, soft romantic light, a few candles glowing, mist in the air at dusk. The camera slowly cranes up to reveal the full installation. Elegant, atmospheric, editorial wedding film aesthetic, deep greens with warm candlelight, photoreal, shot on Arri Alexa, shallow depth of field, no people, no text, seamless.

---

### Optional extras (only if you are enjoying it)
- **plant-turntable-monstera.mp4** - "A Monstera deliciosa in a terracotta pot rotating slowly 360 degrees on a turntable against a seamless near-black background, even soft studio lighting with a subtle rim light, photoreal, no people, no text." (One per hero plant turns the plant page into a true 3D inspector.)
- **pollen.mp4** - "Slow drifting glowing pollen and spores against pure black, soft bokeh, chartreuse and warm white particles, seamless." (Atmospheric overlay.)

---

## Still to generate (everything you have not sent yet)

You have provided: hero-loop, growth, leaf-loop, glasshouse-day, hire-walkthrough, event-reveal, and the Monstera turntable. These are the rest. Same settings: 16:9, 8s, no music, save with the bold filename into `public/media/video/`.

### 1. The night glasshouse (completes the Day/Night dial)
**glasshouse-night.mp4**
> The same Victorian glasshouse plant shop after dark. Plants glow softly under warm horticultural grow lights, faint magenta and cyan light bleeding through drifting mist, dew catching the light. The camera glides slowly down the central aisle past glowing foliage. Moody, magical, hushed, deep near-black with luminous greens, photoreal, shot on Arri Alexa, shallow depth of field, slow drifting fireflies of light, no people, no text, seamless.

### 2. Plant turntables (one per plant -> a true rotating 360 inspector on each plant page)
Use this template, swapping in the plant and pot. Save each as `turntable-<slug>.mp4` exactly as named below, and I light up that plant's inspector with one line of code.

> A [PLANT] in a [POT] rotating slowly and smoothly through a full 360 degrees on a turntable, centred against a seamless near-black background, even soft studio lighting with a gentle rim light, faint volumetric haze, deep forest-green and aged-brass palette, photoreal, premium product cinematography, no people, no text, seamless loop.

| Filename | [PLANT] | [POT] |
|---|---|---|
| **turntable-bird-of-paradise.mp4** | a tall Strelitzia nicolai bird of paradise with broad paddle-shaped leaves | a matte stoneware pot |
| **turntable-fiddle-leaf-fig.mp4** | a Ficus lyrata fiddle leaf fig with large glossy violin-shaped leaves | a matte stoneware pot |
| **turntable-pink-princess-philodendron.mp4** | a Philodendron Pink Princess, dark leaves splashed with bright pink | an aged terracotta pot |
| **turntable-calathea-orbifolia.mp4** | a Calathea orbifolia with round silver-and-green striped leaves | a matte stoneware pot |
| **turntable-string-of-pearls.mp4** | a Senecio string of pearls, long strands of round green beads cascading down | a raised stoneware pot |
| **turntable-zz-plant.mp4** | a ZZ plant with upright glossy dark-green oval leaves | a matte stoneware pot |
| **turntable-snake-plant.mp4** | a Sansevieria snake plant with tall upright sword-like leaves edged in yellow | a matte stoneware pot |
| **turntable-alocasia-zebrina.mp4** | an Alocasia zebrina, arrow-shaped leaves on zebra-striped stems | a matte stoneware pot |
| **turntable-marble-queen-pothos.mp4** | a marble queen pothos with cream-and-green marbled trailing leaves | a raised stoneware pot |
| **turntable-rubber-plant.mp4** | a Ficus elastica rubber plant with glossy deep burgundy-green leaves | a matte stoneware pot |
| **turntable-hoya-kerrii.mp4** | a Hoya kerrii, a single plump heart-shaped succulent leaf | a small stoneware pot |

### 3. Optional ambient overlay
**pollen.mp4** (prompt above, in Optional extras).
