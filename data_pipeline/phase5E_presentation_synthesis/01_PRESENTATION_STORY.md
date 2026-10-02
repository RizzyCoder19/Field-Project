# 01. PRESENTATION NARRATIVE ARC & STORY STRUCTURE

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Document Code:** PHASE-5E-DOC-01  
**Candidate:** Khan Umar  
**Programme:** B.Sc. Data Science, Semester III  
**Institution:** RP Institute, affiliated to University of Mumbai  
**Academic Year:** 2026–27  
**Surveillance Source:** National Centre for Disease Control (NCDC) / Integrated Disease Surveillance Programme (IDSP) Weekly Outbreak Reports  
**Study Geography:** Maharashtra State  
**Baseline Period:** 2022–2025 (4 completed calendar years, 539 primary disease outbreak records, 21,955 reported cases, 266 reported deaths)  
**Out-of-Sample Period:** 2026 Partial-Year (Weeks 01–32, 45 outbreak records)  

---

## EXECUTIVE SUMMARY & NARRATIVE ARCHITECTURE

This presentation narrative translates a four-year secondary data engineering and epidemiological surveillance analysis into an academically rigorous, defensive, and structured viva presentation. It follows a classical Seven-Act Data Science story structure designed to demonstrate end-to-end competencies in data acquisition, data audit, exploratory and advanced pattern analysis, statistical hypothesis testing, and principled public health interpretation.

### The Seven-Act Structure

```
Act I: Context & Inquiry (Slides 1–4)
   Problem definition -> Academic justification -> Research questions -> Core objectives
Act II: Provenance & Engineering (Slides 5–7)
   Official NCDC/IDSP PDF archives -> Extraction & Validation -> Additive analytical cleaning
Act III: Disease Selection & Taxonomy (Slide 8)
   116 raw source strings -> 56 cleaned analytical labels -> 30 disease families -> 5 primary study cohorts
Act IV: Seasonality & Statistical Patterns (Slides 9–12)
   Seasonal indices -> Discrete/contiguous peak windows -> Stability metrics -> Kruskal-Wallis/Kendall's W
Act V: Spatial & Outlier Dynamics (Slides 13–15)
   District concentration -> High-case outbreak records -> Event vs. Case divergence
Act VI: Validation & Limitations (Slides 14 & 16)
   2026 W01–W32 out-of-sample comparison -> Explicit surveillance boundaries & unobserved factors
Act VII: Synthesis & Defense (Slides 17–18)
   Defensible conclusions -> Surveillance logistics recommendations -> Academic references & Viva defense
```

---

## THE 14 CORE METHODOLOGICAL QUESTIONS

### 1. What problem is being studied?
The project investigates the temporal distribution, seasonal concentration, and inter-annual recurrence of officially reported infectious disease outbreak events across Maharashtra. Specifically, it analyzes whether public health outbreak notifications for major infectious diseases follow stable, statistically verifiable calendar-month cycles or whether observed peaks represent irregular, episodic, or localized high-case outbreak events.

### 2. Why does the problem matter academically?
In health informatics and applied data science, public health resources (such as medical supplies, diagnostic reagents, vector control squads, and hospital bed capacity) must be pre-positioned prior to outbreak surges. However, secondary surveillance data in developing public health systems are frequently distorted by reporting biases, variable facility notification thresholds, and extreme institutional point-source clusters. Academically, the project demonstrates how to rigorously evaluate seasonal disease signals from noisy administrative government records without conflating administrative outbreak notifications with general population incidence or epidemiological etiology.

### 3. What data was used?
The analysis utilizes official weekly outbreak surveillance reports published by the National Centre for Disease Control (NCDC), Directorate General of Health Services, Ministry of Health and Family Welfare, Government of India, under the Integrated Disease Surveillance Programme (IDSP). The analytical dataset spans 809 total records from 2022 through 2026 Week 32, containing 539 completed-year baseline records (2022–2025; 21,955 reported cases, 266 reported deaths) and 45 out-of-sample comparison records (2026 W01–W32) across 36 districts of Maharashtra.

### 4. Why was NCDC/IDSP chosen?
NCDC/IDSP is the apex, authoritative epidemiological surveillance body of the Government of India. Unlike hospital-specific admission logs or commercial aggregators, IDSP provides standardized, statewide, community-level outbreak investigation reports with verified metadata: administrative reporting week, district, disease diagnosis, confirmed/suspected case counts, associated fatalities, date of start of outbreak, and epidemiological status.

### 5. How was the dataset constructed?
The dataset was engineered through a multi-stage audit pipeline:
1. **Acquisition:** Weekly PDF reports covering Maharashtra were compiled from official government archives.
2. **Extraction:** Outbreak event rows were systematically parsed into structured JSON records, capturing district, disease label, cases, deaths, outbreak dates, and report metadata.
3. **Record-Level Validation:** All analytical records were programmatically linked to their source PDF/page provenance, supported by targeted manual verification and global integrity checks.
4. **Additive Analytical Cleaning:** Standardizing calendar months and ISO epidemiological weeks without altering primary raw disease strings (`disease_raw` preserved).
5. **Freeze:** Finalization of `NCDC_Maharashtra_CLEAN_ANALYTICAL.csv` (809 records).

