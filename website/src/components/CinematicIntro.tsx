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
      gsap.to(containerRef.current, { opacity: 0, duration: 0.4, onComplete });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, { opacity: 0, duration: 1, delay: 0.4, onComplete });
        }
      });

      // SCENE 01: Darkness / Subtle archival gold line (0–4s)
      tl.to(lineRef.current, { scaleX: 1, duration: 2.2, ease: "power2.inOut" }, 0.8)
        .to(lineRef.current, { opacity: 0, duration: 0.8 }, 3.2);

      // SCENE 02: Government report fragments (4–8s)
      tl.to(scene1Ref.current, { opacity: 1, duration: 1.0 }, 4.0)
        .to(scene1Ref.current, { opacity: 0, duration: 0.8 }, 7.2);

      // SCENE 03 & 04: PDF table & Extraction (8–12s)
      tl.to(scene2Ref.current, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 8.0)
        .to(".focus-row", { backgroundColor: "rgba(199,167,91,0.4)", duration: 0.8 }, 9.2)
        .to(".focus-row", { x: 80, opacity: 0, duration: 1.0, ease: "power2.in" }, 10.6)
        .to(scene2Ref.current, { opacity: 0, duration: 0.6 }, 11.6);

      // SCENE 05: Structured Records (12–16s)
      tl.to(scene3Ref.current, { opacity: 1, duration: 0.8 }, 12.0)
        .to(scene3Ref.current, { opacity: 0, duration: 0.6 }, 15.4);

      // SCENE 06: Taxonomy 116 → 56 → 30 → 5 (16–20s)
      tl.to(scene6Ref.current, { opacity: 1, duration: 0.8 }, 16.0);
      tl.to(".cascade-step", {
        opacity: 1, y: 0, stagger: 0.45, duration: 0.8, ease: "power2.out"
      }, 16.4);
      tl.to(scene6Ref.current, { opacity: 0, duration: 0.7 }, 19.5);

      // SCENE 07: Analytical Visual Field / Key Metrics (20–24s)
      tl.to(scene4Ref.current, { opacity: 1, duration: 0.8 }, 20.0);
      tl.to(".metric-in", { opacity: 1, y: 0, stagger: 0.35, duration: 0.8, ease: "power2.out" }, 20.4);
      tl.to(scene4Ref.current, { opacity: 0, duration: 0.7 }, 23.5);

      // SCENE 08: Main Title (24–28s)
      tl.to(titleRef.current, { opacity: 1, duration: 1.0 }, 24.0);
      tl.to(".title-line", {
        opacity: 1, y: 0, stagger: 0.45, duration: 0.9, ease: "power3.out"
      }, 24.4);

      // SCENE 09: Candidate & Institution Metadata (28–30s)
      tl.to(finalRef.current, { opacity: 1, duration: 0.8 }, 27.5);
      tl.to(".final-line", {
        opacity: 1, y: 0, stagger: 0.3, duration: 0.7, ease: "power2.out"
      }, 27.8);
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
        className="fixed bottom-6 right-6 z-[10000] text-[10px] font-mono uppercase tracking-[0.2em] text-[#EEE8DA]/30 hover:text-[#EEE8DA]/70 transition-colors px-3 py-1.5 border border-[#EEE8DA]/10 hover:border-[#EEE8DA]/30 rounded"
      >
        Skip Intro
      </button>

      {/* SCENE 01: Gold line */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 h-px bg-[#C7A75B] origin-left"
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
              className="font-mono text-[#EEE8DA] uppercase"
              style={{
                fontSize: `${size}rem`,
                opacity: op,
                letterSpacing: "0.25em",
                transform: `rotate(${rot}deg)`
              }}
            >{t}</span>
          );
        })}
      </div>

      {/* SCENE 03: PDF table */}
      <div
        ref={scene2Ref}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0, transform: "translateY(20px)" }}
      >
        <div className="doc-fragment rounded-sm p-0 w-[min(700px,90vw)] shadow-2xl">
          <div className="bg-[#173F3A] text-[#EEE8DA] px-4 py-2 flex items-center gap-3">
            <span className="font-mono text-[9px] tracking-widest uppercase opacity-70">NCDC / IDSP</span>
            <span className="font-mono text-[9px] tracking-widest uppercase opacity-70">Maharashtra Weekly Outbreak Bulletin</span>
            <span className="ml-auto font-mono text-[9px] opacity-50">Source Document</span>
          </div>
          <div className="overflow-hidden">
            <table className="w-full text-[11px] font-mono">
              <thead>
                <tr className="border-b border-[#111411]/15 bg-[#EEE8DA]/80">
                  {["YEAR", "WEEK", "DISTRICT", "DISEASE", "CASES", "DEATHS"].map(h => (
                    <th key={h} className="px-3 py-2 text-left font-bold tracking-widest text-[8px] uppercase text-[#111411]/60">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DOC_ROWS.map((r, i) => {
                  const isFocus = r.year === FOCUS_ROW.year && r.week === FOCUS_ROW.week && r.district === FOCUS_ROW.district;
                  return (
                    <tr
                      key={i}
                      className={`border-b border-[#111411]/8 ${isFocus ? "focus-row" : ""}`}
                      style={{
                        backgroundColor: isFocus ? "transparent" : i % 2 === 0 ? "rgba(17,20,17,0.03)" : "transparent",
                        fontWeight: isFocus ? 700 : 400,
                      }}
                    >
                      <td className="px-3 py-1.5 text-[#111411]/70">{r.year}</td>
                      <td className="px-3 py-1.5 text-[#111411]/70">{r.week}</td>
                      <td className="px-3 py-1.5 text-[#111411]">{r.district}</td>
                      <td className="px-3 py-1.5 text-[#111411]">{r.disease}</td>
                      <td className={`px-3 py-1.5 text-right tabular-nums ${isFocus ? "text-[#A94F3D] font-bold" : "text-[#111411]"}`}>{r.cases}</td>
                      <td className="px-3 py-1.5 text-right tabular-nums text-[#111411]/60">{r.deaths}</td>
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
        <div className="flex flex-col items-center gap-3">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#C7A75B] uppercase mb-4">Record Extracted</div>
          <div className="grid grid-cols-3 gap-3 w-[min(560px,90vw)]">
            {[
              { k: "YEAR", v: "2024" },
              { k: "WEEK", v: "W07" },
              { k: "DISTRICT", v: "Kolhapur" },
              { k: "DISEASE", v: "Food Poisoning" },
              { k: "CASES", v: "651" },
              { k: "DEATHS", v: "0" },
            ].map(({ k, v }) => (
              <div key={k} className="border border-[#C7A75B]/30 bg-[#111A2B]/80 p-3 rounded-sm">
                <div className="font-mono text-[8px] tracking-widest text-[#B5B0A4] uppercase mb-1">{k}</div>
                <div className="font-serif text-xl text-[#EEE8DA] font-bold">{v}</div>
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
        <div className="flex flex-col items-center gap-10 text-center">
          {[
            { n: "237", l: "SURVEILLANCE WEEKS" },
            { n: "809", l: "ANALYTICAL RECORDS" },
            { n: "21,955", l: "REPORTED CASES" },
          ].map(({ n, l }, i) => (
            <div key={i} className="metric-in" style={{ opacity: 0, transform: "translateY(24px)" }}>
              <div className="font-serif text-[clamp(4rem,12vw,9rem)] font-bold text-[#EEE8DA] leading-none tracking-tight">{n}</div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#C7A75B] uppercase mt-2">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SCENE 07: Raw labels */}
      <div
        ref={scene5Ref}
        className="absolute inset-0 flex flex-wrap items-center justify-center content-center gap-3 p-16"
        style={{ opacity: 0 }}
      >
        <div className="w-full text-center font-mono text-[9px] tracking-[0.3em] text-[#B5B0A4] uppercase mb-6">
          116 Raw Disease Strings — As Found in Source PDFs
        </div>
        {RAW_LABELS.map((l, i) => (
          <span
            key={i}
            className="raw-label font-mono px-3 py-1.5 border border-[#EEE8DA]/15 text-[#EEE8DA]/70 text-sm rounded-sm"
            style={{ opacity: 0, transform: "translateY(10px)" }}
          >{l}</span>
        ))}
      </div>

      {/* SCENE 08: Cascade */}
      <div
        ref={scene6Ref}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-4">
          {[
            { n: "116", l: "Raw Strings" },
            { n: "56",  l: "Clean Labels" },
            { n: "30",  l: "Derived Families" },
            { n: "5",   l: "Primary Cohorts", gold: true },
          ].map(({ n, l, gold }, i) => (
            <div
              key={i}
              className="cascade-step flex items-center gap-5"
              style={{ opacity: 0, transform: "translateY(12px)" }}
            >
              {i > 0 && <div className="w-px h-4 bg-[#EEE8DA]/15 mx-auto" style={{ position: "absolute", left: "50%", marginTop: "-1.5rem" }} />}
              <div className={`font-serif text-[clamp(2rem,6vw,4rem)] font-bold leading-none ${gold ? "text-[#C7A75B]" : "text-[#EEE8DA]"}`}>{n}</div>
              <div className={`font-mono text-[11px] tracking-[0.22em] uppercase ${gold ? "text-[#C7A75B]" : "text-[#B5B0A4]"}`}>{l}</div>
              {i < 3 && (
                <div className="absolute font-mono text-[#B5B0A4]/40 text-xs" style={{ transform: "translateX(-200px) translateY(1.5rem)" }}>↓</div>
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
        <div className="title-line font-mono text-[10px] tracking-[0.35em] text-[#C7A75B] uppercase mb-8" style={{ opacity: 0, transform: "translateY(12px)" }}>
          Diseases leave patterns.
        </div>
        <div className="title-line font-serif text-[clamp(1.8rem,5vw,3.5rem)] font-light text-[#EEE8DA] leading-tight max-w-3xl mb-4" style={{ opacity: 0, transform: "translateY(16px)" }}>
          Data lets us see them.
        </div>
        <div className="title-line my-6 w-16 h-px bg-[#C7A75B] mx-auto" style={{ opacity: 0, transform: "translateY(8px)" }} />
        <div className="title-line font-mono text-[10px] tracking-[0.2em] text-[#B5B0A4] uppercase" style={{ opacity: 0, transform: "translateY(10px)" }}>
          From Government Records to Seasonal Patterns in Maharashtra
        </div>

        <div
          ref={finalRef}
          className="mt-14 flex flex-col items-center gap-2"
          style={{ opacity: 0 }}
        >
          <div className="final-line font-serif text-2xl text-[#EEE8DA] font-bold" style={{ opacity: 0, transform: "translateY(10px)" }}>Khan Umar</div>
          <div className="final-line font-mono text-[9px] tracking-[0.22em] text-[#B5B0A4] uppercase" style={{ opacity: 0, transform: "translateY(8px)" }}>B.Sc. Data Science · Semester III</div>
          <div className="final-line font-mono text-[9px] tracking-[0.2em] text-[#B5B0A4] uppercase" style={{ opacity: 0, transform: "translateY(8px)" }}>RP Institute · University of Mumbai</div>
          <div className="final-line font-mono text-[9px] tracking-[0.2em] text-[#B5B0A4]/60 uppercase mt-1" style={{ opacity: 0, transform: "translateY(8px)" }}>Project Guide: Prof.Angelin</div>
        </div>
      </div>
    </div>
  );
}
