import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";
import { MonthBars } from "./components/month-bars";

const VALUES = [4, 2, 5, 12, 15, 27, 26, 20, 36, 40, 15, 2];
const WINDOW = [5, 6, 7, 8, 9];

export default function Dengue() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hover, setHover] = useState<number | null>(null);
  const showWindow = controls.highlightWindow?.value ?? true;
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
          className="mt-2.5 @xl:mt-6 grid grid-cols-4 gap-2 @xl:gap-10 border-b border-ink/20 pb-2 @xl:pb-5"
        >
          {blocks.kpis.rows.map((row, i) => (
            <div key={row.id}>
              <TextContent
                content={row.value}
                className="font-editorial text-[18px] @xl:text-[52px] leading-none tabular-nums"
                data-content-keys={[`kpis.rows.${i}.value`]}
              />
              <TextContent
                content={row.label}
                className="mt-0.5 @xl:mt-2 font-mono uppercase text-[6px] @xl:text-xs tracking-[0.2em] text-ink/50"
                data-content-keys={[`kpis.rows.${i}.label`]}
              />
            </div>
          ))}
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col @xl:flex-row gap-3 @xl:gap-16 pt-2.5 @xl:pt-7">
          <div className="@xl:flex-1 min-h-0 flex flex-col">
            <div className="flex items-baseline justify-between gap-2">
              <TextContent
                content={blocks.chartLabel.content}
                className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.3em] text-ink/45"
                data-content-keys={["chartLabel"]}
              />
              <span className="font-mono uppercase text-[6px] @xl:text-sm tracking-[0.18em]">
                {hover !== null ? (
                  <span data-content-keys={["monthAxis"]}>
                    <span className="text-ink/50">{months[hover]} · </span>
                    <span className="text-ember font-semibold tabular-nums">{VALUES[hover]}</span>
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
            <div className="mt-2 @xl:mt-5 flex-1 min-h-0 flex">
              <MonthBars
                months={months}
                values={VALUES}
                max={40}
                highlight={showWindow ? WINDOW : VALUES.map((_, i) => i)}
                peak={9}
                inView={inView}
                hover={hover}
                setHover={setHover}
                baseColor="var(--petrol)"
                accentColor="var(--ember)"
                axisKey="monthAxis"
              />
            </div>
          </div>

          <div className="@xl:w-[31%] flex flex-col gap-2 @xl:gap-5">
            <div className="bg-petrol text-bone px-2.5 @xl:px-7 py-2 @xl:py-5">
              <TextContent
                content={blocks.windowLabel.content}
                className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.26em] text-bone/60"
                data-content-keys={["windowLabel"]}
              />
              <TextContent
                content={blocks.windowValue.content}
                className="mt-0.5 @xl:mt-2 font-editorial text-[22px] @xl:text-[62px] leading-none"
                data-content-keys={["windowValue"]}
              />
              <TextContent
                content={blocks.windowCaption.content}
                className="mt-0.5 @xl:mt-2 font-body text-[8px] @xl:text-base text-bone/80 leading-snug"
                data-content-keys={["windowCaption"]}
              />
            </div>

            {blocks.facts.rows.map((row, i) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, x: 8 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                transition={{ duration: 0.45, delay: 0.7 + i * 0.12 }}
                className="border-t border-ink/15 pt-1 @xl:pt-3"
              >
                <TextContent
                  content={row.label}
                  className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.22em] text-ink/45"
                  data-content-keys={[`facts.rows.${i}.label`]}
                />
                <TextContent
                  content={row.value}
                  className="font-body text-[10px] @xl:text-xl font-medium leading-snug"
                  data-content-keys={[`facts.rows.${i}.value`]}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-2 @xl:mt-6 border-t border-ink/25 pt-2 @xl:pt-5 grid grid-cols-1 @xl:grid-cols-[1.4fr_1fr] gap-1.5 @xl:gap-16"
        >
          <TextContent
            content={blocks.interpretation.content}
            className="font-editorial text-[11px] @xl:text-2xl leading-tight"
            data-content-keys={["interpretation"]}
          />
          <TextContent
            content={blocks.boundary.content}
            className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.18em] leading-relaxed text-ink/50"
            data-content-keys={["boundary"]}
          />
        </motion.div>
      </div>
    </div>
  );
}
