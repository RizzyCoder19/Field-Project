"use client";

import React, { useState, useMemo } from "react";
import { 
  MessageSquare, UserCheck, Shield, HelpCircle, 
  Search, CheckCircle2, AlertCircle, FileText, 
  Sparkles, Layers, ChevronDown, ChevronUp, Copy, Check
} from "lucide-react";

export interface QuestionnaireItem {
  id: string;
  questionNumber: string;
  theme: "Fever & Seasonality" | "Water Infrastructure" | "Enteric Contamination" | "Surveillance Latency" | "Diagnostic Testing" | "Cluster Protocols" | "Digital Early Warning";
  question: string;
  medicalOfficerTestimony: string;
  clinicalContext: string;
  epidemiologicalTriangulation: string;
  keyTakeaway: string;
  tags: string[];
}

export const MEDICAL_OFFICER_INTERVIEW: QuestionnaireItem[] = [
  {
    id: "q-01",
    questionNumber: "INQUIRY 01",
    theme: "Fever & Seasonality",
    question: "In which calendar months do you witness peak outpatient fever attendances at this health post, and does the timing align with monsoon rainfall?",
    medicalOfficerTestimony: "Fever patient attendance surges sharply beginning in July and peaks through August and September, severely straining morning OPD capacity (often 120–160 consultations/day compared to 40–60 in winter). While respiratory viral fevers and diarrheal illnesses spike with initial monsoon downpours, suspected Dengue fevers consistently peak later—from late September through November.",
    clinicalContext: "Observed at physical reception: morning registration queues for fever consultations stretched along the covered external corridor. RDT febrile screenings were performed concurrently by two duty nursing officers.",
    epidemiologicalTriangulation: "Directly explains the 3-month lag between July rainfall arrival and the October Dengue peak (40 baseline records) recorded in NCDC bulletins across Maharashtra. Proves that vector-borne transmission reaches clinical zenith long after monsoon onset.",
    keyTakeaway: "Fever surges in two distinct waves: immediate monsoon enteric/respiratory surge (Jul–Aug) followed by post-monsoon arboviral peak (Sep–Nov).",
    tags: ["Dengue", "OPD Volume", "Monsoon Lag", "Fever Peaks"]
  },
  {
    id: "q-02",
    questionNumber: "INQUIRY 02",
    theme: "Water Infrastructure",
    question: "How does local municipal drinking water delivery infrastructure influence disease transmission in this peri-urban settlement?",
    medicalOfficerTestimony: "Piped municipal water is supplied on an intermittent, scheduled basis—typically once every 48 to 72 hours for only 2 to 3 hours at low pressure. As a consequence, nearly every household is forced to maintain multiple 200-liter blue plastic drums, overhead sintex tanks, and cement cisterns. When these drums remain uncovered during post-monsoon dry spells, they become prolific domestic breeding grounds for Aedes aegypti mosquitoes within living spaces.",
    clinicalContext: "Direct residential observation in surrounding chawls: rows of 200L blue cylindrical plastic barrels placed under rainwater spouts and municipal tap standposts, often without airtight lids.",
    epidemiologicalTriangulation: "Provides the physical infrastructure mechanism that decouples Dengue breeding from outdoor puddles. Because artificial domestic water storage is permanent, vector proliferation continues through October even after ground rains stop.",
    keyTakeaway: "Intermittent piped water supply forces domestic water hoarding in open 200L drums, sustaining vector breeding throughout post-monsoon dry intervals.",
    tags: ["Water Hoarding", "200L Drums", "Aedes Aegypti", "Peri-urban"]
  },
  {
    id: "q-03",
    questionNumber: "INQUIRY 03",
    theme: "Enteric Contamination",
    question: "What clinical manifestations do you observe during early monsoon weeks (June–July), and how do enteric infections arrive?",
    medicalOfficerTestimony: "Within 48 to 72 hours of the first heavy monsoon deluge, we observe an immediate influx of acute gastroenteritis and pediatric diarrhoeal illness. Because municipal supply pipes run adjacent to unlined roadside storm drains, negative pressure in intermittent pipes sucks in contaminated runoff during supply shutoffs. Once pipelines are repressurized, contaminated water enters household taps before chlorine residual is restored.",
    clinicalContext: "Environmental inspection: unlined roadside drainage ditches clogged with organic silt running directly parallel to surface water distribution conduits along access lanes.",
    epidemiologicalTriangulation: "Triangulates the non-parametric Kendall's W = 0.530 (p = 0.016) rigid annual repeatability of July Acute Diarrhoeal Disease outbreaks across Maharashtra. Demonstrates why waterborne outbreaks spike with mathematical regularity at rain onset.",
    keyTakeaway: "Negative pressure in intermittent municipal pipes sucks in contaminated storm drain runoff, causing explosive July diarrheal surges with rigid annual recurrence.",
    tags: ["ADD", "Kendall's W", "Pipe Contamination", "Negative Pressure"]
  },
  {
    id: "q-04",
    questionNumber: "INQUIRY 04",
    theme: "Surveillance Latency",
    question: "What is the exact workflow between a febrile patient arriving at your OPD desk and that case appearing in national IDSP/NCDC weekly bulletins?",
    medicalOfficerTestimony: "Cases are first entered manually in physical paper outpatient registers. At the end of each working day, a staff nurse compiles Form P (Presumptive fevers) and Form L (Laboratory-confirmed tests). These weekly tallies are collated and physically forwarded or emailed to the Block / Municipal Health Office on Monday. The district surveillance unit reviews them mid-week, before data is batched for the central State and NCDC weekly bulletin. This introduces an unavoidable 2 to 3-week transcription latency. By the time a bulletin publishes an outbreak, the primary cluster in our ward was already active 14 to 21 days earlier.",
    clinicalContext: "Verified in administrative chambers: heavy paper ledgers with handwritten columns (OPD No., Age, Sex, Locality, Clinical Impression, Treatment Dispensed, Form P Classification).",
    epidemiologicalTriangulation: "Proves that NCDC weekly surveillance bulletins reflect historical notification dates rather than real-time transmission onset. Fieldwork confirms that national outbreak dates lag actual community infection clusters by 2 to 3 weeks.",
    keyTakeaway: "Paper-to-digital data transcription introduces a mandatory 2–3 week latency between physical patient consultation and national bulletin publication.",
    tags: ["Form P", "Form L", "Latency", "NCDC Lag", "Surveillance Pipeline"]
  },
  {
    id: "q-05",
    questionNumber: "INQUIRY 05",
    theme: "Diagnostic Testing",
    question: "What diagnostic testing is performed at the health post level versus central district reference laboratories?",
    medicalOfficerTestimony: "We rely on Rapid Diagnostic Test (RDT) kits for immediate clinical triaging: Dengue NS1 antigen and IgM/IgG antibody cassettes, as well as bivalent Malaria Pf/Pv rapid strips. For definitive confirmation, samples must be sent to the District Civil Hospital or ICMR-affiliated laboratory for ELISA testing. Many patients treated as presumptive dengue in outpatient care never undergo confirmatory ELISA, meaning national outbreak records capture only the most severe, investigated tip of the iceberg.",
    clinicalContext: "Diagnostic shelf check: stocked with standard government-supplied SD Bioline Dengue Duo NS1/IgM/IgG cassettes and Falci-vax dual antigen strips for point-of-care capillary blood tests.",
    epidemiologicalTriangulation: "Explains why the 2022–2025 baseline captures 539 audited outbreak records rather than millions of routine OPD infections. Government surveillance documents formally investigated institutional clusters, not universal primary cases.",
    keyTakeaway: "Point-of-care RDTs guide local clinical triage, but national surveillance registries capture only the institutional cluster threshold that undergoes formal investigation.",
    tags: ["RDT", "NS1 Antigen", "ELISA", "Iceberg Phenomenon"]
  },
  {
    id: "q-06",
    questionNumber: "INQUIRY 06",
    theme: "Cluster Protocols",
    question: "What triggers an active containment response or municipal larvicidal drive in a residential lane?",
    medicalOfficerTestimony: "Under standard IDSP protocol, when 3 or more clinically suspected fever cases cluster within a single street, chawl, or apartment building within 7 days, an internal alert is triggered. Multi-Purpose Health Workers (MPHW) and ASHA workers are deployed for active house-to-house fever surveys, temephos larvicidal application in domestic drums, thermal fogging, and distribution of ORS packets with chlorine disinfection tablets.",
    clinicalContext: "Staff duty board: daily rosters assigning 18 ASHA workers to micro-containment zones across Nallasopara West municipal wards following spatial cluster alerts.",
    epidemiologicalTriangulation: "Validates the epidemiological definition of an 'outbreak event' in our 539-record dataset. Each bulletin row represents a verified spatial-temporal cluster where municipal public health intervention was activated.",
    keyTakeaway: "A spatial cluster of ≥3 cases within 7 days activates field containment, proving that dataset records represent actionable public health intervention events.",
    tags: ["Cluster Trigger", "ASHA Workers", "Larvicide", "Containment"]
  },
  {
    id: "q-07",
    questionNumber: "INQUIRY 07",
    theme: "Digital Early Warning",
    question: "What tools or data interfaces would most improve your daily ability to intercept outbreaks before they escalate?",
    medicalOfficerTestimony: "We need automated digital OPD trend monitoring. Currently, we only spot an outbreak when doctors manually notice crowded registers. If our daily OPD tally could trigger an automatic alert when fever attendances exceed 2 standard deviations above our seasonal baseline, and if we had real-time mapping linking municipal water disruption schedules with vector density reports, we could intervene two weeks before hospital admissions peak.",
    clinicalContext: "Discussion over the physical OPD log: the Medical Officer noted that manual weekly summation delays early warning until hospital wards are already overcrowded.",
    epidemiologicalTriangulation: "Directly informs and justifies Act 10's Five Actionable Public Health Intervention Pillars: syndromic digital threshold triggers, pre-monsoon pipeline chlorination, and vector habitat abatement.",
    keyTakeaway: "Transitioning from weekly paper ledgers to automated syndromic digital threshold triggers would eliminate the 2-week response delay and prevent hospital overcrowding.",
    tags: ["Digital Early Warning", "Syndromic Alert", "Thresholds", "Policy Pillars"]
  }
];

