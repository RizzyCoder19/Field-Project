# Phase 4A: Clean Analytical Dataset Quality Report

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Degree & Institution:** B.Sc. Data Science, Semester III | RP Institute, Affiliated to University of Mumbai  
**Candidate Name:** Khan Umar  
**Academic Year:** 2026–27  
**Geography:** Maharashtra  
**Temporal Scope:** 2022–2026 (Weeks 2022 W25 to 2026 W32)  
**Primary Surveillance Source:** Government of India / MoHFW / DGHS / NCDC / IDSP Weekly Outbreak Surveillance  
**Report Date:** October 2026  
**Input Immutable Raw Layer:** `data_pipeline/master/NCDC_Maharashtra_MASTER_RAW.csv` (780 records)  
**Output Clean Analytical Dataset:** `data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv` (780 records)  
**Analytical Weekly Calendar:** `data_pipeline/analysis/Maharashtra_WEEKLY_CALENDAR.csv` (213 weeks)  
**Directive:** Strict Raw Provenance Preservation (Additive Cleaning Only)

---

## 1. Executive Summary & Row Accounting

Phase 4A established the separate clean analytical dataset layer from the immutable raw master dataset. In accordance with forensic non-destructive requirements:
- **Zero raw fields were overwritten or modified.**
- **Zero outbreak rows were deleted or excluded** (780 master rows $\rightarrow$ 780 clean rows).
- **Zero synthetic records or fake NIL outbreak rows were inserted.**
- All transformations are purely additive and fully documented.

### Row Accounting Table:
| Metric | Count | Notes |
| :--- | :---: | :--- |
| **Source Master Rows Ingested** | **780** | From `data_pipeline/master/NCDC_Maharashtra_MASTER_RAW.csv` |
| **Clean Analytical Rows Created** | **780** | In `data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv` |
| **Rows Excluded / Removed** | **0** | Complete raw preservation; no row exclusions |
| **Rows Retained** | **780 (100.0%)** | 100% record retention |
| **Audited Surveillance Weeks** | **213** | Accounted in `Maharashtra_WEEKLY_CALENDAR.csv` |

---

## 2. District Cleaning & Modern Administrative Name Preservation (Step 3)

The field `district_clean` was constructed to resolve formatting noise while adhering strictly to the directive: **Do NOT automatically convert modern district names to historical names.**

### Core District Cleaning Actions:
1. **Modern Name Preservation**:
   - `Dharashiv` is preserved as `Dharashiv` in `district_clean` (11 occurrences).
   - `Chhatrapati Sambhajinagar` is preserved as `Chhatrapati Sambhajinagar` (or `Aurangabad` when the source report explicitly used Aurangabad).
   - An additive crosswalk field `district_historical_census` was created to document the 2011 Census equivalent (`Dharashiv` $\rightarrow$ `Osmanabad`, `Chhatrapati Sambhajinagar` $\rightarrow$ `Aurangabad`) without overwriting the cleaned field.
2. **Whitespace and Line-Break Artifacts Resolved**:
   - `Chandrapu r` $\rightarrow$ `Chandrapur` (resolved formatting split).
   - `Sindhudur g` $\rightarrow$ `Sindhudurg` (resolved formatting split).
   - `Palaghar` $\rightarrow$ `Palghar` (standardized phonetic spelling variant).
3. **Tracking & Provenance**:
   - `district_clean_status`: `VERBATIM_MATCH` (728), `WHITESPACE_ARTIFACT_RESOLVED` (37), `MODERN_NAME_PRESERVED` (11), `SPELLING_STANDARDIZED` (4).
   - `district_mapping_note`: Explicit rationale recorded for every transformation.

---

## 3. Disease Cleaning & Clinical Granularity (Step 4)

The field `disease_clean` resolves extraction boundary contamination, extraneous prefixes, and typographical whitespace while strictly preserving clinical distinctions:

### Crucial Principle: NO Epidemiological Merging
As required, distinct clinical presentations are kept completely separate:
- `Dengue` vs. `Chikungunya` vs. `Dengue & Chikungunya` (all 3 maintained independently)
- `Acute Diarrheal Disease` vs. `Food Poisoning` vs. `Cholera` (kept distinct)
- `Measles` vs. `Chickenpox` (kept distinct)
- `Malaria` subspecies preserved (`Malaria (P.vivax)`, `Malaria (P.falciparum)`, `Mixed Malaria`)
- `Hepatitis A` vs. `Hepatitis` vs. `Hepatitis E` (kept distinct)
- `Zika Virus`, `Scrub Typhus`, `Leptospirosis`, `Fever` (all distinct)

### Boundary Artifacts Trimmed (22 Items):
- Stripped neighboring state/district text that leaked into the cell boundary (e.g. `Bihar Sitamarhi Acute Diarrheal Disease` $\rightarrow$ `Acute Diarrheal Disease`, `Madhya Pradesh Damoh Acute Diarrheal Disease` $\rightarrow$ `Acute Diarrheal Disease`).
- Standardized broken whitespace (e.g. `Acute Gastroenterit is` $\rightarrow$ `Acute Gastroenteritis`, `Chikunguny a` $\rightarrow$ `Chikungunya`).
- `disease_clean_status`: `CLEAN` (653 rows), `BOUNDARY_TRIMMED` (84 rows), `WHITESPACE_STANDARDIZED` (39 rows), `SPELLING_STANDARDIZED` (4 rows).

