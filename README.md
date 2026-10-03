# 🌍 Field Project: Seasonal Disease Patterns in Maharashtra

<div align="center">

![Project Banner](https://img.shields.io/badge/Field%20Project-Seasonal%20Disease%20Analysis-0B6E4F?style=for-the-badge&logo=github)
![Website](https://img.shields.io/badge/Website-Live-FF6B35?style=for-the-badge&logo=vercel)
![Data Science](https://img.shields.io/badge/Domain-Data%20Science-6C63FF?style=for-the-badge&logo=python)

</div>

A real-world public health data project analyzing how seasonal disease patterns emerge in Maharashtra using government surveillance records, extracted outbreak reports, structured validation steps, and a web-based storytelling interface.

This repository is a complete academic research package: source material, analytical workflow, evidence audit, field-work documentation, and presentation assets all live together in one place.

## 🔗 Important links

- Live website: https://field-project-nine.vercel.app
- GitHub repository: https://github.com/RizzyCoder19/Field-Project
- Academic framing: B.Sc. Data Science Field Project
- Geography: Maharashtra, India

## 📌 Project overview

This project studies seasonal disease dynamics through official public-health reporting structures, especially records associated with the National Centre for Disease Control (NCDC) and the Integrated Disease Surveillance Programme (IDSP).

The focus is not on broad population incidence alone, but on outbreak surveillance patterns and how disease events cluster by time, severity, and disease family across the state.

The repository covers the full research lifecycle:

- data acquisition and source auditing
- disease-family normalization and validation
- temporal and seasonal pattern analysis
- interpretation with evidence limitations
- presentation and public-facing storytelling

## 🧬 Core disease families analyzed

The study centers on five key disease families:

1. 🦟 Dengue
2. 💧 Acute Diarrheal Disease
3. 🩺 Malaria
4. 🍲 Food Poisoning
5. 🦗 Chikungunya

Each disease family is examined in relation to seasonal timing, event concentration, outbreak windows, and comparative behavior across years.

## 🗂️ Repository structure

```text
Field-Project/
├── README.md
├── .gitignore
├── Data_Source_Audit_Report.md
├── Seasonal_Disease_Patterns_Maharashtra_FINAL.pdf
├── From Data to the Ground _ Seasonal Disease Patterns in Maharashtra.pdf
├── reference storyboard.png
├── NCDC weekly outbreaks/                  # Weekly source PDFs and outbreak archives
├── raw dataset/                            # Historical and exploratory datasets
├── data_pipeline/                          # Research pipeline, validation, and analysis assets
│   ├── acquisition/
│   ├── analysis/
│   ├── master/
│   ├── logs/
│   ├── validation/
│   ├── raw_extracted/
│   ├── staging/
│   ├── phase5A_disease_audit/
│   ├── phase5B_seasonal_analysis/
│   ├── phase5C_advanced_analysis/
│   ├── phase5D_interpretation_validation/
│   ├── phase5E_presentation_synthesis/
│   ├── REPOSITORY_MANIFEST.md
│   ├── REPOSITORY_CLEANUP_REPORT.md
│   └── verify_2022_forensic.js
├── field_work/                             # Field research archive and methodology materials
│   ├── README.md
│   ├── index.html
│   ├── app.js
│   ├── server.mjs
│   ├── styles.css
│   ├── images/
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
│   └── 14_FIELD_WORK_LANGUAGE_GUIDE.md
├── presentation/                          # Presentation and slide synthesis resources
├── website/                               # Next.js showcase application
│   ├── app/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   └── README.md
├── Professor's Instructions/               # Academic guidance and instructions
└── .github/                                # GitHub automation / repository metadata (if present)
```

## 🧭 What this repository contains

### 1) 📊 Research data and source evidence

The project includes raw and curated outbreak-related documents, forms, disease cases, and validation artifacts. This includes:

- weekly disease surveillance PDFs
- source audit documentation
- cleaned analytical datasets
- validation records and provenance notes
- final project report deliverables

### 2) 🛠️ Research pipeline

The `data_pipeline/` directory captures the analytical workflow from source acquisition to interpretation. The structure is organized by phase, including:

- acquisition and forensic checks
- disease audit and family mapping
- seasonal analysis and trend summaries
- advanced statistical analysis
- interpretation validation and presentation synthesis

### 3) 🧪 Field work archive

The `field_work/` folder contains an archive for the qualitative and methodological side of the project. It includes:

- interview guidance
- observation checklists
- questionnaires
- ethics and privacy notes
- linkage between field evidence and data interpretation

### 4) 🌐 Public web showcase

The `website/` directory is a Next.js application designed to present the research in an easier-to-explore, story-driven format. It complements the analytical repository with an interactive presentation layer.

## 🚀 Quick start

### Run the website locally

```bash
cd website
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Run the field archive locally

```bash
cd field_work
node server.mjs
```

Then open:

```text
http://127.0.0.1:8000
```

## 📁 Key files worth exploring

- `README.md` — repository overview
- `Data_Source_Audit_Report.md` — source provenance and audit notes
- `data_pipeline/REPOSITORY_MANIFEST.md` — artifact map for the project
- `field_work/README.md` — archive and route guide
- `Seasonal_Disease_Patterns_Maharashtra_FINAL.pdf` — final report
- `website/README.md` — web app details

## 🧠 Methodology and interpretation notes

This project is grounded in officially reported outbreak surveillance records, which means the analysis reflects surveillance patterns and reported disease events rather than a population-wide incidence estimate.

Important caveats:

- the work is based on reported outbreak surveillance data
- disease classes were standardized through audit and mapping procedures
- interpretation is constrained by source structure and reporting coverage
- some files serve archival or reference purposes rather than direct field-collected evidence

## 🎯 Project intent

The objective is to transform scattered public health surveillance information into a transparent, data-driven story about how disease patterns change with season in Maharashtra.

The project emphasizes:

- traceability
- reproducibility
- evidence-based interpretation
- public-friendly communication of analytical findings

## ✅ Final note

This repository is best understood as a complete academic and analytical research package: source documentation, pipeline logic, evidence review, field materials, and final presentation assets are all bundled together in one project archive.

It reflects a realistic workflow for turning raw public-health data into a structured, explainable, and presentation-ready research study.

---

<div align="center">

Built for the Field Project in Data Science • Maharashtra seasonal disease surveillance • Public health analytics

</div>
