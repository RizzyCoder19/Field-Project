"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Film,
  Grid3X3,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
} from "lucide-react";

export interface InvestigativeMovement {
  id: string;
  movementNumber: string;
  title: string;
  subtitle: string;
  description: string;
  actIds: string[];
}

export interface DocumentaryAct {
  id: string;
  actNumber: string;
  title: string;
  shortTitle: string;
  movementId: string;
  category: "Provenance" | "Pipeline" | "Seasonality" | "Diseases" | "Geography" | "Stability" | "Outliers" | "Fieldwork" | "Timeline" | "Findings";
  categoryLabel: string;
  path: string;
  question: string;
  description: string;
  keyMetric: string;
  metricLabel: string;
  image: string;
  imageAlt: string;
  tag: string;
  coordinates: string;
}

export const INVESTIGATIVE_MOVEMENTS: InvestigativeMovement[] = [
  {
    id: "movement-1",
    movementNumber: "MOVEMENT I",
    title: "The Surveillance Foundation",
    subtitle: "From Dispersed Archives to Clean Scientific Evidence",
    description: "Harmonizing 237 weekly NCDC government bulletins into an auditable epidemiological research cohort across 36 districts.",
    actIds: ["act-01", "act-02"],
  },
  {
    id: "movement-2",
    movementNumber: "MOVEMENT II",
    title: "The Epidemiological Signatures",
    subtitle: "Climatic Synchrony, Pathogen Biology & Spatial Corridors",
    description: "Western Ghats monsoon rains trigger twin annual waves, contrasting universal urban Dengue with hyper-localized Vidarbha forest Malaria.",
    actIds: ["act-03", "act-04", "act-05"],
  },
  {
    id: "movement-3",
    movementNumber: "MOVEMENT III",
    title: "Mathematical & Ground Proofs",
    subtitle: "Concordance, Sensitivity Models & Clinical Reality",
    description: "Proving statistical recurrence via Kendall's W, testing outlier sensitivity against banquet mega-outbreaks, and ground truth in Palghar.",
    actIds: ["act-06", "act-07", "act-08"],
  },
  {
    id: "movement-4",
    movementNumber: "MOVEMENT IV",
    title: "Synthesis & Public Health Action",
    subtitle: "Ongoing Monitoring & Operational Prevention Windows",
    description: "Evaluating the provisional 2026 window and translating quantitative findings into 5 actionable seasonal intervention pillars.",
    actIds: ["act-09", "act-10"],
  },
];

