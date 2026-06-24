import type { Metadata } from "next";
import "@/components/cinematic/theme.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteHeader from "@/components/cinematic/SiteHeader";
import SiteFooter from "@/components/cinematic/SiteFooter";
import CursorLeaves from "@/components/cinematic/CursorLeaves";
import ThemeProvider from "@/components/cinematic/ThemeProvider";

export const metadata: Metadata = {
  title: "Jane's Plants",
};

export default function CinematicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="cine cine-grain relative min-h-screen overflow-x-clip">
        <CursorLeaves />
        <SiteHeader />
        <SmoothScroll>
          <main>{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </div>
    </ThemeProvider>
  );
}
