"use client";

import React, { useState } from "react";
import { PRIMARY_DISEASES, MONTHS } from "@/data/researchData";

const DISEASE_ORDER = ["dengue", "add", "malaria", "foodPoisoning", "chikungunya"] as const;
type DiseaseKey = typeof DISEASE_ORDER[number];

const DISEASE_COLORS: Record<DiseaseKey, string> = {
  dengue: "#4F91B8",
  add: "#89947C",
  malaria: "#C7A75B",
  foodPoisoning: "#A94F3D",
  chikungunya: "#7A8BA0",
};

const MONSOON_MONTHS = [5, 6, 7, 8]; // Jun-Sep (0-indexed)

interface SeasonalMatrixProps {
  className?: string;
  showControls?: boolean;
  highlightDisease?: DiseaseKey | null;
}

export default function SeasonalMatrix({
  className = "",
  showControls = true,
  highlightDisease = null
}: SeasonalMatrixProps) {
  const [mode, setMode] = useState<"events" | "cases">("events");
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [hoveredDisease, setHoveredDisease] = useState<DiseaseKey | null>(null);
  const [focusDisease, setFocusDisease] = useState<DiseaseKey | null>(highlightDisease);

  const diseases = DISEASE_ORDER.map(key => ({
    key,
    data: PRIMARY_DISEASES[key],
    color: DISEASE_COLORS[key],
    values: mode === "events"
      ? PRIMARY_DISEASES[key].monthlyEvents
      : PRIMARY_DISEASES[key].monthlyCases,
  }));

  const globalMax = Math.max(...diseases.flatMap(d => d.values));

  const formatVal = (v: number) =>
    mode === "cases" && v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="section-label">Five Temporal Signatures · 2022–2025</div>
          <div className="flex gap-1 bg-[#111A2B] border border-[#EEE8DA]/10 p-0.5 rounded-sm">
            {(["events", "cases"] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm transition-all"
                style={{
                  background: mode === m ? "#EEE8DA" : "transparent",
                  color: mode === m ? "#111411" : "#B5B0A4",
                  fontWeight: mode === m ? 700 : 400,
                }}
              >
                {m === "events" ? "Outbreak Events" : "Reported Cases"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Matrix */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: 640 }}>
          {/* Month headers */}
          <div className="flex mb-1" style={{ marginLeft: "11rem" }}>
            {/* Monsoon band label */}
            <div className="relative flex w-full">
              <div
                className="absolute top-0 bottom-0 flex items-end pb-0.5 justify-center"
                style={{
                  left: `${(5 / 12) * 100}%`,
                  width: `${(4 / 12) * 100}%`,
                  borderTop: "1px solid rgba(199,167,91,0.25)",
                  borderLeft: "1px solid rgba(199,167,91,0.15)",
                  borderRight: "1px solid rgba(199,167,91,0.15)",
                }}
              >
                <span className="font-mono text-[7px] tracking-[0.2em] text-[#C7A75B] uppercase">
                  Monsoon Window Jun–Sep
                </span>
              </div>
              {MONTHS.map((m, mi) => (
                <div
                  key={m}
                  className="flex-1 text-center"
                  onMouseEnter={() => setHoveredMonth(mi)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  <span
                    className="font-mono text-[9px] uppercase"
                    style={{
                      color: MONSOON_MONTHS.includes(mi)
                        ? "#C7A75B"
                        : hoveredMonth === mi
                          ? "#EEE8DA"
                          : "#B5B0A4",
                      fontWeight: MONSOON_MONTHS.includes(mi) ? 700 : 400,
                    }}
                  >{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disease rows */}
          {diseases.map(({ key, data, color, values }) => {
            const rowMax = Math.max(...values);
            const isFocused = focusDisease === key || hoveredDisease === key || !focusDisease && !hoveredDisease;
            const isHighlight = highlightDisease === key;
            const diseaseName = key === "foodPoisoning" ? "Food Poisoning" : data.shortName;

            return (
              <div
                key={key}
                className="flex items-stretch border-t border-[#EEE8DA]/06 py-2 cursor-pointer transition-opacity"
                style={{ opacity: isFocused ? 1 : 0.25 }}
                onMouseEnter={() => setHoveredDisease(key)}
                onMouseLeave={() => setHoveredDisease(null)}
                onClick={() => setFocusDisease(focusDisease === key ? null : key)}
              >
                {/* Label column */}
                <div className="shrink-0 flex flex-col justify-center" style={{ width: "11rem" }}>
                  <div
                    className="font-serif text-base font-bold leading-tight"
                    style={{ color: isHighlight ? color : "#EEE8DA" }}
                  >{diseaseName}</div>
                  <div className="font-mono text-[8px] text-[#B5B0A4] mt-0.5 leading-tight">
                    {data.records.toLocaleString()} records · {data.cases.toLocaleString()} cases
                  </div>
                  {data.isSignificant && (
                    <div className="font-mono text-[7px] text-[#89947C] mt-0.5">W={data.kendallW} ★</div>
                  )}
                </div>

                {/* Month cells */}
                <div className="flex flex-1 items-end gap-px">
                  {values.map((v, mi) => {
                    const isMonthHovered = hoveredMonth === mi;
                    const pct = globalMax > 0 ? (v / globalMax) : 0;
                    const isPeak = v === rowMax && v > 0;
                    const isMonsoon = MONSOON_MONTHS.includes(mi);

                    return (
                      <div
                        key={mi}
                        className="flex-1 flex flex-col items-center justify-end"
                        style={{
                          minHeight: 60,
                          background: isMonsoon ? "rgba(199,167,91,0.03)" : "transparent",
                          borderLeft: isMonthHovered ? `1px solid ${color}44` : "1px solid transparent",
                          borderRight: isMonthHovered ? `1px solid ${color}44` : "1px solid transparent",
                        }}
                        onMouseEnter={() => setHoveredMonth(mi)}
                        onMouseLeave={() => setHoveredMonth(null)}
                      >
                        {/* Value label */}
                        {v > 0 && (
                          <div
                            className="font-mono text-center leading-none mb-1"
                            style={{
                              fontSize: isPeak ? "9px" : "7px",
                              color: isPeak ? color : "rgba(238,232,218,0.4)",
                              fontWeight: isPeak ? 700 : 400,
                            }}
                          >{formatVal(v)}</div>
                        )}

                        {/* Bar */}
                        <div
                          className="w-[65%] rounded-t-sm transition-all duration-300"
                          style={{
                            height: v === 0 ? 2 : Math.max(4, pct * 52),
                            background: v === 0
                              ? "rgba(238,232,218,0.06)"
                              : isPeak
                                ? color
                                : color + "70",
                            opacity: isMonthHovered ? 1 : (isFocused ? 0.95 : 0.6),
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Summary callout */}
                <div className="shrink-0 flex flex-col justify-center pl-4 text-right" style={{ width: "6rem" }}>
                  <div className="font-serif text-xs font-bold" style={{ color }}>{data.peakMonths.split(" ")[0]}</div>
                  <div className="font-mono text-[7px] text-[#B5B0A4] leading-tight mt-0.5">
                    CR3: {(data.cr3 * 100).toFixed(1)}%
                  </div>
                  <div className={`font-mono text-[7px] mt-0.5 ${data.isSignificant ? "text-[#89947C]" : "text-[#B5B0A4]/50"}`}>
                    W={data.kendallW}
                    {data.isSignificant && " ★"}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom axis label */}
          <div className="flex mt-2" style={{ marginLeft: "11rem" }}>
            <div className="flex-1 flex">
              {MONTHS.map((m, mi) => (
                <div key={m} className="flex-1">
                  {mi === 0 && (
                    <div className="font-mono text-[7px] text-[#B5B0A4]/40 tracking-wider whitespace-nowrap">Jan → Dec</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mode note */}
          <div className="mt-3 font-mono text-[8px] text-[#B5B0A4]/40 tracking-wider">
            {mode === "events"
              ? "Values = outbreak reporting event record count (2022–2025 baseline)"
              : "Values = reported case volume (2022–2025 baseline) · Note: event count ≠ case volume"}
          </div>
        </div>
      </div>
    </div>
  );
}
