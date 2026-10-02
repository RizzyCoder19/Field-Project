# 10. CLAIMS NOT SUPPORTED BY THIS DATASET

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Document Code:** PHASE-5D-DOC-10  
**Context:** Academic Defense & Viva Examiner Safeguard  
**Institution:** RP Institute, affiliated to University of Mumbai  
**Programme:** B.Sc. Data Science, Semester III  
**Status:** Frozen Epistemological Boundary Layer (Phase 5D)

---

## 1. Executive Purpose

In data science, establishing what an empirical dataset **cannot** prove is just as vital as demonstrating what it supports. Over-claiming from secondary health surveillance data is one of the most frequent grounds for academic criticism by university examiners.

This document explicitly defines nine specific claims that **cannot be scientifically supported, defended, or inferred** from the NCDC/IDSP Maharashtra outbreak surveillance dataset. These boundaries serve as a mandatory defense guide for the candidate during the viva voce examination.

---

## 2. Nine Claims Strictly Not Supported by the Dataset

### Claim 1: Population Incidence
* **Unsupported Statement:** *"The incidence rate of Dengue in Maharashtra was 2.5 per 100,000 population during 2023."*
* **Why the Data Cannot Support This:** 
  - The dataset records **outbreak events** notified to the Integrated Disease Surveillance Programme (IDSP), where an outbreak represents a clustered investigation meeting threshold criteria.
  - It does **not** capture sporadic, endemic, mild, or outpatient cases managed at home or in private clinics that never triggered an official field investigation.
  - The denominator (total population at risk in each district per epidemiological week) is completely absent from the surveillance logs.
  - **Permissible Statement:** *"The NCDC archive recorded 104 notified Dengue outbreak events comprising 1,598 investigated cases across Maharashtra during calendar year 2023."*

### Claim 2: Disease Prevalence
* **Unsupported Statement:** *"Malaria prevalence in Eastern Maharashtra reached 15% during June 2024."*
* **Why the Data Cannot Support This:**
  - Prevalence requires measuring the proportion of individuals in a defined population who have a disease at a specific point in time (point prevalence) or over a period (period prevalence).
  - Outbreak surveillance logs provide counts of acute new investigations during discrete weeks; they do not conduct systematic population cross-sectional blood surveys or community sampling.
  - **Permissible Statement:** *"In the surveillance record, 51.4% of all baseline reported Malaria outbreak events were concentrated between May and July, with Gadchiroli accounting for 38.6% of all baseline reported events."*

### Claim 3: Direct Causal Relationships
* **Unsupported Statement:** *"Unregulated public gatherings caused the high February case numbers in Food Poisoning."*
* **Why the Data Cannot Support This:**
  - The surveillance dataset provides descriptive observation of event timing, reported cases, and broad syndromic labels. It does not contain exposure registries, control groups, cohort tracking, or causal econometric instruments.
  - Inferring cause and effect from observational surveillance logs commits the classical fallacy of *post hoc ergo propter hoc*.
  - **Permissible Statement:** *"February Food Poisoning case volume was heavily concentrated in three large outbreak records (1,615 cases), demonstrating that reported case totals are driven by discrete point-source mass exposures."*

### Claim 4: Climate Causation (Rainfall, Temperature, Humidity)
* **Unsupported Statement:** *"The heavy monsoon rains in July caused the spike in Acute Diarrheal Disease outbreaks across the state."*
* **Why the Data Cannot Support This:**
  - No meteorological datasets (e.g., IMD daily rainfall, land surface temperature, relative humidity) were merged or statistically modeled in this pipeline.
  - The calendar months June through September are treated strictly as calendar labels, not as meteorological measurements.
  - Outbreaks may coincide with calendar months for reasons unrelated to weather, such as administrative surveillance cycles, school terms, or agricultural labour mobility.
  - **Permissible Statement:** *"Reported Acute Diarrheal Disease events showed an elevated contiguous reporting window from June to August (43.1% of baseline events), coinciding with the middle calendar months of the year."*

### Claim 5: Biological and Pathogen Mechanisms
* **Unsupported Statement:** *"Higher ambient heat in May accelerated Plasmodium vivax sporogonic development, explaining the early Malaria outbreak timing."*
* **Why the Data Cannot Support This:**
  - The secondary dataset contains administrative surveillance logs, not laboratory biological assays, entomological inoculation rates, or parasite kinetic data.
  - The data cannot verify vector breeding indices, parasite biting rates, or molecular virulence.
  - **Permissible Statement:** *"Reported Malaria outbreak events exhibited a consistent timing concentration in the May–July reporting window across all four baseline years in Eastern Vidarbha."*

