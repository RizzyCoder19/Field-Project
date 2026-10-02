import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

export default function Partial2026() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hover, setHover] = useState<number | null>(null);
  const metric = controls.metric?.value ?? "Records";

  const rows = blocks.window.rows.map((r) => ({
    ...r,
    recN: Number(String(r.records).replace(/[^0-9]/g, "")),
  }));
  const maxRec = Math.max(...rows.map((r) => r.recN));

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
          className="mt-2 @xl:mt-6 flex flex-wrap items-end gap-3 @xl:gap-16 border-b border-ink/20 pb-2 @xl:pb-5"
        >
          {blocks.kpis2026.rows.map((row, i) => (
            <div key={row.id}>
              <TextContent
                content={row.value}
                className="font-editorial text-[18px] @xl:text-[52px] leading-none tabular-nums"
                data-content-keys={[`kpis2026.rows.${i}.value`]}
              />
              <TextContent
                content={row.label}
                className="mt-0.5 @xl:mt-2 font-mono uppercase text-[6px] @xl:text-xs tracking-[0.2em] text-ink/50"
                data-content-keys={[`kpis2026.rows.${i}.label`]}
              />
            </div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="ml-auto border border-gold text-gold px-1.5 @xl:px-5 py-0.5 @xl:py-2"
          >
            <TextContent
              content={blocks.partialTag.content}
              className="font-mono uppercase text-[6px] @xl:text-sm tracking-[0.22em]"
              data-content-keys={["partialTag"]}
            />
          </motion.div>
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col @xl:flex-row gap-3 @xl:gap-16 pt-2.5 @xl:pt-7">
          {/* matched window bars */}
          <div className="@xl:flex-1 min-h-0 flex flex-col">
            <TextContent
              content={metric === "Records" ? blocks.chartLabelRecords.content : blocks.chartLabelCases.content}
              className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.26em] text-ink/45"
              data-content-keys={[metric === "Records" ? "chartLabelRecords" : "chartLabelCases"]}
            />
            <div className="mt-2.5 @xl:mt-7 flex-1 min-h-0 flex items-end gap-2 @xl:gap-10">
              {rows.map((row, i) => {
                const isCurrent = i === rows.length - 1;
                const dim = hover !== null && hover !== i;
                const shown = metric === "Records" ? row.records : row.cases;
                const h = metric === "Records" ? row.recN / maxRec : row.recN / maxRec;
                return (
                  <div
                    key={row.id}
                    onPointerEnter={() => setHover(i)}
                    onPointerLeave={() => setHover(null)}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-1 @xl:gap-3 transition-opacity duration-200"
                    style={{ opacity: dim ? 0.4 : 1 }}
                  >
                    <TextContent
                      content={shown}
                      className="font-mono text-[9px] @xl:text-2xl tabular-nums"
                      data-content-keys={[
                        `window.rows.${i}.${metric === "Records" ? "records" : "cases"}`,
                      ]}
                    />
                    {row.recN > 0 ? (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={inView ? { height: `${h * 100}%` } : { height: 0 }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                        style={{
                          background: isCurrent ? "var(--ember)" : "var(--petrol)",
                          opacity: isCurrent ? 1 : 0.8,
                        }}
                      />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + i * 0.14 }}
                        className="w-full h-full border-t border-x border-dashed border-ink/25"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(135deg, var(--rule) 0 2px, transparent 2px 9px)",
                        }}
                      />
                    )}
                    <TextContent
                      content={row.year}
                      className={`font-mono text-[6px] @xl:text-base tracking-[0.1em] ${
                        isCurrent ? "text-ember font-semibold" : "text-ink/55"
                      }`}
                      data-content-keys={[`window.rows.${i}.year`]}
                    />
                  </div>
                );
              })}
            </div>
            <TextContent
              content={blocks.axisNote.content}
              className="mt-1.5 @xl:mt-4 font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.2em] text-ink/40"
              data-content-keys={["axisNote"]}
            />
          </div>

          {/* rules */}
          <div className="@xl:w-[32%] flex flex-col">
            <TextContent
              content={blocks.rulesLabel.content}
              className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.26em] text-ink/45"
              data-content-keys={["rulesLabel"]}
            />
            {blocks.rules.rows.map((row, i) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, x: 8 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                transition={{ duration: 0.45, delay: 0.7 + i * 0.1 }}
                className="flex items-baseline gap-2 @xl:gap-4 border-t border-ink/15 py-1 @xl:py-3"
              >
                <span className="font-mono text-[8px] @xl:text-lg text-ember">×</span>
                <TextContent
                  content={row.text}
                  className="font-body text-[9px] @xl:text-lg text-ink/80"
                  data-content-keys={[`rules.rows.${i}.text`]}
                />
              </motion.div>
            ))}
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
