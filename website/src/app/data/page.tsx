"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, Database, FileSpreadsheet, Check } from "lucide-react";
import { SURVEILLANCE_COVERAGE, PRIMARY_DISEASES, RESEARCH_METRICS } from "@/data/researchData";

type SortField = "records" | "cases" | "deaths" | "districts";

export default function DataPage() {
  const [sortField, setSortField] = useState<SortField>("records");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const diseaseList = Object.values(PRIMARY_DISEASES).sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortDirection === "desc" ? valB - valA : valA - valB;
  });

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="border-b border-[#D8D1C5] bg-[#FAF7F2] py-16 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Government Outbreak Surveillance
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#171A18]">
            The Data
          </h1>
          <p className="text-base sm:text-lg text-[#565C58] leading-relaxed">
            The quantitative backbone of this project draws from weekly epidemic reports published by the National Centre for Disease Control (NCDC) and Integrated Disease Surveillance Programme (IDSP) across Maharashtra.
          </p>
        </div>
      </section>

      {/* 2. THE 4 PILLARS / NUMBERS */}
      <section className="border-b border-[#D8D1C5] bg-[#E8E2D7] py-10 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-5 rounded">
            <div className="font-mono text-xs uppercase text-[#565C58]">Surveillance Baseline</div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#171A18] mt-1">2022–2025</div>
            <div className="text-xs text-[#7A827D] mt-1">4 Full Calendar Years</div>
          </div>

          <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-5 rounded">
            <div className="font-mono text-xs uppercase text-[#565C58]">Reporting Weeks</div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#171A18] mt-1">237</div>
            <div className="text-xs text-[#7A827D] mt-1">203 Outbreak · 34 NIL Weeks</div>
          </div>

          <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-5 rounded">
            <div className="font-mono text-xs uppercase text-[#565C58]">Analytical Records</div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#171A18] mt-1">809</div>
            <div className="text-xs text-[#7A827D] mt-1">539 Baseline + 76 (2026) + Other</div>
          </div>

          <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-5 rounded">
            <div className="font-mono text-xs uppercase text-[#565C58]">Primary Families</div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#174A4A] mt-1">5</div>
            <div className="text-xs text-[#7A827D] mt-1">21,955 Reported Cases</div>
          </div>
        </div>
      </section>

      {/* 3. CORE EPIDEMIOLOGICAL CAVEAT (PROMINENT CALLOUT) */}
      <section className="py-10 px-4 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-[#FAF7F2] border-l-4 border-[#C84B2F] border-y border-r border-[#D8D1C5] p-6 rounded-r space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C84B2F] font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>Core Analytical Boundary</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-[#171A18]">
            &ldquo;These are reported surveillance events and case counts, not population incidence estimates.&rdquo;
          </p>
          <p className="text-xs text-[#565C58] leading-relaxed">
            NCDC/IDSP weekly reports reflect formal outbreak clusters that breached local reporting thresholds and prompted investigation. They do not capture routine endemic background presentations treated by private clinics or unnotified mild illnesses.
          </p>
        </div>
      </section>

      {/* 4. PRIMARY DISEASE COHORT SUMMARY TABLE */}
      <section className="py-12 px-4 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-[#D8D1C5] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
              Primary Cohort
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171A18]">
              Baseline Disease Profiles (2022–2025)
            </h2>
            <p className="text-xs text-[#565C58] mt-1">
              Click any column header to sort the primary disease families.
            </p>
          </div>
          <div className="text-xs font-mono text-[#565C58] bg-[#FAF7F2] px-3 py-1.5 rounded border border-[#D8D1C5]">
            Total Primary: 539 Records · 21,955 Cases · 266 Deaths
          </div>
        </div>

        <div className="overflow-x-auto border border-[#D8D1C5] rounded bg-[#FAF7F2]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#E8E2D7] border-b border-[#D8D1C5] font-mono text-xs text-[#171A18]">
              <tr>
                <th className="py-3 px-4">Disease Family</th>
                <th className="py-3 px-4">Category</th>
                <th
                  onClick={() => handleSort("records")}
                  className="py-3 px-4 cursor-pointer hover:text-[#174A4A] select-none"
                >
                  Records {sortField === "records" && (sortDirection === "desc" ? "↓" : "↑")}
                </th>
                <th
                  onClick={() => handleSort("cases")}
                  className="py-3 px-4 cursor-pointer hover:text-[#174A4A] select-none"
                >
                  Cases {sortField === "cases" && (sortDirection === "desc" ? "↓" : "↑")}
                </th>
                <th
                  onClick={() => handleSort("deaths")}
                  className="py-3 px-4 cursor-pointer hover:text-[#174A4A] select-none"
                >
                  Deaths {sortField === "deaths" && (sortDirection === "desc" ? "↓" : "↑")}
                </th>
                <th
                  onClick={() => handleSort("districts")}
                  className="py-3 px-4 cursor-pointer hover:text-[#174A4A] select-none"
                >
                  Districts {sortField === "districts" && (sortDirection === "desc" ? "↓" : "↑")}
                </th>
                <th className="py-3 px-4">Peak Season Window</th>
                <th className="py-3 px-4">Kendall&apos;s W (Concordance)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8D1C5] font-sans">
              {diseaseList.map((disease) => (
                <tr key={disease.id} className="hover:bg-[#F3EFE6] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#171A18]">
                    {disease.name}
                  </td>
                  <td className="py-3.5 px-4 text-[#565C58]">
                    {disease.category}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-[#171A18]">
                    {disease.records}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#171A18]">
                    {disease.cases.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#C84B2F]">
                    {disease.deaths}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#565C58]">
                    {disease.districts} / 36
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-[#174A4A]">
                    {disease.peakMonths.split("(")[0]}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs">
                    {disease.isSignificant ? (
                      <span className="inline-flex items-center gap-1 text-[#174A4A] font-bold">
                        <Check className="w-3.5 h-3.5 text-[#AEBB55]" />
                        W={disease.kendallW.toFixed(3)} (p={disease.kendallP.toFixed(3)})*
                      </span>
                    ) : (
                      <span className="text-[#7A827D]">
                        W={disease.kendallW.toFixed(3)} (p={disease.kendallP.toFixed(3)})
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-[11px] font-mono text-[#7A827D]">
          *Statistically significant rank concordance across 2022–2025 at α = 0.05. Only Acute Diarrheal Disease demonstrates consistent multi-year monthly rank stability.
        </div>
      </section>

      {/* 5. ANNUAL SURVEILLANCE COVERAGE AUDIT */}
      <section className="py-12 px-4 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="border-b border-[#D8D1C5] pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Temporal Audit
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171A18]">
            Surveillance Publication Breakdown
          </h2>
          <p className="text-xs text-[#565C58] mt-1">
            Status of all 237 weekly government surveillance bulletins archived in the pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SURVEILLANCE_COVERAGE.map((item) => (
            <div key={item.year} className="bg-[#FAF7F2] border border-[#D8D1C5] p-5 rounded space-y-3">
              <div className="flex justify-between items-center border-b border-[#D8D1C5] pb-2">
                <span className="font-mono text-base font-bold text-[#171A18]">{item.year}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#E8E2D7] text-[#174A4A]">
                  {item.records} Records
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
                <div className="bg-[#F3EFE6] p-2 rounded">
                  <div className="text-[#7A827D]">Published</div>
                  <div className="font-bold text-[#171A18]">{item.publishedWeeks} / {item.totalWeeks}</div>
                </div>
                <div className="bg-[#F3EFE6] p-2 rounded">
                  <div className="text-[#7A827D]">Outbreaks</div>
                  <div className="font-bold text-[#174A4A]">{item.outbreakWeeks}</div>
                </div>
                <div className="bg-[#F3EFE6] p-2 rounded">
                  <div className="text-[#7A827D]">NIL Weeks</div>
                  <div className="font-bold text-[#565C58]">{item.nilWeeks}</div>
                </div>
              </div>
              <p className="text-xs text-[#565C58] leading-relaxed pt-1">
                {item.notes}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. NEXT ACTIONS */}
      <section className="bg-[#FAF7F2] border-t border-[#D8D1C5] py-12 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#171A18]">
              Ready to examine the seasonal dynamics?
            </h3>
            <p className="text-xs text-[#565C58] mt-1">
              Explore 12-month curves, 3-month concentration ratios, and meteorological overlays for all five diseases.
            </p>
          </div>
          <Link
            href="/seasonality"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#174A4A] hover:bg-[#0E3232] text-[#F3EFE6] text-sm font-medium rounded transition-colors whitespace-nowrap"
          >
            <span>View Seasonality Curves</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
