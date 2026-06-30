import { Header } from "@/components/Header";
import { OperatorSdModel } from "@/components/OperatorSdModel";
import operatorEnglishNamesData from "@/data/operatorEnglishNames.json";
import operatorRangesData from "@/data/operatorRanges.json";
import operatorsData from "@/data/operators.json";
import { getRarityLabel } from "@/lib/recruit";
import type { Operator, OperatorDetailItem } from "@/types/operator";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const operators = operatorsData as Operator[];
const operatorEnglishNames = operatorEnglishNamesData as Record<string, string>;
const operatorRanges = operatorRangesData as unknown as Record<string, RangePattern>;

const labels = {
  back: "\u623b\u308b",
  attackRange: "\u653b\u6483\u7bc4\u56f2",
  blockCount: "\u30d6\u30ed\u30c3\u30af\u6570",
  trait: "\u7279\u6027",
  talents: "\u7d20\u8cea",
  skills: "\u30b9\u30ad\u30eb"
};

const blockCountByBranch: Record<string, string> = {
  "Ambusher Specialist": "0",
  "Artilleryman Sniper": "1",
  "Besieger Sniper": "1",
  "Blast Caster": "1",
  "Chain Caster": "1",
  "Core Caster": "1",
  "Deadeye Sniper": "1",
  "Decel Binder Supporter": "1",
  "Geek Specialist": "1",
  "Heavyshooter Sniper": "1",
  "Hexer Supporter": "1",
  "Marksman Sniper": "1",
  "Mech-Accord Caster": "1",
  "Multi-target Medic": "1",
  "Mystic Caster": "1",
  "Phalanx Caster": "1",
  "Physician Medic": "1",
  "Ritualist Supporter": "1",
  "Splash Caster": "1",
  "Spreadshooter Sniper": "1",
  "Summoner Supporter": "1",
  "Therapist Medic": "1",
  "Tactician Vanguard": "1",
  "Abjurer Supporter": "1",
  "Arts Fighter Guard": "1",
  "Charger Vanguard": "1",
  "Dreadnought Guard": "1",
  "Duelist Defender": "1",
  "Executor Specialist": "1",
  "Fighter Guard": "1",
  "Soloblade Guard": "1",
  "Swordmaster Guard": "1",
  "Centurion Guard": "2",
  "Hookmaster Specialist": "2",
  "Instructor Guard": "2",
  "Lord Guard": "2",
  "Merchant Specialist": "2",
  "Pioneer Vanguard": "2",
  "Push Stroker Specialist": "2",
  "Standard Bearer Vanguard": "2",
  "Arts Protector Defender": "3",
  "Guardian Defender": "3",
  "Juggernaut Defender": "3",
  "Protector Defender": "3",
  "Sentry Protector Defender": "3"
};

type RangePattern = {
  columns: number;
  rows: number;
  origin?: [number, number];
  cells: Array<[number, number]>;
};

const defaultRangePattern: RangePattern = {
  columns: 2,
  rows: 1,
  origin: [0, 0],
  cells: [[0, 0], [1, 0]]
};

type OperatorDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  // Generate static detail pages from local operator JSON at build time.
  return operators.map((operator) => ({
    id: operator.id
  }));
}

export async function generateMetadata({ params }: OperatorDetailPageProps) {
  const { id } = await params;
  const operator = operators.find((operator) => operator.id === id);

  return {
    title: operator ? `${operator.name} | Recruitment Terminal` : "Operator"
  };
}

