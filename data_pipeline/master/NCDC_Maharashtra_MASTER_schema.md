# NCDC Maharashtra Master Dataset Schema

**Project:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Scope:** Maharashtra, 2022–2026  
**Source:** Government of India / MoHFW / DGHS / NCDC / IDSP Weekly Outbreak Surveillance  
**Schema Version:** 1.0  
**Created:** October 2026  
**Directive:** Raw source fields are NEVER overwritten. Normalized fields are additive only.

---

## Design Principles

1. **Forensic Provenance First:** Every row traces back to a specific page in a specific government PDF. No row may exist without `source_pdf` and `source_page`.
2. **Raw Fields Are Sacred:** All `*_raw` fields preserve exactly what the NCDC report says — including typos, abbreviations, inconsistencies, and partial dates.
3. **Normalized Fields Are Additive:** `district_normalized` and `disease_normalized` are added alongside raw fields. They never replace them.
4. **Confidence Is Mandatory:** Every row must carry an `extraction_confidence` score reflecting the reliability of its parsed values.
5. **NIL Weeks Are Explicit:** Weeks where Maharashtra had zero outbreaks are represented as zero-row weeks in the Week Status Register, NOT as zero-filled rows in the outbreak table.

---

## Table: `NCDC_Maharashtra_MASTER_RAW`

### Group 1 — Record Identity

| Column | Data Type | Description |
| :--- | :--- | :--- |
| `record_id` | STRING | Unique record identifier. Format: `MAHA-{YYYY}-W{WW}-{SEQ}` where SEQ is a zero-padded sequence number within the week. Example: `MAHA-2022-W25-001`. Never null. Never repeated. |
| `source_year` | INTEGER | Calendar year of the source weekly report. Values: 2022–2026. Derived from the PDF's year folder. |
| `source_week` | INTEGER | Epidemiological week number from the PDF filename (authoritative). Values: 1–52. Note: For 2022 collection starts at Week 25. |
| `source_pdf` | STRING | Relative path to the source PDF from the project root. Example: `NCDC weekly outbreaks/2022/week25.pdf`. Never null. |
| `source_page` | INTEGER | Page number within the source PDF from which this row was extracted (1-indexed). Null only if extraction method could not identify page. |
| `internal_week_raw` | STRING | Raw week number as extracted from the PDF text stream. May differ from `source_week` in older PDFs due to character encoding corruption. Preserved verbatim. |
| `week_verification_status` | STRING | Cross-check result between `source_week` and `internal_week_raw`. Values: `MATCH` / `ENCODING_MISMATCH` / `UNREADABLE` / `NOT_CHECKED`. |

---

### Group 2 — Geographic Fields

| Column | Data Type | Description |
| :--- | :--- | :--- |
| `state` | STRING | State name as it appears in the NCDC report. For this dataset always `Maharashtra` or abbreviation thereof. Preserved verbatim from source. |
| `district_raw` | STRING | District name exactly as printed in the NCDC report table. May include abbreviations, typos, alternative spellings. Never null for extractable rows. |
| `district_normalized` | STRING | Normalized district name mapped to the official Government of Maharashtra Census 2011 district list. Null if mapping is ambiguous or uncertain. See normalization notes below. |

---

### Group 3 — Disease & Outbreak Fields

| Column | Data Type | Description |
| :--- | :--- | :--- |
| `disease_raw` | STRING | Disease or syndrome name exactly as printed in the NCDC report. Preserves abbreviations, mixed naming conventions (e.g., "AES", "AEFIBNS", "Dengue (T)", "Scrub Typhus"). Never null for extractable rows. |
| `disease_normalized` | STRING | Normalized disease label mapped to a controlled vocabulary. Applied only where mapping is unambiguous. Null if uncertain. See normalization notes below. |
| `cases` | INTEGER | Number of human cases reported. Extracted from the "Cases" column in the NCDC outbreak table. Null if not readable or not reported. |
| `deaths` | INTEGER | Number of deaths reported. Extracted from the "Deaths" column. Zero is a valid value (outbreak with no fatalities). Null if not readable. |
| `status_raw` | STRING | Status field from the NCDC table (e.g., "Under Investigation", "Outbreak Controlled", "Laboratory confirmed", "Presumptive"). Preserved verbatim. Null if column absent or unreadable. |

---

### Group 4 — Temporal Fields

| Column | Data Type | Description |
| :--- | :--- | :--- |
| `outbreak_starting_date_raw` | STRING | Outbreak start date as printed in the source PDF, verbatim. Format varies by year and report. Example: "20th June 2022", "20-06-2022", "Week 25". Null if column absent or unreadable. |
| `outbreak_starting_date` | DATE | Parsed, ISO-8601 date (YYYY-MM-DD) derived from `outbreak_starting_date_raw`. Null if raw value is ambiguous, incomplete, or unparseable. |
| `reporting_date_raw` | STRING | Date of the weekly report as stated in the PDF header or footer, verbatim. |
| `reporting_date` | DATE | Parsed ISO-8601 date derived from `reporting_date_raw`. Null if unparseable. |
| `week_start_date` | DATE | Calculated Monday of the epidemiological week (`source_year` + `source_week`). Always populated. Used as the primary temporal anchor for analysis. |
| `week_end_date` | DATE | Calculated Sunday of the epidemiological week. Always populated. |

---

### Group 5 — Extraction Provenance

