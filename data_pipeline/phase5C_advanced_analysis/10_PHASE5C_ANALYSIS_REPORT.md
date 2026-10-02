# Phase 5C — Advanced Pattern & Statistical Analysis Report
# Analysis of Seasonal Disease Patterns in Maharashtra Government Surveillance Data

**Document ID:** NCDC-MH-PHASE5C-ANALYSIS-2026-001  
**Execution Date:** 2026-10-02  
**Revised (Polish):** 2026-10-02  
**Investigation Framework:** Advanced Seasonal Pattern Analysis, Statistical Testing, Outlier Sensitivity  
**Authoritative Input Dataset:** [`data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv)  
**Phase 5B Frozen Inputs:** [`data_pipeline/phase5B_seasonal_analysis/`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/)  
**Primary Comparison Cohort:** 539 validated outbreak records (2022–2025 completed baseline)  
**Secondary Surveillance Period:** 2026 YTD (Weeks 01–32, 45 records, out-of-sample only)  
**Institutional Affiliation:** B.Sc. Data Science, Semester III | RP Institute, University of Mumbai  
**Candidate Name:** Khan Umar  
**Methodological Status:** Phase 5C Advanced Analysis — Final Polish Applied (Second Review Pending)

---

## 0. Scope Definition & Epidemiological Guardrails

This report extends the Phase 5B descriptive seasonal baseline into advanced quantitative analysis of seasonal concentration, peak windows, inter-annual stability, event-versus-case burden divergence, outlier sensitivity, 2026 out-of-sample comparison, and district-level patterns.

**Hard Guardrails (throughout this report):**
- The unit of observation is the **government-reported outbreak event** registered in the IDSP/NCDC surveillance archive.
- This analysis describes **temporal and spatial patterns in the surveillance record**. It does NOT infer population incidence, disease prevalence, infection rates, community transmission levels, biological causation, or climate determinism.
- The 2022–2025 baseline of 539 primary records is preserved unmodified.
- 2026 (Weeks 01–32, 45 records) is used **exclusively** as an out-of-sample forward comparison period.
- No synthetic records were introduced. No records were silently dropped.

---

## 1. Analysis 1 — Seasonal Concentration

### 1.1 Measure Selection and Justification

Three complementary descriptive measures were selected to quantify temporal concentration in the monthly distribution of reported outbreak events:

| Measure | Formula | Interpretation |
|:---|:---|:---|
| **CV (Coefficient of Variation)** | σ / μ of monthly counts | Relative spread around mean monthly reported-event count; scale-free |
| **CR3 (3-Month Concentration Ratio)** | Sum of top-3 monthly counts / annual total | Proportion of annual reported events concentrated in peak 3 months |
| **Gini Coefficient** | Σᵢ Σⱼ \|xᵢ − xⱼ\| / (2n²μ) | Inequality of monthly reported-event distribution (0 = equal, higher = more concentrated) |

Normalized entropy was also computed but not selected as primary: it is less intuitive for an academic viva than CV and CR3. The Gini coefficient is presented as supplementary to confirm CV findings.

> **Gini Coefficient formula (precise, as implemented):** G = [Σᵢ Σⱼ |xᵢ − xⱼ|] / [2n²μ], where xᵢ are monthly reported-event counts, n = 12 months, and μ is the mean monthly count. G = 0 indicates perfectly equal monthly distribution; higher G indicates greater inequality (concentration) across months. This is the mean-absolute-difference form; it does NOT equal the cumulative-share form G = 1 − Σᵢ(cumulative share)², which is a different approximation not used here.

**Pre-committed CR3 threshold:** A CR3 ≥ 0.50 (top-3 months capture ≥ 50% of annual events) is defined as **High Concentration**. This threshold was set before examining results.

### 1.2 Results

| Disease Family | Records | Event CV | Event CR3 | Event Gini | Case CV | Case CR3 | Case Gini | Concentration Tier |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Dengue** | 204 | 0.735 | 50.5% | 0.414 | 0.756 | 49.9% | 0.423 | **High Concentration** |
| **Malaria** | 70 | 0.753 | 51.4% | 0.395 | 0.802 | 54.8% | 0.450 | **High Concentration** |
| **ADD** | 153 | 0.524 | 43.1% | 0.298 | 0.609 | 47.1% | 0.344 | Moderate |
| **Food Poisoning** | 69 | 0.564 | 44.9% | 0.315 | 1.160 | 66.7% | 0.534 | **Moderate Events / Extreme Case Burden** |
| **Chikungunya** | 43 | 0.515 | 39.5% | 0.289 | 0.783 | 52.5% | 0.421 | Diffuse Events / Moderate Cases |

**Key Findings:**
- **Dengue and Malaria** exhibit the highest event-level seasonal concentration (CV ≥ 0.73, CR3 ≥ 50%), indicating that half or more of their annual reported outbreak events are concentrated within a 3-month window in the surveillance record.
- **Food Poisoning** presents a striking **event-case divergence**: moderate event CV (0.564) but extreme case CV (1.160), with the top-3 case months capturing 66.7% of all reported cases. This divergence is entirely driven by the documented mass-exposure events in February (Parbhani and Kolhapur).
- **Chikungunya** shows the lowest event concentration (CR3 = 39.5%), consistent with its sparse and geographically variable reported-event pattern.
- **ADD** displays the most distributed event pattern (CV = 0.524, CR3 = 43.1%) across the four completed baseline years. The reported ADD events do not cluster as strongly as Dengue or Malaria.

*Source: [`01_SEASONAL_CONCENTRATION.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/01_SEASONAL_CONCENTRATION.csv) | Chart: [`chart_seasonal_concentration.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/chart_seasonal_concentration.png)*

> **Note (Issue 7 — Gini cross-verification):** All three measures (CV, CR3, Gini) produce the same disease ranking for concentration. Dengue (Gini = 0.414), Malaria (Gini = 0.395) ≥ Food Poisoning (Gini = 0.315, case Gini = 0.534) ≥ ADD (Gini = 0.298) ≥ Chikungunya (Gini = 0.289). The Gini formula used is the mean-absolute-difference definition as implemented in `run_phase5c_pipeline.js`.

---

## 2. Analysis 2 — Peak Windows

For each disease, the peak event month, the top-3 months, and the contiguous/discrete nature of the high-activity window were assessed using the Phase 5B equal-year-weighted seasonal indices.

**Rule (pre-committed):** A contiguous high-activity reported-event window is identified only if the top-3 event months fall in adjacent calendar positions. If top-3 months are discontinuous, they are reported as discrete high-activity months.

### 2.1 Results

| Disease | Event Peak Month | Top-3 Event Months | Contiguous Window? | Reported-Event Window | Event Window Share | Case Peak Month | Top-3 Case Months | Case Window Share |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Dengue** | Sep (1.97) | Oct, Sep, Jun | **No** | Oct, Sep, Jun (discrete) | 50.5% | Aug (2.10) | Oct, Sep, Jun | 49.9% |
| **ADD** | Jun (1.88) | Jun, Jul, Aug | **Yes** | Jun–Aug (Contiguous) | 43.1% | Oct (1.70) | Feb, Oct, Aug | 47.1% |
| **Malaria** | Jun (2.69) | Jun, Jul, May | **Yes** | May–Jul (Contiguous) | 51.4% | May (2.86) | May, Jun, Jul | 54.8% |
| **Food Poisoning** | May (2.51) | May, Feb, Jan | **No** | May, Feb, Jan (discrete) | 44.9% | May (3.52) | May, Feb, Jun | 66.7% |
| **Chikungunya** | May (1.69) | May, Jul, Aug | **No** | May, Jul, Aug (discrete) | 39.5% | Sep (2.63) | Sep, Oct, May | 52.5% |

**Key Findings:**
- **Malaria** exhibits the clearest contiguous reported-event window (May–Jul), with 51.4% of events and 54.8% of reported cases concentrated in three consecutive months of the surveillance record.
- **ADD** has a contiguous Jun–Aug high-activity reported-event window, capturing 43.1% of events. However, its case distribution is distinct: the February anomaly (Nanded 1,000-case outbreak) elevates February as the top reported-case month.
- **Dengue** and **Chikungunya** do not form contiguous reported-event windows — their high-activity months are scattered across the year (Jun, Sep, Oct for Dengue; May, Jul, Aug for Chikungunya), with different high-activity months observed in different years.
- **Food Poisoning** has two distinct high-activity reported-event clusters: a summer period (May) and a late-winter/early-year period (Jan–Feb). These are not contiguous and must not be reported as a single "season."

*Source: [`02_PEAK_WINDOWS.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/02_PEAK_WINDOWS.csv)*

