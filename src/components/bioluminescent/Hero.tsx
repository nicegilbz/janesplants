"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NIGHT, withAlpha } from "./theme";
import ParticleField from "./ParticleField";
import Botanical from "./Botanical";

export default function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lines = gsap.utils.toArray<HTMLElement>(".hero-line");
      gsap.set(lines, { yPercent: 120, opacity: 0 });
      const tl = gsap.timeline({ delay: 0.25 });
      tl.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: reduce ? 0.01 : 1.4,
        ease: "expo.out",
        stagger: 0.14,
      });
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: reduce ? 0.01 : 1, ease: "power3.out", delay: 0.9 },
      );
      if (!reduce) {
        // breathing glow on the brand mark
        gsap.to(".hero-orb", {
          scale: 1.06,
          opacity: 0.9,
          duration: 4.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* particle field */}
      <ParticleField className="absolute inset-0 h-full w-full" />

      {/* ambient vignette + deep teal floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(120% 80% at 50% 120%, ${withAlpha(
            NIGHT.deep,
            0.85,
          )} 0%, transparent 55%), radial-gradient(80% 60% at 50% -10%, ${withAlpha(
            NIGHT.glow,
            0.06,
          )} 0%, transparent 60%)`,
        }}
      />

      {/* breathing botanical orb behind the title */}
      <motion.div
        aria-hidden
        style={{ scale: titleScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="hero-orb absolute inset-0 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${withAlpha(NIGHT.lume, 0.16)} 0%, ${withAlpha(
              NIGHT.cyan,
              0.07,
            )} 45%, transparent 70%)`,
            opacity: 0.7,
          }}
        />
        <div className="absolute inset-0 opacity-40">
          <Botanical variant="monstera" accent={NIGHT.lume} glow={0.7} className="h-full w-full" />
        </div>
      </motion.div>

      {/* content */}
      <motion.div
        style={{ opacity: fade, y: lift }}
        className="relative z-10 px-6 text-center"
      >
        <p
          className="hero-sub mb-7 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.42em]"
          style={{ color: withAlpha(NIGHT.glow, 0.8), textShadow: `0 0 16px ${withAlpha(NIGHT.glow, 0.5)}` }}
        >
          Hertford · the glasshouse after dark
        </p>
        <h1 className="font-[family-name:var(--font-serif)] text-[clamp(3rem,11vw,9.5rem)] font-light leading-[0.92] tracking-[-0.02em]">
          <span className="block overflow-hidden">
            <span className="hero-line inline-block">Plants with</span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="hero-line inline-block italic"
              style={{
                fontFamily: "var(--font-accent)",
                color: NIGHT.lume,
                textShadow: `0 0 30px ${withAlpha(NIGHT.lume, 0.65)}, 0 0 60px ${withAlpha(
                  NIGHT.lume,
                  0.3,
                )}`,
              }}
            >
              presence.
            </span>
          </span>
        </h1>
        <motion.p
          style={{ opacity: fade }}
          className="hero-sub mx-auto mt-8 max-w-md text-balance text-[15px] leading-relaxed text-[#dff3ff]/65"
        >
          A premium houseplant shop and plant-hire studio, grown in a working
          glasshouse. Move your cursor, the garden answers.
        </motion.p>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.35em] text-[#dff3ff]/40">
            scroll
          </span>
          <span
            className="h-10 w-[1px]"
            style={{
              background: `linear-gradient(${withAlpha(NIGHT.lume, 0.8)}, transparent)`,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
