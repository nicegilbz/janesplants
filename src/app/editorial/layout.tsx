import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import ConceptNav from "@/components/ConceptNav";

export const metadata: Metadata = {
  title: "Jane's Plants / Editorial Botanical",
};

export default function EditorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#1c1a16]">
      <ConceptNav current="editorial" tone="light" accent="#7a6a52" />
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
}
