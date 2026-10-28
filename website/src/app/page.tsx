"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  FileText,
  Database,
  Layers,
  ArrowRight,
  Sparkles,
  BarChart3,
  Calendar,
  Compass,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

import { RESEARCH_METRICS } from "@/data/researchData";

// Core Cinematic Components
import CinematicHero from "@/components/CinematicHero";
import CinematicDocumentaryNavigator from "@/components/CinematicDocumentaryNavigator";

const CinematicIntro = dynamic(() => import("@/components/CinematicIntro"), {
  ssr: false,
});

// Module-level flag:
// - Survives client-side navigation between routes
// - Resets automatically on full page refresh (F5/hard reload)
let introHasPlayedInSession = false;

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(() => introHasPlayedInSession);
  const [showReplayIntro, setShowReplayIntro] = useState(false);

  // On mobile devices (< 768px), immediately reveal the mobile research documentary
  // so mobile visitors land directly in the experience without a blank/dark blocking overlay
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIntroComplete(true);
      introHasPlayedInSession = true;
    }
  }, []);

  const handleIntroComplete = () => {
    introHasPlayedInSession = true;
    setIntroComplete(true);
    setShowReplayIntro(false);
  };

  const handleTriggerReplay = () => {
    setShowReplayIntro(true);
  };

  return (
    <>
      {/* ── CINEMATIC PROLOGUE FILM (FROM GITHUB REPO) ── */}
      {(!introComplete || showReplayIntro) && (
        <div className={!showReplayIntro ? "hidden md:block" : "block"}>
          <CinematicIntro onComplete={handleIntroComplete} />
        </div>
      )}

      <div
        className={`w-full bg-[#070A10] text-[#F5F1E8] min-h-screen selection:bg-[#D7B56D]/30 selection:text-[#F5F1E8] transition-opacity duration-700 ${
          introComplete && !showReplayIntro ? "opacity-100" : "max-md:opacity-100 opacity-0"
        }`}
        style={{
          opacity: introComplete && !showReplayIntro ? 1 : undefined,
        }}
      >

        {/* ════════════════════════════════════════════════════════════════════
            ACT 1 — THE RESEARCH QUESTION (CINEMATIC HERO WITH CURSOR DRIFT)
            ════════════════════════════════════════════════════════════════════ */}
        <CinematicHero onReplayIntro={handleTriggerReplay} />


        {/* ════════════════════════════════════════════════════════════════════
            INTERACTIVE DOCUMENTARY CHAPTERS PORTAL (PHOTOGRAPHIC ACT NAVIGATOR)
            ════════════════════════════════════════════════════════════════════ */}
        <CinematicDocumentaryNavigator />


        {/* ════════════════════════════════════════════════════════════════════
            EXECUTIVE BASELINE COHORT & PROVENANCE SYNTHESIS BAR
            ════════════════════════════════════════════════════════════════════ */}
        <section
          id="study-scope"
          className="py-10 sm:py-14 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28 bg-[#0A1016] border-b border-white/[0.08]"
          aria-label="Executive Cohort Metrics"
        >
          <div className="max-w-[1360px] mx-auto space-y-8">
            
            {/* Header with Research Context */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#D7B56D] uppercase">
                    EPIDEMIOLOGICAL COHORT METRICS
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-[10px] font-mono text-[#5FB0A8]">2022–2025 Audited Baseline</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1E8] tracking-tight">
                  Statewide surveillance foundations
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/method"
                  className="text-xs font-mono text-[#5FB0A8] hover:text-[#F5F1E8] transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/[0.08] rounded-xs"
                >
                  <span>12-Stage Methodology</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
                  download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
                  className="text-xs font-mono font-bold text-[#D7B56D] hover:text-[#E8C97D] transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-[#D7B56D]/10 border border-[#D7B56D]/30 rounded-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Monograph (PDF)</span>
                </a>
              </div>
            </div>

            {/* 4 Primary Verified Provenance Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-[#070A10] border border-white/[0.08] p-4 sm:p-5 rounded-xs space-y-1">
                <span className="text-[10px] font-mono text-[#D7B56D] uppercase tracking-wider block">
                  SURVEILLANCE COVERAGE
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1E8]">
                  {RESEARCH_METRICS.surveillanceWeeks}
                </div>
                <p className="text-xs font-mono text-[#87999E]">
                  Weekly bulletins (203 outbreak · 34 NIL)
                </p>
              </div>

              <div className="bg-[#070A10] border border-white/[0.08] p-4 sm:p-5 rounded-xs space-y-1">
                <span className="text-[10px] font-mono text-[#5FB0A8] uppercase tracking-wider block">
                  RAW EXTRACTED ROWS
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1E8]">
                  {RESEARCH_METRICS.analyticalRecords}
                </div>
                <p className="text-xs font-mono text-[#87999E]">
                  Tabular outbreak records (36 districts)
                </p>
              </div>

              <div className="bg-[#070A10] border border-white/[0.08] p-4 sm:p-5 rounded-xs space-y-1">
                <span className="text-[10px] font-mono text-[#D7B56D] uppercase tracking-wider block">
                  BASELINE COHORT (73.5%)
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1E8]">
                  {RESEARCH_METRICS.primaryCohortRecords}
                </div>
                <p className="text-xs font-mono text-[#87999E]">
                  5 disease families (20,955 cases · 266 deaths)
                </p>
              </div>

              <div className="bg-[#070A10] border border-[#5FB0A8]/30 p-4 sm:p-5 rounded-xs space-y-1">
                <span className="text-[10px] font-mono text-[#5FB0A8] uppercase tracking-wider block">
                  PROVISIONAL 2026 WINDOW
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#5FB0A8]">
                  45 <span className="text-sm font-sans font-normal text-[#87999E]">records</span>
                </div>
                <p className="text-xs font-mono text-[#87999E]">
                  2,126 cases (W01–W32 unannualized)
                </p>
              </div>
            </div>

            {/* Quick Chapter Access Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 bg-[#070A10] border border-white/[0.06] rounded-xs space-y-1">
                <span className="font-mono text-[#5FB0A8] uppercase tracking-wider font-bold block text-[10px]">
                  TEMPORAL SYNCHRONIZATION
                </span>
                <p className="text-[#A8B6BA] text-xs leading-relaxed">
                  68.3% of baseline outbreaks occur from June to November. Acute Diarrheal Disease (W = 0.530) and Malaria (W = 0.443) achieve statistically significant annual repeatability.
                </p>
              </div>

              <div className="p-3.5 bg-[#070A10] border border-white/[0.06] rounded-xs space-y-1">
                <span className="font-mono text-[#D7B56D] uppercase tracking-wider font-bold block text-[10px]">
                  SPATIAL FOCALIZATION
                </span>
                <p className="text-[#A8B6BA] text-xs leading-relaxed">
                  Universal urban transmission for Dengue (31 districts) and ADD (33 districts) contrasts with Malaria, where 61.4% of outbreaks concentrate in Gadchiroli and Chandrapur forest corridors.
                </p>
              </div>

              <div className="p-3.5 bg-[#070A10] border border-white/[0.06] rounded-xs space-y-1">
                <span className="font-mono text-[#87999E] uppercase tracking-wider font-bold block text-[10px]">
                  PRIMARY FIELDWORK TRIANGULATION
                </span>
                <p className="text-[#87999E] text-xs leading-relaxed">
                  Field visit at Nallasopara West Urban Health Post (Palghar) confirmed the 2–3 week paper-to-digital transcription latency between clinical cluster onset and central NCDC bulletin publication.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            SITE FOOTER
            ════════════════════════════════════════════════════════════════════ */}
        <footer className="py-8 px-6 sm:px-8 border-t border-white/[0.08] bg-[#070A10] lg:pr-24 xl:pr-28">
          <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#87999E]">
            <div>
              <span className="text-[#F5F1E8]">Analysis of Seasonal Disease Patterns Using Government Health Data</span>
              <span className="text-white/20 mx-2">|</span>
              <span>Khan Umar · RP Institute, University of Mumbai</span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <Link href="/method" className="hover:text-[#5FB0A8] transition-colors">
                Methodology
              </Link>
              <span>·</span>
              <Link href="/sources" className="hover:text-[#5FB0A8] transition-colors">
                Data Sources
              </Link>
              <span>·</span>
              <Link href="/stability" className="hover:text-[#5FB0A8] transition-colors">
                Stability Analysis
              </Link>
              <span>·</span>
              <a
                href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
                download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
                className="hover:text-[#D7B56D] transition-colors"
              >
                Academic PDF
              </a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
