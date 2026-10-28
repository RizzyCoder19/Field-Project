export interface ResearchChapter {
  id: string;
  actNumber: number; // 1 to 10 for the 10 acts, 11 for sources
  chapterNumber: number; // alias for backwards compatibility
  chapterCode: string;
  movementNumber: string;
  movementTitle: string;
  title: string;
  shortTitle: string;
  path: string;
  category: "The Surveillance Foundation" | "The Epidemiological Signatures" | "Mathematical & Ground Proofs" | "Synthesis & Action" | "Sources & Archive";
  question: string;
  description: string;
  keyMetric: string;
  connectedLeadIn: string;
  connectedLeadOut: string;
}

export const RESEARCH_CHAPTERS: ResearchChapter[] = [
  {
    id: "data",
    actNumber: 1,
    chapterNumber: 1,
    chapterCode: "01",
    movementNumber: "MOVEMENT I",
    movementTitle: "The Surveillance Foundation",
    title: "The Unmined Surveillance Vault",
    shortTitle: "Surveillance Vault",
    path: "/data",
    category: "The Surveillance Foundation",
    question: "Why did 237 weekly government outbreak bulletins sit unanalyzed across Maharashtra?",
    description: "Documenting the extraction, taxonomic cleaning, and surveillance coverage of 237 weekly NCDC/IDSP bulletins across 2022–2025.",
    keyMetric: "237 Bulletins · 539 Audited Records · 36 Districts",
    connectedLeadIn: "Begins at the primary surveillance archive of the National Centre for Disease Control (NCDC).",
    connectedLeadOut: "Next: Trace how these raw, unstandardized PDF reports were parsed into clean tabular records in Act 02 Pipeline →"
  },
  {
    id: "method",
    actNumber: 2,
    chapterNumber: 2,
    chapterCode: "02",
    movementNumber: "MOVEMENT I",
    movementTitle: "The Surveillance Foundation",
    title: "How We Transformed Raw Data",
    shortTitle: "Harmonization Pipeline",
    path: "/method",
    category: "The Surveillance Foundation",
    question: "How do unstructured government PDFs transform into an auditable research cohort?",
    description: "A 12-stage additive normalization pipeline with progressive disclosure, detailing extraction, taxonomy, aggregation, and critical study caveats.",
    keyMetric: "12 Normalization Stages · 100% Deterministic Extraction",
    connectedLeadIn: "Receives 237 unstandardized weekly bulletins with varying string notations and district spellings.",
    connectedLeadOut: "Next: Examine how the clean tabular dataset reveals the statewide Monsoon Engine in Act 03 Seasonality →"
  },
  {
    id: "seasonality",
    actNumber: 3,
    chapterNumber: 3,
    chapterCode: "03",
    movementNumber: "MOVEMENT II",
    movementTitle: "The Epidemiological Signatures",
    title: "The Monsoon Engine: Climatic Synchrony",
    shortTitle: "Climatic Seasonality",
    path: "/seasonality",
    category: "The Epidemiological Signatures",
    question: "How do Western Ghats monsoon rains coordinate disease outbreak timing across Maharashtra?",
    description: "Exploring the 5×12 seasonal heatmap matrix and monthly distribution curves, revealing the dual-wave monsoon and post-monsoon surges.",
    keyMetric: "68.3% of Outbreaks in Jun–Nov · Dual Peak Waves",
    connectedLeadIn: "Harmonized records are plotted across all twelve calendar months, revealing two massive seasonal surges.",
    connectedLeadOut: "Next: Map these surges onto the 360° Radial Seasonal Clock and explore the 5 pathogen profiles in Act 04 Five Diseases →"
  },
  {
    id: "diseases",
    actNumber: 4,
    chapterNumber: 4,
    chapterCode: "04",
    movementNumber: "MOVEMENT II",
    movementTitle: "The Epidemiological Signatures",
    title: "The Five Disease Pathogen Cohorts",
    shortTitle: "Five Diseases Exhibit",
    path: "/diseases",
    category: "The Epidemiological Signatures",
    question: "Which pathogens drive surveillance, and how do event frequency and patient burden diverge?",
    description: "Grand Radial Seasonal Clock (360° monthly geometry) and Native Seasonal Chart profiling Dengue, ADD, Malaria, Food Poisoning, and Chikungunya.",
    keyMetric: "73.5% Baseline Coverage · 20,955 Cases · 266 Deaths",
    connectedLeadIn: "Breakdown of the 539 baseline records into the 5 primary clinical pathogen families.",
    connectedLeadOut: "Next: Explore how these 5 pathogen cohorts distribute geographically across Maharashtra's 36 districts in Act 05 Geography →"
  },
  {
    id: "geography",
    actNumber: 5,
    chapterNumber: 5,
    chapterCode: "05",
    movementNumber: "MOVEMENT II",
    movementTitle: "The Epidemiological Signatures",
    title: "Spatial Corridors & Ecological Belts",
    shortTitle: "36-District Geography",
    path: "/geography",
    category: "The Epidemiological Signatures",
    question: "Are seasonal outbreaks distributed uniformly, or clustered in distinct ecological corridors?",
    description: "Interactive 36-district Maharashtra map illustrating disease footprint and the focal eastern forest cluster in Gadchiroli and Chandrapur.",
    keyMetric: "36 Districts · 61.4% Malaria Clustered in 2 Eastern Districts",
    connectedLeadIn: "Pathogen curves are mapped to administrative district boundaries across urban and forested belts.",
    connectedLeadOut: "Next: Apply non-parametric Kendall's W concordance to test if these patterns repeat year-over-year in Act 06 Stability →"
  },
  {
    id: "stability",
    actNumber: 6,
    chapterNumber: 6,
    chapterCode: "06",
    movementNumber: "MOVEMENT III",
    movementTitle: "Mathematical & Ground Proofs",
    title: "Do Patterns Repeat? (Stability)",
    shortTitle: "Kendall's Concordance",
    path: "/stability",
    category: "Mathematical & Ground Proofs",
    question: "Did seasonal timing repeat consistently across 2022–2025, or did outbreak peaks drift?",
    description: "Non-parametric Kendall's W rank concordance analysis across four baseline years (2022–2025), proving statistical recurrence.",
    keyMetric: "ADD W = 0.530 (p = 0.016) · Malaria W = 0.443 (p = 0.038)",
    connectedLeadIn: "Four calendar years of empirical rankings are tested for multi-year temporal synchrony.",
    connectedLeadOut: "Next: Test whether isolated banquet mega-outbreaks distorted these concordance scores in Act 07 Outliers →"
  },
  {
    id: "outliers",
    actNumber: 7,
    chapterNumber: 7,
    chapterCode: "07",
    movementNumber: "MOVEMENT III",
    movementTitle: "Mathematical & Ground Proofs",
    title: "Investigating Outbreak Outliers",
    shortTitle: "Outlier Sensitivity",
    path: "/outliers",
    category: "Mathematical & Ground Proofs",
    question: "How do mass-exposure events alter aggregated monthly curves, and why is sensitivity testing necessary?",
    description: "Waterfall decomposition of three extreme food poisoning events totaling 1,615 cases, proving the underlying seasonal curve is robust.",
    keyMetric: "3 Banquet Events = 1,615 Cases · Seasonality Proved Robust",
    connectedLeadIn: "Dissecting extreme food poisoning anomalies (February wedding feasts with hundreds poisoned) to verify baseline validity.",
    connectedLeadOut: "Next: Triangulate these statistical outlier findings with primary facility observation in Act 08 Fieldwork →"
  },
  {
    id: "fieldwork",
    actNumber: 8,
    chapterNumber: 8,
    chapterCode: "08",
    movementNumber: "MOVEMENT III",
    movementTitle: "Mathematical & Ground Proofs",
    title: "Clinical Ground Truth at Palghar",
    shortTitle: "Fieldwork Triangulation",
    path: "/fieldwork",
    category: "Mathematical & Ground Proofs",
    question: "What does primary facility observation reveal that aggregated government PDFs cannot show?",
    description: "Interactive curtain-reveal photo essay and key-informant interview at Nallasopara West Urban Health Post (Palghar district) on 2 October 2026.",
    keyMetric: "Nallasopara UHP · 2–3 Week Reporting Latency Confirmed",
    connectedLeadIn: "In-person investigation at an urban health post in Palghar, interviewing the Medical Officer and inspecting registers.",
    connectedLeadOut: "Next: Compare historical reporting latency with active real-time monitoring in Act 09 Surveillance Horizon →"
  },
  {
    id: "comparison-2026",
    actNumber: 9,
    chapterNumber: 9,
    chapterCode: "09",
    movementNumber: "MOVEMENT IV",
    movementTitle: "Synthesis & Action",
    title: "The 2026 Surveillance Horizon",
    shortTitle: "2026 Window",
    path: "/comparison-2026",
    category: "Synthesis & Action",
    question: "How do provisional 2026 records conform to the historical multi-year baseline?",
    description: "Matched-window analysis of the 32-week 2026 monitoring window versus the four-year baseline, explaining seasonal truncation bias.",
    keyMetric: "Weeks 01–32 (2026) · 45 Records · Matched-Window Control",
    connectedLeadIn: "Testing whether current outbreak trajectories track the 2022–2025 historical envelope.",
    connectedLeadOut: "Next: Translate all 9 empirical acts into 5 operational public health intervention pillars in Act 10 Actionable Findings →"
  },
  {
    id: "findings",
    actNumber: 10,
    chapterNumber: 10,
    chapterCode: "10",
    movementNumber: "MOVEMENT IV",
    movementTitle: "Synthesis & Action",
    title: "Actionable Public Health Pillars",
    shortTitle: "Findings & Recommendations",
    path: "/findings",
    category: "Synthesis & Action",
    question: "What operational policies and pre-monsoon protocols arise from these scientific proofs?",
    description: "Five targeted public-health recommendations, empirical conclusions, uncertainties, and future research directions.",
    keyMetric: "5 Evidence-Based Action Pillars · Pre-Monsoon Deployment",
    connectedLeadIn: "Synthesis of 4 years of epidemiological data, statistical proofs, and clinical fieldwork.",
    connectedLeadOut: "Complete research investigation. Review primary sources and auditable ledgers in Chapter 11 Sources →"
  },
  {
    id: "sources",
    actNumber: 11,
    chapterNumber: 11,
    chapterCode: "11",
    movementNumber: "REPRODUCIBILITY",
    movementTitle: "Sources & Auditable Archive",
    title: "Sources & Auditable Archive",
    shortTitle: "Sources & Archive",
    path: "/sources",
    category: "Sources & Archive",
    question: "Where can every bulletin, dataset, and code pipeline used in this study be independently verified and audited?",
    description: "Primary government bulletin registry, research data repository links, references, data dictionaries, and printable PDF export.",
    keyMetric: "100% Reproducible & Auditable · Open Repository",
    connectedLeadIn: "Access the raw government PDFs and extraction scripts underlying all 10 Acts.",
    connectedLeadOut: "End of investigation repository. Return to Act 01 Surveillance Vault →"
  }
];

export function getChapterByPath(pathname: string): ResearchChapter | undefined {
  if (pathname === "/") return RESEARCH_CHAPTERS[0];
  const normalized = pathname.replace(/\/$/, "");
  return RESEARCH_CHAPTERS.find(c => c.path === normalized);
}

export function getChapterByNumber(num: number): ResearchChapter | undefined {
  return RESEARCH_CHAPTERS.find(c => c.chapterNumber === num || c.actNumber === num);
}
