/**
 * SLIDE 02: THE RESEARCH QUESTION & ANALYTICAL FRAMEWORK — ROYAL SOVEREIGN
 * Central research inquiry framed in royal sapphire & imperial gold, with three analytical lenses.
 */

const config = require("../presentation.config");
const { addHeader, addFooter, addCard } = require("../components/base");

module.exports = function createSlide02(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: config.colors.bg };

  addHeader(slide, "CENTRAL RESEARCH QUESTION  //  ANALYTICAL FRAMEWORK", "Investigating Outbreak Seasonality in Maharashtra");

  // ── Central Hero Card: Grand Research Question ──────────────────────────────
  const heroY = 1.25;
  const heroH = 1.95;
  addCard(slide, {
    x: 0.8,
    y: heroY,
    w: 8.4,
    h: heroH,
    fill: config.colors.bgCardLight,
    border: config.colors.gold,
    lineWeight: 1.0
  });

  // Top decorative tag on card
  slide.addText("PRIMARY RESEARCH INQUIRY", {
    x: 1.1,
    y: heroY + 0.16,
    w: 7.8,
    h: 0.22,
    fontFace: config.fonts.mono,
    fontSize: 7.5,
    bold: true,
    color: config.colors.gold,
    charSpacing: 1.5
  });

  // Giant Quote Question
  slide.addText(
    "\u201CWhat seasonal patterns are evident in selected disease outbreak reports in Maharashtra, and how do these patterns vary across diseases and seasons?\u201D",
    {
      x: 1.1,
      y: heroY + 0.42,
      w: 7.8,
      h: 1.35,
      fontFace: config.fonts.display,
      fontSize: 22,
      italic: true,
      color: config.colors.white,
      lineSpacingMultiple: 1.25
    }
  );

  // ── Three Royal Analytical Lenses ───────────────────────────────────────────
  const lensY = 3.38;
  const lensH = 1.62;
  const lensW = 2.68;
  const lensGap = 0.18;

  const lenses = [
    {
      num: "01",
      title: "TEMPORAL CONCENTRATION",
      subtitle: "3-Month Concentration Ratio (CR3)",
      body: "Determines whether outbreak events cluster within specific calendar months or disperse uniformly across the surveillance year."
    },
    {
      num: "02",
      title: "INTER-ANNUAL STABILITY",
      subtitle: "Kendall\u2019s W Coefficient of Concordance",
      body: "Tests whether monthly disease ranking repeats reliably across four completed years (2022–2025) or exhibits volatile, random shifts."
    },
    {
      num: "03",
      title: "EVENT / VOLUME DIVERGENCE",
      subtitle: "Sensitivity & Outlier Decomposition",
      body: "Evaluates how isolated mass-exposure outbreaks distort aggregate case volumes without altering underlying event frequency distributions."
    }
  ];

  lenses.forEach((lens, i) => {
    const lx = 0.8 + i * (lensW + lensGap);

    addCard(slide, {
      x: lx,
      y: lensY,
      w: lensW,
      h: lensH,
      fill: config.colors.bgCard,
      border: config.colors.cardBorder,
      lineWeight: 0.75
    });

    // Top gold hairline
    slide.addShape("line", {
      x: lx,
      y: lensY,
      w: lensW,
      h: 0,
      line: { color: config.colors.gold, width: 1.5 }
    });

    // Big numeral
    slide.addText(lens.num, {
      x: lx + 0.15,
      y: lensY + 0.12,
      w: 0.55,
      h: 0.42,
      fontFace: config.fonts.display,
      fontSize: 24,
      bold: true,
      color: config.colors.gold
    });

    // Title
    slide.addText(lens.title, {
      x: lx + 0.75,
      y: lensY + 0.14,
      w: lensW - 0.9,
      h: 0.22,
      fontFace: config.fonts.mono,
      fontSize: 7.5,
      bold: true,
      color: config.colors.white,
      charSpacing: 0.5
    });

    // Subtitle
    slide.addText(lens.subtitle, {
      x: lx + 0.75,
      y: lensY + 0.36,
      w: lensW - 0.9,
      h: 0.2,
      fontFace: config.fonts.body,
      fontSize: 7.5,
      italic: true,
      color: config.colors.goldLight
    });

    // Divider
    slide.addShape("line", {
      x: lx + 0.15,
      y: lensY + 0.62,
      w: lensW - 0.3,
      h: 0,
      line: { color: config.colors.border, width: 0.5 }
    });

    // Body
    slide.addText(lens.body, {
      x: lx + 0.15,
      y: lensY + 0.7,
      w: lensW - 0.3,
      h: 0.82,
      fontFace: config.fonts.body,
      fontSize: 8.5,
      color: config.colors.platinum,
      lineSpacingMultiple: 1.15
    });
  });

  addFooter(slide, "RESEARCH METHODOLOGY // RP INSTITUTE // B.SC. DATA SCIENCE VIVA DEFENSE", 2, 10);

  slide.addNotes(
    "VIVA SCRIPT (35s):\n" +
    "Our research addresses one precise scientific inquiry: What seasonal patterns are evident in selected disease outbreak reports in Maharashtra?\n" +
    "To answer this with data-scientific rigor, we evaluate three analytical lenses:\n" +
    "1. Temporal concentration — calculating exact calendar-month clustering via 3-month concentration ratios (CR3).\n" +
    "2. Inter-annual stability — determining whether seasonal profiles repeat across years using Kendall's W concordance.\n" +
    "3. Event frequency versus case volume divergence — isolating how single mass-case events can distort monthly totals.\n\n" +
    "DEFENSE NOTE: This is framed as an administrative surveillance study. We do not hypothesize or claim biological causality."
  );

  return slide;
};
