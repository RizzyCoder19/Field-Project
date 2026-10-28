"use client";

import React, { useState } from "react";
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

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

interface NativeKendallAlignmentProps {
  className?: string;
  activeCohort?: string;
  onSelectCohort?: (key: string) => void;
}

export default function NativeKendallAlignment({
  className = "",
  activeCohort,
  onSelectCohort,
}: NativeKendallAlignmentProps) {
  const [internalKey, setInternalKey] = useState("add");
  const [animKey, setAnimKey] = useState(0);
  const { ref, hasAnimated } = useInViewAnimation<HTMLDivElement>({ threshold: 0.15 });
  const selectedKey = activeCohort || internalKey;
  const setSelectedKey = (key: string) => {
    setInternalKey(key);
    onSelectCohort?.(key);
  };
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
      ref={ref}
      className={`w-full bg-[#0A1016] border border-white/[0.08] rounded-sm p-4 sm:p-6 flex flex-col shadow-2xl ${className}`}
      role="region"
      aria-label="Kendall W Inter-Annual Concordance Analysis"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#5FB0A8] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5FB0A8]" />
            Non-Parametric Statistical Concordance · Kendall&apos;s W Framework
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1E8] mt-1">
            Do the 12 calendar monthly rankings repeat across years?
          </h3>
          <p className="font-mono text-xs sm:text-sm text-[#A8B6BA] mt-1 max-w-2xl leading-relaxed">
            Kendall&apos;s coefficient of concordance (W) tests whether the 12 calendar months maintain identical relative rank order across all 4 independent baseline years (evaluated at α = 0.05).
          </p>
        </div>

        {/* Significance Badge & Replay */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReplay}
            className="px-3 py-1.5 bg-[#070A10] hover:bg-[#121922] border border-white/[0.08] text-[#D7B56D] hover:text-[#E8CD8C] rounded-sm font-mono text-xs flex items-center gap-1.5 transition-colors"
            title="Reconstruct rank trajectory paths"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reconstruct Trajectories</span>
          </button>

          <div
            className={`px-3.5 py-1.5 rounded-sm border font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 ${
              active.isSignificant
                ? "border-[#10B981]/50 text-[#10B981] bg-[#10B981]/10 font-bold"
                : "border-white/[0.08] text-[#A8B6BA] bg-[#070A10]"
            }`}
          >
            {active.isSignificant ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Statistically Significant (p &lt; 0.05)</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-[#A8B6BA]" />
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
                ? "border-[#5FB0A8] bg-[#5FB0A8]/15 text-[#F5F1E8] font-bold"
                : "border-white/[0.08] text-[#A8B6BA] hover:border-white/[0.2] bg-[#070A10]"
            }`}
          >
            <span style={{ color: item.color }} className="mr-1.5">●</span>
            {item.shortName} (W = {item.w.toFixed(3)})
          </button>
        ))}
      </div>

      {/* ── MOBILE VERSION (block lg:hidden): Annual Rank Alignment Cards ── */}
      <div className="block lg:hidden space-y-4 mb-6">
        <div className="p-4 bg-[#06080F] border border-white/10 rounded-sm space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-[#A8B6BA]">
            <span>Peak Month Continuity</span>
            <span className="font-bold text-[#D7B56D]">Primary: {primaryMonth}</span>
          </div>

          {/* 4 Years Vertical Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {active.annualRanks.map((yrData) => (
              <div
                key={yrData.year}
                className="bg-[#0B111E] border border-white/[0.08] p-3 rounded-xs space-y-2"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5 font-mono text-xs">
                  <span className="font-bold text-[#F5F1E8]">{yrData.year} Calendar Year</span>
                  <span className="text-[#87999E] text-[10px]">Top 4 Outbreak Months</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {yrData.ranks.map((rObj) => {
                    const isPrimary = rObj.month === primaryMonth;
                    return (
                      <div
                        key={rObj.month}
                        className={`p-2 rounded-xs text-center border font-mono transition-all ${
                          isPrimary
                            ? "bg-white/10 border-white/40 ring-1 ring-[#5FB0A8]"
                            : "bg-white/[0.02] border-white/[0.06]"
                        }`}
                      >
                        <div className="text-[9px] text-[#87999E]">#{rObj.rank}</div>
                        <div
                          className={`text-xs font-bold mt-0.5 ${
                            isPrimary ? "text-[#5FB0A8]" : "text-[#F5F1E8]"
                          }`}
                        >
                          {rObj.month}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs font-mono text-[#87999E] pt-1">
            {active.isSignificant
              ? "★ Primary peak month consistently maintains #1 or #2 rank across all four years."
              : "Peak timing shifts across years, failing the strict α = 0.05 threshold."}
          </div>
        </div>
      </div>

      {/* ── DESKTOP VERSION (hidden lg:block): SVG Bump Chart Across 4 Baseline Years ── */}
      <div className="hidden lg:block p-4 sm:p-5 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm mb-6">
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
              style={{
                strokeDasharray: 900,
                strokeDashoffset: hasAnimated ? 0 : 900,
                transition: "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1)",
                filter: `drop-shadow(0 0 8px ${active.color}80)`,
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

        <div className="mt-3 flex items-center justify-between text-xs font-mono text-[#A8B6BA]">
          <span>
            {active.isSignificant
              ? "★ Solid trajectory at Rank #1 illustrates persistent inter-annual peak timing."
              : "Oscillating trajectory illustrates peak month variation across baseline years."}
          </span>
          <span className="text-[#5FB0A8]">Scale: Rank #1 = Highest Monthly Volume</span>
        </div>
      </div>

      {/* Exhibit 2: Comparative Kendall's W Dot Plot with Reference Threshold */}
      <div className="p-4 sm:p-5 bg-[#070A10] border border-white/[0.06] rounded-sm">
        <div className="flex items-center justify-between font-mono text-xs text-[#A8B6BA] uppercase tracking-wider mb-3">
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
                  isCurrent ? "bg-[#131D26] border border-[#5FB0A8]/40 shadow-md" : "hover:bg-[#0A1016]/70"
                }`}
              >
                {/* Disease Name */}
                <span className="w-32 shrink-0 font-mono text-xs font-bold truncate" style={{ color: item.color }}>
                  {item.shortName}
                </span>

                {/* Plot Axis Track */}
                <div className="relative flex-1 h-2 bg-[#0A1016] rounded-full mx-4 border border-white/[0.08]">
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
                    <span className="w-2 h-2 rounded-full bg-[#070A10]" />
                  </div>
                </div>

                {/* Stat Values */}
                <div className="w-28 text-right font-mono text-xs tabular-nums shrink-0">
                  <span className="font-bold text-[#F5F1E8]">W = {item.w.toFixed(3)}</span>
                  <span className="text-[#A8B6BA] text-[10px] ml-1.5">p = {item.p}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alignment Summary & Statistical Context Bar */}
        <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div>
              <div className="font-mono text-[9px] uppercase text-[#A8B6BA] tracking-wider">Concordance W</div>
              <div className="font-serif text-3xl font-bold" style={{ color: active.color }}>
                {active.w.toFixed(3)}
              </div>
            </div>
            <div className="border-l border-white/[0.06] pl-6">
              <div className="font-mono text-[9px] uppercase text-[#A8B6BA] tracking-wider">p-value</div>
              <div className={`font-serif text-3xl font-bold ${active.isSignificant ? "text-[#10B981]" : "text-[#F5F1E8]"}`}>
                {active.p}
              </div>
            </div>
          </div>

          <div className="max-w-md font-mono text-xs text-[#A8B6BA] leading-relaxed">
            {active.explanation}
          </div>
        </div>
      </div>
    </div>
  );
}
