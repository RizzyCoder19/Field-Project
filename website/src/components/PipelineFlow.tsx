"use client";

import React, { useState } from "react";
import { FileCode, Database, SpellCheck, Tag, GitBranch, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";

export default function PipelineFlow() {
  const [activeStep, setActiveStep] = useState(5); // default to 5 Primary Families

  const stages = [
    {
      step: 1,
      num: "237",
      unit: "REPORTS",
      title: "Weekly Surveillance PDF Bulletins",
      source: "NCDC / IDSP Official Archives",
      desc: "Downloaded and archived 237 weekly epidemiological outbreak bulletins across 2022 to 2026 W32.",
      icon: FileCode,
      details: [
        "2022: 52 published bulletins",
        "2023: 49 published bulletins (Weeks 15, 51, 52 missing from source)",
        "2024: 52 published bulletins (100% complete)",
        "2025: 52 published bulletins (100% complete)",
        "2026: 32 published bulletins (Weeks 01–32 partial-year check)"
      ]
    },
    {
      step: 2,
      num: "809",
      unit: "RECORDS",
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
      ]
    },
    {
      step: 3,
      num: "116",
      unit: "STRINGS",
      title: "Raw Disease Spelling Variants",
      source: "Preserved in 'disease_raw'",
      desc: "Cataloged all heterogeneous string variants present in source government tables.",
      icon: SpellCheck,
      details: [
        "Examples: 'Dengue?', 'Dengue fever', 'Dengue Shock', 'Dengue haemorrhagic'",
        "Food Poisoning: 'Food poisoning', 'Acute Food Poisoning', 'Bacterial Food poisoning'",
        "ADD: 'Acute Diarrhoeal Disease', 'ADD / Gastroenteritis', 'Diarrhea'",
        "Zero source records overwritten; raw label preserved for full reproducibility"
      ]
    },
    {
      step: 4,
      num: "56",
      unit: "LABELS",
      title: "Clean Normalized Diagnostic Labels",
      source: "Phase 5A Disease Audit",
      desc: "Mapped spelling anomalies to standard medical terminology using deterministic rules.",
      icon: Tag,
      details: [
        "Standardized naming across all 809 records",
        "Retained diagnostic uncertainty where source indicated 'Suspected'",
        "Eliminated typographical duplicates without collapsing clinical entities",
        "100% traceable mapping dictionary documented in audit tables"
      ]
    },
    {
      step: 5,
      num: "30",
      unit: "FAMILIES",
      title: "Syndromic Classification Groups",
      source: "Epidemiological Syndrome Grouping",
      desc: "Consolidated specific etiologies into operational public health disease families.",
      icon: GitBranch,
      details: [
        "Vector-borne syndromes (Dengue, Malaria, Chikungunya, Scrub Typhus, JE)",
        "Water-borne syndromes (ADD, Cholera, Enteric Fever, Viral Hepatitis)",
        "Food-borne point-source clusters (Food Poisoning)",
        "Respiratory and zoonotic clusters (Leptospirosis, Rabies, H1N1)"
      ]
    },
    {
      step: 6,
      num: "5",
      unit: "PRIMARY FAMILIES",
      title: "Primary Analytical Study Cohort",
      source: "539 Baseline Records (93.9%)",
      desc: "Selected the top 5 high-burden families representing 93.9% of all 2022–2025 outbreak records.",
      icon: Sparkles,
      highlight: true,
      details: [
        "Dengue Fever: 204 records · 3,144 cases · 93 deaths · 31 districts",
        "Acute Diarrheal Disease: 153 records · 9,050 cases · 93 deaths · 33 districts",
        "Malaria: 70 records · 2,133 cases · 51 deaths · 15 districts",
        "Food Poisoning: 69 records · 5,927 cases · 29 deaths · 27 districts",
        "Chikungunya: 43 records · 701 cases · 0 deaths · 15 districts"
      ]
    }
  ];

  const current = stages[activeStep - 1];

  return (
    <div className="w-full bg-[#080D1F] border border-[#1E335E] rounded-xl shadow-2xl p-6 lg:p-8 space-y-6">
      <div className="border-b border-[#1E335E]/60 pb-4">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#D4AF37]">
          <GitBranch className="w-3.5 h-3.5" />
          <span>Data Harmonization Cascade · Forensic Audit Architecture</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#F8F5EC] mt-1">
          From Weekly Government Bulletins to Structured Analysis
        </h3>
        <p className="text-xs text-[#AEB9D1] mt-0.5">
          Step-by-step additive transformation guaranteeing zero data loss and 100% source auditability.
        </p>
      </div>

      {/* Horizontal Interactive Steps Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {stages.map((st) => {
          const isSelected = activeStep === st.step;
          return (
            <div
              key={st.step}
              onClick={() => setActiveStep(st.step)}
              className={`p-3 rounded-lg border transition-all cursor-pointer relative ${
                isSelected
                  ? "bg-[#16274D] border-[#D4AF37] shadow-xl"
                  : "bg-[#0D162E] border-[#1E335E]/60 hover:border-[#D4AF37]/40"
              }`}
            >
              {st.highlight && (
                <span className="absolute -top-2 right-2 text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#D4AF37] text-[#0A1128] font-bold">
                  Core
                </span>
              )}
              <div className="text-[10px] font-mono text-[#64748B]">STAGE 0{st.step}</div>
              <div className={`font-serif text-2xl font-bold mt-1 ${isSelected ? "text-[#D4AF37]" : "text-white"}`}>
                {st.num}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#AEB9D1]">
                {st.unit}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Stage Deep-Dive Card */}
      <div className="bg-[#0D162E] border border-[#1E335E] rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#1E335E]/60 pb-4">
          <div>
            <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
              STAGE {current.step} OF 6 · {current.unit}
            </div>
            <h4 className="font-serif text-xl font-bold text-white mt-0.5">
              {current.title}
            </h4>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-[#101C38] text-[#F3E5AB] border border-[#D4AF37]/30">
            Source: {current.source}
          </span>
        </div>

        <p className="text-xs text-[#AEB9D1] leading-relaxed my-4">
          {current.desc}
        </p>

        {/* Detailed Breakdown Points */}
        <div className="bg-[#0A1128] p-4 rounded-lg border border-[#1E335E]/40 space-y-2">
          <div className="text-[11px] font-mono uppercase text-[#D4AF37] font-semibold mb-2">
            Verification & Audit Details:
          </div>
          {current.details.map((dt, i) => (
            <div key={i} className="flex items-start space-x-2 text-xs text-[#F8F5EC]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 shrink-0" />
              <span>{dt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
