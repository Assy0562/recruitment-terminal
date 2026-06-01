type SelectedTagsProps = {
  maxSelectedTags: number;
  selectedTags: string[];
  onClear: () => void;
  onRemoveTag: (tag: string) => void;
};

export function SelectedTags({
  maxSelectedTags,
  selectedTags,
  onClear,
  onRemoveTag
}: SelectedTagsProps) {
  const progress = `${selectedTags.length}/${maxSelectedTags}`;

  return (
    <section className="terminal-panel terminal-panel-plain recruitment-console-panel p-4 sm:p-5">
      <span className="terminal-watermark">Control</span>
      <div className="border-b pb-4 terminal-divider">
        <div>
          <p className="terminal-kicker">Recruitment Control Panel</p>
          <h2 className="mt-2 text-xl font-black text-zinc-950 dark:text-zinc-50">
            {"\u9078\u629e\u4e2d\u30bf\u30b0"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {"\u6c42\u4eba\u7968\u306e\u30bf\u30b0\u3092\u6700\u5927"}
            {maxSelectedTags}
            {"\u500b\u307e\u3067\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002"}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-h-10 flex-1 flex-wrap gap-2">
          {selectedTags.length === 0 ? (
            <div>
              <p className="text-sm font-semibold text-zinc-500">
                {"\u672a\u9078\u629e\u3067\u3059\u3002"}
              </p>
              <p className="mt-1 text-xs leading-5 text-zinc-500/80 dark:text-zinc-500">
                {"\u5de6\u306e\u30bf\u30b0\u30d1\u30cd\u30eb\u304b\u3089\u6761\u4ef6\u3092\u9078\u3076\u3068\u3001\u4f7f\u7528\u3067\u304d\u308b\u30bf\u30b0\u7d44\u307f\u5408\u308f\u305b\u3068\u5019\u88dc\u304c\u8868\u793a\u3055\u308c\u307e\u3059\u3002"}
              </p>
            </div>
          ) : (
            selectedTags.map((tag) => (
              <button
                className="terminal-button terminal-button-selected px-3 py-1.5 text-sm font-semibold transition"
                key={tag}
                onClick={() => onRemoveTag(tag)}
                type="button"
              >
                {tag} x
              </button>
            ))
          )}
        </div>

        <div className="flex shrink-0 items-stretch gap-2 sm:justify-end">
          <div className="grid min-h-9 min-w-20 border border-zinc-300 bg-zinc-50 px-2.5 py-1 text-right shadow-[0_8px_14px_-10px_rgba(15,23,42,0.42)] dark:border-zinc-700 dark:bg-zinc-950/70">
            <p className="text-[0.52rem] font-black uppercase leading-none tracking-[0.16em] text-zinc-500">
              Selected
            </p>
            <p className="self-end font-mono text-lg font-black leading-none text-cyan-700 dark:text-cyan-200">
              {progress}
            </p>
          </div>
          <button
            className="terminal-button terminal-button-warn min-h-9 px-3 py-1.5 text-xs font-semibold tracking-[0.08em] transition disabled:cursor-not-allowed disabled:opacity-40"
            disabled={selectedTags.length === 0}
            onClick={onClear}
            type="button"
          >
            RESET
          </button>
        </div>
      </div>
    </section>
  );
}
