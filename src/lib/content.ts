/**
 * Jane's Plants — shared brand content.
 *
 * One source of truth so all four art-direction prototypes render the same
 * real substance and only the visual language changes. Copy follows the house
 * style: plain hyphens only, warm and direct, no filler openers.
 */

export const BRAND = {
  name: "Jane's Plants",
  shortName: "Jane's",
  domain: "janesplants.com",
  tagline: "Plants with presence.",
  mission:
    "A stylish houseplant shop for people who want their rooms to feel alive. We hand-pick characterful plants, pair them with pots worth showing off, and tell you exactly how to keep them thriving.",
  promise: [
    "Hand-selected, nursery-fresh stock",
    "Honest care guidance with every plant",
    "Pots and tools chosen by people who love this",
  ],
  founder: {
    name: "Jane",
    role: "Founder & Head Grower",
    note:
      "Jane started with a windowsill, a cutting from her grandmother, and a stubborn refusal to let anything die. The shop is what happened when the windowsill ran out of room.",
  },
  location: {
    label: "The greenhouse",
    line: "A working glasshouse and shop, open to wander.",
  },
  contactEmail: "hello@janesplants.com",
} as const;

export type Plant = {
  slug: string;
  name: string;
  latin: string;
  nickname: string;
  blurb: string;
  light: string;
  water: string;
  /** 1 (effortless) to 5 (devoted) */
  difficulty: number;
  petSafe: boolean;
  price: number;
  height: string;
  category: PlantCategory;
  /** A representative leaf/foliage tone for theming accents. */
  accent: string;
  rare?: boolean;
};

export type PlantCategory =
  | "Statement"
  | "Easy-care"
  | "Rare"
  | "Trailing"
  | "Pet-friendly";

export const CATEGORIES: { key: PlantCategory; label: string; note: string }[] = [
  { key: "Statement", label: "Statement", note: "Floor plants that anchor a room." },
  { key: "Easy-care", label: "Easy-care", note: "Forgiving plants that still look expensive." },
  { key: "Rare", label: "Rare & unusual", note: "Limited finds for the collectors." },
  { key: "Trailing", label: "Trailing", note: "Shelves, hangers and long green tails." },
  { key: "Pet-friendly", label: "Pet-friendly", note: "Safe around cats and dogs." },
];

