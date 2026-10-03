# VIVA AND PRESENTATION GUIDE
## “Analysis of Seasonal Disease Patterns Using Government Health Data”
### Candidate: Khan Umar | B.Sc. Data Science · Semester III | RP Institute · Affiliated to University of Mumbai
### Academic Context: Field Project (2026) | Project Guide: [Confirm before submission]

---

## EXECUTIVE SUMMARY FOR THE CANDIDATE
This guide is your complete personal briefing document for presenting your field project before your professor, external examiners, and classmates. It translates every chart, model, statistical test, and field observation into clear, natural, spoken English. Read this guide to master your narrative, explain your methods without hesitation, and answer every possible viva question with academic confidence.

---

# PART 1 — 30-SECOND PROJECT SUMMARY
### What to say when asked: “Tell us about your project in half a minute.”

> “In this project, I investigated whether seasonal disease outbreaks in Maharashtra follow recurring, predictable temporal patterns using five years of official NCDC/IDSP weekly outbreak bulletins from 2022 to 2026. Across 237 surveillance weeks and 809 extracted records, I harmonized 116 raw disease labels into five primary cohorts representing 21,955 cases. I found that while diseases like Dengue and Malaria show strong seasonal concentration, Acute Diarrheal Disease (ADD) is the only condition demonstrating statistically significant inter-annual rank stability under Kendall’s W ($W = 0.530, p = 0.016$). Furthermore, a direct field observation and key-informant interview with the Medical Officer In-Charge at PHC Nallasopara West contextualized how local reporting thresholds, domestic water storage, and OPD fever surges drive these epidemiological figures on the ground.”

---

# PART 2 — COMPLETE PRESENTATION SCRIPT (ACT BY ACT)

### ACT 01 · WHAT IS THE QUESTION?
* **What is on screen:** Editorial title, research questions: When, Which, Where, How Stable?
* **What I say:** “Respected Professor and peers: Diseases do not appear randomly throughout the year; they respond to environmental, biological, and human behavioral cycles. My core research question asks: *When do disease outbreaks actually appear in Maharashtra, and do their annual monthly rankings repeat consistently year after year?*”
* **Why this section exists:** Establishes the academic problem statement immediately.
* **Key numbers:** 237 weeks, 809 records, 21,955 cases, 266 deaths.
* **One simple explanation:** “We are separating casual assumptions about disease seasonality from statistically verifiable recurrence.”
* **Transition:** “To answer this question, we must first look at the physical provenance of our surveillance data.”

---

### ACT 02 · WHERE DID THE DATA COME FROM?
* **What is on screen:** Annual surveillance coverage bars (2022 to 2026 W32), NIL weeks explanation, 237 weeks, 809 analytical records.
* **What I say:** “Our dataset originates from the National Centre for Disease Control (NCDC) and the Integrated Disease Surveillance Programme (IDSP). Between 2022 and Week 32 of 2026, we archived 237 weekly epidemiological outbreak bulletins. Crucially, 34 of these were ‘NIL’ weeks—meaning no outbreak met the state notification threshold that week. A NIL week does not mean zero disease in hospitals; it means no declared outbreak met surveillance criteria.”
* **Why this section exists:** Proves data legitimacy, transparency, and awareness of surveillance limitations.
* **Key numbers:** 237 total weeks = 203 outbreak weeks + 34 NIL weeks.
* **One simple explanation:** “Official government outbreak reports capture cluster events, not every routine OPD visit.”
* **Transition:** “These weekly reports exist as scanned and unstructured PDF tables. How did we transform them into tabular analytical records?”

---

### ACT 03 · HOW DID WE TURN PDF DOCUMENTS INTO DATA?
* **What is on screen:** Pinned pipeline animation showing government PDF table extracting into structured analytical fields with immutable source filenames.
* **What I say:** “Government surveillance tables cannot be fed directly into an algorithm. We engineered an extraction pipeline that converted unstructured PDF tables into structured rows. Every single row maintains an immutable provenance link: we track the exact source PDF filename, week number, reporting state, district, raw disease string, case count, and mortality count.”
* **Why this section exists:** Demonstrates real data engineering discipline and reproducibility.
* **Key numbers:** 809 records permanently linked to source PDFs.
* **One simple explanation:** “If an examiner asks about any number, we can point directly to the exact page of the government PDF where it originated.”
* **Transition:** “Once extracted, we encountered a major challenge: messy, non-standardized clinical disease strings.”

---

