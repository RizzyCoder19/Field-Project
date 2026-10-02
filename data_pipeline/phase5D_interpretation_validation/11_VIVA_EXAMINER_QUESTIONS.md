# 11. VIVA VOCE EXAMINER CHALLENGE AUDIT & DEFENSE GUIDE

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Document Code:** PHASE-5D-DOC-11  
**Candidate:** Khan Umar  
**Degree Programme:** B.Sc. Data Science, Semester III  
**Institution:** RP Institute, affiliated to University of Mumbai  
**Surveillance Source:** NCDC / IDSP Weekly Outbreak Surveillance Archive (Maharashtra)  
**Baseline Dataset:** 2022–2025 Completed Calendar Years ($N = 539$ records; 2026 W01–W32 $N = 45$)  
**Status:** Frozen Academic Defense Layer (Phase 5D)

---

## 1. Purpose & Examiner Persona

In a Mumbai University B.Sc. Data Science viva voce examination, external examiners scrutinize data provenance, statistical appropriateness, domain limitations, and whether the candidate understands the boundaries of their conclusions. 

This document simulates an intensive examination defense. It presents **sixteen demanding, technically rigorous questions** covering the entire project pipeline (data architecture, disease mapping, seasonal concentration, statistical testing, outlier sensitivity, district dynamics, and 2026 validation), paired with short, precise, and scientifically defensible answers grounded strictly in the validated Phase 5 data.

---

## 2. Sixteen Viva Examination Challenge Questions & Defenses

### Question 1: Operational Definition of a Seasonal Pattern
> **Examiner:** *"Candidate, you claim to analyze 'seasonal patterns'. How exactly did you define a seasonal pattern mathematically in this project? Did you just look at a bar chart of months?"*

* **Defensible Answer:**
  > "No, Sir/Madam. We defined a seasonal pattern using a multi-metric quantitative framework rather than visual inspection. Specifically:
  > 1. **Temporal Concentration:** Evaluated via Coefficient of Variation ($CV > 0.6$), Top-3 Month Concentration Ratio ($CR3 > 50\%$), and Gini coefficient ($> 0.35$).
  > 2. **Peak Window Modeling:** Testing whether peak reporting falls within a contiguous 3-month window versus discrete months.
  > 3. **Inter-Annual Recurrence:** Measuring whether the 12-month rank profile repeats across independent years using Kendall’s Coefficient of Concordance ($W$) and tracking peak timing displacement across years.
  > 4. **Statistical Significance:** Rejection of calendar-month uniformity via Kruskal-Wallis non-parametric testing and 10,000-draw Monte Carlo permutation tests under Bonferroni/FDR control.
  > Only when these convergent criteria demonstrated non-random calendar clustering recurring across years did we classify an observation as a seasonal pattern."

---

### Question 2: Baseline Period Selection (2022–2025)
> **Examiner:** *"Why did you restrict your baseline to 2022–2025? Why not include ten years of historical data from 2011 onwards?"*

* **Defensible Answer:**
  > "Our forensic audit in Phase 1 through Phase 4 examined earlier data compilations (such as EpiClim 2011–2019) and revealed severe extraction errors, duplicate inflation, and broken data provenance. 
  > Furthermore, the COVID-19 pandemic years (2020–2021) caused unprecedented disruption to IDSP routine surveillance machinery, diverting personnel to COVID tracking. 
  > The 2022–2025 period represents the most recent, homogeneous, fully digitized, and uninterrupted post-pandemic surveillance era where weekly NCDC outbreak reports are primary, authoritative, and 100% auditable back to official government PDFs."

---

### Question 3: Exclusion of 2026 from the Baseline
> **Examiner:** *"Why did you exclude 2026 from your baseline calculations? You had 45 records from 2026; why not pool them together?"*

* **Defensible Answer:**
  > "Pooling 2026 with 2022–2025 would commit a fundamental epidemiological error known as **temporal truncation bias**. 
  > The 2026 dataset ends at Epidemiological Week 32 (August 2026); Weeks 33 through 52 have not yet been observed. Pooling an incomplete 8-month period with four complete 12-month calendar years would artificially dilute late-year seasonal indices. For instance, Dengue historically records 55.4% of its events in Weeks 33–52. 
  > Therefore, 2026 was kept strictly separate as an out-of-sample comparison for the identical calendar window (W01–W32)."

---

### Question 4: Outbreak Events vs. Cases
> **Examiner:** *"What is the difference between an 'outbreak event' and a 'case' in your dataset, and why does this distinction matter?"*

* **Defensible Answer:**
  > "In IDSP surveillance, an **outbreak event** is the primary administrative unit of notification—representing a formally investigated cluster of illness meeting epidemic threshold criteria in a specific locality. A **reported case** is an individual patient enumerated within that investigated cluster.
  > This distinction is critical because case numbers are vulnerable to extreme distortion by single mass-exposure events (such as contaminated institutional water supplies or localized high-case food poisoning exposures). For example, in February 2024, a single Nanded ADD outbreak contributed 1,000 cases. 
  > Evaluating outbreak events measures the frequency of public health emergencies across the calendar year, whereas evaluating raw cases measures exposure scale."

