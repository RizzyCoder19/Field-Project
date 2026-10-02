# REPOSITORY MANIFEST & ARCHITECTURE MAP

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Degree Programme:** B.Sc. Data Science, Semester III | RP Institute, University of Mumbai  
**Candidate:** Khan Umar  
**Repository:** `https://github.com/RizzyCoder19/Field-Project`  
**Branch:** `master`  
**Status:** Frozen Analytical Pipeline & Asset Map

---

## 1. High-Level Architecture Map

This manifest outlines the organization of the research repository. It provides an authoritative directory map connecting primary sources, professor requirements, master datasets, and phased analytical deliverables.

```
========================================================================================
                                REPOSITORY TOPOLOGY
========================================================================================
[1. AUTHORITATIVE CONSTRAINTS]  ──> Professor's Instructions/ (Official project rules)
[2. PRIMARY DATA PROVENANCE]   ──> NCDC weekly outbreaks/ (Official PDFs 2022–2026)
                                 ──> Data_Source_Audit_Report.md (Provenance decisions)
[3. MASTER & REBUILD PIPELINE] ──> data_pipeline/master/ (Raw 809-row extraction)
                                 ──> data_pipeline/acquisition/ (2022 gap recovery)
                                 ──> data_pipeline/validation/ (Row-level validation)
[4. CLEAN ANALYTICAL CORE]     ──> data_pipeline/analysis/ (Clean 809-row dataset)
[5. PHASED RESEARCH OUTPUTS]   ──> data_pipeline/phase5A_disease_audit/ (5 families selected)
                                 ──> data_pipeline/phase5B_seasonal_analysis/ (Indices & curves)
                                 ──> data_pipeline/phase5C_advanced_analysis/ (Stats & models)
                                 ──> data_pipeline/phase5D_interpretation_validation/ (Synthesis)
[6. PRESENTATION SYNTHESIS]    ──> data_pipeline/phase5E_presentation_synthesis/ (Future)
[7. ARCHIVAL / HISTORICAL]     --> raw dataset/ (EpiClim 2009-2022 -- ARCHIVAL ONLY, not used in analysis)
========================================================================================
```

---

## 2. Directory & Component Breakdown

### 2.1. Authoritative Constraints & Instructions
- **`Professor's Instructions/`**
  - Contains five photographic scans (`1000005242 (2).jpg` to `1000005246 (2).jpg`) of the project guide's official guidelines, assessment rubric, chapter structures, and field project requirements.

### 2.2. Source Data & Provenance
- **`NCDC weekly outbreaks/`**
  - The primary source archive of official weekly outbreak surveillance reports published by the National Centre for Disease Control (NCDC) under the Integrated Disease Surveillance Programme (IDSP).
  - Organized by calendar year: `2022/`, `2023/`, `2024/`, `2025/`, and `2026/` (Weeks 01–32).
- **`Data_Source_Audit_Report.md`**
  - Root-level foundational report detailing the data ecosystem, explaining why secondary aggregations (EpiClim) were discarded, and establishing the primary NCDC pipeline.

### 2.3. Data Pipeline: Master Rebuild & Extraction
- **`data_pipeline/acquisition/`**
  - Forensic acquisition logs, download manifests, and verification scripts used to recover the 2022 Weeks 01–24 historical gap.
- **`data_pipeline/master/`**
  - `NCDC_Maharashtra_MASTER_RAW.csv`: Reconstructed 809-row raw extraction dataset.
  - `NCDC_Maharashtra_MASTER_schema.md`: Technical schema definition.
  - `EXTRACTION_VALIDATION_REPORT.md` & `PHASE4B_MASTER_DATASET_REBUILD_REPORT.md`: Extraction audit trails.
  - `WEEK_STATUS_REGISTER.csv`: Active surveillance status per epidemiological week.
- **`data_pipeline/validation/`**
  - `FINAL_ROW_LEVEL_VALIDATION.csv` & `FINAL_ROW_LEVEL_VALIDATION_REPORT.md`: 100% row-by-row verification logs.
- **`data_pipeline/raw_extracted/`**
  - Raw textual dumps extracted from weekly PDFs categorized by year.
- **`data_pipeline/staging/`**
  - Intermediate staging files and gap normalization records.

### 2.4. Clean Analytical Dataset
- **`data_pipeline/analysis/`**
  - `NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`: Authoritative 809-row clean dataset utilized by all Phase 5 analytical layers.
  - `CLEAN_DATASET_DATA_QUALITY_REPORT.md` & `CLEAN_DATASET_VALIDATION.md`: Quality certification records.

### 2.5. Phased Research Outputs (Frozen Evidence)

