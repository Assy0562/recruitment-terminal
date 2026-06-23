"use client";

import { useEffect, useMemo, useState } from "react";
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
const selectedTagsStorageKey = "recruitment-terminal:selected-tags";
const validTags = new Set(tagCategories.flatMap((group) => group.tags));

// 詳細ページから戻ったときに、選択中タグを復元するための読み込み処理。
function getStoredSelectedTags(): string[] {
  try {
    const storedValue = window.sessionStorage.getItem(selectedTagsStorageKey);
    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .filter((tag): tag is string => {
        return typeof tag === "string" && validTags.has(tag);
      })
      .slice(0, maxSelectedTags);
  } catch {
    return [];
  }
}

function createSelectedTagsKey(selectedTags: string[]): string {
  return selectedTags.join("__");
}

export function RecruitmentApp() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hasRestoredSelection, setHasRestoredSelection] = useState(false);

  // sessionStorageはブラウザでしか使えないため、初回表示後に復元する。
  useEffect(() => {
    queueMicrotask(() => {
      setSelectedTags(getStoredSelectedTags());
      setHasRestoredSelection(true);
    });
  }, []);

  useEffect(() => {
    if (!hasRestoredSelection) {
      return;
    }

    window.sessionStorage.setItem(
      selectedTagsStorageKey,
      JSON.stringify(selectedTags)
    );
  }, [hasRestoredSelection, selectedTags]);

  const selectedTagsKey = useMemo(() => {
    return createSelectedTagsKey(selectedTags);
  }, [selectedTags]);

  // 選択タグが変わったときだけ候補を再計算し、不要な計算を避ける。
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
        {hasRestoredSelection ? (
          <CombinationCandidates
            candidates={combinationCandidates}
            key={selectedTagsKey}
            selectedTags={selectedTags}
          />
        ) : null}
      </div>
    </main>
  );
}
