"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, CheckCircle2, HelpCircle, 
  ChevronDown, ChevronUp, Layers, Activity, BarChart3,
  ArrowRight, Sparkles, Compass
} from "lucide-react";
import { PRIMARY_DISEASES, MONTHS } from "@/data/researchData";
import NativeSeasonalChart from "@/components/NativeSeasonalChart";
import SeasonalMatrix from "@/components/SeasonalMatrix";
import ChapterFooter from "@/components/ChapterFooter";
import ConnectedEvidenceHeader from "@/components/ConnectedEvidenceHeader";

const DISEASE_KEYS = [
  { id: "all", label: "All 5 Cohorts", color: "#F0DECE" },
  { id: "dengue", label: "Dengue", color: "#8B1414" },
  { id: "add", label: "ADD", color: "#5A7A72" },
  { id: "malaria", label: "Malaria", color: "#C9944A" },
  { id: "foodPoisoning", label: "Food Poisoning", color: "#A83C28" },
  { id: "chikungunya", label: "Chikungunya", color: "#7E6080" },
];

export default function SeasonalityPage() {
  const [selectedDisease, setSelectedDisease] = useState<string>("all");
  const [metric, setMetric] = useState<"events" | "cases">("events");
  const [showMetricExplanation, setShowMetricExplanation] = useState(false);

  // Dynamic takeaway for the selection
  const getTakeaway = () => {
    if (selectedDisease === "dengue") {
      return "Dengue exhibits a sharp post-monsoon peak in October (40 records; 566 cases), driven by persistent artificial water storage across peri-urban municipal corridors.";
    }
    if (selectedDisease === "add") {
      return "Acute Diarrhoeal Disease surges in July (22 records, 1,040 cases) and August (16 records, 1,300 cases) during peak monsoon rains, reflecting widespread surface water and municipal pipeline contamination.";
    }
    if (selectedDisease === "malaria") {
      return "Malaria concentrates heavily in May–July (36 records; 51.4% of events), with 61.4% of total state outbreaks clustered in the dense forest belts of Gadchiroli and Chandrapur.";
    }
    if (selectedDisease === "foodPoisoning") {
      return "Food Poisoning shows bimodal spikes in February (wedding banquets) and May (summer feasts); three massive exposure events account for 74.7% of all February cases.";
    }
    if (selectedDisease === "chikungunya") {
      return "Chikungunya shows broad dispersion with peak months shifting across years (Sep in 2022, Oct in 2024), yielding lower statistical synchrony than waterborne diseases.";
    }
    return "Comparing the five cohorts reveals two distinct seasonal engines: waterborne ADD surges directly during July monsoon rains, while mosquito-borne Dengue peaks three months later in October post-monsoon.";
  };

  return (
    <div className="w-full bg-[#070A0F] text-[#F0DECE] min-h-screen">
      {/* 0. CONNECTED INVESTIGATION HEADER BREADCRUMB */}
      <ConnectedEvidenceHeader currentActNumber={3} />

      {/* 1. VISUAL HEADER */}
      <section className="border-b border-[#F0DECE]/12 bg-gradient-to-b from-[#070A0F] to-[#0B0F15] pt-10 pb-8 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28">
        <div className="max-w-[1360px] mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#BAC0B8] font-bold tracking-widest uppercase">
            <span className="w-2.5 h-2.5 bg-[#8B1414] rotate-45 ring-1 ring-[#F0DECE]/40" />
            <span>ACT 03 · THE MONSOON ENGINE & CLIMATIC SYNCHRONY</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F0DECE] leading-[1.12]">
            The Rhythm of the Seasons
          </h1>

          <p className="text-base sm:text-lg text-[#BAC0B8] max-w-3xl leading-relaxed pt-1">
            Explore how disease outbreaks surge and subside across the twelve calendar months of Maharashtra&apos;s annual cycle. 
            Monsoon rains create a dual-wave dynamic: an immediate waterborne surge in July followed by a vector-borne peak in October.
          </p>
        </div>
      </section>

      {/* 2. THE SIGNATURE INTERACTIVE SEASONAL INSTRUMENT */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28 max-w-[1360px] mx-auto space-y-8">
        {/* Top Control Bar: Disease Filter + Metric Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          {/* Disease Selector Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {DISEASE_KEYS.map((d) => {
              const isSelected = selectedDisease === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDisease(d.id)}
                  className="px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider rounded-xs transition-all border flex items-center gap-1.5 cursor-pointer shadow-sm"
                  style={{
                    borderColor: isSelected ? "#8B1414" : "rgba(240, 222, 206, 0.18)",
                    backgroundColor: isSelected ? "rgba(139, 20, 20, 0.45)" : "#0E141D",
                    color: isSelected ? "#F0DECE" : "#BAC0B8",
                    fontWeight: isSelected ? "bold" : "normal",
                    boxShadow: isSelected ? "0 0 12px rgba(139, 20, 20, 0.5)" : "none",
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white/20" style={{ backgroundColor: d.color }} />
                  <span>{d.label}</span>
                </button>
              );
            })}
          </div>

          {/* Metric Mode Toggle */}
          <div className="flex items-center bg-[#0E141D] border border-[#F0DECE]/20 rounded-xs p-1">
            <button
              onClick={() => setMetric("events")}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-2xs transition-all cursor-pointer ${
                metric === "events"
                  ? "bg-[#8B1414] text-[#F0DECE] font-bold border border-[#F0DECE]/30 shadow-sm"
                  : "text-[#BAC0B8] hover:text-[#F0DECE]"
              }`}
            >
              Outbreak Records
            </button>
            <button
              onClick={() => setMetric("cases")}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-2xs transition-all cursor-pointer ${
                metric === "cases"
                  ? "bg-[#8B1414] text-[#F0DECE] font-bold border border-[#F0DECE]/30 shadow-sm"
                  : "text-[#BAC0B8] hover:text-[#F0DECE]"
              }`}
            >
              Reported Cases
            </button>
          </div>
        </div>

        {/* 5×12 SEASONAL HEATMAP MATRIX (ACT 3 HERO INSTRUMENT) */}
        <div className="bg-[#0B0F15] border border-[#F0DECE]/15 rounded-xs p-5 sm:p-8 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8B1414] font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>5×12 Seasonal Heatmap Matrix</span>
              </div>
              <p className="text-xs text-[#BAC0B8]">
                Relative monthly concentration (%) across 4-year baseline (2022–2025). The monsoon window (June–September) accounts for the primary wave.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#BAC0B8] px-2 py-1 bg-[#0E141D] rounded-2xs border border-white/[0.06]">
              Monsoon Corridor: Jun–Sep
            </span>
          </div>

          <SeasonalMatrix
            highlightDisease={selectedDisease === "all" ? null : selectedDisease}
            onSelectDisease={(d) => setSelectedDisease(d || "all")}
          />
        </div>

        {/* MONTHLY DISTRIBUTION & TREND CURVE */}
        <div className="bg-[#0B0F15] border border-[#F0DECE]/15 rounded-xs p-5 sm:p-8 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs font-mono">
            <div className="flex items-center gap-2 text-[#F0DECE] font-bold uppercase tracking-wider">
              <BarChart3 className="w-4 h-4 text-[#8B1414]" />
              <span>Monthly Distribution & Trend Curve</span>
            </div>
            <span className="text-[#BAC0B8] text-[11px]">2022–2025 Audited Baseline</span>
          </div>

          <NativeSeasonalChart
            initialDisease={selectedDisease}
            onDiseaseSelect={(d) => setSelectedDisease(d)}
            metric={metric}
            onMetricChange={(m) => setMetric(m)}
            allowToggleMode={true}
            className="w-full border-none bg-transparent p-0 shadow-none"
          />
        </div>

        {/* Attached Finding Callout */}
        <div className="p-4 sm:p-5 bg-[#0B0F15] border border-[#8B1414]/50 rounded-xs flex items-start gap-3.5 text-xs sm:text-sm text-[#BAC0B8] leading-relaxed shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-[#8B1414] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-[#F0DECE] font-bold font-serif text-sm sm:text-base">
              Epidemiological Signature: {selectedDisease === "all" ? "Dual-Wave Monsoon Engine" : selectedDisease.toUpperCase()}
            </div>
            <div>{getTakeaway()}</div>
          </div>
        </div>

        {/* CONNECTED BRIDGE TO ACT 04: RADIAL CLOCK & FIVE DISEASES EXHIBIT */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#180505] to-[#0E141D] border border-[#8B1414]/60 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xl">
          <div className="space-y-1.5 max-w-2xl">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#F0DECE] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B1414]" />
              <span>CONNECTED LINE OF EVIDENCE · PROCEED TO ACT 04</span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#F0DECE]">
              Explore the 360° Grand Radial Seasonal Clock & Pathogen Profiles
            </h3>
            <p className="text-xs sm:text-sm text-[#BAC0B8] leading-relaxed">
              In Act 04, these seasonal outbreak distributions are mapped onto the circular <strong className="text-[#F0DECE]">360° Radial Seasonal Clock</strong> alongside individual clinical disease curves, pathogen biology, and the Five Seasonal Signatures.
            </p>
          </div>

          <Link
            href="/diseases"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-[#8B1414] hover:bg-[#A31818] text-[#F0DECE] font-bold text-xs uppercase tracking-wider rounded-xs transition-all border border-[#F0DECE]/30 shadow-lg cursor-pointer"
          >
            <span>Proceed to Act 04</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3. CONTEXTUAL METRIC DISCLOSURE: ACTIVITY WINDOW VS CR3 */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono">
          <button
            onClick={() => setShowMetricExplanation(!showMetricExplanation)}
            className="text-[#F0DECE] hover:text-[#FFF] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#8B1414]" />
            <span className="underline underline-offset-4">
              {showMetricExplanation ? "Hide Metric Calculations" : "How are \"Continuous Season Window\" and \"CR3 Concentration\" calculated?"}
            </span>
          </button>

          <span className="text-[11px] text-[#BAC0B8]">
            Dengue: 5-month window (73.0%) · CR3: 3 peak months (50.5%)
          </span>
        </div>

        {showMetricExplanation && (
          <div className="p-5 bg-[#0B0F15] border border-white/[0.08] rounded-xs grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs text-[#BAC0B8] animate-fadeIn">
            <div className="space-y-1.5 p-3.5 bg-[#070A0F] rounded-xs border border-white/[0.06]">
              <div className="text-[#8B1414] font-bold uppercase">01 · Continuous Activity Window</div>
              <p className="leading-relaxed text-[11px]">
                The contiguous calendar block of elevated transmission. For Dengue, June through October captures <strong className="text-[#F0DECE]">73.0% of baseline records (149 of 204)</strong>.
              </p>
            </div>
            <div className="space-y-1.5 p-3.5 bg-[#070A0F] rounded-xs border border-white/[0.06]">
              <div className="text-[#C9944A] font-bold uppercase">02 · Top-Three-Month Concentration (CR3)</div>
              <p className="leading-relaxed text-[11px]">
                The mathematical proportion of events occurring in the 3 highest individual months. For Dengue, June (27), Sep (36), and Oct (40) total <strong className="text-[#F0DECE]">50.5% (103 of 204)</strong>.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 4. CONNECTED CHAPTER FOOTER */}
      <ChapterFooter currentChapterNumber={3} />
    </div>
  );
}
