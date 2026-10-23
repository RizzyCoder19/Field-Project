"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, CheckCircle2, ChevronDown, ChevronUp, 
  Clock, ShieldAlert, BarChart2, EyeOff
} from "lucide-react";
import NativeTimeline2026 from "@/components/NativeTimeline2026";
import ChapterFooter from "@/components/ChapterFooter";

export default function Comparison2026Page() {
  const [comparisonMode, setComparisonMode] = useState<"matched" | "unmatched">("matched");
  const [showTableDrawer, setShowTableDrawer] = useState(false);

  return (
    <div className="w-full bg-[#06080F] text-[#F8FAFC] min-h-screen">
      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-[#F8FAFC]/15 bg-gradient-to-b from-[#030407] to-[#06080F] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span>EXHIBIT 08 · OUT-OF-SAMPLE MONITORING</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-[1.12]">
            The 32-Week Barrier
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed pt-1">
            Comparing out-of-sample surveillance from 2026 with historical baselines requires rigorous period matching.
          </p>
        </div>
      </section>

      {/* 2. DOMINANT INTERACTIVE TIMELINE & BARRIER EXHIBIT (80% VIEWPORT) */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        {/* Comparison Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F8FAFC]/12 pb-3">
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
            Evaluation Methodology:
          </span>

          <div className="flex items-center bg-[#06080F] border border-[#F8FAFC]/15 rounded-sm p-0.5">
            <button
              onClick={() => setComparisonMode("matched")}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-xs transition-all ${
                comparisonMode === "matched"
                  ? "bg-[#10B981] text-[#06080F] font-bold shadow"
                  : "text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              Matched Window (W01–W32) · Valid
            </button>
            <button
              onClick={() => setComparisonMode("unmatched")}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-xs transition-all ${
                comparisonMode === "unmatched"
                  ? "bg-[#EF4444] text-[#F8FAFC] font-bold shadow"
                  : "text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              Unmatched Full Year (W01–W52) · Flawed
            </button>
          </div>
        </div>

        {/* Central Native Timeline Component in Observatory Frame */}
        <div className="shadow-2xl">
          <NativeTimeline2026 />
        </div>

        {/* Dynamic Comparison Panel */}
        <div className="p-6 bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F8FAFC]/10 pb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00F0FF] font-bold">
              {comparisonMode === "matched" ? "Matched Period Evaluation (Weeks 01–32 Only)" : "Flawed Direct Comparison (32 Weeks vs 52 Weeks)"}
            </span>
            <span className="text-xs font-mono text-[#94A3B8]">
              {comparisonMode === "matched" ? "Directly Comparable Like-for-Like" : "Severe Truncation Bias"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-[#06080F] border border-[#38BDF8]/40 rounded-sm space-y-2">
              <div className="text-[10px] text-[#38BDF8] uppercase font-bold">2026 Partial Observation (W01–W32)</div>
              <div className="font-serif text-3xl font-bold text-[#F8FAFC]">45 Outbreak Records</div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                2,126 cases · 0 deaths. Monitored through Week 32 (August 14, 2026).
              </p>
            </div>

            <div className={`p-4 bg-[#06080F] border rounded-sm space-y-2 ${comparisonMode === "matched" ? "border-[#10B981]/40" : "border-[#EF4444]/40"}`}>
              <div className={`text-[10px] uppercase font-bold ${comparisonMode === "matched" ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                {comparisonMode === "matched" ? "Baseline Average (2022–2025 W01–W32)" : "Baseline Average (2022–2025 Full 52 Weeks)"}
              </div>
              <div className="font-serif text-3xl font-bold text-[#F8FAFC]">
                {comparisonMode === "matched" ? "48.3 Records" : "134.8 Records"}
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                {comparisonMode === "matched" 
                  ? "2026 tracks closely with historical 32-week averages (45 vs 48.3 records; -6.8% variance)."
                  : "Deceptively low (-66.6% difference) purely because 20 future weeks are missing from 2026."}
              </p>
            </div>
          </div>

          {/* Attached Takeaway Banner */}
          <div className="p-4 bg-[#06080F] border border-[#00F0FF]/30 rounded-sm flex items-start gap-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F8FAFC]">Core Epidemiological Caveat:</strong> Dengue and Chikungunya surge predominantly during Weeks 36–45 (October post-monsoon). 
              Because the 2026 observation cutoff occurs at Week 32, evaluating vector diseases before their peak season arrives would produce a completely invalid conclusion.
            </div>
          </div>
        </div>

        {/* 3. OPTIONAL EXPANDABLE BREAKDOWN DRAWER */}
        <div className="pt-6 border-t border-[#F8FAFC]/15">
          <button
            onClick={() => setShowTableDrawer(!showTableDrawer)}
            className="w-full p-4 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/15 rounded-sm transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#00F0FF] font-bold"
          >
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              <span>{showTableDrawer ? "Hide 2026 Cohort Breakdown" : "Explore 2026 Disease Breakdown & Matched Comparison Table"}</span>
            </div>
            {showTableDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showTableDrawer && (
            <div className="pt-6 space-y-6 animate-fadeIn font-mono text-xs text-[#94A3B8]">
              <div className="border border-[#F8FAFC]/12 rounded-sm overflow-x-auto bg-[#06080F]">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#F8FAFC]/12 bg-[#030407] text-[#94A3B8] uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">Disease Group</th>
                      <th className="py-3 px-4 text-right">2026 (W01–W32)</th>
                      <th className="py-3 px-4 text-right">2026 Cases</th>
                      <th className="py-3 px-4 text-right">2022–25 W01–32 Avg</th>
                      <th className="py-3 px-4 text-right">2022–25 Full Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#F8FAFC]/10 hover:bg-[#0B111E]">
                      <td className="py-3 px-4 font-bold text-[#38BDF8]">Dengue</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F8FAFC]">14 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F8FAFC]">412 cases</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#94A3B8]">15.2 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#EF4444]">38.3 records</td>
                    </tr>
                    <tr className="border-b border-[#F8FAFC]/10 hover:bg-[#0B111E]">
                      <td className="py-3 px-4 font-bold text-[#10B981]">ADD</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F8FAFC]">16 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F8FAFC]">840 cases</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#94A3B8]">18.0 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#EF4444]">36.0 records</td>
                    </tr>
                    <tr className="border-b border-[#F8FAFC]/10 hover:bg-[#0B111E]">
                      <td className="py-3 px-4 font-bold text-[#F59E0B]">Malaria</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F8FAFC]">6 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F8FAFC]">310 cases</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#94A3B8]">7.5 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#EF4444]">17.5 records</td>
                    </tr>
                    <tr className="border-b border-[#F8FAFC]/10 hover:bg-[#0B111E]">
                      <td className="py-3 px-4 font-bold text-[#EF4444]">Food Poisoning</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F8FAFC]">5 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F8FAFC]">394 cases</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#94A3B8]">5.2 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#EF4444]">17.3 records</td>
                    </tr>
                    <tr className="hover:bg-[#0B111E]">
                      <td className="py-3 px-4 font-bold text-[#A78BFA]">Chikungunya</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F8FAFC]">4 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F8FAFC]">170 cases</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#94A3B8]">2.4 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#EF4444]">25.8 records</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CHAPTER NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={8} />
    </div>
  );
}
