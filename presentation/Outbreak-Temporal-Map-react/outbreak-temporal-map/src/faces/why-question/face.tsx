import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { Icon } from "@/components/ui/icon";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

export default function WhyQuestion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const flowStyle = controls.flowStyle?.value ?? "Numbered";

  return (
    <div className="w-full h-full bg-bone text-ink overflow-hidden">
      <div
        ref={ref}
        className="w-full h-full flex flex-col px-5 py-5 @xl:px-24 @xl:py-14"
      >
        <SlideHead
          label={blocks.sectionLabel.content}
          no={blocks.slideNo.content}
          title={blocks.title.content}
          inView={inView}
          keys={{ label: "sectionLabel", no: "slideNo", title: "title" }}
        />

        <div className="flex-1 min-h-0 flex flex-col @xl:flex-row gap-4 @xl:gap-20 pt-3 @xl:pt-10">
          <div className="@xl:w-[46%] flex flex-col">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <TextContent
                content={blocks.lead.content}
                className="font-body text-[11px] @xl:text-2xl leading-snug text-ink/80 max-w-[340px] @xl:max-w-[760px]"
                data-content-keys={["lead"]}
              />
            </motion.div>

            <div className="mt-3 @xl:mt-8 flex flex-col">
              {blocks.points.rows.map((row, i) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                  className="flex items-baseline gap-2 @xl:gap-5 border-t border-ink/15 py-1.5 @xl:py-4"
                >
                  <span className="font-mono text-[8px] @xl:text-base text-petrol shrink-0 tabular-nums">
                    0{i + 1}
                  </span>
                  <TextContent
                    content={row.text}
                    className="font-body text-[10px] @xl:text-xl leading-snug text-ink/85"
                    data-content-keys={[`points.rows.${i}.text`]}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-3 @xl:mt-8 border-l-2 border-ember pl-2.5 @xl:pl-6"
            >
              <TextContent
                content={blocks.boundary.content}
                className="font-body text-[9px] @xl:text-lg leading-snug text-ink/70 italic max-w-[320px] @xl:max-w-[700px]"
                data-content-keys={["boundary"]}
              />
            </motion.div>
          </div>

          {/* FLOW */}
          <div className="flex-1 min-h-0 flex flex-col justify-center gap-1.5 @xl:gap-3">
            {blocks.flow.rows.map((row, i) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-center gap-2.5 @xl:gap-6 bg-bone-deep/60 border border-ink/15 px-2.5 @xl:px-7 py-2 @xl:py-5"
                style={{ marginLeft: `${i * (flowStyle === "Stepped" ? 4 : 0)}%` }}
              >
                <Icon
                  name={row.icon}
                  className="w-3.5 h-3.5 @xl:w-8 @xl:h-8 text-petrol shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <TextContent
                    content={row.stage}
                    className="font-body text-[10px] @xl:text-2xl font-semibold leading-tight"
                    data-content-keys={[`flow.rows.${i}.stage`]}
                  />
                  <TextContent
                    content={row.detail}
                    className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.2em] text-ink/50 mt-0.5 @xl:mt-1.5"
                    data-content-keys={[`flow.rows.${i}.detail`]}
                  />
                </div>
                <span className="font-mono text-[8px] @xl:text-base text-ink/30 tabular-nums">
                  {i + 1}
                </span>
                {i < blocks.flow.rows.length - 1 && (
                  <span className="absolute left-4 @xl:left-10 -bottom-1.5 @xl:-bottom-3 h-1.5 @xl:h-3 w-px bg-ink/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
