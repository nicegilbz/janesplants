/**
 * Accessories strip — pots, care and tools grouped by kind.
 *
 * A server component (no interactivity) below the plant grid. Reads ACCESSORIES
 * from content, groups by kind, and renders three glass columns with prices in
 * brass mono. Pure CSS visuals, no media. Matches the cinematic card language.
 */

import Image from "next/image";
import { Flower2, HeartPulse, Scissors } from "lucide-react";
import { ACCESSORIES, type Accessory } from "@/lib/content";

const GROUPS: {
  kind: Accessory["kind"];
  label: string;
  note: string;
  Icon: typeof Flower2;
}[] = [
  { kind: "Pot", label: "Pots & planters", note: "Vessels worth showing off.", Icon: Flower2 },
  { kind: "Care", label: "Care & feed", note: "Keep them thriving between visits.", Icon: HeartPulse },
  { kind: "Tool", label: "Tools", note: "The right kit for clean, kind work.", Icon: Scissors },
];

export default function AccessoriesStrip() {
  return (
    <section className="relative py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <span className="cine-eyebrow">The finishing touches</span>
          <h2 className="cine-serif mt-5 text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--c-bone)]">
            Pots, care and{" "}
            <span className="cine-accent text-[var(--c-glow)]">good tools</span>.
          </h2>
          <p className="mt-4 text-[var(--c-sage)]">
            Everything chosen by people who love this. Pair a plant with the
            right pot and the kit to keep it happy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {GROUPS.map(({ kind, label, note, Icon }) => {
            const items = ACCESSORIES.filter((a) => a.kind === kind);
            return (
              <div
                key={kind}
                className="relative overflow-hidden rounded-2xl cine-glass p-6"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--c-glow-line),transparent)]" />
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--c-brass-line)] bg-[rgba(31,95,63,0.18)]">
                    <Icon className="h-4.5 w-4.5 text-[var(--c-glow)]" />
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-serif)] text-lg text-[var(--c-bone)]">
                      {label}
                    </h3>
                    <p className="cine-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--c-sage)]">
                      {note}
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {items.map((a) => (
                    <li
                      key={a.name}
                      className="flex items-center gap-4 border-t border-[var(--c-brass-line)] pt-4 first:border-t-0 first:pt-0"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-[var(--c-brass-line)]">
                        <Image
                          src={a.image}
                          alt={a.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.95rem] text-[var(--c-bone)]">
                          {a.name}
                        </p>
                        <p className="mt-0.5 text-[0.82rem] text-[var(--c-sage)]/80">
                          {a.blurb}
                        </p>
                      </div>
                      <span className="cine-mono whitespace-nowrap text-[var(--c-brass)]">
                        £{a.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