---

### Question 5: Inability to Calculate Population Incidence
> **Examiner:** *"Can you use your dataset to tell me the incidence rate of Dengue in Pune or Maharashtra?"*

* **Defensible Answer:**
  > "No, Sir/Madam. This dataset strictly **cannot** be used to calculate population incidence, attack rates, or prevalence. 
  > IDSP weekly outbreak reports capture only clustered epidemic investigations; they omit the vast denominator of sporadic, endemic, mild, and asymptomatic cases treated in private outpatient clinics or at home that never trigger a formal outbreak notification. 
  > Furthermore, surveillance notification thresholds and reporting intensity vary across districts. Claiming population incidence from outbreak logs would commit an ecological fallacy."

---

### Question 6: Handling Disease Nomenclature Fragmentation
> **Examiner:** *"The raw NCDC data had spelling errors and different names for the same disease. How did you ensure you weren't comparing apples to oranges?"*

* **Defensible Answer:**
  > "In Phase 5A, we performed a comprehensive disease label audit. We identified 49 raw disease strings and built a conservative, rule-based mapping dictionary into 30 harmonized families. 
  > We resolved exact typographical variants (e.g., British *'Diarrhoeal'* vs. American *'Diarrheal'*), consolidated clinical sub-types under verified family umbrellas (e.g., standardizing 9 specific Plasmodium sub-labels under *Malaria*), but strictly enforced boundaries: syndromic labels, distinct pathogens, and combination labels were never merged arbitrarily. Every mapping decision is transparently documented in `02_DISEASE_FAMILY_MAPPING.csv`."

---

### Question 7: Separation of Combination Disease Labels
> **Examiner:** *"In your data, you had entries like 'Dengue & Chikungunya' or 'Dengue & Malaria'. Why didn't you split them 50/50 into the Dengue and Malaria buckets?"*

* **Defensible Answer:**
  > "Splitting combination labels would introduce artificial double-counting of cases and deaths without clinical justification. 
  > The IDSP report does not specify how many of the 143 cases in a *'Dengue & Chikungunya'* outbreak had dengue versus chikungunya, or whether they represented serological co-infections. 
  > Splitting them arbitrarily would contaminate pathogen-specific baseline totals. We preserved epidemiological integrity by isolating combination labels as distinct co-reporting categories in Phase 5A."

---

### Question 8: Impact of Large Individual Outbreaks (Outlier Sensitivity)
> **Examiner:** *"What happens to your seasonal curves if one massive outbreak occurs in an off-season month? Doesn't that ruin your whole analysis?"*

* **Defensible Answer:**
  > "That is precisely why we conducted systematic **outlier sensitivity testing** in Phase 5C (`06_OUTLIER_SENSITIVITY.csv`). 
  > We discovered that case distributions are indeed heavily sensitive: in Food Poisoning, February case volume is strongly influenced by three high-case outbreak records (1,615 cases); excluding them shifted the peak reported-case month to April. In ADD, a single 1,000-case outbreak in Nanded shifted the peak reported-case month from February to October. 
  > However, our **outbreak event distributions were remarkably resilient**: Dengue showed zero peak shift upon outlier exclusion. This proved that for this analysis, reported event counts provide a less case-volume-sensitive measure of temporal reporting frequency than raw case counts."

---

### Question 9: Justification for Monte Carlo Permutation Testing
> **Examiner:** *"Why did you run a 10,000-draw Monte Carlo permutation test? Why wasn't a standard Chi-Square goodness-of-fit test good enough?"*

* **Defensible Answer:**
  > "A standard asymptotic Chi-Square goodness-of-fit test relies on large-sample assumptions where expected cell frequencies should ideally be $\ge 5$. 
  > When analyzing sparse diseases like Chikungunya ($N = 43$ total events across 12 months) or Malaria ($N = 70$), several monthly bins have expected counts near 3 or observed counts of 0 or 1. Asymptotic chi-square $p$-values become inaccurate under sparse conditions. 
  > The Monte Carlo permutation test reshuffles observed events across months 10,000 times with a fixed seed, generating an exact empirical null distribution without relying on asymptotic assumptions."

---

### Question 10: Exploratory Nature of Kendall’s W
> **Examiner:** *"In Phase 5C, you reported a Kendall's W of 0.530 for ADD with p = 0.016, but in your report you label it 'exploratory'. Why are you questioning your own p-value?"*

* **Defensible Answer:**
  > "Because Kendall’s $W$ assesses concordance across judges—in our case, the 4 baseline calendar years (2022, 2023, 2024, 2025) ranking 12 calendar months. 
  > The chi-square approximation for Kendall’s $W$ assumes a moderate to large number of raters ($m$). With only $m = 4$ profile years, the asymptotic approximation is not fully robust. 
  > Acknowledging this as 'exploratory' demonstrates methodological maturity: $W = 0.530$ indicates strong positive rank agreement across years, but we do not claim it as an asymptotic confirmatory proof."

