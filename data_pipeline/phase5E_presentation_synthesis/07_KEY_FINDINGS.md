# 07. KEY ANALYTICAL FINDINGS

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Document Code:** PHASE-5E-DOC-07  
**Candidate:** Khan Umar  
**Programme:** B.Sc. Data Science, Semester III  
**Institution:** RP Institute, affiliated to University of Mumbai  
**Academic Year:** 2026–27  
**Baseline Evidence Base:** 2022–2025 Completed Calendar Years (539 Outbreak Records; 21,955 Reported Cases; 266 Reported Deaths)  

---

## 1. CROSS-CUTTING METHODOLOGICAL PRINCIPLE

> [!IMPORTANT]
> **Events vs. Cases Distinction:** Throughout this research, **outbreak events** (administrative notification records of investigated clusters) are strictly distinguished from **reported cases** (individual patient counts enumerated during investigations). Outbreak event counts reflect the frequency and temporal dispersion of detected community clusters, whereas reported case counts reflect outbreak magnitude and are vulnerable to extreme distortion by single high-case outbreak records. Neither metric represents general population incidence or community infection rates.

---

## 2. DISEASE-SPECIFIC PROFILES (THE FIVE PRIMARY FAMILIES)

### 1. Dengue (Vector-Borne / Aedes aegypti)
- **Baseline Evidence:** 204 outbreak records, 3,144 reported cases, 93 reported deaths (2022–2025).
- **Primary Seasonal Profile:** Pronounced late-monsoon and post-monsoon concentration. Peaks in October ($19.6\%$ of events, $S_m = 235.3$) and September ($17.6\%$ of events, $S_m = 211.8$), followed by June ($13.2\%$).
- **Concentration Window:** The broad 5-month June–October window accounts for **82.8%** of all baseline reported outbreak events ($CR_3 = 50.5\%$, Event $CV = 0.736$, Gini $= 0.414$).
- **Stability Evidence:** Moderate inter-annual stability (Kendall's $W = 0.405$, $p = 0.086$, non-significant). The peak reported-event month oscillates within a 5-month window across years: September (2022), October (2023), June/July tied (2024), and August (2025).
- **Important Caveat:** A single high-surveillance year (2023) accounts for 51.0% of all baseline Dengue records (104/204), heavily weighting the aggregate multi-year profile.
- **Presentation-Ready Sentence:**  
  *"Dengue outbreak notifications in Maharashtra demonstrate observed seasonal concentration in the second half of the calendar year (June–October, 82.8% of events), with peak surveillance activity recurring between August and October."*

---

### 2. Acute Diarrheal Disease (Enteric / Water-Borne)
- **Baseline Evidence:** 153 outbreak records, 9,050 reported cases, 93 reported deaths (2022–2025).
- **Primary Seasonal Profile:** Core mid-monsoon elevation spanning June to August, with a secondary surge in October. July represents the core monsoon peak ($14.4\%$ of events, $S_m = 172.5$), followed by June ($12.4\%$), August ($10.5\%$), and October ($16.3\%, S_m = 196.1$).
- **Concentration Window:** Contiguous 3-month June–August window accounts for **43.1%** of baseline events ($CR_3 = 43.1\%$, Event $CV = 0.524$, Gini $= 0.298$).
- **Stability Evidence:** Highest inter-annual rank concordance among all study diseases (Kendall's $W = 0.530$, $p = 0.016$, statistically significant under Benjamini-Hochberg FDR control). Three of the four baseline years exhibit elevated reporting between June and August.
- **Important Caveat:** Reported case totals are severely distorted by isolated institutional outbreaks. Specifically, a single 1,000-case outbreak in Nanded district in February 2024 (MAHA-2024-W06-001) generated an artificial February case peak (17.5% of cases from only 5.9% of events). Excluding this single event restores peak case volume to October (17.2%) and August (16.9%).
- **Presentation-Ready Sentence:**  
  *"Acute Diarrheal Disease exhibits the most statistically reproducible seasonal reporting profile across years (Kendall's $W = 0.530$, $p = 0.016$), with regular mid-monsoon event elevations, although aggregate case counts are heavily distorted by isolated high-case contamination incidents."*

---

### 3. Malaria (Vector-Borne / Anopheles)
- **Baseline Evidence:** 70 outbreak records, 2,133 reported cases, 51 reported deaths (2022–2025).
- **Primary Seasonal Profile:** Sharp early-monsoon concentration. Peaks in June ($21.4\%$ of events, $S_m = 257.1$) and July ($20.0\%$ of events, $S_m = 240.0$), with pre-monsoon rise in May ($10.0\%$).
- **Concentration Window:** Contiguous 3-month May–July window accounts for **51.4%** of all baseline reported outbreak events ($CR_3 = 51.4\%$, Event $CV = 0.753$, Gini $= 0.395$).
- **Stability Evidence:** Peak timing is tightly constrained to the early monsoon across years (2022: May; 2023: May/Aug/Sep/Dec; 2024: July; 2025: June), with maximum annual peak displacement limited to 2 months. Kendall's $W = 0.319$ ($p = 0.229$, non-significant) reflects lower non-parametric power due to smaller annual event counts ($N = 70$).
- **Important Caveat:** Extreme geographic focalization. Two contiguous, heavily forested eastern Vidarbha districts—Gadchiroli ($N = 27, 38.6\%$) and Chandrapur ($N = 16, 22.9\%$)—account for **61.4%** of all reported Malaria outbreaks in Maharashtra. The statewide seasonal curve essentially mirrors the surveillance profile of eastern Vidarbha.
- **Presentation-Ready Sentence:**  
  *"Malaria outbreak notifications exhibit a tightly constrained early-monsoon peak window (May–July, 51.4% of events), but this statewide pattern is driven primarily by intense localized reporting in two eastern Vidarbha districts (Gadchiroli and Chandrapur, 61.4% of events)."*

---

### 4. Food Poisoning (Enteric / Point-Source Exposure)
- **Baseline Evidence:** 69 outbreak records, 5,927 reported cases, 29 reported deaths (2022–2025).
- **Primary Seasonal Profile:** Bimodal calendar-month distribution. Peaks in late winter (January $10.1\%$, February $15.9\%$; together $26.1\%$) and late spring/pre-monsoon (April $10.1\%$, May $18.8\%$; together $29.0\%$).
- **Concentration Window:** Moderate event concentration ($CR_3 = 44.9\%$, Event $CV = 0.564$), but extreme case concentration ($CR_3 = 66.7\%$, Case $CV = 1.160$, Case Gini $= 0.534$).
- **Stability Evidence:** Moderate rank concordance (Kendall's $W = 0.386$, $p = 0.108$, non-significant). Peak months shift between late winter (February in 2023, 2024) and late spring (May in 2022, 2023; January/April in 2025).
- **Important Caveat:** Severe event-case divergence and extreme outlier sensitivity. February accounts for only 15.9% of events but 36.5% of total reported cases (196.5 cases/event vs. 85.9 overall). This case surge is driven by three high-case outbreak records (Kolhapur 651 cases, Parbhani 629 cases, Solapur 335 cases = 1,615 cases), representing a severe outlier effect. Excluding these three records shifts peak reported-case volume to April (20.8%).
- **Presentation-Ready Sentence:**  
  *"Food Poisoning outbreak notifications exhibit bimodal winter and spring peaks, with reported case totals heavily governed by rare, high-volume outbreak events rather than continuous environmental cycles."*

---

### 5. Chikungunya (Vector-Borne / Aedes aegypti)
- **Baseline Evidence:** 43 outbreak records, 701 reported cases, 0 reported deaths (2022–2025).
- **Primary Seasonal Profile:** Diffuse distribution across the calendar year. Elevated event frequencies appear sporadically in May ($14.0\%$), June ($14.0\%$), March ($11.6\%$), September ($11.6\%$), and November ($11.6\%$).
- **Concentration Window:** Lowest concentration among all primary diseases ($CR_3 = 39.5\%$, Event $CV = 0.515$, Gini $= 0.289$).
- **Stability Evidence:** Low and statistically non-significant rank concordance (Kendall's $W = 0.150$, $p = 0.832$; mean pairwise Spearman $\rho = -0.082$). Peak months displace up to 6 months across years (May in 2022, July/Sep/Oct in 2023, Jun/Nov in 2024, August in 2025).
- **Important Caveat:** Severe event sparsity. In three of the four baseline years (2022, 2023, 2025), exactly 7 outbreak events were recorded statewide; 2024 accounts for 51.2% of all baseline events (22/43). Geographically, Pune district alone accounts for 25.6% of all baseline records (11/43).
- **Presentation-Ready Sentence:**  
  *"Chikungunya surveillance records in 2022–2025 are too sparse ($N = 43$) and volatile to demonstrate a statistically stable annual seasonal cycle, reflecting localized urban reporting rather than an established statewide rhythm."*

---

## 3. SUMMARY OF QUANTITATIVE COMPARISONS

| Disease Family | Baseline Events ($N$) | Reported Cases | Reported Deaths | Top Event Window | Event $CR_3$ | Event $CV$ | Kendall's $W$ ($p$-value) | Primary Spatial Focus | Evidence Tier |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Dengue** | 204 | 3,144 | 93 | Jun–Oct (82.8%) | 50.5% | 0.736 | 0.405 ($p=0.086$) | Statewide (31 districts) | **Tier A (Strong Concentration)** |
| **Acute Diarrheal Disease** | 153 | 9,050 | 93 | Jun–Aug (43.1%) | 43.1% | 0.524 | 0.530 ($p=0.016^*$) | Statewide (33 districts) | **Tier B (Statistically Stable)** |
| **Malaria** | 70 | 2,133 | 51 | May–Jul (51.4%) | 51.4% | 0.753 | 0.319 ($p=0.229$) | Eastern Vidarbha (61.4%) | **Tier B (Spatially Focalized)** |
| **Food Poisoning** | 69 | 5,927 | 29 | Jan–Feb & Apr–May | 44.9% | 0.564 | 0.386 ($p=0.108$) | Dispersed (27 districts) | **Tier C (Outlier-Dominated)** |
| **Chikungunya** | 43 | 701 | 0 | Diffuse (No Window) | 39.5% | 0.515 | 0.150 ($p=0.832$) | Pune Urban (25.6%) | **Tier D (Sparse / Unstable)** |
| **TOTAL** | **539** | **21,955** | **266** | — | — | — | — | **Maharashtra (36 districts)** | **5 Primary Study Families** |

*\*Statistically significant under Benjamini-Hochberg False Discovery Rate (FDR) control.*
