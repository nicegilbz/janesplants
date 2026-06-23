import type { Metadata } from "next";
import "@/components/cinematic/theme.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteHeader from "@/components/cinematic/SiteHeader";
import SiteFooter from "@/components/cinematic/SiteFooter";
import CursorLeaves from "@/components/cinematic/CursorLeaves";

export const metadata: Metadata = {
  title: "Jane's Plants / Cinematic Jungle",
};

export default function CinematicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="cine cine-grain relative min-h-screen">
      <CursorLeaves />
      <SiteHeader />
      <SmoothScroll>
        <main>{children}</main>
        <SiteFooter />
      </SmoothScroll>
    </div>
  );
}
