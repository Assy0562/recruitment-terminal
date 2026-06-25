"use client";

import { getRarityLabel, type TagCombinationCandidate } from "@/lib/recruit";
import { useEffect, useState } from "react";
import { OperatorCard } from "./OperatorCard";

type CombinationCandidatesProps = {
  candidates: TagCombinationCandidate[];
  selectedTags: string[];
};

type StoredExpandedCandidates = {
  selectedTagsKey: string;
  expandedCandidateIds: string[];
};

const expandedCandidatesStorageKey =
  "recruitment-terminal:expanded-candidates";

function getPreviewOperatorLimit(width: number): number {
  if (width >= 1440) {
    return 12;
  }

  if (width >= 1024) {
    return 8;
  }

  if (width >= 768) {
    return 6;
  }

  return 4;
}

function usePreviewOperatorLimit() {
  const [previewOperatorLimit, setPreviewOperatorLimit] = useState(4);

  useEffect(() => {
    function updatePreviewOperatorLimit() {
      setPreviewOperatorLimit(getPreviewOperatorLimit(window.innerWidth));
    }

    updatePreviewOperatorLimit();
    window.addEventListener("resize", updatePreviewOperatorLimit);

    return () => {
      window.removeEventListener("resize", updatePreviewOperatorLimit);
    };
  }, []);

  return previewOperatorLimit;
}

function createSelectedTagsKey(selectedTags: string[]): string {
  return selectedTags.join("__");
}

function getStoredExpandedCandidateIds(selectedTagsKey: string): string[] {
  try {
    const storedValue = window.sessionStorage.getItem(
      expandedCandidatesStorageKey
    );
    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue) as StoredExpandedCandidates;
    if (
      parsedValue.selectedTagsKey !== selectedTagsKey ||
      !Array.isArray(parsedValue.expandedCandidateIds)
    ) {
      return [];
    }

    return parsedValue.expandedCandidateIds.filter(
      (candidateId): candidateId is string => typeof candidateId === "string"
    );
  } catch {
    return [];
  }
}

