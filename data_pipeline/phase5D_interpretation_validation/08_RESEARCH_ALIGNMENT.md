# 08. RESEARCH QUESTION & ACADEMIC OBJECTIVES ALIGNMENT

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Document Code:** PHASE-5D-DOC-08  
**Institution:** RP Institute, affiliated to University of Mumbai  
**Programme:** B.Sc. Data Science, Semester III  
**Candidate:** Khan Umar  
**Baseline Dataset:** NCDC/IDSP Maharashtra Weekly Outbreaks (2022–2025 baseline, N=539; 2026 W01–W32 out-of-sample, N=45)  
**Status:** Frozen Academic Alignment Layer (Phase 5D)

---

## 1. Academic Origin & Context

This document establishes formal alignment between the completed data pipeline analysis (Phases 1 through 5C) and the authoritative academic research framework established in the project proposal and draft report (`Field_Project_Report_Draft_Seasonal_Disease_Patterns.docx`).

As documented in the forensic project audits (Phases 1–4), the initial academic concept originally proposed analyzing a secondary data compilation (EpiClim) spanning 2011–2019. However, rigorous data science forensic auditing revealed that the secondary compilation suffered from severe extraction errors, duplicate inflation, and unverified data provenance. Consequently, the research was rebuilt from primary, authoritative National Centre for Disease Control (NCDC) Integrated Disease Surveillance Programme (IDSP) weekly outbreak reports covering the modern 2022–2026 surveillance era.

The core research question and academic objectives defined at the project's inception remain the foundational benchmark. Below, each research question and formal objective is systematically evaluated against the evidence produced by the pipeline.

---

## 2. Primary Research Question Alignment

### Central Research Question (Section 1.4 of Project Framework)
> **“What seasonal patterns are evident in selected disease outbreak reports in Maharashtra, and how do these patterns vary across diseases and seasons?”**

* **Evidence Produced by the Analysis:**
  - Standardized monthly event registers and seasonal indices across 48 baseline calendar months (Phase 5B: `01_MONTHLY_DISTRIBUTION.csv`, `02_SEASONAL_INDICES.csv`).
  - Quantitative concentration metrics: Coefficient of Variation (CV), Top-3 Month Concentration Ratio (CR3), Normalized Shannon Entropy, and Gini Coefficients (Phase 5C: `01_SEASONAL_CONCENTRATION.csv`).
  - Contiguous vs. discrete 3-month peak window modeling and inter-annual peak timing displacement tracking (Phase 5C: `02_PEAK_WINDOWS.csv`, `04_PEAK_TIMING_SHIFTS.csv`).
  - Non-parametric Kruskal-Wallis tests, 10,000-draw Monte Carlo permutation tests, and Kendall’s $W$ concordance across annual rank profiles (Phase 5C: `09_STATISTICAL_ANALYSIS.csv`).
* **Analytical Finding:**
  1. *Dengue* exhibits a highly concentrated later-year reporting profile, with 82.8% of reported events occurring between June and October, reaching aggregate monthly peaks in October (seasonal index 1.97, 19.6% of events) and September (seasonal index 1.96, 17.6% of events). Peak event months shift within a 4-month window (June–October) across years.
  2. *Acute Diarrheal Disease (ADD)* displays a contiguous mid-year elevation window spanning June to August (43.1% of events), with substantial inter-annual rank concordance (Kendall’s $W = 0.530, p = 0.016$), alongside secondary elevations in October.
  3. *Malaria* demonstrates a tightly focused May–July calendar window (51.4% of events; June index 2.57, July index 2.40), recurring in all four baseline years within a narrow 2-month displacement window.
  4. *Food Poisoning* exhibits a bimodal distribution clustering in late winter (January–February, 26.1% events) and late spring (April–May, 29.0% events), completely absent in November, driven by point-source/mass-exposure records.
  5. *Chikungunya* exhibits diffuse distribution across the calendar year (CR3 = 39.5%, Kendall’s $W = 0.150, p = 0.832$), where apparent monthly spikes are artifacts of extreme event sparsity.
* **Confidence & Methodological Limitations:**
  - **High confidence** in the existence of distinct temporal concentration profiles for Dengue, Malaria, and ADD in surveillance reporting.
  - **Caveat:** The findings reflect seasonal patterns in *outbreak notification events*, not total community infection incidence. Climatic causation cannot be inferred without direct meteorological data linkage.

---

## 3. Alignment with Project Objectives (Section 1.5 of Project Framework)

