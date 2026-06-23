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

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.64 5.64 4.22 4.22M19.78 19.78l-1.42-1.42M5.64 18.36l-1.42 1.42M19.78 4.22l-1.42 1.42"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M18.4 15.7A7.2 7.2 0 0 1 8.3 5.6 8 8 0 1 0 18.4 15.7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
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
      aria-label="テーマを切り替える"
      aria-pressed={isDark}
      className="group inline-grid h-8 w-[104px] grid-cols-2 overflow-hidden rounded-full border border-zinc-400/30 bg-zinc-900/10 text-zinc-500 shadow-[0_10px_18px_-17px_rgba(15,23,42,0.5)] transition duration-200 hover:border-orange-500/40 dark:border-zinc-700/75 dark:bg-zinc-900/64 dark:text-zinc-500 dark:shadow-[0_12px_22px_-18px_rgba(0,0,0,0.9)]"
      onClick={toggleTheme}
      type="button"
    >
      <span
        className={[
          "flex items-center justify-center transition duration-200",
          isDark
            ? "text-zinc-500 dark:text-zinc-500"
            : "bg-white/35 text-orange-500 dark:bg-white/[0.05] dark:text-orange-400"
        ].join(" ")}
      >
        <SunIcon />
      </span>
      <span
        className={[
          "flex items-center justify-center border-l border-zinc-500/15 transition duration-200 dark:border-zinc-700/60",
          isDark
            ? "bg-black/[0.04] text-orange-500 dark:bg-white/[0.05] dark:text-orange-400"
            : "text-zinc-500 dark:text-zinc-500"
        ].join(" ")}
      >
        <MoonIcon />
      </span>
    </button>
  );
}
