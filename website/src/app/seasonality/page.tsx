"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, Clock, CheckCircle2, HelpCircle, 
  ChevronDown, ChevronUp, Layers, Activity
} from "lucide-react";
import { PRIMARY_DISEASES, MONTHS } from "@/data/researchData";
import RadialSeasonalClock from "@/components/RadialSeasonalClock";
import NativeSeasonalChart from "@/components/NativeSeasonalChart";
import SeasonalMatrix from "@/components/SeasonalMatrix";
import ChapterFooter from "@/components/ChapterFooter";

const DISEASE_KEYS = [
  { id: "all", label: "All 5 Cohorts", color: "#5FB0A8" },
  { id: "dengue", label: "Dengue", color: "#38BDF8" },
  { id: "add", label: "ADD", color: "#10B981" },
  { id: "malaria", label: "Malaria", color: "#F59E0B" },
  { id: "foodPoisoning", label: "Food Poisoning", color: "#EF4444" },
  { id: "chikungunya", label: "Chikungunya", color: "#A78BFA" },
];

export default function SeasonalityPage() {
  const [selectedDisease, setSelectedDisease] = useState<string>("all");
  const [metric, setMetric] = useState<"events" | "cases">("events");
  const [showMatrixDrawer, setShowMatrixDrawer] = useState(false);
  const [showMetricExplanation, setShowMetricExplanation] = useState(false);

  // Compute monthly values dynamically
  const monthlyValues = MONTHS.map((_, mIdx) => {
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
    <div className="w-full bg-[#070A10] text-[#F5F1E8] min-h-screen">
      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-white/[0.08] bg-gradient-to-b from-[#05070B] to-[#070A10] pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5FB0A8] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#5FB0A8]" />
            <span>EXHIBIT 04 · TEMPORAL CONCENTRATION</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F1E8] leading-[1.12]">
            The Rhythm of the Seasons
          </h1>

          <p className="text-base sm:text-lg text-[#A8B6BA] max-w-3xl leading-relaxed pt-1">
            Explore how disease outbreaks surge and subside across the twelve calendar months of Maharashtra&apos;s annual cycle.
          </p>
        </div>
      </section>

      {/* 2. THE SIGNATURE INTERACTIVE SEASONAL INSTRUMENT */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
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
                  className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm transition-all border flex items-center gap-1.5"
                  style={{
                    borderColor: isSelected ? d.color : "rgba(255, 255, 255, 0.10)",
                    backgroundColor: isSelected ? `${d.color}20` : "#0A1016",
                    color: isSelected ? d.color : "rgba(245, 241, 232, 0.75)",
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span>{d.label}</span>
                </button>
              );
            })}
          </div>

          {/* Metric Mode Toggle */}
          <div className="flex items-center bg-[#070A10] border border-white/[0.08] rounded-sm p-0.5">
            <button
              onClick={() => setMetric("events")}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-xs transition-all ${
                metric === "events"
                  ? "bg-[#5FB0A8] text-[#070A10] font-bold"
                  : "text-[#A8B6BA] hover:text-[#F5F1E8]"
              }`}
            >
              Outbreak Records
            </button>
            <button
              onClick={() => setMetric("cases")}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-xs transition-all ${
                metric === "cases"
                  ? "bg-[#5FB0A8] text-[#070A10] font-bold"
                  : "text-[#A8B6BA] hover:text-[#F5F1E8]"
              }`}
            >
              Reported Cases
            </button>
          </div>
        </div>

        {/* The Coordinated Dual Visual Exhibit: Radial Clock + Native Seasonal Bar Graph */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-center bg-[#0A1016] border border-white/[0.08] rounded-sm p-6 sm:p-8 shadow-2xl">
          {/* Left Column: 12-Month Circular Radial Clock (5 cols) */}
          <div className="xl:col-span-5 flex flex-col items-center justify-center relative">
            <RadialSeasonalClock
              focusedDisease={selectedDisease === "all" ? null : selectedDisease}
              onSelectDisease={(d) => setSelectedDisease(d || "all")}
              className="w-full"
            />
          </div>

          {/* Right Column: Native Seasonal Bar Graph (7 cols) */}
          <div className="xl:col-span-7 flex flex-col justify-between">
            <NativeSeasonalChart
              initialDisease={selectedDisease}
              allowToggleMode={true}
              className="w-full border-0 bg-transparent p-0 shadow-none"
            />
          </div>
        </div>

        {/* Attached Finding Callout */}
        <div className="p-4 bg-[#070A10] border border-[#5FB0A8]/30 rounded-sm flex items-start gap-3 text-xs sm:text-sm text-[#A8B6BA] leading-relaxed">
          <CheckCircle2 className="w-5 h-5 text-[#5FB0A8] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#F5F1E8]">Primary Finding:</strong> {getTakeaway()}
          </div>
        </div>

        {/* 3. CONTEXTUAL METRIC DISCLOSURE: ACTIVITY WINDOW VS CR3 */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono">
          <button
            onClick={() => setShowMetricExplanation(!showMetricExplanation)}
            className="text-[#5FB0A8] hover:underline flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How are &ldquo;Continuous Season Window&rdquo; and &ldquo;CR3 Concentration&rdquo; calculated?</span>
          </button>

          <span className="text-[#A8B6BA]/70">
            Dengue: 5-month window (73.0%) · CR3: 3 peak months (50.5%)
          </span>
        </div>

        {showMetricExplanation && (
          <div className="p-5 bg-[#0A1016] border border-white/[0.08] rounded-sm grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs text-[#A8B6BA] animate-fadeIn">
            <div className="space-y-1.5 p-3 bg-[#070A10] rounded-sm border border-white/[0.06]">
              <div className="text-[#38BDF8] font-bold uppercase">01 · Continuous Activity Window</div>
              <p className="leading-relaxed">
                The contiguous calendar block of elevated transmission. For Dengue, June through October captures <strong className="text-[#F5F1E8]">73.0% of baseline records (149 of 204)</strong>.
              </p>
            </div>
            <div className="space-y-1.5 p-3 bg-[#070A10] rounded-sm border border-white/[0.06]">
              <div className="text-[#5FB0A8] font-bold uppercase">02 · Top-Three-Month Concentration (CR3)</div>
              <p className="leading-relaxed">
                The mathematical proportion of events occurring in the 3 highest individual months. For Dengue, June (27), Sep (36), and Oct (40) total <strong className="text-[#F5F1E8]">50.5% (103 of 204)</strong>.
              </p>
            </div>
          </div>
        )}

        {/* 4. EXPANDABLE 5×12 MATRIX DRAWER */}
        <div className="pt-6 border-t border-white/[0.08]">
          <button
            onClick={() => setShowMatrixDrawer(!showMatrixDrawer)}
            className="w-full p-4 bg-[#0A1016] hover:bg-[#121922] border border-white/[0.08] rounded-sm transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#5FB0A8] font-bold"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>{showMatrixDrawer ? "Hide 5×12 Seasonal Heatmap Matrix" : "Explore 5×12 Seasonal Heatmap Matrix & Raw Monthly Indices"}</span>
            </div>
            {showMatrixDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showMatrixDrawer && (
            <div className="pt-6 space-y-6 animate-fadeIn">
              <div className="p-6 bg-[#0A1016] border border-white/[0.08] rounded-sm shadow-xl">
                <SeasonalMatrix />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. CHAPTER NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={4} />
    </div>
  );
}
