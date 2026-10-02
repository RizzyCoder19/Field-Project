/**
 * CORE RESEARCH & SURVEILLANCE DATA ARCHIVE
 * Project: Analysis of Seasonal Disease Patterns Using Government Health Data
 * Candidate: Khan Umar | B.Sc. Data Science | RP Institute, University of Mumbai
 * 
 * STRICT DATA INTEGRITY RULES APPLIED:
 * Baseline (2022–2025): 539 records, 21,955 cases, 266 deaths
 * Primary Cohort:
 * - Dengue: 204 records, 3,144 cases, 93 deaths, 31 districts
 * - ADD: 153 records, 9,050 cases, 93 deaths, 33 districts
 * - Malaria: 70 records, 2,133 cases, 51 deaths, 15 districts
 * - Food Poisoning: 69 records, 5,927 cases, 29 deaths, 27 districts
 * - Chikungunya: 43 records, 701 cases, 0 deaths, 15 districts
 * 2026 W01–W32: 45 primary records, 1,118 cases, 0 deaths
 * Coverage: 237 surveillance weeks, 203 outbreak weeks, 34 NIL weeks, 809 analytical records
 */

export interface DiseaseProfile {
  id: string;
  name: string;
  shortName: string;
  category: "Vector-Borne" | "Water-Borne" | "Food-Borne";
  records: number;
  cases: number;
  deaths: number;
  districts: number;
  peakMonths: string;
  cr3: number;
  cr3Window: string;
  kendallW: number;
  kendallP: number;
  isSignificant: boolean;
  color: string;
  accentColor: string;
  monthlyEvents: number[]; // Jan - Dec
  monthlyCases: number[];  // Jan - Dec
  summary: string;
  keyInsights: string[];
  fieldworkLinkage: string;
}

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const MONTH_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const RESEARCH_METRICS = {
  surveillanceWeeks: 237,
  outbreakWeeks: 203,
  nilWeeks: 34,
  analyticalRecords: 809,
  primaryCohortRecords: 539,
  reportedCases: 21955,
  reportedDeaths: 266,
  districtsCovered: 36,
  baselineYears: "2022–2025",
  outOfSampleWindow: "2026 W01–W32",
  primaryFamiliesCount: 5,
  rawStringsCount: 116,
  cleanLabelsCount: 56,
  syndromicFamiliesCount: 30
};

export const SURVEILLANCE_COVERAGE = [
  {
    year: "2022",
    totalWeeks: 52,
    publishedWeeks: 52,
    outbreakWeeks: 36,
    nilWeeks: 16,
    records: 79,
    status: "Complete",
    notes: "Baseline initial year; periodic seasonal reporting."
  },
  {
    year: "2023",
    totalWeeks: 52,
    publishedWeeks: 49,
    outbreakWeeks: 38,
    nilWeeks: 11,
    records: 202,
    status: "3 Missing Published Weeks",
    notes: "Weeks 15, 51, and 52 were not published by NCDC."
  },
  {
    year: "2024",
    totalWeeks: 52,
    publishedWeeks: 52,
    outbreakWeeks: 52,
    nilWeeks: 0,
    records: 287,
    status: "Complete (100% Outbreak Active)",
    notes: "Highest reporting density; every single calendar week contained ≥1 outbreak record."
  },
  {
    year: "2025",
    totalWeeks: 52,
    publishedWeeks: 52,
    outbreakWeeks: 48,
    nilWeeks: 4,
    records: 165,
    status: "Complete",
    notes: "Consistent reporting across all quarters."
  },
  {
    year: "2026 W01–W32",
    totalWeeks: 32,
    publishedWeeks: 32,
    outbreakWeeks: 29,
    nilWeeks: 3,
    records: 76,
    status: "Out-of-Sample Partial Year",
    notes: "Observation window terminates at Week 32. 45 records belong to the 5 primary families."
  }
];

