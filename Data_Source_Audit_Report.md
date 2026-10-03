# DATA-SOURCE AUDIT REPORT
## Field Project: Analysis of Seasonal Disease Patterns Using Government Health Data
### B.Sc. Data Science, Semester III | University of Mumbai | Academic Year 2025–26

> **IMPORTANT:** This is a **pre-report audit document**, written from my perspective, not the final project report.  
> All findings below are based on files that are actually present in my repository.  
> I have not invented or assumed anything. Where the data is missing, uncertain, or incomplete, I have clearly stated that.

---

## 1. EXECUTIVE SUMMARY

### What I Actually Have (As Found in My Repository)

After reviewing my GitHub repository (`RizzyCoder19/Field-Project`) and my local folder `c:\Users\ADMIN\OneDrive\Desktop\Field Project`, I was able to identify the exact assets that are genuinely available for my project. I did not rely on assumptions or missing files.

| Asset | File | Status | Value |
|---|---|---|---|
| **Primary structured dataset** | `raw dataset/Final_data.csv` | ✅ VERIFIED | **8,985 rows**, IDSP outbreak records, **2009–2022** (partial), 15 columns including lat/long, precipitation, temperature, and disease cases |
| **IDSP Master dataset (full)** | `NCDC weekly outbreaks/Master Data…IDSP.txt` | ✅ VERIFIED (metadata only) | 35,538 rows, 2009–2026, weekly, district-level — **full dataset hosted at dataful.in** |
| **NCDC Weekly Reports 2026** | `NCDC weekly outbreaks/2026/week1–week31` | ✅ VERIFIED | 31 weekly PDFs (Weeks 1–31 of 2026), downloadable |
| **H1N1/Influenza state table 2019–2025** | `NCDC weekly outbreaks/d223cdfb-…pdf` | ✅ VERIFIED | NCDC official table, state-wise, annual |
| **IDSP programme description** | `NCDC weekly outbreaks/IDSP report.pdf` | ✅ VERIFIED | NCDC/MOHFW official portal, outbreak counts 2020–2026 |
| **Research paper – Dengue Gondia MH** | `NCDC weekly outbreaks/IJCPR,Vol18,Issue2,Article253.pdf` | ✅ VERIFIED | Peer-reviewed, 2023–2025, Maharashtra-specific |
| **Research paper – Seasonality India** | `NCDC weekly outbreaks/medip,+IJCMPH-10079+O (1).pdf` | ✅ VERIFIED | IJHSR 2016, IDSP outbreak data analysis |
| **BMC report** | `NCDC weekly outbreaks/BMC.pdf` | ✅ VERIFIED | Mumbai/BMC health data (needs further reading) |
| **Monthly Trajectory HTML** | `NCDC weekly outbreaks/Monthly Trajectory of Major Disease Classes in India.html` | ✅ VERIFIED | 3.4 MB interactive chart |
| **Vector-borne context (LinkedIn article)** | `NCDC weekly outbreaks/vector-borne report.txt` | ✅ VERIFIED | Secondary; cites NCVBDC 2024 figures — **not primary source** |
| **Seasonal overview** | `NCDC weekly outbreaks/water-borne.txt` | ✅ VERIFIED | Secondary blog (MrMed) — **not primary source** |
| **IDSP 2012 weekly PDF** | `NCDC weekly outbreaks/week46_2012.pdf` | ✅ VERIFIED | Sample historical IDSP weekly report |
| **Pre-existing draft report** | `Field_Project_Report_Draft_Seasonal_Disease_Patterns.docx` | ~~✅ EXISTS~~ **REMOVED Oct 2, 2026** | Obsolete EpiClim/2011–2019 draft. Existed at Phase 1 audit time, but is no longer part of my active dataset |
| **Existing visualizations** | `raw dataset/*.png` | ✅ VERIFIED | 7 charts already generated (cases timeseries, deaths, 3D, heatmap, map, pie) |

### Critical Gap I Identified

> [!CAUTION]
> My `Final_data.csv` **ends in mid-2022** (Week 24, June 2022 for Maharashtra). It covers **2009–2022 only**.  
> The full IDSP dataset (2009–2026, 35,538 rows) is available at **https://dataful.in/datasets/18514** and must be downloaded to cover the 2022–2026 period required for my project title.

---

## 2. OFFICIAL GOVERNMENT DATA ECOSYSTEM

### 2.1 IDSP — Integrated Disease Surveillance Programme

**Authority:** Ministry of Health and Family Welfare, Government of India  
**Executing Body:** National Centre for Disease Control (NCDC), Delhi  
**Official Portal:** https://ncdc.mohfw.gov.in  
**Weekly Reports:** https://ncdc.mohfw.gov.in/index4.php?lang=1&level=0&linkid=422&lid=3689

**What IDSP Collects:**
- **S-Form:** Syndromic (suspected) cases — filled by health workers
- **P-Form:** Presumptive cases — filled by clinicians
- **L-Form:** Laboratory-confirmed cases — filled by lab staff
- Weekly outbreak reports: state + district + disease + cases + deaths

