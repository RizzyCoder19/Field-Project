# 06. METHODOLOGY PRESENTATION & PIPELINE ARCHITECTURE

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Document Code:** PHASE-5E-DOC-06  
**Candidate:** Khan Umar  
**Programme:** B.Sc. Data Science, Semester III  
**Institution:** RP Institute, affiliated to University of Mumbai  
**Academic Year:** 2026–27  

---

## 1. METHODOLOGICAL PHILOSOPHY & OBJECTIVES

The goal of this investigation is not merely to summarize public health statistics, but to construct a fully auditable, reproducible, end-to-end Data Science pipeline. Public health data published by administrative government bodies presents significant challenges: non-standardized disease naming, varying reporting thresholds across districts, missing reports, and extreme institutional point-source outliers.

Our methodology adheres to strict academic principles:
- **Zero Information Loss:** Original raw strings from government records are preserved in full.
- **Additive Engineering:** Analytical dimensions (standardized taxonomy, ISO epidemiological weeks, calendar months) are added alongside raw fields without overwriting primary data.
- **Traceable Provenance:** All analytical records are programmatically linked to their source PDF/page provenance, supported by targeted manual verification and global integrity checks.
- **Statistical Separation:** Completed baseline years (2022–2025) are strictly partitioned from out-of-sample comparison data (2026 Weeks 01–32).

---

## 2. THE 8-STAGE END-TO-END PIPELINE

```
+---------------------------------------------------------------------------------+
| Stage 1: SOURCE ACQUISITION                                                     |
| Official NCDC/IDSP Weekly Outbreak Bulletins (PDF format, MoHFW, Govt of India)  |
+---------------------------------------------------------------------------------+
                                       |
                                       v
+---------------------------------------------------------------------------------+
| Stage 2: TABULAR PARSING & EXTRACTION                                           |
| Tabular PDF extraction -> Structured JSON records (District, Disease, Cases, etc)|
+---------------------------------------------------------------------------------+
                                       |
                                       v
+---------------------------------------------------------------------------------+
| Stage 3: FORENSIC RECORD VALIDATION                                             |
| Programmatic PDF/page linkage + targeted manual verification + integrity checks |
+---------------------------------------------------------------------------------+
                                       |
                                       v
+---------------------------------------------------------------------------------+
| Stage 4: ADDITIVE ANALYTICAL CLEANING                                           |
| Preserve raw text (disease_raw); map calendar months & ISO epidemiological weeks|
| Final Master: NCDC_Maharashtra_CLEAN_ANALYTICAL.csv (809 records)               |
+---------------------------------------------------------------------------------+
                                       |
                                       v
+---------------------------------------------------------------------------------+
| Stage 5: TAXONOMIC DISEASE AUDIT (Phase 5A)                                     |
| 116 raw strings -> 56 cleaned labels -> 30 disease families -> 5 primary cohorts|
| (Screening criteria: N >= 40, present in >= 3 baseline years, public priority)  |
+---------------------------------------------------------------------------------+
                                       |
                                       v
+---------------------------------------------------------------------------------+
| Stage 6: QUANTITATIVE SEASONAL ANALYSIS (Phase 5B)                             |
| Monthly distribution, annual trends, weekly profiles, Seasonal Indices (Sm)     |
+---------------------------------------------------------------------------------+
                                       |
                                       v
+---------------------------------------------------------------------------------+
| Stage 7: ADVANCED STATISTICAL & SENSITIVITY MODELING (Phase 5C)                 |
| Concentration (CV, CR3, Gini), Kendall's W stability, Kruskal-Wallis,          |
| Outlier sensitivity testing, Event vs. Case divergence, District spatial analysis|
+---------------------------------------------------------------------------------+
                                       |
                                       v
+---------------------------------------------------------------------------------+
| Stage 8: INTERPRETATION, VALIDATION & SYNTHESIS (Phases 5D & 5E)                |
| Explicit limitation boundaries, 2026 YTD comparison, Viva claim register        |
+---------------------------------------------------------------------------------+
```

