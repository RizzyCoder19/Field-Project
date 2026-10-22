<div align="center">

# 🌊 Seasonal Disease Patterns in Maharashtra
### An Epidemiological & Data Science Investigation Using Government Outbreak Surveillance Data

[![Status](https://img.shields.io/badge/Status-Completed%20%26%20Verified-00C853?style=for-the-badge&logo=checkmarx&logoColor=white)](systemic_data_verification_report.md)
[![Live Portal](https://img.shields.io/badge/Live%20Portal-fieldprojects.vercel.app-6366F1?style=for-the-badge&logo=vercel&logoColor=white)](https://fieldprojects.vercel.app)
[![Data Source](https://img.shields.io/badge/Data%20Source-GoI%20%2F%20NCDC%20%2F%20IDSP-FF6F00?style=for-the-badge&logo=databricks&logoColor=white)](NCDC%20weekly%20outbreaks/)
[![Next.js 16](https://img.shields.io/badge/Frontend-Next.js%2016%20Turbopack-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](website/)
[![Academic Context](https://img.shields.io/badge/Degree-B.Sc.%20Data%20Science%20(MU)-D32F2F?style=for-the-badge&logo=academia&logoColor=white)](report/)

<p align="center">
  <b>Candidate:</b> Khan Umar &nbsp;|&nbsp; 
  <b>Institution:</b> RP Institute, Affiliated to University of Mumbai &nbsp;|&nbsp; 
  <b>Academic Year:</b> 2026–27
</p>

[🌐 Explore Live Portal](https://fieldprojects.vercel.app) • [📑 Finalized Report (PDF)](report/finalized/0.pdf) • [📊 Data Pipeline](data_pipeline/) • [🧪 Field Work Archive](field_work/) • [🎓 Viva Defense Guide](presentation/VIVA_AND_PRESENTATION_GUIDE.md)

---

</div>

## 📌 Executive Summary

Does seasonal disease recurrence in Maharashtra follow statistically predictable temporal rhythms, or are government outbreak reports driven by irregular environmental and reporting shocks? 

This research project conducts an exhaustive multi-year epidemiological analysis of **237 consecutive surveillance weeks (2022 W01 to 2026 W32)** published by the **National Centre for Disease Control (NCDC)** and **Integrated Disease Surveillance Programme (IDSP)**, Ministry of Health & Family Welfare, Government of India.

Harmonizing **49 raw disease strings** across **809 verified outbreak events**, the study establishes an audited four-year baseline (2022–2025) and tests seasonal stability using non-parametric rank concordance (**Kendall's $W$**), 3-month concentration ratios (**CR3**), and out-of-sample temporal projections against partial-year 2026 surveillance.

```
       5 Complete Surveillance Years ────► 237 Official Weekly Bulletins
                            │
                            ▼
         809 Verified Outbreak Records (733 Baseline + 76 Partial 2026)
                            │
                            ▼
         5 Primary Cohorts (539 Records = 73.5% of Baseline Volume)
                            │
  ┌─────────────────────────┼─────────────────────────┐
  ▼                         ▼                         ▼
DENGUE (204 recs)     DIARRHEA (153 recs)       MALARIA (70 recs)
CR3 = 50.5% (Jun,Sep,Oct)  CR3 = 43.1% (Jun,Jul,Oct)   CR3 = 51.4% (May,Jun,Jul)
W = 0.405 (p = 0.086)      W = 0.530 (p = 0.016*)      W = 0.319 (p = 0.229)
  │                         │                         │
  ▼                         ▼                         ▼
FOOD POISONING (69)   CHIKUNGUNYA (43)         2026 OUT-OF-SAMPLE
CR3 = 44.9% (Feb,Apr,May)  CR3 = 39.5% (Mar,May,Jun)   45 Primary Records
W = 0.386 (p = 0.108)      W = 0.150 (p = 0.832)       2,126 Cases, 0 Deaths
```

---

## 🔬 Empirical Surveillance Scorecard (Baseline 2022–2025)

The table below reflects the exact, mathematically audited figures synchronized across the **Data Pipeline**, the **University Thesis (`report/finalized/0.pdf`)**, and the **Interactive Web Portal**:

| 🦠 Disease Family | 📋 Baseline Records | 🏥 Reported Cases | ⚰️ Deaths (CFR) | 📍 District Coverage | 📅 Peak 3-Month Window | 📈 Event CR3 | 🎯 Kendall's $W$ ($p$-value) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Dengue** | **204** | 3,144 | 93 (2.96%) | 31 / 36 (86.1%) | Jun, Sep, Oct | **50.5%** | $W = 0.405$ ($p = 0.086$) |
| **Acute Diarrheal Disease (ADD)** | **153** | 9,050 | 93 (1.03%) | 33 / 36 (91.7%) | Jun, Jul, Oct | **43.1%** | **$W = 0.530$ ($p = 0.016^*$)** |
| **Malaria** | **70** | 2,133 | 51 (2.39%) | 15 / 36 (41.7%) | May, Jun, Jul | **51.4%** | $W = 0.319$ ($p = 0.229$) |
| **Food Poisoning** | **69** | 5,927 | 29 (0.49%) | 27 / 36 (75.0%) | Feb, Apr, May | **44.9%** | $W = 0.386$ ($p = 0.108$) |
| **Chikungunya** | **43** | 701 | 0 (0.00%) | 15 / 36 (41.7%) | Mar, May, Jun | **39.5%** | $W = 0.150$ ($p = 0.832$) |
| **Total / Composite** | **539** *(73.5%)* | **20,955** | **266** *(1.27%)* | **36 / 36 (100%)** | — | — | — |

> [!NOTE]
> **Key Epidemiological Takeaways:**
> - **Acute Diarrheal Disease (ADD)** is the **sole condition** exhibiting statistically significant inter-annual rank recurrence ($W = 0.530, p = 0.016$), driven by the universal onset of the Southwest monsoon in June–July.
> - **Malaria** exhibits dramatic geographic hyper-clustering: **61.4%** of all state outbreaks concentrate strictly within Gadchiroli and Chandrapur (Eastern Vidarbha forest ecology).
> - **Food Poisoning** demonstrates high case-severity divergence: 3 massive wedding/mass-catering outlier events account for **27.2%** (1,615) of all reported cases.
> - **2026 Out-of-Sample Surveillance (W01–W32)**: Exactly **45 primary records, 2,126 cases, and 0 deaths** were recorded. Dengue appears attenuated (6 outbreaks) because **55.4%** of annual Dengue transmission occurs historically *after* epidemiological Week 32.

---

## 🗺️ Master Repository Topology

The repository is organized into self-contained, auditable scientific modules:

```
Field-Project/
│
├── 📁 NCDC weekly outbreaks/     # 🏛️ Primary raw archive: 237 official GoI PDF bulletins (2022–2026)
├── 📁 data_pipeline/             # ⚙️ 5-phase data extraction, validation, & statistical calculation engine
│   ├── 📁 acquisition/           # 🔍 2022 historical gap recovery & forensic download manifests
│   ├── 📁 master/                # 📑 809-row master extraction dataset (NCDC_Maharashtra_MASTER_RAW.csv)
│   ├── 📁 analysis/              # 🧹 Authoritative clean dataset (NCDC_Maharashtra_CLEAN_ANALYTICAL.csv)
│   ├── 📁 validation/            # 🛡️ 100% row-by-row provenance verification logs
│   ├── 📁 phase5A_disease_audit/ # 🏷️ Harmonization of 49 raw strings into 30 disease families
│   ├── 📁 phase5B_seasonal_analysis/ # 📅 Monthly indices, weekly curves, and seasonal decomposition
│   ├── 📁 phase5C_advanced_analysis/ # 📐 CR3, Gini, Shannon Entropy, & Kendall's W concordance
│   └── 📁 phase5D_interpretation_validation/ # 🎯 Evidence tiering (A/B/C/D) & synthesis
│
├── 📁 report/                    # 🎓 Official Mumbai University academic deliverables
│   ├── 📁 finalized/             # 📄 0.pdf: The official 54-page submission thesis (Audited)
│   ├── 📝 Field_Project_Report_...docx # 🖋️ Master editable Word manuscript
│   └── 🖼️ cover page.png, certificate.png, declaration.png # 📜 Official front-matter assets
│
├── 📁 website/                   # 🌐 Interactive Next.js 16 research portal & data explorer
│   ├── 📁 src/app/               # ⚡ App router routes (26 statically pre-rendered routes)
│   ├── 📁 src/components/        # 🎨 Cinematic Intro, Radial Clock, 3D Outlier Simulator, Map
│   └── 📁 src/data/              # 💎 Authoritative research data constants (researchData.ts)
│
├── 📁 field_work/                # 🧪 Primary clinical immersion & field investigation
│   ├── 📝 01–14 Frameworks      # 📋 Questionnaires, checklists, methodology, & ethics guidelines
│   ├── 🏥 Photos & Records       # 📸 VVCMC Hospital & Nallasopara PHC clinical observation evidence
│   └── 🎙️ Interview Audio       # 🎧 Key-informant interview with Medical Officer In-Charge
│
├── 📁 presentation/              # 🎬 Viva examination slide decks & briefing scripts
│   ├── 📑 Seasonal_..._FINAL.pptx # 🖥️ 10-slide high-impact viva presentation
│   ├── 📖 VIVA_AND_PRESENTATION_GUIDE.md # 🗣️ 38,000-character defense script & examiner Q&A
│   └── 📁 Outbreak-Temporal-Map-react/ # 🗺️ React temporal geospatial playback application
│
├── 📁 Professor's Instructions/  # 📋 Official University of Mumbai evaluation rubrics & guidelines
├── 📁 raw dataset/               # 📦 Archival historical baseline dataset (EpiClim 2009–2022)
└── 📄 systemic_data_verification_report.md # 🔍 Full forensic audit confirming 100% data unity
```

---

## 🚀 Quickstart Guide

### 🌐 1. Launching the Research Web Portal
The interactive web application is built with **Next.js 16 (Turbopack)** and **TypeScript**:

```bash
# Navigate to the website directory
cd website

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Or compile an optimized production build
npm run build
```
Visit `http://localhost:3000` to explore the live portal.

---

### 🧪 2. Running the Field Work Micro-Archive
Inspect the qualitative field questionnaires and hospital observation data locally:

```bash
cd field_work
node server.mjs
```
Open `http://127.0.0.1:8000` in your web browser.

---

### 📊 3. Exploring the Data Pipeline
All analytical scripts and tabular outputs reside in [`data_pipeline/`](data_pipeline/):

```bash
# Inspect the clean analytical core
head -n 5 data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv

# View Kendall's W concordance stability metrics
cat data_pipeline/phase5C_advanced_analysis/03_SEASONAL_STABILITY.csv
```

---

## 📑 Core Academic Documentation

| Document | Description | Format |
| :--- | :--- | :---: |
| [**Final Submission Report**](report/finalized/0.pdf) | Complete 54-page academic research thesis submitted to the University of Mumbai. | `PDF` |
| [**Systemic Verification Audit**](systemic_data_verification_report.md) | Forensic mathematical audit confirming 100% unity between Raw Data, Pipeline, Report, and Website. | `Markdown` |
| [**Repository Architecture Manifest**](data_pipeline/REPOSITORY_MANIFEST.md) | Technical blueprint detailing schemas, phase objectives, and data provenance. | `Markdown` |
| [**Viva & Presentation Guide**](presentation/VIVA_AND_PRESENTATION_GUIDE.md) | Comprehensive spoken defense script, examiner Q&A preparation, and slide walk-throughs. | `Markdown` |
| [**Data Source Provenance Audit**](Data_Source_Audit_Report.md) | Audit trail explaining the selection of primary NCDC bulletins over secondary aggregates. | `Markdown` |

---

## ⚖️ Ethical Governance & Data Provenance

1. **Surveillance Transparency:** Outbreak notifications are published in the public domain under Section 4 of the Right to Information Act, 2005, by the IDSP/NCDC, MoHFW, Government of India.
2. **Patient Anonymity:** All surveillance data are aggregate community cluster notifications. No individual protected health information (PHI) or personal patient identifiers exist in the repository.
3. **Institutional Field Ethics:** Clinical field observations at the Primary Health Centre (PHC Nallasopara West) and VVCMC Hospital were conducted strictly in public waiting areas with administrative verbal consent from the Medical Officer In-Charge.

---

<div align="center">

**Department of Data Science — Semester III Field Project**  
*RP Institute, Affiliated to University of Mumbai*  
Candidate: **Khan Umar** | Academic Session: **2026–27**

</div>
