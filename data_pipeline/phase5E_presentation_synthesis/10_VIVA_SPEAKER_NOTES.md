# 10. VIVA SPEAKER NOTES & DEFENSE MANUAL

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Document Code:** PHASE-5E-DOC-10  
**Candidate:** Khan Umar  
**Programme:** B.Sc. Data Science, Semester III  
**Institution:** RP Institute, affiliated to University of Mumbai  
**Academic Year:** 2026–27  

---

## SLIDE 1: TITLE & ACADEMIC IDENTITY

1. **Presentation Script (20–40s):**  
   "Respected examiners, guide, and faculty members, good morning. I am Khan Umar, presenting my Semester III Field Project in Data Science: *'Analysis of Seasonal Disease Patterns Using Government Health Data'*. This research investigates officially reported infectious disease outbreaks across Maharashtra from 2022 to 2026 using weekly surveillance bulletins from the National Centre for Disease Control."
2. **Why It Exists:** Formally introduces the candidate, institutional affiliation, study geography, surveillance source, and project title.
3. **Key Numbers:** 809 total curated records; 539 baseline records (2022–2025); 21,955 reported cases; 266 reported deaths; 45 comparison records (2026 W01–W32); 36 districts.
4. **Source:** Phase 5A (`01_DATASET_INTEGRITY_AUDIT.csv`) and Phase 5D (`08_RESEARCH_ALIGNMENT.md`).
5. **Key Metric Definition:** Outbreak Record — A single investigated cluster notification published by IDSP containing documented cases and deaths.
6. **Calculation Logic:** Summation of validated records across completed calendar years (2022–2025).
7. **Interpretation:** Establishes a four-year completed baseline for seasonal pattern analysis and a separate partial-year comparison set.
8. **Limitation:** Does not reflect primary clinical trial data or individual outpatient visits.
9. **Likely Examiner Questions:**  
   - *Q1:* "Why did you use government surveillance data rather than collecting primary hospital admission logs?"  
   - *Q2:* "Why is 2026 kept separate from 2022–2025?"
10. **Natural Student Answers:**  
    - *A1:* "NCDC/IDSP provides standardized, statewide coverage across all 36 districts of Maharashtra under uniform investigation protocols. Hospital data is usually facility-specific, localized, and lacks uniform outbreak definitions."  
    - *A2:* "2026 has only 32 weeks of data. Merging partial-year data with completed 52-week calendar years would introduce severe seasonal truncation and artificially dilute late-year disease peaks."
11. **Sentence You MUST NOT Say:**  
    *"This dataset represents every person who fell ill with these diseases in Maharashtra."*

---

## SLIDE 2: EPIDEMIOLOGICAL CONTEXT & HEALTH DATA CHALLENGES

1. **Presentation Script (20–40s):**  
   "Effective public health planning requires pre-positioning diagnostic kits, vector control measures, and medications before disease outbreaks surge. However, administrative government surveillance data is inherently noisy—affected by reporting lags, variable district notification thresholds, and extreme high-case clusters. The role of data science is to extract robust seasonal patterns while filtering out administrative distortions."
2. **Why It Exists:** Justifies the necessity of data science and statistical auditing when handling real-world secondary health records.
3. **Key Numbers:** 21,955 baseline reported cases; 266 reported deaths across 5 primary families.
4. **Source:** Phase 5D (`06_LIMITATIONS_SYNTHESIS.md`).
5. **Key Metric Definition:** Administrative Surveillance Noise — Artifacts arising from reporting delays, variable district investigation thresholds, and irregular institutional outbreak reporting.
6. **Calculation Logic:** Qualitative and methodological framing of secondary public health data.
7. **Interpretation:** Acknowledges data constraints upfront, demonstrating research maturity and scientific defensibility.
8. **Limitation:** Cannot correct for unnotified community infections that never triggered an official investigation.
9. **Likely Examiner Questions:**  
   - *Q1:* "What triggers an outbreak investigation in IDSP?"  
   - *Q2:* "How does secondary health data differ from experimental lab data?"
10. **Natural Student Answers:**  
    - *A1:* "An investigation is triggered when local health facilities detect an unusual clustering of cases exceeding baseline thresholds, prompting a Rapid Response Team (RRT) field visit."  
    - *A2:* "Secondary surveillance data is observational and administrative. It is subject to real-world reporting delays, missing weeks, and institutional cluster variations that require statistical filtering."
11. **Sentence You MUST NOT Say:**  
    *"Our data cleaning corrected all underreporting in the state of Maharashtra."*

---

## SLIDE 3: RESEARCH QUESTIONS & CENTRAL INQUIRY

1. **Presentation Script (20–40s):**  
   "We structured our investigation around four precise research questions: First, do reported outbreak notifications in Maharashtra follow statistically significant calendar-month concentrations? Second, are documented peak timing windows stable across years, or do they oscillate? Third, are seasonal patterns uniform statewide or spatially concentrated in specific districts? And fourth, how do rare, high-volume outbreak events distort our metrics?"
