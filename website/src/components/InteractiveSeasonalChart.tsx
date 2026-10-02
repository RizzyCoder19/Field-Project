"use client";

import React, { useState } from "react";
import { MONTHS, PRIMARY_DISEASES } from "@/data/researchData";
import { BarChart3, TrendingUp } from "lucide-react";

export default function InteractiveSeasonalChart() {
  const [mode, setMode] = useState<"events" | "cases">("events");
  const [activeDisease, setActiveDisease] = useState<string>("dengue");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const diseaseKeys = ["dengue", "add", "malaria", "foodPoisoning", "chikungunya"] as const;

  const diseaseColors: Record<string, string> = {
    dengue: "#174A4A",         // petrol
    add: "#C84B2F",            // burnt orange
    malaria: "#AEBB55",        // olive
    foodPoisoning: "#D97706",  // amber
    chikungunya: "#4A5568",    // slate
  };

  const diseaseNames: Record<string, string> = {
    dengue: "Dengue",
    add: "ADD (Diarrheal)",
    malaria: "Malaria",
    foodPoisoning: "Food Poisoning",
    chikungunya: "Chikungunya",
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
    <div className="w-full bg-[#FAF7F2] border border-[#D8D1C5] rounded p-6 lg:p-8 space-y-6">
      {/* Top Controls: Mode & Disease Selector Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#D8D1C5] pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            12-Month Outbreak Trajectory Matrix
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#171A18] mt-0.5">
            Seasonal Distribution (2022–2025 Baseline)
          </h3>
        </div>

        {/* Metric Mode Toggle */}
        <div className="flex items-center gap-1 bg-[#E8E2D7] p-1 rounded border border-[#D8D1C5] text-xs font-mono">
          <button
            onClick={() => setMode("events")}
            className={`px-3 py-1.5 rounded transition-colors font-medium ${
              mode === "events"
                ? "bg-[#174A4A] text-white"
                : "text-[#565C58] hover:text-[#171A18]"
            }`}
          >
            Outbreak Events (N=539)
          </button>
          <button
            onClick={() => setMode("cases")}
            className={`px-3 py-1.5 rounded transition-colors font-medium ${
              mode === "cases"
                ? "bg-[#174A4A] text-white"
                : "text-[#565C58] hover:text-[#171A18]"
            }`}
          >
            Reported Cases (N=21,955)
          </button>
        </div>
      </div>

      {/* Disease Selector Buttons - Clearly Looking Like Tabs/Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {diseaseKeys.map((key) => {
          const isSelected = !showAll && activeDisease === key;
          return (
            <button
              key={key}
              onClick={() => {
                setShowAll(false);
                setActiveDisease(key);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded transition-all border ${
                isSelected
                  ? "bg-[#174A4A] text-[#F3EFE6] border-[#174A4A] shadow-sm"
                  : "bg-[#FAF7F2] text-[#171A18] border-[#D8D1C5] hover:bg-[#E8E2D7]"
              }`}
            >
              <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: diseaseColors[key] }}></span>
              {diseaseNames[key]}
            </button>
          );
        })}

        <button
          onClick={() => setShowAll(true)}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded transition-all border ${
            showAll
              ? "bg-[#174A4A] text-[#F3EFE6] border-[#174A4A] shadow-sm"
              : "bg-[#FAF7F2] text-[#565C58] border-[#D8D1C5] hover:bg-[#E8E2D7] hover:text-[#171A18]"
          }`}
        >
          Compare All 5
        </button>
      </div>

      {/* SVG Chart Area */}
      <div className="w-full bg-[#F3EFE6] border border-[#D8D1C5] rounded p-4 sm:p-6">
        <div className="w-full h-64 sm:h-80 relative">
          <svg viewBox="0 0 1000 320" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Background Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const y = 280 - pct * 240;
              const val = Math.round(pct * maxY);
              return (
                <g key={idx}>
                  <line x1="50" y1={y} x2="980" y2={y} stroke="#D8D1C5" strokeDasharray="3 3" strokeWidth="1" />
                  <text x="40" y={y + 4} textAnchor="end" className="text-[10px] font-mono fill-[#7A827D]">
                    {val}
                  </text>
                </g>
              );
            })}

            {/* X-Axis Month Grid & Labels */}
            {MONTHS.map((m, i) => {
              const x = 50 + (i / 11) * 930;
              const isHovered = hoveredMonth === i;
              return (
                <g key={m} onMouseEnter={() => setHoveredMonth(i)} onMouseLeave={() => setHoveredMonth(null)}>
                  <line x1={x} y1="40" x2={x} y2="280" stroke={isHovered ? "#B8B0A2" : "#E8E2D7"} strokeWidth={isHovered ? 1.5 : 1} />
                  <text
                    x={x}
                    y="305"
                    textAnchor="middle"
                    className={`text-xs font-mono ${isHovered ? "font-bold fill-[#171A18]" : "fill-[#565C58]"}`}
                  >
                    {m}
                  </text>
                </g>
              );
            })}

            {/* Polylines for Displayed Diseases */}
            {displayedDiseases.map((key) => {
              const d = PRIMARY_DISEASES[key];
              const data = mode === "events" ? d.monthlyEvents : d.monthlyCases;
              const points = data
                .map((val, i) => {
                  const x = 50 + (i / 11) * 930;
                  const y = 280 - (val / maxY) * 240;
                  return `${x},${y}`;
                })
                .join(" ");

              const color = diseaseColors[key];
              const isFocal = !showAll || activeDisease === key;

              return (
                <g key={key}>
                  {/* Subtle Area fill for single disease view */}
                  {!showAll && (
                    <polygon
                      points={`50,280 ${points} 980,280`}
                      fill={color}
                      fillOpacity="0.12"
                    />
                  )}
                  {/* Line */}
                  <polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth={isFocal ? "3" : "1.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={isFocal ? 1 : 0.4}
                  />
                  {/* Data Points */}
                  {data.map((val, i) => {
                    const x = 50 + (i / 11) * 930;
                    const y = 280 - (val / maxY) * 240;
                    const isHover = hoveredMonth === i;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={isHover ? 5 : isFocal ? 3.5 : 2}
                        fill={color}
                        stroke="#FAF7F2"
                        strokeWidth="1.5"
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-[#D8D1C5] text-xs font-mono text-[#565C58]">
          <div className="flex flex-wrap items-center gap-4">
            {displayedDiseases.map((key) => (
              <div key={key} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: diseaseColors[key] }}></span>
                <span className="text-[#171A18] font-medium">{diseaseNames[key]}</span>
              </div>
            ))}
          </div>
          <div>Unit: {mode === "events" ? "Outbreak Events per Month" : "Total Outbreak Cases per Month"}</div>
        </div>
      </div>

      {/* 4 Metrics Below Chart (Clearly Structured, No Random Clickable Text) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-4 rounded">
          <div className="font-mono text-xs uppercase text-[#565C58]">Peak Window (CR3)</div>
          <div className="font-mono text-base sm:text-lg font-bold text-[#174A4A] mt-1">
            {selectedProfile.cr3Window}
          </div>
          <div className="text-[11px] text-[#7A827D] mt-0.5">Top 3-Month Concentration</div>
        </div>

        <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-4 rounded">
          <div className="font-mono text-xs uppercase text-[#565C58]">Event Share</div>
          <div className="font-mono text-base sm:text-lg font-bold text-[#171A18] mt-1">
            {selectedProfile.records} Outbreak Records
          </div>
          <div className="text-[11px] text-[#7A827D] mt-0.5">
            {((selectedProfile.records / 539) * 100).toFixed(1)}% of Primary Baseline
          </div>
        </div>

        <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-4 rounded">
          <div className="font-mono text-xs uppercase text-[#565C58]">Case Volume</div>
          <div className="font-mono text-base sm:text-lg font-bold text-[#171A18] mt-1">
            {selectedProfile.cases.toLocaleString()} Cases
          </div>
          <div className="text-[11px] text-[#C84B2F] mt-0.5">
            {selectedProfile.deaths} Reported Deaths
          </div>
        </div>

        <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-4 rounded">
          <div className="font-mono text-xs uppercase text-[#565C58]">District Footprint</div>
          <div className="font-mono text-base sm:text-lg font-bold text-[#171A18] mt-1">
            {selectedProfile.districts} / 36 Districts
          </div>
          <div className="text-[11px] text-[#7A827D] mt-0.5">Geographical Breadth</div>
        </div>
      </div>

      {/* Short Authoritative Interpretation */}
      <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-5 rounded space-y-2">
        <div className="text-xs font-mono uppercase text-[#174A4A] font-semibold">
          Epidemiological Summary: {selectedProfile.name}
        </div>
        <p className="text-xs sm:text-sm text-[#565C58] leading-relaxed">
          {selectedProfile.summary}
        </p>
      </div>
    </div>
  );
}
