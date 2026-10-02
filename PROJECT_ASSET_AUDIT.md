# FORENSIC PROJECT ASSET AUDIT REPORT

**Project:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Degree / Academic Level:** B.Sc. Data Science, Semester III | University of Mumbai  
**Study Geography:** Maharashtra  
**Primary Analytical Window:** 2022–2026  
**Repository:** `RizzyCoder19/Field-Project`  
**Audit Date:** 2026-09-29  
**Audit Scope:** 100% of all local disk assets and Git tracked objects across the workspace.

---

## 1. EXECUTIVE SUMMARY

A complete, forensic inventory of all 321 files residing within the `Field Project` workspace was conducted. Every individual file was categorized by academic provenance, epistemological role, unique informational value, and deletion risk.

### Inventory Overview

| Category | File Count | Total Size (Bytes) | Size (MB) | Research Role Summary |
| :--- | :---: | :---: | :---: | :--- |
| **A. CORE_PRIMARY_DATA** | 213 | 186,541,003 | 177.90 MB | Official NCDC weekly outbreak PDFs (2022–2026) |
| **B. CORE_PROVENANCE** | 4 | 2,024,712 | 1.93 MB | Acquisition manifest, SHA-256 audit, Dataful audit, portal screenshot |
| **C. CORE_PROJECT_DOCUMENT** | 7 | 2,502,674 | 2.39 MB | University submission draft, professor guidelines, tool configs |
| **D. SECONDARY_REFERENCE** | 14 | 11,473,102 | 10.94 MB | Peer-reviewed papers, official tables, health manuals, public bulletins |
| **E. HISTORICAL_DATA** | 2 | 1,230,820 | 1.17 MB | Historical 2009–2022 dataset (`Final_data.csv`), 2012 sample PDF |
| **F. DERIVED_ANALYSIS** | 10 | 5,410,952 | 5.16 MB | Pre-existing charts, correlation matrix, exploratory graphics |
| **G. DUPLICATE_OR_REDUNDANT** | 0 | 0 | 0.00 MB | Exact duplicates already identified and merged into primary/cache lists |
| **H. WEB_CACHE_OR_BROWSER_ARTIFACT** | 67 | 11,938,796 | 11.39 MB | Saved Google search page (3.4 MB), 63 script/icon assets (8.08 MB), 3 search PDFs |
| **I. IRRELEVANT** | 4 | 2,373,703 | 2.26 MB | Commercial marketing stock graphics / Canva blog banners |
| **J. UNKNOWN_NEEDS_REVIEW** | 0 | 0 | 0.00 MB | All 321 files successfully cataloged and audited |
| **TOTAL WORKSPACE (excl. `.git`)** | **321** | **221,495,762** | **211.23 MB** | Comprehensive repository inventory |

### Proposed Cleanup Classification Summary

- **KEEP (Protected Core):** 229 files (193.05 MB / 87.16% of storage) — Core raw surveillance data, provenance, university instructions, and peer-reviewed literature.
- **KEEP FOR NOW (Pending Verification):** 13 files (12.82 MB / 5.79% of storage) — Baseline historical dataset, exploratory plots, municipal bulletin, and national statistics manual.
- **SAFE TO DELETE (Proposed Cleanup):** 79 files (17.62 MB / 7.96% of storage) — Saved browser HTML dumps, cached JavaScript bundles, AI search overview printouts, commercial blog flyers, and obsolete 2012/2019 PDFs.

> [!IMPORTANT]
> **Zero Deletion Enforcement:** In strict compliance with research protocol, **no files have been deleted, moved, or modified**. This report serves solely as an objective audit and proposed roadmap awaiting explicit user authorization.

---

## 2. CORE PRIMARY DATA (213 Files | 186.54 MB)

These are official, authoritative Government of India weekly outbreak surveillance reports published by the National Centre for Disease Control (NCDC) and Integrated Disease Surveillance Programme (IDSP) under the Ministry of Health and Family Welfare (MOHFW). They form the empirical bedrock for the 2022–2026 Maharashtra seasonal disease analysis.