2. **Why It Exists:** Centers the presentation on four distinct, testable, and academically defensible hypotheses.
3. **Key Numbers:** 4 core research questions spanning 5 primary disease families and 48 baseline calendar months.
4. **Source:** Phase 5D (`07_OBJECTIVE_EVIDENCE_MATRIX.csv`).
5. **Key Metric Definition:** Research Inquiry Matrix — Differentiating seasonal concentration, inter-annual stability, spatial heterogeneity, and outlier distortion.
6. **Calculation Logic:** Logical decomposition of surveillance dynamics into four independent analytical axes.
7. **Interpretation:** Distinguishes static concentration from dynamic year-to-year reproducibility.
8. **Limitation:** Questions do not investigate biological pathogen mechanics or individual immunological susceptibility.
9. **Likely Examiner Questions:**  
   - *Q1:* "Why separate seasonal concentration from year-to-year stability?"  
   - *Q2:* "Can a disease have high concentration but low stability?"
10. **Natural Student Answers:**  
    - *A1:* "Because a disease could concentrate in just three months, but if those three months change every year, the pattern is unstable and operationally useless for planning."  
    - *A2:* "Yes, exactly. For instance, an irregular epidemic might occur entirely in three months in 2023 and three completely different months in 2024. That is why we compute Kendall's W across individual years."
11. **Sentence You MUST NOT Say:**  
    *"We set out to prove that rainfall directly causes these disease outbreaks."*

---

## SLIDE 4: RESEARCH OBJECTIVES & PROJECT SCOPE

1. **Presentation Script (20–40s):**  
   "To answer these questions, we formulated eight formal academic objectives, labeled OBJ-01 through OBJ-08. These cover data engineering from raw PDFs, monthly distribution analysis, quantitative concentration modeling, inter-annual rank stability, district spatial analysis, outlier sensitivity testing, 2026 out-of-sample comparison, and public health surveillance implications."
2. **Why It Exists:** Proves complete alignment with University of Mumbai B.Sc. Data Science curriculum and project guidelines.
3. **Key Numbers:** 8 formal objectives, mapped 1-to-1 to analytical phases in the repository.
4. **Source:** Phase 5D (`07_OBJECTIVE_EVIDENCE_MATRIX.csv`).
5. **Key Metric Definition:** Academic Project Scope — Complete roadmap from data ingestion to evidence-grounded interpretation.
6. **Calculation Logic:** Phase-wise execution matrix documented in the project manifest.
7. **Interpretation:** Establishes that all statistical models were pre-planned to fulfill specific academic objectives.
8. **Limitation:** Scope excludes predictive time-series machine learning due to the 4-year baseline sample size.
9. **Likely Examiner Questions:**  
   - *Q1:* "Why did you not use an ARIMA or LSTM model for forecasting?"  
   - *Q2:* "Which objective represents the core data science component?"
10. **Natural Student Answers:**  
    - *A1:* "ARIMA and LSTM models require long, continuous monthly time series—typically 10 to 20 years—with stationary properties. With 48 baseline months and sparse outbreak event counts, non-parametric concentration and rank concordance are statistically appropriate."  
    - *A2:* "Objectives 3, 4, and 6—quantitative concentration modeling, Kendall's W stability testing, and outlier sensitivity analysis."
11. **Sentence You MUST NOT Say:**  
    *"We built a predictive machine learning model to forecast disease outbreaks."*

---

## SLIDE 5: DATA SOURCE & GOVERNMENT PROVENANCE

1. **Presentation Script (20–40s):**  
   "Our data comes exclusively from the National Centre for Disease Control (NCDC), Directorate General of Health Services, Ministry of Health and Family Welfare, Government of India. We utilized the weekly outbreak bulletins of the Integrated Disease Surveillance Programme (IDSP). These reports document verified field investigations conducted by district Rapid Response Teams."
2. **Why It Exists:** Establishes primary government provenance and institutional authority of the underlying surveillance reports.
3. **Key Numbers:** 100% official government PDF archive; 2022 to 2026 Week 32 temporal coverage.
4. **Source:** Phase 1–4 (`PHASE4B_MASTER_DATASET_REBUILD_REPORT.md`).
5. **Key Metric Definition:** IDSP Weekly Bulletin — Standardized Form C reporting published weekly by the Ministry of Health and Family Welfare.
6. **Calculation Logic:** Direct archival compilation of published weekly PDF bulletins.
7. **Interpretation:** Ensures data authenticity, eliminating reliance on third-party aggregators or unverified web-scraped data.
8. **Limitation:** Constrained by what the government surveillance system detects and publishes.
9. **Likely Examiner Questions:**  
   - *Q1:* "How do you know these reports are genuine?"  
   - *Q2:* "What fields are reported in each outbreak entry?"
10. **Natural Student Answers:**  
    - *A1:* "They are downloaded directly from the official NCDC/IDSP portal, featuring official publication headers, reporting week numbers, and ministry documentation."  
    - *A2:* "Each table row provides the state, district, disease name, case count, death count, date of outbreak start, reporting week, and current status of investigation."
