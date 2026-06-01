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
    <section className="terminal-panel p-4">
      <span className="terminal-watermark">Result</span>
      <div className="flex flex-col gap-2 border-b pb-4 terminal-divider sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="terminal-kicker">Recruitment</p>
          <h2 className="mt-2 text-xl font-black text-zinc-950 dark:text-zinc-50">
            {"\u6c42\u4eba\u5019\u88dc"}
          </h2>
        </div>
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          {selectedTags.length === 0
            ? "\u30bf\u30b0\u672a\u9078\u629e"
            : `${candidates.length} \u30d1\u30bf\u30fc\u30f3`}
        </p>
      </div>

      {selectedTags.length === 0 ? (
        <div className="mt-4 border border-zinc-200 bg-zinc-100/80 p-4 text-sm leading-6 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-400">
          {"\u624b\u5143\u306e\u6c42\u4eba\u30bf\u30b0\u3092\u9078\u3076\u3068\u3001\u4f7f\u7528\u3067\u304d\u308b\u30bf\u30b0\u7d44\u307f\u5408\u308f\u305b\u3068\u5019\u88dc\u3092\u8868\u793a\u3057\u307e\u3059\u3002"}
        </div>
      ) : candidates.length === 0 ? (
        <div className="mt-4 border border-orange-500/35 bg-orange-100/55 p-4 text-sm text-orange-800 dark:border-orange-400/35 dark:bg-orange-400/10 dark:text-orange-100">
          {"\u6709\u52b9\u306a\u7d44\u307f\u5408\u308f\u305b\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u30bf\u30b0\u3092\u9078\u3073\u76f4\u3057\u3066\u304f\u3060\u3055\u3044\u3002"}
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
        "terminal-panel p-4",
        isHighValue ? "border-orange-500/45 dark:border-orange-400/38" : ""
      ].join(" ")}
    >
      <span className="terminal-watermark">File</span>
      <div className="flex flex-col gap-3 border-b pb-3 terminal-divider sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-500">
            Operator File
          </p>
          <div className="flex flex-wrap gap-2">
            {candidate.tags.map((tag) => (
              <span
                className="border border-cyan-700/30 bg-cyan-50/70 px-2 py-1 text-xs font-semibold text-cyan-800 dark:border-cyan-300/35 dark:bg-cyan-300/8 dark:text-cyan-100"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid min-w-32 grid-cols-2 gap-2 text-right sm:block">
          {usesAllSelectedTags ? (
            <p className="text-xs font-bold text-cyan-700 dark:text-cyan-300">
              {"\u5168\u30bf\u30b0\u4e00\u81f4"}
            </p>
          ) : null}
          <p
            className={
              isHighValue
                ? "text-sm font-bold text-orange-700 dark:text-orange-300"
                : "text-sm font-bold text-cyan-700 dark:text-cyan-300"
            }
          >
            {"\u6700\u4f4e "}
            {getRarityLabel(candidate.minRarity)}
          </p>
          <p className="text-xs font-semibold text-zinc-500">
            {candidate.operators.length}
            {" \u4ef6"}
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
          {isExpanded
            ? "\u9589\u3058\u308b"
            : `\u307b\u304b ${remainingCount} \u4ef6\u3092\u8868\u793a`}
        </button>
      ) : null}
    </article>
  );
}
