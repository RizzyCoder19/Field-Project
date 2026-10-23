"use client";

import React, { useState } from "react";
import { PRIMARY_DISEASES, MONTHS } from "@/data/researchData";

interface RadialSeasonalClockProps {
  focusedDisease?: string | null;
  onSelectDisease?: (diseaseId: string | null) => void;
  className?: string;
}

const DISEASES = [
  { id: "dengue", label: "Dengue Fever", color: "#38BDF8", peak: "Jun–Oct", cr3: "50.5%" },
  { id: "add", label: "ADD (Diarrheal)", color: "#10B981", peak: "Jun–Aug", cr3: "43.1%" },
  { id: "malaria", label: "Malaria", color: "#F59E0B", peak: "May–Jul", cr3: "51.4%" },
  { id: "foodPoisoning", label: "Food Poisoning", color: "#EF4444", peak: "Bimodal (Jan–Feb, Apr–May)", cr3: "44.9%" },
  { id: "chikungunya", label: "Chikungunya", color: "#A78BFA", peak: "Dispersed", cr3: "39.5%" },
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

  const cx = 320;
  const cy = 320;
  const outerR = 250;
  const innerR = 95;

  return (
    <div className={`relative flex flex-col items-center select-none w-full ${className}`}>
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5 z-10">
        <button
          onClick={() => handleDiseaseClick("")}
          className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm border transition-all ${
            !currentDisease
              ? "border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/15 font-bold shadow-lg"
              : "border-[#F8FAFC]/15 text-[#94A3B8] hover:text-[#F8FAFC] bg-[#06080F]"
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
              className="px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm border transition-all flex items-center gap-2"
              style={{
                borderColor: isSelected ? d.color : "rgba(212, 175, 55, 0.2)",
                backgroundColor: isSelected ? `${d.color}25` : "#06080F",
                color: isSelected ? "#F8FAFC" : "#94A3B8",
                fontWeight: isSelected ? "bold" : "normal",
                boxShadow: isSelected ? `0 0 12px ${d.color}40` : "none"
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              {d.label}
            </button>
          );
        })}
      </div>

      {/* SVG Radial Clock — Expanded and Huge (640x640 viewBox) */}
      <div className="relative w-full max-w-[620px] xl:max-w-[680px] aspect-square flex items-center justify-center">
        <svg viewBox="0 0 640 640" className="w-full h-full overflow-visible">
          <defs>
            <radialGradient id="clockBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#0B111E" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#06080F" stopOpacity="1" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Clock Base Circle with progressive construction stroke */}
          <circle
            cx={cx}
            cy={cy}
            r={outerR + 32}
            fill="url(#clockBg)"
            stroke="rgba(212, 175, 55, 0.3)"
            strokeWidth="2"
            className="animate-construct-stroke"
          />

          {/* Month Sectors (12 slices) */}
          {MONTHS.map((m, i) => {
            const r2 = (n: number) => Number(n.toFixed(2));
            const angleDeg = (i * 30) - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const nextAngleRad = ((angleDeg + 30) * Math.PI) / 180;
            const midAngleRad = ((angleDeg + 15) * Math.PI) / 180;

            const isHovered = hoveredMonth === i;

            // Coordinates for month label
            const labelR = outerR + 18;
            const lx = r2(cx + labelR * Math.cos(midAngleRad));
            const ly = r2(cy + labelR * Math.sin(midAngleRad));

            // Sector slice path for hover detection
            const x1 = r2(cx + innerR * Math.cos(angleRad));
            const y1 = r2(cy + innerR * Math.sin(angleRad));
            const x2 = r2(cx + (outerR + 4) * Math.cos(angleRad));
            const y2 = r2(cy + (outerR + 4) * Math.sin(angleRad));
            const x3 = r2(cx + (outerR + 4) * Math.cos(nextAngleRad));
            const y3 = r2(cy + (outerR + 4) * Math.sin(nextAngleRad));
            const x4 = r2(cx + innerR * Math.cos(nextAngleRad));
            const y4 = r2(cy + innerR * Math.sin(nextAngleRad));

            const sliceD = `M ${x1} ${y1} L ${x2} ${y2} A ${outerR + 4} ${outerR + 4} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 0 0 ${x1} ${y1} Z`;

            return (
              <g key={m}>
                {/* Interactive sector slice */}
                <path
                  d={sliceD}
                  fill={isHovered ? "rgba(0, 240, 255, 0.16)" : "transparent"}
                  stroke="rgba(212, 175, 55, 0.15)"
                  strokeWidth="0.8"
                  className="cursor-pointer transition-colors duration-200"
                  onMouseEnter={() => setHoveredMonth(i)}
                  onMouseLeave={() => setHoveredMonth(null)}
                />

                {/* Radial line separator */}
                <line
                  x1={r2(cx + (innerR - 12) * Math.cos(angleRad))}
                  y1={r2(cy + (innerR - 12) * Math.sin(angleRad))}
                  x2={r2(cx + (outerR + 8) * Math.cos(angleRad))}
                  y2={r2(cy + (outerR + 8) * Math.sin(angleRad))}
                  stroke="#F8FAFC"
                  strokeOpacity="0.18"
                  strokeDasharray="3,3"
                />

                {/* Month label - enlarged and prominent */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-mono text-sm tracking-wider pointer-events-none select-none"
                  fill={isHovered ? "#00F0FF" : "#F8FAFC"}
                  fillOpacity={isHovered ? 1 : 0.85}
                  fontWeight="bold"
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

            const maxEvents = Math.max(...disData.monthlyEvents, 1);
            const r2 = (n: number) => Number(n.toFixed(2));

            // Generate 12 radial points
            const polygonPoints = MONTHS.map((_, mIdx) => {
              const events = disData.monthlyEvents[mIdx] || 0;
              const midAngleDeg = (mIdx * 30 + 15) - 90;
              const rad = (midAngleDeg * Math.PI) / 180;
              const radius = innerR + 20 + (events / maxEvents) * (outerR - innerR - 30);
              return {
                x: r2(cx + radius * Math.cos(rad)),
                y: r2(cy + radius * Math.sin(rad)),
                events,
                mIdx
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
                  fillOpacity="0.22"
                  stroke={curMeta.color}
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  className="animate-construct-stroke"
                />

                {/* Data point beads */}
                {polygonPoints.map((pt) => {
                  const isPeak = pt.events === maxEvents;
                  return (
                    <g key={pt.mIdx}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isPeak ? 7 : 4.5}
                        fill={isPeak ? "#FFFFFF" : curMeta.color}
                        stroke={curMeta.color}
                        strokeWidth="2"
                        filter={isPeak ? "url(#glow)" : undefined}
                      />
                      {pt.events > 0 && (
                        <text
                          x={pt.x}
                          y={pt.y - 10}
                          textAnchor="middle"
                          className="font-mono text-xs font-bold fill-[#F8FAFC] pointer-events-none drop-shadow-lg"
                        >
                          {pt.events}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })()}

          {/* Disease Concentric Tracks & Bars */}
          {DISEASES.map((dis, trackIdx) => {
            const r2 = (n: number) => Number(n.toFixed(2));
            const diseaseKey = dis.id === "add" ? "add" : dis.id;
            const data = PRIMARY_DISEASES[diseaseKey];
            if (!data) return null;

            const isFocused = !currentDisease || currentDisease === dis.id;
            const trackR = innerR + 20 + trackIdx * 30; // 5 concentric tracks
            const maxVal = Math.max(...data.monthlyEvents);

            return (
              <g key={dis.id} opacity={isFocused ? 1 : 0.12} className="transition-opacity duration-300">
                {/* Track guideline */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={trackR}
                  fill="none"
                  stroke={dis.color}
                  strokeOpacity={isFocused ? 0.25 : 0.05}
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />

                {/* 12 monthly bars/arcs along this track */}
                {!currentDisease && MONTHS.map((_, mIdx) => {
                  const events = data.monthlyEvents[mIdx] || 0;
                  if (events === 0) return null;

                  const midAngleDeg = (mIdx * 30 + 15) - 90;
                  const rad = (midAngleDeg * Math.PI) / 180;
                  const barLen = 6 + (events / maxVal) * 22;
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
                        strokeWidth={isPeak ? 5.5 : 3.5}
                        strokeLinecap="round"
                        filter={isPeak ? "url(#glow)" : undefined}
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Center Hub — Analytical Interpretation */}
          <circle cx={cx} cy={cy} r={innerR - 6} fill="#06080F" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="2" />

          {/* Center Content with large, spacious typography */}
          {hoveredMonth !== null ? (
            <g className="pointer-events-none">
              <text x={cx} y={cy - 28} textAnchor="middle" className="font-serif text-xl font-bold" fill="#00F0FF">
                {MONTHS[hoveredMonth]}
              </text>
              <text x={cx} y={cy - 6} textAnchor="middle" className="font-mono text-[9px] uppercase tracking-wider" fill="#94A3B8">
                Total Baseline Outbreaks
              </text>
              <text x={cx} y={cy + 22} textAnchor="middle" className="font-mono text-2xl font-bold" fill="#F8FAFC">
                {DISEASES.reduce((acc, d) => {
                  const p = PRIMARY_DISEASES[d.id];
                  return acc + (p?.monthlyEvents[hoveredMonth] || 0);
                }, 0)}{" "}
                <tspan fontSize="11" fill="#94A3B8">events</tspan>
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
                    <text x={cx} y={cy - 28} textAnchor="middle" className="font-serif text-lg font-bold" fill={cur.color}>
                      {cur.label}
                    </text>
                    <text x={cx} y={cy - 8} textAnchor="middle" className="font-mono text-[10px] uppercase tracking-wider font-semibold" fill="#94A3B8">
                      Peak Window
                    </text>
                    <text x={cx} y={cy + 14} textAnchor="middle" className="font-serif text-sm font-bold" fill="#F8FAFC">
                      {cur.peak}
                    </text>
                    <text x={cx} y={cy + 32} textAnchor="middle" className="font-mono text-[9px] font-bold text-[#00F0FF]" fill="#00F0FF">
                      CR3 = {cur.cr3} of events
                    </text>
                  </>
                );
              })()}
            </g>
          ) : (
            <g className="pointer-events-none">
              <text x={cx} y={cy - 16} textAnchor="middle" className="font-serif text-base font-bold" fill="#F8FAFC">
                12-Month Clock
              </text>
              <text x={cx} y={cy + 4} textAnchor="middle" className="font-mono text-xs tracking-wider text-[#00F0FF] font-bold" fill="#00F0FF">
                2022–2025
              </text>
              <text x={cx} y={cy + 24} textAnchor="middle" className="font-mono text-[9px] text-[#94A3B8]" fill="#94A3B8">
                Hover month or click cohort
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Narrative Footer */}
      <div className="mt-5 text-center max-w-xl">
        <p className="font-mono text-xs text-[#94A3B8] leading-relaxed">
          {currentDisease === "dengue" && "Dengue: 73.0% of events occur in Jun–Oct. Strong post-monsoon vector proliferation."}
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
