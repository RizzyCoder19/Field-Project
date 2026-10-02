const fs = require('fs');
const path = require('path');

const outDir = 'data_pipeline/phase5D_interpretation_validation';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper to escape CSV fields
function csvRow(fields) {
  return fields.map(val => {
    if (val === null || val === undefined) return '""';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes(';')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }).join(',');
}

// -------------------------------------------------------------
// FILE 1: 01_DISEASE_EVIDENCE_SYNTHESIS.csv
// -------------------------------------------------------------
const file1Headers = [
  'disease_family',
  'baseline_records',
  'total_reported_cases',
  'total_reported_deaths',
  'temporal_concentration',
  'high_activity_months_windows',
  'year_to_year_stability',
  'peak_timing_behavior',
  'event_case_divergence',
  'outlier_sensitivity',
  'district_concentration',
  'statistical_evidence',
  '2026_observation',
  'major_limitation',
  'overall_evidence_interpretation'
];

const file1Data = [
  [
    'Dengue',
    204,
    3144,
    93,
    'High Concentration (Event CV=0.736, Case CV=0.756, CR3=50.5%, Gini=0.414)',
    'Discrete high-activity reported-event months: Oct (19.6%), Sep (17.6%), Jun (13.2%); June-October calendar window accounts for 82.8% of reported events',
    'Moderate Stability (Kendall\'s W=0.405, p=0.086, exploratory); 51.0% of baseline events concentrated in single high-volume year (2023)',
    'Peak reported-event month oscillates within 5-month window: 2022 (Sep), 2023 (Oct), 2024 (Jun & Jul tied), 2025 (Aug); max displacement 4 months',
    'Balanced throughout the year (Event CR3=50.5%, Case CR3=49.9%); October is peak month for both reported events (19.6%) and reported cases (18.0%)',
    'Highly resilient; no single record dominates; excluding top events does not shift October peak reported-event or reported-case month',
    'Broad statewide reporting across 31 districts; 8 qualifying districts (N >= 10: Thane, Beed, Raigad, Kolhapur, Nanded, Aurangabad, Akola, Pune) broadly aligned with late-year reporting (Sep-Oct)',
    'Kruskal-Wallis H=35.325 (p=0.00022, Bonferroni-sig); Permutation Chi2=110.353 (p=0.0001, Bonferroni-sig); Kendall\'s W=0.405 (p=0.086, non-sig)',
    '6 events in W01-W32 (historical mean 22.8, -73.6%); severe truncation caveat as Dengue historically reports only 44.6% of events in W01-W32',
    '2023 reporting surge (104/204 events, 51.0%) heavily weights aggregate profile; 2023 archive missing weeks 15, 51, 52',
    'Strong descriptive evidence of reporting concentration in the second half of the calendar year (June-October), with inter-annual variation in specific peak months and high resilience against individual event outliers.'
  ],
  [
    'Acute Diarrheal Disease',
    153,
    9050,
    93,
    'Moderate Concentration (Event CV=0.524, Case CV=0.609, CR3=43.1%, Gini=0.298)',
    'Contiguous high-activity reported-event window: Jun-Aug (43.1% event share; Jun=12.4%, Jul=14.4%, Aug=10.5%); secondary event elevation in Oct (16.3%)',
    'Moderate Stability with highest rank concordance (Kendall\'s W=0.530, p=0.016, exploratory FDR-sig); 3 of 4 years show elevated Jun-Aug reporting; 2024 contributes 46.4% of events',
    'Dispersed peak reported-event month timing across years: 2022 (Dec), 2023 (Jun & Aug tied), 2024 (Jul), 2025 (Oct); max displacement 6 months',
    'Severe divergence in February: 9 events (5.9%) generated 1,582 cases (17.5%), creating artificial #1 peak reported-case month driven by a single institutional event',
    'Highly sensitive to single institutional outbreak: MAHA-2024-W06-001 (Nanded, 1,000 cases); excluding it shifts peak reported-case month from Feb to Oct (17.2%) and Aug (16.9%)',
    'Broad reporting across 33 districts; 3 qualifying districts (N >= 10: Nagpur, Amravati, Kolhapur) accounting for 21.5% of baseline events; mortality concentrated in Dec 2022 (Week 49 cluster: 78 deaths)',
    'Kruskal-Wallis H=16.251 (p=0.132, non-sig); Permutation Chi2=42.059 (p=0.0001, Bonferroni-sig); Kendall\'s W=0.530 (p=0.016, FDR-sig)',
    '18 events in W01-W32 (historical mean 21.8, -17.2%); near historical volume; all 18 records in 2026 used the British spelling "Diarrhoeal"',
    'Extreme sensitivity of case distributions to mass-exposure institutional clusters; non-significant Kruskal-Wallis indicates high within-month event variance across years',
    'Moderate descriptive evidence of a mid-year reported-event elevation (June-August), with recurring monthly rank profiles across years, but aggregate case volumes are distorted by isolated high-case outbreaks.'
  ],
  [
    'Malaria',
    70,
    2133,
    51,
    'High Concentration (Event CV=0.753, Case CV=0.802, CR3=51.4%, Gini=0.395)',
    'Contiguous high-activity reported-event window: May-Jul (51.4% event share; Jun=21.4%, Jul=20.0%, May=10.0%)',
    'High recurrence of timing window across all 4 years (May-Jul), with moderate-low rank concordance (Kendall\'s W=0.319, p=0.229, non-sig due to small annual sample sizes)',
    'Tightly constrained peak reported-event timing: 2022 (May), 2023 (May, Aug, Sep, Dec tied), 2024 (Jul), 2025 (Jun); max displacement 2 months within core May-Jul window',
    'Reported case distribution shows artificial December peak (21.0%, 448 cases) due to a single 385-case cluster in Week 01 / late Dec; peak reported-event month is firmly in June (21.4%)',
    'Sensitive to single cluster: MAHA-2024-W01-002 (Gadchiroli, 385 cases); excluding it resolves case distribution back to May (21.4%) and Jun (16.2%), aligning cases with events',
    'Extreme geographic concentration: Gadchiroli (27 events, 38.6%) and Chandrapur (16 events, 22.9%) account for 61.4% of all baseline reported Malaria events in Maharashtra',
    'Kruskal-Wallis H=26.503 (p=0.00546, FDR-sig); Permutation Chi2=39.714 (p=0.0001, Bonferroni-sig); Kendall\'s W=0.319 (p=0.229, non-sig)',
    'Marked surveillance deficit: 1 event in W01-W32 (historical mean 12.0, -91.7%), located in Gadchiroli; reflects either surveillance reporting lag or localized reduction in reported events',
    'Severe geographic concentration means statewide surveillance pattern reflects the reporting record of two contiguous Eastern Vidarbha districts',
    'Moderate descriptive evidence with high spatial localization: highly consistent May-July reported-event timing, but the pattern represents specific Eastern Vidarbha districts rather than a uniform statewide pattern.'
  ],
  [
    'Food Poisoning',
    69,
    5927,
    29,
    'Moderate Event Concentration (CV=0.564, CR3=44.9%), but Extreme Case Concentration (Case CV=1.160, Case CR3=66.7%, Case Gini=0.534)',
    'Discontinuous bimodal reported-event clusters: late winter (Jan/Feb, 26.1% events) and late spring (Apr/May, 29.0% events); February case surge (36.5% of cases)',
    'Moderate Stability (Kendall\'s W=0.386, p=0.108, non-sig); 2025 contributes 42.0% of events; intermittent point-source clustering rather than continuous multi-month reporting',
    'Peak reported-event month shifts between winter and spring: 2022 (May), 2023 (Feb & May tied), 2024 (Feb), 2025 (Jan & Apr tied); max displacement 4 months',
    'Extreme divergence: February accounts for 15.9% of events but 36.5% of cases (mean 196.5 cases/event vs 85.9 overall); driven by a small number of high-case outbreak records',
    'Extreme outlier sensitivity: February case volume is strongly influenced by three high-case outbreak records (Kolhapur 651 cases, Parbhani 629 cases, Solapur 335 cases = 1,615 cases); excluding them shifts peak reported-case month to April (20.8%)',
    'Dispersed across 27 districts; no single district meets academic sample threshold N >= 10; events reflect discrete localized point-source/mass-exposure records',
    'Kruskal-Wallis H=26.389 (p=0.00568, FDR-sig); Permutation Chi2=21.957 (p=0.0236, FDR-sig); Kendall\'s W=0.386 (p=0.108, non-sig)',
    '19 events in W01-W32 (historical mean 12.8, +49.0%); all 19 records used the "Suspected Food Poisoning" label; the simultaneous occurrence of these observations does not establish a causal or administrative relationship',
    'Reported case volume is governed by point-source mass-exposure events rather than continuous calendar cycles',
    'Variable / context-dependent evidence: temporal clusters reflect discrete point-source mass-exposure events whose timing shifts between years and whose case counts are heavily outlier-driven.'
  ],
  [
    'Chikungunya',
    43,
    701,
    0,
    'Low / Diffuse Concentration (Event CV=0.515, Case CV=0.783, CR3=39.5%, Gini=0.289)',
    'Diffuse reported-event activity across the year: top months are May (14.0%), Jun (14.0%), Mar (11.6%), Sep (11.6%), Nov (11.6%); no contiguous window',
    'Low / Unstable (Kendall\'s W=0.150, p=0.832; mean Spearman rho = -0.082); 2024 contributes 51.2% of events (22/43); 3 of 4 baseline years have only 7 events',
    'Highly erratic peak reported-event timing across years: 2022 (May), 2023 (Jul, Sep, Oct tied), 2024 (Jun & Nov tied), 2025 (Aug); max displacement 6 months; ties in 2 years',
    'Moderate divergence: September-October accounts for 20.9% of events but 41.4% of cases, driven by a single 145-case outbreak in Kolhapur in Oct 2023',
    'Highly sensitive to single outbreak: excluding MAHA-2023-W42-007 (Kolhapur, 145 cases) shifts peak reported-case month from October to September (22.7%)',
    'Highly focal: Pune district accounts for 25.6% of baseline events (11/43) and is the only district meeting N >= 10; remaining 32 events dispersed across 14 districts',
    'Kruskal-Wallis H=12.117 (p=0.355, non-sig); Permutation Chi2=11.419 (p=0.416, non-sig); Kendall\'s W=0.150 (p=0.832, non-sig); zero tests significant',
    '1 event in W01-W32 (historical mean 6.3, -84.0%), located in Pune; late-year reporting (W33-W52) not yet observed',
    'Extreme event sparsity (annual baseline counts: 7, 7, 22, 7) prevents robust statistical inference; patterns are easily dominated by individual outbreak registrations',
    'The available 2022-2025 surveillance records do not establish a stable recurring calendar-month concentration for Chikungunya.'
  ]
];

