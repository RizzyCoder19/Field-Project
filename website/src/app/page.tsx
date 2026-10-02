"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Calendar, MapPin, User, AlertCircle, CheckCircle2, ChevronDown, ChevronUp,
  ArrowRight, Activity, ShieldAlert, BookOpen, Layers, Clock, Droplets, 
  Flame, Sparkles, Filter, Database, BarChart3, TrendingUp, Info, Eye, Check, 
  FileText, Stethoscope, Microscope, Building, Compass, AlertTriangle, ShieldCheck
} from "lucide-react";
import { 
  PRIMARY_DISEASES, MONTHS, MONTH_FULL, RESEARCH_METRICS, SURVEILLANCE_COVERAGE, 
  OUTLIER_SENSITIVITY_DATA, DiseaseProfile 
} from "@/data/researchData";

// Comprehensive 25-Question Field Record
const INTERVIEW_QUESTIONS = [
  {
    section: "Section A: Seasonal Disease Patterns",
    sectionId: "sec-a",
    theme: "01 · SEASONAL PATTERNS",
    questions: [
      {
        qNum: "Q1",
        question: "Which illnesses tend to increase during particular seasons?",
        response: "The Medical Officer reported that Acute Respiratory Infections (ARI) rise primarily in winter months, while Dengue, Malaria, Gastroenteritis / Acute Diarrheal Disease (ADD), Leptospirosis, and Typhoid increase during and immediately following the monsoon season."
      },
      {
        qNum: "Q2",
        question: "During which calendar months is the peak volume of fever-related cases observed?",
        response: "Fever-related presentations surge between July and October, with a marked local concentration observed during August and September."
      },
      {
        qNum: "Q3",
        question: "What is the relative timing between vector-borne diseases and water-borne gastrointestinal infections?",
        response: "The Medical Officer observed that vector-borne infections (Dengue and Malaria) typically peak immediately after prolonged or heavy monsoon spells as water stabilizes, whereas gastrointestinal infections crest during the peak monsoon period characterized by active flooding and water supply disruption."
      },
      {
        qNum: "Q4",
        question: "Do different vector-borne illnesses exhibit distinct seasonal onset in the local area?",
        response: "Yes. Malaria cases typically manifest earlier during the initial monsoon phase (July–August), Dengue shows a pronounced surge in the late-monsoon and post-monsoon period (September–November), while Chikungunya occurs sporadically in the post-monsoon window."
      },
      {
        qNum: "Q5",
        question: "What specific window characterizes local Dengue activity?",
        response: "September through November represents the predominant window of elevated Dengue presentations at the facility."
      },
      {
        qNum: "Q6",
        question: "What specific window characterizes local Malaria presentations?",
        response: "July through September represents the primary window of local Malaria detection, with Vivax predominant."
      },
      {
        qNum: "Q7",
        question: "What specific window characterizes local Acute Diarrheal presentations?",
        response: "June through August represents the acute surge window for gastrointestinal cases, closely aligned with early monsoon municipal drainage saturation."
      }
    ]
  },
  {
    section: "Section B: Surveillance & Cluster Detection",
    sectionId: "sec-b",
    theme: "02 · SURVEILLANCE & NOTIFICATION",
    questions: [
      {
        qNum: "Q8",
        question: "How are unusual clusters or sudden spikes of illness identified at the health post level?",
        response: "Daily OPD registers are screened. If multiple patients originating from the exact same locality, chawl, or informal settlement present with concordant symptoms (e.g., high fever with chills or watery diarrhea), an internal cluster flag is triggered."
      },
      {
        qNum: "Q9",
        question: "What initial response is initiated when a local cluster is identified?",
        response: "The Medical Officer immediately mobilizes Multi-Purpose Health Workers (MPHW) and Accredited Social Health Activists (ASHA) to conduct door-to-door fever surveys, contact tracing, and targeted larvicide application in the implicated pocket."
      },
      {
        qNum: "Q10",
        question: "To which administrative authorities are weekly surveillance figures transmitted?",
        response: "Daily and weekly surveillance reports are transmitted hierarchically to the Chief Medical Officer of Vasai-Virar City Municipal Corporation (VVMC) and the District Health Officer (DHO) of Palghar District."
      },
      {
        qNum: "Q11",
        question: "How does the Integrated Disease Surveillance Programme (IDSP) reporting format function locally?",
        response: "Facility staff record surveillance information across standard IDSP channels: Form S (syndromic surveillance by health workers), Form P (presumptive diagnosis by medical officers), and Form L (laboratory-confirmed cases)."
      },
      {
        qNum: "Q12",
        question: "What operational challenges exist in capturing every community infection?",
        response: "Heavy daily OPD patient volume, administrative documentation load, floating migrant populations, incomplete residential contact details, and under-reporting or reporting delays from smaller private nursing homes."
      },
      {
        qNum: "Q13",
        question: "What time latency exists between clinical presentation and laboratory confirmation?",
        response: "Presumptive syndromic diagnosis occurs at point of care, but official laboratory serological confirmation (e.g., ELISA) typically introduces a 24 to 48-hour reporting lag into official surveillance registers."
      },
      {
        qNum: "Q14",
        question: "Are private clinics and practitioners in the vicinity reporting regularly?",
        response: "Mandatory disease notification directives exist for vector-borne diseases; however, compliance among smaller standalone private dispensaries remains variable, with cases often notified only when severe hospitalization occurs."
      }
    ]
  },
  {
    section: "Section C: Public Health & Vector Control Response",
    sectionId: "sec-c",
    theme: "03 · PUBLIC HEALTH RESPONSE",
    questions: [
      {
        qNum: "Q15",
        question: "What proactive measures are initiated immediately prior to and during the monsoon?",
        response: "Pre-monsoon drain desilting, domestic water container inspections, routine distribution of chlorine tablets to vulnerable households, and pre-positioning essential medication buffers."
      },
      {
        qNum: "Q16",
        question: "What chemical vector abatement protocols are deployed locally?",
        response: "Application of Temephos (Abate) liquid emulsion in open stormwater drains, overhead tanks, and construction margins, paired with thermal fogging in localities recording active fever clusters."
      },
      {
        qNum: "Q17",
        question: "How is community health education conducted?",
        response: "Direct OPD counselling, distribution of bilingual IEC pamphlets (Marathi and Hindi), and door-to-door community engagement led by ASHA workers advocating weekly 'Dry Days' to empty water storage drums."
      },
      {
        qNum: "Q18",
        question: "What is the standard facility protocol for diarrheal illness surges?",
        response: "Free point-of-care distribution of Oral Rehydration Salts (ORS) and Medichlor chlorine solution, accompanied by physical demonstration of sanitary oral solution preparation to caregivers."
      },
      {
        qNum: "Q19",
        question: "What structural urban condition poses the greatest vector control barrier?",
        response: "Extremely high population density combined with rapid, ongoing residential construction, which creates temporary stagnant water depressions alongside constrained municipal manpower."
      }
    ]
  },
  {
    section: "Section D: Food Poisoning Management",
    sectionId: "sec-d",
    theme: "04 · FOODBORNE ILLNESS DYNAMICS",
    questions: [
      {
        qNum: "Q20",
        question: "How common are mass food poisoning outbreaks in the facility jurisdiction?",
        response: "Food poisoning events are reported as sporadic rather than continuous. Massive mass-exposure incidents are uncommon at the primary level, but localized clusters of 5 to 10 individuals sharing contaminated food items occur occasionally."
      },
      {
        qNum: "Q21",
        question: "What is the clinical and administrative protocol upon encountering a food poisoning cluster?",
        response: "Immediate clinical triage with intravenous fluids and antiemetics, logging cases in the emergency register, urgent notification to the Municipal Health Officer, and dispatch of sanitary inspectors to examine food sources."
      },
      {
        qNum: "Q22",
        question: "Which regulatory bodies are alerted when public catering or commercial food is implicated?",
        response: "The VVMC Public Health Department is informed immediately, and joint inspection referrals are forwarded to the local Food and Drug Administration (FDA) where commercial vendors are involved."
      }
    ]
  },
  {
    section: "Section E: Data & Technology Requirements",
    sectionId: "sec-e",
    theme: "05 · FRONTLINE DATA NEEDS",
    questions: [
      {
        qNum: "Q23",
        question: "Is timely weekly surveillance information useful for clinical operational planning?",
        response: "Yes. Weekly epidemiological pattern analysis enables proactive clinical pre-positioning of IV normal saline, ORS, paracetamol, rapid diagnostic test kits, and larvicidal chemicals ahead of historical seasonal surges."
      },
      {
        qNum: "Q24",
        question: "What specific digital information would most assist frontline clinical decision-makers?",
        response: "Automated ward-level and pocket-level outbreak alerts, visualization of multi-week fever footfall trends versus serologically confirmed cases, and localized vector-density maps."
      },
      {
        qNum: "Q25",
        question: "Would a real-time municipal surveillance dashboard assist health post operations?",
        response: "A simplified, non-cumbersome digital dashboard mapping localized disease clusters in real-time was considered highly valuable for optimizing field worker deployment and clinical resource rationing."
      }
    ]
  }
];