export const PLANTS: Plant[] = [
  {
    slug: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    latin: "Monstera deliciosa",
    nickname: "The Showstopper",
    blurb:
      "Those split leaves are a whole personality. Give it room and a moss pole and it will reward you with a canopy that turns a corner into a jungle.",
    light: "Bright, indirect",
    water: "Weekly when the top inch is dry",
    difficulty: 2,
    petSafe: false,
    price: 48,
    height: "70-90cm",
    category: "Statement",
    accent: "#2f6b3c",
  },
  {
    slug: "bird-of-paradise",
    name: "Bird of Paradise",
    latin: "Strelitzia nicolai",
    nickname: "The Architect",
    blurb:
      "Big, paddle-shaped leaves that throw real architecture into a room. It wants light and it wants to be seen.",
    light: "Bright, some direct sun",
    water: "Keep evenly moist in summer",
    difficulty: 3,
    petSafe: false,
    price: 95,
    height: "120-150cm",
    category: "Statement",
    accent: "#1f5a34",
  },
  {
    slug: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    latin: "Ficus lyrata",
    nickname: "The Icon",
    blurb:
      "The plant that launched a thousand interiors shoots. Glossy, sculptural, and happiest when you stop moving it around.",
    light: "Bright, indirect",
    water: "When the top 2 inches dry out",
    difficulty: 4,
    petSafe: false,
    price: 75,
    height: "100-130cm",
    category: "Statement",
    accent: "#3a7d44",
  },
  {
    slug: "pink-princess-philodendron",
    name: "Pink Princess",
    latin: "Philodendron erubescens",
    nickname: "The Collector's Crush",
    blurb:
      "Dark chocolate leaves splashed with bubblegum pink. No two are alike, which is exactly why people queue for them.",
    light: "Bright, indirect",
    water: "When the top inch is dry",
    difficulty: 3,
    petSafe: false,
    price: 65,
    height: "30-45cm",
    category: "Rare",
    accent: "#c64f7a",
    rare: true,
  },
  {
    slug: "calathea-orbifolia",
    name: "Calathea Orbifolia",
    latin: "Goeppertia orbifolia",
    nickname: "The Living Artwork",
    blurb:
      "Silver-striped leaves that fold up at night like hands closing a book. Fussy about humidity, worth every misting.",
    light: "Medium, indirect",
    water: "Keep lightly moist, hates dry air",
    difficulty: 4,
    petSafe: true,
    price: 38,
    height: "40-50cm",
    category: "Pet-friendly",
    accent: "#5a8f69",
  },
  {
    slug: "string-of-pearls",
    name: "String of Pearls",
    latin: "Curio rowleyanus",
    nickname: "The Cascade",
    blurb:
      "Little green beads on threads that spill over a shelf edge. Half plant, half jewellery.",
    light: "Bright, some direct sun",
    water: "Sparingly, let it dry out",
    difficulty: 3,
    petSafe: false,
    price: 26,
    height: "Trails to 60cm",
    category: "Trailing",
    accent: "#7aa86a",
  },
  {
    slug: "zz-plant",
    name: "ZZ Plant",
    latin: "Zamioculcas zamiifolia",
    nickname: "The Minimalist",
    blurb:
      "Waxy, upright, near-indestructible. The plant for people who travel, forget, and still want something green and glossy.",
    light: "Low to bright, indirect",
    water: "Every 2-3 weeks",
    difficulty: 1,
    petSafe: false,
    price: 34,
    height: "60-80cm",
    category: "Easy-care",
    accent: "#2c5f3a",
  },
  {
    slug: "snake-plant",
    name: "Snake Plant",
    latin: "Dracaena trifasciata",
    nickname: "The Unkillable",
    blurb:
      "Architectural blades that clean your air while you ignore them. The most forgiving plant we sell, and still one of the best looking.",
    light: "Anything from low to bright",
    water: "Every 2-3 weeks, less in winter",
    difficulty: 1,
    petSafe: false,
    price: 29,
    height: "50-70cm",
    category: "Easy-care",
    accent: "#4f7a4a",
  },
  {
    slug: "alocasia-zebrina",
    name: "Alocasia Zebrina",
    latin: "Alocasia zebrina",
    nickname: "The Statement",
    blurb:
      "Arrow-head leaves on zebra-striped stems that seem to reach toward you. A bit dramatic, in the best way.",
    light: "Bright, indirect",
    water: "Keep lightly moist, loves humidity",
    difficulty: 4,
    petSafe: false,
    price: 58,
    height: "60-80cm",
    category: "Rare",
    accent: "#356b41",
    rare: true,
  },
  {
    slug: "marble-queen-pothos",
    name: "Marble Queen Pothos",
    latin: "Epipremnum aureum",
    nickname: "The Trailblazer",
    blurb:
      "Cream and green marbled leaves that grow almost anywhere and trail for metres. The easiest way to soften a hard room.",
    light: "Low to bright, indirect",
    water: "When the top inch is dry",
    difficulty: 1,
    petSafe: false,
    price: 24,
    height: "Trails to 1m+",
    category: "Trailing",
    accent: "#6f9a5e",
  },
  {
    slug: "rubber-plant",
    name: "Rubber Plant",
    latin: "Ficus elastica",
    nickname: "The Classic",
    blurb:
      "Deep burgundy-green leaves with a high-gloss finish. Grows into a proper indoor tree if you let it.",
    light: "Bright, indirect",
    water: "When the top 2 inches dry out",
    difficulty: 2,
    petSafe: false,
    price: 42,
    height: "80-110cm",
    category: "Statement",
    accent: "#46342f",
  },
  {
    slug: "hoya-kerrii",
    name: "Hoya Kerrii",
    latin: "Hoya kerrii",
    nickname: "The Sweetheart",
    blurb:
      "A single heart-shaped leaf that needs almost nothing from you. The plant people give instead of flowers.",
    light: "Bright, indirect",
    water: "Sparingly, let it dry",
    difficulty: 1,
    petSafe: true,
    price: 18,
    height: "10-15cm",
    category: "Pet-friendly",
    accent: "#5f8a55",
  },
];