const file1Csv = [file1Headers.join(',')].concat(file1Data.map(csvRow)).join('\n');
fs.writeFileSync(path.join(outDir, '01_DISEASE_EVIDENCE_SYNTHESIS.csv'), file1Csv);
console.log('Updated 01_DISEASE_EVIDENCE_SYNTHESIS.csv');

// -------------------------------------------------------------
// FILE 2: 02_EVIDENCE_STRENGTH_MATRIX.csv
// -------------------------------------------------------------
const file2Headers = [
  'disease_family',
  'target_pattern_evaluated',
  'evidence_classification',
  'phase5b_supporting_evidence',
  'phase5c_supporting_evidence',
  'statistical_significance_status',
  'inter_annual_consistency',
  'sensitivity_to_outliers_or_sparsity',
  'justification_for_classification'
];

const file2Data = [
  [
    'Dengue',
    'Late-year reporting concentration (June-October calendar window, September-October peak)',
    'A. Strong descriptive evidence',
    'Seasonal index peaks in Oct (1.97) and Sep (1.96); June-October accounts for 82.8% of events; weekly distribution shows persistent elevation from W24 to W46',
    'High Concentration tier (Event CV=0.736, CR3=50.5%, Gini=0.414); 8 qualifying districts aligned; zero peak shift on outlier exclusion',
    'Kruskal-Wallis significant (p=0.00022, Bonferroni); Permutation test significant (p=0.0001, Bonferroni); Kendall\'s W exploratory (p=0.086)',
    'Peak reported-event month occurs in Sep-Oct window in 3 of 4 years; all 4 years show elevated reporting in June-October; 2023 accounts for 51.0% of events',
    'Completely resilient; no single outbreak alters the October peak reported-event month or reporting concentration',
    'Supported by multiple convergent Phase 5B and 5C metrics, Bonferroni-level statistical significance across non-parametric and permutation tests, multi-district alignment, and total resilience to outlier sensitivity testing. Inter-annual rank variation and 2023 volume dominance warrant noting but do not undermine the strong late-year reporting pattern.'
  ],
  [
    'Acute Diarrheal Disease',
    'Mid-year reporting elevation (June-August contiguous calendar window)',
    'B. Moderate descriptive evidence',
    'Seasonal index elevated across Jun-Aug (Jun=1.49, Jul=1.73, Aug=1.25); 43.1% of events fall in Jun-Aug; secondary peak in Oct (1.96)',
    'Moderate Concentration (Event CV=0.524, CR3=43.1%); contiguous 3-month window; highest Kendall\'s W (0.530, p=0.016, exploratory FDR-sig)',
    'Kruskal-Wallis non-significant (p=0.132); Permutation test significant (p=0.0001, Bonferroni); Kendall\'s W significant under FDR (p=0.016)',
    'Elevated Jun-Aug reporting recurs in 3 of 4 baseline years; peak reported-event month varies between Dec (2022), Jun/Aug (2023), Jul (2024), Oct (2025)',
    'Reported case volume severely sensitive to single institutional outbreak (Nanded, 1,000 cases); excluding it shifts peak reported-case month from Feb to Oct and Aug',
    'Descriptive evidence clearly identifies a mid-year reported-event elevation that repeats across years with substantial rank concordance (Kendall W=0.530). However, it is classified as Moderate rather than Strong because Kruskal-Wallis fails to achieve significance due to high within-month annual variance, and reported case counts are heavily distorted by isolated institutional outbreaks.'
  ],
  [
    'Malaria',
    'May-July calendar window reporting concentration localized in Eastern Vidarbha',
    'B. Moderate descriptive evidence',
    'Seasonal index peaks in Jun (2.57) and Jul (2.40); May-Jul accounts for 51.4% of reported events; weekly distribution shows focused mid-year surge',
    'High Concentration (Event CV=0.753, CR3=51.4%, Gini=0.395); contiguous May-Jul window; peak timing displacement limited to 2 months',
    'Kruskal-Wallis significant under FDR (p=0.00546); Permutation test significant (p=0.0001, Bonferroni); Kendall\'s W non-significant (p=0.229)',
    'May-Jul window contains peak or near-peak event activity in all 4 baseline years; high temporal recurrence despite low annual counts (11-22 events/year)',
    'Case distribution sensitive to 385-case Gadchiroli cluster in late Dec; excluding it realigns case peak with May-June event window',
    'Temporal timing is exceptionally tight and recurs across all 4 years within a 2-month displacement window, supported by strong permutation test significance. However, it is classified as Moderate because 61.4% of all baseline events originate from just two contiguous districts (Gadchiroli and Chandrapur). The pattern is robustly established for Eastern Vidarbha surveillance, but cannot be claimed as a spatially uniform statewide pattern.'
  ],
  [
    'Food Poisoning',
    'Bimodal clustering in late winter (Jan-Feb) and late spring (Apr-May)',
    'C. Variable / context-dependent evidence',
    'Bimodal index peaks in Feb (1.91) and May (1.91); 55.1% of events fall in Jan-Feb and Apr-May combined; November has zero reported events',
    'Moderate Event Concentration (CV=0.564, CR3=44.9%); Extreme Case Concentration (CV=1.160, CR3=66.7%, Gini=0.534); discontinuous windows',
    'Kruskal-Wallis significant under FDR (p=0.00568); Permutation test significant under FDR (p=0.0236); Kendall\'s W non-significant (p=0.108)',
    'Peak reported-event month oscillates between winter (Feb 2024, Jan 2025) and spring (May 2022, May 2023, Apr 2025); 2025 accounts for 42.0% of events',
    'Extreme sensitivity: February case volume is strongly influenced by three high-case outbreak records (1,615 cases); excluding them eliminates the February case peak entirely and shifts it to April',
    'While statistical tests indicate that monthly distributions deviate from uniformity, the evidence demonstrates that this is driven by discrete, point-source mass-exposure records rather than an underlying cyclical seasonal rhythm. The timing of large social gatherings, school canteens, and catering incidents varies across years, and case numbers are completely dominated by a few influential records.'
  ],
  [
    'Chikungunya',
    'Evaluation of calendar-month concentration',
    'D. Insufficient evidence',
    'Diffuse seasonal index across the year; top months split between May (1.67), Jun (1.67), Mar (1.40), Sep (1.40), Nov (1.40); no distinct weekly cluster',
    'Low / Diffuse tier (Event CV=0.515, CR3=39.5%, Gini=0.289); no contiguous peak window; lowest Kendall\'s W (0.150, p=0.832)',
    'Kruskal-Wallis non-significant (p=0.35489); Permutation test non-significant (p=0.41556); Kendall\'s W non-significant (p=0.83162); 0/3 tests significant',
    'Peak reported-event month shifts across 6 months: May (2022), Jul/Sep/Oct (2023), Jun/Nov (2024), Aug (2025); 2024 contributes 51.2% of events; 3 of 4 years have only 7 events',
    'Highly sensitive to small numbers; single 145-case Kolhapur outbreak determines 20.7% of all baseline cases; removing it shifts case peak',
    'Total baseline volume is only 43 events across 4 years (averaging fewer than 11 events/year), with 2024 accounting for more than half. Zero statistical tests show significance, rank concordance is negligible, and 25.6% of events originate from a single district (Pune). The available 2022-2025 surveillance records do not establish a stable recurring calendar-month concentration for Chikungunya.'
  ]
];

