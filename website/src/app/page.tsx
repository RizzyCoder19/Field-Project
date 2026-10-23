"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import Link from "next/link";
import { 
  ArrowRight, BookOpen, Database, Layers, Calendar, 
  MapPin, CheckCircle2, AlertCircle, Play, FileText, ExternalLink,
  Activity, Sparkles, TrendingUp, ShieldAlert, Compass
} from "lucide-react";
import { RESEARCH_METRICS, SURVEILLANCE_COVERAGE } from "@/data/researchData";
import { RESEARCH_CHAPTERS } from "@/data/chapters";
import RadialSeasonalClock from "@/components/RadialSeasonalClock";
import NativeSeasonalChart from "@/components/NativeSeasonalChart";

const CinematicIntro = lazy(() => import("@/components/CinematicIntro"));

// Module-level flag:
// - Survives client-side navigation between routes (so returning to Home does NOT re-trigger intro)
// - Resets automatically on full page refresh (F5/hard reload) so refreshing DOES trigger the intro
let introHasPlayedInSession = false;

export default function MainPage() {
  const [introComplete, setIntroComplete] = useState(() => introHasPlayedInSession);
  const [showReplayIntro, setShowReplayIntro] = useState(false);
  const [compassStage, setCompassStage] = useState(0);
  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [clockDisease, setClockDisease] = useState<string | null>("dengue");

  const handleIntroComplete = () => {
    introHasPlayedInSession = true;
    setIntroComplete(true);
    setShowReplayIntro(false);
  };

  const handleTriggerReplay = () => {
    setShowReplayIntro(true);
  };

  useEffect(() => {
    if (introComplete && !showReplayIntro) {
      const timers = [
        setTimeout(() => setCompassStage(0), 10),
        setTimeout(() => setCompassStage(1), 120),  // Rings
        setTimeout(() => setCompassStage(2), 350),  // Crosshairs
        setTimeout(() => setCompassStage(3), 600),  // Pre-Monsoon
        setTimeout(() => setCompassStage(4), 850),  // Monsoon ADD
        setTimeout(() => setCompassStage(5), 1100), // Post-Monsoon Dengue
        setTimeout(() => setCompassStage(6), 1350), // Winter Food Poisoning
        setTimeout(() => setCompassStage(7), 1600), // Center Hub
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [introComplete, showReplayIntro]);

  const replayConstruction = () => {
    setCompassStage(0);
    const timers = [
      setTimeout(() => setCompassStage(1), 80),
      setTimeout(() => setCompassStage(2), 250),
      setTimeout(() => setCompassStage(3), 450),
      setTimeout(() => setCompassStage(4), 650),
      setTimeout(() => setCompassStage(5), 850),
      setTimeout(() => setCompassStage(6), 1050),
      setTimeout(() => setCompassStage(7), 1250),
    ];
    return () => timers.forEach(clearTimeout);
  };

  return (
    <>
      {/* ── CINEMATIC INTRO ── */}
      {(!introComplete || showReplayIntro) && (
        <Suspense fallback={<div className="fixed inset-0 bg-black z-[9999]" />}>
          <CinematicIntro onComplete={handleIntroComplete} />
        </Suspense>
      )}

      {/* ── PAGE 1: THE RESEARCH OPENING EXHIBITION ── */}
      <main
        className="w-full bg-[#06080F] text-[#F8FAFC] transition-opacity duration-700 min-h-screen"
        style={{ opacity: introComplete && !showReplayIntro ? 1 : 0 }}
      >
        {/* 1. VISUAL HERO & OBSERVATORY COMPASS */}
        <section className="relative border-b border-[#F8FAFC]/15 bg-gradient-to-b from-[#030407] via-[#06080F] to-[#06080F] pt-12 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#00F0FF]/06 rounded-full blur-[160px] pointer-events-none" />

          <div className="max-w-6xl mx-auto space-y-8 relative z-10">
            {/* Academic Credential Masthead */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#94A3B8] border-b border-[#D4AF37]/20 pb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-2.5 py-0.5 bg-[#0B111E] border border-[#D4AF37]/50 text-[#F5D061] font-bold uppercase tracking-wider rounded-sm text-[10px] sm:text-xs shadow-sm">
                  B.Sc. Data Science · Sem III Field Project
                </span>
                <span className="hidden sm:inline text-[#D4AF37]/40">|</span>
                <span>RP Institute · University of Mumbai</span>
                <span className="hidden sm:inline text-[#D4AF37]/40">|</span>
                <span className="text-[#F5D061] font-bold tracking-wide">Khan Umar</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleTriggerReplay}
                  className="px-3 py-1 bg-[#0B111E] hover:bg-[#141E34] border border-[#D4AF37]/30 hover:border-[#F5D061] text-[#F8FAFC] font-mono text-[11px] uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 shadow-sm"
                  title="Replay the cinematic audio-visual documentary prologue"
                >
                  <Play className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>Replay Film Intro</span>
                </button>
                <a
                  href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
                  download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
                  className="px-3 py-1 bg-[#06080F] hover:bg-[#0B111E] border border-[#D4AF37]/35 text-[#F5D061] hover:text-[#FFF] hover:bg-[#D4AF37]/15 font-mono text-[11px] uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-[#D4AF37]" />
                  <span>Academic PDF</span>
                </a>
              </div>
            </div>

            {/* Principal Editorial Headline & Short Sentence */}
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#00F0FF] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
                <span>Primary Research Inquiry</span>
              </div>
              <h1 className="heading-display">
                Do disease outbreaks follow the seasons, and do those rhythms repeat?
              </h1>
              <p className="copy-lead max-w-3xl">
                Four years of government disease surveillance, 539 investigated outbreaks, and ground truth from an urban health post in Maharashtra.
              </p>
            </div>

            {/* THE DOMINANT VISUAL EXHIBIT: 4-SEASON OBSERVATORY COMPASS + 4 EMPIRICAL PILLARS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
              {/* Left / Center: Interactive Seasonal Compass Motif (7 cols) */}
              <div className="lg:col-span-7 relative flex flex-col items-center justify-center p-6 sm:p-8 bg-[#0B111E]/80 border border-[#D4AF37]/25 rounded-sm backdrop-blur-sm overflow-hidden shadow-2xl">
                {/* Visual construction toolbar */}
                <div className="w-full flex items-center justify-between pb-4 border-b border-[#F8FAFC]/10 mb-4 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#F5D061] uppercase tracking-wider font-semibold">
                    <Compass className="w-4 h-4 text-[#D4AF37]" />
                    <span>Four-Season Observatory Dial</span>
                  </div>
                  <button
                    onClick={replayConstruction}
                    className="px-2.5 py-1 bg-[#06080F] hover:bg-[#141E34] border border-[#00F0FF]/40 text-[#00F0FF] hover:text-[#FFF] rounded-sm uppercase tracking-wider text-[10px] transition-colors"
                    title="Watch the coordinate system and data construct in real time"
                  >
                    ↺ Reconstruct Dial
                  </button>
                </div>

                {/* SVG Seasonal Compass with Genuine Graphical Assembly */}
                <svg viewBox="0 0 460 460" className="w-full max-w-[430px] aspect-square select-none">
                  <defs>
                    <radialGradient id="compassGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.18" />
                      <stop offset="60%" stopColor="#00F0FF" stopOpacity="0.04" />
                      <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="goldCenter" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F5D061" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
                    </radialGradient>
                  </defs>

                  {/* Step 0: Background Radial Glow */}
                  <circle cx="230" cy="230" r="210" fill="url(#compassGlow)" />

                  {/* Step 1: Concentric Grid Rings draw into place */}
                  {compassStage >= 1 && (
                    <g className="transition-opacity duration-500">
                      <circle
                        cx="230"
                        cy="230"
                        r="200"
                        fill="none"
                        stroke="#F8FAFC"
                        strokeOpacity="0.12"
                        strokeWidth="1"
                        className="animate-construct-stroke"
                      />
                      <circle
                        cx="230"
                        cy="230"
                        r="150"
                        fill="none"
                        stroke="#D4AF37"
                        strokeOpacity="0.22"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        className="animate-construct-stroke"
                      />
                      <circle
                        cx="230"
                        cy="230"
                        r="95"
                        fill="none"
                        stroke="#F8FAFC"
                        strokeOpacity="0.15"
                        strokeWidth="1"
                        className="animate-construct-stroke"
                      />
                      <circle
                        cx="230"
                        cy="230"
                        r="40"
                        fill="#06080F"
                        stroke="#00F0FF"
                        strokeOpacity="0.5"
                        strokeWidth="1.5"
                      />
                    </g>
                  )}

                  {/* Step 2: Axis Crosshairs shoot out to 4 cardinal poles */}
                  {compassStage >= 2 && (
                    <g className="transition-opacity duration-300">
                      <line x1="230" y1="20" x2="230" y2="440" stroke="#F8FAFC" strokeOpacity="0.15" strokeWidth="1" />
                      <line x1="20" y1="230" x2="440" y2="230" stroke="#F8FAFC" strokeOpacity="0.15" strokeWidth="1" />
                    </g>
                  )}

                  {/* Step 4: Season 1: Monsoon (Jun–Aug) · Top-Right Sector · ADD Wave */}
                  {compassStage >= 4 && (
                    <g
                      className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                      onClick={() => setActiveSeason(activeSeason === "monsoon" ? null : "monsoon")}
                    >
                      <path
                        d="M 230 230 L 230 35 A 195 195 0 0 1 425 230 Z"
                        fill="#10B981"
                        fillOpacity={activeSeason === "monsoon" ? "0.26" : "0.14"}
                        stroke="#10B981"
                        strokeOpacity="0.75"
                        strokeWidth={activeSeason === "monsoon" ? "2.5" : "1.5"}
                        className="transition-all duration-300"
                      />
                      <text x="315" y="135" fill="#10B981" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        MONSOON (JUN–AUG)
                      </text>
                      <text x="315" y="155" fill="#F8FAFC" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.9">
                        ADD Peak · Jul Rains (29 rec)
                      </text>
                    </g>
                  )}

                  {/* Step 5: Season 2: Post-Monsoon (Sep–Nov) · Bottom-Right Sector · Dengue Surge */}
                  {compassStage >= 5 && (
                    <g
                      className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                      onClick={() => setActiveSeason(activeSeason === "postMonsoon" ? null : "postMonsoon")}
                    >
                      <path
                        d="M 230 230 L 425 230 A 195 195 0 0 1 230 425 Z"
                        fill="#38BDF8"
                        fillOpacity={activeSeason === "postMonsoon" ? "0.26" : "0.14"}
                        stroke="#38BDF8"
                        strokeOpacity="0.75"
                        strokeWidth={activeSeason === "postMonsoon" ? "2.5" : "1.5"}
                        className="transition-all duration-300"
                      />
                      <text x="315" y="315" fill="#38BDF8" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        POST-MONSOON (SEP–NOV)
                      </text>
                      <text x="315" y="335" fill="#F8FAFC" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.9">
                        Dengue Peak · Oct Surge (40 rec)
                      </text>
                    </g>
                  )}

                  {/* Step 6: Season 3: Winter (Dec–Feb) · Bottom-Left Sector · Food Poisoning Banquets */}
                  {compassStage >= 6 && (
                    <g
                      className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                      onClick={() => setActiveSeason(activeSeason === "winter" ? null : "winter")}
                    >
                      <path
                        d="M 230 230 L 230 425 A 195 195 0 0 1 35 230 Z"
                        fill="#EF4444"
                        fillOpacity={activeSeason === "winter" ? "0.24" : "0.12"}
                        stroke="#EF4444"
                        strokeOpacity="0.7"
                        strokeWidth={activeSeason === "winter" ? "2.5" : "1.5"}
                        className="transition-all duration-300"
                      />
                      <text x="145" y="315" fill="#EF4444" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        WINTER (DEC–FEB)
                      </text>
                      <text x="145" y="335" fill="#F8FAFC" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.9">
                        Food Poisoning Banquets (31 rec)
                      </text>
                    </g>
                  )}

                  {/* Step 3: Season 4: Pre-Monsoon / Summer (Mar–May) · Top-Left Sector · Baseline */}
                  {compassStage >= 3 && (
                    <g
                      className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                      onClick={() => setActiveSeason(activeSeason === "preMonsoon" ? null : "preMonsoon")}
                    >
                      <path
                        d="M 230 230 L 35 230 A 195 195 0 0 1 230 35 Z"
                        fill="#F59E0B"
                        fillOpacity={activeSeason === "preMonsoon" ? "0.22" : "0.1"}
                        stroke="#F59E0B"
                        strokeOpacity="0.6"
                        strokeWidth={activeSeason === "preMonsoon" ? "2.5" : "1.5"}
                        className="transition-all duration-300"
                      />
                      <text x="145" y="135" fill="#F59E0B" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        PRE-MONSOON (MAR–MAY)
                      </text>
                      <text x="145" y="155" fill="#F8FAFC" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.9">
                        Malaria May Surge · Dry Baseline
                      </text>
                    </g>
                  )}

                  {/* Step 7: Center Node & Core Focal Seal */}
                  {compassStage >= 7 && (
                    <g className="transition-opacity duration-500">
                      <circle cx="230" cy="230" r="10" fill="url(#goldCenter)" stroke="#00F0FF" strokeWidth="1.5" />
                      <circle cx="230" cy="230" r="3" fill="#FFF" />
                      <text x="230" y="278" fill="#F5D061" fontSize="11" fontFamily="serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">
                        4-Year Surveillance Cycle
                      </text>
                    </g>
                  )}
                </svg>

                <div className="pt-4 text-center">
                  <span className="text-xs sm:text-sm font-mono text-[#94A3B8]">
                    Click any quadrant to isolate seasonal vectors · 539 outbreaks mapped across 12 calendar months
                  </span>
                </div>
              </div>

              {/* Right: 4 Prominent Empirical Indicators (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className="p-5 bg-[#0B111E] border border-[#F8FAFC]/12 rounded-sm space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#94A3B8]">
                    <span className="uppercase tracking-wider">Surveillance Coverage</span>
                    <span className="text-[#00F0FF] font-bold">2022–2025</span>
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
                    {compassStage >= 1 ? "237 Weeks" : "0 Weeks"}
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-[#94A3B8]/80 pt-1">
                    203 active outbreak weeks · 34 official NIL weeks · 3 unlocated
                  </p>
                </div>

                <div className="p-5 bg-[#0B111E] border border-[#F8FAFC]/12 rounded-sm space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#94A3B8]">
                    <span className="uppercase tracking-wider">Primary Research Cohort</span>
                    <span className="text-[#10B981] font-bold">73.5% Share</span>
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
                    {compassStage >= 3 ? "539 Records" : "0 Records"}
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-[#94A3B8]/80 pt-1">
                    5 focal disease groups out of 733 total state records
                  </p>
                </div>

                <div className="p-5 bg-[#0B111E] border border-[#F8FAFC]/12 rounded-sm space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#94A3B8]">
                    <span className="uppercase tracking-wider">Total Patient Cases</span>
                    <span className="text-[#EF4444] font-bold">1.27% CFR</span>
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
                    {compassStage >= 5 ? "20,955 Cases" : "0 Cases"}
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-[#94A3B8]/80 pt-1">
                    266 reported fatalities documented by investigating response teams
                  </p>
                </div>

                <div className="p-5 bg-[#0B111E] border border-[#F8FAFC]/12 rounded-sm space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#94A3B8]">
                    <span className="uppercase tracking-wider">Partial 2026 Comparison</span>
                    <span className="text-[#38BDF8] font-bold">Out-of-Sample</span>
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
                    {compassStage >= 6 ? "Weeks 1–32" : "W00"}
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-[#94A3B8]/80 pt-1">
                    45 records · 2,126 cases · rigorously period-matched to W01–W32
                  </p>
                </div>

                <a
                  href="#chapter-scenes"
                  className="w-full py-3.5 bg-[#00F0FF] hover:bg-[#38BDF8] text-[#06080F] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm transition-all shadow-lg flex items-center justify-center gap-2 group mt-1"
                >
                  <span>Enter the 11 Research Exhibits</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 1.5. THE 12-MONTH RADIAL DISEASE CLOCK & SEASONAL BAR MATRIX */}
        <section className="border-t border-[#F8FAFC]/15 bg-[#080D1A] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#F8FAFC]/10 pb-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00F0FF] font-bold">
                  Surveillance Temporal Dynamics
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
                  The 12-Month Disease Clock &amp; Seasonal Bar Matrix
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] max-w-3xl">
                  Comprehensive 4-year cyclic distribution (2022–2025). The circular clock visualizes the annual transmission cycle while the synchronized bar graph details monthly outbreak frequency and patient burden.
                </p>
              </div>

              <Link
                href="/seasonality"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B111E] hover:bg-[#162035] border border-[#00F0FF]/40 text-[#00F0FF] rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>Full Seasonality Exhibit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Coordinated Dual Visual Instrument */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-center bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm p-6 sm:p-8 shadow-2xl">
              {/* Left Column: 12-Month Circular Radial Clock (5 cols) */}
              <div className="xl:col-span-5 flex flex-col items-center justify-center">
                <div className="w-full text-center pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                    12-Month Circular Epidemiological Clock
                  </span>
                </div>
                <RadialSeasonalClock
                  focusedDisease={clockDisease}
                  onSelectDisease={(d) => setClockDisease(d)}
                  className="w-full"
                />
              </div>

              {/* Right Column: Native Seasonal Bar Graph (7 cols) */}
              <div className="xl:col-span-7 flex flex-col justify-between">
                <div className="w-full pb-3 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#00F0FF] font-bold">
                    Monthly Empirical Distribution
                  </span>
                  <span className="text-[11px] font-mono text-[#94A3B8]">
                    Click bars to inspect individual months
                  </span>
                </div>
                <NativeSeasonalChart
                  initialDisease={clockDisease || "all"}
                  allowToggleMode={true}
                  className="w-full border-0 bg-transparent p-0 shadow-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE EXHIBITION INDEX: 11 DISTINCTIVE VISUAL SCENES */}
        <section id="chapter-scenes" className="border-t border-[#F8FAFC]/15 bg-[#030407] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#F8FAFC]/10 pb-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00F0FF] font-bold">
                  Curated Digital Science Exhibition
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
                  The Research Exhibits
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl">
                  Each chapter is a distinct interactive instrument designed to discover one core finding visually.
                </p>
              </div>

              <span className="text-xs font-mono text-[#00F0FF]">
                11 Interactive Scenes · 2022–2026 Data
              </span>
            </div>

            {/* Exhibits Grid: Custom Visual Silhouette / Preview for Every Scene */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* SCENE 02: DATA PROVENANCE */}
              <Link
                href="/data"
                className="group p-5 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#00F0FF]">EXHIBIT 02</span>
                    <span className="text-[10px] uppercase text-[#94A3B8]/70">DATA PROVENANCE</span>
                  </div>

                  {/* Visual Silhouette Preview: Document to Data Extraction */}
                  <div className="h-28 w-full bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm p-3 flex items-center justify-between relative overflow-hidden group-hover:border-[#00F0FF]/40 transition-colors">
                    <div className="w-[45%] h-full border border-dashed border-[#94A3B8]/30 p-2 flex flex-col justify-between font-mono text-[8px] text-[#94A3B8]">
                      <span className="text-[7px] text-[#00F0FF] uppercase font-bold">NCDC Form B</span>
                      <div className="space-y-1">
                        <div className="h-1.5 w-full bg-[#F8FAFC]/20 rounded-xs" />
                        <div className="h-1.5 w-3/4 bg-[#F8FAFC]/20 rounded-xs" />
                        <div className="h-1.5 w-5/6 bg-[#38BDF8]/40 rounded-xs" />
                      </div>
                      <span className="text-[7px] text-right">RAW PDF</span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#00F0FF] shrink-0 group-hover:translate-x-1 transition-transform" />

                    <div className="w-[45%] h-full bg-[#0B111E] border border-[#10B981]/40 p-2 flex flex-col justify-between font-mono text-[8px] text-[#10B981]">
                      <span className="text-[7px] uppercase font-bold text-[#10B981]">Clean SQL</span>
                      <div className="space-y-0.5 text-[7px] text-[#F8FAFC]/80">
                        <div>id: 312</div>
                        <div>wk: 33 · cs: 218</div>
                      </div>
                      <span className="text-[7px] text-right text-[#00F0FF]">AUDITED</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                    From Bulletin to Research Record
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">
                    Interactive document extraction demonstrating how weekly government surveillance notices become structured data.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between text-xs font-mono text-[#00F0FF]">
                  <span>Launch Exhibit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* SCENE 03: THE FIVE DISEASES */}
              <Link
                href="/diseases"
                className="group p-5 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#00F0FF]">EXHIBIT 03</span>
                    <span className="text-[10px] uppercase text-[#94A3B8]/70">COHORT COMPARISON</span>
                  </div>

                  {/* Visual Silhouette: 5 Colored Disease Bars */}
                  <div className="h-28 w-full bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm p-3 flex flex-col justify-around group-hover:border-[#00F0FF]/40 transition-colors font-mono text-[8px]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[7px]">
                        <span className="text-[#38BDF8]">DENGUE (153 rec)</span>
                        <span className="text-[#F8FAFC]">4,500 cs</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#38BDF8]/20 rounded-xs overflow-hidden">
                        <div className="h-full bg-[#38BDF8]" style={{ width: "75%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[7px]">
                        <span className="text-[#10B981]">ADD (144 rec)</span>
                        <span className="text-[#F8FAFC]">5,660 cs</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#10B981]/20 rounded-xs overflow-hidden">
                        <div className="h-full bg-[#10B981]" style={{ width: "95%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[7px]">
                        <span className="text-[#F59E0B]">MALARIA (70 rec)</span>
                        <span className="text-[#F8FAFC]">2,980 cs</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#F59E0B]/20 rounded-xs overflow-hidden">
                        <div className="h-full bg-[#F59E0B]" style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                    The Five Primary Disease Groups
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">
                    Interactive morphing graphic comparing outbreak frequency, reported case volumes, and CFR across the five groups.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between text-xs font-mono text-[#00F0FF]">
                  <span>Launch Exhibit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* SCENE 04: SEASONALITY */}
              <Link
                href="/seasonality"
                className="group p-5 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#00F0FF]">EXHIBIT 04</span>
                    <span className="text-[10px] uppercase text-[#94A3B8]/70">TEMPORAL RHYTHMS</span>
                  </div>

                  {/* Visual Silhouette: Miniature Radial Clock */}
                  <div className="h-28 w-full bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm p-2 flex items-center justify-center relative overflow-hidden group-hover:border-[#00F0FF]/40 transition-colors">
                    <svg viewBox="0 0 100 100" className="h-full aspect-square">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#F8FAFC" strokeOpacity="0.15" strokeWidth="1" />
                      <circle cx="50" cy="50" r="28" fill="none" stroke="#F8FAFC" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 2" />
                      {/* Monsoon Sector */}
                      <path d="M 50 50 L 50 8 A 42 42 0 0 1 92 50 Z" fill="#10B981" fillOpacity="0.25" stroke="#10B981" strokeWidth="1" />
                      {/* Post-Monsoon Sector */}
                      <path d="M 50 50 L 92 50 A 42 42 0 0 1 50 92 Z" fill="#38BDF8" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1" />
                      <circle cx="50" cy="50" r="4" fill="#00F0FF" />
                    </svg>
                    <span className="absolute bottom-1 right-2 font-mono text-[7px] text-[#00F0FF]">12-MONTH CLOCK</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                    Seasonal Rhythms & Peaks
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">
                    Signature interactive twelve-month radial instrument and linked monthly curves showing divergent temporal peaks.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between text-xs font-mono text-[#00F0FF]">
                  <span>Launch Exhibit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* SCENE 05: GEOGRAPHY */}
              <Link
                href="/geography"
                className="group p-5 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#00F0FF]">EXHIBIT 05</span>
                    <span className="text-[10px] uppercase text-[#94A3B8]/70">SPATIAL PATTERNS</span>
                  </div>

                  {/* Visual Silhouette: Maharashtra Outline & Gadchiroli Hotspot */}
                  <div className="h-28 w-full bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm p-3 flex items-center justify-center relative overflow-hidden group-hover:border-[#00F0FF]/40 transition-colors">
                    <svg viewBox="0 0 120 90" className="h-full aspect-[4/3]">
                      <path
                        d="M 15 25 L 35 15 L 75 18 L 105 28 L 115 50 L 95 75 L 60 78 L 30 75 L 12 55 Z"
                        fill="#0B111E"
                        stroke="#F8FAFC"
                        strokeOpacity="0.3"
                        strokeWidth="1.5"
                      />
                      {/* Gadchiroli / Chandrapur Hotspot */}
                      <circle cx="102" cy="48" r="7" fill="#F59E0B" fillOpacity="0.4" stroke="#F59E0B" strokeWidth="1.5" />
                      <circle cx="102" cy="48" r="2.5" fill="#F59E0B" />
                    </svg>
                    <span className="absolute bottom-1 right-2 font-mono text-[7px] text-[#F59E0B]">GADCHIROLI 61.4%</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                    Geographic Reporting Footprint
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">
                    Interactive 36-district state map with live inspection HUD and focal eastern forest malaria clustering.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between text-xs font-mono text-[#00F0FF]">
                  <span>Launch Exhibit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* SCENE 06: STABILITY */}
              <Link
                href="/stability"
                className="group p-5 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#00F0FF]">EXHIBIT 06</span>
                    <span className="text-[10px] uppercase text-[#94A3B8]/70">ANNUAL REPEATABILITY</span>
                  </div>

                  {/* Visual Silhouette: Kendall Concordance Rank Lines */}
                  <div className="h-28 w-full bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm p-3 flex flex-col justify-center relative overflow-hidden group-hover:border-[#00F0FF]/40 transition-colors">
                    <svg viewBox="0 0 140 60" className="w-full h-full">
                      <line x1="10" y1="50" x2="130" y2="50" stroke="#F8FAFC" strokeOpacity="0.1" />
                      <line x1="10" y1="10" x2="130" y2="10" stroke="#F8FAFC" strokeOpacity="0.1" />
                      {/* ADD Concordant Peak Curve */}
                      <path d="M 15 45 Q 60 42 70 15 T 125 45" fill="none" stroke="#10B981" strokeWidth="2" />
                      {/* Wandering Vector Line */}
                      <path d="M 15 40 Q 40 45 95 18 T 125 42" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 2" />
                    </svg>
                    <span className="absolute bottom-1 right-2 font-mono text-[7px] text-[#10B981]">ADD W=0.530 (p=0.016)</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                    Does the Pattern Repeat?
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">
                    Four-year trajectory alignment testing whether annual peaks arrive at the same calendar time across 2022–2025.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between text-xs font-mono text-[#00F0FF]">
                  <span>Launch Exhibit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* SCENE 07: OUTLIERS */}
              <Link
                href="/outliers"
                className="group p-5 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#00F0FF]">EXHIBIT 07</span>
                    <span className="text-[10px] uppercase text-[#94A3B8]/70">SENSITIVITY ANALYSIS</span>
                  </div>

                  {/* Visual Silhouette: Waterfall Subtraction */}
                  <div className="h-28 w-full bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm p-3 flex items-center justify-around group-hover:border-[#00F0FF]/40 transition-colors font-mono text-[8px]">
                    <div className="flex flex-col items-center">
                      <div className="h-14 w-5 bg-[#EF4444] rounded-xs" />
                      <span className="text-[7px] text-[#EF4444] mt-1">2,162</span>
                      <span className="text-[6px] text-[#94A3B8]">RAW</span>
                    </div>

                    <div className="text-[#00F0FF] text-xs font-bold">-1,615</div>

                    <div className="flex flex-col items-center">
                      <div className="h-4 w-5 bg-[#10B981] rounded-xs mt-10" />
                      <span className="text-[7px] text-[#10B981] mt-1">547</span>
                      <span className="text-[6px] text-[#94A3B8]">BASE</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                    The Outlier Investigation
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">
                    Interactive waterfall decomposition showing how 3 banquet events alter the statewide February curve.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between text-xs font-mono text-[#00F0FF]">
                  <span>Launch Exhibit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* SCENE 08: PARTIAL 2026 */}
              <Link
                href="/comparison-2026"
                className="group p-5 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#00F0FF]">EXHIBIT 08</span>
                    <span className="text-[10px] uppercase text-[#94A3B8]/70">OUT-OF-SAMPLE MONITORING</span>
                  </div>

                  {/* Visual Silhouette: 32-Week Barrier */}
                  <div className="h-28 w-full bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm p-3 flex flex-col justify-center relative overflow-hidden group-hover:border-[#00F0FF]/40 transition-colors">
                    <div className="flex items-center h-8 w-full border border-[#F8FAFC]/10 rounded-xs overflow-hidden">
                      <div className="h-full bg-[#38BDF8]/40 flex items-center justify-center font-mono text-[7px] text-[#38BDF8] font-bold" style={{ width: "62%" }}>
                        W01–W32 (45 REC)
                      </div>
                      <div className="h-full bg-stripes-warning flex items-center justify-center font-mono text-[6px] text-[#94A3B8]/50" style={{ width: "38%" }}>
                        UNOBSERVED W33–52
                      </div>
                    </div>
                    <span className="font-mono text-[7px] text-[#00F0FF] pt-2 text-center">32-WEEK SURVEILLANCE BOUNDARY</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                    The 32-Week Barrier
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">
                    Visual calendar boundary demonstrating why partial-year surveillance must be matched to historical windows.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between text-xs font-mono text-[#00F0FF]">
                  <span>Launch Exhibit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* SCENE 09: FIELDWORK */}
              <Link
                href="/fieldwork"
                className="group p-5 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#00F0FF]">EXHIBIT 09</span>
                    <span className="text-[10px] uppercase text-[#94A3B8]/70">PRIMARY FIELD EVIDENCE</span>
                  </div>

                  {/* Visual Silhouette: Fieldwork Photo Vignette */}
                  <div className="h-28 w-full bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm overflow-hidden relative group-hover:border-[#00F0FF]/40 transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/fieldwork/vvmc-government-hospital-nalasopara-east-palghar-hospitals-WVNkfr7tUF.webp"
                      alt="Palghar UHP"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06080F] via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-2 font-mono text-[7px] text-[#00F0FF] uppercase font-bold">
                      PALGHAR UHP · 2 OCT 2026
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                    Fieldwork: Ground Truth in Palghar
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">
                    Interactive photo essay with curtain reveal connecting statewide numbers to clinical registers and storage barrels.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between text-xs font-mono text-[#00F0FF]">
                  <span>Launch Exhibit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* SCENE 10: FINDINGS & RECOMMENDATIONS */}
              <Link
                href="/findings"
                className="group p-5 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#00F0FF]">EXHIBIT 10</span>
                    <span className="text-[10px] uppercase text-[#94A3B8]/70">SYNTHESIS & ACTION</span>
                  </div>

                  {/* Visual Silhouette: Evidence to Action Graph */}
                  <div className="h-28 w-full bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm p-3 flex flex-col justify-around group-hover:border-[#00F0FF]/40 transition-colors font-mono text-[8px]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      <span className="text-[#94A3B8]">ADD July Wave</span>
                      <ArrowRight className="w-2.5 h-2.5 text-[#00F0FF] ml-auto" />
                      <span className="text-[#F8FAFC] font-bold">Pre-Monsoon Chlorine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                      <span className="text-[#94A3B8]">Dengue Oct Surge</span>
                      <ArrowRight className="w-2.5 h-2.5 text-[#00F0FF] ml-auto" />
                      <span className="text-[#F8FAFC] font-bold">Aug Drum Inspection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                      <span className="text-[#94A3B8]">Forest Malaria (61%)</span>
                      <ArrowRight className="w-2.5 h-2.5 text-[#00F0FF] ml-auto" />
                      <span className="text-[#F8FAFC] font-bold">Focal Tribal Nets</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                    Synthesis of Evidence & Action
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">
                    Visual synthesis flow translating empirical temporal and spatial findings into 5 actionable public health recommendations.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between text-xs font-mono text-[#00F0FF]">
                  <span>Launch Exhibit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            {/* Bottom Supporting Exhibits: Methodology & Research Sources */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F8FAFC]/10">
              <Link
                href="/method"
                className="p-4 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/10 rounded-sm flex items-center justify-between group transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#00F0FF] uppercase font-bold">
                    EXHIBIT 11 · 12-STAGE PIPELINE
                  </span>
                  <div className="font-serif text-lg font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                    Methodology & Pipeline
                  </div>
                  <p className="text-xs text-[#94A3B8]">Interactive data pipeline from raw PDF extraction to statistical testing</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00F0FF] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/sources"
                className="p-4 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/10 rounded-sm flex items-center justify-between group transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#00F0FF] uppercase font-bold">
                    EXHIBIT 12 · RESEARCH REPOSITORY
                  </span>
                  <div className="font-serif text-lg font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                    Data Sources & Verification
                  </div>
                  <p className="text-xs text-[#94A3B8]">Public domain surveillance archive, verification logs & download links</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00F0FF] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. ACADEMIC GOVERNANCE FOOTER */}
        <section className="border-t border-[#F8FAFC]/15 bg-[#06080F] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4 text-center text-xs font-mono text-[#94A3B8]">
            <span className="text-[#00F0FF] font-bold uppercase tracking-widest">
              Academic Research Governance
            </span>
            <p className="text-[#F8FAFC]/80 leading-relaxed max-w-2xl mx-auto">
              All metrics verified against public domain bulletins from the National Centre for Disease Control (NCDC), Ministry of Health & Family Welfare, Government of India.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
              <Link href="/method" className="hover:text-[#00F0FF] underline underline-offset-4">
                12-Stage Methodology
              </Link>
              <span>·</span>
              <Link href="/sources" className="hover:text-[#00F0FF] underline underline-offset-4">
                Surveillance Archive
              </Link>
              <span>·</span>
              <a href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf" download="Finalized_Seasonal_Disease_Patterns_Report.pdf" className="hover:text-[#00F0FF] underline underline-offset-4">
                Academic Report (PDF)
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
