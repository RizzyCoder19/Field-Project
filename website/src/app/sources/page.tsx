"use client";

import React from "react";
import Link from "next/link";
import { 
  BookOpen, Database, FileText, ArrowRight, ExternalLink, 
  Download, CheckCircle2, ShieldCheck, Code, FolderArchive 
} from "lucide-react";
import ChapterFooter from "@/components/ChapterFooter";
import ConnectedEvidenceHeader from "@/components/ConnectedEvidenceHeader";

export default function SourcesPage() {
  const governmentSources = [
    {
      title: "Weekly Outbreak Surveillance Bulletins (Maharashtra)",
      author: "National Centre for Disease Control (NCDC) & Integrated Disease Surveillance Programme (IDSP)",
      period: "2022 W01 – 2026 W32",
      publisher: "Directorate General of Health Services, Ministry of Health & Family Welfare, Government of India",
      notes: "Primary analytical dataset. 237 weekly surveillance PDF bulletins covering reported outbreak clusters, cases, and deaths across 36 districts of Maharashtra."
    },
    {
      title: "Integrated Disease Surveillance Programme (IDSP) Operational Manual",
      author: "National Centre for Disease Control (NCDC)",
      period: "Standard Surveillance Guidelines",
      publisher: "Ministry of Health & Family Welfare, New Delhi",
      notes: "Official protocols defining Form S (syndromic), Form P (presumptive), Form L (laboratory confirmed), and outbreak notification thresholds."
    },
    {
      title: "Maharashtra State Health System Guidelines & District Health Profiles",
      author: "Public Health Department, Government of Maharashtra",
      period: "2022–2025 Administrative Reports",
      publisher: "State Health Society, Mumbai, Maharashtra",
      notes: "Administrative boundaries, municipal corporation hospital hierarchies, and primary healthcare facility classifications."
    }
  ];

  const supportingLiterature = [
    {
      citation: "Kendall, M. G., & Babington Smith, B. (1939). The problem of m rankings. The Annals of Mathematical Statistics, 10(3), 275-287.",
      topic: "Non-parametric coefficient of concordance (Kendall's W) methodology for testing inter-annual rank agreement across four observation years."
    },
    {
      citation: "Bhatt, S., Gething, P. W., Brady, O. J., et al. (2013). The global distribution and burden of dengue. Nature, 496(7446), 504-507.",
      topic: "Vector-borne seasonal dynamics and post-monsoon Aedes mosquito breeding ecology in tropical urban and peri-urban environments."
    },
    {
      citation: "Gubler, D. J. (2002). Epidemic dengue/dengue hemorrhagic fever as a public health, social and economic problem in the 21st century. Trends in Microbiology, 10(2), 100-103.",
      topic: "Domestic artificial container storage and seasonal amplification of arboviral transmission."
    },
    {
      citation: "Curriero, F. C., Patz, J. A., Rose, J. B., & Lele, S. (2001). The association between extreme precipitation and waterborne disease outbreaks. American Journal of Public Health, 91(8), 1194-1199.",
      topic: "Early precipitation surges and cross-contamination of potable drinking water distribution systems."
    }
  ];

  const academicFramework = [
    { label: "Institutional Affiliation", value: "RP Institute, Affiliated with the University of Mumbai" },
    { label: "Degree & Curriculum", value: "B.Sc. Data Science · Semester III Field Project (Course Code: USDS306)" },
    { label: "Academic Session", value: "Academic Year 2026–2027" },
    { label: "Candidate", value: "Khan Umar · Semester III" },
    { label: "Surveillance Baseline", value: "2022–2025 (4 Calendar Years) + 2026 W01–W32 Partial Monitor" },
    { label: "Primary Field Site", value: "Urban Health Post, Nallasopara West, Palghar District (02 Oct 2026)" },
  ];

  return (
    <div className="w-full bg-[#070A0F] text-[#F0DECE] min-h-screen">
      <ConnectedEvidenceHeader currentActNumber={11} />

      {/* 1. VISUAL HEADER: SHORT AND CONCISE */}
      <section className="border-b border-[#F0DECE]/15 bg-gradient-to-b from-[#070A0F] to-[#0B0F15] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#BAC0B8] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#8B1414] ring-1 ring-[#F0DECE]/40 animate-pulse" />
            <span>ACT 11 / ARCHIVE · SOURCES & AUDIT TRAIL</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F0DECE] leading-[1.12]">
            Sources & Auditable Archive
          </h1>

          <p className="text-base sm:text-lg text-[#BAC0B8] max-w-3xl leading-relaxed pt-1">
            Official government bulletins, epidemiological literature, open-source repository, and full printable academic report.
          </p>
        </div>
      </section>

      {/* 2. EXPORT REPORT & GITHUB ACTIONS BANNER */}
      <section className="border-b border-white/[0.08] bg-[#0B0F15] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <a
            href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
            download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
            className="p-6 bg-[#0E141D] hover:bg-[#180505] border border-[#8B1414]/50 hover:border-[#8B1414] rounded-xs transition-all flex items-center justify-between group shadow-lg cursor-pointer"
          >
            <div className="space-y-1.5">
              <span className="text-[#8B1414] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>Export Formal Academic Report</span>
              </span>
              <div className="font-serif text-lg font-bold text-[#F0DECE]">
                Printable PDF Report View
              </div>
              <p className="text-[#BAC0B8] text-[11px]">
                Clean, standardized institutional report view for submission and review.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#8B1414] transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="https://github.com/RizzyCoder19/Field-Project/tree/master"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-[#0E141D] hover:bg-[#180505] border border-white/[0.12] hover:border-white/[0.25] rounded-xs transition-all flex items-center justify-between group shadow-lg cursor-pointer"
          >
            <div className="space-y-1.5">
              <span className="text-[#F0DECE] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Code className="w-4 h-4 text-[#8B1414]" />
                <span>Source Code & Datasets</span>
              </span>
              <div className="font-serif text-lg font-bold text-[#F0DECE]">
                GitHub Repository
              </div>
              <p className="text-[#BAC0B8] text-[11px]">
                Inspect Python processing scripts, clean CSV archives, and Next.js frontend code.
              </p>
            </div>
            <ExternalLink className="w-5 h-5 text-[#BAC0B8] transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>

      {/* 3. PRIMARY GOVERNMENT SOURCES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
        <div className="space-y-2 border-b border-white/[0.08] pb-4">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8B1414] font-bold">
            Primary Government Provenance
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#F0DECE]">
            Official Surveillance Data Bulletins
          </h2>
        </div>

        <div className="space-y-4">
          {governmentSources.map((src, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#0B0F15] border border-white/[0.08] rounded-xs space-y-2 shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#8B1414] font-bold uppercase">PRIMARY SOURCE 0{idx + 1}</span>
                <span className="text-[#BAC0B8]">{src.period}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F0DECE]">
                {src.title}
              </h3>
              <p className="text-xs font-mono text-[#BAC0B8]">
                Author: {src.author} · Publisher: {src.publisher}
              </p>
              <p className="text-sm text-[#F0DECE]/90 leading-relaxed pt-1">
                {src.notes}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SUPPORTING ACADEMIC LITERATURE */}
      <section className="border-t border-white/[0.08] bg-[#070A0F] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="space-y-2 border-b border-white/[0.08] pb-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8B1414] font-bold">
              Epidemiological Literature
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#F0DECE]">
              Supporting Academic Citations
            </h2>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {supportingLiterature.map((lit, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#0B0F15] border border-white/[0.08] rounded-xs space-y-1.5"
              >
                <div className="text-[#8B1414] font-bold uppercase">Citation 0{idx + 1}</div>
                <p className="text-[#F0DECE] leading-relaxed font-sans text-sm font-medium">
                  {lit.citation}
                </p>
                <p className="text-[#BAC0B8] text-xs pt-1">
                  Relevance: {lit.topic}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ACADEMIC CREDENTIAL FRAMEWORK */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
        <div className="space-y-2 border-b border-white/[0.08] pb-4">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8B1414] font-bold">
            Academic Context
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#F0DECE]">
            Institutional Metadata & Governance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          {academicFramework.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#0B0F15] border border-white/[0.08] rounded-xs space-y-1"
            >
              <span className="text-[#BAC0B8] uppercase text-[10px]">{item.label}</span>
              <div className="text-[#F0DECE] font-semibold text-sm">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CHAPTER CONCLUDING TAKEAWAY */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-6 bg-[#0B0F15] border border-[#8B1414]/50 rounded-xs space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8B1414] font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#8B1414]" />
            <span className="text-[#F0DECE]">Archival Integrity</span>
          </div>
          <p className="font-serif text-lg font-bold text-[#F0DECE]">
            Every statistic, district observation, and test is auditable and open-source.
          </p>
          <p className="text-sm text-[#BAC0B8] leading-relaxed font-normal">
            By anchoring the research in 237 weekly NCDC bulletins, verifiable hospital documentation in Palghar, and standard non-parametric test protocols, the research provides a fully reproducible foundation for seasonal disease surveillance in Maharashtra.
          </p>
        </div>
      </section>

      {/* 7. NAVIGATION FOOTER */}
      <ChapterFooter currentChapterNumber={11} />
    </div>
  );
}