| Folder | File Count | Covered Weeks | Status & Integrity | Action |
| :--- | :---: | :--- | :--- | :--- |
| `NCDC weekly outbreaks/2022/` | 28 | Weeks 25–52 (`week25.pdf` to `week52.pdf`) | 100% Valid PDF magic headers, non-empty, valid EOF | **KEEP** |
| `NCDC weekly outbreaks/2023/` | 49 | Weeks 1–14, 16–50 (W15, W51, W52 unpublished by NCDC) | 100% Valid PDF magic headers, non-empty, valid EOF | **KEEP** |
| `NCDC weekly outbreaks/2024/` | 52 | Weeks 1–52 (`week1_...pdf` to `week52_...pdf`) | 100% Valid PDF magic headers, non-empty, valid EOF | **KEEP** |
| `NCDC weekly outbreaks/2025/` | 52 | Weeks 1–52 (`week1_...pdf` to `week52_...pdf`) | 100% Valid PDF magic headers, non-empty, valid EOF | **KEEP** |
| `NCDC weekly outbreaks/2026/` | 32 | Weeks 1–32 (W1–W31 preserved; W32 acquired) | 100% Valid PDF magic headers, non-empty, valid EOF | **KEEP** |

---

## 3. CORE PROVENANCE (4 Files | 2.02 MB)

Files that establish the legal, procedural, and scientific audit trail of the research. They prove source authenticity and document critical methodology decisions.

1. **`NCDC weekly outbreaks/NCDC_acquisition_manifest.csv` (182 rows | 32.7 KB):**
   - *Provenance Role:* Records official government source URLs, HTTP response codes (`200 OK`), byte lengths, and SHA-256 cryptographic hashes for all acquired reports. Essential for academic reproducible research.
   - *Action:* **KEEP (Critical)**.

2. **`Data_Source_Audit_Report.md` (38.5 KB):**
   - *Provenance Role:* Documents the comprehensive audit of the national data ecosystem (NCDC, IDSP, NCVBDC, DHS Maharashtra), establishes data gaps, and details the investigative evaluation of Dataful Dataset 18514.
   - *Action:* **KEEP (Critical)**.

3. **`NCDC weekly outbreaks/Master Data State, District and Disease-wise Cases and Death reported due to Outbreak of Diseases as per Weekly reports under IDSP.txt` (2.87 KB):**
   - *Provenance Role:* Captures the exact metadata preview and schema structure of Dataful Dataset 18514 (35,538 rows). Serves as concrete research evidence documenting why the subscription-gated portal could not be used and justifying direct primary extraction from official government PDFs.
   - *Action:* **KEEP (Critical)**.

4. **`NCDC weekly outbreaks/NCDC Report.jpeg` (1.94 MB):**
   - *Provenance Role:* Photographic/screenshot evidence captured from the official NCDC web portal, validating national annual outbreak aggregates (554 in 2020 to 3,020 in 2024).
   - *Action:* **KEEP**.

---

## 4. CORE PROJECT DOCUMENTS (7 Files | 2.50 MB)

Mandatory academic deliverables and supervisory compliance assets.

1. **`Field_Project_Report_Draft_Seasonal_Disease_Patterns.docx` (44.8 KB):**
   - *Role:* Active working draft of the B.Sc. Data Science Field Project Report for University of Mumbai submission.
   - *Action:* **KEEP (Primary Deliverable)**.

2. **`Professor's Instructions/1000005242 (2).jpg` to `1000005246 (2).jpg` (5 files | 2.46 MB):**
   - *Role:* Photographic captures of official guidelines and rubric provided by the project supervisor at RP Institute (University of Mumbai), specifying mandatory chapter outlines, font formatting, citation standards, and evaluation criteria.
   - *Action:* **KEEP (Mandatory Guidelines)**.

3. **`.kilo/.gitignore` (107 bytes):**
   - *Role:* Development environment configuration managing IDE worktrees.
   - *Action:* **KEEP**.

