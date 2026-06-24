/**
 * Stats / credibility band. Numbers sit on brass hairline rules and fade up as
 * they scroll into view - the reveal is the shared lightweight CSS +
 * IntersectionObserver one (RevealObserver + theme.css; `.cine-stat` is a
 * reveal target), so it runs on every device with no GSAP.
 */

import { STATS } from "@/lib/content";
import CountUp from "./CountUp";

export default function Stats() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="cine-rule mb-14" />
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {STATS.map((s) => {
            const m = s.value.match(/^(\d+)(.*)$/);
            const num = m ? Number(m[1]) : 0;
            const suffix = m ? m[2] : s.value;
            return (
              <div key={s.label} className="cine-stat px-2 text-center lg:text-left">
                <div className="cine-serif flex items-baseline justify-center text-[clamp(3rem,7vw,5.5rem)] text-[var(--c-bone)] lg:justify-start">
                  {m ? (
                    <CountUp value={num} suffix={suffix} />
                  ) : (
                    <span className="text-[var(--c-glow)]">{s.value}</span>
                  )}
                </div>
                <p className="cine-mono mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--c-sage)]">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="cine-rule mt-14" />
      </div>
    </section>
  );
}
