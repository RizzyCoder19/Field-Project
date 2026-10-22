<div align="center">

# 🌐 Research Portal: Seasonal Disease Patterns
### Interactive Dissemination Layer Built with Next.js 16 & Turbopack

[![Next.js](https://img.shields.io/badge/Framework-Next.js%2016.3%20(App%20Router)-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Turbopack](https://img.shields.io/badge/Bundler-Turbopack-000000?style=for-the-badge&logo=turbo&logoColor=white)](https://turbo.build/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel%20Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://fieldprojects.vercel.app)

<p align="center">
  <b>Live Production URL:</b> <a href="https://fieldprojects.vercel.app">https://fieldprojects.vercel.app</a>
</p>

[🏠 Homepage](https://fieldprojects.vercel.app) • [🦠 Diseases Explorer](https://fieldprojects.vercel.app/diseases) • [📈 Seasonality Modeling](https://fieldprojects.vercel.app/seasonality) • [🧪 Fieldwork Hub](https://fieldprojects.vercel.app/fieldwork) • [📑 Methodology](https://fieldprojects.vercel.app/methodology)

---

</div>

## 🎯 Architecture Overview

This web portal transforms 5 years of complex government epidemiological surveillance into an immersive, editorial, and interactive research experience. Designed to accompany the academic thesis submitted to the University of Mumbai, the website serves as the primary visual dissemination platform for examiners, epidemiologists, and public health officials.

```
                  ┌───────────────────────────────┐
                  │   Authoritative Data Store    │
                  │   src/data/researchData.ts    │
                  └──────────────┬────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
  [Cinematic Hero]        [Radial Clock]          [Choropleth Map]
  CinematicIntro.tsx      RadialSeasonalClock.tsx MaharashtraMap.tsx
  - 20,955 Cases          - Polar CR3 Angles      - 36 Districts
  - 266 Deaths            - Monthly Peak Vectors  - Spatial Clustering
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                     ┌───────────────────────┐
                     │ 26 Pre-Rendered Pages │
                     │   Next.js App Router  │
                     └───────────────────────┘
```

---

## ✨ Key Interactive Visualizations

### 1. 🧭 Radial Seasonal Clock (`RadialSeasonalClock.tsx`)
A polar coordinate visualization plotting monthly disease vectors on a 360° circular calendar.
- Highlights 3-month concentration peak arcs (**CR3**).
- Illustrates the discrete Jun–Oct post-monsoon wave for Dengue (50.5% CR3) vs. the contiguous monsoon wave for ADD (43.1% CR3).

### 2. 🗺️ Maharashtra Spatial Outbreak Map (`MaharashtraMap.tsx`)
SVG-based interactive district-level choropleth map.
- Dynamic filtering across all 36 districts of Maharashtra.
- Exposes extreme endemic hyper-concentration (e.g. Gadchiroli & Chandrapur accounting for **61.4%** of all state Malaria outbreaks).

### 3. 💥 Outlier Sensitivity Simulator (`OutlierSensitivitySimulator.tsx`)
Interactive Monte Carlo simulator showing how isolated super-spreader events distort classical time-series models.
- Demonstrates how 3 mass food-catering outbreaks injected **1,615 cases (27.2%)** into Food Poisoning surveillance without recurring seasonally.

### 4. ⏱️ 2026 Out-of-Sample Timeline (`NativeTimeline2026.tsx`)
Surveillance tracking interface comparing 2026 partial-year real-time bulletins (W01–W32) against the completed 2022–2025 baseline.
- **2,126 cases** across 45 primary records (Food Poisoning: 19, ADD: 18, Dengue: 6, Malaria: 1, Chikungunya: 1).

---

## 🧭 Page & Route Directory (26 Statically Pre-rendered Routes)

| Route Path | Category | Description |
| :--- | :--- | :--- |
| `/` | **Landing Page** | Editorial scrollytelling introduction with dynamic epidemiological metrics. |
| `/diseases` | **Disease Index** | Overview of the 5 primary cohorts and taxonomy classification. |
| `/diseases/dengue` | **Cohort Deep-Dive** | Post-monsoon vector dynamics, CFR 2.96%, 31 districts, 73.0% Jun–Oct share. |
| `/diseases/acute-diarrheal-disease` | **Cohort Deep-Dive** | Statistically significant Kendall's $W$ ($0.530, p=0.016$), 9,050 cases. |
| `/diseases/malaria` | **Cohort Deep-Dive** | Gadchiroli/Chandrapur spatial clustering (61.4%), May–Jul peak window. |
| `/diseases/food-poisoning` | **Cohort Deep-Dive** | Outlier sensitivity, wedding season clustering (Feb/Apr/May), 29 deaths. |
| `/diseases/chikungunya` | **Cohort Deep-Dive** | Diffuse post-monsoon activity, Pune dominance (25.6%), $W = 0.150$. |
| `/seasonality` | **Analytical Core** | Seasonal indices, Kendall's $W$ concordance matrices, CR3 rankings. |
| `/data` | **Data Explorer** | Full audited tabular browser for all 809 surveillance records. |
| `/evidence` | **Evidence Matrix** | Strength of evidence tiering (Tiers A through D) and validation audit trail. |
| `/fieldwork` | **Field Research** | Palghar/Nallasopara PHC investigation, OPD fever surges, interviews. |
| `/fieldwork/interviews` | **Field Research** | Transcript with Medical Officer In-Charge regarding IDSP thresholds. |
| `/fieldwork/observation`| **Field Research** | Clinical observation checklists, storage tanks, water stagnation. |
| `/fieldwork/questionnaire`| **Field Research** | 14-item epidemiological survey instrument and community templates. |
| `/methodology` | **Methodology** | Full 5-phase data pipeline walkthrough and formula derivations. |
| `/print` | **Print / Viva Mode** | Clean, formatted print layout for academic assessment and viva panels. |

---

## 🛠️ Technology Stack

* **Framework:** Next.js 16.3.8 (App Router)
* **Runtime / Bundler:** Turbopack
* **Language:** TypeScript 5.x (Strict mode)
* **Styling:** Tailwind CSS + Lucide React icons
* **Data Visualizations:** Custom SVG Math & D3 scale interpolators
* **Performance:** 100% Static Pre-rendering (`prerendered as static content`)

---

## 💻 Local Development Setup

```bash
# 1. Enter website directory
cd website

# 2. Install dependencies
npm install

# 3. Launch local dev server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# 4. Compile optimized production build
npm run build
```
