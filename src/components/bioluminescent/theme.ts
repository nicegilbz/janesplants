/**
 * Bioluminescent Night-Garden — shared theme tokens + helpers.
 * The glasshouse after dark: everything emits light.
 */

export const NIGHT = {
  void: "#03070a",
  deep: "#0c2a2a",
  lume: "#3df5a0",
  cyan: "#8be0ff",
  glow: "#5be0e6",
  magenta: "#e15bc9",
  white: "#dff3ff",
} as const;

/**
 * Shift a plant's daylight accent toward its bioluminescent night tone.
 * Rare plants drift magenta; everything else blooms toward lume-green/cyan.
 */
export function lumeAccent(hex: string, rare?: boolean): string {
  if (rare) return NIGHT.magenta;
  const { r, g, b } = hexToRgb(hex);
  // Pull toward bio-lume green, lifting brightness so it reads as emissive.
  const t = 0.62;
  const target = hexToRgb(NIGHT.lume);
  const mr = Math.round(r + (target.r - r) * t);
  const mg = Math.round(g + (target.g - g) * t);
  const mb = Math.round(b + (target.b - b) * t);
  return rgbToHex(mr, mg, mb);
}

export function hexToRgb(hex: string) {
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
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
      .join("")
  );
}

export function withAlpha(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