### 6. How were disease families selected?
A comprehensive audit was conducted following the documented Phase 5A screening framework:
- **116 raw source strings** identified in the surveillance records.
- Standardized into **56 cleaned analytical labels** to resolve spelling variants, typographical artifacts, and administrative designations.
- Grouped into **30 disease families**.
- Filtered using objective inclusion criteria:
  - Minimum cumulative volume: $\ge 40$ baseline records.
  - Inter-annual representation: Present in $\ge 3$ of the 4 completed baseline years.
  - Public health surveillance priority: Representing major vector-borne and enteric transmission routes.
The resulting five primary families encompass 539 baseline records (92.5% of all Maharashtra records in 2022–2025):
1. **Dengue:** $N = 204$ records; 3,144 cases; 93 deaths
2. **Acute Diarrheal Disease (ADD):** $N = 153$ records; 9,050 cases; 93 deaths
3. **Malaria:** $N = 70$ records; 2,133 cases; 51 deaths
4. **Food Poisoning:** $N = 69$ records; 5,927 cases; 29 deaths
5. **Chikungunya:** $N = 43$ records; 701 cases; 0 deaths
*(Total: 539 records; 21,955 reported cases; 266 reported deaths)*

### 7. How was seasonality measured?
Seasonality was measured using multiple quantitative statistical indices to avoid single-metric bias:
- **Seasonal Indices ($S_m$):** Ratio of average monthly reported events to the annualized monthly average ($S_m = 100 \times \bar{X}_m / \bar{X}_{\text{annual}}$). Values $> 100$ indicate above-average concentration.
- **Top-3 Concentration Ratio ($CR_3$):** Percentage of total baseline events concentrated within the top three calendar months.
- **Coefficient of Variation ($CV$):** Relative dispersion of monthly event frequencies ($\sigma_m / \mu_m$).
- **Normalized Shannon Entropy ($H_{\text{norm}}$) & Gini Coefficient:** Distributional uniformity and inequality across calendar months.
- **Peak Window Identification:** Differentiating contiguous multi-month elevated windows from isolated discrete peak months.

### 8. What major patterns were found?
- **Dengue (Observed Late-Monsoon Concentration):** Exhibits a pronounced late-monsoon/post-monsoon concentration in reported events. The June–October calendar window accounts for 82.8% of all reported baseline outbreak events, peaking in October ($19.6\%$, $S_m = 235.3$) and September ($17.6\%$, $S_m = 211.8$).
- **Malaria (Contiguous Early-Monsoon Concentration):** Confined tightly to a contiguous May–July window accounting for 51.4% of reported baseline events, peaking in June ($21.4\%$, $S_m = 257.1$) and July ($20.0\%$, $S_m = 240.0$).
- **Acute Diarrheal Disease (Core Monsoon Elevation):** Demonstrates a core mid-monsoon elevation (June–August, 43.1% of events; peaking in July at 14.4%), with a secondary event elevation in October ($16.3\%$).
- **Food Poisoning (Bimodal Calendar-Month Concentration):** Exhibits a bimodal calendar-month distribution, with elevated reported outbreak-event concentration in late winter (January–February, 26.1%) and late spring (April–May, 29.0%), representing discrete temporal cluster notifications rather than continuous weather cycles.
- **Chikungunya (Diffuse Baseline Profile):** Shows no single dominant seasonal window in the aggregate data; events are dispersed across May ($14.0\%$), June ($14.0\%$), March ($11.6\%$), September ($11.6\%$), and November ($11.6\%$).

