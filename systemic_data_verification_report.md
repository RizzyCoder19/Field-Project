# SYSTEMIC DATA VERIFICATION & TRACEABILITY REPORT
## Forensic Audit of Data Integrity, Provenance, and Systemic Unity Across Artifacts

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Degree Programme:** B.Sc. Data Science, Semester III | RP Institute, Affiliated to University of Mumbai  
**Candidate Name:** Khan Umar  
**Surveillance Territory:** Maharashtra, India (36 Districts)  
**Temporal Window:** 2022 W01 to 2026 W32 (237 Surveillance Weeks)  
**Primary Source:** Integrated Disease Surveillance Programme (IDSP), National Centre for Disease Control (NCDC), MoHFW, Government of India  
**Date of Audit:** October 2026  
**Auditor / Verification System:** Antigravity Autonomous Coding Agent  

---

## 1. Executive Summary & Verification Verdict

### Evaluation of the Statement:
> *"The website, the repo, the raw data, and the finalized report are all one and connected to each other."*

### Official Verification Verdict:
$$\mathbf{STATEMENT\ STATUS:\ VERIFIED\ TRUE\ (WITH\ PROVENANCE\ QUALIFICATION)}$$

The statement is **TRUE**. All four components—the **Finalized Report** (`report/finalized/0.pdf`), the **Interactive Website** (`website/`), the **Repository Pipeline** (`c:\Users\ADMIN\Desktop\Field-Project-master`), and the **Primary Raw Health Surveillance Bulletins** (`NCDC weekly outbreaks/`)—form a **single, closed, interconnected, and mathematically unified research system**.

#### Key Distinctions & Provenance Qualification:
1. **The True "Raw Data"**: The authoritative primary raw dataset consists of the **237 official weekly epidemiological bulletin PDFs (2022–2026)** housed in `NCDC weekly outbreaks/`. These are the genuine source files issued by NCDC/MoHFW from which all 809 project records were extracted.
2. **Archival Legacy Data**: The file `raw dataset/Final_data.csv` (8,985 records, 2009–2022) is an older secondary compilation (EpiClim). As formally documented in `data_pipeline/REPOSITORY_MANIFEST.md` and `Data_Source_Audit_Report.md`, this file was explicitly evaluated and designated as **ARCHIVAL ONLY / RETIRED** because it lacked weekly outbreak tracking, official IDSP unique identifier codes, and coverage of the 2023–2026 study period.
3. **Data Uniformity**: Following recent synchronization of the website codebase, every numerical metric, case total, death toll, seasonal concentration index (CR3), Kendall’s $W$ concordance coefficient, and out-of-sample figure matches across the Report, Website, and Repository without discrepancy.

---

## 2. Multi-Tier Provenance & Architecture Map

The research workflow follows a strict 5-stage directional lineage:

```
[STAGE 1: PRIMARY RAW SOURCE ARCHIVE]
└── NCDC weekly outbreaks/ (237 Official Weekly Surveillance PDFs: 2022–2026 W32)
       │
       ▼
[STAGE 2: DATA EXTRACTION & INGESTION PIPELINE]
└── data_pipeline/raw_extracted/ (237 parsed JSON structures per bulletin)
└── data_pipeline/master/NCDC_Maharashtra_MASTER_RAW.csv (809 extracted records)
└── data_pipeline/validation/FINAL_ROW_LEVEL_VALIDATION.csv (Stratified PDF-to-row audit)
       │
       ▼
[STAGE 3: CLEAN ANALYTICAL CORE]
└── data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv (Authoritative clean dataset)
    ├── 237 Epidemiological Weeks (203 Outbreak Weeks, 34 NIL Weeks)
    ├── 809 Total Extracted Records (733 Baseline 2022–2025, 76 Partial-2026)
    └── 5 Primary Analytical Cohorts (539 Baseline Records = 73.5% of Baseline)
       │
       ▼
[STAGE 4: STATISTICAL & MATHEMATICAL DERIVATION ENGINE]
└── data_pipeline/phase5A_disease_audit/ (Standardization of 49 strings into 30 families)
└── data_pipeline/phase5B_seasonal_analysis/ (Monthly indices & Fourier curves)
└── data_pipeline/phase5C_advanced_analysis/ (CR3, CV, Gini, Kendall's W concordance)
└── data_pipeline/phase5D_interpretation_validation/ (Synthesis & cross-validation)
       │
       ├─────────────────────────────────────────┐
       ▼                                         ▼
[STAGE 5A: UNIVERSITY PROJECT REPORT]     [STAGE 5B: INTERACTIVE WEB PORTAL]
└── report/finalized/0.pdf                 └── website/src/
    (54-page submission-ready thesis)          (Next.js 16 / TypeScript Portal)
    - 20,955 Baseline Cases                    - 20,955 Baseline Cases
    - 2,126 Partial 2026 Cases                 - 2,126 Partial 2026 Cases
    - 73.5% Primary Cohort Share               - 73.5% Primary Cohort Share
    - Exact CR3 & Kendall's W                  - Exact CR3 & Kendall's W
```

