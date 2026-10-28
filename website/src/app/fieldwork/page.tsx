"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, Calendar, CheckCircle2, ChevronDown, ChevronUp, 
  Eye, MessageSquare, Lightbulb, ShieldCheck, Sparkles,
  Layers, FileText, ArrowRight, Compass, Shield
} from "lucide-react";
import CinematicFieldInspector from "@/components/CinematicFieldInspector";
import MedicalOfficerQuestionnaire from "@/components/MedicalOfficerQuestionnaire";
import ChapterFooter from "@/components/ChapterFooter";
import ConnectedEvidenceHeader from "@/components/ConnectedEvidenceHeader";

export default function FieldworkPage() {
  const [showMethodologyDrawer, setShowMethodologyDrawer] = useState(false);

  return (
    <div className="w-full bg-[#070A0F] text-[#F0DECE] min-h-screen">
      {/* 0. CONNECTED INVESTIGATION HEADER BREADCRUMB */}
      <ConnectedEvidenceHeader currentActNumber={8} />

      {/* 1. VISUAL HEADER */}
      <section className="border-b border-[#F0DECE]/12 bg-gradient-to-b from-[#070A0F] to-[#0B0F15] pt-10 pb-8 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28">
        <div className="max-w-[1360px] mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#BAC0B8] font-bold tracking-widest uppercase">
            <span className="w-2.5 h-2.5 bg-[#8B1414] rotate-45 ring-1 ring-[#F0DECE]/40" />
            <span>ACT 08 · PRIMARY FIELDWORK & QUALITATIVE TRIANGULATION</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F0DECE] leading-[1.12]">
            What the Dataset Cannot Show
          </h1>

          <p className="text-base sm:text-lg text-[#BAC0B8] max-w-3xl leading-relaxed pt-1">
            Primary facility observation and key-informant interview at Nallasopara West (Palghar District) connecting abstract state surveillance statistics to clinical realities, reporting thresholds, and domestic water infrastructure.
          </p>
        </div>
      </section>

      {/* 2. THE CINEMATIC FIELD INVESTIGATION SUITE */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28 max-w-[1360px] mx-auto space-y-12">
        
        {/* SECTION A: CINEMATIC DOCUMENTARY FIELD INSPECTOR */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8B1414]" />
              <span className="text-[#F0DECE] font-bold">Vasai-Virar Municipal Corporation Health Post · Nallasopara West, Palghar</span>
            </div>
            <div className="flex items-center gap-2 text-[#BAC0B8]">
              <Calendar className="w-3.5 h-3.5 text-[#C9944A]" />
              <span>Observation Date: 02 October 2026</span>
            </div>
          </div>

          <CinematicFieldInspector />
        </div>

        {/* SECTION B: STRUCTURED MEDICAL OFFICER QUESTIONNAIRE & TESTIMONY */}
        <div className="space-y-4">
          <MedicalOfficerQuestionnaire />
        </div>

        {/* SECTION C: THREE-TIER EPISTEMOLOGICAL FRAMEWORK */}
        <div className="space-y-6 pt-4 border-t border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B1414] font-bold tracking-widest uppercase">
              <Layers className="w-4 h-4 text-[#8B1414]" />
              <span>THREE-TIER EPISTEMOLOGICAL FRAMEWORK</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F0DECE]">
              Distinguishing Observation, Testimony, and Inference
            </h2>
            <p className="text-xs sm:text-sm text-[#BAC0B8] max-w-2xl leading-relaxed">
              To preserve academic rigor, qualitative evidence is partitioned into three epistemological tiers—preventing personal assumptions from masquerading as verified institutional facts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier A: Observed */}
            <div className="bg-[#0B0F15] border border-white/[0.08] rounded-xs p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#F0DECE]">
                <Eye className="w-4 h-4 text-[#8B1414]" />
                <span>A. Directly Observed</span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#F0DECE]">
                Physical & Environmental Evidence
              </h3>
              <ul className="space-y-2.5 text-xs text-[#BAC0B8] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#8B1414] mt-0.5">•</span>
                  <span>Outpatient registration queues logged febrile patients manually into physical paper registries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B1414] mt-0.5">•</span>
                  <span>Unlined roadside storm channels contained stagnant surface water adjacent to residential access lanes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B1414] mt-0.5">•</span>
                  <span>Domestic plastic water storage drums (200L capacity) were maintained filled on residential verandas due to intermittent supply.</span>
                </li>
              </ul>
            </div>

            {/* Tier B: Reported */}
            <div className="bg-[#0B0F15] border border-white/[0.08] rounded-xs p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C9944A]">
                <MessageSquare className="w-4 h-4 text-[#C9944A]" />
                <span>B. Staff Testimony</span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#F0DECE]">
                Clinical Reporting Pathways
              </h3>
              <ul className="space-y-2.5 text-xs text-[#BAC0B8] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9944A] mt-0.5">•</span>
                  <span>The Medical Officer reported that municipal piped tap supply runs on scheduled intervals (every 2–3 days), requiring routine domestic water hoarding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9944A] mt-0.5">•</span>
                  <span>Rapid Diagnostic Tests (dengue NS1/IgM antigen kits) guide immediate clinical triage prior to laboratory confirmation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9944A] mt-0.5">•</span>
                  <span>Presumptive cases (Form P) are transmitted weekly to the District Surveillance Unit, filtering out mild OPD encounters.</span>
                </li>
              </ul>
            </div>

            {/* Tier C: Inferred */}
            <div className="bg-[#0B0F15] border border-white/[0.08] rounded-xs p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8B1414]">
                <Lightbulb className="w-4 h-4 text-[#8B1414]" />
                <span>C. Researcher Inference</span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#F0DECE]">
                Mechanistic Hypotheses
              </h3>
              <ul className="space-y-2.5 text-xs text-[#BAC0B8] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#8B1414] mt-0.5">•</span>
                  <span>Artificial water storage decouples vector breeding from direct rainfall, generating a viable hypothesis for October post-monsoon dengue peaks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B1414] mt-0.5">•</span>
                  <span>The discrepancy between OPD fever volume and state outbreak counts reflects formal cluster investigation thresholds rather than true infection prevalence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B1414] mt-0.5">•</span>
                  <span>Early monsoon pipe pressure losses draw contaminated groundwater into drinking conduits, provoking July ADD surges.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION D: SCIENTIFIC SYNTHESIS CALLOUT */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#180505] to-[#0E141D] border border-[#8B1414]/50 rounded-xs flex items-start gap-4 text-xs sm:text-sm text-[#BAC0B8] leading-relaxed shadow-xl">
          <CheckCircle2 className="w-5 h-5 text-[#8B1414] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-[#F0DECE] font-bold font-serif text-sm sm:text-base">
              Scientific Synthesis: Grounding Abstract Statistics in Physical Reality
            </div>
            <div>
              Statewide surveillance numbers show Dengue peaking in October, three months after the monsoon arrives. 
              Ground observation and the Medical Officer&apos;s interview in Palghar reveal the explanatory physical mechanism: because municipal piped water is supplied intermittently in high-density peri-urban settlements, 
              households store water permanently in open 200L plastic drums. This creates artificial peri-domestic vector habitats that persist long after outdoor rain puddles have dried up. 
              While a single facility visit cannot establish statewide causality, it grounds abstract data in physical infrastructure realities and confirms the 2–3 week paper-to-digital reporting latency.
            </div>
          </div>
        </div>

        {/* SECTION E: EXPANDABLE METHODOLOGY & ETHICS DRAWER */}
        <div className="pt-2 border-t border-white/[0.08]">
          <button
            onClick={() => setShowMethodologyDrawer(!showMethodologyDrawer)}
            className="w-full p-4 bg-[#0B0F15] hover:bg-[#8B1414]/20 border border-[#F0DECE]/20 rounded-xs transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#F0DECE] font-bold cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8B1414]" />
              <span>{showMethodologyDrawer ? "Hide Fieldwork Protocol & Ethics Register" : "Review Fieldwork Protocol, Institutional Ethics & Limitations"}</span>
            </div>
            {showMethodologyDrawer ? <ChevronUp className="w-4 h-4 text-[#8B1414]" /> : <ChevronDown className="w-4 h-4 text-[#8B1414]" />}
          </button>

          {showMethodologyDrawer && (
            <div className="pt-6 space-y-4 animate-fadeIn font-mono text-xs text-[#BAC0B8]">
              <div className="p-5 bg-[#0B0F15] border border-white/[0.08] rounded-xs space-y-3 shadow-xl">
                <div className="text-[#8B1414] font-bold uppercase text-[10px] flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#8B1414]" />
                  <span>Institutional Protocol & Ethics Register</span>
                </div>
                <p className="leading-relaxed">
                  Fieldwork conducted on 02 October 2026 at the Vasai-Virar Municipal Corporation (VVMC) Urban Health Post, Palghar District. 
                  Facility visits adhered strictly to observational research guidelines: no clinical procedures were interrupted, no identifiable patient photographs were captured, 
                  and all informant discussions were conducted with informed verbal consent for non-commercial academic research.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-[#F0DECE]">Methodological Boundary:</strong> Observations reflect a single municipal peri-urban health center in coastal Konkan. 
                  While qualitative observations provide plausible mechanistic hypotheses, they cannot be generalized across differing ecological zones (e.g., eastern forest tracts in Gadchiroli or Marathwada agrarian belts) without dedicated multi-district fieldwork.
                </p>
              </div>
            </div>
          )}
        </div>

      </section>

      {/* 3. CHAPTER NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={8} />
    </div>
  );
}