### ACT 04 · HOW DID WE CLEAN THE RAW DISEASE LABELS?
* **What is on screen:** Native taxonomy reduction: 116 Raw Strings $\rightarrow$ 56 Clean Labels $\rightarrow$ 30 Derived Families $\rightarrow$ 5 Primary Cohorts.
* **What I say:** “Across five years of reports, medical officers recorded disease names in 116 different ways—ranging from abbreviations like ‘ADD’ to OCR typos and varied spellings. We applied deterministic regex dictionary rules to normalize these 116 raw strings into 56 clean canonical labels, which mapped to 30 syndromic families, and ultimately isolated our 5 primary study cohorts. Importantly, this was additive normalization: the original raw text was never destroyed.”
* **Why this section exists:** Demonstrates rigorous, non-destructive data cleaning.
* **Key numbers:** $116 \rightarrow 56 \rightarrow 30 \rightarrow 5$ (Captures 93.9% of all baseline records).
* **One simple explanation:** “We cleaned spelling chaos into consistent cohorts without deleting or fabricating data.”
* **Transition:** “Let us examine the five primary disease cohorts that formed our baseline analysis.”

---

### ACT 05 · WHAT FIVE DISEASE FAMILIES DID WE ANALYZE?
* **What is on screen:** 5 disease cards: Dengue, ADD, Malaria, Food Poisoning, Chikungunya with baseline counts.
* **What I say:** “Our completed four-year baseline (2022–2025) comprises 539 primary cohort records, accounting for 21,955 cases and 266 deaths across 36 districts:
  1. *Dengue Fever*: 204 records, 3,144 cases, 93 deaths.
  2. *Acute Diarrheal Disease (ADD)*: 153 records, 9,050 cases, 93 deaths.
  3. *Malaria*: 70 records, 2,133 cases, 51 deaths.
  4. *Food Poisoning*: 69 records, 5,927 cases, 29 deaths.
  5. *Chikungunya*: 43 records, 701 cases, 0 deaths.”
* **Why this section exists:** Establishes the core baseline metrics before diving into temporal analysis.
* **Key numbers:** 539 records, 21,955 cases, 266 deaths.
* **One simple explanation:** “These five disease families account for 93.9% of all investigated outbreak events in Maharashtra.”
* **Transition:** “Now, let us examine when these diseases actually appear on the calendar.”

---

### ACT 06 · WHEN DO THESE DISEASES APPEAR?
* **What is on screen:** Native Radial Seasonal Clock and animated Monthly Event/Case chart: “Five Diseases. Five Temporal Signatures.”
* **What I say:** “Here we observe five distinct temporal signatures across the 12 calendar months:
  - *Dengue* exhibits strong late- and post-monsoon concentration; 82.8% of events occur between June and October, peaking in October (40 events).
  - *ADD* surges with monsoon onset in June–August, accompanied by a secondary post-monsoon rise in October.
  - *Malaria* peaks early, during the pre-monsoon and onset months of May to July.
  - *Food Poisoning* is distinctly non-monsoonal, exhibiting a bimodal distribution in January–February and April–May.
  - *Chikungunya* shows low, dispersed activity without a single recurring calendar peak.
  Next, notice our event versus case comparison: Food Poisoning averages 85.9 cases per event, whereas Dengue averages only 15.4. High outbreak frequency does not necessarily mean high patient volume.”
* **Why this section exists:** The visual centerpiece of the entire presentation.
* **Key numbers:** Dengue CR3 = 50.5% (Aug–Oct); Malaria CR3 = 51.4% (May–Jul); ADD CR3 = 43.1% (Jun–Aug).
* **One simple explanation:** “Different pathogens occupy distinct seasonal niches: Malaria arrives early, ADD spans the rains, Dengue peaks post-rain, and Food Poisoning follows banquet seasons.”
* **Transition:** “Do these seasonal patterns genuinely repeat every single year, or were they just random coincidences?”

---

### ACT 07 · DO THEIR PATTERNS REPEAT ACROSS YEARS?
* **What is on screen:** Native Kendall's W Rank Concordance visual showing 4 annual rankings aligned.
* **What I say:** “To determine if monthly activity rankings repeat from year to year, we applied Kendall’s Coefficient of Concordance ($W$) across the four completed baseline years (2022–2025). The results are revealing:
  - *ADD* is the ONLY disease demonstrating statistically significant rank concordance: $W = 0.530, p = 0.016$. Its 12-month relative ranking repeats consistently year after year.
  - *Dengue* achieved $W = 0.405, p = 0.086$. While strongly concentrated, its peak month oscillates between September and October depending on the monsoon retreat.
  - *Food Poisoning* ($W = 0.386, p = 0.108$) and *Malaria* ($W = 0.319, p = 0.229$) show moderate concordance.
  - *Chikungunya* showed near-random rank agreement: $W = 0.150, p = 0.832$.”
