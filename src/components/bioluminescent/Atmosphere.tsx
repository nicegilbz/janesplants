"use client";

import { NIGHT, withAlpha } from "./theme";

/**
 * Fixed full-page atmosphere: drifting mist + fine grain, additive.
 * Pure CSS (keyframes via styled-jsx), respects reduced-motion through
 * globals.css damping. pointer-events-none, behind content.
 */
export default function Atmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(60% 50% at 50% 110%, ${withAlpha(
            NIGHT.deep,
            0.4,
          )} 0%, transparent 60%)`,
        }}
      />
      <div aria-hidden className="bio-mist pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden className="bio-grain pointer-events-none fixed inset-0 z-[1]" />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .bio-mist {
          background:
            radial-gradient(40% 30% at 20% 30%, ${withAlpha(NIGHT.glow, 0.05)}, transparent 70%),
            radial-gradient(45% 35% at 80% 60%, ${withAlpha(NIGHT.lume, 0.04)}, transparent 70%),
            radial-gradient(30% 25% at 55% 85%, ${withAlpha(NIGHT.cyan, 0.04)}, transparent 70%);
          mix-blend-mode: screen;
          animation: bioDrift 26s ease-in-out infinite alternate;
        }
        .bio-grain {
          opacity: 0.05;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        @keyframes bioDrift {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(2%, -2%, 0) scale(1.08);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bio-mist {
            animation: none;
          }
        }
      `,
        }}
      />
    </>
  );
}
