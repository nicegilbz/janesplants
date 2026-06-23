"use client";

/**
 * Procedural inline-SVG botanicals, tinted per plant.
 * No photos — each plant gets a designed, glowing leaf form so the
 * collection reads as cohesive night-garden flora.
 *
 * `variant` is chosen from the plant category/shape so the 12 plants
 * don't all look identical.
 */

import { useId } from "react";
import { withAlpha } from "./theme";

/**
 * Round to 2dp before any computed number reaches SSR/SVG markup, so the
 * server- and client-rendered attribute strings are byte-identical and
 * React doesn't report a hydration mismatch.
 */
const r2 = (n: number) => Math.round(n * 100) / 100;

export type BotanicalVariant =
  | "monstera"
  | "frond"
  | "blade"
  | "round"
  | "heart"
  | "trail";

export function variantForSlug(slug: string): BotanicalVariant {
  if (slug.includes("monstera") || slug.includes("philodendron")) return "monstera";
  if (slug.includes("bird") || slug.includes("alocasia") || slug.includes("fiddle"))
    return "frond";
  if (slug.includes("snake") || slug.includes("zz")) return "blade";
  if (slug.includes("calathea") || slug.includes("rubber")) return "round";
  if (slug.includes("hoya")) return "heart";
  if (slug.includes("pearls") || slug.includes("pothos")) return "trail";
  return "frond";
}

type Props = {
  variant: BotanicalVariant;
  accent: string;
  /** 0..1 glow intensity (e.g. driven by hover). */
  glow?: number;
  className?: string;
};

export default function Botanical({ variant, accent, glow = 0.4, className }: Props) {
  const id = useId().replace(/:/g, "");
  const gradId = `grad-${id}`;
  const glowId = `glow-${id}`;
  const veinId = `vein-${id}`;
  const blur = r2(1 + glow * 5);
  const veinMidOpacity = r2(0.55 * (0.4 + glow));

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor={accent} stopOpacity={0.95} />
          <stop offset="55%" stopColor={accent} stopOpacity={0.5} />
          <stop offset="100%" stopColor={accent} stopOpacity={0.12} />
        </radialGradient>
        <linearGradient id={veinId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dff3ff" stopOpacity={0.0} />
          <stop offset="50%" stopColor="#dff3ff" stopOpacity={veinMidOpacity} />
          <stop offset="100%" stopColor="#dff3ff" stopOpacity={0.0} />
        </linearGradient>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={blur} result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        filter={`url(#${glowId})`}
        style={{ transition: "opacity .5s ease" }}
        opacity={0.85}
      >
        {variant === "monstera" && (
          <Monstera fill={`url(#${gradId})`} vein={`url(#${veinId})`} accent={accent} />
        )}
        {variant === "frond" && (
          <Frond fill={`url(#${gradId})`} vein={`url(#${veinId})`} accent={accent} />
        )}
        {variant === "blade" && (
          <Blade fill={`url(#${gradId})`} accent={accent} />
        )}
        {variant === "round" && (
          <Round fill={`url(#${gradId})`} vein={`url(#${veinId})`} accent={accent} />
        )}
        {variant === "heart" && (
          <Heart fill={`url(#${gradId})`} accent={accent} />
        )}
        {variant === "trail" && (
          <Trail fill={`url(#${gradId})`} accent={accent} />
        )}
      </g>
    </svg>
  );
}

function Monstera({ fill, vein, accent }: { fill: string; vein: string; accent: string }) {
  return (
    <g>
      <path
        d="M100 18 C58 24 30 60 30 104 C30 150 64 184 100 184 C136 184 170 150 170 104 C170 60 142 24 100 18 Z"
        fill={fill}
        stroke={withAlpha(accent, 0.7)}
        strokeWidth={1.2}
      />
      {/* fenestrations / splits */}
      <g fill="#03070a">
        <path d="M100 40 C92 60 90 84 92 110 C70 100 56 80 52 64 C66 50 82 42 100 40 Z" opacity={0.55} />
        <path d="M100 40 C108 60 110 84 108 110 C130 100 144 80 148 64 C134 50 118 42 100 40 Z" opacity={0.55} />
        <path d="M86 128 C78 140 70 150 60 156 C72 168 86 176 100 178 C96 162 92 144 86 128 Z" opacity={0.5} />
        <path d="M114 128 C122 140 130 150 140 156 C128 168 114 176 100 178 C104 162 108 144 114 128 Z" opacity={0.5} />
      </g>
      <path d="M100 22 L100 180" stroke={vein} strokeWidth={2} fill="none" />
    </g>
  );
}

