"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type OperatorSdModelProps = {
  children?: ReactNode;
  englishName?: string;
  operatorName: string;
};

function createSdVideoUrl(englishName?: string): string | null {
  if (!englishName) {
    return null;
  }

  const fileName = `${englishName}.webm`;
  return `https://arknights.wiki.gg/images/${encodeURIComponent(fileName)}`;
}

export function OperatorSdModel({
  children,
  englishName,
  operatorName
}: OperatorSdModelProps) {
  const [failedVideoUrl, setFailedVideoUrl] = useState<string | null>(null);
  const sdVideoUrl = useMemo(() => createSdVideoUrl(englishName), [englishName]);
  const canShowVideo = sdVideoUrl !== null && failedVideoUrl !== sdVideoUrl;

  return (
    <div
      aria-label={`${operatorName} SD`}
      className="w-[clamp(9.5rem,13vw,11rem)] overflow-hidden border border-[#afafaf] bg-[#dcdcdc]/70 dark:border-zinc-800 dark:bg-zinc-950/65"
      role="img"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        {canShowVideo ? (
          <video
            aria-hidden="true"
            autoPlay
            className="absolute inset-0 h-full w-full -translate-y-[13%] scale-[2.34] object-contain p-2"
            key={sdVideoUrl}
            loop
            muted
            onError={() => setFailedVideoUrl(sdVideoUrl)}
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
        <div className="border-t border-[#afafaf] bg-[#f2f2f2]/82 px-2 py-2 dark:border-zinc-800 dark:bg-zinc-950/86">
          {children}
        </div>
      ) : null}
    </div>
  );
}
