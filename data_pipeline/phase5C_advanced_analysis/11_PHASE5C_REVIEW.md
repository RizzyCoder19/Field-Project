# Phase 5C — Independent Methodological Review

**Document ID:** NCDC-MH-PHASE5C-REVIEW-2026-001  
**Review Date:** 2026-10-02  
**Reviewer Role:** Independent senior Data Science / Epidemiological Methodology Reviewer  
**Scope of Review:** Phase 5C Advanced Analysis Package — all 9 CSV files, 6 charts, and analysis report  
**Review Status:** First-pass Independent Review — Issues Identified (NOT Auto-Fixed)

---

> [!IMPORTANT]
> This review was conducted independently and does not constitute approval. Issues identified below must be explicitly actioned or formally accepted before Phase 5C is frozen.

---

## 1. Package Completeness Check

| Required Output | Status | Notes |
|:---|:---:|:---|
| 01_SEASONAL_CONCENTRATION.csv | ✅ Present | 5 rows, all 5 diseases |
| 02_PEAK_WINDOWS.csv | ✅ Present | 5 rows |
| 03_SEASONAL_STABILITY.csv | ✅ Present | 5 rows |
| 04_PEAK_TIMING_SHIFTS.csv | ✅ Present | 5 rows |
| 05_EVENT_CASE_DIVERGENCE.csv | ✅ Present | 60 rows (5 diseases × 12 months) |
| 06_OUTLIER_SENSITIVITY.csv | ✅ Present | 5 rows |
| 07_2026_OUT_OF_SAMPLE_COMPARISON.csv | ✅ Present | 5 rows |
| 08_DISTRICT_SEASON_ANALYSIS.csv | ✅ Present | 14 rows |
| 09_STATISTICAL_ANALYSIS.csv | ✅ Present | 15 rows |
| 10_PHASE5C_ANALYSIS_REPORT.md | ✅ Present | Comprehensive |
| chart_seasonal_concentration.png | ✅ Present | |
| chart_seasonal_stability_heatmap.png | ✅ Present | |
| chart_peak_timing_shifts.png | ✅ Present | |
| chart_event_case_divergence.png | ✅ Present | |
| chart_outlier_sensitivity.png | ✅ Present | |
| chart_2026_comparison.png | ✅ Present | |
| run_phase5c_pipeline.js | ✅ Present | Reproducibility script |
| generate_phase5c_charts.js | ✅ Present | Chart generation script |
| **Phase 5B inputs UNMODIFIED** | ✅ Confirmed | All Phase 5B CSV files unaltered |
| **NCDC_Maharashtra_CLEAN_ANALYTICAL.csv UNMODIFIED** | ✅ Confirmed | 809 rows, 414,722 bytes, unchanged |
| **Baseline count 539** | ✅ Confirmed | Logs show 539 baseline rows loaded |

---

## 2. Methodological Strengths

1. **Pre-committed thresholds documented:** The CR3 ≥ 0.50 high-concentration threshold and the N ≥ 10 district minimum were explicitly stated before results, preventing post-hoc threshold selection.

2. **Multi-measure concentration approach:** Using CV, CR3, and Gini in parallel, rather than a single metric, provides robustness. The convergence of all three measures for Dengue and Malaria strengthens the concentration conclusion.

3. **Contiguity rule clearly documented:** The report pre-commits to requiring top-3 months to be adjacent before declaring a "contiguous window." Food Poisoning and Chikungunya correctly receive the "discrete high-activity months" classification.

4. **Exact permutation test used:** The Monte Carlo permutation test avoids the asymptotic chi-square approximation that could be unreliable for small monthly bins (some months have 0–3 events). This is methodologically superior for sparse counts.

5. **BH-FDR applied alongside Bonferroni:** Presenting both corrections provides balance between conservative family-wise error control and false discovery rate control. The distinction is correctly explained.

6. **Sensitivity analysis outcome is frank:** The finding that Food Poisoning's case peak shifts from February to April when the three mass-exposure events are excluded is correctly classified as a **critical finding**, not minimized.

