import "@/components/editorial/editorial.css";

import Hero from "@/components/editorial/Hero";
import Manifesto from "@/components/editorial/Manifesto";
import PlantIndex from "@/components/editorial/PlantIndex";
import Spreads from "@/components/editorial/Spreads";
import Care from "@/components/editorial/Care";
import Hire from "@/components/editorial/Hire";
import Stats from "@/components/editorial/Stats";
import Visit from "@/components/editorial/Visit";
import { ReadingProgress } from "@/components/editorial/primitives";

/**
 * Direction 02 — Editorial Botanical.
 * Magazine-grade, calm-luxury single page. Light theme on cream, Fraunces
 * display type, GSAP SplitText reveals, a horizontally-pinned Plant Index,
 * alternating editorial spreads and Gemini-ready media plates.
 */
export default function EditorialPage() {
  return (
    <main className="ed-root ed-grain relative">
      <ReadingProgress />
      <Hero />
      <Manifesto />
      <PlantIndex />
      <Spreads />
      <Care />
      <Hire />
      <Stats />
      <Visit />
    </main>
  );
}
