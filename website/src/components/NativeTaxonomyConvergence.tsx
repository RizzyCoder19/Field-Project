"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";

const STAGES = [
  {
    step: "01",
    num: "116",
    label: "Raw Strings in Source PDFs",
    denominator: "Total distinct string variations across all downloaded bulletins",
    desc: "Chaotic OCR variants, abbreviations, mixed casing, and clinical spellings in weekly PDF bulletins.",
    examples: ["Dengue", "Dengue Fever", "DENGUE", "ADD", "Acute Diarrhoea", "Food Poi.", "Suspected Malaria"],
    color: "#94A3B8",
  },
  {
    step: "02",
    num: "56",
    label: "Clean Canonical Labels",
    denominator: "Deterministic dictionary normalization",
    desc: "Harmonized canonical disease labels created via deterministic dictionary lookup while preserving raw provenance.",
    examples: ["Dengue", "Acute Diarrheal Disease", "Malaria", "Food Poisoning", "Chikungunya", "Viral Hepatitis"],
    color: "#00F0FF",
  },
  {
    step: "03",
    num: "30",
    label: "Derived Syndromic Families",
    denominator: "Transmission and etiological groupings",
    desc: "Etiological and transmission groupings (Vector-borne, Enteric, Zoonotic, Respiratory, Food-borne).",
    examples: ["Vector-Borne Arboviral", "Water-Borne Enteric", "Vector-Borne Protozoal", "Toxin/Food-Borne"],
    color: "#10B981",
  },
  {
    step: "04",
    num: "5",
    label: "Primary Study Cohorts",
    denominator: "539 records of 733 baseline records (73.5% denominator)",
    desc: "High-burden analytical cohort capturing 73.5% of all 2022–2025 baseline records (539 of 733 records).",
    examples: ["Dengue (204)", "ADD (153)", "Malaria (70)", "Food Poisoning (69)", "Chikungunya (43)"],
    color: "#38BDF8",
    isPrimary: true,
  },
];

export default function NativeTaxonomyConvergence({ className = "" }: { className?: string }) {
  const [activeStage, setActiveStage] = useState(3);
  const [animKey, setAnimKey] = useState(0);

  const handleReplay = () => {
    setAnimKey(k => k + 1);
  };

  return (
    <div
      className={`w-full bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm p-4 sm:p-6 lg:p-8 flex flex-col shadow-2xl ${className}`}
      role="region"
      aria-label="Taxonomic Harmonization Convergence Pipeline"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F8FAFC]/10">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
            Deterministic Reduction Architecture · 2022–2025 Baseline
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-1">
            116 Raw Disease Strings → 5 Primary Analytical Cohorts
          </h3>
          <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl leading-relaxed">
            How unstructured government text is transformed into statistically testable cohorts without discarding records or inventing disease classifications.
          </p>
        </div>

        <button
          onClick={handleReplay}
          className="px-3 py-1.5 bg-[#06080F] hover:bg-[#1A2234] border border-[#F8FAFC]/15 text-[#D4AF37] hover:text-[#F5D061] rounded-sm font-mono text-xs flex items-center gap-1.5 transition-colors"
          title="Reconstruct taxonomy convergence stages"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Replay Stages</span>
        </button>
      </div>

      {/* Stage Cards Flow (Progressive Convergence) */}
      <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-2">
        {STAGES.map((s, idx) => {
          const isSelected = activeStage === idx;
          return (
            <div
              key={s.step}
              onClick={() => setActiveStage(idx)}
              className={`p-5 rounded-sm border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? "border-[#00F0FF] bg-[#1E293B] shadow-2xl scale-[1.02] ring-1 ring-[#00F0FF]/40"
                  : "border-[#F8FAFC]/10 bg-[#06080F]/80 hover:border-[#F8FAFC]/25"
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[9px] text-[#94A3B8] uppercase font-bold">
                  <span>STAGE {s.step}</span>
                  {s.isPrimary && (
                    <span className="text-[#38BDF8] font-bold border border-[#38BDF8]/40 px-1.5 py-0.5 rounded-sm bg-[#38BDF8]/10">
                      539 / 733 (73.5%)
                    </span>
                  )}
                </div>

                <div className="font-serif font-bold text-4xl sm:text-5xl mt-3" style={{ color: s.color }}>
                  {s.num}
                </div>

                <div className="font-mono text-xs font-bold text-[#F8FAFC] mt-1 uppercase tracking-wider">
                  {s.label}
                </div>

                <p className="font-mono text-xs text-[#94A3B8] mt-2.5 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* Sample Badges */}
              <div className="mt-5 pt-3 border-t border-[#F8FAFC]/10 flex flex-wrap gap-1.5">
                {s.examples.slice(0, 3).map((ex) => (
                  <span
                    key={ex}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-[#0B111E] text-[#F8FAFC]/80 border border-[#F8FAFC]/10"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Detailed Breakdown Banner */}
      <div className="mt-4 p-5 bg-[#06080F] border border-[#F8FAFC]/15 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs shadow-xl">
        <div>
          <span className="text-[#00F0FF] font-bold uppercase tracking-wider mr-2">
            Stage {STAGES[activeStage].step} Detail:
          </span>
          <span className="text-[#F8FAFC] font-bold text-sm">{STAGES[activeStage].label}</span>
          <span className="text-[#94A3B8] ml-2 font-normal block sm:inline mt-1 sm:mt-0">
            — {STAGES[activeStage].denominator}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {STAGES[activeStage].examples.map((ex) => (
            <span
              key={ex}
              className="text-[10px] px-2.5 py-1 bg-[#0B111E] border border-[#00F0FF]/30 text-[#00F0FF] rounded-sm font-semibold"
            >
              {ex}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
