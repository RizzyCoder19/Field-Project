import React from "react";
import { motion } from "motion/react";
import { TextContent } from "@/components/ui/text-content";

export function MonthBars({
  months,
  values,
  max,
  highlight,
  peak,
  inView,
  hover,
  setHover,
  baseColor,
  accentColor,
  axisKey,
}: {
  months: string[];
  values: number[];
  max: number;
  highlight: number[];
  peak: number;
  inView: boolean;
  hover: number | null;
  setHover: (i: number | null) => void;
  baseColor: string;
  accentColor: string;
  axisKey: string;
}) {
  return (
    <div className="flex-1 min-h-0 flex items-end gap-[3px] @xl:gap-3">
      {values.map((v, i) => {
        const isHi = highlight.includes(i);
        const isPeak = i === peak;
        const dim = hover !== null && hover !== i;
        return (
          <div
            key={i}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            className="flex-1 h-full flex flex-col justify-end items-center gap-0.5 @xl:gap-2 transition-opacity duration-200"
            style={{ opacity: dim ? 0.45 : 1 }}
          >
            <span
              className="font-mono text-[6px] @xl:text-base tabular-nums"
              style={{ color: isPeak ? accentColor : "var(--ink)", opacity: isHi ? 1 : 0.5 }}
            >
              {v}
            </span>
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: `${(v / max) * 100}%` } : { height: 0 }}
              transition={{ duration: 0.9, delay: 0.4 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
              style={{
                background: isPeak ? accentColor : isHi ? baseColor : "var(--rule-strong)",
              }}
            />
            <TextContent
              content={months[i] ?? ""}
              className="font-mono text-[5px] @xl:text-sm tracking-[0.08em] text-ink/55"
              data-content-keys={[axisKey]}
            />
          </div>
        );
      })}
    </div>
  );
}
