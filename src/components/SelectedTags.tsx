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
    <section className="terminal-panel p-4">
      <span className="terminal-watermark">Tags</span>
      <div className="flex items-start justify-between gap-3 border-b pb-3 terminal-divider">
        <div>
          <p className="terminal-kicker">Operator File</p>
          <h2 className="mt-2 text-lg font-black text-zinc-950 dark:text-zinc-50">
            {"\u9078\u629e\u4e2d\u30bf\u30b0"}
          </h2>
        </div>
        <button
          className="terminal-button terminal-button-warn px-3 py-1.5 text-xs font-semibold tracking-[0.08em] transition disabled:cursor-not-allowed disabled:opacity-40"
          disabled={selectedTags.length === 0}
          onClick={onClear}
          type="button"
        >
          RESET
        </button>
      </div>
      <p className="mt-3 text-xs font-semibold text-zinc-500">
        {selectedTags.length} / {maxSelectedTags}
      </p>

      <div className="mt-3 flex min-h-10 flex-wrap gap-2">
        {selectedTags.length === 0 ? (
          <p className="text-sm text-zinc-500">{"\u672a\u9078\u629e\u3067\u3059\u3002"}</p>
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
    </section>
  );
}
