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
      className="group relative block min-w-0 overflow-hidden rounded-[2px] border border-[#afafaf] bg-[linear-gradient(180deg,rgba(228,228,228,0.96),rgba(214,214,214,0.93))] px-2.5 py-2 transition hover:border-cyan-700/45 focus:outline-none focus-visible:border-cyan-700 focus-visible:ring-2 focus-visible:ring-cyan-700/20 dark:border-zinc-800 dark:bg-[linear-gradient(180deg,rgba(24,24,27,0.96),rgba(9,9,11,0.98))] dark:hover:border-cyan-300/40 dark:focus-visible:border-cyan-300 dark:focus-visible:ring-cyan-300/25"
      href={`/operators/${operator.id}`}
    >
      <span
        className="pointer-events-none absolute left-0 top-0 h-16 w-10"
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

      <div className="relative flex min-w-0 items-center gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[2px] border border-[#afafaf] bg-[#f2f2f2] dark:border-zinc-700 dark:bg-zinc-900">
            <Image
              alt={operator.name}
              className="object-contain p-1"
              fill
              sizes="44px"
              src={operator.imageUrl}
            />
          </div>
          <div className="min-w-0">
            <p
              className={[
                "text-[0.68rem] font-black leading-none",
                isHighRarity
                  ? "text-amber-600 dark:text-amber-300"
                  : "text-cyan-700 dark:text-cyan-300"
              ].join(" ")}
            >
              {getRarityLabel(operator.rarity)}
            </p>
            <h3 className="mt-0.5 truncate text-sm font-black leading-tight text-zinc-950 dark:text-zinc-50">
              {operator.name}
            </h3>
            <p className="mt-0.5 truncate text-[0.66rem] font-semibold text-zinc-500">
              {operator.position} / {operator.profession}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-2 flex flex-wrap gap-1">
        {visibleTags.map((tag) => (
          <span
            className="rounded-[2px] border border-[#afafaf] bg-[#f2f2f2] px-1.5 py-0.5 text-[0.66rem] leading-4 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            key={tag}
          >
            {tag}
          </span>
        ))}
        {hiddenTagCount > 0 ? (
          <span className="rounded-[2px] border border-[#afafaf] bg-[#f2f2f2] px-1.5 py-0.5 text-[0.66rem] leading-4 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
            +{hiddenTagCount}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
