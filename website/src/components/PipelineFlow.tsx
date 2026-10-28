"use client";

import React, { useState, useEffect } from "react";
import { FileCode, Database, SpellCheck, Tag, GitBranch, Sparkles, ChevronRight, CheckCircle2, RefreshCw, ArrowRight } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export default function PipelineFlow() {
  const [activeStep, setActiveStep] = useState(6); // default to 5 Primary Families
  const [animKey, setAnimKey] = useState(0);
  const { ref, hasAnimated } = useInViewAnimation<HTMLDivElement>({ threshold: 0.15 });

  // Automatic sequential illumination when entering viewport
  useEffect(() => {
    if (!hasAnimated) return;
    let step = 1;
    setActiveStep(1);
    const interval = setInterval(() => {
      step += 1;
      if (step <= 6) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [hasAnimated]);

  const stages = [
    {
      step: 1,
      num: "237",
      unit: "BULLETINS",
      title: "Weekly Surveillance PDF Bulletins",
      source: "NCDC / IDSP Official Archives",
      desc: "Downloaded and archived 237 weekly epidemiological outbreak bulletins across 2022 to 2026 W32.",
      icon: FileCode,
      details: [
        "2022: 52 published bulletins",
        "2023: 49 published bulletins (Weeks 15, 51, 52 missing from source archives)",
        "2024: 52 published bulletins (100% complete)",
        "2025: 52 published bulletins (100% complete)",
        "2026: 32 published bulletins (Weeks 01–32 partial-year check)"
      ],
      inputOutput: { input: "Raw PDF bulletins (unstructured)", output: "237 verified PDF documents" }
    },
    {
      step: 2,
      num: "809",
      unit: "RAW ROWS",
      title: "Extracted Tabular Rows (Maharashtra)",
      source: "Direct PDF Table Extraction",
      desc: "Isolated outbreak events located within Maharashtra's 36 administrative districts.",
      icon: Database,
      details: [
        "79 records in 2022 across 36 active outbreak weeks",
        "202 records in 2023 across 38 active outbreak weeks",
        "287 records in 2024 across 52 active outbreak weeks",
        "165 records in 2025 across 48 active outbreak weeks",
        "76 records in 2026 across 29 active outbreak weeks"
      ],
      inputOutput: { input: "237 PDF bulletins", output: "809 raw tabular rows" }
    },
    {
      step: 3,
      num: "116",
      unit: "RAW STRINGS",
      title: "Raw Disease Spelling Variants",
      source: "Preserved in 'disease_raw'",
      desc: "Cataloged all heterogeneous string variants present in source government tables without overwriting.",
      icon: SpellCheck,
      details: [
        "Dengue variants: 'Dengue?', 'Dengue fever', 'Dengue Shock', 'Dengue haemorrhagic'",
        "Food Poisoning: 'Food poisoning', 'Acute Food Poisoning', 'Bacterial Food poisoning'",
        "ADD: 'Acute Diarrhoeal Disease', 'ADD / Gastroenteritis', 'Diarrhea'",
        "Zero source records overwritten; raw label preserved for full reproducibility"
      ],
      inputOutput: { input: "809 extracted rows", output: "116 discrete string tokens" }
    },
    {
      step: 4,
      num: "56",
      unit: "CLEAN LABELS",
      title: "Normalized Diagnostic Labels",
      source: "Phase 5A Disease Audit",
      desc: "Mapped spelling anomalies to standard medical terminology using deterministic rules.",
      icon: Tag,
      details: [
        "Standardized naming across all 809 records",
        "Retained diagnostic uncertainty where source indicated 'Suspected'",
        "Eliminated typographical duplicates without collapsing distinct clinical entities",
        "100% traceable mapping dictionary documented in audit tables"
      ],
      inputOutput: { input: "116 string tokens", output: "56 clean medical labels" }
    },
    {
      step: 5,
      num: "30",
      unit: "SYNDROMES",
      title: "Syndromic Classification Groups",
      source: "Epidemiological Syndrome Grouping",
      desc: "Consolidated specific etiologies into operational public health disease families.",
      icon: GitBranch,
      details: [
        "Vector-borne syndromes (Dengue, Malaria, Chikungunya, Scrub Typhus, JE)",
        "Water-borne syndromes (ADD, Cholera, Enteric Fever, Viral Hepatitis)",
        "Food-borne point-source clusters (Food Poisoning)",
        "Respiratory and zoonotic clusters (Leptospirosis, Rabies, H1N1)"
      ],
      inputOutput: { input: "56 clean labels", output: "30 syndromic families" }
    },
    {
      step: 6,
      num: "5",
      unit: "PRIMARY COHORTS",
      title: "Primary Analytical Study Cohort",
      source: "539 Baseline Records (73.5%)",
      desc: "Selected the top 5 high-burden families representing 73.5% of all 2022–2025 baseline outbreak records (539 of 733 records).",
      icon: Sparkles,
      highlight: true,
      details: [
        "Dengue Fever: 204 records · 3,144 cases · 93 deaths · 31 districts",
        "Acute Diarrheal Disease: 153 records · 9,050 cases · 93 deaths · 33 districts",
        "Malaria: 70 records · 2,133 cases · 51 deaths · 15 districts",
        "Food Poisoning: 69 records · 5,927 cases · 29 deaths · 27 districts",
        "Chikungunya: 43 records · 701 cases · 0 deaths · 15 districts"
      ],
      inputOutput: { input: "30 syndromic families", output: "5 primary research cohorts (539 records)" }
    }
  ];

  const current = stages[activeStep - 1];

  return (
    <div ref={ref} className="w-full bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm p-4 sm:p-6 lg:p-8 space-y-6 shadow-2xl" role="region" aria-label="Forensic Data Harmonization Pipeline Flow">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F8FAFC]/10 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#5FB0A8] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5FB0A8] animate-pulse" />
            <span>Data Harmonization Cascade · Forensic Audit Architecture</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-1">
            From Weekly Government Bulletins to Structured Analysis
          </h3>
          <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-0.5 max-w-2xl leading-relaxed">
            Step-by-step additive transformation guaranteeing zero data loss, reproducible code provenance, and 100% source auditability.
          </p>
        </div>

        <button
          onClick={() => setAnimKey(k => k + 1)}
          className="px-3 py-1.5 bg-[#06080F] hover:bg-[#1A2234] border border-[#F8FAFC]/15 text-[#D4AF37] hover:text-[#F5D061] rounded-sm font-mono text-xs flex items-center gap-1.5 transition-colors"
          title="Reconstruct pipeline connectors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Replay Sequence</span>
        </button>
      </div>

      {/* ── MOBILE VERSION (block md:hidden): Vertical Harmonization Stepper ── */}
      <div className="block md:hidden space-y-4">
        <div className="relative pl-6 border-l-2 border-[#D7B56D]/30 ml-2 space-y-6">
          {stages.map((st) => {
            const isSelected = activeStep === st.step;
            return (
              <div key={st.step} className="relative">
                {/* Node Pip on Line */}
                <div
                  className={`absolute -left-[31px] top-3 w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold border transition-all ${
                    isSelected
                      ? "bg-[#D7B56D] text-[#070A10] border-[#D7B56D] ring-4 ring-[#D7B56D]/20"
                      : "bg-[#070A10] text-[#A8B6BA] border-white/20"
                  }`}
                >
                  {st.step}
                </div>

                {/* Card Header & Preview */}
                <div
                  onClick={() => setActiveStep(isSelected ? 0 : st.step)}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#1E293B] border-[#5FB0A8] shadow-xl"
                      : "bg-[#06080F] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-mono text-[#D7B56D] uppercase font-bold tracking-wider">
                        STAGE 0{st.step} · {st.unit}
                      </div>
                      <div className="font-serif text-2xl font-bold text-[#F5F1E8] mt-0.5">
                        {st.num} <span className="text-xs font-mono font-normal text-[#87999E]">{st.unit}</span>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-[#A8B6BA] mt-1">
                        {st.title}
                      </h4>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {st.highlight && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-xs bg-[#D7B56D] text-[#070A10] font-bold">
                          CORE
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-[#5FB0A8]">
                        {isSelected ? "Collapse ▲" : "Inspect ▼"}
                      </span>
                    </div>
                  </div>

                  {/* In-Place Collapsible Mobile Dossier Details */}
                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-white/10 space-y-3 animate-fade-in">
                      <p className="text-xs text-[#F5F1E8] leading-relaxed">
                        {st.desc}
                      </p>

                      {/* Source */}
                      <div className="text-[11px] font-mono text-[#D7B56D]">
                        Source: {st.source}
                      </div>

                      {/* Input -> Output */}
                      <div className="p-2.5 bg-[#070A10] border border-white/10 rounded-xs font-mono text-[11px] space-y-1">
                        <div className="text-[#87999E]"><strong className="text-white/60">Input:</strong> {st.inputOutput.input}</div>
                        <div className="text-[#5FB0A8]"><strong className="text-[#5FB0A8]/70">Output:</strong> {st.inputOutput.output}</div>
                      </div>

                      {/* Checklist */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[10px] font-mono uppercase text-[#87999E] font-bold">
                          Audit Verification:
                        </div>
                        {st.details.map((dt, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#A8B6BA]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                            <span>{dt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── DESKTOP VERSION (hidden md:block): 6-Column Grid + Deep-Dive Panel ── */}
      <div className="hidden md:block space-y-6">
        {/* Progressive Connector Steps Flow */}
        <div key={animKey} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stages.map((st) => {
            const isSelected = activeStep === st.step;
            return (
              <div
                key={st.step}
                onClick={() => setActiveStep(st.step)}
                className={`p-3.5 rounded-sm border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#1E293B] border-[#5FB0A8] shadow-2xl ring-1 ring-[#5FB0A8]/40"
                    : "bg-[#06080F] border-[#F8FAFC]/10 hover:border-[#F8FAFC]/30"
                }`}
              >
                {st.highlight && (
                  <span className="absolute -top-2 right-2 text-[9px] font-mono uppercase px-2 py-0.5 rounded-sm bg-[#D4AF37] text-[#06080F] font-bold shadow-md">
                    CORE
                  </span>
                )}
                <div>
                  <div className="text-[10px] font-mono text-[#94A3B8] uppercase font-semibold">
                    STAGE 0{st.step}
                  </div>
                  <div className={`font-serif text-3xl font-bold mt-1 ${isSelected ? "text-[#5FB0A8]" : "text-[#F8FAFC]"}`}>
                    {st.num}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] mt-0.5">
                    {st.unit}
                  </div>
                </div>

                {/* Progress Indicator Pip */}
                <div className="mt-3 pt-2 border-t border-[#F8FAFC]/10 flex items-center justify-between text-[10px] font-mono">
                  <span className={isSelected ? "text-[#5FB0A8] font-bold" : "text-[#94A3B8]/60"}>
                    {isSelected ? "Active View" : "Click to Inspect"}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? "text-[#5FB0A8]" : "text-[#94A3B8]/40"}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Stage Deep-Dive Card */}
        {current && (
          <div className="bg-[#06080F] border border-[#F8FAFC]/15 rounded-sm p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#F8FAFC]/10 pb-4">
              <div>
                <div className="text-xs font-mono text-[#5FB0A8] uppercase tracking-wider font-bold">
                  STAGE {current.step} OF 6 · {current.unit}
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#F8FAFC] mt-0.5">
                  {current.title}
                </h4>
              </div>
              <span className="text-xs font-mono px-3 py-1.5 rounded-sm bg-[#0B111E] text-[#D4AF37] border border-[#D4AF37]/30">
                Source: {current.source}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#F8FAFC] leading-relaxed">
              {current.desc}
            </p>

            {/* Input / Output Transformation Badge */}
            <div className="p-3 bg-[#0B111E] border border-[#F8FAFC]/10 rounded-sm flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#94A3B8] uppercase text-[9px]">Input:</span>
                <span className="text-[#F8FAFC] font-semibold">{current.inputOutput.input}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#5FB0A8]" />
              <div className="flex items-center gap-2">
                <span className="text-[#94A3B8] uppercase text-[9px]">Output:</span>
                <span className="text-[#5FB0A8] font-bold">{current.inputOutput.output}</span>
              </div>
            </div>

            {/* Detailed Breakdown Points */}
            <div className="bg-[#0B111E] p-4 rounded-sm border border-[#F8FAFC]/10 space-y-2.5">
              <div className="text-xs font-mono uppercase text-[#D4AF37] font-bold tracking-wider mb-2">
                Verification &amp; Audit Specifications:
              </div>
              {current.details.map((dt, i) => (
                <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#F8FAFC]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  <span>{dt}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