**As confirmed from the IDSP report in my repository (NCDC official page, scraped 27 Sept 2026):**
- Total outbreaks reported: 554 (2020), 728 (2021), 1027 (2022), 1862 (2023), 3020 (2024), 2285 (2025)
- As of Week 10 of 2026: 411 outbreaks already reported
- 184,895 Reporting Units nationwide under S-form surveillance
- Average 40 outbreaks per week reported to Central Surveillance Unit

**My actual IDSP data (from Final_data.csv — VERIFIED):**
- Source: dataful.in/datasets/18514 (Ministry of Health and Family Welfare via IDSP)
- Rows: 8,985 (my downloaded subset, 2009–2022)
- Full dataset: 35,538 rows (2009–2026, updated September 16, 2026)
- 14 columns: year, week, outbreak_starting_date, reporting_date, state, district (source), district (LGD), LGD code, disease_illness_name, status, cases, deaths, units, notes

### 2.2 NCDC — National Centre for Disease Control

**URL:** https://ncdc.mohfw.gov.in  
**Relevant datasets:**
- IDSP weekly outbreak data (above)
- Seasonal Influenza (H1N1) state-wise table — **VERIFIED in my repo** (d223cdfb file)
- Disease-specific annual reports

**From my d223cdfb PDF (NCDC official, dated 31.10.2025, As on 30.09.2025):**  
Maharashtra H1N1 data confirmed: 2287 cases (2019), 121 (2020), 387 (2021), 3714 (2022), 1231 (2023), 2072 (2024), 392 (2025 partial)

### 2.3 NCVBDC — National Centre for Vector Borne Diseases Control

**URL:** https://nvbdcp.gov.in  
**Diseases covered:** Dengue, Malaria, Chikungunya, Lymphatic Filariasis, Kala-azar, Japanese Encephalitis  
**Data published:** State-wise annual cases and deaths tables  
**Temporal resolution:** Annual (NOT monthly — **cannot be used alone for seasonal analysis**)  

**Known published figures (cited in my vector-borne report.txt, citing NCVBDC):**
- Dengue 2024 India: 233,519 cases, 297 deaths
- Chikungunya 2024 India: 2.31 lakh suspected, ~17,800 confirmed

> [!WARNING]
> NCVBDC annual tables give state-wise totals only. They **cannot support my seasonal (month-by-month) analysis** without cross-referencing IDSP outbreak data.

### 2.4 Maharashtra State Health Data

**Authority:** Directorate of Health Services, Maharashtra  
**Public Health Department:** https://arogya.maharashtra.gov.in  
**Available:** Annual Epidemic Disease reports, district health bulletins

> [!NOTE]
> Direct monthly data from the Maharashtra Directorate is **not publicly downloadable** in a structured format as of this audit. In my study, this means I may need to rely on IDSP data rather than state department data alone.

### 2.5 BMC / MCGM — Municipal Corporation of Greater Mumbai

**Authority:** Brihanmumbai Municipal Corporation  
**Health Portal:** https://portal.mcgm.gov.in  
**My file:** `BMC.pdf` is present (1.97 MB) — contains Mumbai health statistics (to be read separately for specific data points)

**Known Mumbai data (from my vector-borne report.txt, citing health officials):**
- Malaria Jan–mid July 2025: 3,490 cases (vs 2,852 in same period 2024)
- Zero Mosquito Breeding Campaign: 6.7 lakh homes inspected, 32 lakh people checked, 1 lakh blood samples

> [!WARNING]
> Mumbai city-level monthly data is **not available as a downloadable CSV**. BMC publishes press releases and annual reports, not raw data files. Mumbai-level seasonal analysis would require manual extraction and interpretation.

---

## 3. DATA-SOURCE AUDIT TABLE

| Source | Official Authority | Disease | Geography | Frequency | Years Available | Metric | Format | Downloadable? | Maharashtra? | Mumbai? | Seasonal Analysis Potential |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **IDSP Outbreak Data (dataful.in/18514)** | MOHFW / NCDC | Dengue, Malaria, Chikungunya, ADD, Cholera, AES, AGE, 244 disease labels | National → State → District | Weekly | **2009–2026** (35,538 rows) | Cases + deaths | CSV | YES | **YES** | YES | **HIGH** |
| **My Final_data.csv** | MOHFW / NCDC (subset) | Same | Same | Weekly | **2009–2022 only** | Cases + Deaths + Lat/Long + Precipitation + Temp | CSV | Already downloaded | **YES** (1,195 rows) | No | **HIGH** |
| **NCDC Weekly PDF Reports 2026** | NCDC / MOHFW | All outbreak diseases | National → State → District | Weekly | **2026 Weeks 1–31** | Cases + Deaths | PDF | **YES** ✅ | YES | YES | **MODERATE** |
| **NCDC H1N1 Table (d223cdfb.pdf)** | NCDC / MOHFW | Seasonal Influenza A (H1N1) | State-wise | Annual | **2019–2025** | Cases + Deaths | PDF table | Already downloaded | **YES** (Maharashtra row) | No | **LOW** |
| **NCVBDC Annual Tables** | NCVBDC / MOHFW | Dengue, Malaria, Chikungunya | State-wise | Annual | 2010–2024 | Cases + Deaths | HTML/PDF | YES | YES | No | **LOW** (annual totals only) |
| **IDSP Weekly PDFs (ncdc.mohfw.gov.in)** | NCDC / MOHFW | All outbreak diseases | National → State → District | Weekly | 2012–2026 (ongoing) | Cases + Deaths | PDF | YES | YES | YES (sometimes) | **HIGH** |
| **Maharashtra DHS Annual Reports** | Directorate of Health Services, MH | Multiple | State + District | Annual | Various | Cases, rates | PDF | Partially | YES | YES | **LOW** (annual) |
| **BMC Health Reports (BMC.pdf)** | MCGM Mumbai | Multiple | Mumbai city | Monthly/Annual | Varies (PDF in repo) | Cases + hospital data | PDF | Partially (in repo) | Via Mumbai | YES | **MODERATE** |
| **IDSP-IHIP Portal** | MOHFW | All S/P/L form diseases | National → District | Weekly | 2019–present | Syndromic + Presumptive + Lab-confirmed | Dashboard/API | Login required | YES | YES | **MODERATE** |
| **WHO Global Health Observatory** | WHO | Selected diseases | Country-level | Annual | Multiple years | Incidence rates | CSV/API | YES | NO (India-level only) | NO | **LOW** for India sub-national analysis |

