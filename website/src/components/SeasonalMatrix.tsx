"use client";

import React, { useState } from "react";
import { PRIMARY_DISEASES, MONTHS, MONTH_FULL } from "@/data/researchData";
import { RefreshCw, Table } from "lucide-react";

const DISEASE_ORDER = ["dengue", "add", "malaria", "foodPoisoning", "chikungunya"] as const;
type DiseaseKey = typeof DISEASE_ORDER[number];

const DISEASE_COLORS: Record<DiseaseKey, string> = {
  dengue: "#38BDF8",
  add: "#10B981",
  malaria: "#F59E0B",
  foodPoisoning: "#EF4444",
  chikungunya: "#A78BFA",
};

const MONSOON_MONTHS = [5, 6, 7, 8]; // Jun-Sep (0-indexed)

interface SeasonalMatrixProps {
  className?: string;
  showControls?: boolean;
  highlightDisease?: string | null;
  onSelectDisease?: (diseaseId: string | null) => void;
}

export default function SeasonalMatrix({
  className = "",
  showControls = true,
  highlightDisease = null,
  onSelectDisease,
}: SeasonalMatrixProps) {
  const [metricMode, setMetricMode] = useState<"events" | "percentage">("percentage");
  const [hoveredCell, setHoveredCell] = useState<{ disease: DiseaseKey; month: number } | null>(null);
  const initialKey = (highlightDisease && (DISEASE_ORDER as readonly string[]).includes(highlightDisease))
    ? (highlightDisease as DiseaseKey)
    : null;
  const [focusedDisease, setFocusedDisease] = useState<DiseaseKey | null>(initialKey);
  const [prevHighlight, setPrevHighlight] = useState<string | null>(highlightDisease);
  const [showAccessibleTable, setShowAccessibleTable] = useState(false);
  const [matrixKey, setMatrixKey] = useState(0);

  if (highlightDisease !== prevHighlight) {
    setPrevHighlight(highlightDisease);
    const nextKey = (highlightDisease && (DISEASE_ORDER as readonly string[]).includes(highlightDisease))
      ? (highlightDisease as DiseaseKey)
      : null;
    setFocusedDisease(nextKey);
  }

  const handleReconstruct = () => {
    setMatrixKey(k => k + 1);
  };

  const diseases = DISEASE_ORDER.map((key) => {
    const data = PRIMARY_DISEASES[key];
    const totalEvents = data.records;
    const monthlyPct = data.monthlyEvents.map((count) =>
      totalEvents > 0 ? (count / totalEvents) * 100 : 0
    );

    return {
      key,
      data,
      color: DISEASE_COLORS[key],
      totalEvents,
      monthlyEvents: data.monthlyEvents,
      monthlyCases: data.monthlyCases,
      monthlyPct,
      values: metricMode === "events" ? data.monthlyEvents : monthlyPct,
    };
  });

  const handleDiseaseClick = (key: DiseaseKey) => {
    const next = focusedDisease === key ? null : key;
    setFocusedDisease(next);
    if (onSelectDisease) {
      onSelectDisease(next);
    }
  };

  return (
    <div className={`flex flex-col gap-5 ${className}`} role="region" aria-label="Five-Disease Monthly Seasonal Heatmap">
      {/* Header & Controls */}
      {showControls && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F8FAFC]/10 pb-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
              Seasonal Signature Matrix · 2022–2025 Baseline
            </div>
            <div className="font-serif text-2xl text-[#F8FAFC] font-bold mt-1">
              12-Month Outbreak Distribution by Disease Cohort
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Replay Construction */}
            <button
              onClick={handleReconstruct}
              className="px-2.5 py-1.5 bg-[#06080F] hover:bg-[#1A2234] border border-[#F8FAFC]/15 text-[#D4AF37] hover:text-[#F5D061] rounded-sm font-mono text-xs flex items-center gap-1.5 transition-colors"
              title="Reconstruct matrix cell by cell"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reconstruct Matrix</span>
            </button>

            {/* Toggle Mode */}
            <div className="flex bg-[#06080F] border border-[#F8FAFC]/15 p-0.5 rounded-sm">
              <button
                onClick={() => setMetricMode("percentage")}
                className="font-mono text-xs tracking-wider uppercase px-3 py-1.5 rounded-sm transition-all focus:outline-none"
                style={{
                  background: metricMode === "percentage" ? "#00F0FF" : "transparent",
                  color: metricMode === "percentage" ? "#06080F" : "#94A3B8",
                  fontWeight: metricMode === "percentage" ? 700 : 400,
                }}
                aria-pressed={metricMode === "percentage"}
              >
                Within-Disease %
              </button>
              <button
                onClick={() => setMetricMode("events")}
                className="font-mono text-xs tracking-wider uppercase px-3 py-1.5 rounded-sm transition-all focus:outline-none"
                style={{
                  background: metricMode === "events" ? "#00F0FF" : "transparent",
                  color: metricMode === "events" ? "#06080F" : "#94A3B8",
                  fontWeight: metricMode === "events" ? 700 : 400,
                }}
                aria-pressed={metricMode === "events"}
              >
                Raw Outbreaks
              </button>
            </div>

            {/* Accessibility Toggle */}
            <button
              onClick={() => setShowAccessibleTable(!showAccessibleTable)}
              className="font-mono text-xs tracking-wider uppercase px-2.5 py-1.5 border border-[#F8FAFC]/15 hover:border-[#00F0FF]/40 text-[#94A3B8] hover:text-[#F8FAFC] rounded-sm transition-all flex items-center gap-1.5"
              title="Toggle accessible tabular data"
              aria-expanded={showAccessibleTable}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{showAccessibleTable ? "Hide Table" : "Show Table"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Heatmap Matrix Display with Staged Construction */}
      <div key={matrixKey} className="overflow-x-auto pb-2">
        <div style={{ minWidth: 720 }}>
          {/* Month Column Headers with Monsoon Band Indicator */}
          <div className="flex mb-2" style={{ marginLeft: "13rem" }}>
            <div className="relative flex w-full">
              {/* Monsoon Window Boundary Label */}
              <div
                className="absolute top-0 bottom-0 flex items-center justify-center border-t border-l border-r border-[#00F0FF]/40 bg-[#00F0FF]/05 rounded-t-sm"
                style={{
                  left: `${(5 / 12) * 100}%`,
                  width: `${(4 / 12) * 100}%`,
                  height: "24px",
                }}
              >
                <span className="font-mono text-[8px] tracking-[0.2em] text-[#00F0FF] uppercase font-bold">
                  Monsoon Window (Jun–Sep)
                </span>
              </div>

              {MONTHS.map((m, mi) => (
                <div key={m} className="flex-1 text-center pt-7">
                  <span
                    className="font-mono text-xs uppercase font-bold"
                    style={{
                      color: MONSOON_MONTHS.includes(mi)
                        ? "#00F0FF"
                        : hoveredCell?.month === mi
                        ? "#F8FAFC"
                        : "#94A3B8",
                    }}
                  >
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Disease Rows */}
          <div className="flex flex-col gap-2">
            {diseases.map(({ key, data, color, totalEvents, values, monthlyEvents, monthlyCases }, rowIdx) => {
              const isSelected = focusedDisease === key;
              const isDimmed = focusedDisease !== null && !isSelected;
              const maxVal = Math.max(...values);

              return (
                <div
                  key={key}
                  className={`flex items-center transition-all duration-300 rounded-sm p-2 ${
                    isSelected
                      ? "bg-[#1E293B] border border-[#00F0FF]/60 shadow-lg"
                      : "bg-[#0B111E]/80 border border-[#F8FAFC]/10 hover:border-[#F8FAFC]/25"
                  }`}
                  style={{ opacity: isDimmed ? 0.35 : 1 }}
                >
                  {/* Disease Label Button */}
                  <button
                    onClick={() => handleDiseaseClick(key)}
                    className="w-52 shrink-0 flex items-center justify-between text-left pr-4 focus:outline-none"
                    aria-label={`Select ${data.name}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <div>
                        <div className="font-serif text-base font-bold text-[#F8FAFC] truncate">
                          {data.shortName}
                        </div>
                        <div className="font-mono text-[9px] text-[#94A3B8] uppercase">
                          {totalEvents} events · {data.cases.toLocaleString()} cases
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="font-mono text-[9px] text-[#00F0FF] uppercase font-bold">
                        Active
                      </span>
                    )}
                  </button>

                  {/* 12 Month Cells with Progressive Staggered Assembly */}
                  <div className="flex flex-1 gap-1.5">
                    {MONTHS.map((m, mi) => {
                      const val = values[mi];
                      const rawCount = monthlyEvents[mi];
                      const rawCase = monthlyCases[mi];
                      const pctOfMax = maxVal > 0 ? val / maxVal : 0;
                      const isHovered = hoveredCell?.disease === key && hoveredCell?.month === mi;
                      const isPeak = val === maxVal && val > 0;
                      const cellDelay = (rowIdx * 12 + mi) * 15;

                      // Opacity scale for heat mapping
                      const fillOpacity = Math.max(0.1, pctOfMax * 0.9);

                      return (
                        <div
                          key={m}
                          tabIndex={0}
                          role="gridcell"
                          aria-label={`${data.name} in ${MONTH_FULL[mi]}: ${rawCount} events (${((rawCount / totalEvents) * 100).toFixed(1)}%), ${rawCase.toLocaleString()} cases`}
                          onMouseEnter={() => setHoveredCell({ disease: key, month: mi })}
                          onMouseLeave={() => setHoveredCell(null)}
                          onFocus={() => setHoveredCell({ disease: key, month: mi })}
                          onBlur={() => setHoveredCell(null)}
                          className="flex-1 h-12 rounded-sm relative flex flex-col items-center justify-center cursor-pointer transition-all focus:outline-none focus:ring-1 focus:ring-[#00F0FF] animate-scale-in"
                          style={{
                            backgroundColor: color,
                            opacity: fillOpacity,
                            border: isPeak
                              ? `2px solid ${color}`
                              : isHovered
                              ? "2px solid #F8FAFC"
                              : "1px solid rgba(255, 255, 255, 0.08)",
                            transform: isHovered ? "scale(1.1)" : "none",
                            zIndex: isHovered ? 20 : 1,
                            animationDelay: `${cellDelay}ms`,
                          }}
                        >
                          <span
                            className="font-mono text-[10px] font-bold"
                            style={{
                              color: pctOfMax > 0.45 ? "#06080F" : "#F8FAFC",
                            }}
                          >
                            {metricMode === "percentage"
                              ? `${val.toFixed(0)}%`
                              : rawCount}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Tooltip & Context Details */}
      {hoveredCell ? (
        <div className="p-3.5 bg-[#1E293B] border border-[#00F0FF]/50 rounded-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-xl">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: DISEASE_COLORS[hoveredCell.disease] }}
            />
            <span className="font-serif text-base font-bold text-[#F8FAFC]">
              {PRIMARY_DISEASES[hoveredCell.disease].name}
            </span>
            <span className="text-[#00F0FF] font-bold uppercase tracking-wider">
              · {MONTH_FULL[hoveredCell.month]}
            </span>
          </div>
          <div className="flex items-center gap-6 text-[#F8FAFC]">
            <div>
              <span className="text-[#94A3B8] uppercase text-[9px] mr-1.5">Outbreak Events:</span>
              <span className="font-bold text-sm">
                {PRIMARY_DISEASES[hoveredCell.disease].monthlyEvents[hoveredCell.month]}
              </span>
              <span className="text-[#94A3B8] text-xs ml-1">
                ({(
                  (PRIMARY_DISEASES[hoveredCell.disease].monthlyEvents[hoveredCell.month] /
                    PRIMARY_DISEASES[hoveredCell.disease].records) *
                  100
                ).toFixed(1)}% of annual total)
              </span>
            </div>
            <div>
              <span className="text-[#94A3B8] uppercase text-[9px] mr-1.5">Reported Cases:</span>
              <span className="font-bold text-sm text-[#00F0FF]">
                {PRIMARY_DISEASES[hoveredCell.disease].monthlyCases[hoveredCell.month].toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          {/* Legend */}
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-wider">Visual Intensity Scale:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#94A3B8]">0%</span>
              <div className="w-20 h-2.5 rounded-sm bg-gradient-to-r from-[#0B111E] to-[#00F0FF]" />
              <span className="text-[10px] text-[#F8FAFC] font-bold">Peak</span>
            </div>
          </div>
          <div>
            * Borders with thicker outlines indicate the primary peak month for that disease.
          </div>
        </div>
      )}

      {/* Methodological Guidance Note */}
      <div className="p-3.5 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm font-mono text-xs text-[#94A3B8] leading-relaxed">
        <span className="text-[#00F0FF] font-bold uppercase tracking-wider mr-1.5">Methodological Note:</span>
        Within-disease percentages isolate monthly timing independent of baseline outbreak frequency (Dengue: 204 records vs. Chikungunya: 43 records). Raw event counts across different diseases are surveillance reporting frequencies and must not be treated as directly comparable population risk rates.
      </div>

      {/* Accessible Summary Table */}
      {showAccessibleTable && (
        <div className="overflow-x-auto border border-[#F8FAFC]/10 rounded-sm p-3 bg-[#06080F]">
          <div className="font-mono text-xs text-[#00F0FF] font-bold uppercase mb-2">
            Tabular Summary: Monthly Event Counts (2022–2025 Baseline)
          </div>
          <table className="w-full text-xs font-mono text-left text-[#F8FAFC]">
            <thead>
              <tr className="border-b border-[#F8FAFC]/10 text-[#94A3B8]">
                <th className="py-2 px-2.5">Disease</th>
                {MONTHS.map((m) => (
                  <th key={m} className="py-2 px-2.5 text-right">{m}</th>
                ))}
                <th className="py-2 px-2.5 text-right font-bold text-[#00F0FF]">Total</th>
              </tr>
            </thead>
            <tbody>
              {diseases.map(({ key, data, monthlyEvents, totalEvents }) => (
                <tr key={key} className="border-b border-[#F8FAFC]/10/40 hover:bg-[#0B111E]">
                  <td className="py-2 px-2.5 font-bold text-[#F8FAFC]">{data.name}</td>
                  {monthlyEvents.map((cnt, i) => (
                    <td key={i} className="py-2 px-2.5 text-right tabular-nums">{cnt}</td>
                  ))}
                  <td className="py-2 px-2.5 text-right font-bold text-[#00F0FF] tabular-nums">{totalEvents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
