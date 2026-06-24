import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Leaf, MapPin, ScissorsLineDashed, Sparkles } from "lucide-react";
import { BRAND, STATS } from "@/lib/content";
import MediaSlot from "@/components/cinematic/MediaSlot";
import { PlantEmblem } from "@/components/cinematic/botanicals";
import AboutHero from "@/components/cinematic/about/AboutHero";

export const metadata: Metadata = {
  title: "Our story / Jane's Plants",
  description:
    "How a windowsill of cuttings became a working glasshouse and shop in Hertford. Meet Jane, see how we grow, and read what we promise with every plant.",
};

/**
 * Cinematic Jungle — the "our story" page. Tokens, grain, header, footer,
 * cursor and smooth scroll all live in the cinematic layout; this file is
 * sections only. A fixed ~72px header floats over the top, so non-hero top
 * sections carry their own padding.
 */
export default function AboutPage() {
  const promiseIcons = [Leaf, Sparkles, ScissorsLineDashed];

  return (
    <>
      <AboutHero />

      {/* OUR STORY — Jane, the founder note and the mission */}
      <section
        id="our-story"
        className="relative scroll-mt-24 py-24 lg:py-32"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 80% 0%, rgba(31,95,63,0.28), transparent 60%)",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="cine-eyebrow block">Meet Jane</span>
            <h2 className="cine-serif mt-6 text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-[var(--c-bone)]">
              From one stubborn cutting to a room full of{" "}
              <span className="cine-accent text-[var(--c-glow)]">green</span>.
            </h2>

            <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
              {BRAND.founder.note}
            </p>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
              {BRAND.mission}
            </p>

            <div className="cine-rule mt-10 max-w-md" />
            <p className="cine-mono mt-6 text-[0.78rem] uppercase tracking-[0.26em] text-[var(--c-brass)]">
              {BRAND.founder.name} · {BRAND.founder.role}
            </p>
          </div>

          {/* specimen still */}
          <div className="relative">
            <MediaSlot
              id="A1"
              src="/media/plants/bird-of-paradise.png"
              label="a glasshouse specimen"
              kind="still"
              aspect="4 / 5"
              className="mx-auto w-full max-w-md"
            />
            <div className="pointer-events-none absolute -bottom-8 -left-6 hidden w-24 opacity-80 sm:block">
              <PlantEmblem
                accent="#3a7d44"
                category="Statement"
                slug="about-emblem"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE GROW — the Hertford glasshouse */}
      <section className="relative py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 60% at 20% 100%, rgba(159,209,91,0.1), transparent 60%)",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          {/* glasshouse still */}
          <div className="order-2 lg:order-1">
            <MediaSlot
              id="A2"
              src="/media/glasshouse-day.png"
              video="/media/video/glasshouse-day.mp4"
              label="the Hertford glasshouse"
              kind="loop"
              aspect="4 / 3"
              className="w-full"
            />
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-6 flex items-center gap-3">
              <span className="cine-eyebrow">How we grow</span>
              <span className="h-px w-10 bg-[var(--c-brass-line)]" />
              <span className="cine-mono flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.28em] text-[var(--c-sage)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--c-brass)]" />
                Hertford
              </span>
            </div>

            <h2 className="cine-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] text-[var(--c-bone)]">
              {BRAND.location.label}, open to{" "}
              <span className="cine-accent text-[var(--c-glow)]">wander</span>.
            </h2>

            <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
              {BRAND.location.line} We grow on, hold and hand-pick everything
              here, so the plant you take home has already settled in and
              proven itself. Nothing leaves the bench until we would keep it on
              our own.
            </p>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
              You are welcome to come and walk the rows, breathe the warm green
              air, and ask whatever you like. The kettle is usually on.
            </p>

            <p className="mt-8 text-[0.85rem] text-[var(--c-sage)]">
              <Link
                href="/visit"
                className="text-[var(--c-glow)] underline-offset-4 hover:underline"
              >
                Plan a visit
              </Link>{" "}
              or read our{" "}
              <Link
                href="/care"
                className="text-[var(--c-glow)] underline-offset-4 hover:underline"
              >
                care guides
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* TWO SIDES — shop + hire */}
      <section className="relative py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="cine-eyebrow block">Two sides, one bench</span>
            <h2 className="cine-serif mt-6 text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--c-bone)]">
              A shop you can take home, and a{" "}
              <span className="cine-accent text-[var(--c-glow)]">studio</span>{" "}
              that dresses a room.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link
              href="/shop"
              className="cine-glass group relative overflow-hidden rounded-2xl p-9 transition-colors hover:bg-[var(--c-glow-soft)]"
            >
              <span className="cine-mono text-[0.7rem] uppercase tracking-[0.26em] text-[var(--c-glow)]">
                The shop
              </span>
              <h3 className="cine-serif mt-4 text-[clamp(1.6rem,3vw,2.4rem)] text-[var(--c-bone)]">
                Characterful plants for people who live with them.
              </h3>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--c-sage)]">
                Hand-selected, nursery-fresh stock, paired with pots worth
                showing off and honest care guidance with every one.
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-[0.85rem] text-[var(--c-glow)]">
                Browse the shop
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>

            <Link
              href="/hire"
              className="cine-glass group relative overflow-hidden rounded-2xl p-9 transition-colors hover:bg-[var(--c-glow-soft)]"
            >
              <span className="cine-mono text-[0.7rem] uppercase tracking-[0.26em] text-[var(--c-brass)]">
                Plant hire and styling
              </span>
              <h3 className="cine-serif mt-4 text-[clamp(1.6rem,3vw,2.4rem)] text-[var(--c-bone)]">
                Green that earns its place in a space.
              </h3>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--c-sage)]">
                For studios, shoots and offices that want the room to feel
                alive. We plan it, plant it, and keep it looking its best.
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-[0.85rem] text-[var(--c-brass)]">
                See plant hire
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          {/* stats strip */}
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--c-brass-line)] lg:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-[var(--c-surface)] px-6 py-8 text-center"
              >
                <p className="cine-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-[var(--c-glow)]">
                  {s.value}
                </p>
                <p className="cine-mono mt-2 text-[0.66rem] uppercase tracking-[0.22em] text-[var(--c-sage)]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE PROMISE */}
      <section className="relative py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 0%, rgba(31,95,63,0.22), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="cine-eyebrow block">What we promise</span>
            <h2 className="cine-serif mt-6 text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--c-bone)]">
              The bits we will never{" "}
              <span className="cine-accent text-[var(--c-glow)]">cut</span>.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {BRAND.promise.map((p, i) => {
              const Icon = promiseIcons[i % promiseIcons.length];
              return (
                <div
                  key={p}
                  className="cine-glass rounded-2xl p-8"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--c-glow-line)] bg-[var(--c-glow-soft)]">
                    <Icon className="h-5 w-5 text-[var(--c-glow)]" />
                  </span>
                  <p className="cine-mono mt-6 text-[0.7rem] uppercase tracking-[0.26em] text-[var(--c-brass)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-[1.05rem] leading-relaxed text-[var(--c-bone)]">
                    {p}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 50% 100%, rgba(159,209,91,0.14), transparent 60%), radial-gradient(70% 60% at 20% 0%, rgba(31,95,63,0.3), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="cine-serif text-[clamp(2.2rem,6vw,4.4rem)] leading-[1.02] text-[var(--c-bone)]">
            Come and find the one you{" "}
            <span className="cine-accent text-[var(--c-glow)]">cannot</span>{" "}
            stop looking at.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[1.05rem] leading-relaxed text-[var(--c-sage)]">
            Browse the collection from your sofa, or come and wander the
            glasshouse in person. Either way, a real person is on the other end.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/shop" className="cine-cta">
              <Leaf className="h-4 w-4" /> Browse the shop
            </Link>
            <Link href="/visit" className="cine-cta cine-cta--ghost">
              <MapPin className="h-4 w-4" /> Visit the glasshouse
            </Link>
          </div>

          <p className="mt-8 text-[0.85rem] text-[var(--c-sage)]">
            Or just say hello at{" "}
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="text-[var(--c-glow)] underline-offset-4 hover:underline"
            >
              {BRAND.contactEmail}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