### 9. How stable were those patterns across years?
Inter-annual stability was evaluated using non-parametric rank concordance (Kendall's $W$) across the four baseline years (2022–2025):
- **Acute Diarrheal Disease ($W = 0.530$, $p = 0.016$):** Demonstrates statistically significant inter-annual rank concordance under FDR control, indicating reproducible month-to-month reporting patterns across multiple seasons.
- **Dengue ($W = 0.405$, $p = 0.086$, non-significant):** Displays moderate concordance; peak month oscillates within a 5-month window (2022: Sep; 2023: Oct; 2024: Jun/Jul; 2025: Aug). 51.0% of baseline Dengue events occurred in a single high-reporting year (2023).
- **Food Poisoning ($W = 0.386$, $p = 0.108$, non-significant):** Moderate concordance; peak timing shifts between late winter and late spring across years.
- **Malaria ($W = 0.319$, $p = 0.229$, non-significant):** Timing window (May–July) is consistent, but small annual counts ($N=70$ over 4 years) yield lower non-parametric rank concordance.
- **Chikungunya ($W = 0.150$, $p = 0.832$, non-significant):** Low concordance; data-sparse ($N=43$), with 51.2% of events concentrated in 2024.

### 10. What did district-level analysis show?
- **Malaria shows extreme spatial focalization:** Two contiguous eastern Vidarbha districts—Gadchiroli (27 events, 38.6%) and Chandrapur (16 events, 22.9%)—account for 61.4% of all reported Malaria outbreaks in Maharashtra. Statewide seasonal patterns for Malaria reflect the reporting record of these two forested districts.
- **Chikungunya shows urban reporting focalization:** Pune district accounts for 25.6% of baseline records (11/43), and is the only district with $\ge 10$ records.
- **Dengue and ADD show broad statewide distribution:** Dengue was reported across 31 of 36 districts (8 districts with $\ge 10$ events: Thane, Beed, Raigad, Kolhapur, Nanded, Chhatrapati Sambhajinagar/Aurangabad, Akola, Pune). ADD was reported across 33 districts (Nagpur, Amravati, Kolhapur qualifying with $\ge 10$ events).

### 11. What does 2026 W01–W32 tell us?
The 2026 partial-year cohort ($N = 45$ records through Week 32) serves as an out-of-sample descriptive comparison:
- **Acute Diarrheal Disease (18 events):** Closely tracks the historical 4-year equivalent mean of 21.8 events ($-17.2\%$), demonstrating expected baseline consistency within the observed period.
- **Dengue (6 events):** Appears lower than the historical equivalent mean (22.8 events, $-73.6\%$), but this represents severe seasonal truncation, as 55.4% of annual Dengue outbreaks historically occur in Weeks 33–52.
- **Food Poisoning (19 events):** Elevated above the historical equivalent mean of 12.8 events ($+49.0\%$), reflecting heightened surveillance reporting in early 2026; all 19 records used the "Suspected Food Poisoning" designation.
- **Malaria (1 event):** Substantial surveillance deficit compared to the historical mean of 12.0 events ($-91.7\%$), located in Gadchiroli.
- **Crucial Rule:** 2026 is an out-of-sample comparison period covering Weeks 01–32 only; it cannot be compared to complete 52-week baseline totals, called a forecast, or used to predict unobserved W33–W52 activity.

### 12. What are the limitations?
1. **Surveillance Threshold Bias:** IDSP reports capture discrete outbreak investigations (clusters meeting notification thresholds), not endemic primary-care incidence or total community morbidity.
2. **Government Archive Gaps:** Official 2023 archives contain 49 published weeks; Weeks 15, 51, and 52 were unpublished / unavailable in the public NCDC archive. (Week 50 is published and present). No synthetic zeros were inserted.
3. **Surveillance Surges & Asymmetries:** Single years dominate specific disease baselines (e.g., Dengue 2023 accounts for 51.0% of events; ADD 2024 accounts for 46.4%).
4. **Extreme Case-Volume Outliers:** Single institutional outbreaks distort case counts (e.g., one 1,000-case ADD outbreak in Nanded shifted February into an artificial case peak).
5. **No Direct Meteorological Confounding Control:** Rainfall, temperature, and humidity data were not co-modeled; seasonality is inferred strictly from calendar-month reporting distributions.

### 13. What conclusions are defensible?
- Officially reported outbreak notifications in Maharashtra exhibit observable seasonal concentration in vector-borne disease reports (Dengue: late monsoon/post-monsoon; Malaria: early monsoon).
- Enteric outbreaks (ADD) display regular seasonal elevation during peak monsoon months (June–August), but total case counts are driven by isolated contamination events.
- Food Poisoning does not exhibit climatic seasonality; its peaks reflect discrete cluster notifications in winter and spring, with case totals governed by high-case outlier events.
- Chikungunya surveillance in 2022–2025 is too sparse and volatile to establish a stable annual calendar cycle.
- Outbreak event counts and case volumes must never be conflated; event counts reflect surveillance detection frequency, whereas case volumes reflect cluster severity.

### 14. What surveillance-oriented recommendations follow?
1. **Pre-Monsoon Preparedness (April–May):** Mobilize diagnostic test kits and vector control measures in high-burden Malaria districts (Gadchiroli, Chandrapur) before the documented May–July surge.
2. **Post-Monsoon Vector Control (August–September):** Intensify municipal source-reduction and fever surveillance across Western Maharashtra and Marathwada ahead of the recurrent September–October Dengue peak.
3. **Monsoon Potable Water Assurance (June–August):** Intensify pipeline water testing and rapid response protocols prior to the documented June–August ADD peak window.
4. **Separate Event vs. Case Surge Protocols:** Distinguish logistics for handling frequent small community outbreaks from capacity planning for rare mass-exposure institutional clusters (>500 cases).
5. **Surveillance Standardization:** Standardize diagnostic criteria and reporting promptness across districts to reduce inter-annual reporting volatility.
