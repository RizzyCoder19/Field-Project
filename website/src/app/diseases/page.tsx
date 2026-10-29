"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  AlertCircle, CheckCircle2, HelpCircle, Layers, ArrowRight, 
  MapPin, Calendar, Activity, Users, ShieldAlert, Award, ChevronDown, ChevronUp, FileText,
  Clock, BarChart3, Compass, Sparkles
} from "lucide-react";
import { PRIMARY_DISEASES, RESEARCH_METRICS, MONTHS } from "@/data/researchData";
import RadialSeasonalClock from "@/components/RadialSeasonalClock";
import NativeSeasonalChart from "@/components/NativeSeasonalChart";
import ChapterFooter from "@/components/ChapterFooter";
import ConnectedEvidenceHeader from "@/components/ConnectedEvidenceHeader";

type DiseaseTab = "all" | "dengue" | "add" | "malaria" | "foodPoisoning" | "chikungunya";

const DISEASE_TABS = [
  { id: "all", label: "All 5 Cohorts Overview", color: "#F0DECE" },
  { id: "dengue", label: "Dengue Fever", color: "#8B1414" },
  { id: "add", label: "ADD (Diarrheal)", color: "#5A7A72" },
  { id: "malaria", label: "Malaria", color: "#C9944A" },
  { id: "foodPoisoning", label: "Food Poisoning", color: "#A83C28" },
  { id: "chikungunya", label: "Chikungunya", color: "#7E6080" },
];