---

## 3. Forensic Cross-Verification Matrix

The following matrix compares the exact numerical metrics across all three presentation and calculation layers:

| Epidemiological & Statistical Indicator | Raw Pipeline Engine (`data_pipeline/`) | Finalized Thesis (`report/finalized/0.pdf`) | Web Portal (`website/`) | Systemic Concordance |
| :--- | :---: | :---: | :---: | :---: |
| **Total Surveillance Weeks** | 237 | 237 (Sec 3.1, p. 14) | 237 (`researchData.ts`) | **100% MATCH** |
| **Outbreak Active Weeks** | 203 | 203 (Table 4, p. 15) | 203 (`researchData.ts`) | **100% MATCH** |
| **NIL Surveillance Weeks** | 34 | 34 (Table 4, p. 15) | 34 (`researchData.ts`) | **100% MATCH** |
| **Total Extracted Records** | 809 | 809 (Table 4, p. 15) | 809 (`researchData.ts`) | **100% MATCH** |
| **Completed Baseline Records (2022–2025)** | 733 | 733 (Table 5, p. 16) | 733 (`researchData.ts`) | **100% MATCH** |
| **Primary Cohort Baseline Records** | 539 | 539 (Table 5, p. 16) | 539 (`researchData.ts`) | **100% MATCH** |
| **Primary Cohort Baseline Proportion** | 73.5% (539/733) | 73.5% (Sec 3.3, p. 16) | 73.5% (`LivingDataField`) | **100% MATCH** |
| **Baseline Primary Reported Cases** | **20,955** | **20,955** (Table 7, p. 20) | **20,955** (`researchData.ts`) | **100% MATCH** |
| **Baseline Primary Attributed Deaths** | 266 | 266 (Table 7, p. 20) | 266 (`researchData.ts`) | **100% MATCH** |
| **Partial 2026 Records (W01–W32)** | 45 primary (76 total) | 45 primary (Table 19, p. 43) | 45 primary (`researchData.ts`) | **100% MATCH** |
| **Partial 2026 Primary Cases (W01–W32)** | **2,126** | **2,126** (Table 19, p. 43) | **2,126** (`researchData.ts`) | **100% MATCH** |
| **Partial 2026 Reported Deaths** | 0 | 0 (Table 19, p. 43) | 0 (`NativeTimeline2026`) | **100% MATCH** |

---

## 4. Disease-by-Disease Baseline Granular Concordance (2022–2025)

Every individual disease cohort was verified against `03_DISEASE_FAMILY_SUMMARY.csv`, `01_SEASONAL_CONCENTRATION.csv`, `03_SEASONAL_STABILITY.csv`, and Tables 7, 8, 9, 10, 11, 12, 13, 14 of the Report:

### 1. Dengue
* **Records:** 204 (Repo) $\leftrightarrow$ 204 (Report Table 7) $\leftrightarrow$ 204 (Website)
* **Cases:** 3,144 (Repo) $\leftrightarrow$ 3,144 (Report Table 7) $\leftrightarrow$ 3,144 (Website)
* **Deaths:** 93 (CFR = 2.96%) (Repo) $\leftrightarrow$ 93 (Report Table 7) $\leftrightarrow$ 93 (Website)
* **Districts Affected:** 31 of 36 districts (86.1% geographic spread)
* **Seasonal Peak Window:** Jun, Sep, Oct (Discrete high-activity window)
* **Event CR3:** 50.5% (Repo `01_SEASONAL_CONCENTRATION.csv`) $\leftrightarrow$ 50.5% (Report Table 9) $\leftrightarrow$ 50.5% (Website)
* **Jun–Oct Concentration:** 73.0% of annual events occur within June–October
* **Inter-annual Concordance:** Kendall’s $W = 0.405$, $p = 0.086$ (Repo) $\leftrightarrow$ $W = 0.405$, $p = 0.086$ (Report Table 10) $\leftrightarrow$ $W = 0.405$ (Website)

