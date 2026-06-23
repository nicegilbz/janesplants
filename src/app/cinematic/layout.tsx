import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import ConceptNav from "@/components/ConceptNav";

export const metadata: Metadata = {
  title: "Jane's Plants / Cinematic Jungle",
};

export default function CinematicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0c1410] text-[#e9f1e6]">
      <ConceptNav current="cinematic" tone="dark" accent="#3a7d44" />
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
}
