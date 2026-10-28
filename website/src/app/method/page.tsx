"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, ShieldCheck, Layers, FileText, 
  CheckCircle2, Database, Compass, ChevronRight
} from "lucide-react";
import ChapterFooter from "@/components/ChapterFooter";
import ConnectedEvidenceHeader from "@/components/ConnectedEvidenceHeader";

interface StageDetail {
  num: string;
  title: string;
  shortDesc: string;
  inputs: string;
  transform: string;
  outputs: string;
  artifact: string;
}

const PIPELINE_STAGES: StageDetail[] = [
  {
    num: "01",
    title: "Source Archival Gathering",
    shortDesc: "Cataloging 237 weekly epidemiological surveillance bulletins published by NCDC and IDSP.",
    inputs: "Weekly government PDF bulletins (2022–2025 and 2026 W01–W32)",
    transform: "Multi-year bulletin archival harvest, identifying 34 official NIL outbreak weeks and 3 missing 2023 bulletins.",
    outputs: "Audited manifest of 237 surveillance weeks across Maharashtra",
    artifact: "archive_manifest.csv",
  },
  {
    num: "02",
    title: "Data Extraction & Filtering",
    shortDesc: "Extracting tabular records for events within Maharashtra's 36 administrative districts.",
    inputs: "National weekly outbreak notification tables (Form B)",
    transform: "Spatial filter isolating Maharashtra records; preserving week, year, district, raw illness name, cases, and deaths.",
    outputs: "809 extracted outbreak records (539 baseline primary, 194 secondary, 76 partial 2026)",
    artifact: "phase2_extracted_records.csv",
  },
  {
    num: "03",
    title: "Validation & Denominator Audit",
    shortDesc: "Cross-referencing extracted case counts and dates against original PDF pages.",
    inputs: "Extracted CSV rows and source PDF scan pages",
    transform: "100% manual and automated audit verification verifying zero transcription errors.",
    outputs: "Verified primary record repository with permanent audit pointers",
    artifact: "phase3_audit_verified.json",
  },
  {
    num: "04",
    title: "Taxonomic Normalisation",
    shortDesc: "Resolving 116 raw OCR and handwritten disease strings into canonical categories.",
    inputs: "Raw unstandardised illness names (e.g. 'Dengue with Thrombocytopenia', 'ADD')",
    transform: "Deterministic keyword and syndrome reduction dictionary mapping variations into standard ICD cohorts.",
    outputs: "56 canonical labels and 30 syndromic families",
    artifact: "taxonomy_crosswalk.json",
  },
  {
    num: "05",
    title: "Primary Cohort Selection",
    shortDesc: "Selecting the 5 primary disease groups representing 73.5% of investigated outbreaks.",
    inputs: "Full 733 baseline outbreak records (2022–2025)",
    transform: "Cohort filtering isolating Dengue, ADD, Malaria, Food Poisoning, and Chikungunya.",
    outputs: "539 records, 20,955 reported cases, 266 deaths",
    artifact: "researchData.ts · PRIMARY_DISEASES",
  },
  {
    num: "06",
    title: "Monthly Aggregation",
    shortDesc: "Mapping weekly surveillance timestamps into 12 standard calendar months.",
    inputs: "Epidemiological week timestamps and outbreak start dates",
    transform: "Calendar mapping aligning weeks to months without splitting multi-week cluster boundaries.",
    outputs: "12-month aggregated frequency matrices for events and cases",
    artifact: "monthly_matrix_aggregated.csv",
  },
  {
    num: "07",
    title: "Seasonal Concentration (CR3)",
    shortDesc: "Computing continuous transmission windows and top-three-month concentration shares.",
    inputs: "12-month aggregated monthly distributions",
    transform: "Mathematical calculation of CR3 ratios and multi-month contiguous peak intervals.",
    outputs: "CR3 metrics: Dengue 50.5%, Malaria 51.4%, ADD 43.1%, Food Poisoning 44.9%",
    artifact: "cr3_concentration_table.csv",
  },
  {
    num: "08",
    title: "Stability Testing (Kendall's W)",
    shortDesc: "Testing whether annual monthly rankings repeated consistently across 4 years.",
    inputs: "12 months × 4 baseline years rank matrix",
    transform: "Non-parametric Kendall's Coefficient of Concordance (W) with Chi-square significance at α = 0.05.",
    outputs: "ADD: W = 0.530 (p = 0.016, significant); Vector diseases: W = 0.155–0.405",
    artifact: "kendall_w_significance_results.csv",
  },
  {
    num: "09",
    title: "Spatial Footprint Analysis",
    shortDesc: "Evaluating geographic reporting presence across Maharashtra's 36 districts.",
    inputs: "District-level outbreak occurrence logs",
    transform: "Spatial aggregation and clustering detection for localized vs statewide patterns.",
    outputs: "Malaria 61.4% concentrated in Gadchiroli & Chandrapur; ADD in 33 districts; Dengue in 31",
    artifact: "spatial_footprint_matrix.csv",
  },
  {
    num: "10",
    title: "Outlier Sensitivity Testing",
    shortDesc: "Testing how point-source banquet events alter monthly food poisoning curves.",
    inputs: "Food poisoning outbreak event series",
    transform: "Sensitivity analysis isolating 3 massive banquet clusters totaling 1,615 cases in February.",
    outputs: "February baseline drops from 2,162 to 547 cases; background peak shifts to April–May",
    artifact: "outlier_sensitivity_audit.csv",
  },
  {
    num: "11",
    title: "Out-of-Sample 2026 Comparison",
    shortDesc: "Comparing Weeks 1–32 of 2026 with strictly matched historical periods.",
    inputs: "2026 partial monitoring dataset (Weeks 01–32)",
    transform: "Period-matched comparison against 2022–2025 Weeks 01–32 historical baselines.",
    outputs: "2026: 45 records vs 48.3 historical avg (-6.8% variance); vector peak unobserved",
    artifact: "comparison_2026_matched.csv",
  },
  {
    num: "12",
    title: "Primary Fieldwork Triangulation",
    shortDesc: "Triangulating statewide statistical findings with qualitative facility observations.",
    inputs: "Field visit to Urban Health Post, Nallasopara West, Palghar District (02 Oct 2026)",
    transform: "Key informant interview analysis and peri-domestic water storage observational audit.",
    outputs: "Identified domestic plastic drum storage as the vector amplifier delaying dengue peak to October",
    artifact: "01_visit_record_report_derived.md",
  },
];

