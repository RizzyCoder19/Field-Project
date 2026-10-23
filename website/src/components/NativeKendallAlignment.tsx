"use client";

import React, { useState } from "react";
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

interface KendallDisease {
  key: string;
  name: string;
  shortName: string;
  w: number;
  p: string;
  isSignificant: boolean;
  color: string;
  peakPattern: string;
  explanation: string;
  annualRanks: {
    year: string;
    ranks: { month: string; rank: number }[];
  }[];
}

const KENDALL_DATA: KendallDisease[] = [
  {
    key: "add",
    name: "Acute Diarrheal Disease (ADD)",
    shortName: "ADD",
    w: 0.530,
    p: "0.016",
    isSignificant: true,
    color: "#10B981",
    peakPattern: "June – August (with secondary October elevation)",
    explanation:
      "Statistically significant rank concordance (W = 0.530, p = 0.016). The 12 calendar months maintain consistent relative rankings across all 4 baseline years, driven by repeated monsoon-onset water disruption. (Note: Four years of surveillance demonstrate statistical stability in this baseline, not an immutable biological law).",
    annualRanks: [
      { year: "2022", ranks: [{ month: "Jul", rank: 1 }, { month: "Jun", rank: 2 }, { month: "Aug", rank: 3 }, { month: "Oct", rank: 4 }] },
      { year: "2023", ranks: [{ month: "Jul", rank: 1 }, { month: "Aug", rank: 2 }, { month: "Jun", rank: 3 }, { month: "Oct", rank: 4 }] },
      { year: "2024", ranks: [{ month: "Jun", rank: 1 }, { month: "Jul", rank: 2 }, { month: "Aug", rank: 3 }, { month: "Oct", rank: 4 }] },
      { year: "2025", ranks: [{ month: "Jul", rank: 1 }, { month: "Aug", rank: 2 }, { month: "Oct", rank: 3 }, { month: "Jun", rank: 4 }] },
    ],
  },
  {
    key: "dengue",
    name: "Dengue Fever",
    shortName: "Dengue",
    w: 0.405,
    p: "0.086",
    isSignificant: false,
    color: "#38BDF8",
    peakPattern: "September – October oscillation",
    explanation:
      "Moderate concordance (W = 0.405, p = 0.086). While late-monsoon concentration is visually marked (73.0% in Jun–Oct), the primary peak month oscillates between September and October across individual years, failing the strict α = 0.05 threshold.",
    annualRanks: [
      { year: "2022", ranks: [{ month: "Oct", rank: 1 }, { month: "Sep", rank: 2 }, { month: "Aug", rank: 3 }, { month: "Nov", rank: 4 }] },
      { year: "2023", ranks: [{ month: "Sep", rank: 1 }, { month: "Oct", rank: 2 }, { month: "Aug", rank: 3 }, { month: "Jul", rank: 4 }] },
      { year: "2024", ranks: [{ month: "Oct", rank: 1 }, { month: "Sep", rank: 2 }, { month: "Jul", rank: 3 }, { month: "Aug", rank: 4 }] },
      { year: "2025", ranks: [{ month: "Sep", rank: 1 }, { month: "Oct", rank: 2 }, { month: "Nov", rank: 3 }, { month: "Aug", rank: 4 }] },
    ],
  },
  {
    key: "foodPoisoning",
    name: "Food Poisoning",
    shortName: "Food Poisoning",
    w: 0.386,
    p: "0.108",
    isSignificant: false,
    color: "#EF4444",
    peakPattern: "Bimodal (Jan–Feb & Apr–May)",
    explanation:
      "Non-monsoonal bimodal surges (W = 0.386, p = 0.108). Event timing aligns with dry-season wedding and banquet gatherings, but event dispersion across winter and summer months limits strict 12-month rank concordance.",
    annualRanks: [
      { year: "2022", ranks: [{ month: "May", rank: 1 }, { month: "Feb", rank: 2 }, { month: "Apr", rank: 3 }, { month: "Jan", rank: 4 }] },
      { year: "2023", ranks: [{ month: "Feb", rank: 1 }, { month: "Apr", rank: 2 }, { month: "May", rank: 3 }, { month: "Jan", rank: 4 }] },
      { year: "2024", ranks: [{ month: "Feb", rank: 1 }, { month: "May", rank: 2 }, { month: "Jan", rank: 3 }, { month: "Apr", rank: 4 }] },
      { year: "2025", ranks: [{ month: "Feb", rank: 1 }, { month: "May", rank: 2 }, { month: "Sep", rank: 3 }, { month: "Jan", rank: 4 }] },
    ],
  },
  {
    key: "malaria",
    name: "Malaria",
    shortName: "Malaria",
    w: 0.319,
    p: "0.229",
    isSignificant: false,
    color: "#F59E0B",
    peakPattern: "May – July (Pre-monsoon & Early onset)",
    explanation:
      "Moderate early-season surge (W = 0.319, p = 0.229). 61.4% of all events are localized in Gadchiroli and Chandrapur; localized reporting dynamics produce year-to-year rank divergence across the remaining districts.",
    annualRanks: [
      { year: "2022", ranks: [{ month: "Jun", rank: 1 }, { month: "Jul", rank: 2 }, { month: "May", rank: 3 }, { month: "Dec", rank: 4 }] },
      { year: "2023", ranks: [{ month: "Jul", rank: 1 }, { month: "Jun", rank: 2 }, { month: "May", rank: 3 }, { month: "Aug", rank: 4 }] },
      { year: "2024", ranks: [{ month: "Jun", rank: 1 }, { month: "Jul", rank: 2 }, { month: "Aug", rank: 3 }, { month: "May", rank: 4 }] },
      { year: "2025", ranks: [{ month: "May", rank: 1 }, { month: "Jun", rank: 2 }, { month: "Jul", rank: 3 }, { month: "Dec", rank: 4 }] },
    ],
  },
  {
    key: "chikungunya",
    name: "Chikungunya",
    shortName: "Chikungunya",
    w: 0.150,
    p: "0.832",
    isSignificant: false,
    color: "#A78BFA",
    peakPattern: "Dispersed (No recurring annual rhythm)",
    explanation:
      "Near-zero rank agreement (W = 0.150, p = 0.832). Outbreak events are sparse (43 total records) and occur across disparate months without a recurring calendar peak in this 4-year baseline.",
    annualRanks: [
      { year: "2022", ranks: [{ month: "May", rank: 1 }, { month: "Sep", rank: 2 }, { month: "Jun", rank: 3 }, { month: "Oct", rank: 4 }] },
      { year: "2023", ranks: [{ month: "Oct", rank: 1 }, { month: "Jul", rank: 2 }, { month: "Nov", rank: 3 }, { month: "Mar", rank: 4 }] },
      { year: "2024", ranks: [{ month: "Jun", rank: 1 }, { month: "Sep", rank: 2 }, { month: "Aug", rank: 3 }, { month: "Oct", rank: 4 }] },
      { year: "2025", ranks: [{ month: "Mar", rank: 1 }, { month: "Nov", rank: 2 }, { month: "May", rank: 3 }, { month: "Sep", rank: 4 }] },
    ],
  },
];