export const DOCUMENTARY_ACTS: DocumentaryAct[] = [
  {
    id: "act-01",
    actNumber: "01",
    title: "The Unmined Surveillance Vault",
    shortTitle: "Surveillance Vault",
    movementId: "movement-1",
    category: "Provenance",
    categoryLabel: "Data Extraction",
    path: "/data",
    question: "Why did 237 weekly government outbreak bulletins sit unanalyzed across Maharashtra?",
    description: "National Centre for Disease Control (NCDC) weekly PDF bulletins contain verified field epidemiologist outbreak reports that have never previously been compiled into an open, auditable multi-year dataset.",
    keyMetric: "237 Bulletins (2022–2025)",
    metricLabel: "100% Extraction Coverage",
    image: "/images/acts/act1-provenance.jpg",
    imageAlt: "Government health surveillance archive with leather-bound ledgers and scientific documentation",
    tag: "PHASE 1 / ARCHIVE DISCOVERY",
    coordinates: "NCDC · 237 WEEKLY BULLETINS",
  },
  {
    id: "act-02",
    actNumber: "02",
    title: "12-Stage Data Provenance Pipeline",
    shortTitle: "Harmonization Pipeline",
    movementId: "movement-1",
    category: "Pipeline",
    categoryLabel: "Methodology",
    path: "/method",
    question: "How do you systematically convert messy unstructured PDFs into audited scientific data?",
    description: "A reproducible 12-stage pipeline: PDF scraping, table bounding-box recognition, district name normalization across 36 districts, diagnostic verification, and dual-researcher cross-validation.",
    keyMetric: "539 Audited Records",
    metricLabel: "12 Additive Stages",
    image: "/images/acts/act2-pipeline.jpg",
    imageAlt: "Data engineering matrix showing data processing pipelines and algorithmic flowcharts",
    tag: "PHASE 1 / REPRODUCIBILITY",
    coordinates: "12 PIPELINE TRANSFORMS",
  },
  {
    id: "act-03",
    actNumber: "03",
    title: "The Sahyadri Monsoon Inversion",
    shortTitle: "Monsoon Inversion",
    movementId: "movement-2",
    category: "Seasonality",
    categoryLabel: "Climatic Rhythm",
    path: "/seasonality",
    question: "Why do disease outbreaks across Maharashtra surge twice every year in exact climatic synchrony?",
    description: "Southwest monsoon onset in June unleashes immediate waterborne enteric infection spikes, followed by a secondary September–November vector-borne surge as stagnant floodwaters breed Aedes mosquitoes.",
    keyMetric: "CR3 = 50.5% Concentration",
    metricLabel: "June · September · October",
    image: "/images/acts/act2-seasonality.jpg",
    imageAlt: "Dramatic monsoon rain clouds rolling over lush green Western Ghats mountains in Maharashtra",
    tag: "PHASE 2 / CLIMATIC RHYTHM",
    coordinates: "SAHYADRI · JUNE–OCTOBER SURGE",
  },
  {
    id: "act-04",
    actNumber: "04",
    title: "Five Diseases, Five Seasonal Signatures",
    shortTitle: "Pathogen Curves",
    movementId: "movement-2",
    category: "Diseases",
    categoryLabel: "Pathogen Biology",
    path: "/diseases",
    question: "How do pathogen biology, transmission mechanics, and community habits shape epidemic curves?",
    description: "Compare the 5x12 monthly dynamics of Dengue, ADD, Malaria, Food Poisoning, and Chikungunya with the interactive 12-month radial clock and trendlines in the dedicated chapter.",
    keyMetric: "5 Pathogen Cohorts",
    metricLabel: "20,955 Reported Cases",
    image: "/images/acts/act3-diseases.jpg",
    imageAlt: "Medical microbiology research laboratory with optical microscope and glowing bacterial cultures",
    tag: "PHASE 2 / 5 SEASONAL SIGNATURES",
    coordinates: "MICROBIOLOGY · 5 PATHOGENS",
  },
  {
    id: "act-05",
    actNumber: "05",
    title: "Where Are Outbreaks Concentrated?",
    shortTitle: "Spatial Landscape",
    movementId: "movement-2",
    category: "Geography",
    categoryLabel: "Spatial Footprint",
    path: "/geography",
    question: "Are outbreaks diffused evenly across all 36 districts, or concentrated in hyper-focal ecological hot spots?",
    description: "Universal urban transmission for Dengue and ADD contrasts sharply with the severe focal concentration of Malaria in eastern tribal forest corridors.",
    keyMetric: "36 Districts · 61.4% Vidarbha",
    metricLabel: "Focal Forest Malaria Corridor",
    image: "/images/acts/act4-geography.jpg",
    imageAlt: "Topographic aerial view of Maharashtra geography showing coastal plains, Western Ghats, and Deccan plateau",
    tag: "PHASE 2 / SPATIAL DYNAMICS",
    coordinates: "36 DISTRICTS · 539 OUTBREAKS",
  },
  {
    id: "act-06",
    actNumber: "06",
    title: "Is Monsoon Timing Repeatable?",
    shortTitle: "Kendall's Concordance",
    movementId: "movement-3",
    category: "Stability",
    categoryLabel: "Mathematical Proof",
    path: "/stability",
    question: "Can we prove mathematically that seasonal disease timing is recurrent and not random year-to-year variation?",
    description: "Year-over-year Kendall's W coefficient concordance test across 4 surveillance years confirms strong, statistically significant periodicity that validates predictive preparedness windows.",
    keyMetric: "Kendall's W = 0.528",
    metricLabel: "p < 0.001 Non-Random Repeatability",
    image: "/images/acts/act5-stability.jpg",
    imageAlt: "Mathematical matrix data visualization with golden statistical heatmaps and coordinate graphs",
    tag: "PHASE 3 / STATISTICAL RIGOR",
    coordinates: "KENDALL CONCORDANCE PROOF",
  },
  {
    id: "act-07",
    actNumber: "07",
    title: "Beyond Averages: Extreme Outliers",
    shortTitle: "Outlier Decomposition",
    movementId: "movement-3",
    category: "Outliers",
    categoryLabel: "Robustness Check",
    path: "/outliers",
    question: "Do massive multi-hundred case banquet food poisoning outbreaks distort the overall seasonal picture?",
    description: "Sensitivity analysis separating mean case counts from median baseline reveals that massive single-event food contamination spikes distort raw totals but leave vector seasonal curves intact.",
    keyMetric: "7.8x Case Ratio",
    metricLabel: "Mean 38.9 vs Median 5.0",
    image: "/images/acts/act6-outliers.jpg",
    imageAlt: "Atmospheric evening festive banquet gathering with celebratory buffet and warm lighting",
    tag: "PHASE 3 / SENSITIVITY TESTING",
    coordinates: "ROBUSTNESS · PARETO CHECK",
  },
  {
    id: "act-08",
    actNumber: "08",
    title: "Ground Truth in Palghar",
    shortTitle: "Fieldwork Reality",
    movementId: "movement-3",
    category: "Fieldwork",
    categoryLabel: "Ethnographic Validation",
    path: "/fieldwork",
    question: "How do dry government statistics translate into actual physical conditions inside primary healthcare centres?",
    description: "In-person ethnographic inspection at Palghar Urban Health Post reveals the physical drivers of outbreaks: intermittent piped water, open plastic drum storage, and clinical register lag.",
    keyMetric: "Palghar UHP Fieldwork",
    metricLabel: "Field Interviews & Storage Inspection",
    image: "/images/acts/act8-fieldwork.webp",
    imageAlt: "Public health clinical observation facility with medical staff reviewing patient registries",
    tag: "PHASE 3 / PHYSICAL GROUND TRUTH",
    coordinates: "PALGHAR UHP · FIELD STUDY",
  },
  {
    id: "act-09",
    actNumber: "09",
    title: "The 2026 Shift: Dengue & Chikungunya",
    shortTitle: "2026 Surveillance Shift",
    movementId: "movement-4",
    category: "Timeline",
    categoryLabel: "Recent Surveillance",
    path: "/comparison-2026",
    question: "Are historical seasonal patterns continuing in 2026, or are new climate anomalies shifting transmission windows?",
    description: "Provisional 2026 surveillance data shows earlier post-monsoon vector proliferation, with Chikungunya reporting larger relative surges in urban peripheral districts.",
    keyMetric: "Provisional 2026 Registry",
    metricLabel: "Surveillance Trend Comparison",
    image: "/images/acts/act7-year2026.jpg",
    imageAlt: "High-tech public health emergency operations center with glowing digital telemetry screens",
    tag: "PHASE 4 / REAL-TIME MONITORING",
    coordinates: "2026 PROVISIONAL HORIZON",
  },
  {
    id: "act-10",
    actNumber: "10",
    title: "Synthesis of Evidence & Action",
    shortTitle: "Actionable Interventions",
    movementId: "movement-4",
    category: "Findings",
    categoryLabel: "Policy Translation",
    path: "/findings",
    question: "How can health authorities translate these empirical findings into proactive, lifesaving prevention windows?",
    description: "Five targeted public health interventions tied directly to empirical trigger dates: Pre-monsoon pipe chlorination in May, vector drum inspections in August, and tribal forest bed nets in June.",
    keyMetric: "5 Actionable Windows",
    metricLabel: "Targeted Public Health Strategy",
    image: "/images/acts/act9-findings.jpg",
    imageAlt: "Sunrise photograph over clean drinking water station and pipeline infrastructure in rural Maharashtra",
    tag: "PHASE 4 / SYNTHESIS & REPORT",
    coordinates: "ACTIONABLE OPERATIONAL WINDOWS",
  },
];

