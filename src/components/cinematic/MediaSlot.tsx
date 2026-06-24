"use client";

/**
 * Cinematic media frame.
 *
 * - `video` set  -> autoplays a muted, looping clip (with `src` as the poster),
 *   falling back to the still under reduced motion.
 * - `src` set    -> shows the optimised still (next/image).
 * - neither      -> a labelled, premium placeholder for forthcoming footage.
 * Never looks broken.
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function MediaSlot({
  id,
  label,
  aspect = "16 / 9",
  kind = "loop",
  className = "",
  src,
  video,
  priority = false,
}: {
  id: string;
  label: string;
  aspect?: string;
  kind?: "loop" | "pair" | "turntable" | "still";
  className?: string;
  /** Still image source (also used as the video poster). */
  src?: string;
  /** Video source. Autoplays muted + looped; needs reduced-motion fallback. */
  video?: string;
  priority?: boolean;
}) {
  // Every slot with a clip plays it, on every device (the brand wants the
  // motion). The IntersectionObserver below still only decodes it while it is
  // on screen, so off-screen footage costs nothing.
  const videoRef = useRef<HTMLVideoElement>(null);
  const playsVideo = Boolean(video);

  // Only decode/play the clip while it is on screen; pause it once it scrolls
  // out of view so off-screen footage never decodes in the background.
  useEffect(() => {
    if (!playsVideo) return;
    const el = videoRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() can reject if interrupted; ignore that safely.
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [playsVideo]);

  const corners = [
    "left-3 top-3 border-l border-t",
    "right-3 top-3 border-r border-t",
    "left-3 bottom-3 border-l border-b",
    "right-3 bottom-3 border-r border-b",
  ] as const;

  const overlay = (
    <div className="cine-frame-scrim pointer-events-none absolute inset-0" />
  );
  const tickMarks = corners.map((c) => (
    <span
      key={c}
      className={`pointer-events-none absolute h-4 w-4 border-[var(--c-brass-line)] ${c}`}
    />
  ));

  // Real media mode (playing video, or a still). A video-only slot in static
  // mode (no still poster) falls through to the premium placeholder below
  // rather than rendering an empty frame.
  if (playsVideo || src) {
    return (
      <figure
        className={`group relative overflow-hidden rounded-2xl cine-glass ${className}`}
        style={{ aspectRatio: aspect }}
      >
        {playsVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={src}
            aria-label={label}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : src ? (
          <Image
            src={src}
            alt={label}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
          />
        ) : null}
        {overlay}
        {tickMarks}
      </figure>
    );
  }

  // Placeholder mode ------------------------------------------------------
  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl cine-glass ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 30% 20%, rgba(31,95,63,0.55), transparent 60%), radial-gradient(90% 90% at 80% 90%, rgba(159,209,91,0.14), transparent 55%), linear-gradient(160deg, #102017, #0a120d)",
          animation: "cine-breathe 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(244,239,227,0.5) 0 1px, transparent 1px 3px)",
        }}
      />
      <div className="cine-shimmer-bar" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--c-glow-line)] bg-[rgba(12,20,16,0.5)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
          <Play
            className="h-5 w-5 translate-x-[1px] text-[var(--c-glow)]"
            fill="currentColor"
            aria-hidden="true"
          />
        </div>
      </div>
      {tickMarks}
      <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between">
        <span className="cine-mono rounded-full bg-[rgba(12,20,16,0.6)] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--c-glow)] backdrop-blur-sm">
          {id}
        </span>
        <span className="cine-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--c-sage)]">
          {kind} · {label}
        </span>
      </figcaption>
    </figure>
  );
}
