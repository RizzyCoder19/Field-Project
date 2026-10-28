"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, ArrowRight, ShieldCheck, FileText, 
  ExternalLink, Layers, Award, Sparkles, AlertCircle
} from "lucide-react";
import ChapterFooter from "@/components/ChapterFooter";
import ConnectedEvidenceHeader from "@/components/ConnectedEvidenceHeader";

interface SynthesisNode {
  id: string;
  num: string;
  evidenceTitle: string;
  evidenceData: string;
  evidenceCategory: string;
  color: string;
  certainty: "High (Statistically Proven)" | "Strong (Empirically Documented)" | "Targeted (Spatial Cluster)" | "Critical (Sensitivity Confirmed)" | "Operational (Fieldwork)";
  actionTitle: string;
  actionTiming: string;
  actionDetails: string;
}

const SYNTHESIS_NODES: SynthesisNode[] = [
  {
    id: "add",
    num: "01",
    evidenceTitle: "ADD July Monsoon Peak (W = 0.530, p = 0.016)",
    evidenceData: "144 outbreak records, 5,660 cases, 33 districts. The ONLY disease group with statistically significant annual repeating rank order.",
    evidenceCategory: "Temporal Stability",
    color: "#10B981",
    certainty: "High (Statistically Proven)",
    actionTitle: "Pre-Monsoon Pipeline Superchlorination & Reservoir Flushing",
    actionTiming: "Annual Target: May 15 – June 15",
    actionDetails: "Because the ADD wave arrives with rigid annual repeatability during July rains across 33 districts, municipal water engineering must complete pipeline repairs and pipeline pressurization before monsoon onset rather than reacting after hospital admissions spike.",
  },
  {
    id: "dengue",
    num: "02",
    evidenceTitle: "Dengue October Surge + Household Water Drums",
    evidenceData: "153 outbreak records, 4,500 cases. Fieldwork in Palghar proves intermittent tap water forces 200L domestic plastic drum storage.",
    evidenceCategory: "Temporal & Fieldwork",
    color: "#38BDF8",
    certainty: "Strong (Empirically Documented)",
    actionTitle: "Targeted Peri-Domestic Container Abatement",
    actionTiming: "Annual Target: August 15 – September 30",
    actionDetails: "Vector intervention must not wait for October hospital fevers. Municipal health teams and ASHAs should conduct domestic water container inspections and larvicidal treatment in August, eliminating mosquito pupae before the post-monsoon emergence wave.",
  },
  {
    id: "malaria",
    num: "03",
    evidenceTitle: "Eastern Forest Malaria Cluster (61.4% of Events)",
    evidenceData: "Gadchiroli (29 events) & Chandrapur (14 events) capture 43 of 70 statewide malaria records (61.4%).",
    evidenceCategory: "Spatial Concentration",
    color: "#F59E0B",
    certainty: "Targeted (Spatial Cluster)",
    actionTitle: "Spatial Reallocation of Diagnostic & Vector Supplies",
    actionTiming: "Annual Target: June 01 – July 15",
    actionDetails: "Statewide uniform distribution of malaria rapid test kits and long-lasting insecticidal nets (LLINs) is inefficient. Resources should be concentrated heavily into Gadchiroli and Chandrapur forest PHCs prior to July monsoon river stagnation.",
  },
  {
    id: "foodPoisoning",
    num: "04",
    evidenceTitle: "Food Poisoning Outlier Events (3 Events = 1,615 Cases)",
    evidenceData: "February apparent peak collapses from 2,162 down to 547 cases when three banquet clusters are isolated in sensitivity testing.",
    evidenceCategory: "Analytical Sensitivity",
    color: "#EF4444",
    certainty: "Critical (Sensitivity Confirmed)",
    actionTitle: "Catered Mass-Banquet Food Safety Protocols",
    actionTiming: "Annual Target: Peak Wedding & Festival Months (Feb & May)",
    actionDetails: "Food poisoning surges are driven by mass social banquets, not continuous environmental contagion. Local health authorities should enforce temperature standards for catered dairy and bulk cooking at large rural and peri-urban celebrations.",
  },
  {
    id: "systems",
    num: "05",
    evidenceTitle: "Threshold Divergence Between Clinics & IDSP Bulletins",
    evidenceData: "Palghar UHP logs daily fevers on Form P/L, but state bulletins only aggregate formally declared outbreak investigations.",
    evidenceCategory: "Operational Systems",
    color: "#5FB0A8",
    certainty: "Operational (Fieldwork)",
    actionTitle: "Syndromic Digital Threshold Triggers",
    actionTiming: "Continuous Year-Round System",
    actionDetails: "Transition primary health posts from manual paper register tallies to mobile digital syndromic logging, automatically alerting district epidemiologists when OPD fever consultations cross local 3-standard-deviation baseline thresholds.",
  },
];

