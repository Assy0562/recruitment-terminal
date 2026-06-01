import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-zinc-300/80 bg-zinc-100/92 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/94">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.32em] text-cyan-700 dark:text-cyan-300">
            Recruitment Terminal
          </p>
          <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
            <h1 className="text-2xl font-black leading-none text-zinc-950 dark:text-zinc-50 sm:text-3xl">
              公開求人検索ツール
            </h1>
            <p className="border-l border-orange-500/70 pl-3 text-[0.62rem] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
              Tactical Search
            </p>
          </div>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
