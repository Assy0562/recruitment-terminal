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
      className="terminal-button inline-flex h-9 items-center gap-2 px-2.5 text-[0.68rem] font-black uppercase tracking-[0.16em] transition"
      onClick={toggleTheme}
      type="button"
    >
      <span className="text-zinc-500 dark:text-zinc-500">Mode</span>
      <span className="grid grid-cols-2 border border-zinc-400/50 bg-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-950/70">
        <span
          className={[
            "px-2 py-1 transition",
            isDark
              ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-950"
              : "text-zinc-500 dark:text-zinc-600"
          ].join(" ")}
        >
          D
        </span>
        <span
          className={[
            "border-l border-zinc-400/50 px-2 py-1 transition dark:border-zinc-700",
            isDark
              ? "text-zinc-500 dark:text-zinc-600"
              : "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-950"
          ].join(" ")}
        >
          L
        </span>
      </span>
    </button>
  );
}