---

## 4. ACTUAL SEASONAL PATTERNS — COMPUTED FROM MY REAL DATA

### Source: Final_data.csv (IDSP outbreak records, 2009–2022, 8,985 rows)

> These are computed from the verified CSV file in my repository. These are **real numbers**, not invented.

### 4A. All-India Monthly Distribution (% of total cases, 2009–2022)

| Month | Dengue | Malaria | Chikungunya | Acute Diarrhoeal Disease | Cholera |
|---|---|---|---|---|---|
| January | 1.1% | 2.1% | 2.3% | 4.0% | 0.8% |
| February | 0.3% | 0.2% | 1.7% | 3.5% | 0.3% |
| March | 0.9% | 2.1% | 2.2% | 6.4% | 2.3% |
| April | 2.2% | 0.8% | 3.4% | 6.6% | 1.1% |
| May | 2.6% | **24.0%** | 3.3% | 11.3% | **51.6%** |
| June | **12.2%** | 3.7% | 4.4% | **13.6%** | 5.1% |
| **July** | **42.6%** ← PEAK | 6.4% | **13.5%** | **16.5%** | 11.9% |
| August | 12.7% | 5.4% | **34.5%** ← PEAK | 14.2% | 8.9% |
| September | 12.9% | **39.1%** ← PEAK | 11.2% | 10.1% | 7.5% |
| October | 10.8% | 6.9% | 9.8% | 6.2% | 4.4% |
| November | 1.3% | 6.7% | **12.0%** | 4.5% | 5.4% |
| December | 0.4% | 2.6% | 1.8% | 3.1% | 0.6% |

**Key All-India findings (evidence-based):**
- Dengue: clear monsoon peak in **July (42.6%)** — June–October together = 91.2%
- Malaria: bimodal pattern — **May (24%) and September (39.1%)**; this may reflect reporting cycles
- Chikungunya: peak in **August (34.5%)** with a secondary November peak
- Acute Diarrhoeal Disease: spread from May–September but peaks in **July (16.5%)**
- Cholera: strong **May peak (51.6%)** — likely influenced by a large Bihar outbreak in the dataset

### 4B. Maharashtra Monthly Distribution (% of total cases, 2009–2022)

| Month | Dengue | Malaria | Chikungunya | Acute Diarrhoeal Disease | Cholera |
|---|---|---|---|---|---|
| January | 2.4% | 1.3% | 0.8% | 4.0% | 0.0% |
| February | 0.7% | 5.3% | 2.9% | 2.5% | 2.2% |
| March | 2.9% | 0.3% | 1.6% | 4.4% | 0.2% |
| April | 8.2% | 4.1% | 4.9% | 7.1% | 0.6% |
| May | 7.5% | 12.4% | 9.2% | **15.0%** | 5.7% |
| June | 7.5% | **13.4%** | 7.7% | **22.4%** ← PEAK | 3.1% |
| July | 7.3% | **21.5%** ← PEAK | 4.6% | 14.0% | **15.3%** |
| **August** | **17.2%** | 8.1% | **14.3%** | 6.3% | 3.5% |
| **September** | **19.8%** ← PEAK | 4.9% | 11.6% | 5.8% | 1.8% |
| **October** | **17.1%** | 6.1% | **24.8%** ← PEAK | 9.0% | 5.1% |
| November | 7.1% | 10.0% | **13.8%** | 4.5% | **61.0%** ← (likely one outbreak) |
| December | 2.3% | **12.5%** | 3.8% | 5.1% | 1.3% |

**Key Maharashtra findings (evidence-based):**
- Dengue in Maharashtra peaks later than the national pattern: **September (19.8%)** > August (17.2%) > October (17.1%)
- The Maharashtra dengue season appears to be **August–October** (monsoon + post-monsoon)
- Malaria peaks in **July (21.5%)** in Maharashtra — matching monsoon onset
- Chikungunya peaks in **October (24.8%)** — distinctly post-monsoon in Maharashtra
- Diarrhea peaks in **June (22.4%)** in Maharashtra — coinciding with monsoon arrival
- Cholera November peak is a **data artifact** — likely dominated by one large 2017 outbreak in Maharashtra

