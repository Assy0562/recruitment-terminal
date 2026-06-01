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
      <div className="terminal-panel p-4">
        <span className="terminal-watermark">Search</span>
        <p className="terminal-kicker">Recruitment Terminal</p>
        <h2 className="mt-2 text-lg font-black text-zinc-950 dark:text-zinc-50">
          {"\u691c\u7d22\u6761\u4ef6"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {"\u6c42\u4eba\u7968\u306e\u30bf\u30b0\u3092\u6700\u5927"}
          {maxSelectedTags}
          {"\u500b\u307e\u3067\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002"}
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
