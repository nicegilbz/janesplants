/**
 * Botanical — bespoke procedural inline-SVG plant illustrations.
 *
 * No external media. Each variant is generated from the plant.slug so the
 * collection looks cohesive yet distinct, tinted with plant.accent. Drawn in
 * an engraved/etched magazine-plate style: a stroked silhouette with hairline
 * vein detailing, on a soft tonal wash.
 */

type Props = {
  slug: string;
  accent: string;
  className?: string;
  /** A deterministic figure variant; falls back to a hash of slug. */
  seed?: number;
};

/* Round to 2dp so server (Node) and client (Chrome) stringify identical
   markup — prevents float last-bit hydration mismatches in SVG coords. */
const r2 = (n: number) => Math.round(n * 100) / 100;

/* Stable string hash → small int */
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function tint(hex: string, amt: number) {
  // amt > 0 lightens toward cream, amt < 0 darkens toward ink
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const mix = (v: number, t: number) =>
    Math.round(v + (t - v) * Math.abs(amt));
  if (amt >= 0) {
    return `rgb(${mix(r, 246)}, ${mix(g, 241)}, ${mix(b, 231)})`;
  }
  return `rgb(${mix(r, 24)}, ${mix(g, 38)}, ${mix(b, 30)})`;
}

export default function Botanical({ slug, accent, className, seed }: Props) {
  const id = `bot-${slug}`;
  const variant = (seed ?? hash(slug)) % 5;
  const leaf = accent;
  const dark = tint(accent, -0.45);
  const wash = tint(accent, 0.78);

  return (
    <svg
      viewBox="0 0 240 320"
      className={className}
      role="img"
      aria-label={`${slug} botanical illustration`}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint(accent, 0.32)} />
          <stop offset="100%" stopColor={leaf} />
        </linearGradient>
        <radialGradient id={`${id}-wash`} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor={wash} stopOpacity="0.9" />
          <stop offset="100%" stopColor={wash} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft tonal halo */}
      <ellipse cx="120" cy="150" rx="112" ry="140" fill={`url(#${id}-wash)`} />

      <g
        fill="none"
        stroke={dark}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {variant === 0 && <Monstera id={id} dark={dark} />}
        {variant === 1 && <Frond id={id} dark={dark} />}
        {variant === 2 && <Trailing id={id} dark={dark} />}
        {variant === 3 && <Upright id={id} dark={dark} />}
        {variant === 4 && <Heart id={id} dark={dark} />}
      </g>
    </svg>
  );
}

/* ---- Variant 0: Monstera split-leaf ---- */
function Monstera({ id, dark }: { id: string; dark: string }) {
  return (
    <g>
      <path d="M120 312 C120 240 120 190 120 150" stroke={dark} strokeWidth="2.2" />
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(120 150) scale(${s} 1)`}>
          <path
            d="M0 0 C30 -8 70 -24 96 -78 C112 -112 108 -150 86 -176 C70 -134 60 -120 44 -118 C58 -96 56 -70 38 -58 C50 -38 46 -14 0 0 Z"
            fill={`url(#${id}-g)`}
            stroke={dark}
            strokeWidth="1.2"
          />
          {/* split fenestrations */}
          <path d="M16 -36 C34 -44 44 -58 50 -78" />
          <path d="M30 -78 C46 -86 56 -104 58 -126" />
          <path d="M50 -118 C66 -128 76 -146 76 -164" />
          <path d="M8 -14 C26 -22 36 -36 40 -54" />
        </g>
      ))}
      <path
        d="M120 -28 C150 -38 176 -70 186 -118 C170 -100 152 -94 140 -96 C150 -72 142 -50 120 -28 Z"
        transform="translate(0 150)"
        fill={`url(#${id}-g)`}
        stroke={dark}
        strokeWidth="1.2"
      />
    </g>
  );
}

