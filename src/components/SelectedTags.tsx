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
  return (
    <section className="border border-zinc-200 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100">
          Selected
        </h2>
        <button
          className="terminal-button terminal-button-warn px-3 py-1.5 text-xs font-semibold tracking-[0.08em] transition disabled:cursor-not-allowed disabled:opacity-40"
          disabled={selectedTags.length === 0}
          onClick={onClear}
          type="button"
        >
          RESET
        </button>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        {selectedTags.length} / {maxSelectedTags}
      </p>

      <div className="mt-3 flex min-h-10 flex-wrap gap-2">
        {selectedTags.length === 0 ? (
          <p className="text-sm text-zinc-500">未選択です。</p>
        ) : (
          selectedTags.map((tag) => (
            <button
              className="terminal-button terminal-button-selected px-3 py-1.5 text-sm font-semibold transition"
              key={tag}
              onClick={() => onRemoveTag(tag)}
              type="button"
            >
              {tag} ×
            </button>
          ))
        )}
      </div>
    </section>
  );
}