11. **Sentence You MUST NOT Say:**  
    *"We scraped this data from unofficial news websites and blogs."*

---

## SLIDE 6: DATASET SCOPE & EPIDEMIOLOGICAL COVERAGE

1. **Presentation Script (20–40s):**  
   "The curated dataset contains 809 total records from Maharashtra. Our primary baseline covers four completed calendar years—2022 through 2025—comprising 539 primary disease records, 21,955 reported cases, and 266 reported deaths across all 36 districts. In the 2023 archive, 49 weeks were published, with Weeks 15, 51, and 52 unpublished in the public archive. Week 50 is present and published."
2. **Why It Exists:** Defines the exact statistical boundaries, record counts, and temporal span of the baseline dataset.
3. **Key Numbers:** 809 total records; 539 baseline primary records; 21,955 cases; 266 deaths; 49 published weeks in 2023 (W15, W51, W52 unpublished; W50 present).
4. **Source:** Phase 5A (`01_DATASET_INTEGRITY_AUDIT.csv`).
5. **Key Metric Definition:** Baseline Dataset — Completed 4-year multi-year surveillance sample used to compute historical norms.
6. **Calculation Logic:** Aggregation of verified records where `year` is between 2022 and 2025 and `disease_family` belongs to the 5 primary cohorts.
7. **Interpretation:** Provides a stable, multi-year empirical sample across 48 calendar months for statistical analysis.
8. **Limitation:** Archive gaps in 2023 represent unobserved administrative periods; no synthetic data was inserted.
9. **Likely Examiner Questions:**  
   - *Q1:* "How did you handle the missing weeks in 2023?"  
   - *Q2:* "Why not insert zeros for the missing weeks?"
10. **Natural Student Answers:**  
    - *A1:* "Weeks 15, 51, and 52 were unavailable in the public NCDC repository. We recorded this as an external archive gap and calculated rates using observed weeks."  
    - *A2:* "Inserting zeros would be methodologically false because disease outbreaks certainly occurred during those weeks; they were simply not published. We chose honesty over artificial data imputation."
11. **Sentence You MUST NOT Say:**  
    *"Zero outbreaks occurred in Maharashtra during Weeks 15, 51, and 52 of 2023."*

---

## SLIDE 7: DATA ENGINEERING & VALIDATION PIPELINE

1. **Presentation Script (20–40s):**  
   "Our data engineering pipeline executed five systematic stages: automated PDF acquisition, tabular extraction into structured JSON, record-level validation, additive analytical cleaning, and dataset freezing. Crucially, all analytical records were programmatically linked to their source PDF/page provenance, supported by targeted manual verification and global integrity checks, with zero alteration of original raw disease strings."
2. **Why It Exists:** Demonstrates foundational Data Science competencies in building auditable, non-destructive data pipelines.
3. **Key Numbers:** 809 clean rows; 100% programmatic PDF page provenance; zero raw text overwriting.
4. **Source:** Phase 1–4 (`PHASE4B_MASTER_DATASET_REBUILD_REPORT.md`).
5. **Key Metric Definition:** Additive Data Cleaning — Appending analytical fields (standardized dates, weeks, taxonomy) while preserving original source text untouched.
6. **Calculation Logic:** Deterministic extraction and regex matching linked to PDF coordinate coordinates.
7. **Interpretation:** Guarantees complete reproducibility and auditability back to official government PDF bulletins.
8. **Limitation:** Extraction accuracy depends on the visual consistency of government PDF table formatting.
9. **Likely Examiner Questions:**  
   - *Q1:* "Did you modify any raw text strings in the dataset?"  
   - *Q2:* "How did you verify that extraction did not introduce errors?"
10. **Natural Student Answers:**  
    - *A1:* "No. We preserved the raw string in `disease_raw` and added our standardized taxonomy in separate columns. The original text is completely intact."  
    - *A2:* "We programmatically validated row counts, case totals, and dates against the PDF page headers, followed by targeted manual cross-checks of complex entries."
11. **Sentence You MUST NOT Say:**  
    *"I personally opened and manually typed every one of the 809 records by hand."*

---

## SLIDE 8: DISEASE FAMILY SELECTION & TAXONOMIC AUDIT

1. **Presentation Script (20–40s):**  
   "In our taxonomic audit, we screened 116 raw source strings from the surveillance reports, resolved them into 56 cleaned analytical labels, and grouped them into 30 disease families. To ensure statistical defensibility, we applied an objective screening framework: minimum 40 baseline records, presence in at least 3 baseline years, and public health priority. This yielded our five primary study cohorts, representing 92.5% of all baseline outbreaks."
