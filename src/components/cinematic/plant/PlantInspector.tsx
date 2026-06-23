"use client";

/**
 * The signature "3D inspector" hero frame for a single plant.
 *
 * A real Gemini 360 turntable will drop into the MediaSlot later (id "L1"). Until
 * then we composite the plant's procedural PlantEmblem inside the frame as a live,
 * draggable-looking generative stand-in: pointer drag rotates/parallaxes the
 * emblem within its glass, a soft floor shadow grounds it, and a faint orbit ring
 * + drag hint sell the inspector affordance. All motion is transform/opacity only,
 * runs in effect/handlers (never in server markup), and is gated for reduced
 * motion + touch so the server render stays deterministic and hydration-safe.
 */

import { useRef, useState } from "react";
import { RotateCcw, Hand } from "lucide-react";
import MediaSlot from "@/components/cinematic/MediaSlot";
import { PlantEmblem } from "@/components/cinematic/botanicals";
import { useRichMotion } from "@/components/cinematic/hooks";
import type { Plant } from "@/lib/content";

/** Round before any computed number could reach markup. */
const r2 = (n: number) => Math.round(n * 100) / 100;
const clamp = (n: number, lo: number, hi: number) =>
  Math.min(Math.max(n, lo), hi);

export default function PlantInspector({ plant }: { plant: Plant }) {
  const rich = useRichMotion();
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const last = useRef(0);
  // rotation (deg) + tilt (deg) driven only by pointer events, never SSR.
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
    setRot((r) => r + dx * 0.6);
    if (frame.current) {
      const b = frame.current.getBoundingClientRect();
      const cy = (e.clientY - b.top) / b.height - 0.5;
      setTilt(clamp(-cy * 10, -8, 8));
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

  const rRot = r2(rot);
  const rTilt = r2(tilt);
  // sign of facing for a tiny depth parallax on the emblem
  const facing = r2(Math.cos((rot * Math.PI) / 180));

  return (
    <div className="relative">
      {/* The labelled MediaSlot is the real footage placeholder. */}
      <MediaSlot
        id="L1"
        label="360 turntable"
        kind="turntable"
        aspect="4 / 5"
        className="!bg-transparent"
      />

      {/* Live generative inspector composited over the frame. */}
      <div
        ref={frame}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="absolute inset-0 z-10 flex select-none items-center justify-center overflow-hidden rounded-2xl"
        style={{
          cursor: rich ? (active ? "grabbing" : "grab") : "default",
          touchAction: "pan-y",
        }}
        aria-label={`Rotatable preview of ${plant.name}`}
      >
        {/* soft orbit ring on the floor */}
        <div
          className="pointer-events-none absolute left-1/2 top-[64%] h-[42%] w-[64%] -translate-x-1/2 rounded-[50%] border border-[var(--c-brass-line)] opacity-40"
          style={{ transform: `translate(-50%,0) rotateX(72deg)` }}
        />
        {/* grounding shadow */}
        <div
          className="pointer-events-none absolute left-1/2 top-[70%] h-[10%] w-[40%] -translate-x-1/2 rounded-[50%]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.55), transparent 70%)",
          }}
        />

        {/* the emblem itself — parallaxed by drag */}
        <div
          className="relative h-[78%] w-[78%]"
          style={{
            transform: `perspective(900px) rotateY(${rRot * 0.12}deg) rotateX(${rTilt}deg) translateX(${r2(facing * 4 - 4)}px)`,
            transition: active
              ? "none"
              : "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* glow pool behind the plant */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(55%_55%_at_50%_42%,rgba(31,95,63,0.5),transparent_70%)]" />
          <PlantEmblem
            accent={plant.accent}
            category={plant.category}
            slug={plant.slug}
            className="relative h-full w-full drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
          />
        </div>

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
                className="absolute bottom-14 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--c-brass-line)] bg-[rgba(12,20,16,0.6)] text-[var(--c-sage)] backdrop-blur-sm transition-colors hover:text-[var(--c-glow)]"
                aria-label="Reset view"
                title="Reset view"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
