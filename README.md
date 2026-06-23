# Jane's Plants

The website for Jane's Plants, a premium independent houseplant shop and plant-hire studio working out of a glasshouse in Hertford. Retail (plants, pots, accessories, nutrients) and hire/styling for homes, offices and events.

This repo holds **four fully built art-direction prototypes** of the same brand, so we can see and feel each one before committing. Open the hub, scroll each concept, then pick the one to finish.

## Concepts

| Route | Direction | Feel |
|---|---|---|
| `/` | Concept hub | Pick one of the four |
| `/cinematic` | Cinematic Jungle | Lush, dark, atmospheric. Parallax foliage, a scroll-grown monstera, leaf-sprout cursor. |
| `/editorial` | Editorial Botanical | Light, magazine-grade calm. Fraunces type, self-drawing botanical plates, a horizontally-pinned plant index. |
| `/futuristic` | Futuristic Greenhouse | Bio-tech grow lab. WebGL grow-module, neon telemetry HUD, live environment console. |
| `/bioluminescent` | Bioluminescent Night-Garden | The glasshouse after dark. Glowing foliage, cursor-reactive fireflies, deep black. |

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** + **Tailwind CSS v4**
- **Motion** (`motion/react`), **GSAP 3** (ScrollTrigger, SplitText), **Lenis** smooth scroll
- **React Three Fiber** + drei for the WebGL concept
- All prototype visuals are generated (WebGL / canvas / SVG). Real photography and video come from Gemini later, marked in-page as labelled "media slots". See `docs/GEMINI-MEDIA.md`.
- Flask is planned as a thin backend for the enquiry/contact form (added once a direction is chosen).

## Run locally

Needs Node 22.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Docs

- `docs/ROADMAP.md` — full build roadmap and implementation plan
- `docs/GEMINI-MEDIA.md` — the photo/video shot list and generation sequence
- `docs/RESEARCH-*.md` — research that informed the design (reference business, award sites, stack, design principles, creative brief)

## Deploy

Deploys to Vercel; the production domain is janesplants.com (DNS to be pointed at Vercel once a concept is chosen).
