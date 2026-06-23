import Atmosphere from "@/components/bioluminescent/Atmosphere";
import CursorBloom from "@/components/bioluminescent/CursorBloom";
import Hero from "@/components/bioluminescent/Hero";
import Manifesto from "@/components/bioluminescent/Manifesto";
import MacroInterlude from "@/components/bioluminescent/MacroInterlude";
import Constellation from "@/components/bioluminescent/Constellation";
import CarePhilosophy from "@/components/bioluminescent/CarePhilosophy";
import HireTeaser from "@/components/bioluminescent/HireTeaser";
import Stats from "@/components/bioluminescent/Stats";
import VisitFooter from "@/components/bioluminescent/VisitFooter";

export default function BioluminescentPage() {
  return (
    <main className="relative isolate">
      <Atmosphere />
      <CursorBloom />
      <div className="relative z-10">
        <Hero />
        <Manifesto />
        <MacroInterlude />
        <Constellation />
        <CarePhilosophy />
        <HireTeaser />
        <Stats />
        <VisitFooter />
      </div>
    </main>
  );
}
