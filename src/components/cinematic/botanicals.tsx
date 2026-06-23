/**
 * Procedural botanical SVG illustrations for the Cinematic Jungle direction.
 *
 * Every plant is drawn generatively (no photos), tinted per `accent`, so the
 * collection reads as a cohesive, designed jungle. Shapes are deterministic
 * functions of a seed so they stay stable across renders.
 */

/**
 * Round to 2 decimals before a computed number reaches SSR/SVG markup. Math.sin/
 * cos/PI (and float arithmetic) can differ in their last bit between Node and the
 * browser, so the server-rendered attribute string must be stringified identically
 * on both. Rounding guarantees byte-identical markup and kills hydration mismatches.
 */
const r2 = (n: number) => Math.round(n * 100) / 100;

function hexToRgb(hex: string) {
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

/** Blend toward white/black for tonal shading. */
function shade(hex: string, amt: number) {
  const { r, g, b } = hexToRgb(hex);
  const t = amt < 0 ? 0 : 255;
  const p = Math.abs(amt);
  const mix = (c: number) => Math.round((t - c) * p + c);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

/** Deterministic pseudo-random from a string seed. */
function mulberry(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h = (h ^= h >>> 16) >>> 0;
    return h / 4294967296;
  };
}

type LeafProps = { accent: string };

/**
 * A single monstera leaf with fenestrations. `t` in 0..1 drives "unfurl"
 * (scale + fenestration openness) for the scroll-growth set-piece.
 */
export function MonsteraLeaf({
  accent,
  t = 1,
  className,
}: LeafProps & { t?: number; className?: string }) {
  const light = shade(accent, 0.22);
  const dark = shade(accent, -0.32);
  const open = Math.max(0, Math.min(1, t));
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden>
      <defs>
        <linearGradient id={`ml-${accent}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
      </defs>
      <g transform={`translate(100 210) scale(${r2(0.5 + open * 0.5)})`}>
        <path
          d="M0 0 C-2 -40 -4 -80 -3 -120 C-2 -160 14 -190 0 -208 C-14 -190 2 -160 3 -120 C4 -80 2 -40 0 0 Z"
          fill="none"
          stroke={dark}
          strokeWidth="2"
          opacity="0.5"
        />
        {/* leaf body */}
        <path
          d="M0 -4
             C-46 -10 -86 -34 -96 -86
             C-104 -132 -78 -184 -2 -206
             C76 -184 104 -132 96 -86
             C86 -34 46 -10 0 -4 Z"
          fill={`url(#ml-${accent})`}
          stroke={dark}
          strokeWidth="1.5"
        />
        {/* fenestrations — slits that open with t */}
        {[0, 1, 2, 3].map((i) => {
          const side = i % 2 === 0 ? -1 : 1;
          const y = -50 - i * 34;
          const reach = (28 + i * 10) * open;
          return (
            <path
              key={i}
              d={`M${side * 6} ${y} L${r2(side * reach)} ${y - 8} L${r2(side * (reach - 6))} ${y + 10} Z`}
              fill={shade(accent, -0.5)}
              opacity={r2(0.55 * open + 0.1)}
            />
          );
        })}
        {/* veins */}
        {[-1, 1].map((s) =>
          [0, 1, 2, 3].map((i) => (
            <line
              key={`${s}-${i}`}
              x1="0"
              y1={-30 - i * 36}
              x2={s * (24 + i * 12)}
              y2={-46 - i * 40}
              stroke={light}
              strokeWidth="1"
              opacity="0.4"
            />
          )),
        )}
      </g>
    </svg>
  );
}

/** Layered frond — used for foreground parallax fronds. */
export function Frond({
  accent,
  className,
  flip = false,
}: LeafProps & { className?: string; flip?: boolean }) {
  const light = shade(accent, 0.18);
  const dark = shade(accent, -0.38);
  const rng = mulberry(accent + (flip ? "f" : "n"));
  const leaflets = Array.from({ length: 14 }, (_, i) => {
    const along = i / 13;
    const len = 26 + Math.sin(along * Math.PI) * 50 + rng() * 8;
    return { along, len };
  });
  return (
    <svg
      viewBox="0 0 320 420"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`fr-${accent}-${flip}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={dark} />
          <stop offset="100%" stopColor={light} />
        </linearGradient>
      </defs>
      <path
        d="M40 410 C70 300 120 200 200 110 C240 64 280 30 300 14"
        fill="none"
        stroke={shade(accent, -0.2)}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {leaflets.map((lf, i) => {
        const x = r2(40 + lf.along * 260);
        const y = r2(410 - lf.along * 396);
        const ang = r2(-40 - lf.along * 30);
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${ang})`}>
            <path
              d={`M0 0 Q ${r2(lf.len * 0.5)} -${r2(lf.len * 0.32)} ${r2(lf.len)} 0 Q ${r2(lf.len * 0.5)} ${r2(lf.len * 0.18)} 0 0 Z`}
              fill={`url(#fr-${accent}-${flip})`}
              opacity="0.95"
            />
          </g>
        );
      })}
    </svg>
  );
}