---

## 3. Analysis 3 — Year-to-Year Seasonal Stability

### 3.1 Methods

**Pairwise Spearman Rank Correlation** (6 pairs across 2022, 2023, 2024, 2025) on monthly reported-event count profiles, and **Kendall's W Coefficient of Concordance** (across all 4 years simultaneously) were computed.

**Kendall's W formula:**
> W = 12S / [m²(n³ − n)]  where S = Σ(Rⱼ − R̄)², m = 4 raters (years), n = 12 ranks (months)

W = 1.0 indicates perfect concordance; W = 0 indicates no concordance. Statistical significance evaluated via Wilson-Hilferty chi-square approximation (df = n − 1 = 11).

**Pre-committed interpretation scale:** W ≥ 0.50 = Substantial concordance; 0.30–0.49 = Moderate; < 0.30 = Poor/Absent.

### 3.2 Results

| Disease | Mean Spearman ρ | ρ Range | Kendall's W | Chi-square | p-value | Dominant Year | Dominant Share | Stability Assessment |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Dengue** | 0.235 | [−0.169, 0.420] | 0.405 | 17.80 | 0.086 | 2023 | 51.0% | Moderate (2023 reporting dominance) |
| **ADD** | 0.407 | [−0.053, 0.768] | 0.530 | 23.32 | **0.016** | 2024 | 46.4% | Substantial Concordance |
| **Malaria** | 0.159 | [−0.025, 0.229] | 0.319 | 14.06 | 0.229 | 2024 | 31.4% | Moderate–Low (peak timing recurs, rank spread low) |
| **Food Poisoning** | 0.253 | [0.006, 0.506] | 0.386 | 16.98 | 0.108 | 2025 | 42.0% | Moderate (event-driven volatility) |
| **Chikungunya** | −0.082 | [−0.673, 0.539] | 0.150 | 6.60 | 0.832 | 2024 | 51.2% | Poor (extreme rank volatility due to sparsity) |

