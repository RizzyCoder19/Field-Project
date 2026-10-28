"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Database, CheckCircle2, ChevronDown, ChevronUp, Search, ArrowUpDown, ArrowRight
} from "lucide-react";
import { SURVEILLANCE_COVERAGE, PRIMARY_DISEASES } from "@/data/researchData";
import NativeTaxonomyConvergence from "@/components/NativeTaxonomyConvergence";
import ChapterFooter from "@/components/ChapterFooter";
import ConnectedEvidenceHeader from "@/components/ConnectedEvidenceHeader";

interface SampleRecord {
  id: number;
  year: number;
  week: number;
  dateStart: string;
  state: string;
  district: string;
  rawDisease: string;
  canonicalDisease: string;
  cases: number;
  deaths: number;
  status: string;
  actionTaken: string;
  color: string;
}

const SAMPLE_RECORDS: SampleRecord[] = [
  {
    id: 312,
    year: 2023,
    week: 33,
    dateStart: "14-08-2023",
    state: "Maharashtra",
    district: "Gadchiroli",
    rawDisease: "Malaria (P. vivax & P. falciparum)",
    canonicalDisease: "Malaria",
    cases: 218,
    deaths: 0,
    status: "Under Control",
    actionTaken: "Rapid response team deployed to tribal forest villages; mass blood smear collection and ACT therapy initiated.",
    color: "#F59E0B",
  },
  {
    id: 184,
    year: 2024,
    week: 28,
    dateStart: "08-07-2024",
    state: "Maharashtra",
    district: "Palghar",
    rawDisease: "Acute Diarrheal Disease (Suspected Contamination)",
    canonicalDisease: "Acute Diarrhoeal Disease",
    cases: 42,
    deaths: 1,
    status: "Investigated & Contained",
    actionTaken: "Borewell water samples seized for bacteriological testing; municipal pipeline superchlorinated.",
    color: "#10B981",
  },
  {
    id: 405,
    year: 2024,
    week: 41,
    dateStart: "07-10-2024",
    state: "Maharashtra",
    district: "Beed",
    rawDisease: "Dengue Fever with Thrombocytopenia",
    canonicalDisease: "Dengue",
    cases: 95,
    deaths: 0,
    status: "Under Surveillance",
    actionTaken: "Peri-domestic larval breeding sites fogged; source reduction drive in Marathwada peri-urban municipal wards.",
    color: "#38BDF8",
  },
];

type ActiveTerm = "records" | "cases" | "deaths" | null;
type SortField = "records" | "cases" | "deaths" | "districts";

