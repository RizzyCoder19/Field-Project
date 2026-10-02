import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

export default function DataEngineering() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const showChecks = controls.showIntegrityChecks?.value ?? true;

  const stages = blocks.funnel.rows.map((r) => ({ ...r, n: Number(r.count) }));
  const max = Math.max(...stages.map((s) => s.n));

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

        <div className="flex-1 min-h-0 flex flex-col @xl:flex-row gap-3 @xl:gap-16 pt-3 @xl:pt-8">
          {/* funnel */}
          <div className="@xl:flex-1 flex flex-col justify-center gap-2 @xl:gap-6">
            {stages.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 @xl:gap-7">
                <div className="w-[64px] @xl:w-[230px] shrink-0 text-right">
                  <TextContent
                    content={s.label}
                    className="font-body text-[8px] @xl:text-lg leading-tight font-medium"
                    data-content-keys={[`funnel.rows.${i}.label`]}
                  />
                </div>
                <div className="flex-1 flex items-center gap-2 @xl:gap-5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${(s.n / max) * 100}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="h-6 @xl:h-16 relative"
                    style={{
                      background: i === stages.length - 1 ? "var(--ember)" : "var(--petrol)",
                      opacity: 1 - i * 0.12,
                    }}
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.18 }}
                    className="font-editorial text-[16px] @xl:text-[46px] leading-none tabular-nums shrink-0"
                    style={{ color: i === stages.length - 1 ? "var(--ember)" : "var(--ink)" }}
                  >
                    {s.n}
                  </motion.span>
                </div>
              </div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="@xl:pl-[253px]"
            >
              <TextContent
                content={blocks.funnelNote.content}
                className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.2em] text-ink/45"
                data-content-keys={["funnelNote"]}
              />
            </motion.div>
          </div>

          {/* right */}
          <div className="@xl:w-[34%] flex flex-col gap-2 @xl:gap-6">
            <div className="bg-bone-deep/70 border border-ink/15 px-2.5 @xl:px-7 py-2 @xl:py-5">
              <TextContent
                content={blocks.primaryLabel.content}
                className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.3em] text-ink/50"
                data-content-keys={["primaryLabel"]}
              />
              <div className="mt-1 @xl:mt-3">
                {blocks.primaryFive.rows.map((row, i) => (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                    transition={{ duration: 0.45, delay: 0.7 + i * 0.09 }}
                    className="flex items-baseline gap-2 @xl:gap-4 border-t border-ink/12 py-0.5 @xl:py-2"
                  >
                    <span className="font-mono text-[7px] @xl:text-sm text-ember tabular-nums">
                      0{i + 1}
                    </span>
                    <TextContent
                      content={row.name}
                      className="font-body text-[9px] @xl:text-xl font-medium"
                      data-content-keys={[`primaryFive.rows.${i}.name`]}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <TextContent
              content={blocks.harmonisationNote.content}
              className="font-body text-[9px] @xl:text-lg leading-snug text-ink/75 italic"
              data-content-keys={["harmonisationNote"]}
            />

            {showChecks && (
              <div className="mt-auto">
                <TextContent
                  content={blocks.checksLabel.content}
                  className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.3em] text-ink/45"
                  data-content-keys={["checksLabel"]}
                />
                <div className="mt-1 @xl:mt-3 flex flex-wrap gap-1 @xl:gap-2.5">
                  {blocks.checks.rows.map((row, i) => (
                    <motion.span
                      key={row.id}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.4, delay: 1.2 + i * 0.07 }}
                      className="border border-petrol/40 text-petrol font-mono uppercase text-[6px] @xl:text-xs tracking-[0.14em] px-1.5 @xl:px-3.5 py-0.5 @xl:py-1.5"
                    >
                      <TextContent
                        content={row.text}
                        data-content-keys={[`checks.rows.${i}.text`]}
                      />
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