7. **2026 comparison correctly restricted to W01-W32 window only.** No full-year comparison was made. The historical mean is correctly computed from the W01-W32 equivalent period of each prior year.

8. **District analysis threshold prevents misleading sub-group comparisons.** Diseases with insufficient district representation (e.g., Food Poisoning, most of Chikungunya) are correctly excluded from district-level analysis.

9. **Causality guardrails consistently applied.** The report does not attribute spatial or temporal patterns to climate, vectors, or human behaviour.

---

## 3. Methodological Weaknesses & Issues

### ISSUE 1 — Sensitivity Analysis: Outlier Exclusion Rule Inconsistently Applied (Medium Priority)

**Description:** The pre-committed exclusion rule states records should be excluded if their case count exceeds 3× the mean per-event case count for that disease. However, the MALARIA exclusion (MAHA-2024-W01-002, 385 cases) should be checked against this threshold.

Mean Malaria cases per event = 2,133 / 70 = 30.5 cases/event.  
3× threshold = 91.5 cases.  
385 cases > 91.5 → Correctly excluded by the rule. ✅

The CHIKUNGUNYA exclusion (145 cases) should also be checked:  
Mean Chikungunya cases per event = 701 / 43 = 16.3 cases/event.  
3× threshold = 48.9 cases.  
145 cases > 48.9 → Correctly excluded. ✅

**Verdict:** The rule was correctly applied across all 5 diseases. However, the report does not explicitly document these threshold calculations — an examiner could challenge this. **Recommendation: Add the threshold calculation table to the report or the sensitivity CSV.**

---

### ISSUE 2 — Kendall's W p-value Uses Wilson-Hilferty Approximation (Low Priority)

**Description:** The Kendall's W p-value is derived via Wilson-Hilferty chi-square approximation, which may be inaccurate for small m (m=4 raters) and n=12 ranks. Exact tables or Monte Carlo permutation for Kendall's W would be more defensible.

**Specific concern:** The ADD Kendall's W result (W = 0.530, p ≈ 0.016) is a key finding. If the chi-square approximation overestimates significance, this conclusion could be challenged.

**Observed chi-square:** 23.32, df = 11.  
Critical chi-square at α = 0.05, df = 11 is 19.675. The observed value (23.32) exceeds this threshold regardless of approximation accuracy, so the directional conclusion (W is statistically significant at the 5% level) is likely robust.

**Recommendation:** Add a footnote noting that the p-value uses the Wilson-Hilferty approximation and that the conclusion is directionally supported even under conservative chi-square tables.

---

### ISSUE 3 — Food Poisoning Sensitivity: Three Records Excluded vs. One (Examiner Risk)

**Description:** Food Poisoning sensitivity excludes 3 records simultaneously, whereas ADD and Malaria each exclude 1 record. An examiner may ask: "Why are 3 records excluded for Food Poisoning rather than applying the same single-record rule?"

**Defence:** The three records all fall within the same month (February), all meet the 3× threshold (629, 651 cases well above 5,927/69 × 3 = 257.7 threshold), and the event context is the same documented phenomenon (large multi-event banquet/canteen exposures in W06). The justification is legitimate.

**Recommendation:** The report should explicitly document that all three meet the 3× threshold (257.7), so the examiner challenge can be directly answered with numbers.

Mean Food Poisoning cases/event = 5,927 / 69 = 85.9.  
3× threshold = 257.7 cases.  
MAHA-2025-W06-002: 651 > 257.7 ✅  
MAHA-2024-W06-005: 629 > 257.7 ✅  
MAHA-2024-W06-006: 335 > 257.7 ✅

---

### ISSUE 4 — Dengue Year-to-Year Instability vs. Strong Permutation Result (Analytical Tension)

**Description:** The report simultaneously finds:
- Low Kendall's W for Dengue (W = 0.405, p = 0.086) — suggesting poor inter-annual concordance
- Strong permutation test rejection of uniformity (p = 0.0001) — suggesting strong non-uniform monthly distribution

An examiner may challenge this apparent contradiction: "How can Dengue be temporally concentrated but also lack inter-annual rank concordance?"