export const PRIMARY_DISEASES: Record<string, DiseaseProfile> = {
  dengue: {
    id: "dengue",
    name: "Dengue Fever",
    shortName: "Dengue",
    category: "Vector-Borne",
    records: 204,
    cases: 3144,
    deaths: 93,
    districts: 31,
    peakMonths: "September – October (Peak: October with 40 events)",
    cr3: 0.505,
    cr3Window: "August – October (50.5%)",
    kendallW: 0.405,
    kendallP: 0.086,
    isSignificant: false,
    color: "#38BDF8", // analytical blue
    accentColor: "#0284C7",
    monthlyEvents: [4, 2, 5, 12, 15, 27, 26, 20, 36, 40, 15, 2],
    monthlyCases: [71, 15, 112, 147, 199, 507, 497, 461, 392, 566, 157, 20],
    summary: "Dengue exhibits strong late-monsoon and post-monsoon concentration, with 82.8% of all baseline events occurring between June and October. Peak event frequency occurs in October (40 events, 566 cases).",
    keyInsights: [
      "Concentration window: August–October captures 50.5% of all events.",
      "High geographical footprint: Reported across 31 of Maharashtra's 36 administrative districts.",
      "Kendall's W = 0.405 (p = 0.086): High concentration, but annual peak month oscillates between September and October across individual years.",
      "2026 Truncation note: Historically, 55.4% of Dengue outbreaks occur after Week 32. Hence, 2026 W01–W32 (6 events) cannot be used as an annual comparison."
    ],
    fieldworkLinkage: "Field observation checklists specifically monitor domestic clean-water storage (drums, overhead tanks, cooler trays) which serve as Aedes breeding habitats during post-monsoon dry spells."
  },
  add: {
    id: "acute-diarrheal-disease",
    name: "Acute Diarrheal Disease",
    shortName: "ADD",
    category: "Water-Borne",
    records: 153,
    cases: 9050,
    deaths: 93,
    districts: 33,
    peakMonths: "June – August (with secondary October elevation)",
    cr3: 0.431,
    cr3Window: "June – August (43.1%)",
    kendallW: 0.530,
    kendallP: 0.016,
    isSignificant: true,
    color: "#10B981", // verified emerald
    accentColor: "#059669",
    monthlyEvents: [3, 9, 14, 6, 5, 19, 22, 16, 13, 25, 7, 14],
    monthlyCases: [151, 1582, 635, 180, 289, 846, 1040, 1300, 633, 1383, 493, 518],
    summary: "ADD demonstrates sustained elevation throughout the monsoon months (June–August) followed by a secondary peak in October (25 events, 1,383 cases). Notably, it is the ONLY disease with statistically significant inter-annual rank concordance (W = 0.530, p = 0.016).",
    keyInsights: [
      "Statistically significant stability: Kendall's W = 0.530 (p = 0.016) confirms that its 12-month ranking profile repeats consistently year after year.",
      "Largest case burden: Generates 9,050 reported cases from 153 events (mean 59.2 cases per outbreak).",
      "February case volume anomaly: 1,582 cases reported across 9 events, demonstrating high cluster severity.",
      "Widespread coverage: Observed across 33 districts, the highest geographical footprint in the study."
    ],
    fieldworkLinkage: "Field questionnaires investigate pipeline cross-contamination, reliance on tanker water, and household chlorination habits during pre-monsoon and monsoon water disruption."
  },
  malaria: {
    id: "malaria",
    name: "Malaria",
    shortName: "Malaria",
    category: "Vector-Borne",
    records: 70,
    cases: 2133,
    deaths: 51,
    districts: 15,
    peakMonths: "May – July (Pre-Monsoon & Early Monsoon)",
    cr3: 0.514,
    cr3Window: "May – July (51.4%)",
    kendallW: 0.319,
    kendallP: 0.229,
    isSignificant: false,
    color: "#D4AF37", // imperial gold
    accentColor: "#B45309",
    monthlyEvents: [2, 3, 3, 1, 7, 15, 14, 7, 7, 3, 2, 6],
    monthlyCases: [198, 15, 347, 25, 374, 227, 190, 108, 139, 55, 7, 448],
    summary: "Malaria displays early-season concentration, peaking ahead of Dengue during the pre-monsoon and onset phases (May–July, 51.4% of events). Geographically, it is heavily localized in eastern forested districts.",
    keyInsights: [
      "High geographical concentration: 43 of 70 events (61.4%) occur in Gadchiroli and Chandrapur districts alone.",
      "Early temporal surge: Peak occurs in June (15 events) and July (14 events), requiring earlier pre-positioning than post-monsoon diseases.",
      "Kendall's W = 0.319 (p = 0.229): Moderate ranking agreement without meeting formal statistical significance.",
      "December case surge: 448 cases from 6 events indicates secondary winter cluster activity in tribal belts."
    ],
    fieldworkLinkage: "Field methodology includes key informant interviews with ASHA workers and primary health doctors in forest-fringe communities regarding bed net distribution and early fever diagnosis."
  },
  foodPoisoning: {
    id: "food-poisoning",
    name: "Food Poisoning",
    shortName: "Food Poisoning",
    category: "Food-Borne",
    records: 69,
    cases: 5927,
    deaths: 29,
    districts: 27,
    peakMonths: "Bimodal: January–February and April–May",
    cr3: 0.449,
    cr3Window: "April, May, February (44.9%)",
    kendallW: 0.386,
    kendallP: 0.108,
    isSignificant: false,
    color: "#EF4444", // outlier ruby
    accentColor: "#DC2626",
    monthlyEvents: [7, 11, 4, 9, 11, 5, 2, 4, 7, 4, 0, 5],
    monthlyCases: [410, 2162, 199, 899, 894, 236, 47, 255, 182, 399, 0, 244],
    summary: "Food Poisoning exhibits a distinctly non-monsoon, bimodal distribution with peaks in Jan–Feb (26.1%) and Apr–May (29.0%). It is the prime exemplar of event-frequency vs. case-volume divergence.",
    keyInsights: [
      "The Three Outlier Records: 3 single records account for 1,615 cases (Kolhapur 2024 W07: 651 cases; Parbhani 2025 W06: 629 cases; Solapur 2023 W06: 335 cases).",
      "Sensitivity impact: These 3 records represent 74.7% of all February cases and 27.3% of the entire 4-year baseline total.",
      "No causal speculation: Data reports mass-exposure clusters without attributing causes to catering, weddings, or street vendors.",
      "2026 Classification insight: 19 events recorded in 2026 W01–W32 were 100% labeled 'Suspected' in source PDFs."
    ],
    fieldworkLinkage: "Fieldwork observation protocols examine community banquet hygiene, public midday meal storage, and vendor water sources in institutional gathering spaces."
  },
  chikungunya: {
    id: "chikungunya",
    name: "Chikungunya",
    shortName: "Chikungunya",
    category: "Vector-Borne",
    records: 43,
    cases: 701,
    deaths: 0,
    districts: 15,
    peakMonths: "Dispersed (Mild elevations in May, June, September)",
    cr3: 0.419,
    cr3Window: "May, June, September (41.9%)",
    kendallW: 0.150,
    kendallP: 0.832,
    isSignificant: false,
    color: "#A78BFA", // secondary purple
    accentColor: "#7C3AED",
    monthlyEvents: [1, 1, 5, 2, 6, 6, 4, 3, 5, 4, 5, 1],
    monthlyCases: [17, 15, 38, 17, 60, 76, 57, 48, 126, 164, 78, 5],
    summary: "Chikungunya demonstrates low baseline event counts dispersed across the year without a single dominant recurring calendar peak. It recorded 0 surveillance fatalities across the 2022–2025 baseline.",
    keyInsights: [
      "No recurring seasonal pattern: Kendall's W = 0.150 (p = 0.832) indicates near-random ranking agreement between years.",
      "Zero surveillance deaths: 0 fatalities recorded among 701 enumerated outbreak cases.",
      "Lower case volume: Averages 16.3 cases per investigated outbreak, lower than other vector-borne diseases.",
      "Post-monsoon case elevation: Cases peak mildly in October (164 cases) and September (126 cases)."
    ],
    fieldworkLinkage: "Field instruments evaluate community ability to distinguish Chikungunya joint pain symptoms from Dengue and general viral fevers."
  }
};