---

### Question 11: Correlation vs. Climate Causation
> **Examiner:** *"You show that Dengue peaks in September and October. Can you conclude that weather caused the Dengue outbreak?"*

* **Defensible Answer:**
  > "No, Sir/Madam. We cannot conclude climate causation. 
  > Our project analyzed secondary disease surveillance logs from NCDC; we did not ingest, clean, or link external meteorological datasets (such as IMD daily precipitation, temperature, or humidity). 
  > The calendar months June through October are treated strictly as calendar labels, not as meteorological measurements. While public health literature often associates later-year periods with vector breeding, our dataset can only substantiate temporal coincidence in reporting, not biological or environmental causation."

---

### Question 12: Interpretation of District Concentration
> **Examiner:** *"Your analysis shows that 61.4% of all Malaria outbreaks in Maharashtra were in Gadchiroli and Chandrapur. Does this mean these two districts are the most dangerous places for malaria in the state?"*

* **Defensible Answer:**
  > "We must be very careful not to confuse **where outbreaks were reported** with **where disease actually occurred**. 
  > Gadchiroli and Chandrapur have specialized active surveillance programs that actively notify clusters. Other districts may manage malaria through passive outpatient treatment that never generates formal outbreak investigation logs. 
  > The 61.4% concentration proves that *surveillance-notified outbreak events* are heavily localized to Eastern Vidarbha, but it does not establish individual clinical infection risk."

---

### Question 13: Comparability of Partial-Year 2026
> **Examiner:** *"Food Poisoning events in 2026 W01–W32 were 49% higher than the historical baseline. Does this indicate a worsening food safety crisis in Maharashtra in 2026?"*

* **Defensible Answer:**
  > "Not necessarily. In Phase 5A and 5C, we investigated surveillance records and discovered that in 2026, **100% of Food Poisoning records were logged under the label 'Suspected Food Poisoning'**, compared to 58.6% in 2025 and 0% in 2022–2024. 
  > Food Poisoning recorded 19 reported events in 2026 W01–W32, while all 19 records used the 'Suspected Food Poisoning' label. The simultaneous occurrence of these observations does not establish a causal or administrative relationship. 
  > Therefore, we document the observed label distribution without inferring an underlying community surge in foodborne illness."

---

### Question 14: Displaced Peak Months Across Years
> **Examiner:** *"If Dengue peaked in September in 2022, October in 2023, June/July in 2024, and August in 2025, how can you claim it has a predictable seasonal peak?"*

* **Defensible Answer:**
  > "That finding is central to our stability-volatility synthesis in Phase 5D. 
  > While the aggregate multi-year curve peaks in October, our year-by-year analysis demonstrated that the specific peak reported-event month oscillates across a 4-month span within the broad June–October window. 
  > This is why we distinguish between a **general high-activity seasonal window** (June–October, accounting for 82.8% of events) and an **inflexible single peak month**. Surveillance preparedness should consider the broader five-month window rather than preparing for a single calendar month."

---

### Question 15: Low Statistical Significance for Chikungunya
> **Examiner:** *"All three of your statistical tests for Chikungunya had p-values above 0.35. Why didn't you just omit Chikungunya from your final report?"*

* **Defensible Answer:**
  > "Reporting negative and non-significant results is an essential ethical and scientific obligation in data science. 
  > Retaining Chikungunya and classifying it as **'D. Insufficient Evidence'** provides a crucial scientific finding: the official NCDC outbreak surveillance archive records only 43 events across four years (averaging 7 to 22 events/year), rendering it statistically indistinguishable from a uniform distribution. 
  > Highlighting this data sparsity prevents public health planners from designing interventions based on unstable, non-reproducible surveillance noise."

---

### Question 16: Practical Contribution of This Study
> **Examiner:** *"Given all these limitations, what is the actual practical value of your field project for Maharashtra public health authorities?"*

* **Defensible Answer:**
  > "The primary value lies in providing public health authorities with an **empirically audited, methodologically bounded baseline of official surveillance dynamics**:
  > 1. It alerts epidemiologists that **case totals are heavily influenced by single high-case outbreak records**, demonstrating that resource allocation should be planned around event frequency rather than volatile case sums.
  > 2. It demonstrates that **Malaria outbreak surveillance is 61.4% concentrated in two Eastern Vidarbha districts (43/70 events)**, supporting consideration of targeted surveillance review in those districts prior to May.
  > 3. It establishes that **Dengue surveillance preparedness should consider the elevated June–October window across 31 reporting districts**.
  > 4. It demonstrates that **Food Poisoning outbreak records represent discrete point-source events**, where case counts are heavily influenced by isolated high-case records.
  > In short, it provides realistic operational guidance while strictly avoiding false causal claims."