export function CombinationCandidates({
  candidates,
  selectedTags
}: CombinationCandidatesProps) {
  const selectedTagsKey = createSelectedTagsKey(selectedTags);
  const previewOperatorLimit = usePreviewOperatorLimit();
  const [expandedCandidateIds, setExpandedCandidateIds] = useState<string[]>(
    () => {
      if (selectedTags.length === 0) {
        return [];
      }

      return getStoredExpandedCandidateIds(selectedTagsKey);
    }
  );

  useEffect(() => {
    if (selectedTags.length === 0) {
      window.sessionStorage.removeItem(expandedCandidatesStorageKey);
      return;
    }

    const visibleCandidateIds = new Set(
      candidates.map((candidate) => candidate.id)
    );
    const storableExpandedIds = expandedCandidateIds.filter((candidateId) =>
      visibleCandidateIds.has(candidateId)
    );

    window.sessionStorage.setItem(
      expandedCandidatesStorageKey,
      JSON.stringify({
        selectedTagsKey,
        expandedCandidateIds: storableExpandedIds
      } satisfies StoredExpandedCandidates)
    );
  }, [candidates, expandedCandidateIds, selectedTags.length, selectedTagsKey]);

  function toggleCandidate(candidateId: string) {
    setExpandedCandidateIds((currentCandidateIds) =>
      currentCandidateIds.includes(candidateId)
        ? currentCandidateIds.filter((currentCandidateId) => {
            return currentCandidateId !== candidateId;
          })
        : [...currentCandidateIds, candidateId]
    );
  }

  return (
    <section className="terminal-panel terminal-panel-plain recruitment-console-panel p-3 sm:p-4">
      <span className="terminal-watermark">Result</span>
      <div className="flex flex-col gap-2 border-b pb-3 terminal-divider sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="terminal-kicker">Recruitment</p>
          <h2 className="mt-1 text-lg font-black text-zinc-950 dark:text-zinc-50">
            {"\u6c42\u4eba\u5019\u88dc"}
          </h2>
        </div>
        <p
          className={[
            "text-sm font-black",
            selectedTags.length === 0
              ? "text-zinc-500 dark:text-zinc-400"
              : "text-cyan-700 dark:text-cyan-300"
          ].join(" ")}
        >
          {selectedTags.length === 0
            ? "\u30bf\u30b0\u672a\u9078\u629e"
            : `${candidates.length} \u30d1\u30bf\u30fc\u30f3`}
        </p>
      </div>

      {selectedTags.length === 0 ? (
        <div className="mt-3 border border-[#afafaf] bg-[#f2f2f2]/80 p-3 text-sm leading-6 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-400">
          {"\u624b\u5143\u306e\u6c42\u4eba\u30bf\u30b0\u3092\u9078\u3076\u3068\u3001\u4f7f\u7528\u3067\u304d\u308b\u30bf\u30b0\u7d44\u307f\u5408\u308f\u305b\u3068\u5019\u88dc\u3092\u8868\u793a\u3057\u307e\u3059\u3002"}
        </div>
      ) : candidates.length === 0 ? (
        <div className="mt-3 border border-orange-500/35 bg-orange-100/65 p-3 text-sm text-orange-800 dark:border-orange-400/35 dark:bg-orange-400/10 dark:text-orange-100">
          {"\u6709\u52b9\u306a\u7d44\u307f\u5408\u308f\u305b\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u30bf\u30b0\u3092\u9078\u3073\u76f4\u3057\u3066\u304f\u3060\u3055\u3044\u3002"}
        </div>
      ) : (
        <div className="mt-3 grid gap-3">
          {candidates.map((candidate) => (
            <CandidateCard
              candidate={candidate}
              isExpanded={expandedCandidateIds.includes(candidate.id)}
              key={candidate.id}
              onToggleExpanded={toggleCandidate}
              previewOperatorLimit={previewOperatorLimit}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function CandidateCard({
  candidate,
  isExpanded,
  onToggleExpanded,
  previewOperatorLimit
}: {
  candidate: TagCombinationCandidate;
  isExpanded: boolean;
  onToggleExpanded: (candidateId: string) => void;
  previewOperatorLimit: number;
}) {
  const isHighValue = candidate.minRarity >= 5;
  const previewOperators = candidate.operators.slice(0, previewOperatorLimit);
  const remainingCount = candidate.operators.length - previewOperators.length;
  const visibleOperators = isExpanded ? candidate.operators : previewOperators;
  const usesAllSelectedTags = candidate.tags.length === candidate.selectedTagCount;

  return (
    <article
      className={[
        "terminal-panel terminal-panel-plain p-3",
        isHighValue ? "border-orange-500/45 dark:border-orange-400/38" : ""
      ].join(" ")}
    >
      <div className="flex flex-col gap-2 border-b pb-2.5 terminal-divider sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="mb-1.5 text-[0.56rem] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
            Operator File
          </p>
          <div className="flex flex-wrap gap-1.5">
            {candidate.tags.map((tag) => (
              <span
                className="border border-[#afafaf] bg-[#f2f2f2]/75 px-1.5 py-0.5 text-[0.68rem] font-semibold leading-4 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid min-w-32 grid-cols-3 gap-1 border border-[#afafaf] bg-[#f2f2f2]/78 px-2 py-1.5 text-right sm:block dark:border-zinc-800 dark:bg-zinc-950/55">
          {usesAllSelectedTags ? (
            <p className="text-[0.56rem] font-black uppercase tracking-[0.1em] text-cyan-700 dark:text-cyan-300">
              {"\u5168\u30bf\u30b0\u4e00\u81f4"}
            </p>
          ) : null}
          <p
            className={
              isHighValue
                ? "text-xs font-black text-orange-700 dark:text-orange-300"
                : "text-xs font-black text-cyan-700 dark:text-cyan-300"
            }
          >
            {"\u6700\u4f4e "}
            {getRarityLabel(candidate.minRarity)}
          </p>
          <p className="text-[0.68rem] font-black text-zinc-500">
            {candidate.operators.length}
            {" \u4ef6"}
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
        {visibleOperators.map((operator) => (
          <OperatorCard key={operator.id} operator={operator} />
        ))}
      </div>

      {remainingCount > 0 ? (
        <button
          className="terminal-button terminal-button-selected mt-2.5 w-full px-2.5 py-1.5 text-left text-[0.68rem] font-semibold tracking-[0.08em] transition"
          onClick={() => onToggleExpanded(candidate.id)}
          type="button"
        >
          {isExpanded
            ? "\u9589\u3058\u308b"
            : `\u307b\u304b ${remainingCount} \u4ef6\u3092\u8868\u793a`}
        </button>
      ) : null}
    </article>
  );
}
