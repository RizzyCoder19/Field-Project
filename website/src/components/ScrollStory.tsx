"use client";

import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import Link from "next/link";
import {
  PRIMARY_DISEASES,
  SURVEILLANCE_COVERAGE,
  MONTHS,
  OUTLIER_SENSITIVITY_DATA,
} from "@/data/researchData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import RadialSeasonalClock from "@/components/RadialSeasonalClock";
import NativeSeasonalChart from "@/components/NativeSeasonalChart";
import NativeEventCaseDivergence from "@/components/NativeEventCaseDivergence";
import NativeKendallAlignment from "@/components/NativeKendallAlignment";
import NativeTaxonomyConvergence from "@/components/NativeTaxonomyConvergence";
import NativeTimeline2026 from "@/components/NativeTimeline2026";
import NativeOutlierDecomposition from "@/components/NativeOutlierDecomposition";

gsap.registerPlugin(ScrollTrigger);

const MaharashtraMap = lazy(() => import("@/components/MaharashtraMap"));

// ─── DISEASE METADATA ──────────────────────────────────────
const D = {
  dengue:       { color: "#38BDF8", label: "Dengue",         short: "Jun–Oct concentration (Peak: Oct)" },
  add:          { color: "#10B981", label: "ADD",            short: "Jun–Aug monsoon surge, Kendall W = 0.530" },
  malaria:      { color: "#D4AF37", label: "Malaria",        short: "May–Jul pre-monsoon, 61.4% Vidarbha cluster" },
  foodPoisoning:{ color: "#EF4444", label: "Food Poisoning", short: "Bimodal (Jan–Feb & Apr–May), outlier-sensitive" },
  chikungunya:  { color: "#A78BFA", label: "Chikungunya",    short: "Dispersed, no recurring annual rhythm" },
} as const;