* **Why this section exists:** Demonstrates real inferential statistics and prevents over-claiming seasonality.
* **Key numbers:** ADD $W = 0.530, p = 0.016$; Dengue $W = 0.405, p = 0.086$.
* **One simple explanation:** “ADD is the only disease where we can statistically prove that high months stay high and low months stay low every single year.”
* **Transition:** “Now, does a statewide seasonal pattern mean the disease is spread uniformly across the state?”

---

### ACT 08 · WHERE ARE THE EVENTS CONCENTRATED?
* **What is on screen:** Interactive Maharashtra District Map with highlighted reporting footprints and the Gadchiroli-Chandrapur cluster.
* **What I say:** “When we map district reporting footprints across Maharashtra’s 36 administrative districts, we uncover an essential geographical insight:
  - ADD was reported across 33 districts, and Dengue across 31 districts—indicating near-statewide endemicity.
  - Malaria, however, was reported in only 15 districts. More strikingly, 43 of the 70 total Malaria outbreaks—representing 61.4% of all events—occurred in just two eastern forested districts: Gadchiroli and Chandrapur.
  Therefore: *A statewide temporal pattern does not imply geographic uniformity.* Malaria policy must focus resources on the Vidarbha tribal belt.”
* **Why this section exists:** Connects temporal analysis to spatial public health geography.
* **Key numbers:** Dengue 31 districts, ADD 33 districts; Malaria: 43/70 events (61.4%) in Gadchiroli + Chandrapur.
* **One simple explanation:** “Dengue is everywhere in Maharashtra; Malaria is heavily clustered in two eastern districts.”
* **Transition:** “Next, we examine a critical analytical question: Can extreme outlier events distort aggregate seasonal statistics?”

---

### ACT 09 · CAN OUTLIERS DISTORT THE STORY?
* **What is on screen:** Native Outlier Decomposition showing February Food Poisoning cases dropping from 2,162 to 547 cases when 3 records are isolated.
* **What I say:** “In February, Food Poisoning records an astonishing 2,162 reported cases. When we decomposed this aggregate, we discovered that just three single-event mass-exposure records accounted for 1,615 cases:
  1. Kolhapur (2024 W07): 651 cases
  2. Parbhani (2025 W06): 629 cases
  3. Solapur (2023 W06): 335 cases
  These three events represent 74.7% of all February cases, and 27.3% of the entire four-year baseline total! When we perform a sensitivity analysis by setting aside these three records, February drops to 547 cases, and the true underlying seasonal peak shifts to April–May. We did NOT delete these records—they are genuine historical events. But sensitivity analysis prevents a single wedding banquet from misleading statewide policy.”
* **Why this section exists:** Demonstrates critical statistical thinking and sensitivity testing.
* **Key numbers:** 3 records = 1,615 cases = 74.7% of February = 27.3% of 4-year total.
* **One simple explanation:** “A few massive wedding feasts can trick you into thinking February is always the peak month for Food Poisoning.”
* **Transition:** “What about the most recent surveillance window in 2026?”

---

### ACT 10 · WHAT DOES THE PARTIAL 2026 WINDOW SHOW?
* **What is on screen:** Native Timeline scrubbing from W01 to W32 and halting visibly at the red cutoff barrier.
* **What I say:** “Our dataset contains 32 weeks of 2026 surveillance data, comprising 45 primary records, 1,118 cases, and 0 reported deaths. We must state a strict methodological boundary: *This partial window terminates at Week 32 and cannot be used as an annual comparison or full-year forecast.* Historically, 55.4% of all Dengue outbreaks in Maharashtra occur after Week 32. Concluding that Dengue decreased in 2026 would be an artifact of temporal truncation. Additionally, 100% of 2026 Food Poisoning events were classified as ‘Suspected’ in government bulletins.”
* **Why this section exists:** Prevents deceptive forecasting and demonstrates methodological honesty.
* **Key numbers:** 45 records, 1,118 cases, 0 deaths; 55.4% Dengue occurs post-W32.
* **One simple explanation:** “We stopped counting at Week 32, right before Dengue season usually starts—so we cannot compare 2026 to full years.”
* **Transition:** “Secondary government data reveals statewide trends. But what is happening inside the health facilities where these numbers originate?”

---

### ACT 11 · WHAT DID I SEE IN THE FIELD?
* **What is on screen:** Facility photograph of PHC Nallasopara West / VVMC Health Post, Palghar, observation timeline.
* **What I say:** “On 02 October 2026, between 10:30 AM and 11:45 AM, I conducted an in-person field visit to PHC Nallasopara West (VVMC Health Post) in the Kala Krida Ground area of Palghar district.
  During structured environmental observation, I observed:
  - Dense morning registration and pharmacy queues with pediatric and adult fever attendance.
  - Prominent Marathi and Hindi posters displaying mosquito prevention, ‘Dry Day’ water-container emptying, and ORS/chlorination messaging.
  - Open concrete stormwater drains with localized silt accumulation along the facility perimeter.
  - Small stagnant pools in unpaved road depressions near construction margins.
  - Visible Abate / temephos larvicide inspection markings stenciled on adjacent building entries.
  To maintain academic integrity: This was ONE local facility visit. No community surveys or patient datasets were collected.”
