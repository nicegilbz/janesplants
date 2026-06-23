# Jane's Plants — Gemini media plan

Real photography and video are the product here, not decoration. Generate them with Gemini once you have picked an art direction, so everything matches one grade.

## Sequence (the important bit)

1. Look at the 4 prototypes, pick the direction.
2. Generate the **FIRST batch (F1 to F5)** in that direction's look and send them to me. These gate the real design.
3. I wire them into the chosen prototype and we lock the hero.
4. Generate the **LATER batch (L1 to L7)** during the build, once the final plant range is set.

Do not generate the whole library up front. Hero first, catalogue during build.

## Global style token (append to every prompt)

> cinematic, shot on Arri Alexa, 85mm macro, shallow depth of field, volumetric backlight, soft mist and haze, dew droplets, deep forest-green and brass palette, near-black background, ultra-detailed, photoreal, no text, premium editorial

Keep one consistent house grade across the whole set so the catalogue reads as one glasshouse. (For the editorial direction, lighten the grade to cream and daylight; for bioluminescent, push to near-black with glow.)

## FIRST batch — gates design

| ID | Asset | Spec | Used on |
|---|---|---|---|
| F1 | Hero video loop (foliage, mist, golden hour, slow dolly push-in) | 3840x2160 16:9, AV1/WebM loop + MP4 + poster | Home hero background |
| F2 | Growth time-lapse (seed to mature Monstera, dark seamless bg). Most important single asset. Request as a PNG frame sequence for scroll-scrubbing | 2160x2160 1:1 + 1080x1920 9:16, PNG frames + WebM | Home/Story scroll set-piece |
| F3 | Hero specimen stills x3 (Monstera, Bird of Paradise, Calathea, fashion lighting) | 3000x4000 3:4, PNG (transparent + on-bg) | Value-prop blocks, featured cards |
| F4 | Day vs Night glasshouse pair (for the toggle reveal) | 3840x2160 16:9 each, JPG | Day/Night dial bg; Visit page |
| F5 | Single-leaf macro loop (droplet running down a vein, chartreuse glow) | 1920x1080 16:9, AV1/WebM loop | Section background, care accents |

## LATER batch — during build, after the range is locked

| ID | Asset | Spec | Used on |
|---|---|---|---|
| L1 | 360 turntable per hero product (36 frames, in a terracotta pot) | 2000x2000 1:1 PNG sequence | 3D inspector on /plant |
| L2 | Product grid stills, full catalogue (consistent system) | 1600x2000 4:5 PNG (transparent + on-bg) | /shop cards |
| L3 | Leaf-vein extreme macro stills | 2400x1600 3:2 JPG | Care hotspots, plant detail, journal headers |
| L4 | Walk-through wide panorama video | 5120x2160 21:9 MP4/WebM | /story horizontal scroll |
| L5 | Care-state variants x4 per plant (thriving / yellowing / wilting / overwatered) | 1600x1600 1:1 PNG set | /care simulator |
| L6 | Watering / droplet macro loop | 1920x1080 16:9 AV1/WebM loop | Care watering interaction, configurator |
| L7 | Pollen / spore particle plates (+ optional Jane portrait, with approval) | 3840x2160 16:9 PNG + 3000x4000 3:4 JPG | Night particles, dividers; /story, /visit |

## Delivery spec

- Seamless loops with clean in and out points.
- Video: AV1/WebM primary + H.264 MP4 fallback + a poster still.
- Stills at 2x retina; transparent PNGs where a plant sits on different backgrounds.
- Raw Gemini files never ship directly. They go into Vercel Blob (public store only) and through a transcode-on-ingest step (`next/image` for photos, Mux or pre-encoded WebM for video).

The prototypes already mark where each asset drops in, using these IDs as on-screen "media slot" labels.
