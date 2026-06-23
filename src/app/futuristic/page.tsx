import "@/components/futuristic/fx.css";
import Hero from "@/components/futuristic/Hero";
import Manifesto from "@/components/futuristic/Manifesto";
import Collection from "@/components/futuristic/Collection";
import CarePhilosophy from "@/components/futuristic/CarePhilosophy";
import Hire from "@/components/futuristic/Hire";
import Stats from "@/components/futuristic/Stats";
import Visit from "@/components/futuristic/Visit";

export default function FuturisticPage() {
  return (
    <main className="relative overflow-clip bg-[#06120d] text-[#dafff0]">
      {/* page-wide ambient grain (static, dampened under reduced-motion) */}
      <div className="pointer-events-none fixed inset-0 z-[60] fx-grain" />

      <Hero />
      <Manifesto />
      <Collection />
      <Hire />
      <CarePhilosophy />
      <Stats />
      <Visit />
    </main>
  );
}