export default function MethodPage() {
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);

  const activeStage = PIPELINE_STAGES[selectedStageIdx];

  return (
    <div className="w-full bg-[#06080F] text-[#F8FAFC] min-h-screen">
      <ConnectedEvidenceHeader currentActNumber={2} />

      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-[#F8FAFC]/15 bg-gradient-to-b from-[#030407] to-[#06080F] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5FB0A8] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#5FB0A8]" />
            <span>EXHIBIT 11 · DATA PIPELINE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-[1.12]">
            12-Stage Research Methodology
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed pt-1">
            An auditable, reproducible data pipeline transforming raw government surveillance PDFs into verified findings.
          </p>
        </div>
      </section>

      {/* 2. THE INTERACTIVE PIPELINE STEPPER (80% VIEWPORT) */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 12 Stages Vertical Stepper (5 cols) */}
          <div className="lg:col-span-5 space-y-2 max-h-[620px] overflow-y-auto pr-2 custom-scrollbar">
            {PIPELINE_STAGES.map((stg, idx) => {
              const isSelected = selectedStageIdx === idx;
              return (
                <button
                  key={stg.num}
                  onClick={() => setSelectedStageIdx(idx)}
                  className={`w-full p-3 rounded-sm border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-[#0B111E] border-[#5FB0A8] shadow-md"
                      : "bg-[#06080F] border-[#F8FAFC]/10 hover:border-[#F8FAFC]/25"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded-xs ${
                      isSelected ? "bg-[#5FB0A8] text-[#06080F]" : "bg-[#0B111E] text-[#94A3B8]"
                    }`}>
                      {stg.num}
                    </span>
                    <span className={`font-serif text-sm font-bold ${
                      isSelected ? "text-[#F8FAFC]" : "text-[#94A3B8]"
                    }`}>
                      {stg.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    isSelected ? "text-[#5FB0A8] translate-x-0.5" : "text-[#94A3B8]/40"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Stage Inspector Card (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#F8FAFC]/10 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#5FB0A8] font-bold tracking-widest">
                  PIPELINE STAGE {activeStage.num} OF 12
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#F8FAFC]">
                  {activeStage.title}
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-[#06080F] border border-[#10B981]/40 text-[#10B981] rounded-sm">
                Deterministic
              </span>
            </div>

            <p className="text-sm font-mono text-[#F8FAFC]/90 leading-relaxed">
              {activeStage.shortDesc}
            </p>

            {/* Inputs -> Transform -> Output Flow */}
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm space-y-1">
                <span className="text-[10px] text-[#38BDF8] uppercase font-bold">Inputs & Data Sources:</span>
                <p className="text-[#94A3B8]">{activeStage.inputs}</p>
              </div>

              <div className="p-3.5 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm space-y-1">
                <span className="text-[10px] text-[#5FB0A8] uppercase font-bold">Transformation Procedure:</span>
                <p className="text-[#94A3B8]">{activeStage.transform}</p>
              </div>

              <div className="p-3.5 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm space-y-1">
                <span className="text-[10px] text-[#10B981] uppercase font-bold">Generated Outputs:</span>
                <p className="text-[#94A3B8]">{activeStage.outputs}</p>
              </div>
            </div>

            {/* Verification Artifact Pointer */}
            <div className="pt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between font-mono text-xs">
              <span className="text-[#94A3B8]">Verification Artifact:</span>
              <span className="text-[#5FB0A8] font-semibold">{activeStage.artifact}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CHAPTER NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={2} />
    </div>
  );
}
