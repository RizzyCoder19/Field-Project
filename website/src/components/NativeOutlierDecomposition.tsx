"use client";

import React, { useState, useEffect } from "react";
import { OUTLIER_SENSITIVITY_DATA, MONTHS } from "@/data/researchData";
import { RefreshCw, ArrowDownRight } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export default function NativeOutlierDecomposition({ className = "" }: { className?: string }) {
  const [isTrimmed, setIsTrimmed] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(4); // 0=start, 1=-651, 2=-543, 3=-421, 4=final
  const [isDecomposing, setIsDecomposing] = useState(false);
  const { ref, hasAnimated } = useInViewAnimation<HTMLDivElement>({ threshold: 0.2 });

  // Animate the waterfall sequence
  const playDecomposition = () => {
    setIsDecomposing(true);
    setIsTrimmed(true);
    setActiveStep(0);

    const timeouts = [
      setTimeout(() => setActiveStep(1), 500),
      setTimeout(() => setActiveStep(2), 1100),
      setTimeout(() => setActiveStep(3), 1700),
      setTimeout(() => {
        setActiveStep(4);
        setIsDecomposing(false);
      }, 2300),
    ];

    return () => timeouts.forEach(clearTimeout);
  };

  // Automatically trigger decomposition demonstration on first viewport entry
  useEffect(() => {
    if (!hasAnimated) return;
    const timer = setTimeout(() => {
      playDecomposition();
    }, 450);

    return () => clearTimeout(timer);
  }, [hasAnimated]);

  const handleToggle = () => {
    if (!isTrimmed) {
      playDecomposition();
    } else {
      setIsTrimmed(false);
      setActiveStep(4);
    }
  };

  const cases = isTrimmed
    ? OUTLIER_SENSITIVITY_DATA.afterCases
    : OUTLIER_SENSITIVITY_DATA.beforeCases;

  const maxChartVal = 2200;

  return (
    <div ref={ref} className={`w-full bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm p-4 sm:p-6 flex flex-col shadow-2xl ${className}`} role="region" aria-label="Waterfall Outlier Decomposition Analysis">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F8FAFC]/10">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#EF4444] font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse" />
            Arithmetic Waterfall Decomposition · Sensitivity Analysis
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-1">
            Food Poisoning: Can 3 records alter the calendar peak?
          </h3>
          <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl leading-relaxed">
            In February, 3 single point-source outbreak events account for 1,615 of 2,162 reported cases (74.7%). Step through the arithmetic extraction below.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggle}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-sm border transition-all flex items-center gap-2 ${
              isTrimmed
                ? "border-[#10B981] text-[#10B981] bg-[#10B981]/10 hover:bg-[#10B981]/20 font-bold"
                : "border-[#EF4444] text-[#EF4444] bg-[#EF4444]/10 hover:bg-[#EF4444]/20 font-bold"
            }`}
          >
            {isDecomposing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Extracting Outliers...</span>
              </>
            ) : isTrimmed ? (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restore 3 Raw Records</span>
              </>
            ) : (
              <>
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>Deconstruct Arithmetic Waterfall</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── MOBILE VERSION (block sm:hidden): Arithmetic Waterfall Cascade Deck ── */}
      <div className="block sm:hidden space-y-3 mb-6">
        <div className="p-4 bg-[#06080F] border border-white/10 rounded-sm space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-[#87999E] uppercase">
            <span>February Arithmetic Cascade</span>
            <span className="text-[#5FB0A8] font-bold">-1,615 (-74.7%)</span>
          </div>

          {/* Starting Bar */}
          <div className="p-3 bg-[#EF4444]/15 border border-[#EF4444]/40 rounded-xs flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#EF4444] font-bold">Starting Baseline</div>
              <div className="font-serif text-xl font-bold text-[#F5F1E8]">Raw February Total</div>
            </div>
            <div className="font-serif text-2xl font-bold text-[#EF4444]">
              2,162 <span className="text-xs font-mono font-normal text-[#A8B6BA]">cases</span>
            </div>
          </div>

          {/* 3 Outlier Records Subtractions */}
          <div className="space-y-2 pl-3 border-l-2 border-[#F59E0B]/40 ml-1">
            <div className="p-2.5 bg-[#0B111E] border border-white/[0.08] rounded-xs flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-[#D7B56D]">Kolhapur · 2024 W07</div>
                <div className="text-xs text-[#F5F1E8] font-bold">Mass Wedding Feast</div>
              </div>
              <div className="font-serif text-lg font-bold text-[#F59E0B]">-651</div>
            </div>

            <div className="p-2.5 bg-[#0B111E] border border-white/[0.08] rounded-xs flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-[#D7B56D]">Parbhani · 2024 W08</div>
                <div className="text-xs text-[#F5F1E8] font-bold">Religious Feast Gathering</div>
              </div>
              <div className="font-serif text-lg font-bold text-[#F59E0B]">-543</div>
            </div>

            <div className="p-2.5 bg-[#0B111E] border border-white/[0.08] rounded-xs flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-[#D7B56D]">Solapur · 2023 W06</div>
                <div className="text-xs text-[#F5F1E8] font-bold">Banquet Exposure Cluster</div>
              </div>
              <div className="font-serif text-lg font-bold text-[#F59E0B]">-421</div>
            </div>
          </div>

          {/* Result Bar */}
          <div className="p-3 bg-[#10B981]/15 border border-[#10B981]/40 rounded-xs flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#10B981] font-bold">Trimmed Baseline</div>
              <div className="font-serif text-xl font-bold text-[#F5F1E8]">Remaining February Cases</div>
            </div>
            <div className="font-serif text-2xl font-bold text-[#10B981]">
              547 <span className="text-xs font-mono font-normal text-[#A8B6BA]">cases</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#87999E] pt-1">
            * 3 single records account for 74.7% of February cases. Once trimmed, February ranks #4 instead of #1.
          </div>
        </div>
      </div>

      {/* ── DESKTOP VERSION (hidden sm:block): SVG Waterfall Arithmetic Chart ── */}
      <div className="hidden sm:block p-4 sm:p-5 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm mb-6">
        <div className="flex items-center justify-between font-mono text-xs text-[#94A3B8] uppercase tracking-wider mb-4">
          <span>February Case Volume Arithmetic Cascade (2,162 → 547 cases)</span>
          <span className="text-[#5FB0A8] font-bold">Extraction Subtotal: -1,615 (-74.7%)</span>
        </div>

        <div className="relative w-full aspect-[21/9] min-h-[240px]">
          <svg viewBox="0 0 800 280" className="w-full h-full overflow-visible">
            {/* Background Gridlines */}
            {[0, 500, 1000, 1500, 2000].map((tick) => {
              const y = 230 - (tick / 2200) * 190;
              return (
                <g key={tick}>
                  <line x1="60" y1={y} x2="760" y2={y} stroke="#F8FAFC" strokeOpacity="0.08" strokeDasharray="3 3" />
                  <text x="50" y={y + 3} textAnchor="end" className="font-mono text-[9px] fill-[#94A3B8]/70">
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Baseline */}
            <line x1="60" y1="230" x2="760" y2="230" stroke="#F8FAFC" strokeOpacity="0.25" strokeWidth="1.5" />

            {/* Step 1: Starting Bar (2,162) */}
            {(() => {
              const barW = 75;
              const x1 = 100;
              const h1 = (2162 / 2200) * 190;
              const y1 = 230 - h1;
              const visible = activeStep >= 0;

              return (
                <g className="transition-opacity duration-500" opacity={visible ? 1 : 0.2}>
                  <rect
                    x={x1}
                    y={y1}
                    width={barW}
                    height={h1}
                    rx="2"
                    fill="#EF4444"
                    fillOpacity="0.85"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                  />
                  <text x={x1 + barW / 2} y={y1 - 8} textAnchor="middle" className="font-mono text-[11px] font-bold fill-[#EF4444]">
                    2,162
                  </text>
                  <text x={x1 + barW / 2} y="246" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#F8FAFC]">
                    Raw Feb
                  </text>
                  <text x={x1 + barW / 2} y="258" textAnchor="middle" className="font-mono text-[8px] fill-[#94A3B8]">
                    Baseline Total
                  </text>

                  {/* Connector to Step 2 */}
                  {activeStep >= 1 && (
                    <line
                      x1={x1 + barW}
                      y1={y1}
                      x2={230}
                      y2={y1}
                      stroke="#EF4444"
                      strokeDasharray="4 4"
                      strokeWidth="1.5"
                      className="animate-construct-stroke"
                    />
                  )}
                </g>
              );
            })()}

            {/* Step 2: Outlier 1 - Kolhapur (-651) */}
            {(() => {
              const barW = 75;
              const x2 = 230;
              const topY = 230 - (2162 / 2200) * 190;
              const bottomY = 230 - (1511 / 2200) * 190;
              const h2 = bottomY - topY;
              const visible = activeStep >= 1;

              return (
                <g className="transition-all duration-500" opacity={visible ? 1 : 0.15}>
                  <rect
                    x={x2}
                    y={topY}
                    width={barW}
                    height={Math.max(h2, 2)}
                    rx="2"
                    fill="#F59E0B"
                    fillOpacity="0.85"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                  />
                  <text x={x2 + barW / 2} y={topY - 8} textAnchor="middle" className="font-mono text-[11px] font-bold fill-[#F59E0B]">
                    -651
                  </text>
                  <text x={x2 + barW / 2} y="246" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#F8FAFC]">
                    Kolhapur
                  </text>
                  <text x={x2 + barW / 2} y="258" textAnchor="middle" className="font-mono text-[8px] fill-[#94A3B8]">
                    2024 · W07
                  </text>

                  {/* Connector to Step 3 */}
                  {activeStep >= 2 && (
                    <line
                      x1={x2 + barW}
                      y1={bottomY}
                      x2={360}
                      y2={bottomY}
                      stroke="#F59E0B"
                      strokeDasharray="4 4"
                      strokeWidth="1.5"
                      className="animate-construct-stroke"
                    />
                  )}
                </g>
              );
            })()}

            {/* Step 3: Outlier 2 - Parbhani (-543) */}
            {(() => {
              const barW = 75;
              const x3 = 360;
              const topY = 230 - (1511 / 2200) * 190;
              const bottomY = 230 - (968 / 2200) * 190;
              const h3 = bottomY - topY;
              const visible = activeStep >= 2;

              return (
                <g className="transition-all duration-500" opacity={visible ? 1 : 0.15}>
                  <rect
                    x={x3}
                    y={topY}
                    width={barW}
                    height={Math.max(h3, 2)}
                    rx="2"
                    fill="#F59E0B"
                    fillOpacity="0.85"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                  />
                  <text x={x3 + barW / 2} y={topY - 8} textAnchor="middle" className="font-mono text-[11px] font-bold fill-[#F59E0B]">
                    -543
                  </text>
                  <text x={x3 + barW / 2} y="246" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#F8FAFC]">
                    Parbhani
                  </text>
                  <text x={x3 + barW / 2} y="258" textAnchor="middle" className="font-mono text-[8px] fill-[#94A3B8]">
                    2024 · W08
                  </text>

                  {/* Connector to Step 4 */}
                  {activeStep >= 3 && (
                    <line
                      x1={x3 + barW}
                      y1={bottomY}
                      x2={490}
                      y2={bottomY}
                      stroke="#F59E0B"
                      strokeDasharray="4 4"
                      strokeWidth="1.5"
                      className="animate-construct-stroke"
                    />
                  )}
                </g>
              );
            })()}

            {/* Step 4: Outlier 3 - Solapur (-421) */}
            {(() => {
              const barW = 75;
              const x4 = 490;
              const topY = 230 - (968 / 2200) * 190;
              const bottomY = 230 - (547 / 2200) * 190;
              const h4 = bottomY - topY;
              const visible = activeStep >= 3;

              return (
                <g className="transition-all duration-500" opacity={visible ? 1 : 0.15}>
                  <rect
                    x={x4}
                    y={topY}
                    width={barW}
                    height={Math.max(h4, 2)}
                    rx="2"
                    fill="#F59E0B"
                    fillOpacity="0.85"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                  />
                  <text x={x4 + barW / 2} y={topY - 8} textAnchor="middle" className="font-mono text-[11px] font-bold fill-[#F59E0B]">
                    -421
                  </text>
                  <text x={x4 + barW / 2} y="246" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#F8FAFC]">
                    Solapur
                  </text>
                  <text x={x4 + barW / 2} y="258" textAnchor="middle" className="font-mono text-[8px] fill-[#94A3B8]">
                    2025 · W06
                  </text>

                  {/* Connector to Final Bar */}
                  {activeStep >= 4 && (
                    <line
                      x1={x4 + barW}
                      y1={bottomY}
                      x2={620}
                      y2={bottomY}
                      stroke="#10B981"
                      strokeDasharray="4 4"
                      strokeWidth="1.5"
                      className="animate-construct-stroke"
                    />
                  )}
                </g>
              );
            })()}

            {/* Step 5: Final Adjusted Baseline Bar (547) */}
            {(() => {
              const barW = 75;
              const x5 = 620;
              const h5 = (547 / 2200) * 190;
              const y5 = 230 - h5;
              const visible = activeStep >= 4;

              return (
                <g className="transition-all duration-500" opacity={visible ? 1 : 0.2}>
                  <rect
                    x={x5}
                    y={y5}
                    width={barW}
                    height={h5}
                    rx="2"
                    fill="#10B981"
                    fillOpacity="0.85"
                    stroke="#10B981"
                    strokeWidth="1.5"
                  />
                  <text x={x5 + barW / 2} y={y5 - 8} textAnchor="middle" className="font-mono text-[11px] font-bold fill-[#10B981]">
                    547
                  </text>
                  <text x={x5 + barW / 2} y="246" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#10B981]">
                    Adjusted Feb
                  </text>
                  <text x={x5 + barW / 2} y="258" textAnchor="middle" className="font-mono text-[8px] fill-[#94A3B8]">
                    Endemic Baseline
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-4 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#94A3B8]">February Raw Baseline</div>
          <div className="font-serif text-3xl font-bold text-[#EF4444] mt-1">2,162</div>
          <div className="font-mono text-xs text-[#94A3B8] mt-1">Complete surveillance reporting count</div>
        </div>

        <div className="p-4 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#F59E0B]">Extracted Outlier Volume</div>
          <div className="font-serif text-3xl font-bold text-[#F59E0B] mt-1">1,615 (74.7%)</div>
          <div className="font-mono text-xs text-[#94A3B8] mt-1">Kolhapur (651) + Parbhani (543) + Solapur (421)</div>
        </div>

        <div className="p-4 bg-[#06080F] border border-[#10B981]/30 rounded-sm bg-[#10B981]/05">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#10B981]">Adjusted Baseline Total</div>
          <div className="font-serif text-3xl font-bold text-[#10B981] mt-1">547</div>
          <div className="font-mono text-xs text-[#94A3B8] mt-1">Shifts calendar peak to April–May (899 &amp; 894)</div>
        </div>
      </div>

      {/* 12-Month Calendar Bar Chart: Impact on Seasonal Distribution */}
      <div className="p-4 sm:p-5 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm">
        <div className="flex items-center justify-between font-mono text-xs text-[#94A3B8] uppercase tracking-wider mb-3">
          <span>12-Month Food Poisoning Distribution · {isTrimmed ? "Adjusted Baseline View" : "Raw Surveillance View"}</span>
          <span className="font-bold" style={{ color: isTrimmed ? "#10B981" : "#EF4444" }}>
            Peak Month: {isTrimmed ? "April–May (899 & 894 cases)" : "February (2,162 cases)"}
          </span>
        </div>

        <div className="relative w-full aspect-[21/8] min-h-[200px]">
          <svg viewBox="0 0 700 220" className="w-full h-full">
            {/* Baseline */}
            <line x1="45" y1="180" x2="680" y2="180" stroke="#F8FAFC" strokeOpacity="0.15" />

            {cases.map((val, idx) => {
              const barW = 34;
              const gap = 635 / 12;
              const x = 45 + idx * gap + (gap - barW) / 2;
              const h = (val / maxChartVal) * 145;
              const y = 180 - h;
              const isFeb = idx === 1;
              const isAprMay = idx === 3 || idx === 4;

              return (
                <g key={MONTHS[idx]}>
                  <rect
                    x={x}
                    y={y}
                    width={barW}
                    height={Math.max(h, 2)}
                    rx="2"
                    fill={isFeb ? (isTrimmed ? "#10B981" : "#EF4444") : isAprMay && isTrimmed ? "#5FB0A8" : "#38BDF8"}
                    fillOpacity={isFeb ? 0.95 : isAprMay && isTrimmed ? 0.9 : 0.65}
                    className="transition-all duration-700 ease-out"
                  />

                  <text
                    x={x + barW / 2}
                    y={y - 6}
                    textAnchor="middle"
                    className="font-mono text-[9px] fill-[#F8FAFC] font-semibold"
                  >
                    {val > 0 ? val : ""}
                  </text>

                  <text
                    x={x + barW / 2}
                    y="198"
                    textAnchor="middle"
                    className={`font-mono text-[10px] ${
                      isFeb
                        ? "fill-[#EF4444] font-bold"
                        : isAprMay && isTrimmed
                        ? "fill-[#5FB0A8] font-bold"
                        : "fill-[#94A3B8]"
                    }`}
                  >
                    {MONTHS[idx]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Methodological Discipline Note */}
      <div className="mt-4 p-3 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm font-mono text-xs text-[#94A3B8] leading-relaxed">
        <span className="text-[#5FB0A8] font-bold uppercase tracking-wider">Methodological Discipline: </span>
        These three records were <span className="text-[#F8FAFC] font-bold">never deleted</span> from the primary research archive. 
        Sensitivity analysis models the sensitivity of temporal distributions to single point-source mass exposure events (such as banquet or institutional catering contamination) versus diffuse community transmission.
      </div>
    </div>
  );
}