### 4C. Maharashtra Year-by-Year Case Counts (2009–2022)

| Year | Dengue | Malaria | Chikungunya | Diarrhea | Cholera | Total MH Rows |
|---|---:|---:|---:|---:|---:|---:|
| 2009 | 96 | 54 | 6 | 467 | 32 | 13 |
| 2010 | 112 | 135 | 229 | 1,755 | 218 | 51 |
| 2011 | 227 | 408 | 1,249 | 1,781 | 231 | 83 |
| 2012 | 1,694 | 314 | 397 | 2,797 | 488 | 124 |
| 2013 | 1,213 | 283 | 89 | 1,923 | 628 | 114 |
| 2014 | 1,820 | 513 | 192 | 2,211 | 36 | 115 |
| 2015 | 355 | 720 | 137 | 2,844 | 44 | 106 |
| 2016 | 795 | 178 | 548 | 3,658 | 1,254 | 145 |
| 2017 | 1,286 | 304 | 612 | 2,019 | 5,911 | 110 |
| 2018 | 1,011 | 129 | 440 | 1,473 | 317 | 94 |
| 2019 | 1,254 | 114 | 71 | 730 | 512 | 88 |
| 2020 | 167 | 90 | 196 | 1,231 | 264 | 50 |
| 2021 | 465 | 119 | 330 | 590 | 69 | 83 |
| 2022 | 53 | 386 | 28 | 206 | 0 | 19 (**PARTIAL**) |

> [!WARNING]
> 2022 has only 19 Maharashtra rows (through Week 24 = June). This is **incomplete** and cannot be used for 2022 seasonal analysis without downloading the full dataset.

### 4D. District Coverage in Maharashtra (Top 20 by outbreak frequency)

Nashik (83), Thane (79), Satara (76), Kolhapur (67), Ahmednagar (66), Beed (62), Pune (61), Gadchiroli (59), Sangli (57), Nagpur (51), Jalgaon (45), Raigad (42), Amravati (38), Chandrapur (37), Dhule ...

**Mumbai is NOT separately reported** in this dataset — it appears under Thane (79 rows) or is absent as a separate city unit.

---

## 5. DISEASE-WISE DATA AVAILABILITY TABLE

| Disease | Best Available Dataset | Geography | Temporal Resolution | Years | Strengths | Limitations | Suitable for Project? |
|---|---|---|---|---|---|---|---|
| **Dengue** | IDSP Outbreak CSV (dataful.in) | National → State → District | Weekly → monthly aggregable | 2009–2026 | Largest dataset, highest MH rows (370), clear seasonal peak | Outbreak-based, not total incidence | **YES** |
| **Malaria** | IDSP Outbreak CSV + NCVBDC annual | National → State → District | Weekly + Annual | 2009–2026 | 113 MH rows, NCVBDC for cross-check | Bimodal pattern needs explanation, may reflect reporting cycles | **YES** |
| **Chikungunya** | IDSP Outbreak CSV | National → State → District | Weekly → monthly | 2009–2026 | 147 MH rows, clear post-monsoon peak in MH (Oct) | Data sparser than dengue; resurgences sometimes irregular | **YES** |
| **Acute Diarrhoeal Disease** | IDSP Outbreak CSV | National → State → District | Weekly → monthly | 2009–2026 | 445 MH rows (largest), clear monsoon peak | "Outbreak" records — not total disease burden | **YES** |
| **Cholera** | IDSP Outbreak CSV | National → State → District | Weekly → monthly | 2009–2026 | 58 MH rows | November 2017 outbreak dominates MH data (5,911 cases); distorts seasonality | **Caution / conditional** |
| **Influenza / H1N1** | NCDC annual table (d223cdfb.pdf) | State-wise | Annual | 2019–2025 | Official NCDC, MH data confirmed | **Annual only** — cannot show seasonality | **LOW — annual only** |
| **Leptospirosis** | IDSP outbreak data (in full dataset) | National → District | Weekly | 2009–2026 | Present in master dataset (144 disease labels) | Very few MH rows in my CSV; monsoon disease pattern is sparse | **PARTIAL** |
| **Acute Encephalitis Syndrome** | IDSP Outbreak CSV | National → State | Weekly | 2009–2022 | 13 MH rows | Mainly UP, Bihar; very few MH entries | **NO for MH focus** |

---

## 6. INDIA vs MAHARASHTRA vs MUMBAI COMPARISON

| Dimension | India-Level | Maharashtra-Level | Mumbai-Level |
|---|---|---|---|
| **Datasets exist?** | YES — full IDSP CSV | YES — 1,195 rows in my CSV + full dataset | PARTIAL — BMC.pdf; no raw CSV |
| **Diseases analyzable** | All 244 disease labels | Dengue, Malaria, Chikungunya, ADD, Cholera | Same, but data extraction from PDF only |
| **Temporal resolution** | Weekly → monthly | Weekly → monthly | Monthly/annual in PDF |
| **Years available** | 2009–2026 | 2009–2022 (my CSV); 2009–2026 (full dataset) | Varies by disease; not consistent |
| **Accessibility** | HIGH — CSV downloadable | HIGH — subset already downloaded | LOW — PDFs only, manual extraction |
| **Limitations** | Large national heterogeneity masks regional patterns | Missing Mumbai-city as a separate unit | No raw structured data; BMC does not publish downloadable CSV |
| **Feasibility for student project** | YES — national seasonal analysis | **YES — BEST CHOICE** for a student project | LOW — data extraction burden is too high |
| **Recommendation** | Use for context & India-level comparison | **PRIMARY STUDY GEOGRAPHY** | Use only as anecdotal supplement |

