"use client";

/**
 * Cursor that sprouts leaves: tiny chartreuse leaves sprout, curl, and wither
 * (~1s) along the pointer trail. Canvas-based, cheap. Disabled on touch /
 * reduced-motion. Also renders a soft chartreuse glow that follows the cursor.
 */

import { useEffect, useRef } from "react";
import { useRichMotion } from "./hooks";

type Leaf = {
  x: number;
  y: number;
  born: number;
  life: number;
  rot: number;
  size: number;
  dir: number;
};

const GLOW = "#9fd15b";

export default function CursorLeaves() {
  const rich = useRichMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rich) return;
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas || !glow) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const leaves: Leaf[] = [];
    let last = { x: 0, y: 0, t: 0 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      glow.style.transform = `translate3d(${e.clientX - 90}px, ${e.clientY - 90}px, 0)`;
      const now = performance.now();
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 26 && leaves.length < 80) {
        leaves.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          born: now,
          life: 850 + Math.random() * 500,
          rot: Math.atan2(dy, dx) + (Math.random() - 0.5),
          size: 7 + Math.random() * 7,
          dir: Math.random() > 0.5 ? 1 : -1,
        });
        last = { x: e.clientX, y: e.clientY, t: now };
      }
    };

    const drawLeaf = (l: Leaf, p: number) => {
      // p: 0..1 lifecycle. grow -> hold -> wither
      const grow = Math.min(1, p / 0.25);
      const wither = p > 0.7 ? 1 - (p - 0.7) / 0.3 : 1;
      const scale = grow * wither;
      const curl = l.dir * p * 0.9;
      ctx.save();
      ctx.translate(l.x, l.y - p * 6);
      ctx.rotate(l.rot + curl);
      ctx.scale(scale, scale);
      ctx.globalAlpha = wither * 0.85;
      ctx.fillStyle = GLOW;
      ctx.shadowColor = GLOW;
      ctx.shadowBlur = 8;
      const s = l.size;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(s * 0.6, -s * 0.5, s * 1.4, 0);
      ctx.quadraticCurveTo(s * 0.6, s * 0.4, 0, 0);
      ctx.fill();
      // midrib
      ctx.globalAlpha = wither * 0.5;
      ctx.strokeStyle = "#0c1410";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(s * 1.3, 0);
      ctx.stroke();
      ctx.restore();
    };

    const tick = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = leaves.length - 1; i >= 0; i--) {
        const l = leaves[i];
        const p = (now - l.born) / l.life;
        if (p >= 1) {
          leaves.splice(i, 1);
          continue;
        }
        drawLeaf(l, p);
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [rich]);

  if (!rich) return null;

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[55] h-[180px] w-[180px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(159,209,91,0.16), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[56]"
      />
    </>
  );
}
