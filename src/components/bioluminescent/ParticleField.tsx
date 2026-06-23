"use client";

/**
 * Signature set-piece: interactive bioluminescent particle field.
 * Lightweight 2D canvas, additive glow. Spores/fireflies drift, gather
 * toward the cursor and brighten on proximity. Scroll velocity stirs them.
 *
 * Perf: capped particle count, DPR clamp, pauses when off-screen / reduced
 * motion, disables on touch (static fallback rendered by parent).
 */

import { useEffect, useRef } from "react";
import { NIGHT, hexToRgb } from "./theme";

type Spore = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: { r: number; g: number; b: number };
  phase: number;
  pSpeed: number;
  base: number; // base brightness
};

const PALETTE = [NIGHT.lume, NIGHT.cyan, NIGHT.glow, NIGHT.white, NIGHT.magenta];

export default function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  const scrollVel = useRef(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let spores: Spore[] = [];
    let raf = 0;
    let running = true;
    let t = 0;

    const COUNT_BASE = reduce ? 26 : 130;

    function makeSpore(): Spore {
      const hueHex = PALETTE[(Math.random() * PALETTE.length) | 0];
      // bias magenta rare colour to be uncommon
      const hue =
        hueHex === NIGHT.magenta && Math.random() > 0.18
          ? hexToRgb(NIGHT.lume)
          : hexToRgb(hueHex);
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.08 - Math.random() * 0.22,
        r: 0.7 + Math.random() * 2.4,
        hue,
        phase: Math.random() * Math.PI * 2,
        pSpeed: 0.006 + Math.random() * 0.02,
        base: 0.35 + Math.random() * 0.5,
      };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round((COUNT_BASE * Math.min(w, 1600)) / 1200);
      if (spores.length < target) {
        while (spores.length < target) spores.push(makeSpore());
      } else {
        spores.length = target;
      }
    }

    function onPointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
      pointer.current.active = true;
    }
    function onLeave() {
      pointer.current.active = false;
      pointer.current.x = -9999;
      pointer.current.y = -9999;
    }
    function onScroll() {
      const y = window.scrollY;
      scrollVel.current = Math.min(Math.abs(y - lastScroll.current) * 0.04, 6);
      lastScroll.current = y;
    }

    function frame() {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      t += 1;
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "lighter";

      const px = pointer.current.x;
      const py = pointer.current.y;
      const active = pointer.current.active;
      const stir = scrollVel.current;
      scrollVel.current *= 0.92;

      for (const s of spores) {
        s.phase += s.pSpeed;
        // gentle drift + scroll stir
        s.x += s.vx + Math.sin(s.phase) * 0.12;
        s.y += s.vy - stir * 0.12;

        // cursor attraction + brighten on proximity
        let bright = s.base;
        if (active) {
          const dx = px - s.x;
          const dy = py - s.y;
          const d2 = dx * dx + dy * dy;
          const R = 170;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * 0.55;
            // gather toward cursor, swirl slightly
            s.vx += (dx / d) * f * 0.06 - (dy / d) * f * 0.02;
            s.vy += (dy / d) * f * 0.06 + (dx / d) * f * 0.02;
            bright = Math.min(1, s.base + (1 - d / R) * 0.9);
          }
        }
        // damp velocity so they don't run away
        s.vx *= 0.96;
        s.vy = s.vy * 0.97 - 0.003;

        // wrap
        if (s.y < -10) {
          s.y = h + 10;
          s.x = Math.random() * w;
        }
        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;
        if (s.y > h + 10) s.y = -10;

        const flick = 0.7 + Math.sin(s.phase * 1.7) * 0.3;
        const a = bright * flick;
        const { r, g, b } = s.hue;
        const rad = s.r * (1 + bright * 1.4);

        const grad = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, rad * 4);
        grad.addColorStop(0, `rgba(${r},${g},${b},${a})`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${a * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, rad * 4, 0, Math.PI * 2);
        ctx!.fill();

        // bright core
        ctx!.fillStyle = `rgba(${Math.min(255, r + 60)},${Math.min(255, g + 60)},${Math.min(255, b + 60)},${a})`;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, rad * 0.5, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalCompositeOperation = "source-over";
    }

    resize();
    if (reduce) {
      // draw one static frame, no animation loop
      frame();
      running = false;
      cancelAnimationFrame(raf);
    } else {
      frame();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        if (entry.isIntersecting && !running) {
          running = true;
          frame();
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