const file2Csv = [file2Headers.join(',')].concat(file2Data.map(csvRow)).join('\n');
fs.writeFileSync(path.join(outDir, '02_EVIDENCE_STRENGTH_MATRIX.csv'), file2Csv);
console.log('Updated 02_EVIDENCE_STRENGTH_MATRIX.csv');

// -------------------------------------------------------------
// FILE 3: 03_STABILITY_VOLATILITY_SYNTHESIS.csv
// -------------------------------------------------------------
const file3Headers = [
  'disease_family',
  'recurring_patterns',
  'year_specific_patterns',
  'dominant_year_effects',
  'outlier_driven_patterns',
  'sensitivity_to_influential_records',
  'core_epidemiological_takeaway'
];

const file3Data = [
  [
    'Dengue',
    'Broad concentration in the second half of the calendar year (June-October); late-year event surge visible in all 4 years; multi-district reporting consistency across Western, Central, and Coastal Maharashtra',
    'Specific peak reported-event month oscillates between Sep (2022), Oct (2023), Jun/Jul (2024), and Aug (2025); early-season surge in 2024 contrasts with late-season concentration in 2023',
    '2023 high-volume year accounts for 51.0% of all baseline events (104/204) and 50.8% of cases; drives the statewide aggregate peak reported-event month to October',
    'None; reported case volume is distributed across multiple moderate-sized outbreaks rather than isolated mega-events',
    'Negligible sensitivity; excluding the largest outbreak records leaves the October peak month and concentration metrics virtually unchanged',
    'Dengue exhibits a recurring multi-year pattern in reported outbreak-event timing in the second half of the calendar year, although the exact month of peak reporting varies between June and October from year to year.'
  ],
  [
    'Acute Diarrheal Disease',
    'Mid-year reporting elevation during June-August recurs in 3 of 4 baseline years; substantial inter-annual rank concordance (Kendall\'s W=0.530); widespread geographic reporting across 33 districts',
    '2022 exhibited an anomalous winter peak in December (5 events, 78 deaths); 2025 peaked in October (9 events); the 2024 dataset contains a larger number of reported events (71 events)',
    '2024 contributes 46.4% of all baseline events (71/153) and 49.3% of reported cases, reflecting higher reported event volume during that calendar year',
    'February case volume is heavily influenced by a single record: 9 events generated 1,582 cases, creating an artificial #1 peak reported-case month for the year based on an isolated mass outbreak',
    'Extreme sensitivity to record MAHA-2024-W06-001 (Nanded institutional outbreak, 1,000 cases); excluding it shifts peak reported-case month to October and August, realigning cases with the June-August event window',
    'ADD displays a recurring mid-year reported-event elevation, but reported case numbers are highly sensitive to isolated institutional outbreaks, warning against uncritical use of case aggregates.'
  ],
  [
    'Malaria',
    'May-July calendar window event timing recurs in all 4 baseline years within a narrow 2-month window; high geographic localization in Eastern Vidarbha',
    '2023 showed an unusually dispersed profile with ties across May, Aug, Sep, and Dec; 2024 and 2025 showed sharper June-July peaks',
    'Baseline volume is distributed relatively evenly across years (11 in 2022, 17 in 2023, 22 in 2024, 20 in 2025; dominant year 2024 has only 31.4% of events)',
    'December case peak (448 cases, 21.0% of cases) is an outlier artifact caused by a single 385-case cluster reported in late December / Week 01',
    'Highly sensitive to record MAHA-2024-W01-002 (Gadchiroli, 385 cases); excluding it restores May (374 cases) and June (227 cases) as the top reported-case months, harmonizing cases with event timing',
    'Malaria exhibits a highly consistent timing window (May-July) in reported outbreak events, but this pattern is geographically concentrated in Gadchiroli and Chandrapur districts.'
  ],
  [
    'Food Poisoning',
    'Bimodal event clustering in late winter (Jan-Feb) and late spring (Apr-May); complete absence of reported events in November across all 4 baseline years',
    'Winter clustering dominated in 2024 (Feb peak) and 2025 (Jan/Apr tied); spring clustering dominated in 2022 (May peak) and 2023 (Feb/May tied)',
    '2025 accounts for 42.0% of baseline events (29/69) and 47.7% of cases, reflecting higher reported event volume in that year',
    'February case volume is strongly influenced by three high-case outbreak records in 2024 and 2025',
    'Extreme sensitivity: excluding records MAHA-2025-W06-002 (651 cases), MAHA-2024-W06-005 (629 cases), and MAHA-2024-W06-006 (335 cases) reduces February case share from 36.5% to 12.7% and shifts peak reported-case month to April',
    'Food Poisoning clusters represent discrete point-source/mass-exposure records rather than continuous calendar-month cycles; analysts must not mistake point-source exposure clustering for environmental cycles.'
  ],
  [
    'Chikungunya',
    'None; no temporal window or monthly profile repeats consistently across the 4 baseline years; rank correlations between years are negative on average (mean rho = -0.082)',
    '2022 peaked in May; 2023 showed a flat autumn plateau (Jul, Sep, Oct tied); 2024 peaked in Jun and Nov; 2025 peaked in Aug (6 months total displacement)',
    '2024 accounts for 51.2% of all baseline events (22/43); the remaining 3 years had only 7 reported events each across the entire state of Maharashtra',
    'September-October case concentration (41.4% of baseline cases) is driven by a single 145-case outbreak in Kolhapur district in October 2023',
    'High sensitivity to single records due to sparse data volume; removing the Kolhapur cluster shifts the peak reported-case month and changes the entire profile',
    'The available 2022-2025 surveillance records do not establish a stable recurring calendar-month concentration for Chikungunya; observed peaks are artifacts of individual outbreak registrations in small samples.'
  ]
];