### Objective 1: Data Cleaning and Standardization
> *“To clean and organise district-level weekly disease-outbreak data for Maharashtra.”*
* **Phase Supporting It:** Phases 1–4, Phase 5A.
* **Evidence Produced:**
  - Forensic reconstruction of an 809-row master analytical dataset (2022–2026 W32) with 100% provenance back to primary government PDFs (`NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`).
  - Standardized mapping of 49 raw disease labels into 30 harmonized families, creating verified baseline cohorts (Phase 5A: `02_DISEASE_FAMILY_MAPPING.csv`).
* **Result:** Achieved. Replaced unverified secondary sources with a pristine, fully auditable primary government surveillance pipeline.
* **Limitation:** Inherent historical reporting gaps in the published archive (2023 Weeks 15, 51, and 52 unnotified by central authority).

### Objective 2: Analysis of Monthly and Annual Distributions
> *“To analyse the monthly and annual distribution of reported Dengue, Malaria and Acute Diarrhoeal Disease records during the completed baseline period.”*
* **Phase Supporting It:** Phase 5B.
* **Evidence Produced:**
  - Comprehensive 48-month registers for 5 primary disease families (`01_MONTHLY_DISTRIBUTION.csv`, `04_YEARLY_DISTRIBUTION.csv`).
  - Weekly distribution profiles across 52 epidemiological weeks (`03_WEEKLY_DISTRIBUTION.csv`).
* **Result:** Achieved. Quantified exact annual totals, multi-year baselines, and monthly distribution curves.
* **Limitation:** Surveillance intensity varied between years; single high-volume years (e.g., Dengue 2023: 104 events; ADD 2024: 71 events) heavily influence aggregated 4-year totals.

### Objective 3: Identification of Concentration Windows and Peak Months
> *“To identify months with higher concentrations of reported outbreak cases and records.”*
* **Phase Supporting It:** Phase 5C.
* **Evidence Produced:**
  - Mathematical concentration profiling (`01_SEASONAL_CONCENTRATION.csv`): Event CV (Dengue 0.736; Malaria 0.753; ADD 0.524; Food Poisoning 0.564; Chikungunya 0.515).
  - Identification of 3-month peak windows (`02_PEAK_WINDOWS.csv`): Contiguous windows confirmed for Malaria (May–Jul: 51.4%) and ADD (Jun–Aug: 43.1%); discrete windows for Dengue (Oct, Sep, Jun: 50.5%) and Food Poisoning (May, Feb, Jan: 44.9%).
* **Result:** Achieved. Stratified diseases into verified concentration tiers (High, Moderate, Diffuse).
* **Limitation:** Case concentration is vulnerable to distortion by isolated mass-exposure outbreaks, necessitating separate evaluation of event vs. case metrics.

### Objective 4: Cross-Disease Comparison of Seasonal Profiles
> *“To compare the seasonal profiles of the selected diseases.”*
* **Phase Supporting It:** Phase 5B, Phase 5C, Phase 5D.
* **Evidence Produced:**
  - Cross-disease comparison matrices evaluating temporal concentration, peak timing, inter-annual stability, and outlier vulnerability without arbitrary ordinal disease rankings (`02_EVIDENCE_STRENGTH_MATRIX.csv`, `03_STABILITY_VOLATILITY_SYNTHESIS.csv`).
* **Result:** Achieved. Delineated the later-year reporting concentration of Dengue (June–October) from the May–July window of Malaria, the broad mid-year elevation of ADD (June–August), the bimodal distribution of Food Poisoning, and the diffuse instability of Chikungunya.
* **Limitation:** Comparisons evaluate surveillance reporting dynamics; clinical severity or individual health risk cannot be compared across diseases using outbreak data alone.

### Objective 5: District-Level Coverage and Geographic Variation
> *“To examine district-level coverage and variation in the reported outbreak data.”*
* **Phase Supporting It:** Phase 5A, Phase 5C.
* **Evidence Produced:**
  - District-level screening registers (`05_DISEASE_SELECTION_SCREENING.csv`).
  - Analysis of 13 qualifying district cohorts ($N \ge 10$) evaluating district-specific peak reported-event months and Jun–Sep proportions (`08_DISTRICT_SEASON_ANALYSIS.csv`, `05_DISTRICT_INTERPRETATION.csv`).
* **Result:** Achieved. Identified extreme geographic concentration for Malaria (Gadchiroli & Chandrapur = 61.4% of events) and Chikungunya (Pune = 25.6%), contrasted with statewide spatial dispersion for Dengue (31 districts) and ADD (33 districts).
* **Limitation:** Geographic concentration reflects reporting density and localized surveillance prioritization rather than true population morbidity differences.