/* ---- Variant 1: Bird-of-paradise / fan frond ---- */
function Frond({ id, dark }: { id: string; dark: string }) {
  return (
    <g>
      <path d="M120 314 C120 250 120 200 120 160" stroke={dark} strokeWidth="2.4" />
      {[-34, -14, 6, 26].map((deg, i) => (
        <g key={i} transform={`rotate(${deg} 120 160)`}>
          <path
            d="M120 160 C108 100 110 56 120 14 C130 56 132 100 120 160 Z"
            fill={`url(#${id}-g)`}
            stroke={dark}
            strokeWidth="1.1"
          />
          <path d="M120 150 C120 110 120 70 120 28" stroke={dark} strokeWidth="0.8" />
          {/* leaf-blade nicks */}
          <path d="M120 60 L132 52 M120 88 L132 82 M120 116 L131 112" stroke={dark} strokeWidth="0.7" />
          <path d="M120 60 L108 52 M120 88 L108 82 M120 116 L109 112" stroke={dark} strokeWidth="0.7" />
        </g>
      ))}
    </g>
  );
}

/* ---- Variant 2: Trailing / string ---- */
function Trailing({ id, dark }: { id: string; dark: string }) {
  const strands = [
    { x: 84, sway: -1 },
    { x: 120, sway: 1 },
    { x: 156, sway: -1 },
  ];
  return (
    <g>
      <path d="M60 36 C90 28 150 28 180 36" stroke={dark} strokeWidth="2" />
      {strands.map((st, si) => {
        const path = `M${st.x} 40 C${r2(st.x + st.sway * 26)} 110 ${r2(
          st.x - st.sway * 22,
        )} 180 ${r2(st.x + st.sway * 14)} 296`;
        return (
          <g key={si}>
            <path d={path} stroke={dark} strokeWidth="1" />
            {Array.from({ length: 9 }).map((_, i) => {
              const t = (i + 1) / 10;
              const cx = r2(st.x + st.sway * Math.sin(t * 6) * 20);
              const cy = r2(40 + t * 256);
              return (
                <ellipse
                  key={i}
                  cx={cx}
                  cy={cy}
                  rx="6.5"
                  ry="9"
                  fill={`url(#${id}-g)`}
                  stroke={dark}
                  strokeWidth="0.8"
                  transform={`rotate(${r2(st.sway * 18)} ${cx} ${cy})`}
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

/* ---- Variant 3: Upright blades (snake / ZZ) ---- */
function Upright({ id, dark }: { id: string; dark: string }) {
  const blades = [-30, -16, -4, 8, 22, 34];
  return (
    <g>
      {blades.map((deg, i) => {
        const len = r2(250 - Math.abs(deg) * 2.4);
        const tip = r2(300 - len);
        const mid = r2(300 - len * 0.6);
        return (
          <g key={i} transform={`rotate(${deg} 120 300)`}>
            <path
              d={`M120 300 C112 ${mid} 114 ${tip} 120 ${tip} C126 ${tip} 128 ${mid} 120 300 Z`}
              fill={`url(#${id}-g)`}
              stroke={dark}
              strokeWidth="1.1"
            />
            <path
              d={`M120 296 C120 ${r2(300 - len * 0.5)} 120 ${r2(
                300 - len * 0.85,
              )} 120 ${r2(300 - len + 8)}`}
              stroke={dark}
              strokeWidth="0.7"
            />
          </g>
        );
      })}
    </g>
  );
}

/* ---- Variant 4: Heart leaf (hoya) ---- */
function Heart({ id, dark }: { id: string; dark: string }) {
  return (
    <g>
      <path d="M120 312 C120 280 120 250 120 224" stroke={dark} strokeWidth="2.2" />
      <path
        d="M120 224 C70 200 44 150 56 104 C66 68 96 56 120 86 C144 56 174 68 184 104 C196 150 170 200 120 224 Z"
        fill={`url(#${id}-g)`}
        stroke={dark}
        strokeWidth="1.3"
      />
      <path d="M120 210 C120 170 120 130 120 96" stroke={dark} strokeWidth="0.9" />
      <path d="M120 150 C100 138 86 122 78 102 M120 150 C140 138 154 122 162 102" stroke={dark} strokeWidth="0.7" />
      <path d="M120 178 C104 170 92 156 84 138 M120 178 C136 170 148 156 156 138" stroke={dark} strokeWidth="0.7" />
    </g>
  );
}
