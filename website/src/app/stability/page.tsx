"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, CheckCircle2, 
  ChevronDown, ChevronUp, ShieldCheck
} from "lucide-react";
import NativeKendallAlignment from "@/components/NativeKendallAlignment";
import ChapterFooter from "@/components/ChapterFooter";
import ConnectedEvidenceHeader from "@/components/ConnectedEvidenceHeader";
import { PRIMARY_DISEASES } from "@/data/researchData";

interface StabilityProfile {
  id: string;
  name: string;
  shortName: string;
  w: string;
  pValue: string;
  significant: boolean;
  color: string;
  summary: string;
}

const STABILITY_PROFILES: StabilityProfile[] = [
  {
    id: "add",
    name: PRIMARY_DISEASES.add.name,
    shortName: PRIMARY_DISEASES.add.shortName,
    w: PRIMARY_DISEASES.add.kendallW.toFixed(3),
    pValue: PRIMARY_DISEASES.add.kendallP.toFixed(3),
    significant: PRIMARY_DISEASES.add.isSignificant,
    color: PRIMARY_DISEASES.add.color,
    summary: "Statistically significant repeatable seasonal timing (p = 0.016 < 0.05). July monsoon water contamination surges arrived with remarkable annual regularity across all four baseline years.",
  },
  {
    id: "dengue",
    name: PRIMARY_DISEASES.dengue.name,
    shortName: PRIMARY_DISEASES.dengue.shortName,
    w: PRIMARY_DISEASES.dengue.kendallW.toFixed(3),
    pValue: PRIMARY_DISEASES.dengue.kendallP.toFixed(3),
    significant: PRIMARY_DISEASES.dengue.isSignificant,
    color: PRIMARY_DISEASES.dengue.color,
    summary: "Moderate concordant concentration (W = 0.405, p = 0.086), but the annual peak month oscillates between September and October depending on monsoon retreat timing and post-monsoon storage behaviors.",
  },
  {
    id: "foodPoisoning",
    name: PRIMARY_DISEASES.foodPoisoning.name,
    shortName: PRIMARY_DISEASES.foodPoisoning.shortName,
    w: PRIMARY_DISEASES.foodPoisoning.kendallW.toFixed(3),
    pValue: PRIMARY_DISEASES.foodPoisoning.kendallP.toFixed(3),
    significant: PRIMARY_DISEASES.foodPoisoning.isSignificant,
    color: PRIMARY_DISEASES.foodPoisoning.color,
    summary: "Non-monsoonal bimodal surges (W = 0.386, p = 0.108). Event timing aligns with dry-season social gatherings and summer banquet seasons, but monthly rank variation across years prevents strict 12-month concordance.",
  },
  {
    id: "malaria",
    name: PRIMARY_DISEASES.malaria.name,
    shortName: PRIMARY_DISEASES.malaria.shortName,
    w: PRIMARY_DISEASES.malaria.kendallW.toFixed(3),
    pValue: PRIMARY_DISEASES.malaria.kendallP.toFixed(3),
    significant: PRIMARY_DISEASES.malaria.isSignificant,
    color: PRIMARY_DISEASES.malaria.color,
    summary: "Moderate early-season surge (W = 0.319, p = 0.229). 61.4% of all events are localized in Gadchiroli and Chandrapur; localized reporting dynamics produce year-to-year rank divergence across remaining districts.",
  },
  {
    id: "chikungunya",
    name: PRIMARY_DISEASES.chikungunya.name,
    shortName: PRIMARY_DISEASES.chikungunya.shortName,
    w: PRIMARY_DISEASES.chikungunya.kendallW.toFixed(3),
    pValue: PRIMARY_DISEASES.chikungunya.kendallP.toFixed(3),
    significant: PRIMARY_DISEASES.chikungunya.isSignificant,
    color: PRIMARY_DISEASES.chikungunya.color,
    summary: "Near-zero rank agreement (W = 0.150, p = 0.832). Outbreak events are sparse (43 total records) and occur across disparate months without a recurring calendar peak in this 4-year baseline.",
  },
];

