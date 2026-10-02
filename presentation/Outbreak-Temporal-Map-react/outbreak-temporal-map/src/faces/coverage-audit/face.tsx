import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";

const MAX_WEEKS = 52;

export default function CoverageAudit() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hover, setHover] = useState<number | null>(null);
  const emphasize = controls.emphasizeFullYear?.value ?? true;

  const rows = blocks.coverage.rows.map((r) => ({
    ...r,
    weeksN: Number(r.weeks),
    outN: Number(r.outbreak),
    nilN: Number(r.nil),
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

        {/* totals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-2.5 @xl:mt-7 grid grid-cols-4 gap-2 @xl:gap-10 border-b border-ink/20 pb-2.5 @xl:pb-6"
        >
          {blocks.totals.rows.map((row, i) => (
            <div key={row.id}>
              <TextContent
                content={row.value}
                className="font-editorial text-[18px] @xl:text-[52px] leading-none tabular-nums"
                data-content-keys={[`totals.rows.${i}.value`]}
              />
              <TextContent
                content={row.label}
                className="mt-0.5 @xl:mt-2 font-mono uppercase text-[6px] @xl:text-xs tracking-[0.2em] text-ink/50 leading-tight"
                data-content-keys={[`totals.rows.${i}.label`]}
              />
            </div>
          ))}
        </motion.div>

        {/* bars */}
        <div className="flex-1 min-h-0 flex flex-col justify-center gap-2 @xl:gap-5 py-2 @xl:py-6">
          <div className="flex items-center justify-between gap-3 font-mono uppercase text-[6px] @xl:text-xs tracking-[0.24em] text-ink/45">
            <TextContent
              content={blocks.legendOutbreak.content}
              className="text-petrol"
              data-content-keys={["legendOutbreak"]}
            />
            <TextContent
              content={blocks.legendNil.content}
              className="text-ember"
              data-content-keys={["legendNil"]}
            />
          </div>

          {rows.map((row, i) => {
            const full = emphasize && row.nilN === 0;
            const dim = hover !== null && hover !== i;
            return (
              <div
                key={row.id}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
                className="flex items-center gap-2 @xl:gap-8 transition-opacity duration-300"
                style={{ opacity: dim ? 0.35 : 1 }}
              >
                <TextContent
                  content={row.year}
                  className={`w-[52px] @xl:w-[150px] shrink-0 font-mono text-[8px] @xl:text-lg tracking-[0.08em] ${
                    full ? "text-ink font-semibold" : "text-ink/70"
                  }`}
                  data-content-keys={[`coverage.rows.${i}.year`]}
                />
                <div className="flex-1 h-4 @xl:h-11 flex bg-bone-deep/70 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={
                      inView
                        ? { width: `${(row.outN / MAX_WEEKS) * 100}%` }
                        : { width: 0 }
                    }
                    transition={{ duration: 1, delay: 0.45 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full flex items-center justify-end pr-1 @xl:pr-3"
                    style={{
                      background: "var(--petrol)",
                      outline: full ? "2px solid var(--gold)" : "none",
                      outlineOffset: full ? "2px" : "0",
                    }}
                  >
                    <span className="font-mono text-[7px] @xl:text-base text-bone tabular-nums">
                      {row.outN}
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={
                      inView ? { width: `${(row.nilN / MAX_WEEKS) * 100}%` } : { width: 0 }
                    }
                    transition={{ duration: 0.8, delay: 1 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                    style={{ background: "var(--ember)", opacity: 0.85 }}
                  />
                  {row.nilN > 0 && (
                    <span className="absolute right-1 @xl:right-3 top-1/2 -translate-y-1/2 font-mono text-[7px] @xl:text-base text-ink/60 tabular-nums">
                      {row.nilN}
                    </span>
                  )}
                </div>
                <TextContent
                  content={row.records}
                  className="w-[34px] @xl:w-[110px] shrink-0 text-right font-mono text-[8px] @xl:text-lg tabular-nums text-ink/75"
                  data-content-keys={[`coverage.rows.${i}.records`]}
                />
              </div>
            );
          })}

          <div className="flex items-center gap-2 @xl:gap-8 font-mono uppercase text-[5px] @xl:text-[11px] tracking-[0.2em] text-ink/40">
            <span className="w-[52px] @xl:w-[150px] shrink-0" />
            <TextContent
              content={blocks.axisNote.content}
              className="flex-1"
              data-content-keys={["axisNote"]}
            />
            <TextContent
              content={blocks.recordsHeader.content}
              className="w-[34px] @xl:w-[110px] shrink-0 text-right"
              data-content-keys={["recordsHeader"]}
            />
          </div>
        </div>

        {/* notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="border-t border-ink/25 pt-2 @xl:pt-5 grid grid-cols-1 @xl:grid-cols-3 gap-1.5 @xl:gap-12"
        >
          <TextContent
            content={blocks.noteMissing.content}
            className="font-body text-[9px] @xl:text-lg leading-snug text-ink/75"
            data-content-keys={["noteMissing"]}
          />
          <TextContent
            content={blocks.noteNil.content}
            className="font-body text-[9px] @xl:text-lg leading-snug text-ink/75"
            data-content-keys={["noteNil"]}
          />
          <TextContent
            content={blocks.auditNote.content}
            className="font-editorial text-[11px] @xl:text-2xl leading-tight text-ember"
            data-content-keys={["auditNote"]}
          />
        </motion.div>
      </div>
    </div>
  );
}