export default function NativeKendallAlignment({
  className = "",
  activeCohort,
}: {
  className?: string;
  activeCohort?: string;
}) {
  const [internalKey, setInternalKey] = useState("add");
  const [animKey, setAnimKey] = useState(0);
  const selectedKey = activeCohort || internalKey;
  const setSelectedKey = setInternalKey;
  const active = KENDALL_DATA.find((d) => d.key === selectedKey) || KENDALL_DATA[0];

  const handleReplay = () => {
    setAnimKey((k) => k + 1);
  };

  // Trajectory bump chart coordinates
  const years = ["2022", "2023", "2024", "2025"];
  const colX = [120, 280, 440, 600];
  const rankY = [60, 110, 160, 210]; // ranks 1, 2, 3, 4

  // Get trajectory curve for the primary peak month of the disease
  const primaryMonth = active.annualRanks[0].ranks[0].month;

  // Track coordinates of the primary month across the 4 years
  const trajectoryPoints = active.annualRanks.map((yr, idx) => {
    const found = yr.ranks.find((r) => r.month === primaryMonth);
    const rNum = found ? found.rank : 4;
    return { x: colX[idx], y: rankY[rNum - 1], rank: rNum, year: yr.year };
  });

  // Construct smooth bezier SVG curve path connecting the 4 years
  const trajectoryPath = trajectoryPoints.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[idx - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");

  return (
    <div
      className={`w-full bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm p-4 sm:p-6 flex flex-col shadow-2xl ${className}`}
      role="region"
      aria-label="Kendall W Inter-Annual Concordance Analysis"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F8FAFC]/10">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
            Non-Parametric Statistical Concordance · Kendall&apos;s W Framework
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-1">
            Do the 12 calendar monthly rankings repeat across years?
          </h3>
          <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl leading-relaxed">
            Kendall&apos;s coefficient of concordance (W) tests whether the 12 calendar months maintain identical relative rank order across all 4 independent baseline years (evaluated at α = 0.05).
          </p>
        </div>

        {/* Significance Badge & Replay */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReplay}
            className="px-3 py-1.5 bg-[#06080F] hover:bg-[#1A2234] border border-[#F8FAFC]/15 text-[#D4AF37] hover:text-[#F5D061] rounded-sm font-mono text-xs flex items-center gap-1.5 transition-colors"
            title="Reconstruct rank trajectory paths"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reconstruct Trajectories</span>
          </button>

          <div
            className={`px-3.5 py-1.5 rounded-sm border font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 ${
              active.isSignificant
                ? "border-[#10B981]/60 text-[#10B981] bg-[#10B981]/15 font-bold shadow-sm"
                : "border-[#F8FAFC]/15 text-[#94A3B8] bg-[#06080F]"
            }`}
          >
            {active.isSignificant ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Statistically Significant (p &lt; 0.05)</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-[#94A3B8]" />
                <span>Non-Significant Trend (p ≥ 0.05)</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cohort Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {KENDALL_DATA.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setSelectedKey(item.key);
              handleReplay();
            }}
            className={`font-mono text-xs uppercase tracking-wider px-3.5 py-2 rounded-sm border transition-all ${
              selectedKey === item.key
                ? "border-[#00F0FF] bg-[#00F0FF]/15 text-[#F8FAFC] font-bold shadow-lg"
                : "border-[#F8FAFC]/15 text-[#94A3B8] hover:border-[#F8FAFC]/30 bg-[#06080F]"
            }`}
          >
            <span style={{ color: item.color }} className="mr-1.5">●</span>
            {item.shortName} (W = {item.w.toFixed(3)})
          </button>
        ))}
      </div>

      {/* Exhibit 1: Alluvial / Rank Trajectory Chart Across 4 Baseline Years */}
      <div className="p-4 sm:p-5 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm mb-6">
        <div className="flex items-center justify-between font-mono text-xs text-[#94A3B8] uppercase tracking-wider mb-4">
          <span>Rank Trajectory Continuity (2022–2025 Baseline) · {active.name}</span>
          <span className="font-bold" style={{ color: active.color }}>
            Primary Month: {primaryMonth}
          </span>
        </div>

        <div className="relative w-full aspect-[21/9] min-h-[250px]">
          <svg key={animKey} viewBox="0 0 720 260" className="w-full h-full overflow-visible">
            {/* Rank Gridlines & Labels */}
            {[1, 2, 3, 4].map((r, i) => (
              <g key={r}>
                <line x1="80" y1={rankY[i]} x2="640" y2={rankY[i]} stroke="#F8FAFC" strokeOpacity="0.08" strokeDasharray="3 3" />
                <text x="65" y={rankY[i] + 4} textAnchor="end" className="font-mono text-[10px] fill-[#94A3B8] font-bold">
                  Rank #{r}
                </text>
              </g>
            ))}

            {/* Year Column Guides */}
            {years.map((yr, idx) => (
              <g key={yr}>
                <line x1={colX[idx]} y1="35" x2={colX[idx]} y2="230" stroke="#F8FAFC" strokeOpacity="0.12" strokeWidth="1" />
                <text x={colX[idx]} y="28" textAnchor="middle" className="font-mono text-[11px] font-bold fill-[#F8FAFC]">
                  {yr}
                </text>
              </g>
            ))}

            {/* Traced Continuous Trajectory Path for Primary Month */}
            <path
              d={trajectoryPath}
              fill="none"
              stroke={active.color}
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-construct-stroke"
              style={{
                strokeDasharray: 900,
                strokeDashoffset: 0,
                filter: `drop-shadow(0 0 8px ${active.color}80)`
              }}
            />

            {/* Year-by-Year Rank Nodes for all top 4 months */}
            {active.annualRanks.map((yrData, yIdx) => {
              const cx = colX[yIdx];
              return (
                <g key={yrData.year}>
                  {yrData.ranks.map((rObj) => {
                    const cy = rankY[rObj.rank - 1];
                    const isPrimary = rObj.month === primaryMonth;

                    return (
                      <g key={rObj.month} className="cursor-pointer">
                        {/* Node circle */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isPrimary ? 16 : 12}
                          fill={isPrimary ? active.color : "#0B111E"}
                          stroke={isPrimary ? "#F8FAFC" : "#F8FAFC/25"}
                          strokeWidth={isPrimary ? 2 : 1}
                        />
                        {/* Month text label */}
                        <text
                          x={cx}
                          y={cy + 4}
                          textAnchor="middle"
                          className="font-mono text-[10px] font-bold"
                          fill={isPrimary ? "#06080F" : "#F8FAFC"}
                        >
                          {rObj.month}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs font-mono text-[#94A3B8]">
          <span>
            {active.isSignificant
              ? "★ Solid trajectory at Rank #1 illustrates persistent inter-annual peak timing."
              : "Oscillating trajectory illustrates peak month variation across baseline years."}
          </span>
          <span className="text-[#00F0FF]">Scale: Rank #1 = Highest Monthly Volume</span>
        </div>
      </div>

      {/* Exhibit 2: Comparative Kendall's W Dot Plot with Reference Threshold */}
      <div className="p-4 sm:p-5 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm">
        <div className="flex items-center justify-between font-mono text-xs text-[#94A3B8] uppercase tracking-wider mb-3">
          <span>Comparative Dot Plot: Kendall&apos;s W Concordance Scale (0.0 → 1.0)</span>
          <span className="text-[#10B981] font-bold">Significance Cutoff: α = 0.05 (W ≈ 0.48)</span>
        </div>

        <div className="space-y-3 pt-2 pb-2">
          {KENDALL_DATA.map((item) => {
            const isCurrent = item.key === selectedKey;
            const leftPct = item.w * 100;

            return (
              <div
                key={item.key}
                onClick={() => {
                  setSelectedKey(item.key);
                  handleReplay();
                }}
                className={`relative flex items-center h-9 px-3 rounded-sm cursor-pointer transition-all ${
                  isCurrent ? "bg-[#1E293B] border border-[#00F0FF]/50 shadow-md" : "hover:bg-[#0B111E]/70"
                }`}
              >
                {/* Disease Name */}
                <span className="w-32 shrink-0 font-mono text-xs font-bold truncate" style={{ color: item.color }}>
                  {item.shortName}
                </span>

                {/* Plot Axis Track */}
                <div className="relative flex-1 h-2 bg-[#0B111E] rounded-full mx-4 border border-[#F8FAFC]/10">
                  {/* Significance marker reference at W approx 0.48 */}
                  <div
                    className="absolute top-[-8px] bottom-[-8px] w-px bg-[#10B981] border-r border-dashed border-[#10B981] z-10"
                    style={{ left: "48%" }}
                  />

                  {/* Marker Dot Landing with exact numeric positioning */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-700 shadow-xl"
                    style={{
                      left: `${leftPct}%`,
                      backgroundColor: item.color,
                      boxShadow: isCurrent ? `0 0 16px ${item.color}` : "none",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#06080F]" />
                  </div>
                </div>

                {/* Stat Values */}
                <div className="w-28 text-right font-mono text-xs tabular-nums shrink-0">
                  <span className="font-bold text-[#F8FAFC]">W = {item.w.toFixed(3)}</span>
                  <span className="text-[#94A3B8] text-[10px] ml-1.5">p = {item.p}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alignment Summary & Statistical Context Bar */}
        <div className="mt-5 pt-4 border-t border-[#F8FAFC]/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div>
              <div className="font-mono text-[9px] uppercase text-[#94A3B8] tracking-wider">Concordance W</div>
              <div className="font-serif text-3xl font-bold" style={{ color: active.color }}>
                {active.w.toFixed(3)}
              </div>
            </div>
            <div className="border-l border-[#F8FAFC]/10 pl-6">
              <div className="font-mono text-[9px] uppercase text-[#94A3B8] tracking-wider">p-value</div>
              <div className={`font-serif text-3xl font-bold ${active.isSignificant ? "text-[#10B981]" : "text-[#F8FAFC]"}`}>
                {active.p}
              </div>
            </div>
          </div>

          <div className="max-w-md font-mono text-xs text-[#94A3B8] leading-relaxed">
            {active.explanation}
          </div>
        </div>
      </div>
    </div>
  );
}
