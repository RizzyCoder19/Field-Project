/**
 * SLIDE 08: 2026 OUT-OF-SAMPLE SURVEILLANCE COMPARISON — ROYAL SOVEREIGN
 * Partial-year comparison (Weeks 01–32) with framed comparison chart exhibit.
 */

const path = require("path");
const config = require("../presentation.config");
const { addHeader, addFooter, addCard, addChartCard } = require("../components/base");

module.exports = function createSlide08(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: config.colors.bg };

  addHeader(
    slide,
    "OUT-OF-SAMPLE COMPARISON  //  PARTIAL-YEAR SURVEILLANCE",
    "2026 Surveillance Check (Weeks 01–32)",
    "Evaluating out-of-sample data under explicit temporal truncation boundaries"
  );

  const cardY = 1.48;
  const cardH = 3.52;
  const leftX = 0.8;
  const leftW = 4.45;

  // ── Left Side: 2026 Metrics & Observation Panels ────────────────────────────
  addCard(slide, {
    x: leftX,
    y: cardY,
    w: leftW,
    h: cardH,
    fill: config.colors.bgCard,
    border: config.colors.cardBorder,
    lineWeight: 0.75
  });

  // Top gold hairline
  slide.addShape("line", {
    x: leftX,
    y: cardY,
    w: leftW,
    h: 0,
    line: { color: config.colors.gold, width: 1.5 }
  });

  // Boundary tag inside left card
  slide.addText("PARTIAL-YEAR WINDOW  //  WEEKS 01–32 ONLY", {
    x: leftX + 0.16,
    y: cardY + 0.1,
    w: leftW - 0.32,
    h: 0.2,
    fontFace: config.fonts.mono,
    fontSize: 7,
    bold: true,
    color: config.colors.gold,
    charSpacing: 1
  });

  // Three metrics
  const metrics2026 = [
    { num: "45", label: "RECORDS", desc: "W01–W32 primary cohort", color: config.colors.azure },
    { num: "1,118", label: "CASES", desc: "Enumerated in clusters", color: config.colors.gold },
    { num: "0", label: "DEATHS", desc: "Primary cohort to W32", color: config.colors.platinum }
  ];

  metrics2026.forEach((m, idx) => {
    const mx = leftX + 0.16 + idx * 1.38;
    slide.addText(m.num, {
      x: mx,
      y: cardY + 0.3,
      w: 1.3,
      h: 0.44,
      fontFace: config.fonts.display,
      fontSize: 24,
      bold: true,
      color: m.color
    });

    slide.addText(m.label, {
      x: mx,
      y: cardY + 0.74,
      w: 1.3,
      h: 0.18,
      fontFace: config.fonts.mono,
      fontSize: 7,
      bold: true,
      color: config.colors.white
    });

    slide.addText(m.desc, {
      x: mx,
      y: cardY + 0.92,
      w: 1.3,
      h: 0.18,
      fontFace: config.fonts.body,
      fontSize: 7,
      color: config.colors.muted
    });
  });

  slide.addShape("line", {
    x: leftX + 0.16,
    y: cardY + 1.18,
    w: leftW - 0.32,
    h: 0,
    line: { color: config.colors.border, width: 0.5 }
  });

  // Observation 1: Dengue Truncation
  slide.addText("1. DENGUE  //  TEMPORAL TRUNCATION BIAS", {
    x: leftX + 0.16,
    y: cardY + 1.28,
    w: leftW - 0.32,
    h: 0.18,
    fontFace: config.fonts.mono,
    fontSize: 7,
    bold: true,
    color: config.colors.azure
  });

  slide.addText(
    "Dengue recorded 6 events (36 cases) up to Week 32. However, four-year baseline data demonstrates that 55.4% of all Dengue outbreaks occur after Week 32 (Sep–Dec). " +
    "The 2026 observation window terminates before the historical surge window opens; week-32 totals are thus inherently incomplete.",
    {
      x: leftX + 0.16,
      y: cardY + 1.48,
      w: leftW - 0.32,
      h: 0.6,
      fontFace: config.fonts.body,
      fontSize: 7.5,
      color: config.colors.platinum,
      lineSpacingMultiple: 1.15
    }
  );

  slide.addShape("line", {
    x: leftX + 0.16,
    y: cardY + 2.16,
    w: leftW - 0.32,
    h: 0,
    line: { color: config.colors.border, width: 0.5 }
  });

  // Observation 2: Food Poisoning Classification
  slide.addText("2. FOOD POISONING  //  DIAGNOSTIC CLASSIFICATION EFFECT", {
    x: leftX + 0.16,
    y: cardY + 2.26,
    w: leftW - 0.32,
    h: 0.18,
    fontFace: config.fonts.mono,
    fontSize: 7,
    bold: true,
    color: config.colors.goldLight
  });

  slide.addText(
    "Food Poisoning recorded 19 events (375 cases) in W01–W32, exceeding the historical early-year mean of 12.8 events (+49.0%). " +
    "Notably, 100% of these 19 records were labeled 'Suspected' in source PDFs, indicating how syndromic reporting thresholds impact surveillance counts.",
    {
      x: leftX + 0.16,
      y: cardY + 2.46,
      w: leftW - 0.32,
      h: 0.54,
      fontFace: config.fonts.body,
      fontSize: 7.5,
      color: config.colors.platinum,
      lineSpacingMultiple: 1.15
    }
  );

  // Bottom boundary note
  slide.addShape("line", {
    x: leftX + 0.16,
    y: cardY + 3.08,
    w: leftW - 0.32,
    h: 0,
    line: { color: config.colors.border, width: 0.5 }
  });

  slide.addText("BOUNDARY: 2026 data is an out-of-sample check, not a validation or forecast.", {
    x: leftX + 0.16,
    y: cardY + 3.16,
    w: leftW - 0.32,
    h: 0.24,
    fontFace: config.fonts.body,
    fontSize: 7,
    italic: true,
    color: config.colors.rubyLight
  });

  // ── Right Side: Framed 2026 Comparison Chart Exhibit ────────────────────────
  const chartPath = path.join(__dirname, "..", "..", "data_pipeline", "phase5C_advanced_analysis", "chart_2026_comparison.png");
  const rightX = 5.4;
  const rightW = 3.8;

  addChartCard(slide, {
    x: rightX,
    y: cardY,
    w: rightW,
    h: cardH,
    imagePath: chartPath,
    title: "EXHIBIT: 2026 SURVEILLANCE COMPARISON",
    caption: "Figure: 2026 W01–W32 event counts compared to historical 2022–2025 baseline (Phase 5C Analysis)."
  });

  addFooter(slide, "SOURCE: Phase 5C Out-of-Sample Surveillance Comparison | 2026 W01–W32", 8, 10);

  slide.addNotes(
    "VIVA SCRIPT (35s):\n" +
    "We evaluate 2026 strictly as an out-of-sample surveillance comparison covering Weeks 01 to 32. It cannot be directly compared to full calendar years.\n" +
    "Two critical observations emerge:\n" +
    "First, Dengue recorded only 6 events. This does not indicate a true disease decline — historical baseline analysis shows 55.4% of Dengue outbreaks occur after Week 32.\n" +
    "Second, Food Poisoning recorded 19 events, higher than the historical early-year mean. Crucially, 100% of these records were classified as 'Suspected' in source bulletins.\n\n" +
    "WHAT NOT TO SAY: Do not say '2026 confirms our model' or 'This proves disease decline.' It is a partial-year observation demonstrating surveillance dynamics."
  );

  return slide;
};
