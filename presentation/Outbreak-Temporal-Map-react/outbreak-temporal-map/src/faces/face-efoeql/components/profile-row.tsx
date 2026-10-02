import React from "react";
import { motion } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import {
  BAND_BASE,
  BAND_H,
  BAND_TOP,
  BAND_W,
  MONTH_KEYS,
  areaPath,
  smoothPath,
  xAt,
  yAt,
} from "../lib/geometry";

type Props = {
  index: number;
  name: string;
  note: string;
  values: number[];
  peaks: number[];
  color: string;
  silhouette: boolean;
  showAnnotations: boolean;
  dim: boolean;
  active: boolean;
  reveal: boolean;
  monthLabels: string[];
  onToggle: () => void;
  onHover: (month: number | null) => void;
  hoveredMonth: number | null;
};

export function ProfileRow({
  index,
  name,
  note,
  values,
  peaks,
  color,
  silhouette,
  showAnnotations,
  dim,
  active,
  reveal,
  monthLabels,
  onToggle,
  onHover,
  hoveredMonth,
}: Props) {
  const clipId = `clip-band-${index}`;
  const total = values.reduce((a, b) => a + b, 0);
  const delay = 0.5 + index * 0.16;

  return (
    <div
      onClick={onToggle}
      onPointerLeave={() => onHover(null)}
      className="group flex flex-col @xl:flex-row @xl:items-stretch gap-1 @xl:gap-8 cursor-pointer select-none transition-opacity duration-500"
      style={{ opacity: dim ? 0.2 : 1 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        animate={reveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="@xl:w-[300px] shrink-0 flex @xl:flex-col items-baseline @xl:items-start justify-between @xl:justify-end gap-2 @xl:gap-1 @xl:pb-1"
      >
        <div className="flex items-center gap-2 @xl:gap-3">
          <span
            className="block w-1.5 h-1.5 @xl:w-2.5 @xl:h-2.5 rotate-45"
            style={{ background: color }}
          />
          <TextContent
            content={name}
            className="font-body uppercase tracking-[0.1em] text-[10px] @xl:text-xl font-semibold text-ink"
            data-content-keys={[`series.rows.${index}.name`]}
          />
        </div>
        <div className="flex items-baseline gap-2 @xl:gap-3 @xl:pl-5">
          <span className="font-mono text-[9px] @xl:text-sm text-ink/55 tabular-nums">
            {total}
          </span>
          <TextContent
            content={note}
            className="font-body text-[9px] @xl:text-sm text-ink/45 italic"
            data-content-keys={[`series.rows.${index}.note`]}
          />
        </div>
      </motion.div>

      <div className="relative flex-1 h-9 @xl:h-[88px]">
        <svg
          viewBox={`0 0 ${BAND_W} ${BAND_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full overflow-visible"
        >
          <defs>
            <clipPath id={clipId}>
              <motion.rect
                x={0}
                y={-20}
                height={BAND_H + 40}
                initial={{ width: 0 }}
                animate={reveal ? { width: BAND_W } : { width: 0 }}
                transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}
              />
            </clipPath>
          </defs>

          <line
            x1={0}
            x2={BAND_W}
            y1={BAND_BASE}
            y2={BAND_BASE}
            stroke="var(--rule-strong)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          {values.map((_, i) => (
            <line
              key={`g${i}`}
              x1={xAt(i)}
              x2={xAt(i)}
              y1={BAND_TOP - 6}
              y2={BAND_BASE}
              stroke={hoveredMonth === i ? "var(--rule-strong)" : "var(--rule)"}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <g clipPath={`url(#${clipId})`}>
            <path
              d={areaPath(values)}
              fill={color}
              fillOpacity={silhouette ? (active ? 0.9 : 0.72) : active ? 0.24 : 0.14}
            />
            {!silhouette && (
              <path
                d={smoothPath(values)}
                fill="none"
                stroke={color}
                strokeWidth={active ? 3 : 2.1}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </g>

          {values.map((_, i) => (
            <rect
              key={`h${i}`}
              x={xAt(i) - BAND_W / 22}
              y={0}
              width={BAND_W / 11}
              height={BAND_H}
              fill="transparent"
              onPointerEnter={() => onHover(i)}
            />
          ))}
        </svg>

        {values.map((v, i) => (
          <motion.span
            key={`d${i}`}
            initial={{ opacity: 0 }}
            animate={reveal ? { opacity: hoveredMonth === i ? 1 : 0.5 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.5 + i * 0.015 }}
            className="absolute w-[3px] h-[3px] @xl:w-[5px] @xl:h-[5px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${(xAt(i) / BAND_W) * 100}%`,
              top: `${(yAt(v) / BAND_H) * 100}%`,
              background: color,
            }}
          />
        ))}

        {showAnnotations &&
          peaks.map((p) => (
            <React.Fragment key={`p${p}`}>
              <motion.span
                initial={{ scaleY: 0, opacity: 0 }}
                animate={reveal ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: delay + 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-px origin-bottom pointer-events-none"
                style={{
                  left: `${(xAt(p) / BAND_W) * 100}%`,
                  top: 0,
                  height: `${(yAt(values[p]) / BAND_H) * 100}%`,
                  background: "var(--rule-strong)",
                }}
              />
              <motion.span
                initial={{ opacity: 0, scale: 0.4 }}
                animate={reveal ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.45, delay: delay + 1.05 }}
                className="absolute w-1.5 h-1.5 @xl:w-2.5 @xl:h-2.5 rotate-45 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${(xAt(p) / BAND_W) * 100}%`,
                  top: `${(yAt(values[p]) / BAND_H) * 100}%`,
                  background: color,
                }}
              />
              <motion.span
                initial={{ opacity: 0 }}
                animate={reveal ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: delay + 1.25 }}
                className="absolute top-0 font-mono text-[8px] @xl:text-sm tracking-[0.12em] text-ink/70 whitespace-nowrap pointer-events-none"
                style={{ left: `calc(${(xAt(p) / BAND_W) * 100}% + 6px)` }}
              >
                {monthLabels[p]}
                <span className="text-ink"> {values[p]}</span>
              </motion.span>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
