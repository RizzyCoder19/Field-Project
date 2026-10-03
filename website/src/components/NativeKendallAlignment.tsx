"use client";

import React, { useState } from "react";

interface KendallDisease {
  key: string;
  name: string;
  w: number;
  p: string;
  isSignificant: boolean;
  color: string;
  peakPattern: string;
  explanation: string;
  annualRanks: {
    year: string;
    topMonths: string[];
  }[];
}

const KENDALL_DATA: KendallDisease[] = [
  {
    key: "add",
    name: "Acute Diarrheal Disease (ADD)",
    w: 0.530,
    p: "0.016",
    isSignificant: true,
    color: "#10B981",
    peakPattern: "June – August (with secondary October elevation)",
    explanation:
      "Statistically significant rank concordance (p = 0.016). The 12 calendar months maintain consistent relative rankings across all 4 baseline years, driven by repeated monsoon-onset contamination.",
    annualRanks: [
      { year: "2022", topMonths: ["Jul", "Jun", "Aug", "Oct"] },
      { year: "2023", topMonths: ["Jul", "Aug", "Jun", "Oct"] },
      { year: "2024", topMonths: ["Jun", "Jul", "Aug", "Oct"] },
      { year: "2025", topMonths: ["Jul", "Aug", "Oct", "Jun"] },
    ],
  },
  {
    key: "dengue",
    name: "Dengue Fever",
    w: 0.405,
    p: "0.086",
    isSignificant: false,
    color: "#38BDF8",
    peakPattern: "September – October oscillation",
    explanation:
      "Moderate concordance (W = 0.405). Peak activity tightly concentrates in late monsoon, but the exact peak month shifts between September and October depending on the timing of monsoon retreat.",
    annualRanks: [
      { year: "2022", topMonths: ["Oct", "Sep", "Aug", "Nov"] },
      { year: "2023", topMonths: ["Sep", "Oct", "Aug", "Jul"] },
      { year: "2024", topMonths: ["Oct", "Sep", "Jul", "Aug"] },
      { year: "2025", topMonths: ["Sep", "Oct", "Nov", "Aug"] },
    ],
  },
  {
    key: "foodPoisoning",
    name: "Food Poisoning",
    w: 0.386,
    p: "0.108",
    isSignificant: false,
    color: "#EF4444",
    peakPattern: "Bimodal (Jan–Feb & Apr–May)",
    explanation:
      "Non-monsoonal bimodal surges. Timing aligns with banquet season, but event dispersion reduces formal rank stability across the 12 calendar months.",
    annualRanks: [
      { year: "2022", topMonths: ["May", "Feb", "Apr", "Jan"] },
      { year: "2023", topMonths: ["Feb", "Apr", "May", "Jan"] },
      { year: "2024", topMonths: ["Feb", "May", "Jan", "Apr"] },
      { year: "2025", topMonths: ["Feb", "May", "Sep", "Jan"] },
    ],
  },
  {
    key: "malaria",
    name: "Malaria",
    w: 0.319,
    p: "0.229",
    isSignificant: false,
    color: "#D4AF37",
    peakPattern: "May – July (Pre-monsoon & Early onset)",
    explanation:
      "Early summer / onset surge, but 61.4% of records are restricted to Gadchiroli and Chandrapur, limiting statewide seasonal synchronization.",
    annualRanks: [
      { year: "2022", topMonths: ["Jun", "Jul", "May", "Dec"] },
      { year: "2023", topMonths: ["Jul", "Jun", "May", "Aug"] },
      { year: "2024", topMonths: ["Jun", "Jul", "Aug", "May"] },
      { year: "2025", topMonths: ["May", "Jun", "Jul", "Dec"] },
    ],
  },
  {
    key: "chikungunya",
    name: "Chikungunya",
    w: 0.150,
    p: "0.832",
    isSignificant: false,
    color: "#A78BFA",
    peakPattern: "No stable recurring pattern",
    explanation:
      "Near-zero rank agreement (W = 0.150, p = 0.832). Outbreaks appear sporadic across disparate months without a recurring seasonal rhythm in this baseline.",
    annualRanks: [
      { year: "2022", topMonths: ["May", "Sep", "Jun", "Oct"] },
      { year: "2023", topMonths: ["Oct", "Jul", "Nov", "Mar"] },
      { year: "2024", topMonths: ["Jun", "Sep", "Aug", "Oct"] },
      { year: "2025", topMonths: ["Mar", "Nov", "May", "Sep"] },
    ],
  },
];

