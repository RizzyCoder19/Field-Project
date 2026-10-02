import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

const EVENTS = [7, 11, 4, 9, 11, 5, 2, 4, 7, 4, 0, 5];

export default function FoodPoisoning() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const removed = controls.outlierState?.value === "Three records removed";
  const months = String(blocks.monthAxis.content).split(/\s+/).filter(Boolean).slice(0, 12);

  const peakIndex = removed ? 3 : 1;
  const contributors = blocks.contributors.rows.map((r) => ({
    ...r,
    n: Number(String(r.cases).replace(/,/g, "")),
  }));
  const maxContrib = Math.max(...contributors.map((c) => c.n));

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
          {/* event chart */}
          <div className="@xl:flex-1 min-h-0 flex flex-col">
            <TextContent
              content={blocks.chartLabel.content}
              className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.26em] text-ink/45"
              data-content-keys={["chartLabel"]}
            />
            <div className="mt-2 @xl:mt-5 flex-1 min-h-0 flex items-end gap-[3px] @xl:gap-3">
              {EVENTS.map((v, i) => {
                const win = [0, 1, 3, 4].includes(i);
                const isPeak = i === peakIndex;
                return (
                  <div
                    key={i}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-0.5 @xl:gap-2"
                  >
                    <span className="font-mono text-[6px] @xl:text-base tabular-nums text-ink/55">
                      {v}
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={inView ? { height: `${(v / 11) * 100}%` } : { height: 0 }}
                      transition={{ duration: 0.85, delay: 0.4 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full transition-colors duration-500"
                      style={{
                        background: isPeak
                          ? "var(--ember)"
                          : win
                          ? "var(--petrol)"
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
            <div className="mt-1.5 @xl:mt-4 flex flex-wrap gap-2 @xl:gap-8 font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.18em]">
              {blocks.legend.rows.map((row, i) => (
                <TextContent
                  key={row.id}
                  content={row.text}
                  className={i === 0 ? "text-petrol" : "text-ember"}
                  data-content-keys={[`legend.rows.${i}.text`]}
                />
              ))}
            </div>
          </div>

          {/* right */}
          <div className="@xl:w-[36%] flex flex-col gap-2 @xl:gap-5">
            <div>
              <TextContent
                content={blocks.contributorsLabel.content}
                className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.26em] text-ink/45"
                data-content-keys={["contributorsLabel"]}
              />
              <div className="mt-1.5 @xl:mt-3.5 flex flex-col gap-1 @xl:gap-3">
                {contributors.map((c, i) => (
                  <div key={c.id}>
                    <div className="flex items-baseline justify-between gap-2">
                      <TextContent
                        content={c.district}
                        className="font-body text-[9px] @xl:text-lg font-medium"
                        data-content-keys={[`contributors.rows.${i}.district`]}
                      />
                      <TextContent
                        content={c.cases}
                        className="font-mono text-[9px] @xl:text-lg tabular-nums text-ink/75"
                        data-content-keys={[`contributors.rows.${i}.cases`]}
                      />
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(c.n / maxContrib) * 100}%` } : { width: 0 }}
                      transition={{ duration: 0.9, delay: 0.8 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-0.5 @xl:mt-1.5 h-2 @xl:h-5 bg-gold"
                    />
                  </div>
                ))}
              </div>
              <TextContent
                content={blocks.contributorsNote.content}
                className="mt-1.5 @xl:mt-4 font-body text-[9px] @xl:text-base leading-snug text-ink/70"
                data-content-keys={["contributorsNote"]}
              />
            </div>

            {/* sensitivity switchboard */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="mt-auto bg-ink text-bone px-2.5 @xl:px-6 py-2 @xl:py-5"
            >
              <TextContent
                content={blocks.sensitivityLabel.content}
                className="font-mono uppercase text-[5px] @xl:text-xs tracking-[0.24em] text-bone/55"
                data-content-keys={["sensitivityLabel"]}
              />
              <div className="mt-1 @xl:mt-3 grid grid-cols-2 gap-2 @xl:gap-6">
                <div
                  className="transition-opacity duration-500"
                  style={{ opacity: removed ? 0.4 : 1 }}
                >
                  <TextContent
                    content={blocks.beforeLabel.content}
                    className="font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.2em] text-bone/50"
                    data-content-keys={["beforeLabel"]}
                  />
                  <TextContent
                    content={blocks.beforeValue.content}
                    className="font-editorial text-[14px] @xl:text-[40px] leading-none"
                    data-content-keys={["beforeValue"]}
                  />
                </div>
                <div
                  className="transition-opacity duration-500"
                  style={{ opacity: removed ? 1 : 0.4 }}
                >
                  <TextContent
                    content={blocks.afterLabel.content}
                    className="font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.2em] text-bone/50"
                    data-content-keys={["afterLabel"]}
                  />
                  <TextContent
                    content={blocks.afterValue.content}
                    className="font-editorial text-[14px] @xl:text-[40px] leading-none text-chartreuse"
                    data-content-keys={["afterValue"]}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
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
