import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import ConceptNav from "@/components/ConceptNav";

// Technical grotesk, only the futuristic concept uses it - scoped here so it
// is not shipped to the live cinematic site.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jane's Plants / Futuristic Greenhouse",
};

export default function FuturisticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${spaceGrotesk.variable} min-h-screen bg-[#06120d] text-[#dafff0]`}
    >
      <ConceptNav current="futuristic" tone="dark" accent="#5cf2a0" />
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
}