export default function FindingsPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("add");

  const activeNode = SYNTHESIS_NODES.find(n => n.id === selectedNodeId) || SYNTHESIS_NODES[0];

  return (
    <div className="w-full bg-[#06080F] text-[#F8FAFC] min-h-screen">
      <ConnectedEvidenceHeader currentActNumber={10} />

      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-[#F8FAFC]/15 bg-gradient-to-b from-[#030407] to-[#06080F] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5FB0A8] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#5FB0A8]" />
            <span>EXHIBIT 10 · SYNTHESIS & ACTION</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-[1.12]">
            Synthesis of Evidence & Recommendations
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed pt-1">
            Connecting temporal cycles, spatial clustering, stability analysis, and fieldwork into actionable public health intelligence.
          </p>
        </div>
      </section>

      {/* 2. DOMINANT EVIDENCE-TO-ACTION VISUAL SYNTHESIS MATRIX (80% VIEWPORT) */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        {/* Node Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F8FAFC]/12 pb-3">
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
            Explore 5 Evidence-to-Action Pathways:
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {SYNTHESIS_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm transition-all border flex items-center gap-2"
                  style={{
                    borderColor: isSelected ? node.color : "rgba(212, 175, 55, 0.18)",
                    backgroundColor: isSelected ? `${node.color}25` : "#06080F",
                    color: isSelected ? node.color : "rgba(248, 250, 252, 0.7)",
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: node.color }} />
                  <span>Action {node.num}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Visual Synthesis Display */}
        <div className="bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm p-6 sm:p-8 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: The Evidence Stream (6 cols) */}
            <div className="lg:col-span-6 p-6 bg-[#06080F] border rounded-sm flex flex-col justify-between space-y-4" style={{ borderColor: `${activeNode.color}40` }}>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider" style={{ color: activeNode.color }}>
                    THE EMPIRICAL EVIDENCE
                  </span>
                  <span className="text-[10px] text-[#94A3B8]">{activeNode.evidenceCategory}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#F8FAFC]">
                  {activeNode.evidenceTitle}
                </h3>

                <p className="text-sm font-mono text-[#F8FAFC]/90 leading-relaxed pt-1">
                  {activeNode.evidenceData}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#94A3B8]">Evidence Certainty:</span>
                <span className="font-bold text-[#F8FAFC]" style={{ color: activeNode.color }}>
                  {activeNode.certainty}
                </span>
              </div>
            </div>

            {/* Right: The Recommended Public Health Action (6 cols) */}
            <div className="lg:col-span-6 p-6 bg-[#06080F] border border-[#5FB0A8]/30 rounded-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#5FB0A8] uppercase tracking-wider">
                    TARGETED INTERVENTION
                  </span>
                  <span className="text-[10px] text-[#10B981] font-bold">{activeNode.actionTiming}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#F8FAFC]">
                  {activeNode.actionTitle}
                </h3>

                <p className="text-sm text-[#94A3B8] leading-relaxed pt-1">
                  {activeNode.actionDetails}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between text-xs font-mono text-[#5FB0A8]">
                <span>Operational Priority #{activeNode.num}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Evidence-to-Action Strip Below */}
          <div className="pt-4 border-t border-[#F8FAFC]/10 grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-[10px]">
            {SYNTHESIS_NODES.map((n) => (
              <button
                key={n.id}
                onClick={() => setSelectedNodeId(n.id)}
                className={`p-2.5 rounded-sm border text-left transition-all ${
                  selectedNodeId === n.id
                    ? "bg-[#06080F] border-[#5FB0A8] text-[#F8FAFC]"
                    : "bg-[#06080F]/40 border-[#F8FAFC]/10 text-[#94A3B8]/70 hover:text-[#F8FAFC]"
                }`}
              >
                <div className="font-bold uppercase" style={{ color: n.color }}>#{n.num} · {n.id.toUpperCase()}</div>
                <div className="text-[9px] text-[#94A3B8] truncate mt-0.5">{n.actionTitle}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. SCIENTIFIC RESTRAINT & LIMITATIONS OF EVIDENCE */}
        <div className="p-6 bg-[#0B111E] border border-[#F8FAFC]/12 rounded-sm space-y-3 font-mono text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2 text-[#5FB0A8] font-bold uppercase text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>Research Restraint & Boundaries of Interpretation</span>
          </div>
          <p className="leading-relaxed">
            Public health decisions must respect what observational surveillance data can and cannot prove:
          </p>
          <ul className="space-y-1.5 leading-relaxed pl-2">
            <li>• <strong className="text-[#F8FAFC]">Correlation vs Causation:</strong> Seasonal outbreak peaks reflect environmental and behavioral concentration; they do not prove weather alone caused the disease.</li>
            <li>• <strong className="text-[#F8FAFC]">Reporting Sensitivity:</strong> Absence of reported outbreaks in a district indicates absence of investigated notifications, not guaranteed zero biological cases.</li>
            <li>• <strong className="text-[#F8FAFC]">Outlier Sensitivity:</strong> Removing large banquet events for sensitivity analysis tests mathematical stability; it does not imply the original events were errors.</li>
          </ul>
        </div>

        {/* 4. DIRECT ACADEMIC REPORT ACCESS */}
        <div className="p-6 bg-gradient-to-r from-[#0B111E] to-[#1A2234] border border-[#5FB0A8]/40 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#5FB0A8] font-bold tracking-wider">
              Comprehensive Academic Documentation
            </span>
            <h4 className="font-serif text-xl font-bold text-[#F8FAFC]">
              Looking for the Complete Written Research Report?
            </h4>
            <p className="text-xs text-[#94A3B8] max-w-xl">
              Access the complete academic paper with extended literature review, full ANOVA & Kendall tables, audit trail, and formal citations.
            </p>
          </div>

          <a
            href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
            download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
            className="px-5 py-3 bg-[#5FB0A8] hover:bg-[#38BDF8] text-[#06080F] font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-lg flex items-center justify-center gap-2 shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span>Open Academic Report (PDF)</span>
          </a>
        </div>
      </section>

      {/* 5. CHAPTER NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={10} />
    </div>
  );
}
