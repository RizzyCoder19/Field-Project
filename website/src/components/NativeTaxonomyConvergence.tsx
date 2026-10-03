"use client";

import React, { useState } from "react";

const STAGES = [
  {
    step: "01",
    num: "116",
    label: "Raw Strings",
    desc: "Chaotic OCR variants, abbreviations, mixed casing, and clinical spellings in weekly PDF bulletins.",
    examples: ["Dengue", "Dengue Fever", "DENGUE", "ADD", "Acute Diarrhoea", "Food Poi.", "Suspected Malaria"],
    color: "#B5B0A4",
  },
  {
    step: "02",
    num: "56",
    label: "Clean Labels",
    desc: "Harmonized canonical disease labels created via deterministic dictionary lookup while preserving raw provenance.",
    examples: ["Dengue", "Acute Diarrheal Disease", "Malaria", "Food Poisoning", "Chikungunya", "Viral Hepatitis"],
    color: "#C7A75B",
  },
  {
    step: "03",
    num: "30",
    label: "Syndromic Families",
    desc: "Etiological and transmission groupings (Vector-borne, Enteric, Zoonotic, Respiratory, Food-borne).",
    examples: ["Vector-Borne Arboviral", "Water-Borne Enteric", "Vector-Borne Protozoal", "Toxin/Food-Borne"],
    color: "#89947C",
  },
  {
    step: "04",
    num: "5",
    label: "Primary Cohorts",
    desc: "High-burden analytical cohort capturing 93.9% of all 2022–2025 baseline records (539 of 574 records).",
    examples: ["Dengue (204)", "ADD (153)", "Malaria (70)", "Food Poisoning (69)", "Chikungunya (43)"],
    color: "#38BDF8",
    isPrimary: true,
  },
];

export default function NativeTaxonomyConvergence({ className = "" }: { className?: string }) {
  const [activeStage, setActiveStage] = useState(3);

  return (
    <div className={`w-full bg-[#0b0f0b] border border-[#EEE8DA]/08 rounded-sm p-6 flex flex-col ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="font-mono text-[9px] uppercase tracking-widest text-[#C7A75B]">
          Data Cleaning Discipline · Rigorous Reduction
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#EEE8DA] mt-1">
          116 Raw Strings → 5 Primary Analytical Cohorts
        </h3>
        <p className="font-mono text-xs text-[#B5B0A4] mt-1.5 max-w-2xl leading-relaxed">
          How unstructured government text becomes statistically testable cohorts without discarding records or inventing categories.
        </p>
      </div>

      {/* Stage Cards Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-2">
        {STAGES.map((s, idx) => {
          const isSelected = activeStage === idx;
          return (
            <div
              key={s.step}
              onClick={() => setActiveStage(idx)}
              className={`p-4 rounded-sm border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? "border-[#C7A75B] bg-[#111A2B]/80 shadow-xl"
                  : "border-[#EEE8DA]/08 bg-[#111411]/50 hover:border-[#EEE8DA]/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[8px] text-[#B5B0A4]/60 uppercase">
                  <span>STAGE {s.step}</span>
                  {s.isPrimary && <span className="text-[#38BDF8] font-bold">93.9% RECORDS</span>}
                </div>
                <div className="font-serif font-bold text-4xl sm:text-5xl mt-2" style={{ color: s.color }}>
                  {s.num}
                </div>
                <div className="font-mono text-xs font-bold text-[#EEE8DA] mt-1 uppercase tracking-wider">
                  {s.label}
                </div>
                <p className="font-mono text-[9px] text-[#B5B0A4] mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* Sample badges */}
              <div className="mt-4 pt-3 border-t border-[#EEE8DA]/08 flex flex-wrap gap-1">
                {s.examples.slice(0, 3).map((ex) => (
                  <span
                    key={ex}
                    className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-[#EEE8DA]/05 text-[#EEE8DA]/70 border border-[#EEE8DA]/06"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Deep Dive */}
      <div className="mt-4 p-4 bg-[#111411] border border-[#EEE8DA]/10 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-mono text-[8px] uppercase tracking-widest text-[#C7A75B]">
            Inspection: Stage {STAGES[activeStage].step} ({STAGES[activeStage].label})
          </div>
          <div className="font-mono text-xs text-[#EEE8DA] mt-1">
            {activeStage === 0 && "116 different raw disease spellings were extracted verbatim from NCDC bulletins."}
            {activeStage === 1 && "Normalized using verified case-insensitive regex dictionary rules."}
            {activeStage === 2 && "Grouped according to official WHO / NVBDCP epidemiological taxonomy."}
            {activeStage === 3 && "Isolated 5 core cohort families representing 21,955 cases and 266 deaths."}
          </div>
        </div>
        <div className="font-mono text-[9px] text-[#B5B0A4]/50 border-t sm:border-t-0 sm:border-l border-[#EEE8DA]/10 pt-2 sm:pt-0 sm:pl-4">
          Additive normalization: &apos;disease_raw&apos; string permanently preserved in database.
        </div>
      </div>
    </div>
  );
}