2. **Why It Exists:** Explains how chaotic administrative labels were converted into standardized, statistically viable research cohorts.
3. **Key Numbers:** 116 raw source strings -> 56 cleaned analytical labels -> 30 disease families -> 5 primary study families (92.5% of baseline volume).
4. **Source:** Phase 5A (`02_PRIMARY_DISEASE_AUDIT.csv`).
5. **Key Metric Definition:** Taxonomic Screening Framework — Multi-tiered standardization resolving lexical, spelling, and administrative variations into stable clinical families.
6. **Calculation Logic:** Thresholding: $N \ge 40$, active years $\ge 3$, public health surveillance priority.
7. **Interpretation:** Filters out sparse, statistically unviable disease records while capturing the vast majority of disease outbreaks.
8. **Limitation:** Excludes clinically significant but statistically rare diseases like Cholera ($N=14$) and Leptospirosis ($N=18$).
9. **Likely Examiner Questions:**  
   - *Q1:* "Why did you exclude Leptospirosis if it is common in Mumbai during the monsoon?"  
   - *Q2:* "How did you group spelling variants like 'Dengue?'?"
10. **Natural Student Answers:**  
    - *A1:* "Leptospirosis had only 18 reported outbreak records over four years. In a 12-month calendar analysis, 18 records provide fewer than 1.5 events per month, which invalidates non-parametric statistical tests."  
    - *A2:* "Spelling variants and question-mark annotations in administrative records were mapped to the confirmed clinical family while preserving the exact raw label in `disease_raw`."
11. **Sentence You MUST NOT Say:**  
    *"We simply picked the five diseases we felt like studying."*

---

## SLIDE 9: QUANTITATIVE SEASONALITY FRAMEWORK

1. **Presentation Script (20–40s):**  
   "To quantify seasonality without subjective bias, we implemented a multi-metric statistical framework. We calculated Monthly Seasonal Indices ($S_m$), where values over 100 indicate above-average concentration. We computed Top-3 Concentration Ratios ($CR_3$), Coefficients of Variation ($CV$), Normalized Shannon Entropy, and Gini inequality coefficients to evaluate temporal dispersion across calendar months."
2. **Why It Exists:** Provides mathematical definitions and empirical rigor for determining seasonal patterns.
3. **Key Numbers:** Baseline annualized monthly average = 100.0 on the Seasonal Index scale; 5 quantitative metrics.
4. **Source:** Phase 5B (`05_SEASONAL_STATISTICS.csv`) and Phase 5C (`01_SEASONAL_CONCENTRATION.csv`).
5. **Key Metric Definition:** Seasonal Index ($S_m$) — The percentage ratio of mean monthly event volume to the annualized monthly average.
6. **Calculation Logic:** $S_m = 100 \times (\bar{X}_m / \bar{X}_{\text{annual}})$, where $\bar{X}_{\text{annual}} = \frac{1}{12}\sum \bar{X}_m$.
7. **Interpretation:** Provides a standardized baseline where $S_m = 200$ means double the average monthly outbreak frequency.
8. **Limitation:** $S_m$ is a descriptive index and does not model meteorological time-series covariates.
9. **Likely Examiner Questions:**  
   - *Q1:* "What does a Seasonal Index of 235 mean?"  
   - *Q2:* "Why use both CV and Gini coefficient?"
10. **Natural Student Answers:**  
    - *A1:* "An index of 235 means that in that specific month, reported outbreak events were 2.35 times—or 135% above—the average monthly expectation."  
    - *A2:* "CV measures relative dispersion around the mean, while Gini measures distribution inequality across months. Using both ensures our concentration ranking is robust."
11. **Sentence You MUST NOT Say:**  
    *"The seasonal index gives the exact probability that an individual will catch the disease in that month."*

---

## SLIDE 10: SEASONAL PROFILES OF PRIMARY DISEASE FAMILIES

1. **Presentation Script (20–40s):**  
   "Examining seasonal indices across the 12 calendar months reveals distinct reporting profiles: Dengue shows strong concentration in the late monsoon and post-monsoon (June–October accounts for 82.8% of events), peaking in October ($S_m = 235.3$). Malaria concentrates in the early monsoon (May–July accounts for 51.4% of events; June $S_m = 257.1$). Acute Diarrheal Disease concentrates in the core monsoon (June–August, 43.1%), while Food Poisoning exhibits bimodal winter and spring peaks."
2. **Why It Exists:** Directly presents the primary empirical findings answering Research Question 1.
3. **Key Numbers:** Dengue Jun–Oct: 82.8% (Oct $S_m = 235.3$); Malaria May–Jul: 51.4% (Jun $S_m = 257.1$); ADD Jun–Aug: 43.1% (Jul $S_m = 172.5$); Food Poisoning Jan–Feb & Apr–May: 55.1%.
4. **Source:** Phase 5B (`02_SEASONAL_INDICES.csv`) and Key Visual `chart_seasonal_index_heatmap.png`.
5. **Key Metric Definition:** Monthly Peak Concentration Window — The calendar-month span encompassing the highest density of reported outbreaks.
6. **Calculation Logic:** Aggregation of multi-year monthly events divided by total baseline disease records.
7. **Interpretation:** Demonstrates clear, disease-specific temporal separation in outbreak notifications.
8. **Limitation:** Reflects notification timing, which may include a 1-to-2 week administrative investigation lag from symptom onset.
9. **Likely Examiner Questions:**  
   - *Q1:* "Why does Dengue peak in October after the monsoon rains decrease?"  
   - *Q2:* "Why does Food Poisoning show two peaks instead of one?"
