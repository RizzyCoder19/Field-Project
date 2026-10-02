"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, AlertTriangle, Layers, FileText, CheckCircle2, ChevronRight } from "lucide-react";

export default function MethodPage() {
  const pipelineSteps = [
    {
      num: "01",
      title: "Source PDFs",
      desc: "Weekly government outbreak surveillance bulletins downloaded from the National Centre for Disease Control (NCDC) and Integrated Disease Surveillance Programme (IDSP) portals.",
    },
    {
      num: "02",
      title: "Structured Extraction",
      desc: "Automated and manual parsing converting unstructured PDF outbreak tables into structured rows with calendar year, week number, district, disease name, case count, and mortality.",
    },
    {
      num: "03",
      title: "Cleaning & Standardization",
      desc: "Harmonization of 116 raw illness strings into 56 clean labels and 30 syndromic groups. Resolution of district spelling variations and validation of zero-count vs missing weeks.",
    },
    {
      num: "04",
      title: "Disease Grouping",
      desc: "Isolation of the 5 primary epidemic families (Dengue, ADD, Malaria, Food Poisoning, Chikungunya) accounting for 539 baseline records (2022–2025) and 21,955 reported cases.",
    },
    {
      num: "05",
      title: "Seasonal Analysis",
      desc: "Computation of 12-month aggregated curves, 3-month concentration ratios (CR3), and Kendall's W non-parametric rank concordance across the 4 independent calendar years.",
    },
    {
      num: "06",
      title: "Field Context",
      desc: "Primary qualitative field investigation at an Urban Health Post in Nallasopara West (Palghar District) on 02 October 2026: structured observation and Medical Officer interview.",
    },
    {
      num: "07",
      title: "Interpretation",
      desc: "Synthesizing macro-level surveillance data with micro-level health post mechanics, identifying diagnostic lags, water storage vulnerabilities, and public-health reporting thresholds.",
    },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="border-b border-[#D8D1C5] bg-[#FAF7F2] py-16 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Research Architecture & Scientific Governance
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#171A18]">
            Methodology, Evidence & Ethics
          </h1>
          <p className="text-base sm:text-lg text-[#565C58] leading-relaxed">
            A transparent audit of how raw government public health notices and primary field evidence were cleaned, verified, and contextualized.
          </p>
        </div>
      </section>

      {/* 2. CORE SCIENTIFIC BOUNDARY DISCLAIMER */}
      <section className="bg-[#FAF7F2] border-b border-[#D8D1C5] py-8 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto bg-[#E8E2D7] border-l-4 border-[#C84B2F] p-5 rounded-r">
          <p className="text-sm sm:text-base font-serif font-bold text-[#171A18] leading-relaxed">
            &ldquo;This project does not estimate incidence or prevalence, establish causality, or generalize one facility&apos;s observations to Maharashtra.&rdquo;
          </p>
          <p className="text-xs text-[#565C58] mt-1.5 leading-relaxed">
            NCDC/IDSP data tracks reported outbreak events breaching notification thresholds, not total disease incidence in the population. Ground observations represent one localized health post visit, providing qualitative operational context rather than statewide statistical generalizations.
          </p>
        </div>
      </section>

      {/* 3. SIMPLE VISUAL PIPELINE */}
      <section className="py-14 px-4 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="border-b border-[#D8D1C5] pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Analytical Progression
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#171A18] mt-1">
            Data Pipeline: Source to Synthesis
          </h2>
          <p className="text-xs text-[#565C58] mt-1">
            The seven sequential stages governing data integrity throughout this project.
          </p>
        </div>

        {/* Vertical Pipeline Flow */}
        <div className="space-y-4">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-[#FAF7F2] border border-[#D8D1C5] p-5 rounded flex flex-col sm:flex-row items-start gap-4 transition-colors hover:border-[#174A4A]"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-start shrink-0">
                <span className="font-mono text-xs font-bold text-[#F3EFE6] bg-[#174A4A] px-2.5 py-1 rounded">
                  STEP {step.num}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#171A18]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#565C58] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EVIDENCE BOUNDARIES & LIMITATIONS */}
      <section className="bg-[#FAF7F2] border-y border-[#D8D1C5] py-14 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="border-b border-[#D8D1C5] pb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C84B2F] font-semibold">
              Epistemological Transparency
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#171A18] mt-1">
              Evidence Boundaries & Study Limitations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#565C58]">
            <div className="bg-[#F3EFE6] p-5 rounded border border-[#D8D1C5] space-y-2">
              <h4 className="font-serif text-base font-bold text-[#171A18]">01 · Surveillance Publication Gaps</h4>
              <p className="leading-relaxed">
                In calendar year 2023, Weeks 15, 51, and 52 were never released in published form by NCDC/IDSP. These represent missing observation periods in official archives, handled as non-reporting intervals rather than true zero-disease occurrences.
              </p>
            </div>

            <div className="bg-[#F3EFE6] p-5 rounded border border-[#D8D1C5] space-y-2">
              <h4 className="font-serif text-base font-bold text-[#171A18]">02 · Out-of-Sample Truncation</h4>
              <p className="leading-relaxed">
                Year 2026 data terminates at Week 32 (early August). Historically, 55.4% of Dengue events in Maharashtra occur between Week 33 and Week 52. Therefore, 2026 is strictly treated as an out-of-sample comparison for pre-monsoon kinetics, not a full annual baseline.
              </p>
            </div>

            <div className="bg-[#F3EFE6] p-5 rounded border border-[#D8D1C5] space-y-2">
              <h4 className="font-serif text-base font-bold text-[#171A18]">03 · Reporting Threshold Bias</h4>
              <p className="leading-relaxed">
                IDSP outbreak bulletins require an epidemiological investigation triggered by local clustering. Mild, routine endemic illnesses treated by outpatient clinics or private health facilities without cluster investigation are omitted by design.
              </p>
            </div>

            <div className="bg-[#F3EFE6] p-5 rounded border border-[#D8D1C5] space-y-2">
              <h4 className="font-serif text-base font-bold text-[#171A18]">04 · Field Site Specificity</h4>
              <p className="leading-relaxed">
                Qualitative field evidence originates from exactly one Urban Health Post in Nallasopara West (Palghar) on 02 October 2026. Findings describe local operational realities and clinical perspectives; they cannot be statistically generalized across all districts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ETHICS & INSTITUTIONAL GOVERNANCE */}
      <section className="py-14 px-4 lg:px-8 max-w-4xl mx-auto space-y-6">
        <div className="border-b border-[#D8D1C5] pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Institutional Governance
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#171A18] mt-1">
            Research Ethics & Attribution Protocols
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#565C58] leading-relaxed">
          <p>
            <strong>Secondary Data Attribution:</strong> All statewide epidemiological outbreak datasets analyzed in this project were gathered from publicly accessible government reports published by the National Centre for Disease Control (NCDC), Ministry of Health and Family Welfare (MoHFW), Government of India. Full attribution is maintained without modification of original quantitative tallies.
          </p>
          <p>
            <strong>Fieldwork Informed Consent & Non-Identifiability:</strong> Prior verbal and administrative consent was secured from the Medical Officer In-Charge at the Nallasopara West health facility. The facility was visited strictly for observational and informant interviewing purposes regarding public health operations. No individual patients were interviewed, photographed, or contacted. No patient records, names, or clinical histories were gathered.
          </p>
          <p>
            <strong>Academic Purpose:</strong> This research was conducted exclusively for the B.Sc. Data Science Semester III Field Project curriculum under RP Institute, affiliated with the University of Mumbai, in academic year 2026–27.
          </p>
        </div>

        <div className="pt-6 flex justify-between items-center border-t border-[#D8D1C5] text-xs">
          <Link href="/fieldwork" className="text-[#174A4A] hover:underline font-semibold">
            ← Read Fieldwork Dossier
          </Link>
          <Link href="/sources" className="inline-flex items-center gap-1 text-[#C84B2F] hover:underline font-semibold">
            <span>View Bibliography & Sources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
