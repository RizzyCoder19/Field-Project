import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

export default function DistrictVariation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hover, setHover] = useState<number | null>(null);
  const sorted = (controls.barOrder?.value ?? "Descending") === "Descending";

  const rows = blocks.coverage.rows.map((r, i) => ({ ...r, i, n: Number(r.districts) }));
  const bars = sorted ? [...rows].sort((a, b) => b.n - a.n) : rows;
  const max = 36;

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

        <div className="flex-1 min-h-0 flex flex-col @xl:flex-row gap-3 @xl:gap-16 pt-3 @xl:pt-9">
          {/* ranked bars */}
          <div className="@xl:flex-1 flex flex-col justify-center">
            <TextContent
              content={blocks.chartLabel.content}
              className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.28em] text-ink/45"
              data-content-keys={["chartLabel"]}
            />
            <div className="mt-2.5 @xl:mt-7 flex flex-col gap-2 @xl:gap-6">
              {bars.map((row, k) => {
                const dim = hover !== null && hover !== row.i;
                return (
                  <div
                    key={row.id}
                    onPointerEnter={() => setHover(row.i)}
                    onPointerLeave={() => setHover(null)}
                    className="flex items-center gap-2 @xl:gap-7 transition-opacity duration-200"
                    style={{ opacity: dim ? 0.4 : 1 }}
                  >
                    <TextContent
                      content={row.disease}
                      className="w-[70px] @xl:w-[270px] shrink-0 font-body text-[8px] @xl:text-xl font-medium leading-tight"
                      data-content-keys={[`coverage.rows.${row.i}.disease`]}
                    />
                    <div className="flex-1 h-3.5 @xl:h-10 bg-bone-deep/60">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${(row.n / max) * 100}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.45 + k * 0.13, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full"
                        style={{ background: "var(--petrol)", opacity: 1 - k * 0.1 }}
                      />
                    </div>
                    <TextContent
                      content={row.districts}
                      className="w-[24px] @xl:w-[80px] shrink-0 text-right font-mono text-[9px] @xl:text-2xl tabular-nums"
                      data-content-keys={[`coverage.rows.${row.i}.districts`]}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-2 @xl:mt-6 flex items-center gap-2 @xl:gap-7">
              <span className="w-[70px] @xl:w-[270px] shrink-0" />
              <TextContent
                content={blocks.axisNote.content}
                className="flex-1 font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.2em] text-ink/40"
                data-content-keys={["axisNote"]}
              />
            </div>
          </div>

          {/* right */}
          <div className="@xl:w-[34%] flex flex-col gap-2 @xl:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="bg-ember text-bone px-2.5 @xl:px-7 py-2 @xl:py-6"
            >
              <TextContent
                content={blocks.concLabel.content}
                className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.24em] text-bone/65"
                data-content-keys={["concLabel"]}
              />
              <TextContent
                content={blocks.concValue.content}
                className="mt-0.5 @xl:mt-2 font-editorial text-[24px] @xl:text-[68px] leading-none"
                data-content-keys={["concValue"]}
              />
              <TextContent
                content={blocks.concDetail.content}
                className="mt-0.5 @xl:mt-2.5 font-body text-[9px] @xl:text-lg text-bone/85 leading-snug"
                data-content-keys={["concDetail"]}
              />
            </motion.div>

            <div>
              <TextContent
                content={blocks.notLabel.content}
                className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.26em] text-ink/45"
                data-content-keys={["notLabel"]}
              />
              {blocks.notList.rows.map((row, i) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                  transition={{ duration: 0.45, delay: 0.8 + i * 0.1 }}
                  className="flex items-baseline gap-2 @xl:gap-4 border-t border-ink/15 py-1 @xl:py-3"
                >
                  <span className="font-mono text-[8px] @xl:text-lg text-ember">×</span>
                  <TextContent
                    content={row.text}
                    className="font-body text-[9px] @xl:text-lg text-ink/80"
                    data-content-keys={[`notList.rows.${i}.text`]}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="mt-auto border-t border-ink/25 pt-1.5 @xl:pt-4"
            >
              <TextContent
                content={blocks.boundary.content}
                className="font-body text-[9px] @xl:text-base leading-snug text-ink/70 italic"
                data-content-keys={["boundary"]}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
