# Analysis of Seasonal Disease Patterns Using Government Health Data

**Academic Framework:** Field Project, B.Sc. Data Science (Semester III)  
**Affiliation:** RP Institute, Affiliated to University of Mumbai  
**Academic Year:** 2026–27  
**Candidate:** Khan Umar  
**Geography:** Maharashtra, India  
**Primary Surveillance Source:** National Centre for Disease Control (NCDC) / Integrated Disease Surveillance Programme (IDSP)  
**Repository:** `https://github.com/RizzyCoder19/Field-Project`  
**Active Branch:** `master`

---

## 1. Project Overview

This repository contains the complete, auditable research data pipeline and academic findings for the study **“Analysis of Seasonal Disease Patterns Using Government Health Data”**. 

The research evaluates weekly outbreak surveillance reports published by the National Centre for Disease Control (NCDC) under the Integrated Disease Surveillance Programme (IDSP) for the state of Maharashtra. The completed baseline period covers four full calendar years (**2022–2025**, $N = 539$ validated records across 5 primary disease families), with an out-of-sample comparison against partial-year **2026** (Epidemiological Weeks 01–32, $N = 45$ records).

---

## 2. Five Primary Disease Families Analyzed

1. **Dengue** ($N = 204$ baseline records; 3,144 reported cases; 93 reported deaths)
2. **Acute Diarrheal Disease (ADD)** ($N = 153$ baseline records; 9,050 reported cases; 93 reported deaths)
3. **Malaria** ($N = 70$ baseline records; 2,133 reported cases; 51 reported deaths)
4. **Food Poisoning** ($N = 69$ baseline records; 5,927 reported cases; 29 reported deaths)
5. **Chikungunya** ($N = 43$ baseline records; 701 reported cases; 0 reported deaths)

---

## 3. Repository Architecture

```
Field-Project/
├── .gitignore                                      # Comprehensive runtime & development ignore rules
├── README.md                                       # Repository entry point & academic overview
├── Data_Source_Audit_Report.md                     # Authoritative data source audit & provenance record
├── Professor's Instructions/                       # Authoritative academic instructions from project guide
├── NCDC weekly outbreaks/                          # Primary source NCDC weekly outbreak PDFs (2022–2026)
├── raw dataset/                                    # [Archival] Historical exploratory data (EpiClim 2009–2022)
└── data_pipeline/                                  # Complete research pipeline & analytical deliverables
    ├── acquisition/                                # 2022 gap acquisition & forensic verification logs
    ├── analysis/                                   # Clean analytical dataset & data quality reports
    ├── master/                                     # Master raw rebuild & extraction validation
    ├── phase5A_disease_audit/                      # Disease selection audit & 49-label family mapping
    ├── phase5B_seasonal_analysis/                  # Monthly indices, weekly curves, annual registers
    ├── phase5C_advanced_analysis/                  # Concentration metrics, peak windows, stability, tests
    ├── phase5D_interpretation_validation/          # Synthesis, evidence tiers, limitations, viva defense
    ├── REPOSITORY_CLEANUP_REPORT.md                # Local cleanup audit report (Keep/Remove/Review)
    └── REPOSITORY_MANIFEST.md                      # High-level architecture and asset map
```

---

## 4. Analytical Pipeline Phases

- **Phases 1–4 (Rebuild & Validation):** Established an 809-row master analytical dataset (`NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`) with 100% provenance tracing to official government PDF archives.
- **Phase 5A (Disease Selection Audit):** Audited 49 raw disease strings across 809 records; established a standardized mapping into 30 families; selected the 5 primary families.
- **Phase 5B (Seasonal Analysis):** Generated 48-month distribution registers, seasonal indices, and weekly incidence curves.
- **Phase 5C (Advanced Pattern & Statistical Analysis):** Modeled concentration metrics (CV, Gini, Shannon Entropy), peak windows, Kendall’s $W$ concordance, outlier sensitivity, and 15 formal statistical tests.
- **Phase 5D (Interpretation & Validation):** Synthesized findings into transparent evidence strength tiers (A/B/C/D), defined structural surveillance limitations, established 9 unsupported claims, and created 16 viva voce defense briefs.
- **Phase 5E (Presentation Synthesis):** Dedicated academic presentation and slide synthesis layer (to be generated).

---

## 5. Epistemological Notice

This study analyzes **government-notified outbreak surveillance records** (investigated disease clusters meeting epidemic threshold criteria). It does **not** measure population incidence, prevalence, or individual infection risk. All seasonal interpretations are strictly bounded at the level of calendar-month notification timing without asserting unmeasured climate or biological causation.