* **Why this section exists:** Provides grounded empirical context and adheres strictly to verified facts.
* **Key numbers:** 1 facility, 1 observation session (10:30–11:45 AM), 0 fabricated surveys.
* **One simple explanation:** “I visited a real government health post in Palghar to observe the physical conditions and public health messaging firsthand.”
* **Transition:** “During this visit, I interviewed the physician in charge of the facility.”

---

### ACT 12 · WHAT DID THE MEDICAL OFFICER REPORT?
* **What is on screen:** Structured summary of the key-informant interview with the Medical Officer In-Charge.
* **What I say:** “I conducted a key-informant interview with the Medical Officer In-Charge. The Medical Officer reported:
  - *Local Seasonal Patterns*: Dengue cases peak locally from September to November, driven by domestic clean-water container storage during post-monsoon dry spells. Malaria presents from July to September. GI illnesses surge in June–August upon the first heavy monsoon downpours.
  - *Fever Burden*: An acute local fever surge occurs in August and September.
  - *Surveillance Workflow*: Doctors review physical OPD registers daily. When multiple cases originate from the same lane or chawl, an internal alert is triggered for MPHW and ASHA workers to conduct active fever surveys and targeted larviciding.
  - *Operational Needs*: The Medical Officer emphasized the need for automated ward-level cluster alerts, weekly OPD fever trends versus confirmed lab cases, and simplified early-warning interfaces.”
* **Why this section exists:** Explains the human and operational mechanism of public health surveillance.
* **Key numbers:** Daily OPD review $\rightarrow$ cluster flag $\rightarrow$ ASHA field survey $\rightarrow$ larvicide $\rightarrow$ district report.
* **One simple explanation:** “The doctor explained how a cluster of fever patients in the morning clinic triggers field teams to inspect mosquito breeding sites.”
* **Transition:** “How does this local operational perspective relate back to our statewide NCDC data?”

---

### ACT 13 · HOW DOES LOCAL CONTEXT RELATE TO THE STATEWIDE DATA?
* **What is on screen:** Contextual comparison table: Government Data (NCDC) vs. Local Facility (PHC Nallasopara West).
* **What I say:** “When we compare statewide surveillance data with our local facility interview, we see complementary alignment:
  - Dengue: Statewide peak is October; local clinical peak is September–November.
  - Malaria: Statewide peak is May–July; local peak is July–September.
  - ADD: Both state data and local reports agree on a sharp June–August monsoon onset surge.
  - Food Poisoning: State data shows bimodal clustering; the Medical Officer confirmed that cases arrive in sudden acute cohorts of 15 to 40 individuals after community events.
  *Methodological Caution*: This comparison is contextual, not a formal statistical validation. The NCDC layer aggregates notified outbreaks across Maharashtra; the interview reflects operational reality at one urban primary health post.”
* **Why this section exists:** Triangulates macro data and micro fieldwork without over-generalizing.
* **Key numbers:** State vs. Local timing alignments for all 5 diseases.
* **One simple explanation:** “Statewide data shows the forest; the local health post shows the trees. They tell the same underlying biological story.”
* **Transition:** “This brings us to our final research conclusions.”

---

### ACT 14 · WHAT CAN WE ACTUALLY CONCLUDE?
* **What is on screen:** Story spine synthesis, 3 core conclusions, candidate metadata, and PDF Export link.
* **What I say:** “In conclusion, this project establishes three primary findings:
  1. *Seasonality is pathogen-specific*: Outbreaks in Maharashtra follow distinct biological calendars—from early-monsoon Malaria in Vidarbha, to mid-monsoon ADD, to post-monsoon Dengue across 31 districts.
  2. *Statistical stability varies*: ADD is the only condition with statistically proven annual rank stability ($W = 0.530$). Other diseases fluctuate based on rainfall timing and point-source banquet clusters.
  3. *Policy must be dual-layered*: Macro-surveillance identifies when state supplies must be pre-positioned, but local primary health facilities require ward-level early warning tools to intervene before clusters expand.
  *The pattern is seasonal. The context is local. The interpretation needs both.*
  Thank you. I am now open to your questions.”
* **Why this section exists:** Leaves a memorable, polished, and academically defensible impression.

---

