"use client";

import React, { useState, useEffect, useRef } from "react";
import { PRIMARY_DISEASES, MONTHS } from "@/data/researchData";

interface NativeSeasonalChartProps {
  initialDisease?: string;
  className?: string;
  allowToggleMode?: boolean;
  metric?: "events" | "cases";
  onMetricChange?: (metric: "events" | "cases") => void;
  onDiseaseSelect?: (diseaseId: string) => void;
}

const DISEASE_OPTIONS = [
  { id: "all", label: "All 5 Cohorts", color: "#E8D2B5" },
  { id: "dengue", label: "Dengue Fever", color: "#8B1414" },
  { id: "add", label: "ADD (Diarrheal)", color: "#5A7A72" },
  { id: "malaria", label: "Malaria", color: "#C9944A" },
  { id: "foodPoisoning", label: "Food Poisoning", color: "#A83C28" },
  { id: "chikungunya", label: "Chikungunya", color: "#7E6080" },
];

export default function NativeSeasonalChart({
  initialDisease = "all",
  className = "",
  allowToggleMode = true,
  metric: controlledMetric,
  onMetricChange,
  onDiseaseSelect,
}: NativeSeasonalChartProps) {
  const [selectedDisease, setSelectedDisease] = useState(initialDisease);
  const [prevInitialDisease, setPrevInitialDisease] = useState(initialDisease);
  const [internalMetric, setInternalMetric] = useState<"events" | "cases">("events");
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentMetric = controlledMetric !== undefined ? controlledMetric : internalMetric;

  if (initialDisease && prevInitialDisease !== initialDisease) {
    setPrevInitialDisease(initialDisease);
    setSelectedDisease(initialDisease);
  }

  const handleDiseaseSelect = (id: string) => {
    setSelectedDisease(id);
    if (onDiseaseSelect) onDiseaseSelect(id);
  };

  const handleMetricToggle = (m: "events" | "cases") => {
    setInternalMetric(m);
    if (onMetricChange) onMetricChange(m);
  };

  useEffect(() => {
    let frameId: number;
    let start: number | null = null;
    const duration = 850; // ms

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimatedProgress(ease);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame((timestamp) => {
      setAnimatedProgress(0);
      animate(timestamp);
    });

    return () => cancelAnimationFrame(frameId);
  }, [selectedDisease, currentMetric]);

  // Aggregate or single disease data
  const values = MONTHS.map((_, mIdx) => {
    if (selectedDisease === "all") {
      return Object.values(PRIMARY_DISEASES).reduce((sum, d) => {
        const arr = currentMetric === "events" ? d.monthlyEvents : d.monthlyCases;
        return sum + (arr[mIdx] || 0);
      }, 0);
    } else {
      const d = PRIMARY_DISEASES[selectedDisease];
      if (!d) return 0;
      const arr = currentMetric === "events" ? d.monthlyEvents : d.monthlyCases;
      return arr[mIdx] || 0;
    }
  });

  const maxValue = Math.max(...values, 1);
  const totalVal = values.reduce((a, b) => a + b, 0);
  const activeColor = DISEASE_OPTIONS.find((d) => d.id === selectedDisease)?.color || "#E8D2B5";

  // Expansive 880x360 dimensions
  const width = 880;
  const height = 360;
  const padding = { top: 48, right: 35, bottom: 52, left: 65 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const barWidth = (chartW / 12) * 0.62;
  const barGap = chartW / 12;

  // Peak index
  const peakIdx = values.indexOf(Math.max(...values));

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col bg-[#0B0E13] border border-[#E8D2B5]/15 rounded-xs p-4 sm:p-6 lg:p-8 shadow-2xl transition-all ${className}`}
    >
      {/* Top Bar: Disease Selector & Metric Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
        <div className="flex flex-wrap gap-2">
          {DISEASE_OPTIONS.map((opt) => {
            const active = selectedDisease === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleDiseaseSelect(opt.id)}
                className="font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-xs border transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                style={{
                  borderColor: active ? "#590907" : "rgba(232, 210, 181, 0.18)",
                  backgroundColor: active ? "rgba(89, 9, 7, 0.45)" : "#07090C",
                  color: active ? "#E8D2B5" : "#A5A79B",
                  fontWeight: active ? "bold" : "normal",
                  boxShadow: active ? "0 0 12px rgba(89, 9, 7, 0.5)" : "none",
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white/20" style={{ backgroundColor: opt.color }} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {allowToggleMode && (
          <div className="flex items-center p-1 bg-[#07090C] border border-[#E8D2B5]/20 rounded-xs">
            <button
              onClick={() => handleMetricToggle("events")}
              className={`font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-2xs transition-all cursor-pointer ${
                currentMetric === "events"
                  ? "bg-[#590907] text-[#E8D2B5] font-bold border border-[#E8D2B5]/30 shadow-sm"
                  : "text-[#A5A79B] hover:text-[#E8D2B5]"
              }`}
            >
              Events (N=539)
            </button>
            <button
              onClick={() => handleMetricToggle("cases")}
              className={`font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-2xs transition-all cursor-pointer ${
                currentMetric === "cases"
                  ? "bg-[#590907] text-[#E8D2B5] font-bold border border-[#E8D2B5]/30 shadow-sm"
                  : "text-[#A5A79B] hover:text-[#E8D2B5]"
              }`}
            >
              Cases (N=20,955)
            </button>
          </div>
        )}
      </div>

      {/* SVG Canvas - 880x360 */}
      <div className="relative w-full aspect-[21/9] min-h-[280px] sm:min-h-[320px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible select-none">
          <defs>
            <linearGradient id="seasonalBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={activeColor} stopOpacity="0.95" />
              <stop offset="100%" stopColor={activeColor} stopOpacity="0.30" />
            </linearGradient>

            <linearGradient id="seasonalPeakGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8D2B5" stopOpacity="0.95" />
              <stop offset="35%" stopColor={activeColor} stopOpacity="0.95" />
              <stop offset="100%" stopColor={activeColor} stopOpacity="0.35" />
            </linearGradient>

            <filter id="chartBarGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid Lines (Y-axis) */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + chartH * (1 - ratio);
            const val = Math.round(maxValue * ratio);
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#E8D2B5"
                  strokeOpacity={ratio === 0 ? "0.20" : "0.07"}
                  strokeDasharray={ratio === 0 ? "none" : "3,4"}
                />
                <text
                  x={padding.left - 12}
                  y={y + 4}
                  textAnchor="end"
                  className="font-mono text-xs fill-[#A5A79B]"
                >
                  {val.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Baseline Axis */}
          <line
            x1={padding.left}
            y1={padding.top + chartH}
            x2={width - padding.right}
            y2={padding.top + chartH}
            stroke="#E8D2B5"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />

          {/* Staggered Animated Bars */}
          {values.map((v, i) => {
            const barProgress = Math.max(0, Math.min(1, (animatedProgress - i * 0.04) / 0.5));
            const h = (v / maxValue) * chartH * barProgress;
            const x = padding.left + i * barGap + (barGap - barWidth) / 2;
            const y = padding.top + chartH - h;
            const isPeak = i === peakIdx && values[peakIdx] > 0;
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={MONTHS[i]}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Invisible Hover Buffer */}
                <rect
                  x={padding.left + i * barGap}
                  y={padding.top}
                  width={barGap}
                  height={chartH}
                  fill="transparent"
                />

                {/* Animated Column Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={Math.max(h, 0)}
                  fill={isPeak ? "url(#seasonalPeakGrad)" : isHovered ? activeColor : "url(#seasonalBarGrad)"}
                  rx="2"
                  stroke={isHovered ? "#E8D2B5" : "none"}
                  strokeWidth="1.5"
                  filter={isPeak ? "url(#chartBarGlow)" : undefined}
                />

                {/* Value on Top of Bar */}
                {barProgress > 0.85 && v > 0 && (
                  <text
                    x={x + barWidth / 2}
                    y={y - 8}
                    textAnchor="middle"
                    className="font-mono text-xs sm:text-sm fill-[#E8D2B5] font-bold drop-shadow-md"
                  >
                    {v.toLocaleString()}
                  </text>
                )}

                {/* X-axis Month Label */}
                <text
                  x={padding.left + i * barGap + barGap / 2}
                  y={height - padding.bottom + 28}
                  textAnchor="middle"
                  className={`font-mono text-xs sm:text-sm font-bold transition-colors ${
                    isPeak ? "fill-[#E8D2B5]" : isHovered ? "fill-[#E8D2B5]" : "fill-[#A5A79B]"
                  }`}
                >
                  {MONTHS[i]}
                </text>
              </g>
            );
          })}

          {/* Smooth Bezier Seasonal Trend Curve */}
          {(() => {
            const linePoints = values.map((v, i) => {
              const barProgress = Math.max(0, Math.min(1, (animatedProgress - i * 0.04) / 0.5));
              const h = (v / maxValue) * chartH * barProgress;
              const x = padding.left + i * barGap + barGap / 2;
              const y = padding.top + chartH - h;
              return { x, y };
            });

            const curveD = linePoints.reduce((acc, pt, idx) => {
              return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
            }, "");

            return (
              <g className="pointer-events-none">
                <path
                  d={curveD}
                  fill="none"
                  stroke={activeColor}
                  strokeWidth="2.5"
                  strokeOpacity="0.85"
                  strokeDasharray="4 4"
                />
                {linePoints.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r={idx === peakIdx ? 5.5 : 3.5}
                    fill={idx === peakIdx ? "#E8D2B5" : activeColor}
                    stroke="#07090C"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            );
          })()}

          {/* Peak Indicator Callout Badge */}
          {animatedProgress > 0.85 && values[peakIdx] > 0 && (
            <g className="pointer-events-none">
              <rect
                x={padding.left + peakIdx * barGap + barGap / 2 - 62}
                y={padding.top - 36}
                width="124"
                height="25"
                rx="3"
                fill="#07090C"
                stroke="#590907"
                strokeWidth="1.5"
                filter="url(#chartBarGlow)"
              />
              <text
                x={padding.left + peakIdx * barGap + barGap / 2}
                y={padding.top - 19}
                textAnchor="middle"
                className="font-mono text-[10.5px] font-bold uppercase tracking-wider"
                fill="#E8D2B5"
              >
                ★ Peak: {MONTHS[peakIdx]} ({values[peakIdx].toLocaleString()})
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Analytical Footnote */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-[#A5A79B] border-t border-white/[0.08] pt-3">
        <span>Source: 2022–2025 Audited Baseline Archives</span>
        <span className="text-[#E8D2B5] font-bold">
          {currentMetric === "events"
            ? `Total: ${totalVal.toLocaleString()} outbreak events`
            : `Total: ${totalVal.toLocaleString()} reported cases`}
        </span>
      </div>
    </div>
  );
}
