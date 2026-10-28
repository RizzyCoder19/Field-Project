"use client";

import React, { useState } from "react";
import { MONTHS, PRIMARY_DISEASES } from "@/data/researchData";
import { RefreshCw } from "lucide-react";

export default function InteractiveSeasonalChart() {
  const [mode, setMode] = useState<"events" | "cases">("events");
  const [activeDisease, setActiveDisease] = useState<string>("dengue");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [animNonce, setAnimNonce] = useState<number>(0);

  const diseaseKeys = ["dengue", "add", "malaria", "foodPoisoning", "chikungunya"] as const;

  const diseaseColors: Record<string, string> = {
    dengue: "#38BDF8",         // analytical blue
    add: "#10B981",            // emerald green
    malaria: "#F59E0B",        // imperial gold
    foodPoisoning: "#EF4444",  // outlier ruby
    chikungunya: "#A78BFA",    // secondary purple
  };

  const diseaseNames: Record<string, string> = {
    dengue: "Dengue Fever",
    add: "ADD (Diarrheal)",
    malaria: "Malaria",
    foodPoisoning: "Food Poisoning",
    chikungunya: "Chikungunya",
  };

  const handleReconstruct = () => {
    setAnimNonce(n => n + 1);
  };

  // Compute maximum for Y-axis scale
  const displayedDiseases = showAll ? diseaseKeys : [activeDisease];
  const allValues = displayedDiseases.flatMap((key) => {
    const d = PRIMARY_DISEASES[key];
    return mode === "events" ? d.monthlyEvents : d.monthlyCases;
  });
  const maxY = Math.max(...allValues, 1);

  const selectedProfile = PRIMARY_DISEASES[activeDisease] || PRIMARY_DISEASES.dengue;

  return (
    <div
      className="w-full bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm p-4 sm:p-6 lg:p-8 space-y-6 shadow-2xl"
      role="region"
      aria-label="Interactive Seasonal Trajectory Chart"
    >
      {/* Top Controls: Mode & Disease Selector Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#F8FAFC]/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#5FB0A8] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5FB0A8] animate-pulse" />
            12-Month Outbreak Trajectory Matrix
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-1">
            Seasonal Distribution Profiles (2022–2025 Baseline)
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleReconstruct}
            className="px-2.5 py-1.5 bg-[#06080F] hover:bg-[#1A2234] border border-[#F8FAFC]/15 text-[#D4AF37] hover:text-[#F5D061] rounded-sm font-mono text-xs flex items-center gap-1.5 transition-colors"
            title="Reconstruct seasonal curves"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reconstruct Trajectory</span>
          </button>

          {/* Metric Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#06080F] p-1 rounded-sm border border-[#F8FAFC]/15 text-xs font-mono">
            <button
              onClick={() => {
                setMode("events");
                handleReconstruct();
              }}
              className={`px-3 py-1.5 rounded-sm transition-colors font-medium ${
                mode === "events"
                  ? "bg-[#5FB0A8] text-[#06080F] font-bold"
                  : "text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              Outbreaks (N=539)
            </button>
            <button
              onClick={() => {
                setMode("cases");
                handleReconstruct();
              }}
              className={`px-3 py-1.5 rounded-sm transition-colors font-medium ${
                mode === "cases"
                  ? "bg-[#5FB0A8] text-[#06080F] font-bold"
                  : "text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              Cases (N=20,955)
            </button>
          </div>
        </div>
      </div>

      {/* Disease Selector Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {diseaseKeys.map((key) => {
          const isSelected = !showAll && activeDisease === key;
          return (
            <button
              key={key}
              onClick={() => {
                setShowAll(false);
                setActiveDisease(key);
                handleReconstruct();
              }}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-sm transition-all border ${
                isSelected
                  ? "bg-[#1E293B] text-[#F8FAFC] border-[#5FB0A8] shadow-lg font-bold ring-1 ring-[#5FB0A8]/40"
                  : "bg-[#06080F] text-[#94A3B8] border-[#F8FAFC]/15 hover:border-[#F8FAFC]/30"
              }`}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ backgroundColor: diseaseColors[key] }} />
              {diseaseNames[key]}
            </button>
          );
        })}

        <button
          onClick={() => {
            setShowAll(true);
            handleReconstruct();
          }}
          className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-sm transition-all border ${
            showAll
              ? "bg-[#1E293B] text-[#5FB0A8] border-[#5FB0A8] shadow-lg font-bold ring-1 ring-[#5FB0A8]/40"
              : "bg-[#06080F] text-[#94A3B8] border-[#F8FAFC]/15 hover:border-[#F8FAFC]/30"
          }`}
        >
          Compare All 5 Cohorts
        </button>
      </div>

      {/* SVG Chart Area with Staged Self-Construction */}
      <div className="w-full bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm p-4 sm:p-6">
        <div className="w-full h-72 sm:h-88 relative">
          <svg key={animNonce} viewBox="0 0 1000 320" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Background Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const y = 280 - pct * 240;
              const val = Math.round(pct * maxY);
              return (
                <g key={idx}>
                  <line x1="50" y1={y} x2="980" y2={y} stroke="#F8FAFC" strokeOpacity="0.08" strokeDasharray="3 3" strokeWidth="1" />
                  <text x="40" y={y + 4} textAnchor="end" className="text-xs font-mono fill-[#94A3B8]">
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Monsoon Band Shading */}
            <rect
              x={50 + (5 / 11) * 930}
              y="40"
              width={(3 / 11) * 930}
              height="240"
              fill="#5FB0A8"
              fillOpacity="0.04"
              stroke="#5FB0A8"
              strokeDasharray="4 4"
              strokeOpacity="0.2"
            />

            {/* X-Axis Month Grid & Labels */}
            {MONTHS.map((m, i) => {
              const x = 50 + (i / 11) * 930;
              const isHovered = hoveredMonth === i;
              const isMonsoon = i >= 5 && i <= 8;
              return (
                <g key={m} onMouseEnter={() => setHoveredMonth(i)} onMouseLeave={() => setHoveredMonth(null)} className="cursor-pointer">
                  <line x1={x} y1="40" x2={x} y2="280" stroke={isHovered ? "#5FB0A8" : "rgba(248, 250, 252, 0.08)"} strokeWidth={isHovered ? 1.5 : 1} />
                  <text
                    x={x}
                    y="305"
                    textAnchor="middle"
                    className={`text-xs font-mono ${
                      isMonsoon ? "fill-[#5FB0A8] font-bold" : isHovered ? "font-bold fill-[#F8FAFC]" : "fill-[#94A3B8]"
                    }`}
                  >
                    {m}
                  </text>
                </g>
              );
            })}

            {/* Polylines for Displayed Diseases with Continuous Animated SVG Drawing */}
            {displayedDiseases.map((key) => {
              const d = PRIMARY_DISEASES[key];
              const data = mode === "events" ? d.monthlyEvents : d.monthlyCases;
              const pointsArr = data.map((val, i) => ({
                x: 50 + (i / 11) * 930,
                y: 280 - (val / maxY) * 240,
                val,
                month: MONTHS[i]
              }));

              const pathStr = pointsArr.reduce((acc, pt, idx) => {
                return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
              }, "");

              const color = diseaseColors[key];
              const isFocal = !showAll || activeDisease === key;

              return (
                <g key={key}>
                  {/* Subtle Area fill for single disease view */}
                  {!showAll && (
                    <polygon
                      points={`50,280 ${pointsArr.map(p => `${p.x},${p.y}`).join(" ")} 980,280`}
                      fill={color}
                      fillOpacity="0.14"
                    />
                  )}

                  {/* Self-Constructing Line Path */}
                  <path
                    d={pathStr}
                    fill="none"
                    stroke={color}
                    strokeWidth={isFocal ? "3.5" : "1.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-construct-stroke"
                    style={{
                      strokeDasharray: 2000,
                      strokeDashoffset: 0,
                      filter: isFocal ? `drop-shadow(0 0 8px ${color}80)` : "none",
                    }}
                    opacity={isFocal ? 1 : 0.4}
                  />

                  {/* Data Point Beads */}
                  {pointsArr.map((pt, i) => {
                    const isHover = hoveredMonth === i;
                    return (
                      <g key={i}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHover ? 6 : isFocal ? 4 : 2.5}
                          fill={color}
                          stroke="#06080F"
                          strokeWidth="2"
                        />
                        {isFocal && pt.val > 0 && (
                          <text
                            x={pt.x}
                            y={pt.y - 8}
                            textAnchor="middle"
                            className="font-mono text-[9px] fill-[#F8FAFC] font-bold"
                          >
                            {pt.val}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-[#F8FAFC]/10 text-xs font-mono text-[#94A3B8]">
          <div className="flex flex-wrap items-center gap-4">
            {displayedDiseases.map((key) => (
              <div key={key} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: diseaseColors[key] }} />
                <span className="text-[#F8FAFC] font-medium">{diseaseNames[key]}</span>
              </div>
            ))}
          </div>
          <div>Unit: {mode === "events" ? "Outbreak Events per Month" : "Reported Cases per Month"}</div>
        </div>
      </div>

      {/* 4 Metrics Below Chart */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <div className="bg-[#06080F] border border-[#F8FAFC]/10 p-4 rounded-sm">
          <div className="font-mono text-xs uppercase text-[#94A3B8]">Peak Window (CR3)</div>
          <div className="font-mono text-base font-bold text-[#5FB0A8] mt-1">
            {selectedProfile.cr3Window}
          </div>
          <div className="text-[10px] font-mono text-[#94A3B8]/70 mt-0.5">Top 3-Month Concentration</div>
        </div>

        <div className="bg-[#06080F] border border-[#F8FAFC]/10 p-4 rounded-sm">
          <div className="font-mono text-xs uppercase text-[#94A3B8]">Event Share</div>
          <div className="font-mono text-base font-bold text-[#F8FAFC] mt-1">
            {selectedProfile.records} Outbreak Records
          </div>
          <div className="text-[10px] font-mono text-[#94A3B8]/70 mt-0.5">
            {((selectedProfile.records / 539) * 100).toFixed(1)}% of Primary Baseline
          </div>
        </div>

        <div className="bg-[#06080F] border border-[#F8FAFC]/10 p-4 rounded-sm">
          <div className="font-mono text-xs uppercase text-[#94A3B8]">Case Volume</div>
          <div className="font-mono text-base font-bold text-[#F8FAFC] mt-1">
            {selectedProfile.cases.toLocaleString()} Cases
          </div>
          <div className="text-[10px] font-mono text-[#94A3B8]/70 mt-0.5">
            {selectedProfile.deaths} Reported Deaths
          </div>
        </div>

        <div className="bg-[#06080F] border border-[#F8FAFC]/10 p-4 rounded-sm">
          <div className="font-mono text-xs uppercase text-[#94A3B8]">District Footprint</div>
          <div className="font-mono text-base font-bold text-[#F8FAFC] mt-1">
            {selectedProfile.districts} / 36 Districts
          </div>
          <div className="text-[10px] font-mono text-[#94A3B8]/70 mt-0.5">Geographical Breadth</div>
        </div>
      </div>

      {/* Short Authoritative Interpretation */}
      <div className="bg-[#06080F] border border-[#F8FAFC]/10 p-4 rounded-sm space-y-1.5 font-mono">
        <div className="text-xs uppercase text-[#5FB0A8] font-bold">
          Epidemiological Summary: {selectedProfile.name}
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          {selectedProfile.summary}
        </p>
      </div>
    </div>
  );
}
