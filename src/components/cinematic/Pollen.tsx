"use client";

/**
 * Drifting chartreuse pollen — a cheap 2D canvas particle field that floats up
 * through the foliage corridor. Lightweight (no WebGL). Pauses when offscreen
 * and respects reduced-motion / touch.
 */

import { useEffect, useRef } from "react";
import { useReducedMotion, useIsTouch } from "./hooks";

export default function Pollen({
  count = 70,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const n = Math.min(count, touch ? 24 : 90);
    const parts = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 2.2,
      vy: -(0.08 + Math.random() * 0.35),
      vx: (Math.random() - 0.5) * 0.25,
      ph: Math.random() * Math.PI * 2,
      a: 0.15 + Math.random() * 0.5,
    }));

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * 0.0005 + p.ph) * 0.18;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        const tw = (Math.sin(t * 0.002 + p.ph) + 1) * 0.5;
        ctx.globalAlpha = p.a * (0.4 + tw * 0.6);
        ctx.fillStyle = "#9fd15b";
        ctx.shadowColor = "#9fd15b";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduced, touch, count]);

  if (reduced) return null;
  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none ${className}`}
    />
  );
}
