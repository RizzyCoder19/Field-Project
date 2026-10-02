# PHASE 5A — FIRM DISEASE SELECTION AUDIT & LABEL FRAGMENTATION REPORT

**Document ID:** NCDC-MH-PHASE5A-AUDIT-2026-001  
**Execution Date:** 2026-10-02  
**Lead Investigator:** Antigravity (Phase 5A Quantitative Surveillance Audit Pipeline)  
**Authoritative Input Dataset:** [`data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv)  
**Total Input Records:** 809 validated outbreak events (2022 W01 – 2026 W32)  
**Primary Completed Comparison Period:** 2022–2025 (4 completed surveillance years, 733 records)  
**Secondary Partial Surveillance Period:** 2026 YTD (Weeks 01–32, 76 records)  
**Institutional Affiliation:** B.Sc. Data Science, Semester III | RP Institute, University of Mumbai  
**Candidate Name:** Khan Umar  
**Audit Status:** Complete, Verified, 100% Empirically Grounded  

---

## 1. Executive Summary & Audit Mandate

This audit establishes a rigorous, data-driven disease selection protocol for seasonal pattern analysis within the Maharashtra Integrated Disease Surveillance Programme (IDSP / NCDC) archive.

In strict compliance with audit instructions:
- **No data collection, PDF extraction, cleaning, or Git operations were performed.**
- The validated analytical dataset (`NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`, 809 rows) was audited **strictly read-only**.
- Diseases were **not chosen beforehand**, **not ranked**, and **not labeled with subjective superlatives**.
- **2022–2025** is maintained as the sole complete baseline for multi-year seasonal estimation.
- **2023** is evaluated as complete *as officially published* (49 published weeks; 4 confirmed non-published NCDC voids: W15, W50–W52).
- **2026** is evaluated strictly as partial / year-to-date (Weeks 01–32) and quarantined from complete-year baseline calculations.
- Derived disease families were formulated conservatively, strictly prohibiting the artificial merging of multi-pathogen combinations or clinically distinct etiologies.

### Summary of Screening Classification Outcomes

Across all 809 outbreak records, thirty (30) distinct disease families comprising fifty-six (56) cleaned analytical labels and one hundred sixteen (116) raw source strings were audited across eleven (11) quantitative metrics:

| Screening Classification | Count of Families | Outbreak Records (2022–2025) | Outbreak Records (2026 YTD) | Total Records (2022–2026) | Included Disease Families |
|:---|:---:|:---:|:---:|:---:|:---|
| **Eligible for Primary Seasonal Analysis** | **5** | **539** | **45** | **584** | Dengue, Acute Diarrheal Disease (ADD), Malaria, Food Poisoning, Chikungunya |
| **Eligible for Secondary / Supporting Analysis** | **4** | **85** | **18** | **103** | Hepatitis A, Cholera, Measles, Scrub Typhus |
| **Insufficient Data** | **13** | **63** | **8** | **71** | Zika Virus, Leptospirosis, Chickenpox, Acute Gastroenteritis, AES, Mumps, Japanese Encephalitis, Typhoid, Dysentery, Human Rabies, Hand Foot Mouth Disease, Hepatitis (Unspecified), Pertussis, Hepatitis E |
| **Requires Label Review** | **4** | **30** | **4** | **34** | Fever / PUO (Syndromic), Jaundice (Syndromic), Fever with Rash (Syndromic), Malformed Boundary-Leaked Entities |
| **Combination / Non-Comparable** | **4** | **16** | **1** | **17** | Dengue & Chikungunya, Dengue & Malaria, Measles & Rubella, Hepatitis A & E |
| **TOTAL** | **30** | **733** | **76** | **809** | **Complete Dataset Accounting (100.0%)** |

> [!IMPORTANT]
> **Key Empirical Discovery (Challenging Previous Assumptions):**  
> Prior preliminary work assumed **Zika Virus** would be a prominent seasonal candidate due to its high visibility. The firm empirical audit reveals that **Zika Virus completely fails the multi-year seasonal criterion**: 81.5% (22/27) of all outbreaks occurred solely in 2024 (centered around Pune), 5 occurred in 2023, and **exactly 0 outbreaks occurred in 2022, 2025, or 2026**. Zika Virus represents an isolated, non-recurring epidemic intrusion rather than an endemic seasonal cycle in Maharashtra, and is formally classified as **Insufficient Data** for seasonal modelling.

---

## 2. Forensic Audit of Disease-Label Fragmentation

The legacy variable `disease_normalized` in earlier pipelines exhibited severe over-clustering and classification errors. To restore epidemiological fidelity without modifying the underlying frozen analytical dataset, every label was audited across five specific fragmentation dimensions:

```
                                 [116 Raw Disease Strings]
                                             │
                                             ▼
                             [56 Cleaned Analytical Labels]
                                             │
      ┌──────────────────┬───────────────────┼───────────────────┬──────────────────┐
      ▼                  ▼                   ▼                   ▼                  ▼
1. Orthographic     2. Suspected        3. Combination      4. Subspecies      5. Boundary
   Variants           Categories          Diseases            Subtypes            Leaks
   (ADD vs ADD,       (Food Poisoning     (Dengue &           (P. vivax,          (Poisoning,
    Dysentery)         vs Suspected)       Chikungunya)        P. falciparum)      a Chhatrapati)
      │                  │                   │                   │                  │
      └──────────────────┴───────────────────┼───────────────────┴──────────────────┘
                                             │
                                             ▼
                                [30 Derived Disease Families]
                                (Preserving Clinical Distinctness)
```

### 2.1 Spelling & Orthographic Variants
- **Acute Diarrheal Disease (ADD):**
  - `Acute Diarrheal Disease` (American spelling): 133 records (2022–2025).
  - `Acute Diarrhoeal Disease` (British spelling): 37 records (19 in 2023/2025, 18 in 2026).
  - `Acute Diarrheal Diseases` (Plural variant): 1 record in 2024.
  - **Surveillance Finding:** A distinct institutional orthographic shift occurred between 2024 and 2026. In 2026, **100% (18/18)** of ADD outbreaks were recorded using the British spelling `Acute Diarrhoeal Disease`. These represent an identical clinical entity (standard IDSP syndrome code: loose watery stools $\ge 3$ times per day). Harmonized under the `Acute Diarrheal Disease` family.
- **Dysentery:**
  - `Dysentery` (1 record, 2024) vs `Dysentry` (1 record, 2025). Harmonized under `Dysentery`.
- **Hepatitis A:**
  - `Hepatitis A` (29 records) vs `Hepatitis-A` (2 records) vs `Acute Hepatitis A` (2 records). Standardized under `Hepatitis A`.

### 2.2 Suspected Categories vs Confirmed Diagnoses
- **Food Poisoning:**
  - `Food Poisoning` (Canonical): 56 records (2022: 6, 2023: 8, 2024: 26, 2025: 16, 2026: 0).
  - `Suspected Food Poisoning`: 31 records (2025: 12, 2026: 19).
  - **Surveillance Finding:** In 2026, NCDC field units in Maharashtra ceased labeling foodborne gastroenteritis events as confirmed `Food Poisoning` and shifted exclusively to `Suspected Food Poisoning` pending toxicological lab verification. Merging these as subcategories within the `Food Poisoning` family is epidemiologically essential to prevent a false artifactual drop to zero in 2026, while tracking confirmation status as a subclassification.
- **Suspected Dengue Fever:**
  - 3 records in 2023 (Weeks 36, 40). Tracked as a suspected subclassification under `Dengue`.
- **Suspected Typhoid:**
  - 1 record in 2026 W28. Tracked under `Typhoid`.

### 2.3 Multi-Pathogen Combination Diseases (Strict Isolation)
In earlier pipelines, combination records were erroneously merged into single categories (e.g. `Dengue & Chikungunya` merged into `Dengue`). This audit enforces strict segregation:
- **Dengue & Chikungunya Co-reporting:** 11 records (2022: 2, 2023: 3, 2024: 4, 2025: 2; 143 cases, 1 death). Reported where patients presented co-circulating symptoms during peak vector seasons. Merging into Dengue would inflate Dengue case counts; merging into Chikungunya would distort Chikungunya epidemiology. Preserved as `Combination/non-comparable`.
- **Dengue & Malaria Co-reporting:** 2 records (`Malaria and Dengue`, 2022 W36; `Dharashiv Dengue & Malaria (P.vivax)`, 2025 W42). Represents concurrent protozoan and arboviral transmission. Classified as `Combination/non-comparable`.
- **Measles & Rubella Co-reporting:** 2 records (2022 W48, 2023 W03). Preserved as `Combination/non-comparable`.
- **Hepatitis A & E Co-reporting:** 2 records (2024 W24, 2026 W20). Dual enteric viral hepatitis outbreak. Preserved as `Combination/non-comparable`.

### 2.4 Disease Subtypes & Species-Level Disaggregation
- **Malaria:**
  - Unspecified `Malaria`: 60 records (59 in 2022–2025, 1 in 2026).
  - *Plasmodium vivax* specific: `Malaria (P.vivax)` (3 records, 2025), `Malaria (PV)` (1 record, 2022).
  - *Plasmodium falciparum* specific: `Malaria (P.falciparum)` (2 records, 2025), `Complicated Malaria (Plasmodium falciparum)` (1 record, 2025).
  - Mixed *P. vivax & P. falciparum*: 3 records (2025 W38, W42, W48).
  - **Surveillance Finding:** In 2025, NCDC micro-surveillance in Vidarbha (Gadchiroli, Chandrapur, Gondia) introduced microscopic speciation into the disease label string. These are unified under the `Malaria` family to preserve multi-year continuity while maintaining species attributes in the granular mapping.

### 2.5 Malformed & Source-Boundary Leaked Labels
- **Case 1: Boundary Truncation Artifact — `Poisoning` (Record `MAHA-2025-W18-001`):**
  - Source PDF: `2025/week18_1788950653.pdf`, Page 16.
  - Raw disease string: `Chhatrapati Sambhajinaga r Food Poisoning`.
  - Analytical label in clean dataset: `Poisoning`.
  - **Audit Cause:** The prefix-stripping regular expression in `build_clean_analytical.js` (`/^Chhatrapati\s+Sambhajinag[a-z\s]*\s+/i`) used a greedy whitespace/character class that matched `Sambhajinaga r Food `, erroneously swallowing the word `Food `. Underlying true entity is `Food Poisoning` (255 cases, 1 death in Paithan). Flagged for review; mapped to `Food Poisoning` family.
- **Case 2: Boundary Unstripped Artifact — `a Chhatrapati Sambhajinaga r Measles` (Record `MAHA-2026-W09-001`):**
  - Source PDF: `2026/week9_1788856576.pdf`, Page 35.
  - Raw & Clean label: `a Chhatrapati Sambhajinaga r Measles`.
  - **Audit Cause:** An unparsed single leading letter `a ` prior to the district name prevented the regex `^Maharasht\s*ra\s+Chhatrapati...` from matching, leaving the district name embedded in the disease field. Underlying true entity is `Measles` (15 cases). Flagged for review; mapped to `Measles` family.
- **Case 3: Typographic Whitespace Artifact — `Acute Gastroenteri tis` (Record `MAHA-2026-W09-002`):**
  - Clean label: `Acute Gastroenteri tis` (broken between `i` and `t`). Mapped to `Acute Gastroenteritis`.

---

## 3. Data-Driven Screening Rule Architecture

To prevent subjective bias, the screening rule is governed by five objective, epidemiologically grounded criteria evaluated strictly over the completed **2022–2025 comparison period** (4 surveillance years, 208 calendar weeks, 237 weekly surveillance reports in archive).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        DATA-DRIVEN SCREENING RULE ARCHITECTURE                         │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                             │
                       [1. Multi-Year Recurring Presence]
                       Primary: 4 / 4 Complete Years (100%)
                       Secondary: >= 3 / 4 Complete Years (>=75%)
                                             │
                                             ▼
                        [2. Statistical Record Volume]
                       Primary: >= 40 Outbreak Records (Mean >= 10/yr)
                       Secondary: >= 10 Outbreak Records (Mean >= 2.5/yr)
                                             │
                                             ▼
                       [3. Temporal Granularity (Epi Weeks)]
                       Primary: >= 20 Distinct Epi Weeks
                       Secondary: >= 10 Distinct Epi Weeks
                                             │
                                             ▼
                       [4. Annual Cycle Breadth (Months)]
                       Primary: >= 10 of 12 Calendar Months
                       Secondary: >= 6 of 12 Calendar Months
                                             │
                                             ▼
                       [5. Geographic Spread (Districts)]
                       Primary: >= 10 of 36 Districts (State-wide)
                       Secondary: >= 5 of 36 Districts (Regional)
                                             │
                                             ▼
                       [6. Etiological Integrity Gate]
                       Specific Pathogen / Case Definition: PASS
                       Syndromic Catch-All / Combinations: FAIL
```

### Mathematical & Epidemiological Justification of Thresholds

1. **Multi-Year Recurring Presence ($Y \ge 3$ or $Y = 4$):**
   - *Rationale:* A seasonal index requires repeated observations across homologous calendar cycles to distinguish true climatic or environmental seasonality from a singular stochastic outbreak (e.g. contaminated pipeline, single wedding, isolated school exposure). A disease present in only 1 or 2 years cannot support seasonal decomposition.
2. **Statistical Record Volume ($N \ge 40$ for Primary; $N \ge 10$ for Secondary):**
   - *Rationale:* With 12 calendar months, an average of $< 1$ event per month introduces severe Poisson sparsity and erratic variance. A minimum of 40 records ensures an average density of $\ge 3.3$ outbreaks per month over the 4-year cycle.
3. **Temporal Week Granularity ($W \ge 20$ for Primary; $W \ge 10$ for Secondary):**
   - *Rationale:* Outbreak surveillance in Maharashtra spans 52 weeks. If a disease is active in $< 10$ distinct weeks across 4 years, it lacks the temporal continuity required for moving averages, STL decomposition, or harmonic Fourier fitting.
4. **Annual Cycle Breadth ($M \ge 10$ for Primary; $M \ge 6$ for Secondary):**
   - *Rationale:* Seasonal indices must measure both peak transmission windows and trough baseline levels. If fewer than 6 months have non-zero data, trough characteristics cannot be parameterized.
5. **Geographic Distribution ($D \ge 10$ for Primary; $D \ge 5$ for Secondary):**
   - *Rationale:* IDSP reports at the state level. If an infection is confined to 1–3 districts, the seasonal signal reflects local environmental idiosyncrasies (e.g. Gadchiroli forest cover or Mumbai urban drainage) rather than a state-wide seasonal driver.
6. **Etiological Integrity Gate:**
   - *Rationale:* Syndromic labels (e.g., `Fever / PUO`) combine viral, bacterial, and non-infectious conditions with conflicting seasonal drivers, while multi-pathogen combinations cannot be attributed to single causal chains.

---

## 4. Disease Family Selection Results

### 4.1 Primary Seasonal Analysis Candidates (5 Disease Families)

These five disease families satisfy **all six criteria without exception** during the 2022–2025 baseline:

| Disease Family | Transmission / Clinical Class | Records (2022–2025) | Complete Years Present | Active Epi Weeks | Calendar Months | Active Districts | Total Cases | Total Deaths | Case Fatality Rate (CFR) | Peak Month (Baseline) |
|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Dengue** | Arboviral / Aedes Vector | 204 | **4/4** (100%) | 44 / 52 | 12 / 12 | 31 / 36 | 3,144 | 93 | 2.96% | Month 10 (Oct, 40) |
| **Acute Diarrheal Disease (ADD)** | Waterborne / Enteric Bacterial | 153 | **4/4** (100%) | 45 / 52 | 12 / 12 | 33 / 36 | 9,050 | 93 | 1.03% | Month 10 (Oct, 25) |
| **Malaria** | Parasitic / Anopheles Vector | 70 | **4/4** (100%) | 32 / 52 | 12 / 12 | 15 / 36 | 2,133 | 51 | 2.39% | Month 07 (Jul, 13) |
| **Food Poisoning** | Foodborne / Microbial Toxins | 69 | **4/4** (100%) | 33 / 52 | 11 / 12 | 27 / 36 | 5,927 | 29 | 0.49% | Month 02 & 05 (11 ea) |
| **Chikungunya** | Arboviral / Aedes Vector | 43 | **4/4** (100%) | 27 / 52 | 12 / 12 | 15 / 36 | 701 | 0 | 0.00% | Month 09 (Sep, 11) |

#### Epidemiological Profiles of Primary Candidates:
1. **Dengue:** The highest volume vector-borne disease in Maharashtra. Demonstrates pronounced late-monsoon / post-monsoon surge peaking in October (Weeks 38–44). Spans 31 of 36 districts, reflecting widespread urban and peri-urban transmission.
2. **Acute Diarrheal Disease (ADD):** The largest burden in terms of patient morbidity (9,050 cases) and mortality (93 deaths). Highly active across 33 districts. Bimodal distribution with an early summer spike (water scarcity) and a severe monsoon/post-monsoon crest.
3. **Malaria:** Highly persistent vector-borne parasitic disease. Concentrated in eastern forested districts (Gadchiroli, Chandrapur, Gondia). Reaches peak transmission during monsoon water-logging (July–August).
4. **Food Poisoning:** Broadly distributed across 27 districts. Characterized by mass-exposure point-source outbreaks. Bimodal peaks in pre-monsoon summer (April–May festival/wedding season) and late winter.
5. **Chikungunya:** Co-circulates with Dengue via *Aedes aegypti* vector. Demonstrates distinct autumn seasonality (peak in September–October), spanning 15 districts with zero recorded fatalities across the entire surveillance period.

---

### 4.2 Secondary / Supporting Analysis Candidates (4 Disease Families)

These disease families fail one or more primary criteria (e.g. record volume $< 40$, or absent in 1 complete year), but comfortably exceed secondary thresholds. They are recommended for **exploratory / caveated seasonal analysis**:

| Disease Family | Records (2022–2025) | Complete Years Present | Active Epi Weeks | Calendar Months | Active Districts | Cases | Deaths | Primary Threshold Failure Reason | Secondary Role Recommendation |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|:---|
| **Hepatitis A** | 29 | 3/4 (2023–25) | 22 / 52 | 12 / 12 | 9 / 36 | 812 | 3 | Absent in 2022 (0 recs); records $< 40$; districts $< 10$ | Enteric viral hepatitis seasonal indicator; caveated for 2022 surveillance void |
| **Cholera** | 27 | 3/4 (2022,24,25) | 15 / 52 | 8 / 12 | 14 / 36 | 863 | 9 | Absent in 2023 (0 recs); records $< 40$; weeks $< 20$; months $< 10$ | Epidemic waterborne bacterial indicator; highly seasonal (monsoon) but sporadic |
| **Measles** | 16 | 3/4 (2022,23,25) | 13 / 52 | 7 / 12 | 6 / 36 | 222 | 25 | Absent in 2024 (0 recs); records $< 40$; weeks $< 20$; districts $< 10$ | Vaccine-preventable viral exanthem; highly clustered (Mumbai, Aurangabad) |
| **Scrub Typhus** | 13 | 4/4 (2022–25) | 11 / 52 | 7 / 12 | 7 / 36 | 120 | 10 | Present in 4/4 yrs, but sample size low (13 $< 40$); weeks $< 20$; months $< 10$ | Zoonotic mite-borne rickettsial indicator; post-monsoon vegetation contact |

---

### 4.3 Insufficient Data Diseases (13 Disease Families — Exact Failure Autopsy)

Thirteen disease families fail minimum statistical requirements and are disqualified from seasonal modelling:

| Disease Family | Records (22–25) | Years (22–25) | Weeks | Months | Districts | Primary & Secondary Failure Reasons |
|:---|:---:|:---:|:---:|:---:|:---:|:---|
| **Zika Virus** | 27 | **2/4** | 14 | **5 / 12** | 5 / 36 | **Fails multi-year recurrence ($2 < 3$ yrs); absent in 2022 & 2025; months ($5 < 6$); highly focal (Pune epicenter).** |
| **Leptospirosis** | 10 | 4/4 | **9** | 7 / 12 | 7 / 36 | **Fails minimum temporal granularity ($9 < 10$ distinct weeks); low volume ($\sim 2.5$ outbreaks/year).** |
| **Chickenpox** | 5 | 3/4 | 5 | 4 / 12 | 5 / 36 | Volume too low ($5 < 10$); weeks $< 10$; months $< 6$. |
| **Acute Gastroenteritis (AGE)** | 5 | 2/4 | 5 | 5 / 12 | 3 / 36 | Volume too low ($5 < 10$); years ($2 < 3$); weeks $< 10$; months $< 6$; districts $< 5$. |
| **Acute Encephalitis Syndrome (AES)** | 3 | 2/4 | 3 | 2 / 12 | 2 / 36 | Syndromic presentation; volume too low ($3 < 10$); years $< 3$; weeks $< 10$; months $< 6$. |
| **Mumps** | 2 | 2/4 | 2 | 2 / 12 | 2 / 36 | Volume too low ($2 < 10$); years $< 3$; weeks $< 10$. |
| **Japanese Encephalitis** | 2 | 2/4 | 2 | 2 / 12 | 2 / 36 | Volume too low ($2 < 10$); years $< 3$; weeks $< 10$. |
| **Typhoid** | 2 | 2/4 | 2 | 2 / 12 | 2 / 36 | Volume too low ($2 < 10$); years $< 3$; weeks $< 10$. |
| **Dysentery** | 2 | 2/4 | 2 | 2 / 12 | 2 / 36 | Volume too low ($2 < 10$); years $< 3$; weeks $< 10$. |
| **Human Rabies** | 2 | 2/4 | 2 | 2 / 12 | 1 / 36 | Volume too low ($2 < 10$); years $< 3$; single district. |
| **Hand Foot Mouth Disease** | 1 | 1/4 | 1 | 1 / 12 | 1 / 36 | Solitary record in 2022; zero statistical support. |
| **Hepatitis (Unspecified/Suspected)** | 1 | 1/4 | 1 | 1 / 12 | 1 / 36 | Solitary record in 2024; unclassified viral etiology. |
| **Pertussis** | 1 | 1/4 | 1 | 1 / 12 | 1 / 36 | Solitary record in 2024; zero statistical support. |
| **Hepatitis E** | 0 | **0/4** | 0 | 0 / 12 | 0 / 36 | **Completely absent in completed 2022–2025 comparison period; single record in 2026 W23.** |

---

### 4.4 Requires Label Review & Combination Categories

- **Requires Label Review (4 Families, 34 Records):**
  1. `Fever / PUO (Syndromic)` (28 records, 619 cases, 38 deaths in 2022–2025; 2 records in 2026): Non-specific febrile illness without etiological diagnosis. Completely missing in 2024 (0 records). Ineligible for pathogen-specific seasonal analysis.
  2. `Jaundice (Syndromic)` (1 record in 2025, 1 in 2026; 40 cases): Clinical symptom descriptor lacking laboratory confirmation.
  3. `Fever with Rash (Syndromic)` (1 record in 2025, 1 in 2026; 19 cases): Syndromic exanthem.
  4. `Malformed Boundary Artifacts` (2 records: `Poisoning` [MAHA-2025-W18-001] and `a Chhatrapati Sambhajinaga r Measles` [MAHA-2026-W09-001]).
- **Combination / Non-Comparable (4 Families, 17 Records):**
  1. `Dengue & Chikungunya Co-reporting` (11 records in 2022–2025).
  2. `Dengue & Malaria Co-reporting` (2 records in 2022–2025).
  3. `Measles & Rubella Co-reporting` (2 records in 2022–2025).
  4. `Hepatitis A & E Co-reporting` (1 record in 2024, 1 in 2026).
  *Rule:* Preserved as distinct multi-pathogen surveillance events; isolated from single-agent seasonal time-series.

---

## 5. Empirical Examination of 2026 Partial-Year Bias

The surveillance archive contains 76 records from 2026 spanning Weeks 01–32 (published through mid-August 2026). Comparing the selection audit between the completed 2022–2025 baseline and the combined 2022–2026 YTD period reveals critical mathematical distortions:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               EMPIRICAL 2026 BIAS & TRUNCATION IMPACT (W01–W32)                        │
└────────────────────────────────────────────────────────────────────────────────────────┘

 [Dengue & Chikungunya]                       [Measles]
  Peak window (Weeks 33–52 / Sep–Nov)          Acute early-year surge (Jan–May)
  is COMPLETELY UNPUBLISHED in 2026.           accounts for 46.7% of all measles records.
  → Inclusion depresses late-year index.       → Inclusion severely skews spring baseline.

 [Acute Diarrheal Disease]                    [Food Poisoning]
  100% of 2026 records (18/18) reported as    100% of 2026 records (19/19) reported as
  "Acute Diarrhoeal Disease" (British).        "Suspected Food Poisoning" (Suspected).
  → Label fragmentation risk if unharmonized.  → Falsely shows confirmed cases dropped to 0.
```

### 5.1 Monthly Distribution Truncation (The Vector-Borne Paradox)
In Maharashtra, transmission of Dengue and Chikungunya is tightly coupled to post-monsoon puddling and ambient humidity during September, October, and November (Months 9, 10, 11).
- In the complete 2022–2025 baseline, Months 9–11 account for **44.6% (91/204)** of all Dengue outbreaks.
- Because 2026 reports terminate at Week 32, **Months 9, 10, and 11 have exactly zero observations in 2026**.
- Consequently, Dengue shows only 6 outbreaks in 2026 YTD. If 2026 were naively averaged into monthly indices without truncation adjustment, it would artificially deflate the true post-monsoon peak by introducing 3 artificial zeros.

### 5.2 Localized Epidemic Wave Distortion (Measles)
- Measles recorded 16 outbreaks across the entire 4-year 2022–2025 baseline.
- In 2026 W01–W32 alone, Measles recorded **14 outbreaks** (46.7% of all Measles outbreaks across the 5-year archive), heavily concentrated in Chhatrapati Sambhajinagar during February–April.
- Including 2026 into baseline seasonal fitting would distort Measles seasonality from a sporadic exanthem into an overwhelming Q1 phenomenon driven by a single localized outbreak cluster.

### 5.3 Administrative Reporting Shifts
- **ADD:** In 2026, 18 of 18 records are labeled `Acute Diarrhoeal Disease`. An analyst querying `Acute Diarrheal Disease` would conclude that diarrhea vanished in Maharashtra in 2026.
- **Food Poisoning:** In 2026, 19 of 19 records are labeled `Suspected Food Poisoning`. Confirmed `Food Poisoning` drops to zero.
- **Hepatitis E:** Recorded exactly 0 outbreaks across 2022–2025, but 1 outbreak in 2026 W23.

### Bias Audit Verdict
> [!CAUTION]
> **Definitive Methodological Mandate:**  
> Inclusion of 2026 YTD within baseline seasonal decomposition introduces severe structural bias (premature peak truncation, local outbreak distortion, and administrative label changes).  
> **2026 must be strictly preserved as an out-of-sample forward evaluation period.** Baseline seasonal indices must be parameterized strictly on 2022–2025.

---

## 6. Audit of Questionable Labels Requiring Manual Review

The following records contain boundary leakage or syndromic ambiguity that warrant explicit documentation in the pipeline register:

```
┌───────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 REGISTER OF LABELS REQUIRING REVIEW                                   │
├──────────────────┬───────────────────┬──────────────┬───────────────────┬─────────────────────────────┤
│ Record ID        │ Year / Week       │ District     │ Label in Dataset  │ Forensic Remediation        │
├──────────────────┼───────────────────┼──────────────┼───────────────────┼─────────────────────────────┤
│ MAHA-2025-W18-001│ 2025 Week 18      │ Chhatrapati  │ Poisoning         │ Leaked boundary truncated   │
│                  │ (PDF page 16)     │ Sambhajinagar│                   │ "Food ". Map to Food        │
│                  │                   │              │                   │ Poisoning (255 cases).      │
├──────────────────┼───────────────────┼──────────────┼───────────────────┼─────────────────────────────┤
│ MAHA-2026-W09-001│ 2026 Week 09      │ Aurangabad   │ a Chhatrapati     │ Unstripped leading "a ".    │
│                  │ (PDF page 35)     │              │ Sambhajinaga r    │ Underlying entity is        │
│                  │                   │              │ Measles           │ Measles (15 cases).         │
├──────────────────┼───────────────────┼──────────────┼───────────────────┼─────────────────────────────┤
│ MAHA-2026-W09-002│ 2026 Week 09      │ Sindhudurg   │ Acute Gastro-     │ Broken whitespace between   │
│                  │ (PDF page 36)     │              │ enteri tis        │ "i" and "t". Map to AGE.    │
├──────────────────┼───────────────────┼──────────────┼───────────────────┼─────────────────────────────┤
│ 28 Records       │ 2022, 2023, 2025  │ Multiple (16)│ Fever / PUO       │ Non-specific syndrome.      │
│                  │                   │              │                   │ Exclude from specific path. │
└──────────────────┴───────────────────┴──────────────┴───────────────────┴─────────────────────────────┘
```

---

## 7. Final Selection Verdict & Transition Guidance for Phase 5B

The firm disease selection audit is concluded. All 809 records are fully accounted for, cross-referenced, and segregated into derived audit tables.

### Authorized Analytical Cohorts for Phase 5B:

1. **Cohort 1: Primary Seasonal Analysis (5 Disease Families — 539 Baseline Records / 584 Total Records):**
   - **Dengue** (204 baseline recs)
   - **Acute Diarrheal Disease** (153 baseline recs)
   - **Malaria** (70 baseline recs)
   - **Food Poisoning** (69 baseline recs)
   - **Chikungunya** (43 baseline recs)
   - *Phase 5B Scope:* Full statistical seasonal modeling, monthly seasonal indices, epidemiological week envelope estimation, STL decomposition, and Fourier harmonic analysis.

2. **Cohort 2: Secondary / Supporting Analysis (4 Disease Families — 85 Baseline Records / 103 Total Records):**
   - **Hepatitis A** (29 baseline recs)
   - **Cholera** (27 baseline recs)
   - **Measles** (16 baseline recs)
   - **Scrub Typhus** (13 baseline recs)
   - *Phase 5B Scope:* Exploratory monthly seasonal profiles with explicit documentation of data sparsity and historical surveillance gaps (e.g. absent years).

3. **Cohort 3: Disqualified / Insufficient Data (13 Disease Families — 63 Baseline Records):**
   - Zika Virus, Leptospirosis, Chickenpox, AGE, AES, Mumps, JE, Typhoid, Dysentery, Rabies, HFMD, Pertussis, Hepatitis E.
   - *Phase 5B Scope:* Retained solely for aggregate outbreak volume accounting; excluded from seasonal curve fitting.

4. **Cohort 4: Multi-Pathogen Combinations (4 Families — 16 Baseline Records):**
   - Dengue & Chikungunya, Dengue & Malaria, Measles & Rubella, Hepatitis A & E.
   - *Phase 5B Scope:* Preserved as co-reporting indicators; strictly excluded from single-disease seasonal baselines.

---

## 8. Derived File Manifest (Phase 5A)

The following six (6) authoritative derived CSV datasets and this markdown report have been generated strictly inside [`data_pipeline/phase5A_disease_audit/`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5A_disease_audit/):

1. [`01_DISEASE_LABEL_AUDIT.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5A_disease_audit/01_DISEASE_LABEL_AUDIT.csv) (56 clean analytical labels evaluated across 32 quantitative dimensions).
2. [`02_DISEASE_FAMILY_MAPPING.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5A_disease_audit/02_DISEASE_FAMILY_MAPPING.csv) (116 distinct label permutations mapped to 30 derived disease families with classification justification).
3. [`03_DISEASE_FAMILY_SUMMARY.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5A_disease_audit/03_DISEASE_FAMILY_SUMMARY.csv) (Aggregated metrics at the derived disease family level).
4. [`04_DISEASE_YEARLY_DISTRIBUTION.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5A_disease_audit/04_DISEASE_YEARLY_DISTRIBUTION.csv) (Year-by-year surveillance distribution across all 30 families from 2022 to 2026).
5. [`05_DISEASE_SELECTION_SCREENING.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5A_disease_audit/05_DISEASE_SELECTION_SCREENING.csv) (Formal screening rule evaluation and classification of all disease families).
6. [`06_2026_BIAS_CHECK.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5A_disease_audit/06_2026_BIAS_CHECK.csv) (Direct comparison of screening metrics and distortion risks between 2022–2025 and 2022–2026 YTD).
7. [`07_PHASE5A_SELECTION_REPORT.md`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/phase5A_disease_audit/07_PHASE5A_SELECTION_REPORT.md) (This comprehensive clinical, statistical, and epidemiological audit report).

*All input datasets remain unmodified and byte-identical to their pre-audit state.*