/** A clustered plant silhouette for mid-depth layers. */
export function PlantSilhouette({
  accent,
  className,
  seed = "x",
}: LeafProps & { className?: string; seed?: string }) {
  const rng = mulberry(accent + seed);
  const blades = Array.from({ length: 9 }, (_, i) => {
    const spread = (i - 4) / 4;
    return {
      rot: spread * 46 + (rng() - 0.5) * 10,
      h: 200 + rng() * 120,
      w: 22 + rng() * 14,
    };
  });
  const dark = shade(accent, -0.42);
  const mid = shade(accent, -0.12);
  return (
    <svg viewBox="0 0 300 360" className={className} aria-hidden>
      <defs>
        <linearGradient id={`ps-${accent}-${seed}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={dark} />
          <stop offset="100%" stopColor={mid} />
        </linearGradient>
      </defs>
      <g transform="translate(150 360)">
        {blades.map((b, i) => (
          <path
            key={i}
            transform={`rotate(${r2(b.rot)})`}
            d={`M0 0 C-${r2(b.w)} -${r2(b.h * 0.5)} -${r2(b.w * 0.4)} -${r2(b.h)} 0 -${r2(b.h)} C${r2(b.w * 0.4)} -${r2(b.h)} ${r2(b.w)} -${r2(b.h * 0.5)} 0 0 Z`}
            fill={`url(#ps-${accent}-${seed})`}
            opacity={0.85}
          />
        ))}
      </g>
    </svg>
  );
}

