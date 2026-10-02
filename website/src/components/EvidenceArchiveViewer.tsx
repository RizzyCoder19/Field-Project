"use client";

import React, { useState } from "react";
import { Database, FileText, CheckCircle2, Shield, Search, ExternalLink, X, Compass, AlertCircle } from "lucide-react";

interface EvidenceItem {
  id: string;
  code: string;
  category: "NCDC/IDSP" | "Analytical Dataset" | "Fieldwork Instrument" | "Reference Material" | "Future Primary Evidence";
  title: string;
  type: string;
  datePeriod: string;
  status: string;
  provenance: string;
  description: string;
  hashOrLocation: string;
  usedIn: string;
}

const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: "EVD-01",
    code: "NCDC-ARCHIVE-237",
    category: "NCDC/IDSP",
    title: "National Weekly Outbreak Surveillance PDF Bulletins",
    type: "Government Administrative Bulletins",
    datePeriod: "2022–2026 W32",
    status: "Archived & Verified",
    provenance: "NCDC / IDSP National Portal (idsp.nic.in)",
    description: "237 weekly epidemiological outbreak reports published by the Directorate General of Health Services, MoHFW, Government of India.",
    hashOrLocation: "data_pipeline/phase1_download/ncdc_bulletins_archive/",
    usedIn: "Source baseline for all 809 raw outbreak rows extracted for Maharashtra."
  },
  {
    id: "EVD-02",
    code: "DATA-MASTER-539",
    category: "Analytical Dataset",
    title: "Harmonized Primary Cohort Analytical Dataset",
    type: "Structured Tabular Data (CSV)",
    datePeriod: "2022–2025 Completed Years",
    status: "Frozen & Verified (Phase 5E)",
    provenance: "Programmatic Extraction & Additive Cleaning Pipeline",
    description: "539 outbreak investigation records encompassing 21,955 reported cases and 266 deaths across Dengue, ADD, Malaria, Food Poisoning, and Chikungunya.",
    hashOrLocation: "data_pipeline/master/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv",
    usedIn: "Phases 5A through 5E mathematical models, Kendall's W tests, and presentation slides."
  },
  {
    id: "EVD-03",
    code: "FW-INST-QUEST",
    category: "Fieldwork Instrument",
    title: "50-Question Master Community Fieldwork Questionnaire",
    type: "Standardized Field Survey Protocol",
    datePeriod: "Prepared for Academic Deployment (2026–27)",
    status: "Planned Instrument · Not Yet Collected",
    provenance: "Field Project Document FIELD-DOC-01",
    description: "Multi-module structured survey tool covering household demographics, seasonal illness recall, water supply disruptions, and private healthcare pathways.",
    hashOrLocation: "field_work/01_FIELD_WORK_QUESTIONNAIRE_FULL.md",
    usedIn: "Upcoming community ground transects across stratified Maharashtra settlements."
  },
  {
    id: "EVD-04",
    code: "FW-INST-INTERVIEW",
    category: "Fieldwork Instrument",
    title: "Key Informant Interview Guides (4 Stakeholders)",
    type: "Semi-Structured Qualitative Interview Schedule",
    datePeriod: "Prepared for Academic Deployment (2026–27)",
    status: "Planned Instrument · Not Yet Collected",
    provenance: "Field Project Document FIELD-DOC-03",
    description: "Qualitative schedules tailored for Community Pharmacists, Private GPs, ASHA health workers, and Ward Sanitary Inspectors.",
    hashOrLocation: "field_work/03_FIELD_INTERVIEW_GUIDE.md",
    usedIn: "Frontline reporting friction documentation and OTC proxy signal analysis."
  },
  {
    id: "EVD-05",
    code: "FW-INST-OBSERVE",
    category: "Fieldwork Instrument",
    title: "Environmental Observation Transect Checklist",
    type: "Objective Physical Habitat Rubric",
    datePeriod: "Standardized Protocol (2026–27)",
    status: "Planned Instrument · Not Yet Collected",
    provenance: "Field Project Document FIELD-DOC-04",
    description: "Standardized rubric for evaluating stormwater siltation, open container breeding, potable pipe immersion, and municipal abatement markings.",
    hashOrLocation: "field_work/04_FIELD_OBSERVATION_CHECKLIST.md",
    usedIn: "Public physical environmental audits during seasonal transition windows."
  },
  {
    id: "EVD-06",
    code: "REF-GOV-IDSP-MANUAL",
    category: "Reference Material",
    title: "IDSP District Surveillance Officer Operational Manual",
    type: "Government Operational Guideline",
    datePeriod: "2020 (Updated Edition)",
    status: "Secondary Reference Benchmark",
    provenance: "Ministry of Health & Family Welfare, Govt of India",
    description: "Defines formal outbreak notification thresholds, Rapid Response Team (RRT) deployment criteria, and weekly P, L, and S form transmission flows.",
    hashOrLocation: "field_work/08_REFERENCE_FIELD_MATERIAL.md (Ref-01)",
    usedIn: "Contextual benchmark defining the institutional pathway from clinic fever to official report."
  },
  {
    id: "EVD-07",
    code: "REF-GOV-NVBDCP",
    category: "Reference Material",
    title: "Comprehensive Guidelines for Vector Management & Outbreak Preparedness",
    type: "Technical Policy Guideline",
    datePeriod: "2021",
    status: "Secondary Reference Benchmark",
    provenance: "National Vector Borne Disease Control Programme (NVBDCP)",
    description: "Outlines biological transmission cycles of Aedes aegypti, container larval indices, and timing of pre-monsoon source reduction drives.",
    hashOrLocation: "field_work/08_REFERENCE_FIELD_MATERIAL.md (Ref-02)",
    usedIn: "Biological benchmark explaining the June–October Dengue calendar concentration."
  },
  {
    id: "EVD-08",
    code: "EVD-PRIMARY-FIELD",
    category: "Future Primary Evidence",
    title: "Primary Field Survey Transcripts & Audits",
    type: "Empirical Primary Field Data",
    datePeriod: "Post-Deployment Phase",
    status: "0 Collected (Awaiting Field Execution)",
    provenance: "Physical Fieldwork Register (FIELD-DOC-07)",
    description: "Reserved slot for actual completed participant questionnaires and transcribed interviews upon authorized execution.",
    hashOrLocation: "field_work/07_FIELD_EVIDENCE_REGISTER.csv",
    usedIn: "Future qualitative synthesis; currently maintaining 100% academic integrity with 0 fabricated rows."
  }
];

