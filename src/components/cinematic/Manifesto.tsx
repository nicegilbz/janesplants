/**
 * Brand manifesto + the growth set-piece. The growth column pairs the procedural
 * growing-monstera (GrowingMonstera - scrubbed by its OWN scroll position, so it
 * grows as you reach it on every device) with the real time-lapse (GrowthScrub).
 */

import { BRAND } from "@/lib/content";
import GrowingMonstera from "./GrowingMonstera";
import GrowthScrub from "./GrowthScrub";

export default function Manifesto() {
  return (
    <section className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-32 lg:grid-cols-[1.05fr_0.95fr] lg:py-44">
      {/* Text column */}
      <div>
        <div className="mb-8 flex items-center gap-4">
          <span className="cine-eyebrow">The glasshouse</span>
          <span className="h-px w-16 bg-[var(--c-brass-line)]" />
        </div>
        <p className="cine-mani-text cine-serif max-w-2xl text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.08] text-[var(--c-bone)]">
          We hand-pick characterful plants, pair them with pots worth showing
          off, and tell you{" "}
          <span className="cine-accent text-[var(--c-glow)]">
            exactly how to keep them alive
          </span>
          .
        </p>

        <ul className="cine-promise-list mt-12 space-y-4">
          {BRAND.promise.map((p) => (
            <li
              key={p}
              className="cine-promise flex items-start gap-4 text-[var(--c-sage)]"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--c-glow)] shadow-[0_0_12px_var(--c-glow)]" />
              <span className="text-[1.02rem] leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-md cine-glass rounded-2xl p-6">
          <p className="text-[0.95rem] leading-relaxed text-[var(--c-bone)]/85">
            “{BRAND.founder.note}”
          </p>
          <p className="cine-mono mt-4 text-[0.7rem] uppercase tracking-[0.22em] text-[var(--c-brass)]">
            {BRAND.founder.name}, {BRAND.founder.role}
          </p>
        </div>
      </div>

      {/* Growth column: procedural growing monstera + the real time-lapse */}
      <div className="relative">
        <GrowingMonstera />
        <div className="mx-auto mt-6 max-w-md">
          <GrowthScrub
            poster="/media/leaf-macro.webp"
            video="/media/video/growth.mp4"
            aspect="4 / 3"
            label="growth time-lapse"
          />
        </div>
      </div>
    </section>
  );
}
