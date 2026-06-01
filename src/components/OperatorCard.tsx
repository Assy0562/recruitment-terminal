import { getRarityLabel } from "@/lib/recruit";
import type { Operator } from "@/types/operator";
import Image from "next/image";
import Link from "next/link";

type OperatorCardProps = {
  operator: Operator;
};

const rarityDotColor = {
  1: "rgba(113, 113, 122, 0.62)",
  2: "rgba(5, 150, 105, 0.62)",
  3: "rgba(3, 105, 161, 0.66)",
  4: "rgba(109, 40, 217, 0.66)",
  5: "rgba(234, 179, 8, 0.82)",
  6: "rgba(249, 115, 22, 0.9)"
} satisfies Record<Operator["rarity"], string>;

export function OperatorCard({ operator }: OperatorCardProps) {
  const isHighRarity = operator.rarity >= 5;
  const visibleTags = operator.tags.slice(0, 4);
  const hiddenTagCount = operator.tags.length - visibleTags.length;

  return (
    <Link
      className="group relative block overflow-hidden rounded-[2px] border border-zinc-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,244,245,0.9))] p-3 transition hover:border-cyan-700/45 hover:shadow-[0_0_16px_rgba(8,145,178,0.1)] focus:outline-none focus-visible:border-cyan-700 focus-visible:ring-2 focus-visible:ring-cyan-700/20 dark:border-zinc-800 dark:bg-[linear-gradient(180deg,rgba(24,24,27,0.96),rgba(9,9,11,0.98))] dark:hover:border-cyan-300/40 dark:hover:shadow-[0_0_18px_rgba(103,232,249,0.09)] dark:focus-visible:border-cyan-300 dark:focus-visible:ring-cyan-300/25"
      href={`/operators/${operator.id}`}
    >
      <span
        className="pointer-events-none absolute left-0 top-0 h-20 w-12"
        style={{
          backgroundImage: `radial-gradient(circle, ${rarityDotColor[operator.rarity]} 0 0.68px, transparent 0.86px)`,
          backgroundPosition: "0 0, 2px 2px",
          backgroundSize: "4px 4px",
          maskImage:
            "linear-gradient(90deg, black 0%, rgba(0, 0, 0, 0.8) 38%, transparent 96%), linear-gradient(180deg, black 0%, rgba(0, 0, 0, 0.76) 36%, transparent 92%)",
          maskComposite: "intersect",
          WebkitMaskImage:
            "linear-gradient(90deg, black 0%, rgba(0, 0, 0, 0.8) 38%, transparent 96%), linear-gradient(180deg, black 0%, rgba(0, 0, 0, 0.76) 36%, transparent 92%)",
          WebkitMaskComposite: "source-in"
        }}
      />

      <div className="relative flex items-start gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[2px] border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900">
            <Image
              alt={operator.name}
              className="object-contain p-1"
              fill
              sizes="56px"
              src={operator.imageUrl}
            />
          </div>
          <div className="min-w-0">
            <p
              className={
                isHighRarity
                  ? "text-sm font-bold text-amber-600 dark:text-amber-300"
                  : "text-sm font-bold text-cyan-700 dark:text-cyan-300"
              }
            >
              {getRarityLabel(operator.rarity)}
            </p>
            <h3 className="mt-1 truncate text-base font-bold text-zinc-950 dark:text-zinc-50">
              {operator.name}
            </h3>
            <p className="mt-1 text-xs font-semibold text-zinc-500">
              {operator.position} / {operator.profession}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-3 flex flex-wrap gap-1.5">
        {visibleTags.map((tag) => (
          <span
            className="rounded-[2px] border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            key={tag}
          >
            {tag}
          </span>
        ))}
        {hiddenTagCount > 0 ? (
          <span className="rounded-[2px] border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
            +{hiddenTagCount}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
