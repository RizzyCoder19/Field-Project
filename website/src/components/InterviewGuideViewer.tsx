"use client";

import React, { useState } from "react";
import { Mic, UserCheck, Shield, ChevronRight, Stethoscope, Store, HeartPulse, Building2 } from "lucide-react";

export default function InterviewGuideViewer() {
  const [activeRole, setActiveRole] = useState("chemist");

  const roles = [
    {
      id: "chemist",
      title: "Community Retail Pharmacist",
      icon: Store,
      purpose: "Examines over-the-counter (OTC) antipyretic, anti-emetic, and ORS sales spikes as early proxy signals for community outbreaks prior to hospital admission.",
      questions: [
        { id: "INT-CH-1", q: "In which months do you see the sharpest rise in customer demand for fever medications and oral rehydration salts?", purpose: "Validates community perception against the June–October NCDC surge." },
        { id: "INT-CH-2", q: "Do customers typically purchase medications directly for fever without seeing a registered medical practitioner first?", purpose: "Quantifies the initial self-medication window preceding official clinic reporting." },
        { id: "INT-CH-3", q: "When multiple families in the same neighborhood request diarrheal medications in the same week, is this reported to any municipal ward health office?", purpose: "Identifies whether private pharmacy sales provide an uncaptured early-warning signal." }
      ]
    },
    {
      id: "doctor",
      title: "Primary Care Physician (Private GP)",
      icon: Stethoscope,
      purpose: "Details the operational frictions in weekly IDSP notification paperwork and reasons why mild clinical encounters bypass official surveillance.",
      questions: [
        { id: "INT-GP-1", q: "What proportion of patients presenting with acute fever are sent for serological laboratory testing (e.g. NS1/IgM for Dengue) versus diagnosed syndromically?", purpose: "Investigates laboratory confirmation latency and syndromic classification." },
        { id: "INT-GP-2", q: "How frequently does your clinic submit weekly disease notification forms to the local municipal or district health office?", purpose: "Measures private-sector surveillance notification completeness." },
        { id: "INT-GP-3", q: "What operational barriers exist in the formal reporting pathway (e.g. paperwork complexity, patient privacy concerns)?", purpose: "Documents the institutional bottlenecks separating community illness from official NCDC records." }
      ]
    },
    {
      id: "asha",
      title: "Frontline Community Health Worker (ASHA / ANM)",
      icon: HeartPulse,
      purpose: "Explores house-to-house fever tracking, community resistance, and chlorination monitoring during monsoon months.",
      questions: [
        { id: "INT-AS-1", q: "During monsoon months (June–September), what specific household checks are conducted for stagnant water and vector breeding?", purpose: "Examines domestic breeding container abatement practices." },
        { id: "INT-AS-2", q: "How do you track clusters of diarrhea in the community, and what is the protocol when more than three cases occur on a single lane?", purpose: "Explains how localized alerts trigger rapid response team (RRT) investigations." }
      ]
    },
    {
      id: "inspector",
      title: "Ward Sanitary / Vector Abatement Inspector",
      icon: Building2,
      purpose: "Evaluates the logistical challenges of pre-monsoon storm drain desilting, indoor fogging, and larvicidal chemical supply chains.",
      questions: [
        { id: "INT-SI-1", q: "When does the municipal corporation commence pre-monsoon drain desilting and pesticide spraying relative to the monsoon onset?", purpose: "Assesses proactive timing vs. reactive post-outbreak intervention." },
        { id: "INT-SI-2", q: "Which areas in the ward present the greatest persistent challenge for vector control and water contamination?", purpose: "Identifies structural environmental hotspots in high-density informal settlements." }
      ]
    }
  ];

  const active = roles.find(r => r.id === activeRole) || roles[0];

  return (
    <div className="w-full bg-[#080D1F] border border-[#1E335E] rounded-xl shadow-2xl p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#1E335E]/60 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#D4AF37]">
            <Mic className="w-3.5 h-3.5" />
            <span>Key Informant Interview Guides · 4 Stakeholder Archetypes</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#F8F5EC] mt-1">
            Perspectives Across the Healthcare Ecosystem
          </h3>
          <p className="text-xs text-[#AEB9D1]">
            Semi-structured interview schedules designed to document operational surveillance bottlenecks.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded bg-[#101C38] text-[#F3E5AB] border border-[#D4AF37]/30">
          Status: Planned Instrument
        </span>
      </div>

      {/* Role Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {roles.map((r) => {
          const Icon = r.icon;
          const isSelected = activeRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setActiveRole(r.id)}
              className={`p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? "bg-[#16274D] border-[#D4AF37] text-white shadow-xl"
                  : "bg-[#0D162E] border-[#1E335E]/60 text-[#AEB9D1] hover:border-[#D4AF37]/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${isSelected ? "text-[#D4AF37]" : "text-[#64748B]"}`} />
                <span className="text-[10px] font-mono text-[#D4AF37]">Guide</span>
              </div>
              <div className="font-serif text-xs font-bold text-white mt-1 line-clamp-1">{r.title}</div>
            </button>
          );
        })}
      </div>

      {/* Active Role Content Card */}
      <div className="bg-[#0D162E] border border-[#1E335E] rounded-lg p-6 space-y-4">
        <div className="border-b border-[#1E335E]/60 pb-3">
          <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-semibold">
            {active.title} Interview Schedule
          </div>
          <p className="text-xs text-[#AEB9D1] mt-1 leading-relaxed">
            <span className="text-white font-semibold">Research Rationale:</span> {active.purpose}
          </p>
        </div>

        {/* Question Schedule */}
        <div className="space-y-3">
          {active.questions.map((q, idx) => (
            <div key={q.id} className="bg-[#0A1128] border border-[#1E335E]/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#D4AF37] font-bold">{q.id}</span>
                <span className="text-[10px] uppercase text-[#F87171] bg-[#EF4444]/10 px-2 py-0.5 rounded border border-[#EF4444]/30">
                  Evidence Status: Planned
                </span>
              </div>
              <div className="font-serif text-sm font-semibold text-[#F8F5EC]">
                &ldquo;{q.q}&rdquo;
              </div>
              <div className="text-[11px] text-[#64748B] pt-1 border-t border-[#1E335E]/30">
                <span className="text-[#AEB9D1] font-semibold">Analytical Purpose:</span> {q.purpose}
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Protection Note */}
        <div className="flex items-center space-x-2 text-[11px] font-mono text-[#64748B] pt-2">
          <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Informed consent and institutional anonymity safeguards documented in research ethics protocol.</span>
        </div>
      </div>
    </div>
  );
}
