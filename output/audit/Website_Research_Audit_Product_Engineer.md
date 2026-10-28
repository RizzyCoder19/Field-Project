# Research Website Audit & Product Engineer Handoff

**Project:** *From Data to the Ground — Seasonal Disease Surveillance in Maharashtra*  
**Researcher:** Khan Umar · R.P. Institute of Hospitality & Management · University of Mumbai  
**Audit date:** 23 October 2026  
**Repository baseline:** branch `master`, commit `6b1503c` (`feat: digital exhibition redesign...`)  
**Live baseline:** [fieldprojects.vercel.app](https://fieldprojects.vercel.app) as observed on 23 October 2026  
**Audit status:** Read-only review. No website, analysis, dependency, or route files were changed. This report is the only new audit deliverable.

## Executive summary

The site has a strong editorial foundation: a defined research question, a chapter sequence, a map, a seasonal clock, a bar chart, a Kendall’s W explanation, an outlier analysis, a partial-2026 view, field photographs, and a printable report. The project can be reshaped around those assets without replacing its underlying research exhibition.

The immediate blocker is data trust, not visual design. Several source documents and UI panels disagree with the primary clean dataset. Independently summing the five selected disease families in `data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`, after applying the disease-family aliases in `data_pipeline/phase5A_disease_audit/02_DISEASE_FAMILY_MAPPING.csv`, reproduces **539 baseline records, 20,955 reported cases, and 266 reported deaths** for 2022–2025. The disease-level values also reproduce exactly. However, Phase 5D/5E documents repeatedly say **21,955 cases**. Dengue’s June–October monthly records total **149/204 (73.0%)**, while frozen Phase 5D/5E conclusions say **169/204 (82.8%)**. These are not design choices; the underlying published claims need an explicit reconciliation before the site can be described as fully reproducible.

There are also direct contradictions inside the live site: its Kendall page shows two different sets of values for the same statistic; the home clock describes 539 records but initially plots the 204 dengue records; the disease comparison callout reports stale totals; and the “authentic government bulletin excerpt” on `/data` shows 218 malaria cases and zero deaths where the actual local bulletin and cleaned row show **2 cases and 1 death**. The fieldwork page visually presents a paraphrase as a quotation and makes causal claims that the documented single visit cannot establish.

**Recommendation:** freeze headline claims and redesign implementation until a small owner-approved claim register names the governing source and disposition for every disagreement. Then simplify the visitor journey around one understandable question: *What do Maharashtra’s official outbreak reports show about when and where selected diseases were reported, how much did those patterns repeat, and what can the data not tell us?* Keep visualizations, but make their scope and meaning visible in plain language.

## 1. Scope and method

This pass reviewed the checked-out branch and current deployment, including repository READMEs, the Next.js app structure, canonical data modules, Phase 5A/5B/5C/5D/5E outputs, relevant raw/clean data, the local official bulletin used as a sample, fieldwork report-derived records, website components and assets, and live pages. The PDF source was inspected directly where a bulletin or the finalized report was needed.

The five-family baseline was independently totaled from the cleaned analytical CSV by applying the family mapping rather than filtering only exact disease strings. Exact-string filtering would omit spelling/alias rows and undercount the cohort. Monthly sums were checked against `data_pipeline/phase5B_seasonal_analysis/01_MONTHLY_DISTRIBUTION.csv`. Kendall values were compared with both `03_SEASONAL_STABILITY.csv` and `09_STATISTICAL_ANALYSIS.csv`. The live deployment could not be proven to be built from the checked-out commit: the site does not expose an auditable build identifier in the information inspected. Therefore, deployment observations are dated observations, not a claim that the deployed bundle exactly equals commit `6b1503c`.

No production build, lint run, or test suite was run. The requested phase was an audit; no tests were added. `website/package.json` does provide `build` and `lint` scripts, but no test script.

## 2. Current information architecture

### Primary chapter routes

| Chapter | Route | Component / analytical purpose | Relationship to the story |
|---|---|---|---|
| 01 | `/` | `website/src/app/page.tsx` | Opening, headline metrics, seasonal compass/clock, entry point to the exhibition. Includes the cinematic introduction. |
| 02 | `/data` | `website/src/app/data/page.tsx` | Source bulletin → structured record explanation and archive explorer. This is where the sample-record integrity failure occurs. |
| 03 | `/diseases` | `website/src/app/diseases/page.tsx` | Five-family baseline profiles and comparative burden. |
| 04 | `/seasonality` | `website/src/app/seasonality/page.tsx` | Monthly timing through the radial clock, monthly bars, and seasonal matrix. |
| 05 | `/geography` | `website/src/app/geography/page.tsx` | Disease reporting footprint across Maharashtra districts. |
| 06 | `/stability` | `website/src/app/stability/page.tsx` + `NativeKendallAlignment.tsx` | Whether monthly ranks repeat across the four completed years. Currently contains two separately hard-coded statistic sets. |
| 07 | `/outliers` | `website/src/app/outliers/page.tsx` + `NativeOutlierDecomposition.tsx` | Sensitivity of reported case totals to influential outbreak records. |
| 08 | `/comparison-2026` | `website/src/app/comparison-2026/page.tsx` + `NativeTimeline2026.tsx` | Weeks 1–32 of 2026 compared with matched historical weeks; incomplete observation window. |
| 09 | `/fieldwork` | `website/src/app/fieldwork/page.tsx` + `FieldworkPhotoGallery.tsx` | One reported facility visit and one reported key-informant interview. The repository has report-derived summaries, not original field notes/transcript. |
| 10 | `/findings` | `website/src/app/findings/page.tsx` | Synthesis and recommendations. Some evidence text is stale or causal beyond the evidence. |
| 11 | `/method` | `website/src/app/method/page.tsx` | Extraction, cleaning, analysis, limitations, and methodological detail. |
| 12 | `/sources` | `website/src/app/sources/page.tsx` | Source registry, archive links, references, and audit trail. |

The 12 chapter definitions live in `website/src/data/chapters.ts`. `PresentationNav` and `ChapterFooter` already provide a usable global chapter system. The homepage also calls its content “11 Interactive Scenes”; this may count the 11 exhibits after the overview, but should be labeled “11 exhibits across 12 chapters” or changed to match the intended count.

### Utility, legacy, and report routes

| Route | Current behavior |
|---|---|
| `/print` | Printable/report-export page. |
| `/about` | Standalone page outside the 12-chapter list; review whether it is intentional or a legacy duplicate. |
| `/diseases/dengue`, `/diseases/acute-diarrheal-disease`, `/diseases/malaria`, `/diseases/food-poisoning`, `/diseases/chikungunya` | Disease deep-link routes; retain useful inbound links, but make sure their figures derive from the same disease data module as `/diseases`. |
| `/research` | Redirects to `/seasonality`. |
| `/references` | Redirects to `/sources`. |
| `/evidence` and `/timeline` | Redirect to `/data`. |
| `/ethics` and `/methodology` | Redirect to `/method`. |
| `/fieldwork/interviews`, `/fieldwork/observation`, `/fieldwork/questionnaire` | Separate route aliases; inspect/retain their redirect destinations and avoid implying a questionnaire was completed. |
| `/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf` | Downloaded report asset linked from the site. |

### Current navigation and reusable UI

`website/src/components/PresentationNav.tsx` exposes a small set of direct destinations (Data, Diseases, Seasonality, Geography, Fieldwork), a chapter drawer, repository link, and PDF action. `ChapterFooter.tsx` presents previous/current/next chapter navigation and a full index. The two systems overlap but are reusable if the visible navigation is simplified to one clear “Explore the research” route plus direct access to the report and sources.

## 3. Five biggest UX issues

1. **The visitor is asked to interpret before learning the question.** Metrics, acronyms, navigation, animation, disease selectors, and analytical labels arrive at once. A first-time viewer needs a short plain-language setup: what was counted, what years, what “record” means, and what the pages will answer.
2. **There is no single obvious reading path.** The home page invites exploration across many panels, while the chapter menu and footer both offer full navigation. A professor may not know whether to start at the clock, the archive, or the methods chapter.
3. **Controls repeat inside exhibits.** Seasonality has a page-level disease and metric selector plus controls in the clock and chart. Stability selects a disease at the page level while the embedded Kendall exhibit also selects a disease. Duplicated controls increase cognitive load and can become out of sync.
4. **Statistical language is exposed before an interpretation.** Terms such as Kendall’s W, CR3, seasonal index, concentration coefficient, out-of-sample, and concordance appear as labels. Each needs a one-sentence plain-language translation beside the first use, with detail available on demand.
5. **Fieldwork tells a conclusion before establishing the evidence.** The visitor sees explanatory claims about household water storage and mosquito habitats presented as a “behavioral explanation,” while the source records show one reported visit and no original observation sheet or interview transcript in the repository. Evidence type and uncertainty must be clear before interpretation.

## 4. Five biggest visual issues

1. **Excessive framed cards create a dashboard texture.** Repeated dark rectangles, thin borders, inset cards, and repeated metric tiles flatten the hierarchy. Reserve cards for genuinely separate evidence; use open editorial sections, whitespace, and section dividers elsewhere.
2. **Technical micro-labels compete with the story.** Uppercase monospace labels and tiny type (often 9–11px) look like instrumentation, but are hard to read and make even simple content feel technical. Raise the minimum size and use normal sentence case for reader-facing content.
3. **Motion and decorative signals compete with evidence.** The intro, pulse markers, stroke construction, animated bars, scanning/crosshair motifs, and pinned scroll scenes can create spectacle before the data is understood. Keep a few purposeful transitions and let evidence enter at a human pace; ensure every animation supports a reading task.
4. **Visual tone leans toward a control room.** Dark navy, cyan, red, status dots, HUD-like labels, and “observatory” framing are distinctive but can feel cold or game-like for a public-health research story. Retain the dark editorial option if desired, but pair it with warmer paper/ink surfaces, restrained accent colors, and real contextual imagery.
5. **The same view contains a high-density mix of chart, controls, explanations, metrics, and technical notes.** On mobile, the maps/charts and multi-button selectors compete for limited width; many small values become hard to scan. Each section should show one primary visual and one short interpretation, with sources and the full table available in a secondary layer.

## 5. Five biggest content and data-integrity issues

1. **Published analysis documents disagree with the canonical sums.** The baseline case count is 20,955 when the five family totals are summed. Multiple Phase 5D/5E and presentation documents state 21,955. This is a 1,000-case discrepancy and is repeated in apparently “frozen”/reviewed material.
2. **Dengue June–October concentration is wrong in the frozen conclusion layer.** The monthly records sum to 149/204 = 73.0%. Phase 5D/5E say 169/204 = 82.8%, and cite the same monthly source file. A second possible confusion is event-count window vs. epi-week window; the source must define which one the headline describes.
3. **Live UI contradictions and hard-coded stale numbers.** The homepage defaults its clock to Dengue (204 records) while its label says 539 mapped; `/diseases` displays accurate family cards but its finding says Dengue has 153 records, ADD has 5,660 cases and 106 deaths; home exhibit tiles and `/findings` also include stale values such as 4,500 and 2,980 cases.
4. **The archive’s showcased source row is false.** `/data` presents a 2023 Gadchiroli malaria sample as 218 cases, zero deaths, and says mass smear collection/ACT. The local cleaned row `MAHA-2023-W33-003` and `NCDC weekly outbreaks/2023/week33.pdf` page 15 identify 2 cases and 1 death; the bulletin describes two blood samples, 142 RDK tests reported negative, and a 9-year-old death from cerebral malaria. The UI must not portray invented text as a facsimile of an official row.
5. **Fieldwork, causal inference, and provenance are blurred.** The website wraps an interview paraphrase in quotation marks, while the report says no verbatim quotations are presented. The repository has report-derived summaries but no original completed observation sheet or transcript. The visit end time is also inconsistent (report says 11:45 a.m.; website includes 12:00 p.m.). The site moves from one facility visit to general explanations of household storage, drainage, and vector breeding that require independent evidence.

## 6. Source-of-truth and discrepancy matrix

“Current UI” refers to the live site observed on the audit date and source literals at the checked-out revision. The source-of-truth recommendation below does not silently overwrite conflicting documents; it identifies the evidence that should govern the next reconciliation decision.

| Claim | Current UI / published value | Canonical or primary-source value | Exact evidence / calculation | Status and recommendation |
|---|---|---|---|---|
| Five-family baseline size, 2022–2025 | 539 records | **539** | `data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv` + `data_pipeline/phase5A_disease_audit/02_DISEASE_FAMILY_MAPPING.csv`; alias-aware family aggregation | **Verified.** Keep 539 and show cohort definition and denominator. |
| Baseline reported cases | Website headline/profile: 20,955; Phase 5D/5E docs and presentation material: 21,955 | **20,955** | Five canonical totals: 3,144 + 9,050 + 2,133 + 5,927 + 701 = 20,955; Phase 5B monthly cases also sum to 20,955 | **Inconsistent across repo.** Preserve the auditable 20,955 in a draft register; owner must acknowledge and correct all downstream files before claiming all reports match. Search every 21,955 occurrence. |
| Baseline deaths | 266 | **266** | Family totals: 93 + 93 + 51 + 29 + 0 = 266; clean analytical rows | **Verified.** Describe as deaths reported within these investigated outbreak records, not all deaths in Maharashtra. |
| Five disease-family baseline profiles | Profile cards list Dengue 204/3,144/93; ADD 153/9,050/93; Malaria 70/2,133/51; Food Poisoning 69/5,927/29; Chikungunya 43/701/0 | Same values | Alias-aware aggregation of `NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`; aligns with Phase 5A and monthly distribution | **Verified.** Centralize these values in one data module. |
| Disease-composition denominator | “539 of 733 (73.5%)” | **539 / 733 = 73.5%** (rounded) | Clean baseline total 733; selected five-family cohort 539 | **Verified**, but state explicitly that 194 other baseline records are outside the selected five families. |
| All-family baseline monthly event curve | Source table total 539; home header says 539 but clock opens on Dengue | **539 overall**; current home chart defaults to Dengue’s **204** | `phase5B_seasonal_analysis/01_MONTHLY_DISTRIBUTION.csv`; home default `clockDisease = "dengue"` in `website/src/app/page.tsx`; clock arrays in `researchData.ts` | **Misleading labeling.** Either default to all five families or label the chart “Dengue · 204 records”; distinguish cohort total from selected layer. |
| Monthly event totals | Site chart values should match full cohort when All is selected | Jan 17, Feb 26, Mar 31, Apr 30, May 44, Jun 72, Jul 68, Aug 50, Sep 68, Oct 76, Nov 29, Dec 28 = **539** | `phase5B_seasonal_analysis/01_MONTHLY_DISTRIBUTION.csv`; all months sum 539 | **Verified** for the source monthly distribution. Retain label “reported outbreak records by calendar month”; do not imply incident onset or biological incidence without qualification. |
| Dengue June–October concentration | `/seasonality` says 73.0% (149/204); clock says 73.0%; Phase 5D/5E frozen docs say 82.8% (169/204) | **149 / 204 = 73.0%** for June–October *calendar-month* counts in the monthly source | Dengue Jun–Oct: 27+26+20+36+40 =149, from `phase5B_seasonal_analysis/01_MONTHLY_DISTRIBUTION.csv` | **Unresolved document conflict; arithmetic supports 149.** Correct the Phase 5D/5E claim if the intended metric is calendar-month events; if 169 comes from a separate epi-week definition, identify and calculate that window independently. Do not leave both labels live. |
| Dengue event CR3 | 50.5% | **50.5%** | Three highest months Oct 40 + Sep 36 + Jun 27 = 103; 103/204 = 50.5%; `phase5C_advanced_analysis/01_SEASONAL_CONCENTRATION.csv` | **Verified.** Explain CR3 as the share in the three busiest months. |
| Kendall’s W: Dengue | Embedded alignment chart: W=.405, p=.086; page-level selector: **W=.312, p=.284** | **W=.405, p=.08594 (~.086)** | `phase5C_advanced_analysis/03_SEASONAL_STABILITY.csv` and `09_STATISTICAL_ANALYSIS.csv` TEST-11 | **UI inconsistency.** Make both controls/cards read one result object. |
| Kendall’s W: ADD | Embedded chart W=.530, p=.016; page-level selector also W=.530, p=.016; both explanatory texts overstate repeatability and assert water-contamination causes | **W=.530, p=.016; BH-FDR q=.03429; Bonferroni threshold .00333, not significant under Bonferroni** | `03_SEASONAL_STABILITY.csv`; `09_STATISTICAL_ANALYSIS.csv` TEST-12 | **Value verified, interpretation overstated.** Say moderate rank agreement; identify raw p and correction method. Avoid “identical.” With 15 tests, it is FDR-significant, not Bonferroni-significant. |
| Kendall’s W: Malaria | Embedded chart: W=.319, p=.229; page-level selector: **W=.245, p=.450** | **W=.319, p=.22919 (~.229)** | `03_SEASONAL_STABILITY.csv`, `09_STATISTICAL_ANALYSIS.csv` TEST-13 | **UI inconsistency.** Unify source and label as non-significant. |
| Kendall’s W: Food Poisoning | Embedded chart: W=.386, p=.108; page-level selector: **W=.180, p=.650** | **W=.386, p=.10790 (~.108)** | `03_SEASONAL_STABILITY.csv`, `09_STATISTICAL_ANALYSIS.csv` TEST-14 | **UI inconsistency.** Unify source and label as non-significant. |
| Kendall’s W: Chikungunya | Embedded chart: W=.150, p=.832; page-level selector: **W=.155, p=.720** | **W=.150, p=.83162 (~.832)** | `03_SEASONAL_STABILITY.csv`, `09_STATISTICAL_ANALYSIS.csv` TEST-15 | **UI inconsistency.** Unify source; note sparse records/low power. |
| Interpretation of W | UI describes identical ranks or stable causal seasonal behavior | W measures concordance of monthly rank profiles across four yearly vectors; W=.530 is partial/moderate concordance, not identity or causation | Phase 5C method/report; TEST-11–15 | **Interpretation issue.** Explain as “how similarly the 12 months are ordered across the four years.” Don’t infer water contamination or biology from W. |
| 2026 W01–W32 overall | Website: 45 records / 2,126 cases / 0 deaths | **45 / 2,126 / 0** | `phase5B_seasonal_analysis/07_2026_YTD_PRIMARY_COMPARISON.csv`; `phase5C_advanced_analysis/07_2026_OUT_OF_SAMPLE_COMPARISON.csv`; cleaned 2026 rows | **Verified for a partial window.** Keep “through Week 32” adjacent to every aggregate; no full-year language. |
| 2026 family breakdown | Dengue 6/106; ADD 18/864; Malaria 1/65; FP 19/1,082; Chikungunya 1/9 | Same values; totals 45/2,126/0 | Same Phase 5B/5C outputs | **Verified.** Keep only with W01–W32 cutoff. |
| Matched historical W01–W32 event means | `/comparison-2026` says **48.3** historical records and 2026 is −6.8% vs 48.3 | Phase 5C family means are 22.75 + 21.75 + 12.00 + 12.75 + 6.25 = **75.5 records**; comparison 45 vs 75.5 is −40.4% (rounded), if the five families are the intended comparable cohort | `phase5C_advanced_analysis/07_2026_OUT_OF_SAMPLE_COMPARISON.csv`; sum the five disjoint family means; compare with 45 W01–W32 primary records | **UI aggregate unsupported/inconsistent.** Remove 48.3/−6.8% or document the alternative denominator and reproduce it. Prefer family-level comparisons, which are directly supplied by Phase 5C. |
| 2026 seasonal interpretation | Low Dengue count could be read as a decline; site correctly notes seasonal truncation | Only 32 weeks observed; 55.4% of historical Dengue reports occur after W32 per the project comparison | `07_2026_OUT_OF_SAMPLE_COMPARISON.csv`; site page calls out cutoff | **Verified caveat.** Say “fewer reports than the matched historical window” where applicable; never claim annual decline/eradication. |
| 2026 labels | All 19 FP records called “Suspected”; ADD spelling changes to “Diarrhoeal” | Label shift is documented in 2026 comparison artifacts | `phase5C_advanced_analysis/07_2026_OUT_OF_SAMPLE_COMPARISON.csv` and surveillance label audit | **Verified caveat.** Preserve raw label and map to analytical family transparently; do not present suspected food poisoning as confirmed etiology. |
| Food Poisoning outlier total | Site overall: three records / 1,615 cases; Feb 2,162 → 547; adjusted total 4,312; April 899 | **1,615 total**; Feb remaining 547; adjusted all-month total 4,312; April peak 899 | `phase5C_advanced_analysis/06_OUTLIER_SENSITIVITY.csv`; 2,162−1,615=547; 5,927−1,615=4,312 | **Overall arithmetic verified.** Call these influential records, not erroneous observations; sensitivity analysis is not a data correction. |
| Food Poisoning outlier decomposition | Live waterfall: Kolhapur −651 (2024 W07), Parbhani −543 (2024 W08), Solapur −421 (2024 W08); `researchData.ts` instead says Kolhapur 2024 W07 651, Parbhani 2025 W06 629, Solapur 2023 W06 335; `/outliers` page shows Nanded/Solapur/Pune labels | Record IDs map to Kolhapur 651 (2025 W06), Parbhani 629 (2024 W06), Parbhani 335 (2024 W06) | `06_OUTLIER_SENSITIVITY.csv` IDs; clean analytical rows, source pages 13 and 11 | **UI breakdown inconsistent in multiple places.** Render exact IDs and preserve both Parbhani records. Check validation status (`UNVALIDATED`) before calling these individually verified. |
| Sample `/data` Gadchiroli malaria bulletin | 218 cases, 0 deaths; text claims mass smear and ACT | **2 cases, 1 death** in canonical row `MAHA-2023-W33-003`; official bulletin also gives 2 blood samples and 142 RDK negatives | `data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`; `NCDC weekly outbreaks/2023/week33.pdf`, p.15 | **Direct contradiction.** Replace with source-faithful row/facsimile and verbatim/accurately labeled actions, or remove the sample until verified. Current record in clean CSV has a validation-status caveat; the bulletin is direct evidence. |
| Fieldwork visit time | Site labels an observation at 12:00; report-derived visit record says 10:30–11:45 | **Unresolved** without original contemporaneous log | `field_work/report_derived_records/01_visit_record_report_derived.md`; `04_source_and_gap_register.csv` | **Unresolved.** Do not pick one time by guess. Remove precise time labels or show “time stated in report” with source and discrepancy note until originals are checked. |
| Interview display | Website uses quotation marks around an interview statement | Report states responses are paraphrased; no verbatim quotations; no original notes/transcript located | `field_work/report_derived_records/03_interview_summary_report_derived.md`; website fieldwork page | **Provenance mismatch.** Remove quotation marks and attribute as “report’s paraphrase of one informant,” unless an original transcript supports exact wording. |
| Field observations vs. interpretation | Website makes household water-storage and breeding explanation sound directly observed/proven | Report-derived notes identify a single site visit; no completed original field observation sheet is present; no community questionnaires and no patient-level data | `02_observation_summary_report_derived.md`; `04_source_and_gap_register.csv`; empty `07_FIELD_EVIDENCE_REGISTER.csv` | **Evidence type blurred.** Separate observed setting, informant paraphrase, researcher interpretation, and hypothesis for follow-up. Avoid causal verbs. |
| 237 surveillance weeks | README calls them “237 consecutive”; site shows 237 archived weeks and 3 unlocated | 52+49+52+52+32 = **237 published bulletins**; 2023 W15, W51, W52 absent; expected scheduled coverage through 2026 W32 is 240 weeks | `website/src/data/researchData.ts`; `PipelineFlow.tsx`; `README.md`; archive list | **Term is wrong.** Use “237 published weekly bulletins archived; 3 expected 2023 issues unavailable.” Do not say consecutive. Distinguish published archive count from expected calendar weeks. |
| Death rate / “CFR” | Site derives 266 / 20,955 = 1.27% and labels it CFR | Arithmetic is 1.269% but denominator is cases enumerated in selected outbreak records, not all clinical cases/population | Disease profiles and baseline data | **Label is risky.** Call it “reported deaths divided by reported cases in this selected outbreak-record cohort (1.27%)” or omit the summary rate. Avoid implying a population-level or clinical case-fatality estimate. |
| 2026 timeline curve | Site creates an approximate cumulative case progression by scaling a factor to 2,126 | No week-level case accumulation is proven by a curve that is mathematically interpolated | `website/src/components/NativeTimeline2026.tsx` comments say approximate | **Visual provenance issue.** Label as illustrative interpolation or use true weekly sums; do not imply observed trajectory. |
| Field photo provenance | Photos are present and shown as authenticated field documentation | Evidence register has only a header; file-level source/date/consent mapping is missing | `website/public/fieldwork/`; `field_work/report_derived_records/04_source_and_gap_register.csv`; `07_FIELD_EVIDENCE_REGISTER.csv` | **Unresolved provenance.** Create/complete asset metadata before asserting each image documents the visit; label archival/reference images separately. |

### Important detail: clean-dataset status is not equivalent to row-level validation

The master CSV includes rows whose `validation_status` is `UNVALIDATED`; the three influential food-poisoning records are among them. Phase 5C sensitivity output can still be reproduced from the cleaned CSV, but those particular rows should not be described as individually source-validated solely because they appear in an aggregate. Conversely, the Gadchiroli sample conflict can be settled against its local source bulletin even while the row’s status flag is unresolved. Make row-level status visible in the evidence register and avoid global wording such as “every displayed row has been independently validated.”

## 7. Recommended source-of-truth policy

Adopt this precedence, documented on the source page and in an internal claim register:

1. **Primary source document** (archived government weekly bulletin) for what the bulletin actually reported, including source ID, page, row, dates, disease label, cases, deaths, status, and action text.
2. **Validated row-level transcription** for normalized fields, with raw source strings retained and each row linked to the source page. An explicit validation status must accompany the record.
3. **Reproducible canonical aggregation** from the cleaned rows plus a versioned disease-family mapping for cohort totals and charts.
4. **Phase 5B/5C CSV analysis outputs** for derived monthly/statistical measures, provided they reconcile to the above and the generating method/denominator is stated.
5. **Phase 5D/5E reports, slides, speaker notes, and site literals** are interpretive/presentation layers. They must not overrule a conflicting source row or sum. When they conflict, mark the claim unresolved and remove it from headline use pending correction.

Create a `claim_id` ledger with: exact wording, displayed value, unit, period, denominator, source CSV/row or source PDF/page, calculation, validation state, owner disposition, and all UI/report locations. Keep raw disease labels and normalized family labels together.

## 8. Narrative structure for a first-time visitor

Organize the experience as six plain-language beats, reusing the existing routes:

1. **The question:** “When were outbreak reports recorded, and did the timing repeat?” One sentence explaining that this is government-reported outbreak surveillance, not a census of every illness.
2. **What was counted:** Define a record, cases, deaths, selected five families, 2022–2025 baseline, 733 all-disease baseline records, and the selected 539. Show the source and what “published weekly bulletin” means.
3. **What the calendar shows:** One default all-family chart with a toggle to disease; always display selected family, record count, metric, and calendar-month label. Add a sentence interpretation adjacent to the visual.
4. **Where and whether it repeats:** Show the Maharashtra map, then the four-year rank comparison with a plain-language Kendall explanation and honest uncertainty.
5. **What can distort the picture / what changed in 2026:** Explain the three influential food-poisoning records as sensitivity analysis; follow with 2026 W01–W32 and its cutoff/label caveat.
6. **What fieldwork adds—and cannot prove:** Present the visit and informant summary as qualitative context, mark what is report-derived vs. directly documented, then findings, limitations, sources, and PDF.

Keep the visual voice elegant, warm, editorial, and topic-related. “Sexy/attractive” should mean confident typography, an engaging pace, purposeful transitions, and memorable data forms—not sensationalized disease imagery, crime-scene graphics, or invented evidence. The site can feel polished without making uncertain findings look definitive.

## 9. Component reuse, consolidation, and removal plan

### Reuse after data wiring and content correction

- `PresentationNav.tsx`, `ChapterFooter.tsx`, and `chapters.ts`: retain route backbone, simplify the menu labels, and make the current chapter/progress clear without duplicating calls to action.
- `RadialSeasonalClock.tsx`, `NativeSeasonalChart.tsx`, and `SeasonalMatrix.tsx`: preserve clock, bar, and matrix as complementary views only if they share one selected disease and metric state. Start with all-family events; make “records vs. cases” explicit.
- `MaharashtraMap.tsx`: keep as a prominent spatial exhibit with a readable table alternative and a text caveat that reports represent investigated outbreak presence, not disease absence.
- `NativeKendallAlignment.tsx`: reuse the annual-rank visualization after removing duplicate hardcoded results and unsupported explanation copy.
- `NativeOutlierDecomposition.tsx` / `OutlierScene.tsx`: reuse the explanatory decomposition only after mapping each bar to canonical record IDs and disclosing that sensitivity exclusion is not deletion/correction.
- `NativeTimeline2026.tsx`: reuse week boundary and family totals; replace the interpolated cumulative curve with actual week-by-week values or label it explicitly as illustrative.
- `FieldworkPhotoGallery.tsx`: retain a small number of provenance-checked photographs and direct captions; remove unsupported quotes and unverified “authenticated” language.
- `ScrollStory.tsx` and `CinematicIntro.tsx`: selectively retain a short introduction and a small number of scroll reveals. Ensure primary content is available without animation and does not depend on scroll pinning.

### Consolidate or remove

- Create one typed analytical-data layer (derived from/versioned against the CSVs) for the family totals, monthly values, Kendall values, outlier record references, and 2026 comparison. Remove page-local duplicated arrays and metrics.
- Remove parallel disease selectors. One page-level selection should drive the clock, bar chart, and related interpretation. On the stability page use one selector for both the four annual rank rows and result badge.
- Replace the hand-authored fake bulletin rows in `/data` with source-verified examples from the dataset and actual PDF excerpts, with an honest “transcribed from” label. Never put generated action text inside a representation styled as a government form.
- Remove unsupported causal explanations (“water contamination caused…”, “wedding/banquet corridors”, “storage creates breeding habitats”) from headline copy unless a cited source independently supports the claim. Reframe as hypotheses or contextual observations.
- Remove “identical relative rank order” and “proves” language. Correct the statistics and explain what the test can/cannot say.
- Avoid double navigation calls to action and repeated metric rectangles. Use direct chapter transitions and a clear close/source endpoint.

## 10. Accessibility, mobile, and technical feasibility

- **Reduced motion:** `website/src/app/globals.css` has a `prefers-reduced-motion: reduce` rule that shortens CSS animation and transition durations. Confirm GSAP timelines, pinned ScrollTrigger scenes, animated counters, and JavaScript requestAnimationFrame loops also respect this preference; CSS alone does not disable all scripted behavior.
- **Scroll dependence:** `ScrollStory.tsx` uses pinned, scrubbed ScrollTrigger scenes. Pinning can cause orientation/keyboard navigation and mobile scroll problems. Ensure a non-pinned reading flow and no content that only appears after a scripted trigger.
- **Charts:** every SVG should have a concise title/description and a nearby text summary or data table; do not rely on color alone. Increase label size, preserve contrast, use focusable controls, and test chart overflow at narrow widths.
- **Map:** the map needs keyboard-accessible district selection, a non-map table/search fallback, and clear text for values. District shading must be distinguishable without color alone.
- **Interaction state:** parent and child state mismatch on seasonality is a concrete correctness risk. In `seasonality/page.tsx`, the page selector drives the radial clock, while the chart receives `initialDisease` only and keeps internal state; metric mode is similarly independent. Lift state into one owner or use a shared controlled component contract.
- **Typography:** fonts are locally bundled through `next/font` (`Inter`, `Newsreader`, `JetBrains_Mono`); no additional font dependency is needed. Use the serif for display/long editorial headings, sans for explanations, and mono only for small metadata.
- **Dependencies:** current stack is Next.js 16, React 19, TypeScript 5, Tailwind 4, D3, GSAP, and lucide-react. Existing capability is sufficient; no new chart or animation package is justified by this audit.
- **Assets:** existing chart PNGs are in `website/public/charts`; fieldwork images are in `website/public/fieldwork`; the district GeoJSON is `website/public/data/maharashtra-districts.json`. Audit captions, source notes, and provenance before reuse.
- **Scripts:** `website/package.json` has `build` and `lint`, with no test script. A later implementation task should run the existing scripts after the content/data reconciliation is approved; this audit did not run them.

## 11. Recommended implementation sequence

1. **Resolve evidence conflicts first.** Create an owner-reviewed claim register for 20,955 vs 21,955; 149 vs 169 Dengue events; official sample-row transcription; outlier record breakdown; fieldwork time/quote/photo provenance; and any conflicting 2026 aggregate narrative. Keep disputed claims out of headline cards.
2. **Declare and implement the analytical source layer.** Version a single generated/validated data module with provenance metadata and source file identifiers. Derive page figures from it; do not hand-edit repeated numbers. Preserve the raw labels alongside family normalization.
3. **Correct content and semantics.** Use “reported outbreak records,” “reported cases,” and “reported deaths”; clarify the selected-cohort denominator; remove causal claims; correct the 237 “consecutive weeks” wording; distinguish report-derived fieldwork summaries from original evidence.
4. **Simplify shared interaction state.** Use one disease/metric selection per visualization group, remove repeated selectors, and add accessible non-animated text/table alternatives.
5. **Restructure the story.** Update the existing home and 12 chapters to follow the six narrative beats above; keep valid routes and redirects for compatibility.
6. **Apply the visual system.** Reduce bordered boxes and micro-labels, increase reading sizes and whitespace, retain selected data animations, and use warm editorial surfaces plus restrained topic-specific accents. Keep motion optional and meaningful.
7. **Review route/report parity and mobile.** Cross-check all site metrics against the claim register and finalized report; check phone and desktop layouts, chart state, source links, print view, and motion preferences.
8. **Run the repository’s existing build and lint scripts** after implementation, then perform a final manual source-to-screen audit. No new dependencies should be needed.

## 12. Launch risks and acceptance criteria

### Risks to resolve before launch

- The report set itself contains a 1,000-case baseline total discrepancy and a Dengue-window discrepancy; aligning the website to one source does not make the printed report correct.
- The clean CSV marks some records unvalidated. Aggregate reproduction does not independently validate every constituent row.
- An exact source row on `/data` currently conflicts with the official bulletin. This is the strongest visible credibility risk because the feature claims to demonstrate traceability.
- The site’s statistic controls can show contradictory Kendall values at once.
- Fieldwork’s original evidence and photo provenance are incomplete in the repository; a report-derived summary is not the original record.
- Some temporal and geographic narratives imply biological or causal mechanisms that surveillance counts cannot establish.
- A live deployment build identifier was not available during the audit; deployment parity with this branch is unverified.
- “Print-ready / 100% reproducible” language should be withheld until source links, claims, and report content reconcile.

### Acceptance criteria for the engineer handoff

- Every headline or chart value resolves to a source file, row/series, denominator, and calculation in the claim ledger.
- The five disease totals sum to 539 records, 20,955 cases, and 266 deaths, or the owner documents a different validated source and updates all outputs consistently.
- The Dengue June–October figure uses one explicitly defined window and one reconciled numerator/denominator everywhere.
- The two Kendall displays cannot diverge; all five values match the Phase 5C source and the multiple-comparison caveat is visible where significance is discussed.
- The 2026 page keeps W01–W32 visible next to every total and does not imply a full-year trend.
- Every sample bulletin field and action statement matches the primary PDF, or the example is removed.
- Fieldwork copy differentiates direct observation, informant paraphrase, interpretation, and untested hypothesis; quotations and image authenticity claims have source records.
- All controls are keyboard accessible; chart/map values have text equivalents; reduced-motion preference also disables scripted animation/pinning.
- Every site chart, summary, and downloadable report agrees with the reconciled claim register.

## Source files inspected (repository-relative)

- `README.md`, `website/README.md`, `website/package.json`, `website/next.config.ts`
- `website/src/app/page.tsx`, `data/page.tsx`, `diseases/page.tsx`, `seasonality/page.tsx`, `geography/page.tsx`, `stability/page.tsx`, `outliers/page.tsx`, `comparison-2026/page.tsx`, `fieldwork/page.tsx`, `findings/page.tsx`, `method/page.tsx`, `sources/page.tsx`, `print/page.tsx`
- `website/src/data/researchData.ts`, `website/src/data/chapters.ts`
- `website/src/components/PresentationNav.tsx`, `ChapterFooter.tsx`, `CinematicIntro.tsx`, `ScrollStory.tsx`, `RadialSeasonalClock.tsx`, `NativeSeasonalChart.tsx`, `NativeKendallAlignment.tsx`, `NativeOutlierDecomposition.tsx`, `NativeTimeline2026.tsx`, `MaharashtraMap.tsx`, `FieldworkPhotoGallery.tsx`, `PipelineFlow.tsx`
- `website/src/app/globals.css`, `website/public/charts/`, `website/public/fieldwork/`, `website/public/data/maharashtra-districts.json`
- `data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv`
- `data_pipeline/phase5A_disease_audit/02_DISEASE_FAMILY_MAPPING.csv` and the Phase 5A disease audit outputs
- `data_pipeline/phase5B_seasonal_analysis/01_MONTHLY_DISTRIBUTION.csv`, `07_2026_YTD_PRIMARY_COMPARISON.csv`
- `data_pipeline/phase5C_advanced_analysis/03_SEASONAL_STABILITY.csv`, `06_OUTLIER_SENSITIVITY.csv`, `07_2026_OUT_OF_SAMPLE_COMPARISON.csv`, `09_STATISTICAL_ANALYSIS.csv`
- `data_pipeline/phase5D_interpretation_validation/09_FINAL_ANALYTICAL_CONCLUSIONS.md`, `10_UNSUPPORTED_CLAIMS.md`, `12_PHASE5D_ANALYSIS_REPORT.md`
- `data_pipeline/phase5E_presentation_synthesis/03_SLIDE_CLAIM_REGISTER.csv`, `07_KEY_FINDINGS.md`, `12_VIVA_DATA_DEFENSE_MATRIX.csv`
- `field_work/report_derived_records/01_visit_record_report_derived.md`, `02_observation_summary_report_derived.md`, `03_interview_summary_report_derived.md`, `04_source_and_gap_register.csv`, `07_FIELD_EVIDENCE_REGISTER.csv`
- `NCDC weekly outbreaks/2023/week33.pdf`, page 15; `report/finalized/0.pdf` for the report-derived fieldwork details

---

**Audit disposition:** Stop before redesign implementation. Reconcile the claim ledger and source discrepancies first; then proceed with the route-preserving narrative and visual simplification described above.
