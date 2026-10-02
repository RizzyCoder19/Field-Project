# Phase 5B — Seasonal Analysis Report (2022–2025 Baseline)

**Document ID:** NCDC-MH-PHASE5B-ANALYSIS-2026-001  
**Execution Date:** 2026-10-02  
**Investigation Framework:** Descriptive Seasonal Analysis & Outbreak Distribution Modelling  
**Authoritative Input Dataset:** [`data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv)  
**Primary Comparison Cohort:** 539 validated outbreak records (2022–2025 completed baseline across 5 primary disease families)  
**Secondary Surveillance Period:** 2026 YTD (Weeks 01–32, 45 primary cohort records, quarantined from baseline indices)  
**Institutional Affiliation:** B.Sc. Data Science, Semester III | RP Institute, University of Mumbai  
**Candidate Name:** Khan Umar  
**Methodological Status:** Reviewed, Corrected, and Quality-Approved  

---

## 1. Scope & Surveillance Baseline Definition

This report establishes the descriptive seasonal structure of the five primary disease families identified in the Phase 5A selection audit: **Dengue**, **Acute Diarrheal Disease (ADD)**, **Malaria**, **Food Poisoning**, and **Chikungunya**.

The observational baseline spans the four completed calendar years **2022–2025**, comprising 539 validated primary outbreak records, 20,955 reported clinical cases, and 266 surveillance-attributed fatalities across Maharashtra.

### 1.1 Official 2023 NCDC Archive Accounting
In strict compliance with the epidemiological surveillance audit:
> **2023 is complete as officially published, with W15, W51 and W52 absent from the official NCDC archive; W50 is confirmed present.**

The official NCDC portal (`WeeklyOutbreaks.php`) never published reports for Weeks 15, 51, and 52 of 2023. These absence intervals represent permanent administrative voids in the official public record, not uncollected or discarded project data. Week 50 of 2023 is confirmed present in the archive. In accordance with epidemiological standards, zero artificial records or zero-count assumptions were imputed for the three unpublished weeks.

### 1.2 Separation of Partial 2026 Surveillance
Data for 2026 is current through Week 32 (mid-August 2026). Because the crucial post-monsoon and autumn surveillance window (Weeks 33–52) has not elapsed, 2026 is strictly quarantined as a partial year-to-date comparison period and is not incorporated into complete-year seasonal baseline indices.

---

## 2. Methodological Architecture

### 2.1 Unit of Observation & Epidemiological Guardrails
- **Surveillance Unit:** The primary unit of observation is the **government-reported outbreak event** registered under the Integrated Disease Surveillance Programme (IDSP / NCDC), defined as an unusual cluster or surge of cases investigated by local public health teams.
- **Incidence Guardrail:** This analysis measures outbreak-event frequency within the surveillance archive, **not total population incidence, disease prevalence, or community infection rates**.
- **Causality Guardrail:** Seasonal concentration indicates temporal clustering in government outbreak reporting; it does **not prove biological causation, climate determinism, or vector transmission dynamics**.

### 2.2 Equal-Year-Weighted Seasonal Indices
To prevent high-volume epidemic years (such as 2023 for Dengue with 104 events, or 2024 for ADD with 71 events) from overwhelming lower-volume years (such as 2022 with 20 Dengue events), seasonal indices are computed using an equal-year weighting formula:

1. For each completed year $y \in \{2022, 2023, 2024, 2025\}$ and month $m \in \{1, \dots, 12\}$, the monthly event proportion is calculated:
   $$p_{y, m} = \frac{N_{y, m}}{\sum_{m'=1}^{12} N_{y, m'}}$$
2. The four annual proportions are averaged to obtain the mean monthly event share:
   $$\bar{p}_m = \frac{1}{4} \sum_{y=2022}^{2025} p_{y, m}$$
3. The seasonal index is normalized against a uniform annual baseline ($1/12 \approx 0.0833$):
   $$\text{Seasonal Index}_m = \frac{\bar{p}_m}{1/12} = 12 \times \bar{p}_m$$

An index of **1.00** represents exact parity with the annual monthly average. Values above 1.00 represent above-average seasonal concentration, while values below 1.00 represent below-average activity. Patient case-burden indices are computed using an identical mathematical procedure.

### 2.3 Distinction Between Event Frequency and Case Burden
Outbreak event counts (the number of discrete outbreak investigations) and case totals (the aggregate number of affected patients) capture fundamentally distinct dimensions of disease burden. A single massive foodborne banquet exposure can produce hundreds of cases from a solitary event, whereas sporadic vector-borne transmission may produce dozens of localized outbreaks with small case clusters. Both metrics are reported concurrently.

---

## 3. Core Analytical Results

Across the completed 2022–2025 baseline, the five primary disease families exhibit the following surveillance characteristics:

| Disease Family | Outbreak Events | Reported Cases | Reported Deaths | Event Peak Month (Index) | Case Peak Month (Index) | Highest Pooled Week (Events) | Annual Event Peak Sequence (2022 → 2025) | Kruskal–Wallis Test ($H$, $p$-value) |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Dengue** | 204 | 3,144 | 93 | **Sep (1.97)** | **Aug (2.10)** | W42 (17) | Sep → Oct → Jun → Aug | $H = 35.33, p = 0.000219$ |
| **Acute Diarrheal Disease (ADD)** | 153 | 9,050 | 93 | **Jun (1.88)** | **Oct (1.70)** | W28 (9) | Dec → Jun → Jul → Oct | $H = 16.25, p = 0.1321$ |
| **Malaria** | 70 | 2,133 | 51 | **Jun (2.69)** | **May (2.86)** | W28 (6) | May → May → Jul → Jun | $H = 26.50, p = 0.005459$ |
| **Food Poisoning** | 69 | 5,927 | 29 | **May (2.51)** | **May (3.52)** | W06 (4) | May → Feb → Feb → Jan | $H = 26.39, p = 0.005679$ |
| **Chikungunya** | 43 | 701 | 0 | **May (1.69)** | **Sep (2.63)** | W42 (3) | May → Jul → Jun → Aug | $H = 12.12, p = 0.3549$ |

---

## 4. Methodological Reconciliation of Dengue Peak Timing

A critical methodological finding in the Dengue surveillance data is the apparent divergence across different temporal metrics:
- **Pooled Monthly Event Total:** Peaks in **October** (40 reported events; September is second with 36).
- **Pooled Weekly Surveillance Maximum:** Peaks in **Week 42** (17 reported events, falling squarely in mid-October).
- **Equal-Year-Weighted Seasonal Index:** Peaks in **September** (Index = 1.97; October is second with 1.93).

### Epidemiological & Mathematical Explanation
These metrics answer distinct analytical questions:
1. **Pooled Event Volume (October Peak):** Reflects the raw aggregate number of outbreak records across the 4-year archive. Because 2023 was a massive epidemic year in Maharashtra (104 Dengue outbreaks) and peaked heavily in October (29 events in October 2023 alone), pooled sums are disproportionately influenced by the 2023 epidemic wave.
2. **Weekly Maximum (Week 42 Peak):** Identifies the single most concentrated surveillance week across all four years, driven by the synchronized post-monsoon surge in October 2023.
3. **Equal-Year-Weighted Index (September Peak):** Gives equal 25% weight to each of the four completed years. In 2022 (Sep 35% vs Oct 25%) and 2024 (Sep 11.1% vs Oct 6.3%), September represented a higher proportion of annual transmission than October. Averaging the four within-year shares gives September an average annual share of 16.41% versus 16.05% for October.

Neither metric is erroneous; rather, they reflect the mathematical trade-off between aggregate event accumulation (favoring October) and multi-year recurrent timing (favoring September). The underlying seasonal-index methodology is preserved without alteration.

---

## 5. Outlier Event Context & Mass-Exposure Distortions

Surveillance data in low- and middle-income health systems can be strongly influenced by outlier reporting anomalies and high-volume mass-exposure events. The analytical data products capture two major outlier phenomena that must be interpreted with caution:

### 5.1 Food Poisoning: February Case Burden Disproportion
In [`01_MONTHLY_DISTRIBUTION.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/01_MONTHLY_DISTRIBUTION.csv), February accounts for **36.5% of all reported Food Poisoning cases (2,162 out of 5,927 cases)** across the 4-year baseline, despite accounting for only 11 out of 69 outbreak events (15.9%).
- This distortion was driven by three large mass-exposure events:
  - Parbhani District, 2024 Week 06: Two concurrent exposures reporting **629 cases** (`MAHA-2024-W06-005`) and **335 cases** (`MAHA-2024-W06-006`).
  - Kolhapur District, 2025 Week 06: An institutional canteen exposure reporting **651 cases** (`MAHA-2025-W06-002`).