**Key Findings:**
- **ADD** achieves the highest inter-annual concordance (W = 0.530, p = 0.016), indicating exploratory evidence that the summer Jun–Aug monthly rank pattern in the reported events recurs across years despite absolute volume differences. *Note: p-value uses the Wilson-Hilferty chi-square approximation (χ² = 23.32, df = 11). With only m = 4 annual profiles, this approximation may not be fully accurate. The result should be interpreted as exploratory evidence of rank concordance — not as confirmatory proof. Exact permutation inference would be required for confirmatory conclusions. The observed chi-square (23.32) exceeds the critical value of 19.675, but this margin should not be interpreted as guaranteeing robustness.*
- **Dengue's** moderate Spearman mean (ρ = 0.235) and the 2023–2022 vs 2023–2024 asymmetry (ρ = 0.42 vs −0.17) reflect that 2023 was the highest-reporting year with 51% of all baseline events. The 2023–2024 profile pair shows negative correlation, confirming 2023 volume dominance distorts aggregate patterns.
- **Malaria** shows moderate-low rank concordance (W = 0.319, p = 0.229) despite consistent peak *timing* (May–Jul across all years), because with only 70 events across 4 years, individual event placement produces volatile ranks.
- **Chikungunya** exhibits the worst concordance (W = 0.150, p = 0.832), driven entirely by extreme sparsity (7–7–22–7 annual event counts). The 2022–2025 Spearman pair is −0.34 and the 2023–2025 pair reaches −0.67, confirming the reported pattern is statistically unstable at this sample size.

> **Kendall's W Approximation Caveat:** All Kendall's W p-values use the Wilson-Hilferty chi-square approximation. With m = 4 raters and n = 12 ranks, this approximation is imperfect. The p-values should be treated as approximate indicators only. Exact permutation-based Kendall's W p-values are computationally expensive and would be required for any confirmatory inference. No findings in this section are presented as confirmatory.

*Source: [`03_SEASONAL_STABILITY.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/03_SEASONAL_STABILITY.csv) | Chart: [`chart_seasonal_stability_heatmap.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/chart_seasonal_stability_heatmap.png)*

---

## 4. Analysis 4 — Peak Timing Shifts

The peak reported-event month was identified for each disease in each completed calendar year. Tied peaks (multiple months sharing the maximum count) are preserved rather than arbitrarily selected.

| Disease | 2022 Peak | 2023 Peak | 2024 Peak | 2025 Peak | Tied? | Max Displacement | Interpretation |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| **Dengue** | Sep | Oct | Jun & Jul | Aug | Yes (2024) | 4 months | Peak month oscillates within the Jun–Oct reported-event window across years |
| **ADD** | Dec | Jun & Aug | Jul | Oct | Yes (2023) | 6 months | The reported ADD events do not show a single stable peak month across the four completed years |
| **Malaria** | May | May/Aug/Sep/Dec | Jul | Jun | Yes (2023) | 2 months (core window) | Consistently May–Jul in the reported-event record despite 2023 scatter |
| **Food Poisoning** | May | Feb & May | Feb | Jan & Apr | Yes (2023, 2025) | 4 months | Bimodal: Jan–Feb & Apr–May high-activity reported-event clusters |
| **Chikungunya** | May | Jul/Sep/Oct | Jun & Nov | Aug | Yes (2023, 2024) | 6 months | Highly volatile; artifact of sparsity (2–4 events/year outside 2024) |

