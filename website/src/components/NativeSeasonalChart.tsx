"use client";

import React, { useState, useEffect, useRef } from "react";
import { PRIMARY_DISEASES, MONTHS } from "@/data/researchData";

interface NativeSeasonalChartProps {
  initialDisease?: string;
  className?: string;
  allowToggleMode?: boolean;
}

const DISEASE_OPTIONS = [
  { id: "all", label: "All 5 Cohorts", color: "#C7A75B" },
  { id: "dengue", label: "Dengue", color: "#38BDF8" },
  { id: "add", label: "ADD", color: "#10B981" },
  { id: "malaria", label: "Malaria", color: "#D4AF37" },
  { id: "foodPoisoning", label: "Food Poisoning", color: "#EF4444" },
  { id: "chikungunya", label: "Chikungunya", color: "#A78BFA" },
];

export default function NativeSeasonalChart({
  initialDisease = "all",
  className = "",
  allowToggleMode = true,
}: NativeSeasonalChartProps) {
  const [selectedDisease, setSelectedDisease] = useState(initialDisease);
  const [metric, setMetric] = useState<"events" | "cases">("events");
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    let start: number | null = null;
    const duration = 900; // ms

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

    setAnimatedProgress(0);
    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [selectedDisease, metric]);

  // Aggregate or single disease data
  const values = MONTHS.map((_, mIdx) => {
    if (selectedDisease === "all") {
      return Object.values(PRIMARY_DISEASES).reduce((sum, d) => {
        const arr = metric === "events" ? d.monthlyEvents : d.monthlyCases;
        return sum + (arr[mIdx] || 0);
      }, 0);
    } else {
      const d = PRIMARY_DISEASES[selectedDisease];
      if (!d) return 0;
      const arr = metric === "events" ? d.monthlyEvents : d.monthlyCases;
      return arr[mIdx] || 0;
    }
  });

  const maxValue = Math.max(...values, 1);
  const activeColor = DISEASE_OPTIONS.find((d) => d.id === selectedDisease)?.color || "#C7A75B";

  const width = 720;
  const height = 300;
  const padding = { top: 35, right: 30, bottom: 45, left: 55 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const barWidth = (chartW / 12) * 0.65;
  const barGap = chartW / 12;

  // Peak index
  const peakIdx = values.indexOf(Math.max(...values));

  return (
    <div ref={containerRef} className={`w-full flex flex-col bg-[#0b0f0b] border border-[#EEE8DA]/08 rounded-sm p-4 sm:p-6 ${className}`}>
      {/* Top Bar: Disease Selector & Metric Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-1.5">
          {DISEASE_OPTIONS.map((opt) => {
            const active = selectedDisease === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedDisease(opt.id)}
                className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded border transition-all"
                style={{
                  borderColor: active ? opt.color : "rgba(238,232,218,0.12)",
                  backgroundColor: active ? `${opt.color}20` : "transparent",
                  color: active ? opt.color : "rgba(238,232,218,0.5)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {allowToggleMode && (
          <div className="flex items-center gap-1 bg-[#111411] border border-[#EEE8DA]/10 p-0.5 rounded">
            <button
              onClick={() => setMetric("events")}
              className={`font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded transition-colors ${
                metric === "events"
                  ? "bg-[#C7A75B] text-[#111411] font-bold"
                  : "text-[#B5B0A4]/60 hover:text-[#EEE8DA]"
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setMetric("cases")}
              className={`font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded transition-colors ${
                metric === "cases"
                  ? "bg-[#C7A75B] text-[#111411] font-bold"
                  : "text-[#B5B0A4]/60 hover:text-[#EEE8DA]"
              }`}
            >
              Cases
            </button>
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full aspect-[21/9] min-h-[240px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={activeColor} stopOpacity="0.95" />
              <stop offset="100%" stopColor={activeColor} stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="peakGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="30%" stopColor={activeColor} stopOpacity="0.95" />
              <stop offset="100%" stopColor={activeColor} stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Grid lines (Y-axis) */}
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
                  stroke="#EEE8DA"
                  strokeOpacity="0.06"
                  strokeDasharray={ratio === 0 ? "none" : "3,3"}
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="font-mono text-[8px] fill-[#B5B0A4]/50"
                >
                  {val.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Baseline axis */}
          <line
            x1={padding.left}
            y1={padding.top + chartH}
            x2={width - padding.right}
            y2={padding.top + chartH}
            stroke="#EEE8DA"
            strokeOpacity="0.25"
            strokeWidth="1"
          />

          {/* Animated Bars */}
          {values.map((v, i) => {
            const h = (v / maxValue) * chartH * animatedProgress;
            const x = padding.left + i * barGap + (barGap - barWidth) / 2;
            const y = padding.top + chartH - h;
            const isPeak = i === peakIdx && v > 0;

            return (
              <g key={MONTHS[i]} className="transition-all duration-300">
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={Math.max(h, 0)}
                  fill={isPeak ? "url(#peakGrad)" : "url(#barGrad)"}
                  rx="2"
                  className="transition-all duration-200"
                />

                {/* Value on top of bar if high enough */}
                {animatedProgress > 0.8 && v > 0 && (
                  <text
                    x={x + barWidth / 2}
                    y={y - 5}
                    textAnchor="middle"
                    className="font-mono text-[8px] fill-[#EEE8DA] font-bold"
                  >
                    {v.toLocaleString()}
                  </text>
                )}

                {/* X-axis Month Label */}
                <text
                  x={padding.left + i * barGap + barGap / 2}
                  y={height - padding.bottom + 18}
                  textAnchor="middle"
                  className={`font-mono text-[9px] ${
                    isPeak ? "fill-[#C7A75B] font-bold" : "fill-[#B5B0A4]/70"
                  }`}
                >
                  {MONTHS[i]}
                </text>
              </g>
            );
          })}

          {/* Peak Indicator Callout */}
          {animatedProgress > 0.9 && values[peakIdx] > 0 && (
            <g className="animate-fadeIn">
              <rect
                x={padding.left + peakIdx * barGap + barGap / 2 - 38}
                y={padding.top - 20}
                width="76"
                height="16"
                rx="2"
                fill="#111A2B"
                stroke={activeColor}
                strokeWidth="1"
              />
              <text
                x={padding.left + peakIdx * barGap + barGap / 2}
                y={padding.top - 9}
                textAnchor="middle"
                className="font-mono text-[7px] font-bold uppercase tracking-wider"
                fill={activeColor}
              >
                ★ Peak: {MONTHS[peakIdx]}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Analytical Footnote */}
      <div className="mt-3 flex items-center justify-between text-[#B5B0A4]/60 font-mono text-[8px] border-t border-[#EEE8DA]/06 pt-2">
        <span>Source: 2022–2025 Baseline Archives (539 primary records)</span>
        <span>
          {metric === "events"
            ? `Total: ${values.reduce((a, b) => a + b, 0)} outbreak events`
            : `Total: ${values.reduce((a, b) => a + b, 0).toLocaleString()} reported cases`}
        </span>
      </div>
    </div>
  );
}