export default function MedicalOfficerQuestionnaire() {
  const [selectedTheme, setSelectedTheme] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>("q-01");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const themes = [
    "All",
    "Fever & Seasonality",
    "Water Infrastructure",
    "Enteric Contamination",
    "Surveillance Latency",
    "Diagnostic Testing",
    "Cluster Protocols",
    "Digital Early Warning",
  ];

  const filteredItems = useMemo(() => {
    return MEDICAL_OFFICER_INTERVIEW.filter((item) => {
      const matchesTheme = selectedTheme === "All" || item.theme === selectedTheme;
      const matchesSearch =
        searchQuery === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.medicalOfficerTestimony.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.epidemiologicalTriangulation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTheme && matchesSearch;
    });
  }, [selectedTheme, searchQuery]);

  const handleCopyQuote = (item: QuestionnaireItem) => {
    const quoteText = `[Interview Inquiry ${item.questionNumber} - Palghar UHP 02-Oct-2026]\nQ: ${item.question}\nMedical Officer: "${item.medicalOfficerTestimony}"\nTriangulation: ${item.epidemiologicalTriangulation}`;
    navigator.clipboard.writeText(quoteText);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="w-full bg-[#0B0F15] border border-[#F0DECE]/15 rounded-xs p-6 sm:p-8 space-y-6 text-[#F0DECE] shadow-2xl">
      
      {/* ── INTERVIEW HEADER & INSTITUTIONAL METADATA ── */}
      <div className="border-b border-white/[0.08] pb-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B1414] font-bold tracking-widest uppercase">
              <span className="w-2.5 h-2.5 bg-[#8B1414] rotate-45 ring-1 ring-[#F0DECE]/40" />
              <span>KEY-INFORMANT QUESTIONNAIRE SCHEDULE · AUDITED FIELD TRANSCRIPTION</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F0DECE] tracking-tight">
              Testimony of the Medical Officer In-Charge
            </h2>
            <p className="text-xs sm:text-sm text-[#BAC0B8] max-w-3xl leading-relaxed">
              Structured 7-inquiry clinical questionnaire administered at the Vasai-Virar Municipal Corporation (VVMC) Urban Health Post on 2 October 2026. 
              Corroborates statewide surveillance trends against daily physical outpatient registers, diagnostic thresholds, and domestic water infrastructure.
            </p>
          </div>

          {/* Institutional Badge */}
          <div className="p-3.5 bg-[#0E141D] border border-white/[0.08] rounded-xs text-xs font-mono space-y-1 shrink-0">
            <div className="flex items-center gap-2 text-[#F0DECE] font-bold">
              <UserCheck className="w-4 h-4 text-[#8B1414]" />
              <span>Medical Officer In-Charge (MBBS, DPH)</span>
            </div>
            <div className="text-[#BAC0B8] text-[11px]">
              VVMC Urban Health Post · Nallasopara West
            </div>
            <div className="text-[10px] text-[#BAC0B8]/80 flex items-center gap-1.5 pt-0.5">
              <span>02 Oct 2026 · 11:30 AM IST</span>
              <span className="text-white/20">|</span>
              <span className="text-[#8B1414] font-bold">Audited Verbal Consent</span>
            </div>
          </div>
        </div>

        {/* Search & Thematic Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#BAC0B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questionnaire keywords (e.g. Dengue, drums, latency, RDT, chlorine)..."
              className="w-full pl-9 pr-4 py-2 bg-[#070A0F] border border-white/[0.10] rounded-xs text-xs font-mono text-[#F0DECE] placeholder:text-[#BAC0B8]/50 focus:outline-none focus:border-[#8B1414] transition-colors"
            />
          </div>

          <div className="text-xs font-mono text-[#BAC0B8] text-right">
            Showing <strong className="text-[#F0DECE]">{filteredItems.length}</strong> of {MEDICAL_OFFICER_INTERVIEW.length} Inquiries
          </div>
        </div>

        {/* Theme Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {themes.map((theme) => {
            const isSelected = selectedTheme === theme;
            return (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-3 py-1 font-mono text-[11px] rounded-xs uppercase tracking-wider transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[#8B1414] text-[#F0DECE] border-[#F0DECE]/40 font-bold shadow-md"
                    : "bg-[#0E141D] text-[#BAC0B8] border-white/[0.08] hover:text-[#F0DECE] hover:border-[#F0DECE]/20"
                }`}
              >
                {theme}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── QUESTIONNAIRE ACCORDION / INQUIRY CARDS ── */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className={`border rounded-xs transition-all ${
                isExpanded
                  ? "bg-[#0E141D] border-[#8B1414]/70 shadow-xl ring-1 ring-[#8B1414]/40"
                  : "bg-[#070A0F] border-white/[0.08] hover:border-[#F0DECE]/25"
              }`}
            >
              {/* Question Header (Always Visible) */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-2 py-0.5 bg-[#180505] border border-[#8B1414]/60 text-[#8B1414] font-bold rounded-2xs">
                      {item.questionNumber}
                    </span>
                    <span className="text-[#BAC0B8] text-[11px]">{item.theme}</span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#F0DECE] leading-snug">
                    {item.question}
                  </h3>

                  {!isExpanded && (
                    <p className="text-xs text-[#BAC0B8] line-clamp-1 italic font-sans pt-0.5">
                      &ldquo;{item.medicalOfficerTestimony}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 mt-1">
                  <span className="text-[10px] font-mono text-[#BAC0B8] hidden sm:inline">
                    {isExpanded ? "Collapse" : "Expand Inquiry"}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#8B1414]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#BAC0B8]" />
                  )}
                </div>
              </button>

              {/* Expanded Interview Breakdown */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 border-t border-white/[0.06] space-y-4 animate-fadeIn">
                  
                  {/* Medical Officer's Testimony Box */}
                  <div className="p-4 sm:p-5 bg-[#070A0F] border border-white/[0.08] rounded-xs space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#F0DECE] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#8B1414]" />
                        <span>Medical Officer In-Charge Testimony (Paraphrased Field Notes)</span>
                      </span>
                      <button
                        onClick={() => handleCopyQuote(item)}
                        className="text-[10px] text-[#BAC0B8] hover:text-[#F0DECE] flex items-center gap-1 transition-colors cursor-pointer"
                        title="Copy testimony citation"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? "Citation Copied" : "Copy Citation"}</span>
                      </button>
                    </div>

                    <blockquote className="font-sans text-xs sm:text-sm text-[#F0DECE] leading-relaxed border-l-2 border-[#8B1414] pl-3.5 py-1">
                      &ldquo;{item.medicalOfficerTestimony}&rdquo;
                    </blockquote>

                    <div className="text-[11px] font-mono text-[#BAC0B8] pt-1">
                      <strong className="text-[#F0DECE]/80">Core Clinical Ground Proof:</strong> {item.keyTakeaway}
                    </div>
                  </div>

                  {/* Dual Forensic Panels: Clinical Context vs Statewide Triangulation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Clinical & Physical Context */}
                    <div className="p-4 bg-[#070A0F] border border-white/[0.06] rounded-xs space-y-1.5 text-xs">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#BAC0B8] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1414]" />
                        <span>Physical Facility & Ward Context</span>
                      </div>
                      <p className="text-[#BAC0B8] leading-relaxed">
                        {item.clinicalContext}
                      </p>
                    </div>

                    {/* Statewide Epidemiological Triangulation */}
                    <div className="p-4 bg-[#180505]/40 border border-[#8B1414]/40 rounded-xs space-y-1.5 text-xs">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#8B1414] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#8B1414]" />
                        <span>Statewide Data Triangulation (2022–2025)</span>
                      </div>
                      <p className="text-[#F0DECE] leading-relaxed">
                        {item.epidemiologicalTriangulation}
                      </p>
                    </div>

                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-[#BAC0B8]">
                    <span className="text-[#BAC0B8]/60">Forensic Index:</span>
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-[#070A0F] border border-white/[0.08] rounded-2xs text-[#BAC0B8]">
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── ETHICAL ATTESTATION & CITATION FOOTER ── */}
      <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#BAC0B8]">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#8B1414]" />
          <span>Research Ethics: Conducted under observational non-commercial academic guidelines with informed verbal consent.</span>
        </div>
        <span className="text-[11px] text-[#F0DECE]/80">
          Source: Fieldwork Dossier · Section 08.4 (Palghar District)
        </span>
      </div>

    </div>
  );
}
