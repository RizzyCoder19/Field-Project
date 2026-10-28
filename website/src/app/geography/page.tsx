"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, CheckCircle2, HelpCircle, ChevronDown, ChevronUp, 
  Search, ShieldAlert, Award, Compass, Eye
} from "lucide-react";
import { PRIMARY_DISEASES } from "@/data/researchData";
import MaharashtraMap from "@/components/MaharashtraMap";
import ChapterFooter from "@/components/ChapterFooter";

const DISTRICT_SUMMARY = [
  { disease: "Malaria", id: "malaria", color: "#F59E0B", count: 15, total: 36, pct: "41.7%", focal: "Focal eastern tribal forest cluster: Gadchiroli (29) & Chandrapur (14) = 61.4% of total state events." },
  { disease: "Dengue", id: "dengue", color: "#38BDF8", count: 31, total: 36, pct: "86.1%", focal: "Statewide urban and peri-urban municipal corridors (Pune, Thane, Nashik, Kolhapur, Nanded)." },
  { disease: "ADD", id: "add", color: "#10B981", count: 33, total: 36, pct: "91.7%", focal: "Universal footprint across 33 districts; highest geographical dispersion in the study." },
  { disease: "Food Poisoning", id: "foodPoisoning", color: "#EF4444", count: 27, total: 36, pct: "75.0%", focal: "Agricultural and semi-urban banquet corridors (Kolhapur, Parbhani, Solapur, Pune, Sangli)." },
  { disease: "Chikungunya", id: "chikungunya", color: "#A78BFA", count: 15, total: 36, pct: "41.7%", focal: "Western & central urban hubs (Pune, Nashik, Ahmednagar, Satara, Thane)." },
];

export default function GeographyPage() {
  const [selectedDisease, setSelectedDisease] = useState<string>("malaria");
  const [showTableDrawer, setShowTableDrawer] = useState(false);
  const [selectedDistrictName, setSelectedDistrictName] = useState<string>("Gadchiroli");

  const currentSummary = DISTRICT_SUMMARY.find(d => d.id === selectedDisease) || DISTRICT_SUMMARY[0];

  return (
    <div className="w-full bg-[#06080F] text-[#F8FAFC] min-h-screen">
      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-[#F8FAFC]/15 bg-gradient-to-b from-[#030407] to-[#06080F] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5FB0A8] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#5FB0A8]" />
            <span>EXHIBIT 05 · SPATIAL EPIDEMIOLOGY</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-[1.12]">
            The Geographic Reporting Footprint
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed pt-1">
            Mapping 36 districts reveals stark contrasts between widespread urban arboviruses and localized forest malaria.
          </p>
        </div>
      </section>

      {/* 2. THE MAP IS THE EXPERIENCE: DOMINANT SPATIAL OBSERVATORY (80% VIEWPORT) */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        {/* Floating Disease Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F8FAFC]/12 pb-3">
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
            Select Disease Surveillance Footprint:
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {DISTRICT_SUMMARY.map((d) => {
              const isSelected = selectedDisease === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDisease(d.id)}
                  className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm transition-all border flex items-center gap-1.5"
                  style={{
                    borderColor: isSelected ? d.color : "rgba(212, 175, 55, 0.18)",
                    backgroundColor: isSelected ? `${d.color}25` : "#06080F",
                    color: isSelected ? d.color : "rgba(248, 250, 252, 0.7)",
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span>{d.disease}</span>
                  <span className="text-[10px] opacity-70">({d.count}/36)</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dominant Map Container with Integrated Live HUD */}
        <div className="relative bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm p-4 sm:p-6 shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between">
          {/* Top Floating Focal Finding Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F8FAFC]/10 z-10 relative">
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5" style={{ color: currentSummary.color }}>
                <MapPin className="w-3.5 h-3.5" />
                <span>Active Layer: {currentSummary.disease} ({currentSummary.count} of 36 Districts · {currentSummary.pct})</span>
              </div>
              <div className="text-xs font-mono text-[#F8FAFC] font-semibold">
                {currentSummary.focal}
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#94A3B8] bg-[#06080F] px-3 py-1.5 border border-[#F8FAFC]/10 rounded-sm">
              Shading = Investigated Outbreak Presence (≥1 Record)
            </div>
          </div>

          {/* Center Map Visual */}
          <div className="w-full my-auto py-2">
            <MaharashtraMap
              activeDisease={selectedDisease}
              showLegend={false}
              className="w-full h-[min(68vh,680px)] min-h-[480px]"
            />
          </div>

          {/* Bottom Floating Hotspot Callout & Honest Legend Note */}
          <div className="pt-4 border-t border-[#F8FAFC]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#94A3B8] z-10 relative">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs border border-[#5FB0A8]" style={{ backgroundColor: currentSummary.color }} />
              <span className="text-[#F8FAFC] font-semibold">Colored Districts:</span>
              <span>≥1 Investigated Outbreak Verified in 2022–2025</span>
            </div>

            <div className="text-[11px] text-[#94A3B8]/70">
              Absence of shading indicates 0 official investigated reports, not guaranteed biological absence.
            </div>
          </div>
        </div>

        {/* 3. OPTIONAL EXPANDABLE TECHNICAL DISTRICT TABLE */}
        <div className="pt-6 border-t border-[#F8FAFC]/15">
          <button
            onClick={() => setShowTableDrawer(!showTableDrawer)}
            className="w-full p-4 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/15 rounded-sm transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#5FB0A8] font-bold"
          >
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>{showTableDrawer ? "Hide Geographic Footprint Details" : "Explore 36-District Spatial Reporting Matrix & Administrative Methodology"}</span>
            </div>
            {showTableDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showTableDrawer && (
            <div className="pt-6 space-y-6 animate-fadeIn font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#94A3B8]">
                <div className="p-4 bg-[#0B111E] border border-[#F8FAFC]/10 rounded-sm space-y-2">
                  <div className="text-[#F59E0B] font-bold uppercase">Malaria Forest Belt</div>
                  <p className="text-[11px] leading-relaxed">
                    Gadchiroli (29 records) and Chandrapur (14 records) account for 61.4% of all malaria events. High forest cover, persistent tribal hamlets, and riverine vector breeding drive intense localization.
                  </p>
                </div>

                <div className="p-4 bg-[#0B111E] border border-[#F8FAFC]/10 rounded-sm space-y-2">
                  <div className="text-[#38BDF8] font-bold uppercase">Urban Dengue Corridors</div>
                  <p className="text-[11px] leading-relaxed">
                    Dengue spans 31 of 36 districts (86.1%), concentrated along urbanized highways and municipal corporations (Pune, Thane, Nashik, Kolhapur) with artificial household water storage.
                  </p>
                </div>

                <div className="p-4 bg-[#0B111E] border border-[#F8FAFC]/10 rounded-sm space-y-2">
                  <div className="text-[#10B981] font-bold uppercase">Universal ADD Footprint</div>
                  <p className="text-[11px] leading-relaxed">
                    Acute Diarrhoeal Disease was reported across 33 of 36 districts (91.7%), demonstrating that water distribution vulnerabilities during monsoon affect every administrative subdivision.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CHAPTER NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={5} />
    </div>
  );
}
