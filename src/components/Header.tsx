import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-cyan-700/20 bg-white/90 backdrop-blur dark:border-cyan-300/15 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-700 dark:text-cyan-300">
            Recruitment Terminal
          </p>
          <h1 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-zinc-50 sm:text-3xl">
            公開求人検索ツール
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
