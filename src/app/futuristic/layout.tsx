import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import ConceptNav from "@/components/ConceptNav";

export const metadata: Metadata = {
  title: "Jane's Plants / Futuristic Greenhouse",
};

export default function FuturisticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#06120d] text-[#dafff0]">
      <ConceptNav current="futuristic" tone="dark" accent="#5cf2a0" />
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
}