# PART 3 — “IF I FORGET EVERYTHING” CHEAT SHEET

### The Core Storyline in 10 Words:
**PDFs $\rightarrow$ Extraction $\rightarrow$ Cleaning $\rightarrow$ Seasonality $\rightarrow$ Kendall's W $\rightarrow$ Geography $\rightarrow$ Outliers $\rightarrow$ 2026 $\rightarrow$ Fieldwork $\rightarrow$ Synthesis.**

### The 9 Critical Numbers to Memorize:
1. **237**: Total surveillance weeks archived (2022–2026 W32).
2. **809**: Total analytical outbreak records extracted for Maharashtra.
3. **539**: Baseline outbreak records in the 5 primary cohorts (2022–2025).
4. **21,955**: Total reported baseline cases across the 5 primary cohorts.
5. **266**: Total reported baseline deaths.
6. **116 $\rightarrow$ 56 $\rightarrow$ 30 $\rightarrow$ 5**: Taxonomic normalization steps.
7. **0.530 ($p = 0.016$)**: Kendall’s W for ADD (the ONLY statistically significant result).
8. **61.4%**: Malaria records concentrated in just 2 districts (Gadchiroli & Chandrapur).
9. **45**: Records in 2026 W01–W32 (1,118 cases, 0 deaths; ends at W32).

---

# PART 4 — EACH VISUAL EXPLAINED IN SIMPLE LANGUAGE

| Visual | What am I looking at? | What does it mean? | What should I say? | What should I NOT say? |
| :--- | :--- | :--- | :--- | :--- |
| **Radial Seasonal Clock** | A 12-month circular clock with 5 colored concentric rings for each disease. | Each disease occupies a distinct seasonal timing around the year. | “This radial clock demonstrates pathogen-specific seasonal niches.” | “This circular chart proves climate change causes disease.” |
| **Monthly Events vs Cases Chart** | A bar chart comparing how many outbreak events vs. how many patient cases occurred each month. | Outbreak frequency does not equal case volume (e.g., Food Poisoning clusters). | “Event counts show outbreak frequency, while case counts show population impact.” | “More events always mean more sick patients.” |
| **Kendall’s W Alignment Visual** | Four horizontal rows (2022–2025) showing monthly rankings lining up. | Shows how consistently the 12 months maintain the same rank order across years. | “ADD shows strong alignment ($W=0.530$), while Chikungunya is near-random ($W=0.150$).” | “Kendall’s W proves that seasonality is permanent forever.” |
| **Maharashtra District Map** | An interactive choropleth map of Maharashtra’s 36 districts. | Shows how widely each disease is reported across the state. | “Dengue is near-statewide (31 districts), while Malaria is 61.4% concentrated in 2 Vidarbha districts.” | “Districts without records have completely zero disease.” |
| **Outlier Decomposition** | A toggle showing February Food Poisoning dropping from 2,162 to 547 cases. | Three massive banquet outbreaks account for 74.7% of February cases. | “Sensitivity analysis isolates point-source clusters to reveal the true underlying peak in April–May.” | “We deleted the outlier records because they were mistakes.” |
| **2026 Timeline** | A progress bar scrubbing from W01 to W32, halting at a red line. | Surveillance stops at Week 32; no full-year comparison is possible. | “Because 55.4% of Dengue occurs after Week 32, 2026 cannot be evaluated as an annual total.” | “Dengue was eradicated in 2026.” |
| **Fieldwork Triangulation Table** | A two-column comparison between statewide NCDC data and PHC Nallasopara West notes. | Qualitative contextual comparison between macro surveillance and micro clinic operations. | “This comparison contextualizes how local reporting workflows generate the state surveillance numbers.” | “This one clinic interview statistically validates all Maharashtra data.” |

---

# PART 5 — PROFESSOR VIVA QUESTIONS & ANSWERS (40+ QUESTIONS)

### Category A: Basic Project Questions
1. **Q: What is the main objective of your project?**
   - *Answer*: “To determine whether seasonal disease outbreaks in Maharashtra follow recurring, predictable monthly patterns using official government surveillance data, and to contextualize these findings through local primary healthcare fieldwork.”
   - *Why good*: Direct, concise, mentions both quantitative data and qualitative fieldwork.
   - *Do not say*: “I built a website with charts.”
2. **Q: Why did you choose Maharashtra?**
   - *Answer*: “Maharashtra has a diverse geography—coastal, plateau, and forested eastern belts—and consistent weekly public reporting through NCDC/IDSP with high surveillance density.”
   - *Why good*: Demonstrates geographical and epidemiological rationale.
3. **Q: What is your primary data source?**
   - *Answer*: “The weekly outbreak bulletins published by the National Centre for Disease Control (NCDC) under the Integrated Disease Surveillance Programme (IDSP).”
