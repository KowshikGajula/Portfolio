import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "kg-theme";

/**
 * Applies the theme class to <html> before React mounts so there is no flash
 * of the wrong colour scheme. Safe to call at module scope.
 *
 * This site is art-directed dark-first: when the visitor has no stored
 * preference we ship dark, and the toggle (plus their stored choice) handles
 * everything else. Their explicit choice always wins.
 */
export function initTheme(): void {
  if (typeof document === "undefined") return;

  let theme: Theme = "dark";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      theme = stored;
    }
  } catch {
    /* storage unavailable — keep the default */
  }

  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function useTheme(): { theme: Theme; toggleTheme: () => void; isDark: boolean } {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#04060d" : "#f4f6fb");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme, isDark: theme === "dark" };
}