**Key Findings:**
- **Malaria** has the most stable reported-event peak window: the core May–Jun–Jul timing recurs in 4 of 4 years (2023 also peaks in May), and Eastern Vidarbha district-level reported events confirm consistent May–Jul timing.
- **Dengue** shows peak month oscillation within a 5-month envelope (Jun–Oct). Dengue reported-event activity is concentrated in Jun–Oct in the observed 2022–2025 surveillance record, but the specific peak month shifts across years.
- **Chikungunya's** apparent 6-month displacement is a mathematical artifact of the minimum 2-event annual count: individual outbreak timing in Pune or Nanded determines the state peak in any given year.
- No disease shows consistent year-over-year directional shift (e.g., monotonic advancement or delay); therefore no trend inference is made.

*Year-to-year variation reflects surveillance reporting dynamics, outbreak reporting lags, and annual heterogeneity in the pattern of reported events — not confirmed biological mechanisms.*

*Source: [`04_PEAK_TIMING_SHIFTS.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/04_PEAK_TIMING_SHIFTS.csv) | Chart: [`chart_peak_timing_shifts.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/chart_peak_timing_shifts.png)*

---

## 5. Analysis 5 — Event Frequency vs. Case Burden Divergence

### 5.1 Method

For each disease and each month, a **divergence ratio** is defined as:
> Divergence Ratio = (Monthly Case Share %) / (Monthly Event Share %)

A ratio of 1.0 indicates proportional burden; ratio ≥ 1.50 indicates disproportionate reported-case burden relative to event frequency; ratio ≤ 0.67 indicates disproportionate event frequency relative to reported-case burden.

### 5.2 Key Divergence Findings

**Food Poisoning:**

| Month | Events | Event Share | Cases | Case Share | Divergence Ratio | Flag |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| February | 11 | 15.9% | 2,162 | 36.5% | **2.29** | Disproportionate Case Burden |
| May | 13 | 18.8% | 1,840 | 31.0% | 1.65 | Disproportionate Case Burden |
| August | 3 | 4.3% | 119 | 2.0% | 0.47 | Disproportionate Event Frequency |

February's divergence ratio of 2.29 is the highest of any single disease-month combination in the dataset, entirely driven by three mass-exposure events (651 + 629 + 335 cases = 1,615 cases).

**Acute Diarrheal Disease:**

| Month | Events | Event Share | Cases | Case Share | Divergence Ratio | Flag |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| February | 9 | 5.9% | 1,582 | 17.5% | **2.97** | Disproportionate Case Burden |
| December | 14 | 9.2% | 1,097 | 12.1% | 1.32 | Balanced |
| June | 27 | 17.6% | 1,056 | 11.7% | 0.66 | Disproportionate Event Frequency |

ADD February ratio (2.97) reflects the 1,000-case Nanded institutional outbreak in 2024 Week 06.

**Dengue:** Monthly event and case shares are well-proportioned (ratio 0.71–1.54 across all months), with no single extreme outlier. Peak months (Sep, Oct) show balanced high event and reported-case frequency distributed across multiple reporting districts.

*Source: [`05_EVENT_CASE_DIVERGENCE.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/05_EVENT_CASE_DIVERGENCE.csv) | Chart: [`chart_event_case_divergence.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/chart_event_case_divergence.png)*

---

## 6. Analysis 6 — Outlier Sensitivity Analysis

### 6.1 Method

**Exclusion rule (pre-committed):** The top 1–3 individual outbreak records were identified for each disease based on case count. Records were excluded only if their case total exceeded 3× the mean per-event case count for that disease. The sensitivity analysis was conducted purely on derived monthly distributions — the validated source dataset was not modified.

**Records excluded (with explicit 3× threshold verification):**

| Disease | Excluded Record | Cases | Disease Mean Cases/Event | 3× Threshold | Qualifies? |
|:---|:---:|:---:|:---:|:---:|:---:|
| Food Poisoning | MAHA-2025-W06-002 | 651 | 85.9 | 257.7 | ✅ |
| Food Poisoning | MAHA-2024-W06-005 | 629 | 85.9 | 257.7 | ✅ |
| Food Poisoning | MAHA-2024-W06-006 | 335 | 85.9 | 257.7 | ✅ |
| ADD | MAHA-2024-W06-001 | 1,000 | 59.1 | 177.3 | ✅ |
| Malaria | MAHA-2024-W01-002 | 385 | 30.5 | 91.5 | ✅ |
| Dengue | — | max 91 | 15.4 | 46.2 | — |
| Chikungunya | MAHA-2023-W42-007 | 145 | 16.3 | 48.9 | ✅ |

