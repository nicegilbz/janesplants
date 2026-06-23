"use client";

import { motion } from "motion/react";
import { Building2, Home, PartyPopper, Heart } from "lucide-react";
import MediaSlot from "./MediaSlot";

const SERVICES = [
  {
    icon: Home,
    title: "Homes",
    body: "Rolling plant subscriptions and styling for living rooms that should feel alive.",
    tag: "from £45/mo",
  },
  {
    icon: Building2,
    title: "Offices",
    body: "Specified, installed and maintained greenery for workspaces. We handle the upkeep.",
    tag: "tendered",
  },
  {
    icon: PartyPopper,
    title: "Events",
    body: "Statement specimens hired by the day. Delivered, staged, collected.",
    tag: "by the day",
  },
  {
    icon: Heart,
    title: "Weddings",
    body: "Living installations and aisles of foliage you do not have to throw away.",
    tag: "bespoke",
  },
];

export default function Hire() {
  return (
    <section id="hire" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[#5cf2a0]/60">
              <span className="h-px w-12 bg-[#5cf2a0]/40" />
              <span>03 / Deployment / hire</span>
            </div>
            <h2
              className="text-4xl font-semibold tracking-tight text-[#eaf3ee] md:text-6xl"
              style={{ fontFamily: "var(--font-grotesk)" }}
            >
              We don&rsquo;t just sell plants.
              <br />
              <span className="text-[#5cf2a0]">We deploy them.</span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#dafff0]/60">
            Beyond the shop, Jane&rsquo;s Plants stages and hires living
            specimens for homes, offices and events. Rent the look, keep the
            calm. We specify, install, and maintain.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          {/* hero media slot for hire footage */}
          <MediaSlot
            id="L2 / install walkthrough"
            label="Cinematic office install time-lapse, drops here from Gemini."
            aspect="16 / 10"
            className="lg:row-span-2"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl fx-glass p-6"
              >
                <div className="pointer-events-none absolute inset-0 fx-grid-flat opacity-15" />
                <s.icon
                  size={22}
                  className="relative text-[#5cf2a0] transition-transform duration-300 group-hover:scale-110"
                />
                <h3
                  className="relative mt-4 text-xl font-semibold text-[#eaf3ee]"
                  style={{ fontFamily: "var(--font-grotesk)" }}
                >
                  {s.title}
                </h3>
                <p className="relative mt-2 text-[13px] leading-relaxed text-[#dafff0]/55">
                  {s.body}
                </p>
                <span className="relative mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-[#5be0e6]/70">
                  {s.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <MediaSlot
            id="F4 / day-night pair"
            label="Styled interior, lit and unlit, side by side."
            aspect="4 / 3"
          />
          <MediaSlot
            id="L1 / 360 turntable"
            label="Statement specimen rotating on the hire rig."
            aspect="4 / 3"
            accent="#5be0e6"
          />
          <MediaSlot
            id="E1 / event reveal"
            label="Wedding aisle install, full reveal pan."
            aspect="4 / 3"
            accent="#e15bc9"
          />
        </div>
      </div>
    </section>
  );
}
