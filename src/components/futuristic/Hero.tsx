"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { BRAND } from "@/lib/content";
import { allowHeavyWebGL } from "./theme";
import { TelemetryStrip } from "./Telemetry";

const GrowModuleScene = dynamic(() => import("./GrowModuleScene"), {
  ssr: false,
  loading: () => <SpecimenFallback />,
});

function SpecimenFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        className="h-[58vmin] w-[58vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(92,242,160,0.35), rgba(91,224,230,0.12) 45%, transparent 70%)",
          filter: "blur(6px)",
          animation: "labPulse 6s ease-in-out infinite",
        }}
      />
      <div className="absolute h-[44vmin] w-[44vmin] rounded-full border border-[#5be0e6]/20" />
      <div className="absolute h-[30vmin] w-[30vmin] rounded-full border border-[#5cf2a0]/25" />
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [heavy, setHeavy] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    setHeavy(allowHeavyWebGL());
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ background: "radial-gradient(120% 90% at 50% 30%, #0c2a2a 0%, #06120d 60%)" }}
    >
      {/* WebGL specimen */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0 [filter:saturate(1.1)]"
      >
        <div className="absolute inset-0 [filter:drop-shadow(0_0_40px_rgba(92,242,160,0.25))]">
          {heavy ? <GrowModuleScene /> : <SpecimenFallback />}
        </div>
      </motion.div>

      {/* grid backdrop */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.35] fx-grid" />
      {/* scanlines */}
      <div className="pointer-events-none absolute inset-0 z-[2] fx-scanlines opacity-60" />
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 z-[2] [background:radial-gradient(120%_80%_at_50%_50%,transparent_40%,#06120d_92%)]" />

      {/* HUD corner brackets */}
      <HudCorners />

      {/* Headline content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex h-full flex-col justify-between px-6 py-24 md:px-12 md:py-16"
      >
        <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.34em] text-[#5cf2a0]/70 md:text-xs">
          <span>Jane&rsquo;s Plants · Grow Lab</span>
          <span className="hidden md:inline">52.0°N 0.08°W · Hertford</span>
          <span>Module 03 / Futuristic</span>
        </div>

        <div className="mx-auto w-full max-w-5xl text-center">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.5em] text-[#5be0e6]/80 md:text-sm">
            Bio-tech botanicals
          </p>
          <h1
            className="text-[14vw] font-semibold leading-[0.86] tracking-tight text-[#eaf3ee] md:text-[10vw]"
            style={{ fontFamily: "var(--font-grotesk)" }}
          >
            <span className="block">Plants with</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #5cf2a0, #5be0e6 55%, #5cf2a0)",
                filter: "drop-shadow(0 0 24px rgba(92,242,160,0.35))",
              }}
            >
              presence.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-balance text-sm text-[#dafff0]/70 md:text-base">
            {BRAND.tagline} A working glasshouse in Hertford, run like a research
            lab. We grow, sell and stage living specimens.
          </p>
          <div className="mt-9 flex items-center justify-center gap-3">
            <a
              href="#collection"
              className="group relative overflow-hidden rounded-full border border-[#5cf2a0]/40 bg-[#5cf2a0]/10 px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-[#5cf2a0] transition-colors hover:bg-[#5cf2a0]/20"
            >
              Open the collection
            </a>
            <a
              href="#hire"
              className="rounded-full border border-[#eaf3ee]/15 px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-[#dafff0]/70 transition-colors hover:border-[#5be0e6]/40 hover:text-[#5be0e6]"
            >
              Plant hire
            </a>
          </div>
        </div>

        <TelemetryStrip />
      </motion.div>

      <style jsx>{`
        @keyframes labPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.06);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}

function HudCorners() {
  const C = ({ className }: { className: string }) => (
    <div className={`absolute h-10 w-10 border-[#5cf2a0]/40 ${className}`} />
  );
  return (
    <div className="pointer-events-none absolute inset-5 z-[3] hidden md:block">
      <C className="left-0 top-0 border-l border-t" />
      <C className="right-0 top-0 border-r border-t" />
      <C className="bottom-0 left-0 border-b border-l" />
      <C className="bottom-0 right-0 border-b border-r" />
    </div>
  );
}