All three Food Poisoning exclusions are documented February banquet/canteen mass-exposure events from Parbhani, Kolhapur, and Solapur. The three events occurred in the same month (February) and share the same event context; excluding all three is necessary to characterize the month correctly. Each qualifies independently under the 3× rule.

### 6.2 Results

| Disease | Baseline Cases | Baseline Case Peak | Sensitivity Cases | Sensitivity Case Peak | Peak Shifted? |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Food Poisoning** | 5,927 | **February** | 4,312 | **April** (→ May/Jun also high) | **YES** |
| **ADD** | 9,050 | **February** | 8,050 | **October** | **YES** |
| **Malaria** | 2,133 | **December** | 1,748 | **May** | **YES** |
| **Dengue** | 3,144 | **October** | 3,144 | **October** | No |
| **Chikungunya** | 701 | **October** | 556 | **September** | Yes (minor) |

**Critical Findings:**

1. **Food Poisoning:** After exclusion of the three influential February records, the apparent February case peak disappears and the apparent peak shifts to April. February case share collapses from 36.5% to 12.7%. This indicates that the February concentration is highly sensitive to those reported outbreak events and should not be interpreted independently as evidence of a biological seasonal peak in food-related illness.

2. **ADD:** The 1,000-case Nanded outbreak single-handedly makes February the #1 reported-case burden month. After exclusion, October (1,540 cases, 19.1%) and August (1,363 cases, 16.9%) emerge as the higher reported-case months — consistent with the Jun–Aug high-activity reported-event window.

3. **Malaria:** The Gadchiroli 385-case winter cluster (reported in 2024 Week 01, reflecting surveillance from December 2023) makes December the apparent reported-case-peak month. After exclusion, May (33.1%) and June (27.6%) emerge as the higher reported-case months, consistent with the May–Jul reported-event window.

4. **Dengue:** Robust to single-event exclusion. The October reported-case peak (566 cases) is distributed across multiple reporting districts and not dependent on any single influential record.

*Source: [`06_OUTLIER_SENSITIVITY.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/06_OUTLIER_SENSITIVITY.csv) | Chart: [`chart_outlier_sensitivity.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/chart_outlier_sensitivity.png)*

---

## 7. Analysis 7 — 2026 Out-of-Sample Comparison (W01–W32)

**Methodology:** 2026 (Weeks 01–32) is compared exclusively against the W01–W32 equivalent periods of each completed baseline year (2022–2025). Full-year 2022–2025 totals are shown for context only and are explicitly distinguished. No predictions or forecasts are made.

| Disease | 2022 W01-W32 | 2023 W01-W32 | 2024 W01-W32 | 2025 W01-W32 | Hist. Mean (μ) | 2026 W01-W32 | Diff from μ | 2026 Assessment |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| **Dengue** | 6 | 26 | 53 | 6 | 22.8 | **6** | −16.8 | Well below historical mean; inter-year std (σ=22.1) exceeds deviation; comparison period unrepresentative for Dengue |
| **ADD** | 8 | 11 | 45 | 23 | 21.8 | **18** | −3.8 | Near historical mean; 100% British spelling "Diarrhoeal" in 2026 |
| **Malaria** | 10 | 7 | 17 | 14 | 12.0 | **1** | −11.0 | Markedly below mean; single focal event in Gadchiroli in 2026 |
| **Food Poisoning** | 5 | 7 | 16 | 23 | 12.8 | **19** | +6.3 | Above historical mean; 100% "Suspected" prefix shift in 2026 |
| **Chikungunya** | 6 | 3 | 12 | 4 | 6.3 | **1** | −5.3 | Below mean; later-year reporting weeks not yet observed in 2026 partial dataset |

**Interpretive Cautions:**

- **Dengue 2026:** The large negative deviation (−16.8 from mean) is substantially driven by the 2023 high-reporting year (26 events in W01-W32, later reaching 104 full-year events). The inter-year standard deviation for Dengue W01-W32 (σ = 22.1 events) substantially exceeds the 2026 deviation from the mean (16.8 events), meaning the 2026 observation falls within the historical range. Excluding 2023, the 2022, 2024, and 2025 W01-W32 values are 6, 53, and 6 respectively — highly variable. The historical mean is not a reliable comparator for Dengue without the variance context.
- **Food Poisoning 2026:** The positive deviation (+6.3 events above mean) is notable. The observed number of registered events increased across the four completed baseline years (2022: 5, 2023: 7, 2024: 16, 2025: 23). However, this short four-year series may also reflect surveillance-label changes ("Suspected Food Poisoning" prefix) and growing reporting-system adoption. A trend inference from four annual observations should not be made without qualification.
- **W01-W32 coverage fraction:** W01-W32 covers 44.6% of annual Dengue events and 56.9% of ADD events historically, meaning W01-W32 comparisons substantially under-represent the later-year reporting period for Dengue and Chikungunya.
- **No 2026 predictions are made.** Later reporting weeks (W33–W52) have not yet been observed in the 2026 partial dataset.