/** Per-plant emblem used on collection cards — chooses a form by category. */
export function PlantEmblem({
  accent,
  category,
  slug,
  className,
}: {
  accent: string;
  category: string;
  slug: string;
  className?: string;
}) {
  const light = shade(accent, 0.24);
  const mid = shade(accent, 0.02);
  const dark = shade(accent, -0.4);
  const rng = mulberry(slug);
  const gid = `pe-${slug}`;

  const grad = (
    <defs>
      <linearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor={dark} />
        <stop offset="55%" stopColor={mid} />
        <stop offset="100%" stopColor={light} />
      </linearGradient>
      <radialGradient id={`${gid}-glow`} cx="0.5" cy="0.42" r="0.6">
        <stop offset="0%" stopColor={light} stopOpacity="0.4" />
        <stop offset="100%" stopColor={dark} stopOpacity="0" />
      </radialGradient>
    </defs>
  );

  // Trailing: cascading bead/leaf strands
  if (category === "Trailing") {
    const strands = Array.from({ length: 5 }, (_, i) => i);
    return (
      <svg viewBox="0 0 200 240" className={className} aria-hidden>
        {grad}
        <rect width="200" height="240" fill={`url(#${gid}-glow)`} />
        <ellipse cx="100" cy="36" rx="58" ry="20" fill={dark} opacity="0.5" />
        {strands.map((s) => {
          const x = 52 + s * 24;
          const beads = 6 + Math.floor(rng() * 4);
          return (
            <g key={s}>
              <path
                d={`M${x} 44 Q ${r2(x + (rng() - 0.5) * 30)} ${140} ${r2(x + (rng() - 0.5) * 24)} 220`}
                fill="none"
                stroke={mid}
                strokeWidth="2"
                opacity="0.6"
              />
              {Array.from({ length: beads }, (_, b) => {
                const ty = r2(50 + (b / beads) * 168);
                const tx = r2(x + Math.sin(b * 1.3 + s) * 10);
                return (
                  <circle
                    key={b}
                    cx={tx}
                    cy={ty}
                    r={r2(5 + rng() * 2)}
                    fill={`url(#${gid})`}
                    stroke={dark}
                    strokeWidth="0.6"
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    );
  }

  // Statement / Rare big leaves — monstera-ish stacked leaves
  if (category === "Statement" || category === "Rare") {
    return (
      <svg viewBox="0 0 200 240" className={className} aria-hidden>
        {grad}
        <rect width="200" height="240" fill={`url(#${gid}-glow)`} />
        {[0, 1, 2].map((i) => {
          const s = r2(1 - i * 0.18);
          const rot = r2((i - 1) * 18 + (rng() - 0.5) * 8);
          const ty = 150 + i * 8;
          return (
            <g
              key={i}
              transform={`translate(100 ${ty}) rotate(${rot}) scale(${s})`}
            >
              <path
                d="M0 0
                   C-44 -8 -82 -34 -90 -82
                   C-98 -126 -72 -176 -2 -198
                   C72 -176 98 -126 90 -82
                   C82 -34 44 -8 0 0 Z"
                fill={`url(#${gid})`}
                stroke={dark}
                strokeWidth="1.4"
              />
              {[-1, 1].map((side) =>
                [0, 1, 2].map((j) => (
                  <path
                    key={`${side}-${j}`}
                    d={`M${side * 5} ${-44 - j * 40} L${side * (30 + j * 8)} ${-50 - j * 42} L${side * (26 + j * 8)} ${-34 - j * 40} Z`}
                    fill={dark}
                    opacity="0.45"
                  />
                )),
              )}
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-190"
                stroke={light}
                strokeWidth="1.4"
                opacity="0.5"
              />
            </g>
          );
        })}
      </svg>
    );
  }

  // Pet-friendly (Calathea / Hoya) — rounded patterned leaves
  if (category === "Pet-friendly") {
    return (
      <svg viewBox="0 0 200 240" className={className} aria-hidden>
        {grad}
        <rect width="200" height="240" fill={`url(#${gid}-glow)`} />
        {[0, 1, 2, 3].map((i) => {
          const rot = (i - 1.5) * 30;
          return (
            <g key={i} transform={`translate(100 150) rotate(${rot})`}>
              <ellipse
                cx="0"
                cy="-70"
                rx="34"
                ry="76"
                fill={`url(#${gid})`}
                stroke={dark}
                strokeWidth="1.2"
              />
              {[0, 1, 2, 3, 4].map((j) => (
                <line
                  key={j}
                  x1="0"
                  y1="-8"
                  x2={(j - 2) * 12}
                  y2="-132"
                  stroke={light}
                  strokeWidth="1"
                  opacity="0.45"
                />
              ))}
            </g>
          );
        })}
      </svg>
    );
  }

  // Easy-care (ZZ / Snake) — upright blades
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden>
      {grad}
      <rect width="200" height="240" fill={`url(#${gid}-glow)`} />
      {Array.from({ length: 7 }, (_, i) => {
        const spread = (i - 3) / 3;
        const rot = r2(spread * 34);
        const h = r2(150 + rng() * 50);
        return (
          <g key={i} transform={`translate(100 220) rotate(${rot})`}>
            <path
              d={`M0 0 C-14 -${r2(h * 0.5)} -6 -${h} 0 -${h} C6 -${h} 14 -${r2(h * 0.5)} 0 0 Z`}
              fill={`url(#${gid})`}
              stroke={dark}
              strokeWidth="1"
            />
          </g>
        );
      })}
    </svg>
  );
}

/** Background mist plant band — wide, soft, low-detail for far parallax. */
export function MistBand({
  accent,
  className,
}: LeafProps & { className?: string }) {
  const dark = shade(accent, -0.55);
  const rng = mulberry(accent + "mist");
  return (
    <svg viewBox="0 0 1200 300" className={className} preserveAspectRatio="none" aria-hidden>
      <g fill={dark}>
        {Array.from({ length: 26 }, (_, i) => {
          const x = r2((i / 25) * 1200 + (rng() - 0.5) * 30);
          const h = r2(140 + rng() * 140);
          const w = r2(40 + rng() * 30);
          return (
            <path
              key={i}
              d={`M${x} 300 C${r2(x - w)} ${r2(300 - h * 0.6)} ${r2(x - w * 0.4)} ${r2(300 - h)} ${x} ${r2(300 - h)} C${r2(x + w * 0.4)} ${r2(300 - h)} ${r2(x + w)} ${r2(300 - h * 0.6)} ${x} 300 Z`}
              opacity={r2(0.5 + rng() * 0.3)}
            />
          );
        })}
      </g>
    </svg>
  );
}
