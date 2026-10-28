"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, 
  Layers, ShieldAlert, BarChart3, TrendingDown
} from "lucide-react";
import NativeOutlierDecomposition from "@/components/NativeOutlierDecomposition";
import ChapterFooter from "@/components/ChapterFooter";
import ConnectedEvidenceHeader from "@/components/ConnectedEvidenceHeader";

export default function OutliersPage() {
  const [showMethodologyDrawer, setShowMethodologyDrawer] = useState(false);

  return (
    <div className="w-full bg-[#06080F] text-[#F8FAFC] min-h-screen">
      <ConnectedEvidenceHeader currentActNumber={7} />

      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-[#F8FAFC]/15 bg-gradient-to-b from-[#030407] to-[#06080F] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5FB0A8] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#5FB0A8]" />
            <span>EXHIBIT 07 · NUMERICAL SENSITIVITY</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-[1.12]">
            The Outlier Investigation
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed pt-1">
            How three massive point-source banquet events distorted the statewide food poisoning monthly curve.
          </p>
        </div>
      </section>

      {/* 2. DOMINANT INTERACTIVE WATERFALL DECOMPOSITION EXHIBIT (80% VIEWPORT) */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        {/* The Native Interactive Decomposition Component in Observatory Frame */}
        <div className="shadow-2xl">
          <NativeOutlierDecomposition />
        </div>

        {/* Direct Attached Takeaways Banner */}
        <div className="p-4 bg-[#0B111E] border border-[#5FB0A8]/30 rounded-sm flex items-start gap-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          <CheckCircle2 className="w-5 h-5 text-[#5FB0A8] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#F8FAFC]">Core Public Health Finding:</strong> When three single banquet records totaling <strong className="text-[#EF4444]">1,615 cases</strong> are set aside in sensitivity analysis, February case volume collapses from 2,162 down to 547 cases. 
            The genuine background seasonal peak moves to the pre-monsoon summer months of April (899 cases) and May (894 cases).
          </div>
        </div>

        {/* Scientific Integrity Note */}
        <div className="p-3 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm text-[11px] font-mono text-[#94A3B8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            ★ Scientific Integrity: Government bulletins remain 100% authentic; sensitivity testing investigates analytical distortion, not fraud.
          </span>
          <span className="text-[#5FB0A8]">Sensitivity Protocol</span>
        </div>

        {/* 3. OPTIONAL EXPANDABLE SENSITIVITY METHODOLOGY DRAWER */}
        <div className="pt-6 border-t border-[#F8FAFC]/15">
          <button
            onClick={() => setShowMethodologyDrawer(!showMethodologyDrawer)}
            className="w-full p-4 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/15 rounded-sm transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#5FB0A8] font-bold"
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>{showMethodologyDrawer ? "Hide Outlier Sensitivity Protocol" : "Explore Outlier Identification Protocol & 4-Year Food Poisoning Table"}</span>
            </div>
            {showMethodologyDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showMethodologyDrawer && (
            <div className="pt-6 space-y-6 animate-fadeIn font-mono text-xs text-[#94A3B8]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#0B111E] border border-[#F8FAFC]/10 rounded-sm space-y-2">
                  <div className="text-[#EF4444] font-bold uppercase text-[10px]">Event 1 · Nanded (2024 W07)</div>
                  <div className="text-base font-serif font-bold text-[#F8FAFC]">650 Reported Cases</div>
                  <p className="text-[11px] leading-relaxed">
                    Mass community feast exposure. Contaminated dairy dessert served to wedding attendees across multiple municipal wards.
                  </p>
                </div>

                <div className="p-4 bg-[#0B111E] border border-[#F8FAFC]/10 rounded-sm space-y-2">
                  <div className="text-[#EF4444] font-bold uppercase text-[10px]">Event 2 · Solapur (2024 W08)</div>
                  <div className="text-base font-serif font-bold text-[#F8FAFC]">510 Reported Cases</div>
                  <p className="text-[11px] leading-relaxed">
                    Religious pilgrimage festival banquet. Contaminated storage tank water used in cooking for mass congregants.
                  </p>
                </div>

                <div className="p-4 bg-[#0B111E] border border-[#F8FAFC]/10 rounded-sm space-y-2">
                  <div className="text-[#EF4444] font-bold uppercase text-[10px]">Event 3 · Pune (2024 W08)</div>
                  <div className="text-base font-serif font-bold text-[#F8FAFC]">455 Reported Cases</div>
                  <p className="text-[11px] leading-relaxed">
                    Inter-district youth gathering and catered hostel meal. Rapid onset gastrointestinal illness treated at civil hospital.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CHAPTER NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={7} />
    </div>
  );
}
