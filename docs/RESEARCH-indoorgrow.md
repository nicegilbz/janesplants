I have everything I need. The key finding: indoorgrow.co.uk is **already the Janes Plants holding site** (built on GoDaddy Websites + Marketing) — it IS the predecessor of the janesplants.com brand being built, not an external reference competitor. It's a thin, placeholder-heavy GoDaddy site. Here is the full deliverable.

---

# Research Report: indoorgrow.co.uk (the current "Janes Plants LTD" site)

## CRITICAL CONTEXT FIRST
`indoorgrow.co.uk` is **not an external reference competitor** — it is **the current live website of Janes Plants LTD itself**, the very brand for which janesplants.com is being built. The task framed it as a "reference website," but the fetches reveal it's the brand's existing (very basic) GoDaddy holding site. So this is effectively an audit of the **current/legacy site that the new premium site must replace and dramatically elevate.** Treat it as the "before."

Two corroborating facts:
- Search engines still index the domain's older identity as **"Concept Hydroponics"** and describe a "new website coming soon" — so the domain was repurposed from a hydroponics shop into the Janes Plants brand. The hydroponics/indoor-growing angle is legacy SEO, not the current business.
- The live site is built on **GoDaddy Websites + Marketing** (account email `filler@godaddy.com` exposed in markup; store paths use GoDaddy's `/shop/ols/...` "Online Store" structure).

---

## 1. BUSINESS MODEL
A **retail + service plant business**, dual-revenue:

- **Plant retail (sell):** indoor houseplants, specimen cacti & succulents, plant pots, and growing supplies/accessories — sold both in-person (physical nursery in Hertford) and via an online store.
- **Plant hire (rent) + services:** premium plant rental plus professional delivery, installation, styling and ongoing maintenance for homes, offices, events, weddings, photoshoots and commercial spaces.
- **Nursery operation:** they position themselves as growers/curators, not just resellers — "Our nursery is at the heart of everything we do. We carefully source, nurture, and maintain a diverse selection of high-quality indoor and outdoor plants."

NOT hydroponics/grow-equipment despite the legacy domain name and the (stale) Google snippet. The current business is **premium houseplants + cacti retail and corporate/event plant hire**, regional to **London, Hertfordshire, and Bedfordshire**.

Physical location: **Unit 8A Mimram Road, Hertford, UK.** Contact: `01707 651 004` / `07703 703703`, email `janesplantshertford@gmail.com` (a Gmail, not a branded domain address — a credibility weakness). Hours: Mon 10:00–20:00 (per About) / Mon–Fri 10:00–17:00 (per other pages — inconsistent), Sat 10:00–15:00, Sun by appointment.

## 2. PRODUCT / SERVICE CATALOGUE

**Shop Online — four categories** (GoDaddy store; actual product listings are JS-rendered and were not statically reachable, so individual SKUs/prices are not exposed publicly to a crawler — itself a finding):
- **Indoor Plants** — `/shop/ols/categories/indoor-plants`
- **Cactus & Succulents** — `/shop/ols/categories/cactus--succulents`
- **Plant Pots** — `/shop/ols/categories/plant-pots`
- **Supplies** — `/shop/ols/categories/supplies` (soils/growing mediums and related accessories per their social bio)

**Plant Hire — three packages** (no prices shown; currency symbols render with no number):
1. **House Plant Hire** — "A premium and typically large specimen large indoor plant, professionally delivered, styled, and fully maintained to create an instant statement in any space." (note the awkward doubled "large specimen large" — a real copy error on the live site)
2. **Cactus Hire** — "A striking, large cactus, professionally delivered, styled, and maintained to add bold, low-maintenance impact to any space."
3. **Large Plant Pot Hire** — "Premium large plant pots, delivered and styled to enhance any space with clean, modern design and effortless impact."

**Pricing:** none visible anywhere on the site (neither retail SKUs nor hire packages). Everything is enquiry-led / hidden behind the JS store.

## 3. INFORMATION ARCHITECTURE
Flat, 5-item primary nav plus account/system pages:

| Page | URL |
|---|---|
| Home | `/` |
| Shop Online | `/shop-online` (links into `/shop/ols/categories/*`) |
| Plant Hire | `/plant-hire` |
| About Us | `/about-us` |
| Contact Us | `/contact-us` |
| Sign In | `/m/account` |
| Create Account | `/m/create-account` |
| Orders | `/m/orders` |
| My Account | `/m/account` |
| Privacy Policy | `/privacy-policy` ("Privacy Policy coming soon" — empty) |

**Homepage section order (top → bottom):**
1. Headline: *"Houseplants, cactus, plant pots and associated supplies"*
2. Brand block: *"JANES PLANTS"*
3. **Gallery** (24 grid blocks — all rendering as empty/placeholder GIFs)
4. **Contact Us** form
5. Footer (business name, address, phones, hours, social, copyright)

## 4. CONTENT & COPY
Sparse. Tone is **calm, minimal, design-led, "considered" lifestyle** — aspiring to premium but thinly executed. Real lines, verbatim:

- Hero: **"Houseplants, cactus, plant pots and associated supplies"** (descriptive, not aspirational — reads like a directory listing, not a brand line)
- Strapline: **"Plant supply, styling and maintenance for homes, offices and commercial spaces. Thoughtfully selected plants, professional care and uncomplicated service."**
- About origin story: **"Jane's Plants was founded on a genuine appreciation for well-grown plants and the difference they make to a space."**
- About positioning: **"We specialise in indoor plants, specimen cacti and carefully chosen pots and accessories, supplying homes and studios to offices and commercial spaces."**
- About mission: **"We help create interiors that feel more considered and connected to nature."**
- About nursery: **"Our nursery is at the heart of everything we do. We carefully source, nurture, and maintain a diverse selection of high-quality indoor and outdoor plants, ensuring they are healthy, thriving, and ready to enhance any space."**
- About services: **"We provide quality plants for sale and hire, along with professional delivery, installation, and maintenance services. Whether for homes, offices, events, or commercial spaces, we make it easy."**

Recurring value-prop vocabulary to carry into the new site: *thoughtfully selected, professional care, uncomplicated, considered, connected to nature, effortless impact, instant statement, low-maintenance.* Note the brand inconsistently uses **"Janes Plants"** and **"Jane's Plants"** (apostrophe) — needs locking down.

## 5. PHOTOGRAPHY & VISUAL STYLE
This is the site's **biggest weakness and biggest opportunity.**
- The homepage gallery is **24 empty placeholder blocks** (base64 transparent GIFs) — no real imagery loads to a crawler; the visual heart of a plant brand is effectively blank.
- Plant Hire and Shop pages also serve **placeholder/empty GIFs** where product photos should be.
- Intended aesthetic (from copy + logo): clean, minimal, foliage-forward, "modern design," neutral/considered. The only consistent real visual asset is a **plant-imagery logo**.
- Real product/lifestyle photography exists only on their **social channels** (Instagram `@janesplantsltd`, TikTok `@janesplantsltd`, Facebook "Janes Plants LTD" — small plants, hanging succulents, cacti, pots, shop interior). The website does not surface any of it.
- **No defined color palette** is implemented on-site beyond default GoDaddy template styling — there's no distinctive brand color system to inherit. The new site can define this from scratch (expect to lean green/terracotta/neutral-stone given the cactus + pottery product mix).

## 6. FEATURES
- **E-commerce:** GoDaddy Online Store — cart icon, categories, product pages, checkout (JS-rendered).
- **Accounts:** Sign In, Create Account, Order history (`/m/orders`), My Account.
- **Contact form:** fields = Name, Email (required), Phone, Address (Street/City/Post Code), **file attachment** (useful for hire enquiries / "send a photo of your space").
- **Newsletter signup** for stock updates.
- **Cookie consent** banner (Decline/Accept, references Google policies).
- **Social links:** Instagram + TikTok in footer.
- **Missing entirely:** no blog, no reviews/testimonials, no plant-care guides, no filters/sorting, no search, no calculators (e.g., light/pot-size/care quiz), no embedded map, no live chat, no real photography, no gift cards/subscriptions.

## 7. WHAT'S MISSING / WEAK (the elevation brief for janesplants.com)
1. **No real imagery** — 24 empty gallery slots and placeholder product shots. A plant brand with no photography is fatal. Priority #1: professional foliage, specimen-cactus, pottery, lifestyle/in-situ and grow-room/nursery photography; big editorial hero imagery.
2. **No prices anywhere** — neither retail nor hire. Even "from £X" hire tiers would build trust and qualify leads.
3. **JS-only store that's invisible to crawlers/AI** — product pages don't render server-side, so categories collapse to the contact page. Bad for SEO and for any AI/agent discovery. New site should server-render product content.
4. **Generic GoDaddy template feel** — no distinctive brand system, type, color palette, or motion. Exposed `filler@godaddy.com` and a **Gmail business address** undercut the "premium" positioning.
5. **Copy errors & inconsistency** — "specimen large indoor plant" doubled wording; "Janes" vs "Jane's"; conflicting opening hours (Mon 20:00 vs 17:00) across pages.
6. **Empty/placeholder legal** — "Privacy Policy coming soon"; no terms, no company registration/VAT shown.
7. **Thin content / no authority layer** — no plant-care guides, no blog, no journal, no reviews/social proof, no styling case studies. A premium plant brand should sell expertise and inspiration, not just a 4-category grid.
8. **Weak hero proposition** — "Houseplants, cactus, plant pots and associated supplies" is a category list, not a brand promise. Needs a real headline.
9. **Conversion gaps** — no quote/enquiry flow for hire beyond a generic contact form, no clear CTAs, no "book a consultation," no project gallery to prove the commercial/office/event credentials they claim.
10. **Legacy SEO confusion** — domain still associated with "Concept Hydroponics" / indoor-growing; the new janesplants.com brand should cleanly own "premium houseplants, cacti & plant hire" and 301 the old domain.

**Net:** The current site is a placeholder-grade GoDaddy build for a genuinely premium-positioned, dual-revenue (retail + corporate/event plant hire) Hertford plant business serving London/Herts/Beds. The brand's *language* is already considered and reusable; its *execution* (imagery, pricing, store rendering, design system, content depth) is essentially absent — which is exactly where janesplants.com should over-deliver.

---
**Pages fetched:** `/`, `/shop-online`, `/plant-hire`, `/about-us`, `/contact-us`, `/privacy-policy`, `/shop/ols/products`, plus category URLs.
**Sources:** [indoorgrow.co.uk](https://indoorgrow.co.uk/) · [Janes Plants LTD on Facebook](https://www.facebook.com/people/Janes-Plants-LTD/61585104557556/) · [Concept Hydroponics legacy listing](https://indoorgrow.co.uk/)