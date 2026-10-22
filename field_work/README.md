<div align="center">

# 🧪 Field Work & Clinical Immersion Archive
### Ground-Level Grounding: Primary Health Centre & Municipal Hospital Investigation

[![Location](https://img.shields.io/badge/Location-Palghar%20District%2C%20Maharashtra-FF6F00?style=for-the-badge&logo=googlemaps&logoColor=white)](photos/)
[![Field Site](https://img.shields.io/badge/Field%20Site-PHC%20Nallasopara%20West-0288D1?style=for-the-badge&logo=hospital&logoColor=white)](photos/)
[![Key Informant](https://img.shields.io/badge/Interview-Medical%20Officer%20In--Charge-2E7D32?style=for-the-badge)](03_FIELD_INTERVIEW_GUIDE.md)
[![Micro-Server](https://img.shields.io/badge/Interactive%20Server-node%20server.mjs-6366F1?style=for-the-badge&logo=nodedotjs&logoColor=white)](#-running-the-local-field-work-archive)

[📋 Questionnaire Instruments](#-field-methodology-framework-artifacts) • [🏥 Clinical Observations](#-field-observation-findings) • [🎙️ Key-Informant Interview](#-key-informant-interview-summary)

---

</div>

## 📌 Context: Connecting Data to the Ground

Government disease surveillance figures do not emerge in a vacuum. A statistical count of *"10 cases of Dengue in epidemiological Week 36"* reflects human decisions made in clinics: symptom presentation, clinical suspicion, diagnostic testing thresholds, and municipal disease notification protocols.

To prevent sterile data abstraction, this field project incorporated primary clinical immersion at:
1. **Primary Health Centre (PHC), Nallasopara West** (Palghar District, Maharashtra).
2. **Vasai-Virar City Municipal Corporation (VVCMC) Hospital** (Nallasopara East).

```
  Government Data (NCDC / IDSP)          Clinical Field Reality (Palghar PHC)
  ┌───────────────────────────────┐      ┌───────────────────────────────┐
  │ • Weekly Outbreak Clusters    │      │ • Domestic Water Storage (48h)│
  │ • Formal Notification Criteria│ ◄──► │ • Rapid Diagnostic Kit Limits │
  │ • Delayed Central Publishing  │      │ • Post-Rainfall OPD Surges    │
  └───────────────────────────────┘      └───────────────────────────────┘
```

---

## 📑 Field Methodology Framework Artifacts

This archive houses the complete 14-part qualitative research framework:

| File Name | Document Title & Purpose |
| :--- | :--- |
| **[`01_FIELD_WORK_QUESTIONNAIRE_FULL.md`](01_FIELD_WORK_QUESTIONNAIRE_FULL.md)** | Comprehensive 28-item qualitative survey covering household risk factors. |
| **[`02_FIELD_WORK_QUESTIONNAIRE_SHORT.md`](02_FIELD_WORK_QUESTIONNAIRE_SHORT.md)** | Rapid 10-item clinical triage questionnaire for OPD fever patients. |
| **[`03_FIELD_INTERVIEW_GUIDE.md`](03_FIELD_INTERVIEW_GUIDE.md)** | Semi-structured interview protocol for Medical Officers and Surveillance Workers. |
| **[`04_FIELD_OBSERVATION_CHECKLIST.md`](04_FIELD_OBSERVATION_CHECKLIST.md)** | Environmental audit checklist (water stagnation, larval breeding, drainage). |
| **[`05_FIELD_WORK_METHODOLOGY.md`](05_FIELD_WORK_METHODOLOGY.md)** | Mixed-methods triangulation framework linking clinical observations to NCDC data. |
| **[`06_FIELD_RESPONSE_TEMPLATE.csv`](06_FIELD_RESPONSE_TEMPLATE.csv)** | Tabular schema for recording standardized field questionnaire responses. |
| **[`07_FIELD_EVIDENCE_REGISTER.csv`](07_FIELD_EVIDENCE_REGISTER.csv)** | Formal chain-of-custody log for photographs, notes, and audio recordings. |
| **[`08_REFERENCE_FIELD_MATERIAL.md`](08_REFERENCE_FIELD_MATERIAL.md)** | Background demographic context on Palghar District and VVCMC health infrastructure. |
| **[`09_FIELD_FINDINGS_FRAMEWORK.md`](09_FIELD_FINDINGS_FRAMEWORK.md)** | Synthesis of ground observations with seasonal transmission patterns. |
| **[`10_FIELD_TO_DATA_LINKAGE.md`](10_FIELD_TO_DATA_LINKAGE.md)** | Analytical mapping explaining why local case reporting lags behind true infection peaks. |
| **[`11_FIELD_WORK_PRESENTATION_PLAN.md`](11_FIELD_WORK_PRESENTATION_PLAN.md)** | Storyboard for presenting field evidence to academic assessment panels. |
| **[`12_FIELD_WORK_WEBSITE_CONTENT_PLAN.md`](12_FIELD_WORK_WEBSITE_CONTENT_PLAN.md)** | Structural specification for the interactive web portal fieldwork section. |
| **[`13_FIELD_ETHICS_AND_PRIVACY.md`](13_FIELD_ETHICS_AND_PRIVACY.md)** | Ethics protocol governing informed consent, privacy protection, and anonymization. |
| **[`14_FIELD_WORK_LANGUAGE_GUIDE.md`](14_FIELD_WORK_LANGUAGE_GUIDE.md)** | Marathi / Hindi clinical terminology glossaries for public health terms. |

---

## 🎙️ Key-Informant Interview Summary

* **Informant:** Medical Officer In-Charge, Primary Health Centre (PHC), Nallasopara West
* **Core Takeaways:**
  1. **Notification Thresholds:** Under IDSP guidelines, an "outbreak" alert is triggered when a primary clinic observes $\ge 5$ epidemiologically linked fever cases in a single week. Isolated individual cases are managed in OPD without generating central NCDC entries.
  2. **Domestic Water Storage:** Intermittent municipal supply (water delivered once every 24–48 hours) forces households to store fresh water in open 200-litre plastic drums, creating artificial, human-made breeding habitats for *Aedes aegypti* that persist well into the dry season.
  3. **Diagnostic Bottlenecks:** Primary health posts utilize rapid NS1 antigen kits; confirmatory IgM ELISA testing requires batch transfer to district laboratories, introducing a 7–14 day notification lag in central bulletins.

---

## 💻 Running the Local Field Work Archive

The archive includes a lightweight Node.js server for reviewing all questionnaires and notes:

```bash
cd field_work
node server.mjs
```

Open your browser to:
```text
http://127.0.0.1:8000
```
