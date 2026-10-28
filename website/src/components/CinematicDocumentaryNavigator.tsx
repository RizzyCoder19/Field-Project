"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Film,
  Grid3X3,
  Sparkles,
  Clock,
  MapPin,
  Activity,
  Layers,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  BarChart3,
  Calendar,
  AlertTriangle,
  Database,
  ExternalLink,
} from "lucide-react";

export interface DocumentaryAct {
  id: string;
  actNumber: string;
  title: string;
  shortTitle: string;
  category: "Provenance" | "Seasonality" | "Diseases" | "Geography" | "Stability" | "Outliers" | "Timeline" | "Fieldwork" | "Findings";
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

export const DOCUMENTARY_ACTS: DocumentaryAct[] = [
  {
    id: "study-scope",
    actNumber: "01",
    title: "Where Did This Data Come From?",
    shortTitle: "Data Provenance",
    category: "Provenance",
    categoryLabel: "Surveillance Archive",
    path: "/data",
    question: "How does raw government surveillance transform into an auditable epidemiological cohort?",
    description: "Follow the 12-stage extraction pipeline harmonizing 237 weekly NCDC bulletins into 539 investigated outbreaks across 36 districts.",
    keyMetric: "237 Bulletins · 539 Records",
    metricLabel: "73.5% Primary Baseline Cohort",
    image: "/images/acts/act1-provenance.jpg",
    imageAlt: "Government epidemiology surveillance archives with official IDSP records and analytical monitor",
    tag: "EPISODE 01 / PROVENANCE",
    coordinates: "NCDC · 2022–2025 BASELINE",
  },
  {
    id: "seasonal-rhythm",
    actNumber: "02",
    title: "Do Disease Outbreaks Follow the Calendar?",
    shortTitle: "The Seasonal Rhythm",
    category: "Seasonality",
    categoryLabel: "Temporal Cycles",
    path: "/seasonality",
    question: "Do epidemic waves strike randomly, or do they synchronize with Maharashtra's monsoon cycle?",
    description: "Discover the twin annual waves: rapid early-monsoon waterborne surges in June–July, followed by late-monsoon vector-borne peaks in September–October.",
    keyMetric: "68.3% Jun–Nov",
    metricLabel: "Monsoon Synchronization",
    image: "/images/acts/act2-seasonality.jpg",
    imageAlt: "Dramatic monsoon rain clouds rolling over lush green Western Ghats mountains in Maharashtra",
    tag: "EPISODE 02 / CLIMATIC RHYTHM",
    coordinates: "SAHYADRI · JUNE–OCTOBER SURGE",
  },
  {
    id: "disease-patterns",
    actNumber: "03",
    title: "Five Diseases, Five Seasonal Signatures",
    shortTitle: "Disease Patterns",
    category: "Diseases",
    categoryLabel: "Pathogen Biology",
    path: "/diseases",
    question: "How do pathogen biology, transmission mechanics, and community habits shape epidemic curves?",
    description: "Compare the 5x12 monthly heatmap rows for Dengue, ADD, Malaria, Food Poisoning, and Chikungunya with event vs case divergence.",
    keyMetric: "5 Pathogen Cohorts",
    metricLabel: "20,955 Reported Cases",
    image: "/images/acts/act3-diseases.jpg",
    imageAlt: "Medical microbiology research laboratory with optical microscope and glowing bacterial cultures",
    tag: "EPISODE 03 / PATHOGEN DYNAMICS",
    coordinates: "MICROBIOLOGY · 5 PATHOGENS",
  },
  {
    id: "geography",
    actNumber: "04",
    title: "Where Are Outbreaks Concentrated?",
    shortTitle: "Maharashtra Geography",
    category: "Geography",
    categoryLabel: "Spatial Footprint",
    path: "/geography",
    question: "Are outbreaks diffused evenly across all 36 districts, or concentrated in hyper-focal ecological hot spots?",
    description: "Universal urban transmission for Dengue and ADD contrasts sharply with the severe focal concentration of Malaria in eastern tribal forest corridors.",
    keyMetric: "36 Districts · 61.4% Vidarbha",
    metricLabel: "Focal Forest Malaria Corridor",
    image: "/images/acts/act4-geography.jpg",
    imageAlt: "Aerial twilight photograph over Maharashtra coastline, Western Ghats ridges, and eastern river plains",
    tag: "EPISODE 04 / SPATIAL CLUSTERS",
    coordinates: "GADCHIROLI & CHANDRAPUR FOCUS",
  },
  {
    id: "repeatability",
    actNumber: "05",
    title: "Do Seasonal Peaks Repeat Every Year?",
    shortTitle: "Test Repeatability",
    category: "Stability",
    categoryLabel: "Statistical Proofs",
    path: "/stability",
    question: "Are annual epidemic surges predictable recurring cycles, or artifacts of random chance?",
    description: "Rigorous non-parametric Kendall rank concordance (W) across 2022–2025 proving statistically significant recurrence at p < 0.05.",
    keyMetric: "W = 0.530 (p = 0.016)",
    metricLabel: "ADD Significant Stability",
    image: "/images/acts/act5-stability.jpg",
    imageAlt: "Antique brass astronomical chronometer and cyclical clockwork mechanism with data charts",
    tag: "EPISODE 05 / KENDALL CONCORDANCE",
    coordinates: "4-YEAR RANK CONCORDANCE PROOF",
  },
  {
    id: "outliers",
    actNumber: "06",
    title: "Can One Event Distort the Whole Story?",
    shortTitle: "Outlier Sensitivity",
    category: "Outliers",
    categoryLabel: "Sensitivity Models",
    path: "/outliers",
    question: "Do rare mega-outbreaks skew conclusions, or do findings remain stable when extreme events are removed?",
    description: "Interactive waterfall decomposition testing the impact of the three largest food poisoning banquet outbreaks totaling 1,615 cases.",
    keyMetric: "3 Mega-Outliers",
    metricLabel: "1,615 Banquet Cases Decomposed",
    image: "/images/acts/act6-outliers.jpg",
    imageAlt: "Traditional evening outdoor community feast banquet in rural Maharashtra with copper pots and festoon bulbs",
    tag: "EPISODE 06 / OUTLIER WATERFALL",
    coordinates: "MASS-EXPOSURE BANQUET CLUSTERS",
  },
  {
    id: "year2026",
    actNumber: "07",
    title: "What Does the Provisional 2026 Window Show?",
    shortTitle: "Provisional 2026",
    category: "Timeline",
    categoryLabel: "Ongoing Monitoring",
    path: "/comparison-2026",
    question: "How do ongoing 2026 weekly surveillance observations compare against historical 2022–2025 baselines?",
    description: "Week-by-week timeline across Weeks 01 to 32 (45 records, 2,126 cases, 0 deaths) with strict non-annualization scientific governance.",
    keyMetric: "W01–W32 (45 Records)",
    metricLabel: "0 Deaths · Do Not Annualize",
    image: "/images/acts/act7-year2026.jpg",
    imageAlt: "Modern public health monitoring operations center with curved glowing monitors and disease dashboards",
    tag: "EPISODE 07 / MATCHED WINDOW",
    coordinates: "WEEKS 01–32 PARTIAL OBSERVATION",
  },
  {
    id: "fieldwork",
    actNumber: "08",
    title: "From Statewide Numbers to the Primary Clinic",
    shortTitle: "Palghar Fieldwork",
    category: "Fieldwork",
    categoryLabel: "Empirical Ground Truth",
    path: "/fieldwork",
    question: "How do central surveillance figures translate into clinical reality at an Urban Health Post in Palghar?",
    description: "Ground qualitative triangulation at Nallasopara West: patient triage queues, rapid diagnostic testing, and the 2–3 week paper reporting latency.",
    keyMetric: "Palghar Urban Health Post",
    metricLabel: "3-Tier Triangulation Evidence",
    image: "/images/acts/act8-fieldwork.webp",
    imageAlt: "Patient triage queue outside Urban Health Post in Nallasopara West, Palghar District",
    tag: "EPISODE 08 / FIELD EVIDENCE",
    coordinates: "NALLASOPARA WEST · 02 OCT 2026",
  },
  {
    id: "findings",
    actNumber: "09",
    title: "Evidence for Public Health Action",
    shortTitle: "Findings & Actions",
    category: "Findings",
    categoryLabel: "Policy Translation",
    path: "/findings",
    question: "How can epidemiological findings translate into life-saving seasonal preparedness and surveillance modernization?",
    description: "Five targeted public-health interventions mapped to disease timing, balanced by five explicit methodological limitations and downloadable PDF.",
    keyMetric: "5 Action Pillars",
    metricLabel: "5 Explicit Scientific Caveats",
    image: "/images/acts/act9-findings.jpg",
    imageAlt: "Sunrise photograph over clean drinking water station and pipeline infrastructure in rural Maharashtra",
    tag: "EPISODE 09 / SYNTHESIS & REPORT",
    coordinates: "ACTIONABLE OPERATIONAL WINDOWS",
  },
];

const CATEGORY_FILTERS = [
  { id: "all", label: "All 9 Acts" },
  { id: "Provenance", label: "Data Archive" },
  { id: "Seasonality", label: "Seasonal Rhythm" },
  { id: "Diseases", label: "Diseases" },
  { id: "Geography", label: "Geography" },
  { id: "Stability", label: "Repeatability" },
  { id: "Fieldwork", label: "Fieldwork" },
  { id: "Findings", label: "Findings & Policy" },
];

export default function CinematicChapterNavigator() {
  const [activeActIndex, setActiveActIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState<"spotlight" | "grid">("spotlight");
  const [selectedCategory, setSelectedCategory] = useState("all");
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

  // Filtered acts for Grid Mode
  const filteredActs = selectedCategory === "all"
    ? DOCUMENTARY_ACTS
    : DOCUMENTARY_ACTS.filter((act) => act.category === selectedCategory);

  const handleNextAct = () => {
    setActiveActIndex((prev) => (prev + 1) % DOCUMENTARY_ACTS.length);
  };

  const handlePrevAct = () => {
    setActiveActIndex((prev) => (prev - 1 + DOCUMENTARY_ACTS.length) % DOCUMENTARY_ACTS.length);
  };

  return (
    <section
      id="documentary-portal"
      className="relative w-full bg-[#07090C] border-b border-[#E8D2B5]/15 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28 select-none overflow-hidden"
      aria-label="Documentary Chapters Portal"
    >
      {/* Background Editorial Glow Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#590907]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A5A79B]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto space-y-6 relative z-10">

        {/* ── SECTION HEADER & VIEW CONTROLS ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#590907] rotate-45 shrink-0 ring-1 ring-[#E8D2B5]/40" />
              <span className="text-[11px] font-mono font-bold tracking-[0.22em] text-[#E8D2B5] uppercase">
                RESEARCH DOCUMENTARY ARCHITECTURE
              </span>
              <span className="text-white/20">|</span>
              <span className="text-[11px] font-mono text-[#A5A79B]">9 Interactive Episodes</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E8D2B5] tracking-tight">
              Choose your research chapter
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A79B] max-w-2xl leading-relaxed">
              Explore Maharashtra&apos;s seasonal disease surveillance through nine curated documentary acts. Hover to experience the cinematic camera drift, then enter any chapter.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <div className="flex items-center p-1 bg-[#0B0E13] border border-[#E8D2B5]/20 rounded-xs">
              <button
                onClick={() => setDisplayMode("spotlight")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-2xs transition-colors cursor-pointer ${
                  displayMode === "spotlight"
                    ? "bg-[#590907] text-[#E8D2B5] font-bold shadow-md border border-[#E8D2B5]/30"
                    : "text-[#A5A79B] hover:text-[#E8D2B5]"
                }`}
                aria-label="Spotlight Stage View"
              >
                <Film className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Spotlight</span>
              </button>
              <button
                onClick={() => setDisplayMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-2xs transition-colors cursor-pointer ${
                  displayMode === "grid"
                    ? "bg-[#590907] text-[#E8D2B5] font-bold shadow-md border border-[#E8D2B5]/30"
                    : "text-[#A5A79B] hover:text-[#E8D2B5]"
                }`}
                aria-label="9-Act Gallery Grid"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">All 9 Acts</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── MODE A: SPOTLIGHT STAGE WITH FILMSTRIP (DEFAULT) ── */}
        {displayMode === "spotlight" && (
          <div className="space-y-6">

            {/* Featured Active Stage with Cursor Parallax Zoom */}
            <div
              ref={stageContainerRef}
              onMouseMove={handleStageMouseMove}
              onMouseEnter={handleStageMouseEnter}
              onMouseLeave={handleStageMouseLeave}
              className="relative w-full h-[480px] sm:h-[540px] lg:h-[580px] rounded-xs overflow-hidden border border-[#E8D2B5]/25 shadow-[0_20px_60px_rgba(0,0,0,0.95)] group"
            >
              {/* Corner Accents echoing the Hero */}
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
                  className="object-cover object-center filter brightness-[0.72] contrast-[1.10]"
                />
              </div>

              {/* Vignettes & Filmic Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090C] via-[#07090C]/80 via-50% to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07090C]/95 via-[#07090C]/65 via-42% to-transparent" />
              <div className="absolute inset-0 bg-contour-pattern opacity-20 mix-blend-screen pointer-events-none" />

              {/* Top Film Metadata Bar */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-none z-10">
                <div className="flex items-center gap-2 px-2.5 py-1 bg-[#07090C]/90 backdrop-blur-md border border-[#590907]/60 rounded-xs">
                  <span className="w-1.5 h-1.5 bg-[#590907] rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-[#E8D2B5] tracking-widest uppercase">
                    {activeAct.tag}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#07090C]/85 backdrop-blur-md border border-white/10 rounded-xs text-[10px] font-mono text-[#A5A79B]">
                  <MapPin className="w-3 h-3 text-[#590907]" />
                  <span>{activeAct.coordinates}</span>
                </div>
              </div>

              {/* Central Research Narrative Typography Overlay */}
              <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-10 space-y-4 max-w-3xl">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A5A79B] uppercase tracking-wider font-semibold">
                    <span>Act {activeAct.actNumber} of 09</span>
                    <span className="text-white/20">·</span>
                    <span className="px-2 py-0.5 bg-[#590907]/25 border border-[#590907]/50 rounded-2xs text-[10px] text-[#E8D2B5]">
                      {activeAct.categoryLabel}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E8D2B5] tracking-tight leading-snug drop-shadow-lg">
                    {activeAct.title}
                  </h3>

                  <p className="font-serif text-sm sm:text-base text-[#E8D2B5] italic font-light">
                    {activeAct.question}
                  </p>

                  <p className="text-xs sm:text-sm text-[#A5A79B] line-clamp-2 max-w-2xl leading-relaxed">
                    {activeAct.description}
                  </p>
                </div>

                {/* Key Empirical Metric Badge & Action Trigger */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <div className="px-3 py-1.5 bg-[#07090C]/90 backdrop-blur-md border border-[#E8D2B5]/20 rounded-xs flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-[#E8D2B5]">
                      {activeAct.keyMetric}
                    </span>
                    <span className="h-3 w-px bg-white/20" />
                    <span className="text-[10px] font-mono text-[#A5A79B] uppercase">
                      {activeAct.metricLabel}
                    </span>
                  </div>

                  <Link
                    href={activeAct.path}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#590907] hover:bg-[#7E1513] text-[#E8D2B5] font-bold text-xs uppercase tracking-wider rounded-xs transition-all shadow-[0_6px_24px_rgba(89,9,7,0.6)] hover:shadow-[0_8px_32px_rgba(89,9,7,0.85)] border border-[#E8D2B5]/30 cursor-pointer group/btn"
                  >
                    <span>Enter Act {activeAct.actNumber}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Left / Right Stage Arrow Navigators */}
              <button
                onClick={handlePrevAct}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#07090C]/85 hover:bg-[#590907] border border-[#E8D2B5]/25 hover:border-[#590907] text-[#E8D2B5] flex items-center justify-center transition-all cursor-pointer z-20 backdrop-blur-md shadow-xl"
                aria-label="Previous Act"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextAct}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#07090C]/85 hover:bg-[#590907] border border-[#E8D2B5]/25 hover:border-[#590907] text-[#E8D2B5] flex items-center justify-center transition-all cursor-pointer z-20 backdrop-blur-md shadow-xl"
                aria-label="Next Act"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Filmstrip Episode Selector Track */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A5A79B]">
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#590907]" />
                  <span className="uppercase tracking-wider">Select Episode to Inspect</span>
                </div>
                <span>{activeActIndex + 1} / 9</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 overflow-x-auto pb-1">
                {DOCUMENTARY_ACTS.map((act, index) => {
                  const isActive = index === activeActIndex;
                  return (
                    <button
                      key={act.id}
                      onClick={() => setActiveActIndex(index)}
                      className={`relative aspect-[16/10] rounded-xs overflow-hidden border text-left p-2 flex flex-col justify-between transition-all cursor-pointer group ${
                        isActive
                          ? "border-[#590907] ring-2 ring-[#590907]/60 shadow-[0_0_18px_rgba(89,9,7,0.5)] scale-[1.03]"
                          : "border-white/[0.08] hover:border-[#E8D2B5]/30 opacity-75 hover:opacity-100"
                      }`}
                      aria-label={`Select Act ${act.actNumber}: ${act.shortTitle}`}
                    >
                      {/* Thumbnail Image */}
                      <Image
                        src={act.image}
                        alt={act.imageAlt}
                        fill
                        className="object-cover object-center filter brightness-[0.55] group-hover:brightness-[0.8] transition-all"
                        sizes="160px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      {/* Card Content Overlay */}
                      <div className="relative z-10 flex items-center justify-between w-full">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-2xs ${
                          isActive ? "bg-[#590907] text-[#E8D2B5] border border-[#E8D2B5]/30" : "bg-black/60 text-[#A5A79B]"
                        }`}>
                          {act.actNumber}
                        </span>
                      </div>

                      <div className="relative z-10">
                        <span className="text-[11px] font-serif font-bold text-[#E8D2B5] line-clamp-1 block group-hover:text-[#F7EAD7] transition-colors">
                          {act.shortTitle}
                        </span>
                        <span className="text-[9px] font-mono text-[#A5A79B] block uppercase tracking-wider">
                          {act.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ── MODE B: ALL 9 ACTS CINEMATIC POSTER GALLERY ── */}
        {displayMode === "grid" && (
          <div className="space-y-6">

            {/* Filter Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {CATEGORY_FILTERS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#590907] text-[#E8D2B5] font-bold border border-[#E8D2B5]/30 shadow-md"
                      : "text-[#A5A79B] hover:text-[#E8D2B5] bg-[#0B0E13] border border-white/[0.08]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 3x3 Photographic Grid with Individual Parallax Zoom */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredActs.map((act) => (
                <ActPosterCard key={act.id} act={act} reducedMotion={reducedMotion} />
              ))}
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
      className="group relative h-[360px] sm:h-[400px] rounded-xs overflow-hidden border border-white/[0.10] hover:border-[#590907] transition-all flex flex-col justify-between p-5 shadow-xl hover:shadow-[0_12px_36px_rgba(89,9,7,0.45)] cursor-pointer"
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
          className="object-cover object-center filter brightness-[0.68] group-hover:brightness-[0.85] transition-all"
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
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#E8D2B5] group-hover:text-[#F7EAD7] transition-colors leading-snug">
          {act.title}
        </h3>

        <p className="text-xs text-[#A5A79B] line-clamp-2 leading-relaxed">
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
