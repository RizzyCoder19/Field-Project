"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, Calendar, CheckCircle2, ChevronDown, ChevronUp, 
  Camera, MessageSquare, ShieldCheck, UserCheck, Layers
} from "lucide-react";
import FieldworkPhotoGallery from "@/components/FieldworkPhotoGallery";
import ChapterFooter from "@/components/ChapterFooter";

export default function FieldworkPage() {
  const [showInterviewDrawer, setShowInterviewDrawer] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const interviewModules = [
    {
      id: "01",
      title: "Seasonal Surges & Dual Peak Dynamics",
      source: "Reported by Medical Officer · Paraphrased Field Note",
      points: [
        "Monsoon (Jun–Jul): Acute gastroenteritis and diarrhea spike rapidly from pipe suction contamination and unlined drain overflows.",
        "Post-Monsoon (Sep–Nov): Fever cases dominate the OPD; suspected dengue surges as rain pools dry and domestic storage containers persist.",
      ]
    },
    {
      id: "02",
      title: "Diagnostic Triage & IDSP Reporting Pathway",
      source: "Reported by Medical Officer · Paraphrased Field Note",
      points: [
        "Initial triage relies on Rapid Diagnostic Test (RDT) kits: malaria antigen cards and dengue NS1/IgM rapid cassettes.",
        "Daily paper logs (Form P presumptive, Form L confirmed) are consolidated weekly on Mondays and transmitted electronically to the District Surveillance Unit (DSU).",
      ]
    },
    {
      id: "03",
      title: "Breeding Ecology: Water Storage vs. Rainfall",
      source: "Researcher Direct Physical Observation",
      points: [
        "Because municipal tap water flows only every 2 to 3 days, households maintain large 200-litre plastic blue drums continuously filled.",
        "This artificial container habitat decouples Aedes aegypti breeding from natural precipitation, explaining why dengue peaks in October post-monsoon.",
      ]
    },
    {
      id: "04",
      title: "Threshold Divergence: Clinics vs. Outbreak Bulletins",
      source: "Reported by Medical Officer · Methodological Context",
      points: [
        "Official government surveillance bulletins capture investigated clusters meeting outbreak thresholds.",
        "Individual mild cases treated and discharged on OPD oral rehydration do not appear in state bulletins unless a formal community investigation is triggered.",
      ]
    }
  ];

  return (
    <div className="w-full bg-[#06080F] text-[#F8FAFC] min-h-screen">
      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-[#F8FAFC]/15 bg-gradient-to-b from-[#030407] to-[#06080F] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <span>EXHIBIT 09 · PRIMARY FIELDWORK</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-[1.12]">
            Fieldwork: Ground Truth in Palghar
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed pt-1">
            Primary facility observation at an Urban Health Post connects statewide surveillance numbers to clinical realities.
          </p>
        </div>
      </section>

      {/* 2. DOMINANT INTERACTIVE PHOTO ESSAY EXHIBIT (80% VIEWPORT) */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        {/* Geographic Masthead & Facility Details */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F8FAFC]/12 pb-3 text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-[#F8FAFC] font-semibold">Urban Health Post · Nallasopara West, Palghar District</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Site Visit Date: 02 October 2026</span>
          </div>
        </div>

        {/* The Full Interactive Curtain Gallery Exhibit */}
        <div className="shadow-2xl">
          <FieldworkPhotoGallery />
        </div>

        {/* Attached Core Takeaway Callout */}
        <div className="p-4 bg-[#0B111E] border border-[#00F0FF]/30 rounded-sm flex items-start gap-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#F8FAFC]">Key Fieldwork Discovery:</strong> Statewide numbers show Dengue peaking three months after the monsoon arrives. 
            Ground observation in Nallasopara West provides the behavioral explanation: because municipal piped water is supplied only intermittently (alternate days), 
            households store water permanently in open plastic drums, creating artificial peri-domestic mosquito habitats that peak in October long after outdoor puddles evaporate.
          </div>
        </div>

        {/* 3. OPTIONAL EXPANDABLE INTERVIEW & ETHICS DRAWER */}
        <div className="pt-6 border-t border-[#F8FAFC]/15">
          <button
            onClick={() => setShowInterviewDrawer(!showInterviewDrawer)}
            className="w-full p-4 bg-[#0B111E] hover:bg-[#1A2234] border border-[#F8FAFC]/15 rounded-sm transition-all flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#00F0FF] font-bold"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>{showInterviewDrawer ? "Hide Key Informant Notes & Ethics" : "Explore Key Informant Interview Insights, Triaging Pathways & Fieldwork Ethics"}</span>
            </div>
            {showInterviewDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showInterviewDrawer && (
            <div className="pt-6 space-y-6 animate-fadeIn font-mono text-xs text-[#94A3B8]">
              {/* Interview Modules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {interviewModules.map((m, idx) => (
                  <div key={m.id} className="p-4 bg-[#0B111E] border border-[#F8FAFC]/10 rounded-sm space-y-2.5">
                    <div className="flex items-center justify-between border-b border-[#F8FAFC]/10 pb-2">
                      <span className="font-serif text-sm font-bold text-[#F8FAFC]">{m.title}</span>
                      <span className="text-[10px] text-[#00F0FF]">{m.id}</span>
                    </div>
                    <div className="text-[10px] uppercase text-[#10B981] font-bold">
                      {m.source}
                    </div>
                    <ul className="space-y-1.5 text-[11px] leading-relaxed">
                      {m.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-[#00F0FF] font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Research Ethics Statement */}
              <div className="p-4 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm space-y-2">
                <div className="flex items-center gap-2 text-[#00F0FF] font-bold uppercase text-[10px]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Observational Research Ethics & Participant Confidentiality</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  The facility visit was conducted strictly as an observational study and key-informant interview with the facility Medical Officer. 
                  In accordance with public health research ethics, no individual patient identifiers, medical files, or confidential clinical records were inspected, photographed, or copied. 
                  All clinical insights are paraphrased from field notes to document operational surveillance mechanics.
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
