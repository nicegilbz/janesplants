"use client";

/**
 * Scroll-scrubbed growth time-lapse set-piece.
 *
 * As the user scrolls this framed clip, the video's `currentTime` is driven by
 * scroll progress so the plant visibly grows from seed. The section is pinned
 * for a generous distance so the growth reads clearly, then releases into the
 * next section.
 *
 * Robustness / graceful degradation:
 * - On `prefers-reduced-motion: reduce` OR coarse-pointer / touch devices we do
 *   NOT scrub. The clip simply autoplays muted + looped so it still looks
 *   intentional (no janky seeking on phones).
 * - If the video errors or reports no usable duration, we fall back to the
 *   poster still (next/image) so it never looks broken.
 * - All window / matchMedia / video logic runs in effects (never during SSR),
 *   so the server render is deterministic and there is no hydration mismatch.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion, useIsTouch } from "./hooks";

const CORNERS = [
  "left-3 top-3 border-l border-t",
  "right-3 top-3 border-r border-t",
  "left-3 bottom-3 border-l border-b",
  "right-3 bottom-3 border-r border-b",
] as const;

type Props = {
  /** Still image used as the poster and as the error fallback. */
  poster?: string;
  /** Video source (mp4). */
  video?: string;
  /** Aspect ratio for the frame, e.g. "4 / 3". */
  aspect?: string;
  /** Short caption rendered in the corner. */
  label?: string;
  className?: string;
};

export default function GrowthScrub({
  poster = "/media/leaf-macro.webp",
  video = "/media/video/growth.mp4",
  aspect = "4 / 3",
  label = "growth time-lapse",
  className = "",
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // SSR-safe gates (default to the deterministic "no scrub" path on first paint).
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const scrubMode = !reduced && !touch;

  // Visual state. `failed` => poster fallback; `scrubbing` hides the hint.
  const [failed, setFailed] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const vid = videoRef.current;
      if (!vid || failed) return;

      // ---- Non-scrub path: autoplay muted + looped, no ScrollTrigger. ----
      if (!scrubMode) {
        vid.loop = true;
        vid.muted = true;
        // Best-effort play; ignore the promise rejection on blocked autoplay.
        const p = vid.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
        return;
      }

      gsap.registerPlugin(ScrollTrigger); // idempotent registration

      // We only map scroll -> currentTime once the duration is known.
      let st: ScrollTrigger | null = null;
      let rafId = 0;
      let targetTime = 0;
      let lastSeeked = -1;
      let progress = 0;

      // Ensure the clip is paused; we are the sole driver of currentTime.
      vid.pause();
      vid.loop = false;

      const seekLoop = () => {
        rafId = 0;
        const duration = vid.duration;
        if (!Number.isFinite(duration) || duration <= 0) return;
        // Only seek when the delta is meaningful (~1/600 of the clip),
        // so we are not issuing a seek on every scrolled pixel.
        if (Math.abs(targetTime - lastSeeked) > duration / 600) {
          lastSeeked = targetTime;
          try {
            vid.currentTime = targetTime;
          } catch {
            /* seeking before ready; the next frame retries */
          }
        }
      };

      const requestSeek = () => {
        if (!rafId) rafId = requestAnimationFrame(seekLoop);
      };

      const applyProgress = () => {
        const duration = vid.duration;
        if (!Number.isFinite(duration) || duration <= 0) return;
        targetTime = Math.min(duration, Math.max(0, progress * duration));
        requestSeek();
      };

      const buildTrigger = () => {
        const duration = vid.duration;
        if (!Number.isFinite(duration) || duration <= 0) {
          // No usable duration -> show the poster fallback.
          setFailed(true);
          return;
        }
        st = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          // Pin for 150% of the viewport so the growth reads clearly.
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          onUpdate: (self) => {
            progress = self.progress;
            if (self.progress > 0.02 && !scrubbing) setScrubbing(true);
            applyProgress();
          },
        });
        // Land on frame 0 immediately.
        progress = 0;
        applyProgress();
      };

      const onMeta = () => buildTrigger();

      if (Number.isFinite(vid.duration) && vid.duration > 0) {
        buildTrigger();
      } else {
        vid.addEventListener("loadedmetadata", onMeta, { once: true });
      }

      return () => {
        vid.removeEventListener("loadedmetadata", onMeta);
        if (rafId) cancelAnimationFrame(rafId);
        if (st) st.kill();
      };
    },
    { scope: root, dependencies: [scrubMode, failed] },
  );

  // Mark failed on a hard media error so we render the poster fallback.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onError = () => setFailed(true);
    vid.addEventListener("error", onError);
    return () => vid.removeEventListener("error", onError);
  }, []);

  const overlay = (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(6,12,8,0.12), transparent 35%, rgba(6,12,8,0.35)), radial-gradient(120% 120% at 50% 40%, transparent 60%, rgba(6,12,8,0.55))",
      }}
    />
  );

  const tickMarks = CORNERS.map((c) => (
    <span
      key={c}
      className={`pointer-events-none absolute h-4 w-4 border-[var(--c-brass-line)] ${c}`}
    />
  ));

  return (
    <div ref={root} className={className}>
      <figure
        className="group relative overflow-hidden rounded-2xl cine-glass"
        style={{ aspectRatio: aspect }}
      >
        {failed ? (
          <Image
            src={poster}
            alt={label}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster={poster}
            // No autoPlay / loop here: in scrub mode WE drive playback; in the
            // non-scrub branch the effect sets loop + calls play().
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        )}

        {overlay}
        {tickMarks}

        {/* Scroll affordance: fades once scrubbing starts (scrub mode only). */}
        {scrubMode && !failed ? (
          <figcaption
            className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between transition-opacity duration-700"
            style={{ opacity: scrubbing ? 0 : 1 }}
          >
            <span className="cine-mono rounded-full bg-[rgba(12,20,16,0.6)] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--c-glow)] backdrop-blur-sm">
              scroll to grow
            </span>
            <span className="cine-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--c-sage)]">
              {label}
            </span>
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}
