"use client";

/**
 * Editorial motion primitives.
 * - SplitReveal: GSAP SplitText line/word reveal on scroll.
 * - MediaPlate: the framed "Gemini slot" with a clip-path mask reveal.
 * - MagneticLink: underlined link with a subtle magnetic pull.
 * - ReadingProgress: sticky hairline progress bar.
 * - useReducedMotion: matchMedia gate.
 */

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

let registered = false;
function register() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  registered = true;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/* ----------------------------------------------------------------
   SplitReveal — line- or word-level reveal on scroll
   ---------------------------------------------------------------- */
export function SplitReveal({
  children,
  as = "p",
  type = "lines",
  className,
  stagger = 0.08,
  delay = 0,
  start = "top 82%",
  y = "110%",
  duration = 1.05,
}: {
  children: ReactNode;
  as?: ElementType;
  type?: "lines" | "words" | "words,chars";
  className?: string;
  stagger?: number;
  delay?: number;
  start?: string;
  y?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any;

  useGSAP(
    () => {
      register();
      const el = ref.current;
      if (!el) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }

      let split: SplitText | null = null;
      // Wrap split targets in a clipped mask for lines.
      const run = () => {
        split = new SplitText(el, {
          type,
          linesClass: "ed-split-line",
          mask: type === "lines" ? "lines" : undefined,
        });
        const targets =
          type === "lines"
            ? split.lines
            : type === "words"
              ? split.words
              : split.chars;

        gsap.set(el, { autoAlpha: 1 });
        gsap.from(targets, {
          yPercent: parseFloat(y),
          opacity: 0,
          duration,
          delay,
          ease: "expo.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        });
      };

      // Fonts must be ready or SplitText measures wrong line breaks.
      if (document.fonts?.ready) {
        document.fonts.ready.then(run);
      } else {
        run();
      }

      return () => {
        split?.revert();
      };
    },
    { scope: ref, dependencies: [] },
  );

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ visibility: "hidden" }}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------------
   MediaPlate — framed Gemini slot with clip-path reveal
   ---------------------------------------------------------------- */
export function MediaPlate({
  assetId,
  caption,
  className,
  ratio = "4 / 5",
  children,
}: {
  assetId: string;
  caption?: string;
  className?: string;
  ratio?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className={className}>
      <div
        className={`ed-plate ed-clip ${shown ? "ed-shown" : ""}`}
        style={{ aspectRatio: ratio }}
      >
        <div className="ed-plate-inner" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          {children}
          <span className="ed-plate-id">{assetId}</span>
        </div>
        {/* corner ticks */}
        <Ticks />
      </div>
      {caption && (
        <figcaption className="ed-mono mt-3 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.22em] text-[var(--ed-ink-soft)]/70">
          <span>{caption}</span>
          <span className="text-[var(--ed-brass)]">{assetId}</span>
        </figcaption>
      )}
    </figure>
  );
}

function Ticks() {
  const c = "absolute h-3 w-3 border-[var(--ed-brass)]";
  return (
    <>
      <span className={`${c} left-2 top-2 border-l border-t`} />
      <span className={`${c} right-2 top-2 border-r border-t`} />
      <span className={`${c} bottom-2 left-2 border-b border-l`} />
      <span className={`${c} bottom-2 right-2 border-b border-r`} />
    </>
  );
}

/* ----------------------------------------------------------------
   MagneticLink — magnetic pull + underline
   ---------------------------------------------------------------- */
export function MagneticLink({
  children,
  href = "#",
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      gsap.to(el, { x, y, duration: 0.6, ease: "power3.out" });
    };
    const onLeave = () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <a ref={ref} href={href} className={`ed-link ${className ?? ""}`}>
      {children}
    </a>
  );
}

/* ----------------------------------------------------------------
   ReadingProgress — sticky hairline at top of page
   ---------------------------------------------------------------- */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      el.style.transform = `scaleX(${p})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-px bg-[var(--ed-hair)]">
      <div
        ref={ref}
        className="h-full origin-left bg-[var(--ed-brass)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
