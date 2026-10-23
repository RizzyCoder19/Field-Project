"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, CheckCircle2, HelpCircle, 
  ChevronDown, ChevronUp, ShieldCheck, Activity, Award
} from "lucide-react";
import NativeKendallAlignment from "@/components/NativeKendallAlignment";
import ChapterFooter from "@/components/ChapterFooter";

const STABILITY_PROFILES = [
  {
    id: "add",
    name: "Acute Diarrhoeal Disease",
    w: "0.530",
    pValue: "0.016",
    significant: true,
    color: "#10B981",
    summary: "Statistically significant repeatable seasonal timing (p = 0.016 < 0.05). July monsoon water contamination surges arrived with remarkable annual regularity across all four baseline years.",
  },
  {
    id: "dengue",
    name: "Dengue Fever",
    w: "0.312",
    pValue: "0.284",
    significant: false,
    color: "#38BDF8",
    summary: "Moderate concordant concentration, but annual peak month wanders between September, October, and November depending on late monsoon rains and temperature shifts.",
  },
  {
    id: "malaria",
    name: "Malaria",
    w: "0.245",
    pValue: "0.450",
    significant: false,
    color: "#F59E0B",
    summary: "Substantial year-to-year peak shift: concentrated in July in 2022 and 2024, but dispersed in 2023 due to localized rapid response interventions in eastern forest districts.",
  },
  {
    id: "foodPoisoning",
    name: "Food Poisoning",
    w: "0.180",
    pValue: "0.650",
    significant: false,
    color: "#EF4444",
    summary: "Low annual concordance. Timing is dictated by isolated mass social banquets and marriage seasons rather than strict climatic or seasonal calendar rules.",
  },
  {
    id: "chikungunya",
    name: "Chikungunya",
    w: "0.155",
    pValue: "0.720",
    significant: false,
    color: "#A78BFA",
    summary: "Lowest concordance in cohort. Exhibits multi-year cyclical surges with irregular peak months across the four baseline years.",
  },
];

export default function StabilityPage() {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>("add");
  const [showFormulaDrawer, setShowFormulaDrawer] = useState(false);

  const activeProfile = STABILITY_PROFILES.find(p => p.id === selectedDiseaseId) || STABILITY_PROFILES[0];

  return (
    <div className="w-full bg-[#06080F] text-[#F8FAFC] min-h-screen">
      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-[#F8FAFC]/15 bg-gradient-to-b from-[#030407] to-[#06080F] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <span>EXHIBIT 06 · STATISTICAL REPEATABILITY</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-[1.12]">
            Does the Pattern Repeat?
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed pt-1">
            Testing whether annual seasonal peaks occur at the same calendar time across four consecutive years.
          </p>
        </div>
      </section>

      {/* 2. DOMINANT INTERACTIVE ALIGNMENT EXHIBIT (80% VIEWPORT) */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        {/* Top Disease Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F8FAFC]/12 pb-3">
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
            Select Disease Concordance Evaluation:
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {STABILITY_PROFILES.map((p) => {
              const isSelected = selectedDiseaseId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedDiseaseId(p.id)}
                  className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm transition-all border flex items-center gap-1.5"
                  style={{
                    borderColor: isSelected ? p.color : "rgba(212, 175, 55, 0.18)",
                    backgroundColor: isSelected ? `${p.color}25` : "#06080F",
                    color: isSelected ? p.color : "rgba(248, 250, 252, 0.7)",
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                  <span>{p.name}</span>
                  <span className="text-[10px] opacity-75">
                    (W={p.w}{p.significant ? " ★" : ""})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Kendall Alignment Component in Observatory Frame */}
        <div className="bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F8FAFC]/10 pb-4">
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5" style={{ color: activeProfile.color }}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Inter-Annual Rank Stability · 2022 vs 2023 vs 2024 vs 2025</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#F8FAFC]">
                {activeProfile.name}
              </h3>
            </div>

            {/* Prominent Statistical Result Badge */}
            <div className="flex items-center gap-3 bg-[#06080F] px-4 py-2 border rounded-sm font-mono text-xs" style={{ borderColor: activeProfile.color }}>
              <div>
                <span className="text-[#94A3B8] text-[10px] uppercase">Kendall&apos;s W: </span>
                <strong className="text-sm font-bold text-[#F8FAFC]">{activeProfile.w}</strong>
              </div>
              <span className="text-[#F8FAFC]/30">|</span>
              <div>
                <span className="text-[#94A3B8] text-[10px] uppercase">p-value: </span>
                <strong className={`text-sm font-bold ${activeProfile.significant ? "text-[#10B981]" : "text-[#94A3B8]"}`}>
                  {activeProfile.pValue}
                </strong>
              </div>
              {activeProfile.significant && (
                <span className="px-2 py-0.5 bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-[10px] font-bold rounded-xs">
                  p &lt; 0.05
                </span>
              )}
            </div>
          </div>

          {/* Interactive Native Alignment Chart */}
          <NativeKendallAlignment activeCohort={selectedDiseaseId} />

          {/* Direct Attached Takeaway */}
          <div className="p-4 bg-[#06080F] border border-[#00F0FF]/30 rounded-sm flex items-start gap-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F8FAFC]">Epidemiological Interpretation:</strong> {activeProfile.summary}
            </div>
          </div>

          {/* Scientific Integrity Note */}
          <div className="p-3 bg-[#06080F]/60 border border-[#F8FAFC]/10 rounded-sm text-[11px] font-mono text-[#94A3B8]/80 flex items-center justify-between">
            <span>
              ★ Methodological Integrity: Statistical significance tests repeatability of timing across years, not pathogen causation.
            </span>
            <span className="text-[#00F0FF]">Non-Parametric Test</span>
          </div>
        </div>

        {/* 3. OPTIONAL EXPANDABLE STATISTICAL METHODOLOGY DRAWER */}
        <div className="pt-6 border-t border-[#F8FAFC]/15">
          <button
            onClick={() => setShowFormulaDrawer(!showFormulaDrawer)}
            className="w-full p-4 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/15 rounded-sm transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#00F0FF] font-bold"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{showFormulaDrawer ? "Hide Kendall's W Formula & Rank Calculations" : "Explore Kendall's Concordance Formula, Rank Matrix & Hypothesis Testing"}</span>
            </div>
            {showFormulaDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showFormulaDrawer && (
            <div className="pt-6 space-y-6 animate-fadeIn font-mono text-xs text-[#94A3B8]">
              <div className="p-5 bg-[#0B111E] border border-[#F8FAFC]/10 rounded-sm space-y-3">
                <div className="text-[#00F0FF] font-bold uppercase text-[10px]">
                  Mathematical Formulation
                </div>
                <div className="p-3 bg-[#06080F] rounded-sm border border-[#F8FAFC]/10 text-center text-sm font-mono text-[#F8FAFC]">
                  W = 12 × S / [m² × (n³ - n)]
                </div>
                <p className="text-[11px] leading-relaxed">
                  Where <strong className="text-[#F8FAFC]">m = 4</strong> judges (the years 2022, 2023, 2024, 2025), <strong className="text-[#F8FAFC]">n = 12</strong> items ranked (calendar months), and <strong className="text-[#F8FAFC]">S</strong> is the sum of squared deviations of month rank totals from their mean.
                </p>
                <p className="text-[11px] leading-relaxed">
                  When n &gt; 7, m(n - 1)W is approximately distributed as Chi-square with (n - 1) = 11 degrees of freedom. For Acute Diarrhoeal Disease, Chi-square = 23.32, yielding <strong className="text-[#10B981]">p = 0.016</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CHAPTER NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={6} />
    </div>
  );
}