*Source: [`07_2026_OUT_OF_SAMPLE_COMPARISON.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/07_2026_OUT_OF_SAMPLE_COMPARISON.csv) | Chart: [`chart_2026_comparison.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/chart_2026_comparison.png)*

---

## 8. Analysis 8 — District × Season Patterns

**Threshold (pre-committed):** District-season subgroups are analyzed only where the qualifying district contributes ≥ 10 outbreak records of the target disease in the 2022–2025 baseline. This threshold ensures a minimum analytical sample size for descriptive comparison.

### 8.1 Qualifying Districts (N ≥ 10)

| Disease | District | Records | State Share | District Peak | State Peak | Alignment | Jun–Sep Share |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Dengue** | Pune | 26 | 12.7% | Oct | Sep | Near-aligned | 53.8% |
| **Dengue** | Thane | 19 | 9.3% | Sep | Sep | Aligned | 47.4% |
| **Dengue** | Beed | 15 | 7.4% | Oct | Sep | Near-aligned | 60.0% |
| **Dengue** | Raigad | 13 | 6.4% | Oct | Sep | Near-aligned | 61.5% |
| **Dengue** | Kolhapur | 13 | 6.4% | Aug | Sep | Displaced | 69.2% |
| **Dengue** | Nanded | 13 | 6.4% | Sep | Sep | Aligned | 38.5% |
| **Dengue** | Aurangabad | 10 | 4.9% | Oct | Sep | Near-aligned | 60.0% |
| **Dengue** | Akola | 10 | 4.9% | Oct | Sep | Near-aligned | 30.0% |
| **ADD** | Nagpur | 12 | 7.8% | Jun/Jul | Jun | Aligned | 41.7% |
| **ADD** | Amravati | 11 | 7.2% | Jul/Aug | Jun | Near-aligned | 54.5% |
| **ADD** | Kolhapur | 10 | 6.5% | Mar | Jun | Displaced | 20.0% |
| **Malaria** | Gadchiroli | 27 | 38.6% | Jun | Jun | Aligned | 66.7% |
| **Malaria** | Chandrapur | 16 | 22.9% | May | Jun | Near-aligned | 50.0% |
| **Chikungunya** | Pune | 11 | 25.6% | Jun/Aug | May | Near-aligned | 54.5% |

*Note: "Jun–Sep Share" replaces the prior "Monsoon Share" label. The column reports the fraction of district reported events falling in June through September — this is a descriptive calendar label only and does not infer a biological or meteorological mechanism.*

### 8.2 District Interpretation Notes

**Malaria (Eastern Vidarbha):** 61.4% of reported Malaria outbreak events in the 2022–2025 baseline occurred in Gadchiroli and Chandrapur. Both districts show June-onset peak timing aligned with the statewide aggregate. The aggregate Maharashtra Malaria reported-event pattern is substantially determined by these two districts. The remaining districts contribute only 29 events combined across 4 years — too sparse for reliable district-level comparisons.

**Dengue:** Eight districts meet the N ≥ 10 threshold, collectively accounting for 57.4% of baseline events. The qualifying districts show broadly similar reported-event timing (Sep–Oct), indicating that the statewide surveillance pattern is not solely determined by a single qualifying district.

**Chikungunya (Pune):** Pune alone contributes 25.6% of all Chikungunya reported outbreaks. No other district reaches N ≥ 10, confirming extreme geographic concentration in the surveillance record. The statewide Chikungunya aggregate is substantially determined by Pune and Nanded reporting. *Note: Nanded (N = 8, 18.6% of events) narrowly misses the N ≥ 10 threshold. With an average of 2 events per year, any month-level district comparison would be unreliable and was correctly excluded.*

