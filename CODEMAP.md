# CODEMAP: nicegilbz/janesplants
What it is: the website for Jane's Plants, an independent houseplant shop and plant-hire studio in a glasshouse in Hertford; the "Cinematic Jungle" concept was chosen and now serves at the root, with the other three concepts kept for reference.
Read first: [AGENTS.md](AGENTS.md) (this Next.js has breaking changes: read the guide in `node_modules/next/dist/docs/` before writing code). [CLAUDE.md](CLAUDE.md) just includes it.
Live at: https://www.janesplants.com (janesplants.com redirects to www). On 26.11 `/api/enquiry` and `/api/health` answered 404 to a plain GET, so the Flask backend may not be deployed.
Run it: Node 22, `npm install`, `npm run dev` (http://localhost:3000). Check a change: `npm run lint` and `npm run build`; no tests.

## Layout
| Path | What's there |
|---|---|
| `src/app/(site)/` | The real site: home, shop, `plant/[slug]`, hire, care and `care/[slug]`, journal and `journal/[slug]`, visit, about, build, privacy, terms |
| `src/app/concepts/`, `editorial/`, `futuristic/`, `bioluminescent/` | The concept hub and the three concepts not chosen |
| `src/app/` (root files) | Root layout and metadata (metadataBase janesplants.com), sitemap, robots, OG image, 404, globals.css |
| `src/components/cinematic/` | The chosen site's components (42), including `EnquiryForm.tsx` which posts to `/api/enquiry` |
| `src/components/editorial/`, `futuristic/`, `bioluminescent/` | Components for the other concepts |
| `src/components/` (top level) | `SmoothScroll` (Lenis), `ConceptNav`, `JsonLd` |
| `src/lib/content.ts` | Site content: brand, plants, categories, accessories, care steps, stats, concepts |
| `api/index.py` | Flask enquiry backend for Vercel Python; forwards to hello@janesplants.com through Resend if RESEND_API_KEY is set, otherwise just acknowledges. Stores nothing |
| `public/media/` | Generated stills and videos (35 files) |
| `scripts/` | `gen-media.py`, `gen-plants.py`, `gen-accessories.py`: Gemini Imagen stills into `public/media/` (need GEMINI_KEY) |
| `docs/` | `COMPLETION-PLAN.md` (what's done and left), `ROADMAP.md`, `PERF-PLAN.md`, `GEMINI-MEDIA.md`, `VIDEO-PROMPTS.md`, `TONE-OF-VOICE.md`, research notes |
| `next.config.ts` | AVIF/WebP images, long cache on `/media`, redirects `/cinematic/*` to the root |

Stack: Next.js 16.2, React 19, TypeScript, Tailwind 4, Motion, GSAP, Lenis, React Three Fiber.

## Where data lives
- No database. Content is in `src/lib/content.ts`; media in `public/media/` in git.
- Email settings (RESEND_API_KEY, ENQUIRY_FROM) are Vercel environment settings; none are in the repo.
- Domain at GoDaddy, pointed at Vercel (per `docs/COMPLETION-PLAN.md`).
- Checkout: `/Users/nic/Documents/cursor/janesplants` on mini-01 (a partial clone, `blob:none`). Not in REGISTER.md yet.

## Related
- Vercel: deploys from GitHub on push to `main` (per `docs/COMPLETION-PLAN.md`).
- Google Gemini (Imagen) for stills; Resend for enquiry email.
- The README is out of date: it still calls `/` the concept hub and lists `/cinematic`.

Last checked: 26.11.2026