export default function StabilityPage() {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>("add");
  const [showFormulaDrawer, setShowFormulaDrawer] = useState(false);

  const activeProfile = STABILITY_PROFILES.find(p => p.id === selectedDiseaseId) || STABILITY_PROFILES[0];

  return (
    <div className="w-full bg-[#070A0F] text-[#F0DECE] min-h-screen">
      <ConnectedEvidenceHeader currentActNumber={6} />

      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-[#F0DECE]/15 bg-gradient-to-b from-[#070A0F] to-[#0B0F15] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#BAC0B8] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#8B1414] ring-1 ring-[#F0DECE]/40 animate-pulse" />
            <span>ACT 06 · STATISTICAL REPEATABILITY & KENDALL'S W</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F0DECE] leading-[1.12]">
            Does the Pattern Repeat?
          </h1>

          <p className="text-base sm:text-lg text-[#BAC0B8] max-w-3xl leading-relaxed pt-1">
            Testing whether annual seasonal peaks occur at the same calendar time across four consecutive years using non-parametric Kendall&apos;s W rank concordance.
          </p>
        </div>
      </section>

      {/* 2. DOMINANT INTERACTIVE ALIGNMENT EXHIBIT */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        {/* Top Disease Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
          <span className="text-xs font-mono text-[#BAC0B8] uppercase tracking-wider font-semibold">
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
                    borderColor: isSelected ? p.color : "rgba(255, 255, 255, 0.10)",
                    backgroundColor: isSelected ? `${p.color}20` : "#0A1016",
                    color: isSelected ? p.color : "rgba(245, 241, 232, 0.75)",
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

        {/* Central Kendall Alignment Component */}
        <div className="bg-[#0A1016] border border-white/[0.08] rounded-sm p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5" style={{ color: activeProfile.color }}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Inter-Annual Rank Stability · 2022 vs 2023 vs 2024 vs 2025</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#F5F1E8]">
                {activeProfile.name}
              </h3>
            </div>

            {/* Prominent Statistical Result Badge */}
            <div className="flex items-center gap-3 bg-[#070A10] px-4 py-2 border rounded-sm font-mono text-xs" style={{ borderColor: `${activeProfile.color}60` }}>
              <div>
                <span className="text-[#A8B6BA] text-[10px] uppercase">Kendall&apos;s W: </span>
                <strong className="text-sm font-bold text-[#F5F1E8]">{activeProfile.w}</strong>
              </div>
              <span className="text-white/20">|</span>
              <div>
                <span className="text-[#A8B6BA] text-[10px] uppercase">p-value: </span>
                <strong className={`text-sm font-bold ${activeProfile.significant ? "text-[#10B981]" : "text-[#A8B6BA]"}`}>
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

          {/* Interactive Native Alignment Chart (controlled) */}
          <NativeKendallAlignment 
            activeCohort={selectedDiseaseId} 
            onSelectCohort={setSelectedDiseaseId}
          />

          {/* Direct Attached Takeaway */}
          <div className="p-4 bg-[#070A10] border border-[#5FB0A8]/30 rounded-sm flex items-start gap-3 text-xs sm:text-sm text-[#A8B6BA] leading-relaxed">
            <CheckCircle2 className="w-5 h-5 text-[#5FB0A8] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F5F1E8]">Epidemiological Interpretation:</strong> {activeProfile.summary}
            </div>
          </div>

          {/* Scientific Integrity Note */}
          <div className="p-3 bg-[#070A10]/70 border border-white/[0.06] rounded-sm text-[11px] font-mono text-[#A8B6BA]/80 flex items-center justify-between">
            <span>
              ★ Methodological Integrity: Statistical significance tests repeatability of relative timing across years, not pathogen causation.
            </span>
            <span className="text-[#5FB0A8]">Non-Parametric Test</span>
          </div>
        </div>

        {/* 3. EXPANDABLE STATISTICAL METHODOLOGY DRAWER */}
        <div className="pt-6 border-t border-white/[0.08]">
          <button
            onClick={() => setShowFormulaDrawer(!showFormulaDrawer)}
            className="w-full p-4 bg-[#0A1016] hover:bg-[#121922] border border-white/[0.08] rounded-sm transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#5FB0A8] font-bold"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{showFormulaDrawer ? "Hide Kendall's W Formula & Rank Calculations" : "Explore Kendall's Concordance Formula, Rank Matrix & Hypothesis Testing"}</span>
            </div>
            {showFormulaDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showFormulaDrawer && (
            <div className="pt-6 space-y-6 animate-fadeIn font-mono text-xs text-[#A8B6BA]">
              <div className="p-5 bg-[#0A1016] border border-white/[0.06] rounded-sm space-y-3">
                <div className="text-[#5FB0A8] font-bold uppercase text-[10px]">
                  Mathematical Formulation
                </div>
                <div className="p-3 bg-[#070A10] rounded-sm border border-white/[0.08] text-center text-sm font-mono text-[#F5F1E8]">
                  W = 12 × S / [m² × (n³ - n)]
                </div>
                <p className="text-[11px] leading-relaxed">
                  Where <strong className="text-[#F5F1E8]">m = 4</strong> judges (the years 2022, 2023, 2024, 2025), <strong className="text-[#F5F1E8]">n = 12</strong> items ranked (calendar months), and <strong className="text-[#F5F1E8]">S</strong> is the sum of squared deviations of month rank totals from their mean.
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