**Explanation:** These tests measure different things. The permutation test evaluates whether the pooled 4-year aggregate is uniform across months — and the aggregate is strongly non-uniform (Oct = 40 events). The Kendall's W evaluates whether the rank ordering of months is consistent *across years* — and it is not, because 2023 has a different peak month (Oct) than 2024 (Jun/Jul). The two findings are reconcilable and demonstrate that while aggregate concentration exists, its precise timing is unstable year-to-year.

**Recommendation:** The report should explicitly reconcile this tension in 1–2 sentences in Section 9.

---

### ISSUE 5 — 2026 Dengue Comparison Lacks Year Disaggregation for W01-W32 (Low Priority)

**Description:** The 2026 Dengue comparison reports a historical mean of 22.8 events for W01-W32, but this mean is heavily influenced by the 2023 epidemic year (26 events in W01-W32, driven by a broader 104-event year). The non-epidemic W01-W32 mean (2022 = 6, 2024 = 53 [peak year], 2025 = 6) is highly variable. The historical variance (σ = shown in 07 CSV) should be more prominently highlighted for Dengue.

**Actual std from CSV:** The 07 CSV computes historical_std_w01_w32. The large standard deviation for Dengue renders the historical mean comparatively meaningless without the variance context.

**Recommendation:** The report narrative for Dengue 2026 should note the standard deviation of W01-W32 historical counts alongside the mean.

---

### ISSUE 6 — Chikungunya District Analysis Covers Pune Only (Informational)

**Description:** Only Pune (N = 11) qualifies for the district analysis among Chikungunya districts. Nanded (N = 8) falls 2 events below the N ≥ 10 threshold. Since Nanded is cited elsewhere in the report as a major Chikungunya district (18.6% of events), an examiner may ask why it is excluded from the district analysis.

**Answer:** Nanded's 8 events across 4 years (mean 2 events/year) do not provide sufficient sample for a month-level district comparison. The threshold is correct. The report should note that Nanded narrowly misses the threshold (N = 8 vs. N ≥ 10).

---

### ISSUE 7 — Seasonal Concentration: Gini Coefficient Not Formally Defined in Report Body (Low Priority)

**Description:** The Gini coefficient formula appears in the measure-selection table header, but the precise formula used (mean absolute difference over all pairs, divided by 2n²μ) is not stated in the report. An examiner who asks "How is Gini calculated?" should receive a precise mathematical formula.

**Recommendation:** Add a footnote with the explicit formula. This is a minor documentation gap, not a computational error.

---

## 4. Data Integrity Assessment

| Integrity Check | Result |
|:---|:---:|
| Source dataset unmodified | ✅ PASS |
| Phase 5A disease mapping unmodified | ✅ PASS |
| Phase 5B outputs unmodified | ✅ PASS |
| Baseline 539 records used throughout | ✅ PASS |
| 2026 isolated (45 records, W01-W32 only) | ✅ PASS |
| Sensitivity exclusions documented (not deleted) | ✅ PASS |
| No synthetic records introduced | ✅ PASS |
| All 15 tests documented with formulas | ✅ PASS |
| Multiple testing correction applied | ✅ PASS |
| No causal/incidence claims detected | ✅ PASS |
| All charts linked to specific source CSV files | ✅ PASS |
| Reproducibility scripts present | ✅ PASS |

---

## 5. Statistical Validity Assessment

| Test Family | Overall Assessment |
|:---|:---|
| Kruskal-Wallis (Phase 5B carry-forward) | Correctly reported; temporal autocorrelation caveat present |
| Monte Carlo Permutation | Methodologically strongest approach for sparse bins; deterministic seeding documented |
| Kendall's W | Appropriate for inter-annual concordance; approximation limitations should be noted |
| Bonferroni Correction | Conservative and appropriately applied |
| BH-FDR Correction | Correctly computed; provides useful intermediate threshold |

---

## 6. Possible Examiner Questions & Recommended Answers

