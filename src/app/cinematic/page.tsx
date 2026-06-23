import Hero from "@/components/cinematic/Hero";
import Manifesto from "@/components/cinematic/Manifesto";
import Collection from "@/components/cinematic/Collection";
import CarePhilosophy from "@/components/cinematic/CarePhilosophy";
import Hire from "@/components/cinematic/Hire";
import Stats from "@/components/cinematic/Stats";
import Visit from "@/components/cinematic/Visit";

/**
 * Cinematic Jungle - home.
 * A deep, humid glasshouse rendered entirely generatively: parallax foliage
 * corridors, a scroll-grown monstera, drifting pollen, and a cursor that
 * sprouts leaves. Tokens, grain, header, footer and cursor live in the layout.
 */
export default function CinematicPage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Collection />
      <CarePhilosophy />
      <Hire />
      <Stats />
      <Visit />
    </>
  );
}