---

## 5. SECONDARY REFERENCES (14 Files | 11.47 MB)

External scientific literature, official statistical guidelines, municipal health bulletins, and public domain materials.

### High-Value Academic & Government References (Must Retain)

1. **`NCDC weekly outbreaks/IJCPR,Vol18,Issue2,Article253.pdf` (425.1 KB | 6 pages):**
   - *Title:* "Epidemiological Study of Dengue Cases in Gondia District, Maharashtra"
   - *Authors / Journal:* Sakure et al., *International Journal of Current Pharmaceutical Review and Research* (2026).
   - *Contribution:* Direct empirical peer-reviewed evidence of monsoon-driven dengue spikes in eastern Maharashtra. Essential for Chapter 2 (Literature Review) and Chapter 5 (Discussion).
   - *Action:* **KEEP**.

2. **`NCDC weekly outbreaks/report.pdf` (641.3 KB | 8 pages):**
   - *Title:* "Burden of Infectious Diseases and their Seasonal Variation in India"
   - *Authors / Journal:* *International Journal of Health Sciences and Research* (IJHSR, 2016).
   - *Contribution:* Direct methodological precedent analyzing IDSP weekly outbreak surveillance data to determine national seasonal indices. Grounding citation for our analytical approach.
   - *Action:* **KEEP**.

3. **`NCDC weekly outbreaks/medip,+IJCMPH-10079+O (1).pdf` (497.6 KB | 9 pages):**
   - *Title:* "Trends and seasonality of vector borne diseases in Kerala"
   - *Authors / Journal:* Raj J et al., *Int. J. Community Med. Public Health* (2022).
   - *Contribution:* Methodological reference on time-series decomposition, moving averages, and seasonal indices for vector-borne diseases.
   - *Action:* **KEEP**.

4. **`NCDC weekly outbreaks/d223cdfb-f708-4eb2-89fd-e7cd91a10fea.pdf` (79.6 KB | 1 page):**
   - *Title:* "Seasonal Influenza A (H1N1): State/UT-wise number of cases & deaths from 2019 to 2025* (As on 30.09.2025)"
   - *Issuing Body:* NCDC, MOHFW, Government of India.
   - *Contribution:* Official state-wise annual benchmark for validating reconstructed Maharashtra respiratory illness totals.
   - *Action:* **KEEP**.

5. **`NCDC weekly outbreaks/BMC.pdf` (1.98 MB | 4 pages):**
   - *Title:* "Mumbai records nearly 6,000 malaria cases during monsoon; BMC intensifies disease control drive across city" (Mid-Day / BMC Health Department, Sept 2026).
   - *Contribution:* Municipal-level empirical corroboration of urban monsoon disease surges (Malaria, H1N1, Dengue, Leptospirosis) in the state capital.
   - *Action:* **KEEP FOR NOW**.

6. **`NCDC weekly outbreaks/Manual-Health-Statistics_5june15.pdf` (4.40 MB | 278 pages):**
   - *Title:* "Manual on Health Statistics in India"
   - *Issuing Body:* Central Statistical Office, MOSPI, Government of India (2015).
   - *Contribution:* Authoritative definitions of epidemiological indicators, surveillance formulas, and case fatality rate (CFR) standards.
   - *Action:* **KEEP FOR NOW**.

### Low-Value / Obsolete Secondary Materials (Proposed for Deletion)

