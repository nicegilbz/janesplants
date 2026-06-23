"use client";

/**
 * Signature interactive set-piece: the Glowing Plant Constellation.
 * The 12 plants are luminous nodes positioned in a star-field. An SVG layer
 * draws tendrils between nearby nodes. Hovering a node blooms it (brightens,
 * emits a particle burst) and lights its connections. A category filter dims
 * non-matching nodes. Below, the focused/hovered plant expands into a detail
 * card with its procedural botanical.
 *
 * Powered by: Motion (motion/react) for node transitions + a tiny canvas
 * for the per-node bloom particle burst.
 */

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Droplets, Sun, PawPrint, Sparkles } from "lucide-react";
import { PLANTS, CATEGORIES, type PlantCategory, type Plant } from "@/lib/content";
import { NIGHT, lumeAccent, withAlpha } from "./theme";
import Botanical, { variantForSlug } from "./Botanical";
import { cn } from "@/lib/utils";

/**
 * Round to 2dp so any value derived from transcendental math (Math.hypot et al)
 * that is computed during render stringifies identically on server and client.
 */
const r2 = (n: number) => Math.round(n * 100) / 100;

// Stable hand-tuned scatter so the constellation looks composed, not random.
const POS: [number, number][] = [
  [18, 22], [38, 12], [62, 16], [83, 26],
  [12, 50], [33, 42], [52, 36], [72, 46], [90, 56],
  [24, 74], [50, 70], [76, 78],
];

type Filter = "All" | PlantCategory;

