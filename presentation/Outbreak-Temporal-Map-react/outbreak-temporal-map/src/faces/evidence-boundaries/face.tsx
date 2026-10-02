import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

export default function EvidenceBoundaries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const showQuote = controls.showClosingQuote?.value ?? true;

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

        <div className="flex-1 min-h-0 grid grid-cols-2 gap-3 @xl:gap-20 pt-3 @xl:pt-9 relative">
          <span className="absolute left-1/2 top-0 bottom-0 w-px bg-ink/30" />

          {/* supported */}
          <div className="flex flex-col">
            <TextContent
              content={blocks.supportLabel.content}
              className="font-mono uppercase text-[6px] @xl:text-sm tracking-[0.28em] text-petrol"
              data-content-keys={["supportLabel"]}
            />
            <div className="mt-2 @xl:mt-6 flex flex-col">
              {blocks.supported.rows.map((row, i) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                  className="flex items-baseline gap-2 @xl:gap-5 border-t border-petrol/25 py-1.5 @xl:py-4"
                >
                  <span className="font-mono text-[9px] @xl:text-2xl text-petrol leading-none">
                    ✓
                  </span>
                  <TextContent
                    content={row.text}
                    className="font-body text-[9px] @xl:text-xl leading-snug text-ink/85"
                    data-content-keys={[`supported.rows.${i}.text`]}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* not supported */}
          <div className="flex flex-col">
            <TextContent
              content={blocks.limitLabel.content}
              className="font-mono uppercase text-[6px] @xl:text-sm tracking-[0.28em] text-ember"
              data-content-keys={["limitLabel"]}
            />
            <div className="mt-2 @xl:mt-6 flex flex-col">
              {blocks.unsupported.rows.map((row, i) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                  className="flex items-baseline gap-2 @xl:gap-5 border-t border-ember/25 py-1.5 @xl:py-4"
                >
                  <span className="font-mono text-[9px] @xl:text-2xl text-ember leading-none">
                    ×
                  </span>
                  <TextContent
                    content={row.text}
                    className="font-body text-[9px] @xl:text-xl leading-snug text-ink/70"
                    data-content-keys={[`unsupported.rows.${i}.text`]}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {showQuote && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.9, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 @xl:mt-8 border-t border-ink/25 pt-2.5 @xl:pt-7"
          >
            <TextContent
              content={blocks.quote.content}
              className="font-editorial text-[13px] @xl:text-[38px] leading-tight tracking-[-0.01em] max-w-[340px] @xl:max-w-[1300px]"
              data-content-keys={["quote"]}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
