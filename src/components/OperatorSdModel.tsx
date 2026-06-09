"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type OperatorSdModelProps = {
  children?: ReactNode;
  englishName?: string;
  operatorName: string;
};

export function OperatorSdModel({ children, englishName, operatorName }: OperatorSdModelProps) {
  const [hasError, setHasError] = useState(false);
  const sdVideoUrl = useMemo(() => {
    if (!englishName) {
      return null;
    }

    return `https://arknights.wiki.gg/images/${encodeURIComponent(`${englishName}.webm`)}`;
  }, [englishName]);

  return (
    <div
      aria-label={`${operatorName} SD`}
      className="w-40 overflow-hidden border border-zinc-300 bg-zinc-200/55 shadow-[0_10px_22px_rgba(15,23,42,0.08)] dark:border-zinc-800 dark:bg-zinc-950/65 dark:shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
      role="img"
    >
      <div className="relative h-40 w-40 overflow-hidden">
        {sdVideoUrl && !hasError ? (
          <video
            aria-hidden="true"
            autoPlay
            className="absolute inset-0 h-full w-full -translate-y-5 scale-[2.28] object-contain p-2"
            loop
            muted
            onError={() => setHasError(true)}
            playsInline
            src={sdVideoUrl}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-3 pt-5 text-center text-[0.62rem] font-black uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500">
            No SD Data
          </div>
        )}
      </div>
      {children ? (
        <div className="border-t border-zinc-300/80 bg-zinc-100/90 px-2 py-2 dark:border-zinc-800 dark:bg-zinc-950/86">
          {children}
        </div>
      ) : null}
    </div>
  );
}
