import { getOperatorCandidates, getRarityLabel, type TagCombinationCandidate } from "@/lib/recruit";
import { OperatorCard } from "./OperatorCard";

export function OperatorCandidates({ candidates, hasSelection }: {
  candidates: TagCombinationCandidate[];
  hasSelection: boolean;
}) {
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
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {entries.map(({ operator, combinations }) => (
          <article key={operator.id} className="min-w-0">
            <OperatorCard operator={operator} />
            {operator.rarity === 6 ? <p className="mt-1 text-xs font-bold text-orange-700 dark:text-orange-300">上級エリート必須</p> : null}
            <details className="mt-2 text-xs">
              <summary className="cursor-pointer py-2 font-semibold">狙えるタグ（{combinations.length}通り）</summary>
              <ul className="space-y-2 border-l border-zinc-500/40 pl-2">
                {combinations.map(combination => (
                  <li key={combination.id}>
                    <p className="font-semibold">{combination.tags.join(" ＋ ")}</p>
                    <p className="mt-1 text-zinc-600 dark:text-zinc-400">最低{getRarityLabel(combination.minRarity)}・候補{combination.operators.length}人</p>
                  </li>
                ))}
              </ul>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
