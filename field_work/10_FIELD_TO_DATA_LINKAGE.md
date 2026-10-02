# 10. METHODOLOGICAL LINKAGE: FIELD CONTEXT TO DATA SCIENCE PIPELINE

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Sub-Study Title:** Epistemological Architecture Connecting Primary Field Context to Secondary Surveillance Data  
**Document Code:** FIELD-DOC-10  
**Candidate:** Khan Umar  
**Programme:** B.Sc. Data Science, Semester III  
**Institution:** RP Institute, affiliated to University of Mumbai  
**Academic Year:** 2026–27  
**Document Type:** Methodological Bridge & Systems Architecture  
**Evidence Classification:** Epistemological / Analytical Boundary Design  

---

## 1. THE CENTRAL RESEARCH CHALLENGE
A fundamental pitfall in academic data science is the **"abstraction detachment"** error: treating rows in a digital tabular dataset as abstract mathematical points devoid of the messy, physical, human realities that generated them.

In epidemiological data science, an outbreak record in a government spreadsheet is not an automatic, objective sensor reading. It is the end product of a long, complex, human, social, and administrative filtering cascade:
1. An individual feels ill in a neighborhood.
2. The individual decides whether to seek healthcare or self-medicate.
3. The individual chooses between an informal practitioner, private clinic, or public hospital.
4. The treating clinician recognizes a cluster or reports a suspected fever.
5. The local health authority reaches an epidemiological threshold warranting investigation.
6. A rapid response team (RRT) conducts an inquiry and files an outbreak notice.
7. The state surveillance unit compiles and transmits the record to the central NCDC portal.
8. The NCDC publishes a weekly PDF report.

Understanding this chain of custody is essential for correctly interpreting data science models. **Field work provides the empirical lens to observe stages 1 through 5, while data engineering and statistical analysis model stages 6 through 8.**

---

## 2. THE END-TO-END EPISTEMOLOGICAL PIPELINE

```
========================================================================================
LEVEL 1: THE REAL-WORLD GROUND TRUTH (Micro-Scale Physical & Social Context)
========================================================================================
[1. ENVIRONMENTAL & INFRASTRUCTURAL EXPOSURE]
- Rainfall, humidity, temperature fluctuations
- Choked open stormwater nullahs, puddles, construction sumps
- Intermittent drinking water supply forcing domestic water drum storage
- Mass food handling, catering, community dining events
         │
         ▼
[2. COMMUNITY HEALTH & SYMPTOM ONSET]
- Infections occur across households, schools, and workplaces
- Asymptomatic transmission and mild self-limiting fevers/diarrheas
- Severe acute manifestations (high fever, severe vomiting, dehydration)
         │
         ▼
[3. HEALTH-SEEKING BEHAVIOR & INFORMAL LEAKAGE]
- Retail chemist visits (over-the-counter paracetamol, ORS, anti-emetics)
- Neighborhood private GP clinics (often unlinked to formal digital health systems)
- Home remedies and domestic convalescence
- *Data Leakage Point:* Over 70–80% of mild community infections exit the surveillance pipeline here.

========================================================================================
LEVEL 2: LOCAL SURVEILLANCE & REPORTING CASSETTE (Frontline Public Health Machinery)
========================================================================================
         │
         ▼
[4. PUBLIC HEALTH NOTIFICATION & THRESHOLD CROSSING]
- Frontline ASHA / ANM village visits and fever register tracking
- Primary Health Centre (PHC) and Municipal Dispensary outpatient logging
- Clusters cross the administrative definition of an "outbreak" (e.g., ≥5 related cases)
- Private lab platelet count drops or rapid NS1/IgM antigen detections
         │
         ▼
[5. ADMINISTRATIVE RAPID RESPONSE & SURVEILLANCE CODING]
- District Rapid Response Team (RRT) deployed for spot investigation
- Water chlorination, blood slide collection, case verification
- Record categorized: "Suspected" vs. "Confirmed" etiology
- Transmission to State Surveillance Unit (IDSP Maharashtra) via weekly P/L/S forms / IHIP

========================================================================================
LEVEL 3: SECONDARY APEX DATASET & DATA ENGINEERING (Quantitative Research Base)
========================================================================================
         │
         ▼
[6. APEX GOVERNMENT PUBLICATION]
- National Centre for Disease Control (NCDC) compiles national weekly outbreak bulletins
- Published as official public health PDFs on the central government portal
         │
         ▼
[7. DATA EXTRACTION & PROVENANCE ANCHORING]
- Ingestion of 237 weekly surveillance reports (2022–2026 W32)
- Filtering for Maharashtra State records
- Preservation of raw disease strings, official PDF names, and page numbers
- Result: 809 raw records linked to exact provenance
         │
         ▼
[8. RIGOROUS DATA ENGINEERING & TAXONOMIC HARMONIZATION (Phase 5A)]
- Additive, auditable cleaning preserving `disease_raw`
- 116 raw source strings → 56 cleaned analytical labels → 30 disease families → 5 primary study families
- Baseline cohort established: 539 records, 21,955 reported cases, 266 reported deaths (2022–2025)
- Partial-year out-of-sample cohort isolated: 45 records, 1,327 reported cases, 3 reported deaths (2026 W01–W32)

========================================================================================
LEVEL 4: STATISTICAL PATTERNS & EVIDENCE-BASED INTERPRETATION (Phase 5B–5E)
========================================================================================
         │
         ▼
[9. EXPLORATORY & ADVANCED STATISTICAL MODELING (Phase 5B & 5C)]
- Temporal concentration: Dengue 82.8% June–Oct; Malaria 51.4% May–July; ADD 43.1% June–Aug
- Inter-annual stability: Kendall's W (ADD W=0.530 p=0.016; Dengue W=0.405; Malaria W=0.319)
- Spatial concentration: Gini coefficients (ADD 0.584, Malaria 0.575, Dengue 0.444)
- Outlier sensitivity: Food Poisoning February volume driven by 3 outlier records (1,615 cases)
         │
         ▼
[10. QUALITATIVE GROUNDING & VIVA DEFENSE (Phase 5D & 5E + Field Work)]
- Field observations provide physical validation of environmental mechanisms
- Statistical analysis provides macro-level patterns across 36 districts
- Unified academic narrative for B.Sc. Data Science viva defense
========================================================================================
```

