import React, { useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { ProfileRow } from "./components/profile-row";
import { MONTH_KEYS, SERIES_COLORS, parsePeaks, parseRow } from "./lib/geometry";

export default function TemporalSignatures() {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useInView(ref, { once: true, amount: 0.35 });
  const [selected, setSelected] = useState<number | null>(null);
  const [hover, setHover] = useState<{ d: number; m: number } | null>(null);

  const silhouette = (controls.profileStyle?.value ?? "Ridge") === "Silhouette";
  const showAnnotations = controls.showAnnotations?.value ?? true;

  const monthLabels = useMemo(
    () => String(blocks.monthAxis.content).split(/\s+/).filter(Boolean).slice(0, 12),
    [],
  );

  const series = useMemo(
    () =>
      blocks.series.rows.map((row) => ({
        name: String(row.name),
        note: String(row.note ?? ""),
        values: parseRow(row as Record<string, unknown>),
        peaks: parsePeaks(String(row.peaks ?? ""), monthLabels),
      })),
    [monthLabels],
  );

  const hoveredRow = hover ? series[hover.d] : null;

  return (
    <div
      ref={ref}
      className="w-full h-full bg-bone text-ink overflow-hidden flex flex-col px-4 py-4 @xl:px-20 @xl:py-14"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--rule) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 @xl:gap-16 border-b border-ink/25 pb-3 @xl:pb-8">
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.6 }}
          >
            <TextContent
              content={blocks.kicker.content}
              className="font-mono text-[8px] @xl:text-sm tracking-[0.3em] text-ember uppercase"
              data-content-keys={["kicker"]}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={
              reveal
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 14, filter: "blur(8px)" }
            }
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <TextContent
              content={blocks.title.content}
              className="mt-1 @xl:mt-4 font-editorial text-[26px] @xl:text-[74px] leading-[0.95] @xl:leading-[0.9] tracking-[-0.02em] break-words max-w-[1100px]"
              data-content-keys={["title"]}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={reveal ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <TextContent
              content={blocks.subtitle.content}
              className="mt-1.5 @xl:mt-5 font-body text-[10px] @xl:text-2xl leading-snug text-ink/70 max-w-[300px] @xl:max-w-[820px]"
              data-content-keys={["subtitle"]}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={reveal ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="shrink-0 text-right font-mono uppercase text-[7px] @xl:text-base leading-relaxed tracking-[0.14em] text-ink/70 border-l border-ink/20 pl-3 @xl:pl-8"
        >
          <TextContent
            content={blocks.metaRegion.content}
            className="text-ink font-semibold"
            data-content-keys={["metaRegion"]}
          />
          <TextContent content={blocks.metaN.content} data-content-keys={["metaN"]} />
          <TextContent content={blocks.metaSource.content} data-content-keys={["metaSource"]} />
        </motion.div>
      </div>

      {/* READOUT */}
      <div className="flex items-baseline justify-between gap-3 py-2 @xl:py-5">
        <TextContent
          content={blocks.scaleLabel.content}
          className="font-mono text-[7px] @xl:text-sm tracking-[0.2em] uppercase text-ink/45"
          data-content-keys={["scaleLabel"]}
        />
        <div className="font-mono text-[8px] @xl:text-base tracking-[0.18em] uppercase">
          {hover && hoveredRow ? (
            <span
              className="text-ink"
              data-content-keys={[
                `series.rows.${hover.d}.name`,
                `series.rows.${hover.d}.${MONTH_KEYS[hover.m]}`,
              ]}
            >
              {hoveredRow.name}
              <span className="text-ink/40"> / </span>
              {monthLabels[hover.m]}
              <span className="text-ink/40"> / </span>
              <span className="text-ember font-semibold tabular-nums">
                {hoveredRow.values[hover.m]}
              </span>
            </span>
          ) : (
            <TextContent
              content={blocks.readoutIdle.content}
              className="text-ink/40"
              data-content-keys={["readoutIdle"]}
            />
          )}
        </div>
      </div>

      {/* PROFILES */}
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-2 @xl:gap-5">
        {series.map((s, i) => (
          <ProfileRow
            key={i}
            index={i}
            name={s.name}
            note={s.note}
            values={s.values}
            peaks={s.peaks}
            color={SERIES_COLORS[i % SERIES_COLORS.length]}
            silhouette={silhouette}
            showAnnotations={showAnnotations}
            dim={selected !== null && selected !== i}
            active={selected === i}
            reveal={reveal}
            monthLabels={monthLabels}
            onToggle={() => setSelected((prev) => (prev === i ? null : i))}
            onHover={(m) => setHover(m === null ? null : { d: i, m })}
            hoveredMonth={hover && hover.d === i ? hover.m : null}
          />
        ))}

        {/* MONTH AXIS */}
        <div className="flex @xl:pl-[332px] mt-1 @xl:mt-2">
          {monthLabels.map((m, i) => (
            <motion.div
              key={m + i}
              initial={{ opacity: 0, y: 6 }}
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.4, delay: 0.08 + i * 0.035 }}
              className="flex-1 first:flex-[0.5] last:flex-[0.5] flex flex-col items-center"
            >
              <TextContent
                content={m}
                className={`font-mono text-[7px] @xl:text-base tracking-[0.1em] ${
                  hover?.m === i ? "text-ember font-semibold" : "text-ink/55"
                }`}
                data-content-keys={["monthAxis"]}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* INSIGHT */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.8, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
        className="border-t border-ink/25 pt-2.5 @xl:pt-7 grid grid-cols-1 @xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-2 @xl:gap-16 items-start"
      >
        <TextContent
          content={blocks.insightLead.content}
          className="font-editorial text-[13px] @xl:text-4xl leading-tight tracking-[-0.01em] max-w-[340px] @xl:max-w-[640px]"
          data-content-keys={["insightLead"]}
        />
        <TextContent
          content={blocks.insightBody.content}
          className="font-body text-[9px] @xl:text-xl leading-relaxed text-ink/75 max-w-[340px] @xl:max-w-[900px]"
          data-content-keys={["insightBody"]}
        />
      </motion.div>

      {/* FOOTER */}
      <div className="mt-2 @xl:mt-6 flex items-center justify-between gap-3 font-mono uppercase text-[6px] @xl:text-sm tracking-[0.22em] text-ink/45">
        <TextContent content={blocks.footerLeft.content} data-content-keys={["footerLeft"]} />
        <TextContent
          content={blocks.footerRight.content}
          className="text-right"
          data-content-keys={["footerRight"]}
        />
      </div>
    </div>
  );
}
