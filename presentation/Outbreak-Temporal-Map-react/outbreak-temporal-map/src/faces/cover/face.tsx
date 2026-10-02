import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";

const CURVE = [4, 2, 5, 12, 15, 27, 26, 20, 36, 40, 15, 2];

function pathFor(values: number[], w: number, h: number) {
  const pts = values.map((v, i) => ({
    x: (i / (values.length - 1)) * w,
    y: h - (v / 40) * h,
  }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? pts[i + 1];
    d += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6}, ${
      p2.x - (p3.x - p1.x) / 6
    } ${p2.y - (p3.y - p1.y) / 6}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export default function Cover() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const motif = controls.motifIntensity?.value ?? 0.35;

  return (
    <div
      ref={ref}
      className="w-full h-full bg-bone text-ink overflow-hidden relative flex flex-col px-5 py-5 @xl:px-24 @xl:py-16"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--rule) 1px, transparent 0)",
        backgroundSize: "26px 26px",
      }}
    >
      {/* motif */}
      <svg
        viewBox="0 0 1200 360"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 bottom-[22%] @xl:bottom-[14%] h-[30%] @xl:h-[36%] w-full pointer-events-none"
        style={{ opacity: motif }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1={(i / 11) * 1200}
            x2={(i / 11) * 1200}
            y1={0}
            y2={360}
            stroke="var(--rule)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <motion.path
          d={pathFor(CURVE, 1200, 340)}
          fill="none"
          stroke="var(--petrol)"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={`${pathFor(CURVE, 1200, 340)} L 1200 360 L 0 360 Z`}
          fill="var(--petrol)"
          fillOpacity={0.08}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.4, delay: 1.6 }}
        />
      </svg>

      {/* top rule + kicker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-start justify-between gap-4 border-b border-ink/25 pb-2.5 @xl:pb-6 font-mono uppercase text-[7px] @xl:text-sm tracking-[0.28em]"
      >
        <TextContent
          content={blocks.kicker.content}
          className="text-ember"
          data-content-keys={["kicker"]}
        />
        <TextContent
          content={blocks.slideNo.content}
          className="text-ink/45"
          data-content-keys={["slideNo"]}
        />
      </motion.div>

      <div className="relative flex-1 min-h-0 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 18, filter: "blur(10px)" }
          }
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <TextContent
            content={blocks.title.content}
            className="font-editorial text-[30px] @xl:text-[92px] leading-[1.02] @xl:leading-[0.94] tracking-[-0.025em] break-words max-w-[340px] @xl:max-w-[1500px]"
            data-content-keys={["title"]}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-3 @xl:mt-8 flex items-start gap-3 @xl:gap-6"
        >
          <span className="mt-1.5 @xl:mt-4 block h-px w-8 @xl:w-24 bg-ember shrink-0" />
          <TextContent
            content={blocks.subtitle.content}
            className="font-body text-[11px] @xl:text-3xl leading-snug text-ink/75 max-w-[300px] @xl:max-w-[1000px]"
            data-content-keys={["subtitle"]}
          />
        </motion.div>
      </div>

      {/* footer credentials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="relative border-t border-ink/25 pt-2.5 @xl:pt-7 grid grid-cols-2 @xl:grid-cols-4 gap-2 @xl:gap-10"
      >
        {blocks.credentials.rows.map((row, i) => (
          <div key={row.id} className="min-w-0">
            <TextContent
              content={row.label}
              className="font-mono uppercase text-[6px] @xl:text-xs tracking-[0.26em] text-ink/45"
              data-content-keys={[`credentials.rows.${i}.label`]}
            />
            <TextContent
              content={row.value}
              className="mt-0.5 @xl:mt-2 font-body text-[9px] @xl:text-xl leading-tight text-ink font-medium"
              data-content-keys={[`credentials.rows.${i}.value`]}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
