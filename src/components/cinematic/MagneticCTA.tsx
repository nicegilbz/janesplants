"use client";

/** A magnetic CTA — the button leans toward the cursor on hover. */

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRichMotion } from "./hooks";

export default function MagneticCTA({
  children,
  href,
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const rich = useRichMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  const onMove = (e: React.MouseEvent) => {
    if (!rich || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.45);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`cine-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${variant === "ghost" ? "cine-cta--ghost" : ""} ${className}`}
    >
      {children}
    </motion.a>
  );
}
