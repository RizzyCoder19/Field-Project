"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertTriangle, Layers, Calendar, ChevronDown } from "lucide-react";
import { PRIMARY_DISEASES, MONTHS, RESEARCH_METRICS } from "@/data/researchData";
import InteractiveSeasonalChart from "@/components/InteractiveSeasonalChart";

export default function SeasonalityPage() {
  const diseaseKeys = ["dengue", "add", "malaria", "foodPoisoning", "chikungunya"] as const;

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="border-b border-[#D8D1C5] bg-[#FAF7F2] py-16 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Seasonal Disease Dynamics · 2022–2025 Baseline
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#171A18]">
            When Does Disease Actually Move?
          </h1>
          <p className="text-base sm:text-lg text-[#565C58] leading-relaxed">
            By de-aggregating 539 outbreak-event records and 21,955 reported cases across 48 calendar months, distinct meteorological and behavioural trigger profiles emerge across Maharashtra.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-[#565C58]">
            <span className="font-semibold text-[#171A18]">Jump to disease:</span>
            <a href="#dengue" className="px-2.5 py-1 bg-[#E8E2D7] hover:bg-[#D8D1C5] rounded text-[#174A4A]">Dengue</a>
            <a href="#add" className="px-2.5 py-1 bg-[#E8E2D7] hover:bg-[#D8D1C5] rounded text-[#174A4A]">ADD (Diarrheal)</a>
            <a href="#malaria" className="px-2.5 py-1 bg-[#E8E2D7] hover:bg-[#D8D1C5] rounded text-[#174A4A]">Malaria</a>
            <a href="#food-poisoning" className="px-2.5 py-1 bg-[#E8E2D7] hover:bg-[#D8D1C5] rounded text-[#174A4A]">Food Poisoning</a>
            <a href="#chikungunya" className="px-2.5 py-1 bg-[#E8E2D7] hover:bg-[#D8D1C5] rounded text-[#174A4A]">Chikungunya</a>
          </div>
        </div>
      </section>

      {/* 2. CENTRAL INTERACTIVE SEASONAL CHART */}
      <section className="py-12 px-4 lg:px-8 max-w-7xl mx-auto">
        <InteractiveSeasonalChart />
      </section>

      {/* 3. KEY STATISTICAL TAKEAWAY BANNER */}
      <section className="bg-[#E8E2D7] border-y border-[#D8D1C5] py-8 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-start gap-4">
          <CheckCircle2 className="w-5 h-5 text-[#AEBB55] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#171A18] font-bold">
              Kendall&apos;s W Non-Parametric Concordance Finding
            </h4>
            <p className="text-xs text-[#565C58] leading-relaxed">
              Among all five primary disease families tested across the four baseline years (2022–2025), <strong>only Acute Diarrheal Disease (ADD) demonstrated statistically significant multi-year rank concordance</strong> (W = 0.530, p = 0.016). Vector-borne diseases (Dengue, Malaria, Chikungunya) fluctuate in exact peak calendar week depending on the arrival, intensity, and cessation of the southwest monsoon.
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE FIVE CONSOLIDATED DISEASE MONOGRAPHS */}
      <section className="py-16 px-4 lg:px-8 max-w-5xl mx-auto space-y-16">
        {/* Title for the Consolidated Section */}
        <div className="border-b border-[#D8D1C5] pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Comprehensive Analytical Profiles
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#171A18] mt-1">
            Five Disease Families: In-Depth Breakdown
          </h2>
          <p className="text-xs text-[#565C58] mt-1">
            Full empirical metrics, monthly histograms, geographic distribution, and ground-level clinical linkages.
          </p>
        </div>

        {/* ── 01. DENGUE ────────────────────────────────────────── */}
        <div id="dengue" className="bg-[#FAF7F2] border border-[#D8D1C5] rounded p-6 sm:p-8 space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D8D1C5] pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#174A4A] font-semibold">01 · Vector-Borne</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171A18]">Dengue Fever</h3>
            </div>
            <div className="text-xs font-mono bg-[#E8E2D7] text-[#174A4A] px-3 py-1.5 rounded">
              Peak: Aug–Oct (50.5% CR3)
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Outbreak Records</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">204</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Reported Cases</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">3,144</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Fatalities</div>
              <div className="text-base font-bold text-[#C84B2F] mt-0.5">93 Deaths</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Districts</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">31 / 36</div>
            </div>
          </div>

          {/* Monthly Mini Bar Chart */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#565C58]">12-Month Outbreak Event Distribution:</div>
            <div className="grid grid-cols-12 gap-1 items-end h-20 bg-[#F3EFE6] p-2 rounded border border-[#D8D1C5]">
              {PRIMARY_DISEASES.dengue.monthlyEvents.map((val, i) => {
                const max = Math.max(...PRIMARY_DISEASES.dengue.monthlyEvents);
                const heightPct = Math.round((val / max) * 100);
                return (
                  <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className="w-full bg-[#174A4A] rounded-t transition-all hover:bg-[#C84B2F]"
                      style={{ height: `${heightPct}%` }}
                      title={`${MONTHS[i]}: ${val} events`}
                    ></div>
                    <span className="text-[9px] font-mono text-[#7A827D]">{MONTHS[i][0]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#565C58] leading-relaxed">
            <p>
              <strong>Epidemiological Interpretation:</strong> Dengue exhibits strict late-monsoon and post-monsoon concentration across Maharashtra, with 82.8% of all baseline events occurring between June and October. Peak frequency consistently hits October (40 events, 566 cases) as stagnant rainwater pools and artificial domestic containers create ideal breeding habitats for <em>Aedes aegypti</em>.
            </p>
            <p>
              <strong>Fieldwork Linkage (Nallasopara West):</strong> In the local health facility visit, the Medical Officer reported clinical dengue presentations surging through September–November, directly driven by intermittent municipal water supply that compels households to store water for 48–72 hours in open drums.
            </p>
          </div>
        </div>

        {/* ── 02. ACUTE DIARRHEAL DISEASE (ADD) ──────────────────── */}
        <div id="add" className="bg-[#FAF7F2] border border-[#D8D1C5] rounded p-6 sm:p-8 space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D8D1C5] pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#C84B2F] font-semibold">02 · Water-Borne</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171A18]">Acute Diarrheal Disease (ADD)</h3>
            </div>
            <div className="text-xs font-mono bg-[#E8E2D7] text-[#174A4A] px-3 py-1.5 rounded font-bold">
              Kendall&apos;s W = 0.530 (p = 0.016)*
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Outbreak Records</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">153</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Reported Cases</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">9,050</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Fatalities</div>
              <div className="text-base font-bold text-[#C84B2F] mt-0.5">93 Deaths</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Districts</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">33 / 36</div>
            </div>
          </div>

          {/* Monthly Mini Bar Chart */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#565C58]">12-Month Outbreak Event Distribution:</div>
            <div className="grid grid-cols-12 gap-1 items-end h-20 bg-[#F3EFE6] p-2 rounded border border-[#D8D1C5]">
              {PRIMARY_DISEASES.add.monthlyEvents.map((val, i) => {
                const max = Math.max(...PRIMARY_DISEASES.add.monthlyEvents);
                const heightPct = Math.round((val / max) * 100);
                return (
                  <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className="w-full bg-[#C84B2F] rounded-t transition-all hover:bg-[#174A4A]"
                      style={{ height: `${heightPct}%` }}
                      title={`${MONTHS[i]}: ${val} events`}
                    ></div>
                    <span className="text-[9px] font-mono text-[#7A827D]">{MONTHS[i][0]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#565C58] leading-relaxed">
            <p>
              <strong>Epidemiological Interpretation:</strong> ADD is the single disease in the baseline dataset with statistically confirmed multi-year seasonal concordance. Outbreaks climb rapidly with initial monsoon rains in June (19 events) and July (22 events), with a notable secondary elevation in October (25 events, 1,383 cases).
            </p>
            <p>
              <strong>Fieldwork Linkage (Nallasopara West):</strong> Ground observations noted leaking potable distribution pipelines running parallel to unlined surface drains. During the monsoon onset, negative pressure in damaged supply pipes causes sewer cross-contamination, explaining the immediate surge in gastroenteritis cases at the health post.
            </p>
          </div>
        </div>

        {/* ── 03. MALARIA ────────────────────────────────────────── */}
        <div id="malaria" className="bg-[#FAF7F2] border border-[#D8D1C5] rounded p-6 sm:p-8 space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D8D1C5] pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#AEBB55] font-semibold">03 · Vector-Borne</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171A18]">Malaria</h3>
            </div>
            <div className="text-xs font-mono bg-[#E8E2D7] text-[#174A4A] px-3 py-1.5 rounded">
              Peak: May–Jul (54.3% CR3)
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Outbreak Records</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">70</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Reported Cases</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">2,133</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Fatalities</div>
              <div className="text-base font-bold text-[#C84B2F] mt-0.5">51 Deaths</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Districts</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">15 / 36</div>
            </div>
          </div>

          {/* Monthly Mini Bar Chart */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#565C58]">12-Month Outbreak Event Distribution:</div>
            <div className="grid grid-cols-12 gap-1 items-end h-20 bg-[#F3EFE6] p-2 rounded border border-[#D8D1C5]">
              {PRIMARY_DISEASES.malaria.monthlyEvents.map((val, i) => {
                const max = Math.max(...PRIMARY_DISEASES.malaria.monthlyEvents);
                const heightPct = Math.round((val / max) * 100);
                return (
                  <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className="w-full bg-[#AEBB55] rounded-t transition-all hover:bg-[#174A4A]"
                      style={{ height: `${heightPct}%` }}
                      title={`${MONTHS[i]}: ${val} events`}
                    ></div>
                    <span className="text-[9px] font-mono text-[#7A827D]">{MONTHS[i][0]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#565C58] leading-relaxed">
            <p>
              <strong>Epidemiological Interpretation:</strong> Unlike Dengue, which crests post-monsoon, Malaria outbreaks in Maharashtra concentrate earlier in May–July (54.3% of events). Geographically, Malaria is tightly clustered in 15 districts, heavily concentrated in forested and tribal belts (particularly Gadchiroli and Chandrapur).
            </p>
            <p>
              <strong>Fieldwork Linkage (Nallasopara West):</strong> In peri-urban Palghar, the Medical Officer noted that local transmission is predominantly <em>Plasmodium vivax</em> linked to construction site water accumulation, while severe <em>falciparum</em> cases are rare in this urban center.
            </p>
          </div>
        </div>

        {/* ── 04. FOOD POISONING ─────────────────────────────────── */}
        <div id="food-poisoning" className="bg-[#FAF7F2] border border-[#D8D1C5] rounded p-6 sm:p-8 space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D8D1C5] pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#D97706] font-semibold">04 · Food-Borne</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171A18]">Food Poisoning</h3>
            </div>
            <div className="text-xs font-mono bg-[#E8E2D7] text-[#174A4A] px-3 py-1.5 rounded">
              High-Case Point Source Outliers
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Outbreak Records</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">69</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Reported Cases</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">5,927</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Fatalities</div>
              <div className="text-base font-bold text-[#C84B2F] mt-0.5">29 Deaths</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Districts</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">27 / 36</div>
            </div>
          </div>

          {/* Monthly Mini Bar Chart */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#565C58]">12-Month Outbreak Event Distribution:</div>
            <div className="grid grid-cols-12 gap-1 items-end h-20 bg-[#F3EFE6] p-2 rounded border border-[#D8D1C5]">
              {PRIMARY_DISEASES.foodPoisoning.monthlyEvents.map((val, i) => {
                const max = Math.max(...PRIMARY_DISEASES.foodPoisoning.monthlyEvents);
                const heightPct = Math.round((val / max) * 100);
                return (
                  <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className="w-full bg-[#D97706] rounded-t transition-all hover:bg-[#174A4A]"
                      style={{ height: `${heightPct}%` }}
                      title={`${MONTHS[i]}: ${val} events`}
                    ></div>
                    <span className="text-[9px] font-mono text-[#7A827D]">{MONTHS[i][0]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#565C58] leading-relaxed">
            <p>
              <strong>Epidemiological Interpretation:</strong> Food Poisoning exhibits extreme case dispersion. While record counts are moderate (69 events), total cases (5,927) are second only to ADD, driven by massive single-event communal gatherings (weddings, religious feasts, residential hostel caterers) where &gt;200 individuals fall ill simultaneously.
            </p>
            <p>
              <strong>Fieldwork Linkage (Nallasopara West):</strong> The facility physician noted that domestic food spoilage cases climb steeply during hot pre-monsoon weeks (April–May) due to ambient temperatures accelerating bacterial growth in unrefrigerated food.
            </p>
          </div>
        </div>

        {/* ── 05. CHIKUNGUNYA ────────────────────────────────────── */}
        <div id="chikungunya" className="bg-[#FAF7F2] border border-[#D8D1C5] rounded p-6 sm:p-8 space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D8D1C5] pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#7A827D] font-semibold">05 · Vector-Borne</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171A18]">Chikungunya</h3>
            </div>
            <div className="text-xs font-mono bg-[#E8E2D7] text-[#174A4A] px-3 py-1.5 rounded">
              0 Deaths Recorded
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Outbreak Records</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">43</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Reported Cases</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">701</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Fatalities</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">0 Deaths</div>
            </div>
            <div className="bg-[#F3EFE6] p-3 rounded">
              <div className="text-[#7A827D]">Districts</div>
              <div className="text-base font-bold text-[#171A18] mt-0.5">15 / 36</div>
            </div>
          </div>

          {/* Monthly Mini Bar Chart */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#565C58]">12-Month Outbreak Event Distribution:</div>
            <div className="grid grid-cols-12 gap-1 items-end h-20 bg-[#F3EFE6] p-2 rounded border border-[#D8D1C5]">
              {PRIMARY_DISEASES.chikungunya.monthlyEvents.map((val, i) => {
                const max = Math.max(...PRIMARY_DISEASES.chikungunya.monthlyEvents);
                const heightPct = Math.round((val / max) * 100);
                return (
                  <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className="w-full bg-[#565C58] rounded-t transition-all hover:bg-[#174A4A]"
                      style={{ height: `${heightPct}%` }}
                      title={`${MONTHS[i]}: ${val} events`}
                    ></div>
                    <span className="text-[9px] font-mono text-[#7A827D]">{MONTHS[i][0]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#565C58] leading-relaxed">
            <p>
              <strong>Epidemiological Interpretation:</strong> Chikungunya exhibits the lowest rank concordance (W = 0.220, p = 0.450) and lowest case volume (701 cases) among the primary cohort. Outbreaks are sporadic and multi-year episodic rather than strictly predictable on an annual calendar basis. Zero fatalities were reported across all 237 surveillance weeks.
            </p>
            <p>
              <strong>Clinical Nuance:</strong> While mortality is nil, Chikungunya causes debilitating sub-acute and chronic polyarthralgia lasting weeks or months, representing an unmeasured disability burden not captured by acute outbreak death tallies.
            </p>
          </div>
        </div>
      </section>

      {/* 5. NEXT DESTINATION: FIELDWORK */}
      <section className="bg-[#FAF7F2] border-t border-[#D8D1C5] py-14 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase text-[#C84B2F] font-semibold">The Ground Reality</div>
            <h3 className="font-serif text-2xl font-bold text-[#171A18]">
              Connect the Data to the Health Facility
            </h3>
            <p className="text-xs text-[#565C58]">
              Read field notes, direct observations, and the Medical Officer interview from Nallasopara West.
            </p>
          </div>
          <Link
            href="/fieldwork"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C84B2F] hover:bg-[#A43920] text-white text-sm font-semibold rounded transition-colors whitespace-nowrap shadow-sm"
          >
            <span>Read Fieldwork Dossier</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
