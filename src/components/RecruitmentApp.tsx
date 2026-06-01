"use client";

import { useMemo, useState } from "react";
import operatorsData from "@/data/operators.json";
import tagCategoriesData from "@/data/tags.json";
import { getTagCombinationCandidates } from "@/lib/recruit";
import type { Operator, TagCategory } from "@/types/operator";
import { CombinationCandidates } from "./CombinationCandidates";
import { SelectedTags } from "./SelectedTags";
import { TagSelector } from "./TagSelector";

const operators = operatorsData as Operator[];
const tagCategories = tagCategoriesData as TagCategory[];
const maxSelectedTags = 5;

export function RecruitmentApp() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const combinationCandidates = useMemo(() => {
    return getTagCombinationCandidates(operators, selectedTags);
  }, [selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : currentTags.length >= maxSelectedTags
          ? currentTags
        : [...currentTags, tag]
    );
  }

  function clearTags() {
    setSelectedTags([]);
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-4 px-4 py-6 lg:grid-cols-[340px_1fr]">
      <TagSelector
        maxSelectedTags={maxSelectedTags}
        onToggleTag={toggleTag}
        selectedTags={selectedTags}
        tagCategories={tagCategories}
      />
      <div className="space-y-4">
        <SelectedTags
          maxSelectedTags={maxSelectedTags}
          onClear={clearTags}
          onRemoveTag={toggleTag}
          selectedTags={selectedTags}
        />
        <CombinationCandidates
          candidates={combinationCandidates}
          selectedTags={selectedTags}
        />
      </div>
    </main>
  );
}