export default function CinematicPresentationPage() {
  // Interactive UI states
  const [activeDiseaseTab, setActiveDiseaseTab] = useState<string>("dengue");
  const [showAllDiseases, setShowAllDiseases] = useState<boolean>(false);
  const [metricMode, setMetricMode] = useState<"events" | "cases">("events");
  const [outlierToggled, setOutlierToggled] = useState<boolean>(true);
  const [pipelineStage, setPipelineStage] = useState<number>(4);
  const [hoveredMonthIdx, setHoveredMonthIdx] = useState<number | null>(null);
  const [expandedAccordionSection, setExpandedAccordionSection] = useState<string | null>(null);

  // Animated counters state
  const [countWeeks, setCountWeeks] = useState(0);
  const [countOutbreakWeeks, setCountOutbreakWeeks] = useState(0);
  const [countNilWeeks, setCountNilWeeks] = useState(0);
  const [countRecords, setCountRecords] = useState(0);
  const [countCases, setCountCases] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const dataSectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<SVGSVGElement>(null);

  // Initialize GSAP & ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero headline reveal
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-masthead", {
          y: -25,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out"
        })
        .from(".hero-title-line", {
          y: 60,
          opacity: 0,
          duration: 1.1,
          stagger: 0.18,
          ease: "power3.out"
        }, "-=0.5")
        .from(".hero-gold-rule", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4")
        .from(".hero-desc", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.3")
        .from(".hero-meta", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.2");

      // 2. Data Archive Counter Animation
      ScrollTrigger.create({
        trigger: "#data",
        start: "top 75%",
        once: true,
        onEnter: () => {
          const counterObj = { weeks: 0, outbreaks: 0, nils: 0, records: 0, cases: 0 };
          gsap.to(counterObj, {
            weeks: 237,
            outbreaks: 203,
            nils: 34,
            records: 809,
            cases: 21955,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              setCountWeeks(Math.floor(counterObj.weeks));
              setCountOutbreakWeeks(Math.floor(counterObj.outbreaks));
              setCountNilWeeks(Math.floor(counterObj.nils));
              setCountRecords(Math.floor(counterObj.records));
              setCountCases(Math.floor(counterObj.cases));
            }
          });

          // Barcode marks progressive reveal
          gsap.from(".barcode-bar", {
            scaleY: 0,
            transformOrigin: "bottom center",
            stagger: 0.002,
            duration: 0.4,
            ease: "power1.out"
          });
        }
      });

      // 3. Data Transformation Visual Cascade Animation
      ScrollTrigger.create({
        trigger: "#pipeline",
        start: "top 70%",
        onEnter: () => {
          gsap.from(".pipeline-node", {
            scale: 0.8,
            opacity: 0,
            stagger: 0.015,
            duration: 0.5,
            ease: "back.out(1.4)"
          });
        }
      });

      // 4. Seasonality SVG Curve Drawing
      ScrollTrigger.create({
        trigger: "#patterns",
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            ".svg-curve-line",
            { strokeDashoffset: 1400, strokeDasharray: 1400 },
            { strokeDashoffset: 0, duration: 1.8, ease: "power2.out" }
          );
          gsap.from(".month-tick", {
            opacity: 0,
            y: 10,
            stagger: 0.04,
            duration: 0.6,
            ease: "power1.out"
          });
        }
      });

      // 5. Generic Classy Section Reveals
      const revealElements = document.querySelectorAll(".gsap-reveal");
      revealElements.forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Exact Verified Monthly Values
  const EXACT_MONTHLY_DATA: Record<string, { events: number[]; cases: number[] }> = {
    dengue: {
      events: [4, 2, 5, 12, 15, 27, 26, 20, 36, 40, 15, 2],
      cases: [71, 15, 112, 147, 199, 507, 497, 461, 392, 566, 157, 20]
    },
    add: {
      events: [3, 9, 14, 6, 5, 19, 22, 16, 13, 25, 7, 14],
      cases: [151, 1582, 635, 180, 289, 846, 1040, 1300, 633, 1383, 493, 518]
    },
    malaria: {
      events: [2, 3, 3, 1, 7, 15, 14, 7, 7, 3, 2, 6],
      cases: [198, 15, 347, 25, 374, 227, 190, 108, 139, 55, 7, 448]
    },
    foodPoisoning: {
      events: [7, 11, 4, 9, 11, 5, 2, 4, 7, 4, 0, 5],
      cases: [410, 2162, 199, 899, 894, 236, 47, 255, 182, 399, 0, 244]
    },
    chikungunya: {
      events: [1, 1, 5, 2, 6, 6, 4, 3, 5, 4, 5, 1],
      cases: [17, 15, 38, 17, 60, 76, 57, 48, 126, 164, 78, 5]
    }
  };

  const diseaseColors: Record<string, string> = {
    dengue: "#C84B2F",        // Burnt Terracotta
    add: "#AEBB55",           // Muted Olive
    malaria: "#B89B5E",       // Warm Muted Gold
    foodPoisoning: "#D97706", // Deep Amber
    chikungunya: "#64748B",   // Slate Charcoal
  };

  const currentDisease = PRIMARY_DISEASES[activeDiseaseTab] || PRIMARY_DISEASES.dengue;

  return (
    <div ref={containerRef} className="w-full relative selection:bg-[#B89B5E] selection:text-[#171A18]">
      
      {/* ══════════════════════════════════════════════════════════════════════
          ACT 01: CINEMATIC HERO & OPENING TITLE
          Surface: Deep Charcoal (#171A18)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="intro"
        className="min-h-screen flex flex-col justify-between bg-[#171A18] text-[#F1EBDD] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#F1EBDD]/15 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#F1EBDD_1px,transparent_1px)] [background-size:32px_32px]" />

        {/* Top Masthead */}
        <div className="hero-masthead space-y-2 z-10">
          <div className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] text-[#B89B5E]">
            <span className="w-2 h-2 rounded-full bg-[#B89B5E] animate-ping" />
            <span>B.Sc. Data Science · Semester III Field Project</span>
          </div>
          <div className="text-xs font-mono text-[#F1EBDD]/50 uppercase tracking-widest">
            RP Institute · Affiliated to University of Mumbai · Academic Year 2026–27
          </div>
        </div>

        {/* Centerpiece Title */}
        <div className="my-auto py-12 max-w-5xl z-10 space-y-8">
          <div className="space-y-4">
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-[#F1EBDD] leading-[0.95]">
              <span className="hero-title-line block">FROM DATA</span>
              <span className="hero-title-line block italic font-light text-[#B89B5E]">TO THE GROUND.</span>
            </h1>
            <p className="hero-title-line font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F1EBDD]/80 font-normal leading-snug pt-2 max-w-4xl">
              Analysis of Seasonal Disease Patterns Using Government Health Data
            </p>
          </div>

          <div className="hero-gold-rule w-28 h-[2px] bg-[#B89B5E]" />

          <p className="hero-desc text-base sm:text-lg text-[#F1EBDD]/70 max-w-3xl leading-relaxed font-sans">
            An empirical investigation synthesizing 237 weekly epidemiological surveillance bulletins across Maharashtra (2022–2026 W32) alongside primary qualitative field evidence from an urban health facility in Nallasopara West.
          </p>
        </div>

        {/* Bottom Metadata & Scroll Prompt */}
        <div className="pt-8 border-t border-[#F1EBDD]/15 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-xs font-mono z-10">
          <div className="hero-meta space-y-1">
            <div className="text-[#B89B5E] font-semibold uppercase tracking-wider">Candidate / Investigator</div>
            <div className="text-base font-serif font-bold text-[#F1EBDD]">Khan Umar</div>
            <div className="text-[#F1EBDD]/50">Maharashtra State Surveillance Archive · 2022–2026 W32</div>
          </div>

          <a
            href="#question"
            className="hero-meta group inline-flex items-center gap-2 text-xs font-mono text-[#B89B5E] hover:text-[#F1EBDD] transition-colors"
          >
            <span className="tracking-widest uppercase">Scroll to begin presentation</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 02: THE RESEARCH QUESTION & FOUR INQUIRIES
          Surface: Warm Ivory (#F1EBDD)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="question"
        className="min-h-[85vh] flex flex-col justify-center bg-[#F1EBDD] text-[#171A18] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#D8D1C5]"
      >
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="space-y-3 gsap-reveal">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C84B2F] font-semibold">
              The Central Scientific Inquiry
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#171A18] leading-tight">
              &ldquo;How does disease activity vary across seasons in Maharashtra?&rdquo;
            </h2>
            <p className="text-base text-[#565C58] max-w-3xl">
              Public health interventions routinely presume seasonal regularity. We audited government archives to test whether recurring seasonality is mathematically reproducible or driven by idiosyncratic surges.
            </p>
          </div>

          <div className="w-20 h-[2px] bg-[#174A4A]" />

          {/* The 4 Inquiries Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm sm:text-base text-[#565C58]">
            <div className="space-y-2 border-l-2 border-[#174A4A] pl-4 gsap-reveal">
              <span className="font-mono text-xs font-bold text-[#174A4A]">01 · MULTI-YEAR RECURRENCE</span>
              <p className="leading-relaxed">
                What outbreak patterns truly recur across consecutive calendar years, and which surges are merely sporadic or climate-irregular?
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#174A4A] pl-4 gsap-reveal">
              <span className="font-mono text-xs font-bold text-[#174A4A]">02 · NARROW CONCENTRATION</span>
              <p className="leading-relaxed">
                Which disease families concentrate their entire annual burden into tight 3-month windows (CR3), versus those that persist year-round?
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#174A4A] pl-4 gsap-reveal">
              <span className="font-mono text-xs font-bold text-[#174A4A]">03 · EVENT vs CASE DIVERGENCE</span>
              <p className="leading-relaxed">
                Do outbreak event frequencies and total reported case counts rise and fall together, or do massive communal point-source outliers distort caseloads?
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#174A4A] pl-4 gsap-reveal">
              <span className="font-mono text-xs font-bold text-[#174A4A]">04 · STATEWIDE DATA vs LOCAL REALITY</span>
              <p className="leading-relaxed">
                How does the aggregated statewide government notification threshold compare with the day-to-day clinical experience of an urban primary health post?
              </p>
            </div>
          </div>

          {/* WHAT THIS MEANS ORAL CALLOUT */}
          <div className="p-4 bg-[#E8E2D7] rounded border-l-4 border-[#B89B5E] text-xs font-mono text-[#171A18] gsap-reveal">
            <span className="font-bold text-[#174A4A] uppercase mr-2">What this means:</span>
            We designed four empirical tests to dissect the weekly outbreak archives before testing our statistical findings against physical clinical reality.
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 03: DATA ARCHIVE & THE 237-WEEK SURVEILLANCE TIMELINE
          Surface: Deep Charcoal (#171A18)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="data"
        ref={dataSectionRef}
        className="min-h-screen flex flex-col justify-center bg-[#171A18] text-[#F1EBDD] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#F1EBDD]/15"
      >
        <div className="max-w-6xl mx-auto space-y-12 w-full">
          <div className="space-y-3 gsap-reveal">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B89B5E] font-semibold">
              The Quantitative Evidence Base
            </span>
            <h2 className="font-serif text-3xl sm:text-6xl font-bold tracking-tight">
              237 Weeks Mined. 809 Outbreak Records.
            </h2>
            <p className="text-base text-[#F1EBDD]/70 max-w-3xl">
              Every single weekly bulletin published by NCDC and IDSP between 2022 W01 and 2026 W32 was audited, extracted, and cataloged.
            </p>
          </div>

          {/* Animated Big Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-6 border-y border-[#F1EBDD]/15 gsap-reveal">
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-5xl font-bold text-[#F1EBDD]">{countWeeks}</div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#B89B5E]">Weeks Audited</div>
              <div className="text-[11px] text-[#F1EBDD]/50 font-mono">2022–2026 W32</div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-5xl font-bold text-[#F1EBDD]">{countOutbreakWeeks}</div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#B89B5E]">Outbreak Weeks</div>
              <div className="text-[11px] text-[#F1EBDD]/50 font-mono">≥1 Cluster Reported</div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-5xl font-bold text-[#AEBB55]">{countNilWeeks}</div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#B89B5E]">NIL Reports</div>
              <div className="text-[11px] text-[#F1EBDD]/50 font-mono">No Outbreak Reported</div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-5xl font-bold text-[#F1EBDD]">{countRecords}</div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#B89B5E]">Analytical Records</div>
              <div className="text-[11px] text-[#F1EBDD]/50 font-mono">539 Primary Baseline</div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-5xl font-bold text-[#F1EBDD]">{countCases.toLocaleString()}</div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#B89B5E]">Reported Cases</div>
              <div className="text-[11px] text-[#C84B2F] font-mono">266 Baseline Deaths</div>
            </div>
          </div>

          {/* VISUAL: WEEKLY COVERAGE TIMELINE (ALL 237 WEEKS VISUALLY) */}
          <div className="bg-[#0E100F] border border-[#F1EBDD]/15 p-6 rounded space-y-4 gsap-reveal">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="font-mono text-xs uppercase tracking-wider text-[#B89B5E] font-bold">
                Weekly Surveillance Audit Barcode (2022–2026 W32)
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#174A4A]"></span> Outbreak Active</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#AEBB55]"></span> NIL Report</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#C84B2F]"></span> Missing / Unpublished</span>
              </div>
            </div>

            {/* The 5-Year Visual Barcode Rows */}
            <div className="space-y-2.5 pt-2">
              {SURVEILLANCE_COVERAGE.map((yr) => (
                <div key={yr.year} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-mono text-[#F1EBDD]/70">
                    <span>{yr.year}</span>
                    <span>{yr.records} records ({yr.publishedWeeks}/{yr.totalWeeks} wks)</span>
                  </div>
                  <div className="flex gap-[2px] h-5 bg-[#171A18] p-1 rounded border border-[#F1EBDD]/10">
                    {Array.from({ length: yr.totalWeeks }).map((_, wIdx) => {
                      const weekNum = wIdx + 1;
                      const is2023Missing = yr.year === "2023" && (weekNum === 15 || weekNum === 51 || weekNum === 52);
                      const isNil = yr.year === "2022" ? weekNum > 36 : yr.year === "2023" ? weekNum > 41 : yr.year === "2025" ? weekNum > 48 : false;

                      let color = "#174A4A"; // Outbreak
                      if (is2023Missing) color = "#C84B2F"; // Missing gap
                      else if (isNil) color = "#AEBB55"; // NIL

                      return (
                        <div
                          key={wIdx}
                          className="barcode-bar flex-1 h-full rounded-[1px] transition-all hover:opacity-100 hover:scale-y-125"
                          style={{ backgroundColor: color, opacity: 0.85 }}
                          title={`${yr.year} W${weekNum}: ${is2023Missing ? "Unpublished by NCDC" : isNil ? "NIL report" : "Outbreak active"}`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11px] font-mono text-[#F1EBDD]/50 pt-2 border-t border-[#F1EBDD]/10">
              Coverage Audit Note: Year 2023 displays the 3 unpublished NCDC publication gaps (W15, W51, W52). A NIL report means no outbreak event was reported for that week—it does not mean zero disease.
            </div>
          </div>

          {/* WHAT THIS MEANS CALLOUT */}
          <div className="bg-[#F1EBDD]/5 border-l-4 border-[#B89B5E] p-5 rounded-r space-y-1 gsap-reveal">
            <span className="font-mono text-xs uppercase text-[#B89B5E] font-bold">What this means:</span>
            <p className="text-xs sm:text-sm text-[#F1EBDD]/80 leading-relaxed font-sans">
              &ldquo;A NIL report means no outbreak event was reported for that surveillance week. It does not mean zero disease. We audited reporting coverage rather than blindly assuming missing reports were zero.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 04: DATA ENGINEERING PIPELINE (THE NORMALIZATION FUNNEL)
          Surface: Warm Ivory (#F1EBDD)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="pipeline"
        className="bg-[#F1EBDD] text-[#171A18] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#D8D1C5]"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-3 gsap-reveal">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#174A4A] font-semibold">
              Data Engineering
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              The Normalization Funnel: 116 Strings → 5 Primary Cohorts
            </h2>
            <p className="text-base text-[#565C58] max-w-3xl">
              NCDC weekly bulletins contain unstandardized spelling variants, Marathi/English phonetic discrepancies, and non-canonical diagnostic terms. We engineered an additive transformation pipeline.
            </p>
          </div>

          {/* Funnel Stage Controls */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 gsap-reveal">
            {[
              { s: 1, label: "116 Raw Strings", count: "116 Variants" },
              { s: 2, label: "56 Cleaned Labels", count: "56 Normalized" },
              { s: 3, label: "30 Derived Families", count: "30 Syndromes" },
              { s: 4, label: "5 Primary Cohorts", count: "93.9% Records" },
            ].map((st) => (
              <button
                key={st.s}
                onClick={() => setPipelineStage(st.s)}
                className={`p-3 text-left rounded font-mono transition-all border ${
                  pipelineStage === st.s
                    ? "bg-[#174A4A] text-[#F1EBDD] border-[#174A4A] shadow-md"
                    : "bg-[#FAF7F2] text-[#565C58] border-[#D8D1C5] hover:bg-[#E8E2D7]"
                }`}
              >
                <div className="text-[10px] uppercase opacity-75">Stage 0{st.s}</div>
                <div className="text-xs sm:text-sm font-bold mt-0.5">{st.label}</div>
                <div className="text-[10px] mt-1 opacity-70">{st.count}</div>
              </button>
            ))}
          </div>

          {/* Visual Transformation Node Display */}
          <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-6 sm:p-8 rounded space-y-6 gsap-reveal">
            <div className="flex justify-between items-center border-b border-[#D8D1C5] pb-3 text-xs font-mono">
              <span className="font-bold text-[#171A18]">
                {pipelineStage === 1 && "Stage 1: Raw Unsanitized PDF Table Strings (N=116)"}
                {pipelineStage === 2 && "Stage 2: Lexical Reconciliation & Normalization (N=56)"}
                {pipelineStage === 3 && "Stage 3: Syndromic Epidemiological Classification (N=30)"}
                {pipelineStage === 4 && "Stage 4: Primary Analytical Cohort (N=5 Families · 539 Records)"}
              </span>
              <span className="text-[#C84B2F] font-bold">
                {pipelineStage === 4 ? "5 Primary Families Isolated" : `${pipelineStage === 1 ? 116 : pipelineStage === 2 ? 56 : 30} Nodes Active`}
              </span>
            </div>

            {/* Stage Pills Matrix */}
            <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto p-2">
              {pipelineStage === 1 && (
                [
                  "Dengue", "DENGUE", "Dengue Fever", "Dengue fever", "Dengue/DHF", "DHF", 
                  "Acute Diarrhoeal Disease", "Acute Diarrheal Disease", "A.D.D.", "ADD", "Gastroenteritis", "GE", "Acute Gastroenteritis", "AGE", "Cholera",
                  "Malaria", "MALARIA", "Malaria Pv", "Malaria Pf", "P. vivax", "P. falciparum", "Mixed Malaria", "Suspected Malaria",
                  "Food Poisoning", "FOOD POISONING", "Food poisoning", "Bacterial Food Poisoning", "Toxic Food Ingestion",
                  "Chikungunya", "CHIKUNGUNYA", "Chikungunya fever", "Suspected Chikungunya", "Viral Arthralgia",
                  "Leptospirosis", "LEPTOSPIROSIS", "Enteric Fever", "Typhoid", "Typhoid Fever", "Hepatitis A", "Hepatitis E", "Viral Hepatitis",
                  "Measles", "Rubella", "Chickenpox", "Swine Flu", "H1N1", "Influenza A", "Diphtheria", "Pertussis", "Scrub Typhus", "JE", "AES"
                ].map((s, i) => (
                  <span key={i} className="pipeline-node px-2 py-1 bg-[#F1EBDD] text-[#565C58] rounded text-[11px] font-mono border border-[#D8D1C5]">
                    {s}
                  </span>
                ))
              )}

              {pipelineStage === 2 && (
                [
                  "Dengue", "Acute Diarrheal Disease", "Malaria (P. vivax)", "Malaria (P. falciparum)", "Malaria (Mixed)",
                  "Food Poisoning", "Chikungunya", "Leptospirosis", "Enteric Fever / Typhoid", "Viral Hepatitis",
                  "Measles", "Chickenpox", "Influenza / H1N1", "Diphtheria", "Scrub Typhus", "Acute Encephalitis", "Cholera"
                ].map((s, i) => (
                  <span key={i} className="pipeline-node px-2.5 py-1 bg-[#E8E2D7] text-[#174A4A] rounded text-xs font-mono font-medium border border-[#D8D1C5]">
                    {s}
                  </span>
                ))
              )}

              {pipelineStage === 3 && (
                [
                  "Arboviral (Dengue)", "Enteric Diarrheal (ADD)", "Protozoal Vector (Malaria)", "Toxin / Foodborne", "Alphaviral (Chikungunya)",
                  "Zoonotic Spirochetal", "Salmonella / Enteric", "Enteric Viral Hepatic", "Vaccine-Preventable Pediatric", "Respiratory Viral"
                ].map((s, i) => (
                  <span key={i} className="pipeline-node px-3 py-1.5 bg-[#E8E2D7] text-[#171A18] rounded text-xs font-mono font-bold border border-[#174A4A]/30">
                    {s}
                  </span>
                ))
              )}

              {pipelineStage === 4 && (
                Object.values(PRIMARY_DISEASES).map((d) => (
                  <div key={d.id} className="pipeline-node p-4 bg-[#F1EBDD] border border-[#174A4A] rounded w-full sm:w-[calc(50%-0.5rem)] space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-serif font-bold text-sm text-[#171A18]">{d.name}</span>
                      <span className="font-mono text-xs text-[#C84B2F] font-bold">{d.records} Records</span>
                    </div>
                    <div className="text-xs font-mono text-[#565C58]">
                      {d.cases.toLocaleString()} Cases · {d.deaths} Deaths · {d.districts} Districts
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* WHAT THIS MEANS CALLOUT */}
          <div className="p-4 bg-[#E8E2D7] rounded border-l-4 border-[#174A4A] text-xs font-mono text-[#171A18] gsap-reveal">
            <span className="font-bold text-[#174A4A] uppercase mr-2">What this means:</span>
            Government PDF tables use inconsistent spelling and diagnostic terminology across years. We built an additive normalization pipeline so zero raw data was discarded while producing a clinically unified analytical dataset.
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 05: THE 12-MONTH SEASONALITY HERO SEQUENCE (GSAP SCROLLTRIGGER + SVG)
          Surface: Deep Petrol (#174A4A)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="patterns"
        className="min-h-screen flex flex-col justify-center bg-[#174A4A] text-[#F1EBDD] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#F1EBDD]/15"
      >
        <div className="max-w-6xl mx-auto space-y-10 w-full">
          <div className="space-y-3 gsap-reveal">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#AEBB55] font-semibold">
              The Analytical Core
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
              When Does Disease Actually Move?
            </h2>
            <p className="text-base sm:text-lg text-[#F1EBDD]/80 max-w-3xl font-sans">
              Five disease families across Maharashtra&apos;s 12 calendar months. Compare their empirical trajectories one at a time or overlay all five.
            </p>
          </div>

          {/* Disease Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2 gsap-reveal">
            {(["dengue", "add", "malaria", "foodPoisoning", "chikungunya"] as const).map((key) => {
              const d = PRIMARY_DISEASES[key];
              const isSelected = !showAllDiseases && activeDiseaseTab === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setShowAllDiseases(false);
                    setActiveDiseaseTab(key);
                  }}
                  className={`px-4 py-2 rounded font-mono text-xs sm:text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-[#B89B5E] text-[#171A18] font-bold shadow-lg scale-105"
                      : "bg-[#0E3232] text-[#F1EBDD]/70 hover:bg-[#0E3232]/80 hover:text-[#F1EBDD] border border-[#F1EBDD]/15"
                  }`}
                >
                  <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: diseaseColors[key] }} />
                  {d.shortName}
                </button>
              );
            })}

            <button
              onClick={() => setShowAllDiseases(true)}
              className={`px-4 py-2 rounded font-mono text-xs sm:text-sm font-medium transition-all ${
                showAllDiseases
                  ? "bg-[#B89B5E] text-[#171A18] font-bold shadow-lg scale-105"
                  : "bg-[#0E3232] text-[#F1EBDD]/70 hover:bg-[#0E3232]/80 hover:text-[#F1EBDD] border border-[#F1EBDD]/15"
              }`}
            >
              Compare All 5
            </button>
          </div>

          {/* Large 12-Month SVG Coordinate Matrix */}
          <div className="bg-[#0E3232] border border-[#F1EBDD]/15 p-6 sm:p-8 rounded-lg space-y-6 gsap-reveal">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#F1EBDD]/15 pb-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F1EBDD]">
                  {showAllDiseases ? "Five-Family Comparative Trajectory" : `${currentDisease.name} (${currentDisease.category})`}
                </h3>
                <div className="text-xs font-mono text-[#AEBB55] mt-1">
                  {showAllDiseases ? "Overlay of all 5 primary cohorts" : `Peak Window: ${currentDisease.peakMonths}`}
                </div>
              </div>

              {/* Metric Mode Toggle */}
              <div className="flex items-center gap-1 bg-[#174A4A] p-1 rounded border border-[#F1EBDD]/20 text-xs font-mono">
                <button
                  onClick={() => setMetricMode("events")}
                  className={`px-3 py-1 rounded transition-colors ${
                    metricMode === "events" ? "bg-[#B89B5E] text-[#171A18] font-bold" : "text-[#F1EBDD]/70"
                  }`}
                >
                  Outbreak Events (N=539)
                </button>
                <button
                  onClick={() => setMetricMode("cases")}
                  className={`px-3 py-1 rounded transition-colors ${
                    metricMode === "cases" ? "bg-[#B89B5E] text-[#171A18] font-bold" : "text-[#F1EBDD]/70"
                  }`}
                >
                  Reported Cases (N=21,955)
                </button>
              </div>
            </div>

            {/* SVG Interactive Curve with verified numbers */}
            <div className="w-full h-64 sm:h-72 relative">
              <svg ref={chartRef} viewBox="0 0 1000 280" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* Y-axis Guides */}
                {[0, 0.5, 1].map((pct, i) => {
                  const y = 240 - pct * 200;
                  return (
                    <line key={i} x1="50" y1={y} x2="950" y2={y} stroke="#F1EBDD" strokeOpacity="0.08" strokeDasharray="3 3" />
                  );
                })}

                {/* X-axis Month lines & labels */}
                {MONTHS.map((m, i) => {
                  const x = 50 + (i / 11) * 900;
                  const isHovered = hoveredMonthIdx === i;
                  return (
                    <g key={m} className="month-tick" onMouseEnter={() => setHoveredMonthIdx(i)} onMouseLeave={() => setHoveredMonthIdx(null)}>
                      <line x1={x} y1="40" x2={x} y2="240" stroke="#F1EBDD" strokeOpacity={isHovered ? "0.3" : "0.08"} />
                      <text x={x} y="265" textAnchor="middle" className={`text-xs font-mono ${isHovered ? "fill-[#B89B5E] font-bold" : "fill-[#F1EBDD]/60"}`}>
                        {m}
                      </text>
                    </g>
                  );
                })}

                {/* The Drawn Curves */}
                {(() => {
                  const diseaseList = showAllDiseases 
                    ? (["dengue", "add", "malaria", "foodPoisoning", "chikungunya"] as const)
                    : [activeDiseaseTab as keyof typeof EXACT_MONTHLY_DATA];

                  // Calculate max across displayed diseases
                  const maxVal = Math.max(
                    ...diseaseList.flatMap((k) => {
                      const dataObj = EXACT_MONTHLY_DATA[k] || EXACT_MONTHLY_DATA.dengue;
                      return metricMode === "events" ? dataObj.events : dataObj.cases;
                    }),
                    1
                  );

                  return diseaseList.map((key) => {
                    const dataObj = EXACT_MONTHLY_DATA[key] || EXACT_MONTHLY_DATA.dengue;
                    const data = metricMode === "events" ? dataObj.events : dataObj.cases;
                    const color = diseaseColors[key] || "#B89B5E";

                    const points = data
                      .map((val, i) => {
                        const x = 50 + (i / 11) * 900;
                        const y = 240 - (val / maxVal) * 200;
                        return `${x},${y}`;
                      })
                      .join(" ");

                    return (
                      <g key={key}>
                        {!showAllDiseases && (
                          <polygon points={`50,240 ${points} 950,240`} fill={color} fillOpacity="0.18" />
                        )}
                        <polyline
                          className="svg-curve-line"
                          points={points}
                          fill="none"
                          stroke={color}
                          strokeWidth={showAllDiseases ? "2.5" : "3.5"}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {data.map((val, i) => {
                          const x = 50 + (i / 11) * 900;
                          const y = 240 - (val / maxVal) * 200;
                          const isHovered = hoveredMonthIdx === i;
                          return (
                            <g key={i}>
                              <circle
                                cx={x}
                                cy={y}
                                r={isHovered ? "6" : "4"}
                                fill={color}
                                stroke="#171A18"
                                strokeWidth="2"
                              />
                              {(!showAllDiseases || isHovered) && (
                                <text
                                  x={x}
                                  y={y - 10}
                                  textAnchor="middle"
                                  className="text-[10px] font-mono fill-[#F1EBDD] font-bold"
                                >
                                  {val}
                                </text>
                              )}
                            </g>
                          );
                        })}
                      </g>
                    );
                  });
                })()}
              </svg>
            </div>

            {/* Metrics Below Chart */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#F1EBDD]/15 text-xs font-mono">
              <div>
                <span className="text-[#F1EBDD]/50 uppercase">Outbreak Records</span>
                <div className="text-xl font-bold text-[#F1EBDD] mt-1">{currentDisease.records}</div>
              </div>
              <div>
                <span className="text-[#F1EBDD]/50 uppercase">Reported Cases</span>
                <div className="text-xl font-bold text-[#F1EBDD] mt-1">{currentDisease.cases.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-[#F1EBDD]/50 uppercase">CR3 Concentration</span>
                <div className="text-xl font-bold text-[#B89B5E] mt-1">{currentDisease.cr3Window}</div>
              </div>
              <div>
                <span className="text-[#F1EBDD]/50 uppercase">Kendall&apos;s W Rank Stability</span>
                <div className="text-xl font-bold text-[#AEBB55] mt-1">
                  W = {currentDisease.kendallW.toFixed(3)}
                  {currentDisease.isSignificant && " (p < 0.05)*"}
                </div>
              </div>
            </div>

            {/* WHAT THIS MEANS CALLOUT */}
            <div className="p-4 bg-[#174A4A] border-l-4 border-[#AEBB55] text-xs font-mono text-[#F1EBDD]">
              <span className="font-bold text-[#AEBB55] uppercase mr-2">What this means:</span>
              &ldquo;Different disease families follow distinct transmission drivers: vector-borne diseases peak late- or post-monsoon, diarrheal infections surge during peak monsoon flooding, while foodborne illnesses peak in extreme dry heat.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 06: CINEMATIC DISEASE DEEP-DIVE SEQUENCE
          Surface: Warm Ivory (#F1EBDD)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="deepdive"
        className="bg-[#F1EBDD] text-[#171A18] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#D8D1C5]"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-3 gsap-reveal">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C84B2F] font-semibold">
              Epidemiological Profiles
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              Five Primary Disease Profiles
            </h2>
            <p className="text-base text-[#565C58] max-w-3xl">
              A comprehensive analytical examination of the five primary cohorts accounting for 93.9% of all baseline outbreaks across Maharashtra.
            </p>
          </div>

          <div className="space-y-8">
            {/* 1. DENGUE */}
            <div className="p-6 bg-[#FAF7F2] border border-[#D8D1C5] rounded space-y-4 gsap-reveal">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D8D1C5] pb-3">
                <div>
                  <span className="text-xs font-mono text-[#C84B2F] font-bold uppercase">Vector-Borne Arboviral</span>
                  <h3 className="font-serif text-2xl font-bold text-[#171A18]">Dengue Fever</h3>
                </div>
                <div className="text-xs font-mono bg-[#C84B2F]/10 text-[#C84B2F] px-3 py-1 rounded font-bold">
                  Peak: October (40 events · 566 cases)
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div><span className="text-[#565C58]">Records:</span> <strong className="text-[#171A18]">204</strong></div>
                <div><span className="text-[#565C58]">Cases:</span> <strong className="text-[#171A18]">3,144</strong></div>
                <div><span className="text-[#565C58]">Deaths:</span> <strong className="text-[#171A18]">93</strong></div>
                <div><span className="text-[#565C58]">Districts:</span> <strong className="text-[#171A18]">31 / 36</strong></div>
              </div>
              <p className="text-xs sm:text-sm text-[#565C58] font-sans leading-relaxed">
                82.8% of all baseline Dengue events concentrate between June and October. Kendall&apos;s W of 0.405 (p = 0.086) indicates strong seasonal clustering, though the exact peak oscillates between September and October across individual baseline years.
              </p>
              <div className="p-3 bg-[#E8E2D7] rounded text-xs font-mono text-[#171A18]">
                <strong className="text-[#C84B2F]">What this means:</strong> &ldquo;Dengue shows high post-monsoon clustering, but the exact peak month shifts between September and October depending on the cessation of heavy rainfall and subsequent water stabilization.&rdquo;
              </div>
            </div>

            {/* 2. ADD */}
            <div className="p-6 bg-[#FAF7F2] border border-[#D8D1C5] rounded space-y-4 gsap-reveal">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D8D1C5] pb-3">
                <div>
                  <span className="text-xs font-mono text-[#174A4A] font-bold uppercase">Enteric Water-Borne</span>
                  <h3 className="font-serif text-2xl font-bold text-[#171A18]">Acute Diarrheal Disease (ADD)</h3>
                </div>
                <div className="text-xs font-mono bg-[#AEBB55]/20 text-[#174A4A] px-3 py-1 rounded font-bold">
                  Kendall W = 0.530 (p = 0.016)*
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div><span className="text-[#565C58]">Records:</span> <strong className="text-[#171A18]">153</strong></div>
                <div><span className="text-[#565C58]">Cases:</span> <strong className="text-[#171A18]">9,050</strong></div>
                <div><span className="text-[#565C58]">Deaths:</span> <strong className="text-[#171A18]">93</strong></div>
                <div><span className="text-[#565C58]">Districts:</span> <strong className="text-[#171A18]">33 / 36</strong></div>
              </div>
              <p className="text-xs sm:text-sm text-[#565C58] font-sans leading-relaxed">
                ADD accounts for the single largest reported case burden (9,050 cases). It concentrates across June–August (43.1%), with a secondary October peak. Remarkably, it is the only disease family exhibiting statistically significant inter-annual concordance (W = 0.530, p = 0.016).
              </p>
              <div className="p-3 bg-[#E8E2D7] rounded text-xs font-mono text-[#171A18]">
                <strong className="text-[#174A4A]">What this means:</strong> &ldquo;Across the four completed baseline years, ADD showed the strongest exploratory year-to-year monthly concordance among the five selected disease families.&rdquo;
              </div>
            </div>

            {/* 3. MALARIA */}
            <div className="p-6 bg-[#FAF7F2] border border-[#D8D1C5] rounded space-y-4 gsap-reveal">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D8D1C5] pb-3">
                <div>
                  <span className="text-xs font-mono text-[#B89B5E] font-bold uppercase">Protozoal Vector-Borne</span>
                  <h3 className="font-serif text-2xl font-bold text-[#171A18]">Malaria</h3>
                </div>
                <div className="text-xs font-mono bg-[#B89B5E]/20 text-[#B89B5E] px-3 py-1 rounded font-bold">
                  Peak: May–July (51.4% Events)
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div><span className="text-[#565C58]">Records:</span> <strong className="text-[#171A18]">70</strong></div>
                <div><span className="text-[#565C58]">Cases:</span> <strong className="text-[#171A18]">2,133</strong></div>
                <div><span className="text-[#565C58]">Deaths:</span> <strong className="text-[#171A18]">51</strong></div>
                <div><span className="text-[#565C58]">Districts:</span> <strong className="text-[#C84B2F]">15 / 36 (Clustered)</strong></div>
              </div>
              <p className="text-xs sm:text-sm text-[#565C58] font-sans leading-relaxed">
                Unlike Dengue, Malaria surges early during the pre-monsoon and onset phase (May–July). Geographically, 43 of 70 baseline records (61.4%) occur in Gadchiroli and Chandrapur districts alone.
              </p>
              <div className="p-3 bg-[#E8E2D7] rounded text-xs font-mono text-[#171A18]">
                <strong className="text-[#B89B5E]">What this means:</strong> &ldquo;Malaria is primarily an early-monsoon surge confined to specific forested tribal geographies rather than a statewide urban issue.&rdquo;
              </div>
            </div>

            {/* 4. FOOD POISONING */}
            <div className="p-6 bg-[#FAF7F2] border border-[#D8D1C5] rounded space-y-4 gsap-reveal">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D8D1C5] pb-3">
                <div>
                  <span className="text-xs font-mono text-[#D97706] font-bold uppercase">Foodborne Point-Source</span>
                  <h3 className="font-serif text-2xl font-bold text-[#171A18]">Food Poisoning</h3>
                </div>
                <div className="text-xs font-mono bg-[#D97706]/15 text-[#D97706] px-3 py-1 rounded font-bold">
                  Feb Anomaly: 2,162 Cases
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div><span className="text-[#565C58]">Records:</span> <strong className="text-[#171A18]">69</strong></div>
                <div><span className="text-[#565C58]">Cases:</span> <strong className="text-[#171A18]">5,927</strong></div>
                <div><span className="text-[#565C58]">Deaths:</span> <strong className="text-[#171A18]">29</strong></div>
                <div><span className="text-[#565C58]">Districts:</span> <strong className="text-[#171A18]">27 / 36</strong></div>
              </div>
              <p className="text-xs sm:text-sm text-[#565C58] font-sans leading-relaxed">
                Food Poisoning exhibits a bimodal calendar profile (Jan–Feb and Apr–May). In February, 2,162 cases were recorded, but 1,615 of those cases originated from just three mass-exposure events.
              </p>
              <div className="p-3 bg-[#E8E2D7] rounded text-xs font-mono text-[#171A18]">
                <strong className="text-[#D97706]">What this means:</strong> &ldquo;One monthly peak can be heavily influenced by a few large events, so we tested the sensitivity of the aggregate pattern.&rdquo;
              </div>
            </div>

            {/* 5. CHIKUNGUNYA */}
            <div className="p-6 bg-[#FAF7F2] border border-[#D8D1C5] rounded space-y-4 gsap-reveal">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D8D1C5] pb-3">
                <div>
                  <span className="text-xs font-mono text-[#64748B] font-bold uppercase">Alphaviral Vector-Borne</span>
                  <h3 className="font-serif text-2xl font-bold text-[#171A18]">Chikungunya</h3>
                </div>
                <div className="text-xs font-mono bg-[#64748B]/15 text-[#64748B] px-3 py-1 rounded font-bold">
                  Kendall W = 0.150 (p = 0.832)
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div><span className="text-[#565C58]">Records:</span> <strong className="text-[#171A18]">43</strong></div>
                <div><span className="text-[#565C58]">Cases:</span> <strong className="text-[#171A18]">701</strong></div>
                <div><span className="text-[#565C58]">Deaths:</span> <strong className="text-[#171A18]">0</strong></div>
                <div><span className="text-[#565C58]">Districts:</span> <strong className="text-[#171A18]">15 / 36</strong></div>
              </div>
              <p className="text-xs sm:text-sm text-[#565C58] font-sans leading-relaxed">
                Chikungunya showed low event counts dispersed across the year without a single dominant recurring calendar peak. Kendall&apos;s W of 0.150 indicates near-random inter-annual rank agreement.
              </p>
              <div className="p-3 bg-[#E8E2D7] rounded text-xs font-mono text-[#171A18]">
                <strong className="text-[#64748B]">What this means:</strong> &ldquo;No stable recurring monthly pattern was identified. This demonstrates that we did not force every disease into the same seasonal story.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 07: OUTLIER SENSITIVITY DECOMPOSITION
          Surface: Deep Charcoal (#171A18)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="outliers"
        className="bg-[#171A18] text-[#F1EBDD] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#F1EBDD]/15"
      >
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="space-y-3 gsap-reveal">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C84B2F] font-semibold">
              Sensitivity & Rigor
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              Outlier Sensitivity: When Three Records Dictate the Peak
            </h2>
            <p className="text-base text-[#F1EBDD]/70 max-w-3xl">
              Food Poisoning reported 2,162 cases in February alone. But did this reflect an annual winter surge, or localized mass-exposure events?
            </p>
          </div>

          {/* Interactive Simulation Switch */}
          <div className="flex items-center gap-4 bg-[#0E100F] border border-[#F1EBDD]/15 p-4 rounded max-w-xl gsap-reveal">
            <span className="text-xs font-mono text-[#F1EBDD]">Outlier Filter:</span>
            <button
              onClick={() => setOutlierToggled(!outlierToggled)}
              className={`px-4 py-2 rounded font-mono text-xs font-bold transition-all ${
                outlierToggled
                  ? "bg-[#C84B2F] text-white"
                  : "bg-[#AEBB55] text-[#171A18]"
              }`}
            >
              {outlierToggled ? "Showing Full Baseline (With Outliers)" : "3 Extreme Outliers Removed"}
            </button>
          </div>

          {/* Before / After Case Visualization */}
          <div className="bg-[#0E100F] border border-[#F1EBDD]/15 p-6 rounded space-y-6 gsap-reveal">
            <div className="flex justify-between items-center border-b border-[#F1EBDD]/10 pb-3 text-xs font-mono">
              <span className="font-bold text-[#F1EBDD]">
                {outlierToggled ? "February Peak: 2,162 Cases (Dominated by 3 Outliers)" : "Adjusted Peak: Shifts to April (899 Cases) & May (894 Cases)"}
              </span>
              <span className="text-[#B89B5E] font-bold">
                {outlierToggled ? "1,615 Cases in 3 Records" : "Outliers Excluded"}
              </span>
            </div>

            {/* 12-Month Bar Chart */}
            <div className="grid grid-cols-12 gap-1 items-end h-48 bg-[#171A18] p-4 rounded border border-[#F1EBDD]/10">
              {(outlierToggled ? OUTLIER_SENSITIVITY_DATA.beforeCases : OUTLIER_SENSITIVITY_DATA.afterCases).map((val, i) => {
                const max = outlierToggled ? 2162 : 899;
                const heightPct = Math.round((val / max) * 100);
                const isFeb = i === 1;

                return (
                  <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-mono text-[#F1EBDD]/70">{val}</span>
                    <div
                      className={`w-full rounded-t transition-all duration-500 ${
                        isFeb ? (outlierToggled ? "bg-[#C84B2F]" : "bg-[#AEBB55]") : "bg-[#174A4A]"
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="text-[10px] font-mono text-[#F1EBDD]/50">{MONTHS[i]}</span>
                  </div>
                );
              })}
            </div>

            {/* The Three Outlier Records Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
              {OUTLIER_SENSITIVITY_DATA.threeRecords.map((rec) => (
                <div key={rec.district} className="bg-[#171A18] p-3 rounded border border-[#F1EBDD]/10 space-y-1">
                  <div className="text-[#C84B2F] font-bold">{rec.district} ({rec.year} {rec.week})</div>
                  <div className="text-base font-bold text-[#F1EBDD]">{rec.cases} Cases</div>
                  <div className="text-[10px] text-[#F1EBDD]/50">Single mass-exposure cluster</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#F1EBDD]/70 leading-relaxed font-sans pt-2 border-t border-[#F1EBDD]/10">
              These three events account for 74.7% of all February cases and 27.3% of the entire 4-year baseline total. When isolated, the apparent &ldquo;winter peak&rdquo; evaporates, revealing that typical foodborne illness surges in the pre-monsoon heat of April and May.
            </p>

            {/* WHAT THIS MEANS CALLOUT */}
            <div className="p-3 bg-[#171A18] border-l-4 border-[#C84B2F] text-xs font-mono text-[#F1EBDD]">
              <span className="font-bold text-[#C84B2F] uppercase mr-2">What this means:</span>
              &ldquo;One monthly peak can be heavily influenced by a few large events, so we tested the sensitivity of the aggregate pattern. Mass-exposure point sources distort calendar trends.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 08: EXPLORATORY MONTHLY STABILITY (KENDALL'S W)
          Surface: Warm Ivory (#F1EBDD)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="stability"
        className="bg-[#F1EBDD] text-[#171A18] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#D8D1C5]"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-4 gsap-reveal">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#174A4A] font-semibold">
              Exploratory Monthly Stability
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              Kendall&apos;s W: Measuring Inter-Annual Concordance
            </h2>
            <p className="text-base text-[#565C58]">
              Does each disease peak in the same month year after year, or does the peak wander? Kendall&apos;s W evaluates how consistently the relative monthly ranking is repeated across the four completed baseline years (2022–2025).
            </p>

            {/* 5 Stability Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4 font-mono text-xs">
              <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-4 rounded space-y-1">
                <div className="text-[#7A827D]">Dengue</div>
                <div className="text-lg font-bold text-[#171A18]">W = 0.405</div>
                <div className="text-[11px] text-[#565C58]">p = 0.086</div>
                <div className="text-[10px] text-[#7A827D]">Moderate Stability</div>
              </div>

              <div className="bg-[#FAF7F2] border-2 border-[#174A4A] p-4 rounded space-y-1 shadow-sm">
                <div className="text-[#174A4A] font-bold">ADD (Diarrheal)*</div>
                <div className="text-lg font-bold text-[#174A4A]">W = 0.530</div>
                <div className="text-[11px] text-[#AEBB55] font-bold">p = 0.016*</div>
                <div className="text-[10px] text-[#174A4A] font-bold">Statistically Concordant</div>
              </div>

              <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-4 rounded space-y-1">
                <div className="text-[#7A827D]">Food Poisoning</div>
                <div className="text-lg font-bold text-[#171A18]">W = 0.386</div>
                <div className="text-[11px] text-[#565C58]">p = 0.108</div>
                <div className="text-[10px] text-[#7A827D]">Moderate Stability</div>
              </div>

              <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-4 rounded space-y-1">
                <div className="text-[#7A827D]">Malaria</div>
                <div className="text-lg font-bold text-[#171A18]">W = 0.319</div>
                <div className="text-[11px] text-[#565C58]">p = 0.229</div>
                <div className="text-[10px] text-[#7A827D]">Moderate Agreement</div>
              </div>

              <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-4 rounded space-y-1">
                <div className="text-[#7A827D]">Chikungunya</div>
                <div className="text-lg font-bold text-[#171A18]">W = 0.150</div>
                <div className="text-[11px] text-[#565C58]">p = 0.832</div>
                <div className="text-[10px] text-[#C84B2F]">Near-Random (No Peak)</div>
              </div>
            </div>

            {/* WHAT THIS MEANS CALLOUT */}
            <div className="p-4 bg-[#E8E2D7] rounded border-l-4 border-[#174A4A] text-xs font-mono text-[#171A18] mt-4">
              <span className="font-bold text-[#174A4A] uppercase mr-2">What this means:</span>
              &ldquo;Kendall&apos;s W measures how consistently the relative monthly pattern is repeated across years. ADD showed the strongest exploratory year-to-year monthly concordance in this baseline. We do not treat this as a competition or leaderboard.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 09: DISTRICT GEOGRAPHIC FOOTPRINT & TRIBAL BELT
          Surface: Warm Ivory (#F1EBDD)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="districts"
        className="bg-[#F1EBDD] text-[#171A18] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#D8D1C5]"
      >
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="space-y-3 gsap-reveal">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C84B2F] font-semibold">
              Spatial Dispersion vs. Clustering
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              District Footprints: Temporal Pattern ≠ Geographic Uniformity
            </h2>
            <p className="text-base text-[#565C58]">
              A statewide seasonal surge does not manifest equally across all 36 administrative districts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono gsap-reveal">
            {/* Statewide Reach Card */}
            <div className="bg-[#FAF7F2] p-5 rounded border border-[#D8D1C5] space-y-3">
              <div className="font-bold text-sm text-[#171A18] border-b border-[#D8D1C5] pb-2">
                Geographic Reach Across Maharashtra (36 Districts)
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Acute Diarrheal Disease (ADD):</span>
                  <span className="font-bold text-[#174A4A] bg-[#AEBB55]/20 px-2 py-0.5 rounded">33 / 36 Districts (Statewide)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Dengue Fever:</span>
                  <span className="font-bold text-[#C84B2F] bg-[#C84B2F]/10 px-2 py-0.5 rounded">31 / 36 Districts (Statewide)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Food Poisoning:</span>
                  <span className="font-bold text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 rounded">27 / 36 Districts (Widespread)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Malaria:</span>
                  <span className="font-bold text-[#B89B5E] bg-[#B89B5E]/20 px-2 py-0.5 rounded">15 / 36 Districts (Clustered)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Chikungunya:</span>
                  <span className="font-bold text-[#64748B] bg-[#64748B]/20 px-2 py-0.5 rounded">15 / 36 Districts (Clustered)</span>
                </div>
              </div>
            </div>

            {/* Malaria Tribal Belt Spotlight */}
            <div className="bg-[#FAF7F2] p-5 rounded border border-[#D8D1C5] space-y-3">
              <div className="font-bold text-sm text-[#B89B5E] border-b border-[#D8D1C5] pb-2">
                Malaria Tribal Belt Concentration
              </div>
              <p className="font-sans text-xs text-[#565C58] leading-relaxed">
                While Dengue and ADD occur across virtually every district, Malaria is intensely clustered: <strong>43 of the 70 baseline Malaria records (61.4%) occur in Gadchiroli and Chandrapur districts alone</strong>.
              </p>
              <div className="bg-[#E8E2D7] p-3 rounded text-xs text-[#174A4A] font-bold">
                Gadchiroli + Chandrapur = 43 / 70 records (61.4% of all Maharashtra Malaria Outbreaks)
              </div>
            </div>
          </div>

          {/* WHAT THIS MEANS CALLOUT */}
          <div className="p-4 bg-[#E8E2D7] rounded border-l-4 border-[#C84B2F] text-xs font-mono text-[#171A18] gsap-reveal">
            <span className="font-bold text-[#C84B2F] uppercase mr-2">What this means:</span>
            &ldquo;We looked at how widely each disease family appeared across districts. Statewide aggregates hide severe geographic concentration. Malaria control belongs in eastern forested districts, whereas Dengue and ADD require statewide infrastructure.&rdquo;
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 10: 2026 OUT-OF-SAMPLE PARTIAL HORIZON
          Surface: Deep Charcoal (#171A18)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="update2026"
        className="bg-[#171A18] text-[#F1EBDD] px-6 sm:px-12 lg:px-20 py-20 border-b border-[#F1EBDD]/15"
      >
        <div className="max-w-4xl mx-auto space-y-6 gsap-reveal">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#B89B5E] font-bold">
            <Clock className="w-4 h-4" />
            <span>Out-of-Sample Partial Horizon</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            2026 W01–W32: A Truncated Benchmark
          </h2>

          <div className="grid grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-[#0E100F] p-4 rounded border border-[#F1EBDD]/15">
              <span className="text-[#F1EBDD]/50">Primary Records</span>
              <div className="text-xl font-bold text-[#F1EBDD] mt-1">45 Records</div>
            </div>
            <div className="bg-[#0E100F] p-4 rounded border border-[#F1EBDD]/15">
              <span className="text-[#F1EBDD]/50">Reported Cases</span>
              <div className="text-xl font-bold text-[#F1EBDD] mt-1">1,118 Cases</div>
            </div>
            <div className="bg-[#0E100F] p-4 rounded border border-[#F1EBDD]/15">
              <span className="text-[#F1EBDD]/50">Surveillance Deaths</span>
              <div className="text-xl font-bold text-[#AEBB55] mt-1">0 Deaths</div>
            </div>
          </div>

          <div className="p-4 bg-[#F1EBDD]/5 border-l-4 border-[#B89B5E] text-xs font-mono text-[#F1EBDD]/80">
            <strong className="text-[#B89B5E]">What this means:</strong> &ldquo;This is only a partial surveillance window through week 32, so we did not forecast the rest of the year. Historically, 55.4% of annual Dengue outbreaks occur after Week 32.&rdquo;
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 11: CINEMATIC FIELDWORK TRANSITION & GROUND TRUTH
          Surface: Deep Charcoal (#171A18)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="fieldwork"
        className="min-h-screen flex flex-col justify-center bg-[#171A18] text-[#F1EBDD] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#F1EBDD]/15"
      >
        <div className="max-w-4xl mx-auto space-y-8 gsap-reveal">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C84B2F]">
            <span className="w-2 h-2 rounded-full bg-[#C84B2F]" />
            <span>Primary Qualitative Field Evidence</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F1EBDD] leading-tight">
            &ldquo;THE DATA SHOWS THE PATTERN.<br />
            <span className="text-[#B89B5E] italic">THE FIELD VISIT SHOWS THE CONTEXT.&rdquo;</span>
          </h2>

          <div className="w-24 h-[1.5px] bg-[#B89B5E]" />

          <div className="space-y-4 font-mono text-sm sm:text-base text-[#F1EBDD]/80">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#B89B5E]" />
              <span className="font-bold text-[#F1EBDD]">02 OCTOBER 2026 · 10:30 AM – 11:45 AM</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#C84B2F]" />
              <span>PRIMARY HEALTH CENTRE / VVMC HEALTH POST · NALLASOPARA WEST</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#AEBB55]" />
              <span>MEDICAL OFFICER IN-CHARGE (SENIOR MEDICAL OFFICER)</span>
            </div>
          </div>

          <div className="p-6 bg-[#F1EBDD]/5 border border-[#B89B5E]/30 rounded text-xs font-mono text-[#B89B5E]">
            ONE FACILITY · ONE MEDICAL OFFICER · ONE VISIT · STRUCTURED OBSERVATION & KEY-INFORMANT INTERVIEW
          </div>

          {/* WHAT THIS MEANS CALLOUT */}
          <div className="p-4 bg-[#F1EBDD]/5 border-l-4 border-[#B89B5E] text-xs font-mono text-[#F1EBDD]/80">
            <span className="font-bold text-[#B89B5E] uppercase mr-2">What this means:</span>
            &ldquo;This is one local facility and one Medical Officer, so I use it as contextual qualitative evidence rather than statewide validation.&rdquo;
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 12: ACTUAL FIELD OBSERVATIONS (FIELD NOTE AESTHETIC)
          Surface: Warm Ivory (#F1EBDD)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="observations"
        className="bg-[#F1EBDD] text-[#171A18] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#D8D1C5]"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-3 gsap-reveal">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C84B2F] font-semibold">
              Actual Field Evidence · 10:30 AM – 11:45 AM
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              Direct Clinical & Environmental Observations
            </h2>
            <p className="text-base text-[#565C58]">
              Documented directly by the investigator at PHC Nallasopara West / VVMC Health Post (Kala Krida Ground area).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs gsap-reveal">
            <div className="bg-[#FAF7F2] p-5 rounded border border-[#D8D1C5] space-y-2">
              <div className="font-mono font-bold text-[#174A4A] flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#174A4A]" />
                <span>CLINICAL QUEUE & PATIENT ACTIVITY</span>
              </div>
              <ul className="space-y-1.5 text-[#565C58] list-disc pl-4 font-sans leading-relaxed">
                <li>High morning patient activity throughout the observation window.</li>
                <li>Dense registration and pharmacy queue in the reception corridor.</li>
                <li>Pediatric and adult acute febrile illness cases visibly present.</li>
              </ul>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded border border-[#D8D1C5] space-y-2">
              <div className="font-mono font-bold text-[#174A4A] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#174A4A]" />
                <span>FACILITY SIGNAGE & HEALTH EDUCATION</span>
              </div>
              <ul className="space-y-1.5 text-[#565C58] list-disc pl-4 font-sans leading-relaxed">
                <li>Prominent Dengue, Malaria, Diarrhea/Water Safety, and General Hygiene boards.</li>
                <li>Marathi & Hindi posters depicting mosquito breeding sites (flower pots, tyres, overhead tanks).</li>
                <li>&ldquo;Dry Day&rdquo; weekly water emptying messaging and ORS preparation diagrams.</li>
                <li>Water sanitation advice: chlorination, boiling during monsoon, hand hygiene.</li>
              </ul>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded border border-[#D8D1C5] space-y-2">
              <div className="font-mono font-bold text-[#C84B2F] flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#C84B2F]" />
                <span>PERIMETER SANITATION & WATER STAGNATION</span>
              </div>
              <ul className="space-y-1.5 text-[#565C58] list-disc pl-4 font-sans leading-relaxed">
                <li>Open concrete drains along adjacent lanes with visible silt accumulation.</li>
                <li>Small stagnant pools near road depressions and construction margins near Kala Krida Ground.</li>
                <li>Municipal waste bin outside with localized scattered plastic waste.</li>
                <li><em>Important: No causal link is claimed between these specific pools and dengue transmission.</em></li>
              </ul>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded border border-[#D8D1C5] space-y-2">
              <div className="font-mono font-bold text-[#AEBB55] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#AEBB55]" />
                <span>COMMUNITY VECTOR CONTROL TRACES</span>
              </div>
              <ul className="space-y-1.5 text-[#565C58] list-disc pl-4 font-sans leading-relaxed">
                <li>Visible Abate/temephos larvicide chalk numbers and markings on nearby residential building entries.</li>
                <li>Indicates active municipal vector-control door-to-door tracking in the neighborhood.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 13: THE KEY-INFORMANT INTERVIEW (5 THEMES + 25 QUESTIONS ACCORDION)
          Surface: Deep Charcoal (#171A18)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="interview"
        className="bg-[#171A18] text-[#F1EBDD] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#F1EBDD]/15"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-3 gsap-reveal">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B89B5E] font-semibold">
              Key-Informant Testimony · 02 October 2026
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              The Medical Officer Reported:
            </h2>
            <p className="text-base text-[#F1EBDD]/70">
              Paraphrased testimony from the Senior Medical Officer In-Charge at PHC Nallasopara West, summarized across five operational themes.
            </p>
          </div>

          {/* Five Visual Presentation Themes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono gsap-reveal">
            <div className="bg-[#0E100F] p-5 rounded border border-[#F1EBDD]/15 space-y-2">
              <span className="text-[#B89B5E] font-bold">01 · SEASONAL DISEASE PATTERNS</span>
              <p className="text-[#F1EBDD]/80 font-sans leading-relaxed">
                Fever cases surge locally between <strong>July and October</strong>, with a significant <strong>August–September peak</strong>. Dengue cases surge heavily through <strong>September–November</strong>. GI illnesses/diarrhea concentrate in <strong>June–August</strong>. Malaria is predominantly July–September.
              </p>
            </div>

            <div className="bg-[#0E100F] p-5 rounded border border-[#F1EBDD]/15 space-y-2">
              <span className="text-[#B89B5E] font-bold">02 · SURVEILLANCE & CLUSTERING</span>
              <p className="text-[#F1EBDD]/80 font-sans leading-relaxed">
                Daily OPD registers are screened. Multiple similar cases from the same locality or chawl trigger an internal cluster alert, prompting MPHW and ASHA home fever surveys, targeted larvicide application, and daily/weekly transmission to the VVMC Chief Medical Officer and Palghar District Health Officer (Form P, Form S, Form L).
              </p>
            </div>

            <div className="bg-[#0E100F] p-5 rounded border border-[#F1EBDD]/15 space-y-2">
              <span className="text-[#B89B5E] font-bold">03 · PUBLIC HEALTH RESPONSE</span>
              <p className="text-[#F1EBDD]/80 font-sans leading-relaxed">
                Interventions deploy anti-larval temephos, drain desilting, door-to-door container surveys, chlorine tablet distribution, Medichlor bottles, thermal fogging during localized fever spikes, and ASHA community education.
              </p>
            </div>

            <div className="bg-[#0E100F] p-5 rounded border border-[#F1EBDD]/15 space-y-2">
              <span className="text-[#B89B5E] font-bold">04 · FOODBORNE ILLNESS</span>
              <p className="text-[#F1EBDD]/80 font-sans leading-relaxed">
                Food poisoning cases were described as sporadic rather than continuous. Mass outbreaks are uncommon at the primary level, but localized 5–10 person clusters occur. Protocol requires emergency register logging, symptomatic IV hydration, and immediate alerts to the Municipal Health Officer and FDA.
              </p>
            </div>

            <div className="bg-[#0E100F] p-5 rounded border border-[#F1EBDD]/15 space-y-2 md:col-span-2">
              <span className="text-[#B89B5E] font-bold">05 · HEALTH POST DATA NEEDS</span>
              <p className="text-[#F1EBDD]/80 font-sans leading-relaxed">
                The Medical Officer emphasized the need for automated ward-level alerts, weekly trend visualization comparing OPD fever footfall against confirmed cases, vector-density tracking, and simplified dashboards for proactive resource pre-positioning.
              </p>
            </div>
          </div>

          {/* FULL 25-QUESTION INTERVIEW RECORD ACCORDION */}
          <div className="pt-8 border-t border-[#F1EBDD]/15 space-y-6 gsap-reveal">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#F1EBDD]">
                  Complete 25-Question Key-Informant Interview Record
                </h3>
                <p className="text-xs text-[#F1EBDD]/60 font-mono">
                  Full verified field transcript categorized across Sections A through E.
                </p>
              </div>
              <span className="text-xs font-mono text-[#B89B5E] bg-[#B89B5E]/10 border border-[#B89B5E]/30 px-3 py-1 rounded">
                Paraphrased Field Record
              </span>
            </div>

            <div className="space-y-4">
              {INTERVIEW_QUESTIONS.map((sec) => {
                const isExpanded = expandedAccordionSection === sec.sectionId;
                return (
                  <div
                    key={sec.sectionId}
                    className="border border-[#F1EBDD]/15 rounded bg-[#0E100F] overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedAccordionSection(isExpanded ? null : sec.sectionId)}
                      className="w-full p-4 flex justify-between items-center text-left font-mono text-xs sm:text-sm hover:bg-[#F1EBDD]/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#B89B5E] font-bold">{sec.theme}</span>
                        <span className="text-[#F1EBDD]/80">{sec.section}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#B89B5E]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#F1EBDD]/50" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-4 pt-2 border-t border-[#F1EBDD]/10 space-y-4 bg-[#171A18]/50">
                        {sec.questions.map((q) => (
                          <div key={q.qNum} className="space-y-1 text-xs">
                            <div className="font-mono text-[#B89B5E] font-semibold">
                              {q.qNum}: {q.question}
                            </div>
                            <div className="font-sans text-[#F1EBDD]/80 pl-4 border-l border-[#B89B5E]/30 leading-relaxed">
                              {q.response}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 14: THE CLIMAX: TWO EVIDENCE LAYERS SIDE-BY-SIDE
          Surface: Deep Petrol (#174A4A)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="comparison"
        className="min-h-screen flex flex-col justify-center bg-[#174A4A] text-[#F1EBDD] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#F1EBDD]/15"
      >
        <div className="max-w-5xl mx-auto space-y-12 w-full">
          <div className="space-y-3 gsap-reveal">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#AEBB55] font-semibold">
              The Analytical Climax
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Two Evidence Layers: Macro vs. Micro
            </h2>
            <p className="text-base text-[#F1EBDD]/80 max-w-3xl">
              What the statewide surveillance archive reveals versus what the local facility physician encountered.
            </p>
          </div>

          {/* Comparative Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono gsap-reveal">
            {/* Dengue */}
            <div className="bg-[#0E3232] border border-[#F1EBDD]/15 p-6 rounded space-y-3">
              <div className="text-sm font-serif font-bold text-[#F1EBDD]">Dengue Surge Window</div>
              <div className="space-y-2">
                <div className="bg-[#174A4A] p-3 rounded">
                  <span className="text-[#AEBB55] font-bold">STATEWIDE NCDC DATA:</span>
                  <p className="text-[#F1EBDD]/80 font-sans mt-0.5">June–October peak cresting statewide in October (CR3 = 50.5%).</p>
                </div>
                <div className="bg-[#174A4A] p-3 rounded">
                  <span className="text-[#C84B2F] font-bold">LOCAL HEALTH POST REPORT:</span>
                  <p className="text-[#F1EBDD]/80 font-sans mt-0.5">Surges through September–November in outpatient fever presentation.</p>
                </div>
              </div>
            </div>

            {/* Malaria */}
            <div className="bg-[#0E3232] border border-[#F1EBDD]/15 p-6 rounded space-y-3">
              <div className="text-sm font-serif font-bold text-[#F1EBDD]">Malaria Seasonality</div>
              <div className="space-y-2">
                <div className="bg-[#174A4A] p-3 rounded">
                  <span className="text-[#AEBB55] font-bold">STATEWIDE NCDC DATA:</span>
                  <p className="text-[#F1EBDD]/80 font-sans mt-0.5">May–July early monsoon concentration, clustered in tribal forest belts.</p>
                </div>
                <div className="bg-[#174A4A] p-3 rounded">
                  <span className="text-[#C84B2F] font-bold">LOCAL HEALTH POST REPORT:</span>
                  <p className="text-[#F1EBDD]/80 font-sans mt-0.5">July–September peak dominated by P. vivax linked to construction margins.</p>
                </div>
              </div>
            </div>

            {/* ADD */}
            <div className="bg-[#0E3232] border border-[#F1EBDD]/15 p-6 rounded space-y-3">
              <div className="text-sm font-serif font-bold text-[#F1EBDD]">Acute Diarrheal Disease</div>
              <div className="space-y-2">
                <div className="bg-[#174A4A] p-3 rounded">
                  <span className="text-[#AEBB55] font-bold">STATEWIDE NCDC DATA:</span>
                  <p className="text-[#F1EBDD]/80 font-sans mt-0.5">June–August flush + October secondary. Statistically concordant (W=0.530*).</p>
                </div>
                <div className="bg-[#174A4A] p-3 rounded">
                  <span className="text-[#C84B2F] font-bold">LOCAL HEALTH POST REPORT:</span>
                  <p className="text-[#F1EBDD]/80 font-sans mt-0.5">June–August immediate surge upon monsoon onset and water logging.</p>
                </div>
              </div>
            </div>

            {/* Chikungunya */}
            <div className="bg-[#0E3232] border border-[#F1EBDD]/15 p-6 rounded space-y-3">
              <div className="text-sm font-serif font-bold text-[#F1EBDD]">Chikungunya Dynamics</div>
              <div className="space-y-2">
                <div className="bg-[#174A4A] p-3 rounded">
                  <span className="text-[#AEBB55] font-bold">STATEWIDE NCDC DATA:</span>
                  <p className="text-[#F1EBDD]/80 font-sans mt-0.5">No stable recurring monthly pattern across 4 years (W = 0.150, p = 0.832).</p>
                </div>
                <div className="bg-[#174A4A] p-3 rounded">
                  <span className="text-[#C84B2F] font-bold">LOCAL HEALTH POST REPORT:</span>
                  <p className="text-[#F1EBDD]/80 font-sans mt-0.5">Sporadic, highly localized post-monsoon joint pain presentations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Methodological Synthesis */}
          <div className="p-6 bg-[#0E3232] border-l-4 border-[#B89B5E] rounded-r space-y-2 gsap-reveal">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#B89B5E] font-bold">
              The Crucial Analytical Realization
            </h4>
            <p className="text-base sm:text-lg font-serif italic text-[#F1EBDD] leading-relaxed">
              &ldquo;These are not competing answers. The two evidence layers operate at different scales. One describes reported surveillance events across Maharashtra. The other describes the operational experience of one local facility.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 15: SCIENTIFIC BOUNDARIES & LIMITATIONS
          Surface: Warm Ivory (#F1EBDD)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="limitations"
        className="bg-[#F1EBDD] text-[#171A18] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#D8D1C5]"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 gsap-reveal">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C84B2F] font-semibold">
              Scientific Transparency
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              What This Project Does Not Claim
            </h2>
          </div>

          <div className="w-16 h-[2px] bg-[#C84B2F]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono gsap-reveal">
            <div className="bg-[#FAF7F2] p-4 rounded border border-[#D8D1C5] space-y-1">
              <span className="text-[#C84B2F] font-bold">NO POPULATION INCIDENCE</span>
              <p className="text-[#565C58] font-sans">
                Does not calculate true disease incidence or prevalence per 100,000 population.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded border border-[#D8D1C5] space-y-1">
              <span className="text-[#C84B2F] font-bold">NO CAUSAL INFERENCE</span>
              <p className="text-[#565C58] font-sans">
                Correlations with precipitation do not prove direct environmental or individual causality.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded border border-[#D8D1C5] space-y-1">
              <span className="text-[#C84B2F] font-bold">NO FACILITY GENERALIZATION</span>
              <p className="text-[#565C58] font-sans">
                Observations from Nallasopara West cannot be statistically generalized to all 36 districts.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded border border-[#D8D1C5] space-y-1">
              <span className="text-[#C84B2F] font-bold">NO INTERVENTION EVALUATION</span>
              <p className="text-[#565C58] font-sans">
                Does not evaluate pharmacological efficacy or therapeutic outcomes.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#E8E2D7] rounded text-xs font-mono text-[#171A18] font-bold gsap-reveal">
            ONE FACILITY · ONE MEDICAL OFFICER · ONE VISIT
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 16: CONCLUSION & PRESENTATION FINALE
          Surface: Deep Charcoal (#171A18)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="conclusion"
        className="min-h-screen flex flex-col justify-between bg-[#171A18] text-[#F1EBDD] px-6 sm:px-12 lg:px-20 py-24 border-b border-[#F1EBDD]/15"
      >
        <div className="space-y-2 gsap-reveal">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B89B5E]">
            Final Research Synthesis
          </span>
        </div>

        <div className="my-auto max-w-4xl space-y-8 gsap-reveal">
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight text-[#F1EBDD]">
            &ldquo;THE PATTERN IS SEASONAL.<br />
            THE CONTEXT IS LOCAL.<br />
            <span className="text-[#B89B5E] italic">THE INTERPRETATION NEEDS BOTH.&rdquo;</span>
          </h2>

          <div className="w-24 h-[1.5px] bg-[#B89B5E]" />

          <p className="text-base sm:text-xl text-[#F1EBDD]/70 font-sans leading-relaxed max-w-3xl">
            Statewide surveillance data alerts public health authorities <em>when</em> resources must be mobilized across Maharashtra; ground-level qualitative evidence explains <em>why</em> infections cluster in specific human settlements. Effective public health data science demands both macro-level discipline and micro-level empathy.
          </p>

          <div className="pt-6 space-y-1 text-sm font-mono text-[#B89B5E]">
            <div className="text-lg font-serif font-bold text-[#F1EBDD]">Khan Umar</div>
            <div>B.Sc. Data Science · Semester III · RP Institute, University of Mumbai</div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#F1EBDD]/15 flex justify-between items-center text-xs font-mono text-[#F1EBDD]/50">
          <span>Field Project Completed · October 2026</span>
          <a href="#intro" className="text-[#B89B5E] hover:underline">
            ↑ Return to Top
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ACT 17: REFERENCES & BIBLIOGRAPHY
          Surface: Deep Charcoal (#0E100F)
      ══════════════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#0E100F] text-[#F1EBDD]/60 px-6 sm:px-12 lg:px-20 py-16 text-xs font-mono border-t border-[#F1EBDD]/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-[#B89B5E] font-bold uppercase tracking-wider">
            Primary References & Government Provenance
          </div>
          <ul className="space-y-3 font-sans text-xs">
            <li>
              <strong>National Centre for Disease Control (NCDC) & IDSP:</strong> Weekly Outbreak Surveillance Bulletins (Maharashtra), Directorate General of Health Services, Ministry of Health and Family Welfare, Government of India (2022–2026 W32).
            </li>
            <li>
              <strong>Public Health Department, Government of Maharashtra:</strong> National Health Mission (NHM) Maharashtra State Health Infrastructure and Vector Control Operational Guidelines (2022–2025).
            </li>
            <li>
              <strong>Kendall, M. G., & Babington Smith, B. (1939):</strong> The problem of m rankings. <em>The Annals of Mathematical Statistics</em>, 10(3), 275-287.
            </li>
            <li>
              <strong>Fieldwork Evidence:</strong> Primary Health Centre / Health Post, Nallasopara West, Palghar District. Key-Informant Interview with Medical Officer In-Charge and Structured Observation conducted 02 October 2026.
            </li>
          </ul>
          <div className="pt-4 border-t border-[#F1EBDD]/10 text-[11px] text-[#F1EBDD]/40">
            B.Sc. Data Science Field Project (USDS306) · University of Mumbai · Presentation Edition
          </div>
        </div>
      </footer>

    </div>
  );
}
