<div align="center">

# ⚙️ Data Pipeline & Analytical Core
### Automated Ingestion, Forensic Auditing, and Multi-Phase Seasonal Modeling

[![Python](https://img.shields.io/badge/Language-Python%203.12-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Validation](https://img.shields.io/badge/Row--Level%20Audit-100%25%20Verified-00C853?style=for-the-badge&logo=checkmarx&logoColor=white)](validation/)
[![Weeks Audited](https://img.shields.io/badge/Surveillance%20Weeks-237%20Weeks-FF6F00?style=for-the-badge)](master/)
[![Records](https://img.shields.io/badge/Audited%20Records-809%20Outbreaks-6366F1?style=for-the-badge)](analysis/)

[📑 Pipeline Architecture Manifest](REPOSITORY_MANIFEST.md) • [🧹 Clean Analytical Dataset](analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv) • [🛡️ Validation Audit Report](validation/FINAL_ROW_LEVEL_VALIDATION_REPORT.md)

---

</div>

## 🔬 Pipeline Architecture & Lineage

The data pipeline transforms 237 official weekly outbreak PDFs into standardized, mathematically auditable epidemiological indicators through 5 sequential phases:

```
[Phase 1-4: Extraction & Ingestion]
NCDC Weekly PDFs (237) ──► raw_extracted/ ──► MASTER_RAW.csv (809 rows) ──► validation/
                                                                                  │
                                                                                  ▼
                                                            CLEAN_ANALYTICAL.csv (809 rows)
                                                                                  │
  ┌───────────────────────────────────────────────────────────────────────────────┤
  ▼                                                                               ▼
[Phase 5A: Disease Audit]                                       [Phase 5B: Seasonal Indices]
Harmonization of 49 raw strings into 30 families                Monthly distributions, weekly curves,
Selection of 5 Primary Cohorts (539 baseline records)           and STL seasonal decomposition
  │                                                                               │
  ▼                                                                               ▼
[Phase 5C: Advanced Modeling]                                   [Phase 5D: Evidence Synthesis]
CR3 concentration, Kendall's W concordance,                     Evidence tiering (A/B/C/D), limitations,
outlier sensitivity, & out-of-sample 2026 test                  and public health recommendations
```

---

## 📂 Subdirectory Blueprint

| Directory | Core Purpose & Contents | Primary Deliverables |
| :--- | :--- | :--- |
| **[`acquisition/`](acquisition/)** | Recovery and reconstruction of historical gaps (2022 W01–W24). | Download manifests, gap verification logs. |
| **[`raw_extracted/`](raw_extracted/)** | Raw JSON extractions parsed week-by-week from official NCDC PDF tables. | 237 weekly JSON files (2022–2026). |
| **[`master/`](master/)** | Unfiltered master raw extraction table linking each row to source PDF/page. | `NCDC_Maharashtra_MASTER_RAW.csv` (809 rows). |
| **[`validation/`](validation/)** | Forensic row-by-row audit trails and NIL week surveillance registers. | `FINAL_ROW_LEVEL_VALIDATION.csv` (30 stratified checks). |
| **[`analysis/`](analysis/)** | **Authoritative analytical dataset** used by all Phase 5 statistical engines. | `NCDC_Maharashtra_CLEAN_ANALYTICAL.csv` (809 rows). |
| **[`phase5A_disease_audit/`](phase5A_disease_audit/)** | Etiological taxonomy mapping and selection of the 5 primary cohorts. | `02_DISEASE_FAMILY_MAPPING.csv`, `05_SCREENING.csv`. |
| **[`phase5B_seasonal_analysis/`](phase5B_seasonal_analysis/)** | Baseline calendar-month distribution and seasonal indices. | `01_MONTHLY_DISTRIBUTION.csv`, `02_INDICES.csv`. |
| **[`phase5C_advanced_analysis/`](phase5C_advanced_analysis/)** | Concentration metrics, Kendall's $W$ concordance, and outlier impact. | `01_CONCENTRATION.csv`, `03_STABILITY.csv`. |
| **[`phase5D_interpretation_validation/`](phase5D_interpretation_validation/)** | Evidence tiering and integration with Palghar field work observations. | Evidence tier matrix, policy briefs. |
| **[`phase5E_presentation_synthesis/`](phase5E_presentation_synthesis/)** | Chart generation scripts and presentation slide data exports. | High-res PNG charts, presentation JSON feeds. |

---

## 📊 Summary of Derived Mathematical Indicators

### 1. Concentration Ratio (**CR3**)
$$	ext{CR3} = rac{\sum_{m \in 	ext{Top 3 Months}} 	ext{Events}_m}{\sum_{m=1}^{12} 	ext{Events}_m}$$
* **Dengue:** 50.5% (Jun, Sep, Oct)
* **ADD:** 43.1% (Jun, Jul, Oct)
* **Malaria:** 51.4% (May, Jun, Jul)
* **Food Poisoning:** 44.9% (Feb, Apr, May)
* **Chikungunya:** 39.5% (Mar, May, Jun)

### 2. Non-Parametric Rank Stability (**Kendall's $W$**)
Measures multi-year rank agreement across all 12 months for 2022, 2023, 2024, and 2025:
* **Acute Diarrheal Disease (ADD):** $W = 0.530$ ($\chi^2 = 23.32, p = 0.016^*$) — **Statistically Significant Recurrence**
* **Dengue:** $W = 0.405$ ($\chi^2 = 17.80, p = 0.086$) — Moderate Concordance
* **Food Poisoning:** $W = 0.386$ ($\chi^2 = 16.98, p = 0.108$) — Outlier Sensitive
* **Malaria:** $W = 0.319$ ($\chi^2 = 14.06, p = 0.229$) — Highly Localized
* **Chikungunya:** $W = 0.150$ ($\chi^2 = 6.60, p = 0.832$) — Sparse Signal

---

## 🛡️ Reproducibility & Integrity Guarantee

All analytical files are frozen and version-controlled. Any change to the raw JSONs or clean analytical table can be re-validated by running the pipeline audit scripts:

```bash
# Verify row-level provenance
node data_pipeline/validation/run_deep_audit.js

# Review the authoritative architecture manifest
cat data_pipeline/REPOSITORY_MANIFEST.md
```