---

## 3. DETAILED STAGE SPECIFICATIONS

### Stage 1: Source Acquisition & Provenance
- **Apex Agency:** National Centre for Disease Control (NCDC), Directorate General of Health Services (DGHS), Ministry of Health & Family Welfare (MoHFW), Government of India.
- **Surveillance Vehicle:** Integrated Disease Surveillance Programme (IDSP) Weekly Outbreak Reports.
- **Nature of Surveillance:** Weekly public health bulletins summarizing community, school, institutional, and village-level disease outbreaks investigated by Rapid Response Teams (RRTs).
- **Temporal Span:** 2022 through Week 32 of 2026.
- **Geographic Focus:** State of Maharashtra (all 36 administrative districts).

### Stage 2: Tabular Extraction
- Official bulletins are published as multi-page PDF documents containing state-by-state outbreak tables.
- Each outbreak record is extracted with seven mandatory attributes:
  1. `state`: Administrative state ("Maharashtra").
  2. `district`: Administrative reporting district.
  3. `disease_raw`: Exact string printed in the report table (e.g., "Dengue?", "Acute Diarrheal Disease").
  4. `cases`: Number of reported clinical/laboratory-confirmed cases.
  5. `deaths`: Associated deaths recorded by the investigation team.
  6. `date_of_start`: Documented onset date of the outbreak.
  7. `reporting_week` & `year`: Official IDSP epidemiological week and calendar year.

### Stage 3: Record-Level Validation
- **Integrity Cross-Check:** All analytical records were programmatically linked to their source PDF/page provenance, supported by targeted manual verification and global integrity checks across case counts, fatalities, and date sequences.
- **Handling Inconsistencies:** Records with ambiguous district spellings (e.g., "Aurangabad" vs. "Chhatrapati Sambhajinagar", "Ahmednagar" vs. "Ahilyanagar") were standardized using an authoritative district alias map without destroying original text.
- **Archive Gaps Documented:** In the 2023 calendar year, 49 weeks were published. Weeks 15, 51, and 52 were unpublished / unavailable in the public NCDC archive (Week 50 is present and published). These were recorded as missing administrative reports; no synthetic zeros were inserted into the dataset.

### Stage 4: Additive Analytical Cleaning
- Rather than mutating the primary raw data, the master analytical dataset (`NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`, 809 rows) was engineered with additive columns:
  - `clean_district`: Standardized district name.
  - `disease_raw`: Preserved exact original report text.
  - `standardized_disease`: Standardized clinical entity.
  - `disease_family`: High-level taxonomic category.
  - `calendar_month`: Inferred from outbreak start date and reporting week.
  - `epi_week`: ISO 8601 standardized epidemiological week.
  - `baseline_flag`: Binary indicator (1 = 2022–2025 completed baseline; 0 = 2026 YTD / historical).

### Stage 5: Taxonomic Disease Audit
- A comprehensive audit was executed across the surveillance records:
  - Screened **116 raw source strings**.
  - Mapped into **56 cleaned analytical labels** to resolve typographical artifacts and administrative variants.
  - Formed **30 disease families**.
- Filtered through objective screening thresholds:
  - Minimum of 40 baseline records ($N \ge 40$).
  - Representation in at least 3 baseline years.
  - Public health surveillance priority.
- This yielded five primary disease families for intensive seasonal analysis:
  1. **Dengue:** 204 baseline records (3,144 cases; 93 deaths)
  2. **Acute Diarrheal Disease (ADD):** 153 baseline records (9,050 cases; 93 deaths)
  3. **Malaria:** 70 baseline records (2,133 cases; 51 deaths)
  4. **Food Poisoning:** 69 baseline records (5,927 cases; 29 deaths)
  5. **Chikungunya:** 43 baseline records (701 cases; 0 deaths)
