"use client";

import React, { useState, useEffect } from "react";

export default function NativeTimeline2026({ className = "" }: { className?: string }) {
  const [currentWeek, setCurrentWeek] = useState(32);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentWeek((prev) => {
        if (prev >= 32) {
          setIsPlaying(false);
          return 32;
        }
        return prev + 1;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReplay = () => {
    setCurrentWeek(1);
    setIsPlaying(true);
  };

  const totalCalendarWeeks = 52;
  const observedWeeks = 32;
  const progressPct = (currentWeek / totalCalendarWeeks) * 100;
  const cutoffPct = (observedWeeks / totalCalendarWeeks) * 100;

  return (
    <div className={`w-full bg-[#0b0f0b] border border-[#EEE8DA]/08 rounded-sm p-6 flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#C7A75B]">
            Surveillance Boundary · Out-of-Sample Window
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#EEE8DA] mt-1">
            2026 Partial Window: W01 through W32
          </h3>
          <p className="font-mono text-xs text-[#B5B0A4] mt-1 max-w-xl">
            Surveillance observation ends strictly at Week 32. It cannot be used as an annual baseline or full-year forecast.
          </p>
        </div>

        <button
          onClick={handleReplay}
          className="font-mono text-[9px] uppercase tracking-wider px-3.5 py-1.5 rounded border border-[#C7A75B]/50 text-[#C7A75B] hover:bg-[#C7A75B]/10 transition-colors"
        >
          {isPlaying ? `Advancing W${currentWeek}…` : "▶ Replay Timeline to W32"}
        </button>
      </div>

      {/* Week Progress Bar & Timeline Track */}
      <div className="relative my-6 px-2">
        {/* Full Year Track (52 weeks) */}
        <div className="relative w-full h-8 bg-[#111411] border border-[#EEE8DA]/10 rounded flex items-center overflow-hidden">
          {/* Active elapsed fill up to currentWeek */}
          <div
            className="h-full bg-gradient-to-r from-[#4F91B8]/40 to-[#C7A75B]/80 transition-all duration-150"
            style={{ width: `${progressPct}%` }}
          />

          {/* Hard Stop Barrier at Week 32 */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#EF4444] z-20 shadow-[0_0_12px_#EF4444]"
            style={{ left: `${cutoffPct}%` }}
          >
            <div className="absolute -top-7 -left-12 font-mono text-[8px] uppercase tracking-widest text-[#EF4444] font-bold bg-[#111411] px-2 py-0.5 border border-[#EF4444]/40 rounded whitespace-nowrap">
              Cutoff: W32
            </div>
          </div>

          {/* Unobserved Window Hatch Pattern */}
          <div
            className="absolute top-0 bottom-0 right-0 bg-[#000000]/60 z-10 flex items-center justify-center pointer-events-none"
            style={{ left: `${cutoffPct}%` }}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#B5B0A4]/40">
              Weeks 33–52 Unobserved
            </span>
          </div>
        </div>

        {/* Milestone Tick Marks */}
        <div className="flex justify-between font-mono text-[8px] text-[#B5B0A4]/50 mt-2">
          <span>W01 (Jan)</span>
          <span>W13 (Q1)</span>
          <span>W26 (Mid-year)</span>
          <span className="text-[#EF4444] font-bold">W32 (Stop)</span>
          <span>W39 (Q3)</span>
          <span>W52 (Dec)</span>
        </div>
      </div>

      {/* Key Numbers Grid for 2026 W01-W32 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
        <div className="p-4 bg-[#111411] border border-[#EEE8DA]/08 rounded-sm text-center">
          <div className="font-serif text-3xl font-bold text-[#EEE8DA]">45</div>
          <div className="font-mono text-[8px] uppercase tracking-widest text-[#B5B0A4] mt-1">
            Primary Cohort Records
          </div>
          <div className="font-mono text-[7px] text-[#B5B0A4]/50 mt-0.5">Across 5 disease families</div>
        </div>

        <div className="p-4 bg-[#111411] border border-[#EEE8DA]/08 rounded-sm text-center">
          <div className="font-serif text-3xl font-bold text-[#C7A75B]">1,118</div>
          <div className="font-mono text-[8px] uppercase tracking-widest text-[#B5B0A4] mt-1">
            Reported Cases (W01–W32)
          </div>
          <div className="font-mono text-[7px] text-[#B5B0A4]/50 mt-0.5">6 Dengue · 15 ADD · 19 FP · 4 Mal · 1 Chik</div>
        </div>

        <div className="p-4 bg-[#111411] border border-[#EEE8DA]/08 rounded-sm text-center">
          <div className="font-serif text-3xl font-bold text-[#10B981]">0</div>
          <div className="font-mono text-[8px] uppercase tracking-widest text-[#B5B0A4] mt-1">
            Reported Deaths
          </div>
          <div className="font-mono text-[7px] text-[#B5B0A4]/50 mt-0.5">Zero fatalities recorded in window</div>
        </div>
      </div>

      {/* Narrative Warnings */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 bg-[#EF4444]/05 border border-[#EF4444]/20 rounded-sm">
          <div className="font-mono text-[8px] uppercase tracking-widest text-[#EF4444] font-bold">
            Truncation Warning
          </div>
          <div className="font-mono text-[10px] text-[#EEE8DA]/80 mt-1 leading-relaxed">
            Historically, <span className="text-[#38BDF8] font-bold">55.4%</span> of all Dengue outbreak events occur after Week 32. 
            Evaluating 2026 Dengue without post-monsoon weeks produces a false impression of suppression.
          </div>
        </div>

        <div className="p-3.5 bg-[#C7A75B]/05 border border-[#C7A75B]/20 rounded-sm">
          <div className="font-mono text-[8px] uppercase tracking-widest text-[#C7A75B] font-bold">
            Taxonomic Classification in 2026
          </div>
          <div className="font-mono text-[10px] text-[#EEE8DA]/80 mt-1 leading-relaxed">
            All 19 Food Poisoning events recorded in 2026 W01–W32 were explicitly categorized as <span className="text-[#C7A75B] font-bold">&ldquo;Suspected&rdquo;</span> in the NCDC PDF bulletins.
          </div>
        </div>
      </div>
    </div>
  );
}