export type Accessory = {
  name: string;
  kind: "Pot" | "Care" | "Tool";
  blurb: string;
  price: number;
};

export const ACCESSORIES: Accessory[] = [
  { name: "Hand-thrown stoneware pot", kind: "Pot", blurb: "Matte, tonal, drainage done right.", price: 32 },
  { name: "Aged terracotta", kind: "Pot", blurb: "Breathable clay that ages beautifully.", price: 18 },
  { name: "Fluted ceramic planter", kind: "Pot", blurb: "Ribbed shadows that catch the light.", price: 44 },
  { name: "Slow-release plant food", kind: "Care", blurb: "Six months of feeding in one go.", price: 12 },
  { name: "Leaf shine cloth set", kind: "Care", blurb: "For glossy leaves that mean it.", price: 9 },
  { name: "Brass mister", kind: "Tool", blurb: "A fine mist for the humidity lovers.", price: 28 },
  { name: "Moisture meter", kind: "Tool", blurb: "Stop guessing when to water.", price: 16 },
  { name: "Copper snips", kind: "Tool", blurb: "Clean cuts, no crushed stems.", price: 22 },
];

export const CARE_STEPS = [
  {
    title: "Light first",
    body: "Most houseplants want bright, indirect light. Read the room before you read the label.",
  },
  {
    title: "Water less than you think",
    body: "More plants die from kindness than neglect. Let the top of the soil dry between drinks.",
  },
  {
    title: "Feed in the growing months",
    body: "Spring and summer is when they want feeding. Ease off in autumn and winter.",
  },
  {
    title: "Repot when it asks",
    body: "Roots circling the pot or poking out the bottom means it is time to size up.",
  },
];

export const STATS = [
  { value: "200+", label: "Varieties in stock" },
  { value: "12yr", label: "Growing and curating" },
  { value: "48h", label: "Nursery to your door" },
  { value: "100%", label: "Plants we would keep ourselves" },
];

/** The four art-direction concepts, used by the comparison hub. */
export const CONCEPTS = [
  {
    slug: "cinematic",
    index: "01",
    name: "Cinematic Jungle",
    blurb:
      "Lush, moody and atmospheric. Dramatic macro footage of leaves and light, deep shadow, immersive scroll.",
    accent: "#3a7d44",
    bg: "#0c1410",
  },
  {
    slug: "editorial",
    index: "02",
    name: "Editorial Botanical",
    blurb:
      "Magazine-grade calm. Generous whitespace, elegant serif type, refined motion. Timeless and expensive.",
    accent: "#7a6a52",
    bg: "#f4f1ea",
  },
  {
    slug: "futuristic",
    index: "03",
    name: "Futuristic Greenhouse",
    blurb:
      "A bio-tech grow lab. Glassy surfaces, neon-green data, heavy WebGL and 3D. Maximum technology.",
    accent: "#5cf2a0",
    bg: "#06120d",
  },
  {
    slug: "bioluminescent",
    index: "04",
    name: "Bioluminescent Night-Garden",
    blurb:
      "After dark in the glasshouse. Deep black, glowing foliage, drifting particles, a magical hush.",
    accent: "#8be0ff",
    bg: "#03070a",
  },
] as const;

export type ConceptSlug = (typeof CONCEPTS)[number]["slug"];

/* ------------------------------------------------------------------ *
 * Plant hire + styling (the rent-and-style revenue line)
 * ------------------------------------------------------------------ */

export type HirePackage = {
  slug: string;
  name: string;
  forWho: string;
  blurb: string;
  from: number;
  cadence: string;
  includes: string[];
};