- **Surveillance Context:** These three events contributed **1,615 cases (27.3% of the 4-year total)**. February case burden is strongly influenced by a small number of large reported mass-exposure events and therefore should not be interpreted as evidence of a biological seasonal peak.

### 5.2 Acute Diarrheal Disease (ADD): December 2025 Mortality Cluster
In [`01_MONTHLY_DISTRIBUTION.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/01_MONTHLY_DISTRIBUTION.csv), December records **78 of the 93 total ADD deaths (83.9%)** across the 4-year baseline, despite representing only 14 of 153 outbreak events (9.2%).
- Forensic audit reveals this mortality concentration occurred almost entirely within a single surveillance report in **2025 Week 49**:
  - Chandrapur District: `MAHA-2025-W49-001` (2 cases, **25 deaths**).
  - Kolhapur District: `MAHA-2025-W49-003` (2 cases, **25 deaths**).
  - Kolhapur District: `MAHA-2025-W49-004` (2 cases, **25 deaths**).
- **Epidemiological Context:** These three entries report identical fatality figures ($N=25$) alongside minimal case counts ($N=2$), indicating potential transcription or column-mapping anomalies in the published IDSP weekly report table. They are preserved in the dataset to maintain 1:1 fidelity with the official NCDC archive, but should not be interpreted as evidence of a biologically lethal winter strain of diarrheal pathogens.

---

## 6. District Concentration & Spatial Heterogeneity

The observed temporal patterns represent the **reported outbreak-event distribution within the Maharashtra surveillance dataset** and must not be conflated with a uniform, statewide transmission dynamic. Several diseases exhibit extreme spatial concentration:

### 6.1 Malaria: Eastern Vidarbha District Concentration
- Out of 70 baseline Malaria outbreaks, **41 events (59.4%)** occurred in just two contiguous districts in Eastern Vidarbha:
  - **Gadchiroli District:** 25 outbreaks (**36.2%** of state total).
  - **Chandrapur District:** 16 outbreaks (**23.2%** of state total).
- The remaining 34 districts of Maharashtra contributed only 29 outbreaks combined over 4 years.
- **Analytical Caution:** The observed Malaria distribution is strongly concentrated in Eastern Vidarbha. Therefore, the aggregate Maharashtra pattern should not be interpreted as a homogeneous statewide pattern.

### 6.2 Chikungunya: Urban & Regional Clustering
- Out of 43 baseline Chikungunya outbreaks, **19 events (44.2%)** occurred in two districts:
  - **Pune District:** 11 outbreaks (**25.6%** of state total).
  - **Nanded District:** 8 outbreaks (**18.6%** of state total).
- The remaining outbreaks were sparsely distributed across Akola (14.0%), Osmanabad (9.3%), and Kolhapur (9.3%).

---

## 7. Cautious Statistical Testing Interpretation (Kruskal–Wallis)

The exploratory Kruskal–Wallis non-parametric tests evaluated whether the distribution of weekly outbreak counts differed across the 12 calendar month groups:

### 7.1 Formally Documenting Non-Significant Findings
- **Acute Diarrheal Disease:** $H = 16.25, p = 0.1321$ ($\text{degrees of freedom} = 11$).
- **Chikungunya:** $H = 12.12, p = 0.3549$ ($\text{degrees of freedom} = 11$).
- **Statistical Interpretation:** For Acute Diarrheal Disease and Chikungunya:
  > **No statistically significant monthly difference was detected under this analysis.**
- **Analytical Caution:** Neither disease should be described as definitively endemic or definitively non-seasonal based solely on the statistical test. Within the statistical power and sample size of this 4-year surveillance dataset, no statistically significant monthly difference was detected under this analysis.

### 7.2 Methodological Caveats on Statistically Significant Tests
- **Dengue** ($p = 0.000219$), **Malaria** ($p = 0.005459$), and **Food Poisoning** ($p = 0.005679$) yielded statistically significant results.
- **Temporal Autocorrelation Caveat:** Weekly surveillance observations within an ongoing epidemic wave are not strictly independent (an outbreak reported in Week 38 increases the likelihood of reported outbreaks in Week 39). Temporal dependence can artificially inflate the test statistic ($H$), leading to anti-conservative p-values.
- **Multiple Testing Caveat:** Five simultaneous tests were evaluated without family-wise alpha correction. Under a conservative Bonferroni correction ($\alpha = 0.05 / 5 = 0.01$), Dengue, Malaria, and Food Poisoning remain statistically significant.
- **Substantive Distinction:** Statistical significance confirms non-uniform calendar timing in the surveillance record; it does **not prove that climate or biology is the direct causal driver**.

---

## 8. Comparative Role of Partial 2026 Surveillance (Weeks 01–32)

Data for 2026 is evaluated separately in [`07_2026_YTD_PRIMARY_COMPARISON.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/07_2026_YTD_PRIMARY_COMPARISON.csv) and [`04_YEARLY_DISTRIBUTION.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/04_YEARLY_DISTRIBUTION.csv).

| Disease Family | 2022–2025 Baseline Events | 2026 YTD Events (W01–W32) | 2026 Peak Month YTD | Surveillance Shift / Reporting Artifact Observed |
|:---|:---:|:---:|:---:|:---|
| **Dengue** | 204 | 6 | Mar | Severe peak truncation; Weeks 33–52 unobserved. |
| **Acute Diarrheal Disease** | 153 | 18 | Jan | 100% of 2026 records reported under British spelling `Diarrhoeal`. |
| **Food Poisoning** | 69 | 19 | Jun | 100% of 2026 records reported under prefix `Suspected Food Poisoning`. |
| **Malaria** | 70 | 1 | Jul | Single focal outbreak in Gadchiroli during mid-monsoon. |
| **Chikungunya** | 43 | 1 | Apr | Single focal outbreak in Pune. |

Because Dengue and Chikungunya normally generate over 44% of their annual outbreaks between September and November (Weeks 33–48), 2026 totals cannot be directly compared against full-year historic baselines. 2026 will serve exclusively as an out-of-sample forward evaluation dataset during Phase 5C.

---

## 9. Phase 5B Data Products & Artifact Manifest

All Phase 5B outputs reside directly inside [`data_pipeline/phase5B_seasonal_analysis/`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/):

1. [`01_MONTHLY_DISTRIBUTION.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/01_MONTHLY_DISTRIBUTION.csv) — 12-month event, case, and death distributions across all 5 disease families.
2. [`02_SEASONAL_INDICES.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/02_SEASONAL_INDICES.csv) — Equal-year-weighted event and case seasonal indices normalized to mean 1.00.
3. [`03_WEEKLY_DISTRIBUTION.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/03_WEEKLY_DISTRIBUTION.csv) — Complete 52-week surveillance envelope (260 rows).
4. [`04_YEARLY_DISTRIBUTION.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/04_YEARLY_DISTRIBUTION.csv) — Annual surveillance distribution (2022–2025 `COMPLETE_YEAR` and 2026 `PARTIAL_YTD_W01_W32`).
5. [`05_SEASONAL_STATISTICS.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/05_SEASONAL_STATISTICS.csv) — Peak timing metrics, annual shifts, and Kruskal–Wallis test statistics.
6. [`06_PHASE5B_ANALYSIS_REPORT.md`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/06_PHASE5B_ANALYSIS_REPORT.md) — This authoritative, comprehensive analytical report.
7. [`07_2026_YTD_PRIMARY_COMPARISON.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/07_2026_YTD_PRIMARY_COMPARISON.csv) — Isolated current-year comparative tracking table.
8. [`08_PHASE5B_REVIEW.md`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/08_PHASE5B_REVIEW.md) — Independent methodological peer-review decision document.
9. **Presentation-Ready Visualizations:**
   - [`chart_monthly_outbreak_events.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/chart_monthly_outbreak_events.png)
   - [`chart_seasonal_index_heatmap.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/chart_seasonal_index_heatmap.png)
   - [`chart_annual_outbreak_events.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/chart_annual_outbreak_events.png)
   - Five disease-specific weekly profile charts ([`chart_weekly_Dengue.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/chart_weekly_Dengue.png), [`chart_weekly_Acute_Diarrheal_Disease.png`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5B_seasonal_analysis/chart_weekly_Acute_Diarrheal_Disease.png), etc.).

*All input datasets remain unmodified and byte-identical to their pre-audit state.*