4. **Q: What time period does your study cover?**
   - *Answer*: “A completed four-year baseline from 2022 to 2025 (539 primary records), plus an out-of-sample observation window covering Weeks 01 to 32 of 2026 (45 primary records).”

### Category B: Data Cleaning & Extraction Questions
5. **Q: How did you extract data from government PDFs?**
   - *Answer*: “We extracted text from weekly PDF tables, preserved row-level provenance with source file metadata, and standardized columns into a structured tabular schema.”
6. **Q: What was the biggest challenge during data cleaning?**
   - *Answer*: “Taxonomic inconsistency—116 raw spelling variants for disease names. We normalized them into 56 canonical labels and 5 primary cohorts using deterministic dictionary mapping.”
7. **Q: Did you delete records with unusual spellings?**
   - *Answer*: “No. We used additive normalization: the clean label was assigned to a new column while preserving the original raw string in `disease_raw`.”
8. **Q: How did you handle missing weeks in 2023?**
   - *Answer*: “Weeks 15, 51, and 52 were never published by NCDC. We documented them explicitly as unpublished rather than imputing false zeros.”

### Category C: Statistical Methodology Questions
9. **Q: What is Kendall’s Coefficient of Concordance ($W$)?**
   - *Answer*: “It is a non-parametric statistic that measures agreement among multiple raters. Here, the four years are raters, and the 12 calendar months are ranked by disease activity.”
   - *Why good*: Precise mathematical definition without over-complication.
   - *Do not say*: “It proves that diseases are caused by the weather.”
10. **Q: Why use Kendall’s W instead of Pearson correlation?**
    - *Answer*: “Outbreak event counts are skewed and non-normally distributed. Kendall’s W operates on ranks, making it robust against non-normality and extreme outliers.”
11. **Q: What was your significance threshold?**
    - *Answer*: “We tested at $\alpha = 0.05$.”
12. **Q: Which disease was statistically significant under Kendall’s W?**
    - *Answer*: “Acute Diarrheal Disease (ADD), with $W = 0.530$ and $p = 0.016$.”
13. **Q: Why is Dengue’s Kendall’s W ($0.405$) not statistically significant ($p = 0.086$)?**
    - *Answer*: “Because while Dengue tightly concentrates in late monsoon, the exact peak month shifts between September and October from year to year depending on monsoon retreat timing.”

### Category D: Seasonality Questions
14. **Q: When does Dengue peak in Maharashtra?**
    - *Answer*: “Between August and October, with the single highest event frequency occurring in October (40 events, 566 cases).”
15. **Q: Why does Malaria peak earlier than Dengue?**
    - *Answer*: “*Anopheles* vectors breed in pre-monsoon riverbed pools and early rainwater puddles (May–July), whereas *Aedes aegypti* proliferates in post-monsoon clean water container storage (August–October).”
16. **Q: Why is Food Poisoning non-monsoonal?**
    - *Answer*: “Food poisoning is driven by food preparation hygiene, storage temperatures, and mass community gatherings (weddings and festivals in Jan–Feb and Apr–May) rather than mosquito vectors.”
17. **Q: What is the 3-Month Concentration Ratio (CR3)?**
    - *Answer*: “The proportion of all baseline outbreak events that occur within the single highest contiguous three-month calendar window.”

### Category E: Geographic Questions
18. **Q: Which disease has the widest geographic spread?**
    - *Answer*: “ADD, reported across 33 of Maharashtra’s 36 administrative districts.”
19. **Q: What is the key geographic finding for Malaria?**
    - *Answer*: “61.4% of all Malaria outbreak records (43 of 70) occurred in just two districts: Gadchiroli and Chandrapur in eastern Vidarbha.”
20. **Q: Why is Malaria so concentrated in Gadchiroli and Chandrapur?**
    - *Answer*: “Dense forest cover, perennial streams, high tribal populations, and specific ecological niches for *Anopheles culicifacies* and *Anopheles fluviatilis*.”

### Category F: Outlier & Sensitivity Questions
21. **Q: What is an outlier in your dataset?**
    - *Answer*: “Single outbreak events with exceptionally large case enumerations, such as the 2024 Kolhapur Food Poisoning outbreak with 651 cases.”
22. **Q: Why did you perform a sensitivity analysis on Food Poisoning?**
    - *Answer*: “To test whether February’s massive peak was a genuine recurring pattern or an artifact of three single-event mass-exposure banquets.”
23. **Q: Did you delete the three February outliers?**
    - *Answer*: “No. Deleting genuine government records is scientifically unethical. We recalculated statistics with and without them to evaluate sensitivity.”