---

## 4. Temporal Variables & Date Quality Audit (Step 5)

Additive temporal variables were generated to establish standardized anchors for time-series modeling:
- `epi_year`: Epidemiological year (2022–2026).
- `epi_week`: Epidemiological week number (1–52).
- `week_start_date`: Monday of the epidemiological week.
- `week_end_date`: Sunday of the epidemiological week.
- `month`: Numerical calendar month (1–12).
- `month_name`: Full month name (January to December).
- `quarter`: Calendar quarter (`Q1`, `Q2`, `Q3`, `Q4`).

### Date Quality Flagging:
- **`NORMAL` (729 rows)**: Both outbreak start date and reporting date are present, valid, and chronologically consistent.
- **`REPORT_DATE_MISSING` (14 rows)**: The source report omitted the reporting date column; start date and epi-week dates remain intact.
- **`OUTBREAK_DATE_AFTER_REPORT_DATE` (37 rows)**: Outbreak start date is chronologically later than the reporting date. **As instructed, source dates were NOT altered or swapped.** They are preserved verbatim with the anomaly flag recorded for downstream filtering.

---

## 5. Surveillance Completeness & Observation Period Status (Step 6)

To prevent analytical distortion when evaluating seasonality across years, the field `observation_period_status` explicitly tags incomplete observation windows:

| Year | Surveillance Window | Status | Epidemiological Justification |
| :---: | :--- | :---: | :--- |
| **2022** | Weeks 25–52 (28 weeks) | `PARTIAL_YEAR` | Surveillance archive begins mid-year; Weeks 1–24 missing pre-acquisition |
| **2023** | Weeks 1–50 (excl. W15) | `PARTIAL_YEAR` | Week 15 missing and Weeks 51–52 absent |
| **2024** | Weeks 1–52 (52 weeks) | `COMPLETE_YEAR` | Full 52-week surveillance cycle available |
| **2025** | Weeks 1–52 (52 weeks) | `COMPLETE_YEAR` | Full 52-week surveillance cycle available |
| **2026** | Weeks 1–32 (32 weeks) | `PARTIAL_YEAR` | Year-to-date surveillance cutoff at Week 32 |

- Rows with `COMPLETE_YEAR`: **452 records** (57.9%)
- Rows with `PARTIAL_YEAR`: **328 records** (42.1%)

---

## 6. Analytical Weekly Calendar (Step 7)

A dedicated calendar table [`Maharashtra_WEEKLY_CALENDAR.csv`](file:///c:/Users/ADMIN/OneDrive/Desktop/Field%20Project/data_pipeline/analysis/Maharashtra_WEEKLY_CALENDAR.csv) was created across all 213 audited surveillance weeks:
- **`OUTBREAK_REPORTED` (190 weeks)**: Weeks with $\ge 1$ outbreak notification.
- **`NIL` (23 weeks)**: Confirmed zero-outbreak surveillance weeks with explicit verbatim evidence.
- **No artificial zero rows were added to the outbreak table.** This maintains the clean separation between outbreak event data and surveillance temporal calendars.

---

## 7. Repeat Outbreak Tracking (Step 8)

The field `repeat_record_status` links each record to the longitudinal repeat audit:
- **`SAME_OUTBREAK_REPEATED` (4 records)**: Exact duplicate notification carried forward in subsequent weeks.
- **`UPDATED_OUTBREAK` (31 records)**: Progressive case count updates for an ongoing outbreak.
- **`SEPARATE_OUTBREAK` (224 records)**: Independent outbreak episodes within 3 weeks in the same district.
- **`NOT_FLAGGED` (521 records)**: Isolated outbreaks with no temporal repeat associations.

---

## 8. Catalog of Transformations Performed vs. Not Performed

### Transformations Performed (Additive Only):
1. Extracted `official_idsp_id` from notes field.
2. Cleaned whitespace and line breaks in district names (`Chandrapu r` $\rightarrow$ `Chandrapur`).
3. Preserved modern administrative names (`Dharashiv`, `Chhatrapati Sambhajinagar`).
4. Provided census crosswalk (`district_historical_census`).
5. Trimmed table cell boundary noise and extraneous state/district prefixes from disease text.
6. Derived standardized temporal variables (`epi_year`, `epi_week`, `month`, `month_name`, `quarter`).
7. Flagged date quality and reporting date absences without altering raw dates.
8. Applied observation period status (`COMPLETE_YEAR` vs. `PARTIAL_YEAR`).
9. Linked longitudinal repeat outbreak classifications.

### Transformations NOT Performed (Strictly Deferred):
1. **NO row deletions or exclusions**: Every single one of the 780 master records was retained.
2. **NO merging of distinct diseases**: Dengue, Chikungunya, and combo outbreaks remain distinct.
3. **NO date swapping or "repair"**: The 37 inverted date rows were preserved verbatim with flags.
4. **NO conversion of Dharashiv / Chhatrapati Sambhajinagar** into old colonial/historical names in the primary clean district field.
5. **NO insertion of fake zero-outbreak rows** into the outbreak table.
6. **NO disease selection or statistical aggregation**.