7. **`NCDC weekly outbreaks/July 2026_Inf vaccine recommendation (1).pdf` (550.9 KB):** WHO/NCDC advisory on trivalent influenza vaccine composition. Clinical advisory with no outbreak metrics. *Action:* **SAFE TO DELETE**.
8. **`NCDC weekly outbreaks/96420115851539337754.pdf` (773.6 KB):** 1-page public health educational flyer on seasonal flu. Contains no data. *Action:* **SAFE TO DELETE**.
9. **`NCDC weekly outbreaks/90384949221554289446.pdf` (462.2 KB):** Obsolete 2019 administrative directory of authorized diagnostic labs. *Action:* **SAFE TO DELETE**.
10. **`NCDC weekly outbreaks/State-wise_four time point cumulative figure_April -June 2020.pdf` (457.0 KB):** Early COVID lockdown snapshot from 2020. Out of scope. *Action:* **SAFE TO DELETE**.
11. **`NCDC weekly outbreaks/Top Seasonal Diseases in India_ Prevention & Safety Tips.pdf` (848.9 KB):** Commercial health blog printout (`medfact.in`). Non-academic. *Action:* **SAFE TO DELETE**.
12. **`NCDC weekly outbreaks/vector-borne report.txt` (11.6 KB):** Commercial blog text from Redcliffe Labs citing secondary figures. *Action:* **SAFE TO DELETE**.
13. **`NCDC weekly outbreaks/water-borne.txt` (10.9 KB):** Marketing article from MrMed online pharmacy. *Action:* **SAFE TO DELETE**.
14. *(Note: 2012 PDF handled under Historical Data below).*

---

## 6. HISTORICAL DATASETS (2 Files | 1.23 MB)

Datasets predating the primary 2022–2026 analytical window.

1. **`raw dataset/Final_data.csv` (1.04 MB | 8,985 rows):**
   - *Coverage:* 2009 to June 2022 (Week 24). Includes 1,195 Maharashtra records with environmental covariates (`preci`, `Temp`, `LAI`, `Latitude`, `Longitude`).
   - *Status:* Intact, read-only baseline historical dataset. Provides essential context for pre-2022 trends and baseline climatological modeling.
   - *Action:* **KEEP FOR NOW (Strictly Protected)**.

2. **`NCDC weekly outbreaks/week46_2012.pdf` (195.6 KB):**
   - *Coverage:* Week 46 of 2012.
   - *Evaluation:* An isolated single week from 14 years ago; completely disconnected from the 2022–2026 study period.
   - *Action:* **SAFE TO DELETE**.

---

## 7. DERIVED CHARTS & ANALYSIS (10 Files | 5.41 MB)

Visualizations generated from previous exploratory runs on older datasets.

### `raw dataset/` Visualizations (Generated from `Final_data.csv`)

- `3d_cases_temp_precip.png` (793.9 KB) — 3D scatter plot of cases vs temperature and precipitation.
- `cases_timeseries.png` (192.0 KB) — Time-series plot of historical outbreak cases.
- `correlation.jpeg` (110.7 KB) — Heatmap matrix of environmental vs disease variables.
- `dataset_pie.png` (143.0 KB) — Proportional breakdown of historical diseases.
- `deaths_timeseries.png` (192.5 KB) — Historical mortality trends.
- `temperature_precipitation_side_by_side_maps.png` (3.49 MB) — Geospatial climatological maps.
- `top_10_states_by_deaths.png` (231.7 KB) — Bar chart ranking historical state mortality.
- `total_diseases_over_time.png` (206.7 KB) — Aggregated multi-disease longitudinal trajectory.

*Evaluation:* These graphics represent preliminary work on the 2009–2022 data. They do not reflect the new 2022–2026 dataset, but they demonstrate visual styles previously approved.  
*Action:* **KEEP FOR NOW** (Retain in `raw dataset/` until replaced by the updated 2022–2026 visual pipeline).

### Standalone Derived Charts in `NCDC weekly outbreaks/`

- `monsoon disease comparision.png` (20.0 KB) — Summary comparison chart of Mumbai monsoon cases.
- `vector-borner cases in maharashtra.png` (33.5 KB) — Trajectory graph of Maharashtra vector-borne cases.

*Action:* **KEEP FOR NOW** (Retain as discussion references).

---

## 8. DUPLICATES & REDUNDANT FILES (0 Files)

No byte-for-byte binary duplicates exist. Redundancies between web printouts and raw HTML are categorized under Section 9 below.

---

## 9. BROWSER & CACHE ARTIFACTS (67 Files | 11.94 MB)

Ephemeral web search dumps and browser dependencies created during exploratory search queries.