export default function EvidenceArchiveViewer() {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<EvidenceItem | null>(null);

  const filteredItems = EVIDENCE_ITEMS.filter(item => {
    const matchesCategory = filter === "All" || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.code.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case "NCDC/IDSP": return "bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30";
      case "Analytical Dataset": return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30";
      case "Fieldwork Instrument": return "bg-[#D4AF37]/10 text-[#F3E5AB] border-[#D4AF37]/30";
      case "Reference Material": return "bg-[#A78BFA]/10 text-[#A78BFA] border-[#A78BFA]/30";
      case "Future Primary Evidence": return "bg-[#EF4444]/10 text-[#F87171] border-[#EF4444]/30";
      default: return "bg-[#101C38] text-[#AEB9D1] border-[#1E335E]";
    }
  };

  return (
    <div className="w-full bg-[#080D1F] border border-[#1E335E] rounded-xl shadow-2xl p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#1E335E]/60 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#D4AF37]">
            <Database className="w-3.5 h-3.5" />
            <span>Digital Evidence Register · Comprehensive Provenance Catalog</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#F8F5EC] mt-1">
            Research Evidence & Material Archive
          </h3>
          <p className="text-xs text-[#AEB9D1]">
            Transparently indexing government surveillance archives, derived analytical datasets, and planned fieldwork instruments.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search archive..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded bg-[#0D162E] border border-[#1E335E] text-xs text-white placeholder-[#64748B] focus:border-[#D4AF37] focus:outline-none w-56 font-mono"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {["All", "NCDC/IDSP", "Analytical Dataset", "Fieldwork Instrument", "Reference Material", "Future Primary Evidence"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded text-xs font-mono transition-all border ${
              filter === cat
                ? "bg-[#D4AF37] text-[#0A1128] border-[#D4AF37] font-bold shadow-md"
                : "bg-[#0D162E] text-[#AEB9D1] border-[#1E335E]/60 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-[#0D162E] border border-[#1E335E] hover:border-[#D4AF37]/50 rounded-lg p-4 space-y-3 cursor-pointer transition-all hover:bg-[#12203D]"
          >
            <div className="flex justify-between items-start gap-2">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getCategoryBadgeColor(item.category)}`}>
                {item.category}
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">{item.code}</span>
            </div>

            <div className="font-serif text-base font-bold text-[#F8F5EC]">
              {item.title}
            </div>

            <p className="text-xs text-[#AEB9D1] line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            <div className="flex justify-between items-center text-[11px] font-mono text-[#64748B] pt-2 border-t border-[#1E335E]/40">
              <span className="text-[#F3E5AB]">{item.status}</span>
              <span className="text-[#38BDF8] flex items-center space-x-1">
                <span>View Provenance</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Provenance Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-[#0A1128]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D162E] border border-[#D4AF37] rounded-xl max-w-2xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getCategoryBadgeColor(selectedItem.category)}`}>
                  {selectedItem.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1.5">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded text-[#AEB9D1] hover:text-white hover:bg-[#16274D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-[#AEB9D1]">
              <div className="bg-[#0A1128] p-3 rounded border border-[#1E335E] space-y-1 font-mono text-[11px]">
                <div><span className="text-[#D4AF37]">Document Code:</span> {selectedItem.code}</div>
                <div><span className="text-[#D4AF37]">Type:</span> {selectedItem.type}</div>
                <div><span className="text-[#D4AF37]">Period:</span> {selectedItem.datePeriod}</div>
                <div><span className="text-[#D4AF37]">Status:</span> {selectedItem.status}</div>
                <div><span className="text-[#D4AF37]">Repository Path:</span> {selectedItem.hashOrLocation}</div>
              </div>

              <div>
                <span className="text-white font-bold block mb-1">Analytical Role:</span>
                <p className="leading-relaxed">{selectedItem.usedIn}</p>
              </div>

              <div>
                <span className="text-white font-bold block mb-1">Full Description:</span>
                <p className="leading-relaxed">{selectedItem.description}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1E335E] flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-1.5 rounded bg-[#101C38] text-white text-xs font-mono border border-[#1E335E] hover:border-[#D4AF37]"
              >
                Close Provenance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
