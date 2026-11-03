"use client";

import { useState } from "react";
import { getOperatorCandidates, getRarityLabel, type TagCombinationCandidate } from "@/lib/recruit";
import { OperatorCard } from "./OperatorCard";

export function OperatorCandidates({ candidates, hasSelection }: {
  candidates: TagCombinationCandidate[];
  hasSelection: boolean;
}) {
  const [openOperatorId, setOpenOperatorId] = useState<string | null>(null);
  const entries = getOperatorCandidates(candidates);
  return (
    <section className="terminal-panel terminal-panel-plain p-3 sm:p-4">
      <div className="flex items-center justify-between gap-2 border-b pb-3 terminal-divider">
        <h2 className="text-lg font-black">キャラ一覧</h2>
        <span className="text-sm font-bold text-cyan-700 dark:text-cyan-300">{entries.length}人</span>
      </div>
      <p className="my-3 text-sm text-zinc-600 dark:text-zinc-400">
        {hasSelection ? "選択したタグの一部を使って募集できる候補です。全タグ一致や入手確定を意味しません。" : "手元の求人タグを選ぶと、募集できるキャラを重複なしで表示します。"}
      </p>
      {hasSelection && entries.length === 0 ? <p>候補がありません。タグを選び直してください。</p> : null}
      <div className="grid items-start gap-2 md:grid-cols-2 xl:grid-cols-4">
        {entries.map(({ operator, combinations }) => (
          <article key={operator.id} className="min-w-0 overflow-hidden rounded-[2px] border border-[#afafaf] dark:border-zinc-800">
            <OperatorCard operator={operator} embedded />
            {operator.rarity === 6 ? <p className="px-2.5 pb-1 text-xs font-bold text-orange-700 dark:text-orange-300">上級エリート必須</p> : null}
            <button type="button" title="狙えるタグを開閉" aria-label={`${operator.name}のタグを開閉`}
              className="flex w-full items-center justify-center border-t border-zinc-500/20 py-1 text-zinc-500 transition hover:bg-zinc-500/10 hover:text-cyan-700 dark:hover:text-cyan-300"
              onClick={() => setOpenOperatorId(current => current === operator.id ? null : operator.id)}>
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={`h-4 w-4 transition-transform ${openOperatorId === operator.id ? "rotate-180" : ""}`}>
                <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openOperatorId === operator.id ? <div className="border-t border-zinc-500/20 p-2 text-xs">
              <p className="mb-2 font-semibold">狙えるタグ（{combinations.length}通り）</p>
              <ul className="space-y-2 border-l border-zinc-500/40 pl-2">
                {combinations.map(combination => (
                  <li key={combination.id}>
                    <p className="font-semibold">{combination.tags.join(" ＋ ")}</p>
                    <p className="mt-1 text-zinc-600 dark:text-zinc-400">最低{getRarityLabel(combination.minRarity)}・候補{combination.operators.length}人</p>
                  </li>
                ))}
              </ul>
            </div> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