function Frond({ fill, vein, accent }: { fill: string; vein: string; accent: string }) {
  return (
    <g>
      <path
        d="M100 16 C72 40 58 96 64 150 C72 172 88 184 100 186 C112 184 128 172 136 150 C142 96 128 40 100 16 Z"
        fill={fill}
        stroke={withAlpha(accent, 0.7)}
        strokeWidth={1.2}
      />
      <path d="M100 22 L100 182" stroke={vein} strokeWidth={2} fill="none" />
      <g stroke={withAlpha("#dff3ff", 0.28)} strokeWidth={1} fill="none">
        <path d="M100 60 C84 64 74 76 70 92" />
        <path d="M100 60 C116 64 126 76 130 92" />
        <path d="M100 96 C82 102 72 116 68 132" />
        <path d="M100 96 C118 102 128 116 132 132" />
        <path d="M100 132 C86 138 78 150 76 162" />
        <path d="M100 132 C114 138 122 150 124 162" />
      </g>
    </g>
  );
}

function Blade({ fill, accent }: { fill: string; accent: string }) {
  return (
    <g stroke={withAlpha(accent, 0.6)} strokeWidth={1.2}>
      <path d="M88 188 C80 130 80 70 96 18 C100 14 104 14 108 18 C92 70 92 130 100 188 Z" fill={fill} />
      <path d="M120 184 C118 128 124 74 142 30 C146 28 150 30 150 34 C134 78 128 128 132 184 Z" fill={fill} opacity={0.85} />
      <path d="M68 184 C70 130 64 78 48 36 C46 32 50 30 54 32 C72 76 80 128 80 184 Z" fill={fill} opacity={0.85} />
    </g>
  );
}

function Round({ fill, vein, accent }: { fill: string; vein: string; accent: string }) {
  return (
    <g>
      <ellipse cx="100" cy="100" rx="74" ry="84" fill={fill} stroke={withAlpha(accent, 0.7)} strokeWidth={1.2} />
      <path d="M100 22 L100 178" stroke={vein} strokeWidth={2} fill="none" />
      <g stroke={withAlpha("#dff3ff", 0.22)} strokeWidth={1} fill="none">
        {[40, 64, 88, 112, 136, 160].map((y) => (
          <path key={y} d={`M100 ${y} C70 ${y + 6} 50 ${y + 18} 38 ${y + 30}`} />
        ))}
        {[40, 64, 88, 112, 136, 160].map((y) => (
          <path key={`r${y}`} d={`M100 ${y} C130 ${y + 6} 150 ${y + 18} 162 ${y + 30}`} />
        ))}
      </g>
    </g>
  );
}

function Heart({ fill, accent }: { fill: string; accent: string }) {
  return (
    <path
      d="M100 178 C40 132 24 90 38 60 C50 34 84 36 100 66 C116 36 150 34 162 60 C176 90 160 132 100 178 Z"
      fill={fill}
      stroke={withAlpha(accent, 0.7)}
      strokeWidth={1.4}
    />
  );
}

function Trail({ fill, accent }: { fill: string; accent: string }) {
  const beads: [number, number, number][] = [
    [60, 30, 11], [78, 52, 9], [56, 70, 10], [82, 92, 12], [60, 112, 9],
    [86, 132, 11], [64, 152, 10], [90, 172, 8],
    [130, 40, 10], [120, 64, 12], [138, 86, 9], [122, 108, 11],
    [140, 130, 10], [124, 152, 9], [142, 172, 11],
  ];
  return (
    <g>
      <path d="M70 14 C66 60 64 120 76 184" stroke={withAlpha(accent, 0.5)} strokeWidth={1.4} fill="none" />
      <path d="M130 14 C134 60 136 120 124 184" stroke={withAlpha(accent, 0.5)} strokeWidth={1.4} fill="none" />
      {beads.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={fill} stroke={withAlpha(accent, 0.6)} strokeWidth={0.8} />
      ))}
    </g>
  );
}