1. **`NCDC weekly outbreaks/Monthly Trajectory of Major Disease Classes in India.html` (3.41 MB):**
   - Saved web page of a Google Search query: `monthly report of the recent years about seasonal disease patterns in india or maharashtra`.
   - *Action:* **SAFE TO DELETE**.

2. **`NCDC weekly outbreaks/Monthly Trajectory of Major Disease Classes in India_files/` (63 files | 8.08 MB):**
   - Supporting folder containing Google Search frontend assets: 5 HTML iframe shims, 1 JPEG thumbnail, and 57 extensionless Google Closure JavaScript module chunks (`m=AIvLTe`, `m=B6N5Ae`, `rs=AA2Yr...`).
   - *Action:* **SAFE TO DELETE**.

3. **Google Search AI Overview Printouts (3 files | 454.0 KB):**
   - `NCDC weekly outbreaks/2022-2026.pdf` (144.9 KB) — Exported Google Search AI overview summary.
   - `NCDC weekly outbreaks/monthly report of the recent years about seasonal disease patterns in india or maharashtra - Google Search.pdf` (175.4 KB) — Exported Google Search results page.
   - `NCDC weekly outbreaks/summary.pdf` (133.6 KB) — Exported search engine epidemiology bullet points.
   - *Evaluation:* These are second-hand search engine AI summaries. All authoritative data exists directly in our primary government PDFs.
   - *Action:* **SAFE TO DELETE**.

---

## 10. IRRELEVANT FILES (4 Files | 2.37 MB)

Non-academic stock graphics and commercial advertising banners.

- `NCDC weekly outbreaks/1774348518512-Blog Banner - 680 by 350 - 2026-03-24T143710.119.png` (617.4 KB)
- `NCDC weekly outbreaks/1774348592863-Blog Banner - 680 by 350 - 2026-03-24T143718.737.png` (630.1 KB)
- `NCDC weekly outbreaks/1774348624758-Untitled design.png` (1.07 MB)
- `NCDC weekly outbreaks/20251208_2143_SeasonalDiseasePreventionIndia_simple_compose_01kbzbqr7df72sxwnfr2cdnyg-683x1024.jpeg.webp` (55.3 KB)

*Evaluation:* Downloaded from commercial health blogs (MrMed) and Canva. They contain commercial marketing clip-art and stock images with zero scientific data or educational value.  
*Action:* **SAFE TO DELETE**.

---

## 11. UNKNOWN FILES REQUIRING MANUAL REVIEW

**Count: 0 files.**  
Every asset in the repository has been definitively inspected, verified, and assigned to an explicit research category.

---

## 12. SUMMARY OF FILES RECOMMENDED FOR DELETION (79 Files | 17.62 MB)

These files contain no unique empirical data, no peer-reviewed methodology, and no supervisor instructions. Removing them will clean the repository of clutter and reduce storage overhead.

| File / Folder Pattern | Count | Size (Bytes) | Justification |
| :--- | :---: | :---: | :--- |
| `NCDC weekly outbreaks/Monthly Trajectory of Major Disease Classes in India.html` | 1 | 3,407,292 | Saved Google search engine page |
| `NCDC weekly outbreaks/Monthly Trajectory..._files/*` | 63 | 8,077,632 | Google search JavaScript chunks & cache assets |
| `2022-2026.pdf`, `monthly report...Google Search.pdf`, `summary.pdf` | 3 | 453,872 | Exported Google search AI overview printouts |
| `1774348...png`, `Untitled design.png`, `...compose...webp` | 4 | 2,373,703 | Commercial marketing stock graphics & banners |
| `vector-borne report.txt`, `water-borne.txt` | 2 | 22,472 | Third-party commercial pharmacy/lab blog posts |
| `Top Seasonal Diseases in India...pdf` | 1 | 848,904 | Commercial blog article printout |
| `week46_2012.pdf` | 1 | 195,642 | Isolated historical report outside study window |
| `July 2026_Inf vaccine recommendation (1).pdf` | 1 | 550,907 | Clinical vaccine strain formulation bulletin |
| `96420115851539337754.pdf` | 1 | 773,592 | 1-page public flu awareness poster |
| `90384949221554289446.pdf` | 1 | 462,226 | Obsolete 2019 lab directory list |
| `State-wise_four time point cumulative figure_April -June 2020.pdf` | 1 | 456,970 | Early 2020 pandemic lockdown snapshot |
| **TOTAL RECOMMENDED FOR DELETION** | **79** | **17,623,212** | **~16.81 MB recoverable** |

