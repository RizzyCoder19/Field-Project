import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

const TICKS = [0, 0.25, 0.5, 0.75, 1];

export default function Stability() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hover, setHover] = useState<number | null>(null);
  const showThreshold = controls.showSignificanceMark?.value ?? true;

  const rows = blocks.stability.rows.map((r) => ({
    ...r,
    w: Number(r.kendall),
    p: Number(r.pvalue),
  }));

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
          {/* dot chart */}
          <div className="@xl:flex-1 flex flex-col justify-center">
            <TextContent
              content={blocks.chartLabel.content}
              className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.28em] text-ink/45"
              data-content-keys={["chartLabel"]}
            />
            <div className="mt-2.5 @xl:mt-7 flex flex-col gap-2 @xl:gap-7">
              {rows.map((row, i) => {
                const dim = hover !== null && hover !== i;
                const sig = showThreshold && row.p < 0.05;
                return (
                  <div
                    key={row.id}
                    onPointerEnter={() => setHover(i)}
                    onPointerLeave={() => setHover(null)}
                    className="flex items-center gap-2 @xl:gap-7 transition-opacity duration-200"
                    style={{ opacity: dim ? 0.4 : 1 }}
                  >
                    <TextContent
                      content={row.disease}
                      className="w-[70px] @xl:w-[260px] shrink-0 font-body text-[8px] @xl:text-xl font-medium leading-tight"
                      data-content-keys={[`stability.rows.${i}.disease`]}
                    />
                    <div className="flex-1 relative h-3 @xl:h-8">
                      <span className="absolute left-0 right-0 top-1/2 h-px bg-ink/20" />
                      <motion.span
                        initial={{ left: "0%", opacity: 0 }}
                        animate={
                          inView
                            ? { left: `${row.w * 100}%`, opacity: 1 }
                            : { left: "0%", opacity: 0 }
                        }
                        transition={{ duration: 1, delay: 0.45 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-1/2 w-2 h-2 @xl:w-5 @xl:h-5 rotate-45 -translate-x-1/2 -translate-y-1/2"
                        style={{ background: sig ? "var(--ember)" : "var(--petrol)" }}
                      />
                    </div>
                    <TextContent
                      content={row.kendall}
                      className="w-[28px] @xl:w-[90px] shrink-0 text-right font-mono text-[8px] @xl:text-xl tabular-nums"
                      data-content-keys={[`stability.rows.${i}.kendall`]}
                    />
                    <TextContent
                      content={row.pvalue}
                      className={`w-[32px] @xl:w-[100px] shrink-0 text-right font-mono text-[8px] @xl:text-xl tabular-nums ${
                        sig ? "text-ember font-semibold" : "text-ink/55"
                      }`}
                      data-content-keys={[`stability.rows.${i}.pvalue`]}
                    />
                  </div>
                );
              })}
            </div>

            {/* axis */}
            <div className="mt-2 @xl:mt-6 flex items-center gap-2 @xl:gap-7">
              <span className="w-[70px] @xl:w-[260px] shrink-0" />
              <div className="flex-1 flex justify-between font-mono text-[5px] @xl:text-sm text-ink/45 tabular-nums">
                {TICKS.map((t) => (
                  <span key={t}>{t.toFixed(2)}</span>
                ))}
              </div>
              <span className="w-[28px] @xl:w-[90px] shrink-0 text-right font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.16em] text-ink/40">
                W
              </span>
              <span className="w-[32px] @xl:w-[100px] shrink-0 text-right font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.16em] text-ink/40">
                p
              </span>
            </div>
            <div className="mt-1 @xl:mt-2 flex items-center gap-2 @xl:gap-7">
              <span className="w-[70px] @xl:w-[260px] shrink-0" />
              <TextContent
                content={blocks.axisLabel.content}
                className="flex-1 font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.2em] text-ink/40"
                data-content-keys={["axisLabel"]}
              />
            </div>
          </div>

          {/* side */}
          <div className="@xl:w-[31%] flex flex-col gap-2 @xl:gap-6">
            <div className="flex gap-1.5 @xl:gap-3">
              {blocks.tags.rows.map((row, i) => (
                <motion.span
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="border border-ink/30 px-1.5 @xl:px-4 py-0.5 @xl:py-2 font-mono uppercase text-[6px] @xl:text-xs tracking-[0.16em] text-ink/65"
                >
                  <TextContent content={row.text} data-content-keys={[`tags.rows.${i}.text`]} />
                </motion.span>
              ))}
            </div>

            {/* annual profile concept */}
            <div className="bg-bone-deep/60 border border-ink/15 px-2 @xl:px-6 py-2 @xl:py-5">
              <TextContent
                content={blocks.conceptLabel.content}
                className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.24em] text-ink/45"
                data-content-keys={["conceptLabel"]}
              />
              <div className="mt-1.5 @xl:mt-4 flex flex-col gap-1 @xl:gap-3">
                {blocks.years.rows.map((row, i) => (
                  <div key={row.id} className="flex items-center gap-1.5 @xl:gap-4">
                    <TextContent
                      content={row.year}
                      className="w-[22px] @xl:w-[60px] shrink-0 font-mono text-[6px] @xl:text-sm text-ink/55"
                      data-content-keys={[`years.rows.${i}.year`]}
                    />
                    <div className="flex-1 flex items-end gap-[1px] @xl:gap-[3px] h-3 @xl:h-9">
                      {String(row.shape)
                        .split(",")
                        .map((s, k) => (
                          <motion.span
                            key={k}
                            initial={{ height: 0 }}
                            animate={inView ? { height: `${Number(s) * 10}%` } : { height: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 + i * 0.1 + k * 0.02 }}
                            className="flex-1 bg-petrol/70"
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              <TextContent
                content={blocks.conceptNote.content}
                className="mt-1.5 @xl:mt-4 font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.18em] text-ink/40 leading-relaxed"
                data-content-keys={["conceptNote"]}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="mt-auto"
            >
              <TextContent
                content={blocks.footnote.content}
                className="font-body text-[9px] @xl:text-base leading-snug text-ink/70 italic"
                data-content-keys={["footnote"]}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