export default async function OperatorDetailPage({
  params
}: OperatorDetailPageProps) {
  const { id } = await params;
  const operator = operators.find((operator) => operator.id === id);

  if (!operator) {
    notFound();
  }

  const blockCount = getBlockCount(operator);
  const operatorEnglishName = operatorEnglishNames[operator.id];
  const rangePattern = getRangePattern(operator);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[min(1500px,calc(100vw-2rem))] px-3 py-4 sm:px-4 sm:py-5">
        <Link
          className="terminal-button inline-flex px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] transition"
          href="/"
        >
          {labels.back}
        </Link>

        <article className="mt-4 overflow-hidden border border-[#afafaf] bg-[#e4e4e4] shadow-[0_18px_44px_-34px_rgba(15,23,42,0.32)] dark:border-cyan-300/20 dark:bg-zinc-900 dark:shadow-[0_20px_54px_-38px_rgba(0,0,0,0.7)] lg:h-[calc(100vh-132px)] lg:min-h-[600px] lg:max-h-[880px]">
          <div className="grid h-full lg:grid-cols-[minmax(430px,44%)_minmax(0,1fr)] xl:grid-cols-[minmax(500px,46%)_minmax(0,1fr)]">
            <section className="relative min-h-[clamp(440px,68vh,700px)] overflow-hidden border-b border-[#afafaf] bg-[#dcdcdc] lg:h-full lg:min-h-0 lg:border-b-0 lg:border-r dark:border-zinc-800 dark:bg-zinc-950">
              <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(242,242,242,0.46),rgba(212,212,212,0.34)_42%,rgba(251,146,60,0.08)),linear-gradient(90deg,rgba(8,145,178,0.045)_1px,transparent_1px),linear-gradient(rgba(8,145,178,0.045)_1px,transparent_1px)] bg-[length:auto,40px_40px,40px_40px] dark:bg-[linear-gradient(140deg,rgba(24,24,27,0.5),rgba(9,9,11,0.84)_44%,rgba(251,146,60,0.08)),linear-gradient(90deg,rgba(103,232,249,0.035)_1px,transparent_1px),linear-gradient(rgba(103,232,249,0.035)_1px,transparent_1px)]" />
              <div className="absolute right-[-1.5rem] top-10 text-6xl font-black uppercase tracking-[0.08em] text-zinc-950/[0.045] dark:text-white/[0.035] sm:text-7xl lg:text-[clamp(4.5rem,7vw,7rem)]">
                Operator File
              </div>
              <div className="absolute inset-y-0 right-[18%] w-8 -skew-x-[18deg] bg-orange-500/[0.06] dark:bg-orange-400/[0.055]" />
              <div className="relative h-full min-h-[clamp(440px,68vh,700px)] lg:min-h-0">
                <div className="absolute inset-x-[-18%] bottom-[-1%] top-2 sm:inset-x-[-14%] lg:inset-x-[-18%] lg:top-4 xl:inset-x-[-14%]">
                  <Image
                    alt={operator.name}
                    className="scale-[1.08] object-contain object-bottom lg:scale-[1.12]"
                    fill
                    priority
                    sizes="(min-width: 1280px) 52vw, (min-width: 1024px) 50vw, 118vw"
                    src={operator.artUrl}
                  />
                </div>
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-5 sm:inset-7 lg:inset-9"
              >
                <span className="absolute left-0 top-0 h-px w-16 bg-cyan-700/30 dark:bg-cyan-300/28" />
                <span className="absolute left-0 top-0 h-16 w-px bg-cyan-700/30 dark:bg-cyan-300/28" />
                <span className="absolute bottom-0 right-0 h-px w-16 bg-orange-500/34 dark:bg-orange-400/32" />
                <span className="absolute bottom-0 right-0 h-16 w-px bg-orange-500/34 dark:bg-orange-400/32" />
              </div>
              <div className="absolute bottom-5 left-5 border-l-4 border-orange-500 pl-3 dark:border-orange-400">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-950 dark:text-zinc-50">
                  Recruitment
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                  Operator File
                </p>
              </div>
            </section>

            <section className="relative overflow-visible bg-[#e4e4e4] text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50 lg:h-full lg:min-w-0 lg:overflow-y-auto">
              <div className="relative mx-auto max-w-4xl px-5 py-6 sm:px-8 sm:py-8 lg:px-[clamp(2rem,3vw,3rem)]">
                <div className="border-b border-[#afafaf] pb-6 dark:border-zinc-800">
                  <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                    <div>
                      <p className="text-[clamp(1.75rem,3vw,2.5rem)] font-black leading-none tracking-normal text-amber-600 dark:text-amber-300">
                        {getRarityLabel(operator.rarity)}
                      </p>
                      <h1 className="mt-2 text-[clamp(2.25rem,4.2vw,3.25rem)] font-black leading-none tracking-normal text-zinc-950 dark:text-zinc-50">
                        {operator.name}
                      </h1>
                      {operatorEnglishName ? (
                        <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                          {operatorEnglishName}
                        </p>
                      ) : null}

                      <div className="mt-6 border-l-4 border-orange-500 pl-4 dark:border-orange-400">
                        <div className="flex items-center gap-3">
                          <IconTile alt={operator.profession} src={operator.classIconUrl} />
                          <IconTile alt={operator.branchNameEn} src={operator.branchIconUrl} />
                        </div>
                        <p className="mt-3 text-lg font-black text-zinc-950 dark:text-zinc-50">
                          {operator.profession}
                        </p>
                        <p className="mt-1 text-xs font-black uppercase text-zinc-500 dark:text-zinc-400">
                          {operator.position} / {operator.classNameEn} - {operator.branchNameEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end">
                      <OperatorSdModel
                        englishName={operatorEnglishName}
                        operatorName={operator.name}
                      >
                        <div className="flex flex-col gap-1.5">
                          <StatusMetric label="BLOCK" value={blockCount} />
                          <div className="h-px w-full bg-[#afafaf] dark:bg-zinc-800" />
                          <RangePanel
                            compact
                            label={labels.attackRange}
                            pattern={rangePattern}
                          />
                        </div>
                      </OperatorSdModel>
                    </div>
                  </div>
                </div>

                {operator.trait ? (
                  <section className="mt-8">
                    <SectionTitle title={labels.trait} />
                    <p className="mt-3 text-sm font-medium leading-7 text-zinc-700 dark:text-zinc-300">
                      {operator.trait}
                    </p>
                  </section>
                ) : null}

                {operator.talents.length > 0 ? (
                  <section className="mt-8">
                    <SectionTitle title={labels.talents} />
                    <div className="mt-4 space-y-5">
                      {operator.talents.map((talent, index) => (
                        <DetailBlock
                          compact
                          index={index + 1}
                          item={talent}
                          key={`${talent.name}-${index}`}
                        />
                      ))}
                    </div>
                  </section>
                ) : null}

                {operator.skills.length > 0 ? (
                  <section className="mt-8">
                    <SectionTitle title={labels.skills} />
                    <div className="mt-5 space-y-8">
                      {operator.skills.map((skill, index) => (
                        <DetailBlock
                          index={index + 1}
                          item={skill}
                          key={`${skill.name}-${index}`}
                          prefix="SKILL"
                        />
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}

function getBlockCount(operator: Operator): string {
  const traitMatch = operator.trait.match(/\u6575\u3092(\d+)\u4f53\u307e\u3067\u30d6\u30ed\u30c3\u30af/);
  if (traitMatch?.[1]) {
    return traitMatch[1];
  }

  return blockCountByBranch[operator.branchNameEn] ?? "-";
}

function getRangePattern(operator: Operator): RangePattern {
  // Prefer per-operator range data and fall back to the standard shape when missing.
  return operatorRanges[operator.id] ?? defaultRangePattern;
}

function StatusMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-[0.52rem] font-black uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </p>
      <p className="text-xs font-black leading-none text-zinc-950 dark:text-zinc-50">
        {value}
      </p>
    </div>
  );
}

function RangePanel({
  compact = false,
  label,
  pattern
}: {
  compact?: boolean;
  label: string;
  pattern: RangePattern;
}) {
  const activeCells = new Set(pattern.cells.map(([column, row]) => `${column}-${row}`));
  const originCell = pattern.origin ? `${pattern.origin[0]}-${pattern.origin[1]}` : null;

  // origin is the operator tile; cells are attackable tiles.
  return (
    <div className="inline-flex max-w-full flex-col gap-1">
      <p className="text-[0.48rem] font-black uppercase tracking-[0.1em] text-zinc-500">
        {label}
      </p>
      <div
        className="grid gap-0.5"
        style={{
          gridTemplateColumns: `repeat(${pattern.columns}, ${compact ? 7 : 12}px)`,
          gridTemplateRows: `repeat(${pattern.rows}, ${compact ? 7 : 12}px)`
        }}
      >
        {Array.from({ length: pattern.columns * pattern.rows }).map((_, index) => {
          const column = index % pattern.columns;
          const row = Math.floor(index / pattern.columns);
          const cellKey = `${column}-${row}`;
          const isOrigin = originCell === cellKey;
          const isActive = activeCells.has(cellKey);

          return (
            <span
              aria-hidden="true"
              className={[
                compact ? "h-[7px] w-[7px] border" : "h-3 w-3 border",
                isOrigin
                  ? "border-zinc-500 bg-zinc-700 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] dark:border-zinc-100 dark:bg-zinc-100 dark:shadow-none"
                  : isActive
                  ? "border-zinc-500 bg-zinc-400/45 dark:border-zinc-500 dark:bg-zinc-500/45"
                  : "border-transparent"
              ].join(" ")}
              key={`${column}-${row}`}
            />
          );
        })}
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="border-l-4 border-orange-500 pl-3 text-xl font-black text-zinc-950 dark:border-orange-400 dark:text-zinc-50">
      {title}
    </h2>
  );
}

function DetailBlock({
  index,
  item,
  prefix,
  compact = false
}: {
  index: number;
  item: OperatorDetailItem;
  prefix?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={[
        "grid gap-3 border-t border-[#afafaf] pt-4 dark:border-zinc-800",
        compact ? "grid-cols-[32px_1fr]" : "sm:grid-cols-[64px_1fr]"
      ].join(" ")}
    >
      {item.iconUrl ? (
        <div className="relative h-14 w-14 overflow-hidden border border-[#afafaf] bg-[#f2f2f2] dark:border-zinc-700 dark:bg-zinc-950">
          <Image
            alt={item.name}
            className="object-contain"
            fill
            sizes="56px"
            src={item.iconUrl}
          />
        </div>
      ) : (
        <div
          className={[
            "flex items-center justify-center border border-[#afafaf] bg-[#f2f2f2] font-black text-orange-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-orange-300",
            compact ? "h-6 w-6 text-xs" : "h-12 w-12 text-sm"
          ].join(" ")}
        >
          {index}
        </div>
      )}
      <div>
        <p className="text-sm font-black uppercase tracking-normal text-zinc-900 dark:text-zinc-100">
          {prefix ? `${prefix} ${index}` : item.name}
        </p>
        {prefix ? (
          <p className="mt-1 text-base font-black text-zinc-950 dark:text-zinc-50">{item.name}</p>
        ) : null}
        <p className="mt-2 text-sm font-medium leading-7 text-zinc-700 dark:text-zinc-300">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function IconTile({ alt, src }: { alt: string; src: string }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center border border-[#afafaf] bg-[#f2f2f2] dark:border-zinc-700 dark:bg-zinc-100">
      <Image
        alt={alt}
        className="object-contain p-2"
        height={56}
        src={src}
        unoptimized
        width={56}
      />
    </div>
  );
}
