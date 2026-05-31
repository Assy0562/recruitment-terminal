"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
  window.localStorage.setItem("theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => {
      return currentTheme === "dark" ? "light" : "dark";
    });
  }

  const isDark = theme === "dark";

  return (
    <button
      aria-label="\u30c6\u30fc\u30de\u3092\u5207\u308a\u66ff\u3048\u308b"
      aria-pressed={isDark}
      className="terminal-button inline-flex h-10 items-center gap-2 px-2 text-xs font-black uppercase tracking-[0.16em] transition"
      onClick={toggleTheme}
      type="button"
    >
      <span className="w-11 text-center">{isDark ? "DARK" : "LIGHT"}</span>
      <span className="relative h-5 w-10 border border-zinc-400/60 bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-950">
        <span
          className={[
            "absolute left-1 top-1/2 h-3 w-3 -translate-y-1/2 bg-cyan-700 transition-transform dark:bg-cyan-300",
            isDark ? "translate-x-5" : "translate-x-0"
          ].join(" ")}
        />
      </span>
    </button>
  );
}
