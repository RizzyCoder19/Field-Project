# 12. DIGITAL FIELD WORK SHOWCASE: INFORMATION ARCHITECTURE & CONTENT PLAN

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Sub-Study Title:** Interactive Field Work & Ground Context Microsite Specification  
**Document Code:** FIELD-DOC-12  
**Candidate:** Khan Umar  
**Programme:** B.Sc. Data Science, Semester III  
**Institution:** RP Institute, affiliated to University of Mumbai  
**Academic Year:** 2026–27  
**Document Purpose:** Frontend Specification & Content Architecture (Pre-build Blueprint)  
**Evidence Classification:** Digital Dissemination Architecture  

---

> ### DIRECTIVE ON WEB IMPLEMENTATION
> In accordance with project instructions, **this document outlines the complete information architecture, UX wireframe, content strategy, and design tokens for the future field-work website. The actual HTML/CSS/JS web application will be implemented in a subsequent phase.**

---

## 1. DESIGN PHILOSOPHY & VISUAL DIRECTION

The digital showcase is conceived as an **"Editorial Data-Journalism Field Dossier"** (reminiscent of *The Pudding*, *Reuters Graphics*, or *Financial Times Visual Investigations*). It rejects generic dashboard templates, flashy corporate cards, and decorative clip-art in favor of high-credibility academic storytelling.

### Core Visual Tokens
- **Base Canvas:** Deep Charcoal / Graphite (`#121514`) with a warm off-white / ivory reader layer (`#F8F9F6`).
- **Primary Typography:**
  - Headers: Contemporary editorial serif or high-character grotesque sans (e.g., *Newsreader*, *Playfair Display*, or *Outfit*).
  - Body & Data: Crisp, neutral mono-proportional or clean sans (*Inter*, *JetBrains Mono* for tabular codes).
- **Restrained Accents:**
  - Academic Gold (`#C59B27`) for highlighting key quantitative metrics and primary findings.
  - Subdued Slate Teal (`#2E5B70`) for interactive filters and methodology badges.
  - Alert Terracotta (`#A84234`) for outlier callouts and data limitations.
- **Atmosphere:** Subtle tactile grain overlay, generous whitespace (minimum 80px section padding), precise micro-grid alignments, and restrained, physics-based scroll-driven transitions.

---

## 2. SITE ARCHITECTURE & 17 CORE SECTIONS

```
[NAVIGATION BAR: Sticky, Frosted Glass, Minimal Progress Bar]
├── 01. Hero: From Data to the Ground
├── 02. Project Context & Academic Identity
├── 03. Why Field Work? (The Data Gap)
├── 04. Field Objectives
├── 05. Research Questions
├── 06. Multi-Method Field Methodology
├── 07. Interactive Questionnaire Explorer
├── 08. Environmental Observation Transects
├── 09. Key Informant Perspectives (Audio/Quotes)
├── 10. Contextual Visual Evidence (Photo-Essay)
├── 11. Reference Field Materials (Secondary Archive)
├── 12. Thematic Community Insights (7 Themes)
├── 13. The Bridge: Connecting Field Context to NCDC/IDSP
├── 14. Key Methodological Learnings
├── 15. Research Limitations & Reflexivity
├── 16. Complete Evidence Register & Download Center
└── 17. Researcher Epilogue & Academic Attributions
```

---

## 3. DETAILED SECTION-BY-SECTION CONTENT SPECIFICATION

### Section 01: Hero — "From Data to the Ground"
- **Headline:** *From Data to the Ground: Contextualizing Seasonal Outbreak Surveillance in Maharashtra.*
- **Sub-Headline:** *Bridging 809 government outbreak records with community realities, frontline reporting bottlenecks, and environmental vulnerabilities.*
- **Meta-Data Badge:** `B.Sc. Data Science Field Project | University of Mumbai | Candidate: Khan Umar | Academic Year 2026–27`
- **Hero Visual Anchor:** High-contrast split visual: An abstract animated stream of digitized NCDC surveillance records on the left fading into a physical, textured cartographic map of Maharashtra field transects on the right.
- **Call-to-Action:** *[ Explore the Ground Context ]* | *[ View Surveillance Data Bridge ]*

### Section 02: Academic Project Context
- **Content:** Concise summary of the parent investigation: *Analysis of Seasonal Disease Patterns Using Government Health Data*.
- **The Numbers at a Glance:** Minimalist metric cards:
  - `539` Baseline Outbreak Records (2022–2025)
  - `21,955` Reported Surveillance Cases
  - `266` Reported Surveillance Deaths
  - `36` Administrative Districts Analyzed
- **Academic Purpose:** Explaining why an undergraduate data science project ventured beyond Jupyter notebooks to explore physical public-health environments.

### Section 03: Why Field Work? (The Quantitative Blindspot)
- **Concept:** Illustrating the limitations of pure digital secondary data:
  - *Data Leakage:* Government spreadsheets only record what crosses an official notification threshold.
  - *Symptom vs. System:* How patients choose private clinics, chemists, or home remedies, bypassing formal surveillance.
  - *The "Suspected" Dilemma:* Why 45.3% of 2026 surveillance records remain unconfirmed in laboratories.

### Section 04: Field Objectives
- **Cards Grid:**
  1. *Observe:* Document physical vector habitats and drinking water vulnerabilities in real time.
  2. *Listen:* Capture perceived seasonal chronologies from long-term residents and local pharmacists.
  3. *Uncover:* Identify the operational frictions in transferring local fever reports to municipal authorities.
  4. *Evaluate:* Assess community readiness for proactive, data-driven early warning risk alerts.

