import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { Icon } from "@/components/ui/icon";
import { navigateTo } from "@/utils/face-navigation";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";

export default function ReferencesClosing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const showChain = controls.showProcessChain?.value ?? true;

  return (
    <div className="w-full h-full bg-ink text-bone overflow-hidden">
      <div ref={ref} className="w-full h-full flex flex-col px-5 py-5 @xl:px-24 @xl:py-14">
        <div className="border-b border-bone/25 pb-2.5 @xl:pb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between gap-4 font-mono uppercase text-[7px] @xl:text-sm tracking-[0.28em]"
          >
            <TextContent
              content={blocks.sectionLabel.content}
              className="text-gold"
              data-content-keys={["sectionLabel"]}
            />
            <TextContent
              content={blocks.slideNo.content}
              className="text-bone/45"
              data-content-keys={["slideNo"]}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 12, filter: "blur(8px)" }
            }
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <TextContent
              content={blocks.title.content}
              className="mt-1.5 @xl:mt-4 font-editorial text-[24px] @xl:text-[60px] leading-[1.02] @xl:leading-[0.95] tracking-[-0.02em]"
              data-content-keys={["title"]}
            />
          </motion.div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col @xl:flex-row gap-3 @xl:gap-20 pt-3 @xl:pt-8">
          {/* references */}
          <div className="@xl:w-[40%] flex flex-col gap-2 @xl:gap-5">
            {blocks.references.rows.map((row, i) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.13 }}
                className="border-t border-bone/20 pt-1.5 @xl:pt-4"
              >
                <TextContent
                  content={row.label}
                  className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.26em] text-gold"
                  data-content-keys={[`references.rows.${i}.label`]}
                />
                <TextContent
                  content={row.value}
                  className="mt-0.5 @xl:mt-2 font-body text-[9px] @xl:text-lg leading-snug text-bone/85"
                  data-content-keys={[`references.rows.${i}.value`]}
                />
              </motion.div>
            ))}
          </div>

          {/* closing */}
          <div className="flex-1 flex flex-col">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <TextContent
                content={blocks.closing.content}
                className="font-body text-[9px] @xl:text-xl leading-relaxed text-bone/80 max-w-[340px] @xl:max-w-[900px]"
                data-content-keys={["closing"]}
              />
            </motion.div>

            {showChain && (
              <div className="mt-2.5 @xl:mt-7 flex flex-wrap items-center gap-1.5 @xl:gap-4">
                {blocks.chain.rows.map((row, i) => (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.14 }}
                    className="flex items-center gap-1.5 @xl:gap-4"
                  >
                    <div className="flex items-center gap-1 @xl:gap-3 border border-bone/25 px-1.5 @xl:px-5 py-0.5 @xl:py-2.5">
                      <Icon
                        name={row.icon}
                        className="w-2.5 h-2.5 @xl:w-5 @xl:h-5 text-gold shrink-0"
                      />
                      <TextContent
                        content={row.text}
                        className="font-mono uppercase text-[6px] @xl:text-sm tracking-[0.16em] text-bone/80"
                        data-content-keys={[`chain.rows.${i}.text`]}
                      />
                    </div>
                    {i < blocks.chain.rows.length - 1 && (
                      <span className="h-px w-2 @xl:w-7 bg-bone/30" />
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              animate={
                inView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 16, filter: "blur(10px)" }
              }
              transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-auto pt-3 @xl:pt-8"
            >
              <TextContent
                content={blocks.finalLine.content}
                className="font-editorial text-[22px] @xl:text-[72px] leading-none tracking-[-0.025em] text-gold"
                data-content-keys={["finalLine"]}
              />
              <div className="mt-2 @xl:mt-6 flex items-end justify-between gap-3">
                <div>
                  <TextContent
                    content={blocks.thanks.content}
                    className="font-body text-[12px] @xl:text-4xl font-semibold tracking-[0.02em]"
                    data-content-keys={["thanks"]}
                  />
                  <TextContent
                    content={blocks.questions.content}
                    className="mt-0.5 @xl:mt-2 font-mono uppercase text-[6px] @xl:text-sm tracking-[0.26em] text-bone/55"
                    data-content-keys={["questions"]}
                  />
                </div>
                <button
                  onClick={() => navigateTo({ faceId: "cover" })}
                  className="border border-bone/35 hover:border-gold hover:text-gold transition-colors duration-300 px-2 @xl:px-7 py-1 @xl:py-3.5 font-mono uppercase text-[6px] @xl:text-sm tracking-[0.2em]"
                >
                  <TextContent
                    content={blocks.backCta.content}
                    data-content-keys={["backCta"]}
                  />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