> [!IMPORTANT]
> **Recommendation: Maharashtra is my primary study geography.**  
> It has the most outbreak rows of any state in my dataset, has excellent disease variety, and includes well-known tropical and monsoon-linked disease burden. Mumbai may be included as a secondary contextual comparison, but it is not the strongest primary unit for analysis.

---

## 7. LITERATURE REVIEW — VERIFIED PAPERS IN MY REPOSITORY

### Paper 1 — **VERIFIED (IJCPR, 2026)**

| Item | Detail |
|---|---|
| **Full Title** | "The Demographic and Seasonal Variation of Dengue Virus Infection in Gondia, A Tribal District in Maharashtra, India" |
| **Authors** | Khushbu Sakure, Tankhiwale Supriya, Vivek Patil, Ravindra Khadse |
| **Year** | 2026 (accepted 06-02-2026) |
| **Journal** | International Journal of Current Pharmaceutical Review and Research (IJCPR), Vol. 18, Issue 2, pp. 1532–1537 |
| **DOI** | 10.25258/ijcpr.18.2.253 |
| **Geography** | Gondia district, Maharashtra |
| **Disease** | Dengue |
| **Data Source** | Government Medical College, Gondia — sentinel surveillance centre (dengue IgM MAC ELISA) |
| **Study Period** | January 2023 – December 2025 |
| **Methodology** | Laboratory-based surveillance; IgM serology; temporal, demographic and geographic analysis |
| **Main Finding** | 696 confirmed dengue cases; seasonal peak in **September 2023** (post-monsoon); females = 54.5%; age group 21–30 most affected; Gondia city most clustered |
| **How it informs my project** | Direct Maharashtra evidence; confirms post-monsoon dengue peak in my IDSP data; provides district-level comparison |

### Paper 2 — **VERIFIED (IJHSR, 2016)**

| Item | Detail |
|---|---|
| **Full Title** | "Burden of Infectious Diseases and their Seasonal Variation in India" |
| **Authors** | Durgesh Shukla et al. |
| **Year** | 2016 |
| **Journal** | International Journal of Health Sciences & Research (IJHSR), Vol. 6, Issue 12, December 2016, pp. 33–42 |
| **DOI / URL** | Available at www.ijhsr.org |
| **Geography** | India (national) |
| **Disease** | All infectious diseases (vector-borne, food/water-borne, vaccine-preventable) |
| **Data Source** | IDSP outbreak data |
| **Study Period** | Multi-year |
| **Methodology** | Outbreak frequency analysis; seasonal stratification; CFR calculation |
| **Main Finding** | Vector-borne diseases peak in **monsoon and autumn**; food/water-borne diseases in **summer and monsoon**; vaccine-preventable diseases in **winter and spring** (peak March); CFR ... |
| **How it informs my project** | Provides a national-level baseline for seasonal patterns; justifies my methodology of using IDSP data; allows comparison with my Maharashtra findings |

### Paper 3 — **VERIFIED (NCDC Official Table, 2025)**

| Item | Detail |
|---|---|
| **Title** | Seasonal Influenza A (H1N1): State/UT-wise number of cases & deaths from 2019 to 2025 |
| **Authority** | NCDC/IDSP, Ministry of Health and Family Welfare |
| **Date** | Dated 31.10.2025 (As on 30.09.2025) |
| **File No.** | T-18015/3/70/2015-IDSP(Part) (Computer No. 3149628) |
| **Geography** | All states/UTs |
| **Disease** | Seasonal Influenza A (H1N1) |
| **Time Period** | 2019–2025 |
| **Maharashtra Data** | 2287 (2019), 121 (2020), 387 (2021), 3714 (2022), 1231 (2023), 2072 (2024), 392 (2025 partial) |
| **Limitation** | Annual totals only — cannot show monthly seasonality |
| **Use in project** | Provides official H1N1 data for literature review and background |

### Additional Secondary Sources (in my repo — NOT primary data)

| File | Type | Source | Usability |
|---|---|---|---|
| `vector-borne report.txt` | LinkedIn article (Redcliffe Labs, Jul 2026) | Secondary | Background context only — cites NCVBDC and study data |
| `water-borne.txt` | Blog article (MrMed) | Secondary | Background context only |
| `Top Seasonal Diseases in India Prevention Safety Tips.pdf` | Commercial blog PDF | Secondary | Background only |
| `July 2026_Inf vaccine recommendation (1).pdf` | To be examined | Possibly NCDC | Need to verify |

---

## 8. RECOMMENDED DATA-SCIENCE METHODS

Based on the **actual data** in my repository, these methods are appropriate and defendable for my project:

### Tier 1 — Core Methods (must do)