const CATEGORY_FILTERS = [
  { id: "all", label: "All 10 Acts" },
  { id: "movement-1", label: "I. Surveillance Foundation" },
  { id: "movement-2", label: "II. Epidemiological Signatures" },
  { id: "movement-3", label: "III. Mathematical & Ground Proofs" },
  { id: "movement-4", label: "IV. Translation & Policy" },
];

export default function CinematicChapterNavigator() {
  const [activeActIndex, setActiveActIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState<"spotlight" | "grid">("spotlight");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [reducedMotion, setReducedMotion] = useState(false);

  const stageImageRef = useRef<HTMLDivElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);

  // Detect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const activeAct = DOCUMENTARY_ACTS[activeActIndex] || DOCUMENTARY_ACTS[0];
  const activeMovement = INVESTIGATIVE_MOVEMENTS.find((m) => m.id === activeAct.movementId) || INVESTIGATIVE_MOVEMENTS[0];

  // Cursor Parallax Drift Effect on Active Spotlight
  const handleStageMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !stageImageRef.current || !stageContainerRef.current) return;
    const rect = stageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    const offsetX = x * -14;
    const offsetY = y * -9;

    stageImageRef.current.style.transform = `scale(1.08) translate3d(${offsetX}px, ${offsetY}px, 0)`;
  }, [reducedMotion]);

  const handleStageMouseEnter = useCallback(() => {
    if (reducedMotion || !stageImageRef.current) return;
    stageImageRef.current.style.transition = "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
    stageImageRef.current.style.transform = "scale(1.08) translate3d(0, 0, 0)";
  }, [reducedMotion]);

  const handleStageMouseLeave = useCallback(() => {
    if (reducedMotion || !stageImageRef.current) return;
    stageImageRef.current.style.transition = "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    stageImageRef.current.style.transform = "scale(1) translate3d(0, 0, 0)";
  }, [reducedMotion]);

  const handleNextAct = () => {
    setActiveActIndex((prev) => (prev + 1) % DOCUMENTARY_ACTS.length);
  };

  const handlePrevAct = () => {
    setActiveActIndex((prev) => (prev - 1 + DOCUMENTARY_ACTS.length) % DOCUMENTARY_ACTS.length);
  };

  // Filtered movements for divided grid mode
  const displayedMovements = selectedFilter === "all"
    ? INVESTIGATIVE_MOVEMENTS
    : INVESTIGATIVE_MOVEMENTS.filter((m) => m.id === selectedFilter);

  return (
    <section
      id="documentary-portal"
      className="relative w-full bg-[#070A0F] border-b border-[#F0DECE]/12 py-10 sm:py-16 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28 select-none overflow-hidden text-[#F0DECE]"
      aria-label="Investigative Documentary Portal"
    >
      <div className="max-w-[1360px] mx-auto space-y-8">

        {/* ── SECTION HEADER & VIEW CONTROLLER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#590907] rotate-45 shrink-0 ring-1 ring-[#E8D2B5]/40" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-[#F0DECE] uppercase">
                THE 10-ACT DOCUMENTARY PORTAL
              </span>
              <span className="text-white/20">|</span>
              <span className="text-[11px] font-mono text-[#A5A79B]">4 Thematic Movements · 10 Chapters</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F0DECE] tracking-tight">
              Investigate the Outbreak Landscape
            </h2>
            <p className="text-sm sm:text-base text-[#BAC0B8] max-w-3xl leading-relaxed">
              Navigate the empirical investigation sequentially across four research movements, or jump directly into any chapter below.
            </p>
          </div>

          {/* Mode Switcher: Spotlight Stage vs All 10 Acts Gallery */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center p-1 bg-[#0E141D] border border-[#F0DECE]/20 rounded-xs shadow-md">
              <button
                onClick={() => setDisplayMode("spotlight")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-2xs transition-colors cursor-pointer ${
                  displayMode === "spotlight"
                    ? "bg-[#8B1414] text-[#F0DECE] font-bold shadow-md border border-[#F0DECE]/30"
                    : "text-[#A5A79B] hover:text-[#F0DECE] font-medium"
                }`}
                aria-label="Spotlight Stage View"
              >
                <Film className="w-3.5 h-3.5" />
                <span>Spotlight Stage</span>
              </button>
              <button
                onClick={() => setDisplayMode("grid")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-2xs transition-colors cursor-pointer ${
                  displayMode === "grid"
                    ? "bg-[#8B1414] text-[#F0DECE] font-bold shadow-md border border-[#F0DECE]/30"
                    : "text-[#A5A79B] hover:text-[#E8D2B5]"
                }`}
                aria-label="10-Act Gallery Grid"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>All 10 Acts</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            MODE A: SPOTLIGHT STAGE (CINEMATIC FOCUS WITH DIVIDED FILMSTRIP)
            ══════════════════════════════════════════════════════════════════ */}
        {displayMode === "spotlight" && (
          <div className="space-y-6">

            {/* Active Stage Box */}
            <div
              ref={stageContainerRef}
              onMouseMove={handleStageMouseMove}
              onMouseEnter={handleStageMouseEnter}
              onMouseLeave={handleStageMouseLeave}
              className="relative w-full h-[500px] sm:h-[560px] lg:h-[600px] rounded-xs overflow-hidden border border-[#F0DECE]/20 shadow-[0_20px_60px_rgba(0,0,0,0.95)] group transition-all duration-300"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#590907] z-20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#590907] z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#590907] z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#590907] z-20 pointer-events-none" />

              {/* Background Photo with Parallax Drift */}
              <div
                ref={stageImageRef}
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: "scale(1) translate3d(0, 0, 0)",
                  transition: reducedMotion ? "none" : "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <Image
                  src={activeAct.image}
                  alt={activeAct.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1280px"
                  className="object-cover object-center filter brightness-[0.70] contrast-[1.10]"
                />
              </div>

              {/* Vignettes & Filmic Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-[#070A0F]/85 via-50% to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070A0F]/95 via-[#070A0F]/65 via-42% to-transparent" />
              <div className="absolute inset-0 bg-contour-pattern opacity-20 mix-blend-screen pointer-events-none" />

              {/* Top Film Metadata Bar */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 px-2.5 py-1 bg-[#07090C]/90 backdrop-blur-md border border-[#590907]/60 rounded-xs">
                  <span className="w-1.5 h-1.5 bg-[#590907] rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-[#E8D2B5] tracking-widest uppercase">
                    {activeAct.tag}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#07090C]/85 backdrop-blur-md border border-white/10 rounded-xs text-[10px] font-mono text-[#A5A79B]">
                  <MapPin className="w-3.5 h-3.5 text-[#590907]" />
                  <span>{activeAct.coordinates}</span>
                </div>
              </div>

              {/* Central Research Narrative Typography Overlay */}
              <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-10 space-y-4 max-w-3xl">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A5A79B] uppercase tracking-wider font-semibold">
                    <span>Act {activeAct.actNumber} of 10</span>
                    <span className="text-white/20">·</span>
                    <span className="px-2 py-0.5 bg-[#590907]/25 border border-[#590907]/50 rounded-2xs text-[10px] text-[#E8D2B5]">
                      {activeMovement.movementNumber}: {activeMovement.title}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#E8D2B5] tracking-tight leading-[1.08] drop-shadow-[0_6px_32px_rgba(0,0,0,0.95)]">
                    {activeAct.title}
                  </h3>

                  <p className="font-serif text-base sm:text-xl lg:text-2xl text-[#F7EAD7] italic font-light leading-relaxed max-w-3xl drop-shadow-md">
                    {activeAct.question}
                  </p>

                  <p className="text-sm sm:text-base text-[#A5A79B] line-clamp-2 max-w-3xl leading-relaxed font-sans">
                    {activeAct.description}
                  </p>
                </div>

                {/* Key Empirical Metric Badge & Action Trigger */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <div className="px-4 py-2 bg-[#07090C]/90 backdrop-blur-md border border-[#E8D2B5]/30 rounded-xs flex items-center gap-3">
                    <span className="text-sm sm:text-base font-mono font-bold text-[#E8D2B5]">
                      {activeAct.keyMetric}
                    </span>
                    <span className="h-3 w-px bg-white/20" />
                    <span className="text-[10px] font-mono text-[#A5A79B] uppercase">
                      {activeAct.metricLabel}
                    </span>
                  </div>

                  <Link
                    href={activeAct.path}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#590907] hover:bg-[#7E1513] text-[#E8D2B5] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_8px_32px_rgba(89,9,7,0.7)] rounded-xs transition-all shadow-[0_6px_24px_rgba(89,9,7,0.6)] hover:shadow-[0_8px_32px_rgba(89,9,7,0.85)] border border-[#E8D2B5]/30 cursor-pointer group/btn"
                  >
                    <span>Enter Act {activeAct.actNumber} Chapter</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Left / Right Stage Arrow Navigators */}
              <button
                onClick={handlePrevAct}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#07090C]/85 hover:bg-[#590907] border border-[#E8D2B5]/25 hover:border-[#590907] text-[#E8D2B5] flex items-center justify-center transition-all cursor-pointer z-30 backdrop-blur-md shadow-xl"
                aria-label="Previous Act"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextAct}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#07090C]/85 hover:bg-[#590907] border border-[#E8D2B5]/25 hover:border-[#590907] text-[#E8D2B5] flex items-center justify-center transition-all cursor-pointer z-30 backdrop-blur-md shadow-xl"
                aria-label="Next Act"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* ── FILMSTRIP DIVIDED BY 4 RESEARCH MOVEMENTS ── */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A5A79B] border-b border-white/[0.08] pb-2">
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#590907]" />
                  <span className="uppercase tracking-wider font-semibold text-[#E8D2B5]">The Four Movements · Select Act:</span>
                </div>
                <span className="text-[11px] text-[#A5A79B]">
                  Currently Viewing: <strong className="text-[#E8D2B5]">Act {activeAct.actNumber} ({activeMovement.movementNumber})</strong>
                </span>
              </div>

              {/* 4 Thematic Movement Blocks in Filmstrip */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {INVESTIGATIVE_MOVEMENTS.map((mov) => {
                  const movActs = DOCUMENTARY_ACTS.filter((a) => a.movementId === mov.id);
                  const isCurrentMovement = mov.id === activeMovement.id;

                  return (
                    <div
                      key={mov.id}
                      className={`p-2.5 rounded-xs border transition-all ${
                        isCurrentMovement
                          ? "bg-[#180808] border border-[#8B1414] shadow-xl ring-1 ring-[#8B1414]"
                          : "bg-[#0E141D] border-[#F0DECE]/12 text-[#F0DECE]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10.5px] font-mono mb-2">
                        <span className={`font-bold ${isCurrentMovement ? "text-[#E8D2B5]" : "text-[#A5A79B]"}`}>
                          {mov.movementNumber}
                        </span>
                        <span className="text-[9.5px] text-[#A5A79B] truncate max-w-[120px]">
                          {mov.title}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-2 gap-1.5">
                        {movActs.map((act) => {
                          const actIndex = DOCUMENTARY_ACTS.findIndex((a) => a.id === act.id);
                          const isActive = actIndex === activeActIndex;

                          return (
                            <button
                              key={act.id}
                              onClick={() => setActiveActIndex(actIndex)}
                              className={`relative aspect-[16/10] rounded-xs overflow-hidden border text-left p-1.5 flex flex-col justify-between transition-all cursor-pointer group ${
                                isActive
                                  ? "border-[#590907] ring-2 ring-[#590907]/70 shadow-[0_0_12px_rgba(89,9,7,0.5)] scale-[1.03]"
                                  : "border-white/[0.08] hover:border-[#E8D2B5]/30 opacity-75 hover:opacity-100"
                              }`}
                              aria-label={`Select Act ${act.actNumber}: ${act.shortTitle}`}
                            >
                              <Image
                                src={act.image}
                                alt={act.imageAlt}
                                fill
                                className="object-cover object-center filter brightness-[0.55] group-hover:brightness-[0.8] transition-all"
                                sizes="140px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                              <div className="relative z-10 flex items-center justify-between w-full">
                                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-2xs ${
                                  isActive
                                    ? "bg-[#590907] text-[#E8D2B5] border border-[#E8D2B5]/30"
                                    : "bg-black/70 text-[#A5A79B]"
                                }`}>
                                  {act.actNumber}
                                </span>
                              </div>

                              <div className="relative z-10">
                                <span className="text-[10px] font-serif font-bold text-[#E8D2B5] line-clamp-1 block group-hover:text-[#F7EAD7]">
                                  {act.shortTitle}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            MODE B: ALL 10 ACTS GALLERY (SEPARATED BY 4 MOVEMENTS)
            ══════════════════════════════════════════════════════════════════ */}
        {displayMode === "grid" && (
          <div className="space-y-8">

            {/* Filter Movement Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {CATEGORY_FILTERS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors cursor-pointer ${
                    selectedFilter === cat.id
                      ? "bg-[#590907] text-[#E8D2B5] font-bold border border-[#E8D2B5]/30 shadow-md"
                      : "text-[#A5A79B] hover:text-[#E8D2B5] bg-[#0B0E13] border border-white/[0.08]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Divided Movement Sections */}
            <div className="space-y-10">
              {displayedMovements.map((mov) => {
                const movActs = DOCUMENTARY_ACTS.filter((act) => act.movementId === mov.id);

                return (
                  <div key={mov.id} className="space-y-4 pt-4 border-t border-white/[0.08] first:border-t-0 first:pt-0">
                    {/* Movement Section Divider Header */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-mono font-bold text-[#E8D2B5] bg-[#590907] px-2 py-0.5 rounded-2xs uppercase tracking-wider">
                          {mov.movementNumber}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F0DECE]">
                          {mov.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#BAC0B8] font-sans">
                        {mov.subtitle}
                      </p>
                    </div>

                    {/* Photographic Grid of Cards for this Movement */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {movActs.map((act) => (
                        <ActPosterCard key={act.id} act={act} reducedMotion={reducedMotion} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

// ── SUB-COMPONENT: INDIVIDUAL CINEMATIC ACT POSTER CARD WITH CURSOR ZOOM ──
function ActPosterCard({ act, reducedMotion }: { act: DocumentaryAct; reducedMotion: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion || !imageRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    const offsetX = x * -10;
    const offsetY = y * -7;

    imageRef.current.style.transform = `scale(1.09) translate3d(${offsetX}px, ${offsetY}px, 0)`;
  }, [reducedMotion]);

  const handleMouseEnter = useCallback(() => {
    if (reducedMotion || !imageRef.current) return;
    imageRef.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    imageRef.current.style.transform = "scale(1.09) translate3d(0, 0, 0)";
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (reducedMotion || !imageRef.current) return;
    imageRef.current.style.transition = "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
    imageRef.current.style.transform = "scale(1) translate3d(0, 0, 0)";
  }, [reducedMotion]);

  return (
    <Link
      href={act.path}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[420px] sm:h-[460px] rounded-xs overflow-hidden border border-white/[0.10] hover:border-[#590907] transition-all flex flex-col justify-between p-5 shadow-xl hover:shadow-[0_12px_36px_rgba(89,9,7,0.45)] cursor-pointer"
      aria-label={`Enter Act ${act.actNumber}: ${act.title}`}
    >
      {/* Background Photographic Image with Cursor Zoom */}
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{
          transform: "scale(1) translate3d(0, 0, 0)",
          transition: reducedMotion ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <Image
          src={act.image}
          alt={act.imageAlt}
          fill
          className="object-cover object-center filter brightness-[0.66] group-hover:brightness-[0.85] transition-all"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Editorial Filmic Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07090C] via-[#07090C]/80 via-50% to-[#07090C]/30" />
      <div className="absolute inset-0 bg-contour-pattern opacity-15 mix-blend-screen pointer-events-none" />

      {/* Top Metadata Header */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="px-2 py-0.5 bg-[#07090C]/90 border border-[#590907]/60 text-[10px] font-mono font-bold text-[#E8D2B5] uppercase rounded-2xs">
          ACT {act.actNumber}
        </span>
        <span className="text-[10px] font-mono text-[#A5A79B] uppercase tracking-wider px-2 py-0.5 bg-[#07090C]/80 rounded-2xs border border-white/5">
          {act.categoryLabel}
        </span>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 space-y-2.5">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#E8D2B5] group-hover:text-[#F7EAD7] transition-colors leading-tight">
          {act.title}
        </h3>

        <p className="text-sm text-[#A5A79B] line-clamp-3 leading-relaxed font-sans">
          {act.question}
        </p>

        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <span className="text-[#E8D2B5] text-[11px] font-semibold">
            {act.keyMetric}
          </span>
          <div className="flex items-center gap-1 text-[#E8D2B5] group-hover:text-[#F7EAD7] transition-colors">
            <span>Enter</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#590907] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
