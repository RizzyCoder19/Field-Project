"use client";

import React, { useState } from "react";
import { OUTLIER_SENSITIVITY_DATA, MONTHS } from "@/data/researchData";

export default function NativeOutlierDecomposition({ className = "" }: { className?: string }) {
  const [isTrimmed, setIsTrimmed] = useState(false);

  const cases = isTrimmed
    ? OUTLIER_SENSITIVITY_DATA.afterCases
    : OUTLIER_SENSITIVITY_DATA.beforeCases;

  const maxVal = Math.max(...OUTLIER_SENSITIVITY_DATA.beforeCases);

  return (
    <div className={`w-full bg-[#0b0f0b] border border-[#EEE8DA]/08 rounded-sm p-6 flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#EF4444]">
            Sensitivity Analysis · Point-Source Cluster Impact
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#EEE8DA] mt-1">
            Food Poisoning: Can 3 records alter the calendar peak?
          </h3>
          <p className="font-mono text-xs text-[#B5B0A4] mt-1 max-w-xl">
            In February, 3 single outbreak events account for 1,615 of 2,162 reported cases (74.7%).
          </p>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsTrimmed(!isTrimmed)}
          className="font-mono text-[9px] uppercase tracking-wider px-4 py-2 rounded border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/15 transition-all"
        >
          {isTrimmed ? "↩ Restore Three Records" : "Animate Separation (Trim 3 Outliers) →"}
        </button>
      </div>

      {/* The 3 Outlier Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {OUTLIER_SENSITIVITY_DATA.threeRecords.map((r) => (
          <div
            key={r.district}
            className={`p-4 rounded-sm border transition-all duration-500 ${
              isTrimmed
                ? "border-[#EEE8DA]/10 bg-[#111411]/20 opacity-30 scale-95"
                : "border-[#EF4444]/50 bg-[#EF4444]/08 shadow-md"
            }`}
          >
            <div className="flex justify-between items-center font-mono text-[8px] text-[#B5B0A4] uppercase">
              <span>{r.year} · {r.week}</span>
              <span className="text-[#EF4444] font-bold">Single Event</span>
            </div>
            <div className="font-serif text-lg font-bold text-[#EEE8DA] mt-1">{r.district}</div>
            <div className="font-serif text-3xl font-bold text-[#EF4444] mt-1">{r.cases}</div>
            <div className="font-mono text-[8px] text-[#B5B0A4]/70 uppercase">Reported Cases</div>
          </div>
        ))}
      </div>

      {/* Sensitivity Metrics */}
      <div className="p-4 bg-[#111411] border border-[#EEE8DA]/08 rounded-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-mono text-[8px] uppercase tracking-widest text-[#B5B0A4]/70">February Case Volume</div>
          <div className="font-serif text-3xl font-bold transition-all duration-500" style={{ color: isTrimmed ? "#10B981" : "#EF4444" }}>
            {isTrimmed ? "547 cases" : "2,162 cases"}
          </div>
          <div className="font-mono text-[8px] text-[#B5B0A4] mt-0.5">
            {isTrimmed ? "Adjusted without the 3 high-volume events" : "Complete raw baseline total"}
          </div>
        </div>

        <div className="border-t sm:border-t-0 sm:border-l border-[#EEE8DA]/10 sm:pl-6">
          <div className="font-mono text-[8px] uppercase tracking-widest text-[#B5B0A4]/70">Primary Peak Timing</div>
          <div className="font-serif text-2xl font-bold text-[#C7A75B]">
            {isTrimmed ? "April–May (899 & 894 cases)" : "February (2,162 cases)"}
          </div>
          <div className="font-mono text-[8px] text-[#B5B0A4] mt-0.5">
            {isTrimmed ? "Exposes underlying warm-season banquet baseline" : "Dominated by single-event wedding clusters"}
          </div>
        </div>
      </div>

      {/* 12-Month Bar Chart Comparing Distribution */}
      <div className="relative w-full aspect-[21/8] min-h-[200px]">
        <svg viewBox="0 0 700 220" className="w-full h-full">
          {/* Baseline grid */}
          <line x1="45" y1="180" x2="680" y2="180" stroke="#EEE8DA" strokeOpacity="0.2" />

          {cases.map((val, idx) => {
            const barW = 32;
            const gap = (635 / 12);
            const x = 45 + idx * gap + (gap - barW) / 2;
            const h = (val / maxVal) * 140;
            const y = 180 - h;
            const isFeb = idx === 1;

            return (
              <g key={MONTHS[idx]}>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={Math.max(h, 2)}
                  rx="2"
                  fill={isFeb ? (isTrimmed ? "#10B981" : "#EF4444") : "#38BDF8"}
                  fillOpacity={isFeb ? 0.9 : 0.6}
                  className="transition-all duration-700"
                />

                <text
                  x={x + barW / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="font-mono text-[7px] fill-[#EEE8DA]"
                >
                  {val > 0 ? val : ""}
                </text>

                <text
                  x={x + barW / 2}
                  y="196"
                  textAnchor="middle"
                  className={`font-mono text-[8px] ${isFeb ? "fill-[#EF4444] font-bold" : "fill-[#B5B0A4]/70"}`}
                >
                  {MONTHS[idx]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Methodological Discipline Note */}
      <div className="mt-4 p-3 bg-[#111411] border border-[#EEE8DA]/08 rounded-sm font-mono text-[8px] text-[#B5B0A4] leading-relaxed">
        <span className="text-[#C7A75B] font-bold uppercase tracking-wider">Methodological Note: </span>
        These three records were <span className="text-[#EEE8DA] font-bold">never deleted</span> from the research database. 
        Sensitivity analysis decomposes aggregate statistics to show how much point-source exposure clusters influence calendar peaks.
      </div>
    </div>
  );
}