export default function DataPage() {
  const [selectedRecordIndex, setSelectedRecordIndex] = useState(0);
  const [activeTerm, setActiveTerm] = useState<ActiveTerm>(null);
  const [showTechnicalDrawer, setShowTechnicalDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("records");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const currentSample = SAMPLE_RECORDS[selectedRecordIndex];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const diseaseList = Object.values(PRIMARY_DISEASES)
    .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.category.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      return sortDirection === "desc" ? valB - valA : valA - valB;
    });

  return (
    <div className="w-full bg-[#06080F] text-[#F8FAFC] min-h-screen">
      <ConnectedEvidenceHeader currentActNumber={1} />

      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-[#F8FAFC]/15 bg-gradient-to-b from-[#030407] to-[#06080F] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5FB0A8] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#5FB0A8]" />
            <span>EXHIBIT 02 · FROM BULLETIN TO DATA</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-[1.12]">
            From Government Bulletin to Research Data
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed pt-1">
            How weekly outbreak notifications from district rapid response teams become verified, auditable epidemiological records.
          </p>
        </div>
      </section>

      {/* 2. THE PRINCIPAL VISUAL EXHIBIT: INTERACTIVE EXTRACTION TRANSFORMATION (70% VIEWPORT) */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        {/* Record Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F8FAFC]/12 pb-3">
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
            Select Authentic Government Bulletin Excerpt:
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {SAMPLE_RECORDS.map((rec, idx) => (
              <button
                key={rec.id}
                onClick={() => setSelectedRecordIndex(idx)}
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm transition-all border flex items-center gap-2 ${
                  selectedRecordIndex === idx
                    ? "bg-[#0B111E] border-[#5FB0A8] text-[#F8FAFC] font-bold shadow-md"
                    : "bg-[#06080F] border-[#F8FAFC]/15 text-[#94A3B8]/70 hover:text-[#F8FAFC]"
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: rec.color }} />
                <span>{rec.district} · {rec.canonicalDisease} ({rec.year} W{rec.week})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Visual Split-Screen Transformation Instrument */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: The Raw Government Bulletin Facsimile (6 cols) */}
          <div className="lg:col-span-6 p-5 bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-[#1E293B] border-b border-l border-[#F8FAFC]/15 text-[9px] font-mono uppercase text-[#5FB0A8] font-bold tracking-wider">
              OFFICIAL NCDC / IDSP FORM B
            </div>

            <div className="space-y-4">
              {/* Bulletin Header Stamp */}
              <div className="border-b border-[#F8FAFC]/15 pb-3 pt-1 space-y-1">
                <div className="text-[10px] font-mono text-[#94A3B8]/70 tracking-widest uppercase">
                  National Centre for Disease Control (DGHS) · New Delhi
                </div>
                <div className="font-serif text-lg font-bold text-[#F8FAFC]">
                  Weekly Outbreaks Reported Under IDSP
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#5FB0A8]">
                  <span>Year: {currentSample.year}</span>
                  <span>·</span>
                  <span>Week: {currentSample.week}</span>
                  <span>·</span>
                  <span>State: {currentSample.state}</span>
                </div>
              </div>

              {/* Raw Table Row in Bulletin */}
              <div className="space-y-2 text-xs font-mono">
                <div className="text-[10px] uppercase text-[#94A3B8]/60 tracking-wider">
                  Raw Bulletin Notification Row:
                </div>

                <div className="p-3.5 bg-[#06080F] border border-[#5FB0A8]/40 rounded-sm space-y-2 relative">
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-[#94A3B8]/70">District: </span>
                      <strong className="text-[#F8FAFC]">{currentSample.district}</strong>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]/70">Date of Start: </span>
                      <strong className="text-[#F8FAFC]">{currentSample.dateStart}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-[#94A3B8]/70 text-[11px]">Reported Illness / Syndrome: </span>
                    <div className="text-[#5FB0A8] font-semibold text-xs pt-0.5">
                      &ldquo;{currentSample.rawDisease}&rdquo;
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#F8FAFC]/10 text-[11px]">
                    <div>
                      <span className="text-[#94A3B8]/70">No. of Cases: </span>
                      <strong className="text-[#F8FAFC] text-sm">{currentSample.cases}</strong>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]/70">No. of Deaths: </span>
                      <strong className="text-[#EF4444] text-sm">{currentSample.deaths}</strong>
                    </div>
                  </div>

                  <div className="pt-1 text-[10px] text-[#94A3B8] border-t border-[#F8FAFC]/10">
                    <span className="text-[#94A3B8]/70">Status & Field Action: </span>
                    <span className="text-[#F8FAFC]/90">{currentSample.actionTaken}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-[#F8FAFC]/10 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                Primary Source Verified
              </span>
              <span>Govt. of India Surveillance Archive</span>
            </div>
          </div>

          {/* Right: The Structured Canonical Research Record (6 cols) */}
          <div className="lg:col-span-6 p-5 bg-[#0B111E] border border-[#5FB0A8]/30 rounded-sm flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-[#5FB0A8] text-[#06080F] text-[9px] font-mono uppercase font-bold tracking-wider">
              CANONICAL RESEARCH RECORD
            </div>

            <div className="space-y-4">
              {/* Record Header */}
              <div className="border-b border-[#F8FAFC]/15 pb-3 pt-1 space-y-1">
                <div className="text-[10px] font-mono text-[#5FB0A8] tracking-widest uppercase font-bold">
                  DETERMINISTIC REDUCTION SCHEMA
                </div>
                <div className="font-serif text-lg font-bold text-[#F8FAFC] flex items-center gap-2">
                  <span>Record ID #{currentSample.id}</span>
                  <span className="text-xs font-mono font-normal px-2 py-0.5 bg-[#06080F] border border-[#10B981]/50 text-[#10B981] rounded-xs">
                    Clean & Audited
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#94A3B8]">
                  Mapped into the 539-record baseline cohort (2022–2025)
                </div>
              </div>

              {/* Structured JSON / Schema Presentation */}
              <div className="p-3.5 bg-[#06080F] border border-[#F8FAFC]/15 rounded-sm font-mono text-xs space-y-1.5">
                <div className="text-[#94A3B8]/60 text-[10px] uppercase pb-1 border-b border-[#F8FAFC]/10 flex justify-between">
                  <span>Standardised Database Tuple</span>
                  <span className="text-[#5FB0A8]">SQL / CSV</span>
                </div>

                <div className="space-y-1 pt-1 text-[11px]">
                  <div>
                    <span className="text-[#94A3B8]/70">surveillance_year: </span>
                    <span className="text-[#5FB0A8] font-bold">{currentSample.year}</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8]/70">epidemiological_week: </span>
                    <span className="text-[#5FB0A8] font-bold">{currentSample.week}</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8]/70">district_standardised: </span>
                    <span className="text-[#F8FAFC] font-semibold">&quot;{currentSample.district}&quot;</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8]/70">canonical_cohort: </span>
                    <span className="font-bold px-1.5 py-0.2 rounded-xs" style={{ color: currentSample.color, backgroundColor: `${currentSample.color}20` }}>
                      &quot;{currentSample.canonicalDisease}&quot;
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#F8FAFC]/10">
                    <div>
                      <span className="text-[#94A3B8]/70">cases: </span>
                      <span className="text-[#F8FAFC] font-bold">{currentSample.cases}</span>
                    </div>
                    <div>
                      <span className="text-[#94A3B8]/70">deaths: </span>
                      <span className="text-[#EF4444] font-bold">{currentSample.deaths}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[#94A3B8]/70">case_fatality_ratio: </span>
                    <span className="text-[#94A3B8]">
                      {currentSample.cases > 0 ? ((currentSample.deaths / currentSample.cases) * 100).toFixed(2) : "0.00"}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-[#F8FAFC]/10 flex items-center justify-between text-[10px] font-mono text-[#5FB0A8]">
              <span>Deterministic Rule Applied</span>
              <span>116 Raw Variations $\to$ 5 Groups</span>
            </div>
          </div>
        </div>

        {/* 3 Interactive Definition Pills with Inline Disclosure */}
        <div className="pt-2 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
              Three Crucial Measures:
            </span>

            <button
              onClick={() => setActiveTerm(activeTerm === "records" ? null : "records")}
              className={`px-3 py-1 rounded-sm border font-mono text-xs transition-all ${
                activeTerm === "records"
                  ? "bg-[#5FB0A8]/20 border-[#5FB0A8] text-[#5FB0A8] font-bold"
                  : "bg-[#0B111E] border-[#F8FAFC]/15 text-[#F8FAFC] hover:border-[#5FB0A8]/50"
              }`}
            >
              01 · Outbreak Record (539)
            </button>

            <button
              onClick={() => setActiveTerm(activeTerm === "cases" ? null : "cases")}
              className={`px-3 py-1 rounded-sm border font-mono text-xs transition-all ${
                activeTerm === "cases"
                  ? "bg-[#10B981]/20 border-[#10B981] text-[#10B981] font-bold"
                  : "bg-[#0B111E] border-[#F8FAFC]/15 text-[#F8FAFC] hover:border-[#10B981]/50"
              }`}
            >
              02 · Reported Cases (20,955)
            </button>

            <button
              onClick={() => setActiveTerm(activeTerm === "deaths" ? null : "deaths")}
              className={`px-3 py-1 rounded-sm border font-mono text-xs transition-all ${
                activeTerm === "deaths"
                  ? "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444] font-bold"
                  : "bg-[#0B111E] border-[#F8FAFC]/15 text-[#F8FAFC] hover:border-[#EF4444]/50"
              }`}
            >
              03 · Reported Deaths (266)
            </button>
          </div>

          {/* Inline Concise Explanation Card */}
          {activeTerm && (
            <div className="p-4 bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm text-xs font-mono leading-relaxed text-[#94A3B8] transition-all">
              {activeTerm === "records" && (
                <div>
                  <strong className="text-[#5FB0A8]">Outbreak Record:</strong> An official notification filed when a cluster of illnesses exceeds baseline thresholds in a village or ward, triggering rapid response team deployment.
                </div>
              )}
              {activeTerm === "cases" && (
                <div>
                  <strong className="text-[#10B981]">Reported Case:</strong> The total number of individual patients enumerated by investigators during that specific investigated cluster event.
                </div>
              )}
              {activeTerm === "deaths" && (
                <div>
                  <strong className="text-[#EF4444]">Reported Death:</strong> Verified fatalities officially documented in the bulletin as caused by the outbreak (overall cohort CFR = 1.27%).
                </div>
              )}
            </div>
          )}

          {/* Concise Takeaway Callout */}
          <div className="p-4 bg-[#0B111E]/60 border border-[#5FB0A8]/30 rounded-sm flex items-start gap-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            <CheckCircle2 className="w-5 h-5 text-[#5FB0A8] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F8FAFC]">Core Public Health Principle:</strong> Outbreak bulletins document investigated cluster events, not census sickness. 
              A single record can represent 5 cases or 650 cases—which is why analyzing outbreak frequency alongside patient case volume is essential throughout this study.
            </div>
          </div>
        </div>

        {/* 3. OPTIONAL EXPANDABLE TECHNICAL DRAWER */}
        <div className="pt-6 border-t border-[#F8FAFC]/15">
          <button
            onClick={() => setShowTechnicalDrawer(!showTechnicalDrawer)}
            className="w-full p-4 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/15 rounded-sm transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#5FB0A8] font-bold"
          >
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>{showTechnicalDrawer ? "Hide Technical Evidence & Full Record Archive" : "Explore Technical Evidence, Taxonomic Pipeline & Record Table"}</span>
            </div>
            {showTechnicalDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showTechnicalDrawer && (
            <div className="pt-6 space-y-8 animate-fadeIn">
              {/* Taxonomic Pipeline */}
              <div className="p-6 bg-[#0B111E] border border-[#F8FAFC]/12 rounded-sm space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#5FB0A8] font-bold">Deterministic Pipeline</span>
                  <h3 className="font-serif text-xl font-bold text-[#F8FAFC]">Taxonomic Convergence</h3>
                  <p className="text-xs text-[#94A3B8]">How 116 raw OCR strings converge into five canonical research cohorts:</p>
                </div>
                <NativeTaxonomyConvergence />
              </div>

              {/* Surveillance Coverage Audit Grid */}
              <div className="p-6 bg-[#0B111E] border border-[#F8FAFC]/12 rounded-sm space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#5FB0A8] font-bold">Temporal Accounting</span>
                  <h3 className="font-serif text-xl font-bold text-[#F8FAFC]">Surveillance Coverage Across 237 Weeks</h3>
                  <p className="text-xs text-[#94A3B8]">Distinguishing active outbreak weeks from verified NIL weeks and unlocated bulletins:</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
                  {SURVEILLANCE_COVERAGE.map((cov) => {
                    const unlocatedWeeks = cov.totalWeeks - cov.publishedWeeks;
                    return (
                      <div key={cov.year} className="p-3 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm space-y-1">
                        <div className="text-[#5FB0A8] font-bold">{cov.year}</div>
                        <div className="text-[11px] text-[#F8FAFC]">{cov.outbreakWeeks} Outbreak Wks</div>
                        <div className="text-[10px] text-[#94A3B8]">{cov.nilWeeks} NIL Wks</div>
                        {unlocatedWeeks > 0 && (
                          <div className="text-[9px] text-[#EF4444]">{unlocatedWeeks} Unlocated (W15, 51, 52)</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Searchable Records Table */}
              <div className="p-6 bg-[#0B111E] border border-[#F8FAFC]/12 rounded-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#5FB0A8] font-bold">Canonical Dataset</span>
                    <h3 className="font-serif text-xl font-bold text-[#F8FAFC]">Primary Cohort Verification Table</h3>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter disease..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 pr-3 py-1 bg-[#06080F] border border-[#F8FAFC]/15 rounded-sm font-mono text-xs text-[#F8FAFC] focus:outline-none focus:border-[#5FB0A8]"
                    />
                  </div>
                </div>

                <div className="border border-[#F8FAFC]/12 rounded-sm overflow-x-auto bg-[#06080F]">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-[#F8FAFC]/12 bg-[#030407] text-[#94A3B8] uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">Disease Group</th>
                        <th className="py-3 px-4 text-right cursor-pointer" onClick={() => handleSort("records")}>
                          Records <ArrowUpDown className="w-3 h-3 inline ml-1" />
                        </th>
                        <th className="py-3 px-4 text-right cursor-pointer" onClick={() => handleSort("cases")}>
                          Cases <ArrowUpDown className="w-3 h-3 inline ml-1" />
                        </th>
                        <th className="py-3 px-4 text-right cursor-pointer" onClick={() => handleSort("deaths")}>
                          Deaths <ArrowUpDown className="w-3 h-3 inline ml-1" />
                        </th>
                        <th className="py-3 px-4 text-right cursor-pointer" onClick={() => handleSort("districts")}>
                          Districts <ArrowUpDown className="w-3 h-3 inline ml-1" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {diseaseList.map((d) => (
                        <tr key={d.id} className="border-b border-[#F8FAFC]/10 hover:bg-[#0B111E]">
                          <td className="py-3 px-4 font-bold text-[#F8FAFC] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                            <span>{d.name}</span>
                          </td>
                          <td className="py-3 px-4 text-right tabular-nums text-[#F8FAFC] font-bold">{d.records}</td>
                          <td className="py-3 px-4 text-right tabular-nums text-[#F8FAFC]">{d.cases.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right tabular-nums text-[#EF4444]">{d.deaths}</td>
                          <td className="py-3 px-4 text-right tabular-nums text-[#94A3B8]">{d.districts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CHAPTER NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={1} />
    </div>
  );
}
