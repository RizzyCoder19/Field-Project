"use client";

import React, { useState } from "react";
import { PRIMARY_DISEASES, MONTHS } from "@/data/researchData";
import { Activity, BarChart2, Layers } from "lucide-react";

interface RadialSeasonalClockProps {
  focusedDisease?: string | null;
  onSelectDisease?: (diseaseId: string | null) => void;
  className?: string;
  metric?: "events" | "cases";
  onMetricChange?: (metric: "events" | "cases") => void;
  showMetricToggle?: boolean;
}

const DISEASES = [
  { id: "dengue", label: "Dengue Fever", color: "#8B1414", peak: "Sep–Oct (Peak: Oct)", cr3: "50.5%", subtitle: "Vector Post-Monsoon" },
  { id: "add", label: "ADD (Diarrheal)", color: "#5A7A72", peak: "Jun–Aug (Onset Surge)", cr3: "43.1%", subtitle: "Waterborne Monsoon" },
  { id: "malaria", label: "Malaria", color: "#C9944A", peak: "May–Jul (Tribal Focus)", cr3: "51.4%", subtitle: "61.4% Vidarbha Forest" },
  { id: "foodPoisoning", label: "Food Poisoning", color: "#A83C28", peak: "Jan–Feb & Apr–May", cr3: "44.9%", subtitle: "Bimodal Banquet Timing" },
  { id: "chikungunya", label: "Chikungunya", color: "#7E6080", peak: "Dispersed Cycle", cr3: "39.5%", subtitle: "W = 0.150 Low Stability" },
];