| Method | Justification | Tool |
|---|---|---|
| **Data cleaning** | 244 disease label variants need normalization ("Dengue", "Suspected Dengue", "Dengue Fever" → one label) | Python (pandas) |
| **Missing value audit** | `Deaths` column has many blanks; `preci`, `LAI`, `Temp` have some gaps | pandas `.isnull().sum()` |
| **Month extraction** | Convert `day`, `mon`, `year` columns to proper datetime | pandas |
| **Monthly aggregation** | Sum cases per (disease × month × year) for seasonal analysis | pandas `groupby` |
| **Descriptive statistics** | Mean, median, SD of monthly cases per disease | pandas `.describe()` |
| **Year-over-year comparison** | Track trends 2009–2022 (my CSV) or 2009–2026 (full dataset) | pandas + matplotlib |
| **Seasonal index** | Monthly average / overall monthly average → values >1 = high season | Python calculation |
| **Peak month identification** | Which month has maximum cases? | pandas `.idxmax()` |
| **Bar charts by month** | Visual representation of seasonal distribution | matplotlib / seaborn |
| **Disease × Month heatmap** | Shows all 5 diseases across 12 months simultaneously | seaborn `heatmap` |

### Tier 2 — Recommended Methods (should do)

| Method | Justification | Tool |
|---|---|---|
| **Multi-year seasonal average** | Average monthly cases across all years to derive typical seasonal curve | pandas |
| **Moving average (3-month rolling)** | Smooth weekly noise in aggregated data | pandas `.rolling()` |
| **Correlation: rainfall vs cases** | My CSV already has `preci` (precipitation) — I can use it | scipy/pandas `.corr()` |
| **Correlation: temperature vs cases** | My CSV already has `Temp` (K) | scipy/pandas |
| **State comparison charts** | Maharashtra vs national average per disease | matplotlib grouped bar |
| **District-level map (Maharashtra)** | Use latitude/longitude columns already in my data | geopandas / folium |

### Tier 3 — Optional (if time permits)

| Method | Justification | Tool |
|---|---|---|
| **Coefficient of Variation** | Measure how seasonal each disease is compared with a uniform distribution | Python |
| **Percentage change YoY** | Example: dengue 2022 vs 2021 in Maharashtra | pandas `.pct_change()` |
| **Simple time series plot** | Monthly cases 2009–2022 with season bands (monsoon shaded) | matplotlib |

> [!NOTE]
> **I do not recommend or attempt** ARIMA, SARIMA, Prophet, or other forecasting models. These require a consistent, complete, and regular time series, which IDSP outbreak data does not provide in a clean form.

---

## 9. FIELD-WORK PLAN

The field component must complement my quantitative analysis — it must not fabricate data.

### Feasible Field Activities

#### Activity 1: Environmental Observation
- **What:** I can observe and photograph stagnant water sources, waterlogging, and open drains in my local area during or after monsoon
- **Permission:** None required for public spaces
- **Record:** Date, location description, type of water body, condition
- **Photographs:** Yes — public areas only, avoiding faces and private property without permission
- **Ethics:** No personal information collected

#### Activity 2: Community Awareness Survey (Small Scale)
- **What:** I can conduct a short survey of 5–10 structured questions on seasonal illness experience, hospital visits during monsoon, and awareness of dengue/malaria prevention
- **Whom:** Neighbours, local residents, family members
- **Permission:** Verbal consent from each respondent
- **Record:** Anonymous questionnaire responses
- **Ethics:** No names, no medical history, no patient details; purely awareness questions

#### Activity 3: Observation at Local Government Health Facility (OPD)
- **What:** I can observe patient footfall at a PHC or sub-district hospital OPD
- **Whom:** Primary Health Centre Medical Officer or District Health Officer
- **Permission:** **Written permission required** from facility head; I should mention that it is for my university project
- **Record:** Monthly OPD trends (aggregate, non-patient-identifying), seasonal pattern of fever/diarrhea cases
- **Photographs:** Only facility exterior or charts on wall — with written permission

#### Activity 4: Interview with ANM / ASHA Worker
- **What:** I can do a brief structured interview about seasonal disease burden in their area
- **Whom:** Accredited Social Health Activist (ASHA) or Auxiliary Nurse Midwife (ANM)
- **Permission:** Verbal consent; inform about academic purpose
- **Sample Questions:**
  1. Which months do you see the most cases of fever/malaria/dengue in your area?
  2. What measures do you take before/during monsoon for mosquito control?
  3. Have you seen any change in dengue or diarrhea cases over the past 3–4 years?
  4. What is the biggest seasonal health challenge in this community?

> [!CAUTION]
> I should avoid collecting: patient names, patient ages linked to disease, hospital registration numbers, or any data that can identify a specific patient. I will use only aggregate, non-identifying information.

---

## 10. DATA QUALITY AND LIMITATIONS

### Limitation 1 — Outbreak-Based vs. Total Disease Burden
**Issue:** IDSP outbreak data records only those cases that were (a) large enough to constitute an "outbreak" and (b) reported to the district/state surveillance unit. The actual total case count is therefore not the same as total incidence.  
**Impact:** I cannot use these numbers to calculate incidence rates (cases per 1,000 population) without denominator data.  
**Mitigation:** I will clearly state in my methodology that the data represents "reported outbreak events from IDSP surveillance" — not total disease incidence.