### 2. Acute Diarrheal Disease (ADD)
* **Records:** 153 (Repo) $\leftrightarrow$ 153 (Report Table 7) $\leftrightarrow$ 153 (Website)
* **Cases:** 9,050 (Repo) $\leftrightarrow$ 9,050 (Report Table 7) $\leftrightarrow$ 9,050 (Website)
* **Deaths:** 93 (CFR = 1.03%) (Repo) $\leftrightarrow$ 93 (Report Table 7) $\leftrightarrow$ 93 (Website)
* **Districts Affected:** 33 of 36 districts (91.7% geographic spread)
* **Seasonal Peak Window:** Jun, Jul, Oct (Contiguous monsoon surge)
* **Event CR3:** 43.1% (Repo `01_SEASONAL_CONCENTRATION.csv`) $\leftrightarrow$ 43.1% (Report Table 9) $\leftrightarrow$ 43.1% (Website)
* **Inter-annual Concordance:** Kendall’s $W = 0.530$, $p = 0.016^*$ (**Statistically Significant stability under Bonferroni threshold**)

### 3. Food Poisoning
* **Records:** 69 (Repo) $\leftrightarrow$ 69 (Report Table 7) $\leftrightarrow$ 69 (Website)
* **Cases:** 5,927 (Repo) $\leftrightarrow$ 5,927 (Report Table 7) $\leftrightarrow$ 5,927 (Website)
* **Deaths:** 29 (CFR = 0.49%) (Repo) $\leftrightarrow$ 29 (Report Table 7) $\leftrightarrow$ 29 (Website)
* **Districts Affected:** 27 of 36 districts (75.0% geographic spread)
* **Seasonal Peak Months:** Feb, Apr, May (Discontinuous wedding/festival exposure)
* **Event CR3:** 44.9% | **Case CR3:** 66.7% (Driven by massive point-source exposure events)
* **Outlier Sensitivity:** 3 massive outbreaks account for 1,615 cases (27.2% of all Food Poisoning cases)
* **Inter-annual Concordance:** Kendall’s $W = 0.386$, $p = 0.108$

### 4. Malaria
* **Records:** 70 (Repo) $\leftrightarrow$ 70 (Report Table 7) $\leftrightarrow$ 70 (Website)
* **Cases:** 2,133 (Repo) $\leftrightarrow$ 2,133 (Report Table 7) $\leftrightarrow$ 2,133 (Website)
* **Deaths:** 51 (CFR = 2.39%) (Repo) $\leftrightarrow$ 51 (Report Table 7) $\leftrightarrow$ 51 (Website)
* **Districts Affected:** 15 of 36 districts (41.7% geographic spread)
* **Geographic Hyper-Concentration:** 61.4% of all reported events occur in Gadchiroli and Chandrapur (Eastern Vidarbha forest ecology)
* **Seasonal Peak Window:** May, Jun, Jul (Contiguous early-monsoon window)
* **Event CR3:** 51.4% (Repo `01_SEASONAL_CONCENTRATION.csv`) $\leftrightarrow$ 51.4% (Report Table 9) $\leftrightarrow$ 51.4% (Website)
* **Inter-annual Concordance:** Kendall’s $W = 0.319$, $p = 0.229$

### 5. Chikungunya
* **Records:** 43 (Repo) $\leftrightarrow$ 43 (Report Table 7) $\leftrightarrow$ 43 (Website)
* **Cases:** 701 (Repo) $\leftrightarrow$ 701 (Report Table 7) $\leftrightarrow$ 701 (Website)
* **Deaths:** 0 (CFR = 0.00%) (Repo) $\leftrightarrow$ 0 (Report Table 7) $\leftrightarrow$ 0 (Website)
* **Districts Affected:** 15 of 36 districts (41.7% geographic spread; Pune accounts for 25.6%)
* **Event CR3:** 39.5% (Mar, May, Jun) (Repo `01_SEASONAL_CONCENTRATION.csv`) $\leftrightarrow$ 39.5% (Report Table 9) $\leftrightarrow$ 39.5% (Website)
* **Inter-annual Concordance:** Kendall’s $W = 0.150$, $p = 0.832$ (**Non-significant; high sparsity artifact**)

---

## 5. Partial Year 2026 Out-of-Sample Validation (W01–W32)