10. **Natural Student Answers:**  
    - *A1:* "Aedes aegypti breeding peaks in stagnant fresh water that accumulates after heavy rains cease, combined with warm post-monsoon temperatures, creating an established biological lag."  
    - *A2:* "Food Poisoning is not driven by continuous rainfall. Its bimodal distribution in January–February and April–May reflects discrete cluster notifications occurring during specific calendar periods."
11. **Sentence You MUST NOT Say:**  
    *"This graph proves that monsoon rainfall is the sole cause of Dengue outbreaks."*

---

## SLIDE 11: CROSS-DISEASE COMPARISON & CONCENTRATION METRICS

1. **Presentation Script (20–40s):**  
   "Cross-disease comparison groups our five families into three clear concentration tiers: High Concentration is seen in Malaria ($CV = 0.753, CR_3 = 51.4\%$) and Dengue ($CV = 0.736, CR_3 = 50.5\%, \text{Gini} = 0.414$). Moderate Concentration is seen in Food Poisoning ($CV = 0.564$) and ADD ($CV = 0.524$). Diffuse Concentration is seen in Chikungunya ($CV = 0.515, CR_3 = 39.5\%, \text{Gini} = 0.289$). Vector-borne disease reports show significantly higher seasonal concentration than enteric diseases."
2. **Why It Exists:** Quantitatively classifies and compares concentration levels across all five disease families.
3. **Key Numbers:** Malaria $CV = 0.753$; Dengue $CV = 0.736$; ADD $CV = 0.524$; Chikungunya $CR_3 = 39.5\%$.
4. **Source:** Phase 5C (`01_SEASONAL_CONCENTRATION.csv`) and Key Visual `chart_seasonal_concentration.png`.
5. **Key Metric Definition:** Top-3 Concentration Ratio ($CR_3$) — The percentage of total baseline events occurring in the top 3 calendar months.
6. **Calculation Logic:** Sum of events in top 3 months divided by total 4-year baseline events for that disease.
7. **Interpretation:** Proves that vector-borne diseases concentrate more tightly in specific calendar windows than enteric or diffuse infections.
8. **Limitation:** $CR_3$ does not indicate whether the top three months are contiguous or separated across the year.
9. **Likely Examiner Questions:**  
   - *Q1:* "Why does Chikungunya have low concentration if it is also transmitted by Aedes mosquitoes?"  
   - *Q2:* "What does a Gini coefficient of 0.414 mean for Dengue?"
10. **Natural Student Answers:**  
    - *A1:* "Chikungunya surveillance in Maharashtra is data-sparse ($N = 43$), with sporadic urban reporting that obscures a unified statewide seasonal curve."  
    - *A2:* "It indicates strong inequality in outbreak distribution across months—confirming that outbreaks are heavily clustered into specific months rather than spread evenly across the year."
11. **Sentence You MUST NOT Say:**  
    *"Chikungunya has no biological seasonality."*

---

## SLIDE 12: INTER-ANNUAL STABILITY & PEAK TIMING DYNAMICS

1. **Presentation Script (20–40s):**  
   "To determine whether these seasonal profiles repeat consistently across years, we evaluated inter-annual rank stability using Kendall's coefficient of concordance ($W$). Acute Diarrheal Disease demonstrates the highest, statistically significant rank concordance across years ($W = 0.530, p = 0.016$ under FDR control). Dengue displays moderate concordance ($W = 0.405, p = 0.086$), with peak months oscillating within a 5-month window. Chikungunya is unstable ($W = 0.150, p = 0.832$)."
2. **Why It Exists:** Evaluates whether observed seasonal patterns repeat across individual years or represent single-year anomalies.
3. **Key Numbers:** ADD $W = 0.530$ ($p = 0.016$, FDR-significant); Dengue $W = 0.405$ ($p = 0.086$, non-significant); Malaria $W = 0.319$ ($p = 0.229$, non-significant); Chikungunya $W = 0.150$ ($p = 0.832$, non-significant).
4. **Source:** Phase 5C (`03_SEASONAL_STABILITY.csv`) and Key Visual `chart_seasonal_stability_heatmap.png`.
5. **Key Metric Definition:** Kendall's Coefficient of Concordance ($W$) — A non-parametric statistic measuring agreement among multiple rankings of $N$ objects across $m$ judges (here, 12 months across 4 years).
6. **Calculation Logic:** $W = 12S / [m^2(n^3 - n)]$, where $m = 4$ years and $n = 12$ calendar months.
7. **Interpretation:** ADD shows reproducible monthly rank patterns across all four baseline years; Dengue shows moderate consistency with peak shifts.
8. **Limitation:** Evaluates only four annual profile vectors ($m = 4$), limiting statistical power for non-parametric hypothesis testing.
9. **Likely Examiner Questions:**  
   - *Q1:* "Why is Kendall's W non-significant for Dengue ($p = 0.086$) if its concentration is so high?"  
   - *Q2:* "What does Kendall's W measure in simple terms?"
