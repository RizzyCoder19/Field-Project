"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, Calendar, CheckCircle2, ChevronDown, ChevronUp, 
  Eye, MessageSquare, Lightbulb, ShieldCheck
} from "lucide-react";
import FieldworkPhotoGallery from "@/components/FieldworkPhotoGallery";
import ChapterFooter from "@/components/ChapterFooter";

export default function FieldworkPage() {
  const [showMethodologyDrawer, setShowMethodologyDrawer] = useState(false);

  return (
    <div className="w-full bg-[#070A10] text-[#F5F1E8] min-h-screen">
      {/* 1. VISUAL HEADER */}
      <section className="border-b border-white/[0.08] bg-gradient-to-b from-[#05070B] to-[#070A10] pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5FB0A8] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#5FB0A8]" />
            <span>EXHIBIT 09 · DOCUMENTARY INVESTIGATION</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F1E8] leading-[1.12]">
            What the dataset cannot show
          </h1>

          <p className="text-base sm:text-lg text-[#A8B6BA] max-w-3xl leading-relaxed pt-1">
            Primary facility observation at an Urban Health Post in Palghar District connects statewide surveillance tallies to clinical realities, reporting thresholds, and domestic water infrastructure.
          </p>
        </div>
      </section>

      {/* 2. PHOTO ESSAY EXHIBIT */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        {/* Geographic Context Line */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3 text-xs font-mono text-[#A8B6BA]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#5FB0A8]" />
            <span className="text-[#F5F1E8] font-semibold">Urban Health Post · Nallasopara West, Palghar District</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#D7B56D]" />
            <span>Site Visit Date: 02 October 2026</span>
          </div>
        </div>

        {/* Documentary Gallery */}
        <div className="shadow-2xl">
          <FieldworkPhotoGallery />
        </div>

        {/* Three-Tier Evidence Register */}
        <div className="space-y-4 pt-4">
          <div className="border-b border-white/[0.08] pb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#A8B6BA]">
              Three-Tier Epistemological Framework
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#F5F1E8] mt-1">
              Distinguishing observation, testimony, and inference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier A: Observed */}
            <div className="bg-[#0A1016] border border-white/[0.08] rounded-sm p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5FB0A8]">
                <Eye className="w-4 h-4" />
                <span>A. Directly Observed</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">
                Physical & Environmental Evidence
              </h3>
              <ul className="space-y-2.5 text-xs text-[#A8B6BA] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#5FB0A8] mt-0.5">•</span>
                  <span>Outpatient registration queues logged febrile patients manually into paper physical registries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5FB0A8] mt-0.5">•</span>
                  <span>Unlined roadside storm channels contained stagnant surface water adjacent to residential access lanes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5FB0A8] mt-0.5">•</span>
                  <span>Domestic plastic water storage drums (200L capacity) were maintained filled on residential verandas.</span>
                </li>
              </ul>
            </div>

            {/* Tier B: Reported */}
            <div className="bg-[#0A1016] border border-white/[0.08] rounded-sm p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D7B56D]">
                <MessageSquare className="w-4 h-4" />
                <span>B. Staff Testimony</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">
                Clinical Reporting Pathways
              </h3>
              <ul className="space-y-2.5 text-xs text-[#A8B6BA] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#D7B56D] mt-0.5">•</span>
                  <span>The Medical Officer reported that municipal piped tap supply runs on scheduled intervals (every 2–3 days), requiring routine domestic water hoarding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D7B56D] mt-0.5">•</span>
                  <span>Rapid Diagnostic Tests (dengue NS1/IgM antigen kits) guide immediate clinical triage prior to laboratory confirmation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D7B56D] mt-0.5">•</span>
                  <span>Presumptive cases (Form P) are transmitted weekly to the District Surveillance Unit, filtering out mild OPD encounters.</span>
                </li>
              </ul>
            </div>

            {/* Tier C: Inferred */}
            <div className="bg-[#0A1016] border border-white/[0.08] rounded-sm p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#38BDF8]">
                <Lightbulb className="w-4 h-4" />
                <span>C. Researcher Inference</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">
                Hypotheses for Further Study
              </h3>
              <ul className="space-y-2.5 text-xs text-[#A8B6BA] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#38BDF8] mt-0.5">•</span>
                  <span>Artificial water storage may decouple vector breeding from direct rainfall, generating a viable hypothesis for October post-monsoon dengue peaks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#38BDF8] mt-0.5">•</span>
                  <span>The discrepancy between OPD fever volume and state outbreak counts reflects formal cluster investigation thresholds rather than true infection prevalence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#38BDF8] mt-0.5">•</span>
                  <span>Early monsoon pipe pressure losses may draw contaminated groundwater into drinking conduits, provoking July ADD surges.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Attached Core Takeaway Callout */}
        <div className="p-5 bg-[#0A1016] border border-[#5FB0A8]/30 rounded-sm flex items-start gap-3 text-xs sm:text-sm text-[#A8B6BA] leading-relaxed">
          <CheckCircle2 className="w-5 h-5 text-[#5FB0A8] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#F5F1E8]">Scientific Synthesis:</strong> Statewide surveillance numbers show Dengue peaking in October, three months after the monsoon arrives. 
            Ground observation in Palghar suggests an explanatory hypothesis: because municipal piped water is supplied intermittently in high-density peri-urban settlements, 
            households store water permanently in open plastic drums. This creates artificial peri-domestic vector habitats that persist long after outdoor rain puddles have dried up. 
            While a single facility visit cannot prove statewide causality, it grounds abstract data in physical infrastructure realities.
          </div>
        </div>

        {/* Expandable Field Methodology & Ethics Drawer */}
        <div className="pt-4 border-t border-white/[0.08]">
          <button
            onClick={() => setShowMethodologyDrawer(!showMethodologyDrawer)}
            className="w-full p-4 bg-[#0A1016] hover:bg-[#121922] border border-white/[0.08] rounded-sm transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#5FB0A8] font-bold"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{showMethodologyDrawer ? "Hide Fieldwork Protocol & Ethics Register" : "Review Fieldwork Protocol, Institutional Ethics & Limitations"}</span>
            </div>
            {showMethodologyDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showMethodologyDrawer && (
            <div className="pt-6 space-y-4 animate-fadeIn font-mono text-xs text-[#A8B6BA]">
              <div className="p-5 bg-[#0A1016] border border-white/[0.06] rounded-sm space-y-3">
                <div className="text-[#5FB0A8] font-bold uppercase text-[10px]">
                  Institutional Protocol & Ethics
                </div>
                <p className="leading-relaxed">
                  Fieldwork conducted on 02 October 2026 at the Vasai-Virar Municipal Corporation (VVMC) Urban Health Post, Palghar District. 
                  Facility visits adhered to observational research guidelines: no clinical procedures were interrupted, no identifiable patient photographs were captured, 
                  and all informant discussions were conducted with informed verbal consent for non-commercial academic research.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-[#F5F1E8]">Methodological Limitation:</strong> Observations reflect a single municipal peri-urban health center in coastal Konkan. 
                  While qualitative observations provide plausible mechanistic hypotheses, they cannot be generalized across differing ecological zones (e.g., eastern forest tracts or Marathwada agrarian belts) without dedicated multi-district fieldwork.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CHAPTER NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={9} />
    </div>
  );
}