| Examiner Question | Recommended Response |
|:---|:---|
| "Why did you choose CR3 = 0.50 as your threshold?" | Threshold pre-committed before examining results; represents the majority-share of annual activity concentrated in 3 months, interpretable without domain expertise. |
| "How can Food Poisoning have a seasonal pattern if it is driven by mass exposures?" | It does not have a *biological* seasonal pattern. The event concentration in May reflects genuine summer-season reporting, but the case concentration in February is a mass-exposure artefact demonstrated by the sensitivity analysis. |
| "Why does the Dengue permutation test show significance if Kendall's W is not significant?" | They measure different things: uniformity of the pooled aggregate vs. inter-annual rank consistency. Both findings are valid and complementary; see Section 9 of the report. |
| "Could the ADD June peak simply reflect surveillance system overreporting in summer?" | Possible and acknowledged; this analysis measures surveillance reporting patterns, not true incidence. |
| "Why are 2023 Dengue results dominating the aggregates?" | 2023 accounted for 51% of baseline events; equal-year weighting in the seasonal index corrects for this in the Phase 5B index. Phase 5C stability analysis explicitly identifies 2023 as the dominant year. |
| "How is the Gini coefficient calculated?" | (See Issue 7 above — add formula to report) |
| "What is the exact permutation test seed?" | Seed documented in the reproducibility script as a linear congruential generator seed = 123456789 + i*98765 per disease index, ensuring exact reproducibility. |
| "What happens if the missing 2023 W15, W51, W52 weeks contained peak outbreaks?" | Acknowledged; those weeks are permanently absent from the NCDC public archive. This represents a systematic administrative gap, not a project data loss. The 2023 annual event count should be considered a lower bound. |
| "Could the Malaria peak in Eastern Vidarbha be an artefact of better health surveillance infrastructure there?" | A valid alternative interpretation. This analysis cannot distinguish between higher true incidence and higher surveillance sensitivity in a particular region. The report correctly avoids causal inference. |
| "Why were only N≥10 districts included in the district analysis?" | To avoid descriptive comparisons based on fewer than ~2.5 events per year on average, which would make any month-level comparison unreliable. The threshold is conservative and pre-committed. |

---

## 7. Summary of Issues Requiring Action

| Priority | Issue | Action Required |
|:---:|:---|:---|
| 📋 Medium | Issue 1: 3× exclusion threshold not explicitly documented | Add threshold calculation table to report (recommended but not critical) |
| 📋 Low | Issue 2: Kendall's W approximation caveat | Add footnote on Wilson-Hilferty approximation |
| 📋 Low | Issue 3: Food Poisoning multi-exclusion justification | Document explicit threshold calculations for all 3 records |
| ⚠️ Medium | Issue 4: Dengue instability vs. permutation tension | Add 1-2 sentence reconciliation in Section 9 |
| 📋 Low | Issue 5: Dengue W01-W32 variance context | Mention σ alongside μ in 2026 comparison narrative |
| 📋 Low | Issue 6: Nanded near-miss documentation | Note that Nanded (N=8) narrowly missed the threshold |
| 📋 Low | Issue 7: Gini formula not explicitly stated | Add formal formula definition |

**No issues require recalculation or invalidate the core findings.** All central conclusions (concentration tiers, peak windows, sensitivity findings) are methodologically defensible.

---

## 8. Review Verdict

> **PHASE 5C: CONDITIONALLY ACCEPTED — 7 DOCUMENTATION IMPROVEMENTS RECOMMENDED**

The Phase 5C analysis package is **methodologically sound, internally consistent, correctly reproducible, and appropriately cautious in its epidemiological claims**. The core statistical findings are defensible under examination.

The 7 identified issues are all **documentation and presentation gaps** — none represent computational errors, inappropriate methods, or unsupported causal claims. The package is suitable to proceed to final polish and freeze pending resolution of the medium-priority issues (1 and 4 minimum).

---

*This review was conducted by examining all 9 data products, 6 charts, and the 10_PHASE5C_ANALYSIS_REPORT.md. The validated source dataset (NCDC_Maharashtra_CLEAN_ANALYTICAL.csv) was not modified at any point during Phase 5C.*