export const OUTLIER_SENSITIVITY_DATA = {
  threeRecords: [
    { district: "Kolhapur", year: 2024, week: "W07", cases: 651 },
    { district: "Parbhani", year: 2025, week: "W06", cases: 629 },
    { district: "Solapur", year: 2023, week: "W06", cases: 335 }
  ],
  totalCases: 1615,
  febTotalCases: 2162,
  febRemainingCases: 547,
  febOutlierShare: 74.7,
  fourYearTotalCases: 5927,
  fourYearOutlierShare: 27.3,
  beforeCases: [410, 2162, 199, 899, 894, 236, 47, 255, 182, 399, 0, 244],
  afterCases:  [410, 547,  199, 899, 894, 236, 47, 255, 182, 399, 0, 244]
};

export const FIELDWORK_STATUS = {
  stage: "PLANNED FIELDWORK INSTRUMENTS",
  isCompleted: false,
  actualCollectedResponses: 0,
  actualCollectedInterviews: 0,
  actualCollectedObservations: 0,
  disclaimer: "All fieldwork materials present on this portal represent structured instruments, interview guides, and observation protocols prepared for field deployment. No fabricated respondent answers or simulated field results are included."
};

export const EVIDENCE_CATEGORIES = [
  {
    code: "A",
    title: "Actual Primary Evidence",
    status: "Reserved for Post-Deployment Data",
    count: 0,
    description: "Physical community surveys, transcribed recordings, and verified field notes collected during actual field execution."
  },
  {
    code: "B",
    title: "Reference Field Material",
    status: "Secondary Benchmarks Cataloged",
    count: 12,
    description: "Official government manuals, NVBDCP vector control guidelines, municipal health circulars, and census baseline tables."
  },
  {
    code: "C",
    title: "Planned Fieldwork Instruments",
    status: "Standardized & Ready for Deployment",
    count: 4,
    description: "50-Question Master Questionnaire, 20-Question Rapid Form, Key Informant Interview Guide, and Environmental Checklist."
  }
];