const file3Csv = [file3Headers.join(',')].concat(file3Data.map(csvRow)).join('\n');
fs.writeFileSync(path.join(outDir, '03_STABILITY_VOLATILITY_SYNTHESIS.csv'), file3Csv);
console.log('Updated 03_STABILITY_VOLATILITY_SYNTHESIS.csv');

// -------------------------------------------------------------
// FILE 4: 04_2026_INTERPRETATION.csv
// -------------------------------------------------------------
const file4Headers = [
  'disease_family',
  'historical_w01_w32_mean_events',
  'historical_w01_w32_std_events',
  'events_2026_w01_w32',
  'diff_from_historical_mean',
  'pct_diff_from_historical_mean',
  'historical_share_in_w01_w32_pct',
  'temporal_truncation_vulnerability',
  'surveillance_reporting_and_label_shifts',
  'partial_period_comparability_finding',
  'out_of_sample_validation_conclusion'
];

const file4Data = [
  [
    'Dengue',
    22.75,
    22.26,
    6,
    -16.75,
    '-73.6%',
    '44.6%',
    'Severe; historically 55.4% of Dengue events occur in W33-W52; early-year data cannot indicate full-year trajectory',
    'Stable label classification; 6 events reported across 5 districts in W01-W32',
    'Unstable comparison; historical W01-W32 counts have massive variance (6 in 2022, 26 in 2023, 53 in 2024, 6 in 2025; std=22.3); 2026 matches the lower boundary (2022 & 2025)',
    '2026 W01-W32 provides an early partial-period comparison showing baseline-consistent low early-year activity, but provides zero information regarding whether a late-year surge will materialize in W33-W52.'
  ],
  [
    'Acute Diarrheal Disease',
    21.75,
    16.80,
    18,
    -3.75,
    '-17.2%',
    '56.9%',
    'Moderate; 43.1% of events historically occur in W33-W52; mid-year elevation window (June-August) is partially captured in W01-W32',
    '18 ADD records were reported in 2026 W01-W32, and all used the British spelling "Diarrhoeal". The observed label distribution differs from the earlier baseline terminology.',
    'Directly comparable; 2026 volume (18 events) falls well within 1 standard deviation of the 4-year historical mean (21.8 events, std=16.8)',
    '2026 W01-W32 provides an early partial-period comparison confirming that mid-year enteric outbreak reporting continued at expected historical volumes, consistent with the recurring pattern observed in 2022-2025.'
  ],
  [
    'Malaria',
    12.00,
    4.40,
    1,
    -11.00,
    '-91.7%',
    '68.6%',
    'Low-to-moderate; historically 68.6% of Malaria events occur in W01-W32; May-July core window has already passed in W01-W32',
    'Stable label classification; the single 2026 event was reported in Gadchiroli, the primary historical focus',
    'Marked deficit; 1 event is more than 2 standard deviations below the historical W01-W32 mean (12.0 events, std=4.4; historical range was 7 to 17)',
    '2026 W01-W32 provides an early partial-period comparison demonstrating a substantial decline in registered outbreak events during the primary May-July window; reflects a localized reduction in reported events in surveillance records.'
  ],
  [
    'Food Poisoning',
    12.75,
    8.34,
    19,
    +6.25,
    '+49.0%',
    '73.9%',
    'Low; historically 73.9% of Food Poisoning events occur in W01-W32; both the winter and spring clustering windows are captured in W01-W32',
    'Food Poisoning recorded 19 reported events in 2026 W01-W32, while all 19 records used the "Suspected Food Poisoning" label. The simultaneous occurrence of these observations does not establish a causal or administrative relationship.',
    'Substantially elevated; 19 events exceeds the historical mean (12.8 events) and approaches the single-year high of 2025 (23 events)',
    '2026 W01-W32 provides an early partial-period comparison showing elevated event registration alongside uniform "Suspected" labeling in the surveillance record.'
  ],
  [
    'Chikungunya',
    6.25,
    4.03,
    1,
    -5.25,
    '-84.0%',
    '58.1%',
    'Moderate; 41.9% of events historically occur in W33-W52; late-summer and autumn reporting periods have not yet been observed',
    'Stable label classification; single 2026 event reported in Pune, matching the primary historical reporting centre',
    'Within historical low-year boundaries; 1 event is lower than the mean (6.3) but consistent with 2023 (3 events) and general baseline sparsity',
    '2026 W01-W32 provides an early partial-period comparison reflecting ongoing event sparsity in the surveillance record; no conclusions regarding recurring patterns can be established.'
  ]
];