export default function NativeKendallAlignment({ className = "" }: { className?: string }) {
  const [selectedKey, setSelectedKey] = useState("add");
  const active = KENDALL_DATA.find((d) => d.key === selectedKey) || KENDALL_DATA[0];

  return (
    <div className={`w-full bg-[#0b0f0b] border border-[#EEE8DA]/08 rounded-sm p-6 flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#C7A75B]">
            Exploratory Monthly Concordance · 2022–2025
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#EEE8DA] mt-1">
            Do the monthly ranks repeat each year?
          </h3>
          <p className="font-mono text-xs text-[#B5B0A4] mt-1">
            Kendall&apos;s W evaluates how consistently the 12 calendar months maintain the same relative rankings across completed baseline years.
          </p>
        </div>

        {/* Status Badge */}
        <div
          className={`px-3 py-1.5 rounded-sm border font-mono text-[9px] uppercase tracking-wider ${
            active.isSignificant
              ? "border-[#10B981]/50 text-[#10B981] bg-[#10B981]/10 font-bold"
              : "border-[#EEE8DA]/15 text-[#B5B0A4]/70"
          }`}
        >
          {active.isSignificant ? "★ Statistically Significant (p < 0.05)" : "Exploratory Trend (p ≥ 0.05)"}
        </div>
      </div>

      {/* Cohort Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {KENDALL_DATA.map((d) => {
          const isSelected = selectedKey === d.key;
          return (
            <button
              key={d.key}
              onClick={() => setSelectedKey(d.key)}
              className="font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 rounded border transition-all flex items-center gap-1.5"
              style={{
                borderColor: isSelected ? d.color : "rgba(238,232,218,0.12)",
                backgroundColor: isSelected ? `${d.color}20` : "transparent",
                color: isSelected ? d.color : "rgba(238,232,218,0.5)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
              {d.name.split(" ")[0]}
              <span className="font-bold ml-1">W={d.w.toFixed(3)}</span>
            </button>
          );
        })}
      </div>

      {/* Visual Rank Alignment Grid */}
      <div className="p-6 bg-[#111411] border border-[#EEE8DA]/08 rounded-sm space-y-4">
        <div className="font-mono text-[8px] uppercase tracking-widest text-[#B5B0A4]/60 mb-2">
          Highest-Activity Months Across 4 Baseline Years
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {active.annualRanks.map((item) => (
            <div key={item.year} className="p-3 bg-[#0d1107] border border-[#EEE8DA]/06 rounded-sm">
              <div className="font-mono text-xs font-bold text-[#EEE8DA] border-b border-[#EEE8DA]/10 pb-1.5 mb-2">
                Year {item.year}
              </div>
              <div className="space-y-1.5">
                {item.topMonths.map((m, idx) => (
                  <div key={m} className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[#B5B0A4]/50">Rank #{idx + 1}</span>
                    <span
                      className="px-2 py-0.5 rounded font-bold"
                      style={{
                        backgroundColor: idx === 0 ? `${active.color}30` : "rgba(238,232,218,0.04)",
                        color: idx === 0 ? active.color : "#EEE8DA",
                      }}
                    >
                      {m}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Alignment summary bar */}
        <div className="mt-4 pt-4 border-t border-[#EEE8DA]/08 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <div className="font-mono text-[8px] uppercase text-[#B5B0A4]">Concordance W</div>
              <div className="font-serif text-3xl font-bold" style={{ color: active.color }}>
                {active.w.toFixed(3)}
              </div>
            </div>
            <div className="border-l border-[#EEE8DA]/10 pl-4">
              <div className="font-mono text-[8px] uppercase text-[#B5B0A4]">p-value</div>
              <div className="font-serif text-3xl font-bold text-[#EEE8DA]">
                {active.p}
              </div>
            </div>
          </div>

          <div className="max-w-md font-mono text-[10px] text-[#B5B0A4] leading-relaxed">
            {active.explanation}
          </div>
        </div>
      </div>
    </div>
  );
}
