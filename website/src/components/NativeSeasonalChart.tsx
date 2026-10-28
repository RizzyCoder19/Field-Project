"use client";

import React, { useState, useEffect, useRef } from "react";
import { PRIMARY_DISEASES, MONTHS } from "@/data/researchData";

interface NativeSeasonalChartProps {
  initialDisease?: string;
  className?: string;
  allowToggleMode?: boolean;
}

const DISEASE_OPTIONS = [
  { id: "all", label: "All 5 Cohorts", color: "#5FB0A8" },
  { id: "dengue", label: "Dengue Fever", color: "#38BDF8" },
  { id: "add", label: "ADD (Diarrheal)", color: "#10B981" },
  { id: "malaria", label: "Malaria", color: "#F59E0B" },
  { id: "foodPoisoning", label: "Food Poisoning", color: "#EF4444" },
  { id: "chikungunya", label: "Chikungunya", color: "#A78BFA" },
];

export default function NativeSeasonalChart({
  initialDisease = "all",
  className = "",
  allowToggleMode = true,
}: NativeSeasonalChartProps) {
  const [selectedDisease, setSelectedDisease] = useState(initialDisease);
  const [prevInitialDisease, setPrevInitialDisease] = useState(initialDisease);
  const [metric, setMetric] = useState<"events" | "cases">("events");
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (initialDisease && prevInitialDisease !== initialDisease) {
    setPrevInitialDisease(initialDisease);
    setSelectedDisease(initialDisease);
  }

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

    frameId = requestAnimationFrame((timestamp) => {
      setAnimatedProgress(0);
      animate(timestamp);
    });

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
  const activeColor = DISEASE_OPTIONS.find((d) => d.id === selectedDisease)?.color || "#5FB0A8";

  const width = 840;
  const height = 340;
  const padding = { top: 45, right: 35, bottom: 50, left: 65 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const barWidth = (chartW / 12) * 0.65;
  const barGap = chartW / 12;

  // Peak index
  const peakIdx = values.indexOf(Math.max(...values));

  return (
    <div ref={containerRef} className={`w-full flex flex-col bg-[#0A1016] border border-white/[0.08] rounded-sm p-4 sm:p-6 lg:p-8 shadow-2xl ${className}`}>
      {/* Top Bar: Disease Selector & Metric Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
        <div className="flex flex-wrap gap-2">
          {DISEASE_OPTIONS.map((opt) => {
            const active = selectedDisease === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedDisease(opt.id)}
                className="font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-sm border transition-all flex items-center gap-1.5"
                style={{
                  borderColor: active ? opt.color : "rgba(255, 255, 255, 0.10)",
                  backgroundColor: active ? `${opt.color}25` : "#070A10",
                  color: active ? "#F5F1E8" : "#A8B6BA",
                  fontWeight: active ? "bold" : "normal",
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.color }} />
                {opt.label}
              </button>
            );
          })}
        </div>

        {allowToggleMode && (
          <div className="flex items-center gap-1 bg-[#070A10] border border-white/[0.08] p-1 rounded-sm">
            <button
              onClick={() => setMetric("events")}
              className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition-colors ${
                metric === "events"
                  ? "bg-[#5FB0A8] text-[#070A10] font-bold"
                  : "text-[#A8B6BA] hover:text-[#F5F1E8]"
              }`}
            >
              Outbreak Events (N=539)
            </button>
            <button
              onClick={() => setMetric("cases")}
              className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition-colors ${
                metric === "cases"
                  ? "bg-[#5FB0A8] text-[#070A10] font-bold"
                  : "text-[#A8B6BA] hover:text-[#F5F1E8]"
              }`}
            >
              Reported Cases (N=20,955)
            </button>
          </div>
        )}
      </div>

      {/* SVG Canvas - 840x340 */}
      <div className="relative w-full aspect-[21/9] min-h-[260px] sm:min-h-[300px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
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
                  stroke="#F5F1E8"
                  strokeOpacity="0.08"
                  strokeDasharray={ratio === 0 ? "none" : "3,3"}
                />
                <text
                  x={padding.left - 12}
                  y={y + 4}
                  textAnchor="end"
                  className="font-mono text-xs fill-[#A8B6BA]"
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
            stroke="#F5F1E8"
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

            return (
              <g key={MONTHS[i]} className="transition-all duration-200">
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={Math.max(h, 0)}
                  fill={isPeak ? "url(#peakGrad)" : "url(#barGrad)"}
                  rx="2"
                />

                {/* Value on top of bar */}
                {barProgress > 0.85 && v > 0 && (
                  <text
                    x={x + barWidth / 2}
                    y={y - 8}
                    textAnchor="middle"
                    className="font-mono text-xs sm:text-sm fill-[#F5F1E8] font-bold"
                  >
                    {v.toLocaleString()}
                  </text>
                )}

                {/* X-axis Month Label */}
                <text
                  x={padding.left + i * barGap + barGap / 2}
                  y={height - padding.bottom + 26}
                  textAnchor="middle"
                  className={`font-mono text-xs sm:text-sm font-bold ${
                    isPeak ? "fill-[#5FB0A8]" : "fill-[#A8B6BA]"
                  }`}
                >
                  {MONTHS[i]}
                </text>
              </g>
            );
          })}

          {/* Traced Continuous Seasonal Curve */}
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
                  strokeOpacity="0.9"
                  strokeDasharray="4 4"
                />
                {linePoints.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r={idx === peakIdx ? 5 : 3}
                    fill={idx === peakIdx ? "#FFFFFF" : activeColor}
                  />
                ))}
              </g>
            );
          })()}

          {/* Peak Indicator Callout */}
          {animatedProgress > 0.85 && values[peakIdx] > 0 && (
            <g className="animate-fadeIn">
              <rect
                x={padding.left + peakIdx * barGap + barGap / 2 - 55}
                y={padding.top - 32}
                width="110"
                height="24"
                rx="3"
                fill="#0A1016"
                stroke={activeColor}
                strokeWidth="1.5"
              />
              <text
                x={padding.left + peakIdx * barGap + barGap / 2}
                y={padding.top - 16}
                textAnchor="middle"
                className="font-mono text-[10px] font-bold uppercase tracking-wider"
                fill={activeColor}
              >
                ★ Peak: {MONTHS[peakIdx]}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Analytical Footnote */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-[#A8B6BA] border-t border-white/[0.06] pt-3">
        <span>Source: 2022–2025 Baseline Archives (539 primary records)</span>
        <span className="text-[#5FB0A8] font-bold">
          {metric === "events"
            ? `Total: ${values.reduce((a, b) => a + b, 0)} outbreak events`
            : `Total: ${values.reduce((a, b) => a + b, 0).toLocaleString()} reported cases`}
        </span>
      </div>
    </div>
  );
}
