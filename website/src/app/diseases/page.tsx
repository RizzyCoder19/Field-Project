"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  AlertCircle, CheckCircle2, HelpCircle, Layers, ArrowRight, 
  MapPin, Calendar, Activity, Users, ShieldAlert, Award, ChevronDown, ChevronUp, FileText
} from "lucide-react";
import { PRIMARY_DISEASES, RESEARCH_METRICS, MONTHS } from "@/data/researchData";
import ChapterFooter from "@/components/ChapterFooter";

type DiseaseTab = "all" | "dengue" | "add" | "malaria" | "foodPoisoning" | "chikungunya";

export default function DiseasesPage() {
  const [selectedTab, setSelectedTab] = useState<DiseaseTab>("all");
  const [showTechnicalDrawer, setShowTechnicalDrawer] = useState(false);

  const diseases = Object.values(PRIMARY_DISEASES);

  const activeDisease = selectedTab !== "all" ? PRIMARY_DISEASES[selectedTab] : null;

  // Max records and cases for relative scaling
  const maxRecords = Math.max(...diseases.map(d => d.records)); // 153 (Dengue)
  const maxCases = Math.max(...diseases.map(d => d.cases)); // 5660 (ADD)

  return (
    <div className="w-full bg-[#06080F] text-[#F8FAFC] min-h-screen">
      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-[#F8FAFC]/15 bg-gradient-to-b from-[#030407] to-[#06080F] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <span>EXHIBIT 03 · THE PRIMARY COHORT</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-[1.12]">
            The Five Primary Disease Groups
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed pt-1">
            Five distinct illness groups account for 73.5% of all investigated outbreaks in Maharashtra.
          </p>
        </div>
      </section>

      {/* 2. THE PRINCIPAL VISUAL EXHIBIT: INTERACTIVE 5-DISEASE COMPARISON INSTRUMENT (75% VIEWPORT) */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        {/* Top Disease Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F8FAFC]/12 pb-3">
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
            Select Disease Cohort:
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedTab("all")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm transition-all border ${
                selectedTab === "all"
                  ? "bg-[#00F0FF] border-[#00F0FF] text-[#06080F] font-bold shadow-md"
                  : "bg-[#06080F] border-[#F8FAFC]/15 text-[#94A3B8]/70 hover:text-[#F8FAFC]"
              }`}
            >
              All 5 Cohorts Overview
            </button>

            {diseases.map((d) => {
              const isSelected = selectedTab === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedTab(d.id as DiseaseTab)}
                  className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm transition-all border flex items-center gap-1.5"
                  style={{
                    borderColor: isSelected ? d.color : "rgba(212, 175, 55, 0.18)",
                    backgroundColor: isSelected ? `${d.color}25` : "#06080F",
                    color: isSelected ? d.color : "rgba(248, 250, 252, 0.7)",
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span>{d.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Coordinated Visual Display */}
        {selectedTab === "all" ? (
          /* ALL 5 COHORTS CO-ORDINATED COMPARISON GRAPHIC */
          <div className="p-6 sm:p-8 bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm shadow-xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F8FAFC]/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#00F0FF] uppercase font-bold tracking-widest">
                  COORDINATED SPECTRUM VIEW
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#F8FAFC]">
                  Outbreak Frequency vs. Patient Case Burden
                </h3>
              </div>
              <span className="text-xs font-mono text-[#94A3B8]">
                Canonical Baseline: 539 Records · 20,955 Cases
              </span>
            </div>

            {/* Visual Bars Comparison across all 5 */}
            <div className="space-y-6">
              {diseases.map((d) => {
                const recordPct = ((d.records / 539) * 100).toFixed(1);
                const casePct = ((d.cases / 20955) * 100).toFixed(1);
                const cfr = ((d.deaths / d.cases) * 100).toFixed(2);

                return (
                  <div key={d.id} className="p-4 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm space-y-3 hover:border-[#00F0FF]/40 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="font-serif text-lg font-bold text-[#F8FAFC]">{d.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-[#0B111E] border border-[#F8FAFC]/10 text-[#94A3B8] rounded-xs">
                          {d.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono">
                        <span className="text-[#94A3B8]">
                          Districts: <strong className="text-[#F8FAFC]">{d.districts}/36</strong>
                        </span>
                        <span className="text-[#94A3B8]">
                          Deaths: <strong className="text-[#EF4444]">{d.deaths}</strong> ({cfr}% CFR)
                        </span>
                      </div>
                    </div>

                    {/* Dual Comparative Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-mono text-xs">
                      {/* Records Share Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-[#94A3B8]">Outbreak Records:</span>
                          <span className="font-bold text-[#F8FAFC]">{d.records} ({recordPct}%)</span>
                        </div>
                        <div className="h-2 w-full bg-[#0B111E] rounded-xs overflow-hidden">
                          <div
                            className="h-full transition-all duration-500"
                            style={{
                              width: `${(d.records / maxRecords) * 100}%`,
                              backgroundColor: d.color,
                            }}
                          />
                        </div>
                      </div>

                      {/* Cases Share Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-[#94A3B8]">Reported Patient Cases:</span>
                          <span className="font-bold text-[#F8FAFC]">{d.cases.toLocaleString()} ({casePct}%)</span>
                        </div>
                        <div className="h-2 w-full bg-[#0B111E] rounded-xs overflow-hidden">
                          <div
                            className="h-full transition-all duration-500 opacity-80"
                            style={{
                              width: `${(d.cases / maxCases) * 100}%`,
                              backgroundColor: d.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Attached Takeaway Banner */}
            <div className="p-4 bg-[#06080F] border border-[#00F0FF]/30 rounded-sm flex items-start gap-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#F8FAFC]">Key Comparative Finding:</strong> Outbreak frequency does not correlate with patient case volume. 
                Dengue generates the greatest number of investigated notifications (<strong className="text-[#38BDF8]">153 records</strong>), but Acute Diarrhoeal Disease causes the heaviest clinical case load (<strong className="text-[#10B981]">5,660 cases</strong>) and 106 reported deaths.
              </div>
            </div>
          </div>
        ) : (
          /* SINGLE DISEASE FOCUSED INTERACTIVE EXHIBIT */
          activeDisease && (
            <div className="p-6 sm:p-8 bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm shadow-xl space-y-6 animate-fadeIn">
              {/* Disease Heading & Key Metrics Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F8FAFC]/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider" style={{ color: activeDisease.color }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeDisease.color }} />
                    <span>{activeDisease.category} · ICD Canonical Cohort</span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-[#F8FAFC]">{activeDisease.name}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <div className="px-3 py-2 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm text-center">
                    <div className="text-[10px] text-[#94A3B8] uppercase">Records</div>
                    <div className="font-bold text-base text-[#F8FAFC]">{activeDisease.records}</div>
                  </div>
                  <div className="px-3 py-2 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm text-center">
                    <div className="text-[10px] text-[#94A3B8] uppercase">Cases</div>
                    <div className="font-bold text-base text-[#F8FAFC]">{activeDisease.cases.toLocaleString()}</div>
                  </div>
                  <div className="px-3 py-2 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm text-center">
                    <div className="text-[10px] text-[#94A3B8] uppercase">Deaths</div>
                    <div className="font-bold text-base text-[#EF4444]">{activeDisease.deaths}</div>
                  </div>
                  <div className="px-3 py-2 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm text-center">
                    <div className="text-[10px] text-[#94A3B8] uppercase">CFR</div>
                    <div className="font-bold text-base text-[#00F0FF]">
                      {((activeDisease.deaths / activeDisease.cases) * 100).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* 12-Month Seasonal Profile Bar Chart for Selected Disease */}
              <div className="p-5 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#00F0FF] uppercase font-bold tracking-wider">
                    Monthly Outbreak Distribution (2022–2025 Aggregate)
                  </span>
                  <span className="text-[#94A3B8]">
                    Peak Period: <strong className="text-[#F8FAFC]">{activeDisease.peakMonths}</strong>
                  </span>
                </div>

                {/* 12 Monthly Bars */}
                <div className="h-32 flex items-end justify-between gap-1.5 pt-4">
                  {MONTHS.map((m, idx) => {
                    const count = activeDisease.monthlyEvents[idx] || 0;
                    const maxMonthly = Math.max(...activeDisease.monthlyEvents);
                    const heightPct = maxMonthly > 0 ? (count / maxMonthly) * 100 : 0;
                    const isPeak = count === maxMonthly;

                    return (
                      <div key={m} className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
                        <span className={`text-[9px] font-mono tabular-nums ${isPeak ? "text-[#00F0FF] font-bold" : "text-[#94A3B8]/60"}`}>
                          {count}
                        </span>
                        <div className="w-full bg-[#0B111E] rounded-t-xs h-full flex items-end">
                          <div
                            className="w-full rounded-t-xs transition-all duration-300 group-hover:brightness-125"
                            style={{
                              height: `${heightPct}%`,
                              backgroundColor: isPeak ? "#00F0FF" : activeDisease.color,
                              opacity: isPeak ? 1 : 0.75,
                            }}
                          />
                        </div>
                        <span className={`text-[9px] font-mono uppercase ${isPeak ? "text-[#00F0FF] font-bold" : "text-[#94A3B8]"}`}>
                          {m}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Spatial and Epidemiological Profile Badges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm space-y-2">
                  <div className="text-[10px] text-[#00F0FF] uppercase font-bold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Geographic Footprint</span>
                  </div>
                  <div className="text-sm font-serif font-bold text-[#F8FAFC]">
                    {activeDisease.districts} of 36 Districts Affected
                  </div>
                  <p className="text-[#94A3B8] text-[11px] leading-relaxed">
                    {activeDisease.summary}
                  </p>
                </div>

                <div className="p-4 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm space-y-2">
                  <div className="text-[10px] text-[#00F0FF] uppercase font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Seasonal Concentration Metric (CR3)</span>
                  </div>
                  <div className="text-sm font-serif font-bold text-[#F8FAFC]">
                    {(activeDisease.cr3 * 100).toFixed(1)}% in Top 3 Months
                  </div>
                  <p className="text-[#94A3B8] text-[11px] leading-relaxed">
                    Continuous window: {activeDisease.cr3Window}
                  </p>
                </div>
              </div>

              {/* Direct Attached Takeaway */}
              <div className="p-4 bg-[#06080F] border border-[#00F0FF]/30 rounded-sm flex items-start gap-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#F8FAFC]">{activeDisease.name} Finding:</strong> {activeDisease.fieldworkLinkage}
                </div>
              </div>
            </div>
          )
        )}

        {/* 3. OPTIONAL EXPANDABLE TECHNICAL METHODOLOGY DRAWER */}
        <div className="pt-6 border-t border-[#F8FAFC]/15">
          <button
            onClick={() => setShowTechnicalDrawer(!showTechnicalDrawer)}
            className="w-full p-4 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/15 rounded-sm transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#00F0FF] font-bold"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{showTechnicalDrawer ? "Hide Clinical Diagnostic Specifications" : "View Clinical Insights & Fieldwork Linkage"}</span>
            </div>
            {showTechnicalDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showTechnicalDrawer && (
            <div className="pt-6 space-y-4 animate-fadeIn font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {diseases.map((d) => (
                  <div key={d.id} className="p-4 bg-[#0B111E] border border-[#F8FAFC]/10 rounded-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F8FAFC]" style={{ color: d.color }}>{d.name}</span>
                      <span className="text-[10px] text-[#94A3B8]">{d.category}</span>
                    </div>
                    <ul className="text-[11px] text-[#94A3B8] space-y-1 list-disc list-inside">
                      {d.keyInsights.slice(0, 2).map((ins, iIdx) => (
                        <li key={iIdx}>{ins}</li>
                      ))}
                    </ul>
                    <div className="text-[10px] text-[#94A3B8]/70 pt-1 border-t border-[#F8FAFC]/10">
                      Fieldwork Link: {d.fieldworkLinkage}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CHAPTER NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={3} />
    </div>
  );
}
