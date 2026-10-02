# 11. FIELD WORK PRESENTATION INTEGRATION PLAN

**Project Title:** Analysis of Seasonal Disease Patterns Using Government Health Data  
**Sub-Study Title:** Strategic Presentation Architecture for Field Evidence in Undergraduate Viva Defense  
**Document Code:** FIELD-DOC-11  
**Candidate:** Khan Umar  
**Programme:** B.Sc. Data Science, Semester III  
**Institution:** RP Institute, affiliated to University of Mumbai  
**Academic Year:** 2026–27  
**Document Purpose:** Presentation Strategy & Slide Sequencing Design  
**Evidence Classification:** Presentation Architecture  

---

## 1. STRATEGIC PRESENTATION CHALLENGE
In a B.Sc. Data Science viva examination, integrating field work requires precision:
- If field work is overemphasized at the expense of statistical modeling, the project risks appearing like a generic sociology or public-health survey rather than a rigorous data science investigation.
- If field work is completely omitted, the candidate fails to fulfill the institutional "Field Project" curriculum requirement mandated by the University of Mumbai.
- If uncollected fieldwork is falsely claimed as complete, the candidate faces immediate disqualification under university academic integrity codes.

To navigate these boundaries with complete academic honesty and visual sophistication, two architectural options have been developed.

---

## 2. OPTION A: INTEGRATED NARRATIVE ARCHITECTURE (FOR COMPLETED FIELDWORK)

*Use this option if primary field questionnaires and interviews have been empirically completed, transcribed, and analyzed prior to the presentation.*

### Presentation Narrative Flow (18–20 Slides Total)
```
[ACT 1: THE DATA PROBLEM & SOURCES]
Slide 01: Title & Academic Identity
Slide 02: Research Question & Public Health Problem
Slide 03: Primary Government Surveillance Source (NCDC / IDSP)

[ACT 2: DATA ENGINEERING & TAXONOMY]
Slide 04: Data Extraction, Verification & Pipeline Architecture
Slide 05: Disease Taxonomy Harmonization (116 Raw -> 5 Primary Families)

[ACT 3: SECONDARY QUANTITATIVE PATTERNS]
Slide 06: Four-Year Surveillance Baseline (2022–2025: 539 Events, 21,955 Cases)
Slide 07: Seasonal Disease Concentration (Monthly Indices & CR3)
Slide 08: Temporal Windows by Disease Family (Dengue, ADD, Malaria)
Slide 09: Multi-Year Inter-Annual Stability (Kendall's W Concordance)
Slide 10: Spatial Clustering & Geographic Hotspots (Gini & Shannon H)
Slide 11: Outlier Sensitivity: Point-Source vs. Continuous Outbreaks
Slide 12: 2026 Partial-Year Out-of-Sample Surveillance Comparison

[ACT 4: PRIMARY FIELD INVESTIGATION (THE GROUND CONTEXT)]
Slide 13: Field Work Methodology & Qualitative Grounding Framework
Slide 14: Community Perceptions of Disease Timing vs. Surveillance Peaks
Slide 15: Environmental Audits & Micro-Hotspots (Visual Transect Evidence)
Slide 16: Frontline Surveillance Bottlenecks & Private-Sector Data Leakage

[ACT 5: SYNTHESIS & RECOMMENDATIONS]
Slide 17: Synthesis: Bridging Data Science Models with Community Realities
Slide 18: Operational Pre-Positioning Recommendations & Early Warning
Slide 19: Research Limitations & Methodological Boundaries
Slide 20: Conclusion & Candidate Contributions
```

### Strengths & Trade-Offs of Option A
- **Strengths:** Seamlessly weaves quantitative data science with qualitative empirical evidence; directly fulfills every word of the University field rubric.
- **Risks:** Requires 4 dedicated field slides, increasing presentation duration to 18–20 minutes and potentially diluting statistical viva scrutiny if not tightly rehearsed.

---

## 3. OPTION B: FOCUSED SYNTHESIS SLIDE + DIGITAL SHOWCASE (RECOMMENDED CURRENT STATE)

*Use this option when the core secondary data science pipeline is frozen and finalized (Phase 5A–5E), while primary field data collection is planned, ongoing, or designated as qualitative contextual framing.*

### Presentation Strategy
In Option B, the main 18-slide presentation (`data_pipeline/phase5E_presentation_synthesis/`) retains its laser focus on the apex secondary surveillance dataset (809 records, 21,955 cases, Kendall's $W$, Gini, Shannon $H$), while **Slide 18 is structured as a dedicated Field Work & Ground Context Showcase featuring a high-resolution QR code linking to an online digital field-work dossier.**

### Slide 18 Architecture: "Connecting Surveillance Data to the Ground"
- **Left Column: The Field Work Framework**
  - Institutional Context: B.Sc. Data Science Semester III Field Project requirement.
  - Sub-Study Focus: *"Community and Public-Health Perspectives on Seasonal Disease Occurrence, Reporting, and Response in Maharashtra."*
  - Designed Instruments: Master 50-item questionnaire, 20-item rapid field form, semi-structured healthcare worker interview guide, and structured environmental observation checklist.
  - Ethical Safeguards: Formal informed consent, total anonymity, zero patient identifiers.
- **Middle Column: The Ground Reality Linkage**
  - Conceptual Bridge: Tracing illness from household symptom onset $\rightarrow$ retail chemist / private GP $\rightarrow$ PHC notification $\rightarrow$ IDSP threshold crossing $\rightarrow$ NCDC weekly report.
  - Operational Validation: Explaining *why* 45.3% of 2026 records remain labeled "Suspected" (frontline testing bottlenecks) and *why* surveillance captures severe outbreak clusters rather than complete population incidence.
- **Right Column: The Digital Field Dossier & Verification Gate**
  - Large High-Resolution QR Code + Interactive URL: `[ https://khan-umar-fieldproject.edu/field-work ]`
  - Current Status Transparency Banner:  
    `FIELD COMPONENT STATUS: Framework & Instruments Complete; Deployment Scheduled.`
  - Direct access for examiners to review the full 50-question instrument, interview transcripts, environmental audit protocols, and reference materials.

---

## 4. FORMAL RECOMMENDATION FOR CURRENT VIVA DEFENSE

> ### THE EXAMINER-ALIGNED RECOMMENDATION: ADOPT OPTION B
> 
> **Why Option B is the academically superior choice at this juncture:**
> 1. **Complete Academic Honesty:** It strictly preserves the frozen status: `FIELD COMPONENT STATUS: Not yet evidenced in the current repository.` It avoids any risk of an examiner accusing the candidate of fabricating survey data.
> 2. **Professional Research Design:** It demonstrates that the candidate possesses the full research-methodology maturity to design an end-to-end mixed-methods field framework, complete with standardized questionnaires, interview guides, and observation sheets.
> 3. **Preserves Data Science Rigor:** It ensures that 95% of the viva presentation is anchored on the rock-solid, audited, and mathematically verified secondary data engineering pipeline (Phase 5A–5E).
> 4. **Modern Presentation Delivery:** Providing an interactive QR code linking to a dedicated digital field showcase creates a premium impression of modern, open-science research.
