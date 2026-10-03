"use client";

import React, { useState } from "react";
import { OUTLIER_SENSITIVITY_DATA, MONTHS } from "@/data/researchData";

export default function OutlierScene() {
  const [removed, setRemoved] = useState(false);

  const data = OUTLIER_SENSITIVITY_DATA;
  const values = removed ? data.afterCases : data.beforeCases;
  const maxVal = Math.max(...data.beforeCases);

  const peakMonthBefore = data.beforeCases.indexOf(Math.max(...data.beforeCases));
  const peakMonthAfter = data.afterCases.indexOf(Math.max(...data.afterCases));

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <div className="section-label mb-2">Outlier Sensitivity Analysis</div>
        <div className="font-serif text-3xl sm:text-4xl text-[#EEE8DA] font-bold">
          What happened in February?
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] text-[#A94F3D] uppercase mt-1">
          Food Poisoning · February → April Shift
        </div>
      </div>

      {/* Three detached records */}
      <div className="flex flex-wrap gap-3">
        <div className="font-mono text-[9px] text-[#B5B0A4] uppercase tracking-widest w-full mb-1">
          Three outlier records — each a single mass-exposure cluster
        </div>
        {data.threeRecords.map((rec, i) => (
          <div
            key={i}
            className={`border rounded-sm p-3 flex-1 min-w-[140px] transition-all duration-500 ${
              removed
                ? "border-[#EEE8DA]/08 opacity-30 scale-95"
                : "border-[#A94F3D]/50 bg-[#A94F3D]/08 outlier-pulse"
            }`}
          >
            <div className="font-mono text-[9px] text-[#B5B0A4] uppercase tracking-wider">{rec.year} · {rec.week}</div>
            <div className="font-serif text-base text-[#EEE8DA] font-bold mt-0.5">{rec.district}</div>
            <div className="font-serif text-2xl text-[#A94F3D] font-bold mt-1">{rec.cases}</div>
            <div className="font-mono text-[8px] text-[#A94F3D] uppercase mt-0.5">reported cases</div>
          </div>
        ))}

        {/* Combined */}
        <div className={`border rounded-sm p-3 flex-1 min-w-[140px] transition-all duration-500 ${
          removed ? "border-[#C7A75B]/20 bg-[#C7A75B]/06" : "border-[#A94F3D]/30 bg-[#A94F3D]/05"
        }`}>
          <div className="font-mono text-[8px] text-[#B5B0A4] uppercase tracking-wider">Combined</div>
          <div className="font-serif text-2xl text-[#A94F3D] font-bold mt-1">
            {removed ? "—" : `${data.totalCases.toLocaleString()}`}
          </div>
          <div className="font-mono text-[8px] text-[#B5B0A4] mt-0.5">
            {removed ? "Removed from analysis" : `${data.febOutlierShare}% of Feb cases`}
          </div>
        </div>
      </div>

      {/* February total shift */}
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex flex-col">
          <div className="font-mono text-[8px] text-[#B5B0A4] uppercase tracking-wider">February total {removed ? "after removal" : "with outliers"}</div>
          <div
            className="font-serif font-bold leading-none mt-1 transition-all duration-700"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: removed ? "#89947C" : "#A94F3D" }}
          >
            {removed ? data.febRemainingCases.toLocaleString() : data.febTotalCases.toLocaleString()}
          </div>
          <div className="font-mono text-[9px] text-[#B5B0A4] mt-1">
            {removed ? "Adjusted Feb cases" : "Original Feb cases"}
          </div>
        </div>

        {removed && (
          <div className="font-mono text-[10px] text-[#C7A75B] tracking-wider">
            → Peak shifts to April / May
          </div>
        )}
      </div>

      {/* Bar chart */}
      <div>
        <div className="font-mono text-[8px] text-[#B5B0A4] uppercase tracking-widest mb-2">
          Food Poisoning — Monthly Case Volume ({removed ? "Outliers Removed" : "Full Baseline"})
        </div>
        <div className="flex items-end gap-1" style={{ height: 80 }}>
          {values.map((v, mi) => {
            const h = maxVal > 0 ? Math.max(2, (v / maxVal) * 76) : 2;
            const isPeak = mi === (removed ? peakMonthAfter : peakMonthBefore);
            const isFeb = mi === 1;

            let barColor = "#A94F3D70";
            if (isPeak) barColor = "#A94F3D";
            if (isFeb && !removed) barColor = "#A94F3D";
            if (isFeb && removed) barColor = "#A94F3D30";

            return (
              <div key={mi} className="flex-1 flex flex-col items-center justify-end">
                <div
                  className="w-full rounded-t-sm transition-all duration-700"
                  style={{ height: h, background: barColor }}
                />
                <div className="font-mono text-[7px] text-[#B5B0A4]/50 mt-0.5 text-center">{MONTHS[mi]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toggle control */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setRemoved(!removed)}
          className="font-mono text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded-sm border border-[#A94F3D]/50 text-[#A94F3D] hover:bg-[#A94F3D]/15 transition-all"
        >
          {removed ? "↩ Restore All Records" : "Remove 3 Outliers →"}
        </button>
        <div className="font-mono text-[8px] text-[#B5B0A4]/50 max-w-xs">
          Removes Kolhapur W07, Parbhani W06, Solapur W06 — each a single mass-exposure event
        </div>
      </div>

      {/* Caveat */}
      <div className="border-t border-[#EEE8DA]/08 pt-4">
        <div className="font-mono text-[8px] text-[#B5B0A4]/50 leading-relaxed max-w-2xl">
          <span className="text-[#89947C]">Analytical note:</span> These records are not errors. Each represents a documented mass-exposure cluster verified in the source PDF. 
          The analysis demonstrates sensitivity of aggregate statistics to high-volume point-source events. No causal inference is made about why these outbreaks occurred.
        </div>
      </div>
    </div>
  );
}
