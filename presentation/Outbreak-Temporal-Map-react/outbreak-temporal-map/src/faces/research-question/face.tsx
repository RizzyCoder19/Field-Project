import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

export default function ResearchQuestion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const columns = controls.objectiveColumns?.value ?? "Two";
  const colClass = columns === "One" ? "@xl:grid-cols-1" : "@xl:grid-cols-2";

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
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 @xl:mt-8 bg-petrol text-bone px-3 @xl:px-12 py-3 @xl:py-9"
        >
          <TextContent
            content={blocks.rqLabel.content}
            className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.3em] text-bone/60"
            data-content-keys={["rqLabel"]}
          />
          <TextContent
            content={blocks.researchQuestion.content}
            className="mt-1 @xl:mt-4 font-editorial text-[14px] @xl:text-[40px] leading-[1.15] @xl:leading-[1.08] tracking-[-0.01em] max-w-[340px] @xl:max-w-[1500px]"
            data-content-keys={["researchQuestion"]}
          />
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col pt-3 @xl:pt-8">
          <TextContent
            content={blocks.objectivesLabel.content}
            className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.3em] text-ink/45"
            data-content-keys={["objectivesLabel"]}
          />
          <div
            className={`mt-2 @xl:mt-5 grid grid-cols-1 ${colClass} gap-x-4 @xl:gap-x-20 gap-y-0`}
          >
            {blocks.objectives.rows.map((row, i) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.45, delay: 0.5 + i * 0.07 }}
                className="flex items-baseline gap-2 @xl:gap-5 border-t border-ink/15 py-[5px] @xl:py-[11px]"
              >
                <span className="font-mono text-[8px] @xl:text-lg text-ember shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <TextContent
                  content={row.text}
                  className="font-body text-[9px] @xl:text-xl leading-snug text-ink/85"
                  data-content-keys={[`objectives.rows.${i}.text`]}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="border-t border-ink/25 pt-2 @xl:pt-5 flex items-center justify-between gap-4 font-mono uppercase text-[6px] @xl:text-sm tracking-[0.22em] text-ink/50"
        >
          <TextContent content={blocks.footerLeft.content} data-content-keys={["footerLeft"]} />
          <TextContent
            content={blocks.footerRight.content}
            className="text-right"
            data-content-keys={["footerRight"]}
          />
        </motion.div>
      </div>
    </div>
  );
}
