import React from "react";
import { motion } from "motion/react";
import { TextContent } from "@/components/ui/text-content";

export function SlideHead({
  label,
  no,
  title,
  inView,
  keys,
}: {
  label: string;
  no: string;
  title: string;
  inView: boolean;
  keys: { label: string; no: string; title: string };
}) {
  return (
    <div className="border-b border-ink/25 pb-2.5 @xl:pb-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between gap-4 font-mono uppercase text-[7px] @xl:text-sm tracking-[0.28em]"
      >
        <TextContent content={label} className="text-ember" data-content-keys={[keys.label]} />
        <TextContent content={no} className="text-ink/45" data-content-keys={[keys.no]} />
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
          content={title}
          className="mt-1.5 @xl:mt-4 font-editorial text-[24px] @xl:text-[64px] leading-[1.02] @xl:leading-[0.95] tracking-[-0.02em] break-words max-w-[340px] @xl:max-w-[1400px]"
          data-content-keys={[keys.title]}
        />
      </motion.div>
    </div>
  );
}