10. **Natural Student Answers:**  
    - *A1:* "Kendall's W tests whether the exact 12-month rank order repeats identically every year. In 2024, Dengue peaked earlier in June/July, whereas in 2023 it peaked in October. This peak shift reduces rank concordance across a 4-year sample, even though all years concentrated in the second half of the year."  
    - *A2:* "It measures how consistently the 12 calendar months maintain their relative ranking from Year 1 to Year 4."
11. **Sentence You MUST NOT Say:**  
    *"Kendall's W proves that climate change shifted the peak of Dengue."*

---

## SLIDE 13: GEOGRAPHIC DISTRIBUTION & DISTRICT CONCENTRATION

1. **Presentation Script (20–40s):**  
   "Spatial analysis reveals profound geographic focalization. Malaria is heavily concentrated in eastern Vidarbha: two forested districts—Gadchiroli (27 events, 38.6%) and Chandrapur (16 events, 22.9%)—account for 61.4% of all reported Malaria outbreaks in Maharashtra. Chikungunya shows urban focalization in Pune (25.6%). In contrast, Dengue and ADD display broad statewide reporting across 31 and 33 districts respectively."
2. **Why It Exists:** Demonstrates that statewide seasonal curves can be driven by intense localized surveillance in specific endemic districts.
3. **Key Numbers:** Gadchiroli + Chandrapur = 61.4% of Malaria events; Pune = 25.6% of Chikungunya events; Dengue reported in 31 districts; ADD reported in 33 districts.
4. **Source:** Phase 5C (`08_DISTRICT_SEASON_ANALYSIS.csv`).
5. **Key Metric Definition:** Spatial Concentration Ratio — The percentage share of total statewide outbreak records contributed by specific administrative districts.
6. **Calculation Logic:** District outbreak count divided by total baseline disease records.
7. **Interpretation:** Malaria's statewide early-monsoon seasonal curve essentially reflects the surveillance profile of eastern Vidarbha rather than uniform statewide transmission.
8. **Limitation:** Reflects district reporting sensitivity and notification efficiency, not necessarily true per-capita incidence across populations.
9. **Likely Examiner Questions:**  
   - *Q1:* "Why are Malaria outbreaks concentrated in Gadchiroli and Chandrapur?"  
   - *Q2:* "Does this mean other districts in Maharashtra are completely free of Malaria?"
10. **Natural Student Answers:**  
    - *A1:* "Eastern Vidarbha has extensive forest cover, perennial streams, high tribal populations, and specific Anopheles vector habitats that sustain endemic transmission and active surveillance."  
    - *A2:* "No. Other districts may have sporadic clinical cases, but Gadchiroli and Chandrapur have frequent community clusters that cross the threshold for official outbreak investigations."
11. **Sentence You MUST NOT Say:**  
    *"Malaria only exists in two districts in Maharashtra."*

---

## SLIDE 14: 2026 OUT-OF-SAMPLE PARTIAL-YEAR COMPARISON

1. **Presentation Script (20–40s):**  
   "We evaluated 2026 Weeks 01 to 32 ($N = 45$) as an out-of-sample comparison against historical 4-year equivalent averages. Acute Diarrheal Disease recorded 18 events, closely tracking its historical mean of 21.8 ($-17.2\%$). Dengue recorded 6 events versus an expected mean of 22.8 ($-73.6\%$), but this represents severe seasonal truncation, since 55.4% of Dengue outbreaks historically occur after Week 32. Food Poisoning showed elevated reporting ($+49.0\%$), while Malaria showed a marked surveillance deficit ($-91.7\%$, 1 event)."
2. **Why It Exists:** Validates baseline seasonal expectations against prospective, unseen surveillance data without invalid forecasting.
3. **Key Numbers:** 45 total primary records in 2026 W01–W32; ADD: 18 events (vs 21.8 historical mean); Dengue: 6 events (vs 22.8); Food Poisoning: 19 events (vs 12.8); Malaria: 1 event (vs 12.0).
4. **Source:** Phase 5C (`07_2026_OUT_OF_SAMPLE_COMPARISON.csv`) and Key Visual `chart_2026_comparison.png`.
5. **Key Metric Definition:** Out-of-Sample Partial-Year Comparison — Benchmarking observed surveillance data against historical equivalent-period averages (Weeks 01–32).
6. **Calculation Logic:** Comparing 2026 W01–W32 counts to the mean of W01–W32 counts from 2022–2025.
7. **Interpretation:** Verifies that enteric diseases follow expected early-year baselines, while vector-borne diseases reflect expected seasonal truncation.
8. **Limitation:** Cannot be used to predict or extrapolate full-year 2026 totals or late-year (Weeks 33–52) outbreak activity.
9. **Likely Examiner Questions:**  
   - *Q1:* "Does the low Dengue count in 2026 mean Dengue was successfully eradicated?"  
   - *Q2:* "Can you forecast the total number of Dengue outbreaks for the full year 2026?"