### Section 05: Core Research Questions
- **Interactive Accordion:** Presenting the four qualitative research questions (RQ-FW-1 to RQ-FW-4) with expandable rationale explaining how each question directly informs the mathematical models developed in Phase 5C.

### Section 06: Multi-Method Field Methodology
- **Interactive Methodology Flowchart:**
  - Stage 1: Stratified site selection (urban informal, dense residential, peri-urban, rural fringe).
  - Stage 2: Triangulated data collection (Questionnaires, Semi-structured interviews, Environmental audits).
  - Stage 3: Strict ethical safeguards (Informed verbal/written consent, total de-identification).
  - Stage 4: Braun & Clarke 6-phase thematic coding synthesis.

### Section 07: Interactive Questionnaire Explorer
- **UX Feature:** A live, tabbed questionnaire viewer allowing examiners to toggle between:
  - *Master Full Instrument (50 questions)*: With expandable section modules (A through J).
  - *Rapid Field Form (20 questions)*: Clean 5-minute intercept survey layout with simulated response inputs.
- **Filter Tags:** Toggle by respondent type (Resident, Chemist, Doctor, ASHA worker).

### Section 08: Environmental Observation Transects
- **Visual Design:** Structured audit cards displaying the rubric from `04_FIELD_OBSERVATION_CHECKLIST.md`.
- **Feature Matrix:**
  - Stormwater drainage flow & siltation indicators.
  - Domestic water storage habits (drums, overhead tanks).
  - Visible municipal abatement markers (fogging stencils, larvicide spray tags).
- **Status Indicator:** `[ Protocol Standardized — Ready for Deployment ]`

### Section 09: Key Informant Perspectives (Voices from the Ecosystem)
- **Interactive Cards:** Curated informant archetypes:
  - *The Retail Chemist:* Explaining OTC paracetamol and ORS sales spikes in early June.
  - *The Primary Care GP:* Detailing the friction of weekly IDSP notification paperwork.
  - *The ASHA Worker:* Describing house-to-house fever tracking and community resistance.
  - *The Ward Sanitary Inspector:* Explaining the logistical challenges of pre-monsoon desilting.

### Section 10: Contextual Visual Evidence (Photo-Essay)
- **Layout:** Editorial masonry photo-grid with strict privacy compliance:
  - Photographs strictly focus on physical environments: cracked water pipelines running over open gutters, uncleaned stormwater drains, municipal awareness stencils on brick walls.
  - Every photograph includes: Date, Location Tag, Provenance Code, Analytical Context.
  - *Zero identifiable human faces or private patient interiors.*

### Section 11: Reference Field Materials (Secondary Comparative Benchmarks)
- **Curated Digital Archive:** Downloadable cards linking to official reference documents cataloged in `08_REFERENCE_FIELD_MATERIAL.md`:
  - NCDC District Surveillance Officer Operational Manual.
  - NVBDCP Comprehensive Dengue/Chikungunya Vector Management Guidelines.
  - MCGM Annual Monsoon Preparedness Health Strategy.
  - Explicit Badge: `REFERENCE MATERIAL — NOT PRIMARY FIELD EVIDENCE`.

### Section 12: Thematic Community Insights (The 7 Pillars)
- **Interactive Tabbed Matrix:** Synthesizing the 7 analytical themes from `09_FIELD_FINDINGS_FRAMEWORK.md`:
  - Theme 1: Seasonal Awareness & Environmental Triggers
  - Theme 2: Disease-Specific Symptom Phenomenology
  - Theme 3: Municipal Interventions & Operational Timeliness
  - Theme 4: Community Surveillance Literacy
  - Theme 5: Frontline Notification Pathways & Frictions
  - Theme 6: Local Environmental Vulnerability & Hotspots
  - Theme 7: Data Readiness & Early Warning Perceptions

### Section 13: The Bridge: Connecting Field Context to NCDC/IDSP
- **Interactive Comparative Visual:** An interactive slider or toggle mapping real-world field observations against the frozen Phase 5B/5C statistical charts:
  - *Left (Ground):* Resident observation of early monsoon water accumulation.
  - *Right (Data):* The empirical 82.8% June–October Dengue concentration curve ($CR3=0.627$).
  - Explanatory Text: Demonstrating that data science models reflect the macro-aggregation of these localized micro-realities.

### Section 14: Key Methodological Learnings
- **Reflective Summary:**
  1. *Surveillance is an Apex Filter:* Government outbreak data reflects investigated clusters, not total community infections.
  2. *Timing is Asymmetrical:* Malaria early-monsoon peaks (May–July) require earlier municipal intervention than late-monsoon Dengue (August–October).
  3. *Outliers Distort Perceptions:* High-case food poisoning events (such as the 1,615 cases in Kolhapur, Parbhani, Solapur) create misleading calendar spikes.

### Section 15: Research Limitations & Ethical Reflexivity
- **Academic Transparency Box:**
  - Non-probabilistic convenience sampling limits generalizability.
  - Recall bias among community informants.
  - Cross-sectional temporality (single seasonal visits).
  - Explicit confirmation that field surveys do not alter frozen NCDC statistical figures.

### Section 16: Complete Evidence Register & Download Center
- **Interactive Data Table:** Searchable, filterable interface powered by `07_FIELD_EVIDENCE_REGISTER.csv`.
- **Downloadable Pack:** Direct buttons to download the full questionnaire PDF, observation checklist, and interview guides.

### Section 17: Researcher Epilogue & Academic Attributions
- **Candidate Statement:** Personal academic reflection by Khan Umar on the value of combining data science with field epidemiology.
- **Institutional Attributions:** RP Institute, University of Mumbai, National Centre for Disease Control (NCDC), Integrated Disease Surveillance Programme (IDSP).
- **Git Repository & Code Provenance:** Link to verified GitHub research repository.
