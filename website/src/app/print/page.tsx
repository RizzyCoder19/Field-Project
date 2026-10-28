"use client";

import React from "react";
import Link from "next/link";

import RadialSeasonalClock from "@/components/RadialSeasonalClock";
import NativeSeasonalChart from "@/components/NativeSeasonalChart";
import NativeEventCaseDivergence from "@/components/NativeEventCaseDivergence";
import NativeKendallAlignment from "@/components/NativeKendallAlignment";
import NativeTaxonomyConvergence from "@/components/NativeTaxonomyConvergence";
import NativeTimeline2026 from "@/components/NativeTimeline2026";
import NativeOutlierDecomposition from "@/components/NativeOutlierDecomposition";
import MaharashtraMap from "@/components/MaharashtraMap";

export default function PrintPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-[#F8FAFC] p-6 sm:p-12 print:p-0 print:bg-white print:text-black">
      {/* Print Control Header (Hidden in Print) */}
      <div className="max-w-5xl mx-auto mb-10 pb-6 border-b border-[#F8FAFC/10] flex flex-wrap items-center justify-between gap-4 print-hidden">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#5FB0A8] font-semibold">
            Offline & Archival Print Layout
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#F8FAFC]">
            Presentation Document & Complete Research Archive
          </h1>
          <p className="font-mono text-xs text-[#94A3B8] mt-1">
            Optimized for A4/Letter printing, offline PDF generation, and committee academic review.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 font-mono text-[10px] uppercase tracking-wider rounded border border-[#F8FAFC/10] text-[#94A3B8] hover:text-[#F8FAFC] bg-[#0B111E]"
          >
            ← Back to Interactive Presentation
          </Link>
          <button
            onClick={handlePrint}
            className="px-5 py-2 font-mono text-[10px] uppercase tracking-widest font-bold rounded bg-[#5FB0A8] text-[#06080F] hover:bg-[#F59E0B] transition-colors shadow-lg flex items-center gap-2"
          >
            <span>🖨️</span> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Main Printable Content Container */}
      <div className="max-w-5xl mx-auto space-y-16 print:space-y-8">
        {/* COVER / TITLE PAGE */}
        <section className="print-break-after border-b border-[#F8FAFC/10] pb-12 print:pb-8">
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#5FB0A8] mb-4 font-semibold">
            B.Sc. Data Science · Semester III · Field Project
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F8FAFC] print:text-black leading-tight">
            Analysis of Seasonal Disease Patterns Using Government Health Data
          </h1>
          <h2 className="font-serif text-xl sm:text-2xl text-[#5FB0A8] print:text-[#896b27] italic mt-3">
            From Government Records to Seasonal Patterns and Local Field Context in Maharashtra
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#F8FAFC/10] print:border-black/20">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-wider text-[#94A3B8]">Candidate</div>
              <div className="font-serif text-lg font-bold">Khan Umar</div>
            </div>
            <div>
              <div className="font-mono text-[8px] uppercase tracking-wider text-[#94A3B8]">Institution</div>
              <div className="font-serif text-sm font-bold">RP Institute</div>
              <div className="font-mono text-[9px] text-[#94A3B8]">Affiliated to University of Mumbai</div>
            </div>
            <div>
              <div className="font-mono text-[8px] uppercase tracking-wider text-[#94A3B8]">Project Guide</div>
              <div className="font-mono text-xs font-bold text-[#5FB0A8]">Prof. Angelin</div>
            </div>
            <div>
              <div className="font-mono text-[8px] uppercase tracking-wider text-[#94A3B8]">Surveillance Period</div>
              <div className="font-mono text-xs font-bold">2022–2026 W32</div>
              <div className="font-mono text-[9px] text-[#94A3B8]">N=237 Weeks</div>
            </div>
          </div>
        </section>

        {/* ACT 01: THE CORE QUESTION */}
        <section className="print-break-after border-b border-[#F8FAFC/10] pb-12 print:pb-8">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#5FB0A8] font-bold">Act 01</div>
          <h2 className="font-serif text-3xl font-bold mt-1">What is the Question?</h2>
          <p className="font-serif text-xl italic text-[#5FB0A8] mt-1">
            When do diseases appear? And do their patterns repeat across years?
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="p-4 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm print:bg-gray-50 print:border-gray-200">
              <div className="font-serif text-2xl font-bold text-[#5FB0A8]">WHEN</div>
              <div className="font-mono text-xs text-[#94A3B8] mt-1">does outbreak activity concentrate?</div>
            </div>
            <div className="p-4 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm print:bg-gray-50 print:border-gray-200">
              <div className="font-serif text-2xl font-bold text-[#5FB0A8]">WHICH</div>
              <div className="font-mono text-xs text-[#94A3B8] mt-1">diseases show recurring patterns?</div>
            </div>
            <div className="p-4 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm print:bg-gray-50 print:border-gray-200">
              <div className="font-serif text-2xl font-bold text-[#5FB0A8]">WHERE</div>
              <div className="font-mono text-xs text-[#94A3B8] mt-1">are events geographically localized?</div>
            </div>
            <div className="p-4 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm print:bg-gray-50 print:border-gray-200">
              <div className="font-serif text-2xl font-bold text-[#5FB0A8]">HOW STABLE</div>
              <div className="font-mono text-xs text-[#94A3B8] mt-1">are patterns under statistical testing?</div>
            </div>
          </div>
        </section>

        {/* ACT 02: WHERE DID THE DATA COME FROM? */}
        <section className="print-break-after border-b border-[#F8FAFC/10] pb-12 print:pb-8">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#5FB0A8] font-bold">Act 02</div>
          <h2 className="font-serif text-3xl font-bold mt-1">Where did the data come from?</h2>
          <p className="font-mono text-xs text-[#94A3B8] mt-1">
            Source: National Centre for Disease Control (NCDC) / Integrated Disease Surveillance Programme (IDSP)
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div className="p-6 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm print:bg-gray-50 print:border-gray-200">
              <div className="font-serif text-4xl font-bold text-[#F8FAFC] print:text-black">237</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8] mt-1">Surveillance Weeks</div>
              <div className="font-mono text-[8px] text-[#94A3B8]">203 Outbreak · 34 NIL Weeks</div>
            </div>
            <div className="p-6 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm print:bg-gray-50 print:border-gray-200">
              <div className="font-serif text-4xl font-bold text-[#F8FAFC] print:text-black">809</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8] mt-1">Analytical Records</div>
              <div className="font-mono text-[8px] text-[#94A3B8]">Verified Maharashtra Rows</div>
            </div>
            <div className="p-6 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm print:bg-gray-50 print:border-gray-200">
              <div className="font-serif text-4xl font-bold text-[#5FB0A8]">20,955</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8] mt-1">Reported Cases</div>
              <div className="font-mono text-[8px] text-[#94A3B8]">2022–2025 Primary Baseline</div>
            </div>
          </div>
        </section>

        {/* ACT 03 & 04: EXTRACTION & TAXONOMY */}
        <section className="print-break-after border-b border-[#F8FAFC/10] pb-12 print:pb-8">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#5FB0A8] font-bold">Act 03 & 04</div>
          <h2 className="font-serif text-3xl font-bold mt-1">Extraction & Taxonomic Normalization</h2>
          <div className="mt-6">
            <NativeTaxonomyConvergence />
          </div>
        </section>

        {/* ACT 05 & 06: SEASONAL VISUALIZATION */}
        <section className="print-break-after border-b border-[#F8FAFC/10] pb-12 print:pb-8">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#5FB0A8] font-bold">Act 05 & 06</div>
          <h2 className="font-serif text-3xl font-bold mt-1">When do these diseases appear?</h2>
          <p className="font-serif text-xl italic text-[#5FB0A8] mt-1">
            Five Diseases · Five Temporal Signatures
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <RadialSeasonalClock />
            <NativeSeasonalChart />
          </div>
        </section>

        {/* ACT 07: CONCORDANCE & DIVERGENCE */}
        <section className="print-break-after border-b border-[#F8FAFC/10] pb-12 print:pb-8">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#5FB0A8] font-bold">Act 07</div>
          <h2 className="font-serif text-3xl font-bold mt-1">Concordance & Case Divergence</h2>

          <div className="mt-6 space-y-6">
            <NativeEventCaseDivergence />
            <NativeKendallAlignment />
          </div>
        </section>

        {/* ACT 08: GEOGRAPHY */}
        <section className="print-break-after border-b border-[#F8FAFC/10] pb-12 print:pb-8">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#5FB0A8] font-bold">Act 08</div>
          <h2 className="font-serif text-3xl font-bold mt-1">Geographic Footprint: Maharashtra</h2>
          <p className="font-mono text-xs text-[#94A3B8] mt-1">
            Statewide seasonal synchronization does not imply geographic uniformity.
          </p>

          <div className="mt-6">
            <MaharashtraMap className="h-[440px]" />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 text-center font-mono text-[9px]">
            <div className="p-3 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm">
              <span className="text-[#38BDF8] font-bold">Dengue: 31 Districts</span>
              <p className="text-[#94A3B8] mt-0.5">Widespread post-monsoon footprint</p>
            </div>
            <div className="p-3 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm">
              <span className="text-[#10B981] font-bold">ADD: 33 Districts</span>
              <p className="text-[#94A3B8] mt-0.5">Broadest reporting breadth</p>
            </div>
            <div className="p-3 bg-[#0B111E] border border-[#F59E0B] rounded-sm">
              <span className="text-[#F59E0B] font-bold">Malaria: 61.4% in 2 Districts</span>
              <p className="text-[#94A3B8] mt-0.5">Gadchiroli & Chandrapur cluster</p>
            </div>
          </div>
        </section>

        {/* ACT 09: OUTLIER SENSITIVITY */}
        <section className="print-break-after border-b border-[#F8FAFC/10] pb-12 print:pb-8">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#5FB0A8] font-bold">Act 09</div>
          <h2 className="font-serif text-3xl font-bold mt-1">Outlier Sensitivity Decomposition</h2>
          <div className="mt-6">
            <NativeOutlierDecomposition />
          </div>
        </section>

        {/* ACT 10: 2026 SURVEILLANCE WINDOW */}
        <section className="print-break-after border-b border-[#F8FAFC/10] pb-12 print:pb-8">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#5FB0A8] font-bold">Act 10</div>
          <h2 className="font-serif text-3xl font-bold mt-1">2026 Partial-Year Surveillance Window</h2>
          <div className="mt-6">
            <NativeTimeline2026 />
          </div>
        </section>

        {/* ACT 11, 12, 13: FIELD EVIDENCE & SYNTHESIS */}
        <section className="print-break-after border-b border-[#F8FAFC/10] pb-12 print:pb-8">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#5FB0A8] font-bold">Act 11, 12 & 13</div>
          <h2 className="font-serif text-3xl font-bold mt-1">Fieldwork Evidence & Contextual Comparison</h2>

          <div className="mt-6 p-4 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm">
            <div className="font-mono text-[8px] text-[#5FB0A8] uppercase tracking-widest font-bold">
              Facility Verification
            </div>
            <div className="font-serif text-lg font-bold mt-1">PHC Nallasopara West — VVMC Health Post</div>
            <div className="font-mono text-xs text-[#94A3B8]">
              Nallasopara West, Kala Krida Ground area, Palghar, Maharashtra · 02 Oct 2026, 10:30–11:45 AM
            </div>
            <div className="font-mono text-[9px] text-[#F8FAFC]/80 mt-2">
              One local facility · One structured environmental observation · One Medical Officer In-Charge key-informant interview.
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm">
              <div className="font-bold text-[#38BDF8] uppercase text-[9px] mb-2">Government Data (NCDC)</div>
              <ul className="space-y-1.5 text-[#94A3B8]">
                <li>• Dengue: Jun–Oct concentration (Peak Oct)</li>
                <li>• Malaria: May–Jul surge (Vidarbha cluster)</li>
                <li>• ADD: Jun–Aug peak (Kendall W=0.530, p=0.016)</li>
                <li>• Food Poisoning: Bimodal Jan–Feb & Apr–May</li>
                <li>• Chikungunya: No stable recurring pattern</li>
              </ul>
            </div>

            <div className="p-4 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm">
              <div className="font-bold text-[#10B981] uppercase text-[9px] mb-2">Local Medical Officer Reported</div>
              <ul className="space-y-1.5 text-[#94A3B8]">
                <li>• Dengue: Sep–Nov clinical peak (drum storage)</li>
                <li>• Malaria: Jul–Sep (monsoon construction pools)</li>
                <li>• ADD: Jun–Aug onset surge (drain overflow)</li>
                <li>• Food Poisoning: Sudden cohort arrivals after feasts</li>
                <li>• Chikungunya: Sporadic household clusters</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#0B111E] border border-[#F8FAFC/10] rounded-sm font-mono text-[9px] text-[#94A3B8] italic">
            &ldquo;The NCDC/IDSP layer summarizes reported surveillance events across Maharashtra, while the field interview represents one local government health facility. The comparison is contextual rather than a statistical validation exercise.&rdquo;
          </div>
        </section>

        {/* ACT 14: CONCLUSION & CREDITS */}
        <section className="pt-6">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#5FB0A8] font-bold">Act 14</div>
          <h2 className="font-serif text-3xl font-bold mt-1">Conclusion</h2>
          <div className="font-serif text-2xl italic text-[#5FB0A8] mt-2">
            The pattern is seasonal. The context is local. The interpretation needs both.
          </div>

          <div className="mt-8 pt-6 border-t border-[#F8FAFC/10] flex justify-between font-mono text-[9px] text-[#94A3B8]">
            <div>
              Khan Umar · B.Sc. Data Science · RP Institute, University of Mumbai
            </div>
            <div>
              Project Guide: Prof. Angelin
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
