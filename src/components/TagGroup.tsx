type TagGroupProps = {
  category: string;
  isSelectionFull: boolean;
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
};

export function TagGroup({
  category,
  isSelectionFull,
  tags,
  selectedTags,
  onToggleTag
}: TagGroupProps) {
  return (
    <section className="border border-zinc-200 bg-white/80 p-3 dark:border-zinc-800 dark:bg-zinc-950/75">
      <h2 className="mb-3 border-l-2 border-orange-500 pl-2 text-sm font-bold text-zinc-900 dark:border-orange-400 dark:text-zinc-100">
        {category}
      </h2>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const isRare = tag.includes("エリート");
          const isDisabled = isSelectionFull && !isSelected;

          return (
            <button
              className={[
                "terminal-button min-h-10 px-3 py-2 text-left text-sm font-semibold transition",
                "disabled:cursor-not-allowed disabled:opacity-35",
                isSelected
                  ? "terminal-button-selected"
                  : "",
                isRare && !isSelected
                  ? "border-orange-500/45 text-orange-800 dark:border-orange-400/42 dark:text-orange-200"
                  : ""
              ].join(" ")}
              disabled={isDisabled}
              key={tag}
              onClick={() => onToggleTag(tag)}
              type="button"
            >
              {tag}
            </button>
          );
        })}
      </div>
    </section>
  );
}