export default function DiseasesPage() {
  const [selectedTab, setSelectedTab] = useState<DiseaseTab>("all");
  const [metric, setMetric] = useState<"events" | "cases">("events");
  const [showTechnicalDrawer, setShowTechnicalDrawer] = useState(false);

  const diseases = Object.values(PRIMARY_DISEASES);
  const activeDisease = selectedTab !== "all" ? PRIMARY_DISEASES[selectedTab] : null;

  const maxRecords = Math.max(...diseases.map(d => d.records)); // 204 (Dengue)
  const maxCases = Math.max(...diseases.map(d => d.cases));     // 9,050 (ADD)

  return (
    <div className="w-full bg-[#070A0F] text-[#F0DECE] min-h-screen">
      {/* 0. CONNECTED INVESTIGATION HEADER BREADCRUMB */}
      <ConnectedEvidenceHeader currentActNumber={4} />

      {/* 1. VISUAL HEADER */}
      <section className="border-b border-[#F0DECE]/12 bg-gradient-to-b from-[#070A0F] to-[#0B0F15] pt-10 pb-8 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28">
        <div className="max-w-[1360px] mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#BAC0B8] font-bold tracking-widest uppercase">
            <span className="w-2.5 h-2.5 bg-[#8B1414] rotate-45 ring-1 ring-[#F0DECE]/40" />
            <span>ACT 04 · THE FIVE DISEASE PATHOGEN COHORTS</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F0DECE] leading-[1.12]">
            Five Diseases, Five Seasonal Signatures
          </h1>

          <p className="text-base sm:text-lg text-[#BAC0B8] max-w-3xl leading-relaxed pt-1">
            Five distinct pathogen groups account for 73.5% of all investigated outbreaks in Maharashtra. 
            The interactive <strong className="text-[#F0DECE]">Grand Radial Seasonal Clock</strong> maps their circular 360° calendar geometry, revealing how transmission drivers differ between waterborne, vector-borne, and foodborne mechanisms.
          </p>
        </div>
      </section>

      {/* 2. THE GRAND SEASONAL CLOCK & DISTRIBUTION INSTRUMENT */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28 max-w-[1360px] mx-auto space-y-8">
        
        {/* Five Distinct Pathogen Seasonal Signatures Selector */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-[#BAC0B8] uppercase tracking-wider font-bold text-[11px] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B1414] animate-pulse" />
              <span>Five Distinct Pathogen Seasonal Signatures · Select Cohort:</span>
            </span>
            <span className="text-[#F0DECE]">
              {selectedTab === "all" ? "Showing All 5 Cohorts Combined" : `Active Focus: ${selectedTab.toUpperCase()}`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <button
              onClick={() => setSelectedTab("all")}
              className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                selectedTab === "all"
                  ? "bg-[#8B1414] text-[#F0DECE] border-[#F0DECE]/50 shadow-md ring-1 ring-[#F0DECE]/40"
                  : "bg-[#0E141D] border-white/[0.08] text-[#BAC0B8] hover:text-[#F0DECE] hover:border-[#F0DECE]/30"
              }`}
            >
              <div className="text-xs font-serif font-bold text-[#F0DECE]">All 5 Cohorts</div>
              <div className="text-[10px] font-mono opacity-80 mt-1">Full 539 Records</div>
              <div className="text-[9.5px] opacity-70">360° Synchronized</div>
            </button>

            {[
              { id: "dengue", name: "Dengue", season: "Oct Peak (40 events)", color: "#8B1414", sign: "Post-Monsoon Urban Stagnation" },
              { id: "add", name: "ADD", season: "Jun Peak (31 events)", color: "#5A7A72", sign: "Early Monsoon Pipe Ingress" },
              { id: "malaria", name: "Malaria", season: "Jul Peak (24 events)", color: "#C9944A", sign: "High Monsoon Vidarbha Forest" },
              { id: "foodPoisoning", name: "Food Poisoning", season: "May Peak (19 events)", color: "#A83C28", sign: "Pre-Monsoon Summer Banquets" },
              { id: "chikungunya", name: "Chikungunya", season: "Oct Peak (7 events)", color: "#7E6080", sign: "Post-Flood Vector Bloom" },
            ].map((sig) => {
              const isSelected = selectedTab === sig.id;
              return (
                <button
                  key={sig.id}
                  onClick={() => setSelectedTab(isSelected ? "all" : (sig.id as DiseaseTab))}
                  className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#8B1414]/35 border-[#F0DECE] shadow-lg ring-1 ring-[#F0DECE]"
                      : "bg-[#0E141D] border-white/[0.08] hover:border-[#F0DECE]/30"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white/20" style={{ backgroundColor: sig.color }} />
                    <span className="font-serif text-xs font-bold text-[#F0DECE]">{sig.name}</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#F0DECE]/90 font-medium">{sig.season}</div>
                  <div className="text-[9.5px] text-[#BAC0B8] line-clamp-1 font-sans mt-0.5">{sig.sign}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Coordinated Clock & Chart Exhibit */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start bg-[#0B0F15] border border-[#F0DECE]/15 rounded-xs p-5 sm:p-8 shadow-2xl text-[#F0DECE]">
          {/* Left Column: 12-Month Circular Radial Clock (5 cols) */}
          <div className="xl:col-span-5 flex flex-col items-center justify-center relative w-full">
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#F0DECE] font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#8B1414]" />
                <span>Radial Seasonal Clock</span>
              </div>
              <span className="text-[#BAC0B8] text-[11px]">360° Monthly Geometry</span>
            </div>

            <RadialSeasonalClock
              focusedDisease={selectedTab === "all" ? null : selectedTab}
              onSelectDisease={(d) => setSelectedTab((d as DiseaseTab) || "all")}
              metric={metric}
              onMetricChange={(m) => setMetric(m)}
              showMetricToggle={false}
              className="w-full"
            />
          </div>

          {/* Right Column: Native Seasonal Bar & Curve Chart (7 cols) */}
          <div className="xl:col-span-7 flex flex-col justify-between w-full">
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#F0DECE] font-bold uppercase tracking-wider">
                <BarChart3 className="w-4 h-4 text-[#8B1414]" />
                <span>Monthly Distribution & Trend Curve</span>
              </div>
              <span className="text-[#BAC0B8] text-[11px]">5-Disease Seasonal Curves</span>
            </div>

            <NativeSeasonalChart
              initialDisease={selectedTab}
              onDiseaseSelect={(d) => setSelectedTab(d as DiseaseTab)}
              metric={metric}
              onMetricChange={(m) => setMetric(m)}
              allowToggleMode={true}
              className="w-full border-none bg-transparent p-0 shadow-none"
            />
          </div>
        </div>

        {/* 3. COHORT FREQUENCY VS CASE BURDEN SPECTRUM */}
        <div className="p-6 sm:p-8 bg-[#0B0F15] border border-[#F0DECE]/15 rounded-xs shadow-xl space-y-6 text-[#F0DECE]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F0DECE]">
                Investigated Outbreak Records vs Clinical Patient Burden
              </h2>
              <p className="text-xs sm:text-sm text-[#BAC0B8] mt-1">
                Comparing outbreak frequency (government surveillance events) against patient impact (total laboratory and clinical cases).
              </p>
            </div>
          </div>

          {/* Disease Comparison Bars */}
          <div className="space-y-4">
            {diseases.map((d) => {
              const recPct = (d.records / maxRecords) * 100;
              const casePct = (d.cases / maxCases) * 100;
              const isSelected = selectedTab === d.id || selectedTab === "all";

              return (
                <div 
                  key={d.id} 
                  className={`p-4 bg-[#0E141D] rounded-xs border transition-all ${
                    isSelected ? "border-white/[0.12] opacity-100" : "border-transparent opacity-40"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="font-serif font-bold text-sm text-[#F0DECE]">{d.name}</span>
                      <span className="text-xs font-mono text-[#BAC0B8]">({d.category})</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono">
                      <span><strong className="text-[#F0DECE]">{d.records}</strong> records ({((d.records / 539) * 100).toFixed(1)}%)</span>
                      <span className="text-white/20 hidden sm:inline">|</span>
                      <span><strong className="text-[#F0DECE]">{d.cases.toLocaleString()}</strong> cases</span>
                      <span className="text-white/20 hidden sm:inline">|</span>
                      <span className="text-[#8B1414] font-bold">{d.deaths} deaths</span>
                    </div>
                  </div>

                  {/* Dual comparative bars */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#BAC0B8]">
                      <span className="w-16 shrink-0">Records:</span>
                      <div className="w-full bg-[#070A0F] h-2 rounded-full overflow-hidden border border-white/[0.06]">
                        <div className="h-full transition-all duration-500" style={{ width: `${recPct}%`, backgroundColor: d.color }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#BAC0B8]">
                      <span className="w-16 shrink-0">Cases:</span>
                      <div className="w-full bg-[#070A0F] h-2 rounded-full overflow-hidden border border-white/[0.06]">
                        <div className="h-full bg-gradient-to-r from-white/30 to-white/70 transition-all duration-500" style={{ width: `${casePct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Attached Key Finding Banner */}
          <div className="p-4 bg-[#070A0F] border border-[#8B1414]/50 rounded-xs flex items-start gap-3 text-xs sm:text-sm text-[#BAC0B8] leading-relaxed">
            <CheckCircle2 className="w-5 h-5 text-[#8B1414] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F0DECE]">Key Comparative Insight:</strong> Outbreak frequency does not correlate with patient case volume. 
              Dengue generates the greatest number of investigated notifications (<strong className="text-[#8B1414]">204 records</strong>), but Acute Diarrhoeal Disease causes the heaviest clinical case load (<strong className="text-[#5A7A72]">9,050 cases</strong>) and 93 reported deaths.
            </div>
          </div>
        </div>

        {/* CONNECTED INTERSECTION LINKS: CONNECTING TO COMPANION ACTS */}
        <div className="p-6 bg-gradient-to-r from-[#180505] to-[#0E141D] border border-[#8B1414]/60 rounded-xs space-y-4 shadow-2xl">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#F0DECE] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B1414]" />
              <span>THE CONNECTED EPIDEMIOLOGICAL WEB · CROSS-ACT EVIDENCE</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#F0DECE]">
              Where These 5 Pathogen Signatures Lead in the Research Journey:
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            <Link
              href="/geography"
              className="p-3.5 bg-[#0B0F15] hover:bg-[#151D2A] border border-[#F0DECE]/12 hover:border-[#8B1414] rounded-xs transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8B1414] font-bold">
                <span>ACT 05 · GEOGRAPHY</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="font-serif text-xs font-bold text-[#F0DECE] group-hover:text-[#FFF]">
                District Spatial Corridors
              </div>
              <p className="text-[10px] text-[#BAC0B8] line-clamp-2">
                61.4% of Malaria cases concentrate in Gadchiroli and Chandrapur forest tracts.
              </p>
            </Link>

            <Link
              href="/stability"
              className="p-3.5 bg-[#0B0F15] hover:bg-[#151D2A] border border-[#F0DECE]/12 hover:border-[#8B1414] rounded-xs transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8B1414] font-bold">
                <span>ACT 06 · STABILITY</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="font-serif text-xs font-bold text-[#F0DECE] group-hover:text-[#FFF]">
                Kendall&apos;s W Concordance
              </div>
              <p className="text-[10px] text-[#BAC0B8] line-clamp-2">
                ADD achieves W = 0.530 (p = 0.016), proving annual seasonal repeatability.
              </p>
            </Link>

            <Link
              href="/outliers"
              className="p-3.5 bg-[#0B0F15] hover:bg-[#151D2A] border border-[#F0DECE]/12 hover:border-[#8B1414] rounded-xs transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8B1414] font-bold">
                <span>ACT 07 · OUTLIERS</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="font-serif text-xs font-bold text-[#F0DECE] group-hover:text-[#FFF]">
                Banquet Sensitivity
              </div>
              <p className="text-[10px] text-[#BAC0B8] line-clamp-2">
                3 wedding feasts skewed February food poisoning; baseline curve remains robust.
              </p>
            </Link>

            <Link
              href="/fieldwork"
              className="p-3.5 bg-[#0B0F15] hover:bg-[#151D2A] border border-[#F0DECE]/12 hover:border-[#8B1414] rounded-xs transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8B1414] font-bold">
                <span>ACT 08 · FIELDWORK</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="font-serif text-xs font-bold text-[#F0DECE] group-hover:text-[#FFF]">
                Palghar UHP Ground Truth
              </div>
              <p className="text-[10px] text-[#BAC0B8] line-clamp-2">
                Primary field notes confirm the 2–3 week paper-to-digital transcription latency.
              </p>
            </Link>
          </div>
        </div>

        {/* 4. EXPANDABLE TECHNICAL METHODOLOGY DRAWER */}
        <div className="pt-4 border-t border-white/[0.08]">
          <button
            onClick={() => setShowTechnicalDrawer(!showTechnicalDrawer)}
            className="w-full p-4 bg-[#0B0F15] hover:bg-[#8B1414]/20 border border-[#F0DECE]/20 rounded-xs transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#F0DECE] font-bold cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8B1414]" />
              <span>{showTechnicalDrawer ? "Hide Pathogen Transmission Dynamics" : "Explore Pathogen Biology, Vectors & Transmission Mechanisms"}</span>
            </div>
            {showTechnicalDrawer ? <ChevronUp className="w-4 h-4 text-[#8B1414]" /> : <ChevronDown className="w-4 h-4 text-[#8B1414]" />}
          </button>

          {showTechnicalDrawer && (
            <div className="pt-6 space-y-4 animate-fadeIn font-mono text-xs text-[#BAC0B8]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#0B0F15] border border-white/[0.08] rounded-xs space-y-2">
                  <div className="text-[#8B1414] font-bold uppercase">Aedes Aegypti (Dengue)</div>
                  <p className="text-[11px] leading-relaxed">
                    Breeds in domestic clean-water containers during post-monsoon dry intervals. Explains why Dengue peaks in October (40 events) months after initial rains.
                  </p>
                </div>

                <div className="p-4 bg-[#0B0F15] border border-white/[0.08] rounded-xs space-y-2">
                  <div className="text-[#5A7A72] font-bold uppercase">Enteric Pathogens (ADD)</div>
                  <p className="text-[11px] leading-relaxed">
                    Surface run-off contaminates piped distribution and open wells at monsoon arrival. Explains immediate June–July surge (Kendall&apos;s W = 0.530).
                  </p>
                </div>

                <div className="p-4 bg-[#0B0F15] border border-white/[0.08] rounded-xs space-y-2">
                  <div className="text-[#C9944A] font-bold uppercase">Anopheles Culicifacies (Malaria)</div>
                  <p className="text-[11px] leading-relaxed">
                    Stream bed puddles and riverine pools in forested tribal tracts of Gadchiroli and Chandrapur drive intense localized pre-monsoon and onset peaks.
                  </p>
                </div>
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
