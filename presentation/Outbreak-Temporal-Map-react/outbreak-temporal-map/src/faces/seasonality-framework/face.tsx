import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

const EVENT_DEMO = [1, 1, 2, 1, 3, 2, 4, 3, 2, 5, 1, 1];
const CASE_DEMO = [6, 9, 14, 8, 22, 17, 30, 12, 9, 40, 7, 5];

export default function SeasonalityFramework() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const show2026 = controls.show2026Rule?.value ?? true;
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
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-2 @xl:mt-6"
        >
          <TextContent
            content={blocks.lead.content}
            className="font-body text-[10px] @xl:text-2xl leading-snug text-ink/80 max-w-[340px] @xl:max-w-[1200px]"
            data-content-keys={["lead"]}
          />
        </motion.div>

        {/* split panels */}
        <div className="flex-1 min-h-0 grid grid-cols-2 gap-3 @xl:gap-16 pt-2.5 @xl:pt-8 relative">
          <span className="hidden @xl:block absolute left-1/2 top-6 bottom-0 w-px bg-ink/25" />

          {/* events */}
          <div className="flex flex-col">
            <TextContent
              content={blocks.eventTitle.content}
              className="font-editorial text-[13px] @xl:text-4xl leading-tight text-petrol"
              data-content-keys={["eventTitle"]}
            />
            <TextContent
              content={blocks.eventSub.content}
              className="mt-0.5 @xl:mt-2 font-mono uppercase text-[6px] @xl:text-xs tracking-[0.22em] text-ink/50"
              data-content-keys={["eventSub"]}
            />
            <TextContent
              content={blocks.eventBody.content}
              className="mt-1.5 @xl:mt-4 font-body text-[9px] @xl:text-lg leading-snug text-ink/75"
              data-content-keys={["eventBody"]}
            />
            <div className="mt-auto pt-3 @xl:pt-8 flex items-end gap-[3px] @xl:gap-2 h-[70px] @xl:h-[220px]">
              {EVENT_DEMO.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5 @xl:gap-1.5">
                  {Array.from({ length: v }).map((_, k) => (
                    <motion.span
                      key={k}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.35, delay: 0.5 + i * 0.05 + k * 0.05 }}
                      className="w-full h-[3px] @xl:h-2.5 bg-petrol"
                    />
                  ))}
                </div>
              ))}
            </div>
            <TextContent
              content={blocks.eventEncoding.content}
              className="mt-1 @xl:mt-3 font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.18em] text-ink/40"
              data-content-keys={["eventEncoding"]}
            />
          </div>

          {/* cases */}
          <div className="flex flex-col">
            <TextContent
              content={blocks.caseTitle.content}
              className="font-editorial text-[13px] @xl:text-4xl leading-tight text-ember"
              data-content-keys={["caseTitle"]}
            />
            <TextContent
              content={blocks.caseSub.content}
              className="mt-0.5 @xl:mt-2 font-mono uppercase text-[6px] @xl:text-xs tracking-[0.22em] text-ink/50"
              data-content-keys={["caseSub"]}
            />
            <TextContent
              content={blocks.caseBody.content}
              className="mt-1.5 @xl:mt-4 font-body text-[9px] @xl:text-lg leading-snug text-ink/75"
              data-content-keys={["caseBody"]}
            />
            <div className="mt-auto pt-3 @xl:pt-8 flex items-end gap-[3px] @xl:gap-2 h-[70px] @xl:h-[220px]">
              {CASE_DEMO.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${(v / 40) * 100}%` } : { height: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 bg-ember/85"
                />
              ))}
            </div>
            <TextContent
              content={blocks.caseEncoding.content}
              className="mt-1 @xl:mt-3 font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.18em] text-ink/40"
              data-content-keys={["caseEncoding"]}
            />
          </div>
        </div>

        {/* calendar */}
        <div className="mt-2 @xl:mt-6 border-t border-ink/25 pt-1.5 @xl:pt-4 flex">
          {months.map((m, i) => (
            <motion.div
              key={m + i}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.03 }}
              className="flex-1 text-center"
            >
              <TextContent
                content={m}
                className="font-mono text-[6px] @xl:text-sm tracking-[0.12em] text-ink/55"
                data-content-keys={["monthAxis"]}
              />
            </motion.div>
          ))}
        </div>

        {show2026 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-1.5 @xl:mt-4 border-l-2 border-gold pl-2 @xl:pl-5"
          >
            <TextContent
              content={blocks.rule2026.content}
              className="font-body text-[9px] @xl:text-lg leading-snug text-ink/75"
              data-content-keys={["rule2026"]}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