---

## 3. EPISTEMOLOGICAL SEPARATION: WHAT EACH COMPONENT PROVES

To maintain strict scientific defense during examination, the two data streams must be kept epistemologically separate:

| Dimension | Primary Quantitative Surveillance (NCDC/IDSP Dataset) | Primary Qualitative Evidence (Field Work) |
| :--- | :--- | :--- |
| **Epistemological Role** | **Core Quantitative Evidence** | **Contextual Grounding & Operational Validation** |
| **What it rigorously proves** | - Mathematical calendar-month concentration ratios ($CR3$).<br>- Exact outbreak records, reported cases, and deaths published by NCDC.<br>- Multi-year rank concordance ($W$) across 2022–2025.<br>- Spatial district clustering ($Gini$, Shannon $H$).<br>- Disproportionate impact of extreme outlier records. | - The physical reality of vector breeding sites (open drains, domestic water drums).<br>- Community recognition (or lack thereof) of disease timing.<br>- Reliance on private GPs and OTC chemists bypassing surveillance.<br>- Operational lag between disease onset and municipal fogging/inspection.<br>- Community attitudes toward data-driven early warning alerts. |
| **What it CANNOT prove** | - True population incidence or community infection rates.<br>- Direct biological or meteorological causation (rainfall was not co-modeled).<br>- Micro-level clinical management or household economic impact. | - State-wide epidemiological rates or seasonal indices.<br>- Statistical representativeness across Maharashtra's 125 million population.<br>- Pathogen-level laboratory confirmation. |

---

## 4. STRICT RULE ON STATISTICAL INTEGRATION

> ### MANDATORY METHODOLOGICAL BOUNDARY
> **Under no circumstances should the qualitative field survey data and the NCDC/IDSP surveillance dataset be statistically pooled, merged into a single regression model, or combined into composite mathematical indices.**
> 
> The NCDC/IDSP dataset represents complete-enumeration administrative surveillance of investigated outbreaks meeting state reporting criteria. The field work represents non-probabilistic, purposive qualitative sampling of community and frontline perspectives.
> 
> Merging them mathematically would commit an **ecological fallacy** and violate basic sampling theory. The relationship between the two is **interpretive and triangulatory**: field narratives explain *why* the data science numbers look the way they do, and data science numbers indicate *how broadly* local field phenomena generalize across the state.