Both the Report (Section 4.7 & Table 19) and Website (`NativeTimeline2026.tsx`) present identical out-of-sample surveillance figures:
* **Total 2026 Primary Outbreaks:** 45 records
* **Total 2026 Primary Cases:** 2,126 cases
* **Breakdown by Disease:**
  - Food Poisoning: 19 records, 1,082 cases, 0 deaths
  - Acute Diarrheal Disease: 18 records, 864 cases, 0 deaths
  - Dengue: 6 records, 106 cases, 0 deaths
  - Malaria: 1 record, 65 cases, 0 deaths
  - Chikungunya: 1 record, 9 cases, 0 deaths
* **Analytical Finding:** 55.4% of annual baseline Dengue outbreaks occur *after* week 32. Truncation at Week 32 explains why only 6 Dengue outbreaks were recorded up to August 2026.

---

## 6. Audit of Applied Website Reconciliations

Prior to this verification pass, the website retained preliminary draft numbers from an earlier development phase. The following reconciliations were made to establish 100% parity:

1. **Baseline Cases:** Reconciled from `21,955` to **`20,955`** across all components (`researchData.ts`, `CinematicIntro.tsx`, `EvidenceArchiveViewer.tsx`, `InteractiveSeasonalChart.tsx`, `ScrollStory.tsx`, and app routes `/data`, `/method`, `/print`, `/seasonality`).
2. **Partial-2026 Cases:** Reconciled from `1,118` to **`2,126`** (`researchData.ts`, `NativeTimeline2026.tsx`).
3. **Primary Cohort Baseline Share:** Reconciled from `93.9%` to **`73.5%`** (representing exactly 539 primary records out of 733 baseline records) (`researchData.ts`, `LivingDataField.tsx`, `NativeTaxonomyConvergence.tsx`, `PipelineFlow.tsx`, `ResearchQuestionHero.tsx`, `ScrollStory.tsx`).
4. **Chikungunya CR3:** Reconciled from `41.9%` to **`39.5%`** (`researchData.ts`, `RadialSeasonalClock.tsx`).
5. **Chikungunya Kendall's W:** Reconciled from `0.220 (p=0.450)` to **`0.150 (p=0.832)`** (`seasonality/page.tsx`, `fieldwork/page.tsx`).
6. **Dengue Peak Window:** Reconciled from `Jul, Aug, Sep (48.2%)` to **`Jun, Sep, Oct (50.5%)`** with a **`73.0%`** Jun–Oct concentration.
7. **Malaria Peak Concentration:** Reconciled from `62.0%` to **`51.4%`** May–Jul CR3, with **`61.4%`** geographic concentration in Gadchiroli and Chandrapur.

---

## 7. Forensic Verification of Repository Raw Data vs. Legacy Data

| Data Source Entity | Repository Location | Rows / Volume | Temporal Coverage | Role in Project | Verification Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **NCDC Weekly Bulletins (PDF)** | `NCDC weekly outbreaks/` (2022–2026) | 237 PDFs | 2022 W01 – 2026 W32 | **Primary Source of Truth** | **VERIFIED PRIMARY** |
| **Extracted Raw JSONs** | `data_pipeline/raw_extracted/` | 237 JSONs | 2022 W01 – 2026 W32 | Ingestion intermediate | **VERIFIED INTERMEDIATE** |
| **Master Raw Table** | `data_pipeline/master/NCDC_Maharashtra_MASTER_RAW.csv` | 809 rows | 2022 W01 – 2026 W32 | Unified raw tabular dump | **VERIFIED EXTRACTION** |
| **Clean Analytical Table** | `data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv` | 809 rows | 2022 W01 – 2026 W32 | Core research dataset | **VERIFIED ANALYTICAL** |
| **Phase 5 Statistical Outputs** | `data_pipeline/phase5A-5E/` | 28 CSV/MD files | Baseline + 2026 | Math & model derivations | **VERIFIED DERIVATION** |
| **EpiClim Secondary Data** | `raw dataset/Final_data.csv` | 8,985 rows | 2009 – 2022 | **Archival / Discarded** | **VERIFIED ARCHIVAL ONLY** |

---

## 8. Conclusion

The claim that **"the website, the repo, the raw data, and the finalized report are all one and connected to each other"** is **TRUE**.

The entire ecosystem functions as a single, unbroken chain of custody:
1. **Primary Raw Data:** 237 weekly NCDC surveillance PDFs.
2. **Repository Pipeline:** Ingestion, validation, cleaning, and mathematical calculation scripts that transform raw bulletins into 809 audited records.
3. **Finalized Report:** The official 54-page academic report containing every table, chart, statistical index, and thesis narrative.
4. **Website:** The interactive, fully synchronized digital research platform presenting the identical figures, datasets, and conclusions.