---

## 13. FILES THAT MUST NOT BE DELETED (242 Files | 205.87 MB)

These files represent the irreducible research foundation of the field project.

1. **All 213 Official Weekly NCDC Outbreak Reports (186.54 MB):**
   - `2022/` (28 files, Weeks 25–52)
   - `2023/` (49 files, Weeks 1–14, 16–50)
   - `2024/` (52 files, Weeks 1–52)
   - `2025/` (52 files, Weeks 1–52)
   - `2026/` (32 files, Weeks 1–32)
2. **Provenance & Audit Artifacts (2.02 MB):**
   - `NCDC_acquisition_manifest.csv`
   - `Data_Source_Audit_Report.md`
   - `Master Data State, District and Disease-wise...IDSP.txt`
   - `NCDC Report.jpeg`
3. **Core Project Submissions & Instructions (2.50 MB):**
   - `Field_Project_Report_Draft_Seasonal_Disease_Patterns.docx`
   - `Professor's Instructions/` (5 image files)
   - `.kilo/.gitignore`
4. **Peer-Reviewed Literature & Official Benchmarks (2.98 MB):**
   - `IJCPR,Vol18,Issue2,Article253.pdf` (Dengue in Gondia, Maharashtra)
   - `report.pdf` (IJHSR Seasonal Variation in India using IDSP)
   - `medip,+IJCMPH-10079+O (1).pdf` (Kerala Vector-Borne Seasonality)
   - `d223cdfb-f708-4eb2-89fd-e7cd91a10fea.pdf` (NCDC State-wise H1N1 Benchmark Table)
   - `IDSP report.pdf` (Official NCDC Surveillance Architecture)
5. **Protected Historical Data & Baseline Assets (11.83 MB):**
   - `raw dataset/Final_data.csv` (8,985 records, 2009–2022)
   - `raw dataset/*.png` & `correlation.jpeg` (8 exploratory charts)
   - `BMC.pdf` & `Manual-Health-Statistics_5june15.pdf`

---

## 14. ESTIMATED STORAGE RECOVERABLE

- **Current Repository Size (excl. `.git`):** ~211.23 MB (321 files)
- **Proposed Removals:** 79 files
- **Storage Reclaimed:** **17,623,486 bytes (~16.81 MB / 7.96% of workspace size)**
- **Post-Cleanup Size:** **193.87 MB (242 clean, verified academic assets)**

---

## 15. RECOMMENDED CLEAN PROJECT STRUCTURE

Upon approval of the proposed cleanup, the workspace should be organized cleanly into dedicated, logical directories:

