"use client";

import { useId } from "react";

/**
 * Procedural inline-SVG botanical "specimen scans". Each plant gets a leaf
 * silhouette built from a category-driven generator, tinted to plant.accent,
 * rendered like a wireframe lab specimen (glow stroke + neon fill).
 */

/**
 * Round to 2 decimals before any Math.cos/sin-derived value reaches the DOM.
 * Node (SSR) and Chrome (hydration) disagree on the last bits of trig output,
 * which made React report a hydration attribute mismatch. Rounding to a fixed
 * precision makes the server and client stringify the coordinate identically.
 */
const r2 = (n: number) => Math.round(n * 100) / 100;

type Kind =
  | "monstera"
  | "frond"
  | "blade"
  | "heart"
  | "trailing"
  | "round"
  | "arrow";

export function botanicalKind(category: string, slug: string): Kind {
  if (slug.includes("monstera")) return "monstera";
  if (slug.includes("bird-of-paradise") || slug.includes("fiddle")) return "frond";
  if (slug.includes("snake") || slug.includes("alocasia") || slug.includes("zebrina"))
    return "arrow";
  if (slug.includes("string") || slug.includes("pothos")) return "trailing";
  if (slug.includes("hoya") || slug.includes("princess")) return "heart";
  if (slug.includes("calathea") || slug.includes("orbifolia")) return "round";
  if (category === "Trailing") return "trailing";
  if (category === "Statement") return "frond";
  if (category === "Easy-care") return "blade";
  return "frond";
}

/** A single leaf path centred roughly on (cx, cy). */
function leafPath(cx: number, cy: number, len: number, wid: number, rot: number) {
  const rad = (rot * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  const px = -dy;
  const py = dx;
  const tipX = r2(cx + dx * len);
  const tipY = r2(cy + dy * len);
  const c1x = r2(cx + dx * len * 0.3 + px * wid);
  const c1y = r2(cy + dy * len * 0.3 + py * wid);
  const c2x = r2(cx + dx * len * 0.75 + px * wid * 0.55);
  const c2y = r2(cy + dy * len * 0.75 + py * wid * 0.55);
  const c3x = r2(cx + dx * len * 0.75 - px * wid * 0.55);
  const c3y = r2(cy + dy * len * 0.75 - py * wid * 0.55);
  const c4x = r2(cx + dx * len * 0.3 - px * wid);
  const c4y = r2(cy + dy * len * 0.3 - py * wid);
  return `M ${r2(cx)} ${r2(cy)} C ${c1x} ${c1y} ${c2x} ${c2y} ${tipX} ${tipY} C ${c3x} ${c3y} ${c4x} ${c4y} ${r2(cx)} ${r2(cy)} Z`;
}

function midrib(cx: number, cy: number, len: number, rot: number) {
  const rad = (rot * Math.PI) / 180;
  const tipX = r2(cx + Math.cos(rad) * len * 0.92);
  const tipY = r2(cy + Math.sin(rad) * len * 0.92);
  return `M ${r2(cx)} ${r2(cy)} L ${tipX} ${tipY}`;
}

export default function Botanical({
  kind,
  accent,
  className,
  strokeWidth = 1.1,
}: {
  kind: Kind;
  accent: string;
  className?: string;
  strokeWidth?: number;
}) {
  const id = useId().replace(/:/g, "");
  const cx = 100;
  const cy = 168;

  const leaves: { len: number; wid: number; rot: number }[] = [];
  const ribs: string[] = [];

  if (kind === "monstera") {
    const angles = [-90, -58, -122, -30, -150, -8, -172];
    angles.forEach((a, i) => {
      const len = 92 - Math.abs(a + 90) * 0.32;
      leaves.push({ len, wid: 30 - i * 1.4, rot: a });
      ribs.push(midrib(cx, cy, len, a));
    });
  } else if (kind === "frond") {
    [-90, -68, -112, -50, -130].forEach((a) => {
      leaves.push({ len: 118, wid: 17, rot: a });
      ribs.push(midrib(cx, cy, 118, a));
    });
  } else if (kind === "blade" || kind === "arrow") {
    [-90, -78, -102, -66, -114].forEach((a, i) => {
      const len = 130 - i * 6;
      leaves.push({ len, wid: kind === "arrow" ? 16 : 11, rot: a });
      ribs.push(midrib(cx, cy, len, a));
    });
  } else if (kind === "heart") {
    [-90, -64, -116].forEach((a) => {
      leaves.push({ len: 70, wid: 40, rot: a });
      ribs.push(midrib(cx, cy, 70, a));
    });
  } else if (kind === "round") {
    [-90, -55, -125, -25, -155].forEach((a) => {
      leaves.push({ len: 78, wid: 46, rot: a });
      ribs.push(midrib(cx, cy, 78, a));
    });
  } else {
    // trailing — pearls/vines spilling down
    [60, 80, 100, 120].forEach((a) => {
      leaves.push({ len: 96, wid: 9, rot: a });
      ribs.push(midrib(cx, cy, 96, a));
    });
  }

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={`fill-${id}`} cx="50%" cy="80%" r="80%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.16" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
        </radialGradient>
        <filter id={`glow-${id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* pot / module base */}
      <g opacity="0.65">
        <path
          d="M 78 168 L 122 168 L 116 192 L 84 192 Z"
          fill="none"
          stroke={accent}
          strokeWidth={strokeWidth}
          opacity="0.5"
        />
        <line
          x1="70"
          y1="168"
          x2="130"
          y2="168"
          stroke={accent}
          strokeWidth={strokeWidth}
          opacity="0.7"
        />
      </g>

      <g filter={`url(#glow-${id})`}>
        {leaves.map((l, i) => (
          <path
            key={`leaf-${i}`}
            d={leafPath(cx, cy, l.len, l.wid, l.rot)}
            fill={`url(#fill-${id})`}
            stroke={accent}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            opacity={0.92}
          />
        ))}
        {ribs.map((d, i) => (
          <path
            key={`rib-${i}`}
            d={d}
            fill="none"
            stroke={accent}
            strokeWidth={strokeWidth * 0.7}
            opacity="0.5"
          />
        ))}
      </g>

      {kind === "trailing" && (
        <g fill={accent} opacity="0.8">
          {[64, 84, 104, 124].map((a, gi) =>
            [0.4, 0.6, 0.8, 1].map((t, bi) => {
              const rad = (a * Math.PI) / 180;
              return (
                <circle
                  key={`p-${gi}-${bi}`}
                  cx={r2(cx + Math.cos(rad) * 96 * t)}
                  cy={r2(cy + Math.sin(rad) * 96 * t)}
                  r={2.4}
                />
              );
            }),
          )}
        </g>
      )}
    </svg>
  );
}