*Source: [`08_DISTRICT_SEASON_ANALYSIS.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/08_DISTRICT_SEASON_ANALYSIS.csv)*

---

## 9. Analysis 9 — Statistical Testing

### 9.1 Tests Conducted

**15 total tests** were conducted across 3 test families and 5 disease families. All tests are categorized as **exploratory** (not confirmatory). A pre-committed family-wise significance threshold of α = 0.05 was applied.

**Test Family 1 — Phase 5B Kruskal–Wallis (carried forward):**
- Tests whether weekly surveillance outbreak counts differ across 12 calendar month groups.
- Unit of observation: weekly observation per disease per calendar month.
- 5 tests (one per disease).

**Test Family 2 — Monte Carlo Permutation-Based Goodness-of-Fit Test (Monthly Uniformity):**
- Null hypothesis: Reported outbreak events are distributed uniformly across 12 calendar months (1/12 per month).
- Procedure: A chi-square goodness-of-fit statistic is computed against the uniform null. A Monte Carlo permutation distribution is generated by randomly assigning observed events to months uniformly across 10,000 permutations using a deterministic seeded PRNG. The permutation p-value = (number of permuted statistics ≥ observed statistic + 1) / (10,000 + 1).
- **Note:** This is a Monte Carlo permutation procedure with 10,000 draws, NOT an exhaustive enumeration of all possible permutations. The minimum attainable p-value from this procedure is 1/10,001 ≈ 0.0001 due to the +1 correction.
- Advantage over asymptotic chi-square: does not rely on large-sample approximation for sparse monthly bins.
- 5 tests (one per disease).

**Test Family 3 — Kendall's W Coefficient of Concordance:**
- Tests whether the rank ordering of 12 monthly outbreak counts is consistent across the 4 completed years.
- Formula: W = 12S / [m²(n³ − n)], where m=4, n=12.
- Significance via Wilson-Hilferty chi-square approximation (df = n − 1 = 11). This approximation is imperfect at small m; all results are exploratory.
- 5 tests (one per disease).

### 9.2 Multiple Comparison Corrections

**Total tests: K = 15.**  
**Bonferroni threshold:** α/K = 0.05/15 = **0.00333**  
**Benjamini-Hochberg FDR:** Stepwise q-value correction applied to all 15 tests simultaneously at α = 0.05.

| Test ID | Disease | Test Family | Raw p | Bonferroni Significant | BH-FDR Significant |
|:---|:---|:---|:---:|:---:|:---:|
| TEST-01 | Dengue | Kruskal-Wallis | 0.000219 | **TRUE** | **TRUE** |
| TEST-02 | ADD | Kruskal-Wallis | 0.13207 | FALSE | FALSE |
| TEST-03 | Malaria | Kruskal-Wallis | 0.00546 | FALSE | **TRUE** |
| TEST-04 | Food Poisoning | Kruskal-Wallis | 0.00568 | FALSE | **TRUE** |
| TEST-05 | Chikungunya | Kruskal-Wallis | 0.35489 | FALSE | FALSE |
| TEST-06 | Dengue | Permutation | 0.00010 | **TRUE** | **TRUE** |
| TEST-07 | ADD | Permutation | 0.00010 | **TRUE** | **TRUE** |
| TEST-08 | Malaria | Permutation | 0.00010 | **TRUE** | **TRUE** |
| TEST-09 | Food Poisoning | Permutation | 0.02440 | FALSE | **TRUE** |
| TEST-10 | Chikungunya | Permutation | 0.41386 | FALSE | FALSE |
| TEST-11 | Dengue | Kendall's W | 0.086 | FALSE | FALSE |
| TEST-12 | ADD | Kendall's W | **0.016** | FALSE | **TRUE** |
| TEST-13 | Malaria | Kendall's W | 0.229 | FALSE | FALSE |
| TEST-14 | Food Poisoning | Kendall's W | 0.108 | FALSE | FALSE |
| TEST-15 | Chikungunya | Kendall's W | 0.832 | FALSE | FALSE |

### 9.3 Synthesis Interpretation

**Dengue** (TEST-01, TEST-06): Significant under both Bonferroni-corrected KW and Monte Carlo permutation test. Non-uniform monthly reported-event distribution is a robust finding. However, temporal autocorrelation (multi-week reported-event clusters) means the effective sample size is smaller than the raw week count — the KW test is anti-conservative.

> **Reconciliation of Dengue test tension:** An apparent analytical tension exists between the Dengue significance (TEST-01, TEST-06) and the non-significant Kendall's W (W = 0.405, p = 0.086). These tests measure different aspects: the KW and permutation tests assess whether the **pooled 4-year aggregate monthly distribution** departs from uniformity — they detect the aggregate Oct-Sep concentration across 204 events and reject the null. Kendall's W asks whether the **rank ordering of months repeats consistently across individual years** — because the 2023 high-reporting peak (Oct) does not align with the 2024 peak (Jun/Jul), rank concordance is poor. Both conclusions are simultaneously valid: Dengue shows strong aggregate temporal concentration in the surveillance record, but its precise peak reported-event month shifts year to year within the Jun–Oct window.

**ADD** (TEST-07, TEST-12): Monte Carlo permutation test confirms the monthly distribution departs from uniformity even after Bonferroni correction. Kendall's W is FDR-significant (W = 0.530), providing exploratory evidence that the rank structure repeats across years. The KW test (raw p = 0.132) did not meet significance at any threshold. All ADD findings are exploratory.

**Malaria** (TEST-08): Monte Carlo permutation test confirms non-uniform monthly distribution under Bonferroni. KW reaches FDR significance (p = 0.0055). Kendall's W is not significant (p = 0.229), consistent with large variance in annual counts (11–22 events/year).

**Food Poisoning** (TEST-09): Monte Carlo permutation test reaches FDR significance (p = 0.0244), but not Bonferroni. KW reaches FDR significance (p = 0.0057). The non-uniformity is substantially driven by the February and May case concentrations documented in the outlier sensitivity analysis.

**Chikungunya** (TEST-05, TEST-10, TEST-15): Not significant under any correction or test family. Consistent with the small annual event counts (7–22) and poor rank concordance (W = 0.150).

**Methodological Caveats applying to all tests:**
1. **Temporal autocorrelation:** Disease observations across adjacent weeks are not independent. A multi-week reported-event cluster inflates effective test statistics.
2. **Multiple comparisons:** With 15 tests, 0.75 false positives are expected at α = 0.05 by chance alone under the null. Bonferroni correction is conservative and appropriate for family-wise error control.
3. **Exploratory framing:** These tests cannot confirm causal seasonality. They assess whether temporal clustering in the surveillance record departs from a uniform null distribution.
4. **Monte Carlo minimum p-value:** The minimum attainable permutation p-value is 0.0001 (1/10,001). Tests showing p = 0.0001 have exhausted the resolution of the 10,000-permutation procedure and would require additional permutations for finer resolution.

*Source: [`09_STATISTICAL_ANALYSIS.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/09_STATISTICAL_ANALYSIS.csv)*

