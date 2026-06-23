"use client";

import { motion } from "motion/react";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/content";
import MediaSlot from "./MediaSlot";

export default function Visit() {
  return (
    <section id="visit" className="relative overflow-hidden px-6 pb-16 pt-28 md:px-12 md:pt-36">
      {/* ambient glow floor */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(92,242,160,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-4 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[#5cf2a0]/60">
          <span className="h-px w-12 bg-[#5cf2a0]/40" />
          <span>06 / Visit the lab</span>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-semibold leading-[0.9] tracking-tight text-[#eaf3ee] md:text-7xl"
              style={{ fontFamily: "var(--font-grotesk)" }}
            >
              Come and
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, #5cf2a0, #5be0e6)",
                }}
              >
                wander the
                <br />
                glasshouse.
              </span>
            </motion.h2>

            <p className="mt-7 max-w-md text-sm leading-relaxed text-[#dafff0]/60">
              {BRAND.location.line} {BRAND.founder.note}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${BRAND.contactEmail}`}
                className="group inline-flex items-center justify-between gap-4 rounded-full border border-[#5cf2a0]/40 bg-[#5cf2a0]/10 px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] text-[#5cf2a0] transition-colors hover:bg-[#5cf2a0]/20"
              >
                <span className="flex items-center gap-2">
                  <Mail size={14} /> {BRAND.contactEmail}
                </span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#collection"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#eaf3ee]/12 px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] text-[#dafff0]/70 transition-colors hover:border-[#5be0e6]/40 hover:text-[#5be0e6]"
              >
                <MapPin size={14} /> {BRAND.location.label}
              </a>
            </div>

            <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[#dafff0]/40">
              {BRAND.founder.name} · {BRAND.founder.role} · Hertford, UK
            </div>
          </div>

          <MediaSlot
            id="F1 / hero loop"
            label="Slow ambient glasshouse loop, day light through glass."
            aspect="3 / 4"
            accent="#5be0e6"
          />
        </div>

        {/* footer */}
        <footer className="mt-24 flex flex-col gap-6 border-t border-[#5cf2a0]/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div
            className="text-2xl font-semibold text-[#eaf3ee]"
            style={{ fontFamily: "var(--font-grotesk)" }}
          >
            {BRAND.name}
            <span className="ml-2 font-mono text-xs font-normal text-[#5cf2a0]/60">
              / grow lab
            </span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#dafff0]/45">
            <span>Module 03 · Futuristic Greenhouse</span>
            <span>{BRAND.domain}</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