10. **Natural Student Answers:**  
    - *A1:* "No, absolutely not. Over 55% of Dengue outbreaks historically occur after Week 32, during September and October. The observed low count reflects seasonal truncation, not disease eradication."  
    - *A2:* "No. Forecasting full-year totals from truncated partial-year data violates time-series principles. We treat 2026 strictly as an out-of-sample monitoring check."
11. **Sentence You MUST NOT Say:**  
    *"Our model predicts that 2026 will have fewer Dengue cases than 2025."*

---

## SLIDE 15: OUTLIER SENSITIVITY & EVENT-CASE DIVERGENCE

1. **Presentation Script (20–40s):**  
   "A critical insight from our sensitivity analysis is the mathematical divergence between outbreak event frequency and reported case counts. In Acute Diarrheal Disease, February ranks #8 in events (5.9%) but #1 in reported cases (17.5%, 1,582 cases), caused by a single 1,000-case institutional outbreak in Nanded. Similarly, February Food Poisoning cases are dominated by three high-case outbreak records (Kolhapur 651, Parbhani 629, Solapur 335 = 1,615 cases), representing an extreme outlier effect. Excluding these outliers completely restores alignment between events and cases."
2. **Why It Exists:** Exposes how isolated, high-volume outbreaks distort aggregate surveillance metrics, proving why events must be analyzed separately from cases.
3. **Key Numbers:** Nanded ADD outbreak: 1,000 cases (MAHA-2024-W06-001); 3 Food Poisoning outbreaks: 1,615 cases; Dengue Event $CR_3$ (50.5%) vs Case $CR_3$ (49.9%).
4. **Source:** Phase 5C (`05_EVENT_CASE_DIVERGENCE.csv`, `06_OUTLIER_SENSITIVITY.csv`) and Key Visual `chart_event_case_divergence.png`.
5. **Key Metric Definition:** Event-Case Divergence — The mathematical disparity between the percentage distribution of outbreak events and the percentage distribution of patient case counts across calendar months.
6. **Calculation Logic:** Re-computing monthly shares and peak months before and after pruning top-tier influential records.
7. **Interpretation:** High case counts in specific months can be driven by a few rare, high-volume events rather than widespread community transmission.
8. **Limitation:** Sensitivity testing demonstrates mathematical leverage; it does not mean outlier outbreaks should be deleted from historical records.
9. **Likely Examiner Questions:**  
   - *Q1:* "Did you delete these outlier records from your final dataset?"  
   - *Q2:* "Why is Dengue not affected by outliers in the same way?"
10. **Natural Student Answers:**  
    - *A1:* "No, we never delete verified historical records. We performed sensitivity testing—calculating metrics with and without the outliers—to understand how much single events distorted aggregate case curves."  
    - *A2:* "Dengue outbreaks are community-based vector clusters that typically report 10 to 30 cases per event. Enteric diseases can contaminate a single water pipe or institution, generating hundreds or thousands of cases at once."
11. **Sentence You MUST NOT Say:**  
    *"We threw out the Nanded outbreak because it ruined our seasonal graph."*

---

## SLIDE 16: SURVEILLANCE BOUNDARIES & METHODOLOGICAL LIMITATIONS

1. **Presentation Script (20–40s):**  
   "Academic defensibility requires establishing strict limitation boundaries: First, IDSP data capture investigated outbreak clusters meeting notification thresholds, NOT total population incidence or endemic community burden. Second, official 2023 archives have three unpublished weeks (Weeks 15, 51, 52). Third, specific years dominate certain disease baselines (2023 accounts for 51% of Dengue records). And fourth, meteorological variables like rainfall and temperature were not co-modeled, meaning we demonstrate calendar-month concentration rather than direct climatic causation."
2. **Why It Exists:** Preempts critical examiner questions by demonstrating complete awareness of data boundaries and public health constraints.
3. **Key Numbers:** 49 published weeks in 2023; 51.0% single-year Dengue concentration; 0 meteorological sensors co-modeled; 9 explicit unsupported claims cataloged.
4. **Source:** Phase 5D (`06_LIMITATIONS_SYNTHESIS.md`, `10_UNSUPPORTED_CLAIMS.md`).
5. **Key Metric Definition:** Surveillance Threshold Bias — The systematic divergence between official outbreak notifications and true community infection rates.
6. **Calculation Logic:** Qualitative synthesis of surveillance system architecture and reporting protocols.
7. **Interpretation:** Protects the research from overclaiming; ensures conclusions remain strictly within the evidence.
8. **Limitation:** Inherent to all secondary passive surveillance analyses globally.
9. **Likely Examiner Questions:**  
   - *Q1:* "Can you conclude that monsoon rainfall causes the Dengue peak?"  
   - *Q2:* "Can your analysis tell me my personal risk of getting Malaria?"