---

## 10. Phase 5C Data Products & Artifact Manifest

All Phase 5C outputs reside in [`data_pipeline/phase5C_advanced_analysis/`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/):

| File | Description | Rows |
|:---|:---|:---:|
| [`01_SEASONAL_CONCENTRATION.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/01_SEASONAL_CONCENTRATION.csv) | CV, CR3, Gini by disease | 5 |
| [`02_PEAK_WINDOWS.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/02_PEAK_WINDOWS.csv) | Reported-event windows, contiguity, event/case shares | 5 |
| [`03_SEASONAL_STABILITY.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/03_SEASONAL_STABILITY.csv) | Spearman, Kendall W, dominant year, MAD | 5 |
| [`04_PEAK_TIMING_SHIFTS.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/04_PEAK_TIMING_SHIFTS.csv) | Annual reported-event peak months with ties | 5 |
| [`05_EVENT_CASE_DIVERGENCE.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/05_EVENT_CASE_DIVERGENCE.csv) | Monthly divergence ratios by disease × month | 60 |
| [`06_OUTLIER_SENSITIVITY.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/06_OUTLIER_SENSITIVITY.csv) | Before/after exclusion reported-case peaks | 5 |
| [`07_2026_OUT_OF_SAMPLE_COMPARISON.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/07_2026_OUT_OF_SAMPLE_COMPARISON.csv) | W01-W32 historical comparison | 5 |
| [`08_DISTRICT_SEASON_ANALYSIS.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/08_DISTRICT_SEASON_ANALYSIS.csv) | N≥10 district-level analysis | 14 |
| [`09_STATISTICAL_ANALYSIS.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/09_STATISTICAL_ANALYSIS.csv) | 15 tests with Bonferroni and BH-FDR corrections | 15 |
| [`10_PHASE5C_ANALYSIS_REPORT.md`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/10_PHASE5C_ANALYSIS_REPORT.md) | This report | — |

**Charts:**
- [`chart_seasonal_concentration.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/chart_seasonal_concentration.png)
- [`chart_seasonal_stability_heatmap.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/chart_seasonal_stability_heatmap.png)
- [`chart_peak_timing_shifts.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/chart_peak_timing_shifts.png)
- [`chart_event_case_divergence.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/chart_event_case_divergence.png)
- [`chart_outlier_sensitivity.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/chart_outlier_sensitivity.png)
- [`chart_2026_comparison.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/chart_2026_comparison.png)

**Reproducibility Scripts:**
- [`run_phase5c_pipeline.js`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/run_phase5c_pipeline.js) — generates all 9 CSV data products
- [`generate_phase5c_charts.js`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5C_advanced_analysis/generate_phase5c_charts.js) — generates all 6 charts

**Integrity Note:** All input datasets remain unmodified and byte-identical to their pre-Phase-5C state. The Phase 5B frozen tables were used as analytical inputs and were not altered.

*All input datasets, formulas, thresholds, exclusion rules, statistical methods, and output filenames are fully documented in this report and in the reproducibility scripts.*
