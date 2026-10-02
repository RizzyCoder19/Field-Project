/**
 * SLIDE 07: OUTLIER SENSITIVITY — ROYAL SOVEREIGN
 * Event frequency vs case volume divergence with framed sensitivity chart exhibit.
 */

const path = require("path");
const config = require("../presentation.config");
const { addHeader, addFooter, addCard, addChartCard } = require("../components/base");

module.exports = function createSlide07(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: config.colors.bg };

  addHeader(
    slide,
    "SENSITIVITY ANALYSIS  //  EVENT VS. CASE-VOLUME DIVERGENCE",
    "How Three Records Shape Four-Year Case Totals",
    "Demonstrating the critical separation between outbreak frequency and patient enumeration"
  );

  const cardY = 1.48;
  const cardH = 3.52;
  const leftX = 0.8;
  const leftW = 4.45;

  // ── Left Side: Outlier Numbers & Divergence Decomposition ──────────────────
  addCard(slide, {
    x: leftX,
    y: cardY,
    w: leftW,
    h: cardH,
    fill: config.colors.bgCard,
    border: config.colors.cardBorder,
    lineWeight: 0.75
  });

  // Top ruby hairline
  slide.addShape("line", {
    x: leftX,
    y: cardY,
    w: leftW,
    h: 0,
    line: { color: config.colors.ruby, width: 1.5 }
  });

  slide.addText("THREE MASS-EXPOSURE OUTBREAK RECORDS", {
    x: leftX + 0.16,
    y: cardY + 0.1,
    w: leftW - 0.32,
    h: 0.2,
    fontFace: config.fonts.mono,
    fontSize: 7,
    bold: true,
    color: config.colors.rubyLight,
    charSpacing: 1
  });

  // Three Records
  const records = [
    { cases: "651", loc: "KOLHAPUR DISTRICT", week: "2024 Week 07" },
    { cases: "629", loc: "PARBHANI DISTRICT", week: "2025 Week 06" },
    { cases: "335", loc: "SOLAPUR DISTRICT", week: "2023 Week 06" }
  ];

  records.forEach((rec, idx) => {
    const rx = leftX + 0.16 + idx * 1.38;
    slide.addText(rec.cases, {
      x: rx,
      y: cardY + 0.32,
      w: 1.3,
      h: 0.44,
      fontFace: config.fonts.display,
      fontSize: 24,
      bold: true,
      color: config.colors.rubyLight
    });

    slide.addText(rec.loc, {
      x: rx,
      y: cardY + 0.76,
      w: 1.3,
      h: 0.18,
      fontFace: config.fonts.mono,
      fontSize: 6.5,
      bold: true,
      color: config.colors.white
    });

    slide.addText(rec.week, {
      x: rx,
      y: cardY + 0.94,
      w: 1.3,
      h: 0.18,
      fontFace: config.fonts.body,
      fontSize: 7.5,
      color: config.colors.muted
    });
  });

  slide.addShape("line", {
    x: leftX + 0.16,
    y: cardY + 1.2,
    w: leftW - 0.32,
    h: 0,
    line: { color: config.colors.border, width: 0.5 }
  });

  // Aggregate Impact Callout
  slide.addText("COMBINED IMPACT: 1,615 CASES FROM 3 OUTBREAKS", {
    x: leftX + 0.16,
    y: cardY + 1.28,
    w: leftW - 0.32,
    h: 0.2,
    fontFace: config.fonts.mono,
    fontSize: 7.5,
    bold: true,
    color: config.colors.gold,
    charSpacing: 0.5
  });

  const impactStats = [
    { label: "SHARE OF FEBRUARY CASES", val: "74.7%", desc: "1,615 of 2,162 Feb cases" },
    { label: "SHARE OF 4-YEAR TOTAL", val: "27.3%", desc: "1,615 of 5,927 total cases" },
    { label: "FEBRUARY EVENT RATIO", val: "15.9%", desc: "Only 11 of 69 events" }
  ];

  impactStats.forEach((st, i) => {
    const sx = leftX + 0.16 + i * 1.38;
    slide.addText(st.val, {
      x: sx,
      y: cardY + 1.5,
      w: 1.3,
      h: 0.44,
      fontFace: config.fonts.display,
      fontSize: 22,
      bold: true,
      color: i === 2 ? config.colors.azure : config.colors.goldLight
    });

    slide.addText(st.label, {
      x: sx,
      y: cardY + 1.94,
      w: 1.3,
      h: 0.28,
      fontFace: config.fonts.mono,
      fontSize: 6.5,
      bold: true,
      color: config.colors.white
    });

    slide.addText(st.desc, {
      x: sx,
      y: cardY + 2.22,
      w: 1.3,
      h: 0.2,
      fontFace: config.fonts.body,
      fontSize: 7,
      color: config.colors.muted
    });
  });

  // Bottom analytical takeaway
  slide.addShape("line", {
    x: leftX + 0.16,
    y: cardY + 2.52,
    w: leftW - 0.32,
    h: 0,
    line: { color: config.colors.border, width: 0.5 }
  });

  slide.addText("CRITICAL METHODOLOGICAL TAKEAWAY:", {
    x: leftX + 0.16,
    y: cardY + 2.6,
    w: leftW - 0.32,
    h: 0.18,
    fontFace: config.fonts.mono,
    fontSize: 7,
    bold: true,
    color: config.colors.goldLight
  });

  slide.addText(
    "Event frequency and patient case volumes measure fundamentally distinct phenomena. " +
    "Without sensitivity testing, February would appear to be a massive seasonal transmission peak, " +
    "when it is actually driven by 3 localized high-volume cluster reports. No causal assumptions (e.g. catering) are made.",
    {
      x: leftX + 0.16,
      y: cardY + 2.8,
      w: leftW - 0.32,
      h: 0.62,
      fontFace: config.fonts.body,
      fontSize: 7.5,
      color: config.colors.platinum,
      lineSpacingMultiple: 1.15
    }
  );

  // ── Right Side: Framed Outlier Chart Exhibit ────────────────────────────────
  const chartPath = path.join(__dirname, "..", "..", "data_pipeline", "phase5C_advanced_analysis", "chart_outlier_sensitivity.png");
  const rightX = 5.4;
  const rightW = 3.8;

  addChartCard(slide, {
    x: rightX,
    y: cardY,
    w: rightW,
    h: cardH,
    imagePath: chartPath,
    title: "EXHIBIT: SENSITIVITY DECOMPOSITION",
    caption: "Figure: Monthly Food Poisoning cases with vs. without 3 outlier events (Phase 5C Analysis)."
  });

  addFooter(slide, "SOURCE: Phase 5C Outlier Sensitivity Analysis | NCDC IDSP Surveillance Records", 7, 10);

  slide.addNotes(
    "VIVA SCRIPT (35s):\n" +
    "This slide demonstrates a core data science lesson: event frequency and case volume must never be conflated.\n" +
    "In Food Poisoning, February appears to have a huge spike in case volume. However, sensitivity analysis reveals that 1,615 of the 2,162 February cases came from just three records: Kolhapur (651), Parbhani (629), and Solapur (335).\n" +
    "These three records account for 74.7% of all February cases, and 27.3% of the four-year total across Maharashtra.\n" +
    "As shown in the exhibit on the right, removing these three events flattens the February peak completely.\n\n" +
    "ONE SENTENCE YOU MUST NOT SAY: Do not speculate about causes (weddings, hostels, street food). We have no source data for food types or gathering types."
  );

  return slide;
};