export default function RadialSeasonalClock({
  focusedDisease = null,
  onSelectDisease,
  className = "",
  metric: controlledMetric,
  onMetricChange,
  showMetricToggle = true,
}: RadialSeasonalClockProps) {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [activeDisease, setActiveDisease] = useState<string | null>(focusedDisease);
  const [internalMetric, setInternalMetric] = useState<"events" | "cases">("events");

  const currentMetric = controlledMetric !== undefined ? controlledMetric : internalMetric;
  const currentDisease = focusedDisease !== undefined ? focusedDisease : activeDisease;

  const handleDiseaseClick = (id: string | null) => {
    const next = currentDisease === id ? null : id;
    setActiveDisease(next);
    if (onSelectDisease) onSelectDisease(next);
  };

  const handleMetricToggle = (m: "events" | "cases") => {
    setInternalMetric(m);
    if (onMetricChange) onMetricChange(m);
  };

  // Geometry dimensions for expansive, high-readability 720x720 canvas
  const cx = 360;
  const cy = 360;
  const outerR = 285;
  const innerR = 115;

  return (
    <div className={`relative flex flex-col items-center select-none w-full ${className}`}>
      {/* Top Filter Buttons & Metric Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 w-full z-10 border-b border-white/[0.08] pb-3">
        {/* Cohort Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleDiseaseClick(null)}
            className={`px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider rounded-xs border transition-all cursor-pointer ${
              !currentDisease
                ? "border-[#590907] text-[#E8D2B5] bg-[#590907] font-bold shadow-md"
                : "border-white/[0.10] text-[#A5A79B] hover:text-[#E8D2B5] bg-[#07090C]"
            }`}
          >
            All 5 Cohorts
          </button>

          {DISEASES.map((d) => {
            const isSelected = currentDisease === d.id;
            return (
              <button
                key={d.id}
                onClick={() => handleDiseaseClick(d.id)}
                className="px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider rounded-xs border transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                style={{
                  borderColor: isSelected ? "#590907" : "rgba(232, 210, 181, 0.18)",
                  backgroundColor: isSelected ? "rgba(89, 9, 7, 0.45)" : "#07090C",
                  color: isSelected ? "#E8D2B5" : "#A5A79B",
                  fontWeight: isSelected ? "bold" : "normal",
                  boxShadow: isSelected ? "0 0 14px rgba(89, 9, 7, 0.55)" : "none",
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white/20" style={{ backgroundColor: d.color }} />
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>

        {/* Metric Selector (Events vs Cases) */}
        {showMetricToggle && (
          <div className="flex items-center p-1 bg-[#07090C] border border-[#E8D2B5]/20 rounded-xs">
            <button
              onClick={() => handleMetricToggle("events")}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-2xs transition-all cursor-pointer ${
                currentMetric === "events"
                  ? "bg-[#590907] text-[#E8D2B5] font-bold border border-[#E8D2B5]/30 shadow-sm"
                  : "text-[#A5A79B] hover:text-[#E8D2B5]"
              }`}
            >
              Outbreaks
            </button>
            <button
              onClick={() => handleMetricToggle("cases")}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-2xs transition-all cursor-pointer ${
                currentMetric === "cases"
                  ? "bg-[#590907] text-[#E8D2B5] font-bold border border-[#E8D2B5]/30 shadow-sm"
                  : "text-[#A5A79B] hover:text-[#E8D2B5]"
              }`}
            >
              Reported Cases
            </button>
          </div>
        )}
      </div>

      {/* SVG Radial Clock Stage — Grand & Spacious (720x720 viewBox) */}
      <div className="relative w-full max-w-[620px] sm:max-w-[660px] lg:max-w-[700px] aspect-square flex items-center justify-center">
        <svg viewBox="0 0 720 720" className="w-full h-full overflow-visible">
          <defs>
            <radialGradient id="radialClockBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0B0E13" stopOpacity="0.98" />
              <stop offset="70%" stopColor="#07090C" stopOpacity="0.99" />
              <stop offset="100%" stopColor="#050709" stopOpacity="1" />
            </radialGradient>

            <filter id="clockGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Clock Base Circle with Double Ring Perimeter */}
          <circle
            cx={cx}
            cy={cy}
            r={outerR + 36}
            fill="url(#radialClockBg)"
            stroke="rgba(232, 210, 181, 0.20)"
            strokeWidth="1.8"
          />
          <circle
            cx={cx}
            cy={cy}
            r={outerR + 24}
            fill="none"
            stroke="#590907"
            strokeWidth="1"
            strokeOpacity="0.4"
          />

          {/* 12-Month Sectors (30° slices) */}
          {MONTHS.map((m, i) => {
            const r2 = (n: number) => Number(n.toFixed(2));
            const angleDeg = i * 30 - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const nextAngleRad = ((angleDeg + 30) * Math.PI) / 180;
            const midAngleRad = ((angleDeg + 15) * Math.PI) / 180;

            const isHovered = hoveredMonth === i;
            // Monsoon season months (Jun to Nov) highlighted with delicate tone
            const isMonsoon = i >= 5 && i <= 10;

            // Month Label Position
            const labelR = outerR + 18;
            const lx = r2(cx + labelR * Math.cos(midAngleRad));
            const ly = r2(cy + labelR * Math.sin(midAngleRad));

            // Sector Slice Path for Hover Detection
            const x1 = r2(cx + innerR * Math.cos(angleRad));
            const y1 = r2(cy + innerR * Math.sin(angleRad));
            const x2 = r2(cx + (outerR + 6) * Math.cos(angleRad));
            const y2 = r2(cy + (outerR + 6) * Math.sin(angleRad));
            const x3 = r2(cx + (outerR + 6) * Math.cos(nextAngleRad));
            const y3 = r2(cy + (outerR + 6) * Math.sin(nextAngleRad));
            const x4 = r2(cx + innerR * Math.cos(nextAngleRad));
            const y4 = r2(cy + innerR * Math.sin(nextAngleRad));

            const sliceD = `M ${x1} ${y1} L ${x2} ${y2} A ${outerR + 6} ${outerR + 6} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 0 0 ${x1} ${y1} Z`;

            return (
              <g key={m}>
                {/* Interactive Sector Slice */}
                <path
                  d={sliceD}
                  fill={isHovered ? "rgba(89, 9, 7, 0.35)" : isMonsoon ? "rgba(165, 167, 155, 0.04)" : "transparent"}
                  stroke="rgba(232, 210, 181, 0.14)"
                  strokeWidth="0.8"
                  className="cursor-pointer transition-colors duration-200"
                  onMouseEnter={() => setHoveredMonth(i)}
                  onMouseLeave={() => setHoveredMonth(null)}
                />

                {/* Radial Line Separator */}
                <line
                  x1={r2(cx + (innerR - 10) * Math.cos(angleRad))}
                  y1={r2(cy + (innerR - 10) * Math.sin(angleRad))}
                  x2={r2(cx + (outerR + 10) * Math.cos(angleRad))}
                  y2={r2(cy + (outerR + 10) * Math.sin(angleRad))}
                  stroke="#E8D2B5"
                  strokeOpacity="0.18"
                  strokeDasharray="3,4"
                />

                {/* Month Label — Bold and Crisp in Warm Cream */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="13"
                  className="font-mono tracking-wider pointer-events-none select-none transition-colors"
                  fill={isHovered ? "#E8D2B5" : isMonsoon ? "#F5E8D7" : "#A5A79B"}
                  fontWeight={isHovered || isMonsoon ? "bold" : "600"}
                >
                  {m}
                </text>
              </g>
            );
          })}

          {/* Continuous Seasonal Radar Polygon Wave when a single disease is focused */}
          {currentDisease && (() => {
            const disData = PRIMARY_DISEASES[currentDisease];
            const curMeta = DISEASES.find((d) => d.id === currentDisease);
            if (!disData || !curMeta) return null;

            const valuesArr = currentMetric === "events" ? disData.monthlyEvents : disData.monthlyCases;
            const maxVal = Math.max(...valuesArr, 1);
            const r2 = (n: number) => Number(n.toFixed(2));

            // Generate 12 radial points
            const polygonPoints = MONTHS.map((_, mIdx) => {
              const val = valuesArr[mIdx] || 0;
              const midAngleDeg = mIdx * 30 + 15 - 90;
              const rad = (midAngleDeg * Math.PI) / 180;
              const radius = innerR + 15 + (val / maxVal) * (outerR - innerR - 25);
              return {
                x: r2(cx + radius * Math.cos(rad)),
                y: r2(cy + radius * Math.sin(rad)),
                val,
                mIdx,
              };
            });

            const pathD = polygonPoints.reduce((acc, pt, idx) => {
              return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
            }, "") + " Z";

            return (
              <g className="transition-all duration-500">
                {/* Filled shaded seasonal area */}
                <path
                  d={pathD}
                  fill={curMeta.color}
                  fillOpacity="0.25"
                  stroke={curMeta.color}
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />

                {/* Data point beads */}
                {polygonPoints.map((pt) => {
                  const isPeak = pt.val === maxVal;
                  return (
                    <g key={pt.mIdx}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isPeak ? 7.5 : 4.5}
                        fill={isPeak ? "#E8D2B5" : curMeta.color}
                        stroke="#07090C"
                        strokeWidth="1.8"
                        filter={isPeak ? "url(#clockGlow)" : undefined}
                      />
                      {pt.val > 0 && (
                        <text
                          x={pt.x}
                          y={pt.y - 10}
                          textAnchor="middle"
                          fontSize="11"
                          className="font-mono font-bold fill-[#E8D2B5] pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                        >
                          {pt.val}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })()}

          {/* Disease Concentric Tracks & Bars when "All Cohorts" is active */}
          {DISEASES.map((dis, trackIdx) => {
            const r2 = (n: number) => Number(n.toFixed(2));
            const diseaseKey = dis.id === "add" ? "add" : dis.id;
            const data = PRIMARY_DISEASES[diseaseKey];
            if (!data) return null;

            const isFocused = !currentDisease || currentDisease === dis.id;
            const trackR = innerR + 25 + trackIdx * 32; // 5 concentric rings
            const valuesArr = currentMetric === "events" ? data.monthlyEvents : data.monthlyCases;
            const maxVal = Math.max(...valuesArr, 1);

            return (
              <g key={dis.id} opacity={isFocused ? 1 : 0.12} className="transition-opacity duration-300">
                {/* Concentric track guideline */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={trackR}
                  fill="none"
                  stroke={dis.color}
                  strokeOpacity={isFocused ? 0.35 : 0.08}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* 12 monthly bars along this track */}
                {!currentDisease && MONTHS.map((_, mIdx) => {
                  const val = valuesArr[mIdx] || 0;
                  if (val === 0) return null;

                  const midAngleDeg = mIdx * 30 + 15 - 90;
                  const rad = (midAngleDeg * Math.PI) / 180;
                  const barLen = 7 + (val / maxVal) * 25;
                  const bx1 = r2(cx + (trackR - barLen / 2) * Math.cos(rad));
                  const by1 = r2(cy + (trackR - barLen / 2) * Math.sin(rad));
                  const bx2 = r2(cx + (trackR + barLen / 2) * Math.cos(rad));
                  const by2 = r2(cy + (trackR + barLen / 2) * Math.sin(rad));
                  const isPeak = val === maxVal;

                  return (
                    <g key={mIdx}>
                      <line
                        x1={bx1}
                        y1={by1}
                        x2={bx2}
                        y2={by2}
                        stroke={dis.color}
                        strokeWidth={isPeak ? 5 : 3.2}
                        strokeLinecap="round"
                        filter={isPeak ? "url(#clockGlow)" : undefined}
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Center Hub — Analytical Interpretation Stage */}
          <circle
            cx={cx}
            cy={cy}
            r={innerR - 6}
            fill="#07090C"
            stroke="#590907"
            strokeWidth="2.2"
          />
          <circle
            cx={cx}
            cy={cy}
            r={innerR - 16}
            fill="none"
            stroke="#E8D2B5"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="2,3"
          />

          {/* Center Content Typography with proportional SVG fontSize */}
          {hoveredMonth !== null ? (
            <g className="pointer-events-none">
              <text x={cx} y={cy - 28} textAnchor="middle" fontSize="24" className="font-serif font-bold" fill="#E8D2B5">
                {MONTHS[hoveredMonth]}
              </text>
              <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" className="font-mono uppercase tracking-wider" fill="#A5A79B">
                Total Baseline {currentMetric === "events" ? "Outbreaks" : "Cases"}
              </text>
              <text x={cx} y={cy + 24} textAnchor="middle" fontSize="22" className="font-mono font-bold" fill="#E8D2B5">
                {DISEASES.reduce((acc, d) => {
                  const p = PRIMARY_DISEASES[d.id];
                  const arr = currentMetric === "events" ? p?.monthlyEvents : p?.monthlyCases;
                  return acc + (arr?.[hoveredMonth] || 0);
                }, 0).toLocaleString()}{" "}
                <tspan fontSize="11" fill="#A5A79B">
                  {currentMetric === "events" ? "records" : "cases"}
                </tspan>
              </text>
            </g>
          ) : currentDisease ? (
            <g className="pointer-events-none">
              {(() => {
                const cur = DISEASES.find((d) => d.id === currentDisease);
                const prof = PRIMARY_DISEASES[currentDisease];
                if (!cur || !prof) return null;
                return (
                  <>
                    <text x={cx} y={cy - 30} textAnchor="middle" fontSize="20" className="font-serif font-bold" fill={cur.color}>
                      {cur.label}
                    </text>
                    <text x={cx} y={cy - 10} textAnchor="middle" fontSize="10.5" className="font-mono uppercase tracking-wider font-semibold" fill="#A5A79B">
                      Peak Timing
                    </text>
                    <text x={cx} y={cy + 12} textAnchor="middle" fontSize="16" className="font-serif font-bold" fill="#E8D2B5">
                      {cur.peak}
                    </text>
                    <text x={cx} y={cy + 32} textAnchor="middle" fontSize="11" className="font-mono font-bold" fill="#E8D2B5">
                      CR3 = {cur.cr3} of events
                    </text>
                  </>
                );
              })()}
            </g>
          ) : (
            <g className="pointer-events-none">
              <text x={cx} y={cy - 18} textAnchor="middle" fontSize="18" className="font-serif font-bold" fill="#E8D2B5">
                12-Month Clock
              </text>
              <text x={cx} y={cy + 5} textAnchor="middle" fontSize="11.5" className="font-mono tracking-widest uppercase font-bold" fill="#590907">
                2022–2025 BASELINE
              </text>
              <text x={cx} y={cy + 26} textAnchor="middle" fontSize="10.5" className="font-mono" fill="#A5A79B">
                Hover month or select cohort
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Narrative Footer Callout */}
      <div className="mt-5 text-center max-w-xl">
        <p className="font-mono text-xs text-[#A5A79B] leading-relaxed">
          {currentDisease === "dengue" && "Dengue: 73.0% of events occur in Jun–Oct. Strong post-monsoon Aedes vector proliferation peaking in October."}
          {currentDisease === "add" && "ADD: High early-monsoon surge in Jun–Aug plus secondary post-monsoon peak. Kendall's W = 0.530 (p = 0.016, statistically significant)."}
          {currentDisease === "malaria" && "Malaria: Pre-monsoon & onset surge in May–Jul. 61.4% concentrated in Gadchiroli + Chandrapur tribal forest belt."}
          {currentDisease === "foodPoisoning" && "Food Poisoning: Bimodal non-monsoon timing (Jan–Feb & Apr–May). Highly driven by community banquet catering gatherings."}
          {currentDisease === "chikungunya" && "Chikungunya: Low baseline volume dispersed across months without stable recurring seasonality (W = 0.150)."}
          {!currentDisease && "Concentric seasonal rings reveal distinct temporal niches: Malaria peaks early (May–Jul), ADD spans the monsoon, Dengue rises late (Aug–Oct), and Food Poisoning is non-monsoonal."}
        </p>
      </div>
    </div>
  );
}
