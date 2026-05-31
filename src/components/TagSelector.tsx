import type { TagCategory } from "@/types/operator";
import { TagGroup } from "./TagGroup";

type TagSelectorProps = {
  maxSelectedTags: number;
  tagCategories: TagCategory[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
};

export function TagSelector({
  maxSelectedTags,
  tagCategories,
  selectedTags,
  onToggleTag
}: TagSelectorProps) {
  const isSelectionFull = selectedTags.length >= maxSelectedTags;

  return (
    <aside className="space-y-3">
      <div className="border border-cyan-700/20 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-cyan-300/20 dark:bg-zinc-900/90 dark:shadow-none">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
          Tag Filter
        </p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          求人票のタグを最大{maxSelectedTags}個まで選択してください。
        </p>
      </div>
      {tagCategories.map((group) => (
        <TagGroup
          category={group.category}
          isSelectionFull={isSelectionFull}
          key={group.category}
          onToggleTag={onToggleTag}
          selectedTags={selectedTags}
          tags={group.tags}
        />
      ))}
    </aside>
  );
}
