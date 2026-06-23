"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { NIGHT, withAlpha } from "./theme";
import MediaSlot from "./MediaSlot";

/**
 * Dew-droplet macro interlude: parallax glowing droplets catching light,
 * framing two Gemini macro slots (F5 single-leaf macro, L7 pollen plates).
 */
export default function MacroInterlude() {
  const root = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={root} className="relative overflow-hidden py-24">
      {/* drifting dew droplets */}
      <Droplet style={{ left: "8%", top: "20%" }} size={14} delay={0} />
      <Droplet style={{ left: "22%", top: "70%" }} size={9} delay={1.2} />
      <Droplet style={{ right: "14%", top: "30%" }} size={18} delay={0.6} />
      <Droplet style={{ right: "28%", top: "78%" }} size={11} delay={1.8} />
      <Droplet style={{ left: "48%", top: "12%" }} size={8} delay={0.9} />

      <div className="relative mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
        <motion.div style={{ y: y1 }}>
          <MediaSlot
            assetId="F5 / single-leaf macro loop"
            caption="A single leaf breathing, veins lit, a bead of dew catching the light."
            ratio="3 / 4"
          />
        </motion.div>
        <motion.div style={{ y: y2 }} className="md:mt-20">
          <MediaSlot
            assetId="L7 / pollen plates"
            caption="Macro pollen drifting across darkness, soft and luminous."
            ratio="3 / 4"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Droplet({
  style,
  size,
  delay,
}: {
  style: React.CSSProperties;
  size: number;
  delay: number;
}) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute rounded-full"
      style={{
        ...style,
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 30%, ${withAlpha(NIGHT.white, 0.9)} 0%, ${withAlpha(
          NIGHT.glow,
          0.4,
        )} 40%, transparent 75%)`,
        boxShadow: `0 0 ${size}px ${withAlpha(NIGHT.glow, 0.5)}`,
      }}
      animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}