| Column | Data Type | Description |
| :--- | :--- | :--- |
| `extraction_method` | STRING | How the data was extracted from the PDF. Values: `TEXT` (automated text-layer extraction from digitally-typed PDF) / `OCR` (optical character recognition from image-rendered PDF) / `MANUAL` (hand-entered for any records requiring human review). |
| `extraction_confidence` | STRING | Reliability rating for this row's extracted values. Values: `HIGH` / `MEDIUM` / `LOW`. Assignment criteria: HIGH = all fields extracted cleanly with no ambiguity; MEDIUM = 1–2 minor fields uncertain or estimated; LOW = structural parsing was difficult, OCR quality poor, or district/disease mapping uncertain. |
| `ocr_raw_text` | TEXT | For OCR-extracted rows only: the raw OCR output string for the relevant page region. Null for TEXT method rows. Preserved for audit trail. |
| `validation_status` | STRING | Manual validation status. Values: `UNVALIDATED` (default, not yet spot-checked) / `VALIDATED` (row confirmed against source PDF) / `CORRECTED` (row corrected during validation) / `FLAGGED` (row has a known quality issue requiring review) / `REJECTED` (row determined to be erroneous and excluded from analysis). |
| `notes` | TEXT | Free-text audit notes. Records: parsing difficulties, encoding issues, ambiguous values, cross-references to other rows, manual corrections applied. Null if no issues. |

---

## Normalization Notes

### District Normalization

The `district_normalized` field maps `district_raw` to the 36 official Maharashtra districts as per the Census 2011 list:

Ahmednagar, Akola, Amravati, Aurangabad, Beed, Bhandara, Buldhana, Chandrapur, Dhule, Gadchiroli, Gondia, Hingoli, Jalgaon, Jalna, Kolhapur, Latur, Mumbai City, Mumbai Suburban, Nagpur, Nanded, Nandurbar, Nashik, Osmanabad, Palghar, Parbhani, Pune, Raigad, Ratnagiri, Sangli, Satara, Sindhudurg, Solapur, Thane, Wardha, Washim, Yavatmal

**Mapping Rules:**
- Abbreviations (e.g., "MH", "Mum") → mapped only if unambiguous
- Spelling variants (e.g., "Aurangabad" / "Chhatrapati Sambhajinagar") → mapped with note in `notes` field
- "Mumbai" without qualifier → mapped to `Mumbai City` with LOW confidence flag
- Any district name not resolvable → `district_normalized` left NULL; flag in `notes`

### Disease Normalization

The `disease_normalized` field applies a preliminary controlled vocabulary. This vocabulary is NOT final — disease categories for analysis have NOT been selected yet.

| Raw Label Examples | disease_normalized | Notes |
| :--- | :--- | :--- |
| Dengue, Dengue (T), Dengue fever | `Dengue` | |
| Malaria (P.f), Malaria (P.v), Malaria | `Malaria` | P.f = Plasmodium falciparum; P.v = P. vivax; retain in notes |
| Chikungunya, CHIKV | `Chikungunya` | |
| AES, AES/JE, Acute Encephalitis Syndrome | `AES` | |
| Scrub Typhus, Scrub typhus | `Scrub_Typhus` | |
| AEFIBNS, Fever with NS1 | `AEFIBNS` | Pending precise disease identification |
| Leptospirosis | `Leptospirosis` | |
| Cholera | `Cholera` | |
| Typhoid | `Typhoid` | |
| Gastroenteritis, GE, Diarrhoea | `Gastroenteritis` | Review needed — may be distinct conditions |
| COVID-19 | `COVID-19` | |
| Any unrecognized label | NULL | Add to fragmentation review list |

---

## Week Status Register Fields

The file `WEEK_STATUS_REGISTER.csv` uses this schema (separate from the outbreak table):

| Column | Description |
| :--- | :--- |
| `year` | Source year |
| `week` | Source week number |
| `pdf_filename` | Source PDF filename |
| `pdf_valid` | YES / NO |
| `week_status` | `NIL_CONFIRMED` / `MAHARASHTRA_RECORDS_PRESENT` / `MAHARASHTRA_NOT_FOUND` / `REPORT_MISSING` / `REPORT_INVALID` / `EXTRACTION_UNCERTAIN` |
| `records_extracted` | Number of Maharashtra outbreak rows extracted (0 for NIL weeks) |
| `nil_evidence` | Verbatim text from the PDF confirming NIL/no Maharashtra outbreak (if applicable) |
| `notes` | Free text |

---

## Repeat Record Audit Fields

The file `REPEAT_RECORD_AUDIT.csv` tracks potentially repeated outbreak records across weeks:

| Column | Description |
| :--- | :--- |
| `record_id_a` | First occurrence record_id |
| `record_id_b` | Second (or later) occurrence record_id |
| `year_a` / `week_a` | Year and week of first occurrence |
| `year_b` / `week_b` | Year and week of second occurrence |
| `district_raw` | District (both occurrences) |
| `disease_raw` | Disease (both occurrences) |
| `cases_a` / `cases_b` | Case counts in both reports |
| `deaths_a` / `deaths_b` | Death counts in both reports |
| `repeat_classification` | `SEPARATE_OUTBREAK` / `SAME_OUTBREAK_REPEATED` / `UPDATED_OUTBREAK` / `UNCLEAR` |
| `evidence` | Reasoning for classification |

---

*Schema version 1.0 — October 2026 — Non-destructive, forensic-first design.*
