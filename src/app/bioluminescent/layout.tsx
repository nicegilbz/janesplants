import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import ConceptNav from "@/components/ConceptNav";

export const metadata: Metadata = {
  title: "Jane's Plants / Bioluminescent Night-Garden",
};

export default function BioluminescentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#03070a] text-[#dff3ff]">
      <ConceptNav current="bioluminescent" tone="dark" accent="#8be0ff" />
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
}
