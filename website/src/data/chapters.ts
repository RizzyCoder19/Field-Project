export interface ResearchChapter {
  id: string;
  chapterNumber: number;
  chapterCode: string;
  title: string;
  shortTitle: string;
  path: string;
  category: "Overview" | "Data & Cohorts" | "Seasonal Analysis" | "Spatial & Stability" | "Sensitivity & Comparison" | "Field Evidence" | "Synthesis & Method";
  question: string;
  description: string;
  keyMetric?: string;
}

export const RESEARCH_CHAPTERS: ResearchChapter[] = [
  {
    id: "overview",
    chapterNumber: 1,
    chapterCode: "01",
    title: "Introduction & Project Overview",
    shortTitle: "Overview",
    path: "/",
    category: "Overview",
    question: "Do patterns of reported disease outbreaks in Maharashtra change with the seasons, and do those patterns repeat from year to year?",
    description: "An epidemiological exploration of government surveillance records covering 2022–2025, partial 2026 monitoring, and primary facility fieldwork in Palghar district.",
    keyMetric: "539 records · 20,955 cases · 4 years"
  },
  {
    id: "data",
    chapterNumber: 2,
    chapterCode: "02",
    title: "Understanding the Data",
    shortTitle: "The Data Archive",
    path: "/data",
    category: "Data & Cohorts",
    question: "How does a weekly government surveillance bulletin become a structured, auditable epidemiological record?",
    description: "Documenting the extraction, taxonomic cleaning, and surveillance coverage of 237 weekly NCDC/IDSP bulletins across 2022–2025.",
    keyMetric: "237 weeks · 203 outbreak · 34 NIL"
  },
  {
    id: "diseases",
    chapterNumber: 3,
    chapterCode: "03",
    title: "The Five Disease Groups",
    shortTitle: "Five Diseases",
    path: "/diseases",
    category: "Data & Cohorts",
    question: "Which disease groups drive government surveillance in Maharashtra, and how do their clinical burdens differ?",
    description: "In-depth profiles of Dengue, Acute Diarrhoeal Disease, Malaria, Food Poisoning, and Chikungunya comprising 73.5% of all baseline records.",
    keyMetric: "539 of 733 records (73.5%)"
  },
  {
    id: "seasonality",
    chapterNumber: 4,
    chapterCode: "04",
    title: "Discovering Seasonal Patterns",
    shortTitle: "Seasonality",
    path: "/seasonality",
    category: "Seasonal Analysis",
    question: "When does disease actually surge across Maharashtra, and how does outbreak frequency diverge from case count?",
    description: "Interactive 12-month seasonal clock, comparative monthly chart, and 5×12 heatmap exploring temporal concentrations and CR3 metrics.",
    keyMetric: "Dengue Jun–Oct 73.0% · ADD Jun–Aug 43.1%"
  },
  {
    id: "geography",
    chapterNumber: 5,
    chapterCode: "05",
    title: "Geographic Reporting Patterns",
    shortTitle: "Geography",
    path: "/geography",
    category: "Spatial & Stability",
    question: "Are seasonal outbreaks distributed evenly across Maharashtra, or clustered in distinct ecological and administrative micro-regions?",
    description: "Interactive 36-district Maharashtra map illustrating disease footprint and the focal eastern forest cluster in Gadchiroli and Chandrapur.",
    keyMetric: "Malaria: 61.4% in 2 eastern districts"
  },
  {
    id: "stability",
    chapterNumber: 6,
    chapterCode: "06",
    title: "Do Patterns Repeat? (Stability)",
    shortTitle: "Stability",
    path: "/stability",
    category: "Spatial & Stability",
    question: "Did the observed seasonal peaks repeat consistently from year to year, or did timing shift between calendar years?",
    description: "Non-parametric Kendall's W rank concordance analysis across the four baseline years (2022–2025), testing annual recurrence.",
    keyMetric: "ADD Kendall's W = 0.530 (p = 0.016)"
  },
  {
    id: "outliers",
    chapterNumber: 7,
    chapterCode: "07",
    title: "Investigating Outbreak Outliers",
    shortTitle: "Outlier Sensitivity",
    path: "/outliers",
    category: "Sensitivity & Comparison",
    question: "How do isolated mass-exposure events alter aggregated monthly curves, and why is sensitivity testing necessary?",
    description: "Waterfall decomposition of three extreme food poisoning events totaling 1,615 cases, revealing the divergence between cases and event frequency.",
    keyMetric: "Feb cases: 2,162 down to 547"
  },
  {
    id: "comparison-2026",
    chapterNumber: 8,
    chapterCode: "08",
    title: "The Partial 2026 Comparison",
    shortTitle: "2026 Window",
    path: "/comparison-2026",
    category: "Sensitivity & Comparison",
    question: "How do Weeks 1–32 of 2026 compare with historical baseline data, and why must partial-year data be interpreted with caution?",
    description: "Matched-window analysis of the 32-week 2026 monitoring window versus the four-year baseline, explaining seasonal truncation bias.",
    keyMetric: "45 records · 2,126 cases · 0 deaths"
  },
  {
    id: "fieldwork",
    chapterNumber: 9,
    chapterCode: "09",
    title: "Inside the Field Visit",
    shortTitle: "Field Visit",
    path: "/fieldwork",
    category: "Field Evidence",
    question: "What does primary facility-level observation reveal that aggregated state surveillance bulletins cannot capture?",
    description: "Interactive curtain-reveal photo essay and key-informant interview at an urban health post in Palghar district on 2 October 2026.",
    keyMetric: "1 facility visit · 1 MO interview · 10 notes"
  },
  {
    id: "findings",
    chapterNumber: 10,
    chapterCode: "10",
    title: "Findings & Recommendations",
    shortTitle: "Findings",
    path: "/findings",
    category: "Synthesis & Method",
    question: "What actionable conclusions emerge when surveillance statistics and primary qualitative fieldwork are synthesized?",
    description: "Five targeted public-health recommendations, empirical conclusions, uncertainties, and future research directions.",
    keyMetric: "5 evidence-based public health actions"
  },
  {
    id: "method",
    chapterNumber: 11,
    chapterCode: "11",
    title: "Methodology & Limitations",
    shortTitle: "Methodology",
    path: "/method",
    category: "Synthesis & Method",
    question: "What analytical pipeline transformed raw government PDFs into research findings, and what limitations constrain interpretation?",
    description: "A 12-stage methodology pipeline with progressive disclosure, detailing extraction, taxonomy, aggregation, and critical study caveats.",
    keyMetric: "12 analytical stages · 5 explicit caveats"
  },
  {
    id: "sources",
    chapterNumber: 12,
    chapterCode: "12",
    title: "Sources & Auditable Archive",
    shortTitle: "Sources & Archive",
    path: "/sources",
    category: "Synthesis & Method",
    question: "Where can every bulletin, dataset, and code pipeline used in this study be independently verified and audited?",
    description: "Primary government bulletin registry, research data repository links, references, data dictionaries, and printable PDF export.",
    keyMetric: "100% reproducible & auditable"
  }
];

export function getChapterByPath(pathname: string): ResearchChapter | undefined {
  if (pathname === "/") return RESEARCH_CHAPTERS[0];
  const normalized = pathname.replace(/\/$/, "");
  return RESEARCH_CHAPTERS.find(c => c.path === normalized);
}

export function getChapterByNumber(num: number): ResearchChapter | undefined {
  return RESEARCH_CHAPTERS.find(c => c.chapterNumber === num);
}
