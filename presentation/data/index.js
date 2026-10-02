/**
 * FROZEN RESEARCH DATA REPOSITORY FOR PRESENTATION
 * Source Authority: Phase 5A, Phase 5B, Phase 5C, Phase 5D, Phase 5E
 * All metrics strictly anchored to official NCDC/IDSP weekly outbreak surveillance.
 */

module.exports = {
  // Calendar Months
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  // Taxonomy Cascade
  taxonomy: {
    surveillanceWeeks: 237,        // Total surveillance weeks archived (2022-2026 W32)
    curatedRecords: 809,          // Total curated analytical records
    rawStrings: 116,              // Unique raw disease strings from PDFs
    cleanedLabels: 56,            // Normalized analytical disease labels
    diseaseFamilies: 30,          // Grouped clinical/epidemiological families
    primaryFamilies: 5            // Screened primary analytical study cohort
  },

  // 4-Year Baseline Aggregates (2022–2025 Completed Calendar Years)
  baseline: {
    period: "2022–2025",
    totalRecords: 539,
    totalCases: 21955,
    totalDeaths: 266,
    districtsReporting: 36,
    
    // Disease Family Specific Baselines
    byDisease: {
      dengue: {
        name: "Dengue",
        records: 204,
        cases: 3144,
        deaths: 93,
        peakWindow: "June–October",
        windowShare: "82.8%",
        cr3: 0.505,
        cr3Window: "Aug–Oct",
        kendallW: 0.405,
        pValue: 0.086,
        stability: "Moderate Inter-Annual Concordance (Non-Significant)",
        monthlyEvents: [4, 2, 5, 12, 15, 27, 26, 20, 36, 40, 15, 2],
        monthlyCases: [71, 15, 112, 147, 199, 507, 497, 461, 392, 566, 157, 20]
      },
      add: {
        name: "Acute Diarrheal Disease",
        records: 153,
        cases: 9050,
        deaths: 93,
        peakWindow: "June–August & October",
        windowShare: "43.1%",
        cr3: 0.431,
        cr3Window: "Jun–Aug",
        kendallW: 0.530,
        pValue: 0.016,
        stability: "Statistically Significant Concordance (p < 0.05)",
        monthlyEvents: [3, 9, 14, 6, 5, 19, 22, 16, 13, 25, 7, 14],
        monthlyCases: [151, 1582, 635, 180, 289, 846, 1040, 1300, 633, 1383, 493, 518]
      },
      malaria: {
        name: "Malaria",
        records: 70,
        cases: 2133,
        deaths: 51,
        peakWindow: "May–July",
        windowShare: "51.4%",
        cr3: 0.514,
        cr3Window: "May–Jul",
        kendallW: 0.319,
        pValue: 0.229,
        stability: "Weak Concordance / Inter-Annual Volatility",
        monthlyEvents: [2, 3, 3, 1, 7, 15, 14, 7, 7, 3, 2, 6],
        monthlyCases: [198, 15, 347, 25, 374, 227, 190, 108, 139, 55, 7, 448]
      },
      foodPoisoning: {
        name: "Food Poisoning",
        records: 69,
        cases: 5927,
        deaths: 29,
        peakWindow: "Jan–Feb & Apr–May (Bimodal)",
        windowShare: "55.1%",
        cr3: 0.449,
        cr3Window: "Apr, May, Feb",
        kendallW: 0.260,
        pValue: 0.380,
        stability: "Point-Source Non-Concordant (p = 0.380)",
        monthlyEvents: [7, 11, 4, 9, 11, 5, 2, 4, 7, 4, 0, 5],
        monthlyCases: [410, 2162, 199, 899, 894, 236, 47, 255, 182, 399, 0, 244]
      },
      chikungunya: {
        name: "Chikungunya",
        records: 43,
        cases: 701,
        deaths: 0,
        peakWindow: "May–July & Sep–Nov",
        windowShare: "69.8%",
        cr3: 0.419,
        cr3Window: "May, Jun, Sep",
        kendallW: 0.221,
        pValue: 0.490,
        stability: "High Noise / Low Count Volatility",
        monthlyEvents: [1, 1, 5, 2, 6, 6, 4, 3, 5, 4, 5, 1],
        monthlyCases: [17, 15, 38, 17, 60, 76, 57, 48, 126, 164, 78, 5]
      }
    }
  },

  // Outlier Sensitivity Breakdown (Food Poisoning February)
  outliers: {
    foodPoisoningFeb: {
      district1: { district: "Kolhapur", cases: 651, week: "2024 W07", type: "Single Institutional Outbreak" },
      district2: { district: "Parbhani", cases: 629, week: "2025 W06", type: "Single Point-Source Outbreak" },
      district3: { district: "Solapur", cases: 335, week: "2023 W06", type: "Single Localized Outbreak" },
      combinedThreeCases: 1615,
      totalFebCases: 2162,
      percentOfFebCases: "74.7%",
      totalBaselineCases: 5927,
      percentOfBaselineCases: "27.3%",
      analyticalTakeaway: "Three single outbreak records out of 69 generate over a quarter of all four-year cases, demonstrating severe case-volume distortion."
    },
    addOutlier: {
      district: "Nanded",
      cases: 1000,
      week: "2024 W06",
      recordId: "MAHA-2024-W06-001",
      analyticalTakeaway: "Single 1,000-case institutional outbreak creates an artificial February case peak in an otherwise monsoon-dominated diarrheal curve."
    }
  },

  // 2026 Out-of-Sample Partial-Year Surveillance (Weeks 01–32)
  outOfSample2026: {
    period: "2026 W01–W32 (Partial-Year)",
    totalPrimaryRecords: 45,
    totalPrimaryCases: 1118,
    totalPrimaryDeaths: 0,
    byDisease: [
      { disease: "Food Poisoning", records: 19, cases: 375, note: "Early-year elevation (+49.0% vs historical mean 12.8; all 19 labeled 'Suspected')" },
      { disease: "Acute Diarrheal Disease", records: 16, cases: 679, note: "Monsoon onset cluster tracking expected historical curve" },
      { disease: "Dengue", records: 6, cases: 36, note: "Severely truncated: historical data proves 55.4% of Dengue outbreaks occur post-W32" },
      { disease: "Malaria", records: 2, cases: 18, note: "Low early reporting in monitored weeks" },
      { disease: "Chikungunya", records: 2, cases: 10, note: "Low volume baseline observation" }
    ],
    boundaryWarning: "DO NOT extrapolate or compare directly against complete 52-week baselines. 2026 demonstrates seasonal truncation and early-year reporting sensitivity."
  }
};
