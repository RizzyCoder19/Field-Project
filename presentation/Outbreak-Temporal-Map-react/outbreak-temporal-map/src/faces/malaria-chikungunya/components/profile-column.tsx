import React from "react";
import { motion } from "motion/react";
import { TextContent } from "@/components/ui/text-content";

export function ProfileColumn({
  name,
  values,
  months,
  max,
  highlight,
  color,
  inView,
  delay,
  kpis,
  kpiKeyPrefix,
  axisKey,
  nameKey,
}: {
  name: string;
  values: number[];
  months: string[];
  max: number;
  highlight: number[];
  color: string;
  inView: boolean;
  delay: number;
  kpis: { id: string; value: string; label: string }[];
  kpiKeyPrefix: string;
  axisKey: string;
  nameKey: string;
}) {
  return (
    <div className="flex flex-col min-h-0">
      <TextContent
        content={name}
        className="font-editorial text-[15px] @xl:text-4xl leading-tight"
        style={{ color }}
        data-content-keys={[nameKey]}
      />
      <div className="mt-1.5 @xl:mt-4 grid grid-cols-4 gap-1 @xl:gap-4 border-y border-ink/15 py-1 @xl:py-3">
        {kpis.map((k, i) => (
          <div key={k.id}>
            <TextContent
              content={k.value}
              className="font-mono text-[9px] @xl:text-2xl leading-none tabular-nums"
              data-content-keys={[`${kpiKeyPrefix}.rows.${i}.value`]}
            />
            <TextContent
              content={k.label}
              className="mt-0.5 @xl:mt-1 font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.16em] text-ink/45 leading-tight"
              data-content-keys={[`${kpiKeyPrefix}.rows.${i}.label`]}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 @xl:mt-5 flex-1 min-h-0 flex items-end gap-[2px] @xl:gap-2">
        {values.map((v, i) => (
          <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-0.5 @xl:gap-1.5">
            <span className="font-mono text-[5px] @xl:text-sm tabular-nums text-ink/55">{v}</span>
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: `${(v / max) * 100}%` } : { height: 0 }}
              transition={{ duration: 0.8, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
              style={{ background: highlight.includes(i) ? color : "var(--rule-strong)" }}
            />
            <TextContent
              content={months[i] ?? ""}
              className="font-mono text-[5px] @xl:text-xs tracking-[0.06em] text-ink/50"
              data-content-keys={[axisKey]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
