"use client";

/**
 * Location + invitation block. A warm welcome paragraph, an opening-hours list,
 * and a stylised generative "map" (NOT a real embed): an abstract emerald
 * location card with stylised lanes, a glasshouse footprint and a glowing pin.
 *
 * The map is drawn as deterministic, hand-tuned SVG geometry (no Math.random in
 * the render path), so the server markup is hydration-safe. The pin pulse is a
 * pure CSS animation, gated by prefers-reduced-motion.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock } from "lucide-react";
import { BRAND } from "@/lib/content";
import { useStaticMotion } from "../hooks";

/** Opening hours, plain and warm. */
const HOURS: { day: string; time: string }[] = [
  { day: "Monday", time: "Closed, we are repotting" },
  { day: "Tuesday to Friday", time: "9.30am to 5.30pm" },
  { day: "Saturday", time: "9am to 6pm" },
  { day: "Sunday", time: "10am to 4pm" },
];

export default function LocationCard() {
  const root = useRef<HTMLElement>(null);
  const reduced = useStaticMotion();

  useGSAP(
    () => {
      if (typeof window === "undefined" || reduced) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".visit-loc-reveal", {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      className="relative scroll-mt-24 px-6 pt-24 lg:pt-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        {/* LEFT — invitation + hours */}
        <div>
          <span className="visit-loc-reveal cine-eyebrow block">
            {BRAND.location.label}
          </span>
          <h2 className="visit-loc-reveal cine-serif mt-5 text-[clamp(2.1rem,5vw,3.8rem)] text-[var(--c-bone)]">
            Hertford,{" "}
            <span className="cine-accent text-[var(--c-glow)]">England</span>.
          </h2>
          <p className="visit-loc-reveal mt-6 max-w-md text-[1.02rem] leading-relaxed text-[var(--c-sage)]">
            We grow and sell from a glasshouse on the edge of town, where the air
            is warm and everything is reaching for the light. There is no script
            and no rush. Come and take your time, ask us anything, and find the
            plant that feels like yours.
          </p>

          {/* opening hours */}
          <div className="visit-loc-reveal mt-9 rounded-2xl cine-glass p-6 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[var(--c-glow-line)] bg-[var(--c-glow-soft)]"
                aria-hidden="true"
              >
                <Clock className="h-4 w-4 text-[var(--c-glow)]" />
              </span>
              <span className="cine-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--c-sage)]">
                Opening hours
              </span>
            </div>
            <ul className="space-y-0">
              {HOURS.map((h, i) => (
                <li
                  key={h.day}
                  className={`flex items-baseline justify-between gap-4 py-3 ${
                    i < HOURS.length - 1
                      ? "border-b border-[var(--c-brass-line)]/40"
                      : ""
                  }`}
                >
                  <span className="text-[0.95rem] text-[var(--c-bone)]/90">
                    {h.day}
                  </span>
                  <span className="cine-mono text-right text-[0.82rem] text-[var(--c-sage)]">
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.82rem] leading-relaxed text-[var(--c-sage)]">
              Bank holidays vary, so it is worth a quick message before you set
              off. Hire and styling visits are by appointment any day that suits
              you.
            </p>
          </div>
        </div>

        {/* RIGHT — stylised generative map card */}
        <div className="visit-loc-reveal">
          <StylisedMap reduced={reduced} />
        </div>
      </div>
    </section>
  );
}

/**
 * An abstract, on-brand location card. Hand-tuned deterministic geometry: soft
 * landmass shading, a river curve, two stylised approach lanes, a glasshouse
 * footprint and a single glowing pin where the shop sits. No real map data.
 */
function StylisedMap({ reduced }: { reduced: boolean }) {
  return (
    <figure className="relative overflow-hidden rounded-[1.75rem] cine-glass">
      <svg
        viewBox="0 0 640 460"
        className="h-full w-full"
        role="img"
        aria-label="Stylised map showing the glasshouse on the edge of Hertford"
      >
        <defs>
          <radialGradient id="visit-map-bg" cx="0.62" cy="0.4" r="0.85">
            <stop offset="0%" stopColor="#163322" />
            <stop offset="55%" stopColor="#0f2117" />
            <stop offset="100%" stopColor="#0a130d" />
          </radialGradient>
          <linearGradient id="visit-map-river" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1f5f3f" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#9fd15b" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1f5f3f" stopOpacity="0.0" />
          </linearGradient>
          <radialGradient id="visit-map-pinglow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#9fd15b" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9fd15b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* base */}
        <rect width="640" height="460" fill="url(#visit-map-bg)" />

        {/* soft contour fields */}
        <g
          fill="none"
          stroke="rgba(176,141,87,0.16)"
          strokeWidth="1"
        >
          <path d="M-20 120 C140 70 360 150 680 80" />
          <path d="M-20 200 C160 160 380 240 680 170" />
          <path d="M-20 300 C180 260 400 340 680 270" />
          <path d="M-20 390 C200 350 420 430 680 360" />
        </g>

        {/* parkland blocks */}
        <g fill="rgba(31,95,63,0.22)">
          <path d="M60 250 C90 220 150 220 175 255 C200 295 150 340 100 330 C55 320 35 290 60 250 Z" />
          <path d="M470 90 C520 70 575 100 565 150 C555 195 495 210 460 180 C425 150 430 110 470 90 Z" />
        </g>

        {/* the river — soft glow curve */}
        <path
          d="M-20 360 C140 320 220 250 330 250 C460 250 520 180 680 130"
          fill="none"
          stroke="url(#visit-map-river)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M-20 360 C140 320 220 250 330 250 C460 250 520 180 680 130"
          fill="none"
          stroke="#9fd15b"
          strokeOpacity="0.22"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* approach lanes into the pin */}
        <g
          fill="none"
          stroke="rgba(176,141,87,0.5)"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M-20 430 C160 410 300 360 392 300" strokeDasharray="2 9" />
          <path d="M640 420 C520 400 470 350 410 312" strokeDasharray="2 9" />
          <path d="M392 300 C360 260 320 230 250 215" strokeDasharray="2 9" />
        </g>

        {/* a few quiet building marks */}
        <g fill="rgba(244,239,227,0.06)">
          <rect x="150" y="150" width="34" height="26" rx="3" />
          <rect x="205" y="172" width="26" height="22" rx="3" />
          <rect x="510" y="300" width="40" height="28" rx="3" />
          <rect x="470" y="350" width="28" height="22" rx="3" />
          <rect x="120" y="380" width="30" height="24" rx="3" />
        </g>

        {/* the glasshouse footprint, just under the pin */}
        <g transform="translate(400 308)">
          <rect
            x="-46"
            y="-30"
            width="92"
            height="60"
            rx="6"
            fill="rgba(31,95,63,0.4)"
            stroke="rgba(159,209,91,0.45)"
            strokeWidth="1.5"
          />
          {/* ridge + glazing bars */}
          <path
            d="M-46 -30 L0 -48 L46 -30"
            fill="rgba(159,209,91,0.12)"
            stroke="rgba(159,209,91,0.45)"
            strokeWidth="1.5"
          />
          <g stroke="rgba(159,209,91,0.3)" strokeWidth="1">
            <line x1="-23" y1="-30" x2="-23" y2="30" />
            <line x1="0" y1="-39" x2="0" y2="30" />
            <line x1="23" y1="-30" x2="23" y2="30" />
            <line x1="-46" y1="0" x2="46" y2="0" />
          </g>
        </g>

        {/* glowing pin */}
        <g transform="translate(400 250)">
          <circle
            r="46"
            fill="url(#visit-map-pinglow)"
            style={
              reduced
                ? undefined
                : { animation: "cine-pulse 2.6s ease-in-out infinite" }
            }
          />
          <path
            d="M0 18 C-16 -8 -22 -20 -22 -32 A22 22 0 0 1 22 -32 C22 -20 16 -8 0 18 Z"
            fill="#c0613b"
            stroke="#f4efe3"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
          <circle cx="0" cy="-32" r="8" fill="#0c1410" />
          <circle cx="0" cy="-32" r="4" fill="#9fd15b" />
        </g>

        {/* labels */}
        <text
          x="400"
          y="350"
          textAnchor="middle"
          className="cine-mono"
          fontSize="13"
          letterSpacing="3"
          fill="#f4efe3"
          opacity="0.9"
          style={{ textTransform: "uppercase" }}
        >
          The Glasshouse
        </text>
        <text
          x="544"
          y="118"
          textAnchor="middle"
          className="cine-mono"
          fontSize="10.5"
          letterSpacing="2.5"
          fill="#a9b5a3"
          opacity="0.7"
          style={{ textTransform: "uppercase" }}
        >
          Hertford
        </text>
        <text
          x="98"
          y="430"
          textAnchor="middle"
          className="cine-mono"
          fontSize="9.5"
          letterSpacing="2.5"
          fill="#b08d57"
          opacity="0.7"
          style={{ textTransform: "uppercase" }}
        >
          From the A414
        </text>
      </svg>

      {/* footer strip on the card */}
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 border-t border-[var(--c-brass-line)]/30 bg-[rgba(8,14,10,0.55)] px-5 py-3 backdrop-blur-sm">
        <span className="flex items-center gap-2 text-[0.8rem] text-[var(--c-bone)]/85">
          <MapPin className="h-4 w-4 flex-none text-[var(--c-glow)]" aria-hidden="true" />
          On the edge of Hertford, Hertfordshire
        </span>
        <span className="cine-mono hidden text-[0.62rem] uppercase tracking-[0.2em] text-[var(--c-sage)] sm:block">
          Stylised, not to scale
        </span>
      </figcaption>
    </figure>
  );
}
