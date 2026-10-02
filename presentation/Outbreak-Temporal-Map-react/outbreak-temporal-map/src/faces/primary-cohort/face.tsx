import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

const COLORS = ["var(--ember)", "var(--petrol)", "var(--chartreuse)", "var(--gold)", "var(--ink)"];

export default function PrimaryCohort() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hover, setHover] = useState<number | null>(null);
  const sortByCases = (controls.barOrder?.value ?? "By cases") === "By cases";

  const rows = blocks.cohort.rows.map((r, i) => ({
    ...r,
    i,
    casesN: Number(String(r.cases).replace(/,/g, "")),
  }));
  const bars = sortByCases ? [...rows].sort((a, b) => b.casesN - a.casesN) : rows;
  const max = Math.max(...rows.map((r) => r.casesN));

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
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-2.5 @xl:mt-6 grid grid-cols-4 gap-2 @xl:gap-10 border-b border-ink/20 pb-2 @xl:pb-5"
        >
          {blocks.totals.rows.map((row, i) => (
            <div key={row.id}>
              <TextContent
                content={row.value}
                className="font-editorial text-[16px] @xl:text-[46px] leading-none tabular-nums"
                data-content-keys={[`totals.rows.${i}.value`]}
              />
              <TextContent
                content={row.label}
                className="mt-0.5 @xl:mt-1.5 font-mono uppercase text-[6px] @xl:text-xs tracking-[0.2em] text-ink/50 leading-tight"
                data-content-keys={[`totals.rows.${i}.label`]}
              />
            </div>
          ))}
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col @xl:flex-row gap-3 @xl:gap-16 pt-2.5 @xl:pt-6">
          {/* table */}
          <div className="@xl:w-[47%]">
            <div className="grid grid-cols-[1.5fr_0.6fr_0.8fr_0.6fr_0.7fr] gap-1 @xl:gap-3 border-b border-ink/30 pb-1 @xl:pb-2.5 font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.18em] text-ink/50">
              {blocks.headers.rows.map((h, i) => (
                <TextContent
                  key={h.id}
                  content={h.text}
                  className={i === 0 ? "" : "text-right"}
                  data-content-keys={[`headers.rows.${i}.text`]}
                />
              ))}
            </div>
            {rows.map((row, i) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.45, delay: 0.4 + i * 0.1 }}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
                className="grid grid-cols-[1.5fr_0.6fr_0.8fr_0.6fr_0.7fr] gap-1 @xl:gap-3 border-b border-ink/12 py-1 @xl:py-3.5 transition-colors duration-200"
                style={{ background: hover === i ? "var(--bone-deep)" : "transparent" }}
              >
                <div className="flex items-center gap-1.5 @xl:gap-3 min-w-0">
                  <span
                    className="block w-1 h-1 @xl:w-2.5 @xl:h-2.5 rotate-45 shrink-0"
                    style={{ background: COLORS[i % COLORS.length] }}
                  />
                  <TextContent
                    content={row.disease}
                    className="font-body text-[8px] @xl:text-lg font-medium leading-tight"
                    data-content-keys={[`cohort.rows.${i}.disease`]}
                  />
                </div>
                <TextContent
                  content={row.records}
                  className="text-right font-mono text-[8px] @xl:text-lg tabular-nums"
                  data-content-keys={[`cohort.rows.${i}.records`]}
                />
                <TextContent
                  content={row.cases}
                  className="text-right font-mono text-[8px] @xl:text-lg tabular-nums font-semibold"
                  data-content-keys={[`cohort.rows.${i}.cases`]}
                />
                <TextContent
                  content={row.deaths}
                  className="text-right font-mono text-[8px] @xl:text-lg tabular-nums"
                  data-content-keys={[`cohort.rows.${i}.deaths`]}
                />
                <TextContent
                  content={row.districts}
                  className="text-right font-mono text-[8px] @xl:text-lg tabular-nums text-ink/70"
                  data-content-keys={[`cohort.rows.${i}.districts`]}
                />
              </motion.div>
            ))}
          </div>

          {/* bars */}
          <div className="flex-1 flex flex-col justify-center">
            <TextContent
              content={blocks.chartLabel.content}
              className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.3em] text-ink/45"
              data-content-keys={["chartLabel"]}
            />
            <div className="mt-2 @xl:mt-5 flex flex-col gap-1.5 @xl:gap-4">
              {bars.map((row, k) => (
                <div
                  key={row.id}
                  onPointerEnter={() => setHover(row.i)}
                  onPointerLeave={() => setHover(null)}
                  className="transition-opacity duration-300"
                  style={{ opacity: hover !== null && hover !== row.i ? 0.4 : 1 }}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <TextContent
                      content={row.disease}
                      className="font-body text-[8px] @xl:text-base font-medium"
                      data-content-keys={[`cohort.rows.${row.i}.disease`]}
                    />
                    <TextContent
                      content={row.cases}
                      className="font-mono text-[8px] @xl:text-base tabular-nums text-ink/70"
                      data-content-keys={[`cohort.rows.${row.i}.cases`]}
                    />
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${(row.casesN / max) * 100}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.6 + k * 0.14, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-0.5 @xl:mt-1.5 h-2.5 @xl:h-7"
                    style={{ background: COLORS[row.i % COLORS.length] }}
                  />
                </div>
              ))}
            </div>
            <TextContent
              content={blocks.chartNote.content}
              className="mt-2 @xl:mt-5 font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.18em] text-ink/40"
              data-content-keys={["chartNote"]}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="border-t border-ink/25 pt-1.5 @xl:pt-4"
        >
          <TextContent
            content={blocks.caution.content}
            className="font-body text-[9px] @xl:text-lg leading-snug text-ink/70 italic"
            data-content-keys={["caution"]}
          />
        </motion.div>
      </div>
    </div>
  );
}
