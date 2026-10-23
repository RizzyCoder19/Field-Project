"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface CinematicIntroProps {
  onComplete: () => void;
}

const DOC_ROWS = [
  { year: "2022", week: "W14", district: "Kolhapur", disease: "Food Poisoning", cases: "42", deaths: "0" },
  { year: "2023", week: "W32", district: "Pune", disease: "Dengue Fever", cases: "28", deaths: "0" },
  { year: "2024", week: "W07", district: "Kolhapur", disease: "Food Poisoning", cases: "651", deaths: "0" },
  { year: "2024", week: "W38", district: "Thane", disease: "Dengue", cases: "31", deaths: "1" },
  { year: "2025", week: "W26", district: "Gadchiroli", disease: "Malaria", cases: "19", deaths: "0" },
  { year: "2024", week: "W29", district: "Nagpur", disease: "Acute Diarrheal Disease", cases: "73", deaths: "0" },
];

const FOCUS_ROW = { year: "2024", week: "W07", district: "Kolhapur", disease: "Food Poisoning", cases: "651", deaths: "0" };

const RAW_LABELS = [
  "Dengue", "Dengue Fever", "DENGUE", "dengue fever",
  "ADD", "Acute Diarrheal Disease", "Acute Diarrhoea",
  "Malaria", "MALARIA", "Malaria (Pf)", "Malaria (Pv)",
  "Food Poisoning", "Food Poi.", "FOOD POISONING", "Suspected Food Poisoning",
  "Chikungunya", "CHIKUNGUNYA", "Chikungunya Fever",
];