- Together, these five cohorts account for 539 baseline records (92.5% of all baseline outbreak notifications in Maharashtra; 21,955 reported cases, 266 reported deaths).

### Stage 6: Quantitative Seasonality Analysis
- **Seasonal Index ($S_m$):**
  $$S_m = \frac{\bar{X}_m}{\frac{1}{12}\sum_{k=1}^{12} \bar{X}_k} \times 100$$
  where $\bar{X}_m$ is the mean number of outbreak records in month $m$ across 2022–2025. Values $> 100$ reflect above-average seasonal concentration.
- **Top-3 Concentration Ratio ($CR_3$):**
  $$CR_3 = \frac{\sum_{i \in \text{Top 3}} X_i}{\sum_{m=1}^{12} X_m} \times 100$$
- **Coefficient of Variation ($CV$):**
  $$CV = \frac{\sigma_{\text{monthly}}}{\mu_{\text{monthly}}}$$
- **Distributional Equality:** Normalized Shannon Entropy ($H_{\text{norm}}$) and Gini Coefficient were computed to evaluate monthly distribution spread.

### Stage 7: Advanced Statistical & Sensitivity Modeling
- **Non-Parametric Group Differences:** Kruskal-Wallis $H$-tests and Permutation $\chi^2$ tests were conducted across calendar months to assess whether month-to-month variation is statistically significant under rigorous family-wise error rate control (Bonferroni / Benjamini-Hochberg FDR).
- **Inter-Annual Stability:** Kendall's coefficient of concordance ($W$) was calculated on monthly rank vectors across the four baseline years:
  $$W = \frac{12 S}{m^2 (n^3 - n)}$$
  measuring whether the monthly profile of a disease replicates consistently year after year.
- **Outlier Sensitivity:** Re-computing concentration ratios, peak months, and monthly shares after systematically pruning top-tier influential outbreaks (e.g., the 1,000-case Nanded ADD outbreak).
- **Event-Case Divergence:** Evaluating the mathematical disconnect between notification event counts and aggregate patient volumes.
- **Spatial Heterogeneity:** Measuring district-level event concentration ($N \ge 10$ qualification threshold).

### Stage 8: Interpretation, Validation & Synthesis
- Synthesis of analytical findings into defensible public health surveillance conclusions.
- Out-of-sample comparison against partial-year 2026 data (Weeks 01–32) without invalid predictive extrapolation.
- Formal documentation of explicit unsupported claims to ensure rigorous viva defense.

---

## 4. DEFENSE OF METHODOLOGICAL DECISIONS

| Methodological Decision | Academic Rationale | Alternative Rejected & Reason |
| :--- | :--- | :--- |
| **Separating 2026 W01–W32 from Baseline** | 2026 is partial-year (32 weeks); merging it with completed 52-week calendar years would severely bias seasonality metrics. | Merging 2026 into baseline (Rejected: artificially dilutes late-year peaks). |
| **Preserving `disease_raw`** | Guarantees 100% auditability and forensic traceability back to government PDF bulletins. | Overwriting raw text with standardized labels (Rejected: irreversible data destruction). |
| **Evaluating Events Separately from Cases** | Outbreak notifications measure surveillance detection frequency; case counts measure cluster magnitude and are easily distorted by single mass-exposure events. | Relying solely on case counts (Rejected: a single 1,000-case event would distort the entire disease profile). |
| **Using Non-Parametric Statistics (Kruskal-Wallis, Kendall's W)** | Surveillance event frequencies across months are non-normally distributed, small in sample size, and heteroskedastic. | Parametric ANOVA / Pearson correlation (Rejected: violates normality and homoscedasticity assumptions). |
| **Excluding Archival EpiClim Dataset** | Earlier exploratory EpiClim data (2009–2022) used an entirely different methodology, geography, and disease definition. | Pooling EpiClim with NCDC (Rejected: fatal methodological conflation). |