const file4Csv = [file4Headers.join(',')].concat(file4Data.map(csvRow)).join('\n');
fs.writeFileSync(path.join(outDir, '04_2026_INTERPRETATION.csv'), file4Csv);
console.log('Updated 04_2026_INTERPRETATION.csv');

// -------------------------------------------------------------
// FILE 5: 05_DISTRICT_INTERPRETATION.csv
// -------------------------------------------------------------
const file5Headers = [
  'disease_family',
  'district',
  'baseline_events',
  'district_share_pct',
  'district_peak_month',
  'state_peak_month',
  'seasonal_alignment_status',
  'geographic_concentration_interpretation',
  'surveillance_vs_incidence_caveat'
];

const file5Data = [
  [
    'Dengue',
    'Thane',
    19,
    '9.3%',
    'Sep',
    'Oct',
    'Displaced Peak (Sep vs Oct)',
    'Major urban-periurban surveillance reporting centre in Konkan Division; peak reported-event month (September) precedes statewide aggregate by one month; 52.6% of events in Jun-Sep',
    'Represents high surveillance reporting activity and dense healthcare notification; does not imply higher true population incidence than less actively reporting districts.'
  ],
  [
    'Dengue',
    'Beed',
    15,
    '7.4%',
    'Oct',
    'Oct',
    'Aligned with State (Oct)',
    'Major Marathwada reporting centre; synchronized with statewide October peak reported-event month; 53.3% of events in Jun-Sep',
    'Reflects structured district outbreak detection and notification during late-year weeks; reporting volume reflects surveillance sensitivity.'
  ],
  [
    'Dengue',
    'Raigad',
    13,
    '6.4%',
    'Jun',
    'Oct',
    'Displaced Peak (Jun vs Oct)',
    'Coastal Konkan district exhibiting early seasonal reporting in June; 46.2% of events concentrated in Jun-Sep',
    'Displaced June peak reflects early-season outbreak investigations; cannot be interpreted as distinct climatic causation without environmental linkage.'
  ],
  [
    'Dengue',
    'Kolhapur',
    13,
    '6.4%',
    'Jun',
    'Oct',
    'Displaced Peak (Jun vs Oct)',
    'Southern Maharashtra reporting hub exhibiting early-season reporting in June; 76.9% of events concentrated in Jun-Sep',
    'High proportion of events captured during June-September indicates active surveillance response during these calendar months.'
  ],
  [
    'Dengue',
    'Nanded',
    13,
    '6.4%',
    'Sep',
    'Oct',
    'Displaced Peak (Sep vs Oct)',
    'Eastern Marathwada centre with peak event reporting in September, closely preceding the statewide peak; 38.5% in Jun-Sep',
    'Reflects localized outbreak notification capacity; surveillance capture varies across administrative blocks.'
  ],
  [
    'Dengue',
    'Aurangabad',
    10,
    '4.9%',
    'Aug',
    'Oct',
    'Displaced Peak (Aug vs Oct)',
    'Central Marathwada regional healthcare centre; peak event reporting in August; 60.0% of events in Jun-Sep',
    'Hospital-based and district surveillance convergence; presence of tertiary medical college enhances outbreak detection.'
  ],
  [
    'Dengue',
    'Akola',
    10,
    '4.9%',
    'May',
    'Oct',
    'Displaced Peak (May vs Oct)',
    'Western Vidarbha district displaying early-year event reporting in May; 30.0% in Jun-Sep',
    'Atypical May peak suggests localized municipal investigations or specific dry-season notification events.'
  ],
  [
    'Acute Diarrheal Disease',
    'Nagpur',
    12,
    '7.8%',
    'Mar',
    'Oct',
    'Displaced Peak (Mar vs Oct)',
    'Eastern Vidarbha urban hub; peak event reporting occurs in March (spring); 50.0% of events in Jun-Sep',
    'Multi-month reporting across the year reflects persistent municipal and institutional surveillance rather than a single acute season.'
  ],
  [
    'Acute Diarrheal Disease',
    'Amravati',
    11,
    '7.2%',
    'Jul',
    'Oct',
    'Displaced Peak (Jul vs Oct)',
    'Northern Vidarbha district with peak reporting in July, aligning with the statewide mid-year elevation window (June-August); 63.6% in Jun-Sep',
    'Mid-year reporting alignment reflects water contamination investigations during rainy months.'
  ],
  [
    'Acute Diarrheal Disease',
    'Kolhapur',
    10,
    '6.5%',
    'Dec',
    'Oct',
    'Displaced Peak (Dec vs Oct)',
    'Southern Maharashtra centre; peak event reporting occurred in December (linked to 2022 late-year mortality cluster); 0.0% in Jun-Sep',
    'December peak is entirely driven by the December 2022 multi-district cluster; demonstrates how single surveillance episodes distort local profiles.'
  ],
  [
    'Malaria',
    'Gadchiroli',
    27,
    '38.6%',
    'Jun',
    'Jun',
    'Aligned with State (Jun)',
    'Primary focus of Maharashtra reported Malaria outbreaks (38.6% of state total); synchronized with statewide June peak reported-event month; 51.9% in Jun-Sep',
    'Event concentration reflects active surveillance programs in forested blocks; does not mean other districts have zero incidence.'
  ],
  [
    'Malaria',
    'Chandrapur',
    16,
    '22.9%',
    'Jul',
    'Jun',
    'Displaced Peak (Jul vs Jun)',
    'Contiguous Eastern Vidarbha district (22.9% of state total); peak event month in July; 75.0% in Jun-Sep; together with Gadchiroli accounts for 61.4% of state total (43/70 events)',
    'Confirms that the statewide Malaria seasonal profile is essentially an Eastern Vidarbha regional surveillance phenomenon.'
  ],
  [
    'Chikungunya',
    'Pune',
    11,
    '25.6%',
    'Sep',
    'May',
    'Displaced Peak (Sep vs May)',
    'Dominant reporting centre for Chikungunya in Maharashtra (25.6% of state total); peak reporting in September; 63.6% in Jun-Sep',
    'Pune\'s dominance reflects sophisticated municipal surveillance and reference laboratory access; highlights surveillance reporting bias.'
  ]
];

