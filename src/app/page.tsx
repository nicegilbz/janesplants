"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Leaf } from "lucide-react";
import { BRAND, CONCEPTS } from "@/lib/content";

export default function Hub() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070b09] text-white">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[60vh] w-[60vh] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[60vh] w-[60vh] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10 sm:px-10">
        {/* header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <Leaf className="h-5 w-5 text-emerald-400" />
            <span className="font-[family-name:var(--font-serif)] text-lg tracking-tight">
              {BRAND.name}
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
            {BRAND.domain}
          </span>
        </motion.header>

        {/* intro */}
        <div className="flex flex-1 flex-col justify-center py-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-emerald-400/80"
          >
            Concept gallery / four directions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl font-[family-name:var(--font-serif)] text-5xl font-light leading-[0.98] tracking-tight sm:text-7xl"
          >
            One brand,
            <br />
            four ways to feel it.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/55"
          >
            {BRAND.mission} Below are four fully built directions for{" "}
            {BRAND.name}. Open each, scroll it, then tell me which one to take
            all the way.
          </motion.p>
        </div>

        {/* concept grid */}
        <div className="grid grid-cols-1 gap-4 pb-10 md:grid-cols-2">
          {CONCEPTS.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/${c.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-white/10 p-7 transition-colors duration-500 hover:border-white/25"
                style={{ background: c.bg }}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: c.accent }}
                />
                <div className="relative flex items-start justify-between">
                  <span
                    className="font-mono text-xs tracking-[0.3em]"
                    style={{ color: c.accent }}
                  >
                    {c.index}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
                <h2
                  className="relative mt-10 font-[family-name:var(--font-serif)] text-3xl font-light tracking-tight text-white sm:text-4xl"
                >
                  {c.name}
                </h2>
                <p className="relative mt-3 max-w-md text-sm leading-relaxed text-white/55">
                  {c.blurb}
                </p>
                <div
                  className="relative mt-6 h-px w-0 transition-all duration-700 group-hover:w-full"
                  style={{ background: c.accent }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <footer className="flex items-center justify-between border-t border-white/10 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
          <span>Prototype build</span>
          <span>Pick one to finish</span>
        </footer>
      </div>
    </main>
  );
}