#### Phase 5A: Disease Selection Audit (`data_pipeline/phase5A_disease_audit/`)
- Audit of 49 raw disease strings across 809 records.
- Standardized mapping into 30 families (`02_DISEASE_FAMILY_MAPPING.csv`).
- Formal selection of the five primary disease families: Dengue, Acute Diarrheal Disease, Malaria, Food Poisoning, Chikungunya.
- 2026 partial-year reporting bias check (`06_2026_BIAS_CHECK.csv`).

#### Phase 5B: Seasonal Analysis (`data_pipeline/phase5B_seasonal_analysis/`)
- Baseline calendar-month distribution registers (`01_MONTHLY_DISTRIBUTION.csv`).
- Standardized seasonal indices per disease family (`02_SEASONAL_INDICES.csv`).
- 52-week distribution curves (`03_WEEKLY_DISTRIBUTION.csv`).
- Multi-year distribution register (`04_YEARLY_DISTRIBUTION.csv`).
- Comprehensive exploratory report (`06_PHASE5B_ANALYSIS_REPORT.md`).

#### Phase 5C: Advanced Pattern & Statistical Analysis (`data_pipeline/phase5C_advanced_analysis/`)
- Quantitative concentration metrics: CV, CR3, Shannon Entropy, Gini (`01_SEASONAL_CONCENTRATION.csv`).
- 3-month peak window modeling (`02_PEAK_WINDOWS.csv`).
- Inter-annual stability & Kendall's $W$ concordance (`03_SEASONAL_STABILITY.csv`).
- Peak timing displacement tracking (`04_PEAK_TIMING_SHIFTS.csv`).
- Event-case divergence modeling (`05_EVENT_CASE_DIVERGENCE.csv`).
- Outlier sensitivity analysis (`06_OUTLIER_SENSITIVITY.csv`).
- 2026 out-of-sample comparison (`07_2026_OUT_OF_SAMPLE_COMPARISON.csv`).
- District-season analysis for qualifying cohorts ($N \ge 10$) (`08_DISTRICT_SEASON_ANALYSIS.csv`).
- Formal hypothesis testing (Kruskal-Wallis, Monte Carlo Permutation, Kendall's $W$) under Bonferroni/FDR control (`09_STATISTICAL_ANALYSIS.csv`).

#### Phase 5D: Interpretation & Validation (`data_pipeline/phase5D_interpretation_validation/`)
- Cross-phase evidence synthesis (`01_DISEASE_EVIDENCE_SYNTHESIS.csv`).
- Transparent evidence strength tiers (A: Strong, B: Moderate, C: Variable, D: Insufficient) (`02_EVIDENCE_STRENGTH_MATRIX.csv`).
- Dissection of Recurring vs. Year-Specific vs. Outlier-Driven patterns (`03_STABILITY_VOLATILITY_SYNTHESIS.csv`).
- Methodological limitations synthesis covering 11 structural boundaries (`06_LIMITATIONS_SYNTHESIS.md`).
- Objective-to-evidence matrix (`07_OBJECTIVE_EVIDENCE_MATRIX.csv`).
- Alignment to original proposal research questions & objectives (`08_RESEARCH_ALIGNMENT.md`).
- Core factual analytical conclusions (`09_FINAL_ANALYTICAL_CONCLUSIONS.md`).
- Epistemological guardrails: 9 claims not supported by surveillance data (`10_UNSUPPORTED_CLAIMS.md`).
- 16 viva voce examiner challenge questions & defensible answers (`11_VIVA_EXAMINER_QUESTIONS.md`).
- Comprehensive Phase 5D master analysis report (`12_PHASE5D_ANALYSIS_REPORT.md`).
- Independent quality and methodological audit (`13_PHASE5D_REVIEW.md`).

### 2.6. Future Work: Phase 5E Presentation Synthesis
- **`data_pipeline/phase5E_presentation_synthesis/`** (To be created upon approval)
  - Dedicated academic presentation copy, slide manifests, visualization asset guides, and presentation deliverables.

### 2.7. Archival & Historical Reference
- **`raw dataset/`** — **ARCHIVAL / HISTORICAL MATERIAL ONLY** (Decision: October 2, 2026)
  - Contains `Final_data.csv` (early 2009–2022 EpiClim secondary dataset) and 8 preliminary visualizations.
  - Represents the project's earlier EpiClim-based exploratory stage.
  - **Must NOT be used for Phase 5E presentation statistics or visuals.**
  - Its 2009–2022 figures must NOT be mixed with the frozen NCDC/IDSP 2022–2026 analysis.
  - Preserved solely for research-history and provenance transparency.
  - `Field_Project_Report_Draft_Seasonal_Disease_Patterns.docx` — **REMOVED from repository on October 2, 2026.** Obsolete EpiClim/2011–2019/three-disease methodology draft. All research questions and objectives are codified in `phase5D_interpretation_validation/08_RESEARCH_ALIGNMENT.md`.
