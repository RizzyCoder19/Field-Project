"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Database, FileText, ArrowRight, ExternalLink } from "lucide-react";

export default function SourcesPage() {
  const governmentSources = [
    {
      title: "Weekly Outbreak Surveillance Reports (Maharashtra)",
      author: "National Centre for Disease Control (NCDC) & Integrated Disease Surveillance Programme (IDSP)",
      period: "2022 W01 – 2026 W32",
      publisher: "Directorate General of Health Services, Ministry of Health & Family Welfare, Government of India",
      notes: "Primary analytical source. 237 weekly surveillance PDF bulletins covering reported epidemic clusters, cases, and deaths across 36 districts."
    },
    {
      title: "National Health Mission (NHM) Maharashtra State Health Reports",
      author: "Public Health Department, Government of Maharashtra",
      period: "2022–2025 Annual Summaries",
      publisher: "State Health Society, Mumbai, Maharashtra",
      notes: "Contextual public health infrastructure, district healthcare facilities, and vector control operational guidelines."
    },
    {
      title: "IMD Gridded Rainfall & Surface Temperature Data (Maharashtra)",
      author: "India Meteorological Department (IMD)",
      period: "2022–2025 Seasonal Records",
      publisher: "Ministry of Earth Sciences, Government of India",
      notes: "Monthly precipitation and temperature baselines utilized for seasonal cross-correlation and lag analysis."
    }
  ];

  const supportingLiterature = [
    {
      citation: "Bhatt, S., Gething, P. W., Brady, O. J., et al. (2013). The global distribution and burden of dengue. Nature, 496(7446), 504-507.",
      topic: "Vector-borne seasonality and climatic drivers of Aedes mosquito breeding."
    },
    {
      citation: "Kendall, M. G., & Babington Smith, B. (1939). The problem of m rankings. The Annals of Mathematical Statistics, 10(3), 275-287.",
      topic: "Non-parametric coefficient of concordance (Kendall's W) methodology for multi-year rank stability."
    },
    {
      citation: "Gubler, D. J. (2002). Epidemic dengue/dengue hemorrhagic fever as a public health, social and economic problem in the 21st century. Trends in Microbiology, 10(2), 100-103.",
      topic: "Urban container breeding and post-monsoon epidemic amplification."
    },
    {
      citation: "Curriero, F. C., Patz, J. A., Rose, J. B., & Lele, S. (2001). The association between extreme precipitation and waterborne disease outbreaks in the United States. American Journal of Public Health, 91(8), 1194-1199.",
      topic: "Precipitation flush events and rapid contamination of potable municipal water lines."
    }
  ];

  const academicFramework = [
    {
      label: "Institutional Affiliation",
      value: "RP Institute, Affiliated to University of Mumbai"
    },
    {
      label: "Course & Curriculum",
      value: "B.Sc. Data Science · Semester III Field Project (Course Code: USDS306)"
    },
    {
      label: "Academic Session",
      value: "Academic Year 2026–2027"
    },
    {
      label: "Candidate",
      value: "Khan Umar · Seat / Roll No. Verified"
    }
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="border-b border-[#D8D1C5] bg-[#FAF7F2] py-16 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Provenance & Bibliography
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#171A18]">
            Sources & References
          </h1>
          <p className="text-base sm:text-lg text-[#565C58] leading-relaxed">
            Consolidated bibliography of government epidemiological bulletins, supporting peer-reviewed literature, meteorological archives, and institutional guidelines.
          </p>
        </div>
      </section>

      {/* 2. PRIMARY GOVERNMENT SURVEILLANCE DATASETS */}
      <section className="py-14 px-4 lg:px-8 max-w-4xl mx-auto space-y-6">
        <div className="border-b border-[#D8D1C5] pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            01 · Primary Data Provenance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171A18] mt-1">
            Government Surveillance Archives
          </h2>
        </div>

        <div className="space-y-4">
          {governmentSources.map((src, i) => (
            <div key={i} className="bg-[#FAF7F2] border border-[#D8D1C5] p-5 rounded space-y-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                <h3 className="font-serif text-lg font-bold text-[#171A18]">{src.title}</h3>
                <span className="font-mono text-xs bg-[#E8E2D7] text-[#174A4A] px-2 py-0.5 rounded">
                  {src.period}
                </span>
              </div>
              <div className="text-xs text-[#174A4A] font-medium">
                {src.author} · {src.publisher}
              </div>
              <p className="text-xs text-[#565C58] leading-relaxed pt-1">
                {src.notes}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PEER-REVIEWED SCIENTIFIC LITERATURE */}
      <section className="bg-[#FAF7F2] border-y border-[#D8D1C5] py-14 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="border-b border-[#D8D1C5] pb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
              02 · Epidemiological & Statistical Foundations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171A18] mt-1">
              Supporting Literature & Methodological References
            </h2>
          </div>

          <div className="space-y-3">
            {supportingLiterature.map((item, idx) => (
              <div key={idx} className="bg-[#F3EFE6] border border-[#D8D1C5] p-4 rounded space-y-1.5">
                <p className="text-xs sm:text-sm font-serif text-[#171A18] leading-relaxed">
                  {item.citation}
                </p>
                <div className="text-[11px] font-mono text-[#565C58]">
                  Context: {item.topic}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC & INSTITUTIONAL ATTESTATION */}
      <section className="py-14 px-4 lg:px-8 max-w-4xl mx-auto space-y-6">
        <div className="border-b border-[#D8D1C5] pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            03 · Academic Governance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171A18] mt-1">
            Institutional Context & Authorship
          </h2>
        </div>

        <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-6 rounded grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          {academicFramework.map((item, i) => (
            <div key={i} className="border-b border-[#D8D1C5]/60 pb-2">
              <div className="text-[#7A827D] uppercase">{item.label}</div>
              <div className="font-bold text-[#171A18] mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="pt-6 flex justify-between items-center text-xs">
          <Link href="/method" className="text-[#174A4A] hover:underline font-semibold">
            ← Methodology & Ethics
          </Link>
          <Link href="/" className="inline-flex items-center gap-1 text-[#C84B2F] hover:underline font-semibold">
            <span>Return to Project Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
