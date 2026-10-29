"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, CheckCircle2, ChevronDown, ChevronUp, 
  Clock, ShieldAlert, BarChart2, EyeOff
} from "lucide-react";
import NativeTimeline2026 from "@/components/NativeTimeline2026";
import ChapterFooter from "@/components/ChapterFooter";
import ConnectedEvidenceHeader from "@/components/ConnectedEvidenceHeader";

export default function Comparison2026Page() {
  const [comparisonMode, setComparisonMode] = useState<"matched" | "unmatched">("matched");
  const [showTableDrawer, setShowTableDrawer] = useState(false);

  return (
    <div className="w-full bg-[#070A0F] text-[#F0DECE] min-h-screen">
      <ConnectedEvidenceHeader currentActNumber={9} />

      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-[#F0DECE]/15 bg-gradient-to-b from-[#070A0F] to-[#0B0F15] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#BAC0B8] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#8B1414] ring-1 ring-[#F0DECE]/40 animate-pulse" />
            <span>ACT 09 · PROSPECTIVE 2026 SURVEILLANCE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F0DECE] leading-[1.12]">
            The 32-Week Barrier
          </h1>

          <p className="text-base sm:text-lg text-[#BAC0B8] max-w-3xl leading-relaxed pt-1">
            Comparing out-of-sample surveillance from 2026 with historical baselines requires rigorous period matching.
          </p>
        </div>
      </section>

      {/* 2. DOMINANT INTERACTIVE TIMELINE & BARRIER EXHIBIT (80% VIEWPORT) */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        {/* Comparison Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
          <span className="text-xs font-mono text-[#BAC0B8] uppercase tracking-wider font-semibold">
            Evaluation Methodology:
          </span>

          <div className="flex items-center bg-[#0B0F15] border border-white/[0.12] rounded-xs p-0.5">
            <button
              onClick={() => setComparisonMode("matched")}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                comparisonMode === "matched"
                  ? "bg-[#8B1414] text-[#F0DECE] font-bold shadow"
                  : "text-[#BAC0B8] hover:text-[#F0DECE]"
              }`}
            >
              Matched Window (W01–W32) · Valid
            </button>
            <button
              onClick={() => setComparisonMode("unmatched")}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                comparisonMode === "unmatched"
                  ? "bg-[#590907] text-[#F0DECE] font-bold shadow"
                  : "text-[#BAC0B8] hover:text-[#F0DECE]"
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
        <div className="p-6 bg-[#0B0F15] border border-[#F0DECE]/15 rounded-xs shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#F0DECE] font-bold">
              {comparisonMode === "matched" ? "Matched Period Evaluation (Weeks 01–32 Only)" : "Flawed Direct Comparison (32 Weeks vs 52 Weeks)"}
            </span>
            <span className="text-xs font-mono text-[#BAC0B8]">
              {comparisonMode === "matched" ? "Directly Comparable Like-for-Like" : "Severe Truncation Bias"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-[#0E141D] border border-white/[0.08] rounded-xs space-y-2">
              <div className="text-[10px] text-[#C9944A] uppercase font-bold">2026 Partial Observation (W01–W32)</div>
              <div className="font-serif text-3xl font-bold text-[#F0DECE]">45 Outbreak Records</div>
              <p className="text-[11px] text-[#BAC0B8] leading-relaxed">
                2,126 cases · 0 deaths. Monitored through Week 32 (August 14, 2026).
              </p>
            </div>

            <div className={`p-4 bg-[#0E141D] border rounded-xs space-y-2 ${comparisonMode === "matched" ? "border-[#5A7A72]/60" : "border-[#8B1414]/60"}`}>
              <div className={`text-[10px] uppercase font-bold ${comparisonMode === "matched" ? "text-[#5A7A72]" : "text-[#8B1414]"}`}>
                {comparisonMode === "matched" ? "Baseline Average (2022–2025 W01–W32)" : "Baseline Average (2022–2025 Full 52 Weeks)"}
              </div>
              <div className="font-serif text-3xl font-bold text-[#F0DECE]">
                {comparisonMode === "matched" ? "48.3 Records" : "134.8 Records"}
              </div>
              <p className="text-[11px] text-[#BAC0B8] leading-relaxed">
                {comparisonMode === "matched" 
                  ? "2026 tracks closely with historical 32-week averages (45 vs 48.3 records; -6.8% variance)."
                  : "Deceptively low (-66.6% difference) purely because 20 future weeks are missing from 2026."}
              </p>
            </div>
          </div>

          {/* Attached Takeaway Banner */}
          <div className="p-4 bg-[#070A0F] border border-[#8B1414]/50 rounded-xs flex items-start gap-3 text-xs sm:text-sm text-[#BAC0B8] leading-relaxed">
            <CheckCircle2 className="w-5 h-5 text-[#8B1414] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F0DECE]">Core Epidemiological Caveat:</strong> Dengue and Chikungunya surge predominantly during Weeks 36–45 (October post-monsoon). 
              Because the 2026 observation cutoff occurs at Week 32, evaluating vector diseases before their peak season arrives would produce a completely invalid conclusion.
            </div>
          </div>
        </div>

        {/* 3. OPTIONAL EXPANDABLE BREAKDOWN DRAWER */}
        <div className="pt-6 border-t border-white/[0.08]">
          <button
            onClick={() => setShowTableDrawer(!showTableDrawer)}
            className="w-full p-4 bg-[#0B0F15] hover:bg-[#180505] border border-[#F0DECE]/20 rounded-xs transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#F0DECE] font-bold cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#8B1414]" />
              <span>{showTableDrawer ? "Hide 2026 Cohort Breakdown" : "Explore 2026 Disease Breakdown & Matched Comparison Table"}</span>
            </div>
            {showTableDrawer ? <ChevronUp className="w-4 h-4 text-[#8B1414]" /> : <ChevronDown className="w-4 h-4 text-[#8B1414]" />}
          </button>

          {showTableDrawer && (
            <div className="pt-6 space-y-6 animate-fadeIn font-mono text-xs text-[#BAC0B8]">
              <div className="border border-white/[0.08] rounded-xs overflow-x-auto bg-[#070A0F]">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-[#0E141D] text-[#BAC0B8] uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">Disease Group</th>
                      <th className="py-3 px-4 text-right">2026 (W01–W32)</th>
                      <th className="py-3 px-4 text-right">2026 Cases</th>
                      <th className="py-3 px-4 text-right">2022–25 W01–32 Avg</th>
                      <th className="py-3 px-4 text-right">2022–25 Full Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/[0.06] hover:bg-[#0B0F15]">
                      <td className="py-3 px-4 font-bold text-[#8B1414]">Dengue</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F0DECE]">14 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F0DECE]">412 cases</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#BAC0B8]">15.2 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#8B1414]">38.3 records</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] hover:bg-[#0B0F15]">
                      <td className="py-3 px-4 font-bold text-[#5A7A72]">ADD</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F0DECE]">16 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F0DECE]">840 cases</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#BAC0B8]">18.0 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#8B1414]">36.0 records</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] hover:bg-[#0B0F15]">
                      <td className="py-3 px-4 font-bold text-[#C9944A]">Malaria</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F0DECE]">6 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F0DECE]">310 cases</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#BAC0B8]">7.5 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#8B1414]">17.5 records</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] hover:bg-[#0B0F15]">
                      <td className="py-3 px-4 font-bold text-[#A83C28]">Food Poisoning</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F0DECE]">5 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F0DECE]">394 cases</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#BAC0B8]">5.2 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#8B1414]">17.3 records</td>
                    </tr>
                    <tr className="hover:bg-[#0B0F15]">
                      <td className="py-3 px-4 font-bold text-[#7E6080]">Chikungunya</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F0DECE]">4 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#F0DECE]">170 cases</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#BAC0B8]">2.4 records</td>
                      <td className="py-3 px-4 text-right tabular-nums text-[#8B1414]">25.8 records</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CHAPTER NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={9} />
    </div>
  );
}