// ─── SECTION WRAPPER ───────────────────────────────────────
function Section({
  id,
  children,
  className = "",
  bg = "#111411",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  bg?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full ${className}`}
      style={{ background: bg }}
    >
      {children}
    </section>
  );
}

// ─── EDITORIAL HEADING ────────────────────────────────────
function Q({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10 sm:mb-14">
      <h2 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-bold text-[#EEE8DA] leading-[1.05] tracking-tight">
        {children}
      </h2>
      {sub && (
        <div className="mt-3 font-mono text-[10px] tracking-[0.25em] text-[#C7A75B] uppercase">
          {sub}
        </div>
      )}
    </div>
  );
}

// ─── SECTION NUMBER LABEL ─────────────────────────────────
function Label({ n, text }: { n: string; text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-[9px] text-[#C7A75B] border border-[#C7A75B]/30 px-2 py-0.5 rounded-sm uppercase tracking-widest font-bold">
        Act {n}
      </span>
      <span className="font-mono text-[9px] tracking-[0.2em] text-[#B5B0A4]/70 uppercase">
        {text}
      </span>
    </div>
  );
}

// ─── DIVIDER ──────────────────────────────────────────────
function Rule() {
  return <div className="w-full h-px bg-[#EEE8DA]/08 my-14" />;
}

// ══════════════════════════════════════════════════════════
// SCROLL STORY MAIN PRESENTATION COMPONENT
// ══════════════════════════════════════════════════════════
export default function ScrollStory() {
  const [focusedDisease, setFocusedDisease] = useState<string | null>(null);

  // GSAP Scene Refs
  const pdfScene = useRef<HTMLDivElement>(null);
  const pdfDoc = useRef<HTMLDivElement>(null);
  const pdfArrow = useRef<HTMLDivElement>(null);
  const pdfRecord = useRef<HTMLDivElement>(null);
  const fieldTransition = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // PDF Extraction Scene ScrollTrigger
      if (pdfScene.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pdfScene.current,
            start: "top top",
            end: "+=160%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.fromTo(pdfDoc.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 })
          .to(".pdf-row-focus", { backgroundColor: "rgba(199,167,91,0.45)", duration: 0.2 }, 0.3)
          .to(pdfArrow.current, { opacity: 1, scaleY: 1, duration: 0.2 }, 0.5)
          .fromTo(pdfRecord.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.3 }, 0.65);
      }

      // Field transition text reveal
      if (fieldTransition.current) {
        gsap.from(".field-char", {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: fieldTransition.current,
            start: "top 65%",
          },
        });
      }

      // General reveal-up elements
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      {/* ══════════════════════════════════════════════════════
          01 — WHAT IS THE QUESTION?
      ══════════════════════════════════════════════════════ */}
      <Section
        id="question"
        bg="#111411"
        className="min-h-screen flex flex-col justify-between px-6 sm:px-14 lg:px-24 py-20 sm:py-28 border-b border-[#EEE8DA]/06 editorial-grain"
      >
        <div>
          <Label n="01" text="The Research Mandate" />
          <Q sub="Government Health Surveillance · Maharashtra 2022–2026">
            When do diseases appear?<br />
            <span className="text-[#C7A75B] italic font-light">And do their patterns repeat across years?</span>
          </Q>

          {/* 4 Core Inquiries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#EEE8DA]/08 mt-10 reveal-up">
            {[
              { q: "WHEN", text: "does outbreak activity concentrate across the 12 calendar months?" },
              { q: "WHICH", text: "diseases exhibit recurring, synchronized seasonal signatures?" },
              { q: "WHERE", text: "are events geographically localized across Maharashtra's 36 districts?" },
              { q: "HOW STABLE", text: "are these patterns under non-parametric rank concordance testing?" },
            ].map(({ q, text }) => (
              <div key={q} className="bg-[#111411] p-6 lg:p-8 flex flex-col justify-between">
                <div className="font-serif text-3xl lg:text-4xl text-[#C7A75B] font-bold">{q}</div>
                <div className="font-mono text-xs text-[#EEE8DA]/75 mt-3 leading-relaxed">{text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Provenance Footer */}
        <div className="mt-16 flex flex-wrap gap-4 items-end justify-between border-t border-[#EEE8DA]/08 pt-6">
          <div className="font-mono text-[9px] text-[#B5B0A4] tracking-wider">
            Authoritative Dataset: NCDC / IDSP Weekly Outbreak Bulletins · Maharashtra · 2022–2026 W32
          </div>
          <div className="flex gap-6">
            {[
              ["237", "Surveillance Weeks"],
              ["809", "Analytical Records"],
              ["21,955", "Reported Cases"],
            ].map(([n, l]) => (
              <div key={l} className="text-right">
                <div className="font-serif text-2xl sm:text-3xl text-[#EEE8DA] font-bold">{n}</div>
                <div className="font-mono text-[7px] text-[#B5B0A4]/60 uppercase tracking-wider mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          02 — WHERE DID THE DATA COME FROM?
      ══════════════════════════════════════════════════════ */}
      <Section
        id="archive"
        bg="#111A2B"
        className="px-6 sm:px-14 lg:px-24 py-20 sm:py-28 border-b border-[#EEE8DA]/06"
      >
        <Label n="02" text="Surveillance Provenance" />
        <Q sub="NCDC / IDSP Weekly Epidemiological Bulletins">
          Where did this data come from?
        </Q>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 reveal-up">
          {/* Annual Surveillance Coverage */}
          <div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-[#B5B0A4] uppercase mb-4">
              Annual Surveillance Coverage & Outbreak Weeks
            </div>
            <div className="space-y-2">
              {SURVEILLANCE_COVERAGE.map((yr) => {
                const pct = yr.outbreakWeeks / yr.publishedWeeks;
                const is2026 = yr.year.includes("2026");
                return (
                  <div
                    key={yr.year}
                    className={`border border-[#EEE8DA]/08 rounded-sm p-4 ${
                      is2026 ? "border-[#C7A75B]/40 bg-[#C7A75B]/05" : "bg-[#111411]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-bold" style={{ color: is2026 ? "#C7A75B" : "#EEE8DA" }}>
                        {yr.year}
                      </span>
                      <div className="flex gap-4 font-mono text-[9px] text-[#B5B0A4]">
                        <span><span className="text-[#EEE8DA] font-bold">{yr.records}</span> records</span>
                        <span><span className="text-[#4F91B8] font-bold">{yr.publishedWeeks}</span> published</span>
                        {yr.nilWeeks > 0 && <span className="text-[#B5B0A4]/50">{yr.nilWeeks} NIL</span>}
                      </div>
                    </div>
                    <div className="w-full bg-[#EEE8DA]/06 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct * 100}%`, background: is2026 ? "#C7A75B" : "#4F91B8" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3.5 border border-[#EEE8DA]/08 bg-[#111411]/60 rounded-sm font-mono text-[9px] text-[#B5B0A4] leading-relaxed">
              <span className="text-[#C7A75B] font-bold">Surveillance Distinction: </span>
              A <span className="text-[#EEE8DA] font-bold">NIL week</span> indicates no outbreak was officially published in that bulletin. 
              It does <span className="underline">not</span> imply zero disease in Maharashtra hospitals.
            </div>
          </div>

          {/* Three Authoritative Metrics */}
          <div className="flex flex-col justify-center gap-8">
            {[
              { n: "237", l: "SURVEILLANCE WEEKS ARCHIVED", sub: "2022 to 2026 Week 32", c: "#EEE8DA" },
              { n: "809", l: "ANALYTICAL RECORDS EXTRACTED", sub: "Verified Maharashtra outbreak rows", c: "#EEE8DA" },
              { n: "21,955", l: "REPORTED CASES (2022–2025)", sub: "5 primary cohorts baseline (266 deaths)", c: "#C7A75B" },
            ].map(({ n, l, sub, c }) => (
              <div key={l} className="reveal-up border-b border-[#EEE8DA]/08 pb-5 last:border-0">
                <div className="font-serif leading-none font-bold" style={{ fontSize: "clamp(3rem,7vw,5.5rem)", color: c }}>
                  {n}
                </div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-[#B5B0A4] uppercase mt-2">{l}</div>
                <div className="font-mono text-[8px] text-[#B5B0A4]/50 mt-0.5">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          OPEN DATA — EXPLORE THE SOURCE FILES
      ══════════════════════════════════════════════════════ */}
      <Section
        id="raw-data"
        bg="#0d1209"
        className="px-6 sm:px-14 lg:px-24 py-20 sm:py-28 border-b border-[#EEE8DA]/06 editorial-grain"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[9px] text-[#C7A75B] border border-[#C7A75B]/30 px-2 py-0.5 rounded-sm uppercase tracking-widest font-bold">
              Raw Data Access
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#B5B0A4]/70 uppercase">
              Explore Beyond the Findings
            </span>
          </div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
            <div className="max-w-3xl reveal-up">
              <Q sub="Open Repository · Raw Sources · Reproducible Analysis">
                Want to explore the <span className="text-[#C7A75B] italic font-light">raw data?</span>
              </Q>
              <p className="font-mono text-sm sm:text-base text-[#B5B0A4] leading-relaxed -mt-5">
                Browse the source files behind this research, including the weekly bulletins, extracted records, field materials, and data processing pipeline.
              </p>
            </div>
            <a
              href="https://github.com/RizzyCoder19/Field-Project/tree/master"
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 inline-flex items-center justify-center gap-3 px-7 py-5 rounded-sm font-mono text-xs uppercase tracking-widest font-bold bg-[#C7A75B] text-[#111411] hover:bg-[#D4AF37] transition-colors shadow-xl reveal-up"
            >
              <span>Explore the GitHub Repository</span>
              <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#C7A75B]/20 mt-12 reveal-up">
            {[
              { path: "/raw dataset", detail: "Original weekly source files", icon: "01" },
              { path: "/data_pipeline", detail: "Processing and extraction", icon: "02" },
              { path: "/field_work", detail: "Field materials and notes", icon: "03" },
              { path: "Analysis files", detail: "Explore the research outputs", icon: "04" },
            ].map(({ path, detail, icon }) => (
              <div key={path} className="bg-[#0d1209] p-5 sm:p-6 min-h-32 flex flex-col justify-between">
                <span className="font-mono text-[9px] tracking-widest text-[#C7A75B]">{icon} / OPEN REPOSITORY</span>
                <div>
                  <div className="font-serif text-lg text-[#EEE8DA] font-bold">{path}</div>
                  <div className="font-mono text-[9px] text-[#B5B0A4]/70 mt-1">{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          03 — HOW DID WE TURN PDF DOCUMENTS INTO DATA?
      ══════════════════════════════════════════════════════ */}
      <div
        id="extraction"
        ref={pdfScene}
        className="relative w-full overflow-hidden border-b border-[#EEE8DA]/06"
        style={{ height: "100vh", background: "#0d1107" }}
      >
        <div className="absolute inset-0 px-6 sm:px-14 lg:px-24 py-16 flex flex-col justify-between">
          <div>
            <Label n="03" text="Data Engineering Pipeline" />
            <Q>How did we turn PDF documents<br /><span className="text-[#C7A75B] italic font-light">into structured data?</span></Q>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center my-auto">
            {/* Left: Source PDF Table */}
            <div ref={pdfDoc} style={{ opacity: 0 }}>
              <div className="font-mono text-[8px] text-[#B5B0A4] uppercase tracking-widest mb-2">Government Source PDF Table</div>
              <div className="bg-[#F8F5EC] rounded-sm overflow-hidden shadow-2xl text-[#111411]">
                <div className="bg-[#173F3A] px-4 py-2 flex items-center justify-between">
                  <span className="font-mono text-[8px] text-[#EEE8DA]/70 uppercase tracking-wider">NCDC / IDSP Outbreak Bulletin · Maharashtra</span>
                  <span className="font-mono text-[7px] text-[#EEE8DA]/40">Source Table</span>
                </div>
                <table className="w-full text-[10px] font-mono">
                  <thead>
                    <tr className="border-b border-[#111411]/10 bg-[#EEE8DA]/80">
                      {["State", "District", "Disease", "Cases", "Deaths"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-[8px] uppercase tracking-wider text-[#111411]/60 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { s: "Maharashtra", d: "Pune", dis: "Dengue", c: "28", de: "0", dim: true },
                      { s: "Maharashtra", d: "Kolhapur", dis: "Food Poisoning", c: "651", de: "0", focus: true },
                      { s: "Maharashtra", d: "Thane", dis: "Dengue", c: "31", de: "1", dim: true },
                      { s: "Maharashtra", d: "Gadchiroli", dis: "Malaria", c: "19", de: "0", dim: true },
                      { s: "Maharashtra", d: "Nagpur", dis: "Acute Diarrheal Disease", c: "73", de: "0", dim: true },
                    ].map((r, i) => (
                      <tr key={i} className={r.focus ? "pdf-row-focus" : ""} style={{ opacity: r.dim ? 0.35 : 1 }}>
                        <td className="px-3 py-2 text-[#111411]/60">{r.s}</td>
                        <td className="px-3 py-2 text-[#111411]">{r.d}</td>
                        <td className="px-3 py-2 text-[#111411] font-semibold">{r.dis}</td>
                        <td className={`px-3 py-2 text-right font-bold ${r.focus ? "text-[#EF4444]" : "text-[#111411]"}`}>{r.c}</td>
                        <td className="px-3 py-2 text-right text-[#111411]/50">{r.de}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Center Arrow */}
            <div ref={pdfArrow} className="flex flex-col items-center gap-1 my-2" style={{ opacity: 0, transform: "scaleY(0)" }}>
              <div className="font-mono text-[8px] text-[#C7A75B] uppercase tracking-widest">EXTRACTION</div>
              <div className="text-[#C7A75B] text-3xl">→</div>
            </div>

            {/* Right: Structured Analytical Record */}
            <div ref={pdfRecord} style={{ opacity: 0 }}>
              <div className="font-mono text-[8px] text-[#B5B0A4] uppercase tracking-widest mb-2">Structured Analytical Record</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { f: "YEAR", v: "2024" },
                  { f: "WEEK", v: "W07" },
                  { f: "DISTRICT", v: "Kolhapur" },
                  { f: "DISEASE_RAW", v: "Food Poisoning" },
                  { f: "DISEASE_CLEAN", v: "Food Poisoning", gold: true },
                  { f: "CASES", v: "651", red: true },
                  { f: "DEATHS", v: "0" },
                  { f: "SOURCE_PDF", v: "IDSP_W07_2024.pdf", small: true },
                ].map(({ f, v, gold, red, small }) => (
                  <div key={f} className="border border-[#EEE8DA]/10 bg-[#111A2B] rounded-sm p-3">
                    <div className="font-mono text-[7px] tracking-widest text-[#B5B0A4]/50 uppercase">{f}</div>
                    <div
                      className={`font-mono ${small ? "text-[10px]" : "text-sm"} font-bold truncate mt-0.5`}
                      style={{ color: gold ? "#C7A75B" : red ? "#EF4444" : "#EEE8DA" }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="font-mono text-[9px] text-[#B5B0A4]/50 text-center">
            Every record maintains immutable 1-to-1 provenance linkage back to its source PDF file and table page.
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          04 — HOW DID WE CLEAN THE RAW DISEASE LABELS?
      ══════════════════════════════════════════════════════ */}
      <Section
        id="cleaning"
        bg="#111411"
        className="px-6 sm:px-14 lg:px-24 py-20 sm:py-28 border-b border-[#EEE8DA]/06"
      >
        <Label n="04" text="Taxonomic Harmonization" />
        <Q sub="Deterministic Label Normalization">
          How did we clean the raw disease labels?
        </Q>

        <div className="reveal-up">
          <NativeTaxonomyConvergence />
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          05 — WHAT FIVE DISEASE FAMILIES DID WE ANALYZE?
      ══════════════════════════════════════════════════════ */}
      <Section
        id="cohorts"
        bg="#111A2B"
        className="px-6 sm:px-14 lg:px-24 py-20 sm:py-28 border-b border-[#EEE8DA]/06"
      >
        <Label n="05" text="Primary Cohort Baseline" />
        <Q sub="2022–2025 Completed 4-Year Baseline · 93.9% Surveillance Records">
          What five disease families did we analyze?
        </Q>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 reveal-up mb-8">
          {Object.entries(PRIMARY_DISEASES).map(([key, prof]) => (
            <div
              key={key}
              onClick={() => setFocusedDisease(focusedDisease === key ? null : key)}
              className={`p-5 rounded-sm border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                focusedDisease === key
                  ? "border-[#C7A75B] bg-[#0d1209] shadow-xl scale-[1.02]"
                  : "border-[#EEE8DA]/10 bg-[#111411]/60 hover:border-[#EEE8DA]/30"
              }`}
            >
              <div>
                <div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: prof.color }} />
                <div className="font-serif text-xl font-bold text-[#EEE8DA]">{prof.name}</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#B5B0A4] mt-1">
                  {prof.category}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EEE8DA]/08 space-y-2 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-[#B5B0A4]/60">Records</span>
                  <span className="font-bold text-[#EEE8DA]">{prof.records}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B5B0A4]/60">Cases</span>
                  <span className="font-bold" style={{ color: prof.color }}>{prof.cases.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B5B0A4]/60">Deaths</span>
                  <span className="text-[#EEE8DA]">{prof.deaths}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B5B0A4]/60">Districts</span>
                  <span className="text-[#EEE8DA]">{prof.districts} / 36</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#111411] border border-[#EEE8DA]/08 rounded-sm font-mono text-[10px] text-[#B5B0A4] text-center">
          Combined: <span className="text-[#EEE8DA] font-bold">539 primary records</span> · <span className="text-[#C7A75B] font-bold">21,955 reported cases</span> · <span className="text-[#EEE8DA] font-bold">266 reported deaths</span> across Maharashtra.
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          06 — WHEN DO THESE DISEASES APPEAR?
               Hero Scene: Five Diseases, Five Temporal Signatures
      ══════════════════════════════════════════════════════ */}
      <Section
        id="seasonality"
        bg="#111411"
        className="px-6 sm:px-14 lg:px-24 py-20 sm:py-28 border-b border-[#EEE8DA]/06"
      >
        <Label n="06" text="Seasonal Dynamics · Five Temporal Signatures" />
        <Q sub="Monthly Outbreak Distribution · 2022–2025 Baseline">
          When do these diseases actually appear?
        </Q>

        {/* Centerpiece Visual Grid: Radial Clock + Native Bar/Line Construction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal-up mb-12">
          <div className="lg:col-span-5 flex justify-center">
            <RadialSeasonalClock
              focusedDisease={focusedDisease}
              onSelectDisease={(id) => setFocusedDisease(id)}
            />
          </div>
          <div className="lg:col-span-7">
            <NativeSeasonalChart
              initialDisease={focusedDisease || "all"}
              allowToggleMode={true}
            />
          </div>
        </div>

        {/* Five Focused Analytical Summaries */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 reveal-up">
          {Object.entries(D).map(([key, meta]) => {
            const isSelected = focusedDisease === key;
            return (
              <div
                key={key}
                onClick={() => setFocusedDisease(isSelected ? null : key)}
                className={`p-4 rounded-sm border cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-[#C7A75B] bg-[#111A2B] shadow-lg scale-105"
                    : "border-[#EEE8DA]/08 bg-[#0b0f0b] hover:border-[#EEE8DA]/25"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
                  <span className="font-serif text-base font-bold text-[#EEE8DA]">{meta.label}</span>
                </div>
                <div className="font-mono text-[9px] text-[#B5B0A4] leading-relaxed">
                  {meta.short}
                </div>
              </div>
            );
          })}
        </div>

        <Rule />

        {/* Analytical Contrast: Events vs Case Divergence */}
        <div className="reveal-up">
          <NativeEventCaseDivergence />
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          07 — DO THEIR PATTERNS REPEAT ACROSS YEARS?
               Kendall's W Concordance
      ══════════════════════════════════════════════════════ */}
      <Section
        id="stability"
        bg="#111A2B"
        className="px-6 sm:px-14 lg:px-24 py-20 sm:py-28 border-b border-[#EEE8DA]/06"
      >
        <Label n="07" text="Inter-Annual Stability Testing" />
        <Q sub="Kendall's Coefficient of Concordance (W) · Tested at α = 0.05">
          Do their patterns repeat across years?
        </Q>

        <div className="reveal-up">
          <NativeKendallAlignment />
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          08 — WHERE ARE THE EVENTS CONCENTRATED?
               Real Maharashtra District Map
      ══════════════════════════════════════════════════════ */}
      <Section
        id="geography"
        bg="#0d1107"
        className="px-6 sm:px-14 lg:px-24 py-20 sm:py-28 border-b border-[#EEE8DA]/06"
      >
        <Label n="08" text="Geographical Distribution · 36 Administrative Districts" />
        <Q sub="Choropleth Footprint & Localization Analysis">
          Where are the events concentrated?
        </Q>

        <div className="reveal-up mb-8">
          <Suspense
            fallback={
              <div className="h-[440px] bg-[#0a0f0a] border border-[#EEE8DA]/06 flex items-center justify-center font-mono text-[10px] text-[#B5B0A4]">
                Loading Maharashtra District Geometry…
              </div>
            }
          >
            <MaharashtraMap className="h-[460px] sm:h-[560px]" showLegend={true} title="District Reporting Footprint" />
          </Suspense>
        </div>

        {/* Three Geographic Findings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 reveal-up">
          <div className="p-5 border border-[#38BDF8]/30 bg-[#38BDF8]/05 rounded-sm">
            <div className="font-mono text-[8px] uppercase tracking-widest text-[#38BDF8]">Dengue</div>
            <div className="font-serif text-3xl font-bold text-[#EEE8DA] mt-1">31 / 36 Districts</div>
            <div className="font-mono text-[9px] text-[#B5B0A4] mt-1 leading-relaxed">
              Near-statewide presence during late monsoon; driven by domestic and peri-domestic clean water container storage.
            </div>
          </div>

          <div className="p-5 border border-[#10B981]/30 bg-[#10B981]/05 rounded-sm">
            <div className="font-mono text-[8px] uppercase tracking-widest text-[#10B981]">ADD</div>
            <div className="font-serif text-3xl font-bold text-[#EEE8DA] mt-1">33 / 36 Districts</div>
            <div className="font-mono text-[9px] text-[#B5B0A4] mt-1 leading-relaxed">
              Broadest geographical breadth in the entire study; reflects widespread pipeline infrastructure vulnerability on heavy rainfall.
            </div>
          </div>

          <div className="p-5 border border-[#D4AF37]/50 bg-[#D4AF37]/08 rounded-sm">
            <div className="font-mono text-[8px] uppercase tracking-widest text-[#D4AF37] font-bold">Malaria Focus Cluster</div>
            <div className="font-serif text-3xl font-bold text-[#EEE8DA] mt-1">61.4% Concentrated</div>
            <div className="font-mono text-[9px] text-[#C7A75B] font-bold mt-1">
              43 of 70 events in Gadchiroli & Chandrapur only.
            </div>
            <div className="font-mono text-[8px] text-[#B5B0A4]/60 mt-1">
              Key Takeaway: A statewide seasonal pattern does NOT mean geographic uniformity.
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          09 — CAN OUTLIERS DISTORT THE STORY?
               Food Poisoning Sensitivity Analysis
      ══════════════════════════════════════════════════════ */}
      <Section
        id="outlier"
        bg="#150a08"
        className="px-6 sm:px-14 lg:px-24 py-20 sm:py-28 border-b border-[#EEE8DA]/06"
      >
        <Label n="09" text="Sensitivity Analysis · Point-Source Distortion" />
        <Q sub="Food Poisoning February Exposure Clusters">
          Can a few huge outbreaks distort the whole story?
        </Q>

        <div className="reveal-up">
          <NativeOutlierDecomposition />
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          10 — WHAT DOES THE PARTIAL 2026 WINDOW SHOW?
      ══════════════════════════════════════════════════════ */}
      <Section
        id="year2026"
        bg="#111A2B"
        className="px-6 sm:px-14 lg:px-24 py-20 sm:py-28 border-b border-[#EEE8DA]/06"
      >
        <Label n="10" text="Out-of-Sample Surveillance Window" />
        <Q sub="2026 W01 through W32 · Explicit Truncation Boundary">
          What does the partial 2026 window show?
        </Q>

        <div className="reveal-up">
          <NativeTimeline2026 />
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          11 — WHAT DID I SEE IN THE FIELD?
               Cinematic Transition & Direct Observation
      ══════════════════════════════════════════════════════ */}
      <div
        ref={fieldTransition}
        className="relative w-full flex flex-col items-center justify-center text-center py-28 sm:py-36 px-6 border-b border-[#EEE8DA]/06 bg-black"
      >
        <div className="field-char font-mono text-[10px] tracking-[0.35em] text-[#C7A75B] uppercase mb-6">
          Beyond Secondary Government Bulletins
        </div>
        <div className="field-char font-serif text-[clamp(2.4rem,5vw,4.5rem)] text-[#EEE8DA] font-bold leading-tight max-w-3xl">
          The data shows the statewide pattern.
        </div>
        <div className="field-char font-serif text-[clamp(2.4rem,5vw,4.5rem)] text-[#89947C] italic font-light mt-2 leading-tight max-w-3xl">
          The field shows the local operational context.
        </div>
        <div className="field-char mt-10 font-mono text-[9px] text-[#B5B0A4]/60 tracking-[0.2em] uppercase">
          02 October 2026 · Nallasopara West · Palghar, Maharashtra
        </div>
        <div className="field-char mt-2 font-mono text-[8px] text-[#C7A75B] tracking-wider uppercase font-bold">
          ONE FACILITY · ONE KEY-INFORMANT INTERVIEW · ONE STRUCTURED OBSERVATION
        </div>
      </div>

      <Section id="fieldwork" bg="#0a0d08" className="border-b border-[#EEE8DA]/06">
        {/* Actual Facility Hero Image */}
        <div className="w-full relative" style={{ height: "60vh", minHeight: 340 }}>
          <img
            src="/fieldwork/nalasopara-vvcmc-hospital-nalasopara-west-palghar-hospitals-1jNorUByyf.webp"
            alt="PHC Nallasopara West — VVMC Health Post"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.65) contrast(1.1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-14 lg:px-24 py-8">
            <div className="font-mono text-[9px] text-[#89947C] uppercase tracking-widest mb-1">
              Fieldwork Site Verification
            </div>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] text-[#EEE8DA] font-bold leading-tight">
              PHC Nallasopara West
            </h2>
            <div className="font-serif text-lg text-[#C7A75B] mt-0.5">Vasai-Virar City Municipal Corporation (VVMC) Health Post</div>
            <div className="flex flex-wrap gap-4 mt-3 font-mono text-[9px] text-[#EEE8DA]/60">
              <span>📅 Date: 02 October 2026</span>
              <span>⏰ Time: 10:30 AM – 11:45 AM</span>
              <span>📍 Location: Kala Krida Ground area, Palghar</span>
            </div>
          </div>
        </div>

        {/* Boundary Notice */}
        <div className="px-6 sm:px-14 lg:px-24 py-5 border-b border-[#EEE8DA]/06 flex flex-wrap gap-3 font-mono text-[8px] uppercase tracking-wider">
          <span className="px-3 py-1 border border-[#89947C]/40 text-[#89947C] rounded-sm">
            Primary Qualitative Field Evidence
          </span>
          <span className="px-3 py-1 border border-[#EEE8DA]/15 text-[#B5B0A4] rounded-sm">
            One Local Government Facility · One Medical Officer
          </span>
          <span className="px-3 py-1 border border-[#EF4444]/30 text-[#EF4444] rounded-sm">
            No Community Survey · No Patient-Level Dataset
          </span>
        </div>

        {/* Direct Observations Log */}
        <div className="px-6 sm:px-14 lg:px-24 py-16">
          <Label n="11" text="Direct Environmental Observations" />
          <p className="font-mono text-xs text-[#B5B0A4] mb-8 max-w-2xl leading-relaxed">
            Observations recorded on-site between 10:30 AM and 11:45 AM. Kept strictly separate from informant statements.
          </p>

          <div className="space-y-1.5 reveal-up">
            {[
              ["10:30–10:45", "High morning patient activity: dense registration queue and pharmacy waiting line observed."],
              ["10:45–11:00", "Pediatric and adult fever attendance visibly present in OPD waiting corridors."],
              ["11:00–11:10", "Dengue & Malaria prevention signage prominently displayed at facility entrance."],
              ["11:10–11:20", "Marathi and Hindi public health posters: Clean water storage, 'Dry Day' weekly tank emptying."],
              ["11:20–11:30", "Water-safety, chlorination, and hand-hygiene posters near dispensing counters."],
              ["11:30–11:38", "External survey: Open concrete storm drains with localized silt accumulation along perimeter."],
              ["11:38–11:42", "Small stagnant rainwater pools observed in unpaved road depressions near construction margins."],
              ["11:42–11:45", "Municipal waste container present; localized scattered plastic waste noted."],
              ["11:45",       "Visible Abate / temephos larvicide inspection markings stenciled on adjacent building entries."],
            ].map(([time, note]) => (
              <div key={time} className="flex gap-4 py-3 border-b border-[#EEE8DA]/05 text-xs font-mono">
                <span className="text-[#C7A75B] w-24 shrink-0 font-bold">{time}</span>
                <span className="text-[#89947C] shrink-0 font-bold">OBS</span>
                <span className="text-[#EEE8DA]/75 leading-relaxed">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          12 — WHAT DID THE MEDICAL OFFICER REPORT?
               Key-Informant Interview
      ══════════════════════════════════════════════════════ */}
      <Section
        id="interview"
        bg="#111A2B"
        className="px-6 sm:px-14 lg:px-24 py-20 sm:py-28 border-b border-[#EEE8DA]/06"
      >
        <Label n="12" text="Key-Informant Interview" />
        <Q sub="Medical Officer In-Charge · PHC Nallasopara West · 02 Oct 2026">
          What did the Medical Officer report?
        </Q>

        <p className="font-mono text-xs text-[#B5B0A4]/70 mb-8 max-w-2xl">
          Paraphrased key findings from structured interview field notes. No invented quotes or respondents.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-up">
          {[
            {
              title: "Local Seasonal Disease Descriptions",
              content:
                "The Medical Officer reported that Dengue cases rise notably from September through November, linked to stagnant water in indoor containers during post-monsoon dry spells. Malaria occurs primarily between July and September. Gastrointestinal illnesses surge immediately in June–August with monsoon onset. Chikungunya presents sporadically post-monsoon.",
            },
            {
              title: "Local Fever Burden",
              content:
                "The Medical Officer reported an elevated fever season from July to October, with an acute local peak observed during August and September, straining morning OPD capacity.",
            },
            {
              title: "Surveillance & Response Workflow",
              content:
                "Daily physical OPD registers are reviewed. When multiple cases cluster from the same lane or chawl, an internal alert is triggered: Multi-Purpose Health Workers (MPHW) and ASHA workers conduct field verification, active fever surveys, and targeted larvicide application.",
            },
            {
              title: "Operational Data Needs",
              content:
                "The Medical Officer identified critical operational needs: automated ward-level cluster alerts, weekly OPD fever trend tracking versus confirmed laboratory cases, vector-density mapping, and simplified early-warning interfaces.",
            },
          ].map((item) => (
            <div key={item.title} className="p-5 bg-[#111411] border border-[#EEE8DA]/10 rounded-sm">
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#C7A75B] font-bold mb-2">
                {item.title}
              </div>
              <p className="font-mono text-xs text-[#EEE8DA]/80 leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          13 — HOW DOES LOCAL CONTEXT RELATE TO THE STATEWIDE DATA?
               Government Data vs. Local Facility
      ══════════════════════════════════════════════════════ */}
      <Section
        id="comparison"
        bg="#111411"
        className="px-6 sm:px-14 lg:px-24 py-20 sm:py-28 border-b border-[#EEE8DA]/06"
      >
        <Label n="13" text="Contextual Triangulation" />
        <Q sub="Statewide Surveillance Archive ↔ Local Facility Operations">
          How does local context relate to the statewide data?
        </Q>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EEE8DA]/08 reveal-up mb-8">
          {/* Left Column: Government Surveillance */}
          <div className="bg-[#0b0f0b] p-8">
            <div className="font-mono text-[8px] uppercase tracking-widest text-[#38BDF8] font-bold mb-1">
              What the Government Data Shows
            </div>
            <div className="font-mono text-[8px] text-[#B5B0A4]/50 mb-6">
              NCDC / IDSP · Maharashtra Baseline · 2022–2025
            </div>
            <div className="space-y-4 font-mono text-xs">
              <div>
                <span className="text-[#38BDF8] font-bold">Dengue: </span>
                <span className="text-[#EEE8DA]">June–October concentration with an October peak (40 events). Kendall W = 0.405.</span>
              </div>
              <div>
                <span className="text-[#D4AF37] font-bold">Malaria: </span>
                <span className="text-[#EEE8DA]">May–July pre-monsoon surge. 61.4% concentrated in Gadchiroli + Chandrapur.</span>
              </div>
              <div>
                <span className="text-[#10B981] font-bold">ADD: </span>
                <span className="text-[#EEE8DA]">June–August peak. Only disease with statistically significant rank concordance (W = 0.530, p = 0.016).</span>
              </div>
              <div>
                <span className="text-[#EF4444] font-bold">Food Poisoning: </span>
                <span className="text-[#EEE8DA]">Bimodal: Jan–Feb and Apr–May. Three records account for 27.3% of 4-year baseline cases.</span>
              </div>
              <div>
                <span className="text-[#A78BFA] font-bold">Chikungunya: </span>
                <span className="text-[#EEE8DA]">No stable recurring monthly pattern (W = 0.150, p = 0.832).</span>
              </div>
            </div>
          </div>

          {/* Right Column: Local Facility Report */}
          <div className="bg-[#0e1411] p-8">
            <div className="font-mono text-[8px] uppercase tracking-widest text-[#89947C] font-bold mb-1">
              What the Local Medical Officer Reported
            </div>
            <div className="font-mono text-[8px] text-[#B5B0A4]/50 mb-6">
              PHC Nallasopara West · Key-Informant Interview · 02 Oct 2026
            </div>
            <div className="space-y-4 font-mono text-xs">
              <div>
                <span className="text-[#89947C] font-bold">Dengue: </span>
                <span className="text-[#EEE8DA]">September–November clinical peak. Domestic water drum storage drives vector breeding.</span>
              </div>
              <div>
                <span className="text-[#89947C] font-bold">Malaria: </span>
                <span className="text-[#EEE8DA]">July–September reported locally. Road/construction puddles noted as localized sites.</span>
              </div>
              <div>
                <span className="text-[#89947C] font-bold">ADD: </span>
                <span className="text-[#EEE8DA]">June–August onset surge aligns with state data; caused by first heavy monsoon pipe cross-contamination.</span>
              </div>
              <div>
                <span className="text-[#89947C] font-bold">Food Poisoning: </span>
                <span className="text-[#EEE8DA]">Presents as sudden acute cohorts (15–40 patients) following community feasts, distinct from steady ADD.</span>
              </div>
              <div>
                <span className="text-[#89947C] font-bold">Chikungunya: </span>
                <span className="text-[#EEE8DA]">Sporadic post-monsoon household presentations without a single dominant month.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Methodological Context Note */}
        <div className="p-4 bg-[#111A2B] border border-[#EEE8DA]/10 rounded-sm font-mono text-xs text-[#EEE8DA]/75 italic leading-relaxed reveal-up">
          &ldquo;The NCDC/IDSP layer summarizes reported surveillance events across Maharashtra, while the field interview represents one local government health facility. The comparison is contextual rather than a statistical validation exercise.&rdquo;
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          14 — WHAT CAN WE ACTUALLY CONCLUDE?
      ══════════════════════════════════════════════════════ */}
      <Section
        id="conclusion"
        bg="#111411"
        className="min-h-screen flex flex-col justify-between px-6 sm:px-14 lg:px-24 py-20 sm:py-28 editorial-grain"
      >
        <div>
          <Label n="14" text="Synthesis & Final Verdict" />
          <Q sub="The Analytical Arc: From Paper Records to Field Ground Truth">
            What can we actually conclude?
          </Q>

          {/* Research Storyline Spine */}
          <div className="flex flex-col gap-1 mb-14 reveal-up">
            {[
              "01. Government PDF Bulletins Archived (237 weeks, 809 raw records)",
              "02. Extraction Pipeline Preserved Immutable Document Provenance",
              "03. Normalization Condensed 116 Raw Strings into 5 Primary Cohorts (93.9% records)",
              "04. Five Distinct Temporal Signatures Emerged from 2022–2025 Baseline",
              "05. ADD Is the Only Disease with Statistically Significant Concordance (W = 0.530, p = 0.016)",
              "06. Malaria Shows Heavy Spatial Localization (61.4% in Gadchiroli + Chandrapur)",
              "07. Food Poisoning Demonstrates Radical Event-Frequency vs Case-Volume Divergence",
              "08. Sensitivity Analysis Confirmed 3 Outlier Records Dictate the February Peak",
              "09. 2026 Surveillance Ends at W32, Precluding Full-Year Comparison",
              "10. Field Observation at PHC Nallasopara West Confirmed Local Operational Realities",
              "11. State Surveillance & Local Facility Observations Provide Complementary Perspectives",
            ].map((step, idx) => (
              <div key={step} className="flex items-center gap-3 py-1 font-mono text-xs text-[#B5B0A4]">
                <span className="text-[#C7A75B] font-bold">{String(idx + 1).padStart(2, "0")}.</span>
                <span>{step.slice(4)}</span>
              </div>
            ))}
          </div>

          {/* Final Large Presentation Conclusion */}
          <div className="border-t border-[#EEE8DA]/08 pt-10 reveal-up">
            <div className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold text-[#EEE8DA] leading-tight">
              The pattern is seasonal.
            </div>
            <div className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] text-[#89947C] italic font-light leading-tight">
              The context is local.
            </div>
            <div className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-[#C7A75B] leading-tight mt-1">
              The interpretation needs both.
            </div>
          </div>
        </div>

        {/* Action Button & Metadata */}
        <div className="mt-16 pt-8 border-t border-[#EEE8DA]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-serif text-xl font-bold text-[#EEE8DA]">Khan Umar</div>
            <div className="font-mono text-[9px] text-[#B5B0A4] uppercase">B.Sc. Data Science · Semester III</div>
            <div className="font-mono text-[9px] text-[#B5B0A4]">RP Institute · Affiliated to University of Mumbai</div>
            <div className="font-mono text-[9px] text-[#C7A75B] mt-1 font-bold">Project Guide: [Confirm before submission]</div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/RizzyCoder19/Field-Project/tree/master"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 font-mono text-[10px] uppercase tracking-widest font-bold rounded border border-[#C7A75B]/50 text-[#C7A75B] hover:bg-[#C7A75B]/15 transition-all shadow-md flex items-center gap-2"
            >
              <span>GitHub Database</span>
              <span>↗</span>
            </a>
            <Link
              href="/print"
              target="_blank"
              className="px-6 py-3 font-mono text-[10px] uppercase tracking-widest font-bold rounded bg-[#C7A75B] text-[#111411] hover:bg-[#D4AF37] transition-all shadow-xl flex items-center gap-2"
            >
              <span>📄</span> Export Presentation PDF
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