const file5Csv = [file5Headers.join(',')].concat(file5Data.map(csvRow)).join('\n');
fs.writeFileSync(path.join(outDir, '05_DISTRICT_INTERPRETATION.csv'), file5Csv);
console.log('Updated 05_DISTRICT_INTERPRETATION.csv');

// -------------------------------------------------------------
// FILE 7: 07_OBJECTIVE_EVIDENCE_MATRIX.csv
// -------------------------------------------------------------
const file7Headers = [
  'project_objective_id',
  'project_objective_text',
  'evidence_produced',
  'phase_supporting_it',
  'analytical_result',
  'methodological_limitation'
];

const file7Data = [
  [
    'OBJ-01',
    'To clean and organise district-level weekly disease-outbreak data for Maharashtra from official surveillance sources.',
    'Reconstructed 809-row master analytical dataset (2022-2026 W32) from primary NCDC weekly outbreak PDFs; 539 baseline records across 5 primary families; complete audit of 49 raw disease labels mapped into 30 standardized families.',
    'Phases 1-4, Phase 5A',
    'Established a fully auditable, clean secondary surveillance dataset with 100% provenance tracing to official government PDF archives.',
    'Surveillance data capture outbreak events meeting threshold definitions, not total population morbidity; 2023 archive lacks published reports for W15, W51, W52.'
  ],
  [
    'OBJ-02',
    'To analyse the monthly and annual distribution of reported disease-outbreak records during the 2022-2025 baseline period.',
    'Generated comprehensive monthly distribution registers, annual totals, and weekly distribution registers across 48 calendar months and 5 primary disease families.',
    'Phase 5B',
    'Demonstrated distinct temporal distributions: Dengue concentrated in Jun-Oct (82.8%); Malaria in May-Jul (51.4%); ADD in Jun-Aug (43.1%); Food Poisoning bimodal in Jan-Feb & Apr-May (55.1%); Chikungunya diffuse.',
    'Annual distributions subject to dominant-year surveillance surges (e.g., Dengue 2023: 51.0% of events; ADD 2024: 46.4% of events).'
  ],
  [
    'OBJ-03',
    'To identify months with higher concentrations of reported outbreak cases and records using quantitative concentration metrics.',
    'Computed Coefficient of Variation (CV), Top-3 Concentration Ratio (CR3), Normalized Shannon Entropy, and Gini Coefficients for both reported events and cases across all 5 families.',
    'Phase 5C',
    'Classified Dengue (CV=0.736, CR3=50.5%) and Malaria (CV=0.753, CR3=51.4%) as High Concentration; ADD (CV=0.524, CR3=43.1%) and Food Poisoning (CV=0.564, CR3=44.9%) as Moderate; Chikungunya as Diffuse (CV=0.515, CR3=39.5%).',
    'Case concentration metrics are vulnerable to distortion by single high-case outbreak records (Food Poisoning Case CV=1.160; ADD Case CV=0.609).'
  ],
  [
    'OBJ-04',
    'To compare the seasonal profiles, peak windows, and inter-annual stability of the selected diseases.',
    'Identified 3-month peak windows; evaluated contiguous vs discrete windows; performed Kendall\'s W concordance across annual rank profiles; tracked maximum peak month displacements.',
    'Phase 5B, Phase 5C',
    'Identified contiguous windows for Malaria (May-Jul) and ADD (Jun-Aug); discrete high-activity months for Dengue (Oct, Sep, Jun) and Food Poisoning (May, Feb, Jan); ADD showed highest rank concordance (W=0.530), Dengue moderate (W=0.405), Chikungunya lowest (W=0.150).',
    'Kendall\'s W evaluates only 4 annual profile vectors, rendering p-values exploratory; does not assess meteorological causation.'
  ],
  [
    'OBJ-05',
    'To examine district-level coverage and geographic variation in the reported outbreak data.',
    'Analyzed district-level event shares and peak reported-event months for all districts meeting academic sample threshold (N >= 10); computed Jun-Sep seasonal proportions for 13 qualifying district cohorts.',
    'Phase 5A, Phase 5C',
    'Revealed extreme spatial concentration for Malaria (Gadchiroli & Chandrapur = 61.4% of events) and Chikungunya (Pune = 25.6%); in contrast, Dengue and ADD showed broad statewide reporting across >30 districts.',
    'Reflects spatial distribution of surveillance reporting and health facility notification density rather than true geographic incidence in the general population.'
  ],
  [
    'OBJ-06',
    'To evaluate outlier sensitivity and event-case divergence in reported surveillance metrics.',
    'Conducted systematic outlier sensitivity testing by recomputing peak months and shares after excluding influential records; analyzed monthly event-to-case ratios.',
    'Phase 5C',
    'Found Food Poisoning February case volume is strongly influenced by 3 high-case outbreak records (1,615 cases; peak shifts to April upon removal); ADD February case peak driven by 1 institutional outbreak (1,000 cases; peak shifts to Oct/Aug); Dengue is completely resilient.',
    'Removing influential records reveals mathematical sensitivity of surveillance aggregates but does not invalidate the reality of the reported historical outbreaks.'
  ],
  [
    'OBJ-07',
    'To conduct out-of-sample validation using partial-year 2026 data without invalid forecasting.',
    'Compared 2026 W01-W32 (45 records) against historical equivalent 4-year means; assessed variance, truncation vulnerability, and administrative label shifts.',
    'Phase 5B, Phase 5C',
    'ADD (18 events) matched historical mean (21.8); Dengue (6 events) showed severe truncation caveat (55.4% of events occur post-W32); Food Poisoning recorded 19 reported events in 2026 W01-W32 while all 19 records used the "Suspected Food Poisoning" label; Malaria (-91.7%) showed marked surveillance deficit.',
    '2026 is partial-year (32 weeks); cannot be compared to complete calendar years; cannot forecast unobserved W33-W52 activity.'
  ],
  [
    'OBJ-08',
    'To formulate evidence-based conclusions for seasonal surveillance preparedness while recognizing the boundaries of outbreak-based data.',
    'Synthesized cross-phase evidence into formal evidence classifications (A/B/C/D); explicitly delineated supported findings from unsupported claims (causation, incidence, risk ranking).',
    'Phase 5D',
    'Established that Dengue (Strong) and Malaria/ADD (Moderate) exhibit actionable seasonal timing patterns in surveillance reporting, while Food Poisoning is point-source driven and Chikungunya is data-sparse; defined 9 explicit unsupported claims for viva defense.',
    'Conclusions apply strictly to public health outbreak surveillance logistics and preparedness, not clinical etiology, pathogen biology, or individual risk prediction.'
  ]
];

const file7Csv = [file7Headers.join(',')].concat(file7Data.map(csvRow)).join('\n');
fs.writeFileSync(path.join(outDir, '07_OBJECTIVE_EVIDENCE_MATRIX.csv'), file7Csv);
console.log('Updated 07_OBJECTIVE_EVIDENCE_MATRIX.csv');

console.log('ALL CSV FILES REGENERATED AND COMPLIANT.');
