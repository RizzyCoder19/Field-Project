/**
 * SLIDE 01: TITLE & ACADEMIC IDENTITY — ROYAL SOVEREIGN
 * Royal composition: Midnight Navy canvas, Imperial Gold accents, Diamond White headline.
 */

const config = require("../presentation.config");
const { addCard } = require("../components/base");

module.exports = function createSlide01(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: config.colors.bg };

  // ── Regal Data Motif: 12-Month Calendar Surveillance Axis ───────────────────
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const gridStartX = 0.8;
  const gridW = 8.4;
  const tickW = gridW / 12;
  const gridY = 0.28;

  // Thin gold horizontal axis line
  slide.addShape("line", {
    x: gridStartX,
    y: gridY + 0.18,
    w: gridW,
    h: 0,
    line: { color: config.colors.goldMuted, width: 0.5 }
  });

  // 12 tick marks representing the seasonal surveillance continuum
  const tickHeights = [0.06, 0.10, 0.07, 0.08, 0.11, 0.16, 0.15, 0.13, 0.18, 0.19, 0.10, 0.05];
  for (let m = 0; m < 12; m++) {
    const tx = gridStartX + (m * tickW) + tickW / 2 - 0.02;
    const th = tickHeights[m];
    const isPeakWindow = m >= 5 && m <= 9; // Jun-Oct surveillance concentration
    slide.addShape("rect", {
      x: tx,
      y: gridY + 0.18 - th,
      w: 0.04,
      h: th,
      fill: { color: isPeakWindow ? config.colors.gold : config.colors.subtle }
    });
    // Month initial label
    slide.addText(months[m], {
      x: gridStartX + (m * tickW),
      y: gridY,
      w: tickW,
      h: 0.16,
      align: "center",
      fontFace: config.fonts.mono,
      fontSize: 6.5,
      bold: isPeakWindow,
      color: isPeakWindow ? config.colors.goldLight : config.colors.muted
    });
  }

  // ── Institution & Programme Tag ─────────────────────────────────────────────
  slide.addText("RP INSTITUTE  ·  UNIVERSITY OF MUMBAI  ·  B.SC. DATA SCIENCE — SEMESTER III", {
    x: 0.8,
    y: 0.62,
    w: 8.4,
    h: 0.22,
    fontFace: config.fonts.mono,
    fontSize: 7.5,
    bold: true,
    color: config.colors.gold,
    charSpacing: 2
  });

  // ── Main Regal Headline ─────────────────────────────────────────────────────
  slide.addText("Analysis of Seasonal\nDisease Patterns", {
    x: 0.8,
    y: 0.92,
    w: 8.4,
    h: 1.85,
    fontFace: config.fonts.display,
    fontSize: 44,
    bold: true,
    color: config.colors.white,
    lineSpacingMultiple: 1.05
  });

  // ── Secondary line in Champagne Gold italic ─────────────────────────────────
  slide.addText("Using Government Health Data: An Epidemiological Surveillance Study in Maharashtra", {
    x: 0.8,
    y: 2.82,
    w: 8.4,
    h: 0.45,
    fontFace: config.fonts.display,
    fontSize: 18,
    italic: true,
    color: config.colors.goldLight,
    lineSpacingMultiple: 1.1
  });

  // ── Imperial Gold Rule Line ─────────────────────────────────────────────────
  slide.addShape("line", {
    x: 0.8,
    y: 3.42,
    w: 8.4,
    h: 0,
    line: { color: config.colors.gold, width: 0.75 }
  });

  // ── Three Royal Metadata Cards ──────────────────────────────────────────────
  const metaY = 3.62;
  const metaCards = [
    { label: "CANDIDATE & PROGRAMME", val1: "Khan Umar", val2: "B.Sc. Data Science · Sem III" },
    { label: "PRIMARY SURVEILLANCE SOURCE", val1: "NCDC / IDSP Weekly Outbreak Bulletins", val2: "Government of India Health Portals" },
    { label: "EMPIRICAL SURVEILLANCE SCOPE", val1: "Maharashtra (36 Districts)", val2: "2022–2025 Baseline + 2026 W01–W32" }
  ];

  metaCards.forEach((c, i) => {
    const mx = 0.8 + i * 2.88;
    const mw = 2.64;

    addCard(slide, {
      x: mx,
      y: metaY,
      w: mw,
      h: 1.35,
      fill: config.colors.bgCard,
      border: config.colors.cardBorder,
      lineWeight: 0.75
    });

    // Top gold hairline
    slide.addShape("line", {
      x: mx,
      y: metaY,
      w: mw,
      h: 0,
      line: { color: config.colors.gold, width: 1.5 }
    });

    slide.addText(c.label, {
      x: mx + 0.15,
      y: metaY + 0.12,
      w: mw - 0.3,
      h: 0.2,
      fontFace: config.fonts.mono,
      fontSize: 6.5,
      bold: true,
      color: config.colors.gold,
      charSpacing: 1
    });

    slide.addText(c.val1, {
      x: mx + 0.15,
      y: metaY + 0.36,
      w: mw - 0.3,
      h: 0.45,
      fontFace: config.fonts.body,
      fontSize: 11,
      bold: true,
      color: config.colors.white
    });

    slide.addText(c.val2, {
      x: mx + 0.15,
      y: metaY + 0.82,
      w: mw - 0.3,
      h: 0.35,
      fontFace: config.fonts.body,
      fontSize: 8.5,
      color: config.colors.muted
    });
  });

  // ── Slide Number ────────────────────────────────────────────────────────────
  slide.addText("01 / 10", {
    x: 8.5,
    y: 5.22,
    w: 0.8,
    h: 0.22,
    align: "right",
    fontFace: config.fonts.mono,
    fontSize: 7.5,
    bold: true,
    color: config.colors.gold
  });

  slide.addNotes(
    "VIVA SCRIPT (30s):\n" +
    "Respected examiners, good morning. I am Khan Umar, presenting my B.Sc. Data Science Semester III Field Project at RP Institute, affiliated to the University of Mumbai.\n" +
    "Our research title is 'Analysis of Seasonal Disease Patterns Using Government Health Data'.\n" +
    "We analyze official weekly outbreak surveillance reports published by the National Centre for Disease Control (NCDC / IDSP) across Maharashtra, establishing a rigorous 4-year empirical baseline (2022–2025) and evaluating a partial-year comparison for 2026.\n\n" +
    "WHAT NOT TO OVERCLAIM: This is secondary analysis of official government outbreak bulletins — not clinical laboratory fieldwork or population incidence estimation."
  );

  return slide;
};
