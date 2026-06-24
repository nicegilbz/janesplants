"use client";

/**
 * Day / Night theme for the cinematic site.
 *
 * Default is "night" (the polished dark glasshouse). The dial toggles to "day"
 * (a brighter conservatory palette). State persists in localStorage and the
 * `data-theme` attribute is written to <html> synchronously inside a View
 * Transition so the whole site cross-fades between states. SSR-safe: first
 * render is always night, the stored choice is applied after mount.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { prefersReducedMotion } from "./hooks";

type Theme = "day" | "night";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "night",
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("night");

  // Apply the stored choice after mount (keeps SSR deterministic).
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("jp-theme");
    } catch {}
    if (stored === "day" || stored === "night") {
      document.documentElement.dataset.theme = stored;
      setTheme(stored);
    } else {
      document.documentElement.dataset.theme = "night";
    }
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === "night" ? "day" : "night";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      flushSync(() => setTheme(next));
    };
    const reduce = prefersReducedMotion();
    const vt = (
      document as Document & {
        startViewTransition?: (cb: () => void) => void;
      }
    ).startViewTransition;
    if (!reduce && typeof vt === "function") {
      vt.call(document, apply);
    } else {
      apply();
    }
    try {
      localStorage.setItem("jp-theme", next);
    } catch {}
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
