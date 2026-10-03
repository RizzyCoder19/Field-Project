# 🌍 Field Project: Seasonal Disease Patterns in Maharashtra

<div align="center">

![Research](https://img.shields.io/badge/Research-Field%20Project-0B6E4F?style=for-the-badge)
![Study%20Period](https://img.shields.io/badge/Study%20Period-2022--2026-6C63FF?style=for-the-badge)
![Website](https://img.shields.io/badge/Website-Live-FF6B35?style=for-the-badge)
![Data%20Source](https://img.shields.io/badge/Data-Government%20Surveillance-FF6B9D?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-27AE60?style=for-the-badge)

</div>

## 📊 What This Project Is

A research study analyzing seasonal patterns in disease outbreaks across Maharashtra, India using official government surveillance data from the National Centre for Disease Control (NCDC) and the Integrated Disease Surveillance Programme (IDSP).

The project examines outbreak records spanning **2022–2026**, studying five disease families to understand how seasonal weather patterns influence disease occurrence. This is not a population-wide incidence study, but rather an analysis of government-reported outbreak clusters and their temporal patterns.

**Live Website:** https://fieldprojects.vercel.app

---

## 🎯 Research Focus

### Five Disease Families Analyzed
- **Dengue** — vector-borne, post-monsoon peak
- **Acute Diarrheal Disease (ADD)** — water-borne, monsoon onset peak
- **Malaria** — vector-borne, early monsoon peak
- **Food Poisoning** — foodborne, year-round variable pattern
- **Chikungunya** — vector-borne, post-monsoon delayed peak

### Study Geography
Maharashtra state, India (all districts, 2022–2026)

### Data Source
Official NCDC/IDSP weekly outbreak surveillance reports — government-notified disease clusters meeting epidemic threshold criteria

### Academic Context
B.Sc. Data Science Field Project, Semester III | RP Institute, University of Mumbai | Candidate: Khan Umar

---

## 🏗️ Repository Architecture

The repository is organized as a complete research pipeline with four major components:

### 1. **Source Archive** — `NCDC weekly outbreaks/`
Official weekly outbreak PDFs published by NCDC for 2022–2026, organized by year. These are the primary source documents that anchor all downstream analysis.

[📂 Browse source archive](NCDC%20weekly%20outbreaks/)

### 2. **Data Pipeline** — `data_pipeline/`
The complete analytical workflow from raw extraction through interpretation:

- **`acquisition/`** — 2022 gap recovery and forensic verification
- **`master/`** — Raw extracted dataset (`NCDC_Maharashtra_MASTER_RAW.csv`, 809 records)
- **`analysis/`** — Clean validated dataset (`NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`) with data quality reports
- **`validation/`** — Row-level validation records (100% audit trail)
- **`phase5A_disease_audit/`** — Disease label normalization and family selection
- **`phase5B_seasonal_analysis/`** — Monthly distributions, seasonal indices, weekly curves
- **`phase5C_advanced_analysis/`** — Concentration metrics, peak windows, statistical tests (Kendall's W, Kruskal-Wallis)
- **`phase5D_interpretation_validation/`** — Evidence synthesis, strength tiers (A/B/C/D), limitations, conclusions
- **`REPOSITORY_MANIFEST.md`** — Complete architecture map and asset guide

[📊 Explore data pipeline](data_pipeline/)

### 3. **Field Work Archive** — `field_work/`
Structured research methodology documentation including:
- Questionnaires (full and short versions)
- Interview guidance and observation checklists
- Methodology framework and ethics documentation
- Response templates and evidence register
- Interactive local archive (run with `node server.mjs`)

[🧪 Explore field work](field_work/)

### 4. **Website** — `website/`
Public-facing Next.js application presenting the research findings interactively:
- Disease-specific profiles with seasonal visualizations
- Research methodology and evidence transparency
- Field work documentation and ethics framework
- Interactive seasonal analysis explorer

[🌐 Visit live website](https://fieldprojects.vercel.app) | [📄 Website README](website/README.md)

---

## 📈 Key Findings at a Glance

Based on analysis of **809 verified outbreak records** (2022–2026):

| Disease | Peak Month(s) | Season Pattern | Evidence |
|---------|--------------|-----------------|----------|
| **Dengue** | August–October | Post-monsoon clustering | Strong seasonal signal (19.8% September) |
| **Malaria** | July | Early monsoon onset | Rapid ramp (21.5% July) |
| **Chikungunya** | October | Delayed post-monsoon | Distinct late-season peak (24.8% October) |
| **Acute Diarrhea** | June | Monsoon arrival | Early monsoon correlation (22.4% June) |
| **Food Poisoning** | Year-round | Low seasonality | Dispersed, variable pattern |

For detailed findings, analysis outputs, and statistical evidence, see [`data_pipeline/phase5B_seasonal_analysis/`](data_pipeline/phase5B_seasonal_analysis/) through [`data_pipeline/phase5D_interpretation_validation/`](data_pipeline/phase5D_interpretation_validation/).

---

## 📚 Core Documentation

| Document | Purpose | Location |
|----------|---------|----------|
| **Data Source Audit** | Complete provenance and data ecosystem documentation | [`Data_Source_Audit_Report.md`](Data_Source_Audit_Report.md) |
| **Repository Manifest** | Architecture map, phase descriptions, asset inventory | [`data_pipeline/REPOSITORY_MANIFEST.md`](data_pipeline/REPOSITORY_MANIFEST.md) |
| **Final Report** | Academic project deliverable with findings and interpretation | [`Seasonal_Disease_Patterns_Maharashtra_FINAL.pdf`](Seasonal_Disease_Patterns_Maharashtra_FINAL.pdf) |
| **Field Work Report** | Field research methodology and findings ("From Data to the Ground") | [`From Data to the Ground _ Seasonal Disease Patterns in Maharashtra.pdf`](From%20Data%20to%20the%20Ground%20_%20Seasonal%20Disease%20Patterns%20in%20Maharashtra.pdf) |

---

## 🔬 Methodology Overview

### Research Pipeline (5 Phases)

**Phases 1–4 (Rebuild & Validation)**
Extracted 809 outbreak records from official NCDC PDFs with 100% validation against source documents. Established master dataset with complete provenance tracing and schema documentation.

**Phase 5A — Disease Audit**
Standardized 49 raw disease labels into 30 families. Selected 5 primary disease families for analysis based on data availability and public health relevance.

**Phase 5B — Seasonal Analysis**
Generated monthly case distributions, seasonal indices, and 52-week outbreak curves for each disease. Computed year-over-year patterns and identified peak outbreak windows.

**Phase 5C — Advanced Analysis**
Applied rigorous statistical methods:
- Concentration metrics (Coefficient of Variation, Gini index, Shannon entropy)
- Peak window modeling (3-month outbreak windows)
- Kendall's W concordance testing for inter-annual stability
- Formal hypothesis testing (Kruskal-Wallis, permutation tests) with Bonferroni correction

**Phase 5D — Interpretation & Validation**
Synthesized findings into evidence strength tiers (A = Strong, B = Moderate, C = Variable, D = Insufficient). Documented 11 structural limitations. Identified 9 unsupported claims explicitly.

### What This Analysis Is and Is Not

**✓ What it analyzes:**
- Government-notified outbreak surveillance records
- Seasonal clustering patterns in reported disease events
- Temporal dynamics and inter-annual trends
- Comparative epidemiology across disease families

**✗ What it does not estimate:**
- Population-wide incidence rates (no denominator data)
- Individual patient-level analysis
- Disease prevalence in the community
- Predictive forecasting models

For detailed limitations discussion, see [`data_pipeline/phase5D_interpretation_validation/06_LIMITATIONS_SYNTHESIS.md`](data_pipeline/phase5D_interpretation_validation/06_LIMITATIONS_SYNTHESIS.md).

---

## 🚀 Quick Start

### Explore the Website
Visit https://fieldprojects.vercel.app for interactive visualization of seasonal patterns and research methodology.

### Run the Website Locally
```bash
cd website
npm install
npm run dev
```
Opens at http://localhost:3000

### Run the Field Archive Locally
```bash
cd field_work
node server.mjs
```
Opens at http://127.0.0.1:8000

Interactive archive with research methodology, questionnaires, interview guides, and fieldwork documentation.

---

## 📊 Dataset Access

### Primary Analytical Dataset
- **File:** [`data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`](data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv)
- **Records:** 809 verified outbreak records
- **Period:** 2022–2026 (NCDC weekly reports)
- **Diseases:** 5 primary families + supporting data
- **Quality:** 100% row-level validation audited

### Master Raw Dataset
- **File:** [`data_pipeline/master/NCDC_Maharashtra_MASTER_RAW.csv`](data_pipeline/master/NCDC_Maharashtra_MASTER_RAW.csv)
- **Purpose:** Complete extraction with full provenance trail against source PDFs

### Schema & Documentation
- **Schema:** [`data_pipeline/master/NCDC_Maharashtra_MASTER_schema.md`](data_pipeline/master/NCDC_Maharashtra_MASTER_schema.md)
- **Validation Report:** [`data_pipeline/validation/FINAL_ROW_LEVEL_VALIDATION_REPORT.md`](data_pipeline/validation/FINAL_ROW_LEVEL_VALIDATION_REPORT.md)
- **Data Quality:** [`data_pipeline/analysis/CLEAN_DATASET_DATA_QUALITY_REPORT.md`](data_pipeline/analysis/CLEAN_DATASET_DATA_QUALITY_REPORT.md)

---

## 🧪 Field Research Component

The project includes structured field methodology and research instruments:

- **Questionnaires:** Full and short versions for structured data collection
- **Interview Guide:** Structured questions for health worker interviews
- **Observation Checklist:** Environmental and facility observation framework
- **Methodology Document:** Detailed field research protocol
- **Ethics & Privacy:** Comprehensive privacy and ethical guardrails

The field work archive distinguishes between:
- **Reference materials** — Published guidelines and standards
- **Planned instruments** — Designed questionnaires and protocols
- **Collected evidence** — Actual field-collected responses (documented separately in register)

[📂 Browse field work materials](field_work/)

---

## 📋 Evidence & Transparency

### Data Quality Assurance
✓ 100% row-level validation against source PDFs  
✓ Disease label normalization through systematic audit  
✓ Meteorological data cross-validation  
✓ 2026 partial-year bias assessment  
✓ Outlier sensitivity testing  

### Documented Limitations
This project is transparent about structural constraints:
- Outbreak reporting varies by year and state
- Disease classification standardization required through audit
- 2020–2021 COVID-19 surveillance disruption
- Seasonal patterns may reflect reporting cycles, not epidemiological reality alone
- Small case counts for some diseases in specific months

Full limitations discussion: [`data_pipeline/phase5D_interpretation_validation/06_LIMITATIONS_SYNTHESIS.md`](data_pipeline/phase5D_interpretation_validation/06_LIMITATIONS_SYNTHESIS.md)

### Unsupported Claims Framework
The project explicitly documents 9 claims that are **not** supported by the surveillance data, establishing clear epistemological boundaries.

See [`data_pipeline/phase5D_interpretation_validation/10_UNSUPPORTED_CLAIMS.md`](data_pipeline/phase5D_interpretation_validation/10_UNSUPPORTED_CLAIMS.md).

---

## 🛠️ Technology Stack

- **Data Analysis:** Python (pandas, numpy, scipy)
- **Validation & Extraction:** JavaScript/Node.js
- **Frontend:** Next.js, React, TypeScript
- **Visualization:** D3.js, GSAP
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (website), GitHub (repository)

---

## 🔍 How to Navigate This Repository

### For Academic Review
1. Start here (README) for overview
2. [`Data_Source_Audit_Report.md`](Data_Source_Audit_Report.md) — data provenance and authority
3. [`data_pipeline/REPOSITORY_MANIFEST.md`](data_pipeline/REPOSITORY_MANIFEST.md) — architecture and scope
4. Phase 5 analysis reports in sequence (A → B → C → D)
5. [`data_pipeline/analysis/`](data_pipeline/analysis/) — validated datasets

### For Data Analysis
1. [`data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`](data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv) — primary dataset
2. [`data_pipeline/master/NCDC_Maharashtra_MASTER_schema.md`](data_pipeline/master/NCDC_Maharashtra_MASTER_schema.md) — column definitions
3. [`data_pipeline/validation/`](data_pipeline/validation/) — audit trail
4. [`data_pipeline/phase5B_seasonal_analysis/`](data_pipeline/phase5B_seasonal_analysis/) — seasonal distributions
5. [`data_pipeline/phase5C_advanced_analysis/`](data_pipeline/phase5C_advanced_analysis/) — statistical outputs

### For Public Engagement
1. Visit https://fieldprojects.vercel.app
2. Explore disease-specific summaries
3. Read field methodology in [`field_work/README.md`](field_work/README.md)
4. Check presentation materials in [`presentation/`](presentation/)

### For Reproducibility
1. Clone repository
2. Review extraction logic in [`data_pipeline/master/`](data_pipeline/master/)
3. Check validation scripts in [`data_pipeline/validation/`](data_pipeline/validation/)
4. Use Phase 5 analysis code as reference
5. Regenerate outputs from clean dataset (CSV provided)

---

## 📜 Citation

If you use this project or its data, cite as:

```bibtex
@article{Khan2026FieldProject,
  author = {Khan, Umar},
  title = {Analysis of Seasonal Disease Patterns Using Government Health Data},
  school = {RP Institute, University of Mumbai},
  year = {2026},
  type = {B.Sc. Data Science Field Project},
  url = {https://github.com/RizzyCoder19/Field-Project}
}
```

### Primary Data Source
Ministry of Health and Family Welfare, Government of India. Integrated Disease Surveillance Programme (IDSP). Weekly Outbreak Reports. https://ncdc.mohfw.gov.in

---

## ✅ Project Compliance

This project fulfills the following academic requirements:

✓ **Research Question** — Seasonality of major disease families in Maharashtra  
✓ **Data Source** — Official government surveillance records (IDSP/NCDC)  
✓ **Data Pipeline** — Complete extraction, validation, analysis, interpretation  
✓ **Field Component** — Structured methodology with questionnaires and observation  
✓ **Statistical Rigor** — Hypothesis testing, concordance analysis, sensitivity testing  
✓ **Public Presentation** — Live website and final report  
✓ **Documentation** — Full transparency on methods, limitations, and findings  
✓ **Ethics** — Privacy-respecting methodology and data handling  

---

## 📖 Key Project Files at a Glance

```
README.md (you are here)
├── 📄 Final academic report: Seasonal_Disease_Patterns_Maharashtra_FINAL.pdf
├── 📄 Field work report: From Data to the Ground...pdf
├── 📄 Data audit: Data_Source_Audit_Report.md
├── 📂 Source archive: NCDC weekly outbreaks/
├── 📂 Analysis pipeline: data_pipeline/
│   ├── master/ (raw extraction)
│   ├── analysis/ (clean dataset)
│   ├── phase5A/ through phase5D/ (analysis outputs)
│   └── REPOSITORY_MANIFEST.md (detailed architecture)
├── 📂 Field work: field_work/
│   └── README.md (archive guide)
└── 🌐 Website: website/
    └── (deploy to https://fieldprojects.vercel.app)
```

---

<div align="center">

## 🔗 Quick Links

[🌐 Live Website](https://fieldprojects.vercel.app) — [📊 Data Pipeline](data_pipeline/) — [📄 Final Report](Seasonal_Disease_Patterns_Maharashtra_FINAL.pdf) — [🔍 Data Audit](Data_Source_Audit_Report.md) — [🧪 Field Work](field_work/) — [📂 Source Archive](NCDC%20weekly%20outbreaks/)

---

**B.Sc. Data Science Field Project** | RP Institute, University of Mumbai | 2025–26

For questions or details, explore the linked documentation or visit https://fieldprojects.vercel.app

</div>

