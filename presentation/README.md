<div align="center">

# 🎬 Viva Defense & Presentation Assets
### High-Impact Visuals, Spoken Scripts, and Interactive Map for Examiners

[![Slide Deck](https://img.shields.io/badge/Slides-10--Slide%20Master%20Deck-D32F2F?style=for-the-badge&logo=microsoftpowerpoint&logoColor=white)](build/Seasonal_Disease_Patterns_Maharashtra_FINAL.pptx)
[![Defense Script](https://img.shields.io/badge/Defense%20Script-38%2C000%20Words%20Guide-6C63FF?style=for-the-badge&logo=markdown&logoColor=white)](VIVA_AND_PRESENTATION_GUIDE.md)
[![Interactive App](https://img.shields.io/badge/Geospatial%20App-React%20Temporal%20Map-61DAFB?style=for-the-badge&logo=react&logoColor=white)](Outbreak-Temporal-Map-react/)

[📑 Master Slide Deck (.pptx)](build/Seasonal_Disease_Patterns_Maharashtra_FINAL.pptx) • [📄 Slide Deck (.pdf)](build/Seasonal_Disease_Patterns_Maharashtra_FINAL.pdf) • [🗣️ Spoken Defense Guide](VIVA_AND_PRESENTATION_GUIDE.md)

---

</div>

## 📌 Overview of Examination Deliverables

This directory houses the complete set of visual, oral, and technical assets prepared for the candidate's oral viva examination before university external examiners and academic faculty.

```
presentation/
│
├── 📑 build/
│   ├── 🖥️ Seasonal_Disease_Patterns_Maharashtra_FINAL.pptx  (10-Slide Master Deck)
│   └── 📄 Seasonal_Disease_Patterns_Maharashtra_FINAL.pdf   (Slide PDF Export)
│
├── 📖 VIVA_AND_PRESENTATION_GUIDE.md  (Complete spoken transcript & 25 Q&A pairs)
│
└── 📁 Outbreak-Temporal-Map-react/    (Interactive React geospatial timeline app)
```

---

## 🖥️ 1. Master Slide Deck Structure (10 Core Slides)

The slide deck (`build/Seasonal_Disease_Patterns_Maharashtra_FINAL.pptx`) is designed with a high-contrast editorial aesthetic tailored for boardroom projection:

1. **Slide 1: Title & Academic Identity** — Title, candidate credentials, affiliation, surveillance scope.
2. **Slide 2: The Core Research Question** — The four fundamental inquiries: *When? Which? Where? How Stable?*
3. **Slide 3: Data Provenance & Pipeline** — 237 weekly NCDC bulletins, 809 records, 100% row-level audit.
4. **Slide 4: Baseline Disease Profile** — The 5 primary cohorts: 20,955 cases, 266 deaths, 73.5% cohort share.
5. **Slide 5: Hero Seasonal Decomposition** — Monthly indices and 3-month concentration ratios (**CR3**).
6. **Slide 6: Comparative Disease Analysis** — Divergence across vector, enteric, and foodborne transmission.
7. **Slide 7: Outlier & Sensitivity Modeling** — Demonstrating how 3 mass food poisoning outbreaks distort models.
8. **Slide 8: Out-of-Sample Validation (2026)** — Real-world test against Weeks 01–32 (2,126 cases, 0 deaths).
9. **Slide 9: Field Grounding & Limitations** — Insights from Palghar PHC, reporting thresholds, and biases.
10. **Slide 10: Conclusions & Recommendations** — Targeted pre-monsoon desilting, vector larvicide calendar.

---

## 📖 2. The Spoken Defense Guide (`VIVA_AND_PRESENTATION_GUIDE.md`)

A comprehensive **38,000-character personal briefing manual** for the candidate:
* **The 30-Second Elevator Pitch:** Exactly what to say when asked to summarize the project in half a minute.
* **Turn-by-Turn Spoken Script:** Word-for-word spoken narration for each of the 10 slides.
* **The "Key Numbers" Cheat Sheet:** Instant recall for all primary figures (20,955 cases, 539 records, Kendall's $W$ values).
* **25 Antagonistic Examiner Questions & Prepared Answers:** Technical defenses for common traps (e.g., *"Why use outbreak events instead of case counts?"*, *"Why is Kendall's W non-significant for Chikungunya?"*, *"Why discard the 2009–2022 dataset?"*).

---

## 🗺️ 3. Interactive React Temporal Map (`Outbreak-Temporal-Map-react/`)

A standalone React application providing an animated week-by-week timeline of disease outbreaks across Maharashtra:

```bash
cd presentation/Outbreak-Temporal-Map-react/outbreak-temporal-map
npm install
npm run dev
```
