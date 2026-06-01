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
