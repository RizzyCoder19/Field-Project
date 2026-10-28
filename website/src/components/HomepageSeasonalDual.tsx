"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRIMARY_DISEASES, MONTHS, RESEARCH_METRICS } from "@/data/researchData";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const DISEASES_LEGEND = [
  { id: "dengue", label: "Dengue Fever", color: "#38BDF8" },
  { id: "add", label: "Acute Diarrheal Disease", color: "#10B981" },
  { id: "malaria", label: "Malaria", color: "#F59E0B" },
  { id: "foodPoisoning", label: "Food Poisoning", color: "#EF4444" },
  { id: "chikungunya", label: "Chikungunya", color: "#A78BFA" },
];

// Consistent 2-decimal rounding to prevent Node.js SSR vs Browser V8 float precision hydration mismatches
const r2 = (n: number) => Number(n.toFixed(2));

export default function HomepageSeasonalDual() {
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [mobileExhibit, setMobileExhibit] = useState<"radial" | "bars">("radial");
  const { ref, hasAnimated } = useInViewAnimation<HTMLDivElement>({ threshold: 0.15 });

  // Compute monthly events for all 5 baseline diseases or selected disease
  const monthlyData = MONTHS.map((month, idx) => {
    if (selectedDisease) {
      const d = PRIMARY_DISEASES[selectedDisease];
      return d ? (d.monthlyEvents[idx] || 0) : 0;
    }
    return Object.values(PRIMARY_DISEASES).reduce((acc, d) => acc + (d.monthlyEvents[idx] || 0), 0);
  });

  const maxVal = Math.max(...monthlyData, 1);

  // Radial dimensions
  const cx = 200;
  const cy = 200;
  const outerR = 175;
  const innerR = 75;

  return (
    <div ref={ref} className="w-full space-y-10">
      {/* ── Intelligence Status Strip ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-xs text-[11px] font-mono text-[#87999E]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5FB0A8] animate-pulse" />
          <span className="text-[#F5F1E8] font-semibold">SURVEILLANCE REGISTER:</span>
          <span>MAHARASHTRA STATE (36 DISTRICTS)</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider">
          <span>SOURCE: NCDC / IDSP WEEKLY BULLETINS</span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="hidden sm:inline text-[#D7B56D]">BASELINE: 2022–2025 (539 OUTBREAKS)</span>
        </div>
      </div>

      {/* ── Section Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#D7B56D] uppercase">
              SEASONAL PATTERN AT A GLANCE
            </span>
            <div className="h-px bg-white/10 w-16" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8] tracking-tight">
            A 12-month view of disease outbreaks
          </h2>
          <p className="text-sm sm:text-base text-[#A8B6BA] mt-2 max-w-2xl leading-relaxed">
            Distribution of 539 verified outbreak events across five major disease families in Maharashtra.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-[#5FB0A8] rounded-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5FB0A8]" />
            2026: Weeks 1–32 (Partial)
          </span>
        </div>
      </div>

      {/* ── Mobile Dedicated Tab Switcher (Visible on < lg screens) ── */}
      <div className="block lg:hidden bg-[#0A1016] border border-white/[0.1] p-1.5 rounded-xs">
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <button
            onClick={() => setMobileExhibit("radial")}
            className={`py-3 px-3 rounded-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mobileExhibit === "radial"
                ? "bg-[#D7B56D] text-[#070A10] shadow-md"
                : "text-[#A8B6BA] hover:text-[#F5F1E8] bg-white/[0.02]"
            }`}
          >
            <span>⏱ Radial Clock</span>
          </button>
          <button
            onClick={() => setMobileExhibit("bars")}
            className={`py-3 px-3 rounded-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mobileExhibit === "bars"
                ? "bg-[#5FB0A8] text-[#070A10] shadow-md"
                : "text-[#A8B6BA] hover:text-[#F5F1E8] bg-white/[0.02]"
            }`}
          >
            <span>📊 Monthly Bars</span>
          </button>
        </div>
      </div>

      {/* ── Dual Visual Exhibit (Layered Charcoal Panel) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-b from-[#0D131C] to-[#070A10] border border-white/[0.08] rounded-sm p-6 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.7)] relative overflow-hidden">
        
        {/* Subtle corner hairline accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D7B56D]/40" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D7B56D]/40" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D7B56D]/40" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D7B56D]/40" />

        {/* Left: Circular Radial Clock (5 cols on desktop; toggle on mobile) */}
        <div className={`flex flex-col items-center justify-center relative lg:col-span-5 ${mobileExhibit === "radial" ? "flex" : "hidden lg:flex"}`}>
          <div className="w-full flex items-center justify-between mb-4 px-2">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#D7B56D] uppercase">EXHIBIT A</span>
              <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">Seasonal Radial Clock</h3>
            </div>
            <span className="text-[10px] font-mono text-[#87999E]">12 Calendar Months</span>
          </div>

          <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-square">
            <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible select-none">
              <defs>
                <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#121A26" />
                  <stop offset="100%" stopColor="#070A10" />
                </radialGradient>
              </defs>

              {/* 12 Concentric / Spoke Segments */}
              {MONTHS.map((m, mIdx) => {
                const angle = (mIdx * 30 - 90) * (Math.PI / 180);
                const isHovered = hoveredMonth === mIdx;

                // Month outer arc label position
                const labelR = outerR + 18;
                const labelX = r2(cx + labelR * Math.cos(angle + (15 * Math.PI) / 180));
                const labelY = r2(cy + labelR * Math.sin(angle + (15 * Math.PI) / 180));

                // Wedge spoke line
                const spokeX = r2(cx + outerR * Math.cos(angle));
                const spokeY = r2(cy + outerR * Math.sin(angle));

                return (
                  <g 
                    key={m} 
                    className="cursor-pointer group"
                    onClick={() => setHoveredMonth(hoveredMonth === mIdx ? null : mIdx)}
                    onMouseEnter={() => setHoveredMonth(mIdx)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    {/* Spoke Divider Line */}
                    <line
                      x1={r2(cx + innerR * Math.cos(angle))}
                      y1={r2(cy + innerR * Math.sin(angle))}
                      x2={spokeX}
                      y2={spokeY}
                      stroke="#F5F1E8"
                      strokeOpacity="0.08"
                      strokeWidth="1"
                    />

                    {/* Month Label on Rim */}
                    <text
                      x={labelX}
                      y={r2(labelY + 4)}
                      textAnchor="middle"
                      className={`font-mono text-[11px] font-bold transition-colors ${
                        isHovered ? "fill-[#5FB0A8]" : "fill-[#A8B6BA]"
                      }`}
                    >
                      {m}
                    </text>
                  </g>
                );
              })}

              {/* Concentric rings for the 5 disease families */}
              {DISEASES_LEGEND.map((dis, trackIdx) => {
                const disease = PRIMARY_DISEASES[dis.id];
                if (!disease) return null;
                const trackR = r2(innerR + 15 + trackIdx * 18);
                const isFocused = !selectedDisease || selectedDisease === dis.id;

                return (
                  <g key={dis.id} opacity={isFocused ? 1 : 0.2} className="transition-opacity duration-300">
                    {/* Background track circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={trackR}
                      fill="none"
                      stroke="#F5F1E8"
                      strokeOpacity="0.04"
                      strokeWidth="1"
                    />

                    {/* Monthly Event Blocks along track */}
                    {MONTHS.map((_, mIdx) => {
                      const events = disease.monthlyEvents[mIdx] || 0;
                      if (events === 0) return null;

                      const midDeg = mIdx * 30 + 15 - 90;
                      const rad = (midDeg * Math.PI) / 180;
                      const bx = r2(cx + trackR * Math.cos(rad));
                      const by = r2(cy + trackR * Math.sin(rad));
                      const dotR = r2(Math.max(2, Math.min(6, (events / 40) * 6 + 1.5)));
                      const isHovered = hoveredMonth === mIdx;

                      return (
                        <circle
                          key={mIdx}
                          cx={bx}
                          cy={by}
                          r={r2(isHovered ? dotR + 1.5 : dotR)}
                          fill={dis.color}
                          opacity={isHovered ? 1 : 0.85}
                          className="transition-all"
                        />
                      );
                    })}
                  </g>
                );
              })}

              {/* Center Hub — Matching Image 2 */}
              <circle
                cx={cx}
                cy={cy}
                r={innerR}
                fill="url(#hubGrad)"
                stroke="#D7B56D"
                strokeOpacity="0.35"
                strokeWidth="1.5"
              />

              <g className="pointer-events-none select-none text-center">
                <text
                  x={cx}
                  y={cy - 20}
                  textAnchor="middle"
                  className="font-mono text-[10px] font-semibold tracking-wider fill-[#A8B6BA] uppercase"
                >
                  {selectedDisease ? PRIMARY_DISEASES[selectedDisease]?.name.slice(0, 16) : "2022 – 2025"}
                </text>
                <text
                  x={cx}
                  y={cy + 12}
                  textAnchor="middle"
                  className="font-serif text-3xl font-bold fill-[#F5F1E8]"
                >
                  {hoveredMonth !== null ? monthlyData[hoveredMonth] : (selectedDisease ? PRIMARY_DISEASES[selectedDisease]?.records : RESEARCH_METRICS.primaryCohortRecords)}
                </text>
                <text
                  x={cx}
                  y={cy + 30}
                  textAnchor="middle"
                  className="font-mono text-[9px] tracking-wider fill-[#87999E] uppercase"
                >
                  {hoveredMonth !== null ? `${MONTHS[hoveredMonth]} outbreaks` : "cohort records"}
                </text>
              </g>
            </svg>
          </div>

          {/* Mobile Tap-to-Inspect Month Pills */}
          <div className="w-full mt-4 pt-3 border-t border-white/[0.06] lg:hidden">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#87999E] mb-2 text-center">
              Tap Month to Inspect Hub
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar justify-center flex-wrap">
              {MONTHS.map((m, idx) => (
                <button
                  key={m}
                  onClick={() => setHoveredMonth(hoveredMonth === idx ? null : idx)}
                  className={`px-2 py-1 rounded-xs font-mono text-[11px] transition-colors cursor-pointer ${
                    hoveredMonth === idx
                      ? "bg-[#5FB0A8] text-[#070A10] font-bold"
                      : "bg-white/[0.04] text-[#A8B6BA] hover:bg-white/[0.08]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Monthly Outbreak Records Bar Chart (7 cols on desktop; toggle on mobile) */}
        <div className={`flex flex-col justify-between space-y-6 lg:col-span-7 ${mobileExhibit === "bars" ? "flex" : "hidden lg:flex"}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#D7B56D] uppercase">EXHIBIT B</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1E8]">
                Monthly Outbreak Incidence
              </h3>
              <p className="text-xs font-mono text-[#A8B6BA] mt-0.5">
                {selectedDisease ? PRIMARY_DISEASES[selectedDisease]?.name : "All Five Disease Cohorts"} (2022–2025 Aggregated Baseline)
              </p>
            </div>

            {selectedDisease && (
              <button
                onClick={() => setSelectedDisease(null)}
                className="text-xs font-mono text-[#5FB0A8] hover:text-[#F5F1E8] underline"
              >
                Reset to All Cohorts
              </button>
            )}
          </div>

          {/* SVG Bar Chart with teal gradients matching Image 2 */}
          <div className="w-full aspect-[2/1] min-h-[220px] relative">
            <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="barTealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5FB0A8" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#2A5C57" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="barPeakGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8C97D" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#D7B56D" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Monsoon Surge Bracket Highlight (Jun - Oct: cols 5 to 9) */}
              {(() => {
                const colW = (560 - 30) / 12;
                const startX = r2(38 + 5 * colW);
                const width = r2(5 * colW);
                return (
                  <g className="pointer-events-none">
                    <rect
                      x={startX}
                      y={25}
                      width={width}
                      height={165}
                      fill="rgba(95, 176, 168, 0.04)"
                      stroke="rgba(95, 176, 168, 0.18)"
                      strokeDasharray="4 4"
                      rx="3"
                    />
                    <text
                      x={r2(startX + width / 2)}
                      y={18}
                      textAnchor="middle"
                      className="font-mono text-[9px] fill-[#5FB0A8] font-bold tracking-wider uppercase"
                    >
                      Monsoon Surge Window (Jun–Oct)
                    </text>
                  </g>
                );
              })()}

              {/* Gridlines */}
              {[0, 20, 40, 60, 80].map((tick) => {
                const y = r2(190 - (tick / 80) * 150);
                return (
                  <g key={tick}>
                    <line x1="30" y1={y} x2="590" y2={y} stroke="#F5F1E8" strokeOpacity="0.05" strokeDasharray="3 3" />
                    <text x="24" y={r2(y + 3)} textAnchor="end" className="font-mono text-[9px] fill-[#87999E]">
                      {tick}
                    </text>
                  </g>
                );
              })}

              {/* Baseline */}
              <line x1="30" y1="190" x2="590" y2="190" stroke="#F5F1E8" strokeOpacity="0.15" />

              {/* 12 Monthly Bars */}
              {monthlyData.map((val, idx) => {
                const barWidth = 24;
                const colW = (560 - 30) / 12;
                const x = r2(38 + idx * colW + (colW - barWidth) / 2);
                const barH = r2((val / 80) * 150);
                const y = r2(190 - barH);
                const isPeak = val === maxVal;
                const isHovered = hoveredMonth === idx;

                return (
                  <g 
                    key={MONTHS[idx]} 
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredMonth(idx)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    {/* Bar */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={r2(Math.max(barH, 2))}
                      fill={isPeak ? "url(#barPeakGrad)" : "url(#barTealGrad)"}
                      rx="1.5"
                      opacity={hoveredMonth === null || isHovered ? 1 : 0.4}
                      className={hasAnimated ? "bar-construct transition-all duration-300" : "opacity-0"}
                      style={{ animationDelay: `${idx * 40}ms` }}
                    />

                    {/* Count label above bar */}
                    <text
                      x={r2(x + barWidth / 2)}
                      y={r2(y - 6)}
                      textAnchor="middle"
                      className={`font-mono text-[10px] font-bold ${
                        isPeak ? "fill-[#D7B56D]" : isHovered ? "fill-[#5FB0A8]" : "fill-[#F5F1E8]"
                      }`}
                    >
                      {val}
                    </text>

                    {/* Month label on X-axis */}
                    <text
                      x={r2(x + barWidth / 2)}
                      y={208}
                      textAnchor="middle"
                      className={`font-mono text-[10px] ${
                        isHovered ? "fill-[#5FB0A8] font-bold" : "fill-[#A8B6BA]"
                      }`}
                    >
                      {MONTHS[idx]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend Matching Image 2 */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-white/[0.06] text-xs font-mono">
            {DISEASES_LEGEND.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDisease(selectedDisease === d.id ? null : d.id)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-xs transition-colors ${
                  selectedDisease === d.id 
                    ? "bg-white/10 text-[#F5F1E8] font-bold border border-white/20" 
                    : "text-[#A8B6BA] hover:text-[#F5F1E8] hover:bg-white/[0.04]"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span>{d.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Four Metrics Divider Bar (Matching Image 2 with Intelligence Precision) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {/* Metric 1: 539 records */}
        <div className="bg-[#0A1016] border border-white/[0.08] p-5 rounded-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#D7B56D] uppercase tracking-wider block mb-1">
              BASELINE COHORT
            </span>
            <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8]">
              {RESEARCH_METRICS.primaryCohortRecords}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/[0.06]">
            <p className="text-xs font-mono text-[#A8B6BA] uppercase tracking-wider">
              Outbreak records
            </p>
            <p className="text-xs text-[#87999E] mt-0.5">5 disease families (2022–2025)</p>
          </div>
        </div>

        {/* Metric 2: 20,955 reported cases */}
        <div className="bg-[#0A1016] border border-white/[0.08] p-5 rounded-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#5FB0A8] uppercase tracking-wider block mb-1">
              CASE BURDEN
            </span>
            <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8]">
              {RESEARCH_METRICS.reportedCases.toLocaleString()}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/[0.06]">
            <p className="text-xs font-mono text-[#A8B6BA] uppercase tracking-wider">
              Reported cases
            </p>
            <p className="text-xs text-[#87999E] mt-0.5">266 verified fatalities documented</p>
          </div>
        </div>

        {/* Metric 3: 2022-2025 Baseline */}
        <div className="bg-[#0A1016] border border-white/[0.08] p-5 rounded-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#A8B6BA] uppercase tracking-wider block mb-1">
              VALIDATION PERIOD
            </span>
            <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F1E8]">
              2022 – 2025
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#5FB0A8] mb-1">
              <span>● 22</span>
              <span>● 23</span>
              <span>● 24</span>
              <span>● 25</span>
              <span className="text-xs text-[#87999E] ml-1">(52 wks each)</span>
            </div>
            <p className="text-xs text-[#87999E]">Four complete annual cycles</p>
          </div>
        </div>

        {/* Metric 4: 2026 Weeks 1-32 */}
        <div className="bg-[#0A1016] border border-[#5FB0A8]/30 p-5 rounded-xs flex flex-col justify-between">
          <div>
            <span className="inline-block px-1.5 py-0.5 bg-[#5FB0A8]/10 text-[10px] font-mono text-[#5FB0A8] uppercase tracking-wider rounded-xs mb-1">
              PROVISIONAL OBSERVATION
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#5FB0A8]">
              2026: W01–W32
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/[0.06]">
            <p className="text-xs font-mono text-[#A8B6BA]">
              <strong className="text-[#F5F1E8]">45</strong> records · <strong className="text-[#F5F1E8]">2,126</strong> cases
            </p>
            <p className="text-[11px] text-[#87999E] mt-0.5">
              Partial year window • Not annualized
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
