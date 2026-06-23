/** Futuristic Greenhouse — shared palette + helpers (no JSX). */

export const LAB = {
  void: "#06120d",
  deepTeal: "#0c2a2a",
  neon: "#5cf2a0",
  neon2: "#3df5a0",
  cyan: "#5be0e6",
  magenta: "#e15bc9",
  white: "#eaf3ee",
} as const;

/** Detect environments where heavy WebGL / JS motion should be skipped. */
export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export function isTouchLike(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    const cores = (navigator as Navigator & { hardwareConcurrency?: number })
      .hardwareConcurrency;
    const lowPower = typeof cores === "number" && cores <= 4;
    return coarse || noHover || lowPower;
  } catch {
    return false;
  }
}

/** Whether the heavy R3F hero should mount. */
export function allowHeavyWebGL(): boolean {
  return !shouldReduceMotion() && !isTouchLike();
}

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Lighten/darken a hex toward white/black by t in [-1,1]. */
export function shade(hex: string, t: number): string {
  const [r, g, b] = hexToRgb(hex);
  const target = t < 0 ? 0 : 255;
  const amt = Math.abs(t);
  const mix = (c: number) => Math.round(c + (target - c) * amt);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}
