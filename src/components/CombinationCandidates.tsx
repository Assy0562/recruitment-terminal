"use client";

import { getRarityLabel, type TagCombinationCandidate } from "@/lib/recruit";
import { useState } from "react";
import { OperatorCard } from "./OperatorCard";

type CombinationCandidatesProps = {
  candidates: TagCombinationCandidate[];
  selectedTags: string[];
};

export function CombinationCandidates({
  candidates,
  selectedTags
}: CombinationCandidatesProps) {
  return (
    <section className="border border-cyan-700/20 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-cyan-300/20 dark:bg-zinc-900/90 dark:shadow-none">
      <div className="flex flex-col gap-1 border-b border-zinc-200 pb-4 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
            Analysis
          </p>
          <h2 className="mt-2 text-xl font-bold text-zinc-950 dark:text-zinc-50">
            求人候補
          </h2>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {selectedTags.length === 0 ? "タグ未選択" : `${candidates.length} パターン`}
        </p>
      </div>

      {selectedTags.length === 0 ? (
        <div className="mt-4 border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-400">
          手元の求人タグを選ぶと、使用できるタグ組み合わせと候補を表示します。
        </div>
      ) : candidates.length === 0 ? (
        <div className="mt-4 border border-amber-500/40 bg-amber-100/70 p-4 text-sm text-amber-800 dark:border-amber-300/40 dark:bg-amber-300/10 dark:text-amber-100">
          有効な組み合わせがありません。タグを選び直してください。
        </div>
      ) : (
        <div className="mt-4 grid gap-4">
          {candidates.map((candidate) => (
            <CandidateCard candidate={candidate} key={candidate.id} />
          ))}
        </div>
      )}
    </section>
  );
}

function CandidateCard({
  candidate
}: {
  candidate: TagCombinationCandidate;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isHighValue = candidate.minRarity >= 5;
  const previewOperators = candidate.operators.slice(0, 4);
  const remainingCount = candidate.operators.length - previewOperators.length;
  const visibleOperators = isExpanded ? candidate.operators : previewOperators;
  const usesAllSelectedTags = candidate.tags.length === candidate.selectedTagCount;

  return (
    <article
      className={[
        "border bg-white/95 p-4 dark:bg-zinc-950/90",
        isHighValue
          ? "border-amber-500/55 dark:border-amber-300/45"
          : "border-zinc-200 dark:border-zinc-800"
      ].join(" ")}
    >
      <div className="flex flex-col gap-3 border-b border-zinc-200 pb-3 dark:border-zinc-800 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            {candidate.tags.map((tag) => (
              <span
                className="border border-cyan-700/35 bg-cyan-50 px-2 py-1 text-xs font-semibold text-cyan-800 dark:border-cyan-300/60 dark:bg-cyan-300/10 dark:text-cyan-100"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid min-w-28 grid-cols-2 gap-2 text-right sm:block">
          {usesAllSelectedTags ? (
            <p className="text-xs font-bold text-cyan-700 dark:text-cyan-300">全タグ一致</p>
          ) : null}
          <p
            className={
              isHighValue
                ? "text-sm font-bold text-amber-600 dark:text-amber-300"
                : "text-sm font-bold text-cyan-700 dark:text-cyan-300"
            }
          >
            最低 {getRarityLabel(candidate.minRarity)}
          </p>
          <p className="text-xs font-semibold text-zinc-500">
            {candidate.operators.length} 件
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 xl:grid-cols-2">
        {visibleOperators.map((operator) => (
          <OperatorCard key={operator.id} operator={operator} />
        ))}
      </div>

      {remainingCount > 0 ? (
        <button
          className="terminal-button mt-3 w-full px-3 py-2 text-left text-xs font-semibold tracking-[0.08em] transition"
          onClick={() => setIsExpanded((current) => !current)}
          type="button"
        >
          {isExpanded ? "閉じる" : `ほか ${remainingCount} 件を表示`}
        </button>
      ) : null}
    </article>
  );
}
