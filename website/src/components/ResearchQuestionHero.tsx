"use client";

import React, { useState } from "react";
import { HelpCircle, Calendar, Database, Sparkles, Compass } from "lucide-react";

export default function ResearchQuestionHero() {
  const [activePhrase, setActivePhrase] = useState<string | null>("seasonal");

  const phraseDetails: Record<string, { title: string; desc: string; icon: React.ComponentType<{ className?: string }>; dataBadge: string }> = {
    seasonal: {
      title: "Seasonal Patterns (Calendar-Month & Weekly Aggregation)",
      desc: "Investigated by aggregating 539 baseline records across 52 epidemiological weeks and 12 calendar months. Evaluated using 3-month concentration ratios (CR3) and Kendall's W concordance to test recurring annual rank agreement.",
      icon: Calendar,
      dataBadge: "CR3 Ratios: 41.9% to 51.4%"
    },
    outbreak: {
      title: "Outbreak Reports (NCDC / IDSP Surveillance Source)",
      desc: "Refers strictly to passive administrative surveillance records published in official weekly PDF bulletins by the National Centre for Disease Control. These capture investigated cluster events meeting notification thresholds, NOT general population incidence.",
      icon: Database,
      dataBadge: "237 Bulletins · 809 Records"
    },
    vary: {
      title: "Variation Across Diseases (Five Primary Syndromic Families)",
      desc: "Rather than sharing a single monsoon surge, diseases demonstrate distinct temporal profiles: Dengue concentrates in late monsoon (Oct peak); Malaria in early monsoon (May–Jul); ADD shows sustained elevation (Jun–Aug + Oct); Food Poisoning is non-monsoon bimodal; Chikungunya is dispersed.",
      icon: Sparkles,
      dataBadge: "5 Primary Study Families (93.9%)"
    },
    maharashtra: {
      title: "Geographical Scope (Maharashtra State)",
      desc: "Encompasses surveillance investigations across Maharashtra's 36 administrative districts from 2022 to 2025, complemented by a partial-year matched comparison for 2026 Weeks 01–32.",
      icon: Compass,
      dataBadge: "36 Districts Analyzed"
    }
  };

  const active = activePhrase ? phraseDetails[activePhrase] : phraseDetails.seasonal;
  const Icon = active.icon;

  return (
    <div className="w-full bg-[#080D1F] border border-[#1E335E] rounded-xl shadow-2xl p-6 lg:p-10 my-8">
      <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#D4AF37] mb-4">
        <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
        <span>Central Research Inquiry · Interactive Semantic Explorer</span>
      </div>

      {/* Main Interactive Headline Quote */}
      <blockquote className="font-serif text-2xl lg:text-3xl font-normal text-[#F8F5EC] leading-relaxed border-l-2 border-[#D4AF37] pl-6 my-6">
        &ldquo;What{" "}
        <span
          onMouseEnter={() => setActivePhrase("seasonal")}
          className={`cursor-pointer px-1.5 py-0.5 rounded transition-all border-b-2 ${
            activePhrase === "seasonal"
              ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#F3E5AB] font-semibold"
              : "border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#101C38]"
          }`}
        >
          seasonal patterns
        </span>{" "}
        are evident in selected disease{" "}
        <span
          onMouseEnter={() => setActivePhrase("outbreak")}
          className={`cursor-pointer px-1.5 py-0.5 rounded transition-all border-b-2 ${
            activePhrase === "outbreak"
              ? "bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8] font-semibold"
              : "border-[#38BDF8]/40 text-[#38BDF8] hover:bg-[#101C38]"
          }`}
        >
          outbreak reports
        </span>{" "}
        in{" "}
        <span
          onMouseEnter={() => setActivePhrase("maharashtra")}
          className={`cursor-pointer px-1.5 py-0.5 rounded transition-all border-b-2 ${
            activePhrase === "maharashtra"
              ? "bg-[#10B981]/20 border-[#10B981] text-[#10B981] font-semibold"
              : "border-[#10B981]/40 text-[#10B981] hover:bg-[#101C38]"
          }`}
        >
          Maharashtra
        </span>
        , and how do these patterns{" "}
        <span
          onMouseEnter={() => setActivePhrase("vary")}
          className={`cursor-pointer px-1.5 py-0.5 rounded transition-all border-b-2 ${
            activePhrase === "vary"
              ? "bg-[#EF4444]/20 border-[#EF4444] text-[#F87171] font-semibold"
              : "border-[#EF4444]/40 text-[#EF4444] hover:bg-[#101C38]"
          }`}
        >
          vary across diseases
        </span>{" "}
        and seasons?&rdquo;
      </blockquote>

      {/* Semantic Reveal Card */}
      <div className="bg-[#0D162E] border border-[#1E335E] rounded-lg p-5 mt-6 transition-all duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#1E335E]/60 pb-3">
          <div className="flex items-center space-x-2.5">
            <Icon className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-serif text-base font-bold text-white">
              {active.title}
            </span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101C38] text-[#F3E5AB] border border-[#D4AF37]/30">
            {active.dataBadge}
          </span>
        </div>

        <p className="text-xs text-[#AEB9D1] leading-relaxed mt-3">
          {active.desc}
        </p>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] mt-4 pt-3 border-t border-[#1E335E]/40">
          <span>Hover over highlighted phrases above to inspect methodological definitions.</span>
          <span className="text-[#D4AF37]">Academic Focus: Descriptive Surveillance</span>
        </div>
      </div>
    </div>
  );
}
