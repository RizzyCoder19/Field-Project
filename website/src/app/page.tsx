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
import PipelineFlow from "@/components/PipelineFlow";
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
        className={`w-full bg-[#070A0F] text-[#F0DECE] min-h-screen selection:bg-[#8B1414]/40 selection:text-[#F0DECE] transition-opacity duration-700 ${
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
            SECTION: HOW WE TRANSFORMED THE DATA INTO THIS RESEARCH WEBSITE
            ════════════════════════════════════════════════════════════════════ */}
        <section
          id="data-transformation"
          className="py-12 sm:py-16 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28 bg-[#0B0F15] border-b border-[#F0DECE]/12 text-[#F0DECE] select-none"
          aria-label="How We Transformed The Data"
          data-aos="fade-up"
          data-aos-duration="850"
        >
          <div className="max-w-[1360px] mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#590907] rotate-45 shrink-0 ring-1 ring-[#E8D2B5]/40" />
                  <span className="text-[11px] font-mono font-bold tracking-[0.22em] text-[#F0DECE] uppercase">
                    DATA PROVENANCE & HARMONIZATION PIPELINE
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-[11px] font-mono text-[#A5A79B]">237 Bulletins → Structured Investigation</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F0DECE] tracking-tight">
                  How we transformed raw government data into this website
                </h2>
                <p className="text-sm sm:text-base text-[#BAC0B8] max-w-3xl leading-relaxed">
                  Raw government surveillance PDFs contain formatting inconsistencies, varying string notations, and unnormalized district listings. Here is the exact additive forensic cascade that converted 237 weekly bulletins into the 539 audited cohort records you explore below.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/data"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B1414] hover:bg-[#A31818] text-[#F0DECE] font-bold text-xs uppercase tracking-wider rounded-xs transition-all border border-[#F0DECE]/30 shadow-md cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Explore Raw Data Archive</span>
                </Link>
              </div>
            </div>

            <PipelineFlow />
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            INTERACTIVE DOCUMENTARY CHAPTERS PORTAL (PHOTOGRAPHIC ACT NAVIGATOR)
            ════════════════════════════════════════════════════════════════════ */}
        <CinematicDocumentaryNavigator />


        {/* ════════════════════════════════════════════════════════════════════
            EXECUTIVE BASELINE COHORT & PROVENANCE SYNTHESIS BAR
            ════════════════════════════════════════════════════════════════════ */}
        <section
          id="study-scope"
          className="py-10 sm:py-14 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28 bg-gradient-to-b from-[#180505] to-[#110303] border-b border-[#F0DECE]/12 text-[#F0DECE]"
          aria-label="Executive Cohort Metrics"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <div className="max-w-[1360px] mx-auto space-y-8">
            
            {/* Header with Research Context */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#8B1414] rotate-45 shrink-0 ring-1 ring-[#F0DECE]/40" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#F0DECE] uppercase">
                    EPIDEMIOLOGICAL COHORT METRICS
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-[10px] font-mono text-[#BAC0B8]">2022–2025 Audited Baseline</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F0DECE] tracking-tight">
                  Statewide surveillance foundations
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/method"
                  className="text-xs font-mono text-[#BAC0B8] hover:text-[#F0DECE] transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-[#070A0F] border border-white/[0.08] rounded-xs cursor-pointer"
                >
                  <span>12-Stage Methodology</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8B1414]" />
                </Link>
                <a
                  href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
                  download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
                  className="text-xs font-mono font-bold text-[#F0DECE] hover:text-white transition-colors flex items-center gap-1.5 px-3.5 py-1.5 bg-[#8B1414] hover:bg-[#A31818] border border-[#F0DECE]/30 rounded-xs shadow-md cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Monograph (PDF)</span>
                </a>
              </div>
            </div>

            {/* 4 Primary Verified Provenance Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-[#180505] border border-[#F0DECE]/15 p-4 sm:p-5 rounded-xs space-y-1 shadow-lg">
                <span className="text-[10px] font-mono text-[#F0DECE] uppercase tracking-wider block font-bold">
                  SURVEILLANCE COVERAGE
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F0DECE]">
                  {RESEARCH_METRICS.surveillanceWeeks}
                </div>
                <p className="text-xs font-mono text-[#BAC0B8]">
                  Weekly bulletins (203 outbreak · 34 NIL)
                </p>
              </div>

              <div className="bg-[#070A0F] border border-white/[0.08] p-4 sm:p-5 rounded-xs space-y-1">
                <span className="text-[10px] font-mono text-[#BAC0B8] uppercase tracking-wider block font-bold">
                  RAW EXTRACTED ROWS
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F0DECE]">
                  {RESEARCH_METRICS.analyticalRecords}
                </div>
                <p className="text-xs font-mono text-[#BAC0B8]">
                  Tabular outbreak records (36 districts)
                </p>
              </div>

              <div className="bg-[#070A0F] border border-white/[0.08] p-4 sm:p-5 rounded-xs space-y-1">
                <span className="text-[10px] font-mono text-[#F0DECE] uppercase tracking-wider block font-bold">
                  BASELINE COHORT (73.5%)
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F0DECE]">
                  {RESEARCH_METRICS.primaryCohortRecords}
                </div>
                <p className="text-xs font-mono text-[#BAC0B8]">
                  5 disease families (20,955 cases · 266 deaths)
                </p>
              </div>

              <div className="bg-[#070A0F] border border-[#8B1414]/50 p-4 sm:p-5 rounded-xs space-y-1">
                <span className="text-[10px] font-mono text-[#F0DECE] uppercase tracking-wider block font-bold">
                  PROVISIONAL 2026 WINDOW
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F0DECE]">
                  45 <span className="text-sm font-sans font-normal text-[#BAC0B8]">records</span>
                </div>
                <p className="text-xs font-mono text-[#BAC0B8]">
                  2,126 cases (W01–W32 unannualized)
                </p>
              </div>
            </div>

            {/* Quick Chapter Access Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 bg-[#070A0F] border border-white/[0.06] rounded-xs space-y-1">
                <span className="font-mono text-[#F0DECE] uppercase tracking-wider font-bold block text-[10px]">
                  TEMPORAL SYNCHRONIZATION
                </span>
                <p className="text-[#BAC0B8] text-xs leading-relaxed">
                  68.3% of baseline outbreaks occur from June to November. Acute Diarrhoeal Disease (W = 0.530) and Malaria (W = 0.443) achieve statistically significant annual repeatability.
                </p>
              </div>

              <div className="p-3.5 bg-[#070A0F] border border-[#8B1414]/40 rounded-xs space-y-1">
                <span className="font-mono text-[#F0DECE] uppercase tracking-wider font-bold block text-[10px]">
                  SPATIAL FOCALIZATION
                </span>
                <p className="text-[#BAC0B8] text-xs leading-relaxed">
                  Universal urban transmission for Dengue (31 districts) and ADD (33 districts) contrasts with Malaria, where 61.4% of outbreaks concentrate in Gadchiroli and Chandrapur forest corridors.
                </p>
              </div>

              <div className="p-3.5 bg-[#070A0F] border border-white/[0.06] rounded-xs space-y-1">
                <span className="font-mono text-[#BAC0B8] uppercase tracking-wider font-bold block text-[10px]">
                  PRIMARY FIELDWORK TRIANGULATION
                </span>
                <p className="text-[#BAC0B8] text-xs leading-relaxed">
                  Field visit at Nallasopara West Urban Health Post (Palghar) confirmed the 2–3 week paper-to-digital transcription latency between clinical cluster onset and central NCDC bulletin publication.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            SITE FOOTER
            ════════════════════════════════════════════════════════════════════ */}
        <footer className="py-8 px-6 sm:px-8 border-t border-[#F0DECE]/12 bg-[#070A0F] text-[#BAC0B8] lg:pr-24 xl:pr-28">
          <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A5A79B]">
            <div>
              <span className="text-[#F0DECE] font-bold">Analysis of Seasonal Disease Patterns Using Government Health Data</span>
              <span className="text-white/20 mx-2">|</span>
              <span>Khan Umar · RP Institute, University of Mumbai</span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <Link href="/method" className="hover:text-[#E8D2B5] transition-colors">
                Methodology
              </Link>
              <span>·</span>
              <Link href="/sources" className="hover:text-[#E8D2B5] transition-colors">
                Data Sources
              </Link>
              <span>·</span>
              <Link href="/stability" className="hover:text-[#E8D2B5] transition-colors">
                Stability Analysis
              </Link>
              <span>·</span>
              <a
                href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
                download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
                className="hover:text-[#FFF] text-[#E8D2B5] transition-colors"
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
