# 09. PRESENTATION REFERENCES & SOURCE DOCUMENTATION

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Document Code:** PHASE-5E-DOC-09  
**Candidate:** Khan Umar  
**Programme:** B.Sc. Data Science, Semester III  
**Institution:** RP Institute, affiliated to University of Mumbai  
**Academic Year:** 2026–27  

---

## 1. PRIMARY GOVERNMENT SURVEILLANCE SOURCE

1. **National Centre for Disease Control (NCDC) / Integrated Disease Surveillance Programme (IDSP)**  
   *Directorate General of Health Services (DGHS), Ministry of Health & Family Welfare (MoHFW), Government of India.*  
   - **Document Archive:** Weekly Disease Outbreak Reports (Form C / Weekly Outbreak Bulletins), 2022 through 2026 (Weeks 01–32).  
   - **Coverage:** Official district-level investigated disease outbreaks across Maharashtra State.  
   - **Official Portal:** https://idsp.mohfw.gov.in / https://ncdc.mohfw.gov.in  
   - **Curated Dataset:** `data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv` (809 records; 539 completed-year baseline records, 45 out-of-sample comparison records).

---

## 2. ACADEMIC & INSTITUTIONAL GUIDELINES

2. **University of Mumbai**  
   *Faculty of Science and Technology, Board of Studies in Data Science.*  
   - **Curriculum:** Revised Syllabus for B.Sc. Data Science, Semester III (Academic Year 2026–27).  
   - **Course Component:** Field Project / Applied Data Science Practicum (Course Code: DS-FP-301).  
   - **Guidelines:** Objectives, methodology structure, formatting requirements, and viva examination parameters.

3. **RP Institute, Department of Data Science**  
   *Affiliated to the University of Mumbai.*  
   - **Document:** Faculty Course Instructions, Rubric Guidelines, and Field Project Report Structure (Instruction Notes, 2026).  
   - **Specifications:** Chapter taxonomy (Chapters 1–5, 8–9), font specifications (Times New Roman 14 bold / 12 regular, 1.5 line spacing), and viva presentation expectations.

---

## 3. METHODOLOGICAL & STATISTICAL LITERATURE

4. **Murhekar, M. V., et al. (2020)**  
   *Epidemiology of infectious disease outbreaks reported under the Integrated Disease Surveillance Programme, India.*  
   - *Indian Journal of Medical Research*, 151(5), 450–459.  
   - *Application:* Provides the epidemiological and administrative context of IDSP notification triggers, Rapid Response Team (RRT) investigations, and reporting threshold mechanics across Indian states.

5. **World Health Organization (WHO) (2018)**  
   *Integrated Disease Surveillance and Response in the South-East Asia Region: Technical Guidelines.*  
   - WHO Regional Office for South-East Asia, New Delhi.  
   - *Application:* Principles of outbreak thresholds, indicator-based surveillance versus event-based surveillance, and the distinction between outbreak detection and endemic disease monitoring.

6. **Kendall, M. G. (1938)**  
   *A new measure of rank correlation.*  
   - *Biometrika*, 30(1/2), 81–93.  
   - *Application:* Mathematical formulation of Kendall's coefficient of concordance ($W$) applied to evaluate the inter-annual stability of monthly disease rank profiles across 2022–2025.

7. **Kruskal, W. H., & Wallis, W. A. (1952)**  
   *Use of ranks in one-criterion variance analysis.*  
   - *Journal of the American Statistical Association*, 47(260), 583–621.  
   - *Application:* Non-parametric one-way analysis of variance applied to test whether monthly reported outbreak frequencies differ significantly from random uniform distribution across calendar months.

8. **Benjamini, Y., & Hochberg, Y. (1995)**  
   *Controlling the false discovery rate: a practical and powerful approach to multiple testing.*  
   - *Journal of the Royal Statistical Society: Series B (Methodological)*, 57(1), 289–300.  
   - *Application:* Multiple hypothesis testing correction to control false discovery rate across simultaneous seasonal statistical tests for five disease families.

9. **Bhatt, S., et al. (2013)**  
   *The global distribution and burden of dengue.*  
   - *Nature*, 496(7446), 504–507.  
   - *Application:* Vector-borne transmission dynamics, monsoon dependency of Aedes aegypti breeding cycles, and seasonal concentration mechanisms in South Asia.

---

## 4. STANDARDS & PROVENANCE DOCUMENTATION

10. **International Organization for Standardization (ISO)**  
    *ISO 8601:2019: Date and time — Representations for information interchange.*  
    - *Application:* Standardized epidemiological week numbering (`epi_week`), year-boundary week assignment, and multi-year calendar synchronization.

11. **Authoritative Project Audit Manifest**  
    *Repository Provenance & Audit Trail, Field Project Repository (master branch).*  
    - `data_pipeline/REPOSITORY_MANIFEST.md`  
    - `data_pipeline/master/PHASE4B_MASTER_DATASET_REBUILD_REPORT.md`  
    - `data_pipeline/phase5D_interpretation_validation/12_PHASE5D_ANALYSIS_REPORT.md`