### Limitation 2 — Reporting Completeness Varies by Year and State
**Issue:** 2020 and 2021 have far fewer rows than other years (151 and 367 rows all-India vs ~1,000+ in other years). This is the COVID-19 pandemic effect — surveillance was disrupted, and health facilities were strained.  
**Mitigation:** I will treat 2020–2021 as outlier years and conduct my analysis both with and without those years.

### Limitation 3 — My CSV is Incomplete (Ends Mid-2022)
**Issue:** `Final_data.csv` has only 19 Maharashtra rows for 2022 (through June), which misses the peak dengue/chikungunya season (July–November).  
**Mitigation:** I will **download the full IDSP dataset from dataful.in/datasets/18514**, which has 35,538 rows through September 2026.

### Limitation 4 — Disease Label Inconsistency
**Issue:** Labels like "Dengue", "Suspected Dengue", "Dengue Fever", "Dengue And Chikungunya", and "Dengue/Chikungunya" appear as separate categories in the data.  
**Mitigation:** I will create a normalization function to map all variants to a canonical label before analysis.

### Limitation 5 — Cholera 2017 Maharashtra Outlier
**Issue:** Maharashtra 2017 cholera shows 5,911 cases — far higher than any other year (next highest: 1,254 in 2016). This dominates the monthly distribution and creates a false November peak.  
**Mitigation:** I will investigate this outbreak specifically and document it; I will also conduct seasonal analysis with and without this outlier.

### Limitation 6 — Precipitation/Temperature Data Source Unclear
**Issue:** My CSV has `preci` and `Temp` columns, but the source metadata does not clearly explain where these meteorological variables came from or what resolution they represent.  
**Mitigation:** I will use them for correlation analysis with a clear caveat that they are auxiliary climate variables merged at district centroid level and may not precisely represent local conditions.

---

## 11. 2–3 POSSIBLE PROJECT DESIGNS

### Option A — RECOMMENDED: Multi-Disease Maharashtra Analysis (2009–2026)

**Research Question:** "What are the seasonal patterns of major epidemic-prone diseases in Maharashtra, India, from 2009 to 2026, as recorded in IDSP outbreak surveillance data, and how have these patterns changed over time?"

| Element | Detail |
|---|---|
| **Diseases** | Dengue, Malaria, Chikungunya, Acute Diarrhoeal Disease (4 diseases) |
| **Geography** | Maharashtra state (all districts) |
| **Time Period** | 2009–2022 (my CSV) + 2023–2026 (from full dataset) = 14–17 years |
| **Government Data** | IDSP outbreak CSV from dataful.in/datasets/18514 |
| **Analysis** | Monthly aggregation, seasonal index, heatmap, year-over-year trend, precipitation correlation |
| **Field Component** | Environmental observation + ASHA/ANM interview |
| **Feasibility** | **HIGH** — data is present and structured; Maharashtra has the most outbreak rows |
| **Strengths** | Most data, best temporal depth, strong seasonal signal, defensible |
| **Limitations** | Outbreak-based data only; missing Mumbai as a separate unit; COVID years disrupted |

### Option B — All-India Multi-Disease Seasonal Analysis

**Research Question:** "What are the seasonal patterns of dengue, malaria, chikungunya, and acute diarrhoeal disease across India from 2009 to 2022, and how do monsoon patterns correlate with disease occurrence?"

| Element | Detail |
|---|---|
| **Diseases** | Dengue, Malaria, Chikungunya, ADD |
| **Geography** | All-India (national aggregation) |
| **Time Period** | 2009–2022 (my CSV — complete for this scope) |
| **Analysis** | Monthly aggregation, seasonal index, heatmap, correlation with precipitation |
| **Field Component** | Environmental observation + community survey |
| **Feasibility** | **HIGH** — data already downloaded and complete |
| **Strengths** | No additional data download needed; national picture |
| **Limitations** | National aggregation masks regional variation; too broad for a local field project |

### Option C — Maharashtra + Mumbai Case Study (Dengue Focus)

**Research Question:** "What are the seasonal and long-term patterns of dengue fever in Maharashtra, with a comparative case study of Mumbai, from 2009 to 2026?"

| Element | Detail |
|---|---|
| **Diseases** | Dengue (primary) + Chikungunya (secondary) |
| **Geography** | Maharashtra + Mumbai (BMC data from PDF) |
| **Time Period** | 2009–2026 (IDSP) + Mumbai annual data from BMC.pdf |
| **Analysis** | Seasonal index, peak month, year-over-year, Mumbai vs rest of Maharashtra |
| **Field Component** | Environmental observation in a Mumbai locality + BMC health worker interview |
| **Feasibility** | **MODERATE** — requires manual extraction from BMC.pdf for Mumbai data |
| **Limitations** | Mumbai is not separable in the IDSP CSV; BMC data in PDF requires manual work |

> [!IMPORTANT]
> **Recommended Choice: Option A** — Multi-Disease Maharashtra Analysis.  
> It is the most methodologically defensible, has the richest data, and aligns with the structure of my IDSP dataset. Maharashtra gives me the best combination of data quality, disease variety, and seasonal signal.

---

## 12. PROVISIONAL RESEARCH QUESTIONS

### Primary Research Question (Option A)
> "What seasonal patterns do dengue, malaria, chikungunya, and acute diarrhoeal disease exhibit in Maharashtra, India, based on IDSP outbreak surveillance data from 2009 to 2026, and how are these patterns associated with monsoon seasons and climate variables?"

