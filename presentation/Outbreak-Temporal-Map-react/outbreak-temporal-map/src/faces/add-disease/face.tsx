import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

const EVENTS = [3, 9, 14, 6, 5, 19, 22, 16, 13, 25, 7, 14];
const WINDOW = [5, 6, 7];

export default function AddDisease() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hover, setHover] = useState<number | null>(null);
  const markOct = controls.markOctoberElevation?.value ?? true;
  const months = String(blocks.monthAxis.content).split(/\s+/).filter(Boolean).slice(0, 12);

  return (
    <div className="w-full h-full bg-bone text-ink overflow-hidden">
      <div ref={ref} className="w-full h-full flex flex-col px-5 py-5 @xl:px-24 @xl:py-14">
        <SlideHead
          label={blocks.sectionLabel.content}
          no={blocks.slideNo.content}
          title={blocks.title.content}
          inView={inView}
          keys={{ label: "sectionLabel", no: "slideNo", title: "title" }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 @xl:mt-5 grid grid-cols-4 gap-2 @xl:gap-10 border-b border-ink/20 pb-2 @xl:pb-4"
        >
          {blocks.kpis.rows.map((row, i) => (
            <div key={row.id}>
              <TextContent
                content={row.value}
                className="font-editorial text-[16px] @xl:text-[46px] leading-none tabular-nums"
                data-content-keys={[`kpis.rows.${i}.value`]}
              />
              <TextContent
                content={row.label}
                className="mt-0.5 @xl:mt-1.5 font-mono uppercase text-[6px] @xl:text-xs tracking-[0.2em] text-ink/50"
                data-content-keys={[`kpis.rows.${i}.label`]}
              />
            </div>
          ))}
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col @xl:flex-row gap-3 @xl:gap-14 pt-2.5 @xl:pt-6">
          {/* chart */}
          <div className="@xl:flex-1 min-h-0 flex flex-col">
            <div className="flex items-baseline justify-between gap-2">
              <TextContent
                content={blocks.chartLabel.content}
                className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.28em] text-ink/45"
                data-content-keys={["chartLabel"]}
              />
              <span className="font-mono uppercase text-[6px] @xl:text-sm tracking-[0.18em]">
                {hover !== null ? (
                  <span data-content-keys={["monthAxis"]}>
                    <span className="text-ink/50">{months[hover]} · </span>
                    <span className="text-petrol font-semibold tabular-nums">{EVENTS[hover]}</span>
                  </span>
                ) : (
                  <TextContent
                    content={blocks.readoutIdle.content}
                    className="text-ink/35"
                    data-content-keys={["readoutIdle"]}
                  />
                )}
              </span>
            </div>

            <div className="mt-2 @xl:mt-5 flex-1 min-h-0 flex items-end gap-[3px] @xl:gap-3">
              {EVENTS.map((v, i) => {
                const isWin = WINDOW.includes(i);
                const isOct = i === 9;
                const isFeb = i === 1;
                const dim = hover !== null && hover !== i;
                return (
                  <div
                    key={i}
                    onPointerEnter={() => setHover(i)}
                    onPointerLeave={() => setHover(null)}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-0.5 @xl:gap-2 transition-opacity duration-200"
                    style={{ opacity: dim ? 0.45 : 1 }}
                  >
                    <span className="font-mono text-[6px] @xl:text-base tabular-nums text-ink/60">
                      {v}
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={inView ? { height: `${(v / 25) * 100}%` } : { height: 0 }}
                      transition={{ duration: 0.9, delay: 0.4 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full relative"
                      style={{
                        background: isWin
                          ? "var(--petrol)"
                          : isOct && markOct
                          ? "var(--gold)"
                          : isFeb
                          ? "var(--ember)"
                          : "var(--rule-strong)",
                      }}
                    />
                    <TextContent
                      content={months[i] ?? ""}
                      className="font-mono text-[5px] @xl:text-sm tracking-[0.08em] text-ink/55"
                      data-content-keys={["monthAxis"]}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-1.5 @xl:mt-4 flex flex-wrap gap-2 @xl:gap-7 font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.18em]">
              {blocks.legend.rows.map((row, i) => (
                <TextContent
                  key={row.id}
                  content={row.text}
                  className={
                    ["text-petrol", "text-gold", "text-ember"][i] ?? "text-ink/50"
                  }
                  data-content-keys={[`legend.rows.${i}.text`]}
                />
              ))}
            </div>
          </div>

          {/* divergence callout */}
          <div className="@xl:w-[33%] flex flex-col gap-2 @xl:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="bg-ember text-bone px-2.5 @xl:px-7 py-2 @xl:py-5"
            >
              <TextContent
                content={blocks.divergenceLabel.content}
                className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.26em] text-bone/65"
                data-content-keys={["divergenceLabel"]}
              />
              <TextContent
                content={blocks.divergenceValue.content}
                className="mt-0.5 @xl:mt-2 font-editorial text-[20px] @xl:text-[56px] leading-none tabular-nums"
                data-content-keys={["divergenceValue"]}
              />
              <TextContent
                content={blocks.divergenceCaption.content}
                className="mt-0.5 @xl:mt-2 font-body text-[8px] @xl:text-base text-bone/85 leading-snug"
                data-content-keys={["divergenceCaption"]}
              />
            </motion.div>

            {blocks.facts.rows.map((row, i) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, x: 8 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                transition={{ duration: 0.45, delay: 0.8 + i * 0.11 }}
                className="border-t border-ink/15 pt-1 @xl:pt-2.5"
              >
                <TextContent
                  content={row.label}
                  className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.22em] text-ink/45"
                  data-content-keys={[`facts.rows.${i}.label`]}
                />
                <TextContent
                  content={row.value}
                  className="font-body text-[9px] @xl:text-lg font-medium leading-snug"
                  data-content-keys={[`facts.rows.${i}.value`]}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mt-2 @xl:mt-5 border-t border-ink/25 pt-1.5 @xl:pt-4"
        >
          <TextContent
            content={blocks.boundary.content}
            className="font-body text-[9px] @xl:text-lg leading-snug text-ink/70 italic"
            data-content-keys={["boundary"]}
          />
        </motion.div>
      </div>
    </div>
  );
}
