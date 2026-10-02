"use client";

import React, { useState } from "react";
import { OUTLIER_SENSITIVITY_DATA, MONTHS } from "@/data/researchData";
import { AlertTriangle, Filter, CheckCircle2, TrendingDown } from "lucide-react";

export default function OutlierSensitivitySimulator() {
  const [isFiltered, setIsFiltered] = useState(false);

  const currentCases = isFiltered
    ? OUTLIER_SENSITIVITY_DATA.afterCases
    : OUTLIER_SENSITIVITY_DATA.beforeCases;

  const maxVal = Math.max(...OUTLIER_SENSITIVITY_DATA.beforeCases);
  const peakMonthIdx = currentCases.indexOf(Math.max(...currentCases));

  return (
    <div className="w-full bg-[#080D1F] border border-[#1E335E] rounded-xl shadow-2xl p-6 lg:p-8 space-y-6">
      {/* Header & Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1E335E]/60 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#EF4444]">
            <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444]" />
            <span>Sensitivity Experiment · Case-Volume Distortion</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#F8F5EC] mt-1">
            Food Poisoning: The Three Outlier Records
          </h3>
          <p className="text-xs text-[#AEB9D1] mt-0.5">
            Observing how 3 single outbreak events shape the four-year aggregate case curve.
          </p>
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsFiltered(!isFiltered)}
          className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center space-x-2 border shadow-lg ${
            isFiltered
              ? "bg-[#10B981] text-[#0A1128] border-[#10B981]"
              : "bg-[#EF4444] text-white border-[#EF4444]"
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>{isFiltered ? "Outliers Removed (Filter Active)" : "Raw Baseline (Includes Outliers)"}</span>
        </button>
      </div>

      {/* The 3 Records Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {OUTLIER_SENSITIVITY_DATA.threeRecords.map((rec) => (
          <div
            key={rec.district}
            className={`p-3.5 rounded-lg border transition-all ${
              isFiltered
                ? "bg-[#0D162E]/60 border-[#1E335E]/40 opacity-40 line-through"
                : "bg-[#16274D] border-[#EF4444]/60 shadow-lg"
            }`}
          >
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-white font-bold">{rec.district} District</span>
              <span className="text-[#D4AF37]">{rec.year} {rec.week}</span>
            </div>
            <div className="font-serif text-2xl font-bold text-[#EF4444] mt-1">
              {rec.cases} Cases
            </div>
            <div className="text-[10px] text-[#AEB9D1] mt-0.5">
              Official investigated outbreak record
            </div>
          </div>
        ))}
      </div>

      {/* Impact Metrics Banner */}
      <div className="bg-[#0D162E] border border-[#D4AF37]/30 rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-[10px] font-mono uppercase text-[#AEB9D1]">Three Records Total</div>
          <div className="font-serif text-xl font-bold text-[#EF4444]">1,615 Cases</div>
          <div className="text-[10px] text-[#64748B]">From 3 single events</div>
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase text-[#AEB9D1]">February Share</div>
          <div className="font-serif text-xl font-bold text-[#D4AF37]">74.7%</div>
          <div className="text-[10px] text-[#64748B]">1,615 of 2,162 Feb cases</div>
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase text-[#AEB9D1]">4-Year Total Share</div>
          <div className="font-serif text-xl font-bold text-[#38BDF8]">27.3%</div>
          <div className="text-[10px] text-[#64748B]">Of all 5,927 baseline cases</div>
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase text-[#AEB9D1]">Peak Month Detected</div>
          <div className="font-serif text-xl font-bold text-white">
            {MONTHS[peakMonthIdx]} ({currentCases[peakMonthIdx]} cases)
          </div>
          <div className="text-[10px] text-[#10B981]">
            {isFiltered ? "April becomes true peak" : "February artificial spike"}
          </div>
        </div>
      </div>

      {/* 12-Month Bar Chart */}
      <div className="bg-[#0A1128] border border-[#1E335E]/40 rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-center text-xs font-mono text-[#AEB9D1] border-b border-[#1E335E]/40 pb-2">
          <span>Monthly Case Volume (12 Calendar Months)</span>
          <span className="text-[#D4AF37]">Active Peak: {MONTHS[peakMonthIdx]}</span>
        </div>

        <div className="grid grid-cols-12 gap-1.5 h-44 items-end pt-6">
          {currentCases.map((val, idx) => {
            const heightPct = Math.max(4, (val / maxVal) * 100);
            const isPeak = idx === peakMonthIdx;
            const isFeb = idx === 1;

            return (
              <div key={idx} className="flex flex-col items-center h-full justify-end group">
                <span className="text-[10px] font-mono text-[#AEB9D1] opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                  {val}
                </span>
                <div
                  className="w-full rounded-t transition-all duration-500"
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: isPeak
                      ? (isFiltered ? "#10B981" : "#EF4444")
                      : (isFeb ? "#F87171" : "#1E335E")
                  }}
                ></div>
                <span
                  className={`text-[10px] font-mono mt-1.5 ${
                    isPeak ? "text-[#D4AF37] font-bold" : "text-[#64748B]"
                  }`}
                >
                  {MONTHS[idx]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Methodological Takeaway */}
      <div className="bg-[#0D162E] p-4 rounded-lg border border-[#1E335E]/60 text-xs text-[#AEB9D1] leading-relaxed">
        <span className="text-white font-bold uppercase font-mono mr-1">Analytical Boundary:</span>
        Event frequency and case volume measure distinct phenomena. February recorded only 11 outbreak events (15.9% of events), yet generated 2,162 cases (36.5% of cases). Removing the three mass-exposure events reveals that April and May represent the underlying sustained elevation window (899 and 894 cases). 
        <span className="italic block text-[#64748B] mt-1">
          Note: No speculation regarding catering, weddings, or institutional gatherings is asserted, as source bulletins record cluster metrics without event narratives.
        </span>
      </div>
    </div>
  );
}