10. **Natural Student Answers:**  
    - *A1:* "No. We demonstrated empirical calendar-month concentration. Asserting that rainfall caused the surge would require linking local meteorological data to outbreak coordinates, which was outside our dataset scope."  
    - *A2:* "No. Our dataset captures administrative outbreak investigation records across districts, not individual clinical risk or population incidence rates."
11. **Sentence You MUST NOT Say:**  
    *"Our findings prove that heavy rainfall directly increases disease transmission across Maharashtra."*

---

## SLIDE 17: DEFENSIBLE CONCLUSIONS & SURVEILLANCE IMPLICATIONS

1. **Presentation Script (20–40s):**  
   "In conclusion, our data science pipeline establishes that vector-borne diseases exhibit observed seasonal concentration in surveillance records, while enteric diseases display regular mid-monsoon elevations distorted by high-case point-source clusters. Public health logistics can directly benefit: pre-positioning Malaria diagnostics in eastern Vidarbha by April–May; activating urban Dengue vector control by August; and conducting drinking water pipeline pressure checks ahead of June–August."
2. **Why It Exists:** Connects empirical data science findings to actionable, evidence-grounded public health operational preparedness.
3. **Key Numbers:** Malaria target window: May–Jul; Dengue target window: Aug–Oct; ADD target window: Jun–Aug.
4. **Source:** Phase 5D (`09_FINAL_ANALYTICAL_CONCLUSIONS.md`).
5. **Key Metric Definition:** Operational Pre-Positioning Windows — Calendar intervals during which medical supplies and vector control squads should be deployed ahead of peak outbreak reporting.
6. **Calculation Logic:** Identification of 3-month leading indicators preceding documented peak seasonal index months.
7. **Interpretation:** Transitions public health administration from reactive outbreak response to proactive, calendar-informed preparedness.
8. **Limitation:** Applies strictly to public health logistics; does not prescribe individual clinical treatment or medical guidelines.
9. **Likely Examiner Questions:**  
   - *Q1:* "What is the practical value of your research to the Maharashtra Health Department?"  
   - *Q2:* "How does separating events from cases change public health response?"
10. **Natural Student Answers:**  
    - *A1:* "It provides an empirical, calendar-specific timeline for allocating test kits, vector spraying, and hospital fever beds weeks before the historical peak occurs, optimizing resource deployment."  
    - *A2:* "It shows that responding to enteric outbreaks requires two distinct strategies: routine community water sanitation during monsoon, and rapid emergency containment protocols for high-capacity institutions."
11. **Sentence You MUST NOT Say:**  
    *"Doctors should change their clinical drug prescriptions based on our seasonal index findings."*

---

## SLIDE 18: ACADEMIC REFERENCES, FIELDWORK STATUS & VIVA READINESS

1. **Presentation Script (20–40s):**  
   "This project is grounded in authoritative government surveillance data from NCDC/IDSP, aligned with University of Mumbai guidelines, and supported by peer-reviewed epidemiological and statistical literature. In accordance with university field-project requirements, we note that secondary data engineering and surveillance analysis are complete and audited, while primary on-site community surveys are noted as 'not yet evidenced in current repository' for final project submission. Thank you, and I welcome your questions."
2. **Why It Exists:** Provides academic attribution, ensures rubric transparency, and formally invites examiner questions.
3. **Key Numbers:** 11 verified reference sources; 50 registered claims; 8 selected analytical charts.
4. **Source:** Phase 5E (`09_PRESENTATION_REFERENCES.md`, `11_PHASE5E_REVIEW.md`).
5. **Key Metric Definition:** Academic Compliance Status — Transparent documentation of completed secondary analysis alongside identified field-visit requirements.
6. **Calculation Logic:** Compliance audit against University of Mumbai Semester III syllabus and evaluation rubrics.
7. **Interpretation:** Demonstrates academic honesty and ethical research standards by refusing to fabricate fieldwork.
8. **Limitation:** Secondary surveillance analysis cannot replace direct ethnographic or primary clinical observation.
9. **Likely Examiner Questions:**  
   - *Q1:* "What would be your next step if you continued this project?"  
   - *Q2:* "Did you conduct in-person community surveys?"
10. **Natural Student Answers:**  
    - *A1:* "I would link satellite meteorological data (ERA5 rainfall and temperature) to our district outbreak coordinates and incorporate hospital inpatient denominators to calculate true incidence rates."  
    - *A2:* "No. We conducted an exhaustive secondary data engineering and surveillance analysis of apex government records. In strict compliance with academic honesty, we have recorded primary field visits as not yet evidenced in the current repository."
11. **Sentence You MUST NOT Say:**  
    *"I went out and surveyed 100 patients in the field for this secondary dataset."*
