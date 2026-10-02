"use client";

import React, { useState } from "react";
import { ClipboardList, CheckSquare, AlertCircle, FileText, UserCheck, Shield } from "lucide-react";

export default function QuestionnaireViewer() {
  const [activeTab, setActiveTab] = useState<"full" | "short">("full");
  const [selectedSection, setSelectedSection] = useState("A");

  const fullSections = [
    { id: "A", title: "Participant & Household Demographics", count: 5 },
    { id: "B", title: "Seasonal Disease Awareness & Perceptions", count: 6 },
    { id: "C", title: "Vector-Borne Disease Experience (Dengue/Malaria/Chikungunya)", count: 7 },
    { id: "D", title: "Water-Borne Illness & Drinking Water Sources (ADD/Cholera)", count: 6 },
    { id: "E", title: "Food Safety & Suspected Food Poisoning Encounters", count: 5 },
    { id: "F", title: "Healthcare-Seeking Behavior & Treatment Pathways", count: 6 },
    { id: "G", title: "Awareness of Government Surveillance (IDSP/ASHA/Municipal)", count: 4 },
    { id: "H", title: "Local Environmental & Sanitation Observations", count: 5 },
    { id: "I", title: "Community Early Warning & Preparedness Readiness", count: 4 },
    { id: "J", title: "Researcher Notes & Quality Control Protocol", count: 2 }
  ];

  const sampleQuestions: Record<string, { qId: string; text: string; type: string; options?: string[]; note: string }[]> = {
    A: [
      { qId: "A-01", text: "Administrative District & Ward / Taluka", type: "Categorical Select", options: ["Mumbai Suburban", "Pune", "Thane", "Gadchiroli", "Kolhapur", "Other 31 Districts"], note: "Geographical stratification." },
      { qId: "A-02", text: "Settlement typology of residence", type: "Single Select", options: ["High-density informal settlement", "Chawl / Tenement cluster", "Middle-income apartment", "Peri-urban / Rural fringe"], note: "Vulnerability context." },
      { qId: "A-03", text: "Duration of residence in this locality", type: "Numeric (Years)", note: "Ensures respondent has observed seasonal transitions." }
    ],
    B: [
      { qId: "B-01", text: "In which months do you observe the highest incidence of fever or illness in your family?", type: "Multi-select Months", options: ["Jan–Feb", "Mar–May (Pre-monsoon)", "Jun–Aug (Monsoon)", "Sep–Oct (Post-monsoon)", "Nov–Dec"], note: "Tests alignment with NCDC peak windows." },
      { qId: "B-02", text: "Do you believe specific diseases arrive strictly with the monsoon rains?", type: "Likert Scale", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Disease occurs year-round"], note: "Assesses community perception vs. quantitative bimodal evidence." }
    ],
    C: [
      { qId: "C-01", text: "Has anyone in your household been diagnosed with Dengue in the past two years?", type: "Binary + Year", options: ["Yes (2024)", "Yes (2025)", "Yes (Earlier)", "No"], note: "Cluster recall." },
      { qId: "C-02", text: "In which month did the illness occur?", type: "Calendar Month", note: "Cross-checks the 82.8% June–October NCDC Dengue window." }
    ],
    D: [
      { qId: "D-01", text: "What is your household's primary source of daily drinking water?", type: "Single Select", options: ["Municipal piped tap (Direct)", "Overhead / Underground stored tap", "Community public standpost", "Private tanker delivery", "Borewell / Handpump"], note: "Direct link to ADD transmission." },
      { qId: "D-02", text: "During the monsoon, does the tap water change color, smell, or clarity?", type: "Single Select", options: ["Frequently turbid / brownish", "Occasional odor after heavy rain", "Always clean and clear", "Do not receive municipal water"], note: "Monsoon pipe infiltration indicator." }
    ],
    E: [
      { qId: "E-01", text: "Have you ever observed multiple family or community members falling ill simultaneously after a meal?", type: "Binary + Setting", options: ["Yes (Community feast / wedding)", "Yes (Hostel / Mess)", "Yes (Street food)", "No"], note: "Investigates point-source mass outbreaks." }
    ],
    F: [
      { qId: "F-01", text: "When a family member develops high fever or vomiting, where do you seek treatment first?", type: "Ranked Choice", options: ["Private local GP / Dispensary", "Municipal / Government hospital", "Retail chemist / Self-medication", "Home remedy first, doctor if severe"], note: "Documents the private healthcare blindspot in government surveillance." }
    ]
  };

  return (
    <div className="w-full bg-[#080D1F] border border-[#1E335E] rounded-xl shadow-2xl p-6 lg:p-8 space-y-6">
      {/* Top Banner with Strict Disclaimer */}
      <div className="bg-[#101C38] border-l-4 border-[#D4AF37] p-4 rounded-r-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#D4AF37] font-bold">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span>Fieldwork Instrument Status: Standardized Protocol</span>
          </div>
          <p className="text-xs text-[#AEB9D1] mt-1">
            This explorer presents the structured questions prepared for academic fieldwork deployment. In strict compliance with research ethics, <span className="text-white font-bold">all fields are labeled &ldquo;NOT YET COLLECTED&rdquo;</span> — no fabricated respondent surveys are hosted on this platform.
          </p>
        </div>
        <span className="shrink-0 px-3 py-1.5 rounded bg-[#0A1128] text-[#F3E5AB] font-mono text-xs border border-[#D4AF37]/30">
          Status: Planned
        </span>
      </div>

      {/* Mode Toggle: Master vs Rapid */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#1E335E]/60 pb-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#F8F5EC]">
            Interactive Questionnaire Explorer
          </h3>
          <p className="text-xs text-[#AEB9D1]">
            Standardized multi-module research tool designed for stratified community sampling.
          </p>
        </div>

        <div className="flex bg-[#0D162E] p-1 rounded-lg border border-[#D4AF37]/30 text-xs font-mono">
          <button
            onClick={() => setActiveTab("full")}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === "full"
                ? "bg-[#D4AF37] text-[#0A1128] font-bold shadow-md"
                : "text-[#AEB9D1] hover:text-white"
            }`}
          >
            MASTER INSTRUMENT (50 Questions)
          </button>
          <button
            onClick={() => setActiveTab("short")}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === "short"
                ? "bg-[#D4AF37] text-[#0A1128] font-bold shadow-md"
                : "text-[#AEB9D1] hover:text-white"
            }`}
          >
            RAPID FIELD FORM (20 Questions)
          </button>
        </div>
      </div>

      {/* Full Questionnaire Module Tabs */}
      {activeTab === "full" && (
        <div className="flex flex-wrap gap-1.5 border-b border-[#1E335E]/40 pb-3">
          {fullSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSection(sec.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                selectedSection === sec.id
                  ? "bg-[#16274D] text-[#D4AF37] border border-[#D4AF37] font-bold"
                  : "bg-[#0D162E] text-[#AEB9D1] hover:bg-[#101C38] border border-[#1E335E]/40"
              }`}
            >
              Module {sec.id} ({sec.count} Qs)
            </button>
          ))}
        </div>
      )}

      {/* Questions Preview List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-mono text-[#D4AF37] px-1">
          <span>MODULE {selectedSection}: {fullSections.find(s => s.id === selectedSection)?.title}</span>
          <span>Sample Field Instrument View</span>
        </div>

        {(sampleQuestions[selectedSection] || sampleQuestions.A).map((q) => (
          <div key={q.qId} className="bg-[#0D162E] border border-[#1E335E] rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start gap-2">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#101C38] text-[#D4AF37] border border-[#D4AF37]/30">
                  {q.qId}
                </span>
                <span className="text-xs font-mono text-[#38BDF8]">{q.type}</span>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#EF4444]/10 text-[#F87171] border border-[#EF4444]/30">
                Response: Not Yet Collected
              </span>
            </div>

            <div className="font-serif text-sm font-semibold text-[#F8F5EC] pl-1">
              {q.text}
            </div>

            {q.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-1 pt-1">
                {q.options.map((opt, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-[#AEB9D1] bg-[#0A1128]/70 px-3 py-1.5 rounded border border-[#1E335E]/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="text-[11px] text-[#64748B] italic pt-1 pl-1 border-t border-[#1E335E]/30">
              <span className="text-[#AEB9D1] font-semibold">Analytical Rationale:</span> {q.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