### Secondary Questions
1. Which months represent peak outbreak periods for each disease in Maharashtra?
2. Have seasonal peaks shifted or intensified over the study period?
3. How does Maharashtra's seasonal disease pattern compare with the national pattern?
4. Which districts in Maharashtra experience the highest seasonal burden?
5. Is there a measurable correlation between monthly precipitation and disease cases?

---

## 13. PROVISIONAL OBJECTIVES

1. To identify and compile government health surveillance data on major seasonal diseases in Maharashtra using IDSP outbreak reports (2009–2026)
2. To perform data cleaning, normalization, and temporal aggregation of IDSP outbreak records
3. To quantify seasonal patterns using monthly case aggregation and seasonal index calculations
4. To identify peak outbreak months for dengue, malaria, chikungunya, and acute diarrhoeal disease in Maharashtra
5. To compare Maharashtra's seasonal disease burden with the national pattern
6. To examine year-over-year trends and inter-annual variability in seasonal disease occurrence
7. To explore the correlation between precipitation and disease case counts using meteorological data present in the dataset
8. To complement the quantitative analysis with field observations of environmental risk factors

---

## 14. EXACT DATASETS / DOWNLOADS NEEDED NEXT

### Priority 1 — CRITICAL (Download Immediately)

| What to Download | Where | Why |
|---|---|---|
| **Full IDSP Outbreak Master Dataset** | https://dataful.in/datasets/18514 | My CSV ends in June 2022; the full dataset has 35,538 rows through 2026 |
| **NCVBDC Annual Dengue/Malaria/Chikungunya Tables (2009–2024)** | https://nvbdcp.gov.in/index4.php?lang=1&level=0&linkid=431&lid=3718 | Cross-validation of my IDSP data; state-wise annual totals |

### Priority 2 — Important

| What to Download | Where | Why |
|---|---|---|
| **NCDC Weekly Reports (2022–2025)** | https://ncdc.mohfw.gov.in/index4.php?lang=1&level=0&linkid=422&lid=3689 | I have 2026 weeks 1–31; I need 2022–2025 historical weekly PDFs |
| **IMD Rainfall Data (Monthly, Maharashtra 2009–2026)** | https://mausam.imd.gov.in or https://data.gov.in/search?title=rainfall+maharashtra | To properly match precipitation with disease months |
| **Maharashtra Directorate of Health Services Annual Report** | https://arogya.maharashtra.gov.in | District-wise disease data for cross-validation |

### Priority 3 — For Field Work

| What to Do | Where |
|---|---|
| Read all 31 NCDC 2026 weekly PDF reports | Already in my folder (`NCDC weekly outbreaks/2026/`) |
| Extract tables from BMC.pdf | In my folder — use `pypdf` or manual reading |
| Conduct 1 environmental observation session | My local area |
| Conduct 1 ASHA/ANM interview | Local PHC or health post |

---

## 15. SOURCE LIST

### Official Government Sources (Tier 1)

1. Ministry of Health and Family Welfare (2026). *Master Data: State, District and Disease-wise Cases and Death reported due to Outbreak of Diseases as per Weekly reports under IDSP* [Dataset]. Dataful.in.

2. National Centre for Disease Control (2026). *IDSP Key Activities & Achievements* [Official Web Page]. NCDC/MOHFW. https://ncdc.mohfw.gov.in/includes/About/CentresAndDivision/IDSP.php

3. National Centre for Disease Control (2025). *Seasonal Influenza A (H1N1): State/UT-wise number of cases & deaths from 2019 to 2025 (As on 30.09.2025)*. File No. T-18015/3/70/2015-IDSP(Part). NCDC, Ministry of Health and Family Welfare.

4. National Centre for Vector Borne Diseases Control. *Dengue Cases and Deaths in India from 2010*. NCVBDC/MOHFW. https://nvbdcp.gov.in/index4.php?lang=1&level=0&linkid=431&lid=3718

5. Integrated Disease Surveillance Programme. *Weekly Outbreak Reports*. NCDC/MOHFW. https://ncdc.mohfw.gov.in/index4.php?lang=1&level=0&linkid=422&lid=3689

6. Municipal Corporation of Greater Mumbai (BMC). *Health Reports* [PDF in repository: BMC.pdf].

### Research Papers (Tier 3)

7. Sakure, K., Tankhiwale, S., Patil, V., & Khadse, R. (2026). The Demographic and Seasonal Variation of Dengue Virus Infection in Gondia, A Tribal District in Maharashtra, India. *International Journal of Current Pharmaceutical Review and Research*.

8. Shukla, D., et al. (2016). Burden of Infectious Diseases and their Seasonal Variation in India. *International Journal of Health Sciences & Research*, 6(12), 33–42. Available at: www.ijhsr.org

### International Organizations (Tier 2)

9. World Health Organization (2024). *Dengue and severe dengue* [Fact Sheet]. WHO. https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue

---

*Audit prepared: September 28, 2026*  
*Data verified from: Local repository at c:\Users\ADMIN\OneDrive\Desktop\Field Project*  
*Python environment: C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe*  
*All numerical values computed from actual files — none invented*