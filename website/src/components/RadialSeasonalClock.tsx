"use client";

import React, { useState } from "react";
import { PRIMARY_DISEASES, MONTHS } from "@/data/researchData";

interface RadialSeasonalClockProps {
  focusedDisease?: string | null;
  onSelectDisease?: (diseaseId: string | null) => void;
  className?: string;
}

const DISEASES = [
  { id: "dengue", label: "Dengue", color: "#38BDF8", peak: "Jun–Oct", cr3: "50.5%" },
  { id: "add", label: "ADD", color: "#10B981", peak: "Jun–Aug", cr3: "43.1%" },
  { id: "malaria", label: "Malaria", color: "#D4AF37", peak: "May–Jul", cr3: "51.4%" },
  { id: "foodPoisoning", label: "Food Poisoning", color: "#EF4444", peak: "Bimodal (Jan–Feb, Apr–May)", cr3: "44.9%" },
  { id: "chikungunya", label: "Chikungunya", color: "#A78BFA", peak: "Dispersed", cr3: "41.9%" },
];

export default function RadialSeasonalClock({
  focusedDisease = null,
  onSelectDisease,
  className = "",
}: RadialSeasonalClockProps) {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [activeDisease, setActiveDisease] = useState<string | null>(focusedDisease);

  const currentDisease = focusedDisease !== undefined ? focusedDisease : activeDisease;

  const handleDiseaseClick = (id: string) => {
    const next = currentDisease === id ? null : id;
    setActiveDisease(next);
    if (onSelectDisease) onSelectDisease(next);
  };

  const cx = 260;
  const cy = 260;
  const outerR = 210;
  const innerR = 75;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4 z-10">
        <button
          onClick={() => handleDiseaseClick("")}
          className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider rounded border transition-all ${
            !currentDisease
              ? "border-[#C7A75B] text-[#C7A75B] bg-[#C7A75B]/10 font-bold"
              : "border-[#EEE8DA]/15 text-[#B5B0A4]/70 hover:text-[#EEE8DA]"
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
              className="px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider rounded border transition-all flex items-center gap-1.5"
              style={{
                borderColor: isSelected ? d.color : "rgba(238,232,218,0.12)",
                backgroundColor: isSelected ? `${d.color}20` : "transparent",
                color: isSelected ? d.color : "rgba(238,232,218,0.5)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
              {d.label}
            </button>
          );
        })}
      </div>

      {/* SVG Radial Clock */}
      <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center">
        <svg viewBox="0 0 520 520" className="w-full h-full">
          <defs>
            {/* Dark background radial gradient */}
            <radialGradient id="clockBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111A2B" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#0B0F0B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#080A08" stopOpacity="1" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Clock Base Circle */}
          <circle cx={cx} cy={cy} r={outerR + 25} fill="url(#clockBg)" stroke="#EEE8DA" strokeOpacity="0.08" strokeWidth="1" />

          {/* Month Sectors (12 slices) */}
          {MONTHS.map((m, i) => {
            const r2 = (n: number) => Number(n.toFixed(2));
            const angleDeg = (i * 30) - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const nextAngleRad = ((angleDeg + 30) * Math.PI) / 180;
            const midAngleRad = ((angleDeg + 15) * Math.PI) / 180;

            const isHovered = hoveredMonth === i;

            // Coordinates for month label
            const labelR = outerR + 14;
            const lx = r2(cx + labelR * Math.cos(midAngleRad));
            const ly = r2(cy + labelR * Math.sin(midAngleRad));

            // Sector slice path for hover detection
            const x1 = r2(cx + innerR * Math.cos(angleRad));
            const y1 = r2(cy + innerR * Math.sin(angleRad));
            const x2 = r2(cx + (outerR + 2) * Math.cos(angleRad));
            const y2 = r2(cy + (outerR + 2) * Math.sin(angleRad));
            const x3 = r2(cx + (outerR + 2) * Math.cos(nextAngleRad));
            const y3 = r2(cy + (outerR + 2) * Math.sin(nextAngleRad));
            const x4 = r2(cx + innerR * Math.cos(nextAngleRad));
            const y4 = r2(cy + innerR * Math.sin(nextAngleRad));

            const sliceD = `M ${x1} ${y1} L ${x2} ${y2} A ${outerR + 2} ${outerR + 2} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 0 0 ${x1} ${y1} Z`;

            return (
              <g key={m}>
                {/* Interactive sector slice */}
                <path
                  d={sliceD}
                  fill={isHovered ? "rgba(199,167,91,0.12)" : "transparent"}
                  stroke="rgba(238,232,218,0.06)"
                  strokeWidth="0.5"
                  className="cursor-pointer transition-colors duration-200"
                  onMouseEnter={() => setHoveredMonth(i)}
                  onMouseLeave={() => setHoveredMonth(null)}
                />

                {/* Radial line separator */}
                <line
                  x1={r2(cx + (innerR - 10) * Math.cos(angleRad))}
                  y1={r2(cy + (innerR - 10) * Math.sin(angleRad))}
                  x2={r2(cx + (outerR + 5) * Math.cos(angleRad))}
                  y2={r2(cy + (outerR + 5) * Math.sin(angleRad))}
                  stroke="#EEE8DA"
                  strokeOpacity="0.1"
                  strokeDasharray="2,3"
                />

                {/* Month label */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-mono text-[10px] tracking-wider pointer-events-none"
                  fill={isHovered ? "#C7A75B" : "#EEE8DA"}
                  fillOpacity={isHovered ? 1 : 0.6}
                  fontWeight={isHovered ? "bold" : "normal"}
                >
                  {m}
                </text>
              </g>
            );
          })}

          {/* Disease Concentric Tracks & Bars */}
          {DISEASES.map((dis, trackIdx) => {
            const r2 = (n: number) => Number(n.toFixed(2));
            const diseaseKey = dis.id === "add" ? "add" : dis.id;
            const data = PRIMARY_DISEASES[diseaseKey];
            if (!data) return null;

            const isFocused = !currentDisease || currentDisease === dis.id;
            const trackR = innerR + 15 + trackIdx * 25; // 5 concentric tracks

            // Peak max for normalization
            const maxVal = Math.max(...data.monthlyEvents);

            return (
              <g key={dis.id} opacity={isFocused ? 1 : 0.15} className="transition-opacity duration-300">
                {/* Track guideline */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={trackR}
                  fill="none"
                  stroke={dis.color}
                  strokeOpacity={isFocused ? 0.15 : 0.04}
                  strokeWidth="1"
                />

                {/* 12 monthly bars/arcs along this track */}
                {MONTHS.map((_, mIdx) => {
                  const events = data.monthlyEvents[mIdx] || 0;
                  if (events === 0) return null;

                  const midAngleDeg = (mIdx * 30 + 15) - 90;
                  const rad = (midAngleDeg * Math.PI) / 180;

                  // Bar length proportional to event count
                  const barLen = 4 + (events / maxVal) * 16;
                  const bx1 = r2(cx + (trackR - barLen / 2) * Math.cos(rad));
                  const by1 = r2(cy + (trackR - barLen / 2) * Math.sin(rad));
                  const bx2 = r2(cx + (trackR + barLen / 2) * Math.cos(rad));
                  const by2 = r2(cy + (trackR + barLen / 2) * Math.sin(rad));

                  const isPeak = events === maxVal;

                  return (
                    <g key={mIdx}>
                      <line
                        x1={bx1}
                        y1={by1}
                        x2={bx2}
                        y2={by2}
                        stroke={dis.color}
                        strokeWidth={isPeak ? 4.5 : 3}
                        strokeLinecap="round"
                        filter={isPeak && isFocused ? "url(#glow)" : undefined}
                      />
                      {isPeak && isFocused && (
                        <circle
                          cx={bx2}
                          cy={by2}
                          r={2}
                          fill="#FFF"
                          opacity={0.9}
                        />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Center Hub — Analytical Interpretation */}
          <circle cx={cx} cy={cy} r={innerR - 8} fill="#0d1107" stroke="#EEE8DA" strokeOpacity="0.15" strokeWidth="1" />

          {/* Center Content */}
          {hoveredMonth !== null ? (
            <g className="pointer-events-none">
              <text x={cx} y={cy - 24} textAnchor="middle" className="font-serif text-sm font-bold" fill="#C7A75B">
                {MONTHS[hoveredMonth]}
              </text>
              <text x={cx} y={cy - 6} textAnchor="middle" className="font-mono text-[8px] uppercase tracking-wider" fill="#B5B0A4">
                Total Baseline Outbreaks
              </text>
              <text x={cx} y={cy + 16} textAnchor="middle" className="font-mono text-base font-bold" fill="#EEE8DA">
                {DISEASES.reduce((acc, d) => {
                  const p = PRIMARY_DISEASES[d.id];
                  return acc + (p?.monthlyEvents[hoveredMonth] || 0);
                }, 0)}{" "}
                <tspan fontSize="9" fill="#B5B0A4">events</tspan>
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
                    <text x={cx} y={cy - 22} textAnchor="middle" className="font-serif text-sm font-bold" fill={cur.color}>
                      {cur.label}
                    </text>
                    <text x={cx} y={cy - 5} textAnchor="middle" className="font-mono text-[8px] uppercase tracking-wider" fill="#B5B0A4">
                      Peak Concentration
                    </text>
                    <text x={cx} y={cy + 11} textAnchor="middle" className="font-serif text-xs font-bold" fill="#EEE8DA">
                      {cur.peak}
                    </text>
                    <text x={cx} y={cy + 25} textAnchor="middle" className="font-mono text-[7px]" fill="#C7A75B">
                      CR3 = {cur.cr3} of events
                    </text>
                  </>
                );
              })()}
            </g>
          ) : (
            <g className="pointer-events-none">
              <text x={cx} y={cy - 14} textAnchor="middle" className="font-serif text-xs font-bold" fill="#EEE8DA">
                12-Month Clock
              </text>
              <text x={cx} y={cy + 2} textAnchor="middle" className="font-mono text-[8px] tracking-wider text-[#C7A75B]" fill="#C7A75B">
                2022–2025
              </text>
              <text x={cx} y={cy + 18} textAnchor="middle" className="font-mono text-[7px] text-[#B5B0A4]/60" fill="#B5B0A4">
                Hover month or click cohort
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Narrative Footer */}
      <div className="mt-4 text-center max-w-lg">
        <p className="font-mono text-[10px] text-[#B5B0A4] leading-relaxed">
          {currentDisease === "dengue" && "Dengue: 82.8% of events occur in Jun–Oct. Strong post-monsoon vector proliferation."}
          {currentDisease === "add" && "ADD: High early-monsoon surge in Jun–Aug plus secondary post-monsoon peak. Kendall's W = 0.530 (p = 0.016)."}
          {currentDisease === "malaria" && "Malaria: Pre-monsoon & onset surge in May–Jul. 61.4% concentrated in Gadchiroli + Chandrapur."}
          {currentDisease === "foodPoisoning" && "Food Poisoning: Bimodal non-monsoon timing (Jan–Feb & Apr–May). Highly sensitive to point-source cluster sizes."}
          {currentDisease === "chikungunya" && "Chikungunya: Low baseline volume dispersed across months without stable recurring seasonality (W = 0.150)."}
          {!currentDisease && "Concentric seasonal rings reveal distinct temporal niches: Malaria peaks early (May–Jul), ADD spans the monsoon, Dengue rises late (Aug–Oct), and Food Poisoning is non-monsoonal."}
        </p>
      </div>
    </div>
  );
}