### Objective 6: Outlier Sensitivity and Methodological Robustness
> *“To evaluate outlier sensitivity, event-case divergence, and data stability.”*
* **Phase Supporting It:** Phase 5C.
* **Evidence Produced:**
  - Formal sensitivity testing re-evaluating peak months after removing influential records (`06_OUTLIER_SENSITIVITY.csv`).
  - Event-to-case divergence ratios across all 12 calendar months (`05_EVENT_CASE_DIVERGENCE.csv`).
* **Result:** Achieved. Proved that Food Poisoning's February case volume is strongly influenced by 3 high-case outbreak records (1,615 cases) and ADD's February case peak is driven by 1 institutional outbreak (1,000 cases), whereas Dengue is completely resilient against outliers.
* **Limitation:** Sensitivity analysis tests the mathematical robustness of summary aggregates; excluded historical records remain genuine reported public health events.

### Objective 7: Out-of-Sample Partial-Year Validation
> *“To validate baseline patterns against recent surveillance observations without speculative forecasting.”*
* **Phase Supporting It:** Phase 5B, Phase 5C, Phase 5D.
* **Evidence Produced:**
  - Structured comparison of 2026 W01–W32 (45 records) against the equivalent historical 4-year mean (`07_2026_OUT_OF_SAMPLE_COMPARISON.csv`, `04_2026_INTERPRETATION.csv`).
  - Quantification of historical truncation risk and documentation of reporting label distributions (18 ADD records were reported in 2026 W01–W32, and all used the "Diarrhoeal" spelling; Food Poisoning recorded 19 reported events in 2026 W01–W32, while all 19 records used the "Suspected Food Poisoning" label; the simultaneous occurrence of these observations does not establish a causal or administrative relationship).
* **Result:** Achieved. Demonstrated that ADD tracked historical expectations, Food Poisoning event frequency was elevated, Malaria showed a marked surveillance deficit, and Dengue cannot be evaluated until late-year weeks are observed.
* **Limitation:** 2026 W01–W32 is strictly partial; no inference can be made regarding unobserved weeks (W33–W52).

### Objective 8: Evidence-Based Public Health Surveillance Conclusions
> *“To formulate evidence-based recommendations for seasonal preparedness while recognising the limitations of outbreak-based surveillance data.”*
* **Phase Supporting It:** Phase 5D.
* **Evidence Produced:**
  - Comprehensive evidence classification matrix (A: Strong, B: Moderate, C: Variable, D: Insufficient).
  - Explicit delineation of 9 unsupported claims (`10_UNSUPPORTED_CLAIMS.md`) and 16 viva examiner defenses (`11_VIVA_EXAMINER_QUESTIONS.md`).
* **Result:** Achieved. Provided public health authorities with defensible, surveillance-grounded operational considerations: preparing enhanced Dengue surveillance prior to September, focusing Malaria surveillance review in Eastern Vidarbha by May, maintaining active enteric surveillance across June–August, and evaluating Food Poisoning investigations as discrete point-source events rather than calendar cycles.
* **Limitation:** Operational recommendations pertain to surveillance logistics and early-warning deployment; they do not constitute clinical treatment guidelines.

---

## 4. Synthesis of Research Alignment

| Academic Framework Element | Original Proposal Specification | Final Phase 5D Execution | Alignment Verdict |
| :--- | :--- | :--- | :--- |
| **Research Question** | Seasonal patterns and cross-disease variation in Maharashtra outbreaks. | Fully answered using 12 concentration metrics, 3-month windows, and 15 formal statistical tests. | **PERFECT ALIGNMENT** |
| **Data Scope** | Secondary compilation (2011–2019). | Upgraded to authoritative primary NCDC government archive (2022–2026 W32). | **SIGNIFICANTLY ENHANCED** |
| **Disease Families** | Dengue, Malaria, Diarrhoeal Diseases. | Expanded to 5 primary families (adding Food Poisoning and Chikungunya) with 49-label audit. | **EXCEEDED SPECIFICATION** |
| **Statistical Rigor** | Descriptive monthly percentages. | Upgraded to CV, Gini, Shannon Entropy, Kruskal-Wallis, Monte Carlo Permutation, Kendall's W. | **METHODOLOGICALLY SUPERIOR** |
| **Validation Layer** | General discussion. | Rigorous outlier sensitivity, district validation, partial-year out-of-sample check, and viva audit. | **ROBUST & DEFENSIBLE** |

The completed analysis directly, rigorously, and comprehensively satisfies every research question and academic objective established for this B.Sc. Data Science Field Project.