export default function Constellation() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<number | null>(null);
  const burstCanvas = useRef<HTMLCanvasElement | null>(null);

  const nodes = useMemo(
    () =>
      PLANTS.map((p, i) => ({
        plant: p,
        pos: POS[i] ?? [50, 50],
        lume: lumeAccent(p.accent, p.rare),
      })),
    [],
  );

  // tendrils between near nodes
  const links = useMemo(() => {
    const out: { a: number; b: number; d: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].pos[0] - nodes[j].pos[0];
        const dy = nodes[i].pos[1] - nodes[j].pos[1];
        const d = r2(Math.hypot(dx, dy));
        if (d < 30) out.push({ a: i, b: j, d });
      }
    }
    return out;
  }, [nodes]);

  const matches = (p: Plant) => filter === "All" || p.category === filter;

  function burst(x: number, y: number, color: string) {
    const cv = burstCanvas.current;
    if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const rect = cv.getBoundingClientRect();
    const px = ((x / 100) * rect.width);
    const py = ((y / 100) * rect.height);
    const parts = Array.from({ length: 16 }, () => ({
      x: px,
      y: py,
      a: Math.random() * Math.PI * 2,
      s: 0.6 + Math.random() * 2.2,
      life: 1,
    }));
    let raf = 0;
    const tick = () => {
      ctx.globalCompositeOperation = "lighter";
      let alive = false;
      for (const p of parts) {
        if (p.life <= 0) continue;
        alive = true;
        p.x += Math.cos(p.a) * p.s;
        p.y += Math.sin(p.a) * p.s - 0.3;
        p.life -= 0.022;
        const r = 3 + p.life * 4;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, withAlpha(color, p.life * 0.9));
        g.addColorStop(1, withAlpha(color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (alive) raf = requestAnimationFrame(tick);
      else {
        ctx.clearRect(0, 0, cv.width, cv.height);
        cancelAnimationFrame(raf);
      }
    };
    // size canvas to display
    if (cv.width !== Math.floor(rect.width) || cv.height !== Math.floor(rect.height)) {
      cv.width = Math.floor(rect.width);
      cv.height = Math.floor(rect.height);
    }
    tick();
  }

  const activePlant = active != null ? nodes[active].plant : null;

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28">
      <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p
            className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.4em]"
            style={{ color: withAlpha(NIGHT.glow, 0.7) }}
          >
            The collection
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,4rem)] font-light leading-tight">
            A constellation of{" "}
            <span
              className="italic"
              style={{
                fontFamily: "var(--font-accent)",
                color: NIGHT.lume,
                textShadow: `0 0 26px ${withAlpha(NIGHT.lume, 0.5)}`,
              }}
            >
              living light
            </span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#dff3ff]/55">
            Twelve plants, each glowing in its own tone. Hover a node to bloom it.
            Filter to find your match.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["All", ...CATEGORIES.map((c) => c.key)] as Filter[]).map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] transition-all",
                )}
                style={{
                  borderColor: on ? withAlpha(NIGHT.lume, 0.6) : withAlpha(NIGHT.glow, 0.18),
                  color: on ? NIGHT.lume : "#dff3ff99",
                  boxShadow: on ? `0 0 18px ${withAlpha(NIGHT.lume, 0.3)}` : "none",
                  background: on ? withAlpha(NIGHT.lume, 0.06) : "transparent",
                }}
              >
                {f === "All" ? "All" : f}
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* constellation field */}
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border"
          style={{
            borderColor: withAlpha(NIGHT.glow, 0.14),
            background: `radial-gradient(110% 90% at 50% 40%, ${withAlpha(
              NIGHT.deep,
              0.45,
            )} 0%, ${withAlpha(NIGHT.void, 0.9)} 75%)`,
          }}
          onMouseLeave={() => setActive(null)}
        >
          {/* tendrils */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {links.map((l, i) => {
              const A = nodes[l.a];
              const B = nodes[l.b];
              const lit =
                active === l.a || active === l.b || (matches(A.plant) && matches(B.plant));
              const dim = filter !== "All" && !(matches(A.plant) && matches(B.plant));
              return (
                <line
                  key={i}
                  x1={A.pos[0]}
                  y1={A.pos[1]}
                  x2={B.pos[0]}
                  y2={B.pos[1]}
                  stroke={withAlpha(NIGHT.glow, dim ? 0.04 : lit ? 0.32 : 0.12)}
                  strokeWidth={active === l.a || active === l.b ? 0.4 : 0.22}
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "stroke .4s ease" }}
                />
              );
            })}
          </svg>

          {/* burst particles */}
          <canvas
            ref={burstCanvas}
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          {/* nodes */}
          {nodes.map((n, i) => {
            const on = matches(n.plant);
            const isActive = active === i;
            return (
              <button
                key={n.plant.slug}
                className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                style={{ left: `${n.pos[0]}%`, top: `${n.pos[1]}%` }}
                onMouseEnter={() => {
                  setActive(i);
                  burst(n.pos[0], n.pos[1], n.lume);
                }}
                onFocus={() => setActive(i)}
                aria-label={n.plant.name}
              >
                <motion.span
                  animate={{
                    scale: isActive ? 1.5 : 1,
                    opacity: on ? 1 : 0.22,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="relative block"
                >
                  {/* halo */}
                  <span
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
                    style={{
                      width: isActive ? 64 : 30,
                      height: isActive ? 64 : 30,
                      background: `radial-gradient(circle, ${withAlpha(
                        n.lume,
                        isActive ? 0.7 : 0.4,
                      )} 0%, transparent 70%)`,
                      transition: "all .35s ease",
                    }}
                  />
                  {/* core dot / mini botanical */}
                  {isActive ? (
                    <span className="relative block h-9 w-9">
                      <Botanical
                        variant={variantForSlug(n.plant.slug)}
                        accent={n.lume}
                        glow={0.8}
                        className="h-full w-full"
                      />
                    </span>
                  ) : (
                    <span
                      className="relative block rounded-full"
                      style={{
                        width: 10,
                        height: 10,
                        background: n.lume,
                        boxShadow: `0 0 14px ${withAlpha(n.lume, 0.9)}`,
                      }}
                    />
                  )}
                </motion.span>
              </button>
            );
          })}

          <span className="pointer-events-none absolute bottom-4 left-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[#dff3ff]/30">
            hover the nodes
          </span>
        </div>

        {/* detail card */}
        <div className="relative min-h-[360px]">
          <AnimatePresence mode="wait">
            {activePlant ? (
              <PlantCard key={activePlant.slug} plant={activePlant} lume={nodes[active!].lume} />
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-3xl border px-8 text-center"
                style={{ borderColor: withAlpha(NIGHT.glow, 0.12) }}
              >
                <Sparkles size={22} style={{ color: withAlpha(NIGHT.lume, 0.7) }} />
                <p className="mt-4 text-sm text-[#dff3ff]/45">
                  Hover any glowing node to reveal the plant.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function PlantCard({ plant, lume }: { plant: Plant; lume: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full overflow-hidden rounded-3xl border p-7"
      style={{
        borderColor: withAlpha(lume, 0.3),
        background: `radial-gradient(120% 80% at 80% 0%, ${withAlpha(lume, 0.1)} 0%, ${withAlpha(
          NIGHT.void,
          0.7,
        )} 60%)`,
        boxShadow: `0 0 60px ${withAlpha(lume, 0.12)}`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {plant.rare && (
            <span
              className="mb-2 inline-block rounded-full border px-2 py-0.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.2em]"
              style={{ borderColor: withAlpha(NIGHT.magenta, 0.5), color: NIGHT.magenta }}
            >
              Rare
            </span>
          )}
          <h3 className="font-[family-name:var(--font-serif)] text-2xl font-light leading-tight">
            {plant.name}
          </h3>
          <p className="mt-1 font-[family-name:var(--font-mono)] text-[11px] italic tracking-wide text-[#dff3ff]/45">
            {plant.latin} · {plant.nickname}
          </p>
        </div>
        <div
          className="text-right font-[family-name:var(--font-serif)] text-2xl"
          style={{ color: lume, textShadow: `0 0 18px ${withAlpha(lume, 0.5)}` }}
        >
          £{plant.price}
        </div>
      </div>

      <div className="my-5 h-40">
        <Botanical
          variant={variantForSlug(plant.slug)}
          accent={lume}
          glow={0.6}
          className="mx-auto h-full"
        />
      </div>

      <p className="text-[13px] leading-relaxed text-[#dff3ff]/70">{plant.blurb}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 font-[family-name:var(--font-mono)] text-[11px] text-[#dff3ff]/60">
        <Spec icon={<Sun size={13} />} label={plant.light} lume={lume} />
        <Spec icon={<Droplets size={13} />} label={plant.water} lume={lume} />
        <Spec
          icon={<Sparkles size={13} />}
          label={`Care ${"●".repeat(plant.difficulty)}${"○".repeat(5 - plant.difficulty)}`}
          lume={lume}
        />
        <Spec
          icon={<PawPrint size={13} />}
          label={plant.petSafe ? "Pet-safe" : "Keep from pets"}
          lume={lume}
        />
      </div>
    </motion.div>
  );
}

function Spec({ icon, label, lume }: { icon: React.ReactNode; label: string; lume: string }) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ color: lume }}>{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}
