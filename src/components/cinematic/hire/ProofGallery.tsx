"use client";

/**
 * Proof gallery — a cinematic grid of MediaSlot frames standing in for real
 * Gemini footage of finished hire work (homes, offices, events). Each slot is
 * labelled with its Gemini asset id. Reveals on scroll, transform/opacity only.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MediaSlot from "../MediaSlot";
import { useStaticMotion } from "../hooks";

const SHOTS: {
  id: string;
  label: string;
  kind: "loop" | "pair" | "turntable" | "still";
  aspect: string;
  span: string;
  src?: string;
  video?: string;
}[] = [
  { id: "F4", label: "styled living room", kind: "loop", aspect: "4 / 3", span: "lg:col-span-2 lg:row-span-2", src: "/media/glasshouse-day.webp", video: "/media/video/hire-walkthrough.mp4" },
  { id: "L1", label: "office reception", kind: "loop", aspect: "4 / 3", span: "", src: "/media/glasshouse-day.webp", video: "/media/video/glasshouse-day.mp4" },
  { id: "F5", label: "desk planting", kind: "still", aspect: "4 / 3", span: "", src: "/media/plants/monstera-deliciosa.webp" },
  { id: "F6", label: "wedding foliage aisle", kind: "loop", aspect: "16 / 9", span: "lg:col-span-2", video: "/media/video/event-reveal.mp4" },
];

export default function ProofGallery() {
  const root = useRef<HTMLElement>(null);
  const reduced = useStaticMotion();

  useGSAP(
    () => {
      if (typeof window === "undefined" || reduced) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".hire-proof", {
        opacity: 0,
        y: 30,
        scale: 0.98,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} className="relative py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 80% 100%, rgba(31,95,63,0.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="cine-eyebrow block">Recent work</span>
            <h2 className="cine-serif mt-5 text-[clamp(2.2rem,5vw,4rem)] text-[var(--c-bone)]">
              Rooms we have{" "}
              <span className="cine-accent text-[var(--c-glow)]">brought to life</span>.
            </h2>
          </div>
          <p className="max-w-xs text-[0.9rem] text-[var(--c-sage)]">
            Homes, workspaces and one-day occasions. Footage from the glasshouse
            and the installs lands in these frames.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[1fr] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SHOTS.map((shot) => (
            <div key={shot.id + shot.label} className={`hire-proof ${shot.span}`}>
              <MediaSlot
                id={shot.id}
                label={shot.label}
                kind={shot.kind}
                aspect={shot.aspect}
                src={shot.src}
                video={shot.video}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
