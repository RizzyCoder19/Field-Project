/**
 * SLIDE 04: FOUR-YEAR EMPIRICAL BASELINE — ROYAL SOVEREIGN
 * Three massive royal metric blocks & 5 disease family comparative profile cards.
 */

const config = require("../presentation.config");
const { addHeader, addFooter, addCard } = require("../components/base");
const data = require("../data");

module.exports = function createSlide04(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: config.colors.bg };

  addHeader(slide, "EMPIRICAL BASELINE  //  2022–2025 COMPLETED YEARS", "Four-Year Outbreak Surveillance Baseline (Maharashtra)");

  // ── Three Massive Royal Metric Cards ────────────────────────────────────────
  const metrics = [
    {
      num: "539",
      unit: "OUTBREAK RECORDS",
      label: "Investigated Clusters (2022–2025)",
      desc: "District surveillance investigations across Maharashtra",
      color: config.colors.azure,
      highlight: false
    },
    {
      num: "21,955",
      unit: "REPORTED CASES",
      label: "Enumerated Outbreak Patients",
      desc: "Aggregated across official cluster reports (5 primary families)",
      color: config.colors.gold,
      highlight: true
    },
    {
      num: "266",
      unit: "REPORTED FATALITIES",
      label: "Surveillance Outbreak Deaths",
      desc: "Case fatality ratio: 1.21% across primary cohort",
      color: config.colors.rubyLight,
      highlight: false
    }
  ];

  const statY = 1.32;
  const statH = 1.72;
  const statW = 2.68;
  const statGap = 0.18;

  metrics.forEach((m, i) => {
    const sx = 0.8 + i * (statW + statGap);

    addCard(slide, {
      x: sx,
      y: statY,
      w: statW,
      h: statH,
      fill: m.highlight ? config.colors.bgCardLight : config.colors.bgCard,
      border: m.highlight ? config.colors.gold : config.colors.cardBorder,
      lineWeight: m.highlight ? 1.25 : 0.75
    });

    // Top indicator line
    slide.addShape("line", {
      x: sx,
      y: statY,
      w: statW,
      h: 0,
      line: { color: m.color, width: m.highlight ? 2 : 1 }
    });

    // Big numeral
    slide.addText(m.num, {
      x: sx + 0.15,
      y: statY + 0.1,
      w: statW - 0.3,
      h: 0.7,
      fontFace: config.fonts.display,
      fontSize: m.highlight ? 36 : 32,
      bold: true,
      color: m.color
    });

    // Unit
    slide.addText(m.unit, {
      x: sx + 0.15,
      y: statY + 0.8,
      w: statW - 0.3,
      h: 0.22,
      fontFace: config.fonts.mono,
      fontSize: 7.5,
      bold: true,
      color: m.highlight ? config.colors.goldLight : config.colors.azure,
      charSpacing: 1
    });

    // Label
    slide.addText(m.label, {
      x: sx + 0.15,
      y: statY + 1.04,
      w: statW - 0.3,
      h: 0.24,
      fontFace: config.fonts.body,
      fontSize: 9,
      bold: true,
      color: config.colors.white
    });

    // Desc
    slide.addText(m.desc, {
      x: sx + 0.15,
      y: statY + 1.28,
      w: statW - 0.3,
      h: 0.36,
      fontFace: config.fonts.body,
      fontSize: 8,
      color: config.colors.muted,
      lineSpacingMultiple: 1.1
    });
  });

  // ── Five Disease Family Breakdown Strip ──────────────────────────────────────
  const disY = 3.24;
  const disH = 1.48;
  const totalW = 8.4;
  const disW = 1.62;
  const disGap = (totalW - (5 * disW)) / 4;

  const diseaseItems = [
    { ...data.baseline.byDisease.dengue, color: config.colors.azure, peak: "Peak: Oct (Aug–Oct CR3 50.5%)" },
    { ...data.baseline.byDisease.add, color: config.colors.emerald, peak: "Peak: Jun–Aug (CR3 43.1%)" },
    { ...data.baseline.byDisease.malaria, color: config.colors.azure, peak: "Peak: May–Jul (CR3 51.4%)" },
    { ...data.baseline.byDisease.foodPoisoning, color: config.colors.gold, peak: "Bimodal: Jan–Feb & Apr–May" },
    { ...data.baseline.byDisease.chikungunya, color: config.colors.rubyLight, peak: "Dispersed: May, Jun, Sep" }
  ];

  diseaseItems.forEach((d, i) => {
    const dx = 0.8 + i * (disW + disGap);

    addCard(slide, {
      x: dx,
      y: disY,
      w: disW,
      h: disH,
      fill: config.colors.bgCard,
      border: config.colors.cardBorder,
      lineWeight: 0.75
    });

    // Top colored indicator line
    slide.addShape("line", {
      x: dx,
      y: disY,
      w: disW,
      h: 0,
      line: { color: d.color, width: 1.5 }
    });

    // Disease Name
    slide.addText(d.name.toUpperCase(), {
      x: dx + 0.08,
      y: disY + 0.1,
      w: disW - 0.16,
      h: 0.22,
      fontFace: config.fonts.mono,
      fontSize: 6.5,
      bold: true,
      color: d.color,
      charSpacing: 0.5
    });

    // Records
    slide.addText(`${d.records} records`, {
      x: dx + 0.08,
      y: disY + 0.32,
      w: disW - 0.16,
      h: 0.24,
      fontFace: config.fonts.display,
      fontSize: 12,
      bold: true,
      color: config.colors.white
    });

    // Cases & Deaths
    slide.addText(`${d.cases.toLocaleString()} cases  ·  ${d.deaths} deaths`, {
      x: dx + 0.08,
      y: disY + 0.58,
      w: disW - 0.16,
      h: 0.22,
      fontFace: config.fonts.mono,
      fontSize: 7,
      color: config.colors.platinum
    });

    // Divider
    slide.addShape("line", {
      x: dx + 0.08,
      y: disY + 0.84,
      w: disW - 0.16,
      h: 0,
      line: { color: config.colors.border, width: 0.5 }
    });

    // Peak Window
    slide.addText(d.peak, {
      x: dx + 0.08,
      y: disY + 0.9,
      w: disW - 0.16,
      h: 0.5,
      fontFace: config.fonts.body,
      fontSize: 7.5,
      color: config.colors.muted,
      lineSpacingMultiple: 1.15
    });
  });

  // ── Bottom Boundary Notice ──────────────────────────────────────────────────
  slide.addText(
    "NOTE: Reported cases represent patients in investigated outbreak clusters. These figures do not measure population disease incidence or community prevalence.",
    {
      x: 0.8,
      y: 4.88,
      w: 8.4,
      h: 0.24,
      fontFace: config.fonts.body,
      fontSize: 7.5,
      italic: true,
      color: config.colors.goldLight
    }
  );

  addFooter(slide, "SOURCE: NCDC / IDSP Weekly Outbreak Reports (2022–2025 Analytical Baseline)", 4, 10);

  slide.addNotes(
    "VIVA SCRIPT (35s):\n" +
    "Across the four completed calendar years 2022 to 2025, our primary analytical cohort comprises exactly 539 outbreak records, 21,955 reported cases, and 266 reported deaths.\n" +
    "A key observation is the divergence between event frequency and case enumeration:\n" +
    "- Dengue leads in event frequency with 204 records, but resulted in 3,144 cases.\n" +
    "- Acute Diarrheal Disease had 153 events but generated 9,050 cases.\n" +
    "- Food Poisoning caused 5,927 cases from just 69 events.\n\n" +
    "WHAT NOT TO OVERCLAIM: Do not refer to 21,955 as 'disease incidence'. These are patients enumerated within investigated outbreak clusters."
  );

  return slide;
};
