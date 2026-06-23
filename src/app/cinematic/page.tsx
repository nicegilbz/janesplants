import "@/components/cinematic/theme.css";
import Hero from "@/components/cinematic/Hero";
import Manifesto from "@/components/cinematic/Manifesto";
import Collection from "@/components/cinematic/Collection";
import CarePhilosophy from "@/components/cinematic/CarePhilosophy";
import Hire from "@/components/cinematic/Hire";
import Stats from "@/components/cinematic/Stats";
import Visit from "@/components/cinematic/Visit";
import CursorLeaves from "@/components/cinematic/CursorLeaves";

/**
 * Concept 01 — Cinematic Jungle.
 * A deep, humid glasshouse rendered entirely generatively: parallax foliage
 * corridors, a scroll-grown monstera, drifting pollen, and a cursor that
 * sprouts leaves. All cinematic footage drops into labelled Gemini media slots.
 */
export default function CinematicPage() {
  return (
    <main className="cine cine-grain relative">
      <CursorLeaves />
      <Hero />
      <Manifesto />
      <Collection />
      <CarePhilosophy />
      <Hire />
      <Stats />
      <Visit />
    </main>
  );
}