```text
Field Project/
├── Data_Source_Audit_Report.md               # Data ecosystem and source audit
├── PROJECT_ASSET_AUDIT.md                   # This forensic asset audit report
├── PROJECT_ASSET_AUDIT.csv                  # Complete 321-file forensic catalog
├── Field_Project_Report_Draft_...docx       # Master academic report draft
│
├── Professor's Instructions/                 # Supervisory compliance guidelines
│   ├── 1000005242 (2).jpg
│   └── ... (5 guideline captures)
│
├── raw dataset/                              # Baseline historical data & legacy charts
│   ├── Final_data.csv                        # 2009–2022 historical baseline (8,985 rows)
│   └── (exploratory 2009-2022 PNG plots)
│
├── NCDC weekly outbreaks/                    # Primary government surveillance archive
│   ├── NCDC_acquisition_manifest.csv        # Provenance manifest & SHA-256 hashes
│   ├── NCDC Report.jpeg                     # Official web portal screenshot
│   ├── Master Data State...IDSP.txt         # Dataful schema evaluation proof
│   ├── 2022/ (28 PDFs: Weeks 25–52)
│   ├── 2023/ (49 PDFs: Weeks 1–14, 16–50)
│   ├── 2024/ (52 PDFs: Weeks 1–52)
│   ├── 2025/ (52 PDFs: Weeks 1–52)
│   └── 2026/ (32 PDFs: Weeks 1–32)
│
└── references/                              # Curated scientific literature & benchmarks
    ├── IJCPR_Dengue_Gondia_MH_2026.pdf      # Sakure et al. (Maharashtra Dengue)
    ├── IJHSR_Seasonal_Variation_India.pdf    # IJHSR IDSP methodology paper
    ├── IJCMPH_Vector_Borne_Kerala_2022.pdf  # Raj et al. Seasonality methodology
    ├── NCDC_H1N1_State_Benchmark_2025.pdf   # Official state H1N1 table
    ├── IDSP_Surveillance_Overview.pdf       # Official NCDC programme structure
    ├── BMC_Monsoon_Health_Data_2026.pdf     # Mumbai municipal health bulletin
    └── MOSPI_Health_Statistics_Manual.pdf   # Central Statistical Office definitions
```

---

## 16. PROPOSED THREE-LEVEL CLEANUP PLAN

### LEVEL 1: KEEP (229 Files | 193.05 MB)
*Strictly preserved. Core primary data, provenance records, supervisor instructions, and peer-reviewed literature.*
- All 213 official NCDC weekly outbreak PDFs (2022–2026).
- `NCDC_acquisition_manifest.csv` & `Data_Source_Audit_Report.md`.
- `Field_Project_Report_Draft_Seasonal_Disease_Patterns.docx`.
- 5 guideline images in `Professor's Instructions/`.
- `Master Data State...IDSP.txt` & `NCDC Report.jpeg`.
- 5 primary academic & government reference PDFs (`IJCPR...`, `report.pdf`, `medip...`, `d223cdfb...`, `IDSP report.pdf`).
- `.kilo/.gitignore`.

### LEVEL 2: KEEP FOR NOW (13 Files | 12.82 MB)
*Preserved during active analysis. Secondary references and baseline artifacts to be re-evaluated after primary extraction.*
- `raw dataset/Final_data.csv` (8,985 rows, historical baseline).
- 8 exploratory plots and correlation matrix in `raw dataset/`.
- 2 state/city comparison charts in `NCDC weekly outbreaks/`.
- `BMC.pdf` (Mumbai municipal monsoon health report).
- `Manual-Health-Statistics_5june15.pdf` (MOSPI statistical reference).

### LEVEL 3: SAFE TO DELETE (79 Files | 17.62 MB)
*Eligible for deletion pending explicit user approval. Contains no unique data or academic value.*
- `Monthly Trajectory of Major Disease Classes in India.html` (Saved Google search page).
- All 63 cached script, iframe, and image files in `Monthly Trajectory..._files/`.
- 3 Google Search AI overview printouts (`2022-2026.pdf`, `monthly report...Google Search.pdf`, `summary.pdf`).
- 4 commercial blog banners and Canva marketing clip-art images.
- 2 third-party commercial pharmacy/lab blog text files (`vector-borne report.txt`, `water-borne.txt`).
- 1 commercial blog article printout (`Top Seasonal Diseases in India...pdf`).
- 4 obsolete/irrelevant administrative PDFs (`week46_2012.pdf`, `July 2026...vaccine...pdf`, `96420...poster.pdf`, `90384...labs.pdf`, `State-wise...2020.pdf`).

---

**CRITICAL PROTOCOL CONFIRMATION:**  
**NOTHING HAS BEEN DELETED.** All 321 files remain completely untouched on disk and in Git. Deletion of Level 3 assets will only occur if and when explicitly commanded by the user.
