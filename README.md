# 🌍 Field Project: Seasonal Disease Patterns in Maharashtra

<div align="center">

![Academic Research](https://img.shields.io/badge/Research-Academic%20Project-0B6E4F?style=for-the-badge&logo=github-academic)
![Live Website](https://img.shields.io/badge/Website-Live%20Now-FF6B35?style=for-the-badge&logo=vercel)
![Data Science](https://img.shields.io/badge/Field-Data%20Science%20%26%20Public%20Health-6C63FF?style=for-the-badge&logo=python)
![Dataset](https://img.shields.io/badge/Dataset-Government%20Sourced-FF6B9D?style=for-the-badge&logo=database)
![Status](https://img.shields.io/badge/Status-Complete%20%26%20Audited-27AE60?style=for-the-badge&logo=checkmark)

---

### 📊 **Analyzing Seasonal Disease Patterns Using Official Government Surveillance Data**

A comprehensive research project examining how seasonal weather patterns influence disease outbreaks across Maharashtra, India. This repository contains the complete research pipeline, validated datasets, field-work documentation, and an interactive web showcase.

[🔗 **Explore the Live Website**](https://fieldprojects.vercel.app) • [📄 **View Final Report**](#Data_Source_Audit_Report.md) • [📁 **Browse Repository**](https://github.com/RizzyCoder19/Field-Project/)  • [🧬 **See the Data**](#core-datasets)

</div>

---

## 🎯 Project Overview

**What this project is:**
A data science research study that uses officially published government outbreak surveillance reports to understand and quantify seasonal disease patterns in Maharashtra, India.

**Research Focus:**
- 🦟 **Dengue** | 💧 **Acute Diarrheal Disease** | 🩺 **Malaria** | 🍲 **Food Poisoning** | 🦗 **Chikungunya**

**Study Period:** 2022–2026 (IDSP outbreak surveillance data)

**Primary Data Source:** National Centre for Disease Control (NCDC) / Integrated Disease Surveillance Programme (IDSP)

**Academic Program:** B.Sc. Data Science, Semester III | RP Institute, University of Mumbai

**Candidate:** Khan Umar

---

## 🚀 Quick Start

### 🌐 Live Website

Visit the interactive web project now:

```
https://fieldprojects.vercel.app
```

The website includes:
- Interactive seasonal disease visualizations
- Disease-by-disease analysis
- Field research documentation
- Methodology explanation
- Evidence transparency

### 📥 Run Locally

**Website (Next.js):**
```bash
cd website
npm install
npm run dev
# Open http://localhost:3000
```

**Field-Work Archive (Node.js):**
```bash
cd field_work
node server.mjs
# Open http://127.0.0.1:8000
```

---

## 📊 Core Datasets

### Primary Research Dataset
- **File:** `data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`
- **Rows:** 809 verified outbreak records
- **Time Period:** 2009–2026
- **Diseases:** 5 primary families (Dengue, Malaria, Chikungunya, ADD, Food Poisoning)
- **Geography:** Maharashtra state, all districts
- **Data Quality:** 100% row-level validation audited

### Master Raw Dataset
- **File:** `data_pipeline/master/NCDC_Maharashtra_MASTER_RAW.csv`
- **Purpose:** Complete extraction with full provenance trail
- **Status:** Forensically verified against original PDFs

### Supporting Validation Files
- `data_pipeline/validation/FINAL_ROW_LEVEL_VALIDATION.csv` — 809-row audit trail
- `data_pipeline/master/WEEK_STATUS_REGISTER.csv` — epidemiological week tracking
- `data_pipeline/master/NCDC_Maharashtra_MASTER_schema.md` — technical schema

---

## 🔬 Research Methodology

### Analytical Pipeline (5 Phases)

**Phase 5A — Disease Audit**
- Standardized 49 raw disease labels into 30 families
- Selected 5 primary disease families for analysis
- 2026 reporting bias assessment

**Phase 5B — Seasonal Analysis**
- Monthly case distribution analysis
- Seasonal indices and peak identification
- 52-week outbreak curves per disease
- Year-over-year trend analysis

**Phase 5C — Advanced Statistical Analysis**
- Concentration metrics (CV, Gini, Shannon Entropy)
- Peak window modeling
- Kendall's τ concordance testing
- Outlier sensitivity analysis
- Formal hypothesis testing (Kruskal-Wallis, permutation tests)

**Phase 5D — Interpretation & Validation**
- Evidence strength tiers (A/B/C/D)
- Structural limitations synthesis
- 9 unsupported claims identification
- Viva defense framework

**Phase 5E — Presentation Synthesis**
- Slide content and visualization register
- Speaker notes and presentation strategy
- Public-facing narrative development

### Key Outputs

All phase outputs are stored in `data_pipeline/`:

```text
data_pipeline/
├── phase5A_disease_audit/
│   └── 07_PHASE5A_SELECTION_REPORT.md
├── phase5B_seasonal_analysis/
│   ├── 01_MONTHLY_DISTRIBUTION.csv
│   ├── 02_SEASONAL_INDICES.csv
│   ├── 03_WEEKLY_DISTRIBUTION.csv
│   └── 06_PHASE5B_ANALYSIS_REPORT.md
├── phase5C_advanced_analysis/
│   ├── 01_SEASONAL_CONCENTRATION.csv
│   ├── 02_PEAK_WINDOWS.csv
│   ├── 03_SEASONAL_STABILITY.csv
│   ├── 09_STATISTICAL_ANALYSIS.csv
│   └── 10_PHASE5C_ANALYSIS_REPORT.md
└── phase5D_interpretation_validation/
    ├── 02_EVIDENCE_STRENGTH_MATRIX.csv
    ├── 09_FINAL_ANALYTICAL_CONCLUSIONS.md
    ├── 10_UNSUPPORTED_CLAIMS.md
    └── 12_PHASE5D_ANALYSIS_REPORT.md
```

---

## 📁 Repository Structure

```text
Field-Project/
├── 📄 README.md                                    ← You are here
├── 📊 Data_Source_Audit_Report.md                 ← Data provenance & authority documentation
├── 📋 Seasonal_Disease_Patterns_Maharashtra_FINAL.pdf
├── 📋 From Data to the Ground _ Seasonal Disease Patterns in Maharashtra.pdf
├── 🎞️ reference storyboard.png
│
├── 📂 NCDC weekly outbreaks/                       ← PRIMARY SOURCE ARCHIVE
│   ├── 2022/ through 2026/                        ← Official weekly PDF reports (2022–2026)
│   ├── master_data_IDSP.txt                       ← Government data manifest
│   ├── Research papers (Dengue Gondia, Seasonality India, etc.)
│   └── Supporting reference documents
│
├── 📂 data_pipeline/                              ← ANALYTICAL WORKFLOW (CORE)
│   ├── acquisition/                               ← 2022 gap recovery logs
│   ├── analysis/
│   │   ├── NCDC_Maharashtra_CLEAN_ANALYTICAL.csv  ← PRIMARY ANALYTICAL DATASET
│   │   ├── CLEAN_DATASET_DATA_QUALITY_REPORT.md
│   │   └── CLEAN_DATASET_VALIDATION.md
│   ├── master/
│   │   ├── NCDC_Maharashtra_MASTER_RAW.csv        ← Raw extraction
│   │   ├── NCDC_Maharashtra_MASTER_schema.md
│   │   ├── EXTRACTION_VALIDATION_REPORT.md
│   │   └── WEEK_STATUS_REGISTER.csv
│   ├── validation/
│   │   ├── FINAL_ROW_LEVEL_VALIDATION.csv
│   │   └── FINAL_ROW_LEVEL_VALIDATION_REPORT.md
│   ├── phase5A_disease_audit/                     ← Disease label audit
│   ├── phase5B_seasonal_analysis/                 ← Monthly & seasonal curves
│   ├── phase5C_advanced_analysis/                 ← Statistical modeling
│   ├── phase5D_interpretation_validation/         ← Evidence synthesis
│   ├── phase5E_presentation_synthesis/            ← Presentation layer
│   ├── REPOSITORY_MANIFEST.md                     ← Architecture map
│   ├── REPOSITORY_CLEANUP_REPORT.md
│   └── verify_2022_forensic.js
│
├── 📂 field_work/                                 ← FIELD RESEARCH ARCHIVE
│   ├── README.md
│   ├── index.html                                 ← Standalone field archive
│   ├── app.js
│   ├── server.mjs
│   ├── styles.css
│   ├── 01_FIELD_WORK_QUESTIONNAIRE_FULL.md
│   ├── 02_FIELD_WORK_QUESTIONNAIRE_SHORT.md
│   ├── 03_FIELD_INTERVIEW_GUIDE.md
│   ├── 04_FIELD_OBSERVATION_CHECKLIST.md
│   ├── 05_FIELD_WORK_METHODOLOGY.md
│   ├── 06_FIELD_RESPONSE_TEMPLATE.csv
│   ├── 07_FIELD_EVIDENCE_REGISTER.csv
│   ├── 08_REFERENCE_FIELD_MATERIAL.md
│   ├── 09_FIELD_FINDINGS_FRAMEWORK.md
│   ├── 10_FIELD_TO_DATA_LINKAGE.md
│   ├── 11_FIELD_WORK_PRESENTATION_PLAN.md
│   ├── 12_FIELD_WORK_WEBSITE_CONTENT_PLAN.md
│   ├── 13_FIELD_ETHICS_AND_PRIVACY.md
│   ├── 14_FIELD_WORK_LANGUAGE_GUIDE.md
│   └── images/
│
├── 📂 website/                                    ← LIVE WEB APP (Next.js)
│   ├── app/
│   ├── src/components/
│   ├── public/
│   │   ├── charts/                                ← Generated visualization assets
│   │   ├── data/maharashtra-districts.json
│   │   └── fieldwork/
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── README.md
│
├── 📂 presentation/                               ← PRESENTATION ASSETS
│   ├── build/                                     ← PowerPoint and slide exports
│   ├── charts/                                    ← Chart generation scripts
│   ├── components/
│   ├── slides/                                    ← Individual slide definitions
│   ├── data/
│   └── build_presentation.js
│
├── 📂 raw dataset/                                ← ARCHIVAL (2009–2022 EpiClim)
│   ├── Final_data.csv                             ← Historical exploratory dataset
│   └── *.png                                      ← Early-stage visualizations
│
├── 📂 Professor's Instructions/                   ← ACADEMIC REQUIREMENTS
│   └── *.jpg                                      ← Official project guidance scans
│
└── .gitignore
```

---

## 📈 Key Findings Summary

Based on analysis of **809 verified outbreak records** from 2009–2026:

### Maharashtra Disease Seasonality

| Disease | Peak Month(s) | Season | Key Pattern |
|---------|--------------|--------|-------------|
| **Dengue** | Aug–Oct | Post-monsoon | Peaks after rain | **19.8% Sept** |
| **Malaria** | Jul | Early monsoon | Rapid onset | **21.5% Jul** |
| **Chikungunya** | Oct | Post-monsoon | Delayed peak | **24.8% Oct** |
| **Acute Diarrhea** | Jun | Monsoon onset | Early monsoon | **22.4% Jun** |
| **Food Poisoning** | Year-round | Variable | Low seasonal signal |

### Major Observations

✅ **Clear seasonal clustering:** Vector-borne diseases show strong post-monsoon peaks
✅ **Water-borne seasonality:** Diarrheal diseases peak during monsoon arrival
✅ **District variation:** 34 districts have distinct seasonal patterns
✅ **Temporal stability:** Seasonal patterns consistent across years (Kendall W analysis)
✅ **2026 tracking:** Partial-year data follows expected seasonal trends

---

## 🧪 Evidence & Transparency

This project emphasizes methodological rigor and honest reporting of limitations.

### What This Analysis Is:
- ✅ Government-notified outbreak surveillance data analysis
- ✅ Seasonal pattern identification using temporal aggregation
- ✅ Comparative disease epidemiology
- ✅ Evidence-based interpretation with strength tiers

### What This Analysis Is NOT:
- ❌ Population incidence estimation (no denominator data)
- ❌ Individual patient-level analysis
- ❌ Predictive forecasting model
- ❌ Private or health facility-specific data

### Data Quality Assurance
- 100% row-level validation against source PDFs
- Disease label normalization through systematic audit
- Meteorological data cross-validation
- 2026 partial-year bias assessment
- Outlier sensitivity testing

### Documented Limitations
See `data_pipeline/phase5D_interpretation_validation/06_LIMITATIONS_SYNTHESIS.md` for full discussion:
- Outbreak reporting varies by year and state
- Disease classification standardization required
- 2020–2021 COVID-19 surveillance disruption
- Seasonal peaks may reflect reporting cycles, not epidemiological reality

---

## 🎓 Academic Rigor

### Primary Research Questions
1. What seasonal patterns characterize 5 major disease families in Maharashtra (2009–2026)?
2. Which months represent peak outbreak risk for each disease?
3. How stable are seasonal patterns across years (inter-annual concordance)?
4. How does Maharashtra compare with national disease seasonality?
5. What is the relationship between rainfall and disease case clustering?

### Statistical Methods
- Monthly aggregation & seasonal indexing
- Kendall's W concordance (multi-year stability)
- Kruskal-Wallis hypothesis testing
- Monte Carlo permutation tests
- Coefficient of Variation (seasonality strength)
- Gini concentration indices
- Shannon entropy (distribution diversity)

### Field Work Component
- Environmental observation documentation
- Structured questionnaire with field respondents
- Health facility observation protocol
- ASHA/ANM worker interviews
- Ethics and privacy guardrails in place

---

## 📚 Research Deliverables

| Deliverable | File | Type | Status |
|---|---|---|---|
| **Final Report** | `Seasonal_Disease_Patterns_Maharashtra_FINAL.pdf` | PDF | ✅ Complete |
| **Field Work Report** | `From Data to the Ground...pdf` | PDF | ✅ Complete |
| **Data Audit Report** | `Data_Source_Audit_Report.md` | Markdown | ✅ Complete |
| **Repository Manifest** | `data_pipeline/REPOSITORY_MANIFEST.md` | Markdown | ✅ Complete |
| **Phase 5A Report** | `data_pipeline/phase5A_disease_audit/07_PHASE5A_SELECTION_REPORT.md` | Markdown | ✅ Complete |
| **Phase 5B Report** | `data_pipeline/phase5B_seasonal_analysis/06_PHASE5B_ANALYSIS_REPORT.md` | Markdown | ✅ Complete |
| **Phase 5C Report** | `data_pipeline/phase5C_advanced_analysis/10_PHASE5C_ANALYSIS_REPORT.md` | Markdown | ✅ Complete |
| **Phase 5D Report** | `data_pipeline/phase5D_interpretation_validation/12_PHASE5D_ANALYSIS_REPORT.md` | Markdown | ✅ Complete |
| **Analytical Dataset** | `data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv` | CSV | ✅ Validated |
| **Live Website** | https://fieldprojects.vercel.app | Interactive | ✅ Deployed |

---

## 🔍 How to Use This Repository

### For Academic Review
1. Start with `README.md` (this file) for project overview
2. Read `Data_Source_Audit_Report.md` for data provenance and methodology
3. Review `data_pipeline/REPOSITORY_MANIFEST.md` for architecture
4. Examine the Phase 5 analysis reports in sequence (A → B → C → D)
5. Check `data_pipeline/analysis/` for validated datasets
6. See field work in `field_work/README.md`

### For Data Analysis
1. Use `data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv` as primary dataset
2. Reference the schema in `data_pipeline/master/NCDC_Maharashtra_MASTER_schema.md`
3. Consult validation logs in `data_pipeline/validation/`
4. Review Phase 5B outputs for seasonal distributions
5. Check Phase 5C for statistical test results

### For Public Engagement
1. Visit https://fieldprojects.vercel.app for interactive exploration
2. Read disease-specific summaries on the website
3. Explore field methodology via `field_work/README.md`
4. Check the presentation materials in `presentation/`

### For Reproducibility
1. Clone this repository
2. Review `data_pipeline/master/build_master_dataset.js` for extraction logic
3. Check Phase 5 scripts in `data_pipeline/phase5*/` folders
4. Run validation scripts to verify data integrity
5. Generate your own seasonal indices using provided CSV files

---

## 🌐 Website Features

The live website at **https://fieldprojects.vercel.app** includes:

### 📊 Data Exploration
- Interactive seasonal disease charts
- Monthly outbreak distribution views
- Disease-specific profile pages
- District-level analysis maps

### 🔬 Research Documentation
- Methodology explanation
- Data source audit details
- Field work framework
- Evidence strength matrix

### 🎓 Academic Resources
- Research questions and objectives
- Statistical analysis summaries
- References and citations
- Limitations and caveats

### 🧭 Navigation
- Home / project overview
- Research question & scope
- Data lineage stages
- Five disease profiles
- Field work documentation
- Evidence transparency
- Methodology & ethics
- References & about

---

## 🛠️ Tech Stack

### Data Analysis & Pipeline
- **Python** — pandas, numpy, scipy for data processing and statistics
- **JavaScript/Node.js** — data extraction and validation scripts
- **CSV/JSON** — structured data formats

### Web Application
- **Next.js 16+** — React framework for production deployment
- **TypeScript** — type-safe component development
- **Tailwind CSS** — modern responsive styling
- **D3.js** — data visualization and interactive charts
- **GSAP** — animation library for cinematic effects

### Deployment
- **Vercel** — serverless hosting for the website
- **GitHub** — version control and repository management

---

## 📖 Citation & Attribution

If you use this project or its data in your own work, please cite:

```bibtex
@article{Khan2026FieldProject,
  author = {Khan, Umar},
  title = {Analysis of Seasonal Disease Patterns Using Government Health Data},
  school = {RP Institute, University of Mumbai},
  year = {2026},
  type = {B.Sc. Data Science Field Project},
  url = {https://github.com/RizzyCoder19/Field-Project},
  note = {Integrated Disease Surveillance Programme (IDSP) outbreak analysis, Maharashtra 2009-2026}
}
```

### Primary Data Source
Ministry of Health and Family Welfare, Government of India. Integrated Disease Surveillance Programme (IDSP). Weekly Outbreak Reports. https://ncdc.mohfw.gov.in

---

## 📋 Project Requirements & Compliance

This project fulfills the following academic requirements:

✅ **Research Question:** Seasonality of disease outbreaks in Maharashtra
✅ **Data Source:** Official government surveillance records (IDSP/NCDC)
✅ **Data Pipeline:** Complete from acquisition through validation to analysis
✅ **Field Component:** Structured methodology with questionnaires and observation
✅ **Analytical Rigor:** Statistical testing and evidence strength assessment
✅ **Public Presentation:** Live website and final report
✅ **Documentation:** Full transparency on methods, limitations, and findings
✅ **Ethics:** Privacy-respecting methodology and data handling

---

## 🤝 Contributing & Feedback

This is an academic research repository. For inquiries, feedback, or corrections:

- 📧 GitHub Issues: [Open an issue](https://github.com/RizzyCoder19/Field-Project/issues)
- 🌐 Website Feedback: Use contact form at https://fieldprojects.vercel.app
- 📄 Data Questions: See `Data_Source_Audit_Report.md`

---

## 📜 License & Availability

- **Source Data:** Public government data from NCDC/MOHFW (public domain)
- **Analysis Code:** Available in this repository for academic and research use
- **Website:** Open access at https://fieldprojects.vercel.app
- **Repository:** Public GitHub repository for transparency and reproducibility

---

## 🎯 Project Status

| Component | Status | Last Updated |
|-----------|--------|--------------|
| Data Acquisition & Validation | ✅ Complete | Sep 2026 |
| Phase 5A Disease Audit | ✅ Complete | Sep 2026 |
| Phase 5B Seasonal Analysis | ✅ Complete | Sep 2026 |
| Phase 5C Statistical Analysis | ✅ Complete | Sep 2026 |
| Phase 5D Interpretation | ✅ Complete | Oct 2026 |
| Phase 5E Presentation | ✅ Complete | Oct 2026 |
| Field Work Documentation | ✅ Complete | Oct 2026 |
| Website Deployment | ✅ Live | Oct 2026 |
| Final Report | ✅ Complete | Oct 2026 |

---

<div align="center">

## 🔗 Quick Links

[🌐 **Live Website**](https://fieldprojects.vercel.app) — [📊 **View Data**](data_pipeline/analysis/) — [📄 **Read Report**](Seasonal_Disease_Patterns_Maharashtra_FINAL.pdf) — [🔍 **Data Audit**](Data_Source_Audit_Report.md) — [🧪 **Field Work**](field_work/)

---

### Made with 📊 Data Science | 🩺 Public Health | 🌍 Government Data

**B.Sc. Data Science Field Project** • RP Institute, University of Mumbai • Academic Year 2025–26

For more information, visit [fieldprojects.vercel.app](https://fieldprojects.vercel.app)

</div>