export const HIRE_PACKAGES: HirePackage[] = [
  {
    slug: "residential",
    name: "Residential styling",
    forWho: "Homes",
    blurb:
      "We read your light and your rooms, then place plants that look like they were always meant to be there. Delivered, styled and kept alive on a visit schedule that suits you.",
    from: 95,
    cadence: "per month",
    includes: [
      "Home light + space consultation",
      "Plant and pot selection",
      "Delivery and styling",
      "Monthly care visits",
      "Free swaps if anything sulks",
    ],
  },
  {
    slug: "workspace",
    name: "Workspace greening",
    forWho: "Offices",
    blurb:
      "Greener offices feel calmer and people notice. We design, install and maintain planting for receptions, desks and breakout spaces, fully managed so your team never lifts a watering can.",
    from: 220,
    cadence: "per month",
    includes: [
      "Site survey and planting scheme",
      "Statement and desk planting",
      "Professional installation",
      "Fortnightly maintenance",
      "Replacement guarantee",
    ],
  },
  {
    slug: "events",
    name: "Events and weddings",
    forWho: "Occasions",
    blurb:
      "Living green that makes a room. Short-term hire for weddings, shoots and launches, with foliage walls, aisles and statement specimens built around your day and collected after.",
    from: 350,
    cadence: "per event",
    includes: [
      "Mood and palette planning",
      "Foliage features and aisles",
      "Statement specimens",
      "Delivery, build and collection",
      "On-site styling",
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Care guides
 * ------------------------------------------------------------------ */

export type CareGuide = {
  slug: string;
  title: string;
  summary: string;
  tips: string[];
};

export const CARE_GUIDES: CareGuide[] = [
  {
    slug: "light",
    title: "Reading the light",
    summary:
      "The single biggest factor in whether a plant thrives. Learn to see your rooms the way a plant does.",
    tips: [
      "Bright indirect means lots of daylight but no harsh direct sun on the leaves.",
      "A north window is gentle; a south window is strong and may need a sheer.",
      "If you can read a book comfortably without a lamp, most plants will cope.",
      "Yellowing lower leaves often means too little light, not too little water.",
    ],
  },
  {
    slug: "water",
    title: "Watering without fear",
    summary:
      "More houseplants die from kindness than neglect. Here is how to get it right.",
    tips: [
      "Check the top inch of soil with a finger before reaching for the can.",
      "Water thoroughly until it runs from the base, then let it drain fully.",
      "Most plants want less in autumn and winter when growth slows.",
      "Drooping that recovers after a drink means thirsty; mushy stems mean too much.",
    ],
  },
  {
    slug: "humidity",
    title: "Humidity and happy leaves",
    summary:
      "Calatheas, ferns and the fussier beauties want moisture in the air, not just the pot.",
    tips: [
      "Group plants together so they share the moisture they release.",
      "A pebble tray with water under the pot lifts local humidity.",
      "Crispy brown leaf edges are the classic dry-air signal.",
      "Keep humidity lovers away from radiators and draughty doors.",
    ],
  },
  {
    slug: "feeding",
    title: "Feeding through the seasons",
    summary:
      "Plants do most of their growing in spring and summer. Feed them when they want it.",
    tips: [
      "Feed every few weeks from spring to early autumn.",
      "Ease right off in the darker months when growth pauses.",
      "Slow-release food is a fuss-free option for one feed that lasts.",
      "Less is more; over-feeding scorches roots faster than under-feeding starves them.",
    ],
  },
  {
    slug: "repotting",
    title: "Knowing when to repot",
    summary:
      "A plant outgrowing its pot will tell you. Size up at the right moment and it surges.",
    tips: [
      "Roots circling the surface or escaping the drainage holes mean it is time.",
      "Go up one pot size only; too big a pot holds too much wet soil.",
      "Spring is the best season to repot, as the plant is ready to grow into it.",
      "Fresh, open potting mix with good drainage beats tired compacted soil.",
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

export function getPlant(slug: string): Plant | undefined {
  return PLANTS.find((p) => p.slug === slug);
}

/** Public path to a plant's cinematic specimen photo. */
export function plantImage(slug: string): string {
  return `/media/plants/${slug}.png`;
}

/** A few plants in the same category (or nearby), excluding the given one. */
export function relatedPlants(slug: string, count = 3): Plant[] {
  const plant = getPlant(slug);
  if (!plant) return PLANTS.slice(0, count);
  const sameCat = PLANTS.filter(
    (p) => p.slug !== slug && p.category === plant.category,
  );
  const others = PLANTS.filter(
    (p) => p.slug !== slug && p.category !== plant.category,
  );
  return [...sameCat, ...others].slice(0, count);
}