export const METHODOLOGY_STAGES = [
  { step: 1, title: "Official Weekly Reports Acquisition", desc: "Downloaded and archived 237 weekly epidemiological outbreak bulletins published by NCDC / IDSP." },
  { step: 2, title: "Structured Extraction", desc: "Extracted 809 raw outbreak rows specifically reported across Maharashtra's 36 administrative districts." },
  { step: 3, title: "Source Provenance Preservation", desc: "Every extracted row is permanently mapped to its originating PDF bulletin filename and table page number." },
  { step: 4, title: "Additive Label Normalization", desc: "Harmonized 116 raw disease spelling variants into 56 clean canonical labels while preserving source strings in 'disease_raw'." },
  { step: 5, title: "Syndromic & Primary Cohort Grouping", desc: "Grouped labels into 30 syndromic families and isolated 5 primary study families representing 93.9% of baseline records." },
  { step: 6, title: "Temporal Matrix Aggregation", desc: "Aggregated outbreak records and case volumes by epidemiological week, calendar month, and calendar year." },
  { step: 7, title: "Seasonal Concentration Analysis", desc: "Calculated 3-month concentration ratios (CR3) to determine clustering degree within specific calendar windows." },
  { step: 8, title: "Inter-Annual Stability Testing", desc: "Evaluated 12-month rank concordance across 2022–2025 using Kendall's W coefficient of concordance (tested at α = 0.05)." },
  { step: 9, title: "Outlier Sensitivity Decomposition", desc: "Isolated single high-volume records to evaluate distortion between outbreak frequency and case enumeration." },
  { step: 10, title: "District Geographic Footprinting", desc: "Mapped district reporting breadth to differentiate statewide endemic syndromes from localized ecological clusters." },
  { step: 11, title: "2026 Matched-Window Comparison", desc: "Benchmarked partial-year 2026 W01–W32 surveillance against historical baseline with explicit truncation qualifications." }
];