24. **Q: What happened when the three records were set aside?**
    - *Answer*: “February cases dropped from 2,162 to 547, and the primary seasonal peak shifted to April–May.”

### Category G: 2026 Partial-Year Questions
25. **Q: Why can’t we compare 2026 to 2025?**
    - *Answer*: “The 2026 data terminates at Week 32. Historically, over 55% of Dengue outbreaks occur after Week 32, so a partial-year comparison would be misleading.”
26. **Q: How many records are in the 2026 window?**
    - *Answer*: “45 primary cohort records, 1,118 reported cases, and 0 reported deaths.”
27. **Q: Why are all 2026 Food Poisoning events labeled ‘Suspected’?**
    - *Answer*: “Source PDF bulletins in 2026 recorded provisional field investigation status before reference lab bacteriology confirmation was finalized.”

### Category H: Fieldwork & Observation Questions
28. **Q: Where did you conduct your fieldwork?**
    - *Answer*: “At PHC Nallasopara West (VVMC Health Post), located in the Kala Krida Ground area of Palghar district, Maharashtra.”
29. **Q: What date and time did you visit?**
    - *Answer*: “02 October 2026, from 10:30 AM to 11:45 AM.”
30. **Q: Who did you interview?**
    - *Answer*: “The Medical Officer In-Charge of the health post in a structured key-informant interview.”
31. **Q: Did you conduct a door-to-door survey?**
    - *Answer*: “No. Our fieldwork was strictly an institutional key-informant interview and structured environmental observation at one facility. We did not collect community surveys.”
32. **Q: What did you observe outside the clinic?**
    - *Answer*: “Open concrete stormwater drains with silt accumulation, small puddles in unpaved road depressions, and municipal larvicide inspection markings on building entrances.”
33. **Q: What public health signage was visible?**
    - *Answer*: “Posters in Marathi and Hindi regarding Dengue vector prevention, weekly ‘Dry Day’ water storage tank emptying, and chlorine water purification.”

### Category I: Operational & Policy Questions
34. **Q: How does a local clinic detect an outbreak?**
    - *Answer*: “When three or more patients with similar acute symptoms from the same lane or chawl register in the physical OPD ledger within a few days.”
35. **Q: What happens when an outbreak is flagged?**
    - *Answer*: “ASHA and Multi-Purpose Health Workers are dispatched for house-to-house fever surveys, ORS/tablet distribution, and municipal vector larviciding.”
36. **Q: What data tool did the Medical Officer request?**
    - *Answer*: “Automated ward-level alert dashboards that track daily OPD fever surges before formal laboratory confirmation arrives.”

### Category J: Limitations & Ethics Questions
37. **Q: What is the main limitation of your dataset?**
    - *Answer*: “IDSP bulletins capture formal cluster outbreaks meeting notification thresholds, omitting individual mild cases and private-sector hospital admissions.”
38. **Q: Does this dataset represent total disease incidence in Maharashtra?**
    - *Answer*: “No. It represents investigated surveillance outbreaks reported through the government health hierarchy.”
39. **Q: How did you ensure research ethics?**
    - *Answer*: “No patient-identifying data was collected; facility staff observations were paraphrased without fabricated quotes; and all government records maintain open-access provenance.”
40. **Q: What would you do if you had six more months?**
    - *Answer*: “I would integrate district-level rainfall and temperature datasets from IMD to perform distributed lag non-linear modeling (DLNM) alongside surveillance data.”

---

# PART 6 — HARD & TRICK QUESTIONS

### Trick Q 1: “Why didn’t you use Machine Learning to predict next year’s cases?”
> **Best Answer**: “With four baseline years and weekly aggregated cluster counts, applying complex machine learning models would lead to severe overfitting on sparse data. Rigorous non-parametric statistical methods like Kendall’s W and concentration ratios provide robust, explainable epidemiological insights without making unfounded predictive claims.”

### Trick Q 2: “Does stagnant water prove Dengue causation in your study?”
> **Best Answer**: “No. Stagnant water provides a known biological habitat for *Aedes* breeding, which we observed in the field, but our observational study identifies ecological correlations, not direct causal laboratory proof.”

### Trick Q 3: “Why didn’t you fill missing weeks with zero?”
> **Best Answer**: “In public health surveillance, an unpublished bulletin does not indicate zero cases in hospitals. Imputing zero would artificially lower the annual baseline and distort statistical variance.”

### Trick Q 4: “Can your field visit findings be generalized to all of Maharashtra?”
> **Best Answer**: “No. Our fieldwork represents one urban primary healthcare facility in Palghar. It provides operational context for how surveillance data is generated, not statistical generalization for 36 districts.”

---

# PART 7 — 10 SENTENCES TO MEMORIZE