const CLEAN_LABELS = ["Dengue", "Acute Diarrheal Disease", "Malaria", "Food Poisoning", "Chikungunya"];

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLDivElement>(null);
  const scene6Ref = useRef<HTMLDivElement>(null);
  const scene7Ref = useRef<HTMLDivElement>(null);
  const scene8Ref = useRef<HTMLDivElement>(null);
  const scene9Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (skip) {
      gsap.to(containerRef.current, { opacity: 0, duration: 0.35, onComplete });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, { opacity: 0, duration: 0.8, delay: 0.2, onComplete });
        }
      });

      // SCENE 01: Darkness / Subtle archival gold line (0–3.2s)
      tl.to(lineRef.current, { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0.6)
        .to(lineRef.current, { opacity: 0, duration: 0.6 }, 2.8);

      // SCENE 02: Government report fragments and evidence board (3.2–10.9s)
      tl.to(scene1Ref.current, { opacity: 1, duration: 0.8 }, 3.2)
        .to(".scene2-evidence-rule", { scaleX: 1, opacity: 0.9, duration: 0.8, stagger: 0.25, ease: "power2.inOut" }, 4.0)
        .to(".scene2-fragment", {
          opacity: (_index, target) => Number((target as HTMLElement).dataset.fragmentOpacity),
          duration: 0.4,
          stagger: 0.12,
          ease: "power2.out"
        }, 3.8)
        .to(".scene2-evidence-item", { opacity: 1, y: 0, duration: 0.42, stagger: { each: 0.12, from: "end" }, ease: "power2.out" }, 5.1)
        .to(scene1Ref.current, { opacity: 0, duration: 0.6 }, 10.3);

      // SCENE 03 & 04: PDF table & Extraction (10.9–14.9s)
      tl.to(scene2Ref.current, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 10.9)
        .to(".table-heading", { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 11.05)
        .to(".table-row", { opacity: 1, y: 0, duration: 0.42, stagger: 0.2, ease: "power2.out" }, 11.45)
        .to(".focus-row", { backgroundColor: "rgba(212,175,55,0.45)", duration: 0.7 }, 13.15)
        .to(".focus-row", { x: 80, opacity: 0, duration: 0.8, ease: "power2.in" }, 13.9)
        .to(scene2Ref.current, { opacity: 0, duration: 0.5 }, 14.6);

      // SCENE 05: Structured Records (15.1–17.9s)
      tl.to(scene3Ref.current, { opacity: 1, duration: 0.55 }, 15.1)
        .to(".record-heading", { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 15.35)
        .to(".record-card", { opacity: 1, y: 0, duration: 0.45, stagger: 0.16, ease: "power2.out" }, 15.65)
        .to(scene3Ref.current, { opacity: 0, duration: 0.5 }, 17.75);

      // SCENE 06: Raw label cloud, followed by taxonomy (18.2–24.5s)
      tl.to(scene5Ref.current, { opacity: 1, duration: 0.5 }, 18.15)
        .to(".raw-label-heading", { opacity: 1, y: 0, duration: 0.4 }, 18.35)
        .to(".raw-label", { opacity: 1, y: 0, stagger: 0.07, duration: 0.35, ease: "power2.out" }, 18.6)
        .to(scene5Ref.current, { opacity: 0, duration: 0.5 }, 20.45);

      tl.to(scene6Ref.current, { opacity: 1, duration: 0.6 }, 20.75);
      tl.to(".cascade-step", {
        opacity: 1, y: 0, stagger: 0.35, duration: 0.7, ease: "power2.out"
      }, 21.05);
      tl.to(scene6Ref.current, { opacity: 0, duration: 0.6 }, 23.45);

      // SCENE 07: Analytical Visual Field / Key Metrics (23.7–26.8s)
      tl.to(scene4Ref.current, { opacity: 1, duration: 0.6 }, 23.7);
      tl.to(".metric-in", { opacity: 1, y: 0, stagger: 0.3, duration: 0.7, ease: "power2.out" }, 24.0);
      tl.to(scene4Ref.current, { opacity: 0, duration: 0.6 }, 26.25);

      // SCENE 08: Main Title (26.6–30.1s)
      tl.to(titleRef.current, { opacity: 1, duration: 0.8 }, 26.6);
      tl.to(".title-line", {
        opacity: 1, y: 0, stagger: 0.35, duration: 0.7, ease: "power3.out"
      }, 26.9);
      // SCENE 09: Candidate & Institution Metadata (30.0–36.0s)
      tl.to(finalRef.current, { opacity: 1, duration: 0.6 }, 30.0);
      tl.to(".final-line", {
        opacity: 1, y: 0, stagger: 0.24, duration: 0.5, ease: "power2.out"
      }, 30.3);
      tl.to({}, { duration: 1.0 }, "+=1.0");
    }, containerRef);

    return () => ctx.revert();
  }, [skip, onComplete]);

  return (
    <div
      ref={containerRef}
      id="cinematic-intro"
      className="fixed inset-0 bg-black flex items-center justify-center z-[9999] overflow-hidden"
      style={{ cursor: "default" }}
    >
      {/* Skip button */}
      <button
        onClick={() => setSkip(true)}
        className="fixed bottom-6 right-6 z-[10000] text-[10px] font-mono uppercase tracking-[0.2em] text-[#F8FAFC]/30 hover:text-[#F8FAFC]/70 transition-colors px-3 py-1.5 border border-[#F8FAFC]/10"
      >
        Skip Intro
      </button>

      {/* SCENE 01: Royal Gold line */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent origin-left"
        style={{ transform: "scaleX(0)", opacity: 1 }}
      />

      {/* SCENE 02: Government fragment text */}
      <div
        ref={scene1Ref}
        className="absolute inset-0 flex flex-wrap items-center justify-center gap-6 p-12"
        style={{ opacity: 0 }}
      >
        {["NCDC", "IDSP", "WEEKLY OUTBREAK REPORT", "MAHARASHTRA", "WEEK", "DISTRICT", "DISEASE", "CASES", "DEATHS", "STATE SURVEILLANCE", "2022", "2023", "2024", "2025"].map((t, i) => {
          const size = 0.7 + ((i * 7) % 10) * 0.1;
          const op = 0.15 + ((i * 13) % 10) * 0.05;
          const rot = ((i * 17) % 7) - 3;
          return (
            <span
              key={i}
              className="scene2-fragment font-mono text-[#F8FAFC] uppercase opacity-0"
              data-fragment-opacity={op}
              style={{
                fontSize: `${size}rem`,
                letterSpacing: "0.25em",
                transform: `rotate(${rot}deg)`
              }}
            >
              {t}
            </span>
          );
        })}
        {/* Forensic-style case strip fades in after the report fragments. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[7%] top-1/2 z-10 -translate-y-1/2 px-4 sm:px-8"
        >
          <div
            className="scene2-evidence-rule h-[2px] origin-left scale-x-0 bg-[#A94F3D]/90 shadow-[0_0_10px_rgba(169,79,61,0.7)] opacity-0"
          />
          <div className="relative h-[min(52vh,400px)] min-h-64 overflow-hidden bg-black/45">
            {[
              { text: "ARCHIVE / NCDC · IDSP", position: "left-[3%] top-[6%]", style: "text-[8px] font-mono uppercase tracking-[0.24em] text-[#F8FAFC]", rotate: "-rotate-2", layer: "z-10" },
              { text: "2024", position: "left-[8%] top-[17%]", style: "text-[clamp(4rem,13vw,9rem)] font-mono font-bold uppercase leading-[0.8] tracking-[-0.1em] text-[#F8FAFC]", rotate: "-rotate-3", layer: "z-20" },
              { text: "W07", position: "left-[39%] top-[11%]", style: "text-[clamp(3.2rem,9vw,6rem)] font-mono font-bold uppercase leading-none tracking-[-0.08em] text-[#F8FAFC]", rotate: "rotate-2", layer: "z-30" },
              { text: "WEEK 07 / 52", position: "left-[42%] top-[37%]", style: "text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-[#F8FAFC]", rotate: "-rotate-2", layer: "z-40" },
              { text: "KOLHAPUR", position: "left-[4%] top-[59%]", style: "text-[clamp(1.4rem,5vw,3.7rem)] font-mono font-bold uppercase leading-none tracking-[-0.05em] text-[#F8FAFC]", rotate: "rotate-1", layer: "z-30" },
              { text: "DISTRICT / MH", position: "left-[8%] top-[81%]", style: "text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.24em] text-[#F8FAFC]", rotate: "-rotate-2", layer: "z-40" },
              { text: "FOOD POISONING", position: "left-[30%] top-[49%]", style: "text-[clamp(1rem,3.9vw,3rem)] font-mono font-bold uppercase leading-none tracking-[-0.04em] text-[#F8FAFC]", rotate: "-rotate-2", layer: "z-40" },
              { text: "CLASSIFICATION", position: "left-[35%] top-[70%]", style: "text-[8px] font-mono uppercase tracking-[0.22em] text-[#F8FAFC]", rotate: "rotate-1", layer: "z-50" },
              { text: "651", position: "left-[69%] top-[32%]", style: "text-[clamp(4rem,12vw,8.5rem)] font-mono font-bold uppercase leading-[0.8] tracking-[-0.1em] text-[#F8FAFC]", rotate: "rotate-3", layer: "z-50" },
              { text: "REPORTED CASES", position: "left-[72%] top-[62%]", style: "text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#F8FAFC]", rotate: "-rotate-2", layer: "z-50" },
              { text: "0 DEATHS", position: "left-[55%] top-[82%]", style: "text-[clamp(0.7rem,2vw,1.2rem)] font-mono font-bold uppercase tracking-[0.1em] text-[#F8FAFC]", rotate: "rotate-2", layer: "z-40" },
              { text: "SOURCE TABLE / WEEKLY BULLETIN", position: "left-[67%] top-[8%]", style: "text-[7px] sm:text-[9px] font-mono uppercase tracking-[0.17em] text-[#F8FAFC]", rotate: "rotate-2", layer: "z-40" },
              { text: "01", position: "left-[28%] top-[80%]", style: "text-[clamp(1.5rem,4vw,3rem)] font-mono font-bold uppercase leading-none text-[#F8FAFC]", rotate: "rotate-6", layer: "z-20" },
              { text: "EVENT RECORD", position: "left-[47%] top-[25%]", style: "text-[8px] font-mono uppercase tracking-[0.24em] text-[#F8FAFC]", rotate: "rotate-2", layer: "z-40" },
              { text: "STATE SURVEILLANCE", position: "left-[2%] top-[37%]", style: "text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.18em] text-[#F8FAFC]", rotate: "rotate-1", layer: "z-40" },
              { text: "2022–2025 BASELINE", position: "left-[48%] top-[5%]", style: "text-[7px] sm:text-[9px] font-mono uppercase tracking-[0.2em] text-[#F8FAFC]", rotate: "-rotate-2", layer: "z-20" },
              { text: "OUTBREAK BULLETIN", position: "left-[57%] top-[27%]", style: "text-[clamp(0.75rem,2.4vw,1.5rem)] font-mono font-bold uppercase tracking-[0.03em] text-[#F8FAFC]", rotate: "rotate-2", layer: "z-20" },
              { text: "YEAR / 2024", position: "left-[19%] top-[40%]", style: "text-[8px] font-mono uppercase tracking-[0.2em] text-[#F8FAFC]", rotate: "-rotate-2", layer: "z-50" },
              { text: "WEEK", position: "left-[42%] top-[52%]", style: "text-[7px] font-mono uppercase tracking-[0.25em] text-[#F8FAFC]", rotate: "rotate-3", layer: "z-50" },
              { text: "651 CASES", position: "left-[76%] top-[76%]", style: "text-[clamp(0.8rem,2.5vw,1.6rem)] font-mono font-bold uppercase tracking-[0.02em] text-[#F8FAFC]", rotate: "-rotate-2", layer: "z-30" },
              { text: "MAHARASHTRA", position: "left-[35%] top-[84%]", style: "text-[7px] sm:text-[9px] font-mono uppercase tracking-[0.28em] text-[#F8FAFC]", rotate: "rotate-1", layer: "z-20" },
              { text: "DISTRICT · DISEASE · CASES", position: "left-[3%] top-[48%]", style: "text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.18em] text-[#F8FAFC]", rotate: "-rotate-1", layer: "z-10" },
              { text: "SOURCE / WEEKLY REPORT", position: "left-[59%] top-[84%]", style: "text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.15em] text-[#F8FAFC]", rotate: "-rotate-1", layer: "z-40" },
              { text: "IDSP", position: "left-[89%] top-[51%]", style: "text-[clamp(1rem,3vw,2rem)] font-mono font-bold uppercase tracking-[-0.08em] text-[#F8FAFC]", rotate: "rotate-90", layer: "z-20" },
              { text: "CASE SUMMARY", position: "left-[4%] top-[84%]", style: "text-[7px] sm:text-[9px] font-mono uppercase tracking-[0.22em] text-[#F8FAFC]", rotate: "rotate-2", layer: "z-30" },
              { text: "REPORTED DEATHS / 0", position: "left-[55%] top-[73%]", style: "text-[8px] font-mono uppercase tracking-[0.16em] text-[#F8FAFC]", rotate: "rotate-2", layer: "z-40" },
              { text: "FOOD-BORNE EVENT", position: "left-[26%] top-[28%]", style: "text-[8px] sm:text-[10px] font-mono font-semibold uppercase tracking-[0.1em] text-[#F8FAFC]", rotate: "-rotate-1", layer: "z-40" },
            ].map((item, index) => (
              <div
                key={`${item.text}-${index}`}
                className={`scene2-evidence-item absolute ${item.position} ${item.style} ${item.rotate} ${item.layer} translate-y-2 whitespace-nowrap opacity-0`}
              >
                {item.text}
              </div>
            ))}
          </div>
          <div
            className="scene2-evidence-rule h-[2px] origin-right scale-x-0 bg-[#A94F3D]/90 shadow-[0_0_10px_rgba(169,79,61,0.7)] opacity-0"
          />
        </div>
      </div>

      {/* SCENE 03: PDF table */}
      <div
        ref={scene2Ref}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0, transform: "translateY(20px)" }}
      >
        <div className="doc-fragment rounded-sm p-0 w-[min(1100px,94vw)] shadow-2xl">
          <div className="table-heading bg-[#173F3A] text-[#F8FAFC] px-4 py-3 flex items-center gap-3 opacity-0 translate-y-2">
            <span className="font-mono text-[clamp(9px,1vw,13px)] tracking-widest uppercase opacity-70">NCDC / IDSP</span>
            <span className="font-mono text-[clamp(9px,1vw,13px)] tracking-widest uppercase opacity-70">Maharashtra Weekly Outbreak Bulletin</span>
            <span className="ml-auto font-mono text-[clamp(9px,1vw,13px)] opacity-50">Source Document</span>
          </div>
          <div className="overflow-hidden">
            <table className="w-full text-[clamp(0.7rem,1.35vw,1rem)] font-mono">
              <thead>
                <tr className="border-b border-[#06080F]/15 bg-[#F8FAFC]/80">
                  {["YEAR", "WEEK", "DISTRICT", "DISEASE", "CASES", "DEATHS"].map((h) => (
                    <th key={h} className="table-heading px-2 sm:px-4 py-3 text-left font-bold tracking-widest text-[clamp(8px,0.9vw,12px)] uppercase text-[#06080F]/60 opacity-0 translate-y-2">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DOC_ROWS.map((r, i) => {
                  const isFocus = r.year === FOCUS_ROW.year && r.week === FOCUS_ROW.week && r.district === FOCUS_ROW.district;
                  return (
                    <tr
                      key={i}
                      className={`table-row border-b border-[#06080F]/8 opacity-0 translate-y-2 ${isFocus ? "focus-row" : ""}`}
                      style={{
                        backgroundColor: isFocus ? "transparent" : i % 2 === 0 ? "rgba(17,20,17,0.03)" : "transparent",
                        fontWeight: isFocus ? 700 : 400,
                      }}
                    >
                      <td className="px-2 sm:px-4 py-2.5 text-[#06080F]/70">{r.year}</td>
                      <td className="px-2 sm:px-4 py-2.5 text-[#06080F]/70">{r.week}</td>
                      <td className="px-2 sm:px-4 py-2.5 text-[#06080F]">{r.district}</td>
                      <td className="px-2 sm:px-4 py-2.5 text-[#06080F]">{r.disease}</td>
                      <td className={`px-2 sm:px-4 py-2.5 text-right tabular-nums ${isFocus ? "text-[#A94F3D] font-bold" : "text-[#06080F]"}`}>{r.cases}</td>
                      <td className="px-2 sm:px-4 py-2.5 text-right tabular-nums text-[#06080F]/60">{r.deaths}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SCENE 05: Structured record */}
      <div
        ref={scene3Ref}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="record-heading font-mono text-[clamp(11px,1.2vw,16px)] tracking-[0.3em] text-[#00F0FF] uppercase mb-4 opacity-0 translate-y-2">Record Extracted</div>
          <div className="grid grid-cols-3 gap-3 sm:gap-5 w-[min(820px,92vw)]">
            {[
              { k: "YEAR", v: "2024" },
              { k: "WEEK", v: "W07" },
              { k: "DISTRICT", v: "Kolhapur" },
              { k: "DISEASE", v: "Food Poisoning" },
              { k: "CASES", v: "651" },
              { k: "DEATHS", v: "0" },
            ].map(({ k, v }) => (
              <div key={k} className="record-card border border-[#00F0FF]/30 bg-[#111A2B]/80 p-3 sm:p-5 rounded-sm opacity-0 translate-y-3">
                <div className="font-mono text-[clamp(8px,0.9vw,12px)] tracking-widest text-[#94A3B8] uppercase mb-1">{k}</div>
                <div className="font-serif text-[clamp(1.1rem,3.5vw,2.8rem)] text-[#F8FAFC] font-bold leading-tight">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SCENE 06: Metrics */}
      <div
        ref={scene4Ref}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center max-w-full px-4">
          {[
            { n: "237", l: "SURVEILLANCE WEEKS" },
            { n: "809", l: "ANALYTICAL RECORDS" },
            { n: "20,955", l: "REPORTED CASES" },
          ].map(({ n, l }, i) => (
            <div key={i} className="metric-in" style={{ opacity: 0, transform: "translateY(24px)" }}>
              <div className="font-serif text-[clamp(3rem,min(12vw,16vh),9rem)] font-bold text-[#F8FAFC] leading-none tracking-tight max-w-full">{n}</div>
              <div className="font-mono text-[clamp(10px,1.1vw,14px)] tracking-[0.3em] text-[#00F0FF] uppercase mt-2">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SCENE 07: Raw labels */}
      <div
        ref={scene5Ref}
        className="absolute inset-0 flex flex-wrap items-center justify-center content-center gap-4 p-8 sm:p-16"
        style={{ opacity: 0 }}
      >
        <div className="raw-label-heading w-full text-center font-mono text-[clamp(10px,1.2vw,15px)] tracking-[0.3em] text-[#94A3B8] uppercase mb-6 opacity-0 translate-y-2">
          116 Raw Disease Strings — As Found in Source PDFs
        </div>
        {RAW_LABELS.map((l, i) => (
          <span
            key={i}
            className="raw-label font-mono px-4 py-2 border border-[#F8FAFC]/15 text-[#F8FAFC]/70 text-[clamp(1rem,2.8vw,2.15rem)] rounded-sm opacity-0 translate-y-2"
            style={{ opacity: 0, transform: "translateY(10px)" }}
          >
            {l}
          </span>
        ))}
      </div>

      {/* SCENE 08: Cascade */}
      <div
        ref={scene6Ref}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-5 sm:gap-7">
          {[
            { n: "116", l: "Raw Strings" },
            { n: "56", l: "Clean Labels" },
            { n: "30", l: "Derived Families" },
            { n: "5", l: "Primary Cohorts", gold: true },
          ].map(({ n, l, gold }, i) => (
            <div
              key={i}
              className="cascade-step flex items-center gap-5"
              style={{ opacity: 0, transform: "translateY(12px)" }}
            >
              {i > 0 && <div className="w-px h-4 bg-[#F8FAFC]/15 mx-auto" style={{ position: "absolute", left: "50%", marginTop: "-1.5rem" }} />}
              <div className={`font-serif text-[clamp(3rem,9vw,7rem)] font-bold leading-none ${gold ? "text-[#00F0FF]" : "text-[#F8FAFC]"}`}>{n}</div>
              <div className={`font-mono text-[clamp(11px,1.5vw,18px)] tracking-[0.22em] uppercase ${gold ? "text-[#00F0FF]" : "text-[#94A3B8]"}`}>{l}</div>
              {i < 3 && (
                <div className="absolute font-mono text-[#94A3B8]/40 text-xs" style={{ transform: "translateX(-200px) translateY(1.5rem)" }}>↓</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SCENE 09: Main title */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
        style={{ opacity: 0 }}
      >
        <div className="title-line font-mono text-[10px] tracking-[0.35em] text-[#00F0FF] uppercase mb-8" style={{ opacity: 0, transform: "translateY(12px)" }}>
          Diseases leave patterns.
        </div>
        <div className="title-line font-serif text-[clamp(1.8rem,5vw,3.5rem)] font-light text-[#F8FAFC] leading-tight max-w-3xl mb-4" style={{ opacity: 0, transform: "translateY(16px)" }}>
          Data lets us see them.
        </div>
        <div className="title-line my-6 w-16 h-px bg-[#00F0FF] mx-auto" style={{ opacity: 0, transform: "translateY(8px)" }} />
        <div className="title-line font-mono text-[10px] tracking-[0.2em] text-[#94A3B8] uppercase" style={{ opacity: 0, transform: "translateY(10px)" }}>
          From Government Records to Seasonal Patterns in Maharashtra
        </div>

        <div
          ref={finalRef}
          className="mt-16 flex flex-col items-center gap-4"
          style={{ opacity: 0 }}
        >
          <div className="final-line w-28 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-2" style={{ opacity: 0, transform: "translateY(10px)" }} />

          <div className="final-line font-serif text-[clamp(2.5rem,7vw,4.2rem)] text-[#F5D061] font-bold tracking-[0.08em] leading-tight drop-shadow-[0_0_24px_rgba(212,175,55,0.4)]" style={{ opacity: 0, transform: "translateY(10px)" }}>
            Khan Umar
          </div>

          <div className="final-line font-serif text-[14px] text-[#F8FAFC] font-semibold tracking-[0.08em]" style={{ opacity: 0, transform: "translateY(8px)" }}>
            B.Sc. Data Science · Semester III
          </div>

          <div className="final-line font-mono text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold" style={{ opacity: 0, transform: "translateY(8px)" }}>
            RP Institute
          </div>
          <div className="final-line font-mono text-[9px] tracking-[0.15em] text-[#94A3B8]" style={{ opacity: 0, transform: "translateY(8px)" }}>
            University of Mumbai
          </div>

          <div className="final-line w-36 h-px bg-[#D4AF37]/30 my-3" style={{ opacity: 0, transform: "translateY(8px)" }} />
          <div className="final-line flex flex-col items-center gap-1" style={{ opacity: 0, transform: "translateY(8px)" }}>
            <span className="font-mono text-[8px] tracking-[0.2em] text-[#D4AF37]/80 uppercase">Project Guide</span>
            <span className="font-serif text-[clamp(1.2rem,2.5vw,1.9rem)] text-[#F5D061] font-bold tracking-[0.08em] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Prof. Angelin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
