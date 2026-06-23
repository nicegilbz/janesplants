"use client";

/**
 * Cursor light-bloom: a soft radial glow that follows the pointer and
 * illuminates whatever it passes over. Fixed, pointer-events-none.
 * Sprouts a faint glowing leaf glyph trailing the cursor.
 * Disabled on touch + reduced-motion.
 */

import { useEffect, useRef, useState } from "react";
import { NIGHT, withAlpha } from "./theme";

export default function CursorBloom() {
  const ref = useRef<HTMLDivElement | null>(null);
  const leafRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    if (reduce || touch) return;
    setEnabled(true);

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let lx = tx;
    let ly = ty;
    let raf = 0;

    function onMove(e: PointerEvent) {
      tx = e.clientX;
      ty = e.clientY;
    }
    function loop() {
      raf = requestAnimationFrame(loop);
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      lx += (tx - lx) * 0.085;
      ly += (ty - ly) * 0.085;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (leafRef.current) {
        const ang = Math.atan2(ty - ly, tx - lx) * (180 / Math.PI);
        leafRef.current.style.transform = `translate3d(${lx}px, ${ly}px, 0) rotate(${ang + 90}deg)`;
      }
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] -ml-[280px] -mt-[280px] h-[560px] w-[560px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${withAlpha(NIGHT.glow, 0.1)} 0%, ${withAlpha(
            NIGHT.lume,
            0.05,
          )} 35%, transparent 68%)`,
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={leafRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[61] -ml-3 -mt-3"
        style={{ filter: `drop-shadow(0 0 6px ${withAlpha(NIGHT.lume, 0.9)})` }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 2 C6 6 4 14 7 21 C8 22 10 22 12 21 C14 22 16 22 17 21 C20 14 18 6 12 2 Z"
            fill={withAlpha(NIGHT.lume, 0.85)}
          />
          <path d="M12 4 L12 20" stroke={withAlpha(NIGHT.white, 0.6)} strokeWidth="0.8" />
        </svg>
      </div>
    </>
  );
}
