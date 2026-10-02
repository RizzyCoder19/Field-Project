import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { SlideHead } from "./components/slide-head";
import { ProfileColumn } from "./components/profile-column";

const MALARIA = [2, 3, 3, 1, 7, 15, 14, 7, 7, 3, 2, 6];
const CHIK = [1, 1, 5, 2, 6, 6, 4, 3, 5, 4, 5, 1];

export default function MalariaChikungunya() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const shared = (controls.chartScale?.value ?? "Shared") === "Shared";
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

        <TextContent
          content={shared ? blocks.scaleNoteShared.content : blocks.scaleNoteOwn.content}
          className="mt-1.5 @xl:mt-4 font-mono uppercase text-[6px] @xl:text-xs tracking-[0.26em] text-ink/45"
          data-content-keys={[shared ? "scaleNoteShared" : "scaleNoteOwn"]}
        />

        <div className="flex-1 min-h-0 grid grid-cols-2 gap-3 @xl:gap-16 pt-2 @xl:pt-5 relative">
          <span className="hidden @xl:block absolute left-1/2 top-0 bottom-0 w-px bg-ink/20" />
          <ProfileColumn
            name={blocks.malariaName.content}
            values={MALARIA}
            months={months}
            max={15}
            highlight={[4, 5, 6]}
            color="var(--petrol)"
            inView={inView}
            delay={0.4}
            kpis={blocks.malariaKpis.rows}
            kpiKeyPrefix="malariaKpis"
            axisKey="monthAxis"
            nameKey="malariaName"
          />
          <ProfileColumn
            name={blocks.chikName.content}
            values={CHIK}
            months={months}
            max={shared ? 15 : 6}
            highlight={[4, 5]}
            color="var(--chartreuse)"
            inView={inView}
            delay={0.7}
            kpis={blocks.chikKpis.rows}
            kpiKeyPrefix="chikKpis"
            axisKey="monthAxis"
            nameKey="chikName"
          />
        </div>

        {/* notes row */}
        <div className="mt-2 @xl:mt-6 grid grid-cols-2 gap-3 @xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="bg-petrol text-bone px-2 @xl:px-6 py-1.5 @xl:py-4"
          >
            <TextContent
              content={blocks.malariaConcLabel.content}
              className="font-mono uppercase text-[5px] @xl:text-xs tracking-[0.24em] text-bone/60"
              data-content-keys={["malariaConcLabel"]}
            />
            <div className="flex items-baseline gap-2 @xl:gap-5">
              <TextContent
                content={blocks.malariaConcValue.content}
                className="font-editorial text-[16px] @xl:text-[46px] leading-none"
                data-content-keys={["malariaConcValue"]}
              />
              <TextContent
                content={blocks.malariaConcDetail.content}
                className="font-body text-[8px] @xl:text-base text-bone/85 leading-snug"
                data-content-keys={["malariaConcDetail"]}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="border border-ink/20 px-2 @xl:px-6 py-1.5 @xl:py-4"
          >
            <TextContent
              content={blocks.chikNoteLabel.content}
              className="font-mono uppercase text-[5px] @xl:text-xs tracking-[0.24em] text-ink/45"
              data-content-keys={["chikNoteLabel"]}
            />
            <TextContent
              content={blocks.chikNoteValue.content}
              className="mt-0.5 @xl:mt-1.5 font-body text-[9px] @xl:text-lg leading-snug"
              data-content-keys={["chikNoteValue"]}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-1.5 @xl:mt-4 border-t border-ink/25 pt-1.5 @xl:pt-4"
        >
          <TextContent
            content={blocks.boundary.content}
            className="font-body text-[9px] @xl:text-lg leading-snug text-ink/70 italic"
            data-content-keys={["boundary"]}
          />
        </motion.div>
      </div>
    </div>
  );
}