1. “Our study analyzes 237 surveillance weeks and 809 extracted records from official NCDC/IDSP weekly outbreak bulletins.”
2. “We normalized 116 chaotic raw disease strings into five primary cohorts representing 21,955 reported cases.”
3. “Acute Diarrheal Disease is the only condition demonstrating statistically significant inter-annual rank stability ($W = 0.530, p = 0.016$).”
4. “Dengue shows strong post-monsoon concentration in August–October, but its peak month oscillates between September and October.”
5. “Over 61% of all reported Malaria outbreaks are concentrated in just two eastern districts: Gadchiroli and Chandrapur.”
6. “Food Poisoning exhibits extreme divergence between event count and case volume, averaging 85.9 cases per event.”
7. “Sensitivity analysis revealed that three high-volume banquet clusters accounted for 74.7% of all February Food Poisoning cases.”
8. “The 2026 dataset terminates at Week 32 and cannot be evaluated as an annual total because over 55% of Dengue historically occurs after Week 32.”
9. “Our fieldwork at PHC Nallasopara West provided firsthand operational evidence of how OPD clusters trigger local field containment.”
10. “The pattern is seasonal. The context is local. The interpretation needs both.”

---

# PART 8 — PRESENTATION DELIVERY GUIDE

- **When to pause**: Pause for 2 seconds after asking each rhetorical section question (e.g., “When do these diseases actually appear?”).
- **When to scroll**: Let each chart build itself completely before scrolling to the interpretation text below it.
- **When to point at the screen**: Point directly at the October Dengue peak, the Gadchiroli-Chandrapur map cluster, and the February outlier decomposition toggle.
- **When NOT to talk**: Never speak while the cinematic intro video is playing during the first 10 seconds; let the archival atmosphere set the mood.
- **Handling technical issues**: If the projector or browser lags, press the **Export PDF** button on the top nav bar, open the static PDF document, and continue presenting without interruption.

---

# PART 9 — EMERGENCY 60-SECOND VERSION
*(Use this if the committee tells you: “You have only one minute.”)*

> “Good morning. My research investigates seasonal disease patterns across 237 surveillance weeks in Maharashtra using official NCDC/IDSP outbreak reports from 2022 to 2026. Across 809 records and 21,955 baseline cases, we found that diseases follow distinct biological timings: Dengue peaks post-monsoon in October, Malaria surges early in May–July, and ADD peaks with monsoon onset. Under Kendall’s W concordance testing, ADD is the only disease with statistically significant annual repeatability ($W=0.530, p=0.016$). Geographically, 61.4% of Malaria is localized to Gadchiroli and Chandrapur, while sensitivity testing proved that three wedding clusters dictate February Food Poisoning numbers. Finally, an in-person field visit to PHC Nallasopara West contextualized how OPD fever surges trigger local ASHA interventions. In short: statewide patterns provide the schedule, but local field context determines the intervention.”

---

# PART 10 — EMERGENCY 3-MINUTE VERSION
*(Use this if you are allocated a standard short presentation slot.)*

> **Minute 1: The Question & The Data**
> “Respected examiners: Our research examines whether infectious disease outbreaks in Maharashtra follow predictable seasonal calendars. We archived 237 weekly outbreak bulletins published by NCDC/IDSP from 2022 to Week 32 of 2026. We cleaned 116 raw spelling variants into five primary cohorts: Dengue, Acute Diarrheal Disease, Malaria, Food Poisoning, and Chikungunya, capturing 93.9% of all baseline records, 21,955 cases, and 266 deaths.”
>
> **Minute 2: Seasonality, Statistics & Geography**
> “Our temporal analysis revealed distinct signatures: Dengue concentrates in August–October, Malaria in May–July, and ADD in June–August. Applying Kendall’s W concordance test across the four completed baseline years, ADD proved to be the only statistically significant recurring disease ($W = 0.530, p = 0.016$), whereas Dengue oscillates between September and October peaks. Spatially, while Dengue spans 31 districts, Malaria is heavily clustered: 61.4% of all events occurred in just two districts: Gadchiroli and Chandrapur. Furthermore, sensitivity testing demonstrated that just three banquet outbreaks accounted for 74.7% of all February Food Poisoning cases.”
>
> **Minute 3: Fieldwork & Conclusion**
> “To understand how these numbers arise, I visited PHC Nallasopara West in Palghar on 02 October 2026. Through environmental observation of open drains and water storage, and an interview with the Medical Officer In-Charge, I documented how daily OPD ledger clusters trigger ASHA house-to-house fever surveys and larviciding. This demonstrates that statewide data tells us when and where to pre-position resources, but local primary clinics drive containment. The pattern is seasonal; the context is local; the interpretation needs both. Thank you.”
