"use client";

/**
 * The signature inspector hero frame for a single plant.
 *
 * Shows the plant's cinematic specimen photo inside a framed "inspector" that
 * tilt-parallaxes to the pointer (a subtle faux-3D). A real Gemini 360 turntable
 * (asset L1) can replace the still later for true drag-to-rotate. All motion runs
 * in handlers/effects (never server markup), computed numbers are rounded, and the
 * effect is gated for reduced motion + touch so hydration stays deterministic.
 */

import Image from "next/image";
import { useRef, useState } from "react";
import { RotateCcw, Hand } from "lucide-react";
import { useRichMotion } from "@/components/cinematic/hooks";
import { plantImage, plantTurntable, type Plant } from "@/lib/content";

/** Round before any computed number could reach markup. */
const r2 = (n: number) => Math.round(n * 100) / 100;
const clamp = (n: number, lo: number, hi: number) =>
  Math.min(Math.max(n, lo), hi);

const CORNERS = [
  "left-3 top-3 border-l border-t",
  "right-3 top-3 border-r border-t",
  "left-3 bottom-3 border-l border-b",
  "right-3 bottom-3 border-r border-b",
] as const;

export default function PlantInspector({ plant }: { plant: Plant }) {
  const rich = useRichMotion();
  const turntable = plantTurntable(plant.slug);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const last = useRef(0);
  const [rot, setRot] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [active, setActive] = useState(false);

  function onDown(e: React.PointerEvent) {
    if (!rich) return;
    dragging.current = true;
    last.current = e.clientX;
    setActive(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }
  function onMove(e: React.PointerEvent) {
    if (!rich || !dragging.current) return;
    const dx = e.clientX - last.current;
    last.current = e.clientX;
    setRot((r) => r + dx * 0.5);
    if (frame.current) {
      const b = frame.current.getBoundingClientRect();
      const cy = (e.clientY - b.top) / b.height - 0.5;
      setTilt(clamp(-cy * 9, -7, 7));
    }
  }
  function onUp(e: React.PointerEvent) {
    dragging.current = false;
    setActive(false);
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  }
  function reset() {
    setRot(0);
    setTilt(0);
  }

  const rRot = r2(rot * 0.1);
  const rTilt = r2(tilt);
  const facing = r2(Math.cos((rot * Math.PI) / 180));

  return (
    <div
      ref={frame}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      className="relative flex aspect-[4/5] select-none items-center justify-center overflow-hidden rounded-2xl cine-glass"
      style={{
        cursor: rich ? (active ? "grabbing" : "grab") : "default",
        touchAction: "pan-y",
      }}
      aria-label={`Preview of ${plant.name}`}
    >
      {/* ambient field */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 34%, rgba(31,95,63,0.32), transparent 65%), linear-gradient(160deg,#102017,#0a120d)",
        }}
      />
      {/* orbit ring on the floor */}
      <div
        className="pointer-events-none absolute left-1/2 top-[66%] h-[40%] w-[62%] -translate-x-1/2 rounded-[50%] border border-[var(--c-brass-line)] opacity-40"
        style={{ transform: "translate(-50%,0) rotateX(72deg)" }}
      />
      {/* grounding shadow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[72%] h-[10%] w-[44%] -translate-x-1/2 rounded-[50%]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.55), transparent 70%)",
        }}
      />

      {/* the specimen photo, tilt-parallaxed by drag */}
      <div
        className="relative h-[90%] w-[90%]"
        style={{
          transform: `perspective(900px) rotateY(${rRot}deg) rotateX(${rTilt}deg) translateX(${r2(facing * 4 - 4)}px)`,
          transition: active
            ? "none"
            : "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          transformStyle: "preserve-3d",
        }}
      >
        {turntable && rich ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={plantImage(plant.slug)}
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
          >
            <source src={turntable} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={plantImage(plant.slug)}
            alt={plant.name}
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
          />
        )}
      </div>

      {/* corner ticks */}
      {CORNERS.map((c) => (
        <span
          key={c}
          className={`pointer-events-none absolute h-4 w-4 border-[var(--c-brass-line)] ${c}`}
        />
      ))}

      {/* asset note */}
      <span className="cine-mono pointer-events-none absolute bottom-3 right-3 text-[0.58rem] uppercase tracking-[0.22em] text-[var(--c-sage)]/70">
        L1 / 360 turntable
      </span>

      {/* drag hint + reset (interactive devices only) */}
      {rich && (
        <>
          <div className="pointer-events-none absolute left-1/2 top-4 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[rgba(12,20,16,0.55)] px-3 py-1.5 backdrop-blur-sm">
            <Hand className="h-3.5 w-3.5 text-[var(--c-glow)]" />
            <span className="cine-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--c-sage)]">
              Drag to rotate
            </span>
          </div>
          {(rot !== 0 || tilt !== 0) && (
            <button
              onClick={reset}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute bottom-12 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--c-brass-line)] bg-[rgba(12,20,16,0.6)] text-[var(--c-sage)] backdrop-blur-sm transition-colors hover:text-[var(--c-glow)]"
              aria-label="Reset view"
              title="Reset view"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </>
      )}
    </div>
  );
}