### Claim 6: Transmission Dynamics and Community Spread
* **Unsupported Statement:** *"Dengue transmission spread from urban Mumbai and Thane into rural Marathwada along major highway transport corridors."*
* **Why the Data Cannot Support This:**
  - Outbreak surveillance records aggregate weekly numbers at the district level. They do not contain individual patient contact tracing, genomic sequencing, phylogenetic trees, or travel histories.
  - The dataset cannot establish transmission directionality, reproduction numbers ($R_0$ or $R_t$), or secondary attack rates.
  - **Permissible Statement:** *"Dengue outbreak events were reported across 31 districts, with both coastal districts (Thane, Raigad) and Marathwada districts (Beed, Nanded, Aurangabad) exhibiting late-year reported event concentration."*

### Claim 7: Individual Clinical Risk
* **Unsupported Statement:** *"A resident of Gadchiroli has a 4-fold higher individual risk of contracting Malaria than a resident of Pune."*
* **Why the Data Cannot Support This:**
  - Ecological fallacy: inferring individual-level risk from aggregate district-level surveillance notifications.
  - Gadchiroli’s higher event count (27 events) reflects targeted public health surveillance and intensive field search operations in forested tribal blocks, whereas Pune’s surveillance may capture cases through different institutional mechanisms.
  - **Permissible Statement:** *"In the government outbreak surveillance record, 38.6% of all baseline reported Malaria outbreak events were localized to Gadchiroli district."*

### Claim 8: Forecasting Future 2026 / 2027 Disease Trajectories
* **Unsupported Statement:** *"Based on the 6 events observed in W01–W32, Maharashtra will experience a severe 73% decline in Dengue cases for the full year 2026."*
* **Why the Data Cannot Support This:**
  - Calendar year 2026 is observed only through Epidemiological Week 32 (partial year).
  - Historically, 55.4% of all Dengue outbreak events in Maharashtra occur in Weeks 33 through 52 (later-year calendar weeks).
  - Truncated early-year data cannot project whether a late-year outbreak surge will or will not occur.
  - **Permissible Statement:** *"During 2026 W01–W32, 6 Dengue outbreak events were notified, which is consistent with the lower boundary of historical early-year baseline observations (2022 and 2025); unobserved weeks (W33–W52) preclude full-year trend evaluation."*

### Claim 9: Statewide Disease Danger or Threat Ranking
* **Unsupported Statement:** *"Dengue is the most dangerous seasonal disease in Maharashtra, followed by Acute Diarrheal Disease, while Chikungunya is the least significant."*
* **Why the Data Cannot Support This:**
  - Comparing diseases via simple ordinal rankings ("worst", "deadliest", "biggest problem") is scientifically invalid because each disease has different case-fatality characteristics, diagnostic thresholds, and reporting pathways.
  - In baseline records, ADD recorded 9,050 cases and 93 deaths; Dengue recorded 3,144 cases and 93 deaths; Food Poisoning recorded 5,927 cases and 29 deaths. Dengue’s higher Case Fatality Ratio (2.96% vs ADD 1.03%) reflects hospital-based outbreak threshold notifications, not general population mortality risk.
  - **Permissible Statement:** *"The five primary disease families display distinctly different surveillance profiles in terms of temporal concentration, multi-year stability, geographic localization, and sensitivity to outlier events, without implying an ordinal hierarchy of public health importance."*

---

## 3. Quick Reference Matrix for Viva Voce Defense

| If the Examiner Asks... | Do NOT Say... | DO Say... |
| :--- | :--- | :--- |
| *"What was the incidence of Dengue?"* | *"Incidence was around 3,144 cases over four years."* | *"This dataset records outbreak events, not population incidence. It captures 204 notified outbreak events totaling 3,144 investigated cases."* |
| *"Did the monsoon rains cause the malaria surge?"* | *"Yes, heavy rainfall created mosquito breeding pools in June."* | *"Our analysis identifies a temporal concentration in the May–July calendar window. We cannot prove climate causation because meteorological data were not linked."* |
| *"Why did Food Poisoning peak in February?"* | *"People eat more banquet food in winter, which spoils."* | *"February case volume is strongly influenced by three high-case outbreak records (1,615 cases). Excluding them shifts the peak reported-case month to April."* |
| *"Which district is the most dangerous for Malaria?"* | *"Gadchiroli has the highest risk of malaria."* | *"Gadchiroli accounted for 38.6% of reported outbreak events, reflecting active surveillance notification in that district rather than proved individual risk."* |
| *"What will happen in late 2026?"* | *"We project Dengue will remain low in 2026."* | *"2026 is observed only through Week 32. Over 55% of Dengue events historically occur after Week 32, so no projection can be made for unobserved weeks."* |
| *"Which disease is the worst problem in Maharashtra?"* | *"Dengue is the worst disease overall."* | *"We do not rank diseases. Each disease displays distinct dynamics: Dengue has high seasonal concentration, ADD has high case volumes, and Malaria has high geographic focus."* |
