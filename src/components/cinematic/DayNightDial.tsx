"use client";

import { Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { useReducedMotion } from "./hooks";

/** Brass day/night dial. Flips the whole site between the conservatory (day)
 *  and the glasshouse-after-dark (night) palette, with a View Transition morph. */
export default function DayNightDial({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const reduced = useReducedMotion();
  const isNight = theme === "night";

  return (
    <button
      onClick={toggle}
      aria-label={isNight ? "Switch to day" : "Switch to night"}
      aria-pressed={!isNight}
      title={isNight ? "Daytime conservatory" : "After dark"}
      className={`relative flex items-center justify-center overflow-hidden rounded-full border border-[var(--c-brass-line)] text-[var(--c-glow)] transition-colors hover:bg-[var(--c-glow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        compact ? "h-9 w-9" : "h-9 w-9"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={reduced ? false : { opacity: 0, rotate: -45, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 45, scale: 0.5 }}
          transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {isNight ? (
            <Moon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Sun className="h-4 w-4" aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
