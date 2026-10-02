import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { Icon } from "@/components/ui/icon";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

const TIERS = ["Source", "Transformation", "Evidence"] as const;

export default function EvidenceArchitecture() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [active, setActive] = useState<number | null>(null);
  const showTiers = controls.showTierBands?.value ?? true;

  const steps = blocks.pipeline.rows;

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

        {showTiers && (
          <div className="hidden @xl:grid grid-cols-3 gap-6 mt-6">
            {TIERS.map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="border-t-2 border-ink/30 pt-2"
              >
                <TextContent
                  content={blocks.tierLabels.rows[i].label}
                  className="font-mono uppercase text-xs tracking-[0.3em] text-ink/50"
                  data-content-keys={[`tierLabels.rows.${i}.label`]}
                />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex-1 min-h-0 flex flex-col @xl:flex-row gap-3 @xl:gap-16 pt-3 @xl:pt-6">
          {/* pipeline */}
          <div className="@xl:flex-1 grid grid-cols-3 @xl:grid-cols-3 gap-1.5 @xl:gap-x-6 @xl:gap-y-4 content-center">
            {steps.map((row, i) => {
              const isActive = active === i;
              return (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                  className="relative border border-ink/20 px-1.5 @xl:px-5 py-1.5 @xl:py-4 transition-colors duration-300"
                  style={{
                    background: isActive ? "var(--petrol)" : "var(--bone-deep)",
                    color: isActive ? "var(--bone)" : "var(--ink)",
                  }}
                >
                  <div className="flex items-center justify-between gap-1">
                    <Icon
                      name={row.icon}
                      className="w-2.5 h-2.5 @xl:w-6 @xl:h-6 shrink-0"
                      style={{ color: isActive ? "var(--bone)" : "var(--petrol)" }}
                    />
                    <span className="font-mono text-[6px] @xl:text-xs opacity-50 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <TextContent
                    content={row.stage}
                    className="mt-1 @xl:mt-2.5 font-body text-[7px] @xl:text-lg font-semibold leading-tight"
                    data-content-keys={[`pipeline.rows.${i}.stage`]}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* right panel */}
          <div className="@xl:w-[31%] flex flex-col gap-2 @xl:gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <TextContent
                content={blocks.lead.content}
                className="font-body text-[10px] @xl:text-2xl leading-snug text-ink/80"
                data-content-keys={["lead"]}
              />
            </motion.div>

            <div>
              <TextContent
                content={blocks.layersLabel.content}
                className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.3em] text-ink/45"
                data-content-keys={["layersLabel"]}
              />
              {blocks.layers.rows.map((row, i) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                  transition={{ duration: 0.45, delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-2 @xl:gap-4 border-t border-ink/15 py-1 @xl:py-3"
                >
                  <span className="block w-1 h-1 @xl:w-2 @xl:h-2 rotate-45 bg-ember shrink-0" />
                  <TextContent
                    content={row.text}
                    className="font-body text-[9px] @xl:text-lg text-ink/80"
                    data-content-keys={[`layers.rows.${i}.text`]}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="mt-auto border-t border-ink/25 pt-2 @xl:pt-5"
            >
              <TextContent
                content={blocks.provenanceNote.content}
                className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.2em] leading-relaxed text-ink/55"
                data-content-keys={["provenanceNote"]}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
