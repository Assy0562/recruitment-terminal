import { Header } from "@/components/Header";
import operatorsData from "@/data/operators.json";
import { getRarityLabel } from "@/lib/recruit";
import type { Operator, OperatorDetailItem } from "@/types/operator";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const operators = operatorsData as Operator[];

const labels = {
  back: "\u623b\u308b",
  trait: "\u7279\u6027",
  talents: "\u7d20\u8cea",
  skills: "\u30b9\u30ad\u30eb"
};

type OperatorDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
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

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-5">
        <Link
          className="terminal-button inline-flex px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] transition"
          href="/"
        >
          {labels.back}
        </Link>

        <article className="mt-4 overflow-hidden border border-cyan-700/20 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] dark:border-cyan-300/20 dark:bg-zinc-900 dark:shadow-[0_24px_80px_rgba(0,0,0,0.28)] lg:h-[calc(100vh-140px)]">
          <div className="grid h-full lg:grid-cols-[42%_1fr]">
            <section className="relative min-h-[460px] overflow-hidden border-b border-zinc-200 bg-zinc-100 lg:h-full lg:min-h-0 lg:border-b-0 lg:border-r dark:border-zinc-800 dark:bg-zinc-950">
              <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.74),rgba(226,232,240,0.42)_42%,rgba(251,146,60,0.08)),linear-gradient(90deg,rgba(8,145,178,0.06)_1px,transparent_1px),linear-gradient(rgba(8,145,178,0.06)_1px,transparent_1px)] bg-[length:auto,40px_40px,40px_40px] dark:bg-[linear-gradient(140deg,rgba(24,24,27,0.5),rgba(9,9,11,0.84)_44%,rgba(251,146,60,0.08)),linear-gradient(90deg,rgba(103,232,249,0.035)_1px,transparent_1px),linear-gradient(rgba(103,232,249,0.035)_1px,transparent_1px)]" />
              <div className="absolute right-[-2rem] top-12 text-6xl font-black uppercase tracking-[0.08em] text-zinc-950/[0.045] dark:text-white/[0.035] sm:text-7xl lg:text-8xl">
                Operator File
              </div>
              <div className="absolute inset-y-0 right-[18%] w-8 -skew-x-[18deg] bg-orange-500/[0.06] dark:bg-orange-400/[0.055]" />
              <div className="relative h-full min-h-[460px] lg:min-h-0">
                <div className="absolute inset-x-[-22%] bottom-0 top-4 sm:inset-x-[-18%] lg:inset-x-[-24%] lg:top-6">
                  <Image
                    alt={operator.name}
                    className="object-contain object-bottom"
                    fill
                    priority
                    sizes="(min-width: 1024px) 54vw, 120vw"
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

            <section className="relative overflow-visible bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50 lg:h-full lg:overflow-y-auto">
              <div className="relative mx-auto max-w-4xl px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
                <div>
                  <p className="text-3xl font-black leading-none tracking-normal text-amber-600 dark:text-amber-300 sm:text-4xl">
                    {getRarityLabel(operator.rarity)}
                  </p>
                  <h1 className="mt-2 text-4xl font-black leading-none tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
                    {operator.name}
                  </h1>
                </div>

                <div className="mt-7 border-l-4 border-orange-500 pl-4 dark:border-orange-400">
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
        "grid gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800",
        compact ? "grid-cols-[32px_1fr]" : "sm:grid-cols-[64px_1fr]"
      ].join(" ")}
    >
      {item.iconUrl ? (
        <div className="relative h-14 w-14 overflow-hidden border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950">
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
            "flex items-center justify-center border border-zinc-300 bg-zinc-100 font-black text-orange-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-orange-300",
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
    <div className="flex h-14 w-14 items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-100">
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
