<div align="center">

# 🌐 Research Portal: Seasonal Disease Patterns
### Interactive Epidemiological Dissemination Layer Built with Next.js 16 & Turbopack

[![Next.js](https://img.shields.io/badge/Framework-Next.js%2016.3%20(App%20Router)-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Turbopack](https://img.shields.io/badge/Bundler-Turbopack-000000?style=for-the-badge&logo=turbo&logoColor=white)](https://turbo.build/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel%20Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://fieldprojects.vercel.app)

<p align="center">
  <b>Live Production URL:</b> <a href="https://fieldprojects.vercel.app">https://fieldprojects.vercel.app</a>
</p>

[🏠 Full Investigation](https://fieldprojects.vercel.app) • [🧭 10-Act Navigator](https://fieldprojects.vercel.app/#navigator) • [🦠 Five Diseases & Clock](https://fieldprojects.vercel.app/diseases) • [📈 Monsoon Engine](https://fieldprojects.vercel.app/seasonality) • [🧪 Cinematic Fieldwork](https://fieldprojects.vercel.app/fieldwork) • [📑 Harmonization Pipeline](https://fieldprojects.vercel.app/method)

---

</div>

## 🎯 Architecture & Design Philosophy

This web portal transforms 4 years of government epidemiological surveillance (2022–2025) plus partial 2026 monitoring into an **immersive, dark-luxury, interactive research documentary**. Designed to accompany the academic thesis submitted to the University of Mumbai, the portal connects abstract surveillance statistics to physical infrastructure realities.

### 🏛️ Dark Luxury Design System
- **Obsidian Noir Canvas (`#070A0F`)**: Deep cinematic background evoking institutional scientific authority.
- **Dark Slate Elevated Surfaces (`#0B0F15`, `#0E141D`)**: High-contrast card layers for interactive instruments.
- **Midnight Cabernet Accents (`#180505` → `#110303` / `#240808`)**: Used for statistical cohort synthesis callouts.
- **Warm Champagne Cream (`#F0DECE` & `#E8D2B5`)**: Large, razor-sharp typography (`font-serif` headlines, `font-mono` badges).
- **Deep Crimson Burgundy (`#8B1414`)**: Primary action elements, active timeline stages, and focal highlights.

```
                    ┌────────────────────────────────────────────────────────┐
                    │               Authoritative Data Store                 │
                    │               src/data/researchData.ts                 │
                    │  237 Bulletins · 539 Audited Records · 20,955 Cases   │
                    └───────────────────────────┬────────────────────────────┘
                                                │
         ┌──────────────────────────────────────┼──────────────────────────────────────┐
         ▼                                      ▼                                      ▼
 [Full-Bleed Hero]                    [10-Act Connected Hub]                 [360° Radial Clock]
 CinematicHero.tsx                    ConnectedEvidenceHeader.tsx            RadialSeasonalClock.tsx
 - Bandra-Worli Sea Link Dusk         - 10-Act Evidence Drawer               - 360° Circular Geometry
 - Unobstructed Photography           - Previous/Next Bridges                - Exclusive to Act 04
 - Large Responsive Headlines         - Real-time Movement Tracking          - 5 Pathogen Signatures
         │                                      │                                      │
         └──────────────────────────────────────┼──────────────────────────────────────┘
                                                ▼
                            ┌────────────────────────────────────────┐
                            │    31 Statically Pre-Rendered Pages    │
                            │        Next.js 16 App Router           │
                            └────────────────────────────────────────┘
```

---

## ✨ Signature Interactive Exhibits & Instruments

### 1. 🧭 The 10-Act Connected Evidence Network (`ConnectedEvidenceHeader.tsx` & `ChapterFooter.tsx`)
Connects the entire website into one unified line of epidemiological evidence:
- **Movement Tracking**: Partitions the 10 Acts across 4 thematic movements (*Surveillance Foundation*, *Epidemiological Signatures*, *Mathematical & Ground Proofs*, and *Synthesis & Action*).
- **Evidence Map Popover**: A one-click drawer allowing instant discovery and navigation across all 10 documentary acts with live metrics.
- **Line-of-Evidence Narrative Bridges**: Explicit narrative bridges linking the conclusion of each act directly into the premise of the next.

### 2. 🕰️ Grand Radial Seasonal Clock (`RadialSeasonalClock.tsx`)
Housed exclusively in **Act 04: The Five Disease Pathogen Cohorts** (`/diseases`):
- Polar coordinate engine plotting monthly outbreak vectors on a 360° circular calendar.
- Highlights 3-month concentration peak arcs (**CR3**).
- Paired with the **Five Distinct Pathogen Seasonal Signatures** selector and the **Native Seasonal Trend Curve**.

### 3. 🗓️ 5×12 Seasonal Heatmap Matrix (`SeasonalMatrix.tsx`)
The centerpiece of **Act 03: The Monsoon Engine** (`/seasonality`):
- Relative monthly concentration heat distribution (%) across the 4-year baseline.
- Visualizes the Western Ghats Southwest monsoon corridor (June–September) and the subsequent post-monsoon lag.

### 4. 🧪 Cinematic Fieldwork Inspector (`CinematicFieldInspector.tsx`)
A high-resolution documentary photographic stage in **Act 08: Clinical Ground Truth** (`/fieldwork`):
- Full-bleed 16:9 / 21:9 viewport stage with pan/zoom inspection and atmospheric lighting.
- Forensic HUD status ticker (`REC ● 02.10.2026 · VVMC WARD 14 · 19.4180° N, 72.8020° E`).
- Autoplay documentary reel and 6-scene filmstrip covering clinical reception, consultation chambers, domestic 200L drums, and storm drainage.

### 5. 🎙️ Medical Officer Structured Questionnaire Console (`MedicalOfficerQuestionnaire.tsx`)
A dedicated clinical testimony suite in **Act 08: Clinical Ground Truth** (`/fieldwork`):
- **7 Detailed Inquiries**: Features paraphrased testimony from the Medical Officer In-Charge at Nallasopara West Urban Health Post.
- **Statewide Data Triangulation**: Connects local clinical observations to statewide statistics (e.g. explains the 2–3 week NCDC reporting latency, domestic water hoarding driving October Dengue, and negative pipe pressure driving July ADD surges).
- **Thematic Filters & Search**: Interactive keyword filter and one-click academic citation copier.

### 6. 🗺️ 36-District Maharashtra Spatial Map (`MaharashtraMap.tsx`)
Interactive district-level choropleth map in **Act 05: Spatial Corridors** (`/geography`):
- Dynamic disease filtering across all 36 administrative subdivisions of Maharashtra.
- Exposes extreme endemic hyper-concentration (e.g., Gadchiroli & Chandrapur accounting for **61.4%** of all state Malaria outbreaks).

### 7. 💥 Outlier Sensitivity Decomposition (`NativeOutlierDecomposition.tsx`)
Waterfall decomposition in **Act 07: Outlier Sensitivity** (`/outliers`):
- Isolates 3 massive wedding banquet food-poisoning anomalies totaling **1,615 cases**.
- Demonstrates that removing super-spreader outliers leaves the underlying seasonal summer peak (April–May) intact.

---

## 🧭 The 10 Documentary Acts & Route Directory (31 Pre-Rendered Routes)

| Act / Chapter | URL Route | Movement | Scientific Focus & Core Finding |
| :---: | :--- | :--- | :--- |
| **Overview** | `/` | **Prologue** | Cinematic intro, Bandra-Worli Sea Link hero, 10-Act navigator, baseline cohort synthesis. |
| **Act 01** | `/data` | **Movement I** | **The Surveillance Vault**: 237 weekly bulletins, 539 audited records, Form B data extraction. |
| **Act 02** | `/method` | **Movement I** | **Harmonization Pipeline**: 12-stage additive normalization, deterministic taxonomy rules. |
| **Act 03** | `/seasonality` | **Movement II** | **The Monsoon Engine**: 5×12 Heatmap Matrix, dual-wave monsoon/post-monsoon surges. |
| **Act 04** | `/diseases` | **Movement II** | **Five Disease Cohorts**: 360° Grand Radial Seasonal Clock, Five Seasonal Signatures, RDT vs ELISA. |
| **Act 05** | `/geography` | **Movement II** | **Spatial Corridors**: 36-district interactive map, Gadchiroli/Chandrapur 61.4% forest malaria cluster. |
| **Act 06** | `/stability` | **Movement III** | **Kendall's W Concordance**: Non-parametric multi-year repeatability (ADD $W = 0.530, p = 0.016$). |
| **Act 07** | `/outliers` | **Movement III** | **Banquet Outlier Sensitivity**: Decomposing 3 wedding feasts (1,615 cases); verifying baseline robustness. |
| **Act 08** | `/fieldwork` | **Movement III** | **Clinical Ground Truth**: Cinematic Field Inspector, Medical Officer 7-Inquiry Questionnaire, 2–3 week latency. |
| **Act 09** | `/comparison-2026` | **Movement IV** | **2026 Horizon**: Weeks 01–32 matched-window control (45 records, 2,126 cases, 0 deaths). |
| **Act 10** | `/findings` | **Movement IV** | **Public Health Action**: 5 operational intervention pillars, pre-monsoon pipeline superchlorination. |
| **Ref 11** | `/sources` | **Archive** | **Sources & Auditable Registry**: Official GoI bulletin manifests, references, printable PDF export. |
| **Dossier** | `/evidence` | **Audit** | **Evidence Tiering**: Epistemological tiers (Observed, Reported, Inferred) and validation logs. |
| **Print** | `/print` | **Print / Viva** | Clean, high-contrast academic print layout for viva evaluation panels. |
| **Deep-Dive** | `/diseases/dengue` | **Sub-Route** | Monograph: Dengue Fever vector dynamics, 204 records, 31 districts, October peak. |
| **Deep-Dive** | `/diseases/acute-diarrheal-disease` | **Sub-Route** | Monograph: ADD enteric transmission, 153 records, 9,050 cases, Kendall's $W = 0.530$. |
| **Deep-Dive** | `/diseases/malaria` | **Sub-Route** | Monograph: Malaria forest corridor ecology, 70 records, Gadchiroli/Chandrapur focalization. |
| **Deep-Dive** | `/diseases/food-poisoning` | **Sub-Route** | Monograph: Food Poisoning banquet exposures, 69 records, 5,927 cases, summer seasonality. |
| **Deep-Dive** | `/diseases/chikungunya` | **Sub-Route** | Monograph: Chikungunya post-monsoon dispersion, 43 records, 0 deaths, 15 districts. |

---

## 🛠️ Technology Stack & Performance

- **Framework:** Next.js 16.3.8 (App Router with Turbopack)
- **Language:** TypeScript 5.x (Strict Type Checking)
- **Styling:** Vanilla Tailwind CSS with Custom Dark Luxury Token Architecture
- **Component Architecture:** Pure React 19 Client & Server Components
- **Visuals & Charts:** Custom Polar Math, SVG Coordinate Geometry, Canvas, and HTML5 Responsive Surfaces
- **Icons:** Lucide React
- **Static Optimization:** 100% Static Pre-rendering across all 31 routes (`✓ Generating static pages 31/31 in 2.5s`)

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

---

<div align="center">

**Department of Data Science — Semester III Field Project**  
*RP Institute, Affiliated to University of Mumbai*  
Candidate: **Khan Umar** | Academic Session: **2026–27**

</div>
