/**
 * SLIDE 03: DATA ENGINEERING PIPELINE — ROYAL SOVEREIGN
 * 6-stage transformation cascade from government PDFs to structured tabular data.
 */

const config = require("../presentation.config");
const { addHeader, addFooter, addCard } = require("../components/base");

module.exports = function createSlide03(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: config.colors.bg };

  addHeader(slide, "DATA ENGINEERING PIPELINE  //  PROVENANCE & HARMONIZATION", "From Weekly Government Reports to Structured Data");

  // ── 6-Stage Transformation Cascade ──────────────────────────────────────────
  const stages = [
    { num: "237", unit: "PDF BULLETINS", note: "NCDC weekly surveillance archives" },
    { num: "809", unit: "RAW RECORDS", note: "Maharashtra outbreak rows extracted" },
    { num: "116", unit: "DISEASE STRINGS", note: "Spelling & formatting variants" },
    { num: "56",  unit: "CLEAN LABELS", note: "Normalized nomenclature" },
    { num: "30",  unit: "SYNDROMIC FAMILIES", note: "Consolidated disease groups" },
    { num: "5",   unit: "PRIMARY COHORT", note: "93.9% of all baseline records", highlight: true }
  ];

  const cascadeY = 1.32;
  const stageH = 1.82;
  const totalW = 8.4;
  const stageW = 1.28;
  const gap = (totalW - (stages.length * stageW)) / (stages.length - 1); // spacing between cards

  stages.forEach((st, i) => {
    const sx = 0.8 + i * (stageW + gap);
    const isHighlight = st.highlight;

    addCard(slide, {
      x: sx,
      y: cascadeY,
      w: stageW,
      h: stageH,
      fill: isHighlight ? config.colors.bgCardLight : config.colors.bgCard,
      border: isHighlight ? config.colors.gold : config.colors.cardBorder,
      lineWeight: isHighlight ? 1.25 : 0.75
    });

    // Top indicator line
    slide.addShape("line", {
      x: sx,
      y: cascadeY,
      w: stageW,
      h: 0,
      line: { color: isHighlight ? config.colors.gold : config.colors.azure, width: isHighlight ? 2 : 1 }
    });

    // Big number
    slide.addText(st.num, {
      x: sx + 0.05,
      y: cascadeY + 0.12,
      w: stageW - 0.1,
      h: 0.62,
      align: "center",
      fontFace: config.fonts.display,
      fontSize: 28,
      bold: true,
      color: isHighlight ? config.colors.gold : config.colors.white
    });

    // Unit
    slide.addText(st.unit, {
      x: sx + 0.05,
      y: cascadeY + 0.74,
      w: stageW - 0.1,
      h: 0.28,
      align: "center",
      fontFace: config.fonts.mono,
      fontSize: 6.5,
      bold: true,
      color: isHighlight ? config.colors.goldLight : config.colors.azure,
      charSpacing: 0.5
    });

    // Divider
    slide.addShape("line", {
      x: sx + 0.12,
      y: cascadeY + 1.04,
      w: stageW - 0.24,
      h: 0,
      line: { color: config.colors.border, width: 0.5 }
    });

    // Note
    slide.addText(st.note, {
      x: sx + 0.06,
      y: cascadeY + 1.1,
      w: stageW - 0.12,
      h: 0.65,
      align: "center",
      fontFace: config.fonts.body,
      fontSize: 7.5,
      color: config.colors.muted,
      lineSpacingMultiple: 1.15
    });

    // Connector arrow to next stage
    if (i < stages.length - 1) {
      slide.addText("→", {
        x: sx + stageW,
        y: cascadeY + 0.7,
        w: gap,
        h: 0.35,
        align: "center",
        valign: "middle",
        fontFace: config.fonts.body,
        fontSize: 12,
        bold: true,
        color: config.colors.gold
      });
    }
  });

  // ── Two Methodological Safeguard Panels ──────────────────────────────────────
  const guardY = 3.38;
  const guardH = 1.62;
  const guardW = 4.08;
  const guardGap = 0.24;

  const safeguards = [
    {
      title: "ADDITIVE NORMALIZATION // RAW STRINGS PRESERVED",
      subtitle: "Source Disease Nomenclature Never Overwritten",
      points: [
        "116 unique raw strings (e.g. 'Dengue?', 'Dengue fever', 'Dengue Shock') mapped to canonical labels.",
        "Original source string preserved in every record under 'disease_raw' for total reproducibility.",
        "Zero arbitrary alterations: ambiguous labels retained with full transformation audit rules."
      ]
    },
    {
      title: "FORENSIC AUDITABILITY // PDF PROVENANCE RETAINED",
      subtitle: "Every Tabular Record Linked to Source Bulletin",
      points: [
        "Direct hyperlinkage to specific NCDC PDF filename and publication week number.",
        "Table page number and reporting district cross-verified against official archives.",
        "Automated integrity checks flag missing weeks, non-standard tables, and reporting anomalies."
      ]
    }
  ];

  safeguards.forEach((sg, i) => {
    const gx = 0.8 + i * (guardW + guardGap);

    addCard(slide, {
      x: gx,
      y: guardY,
      w: guardW,
      h: guardH,
      fill: config.colors.bgCard,
      border: config.colors.cardBorder,
      lineWeight: 0.75
    });

    // Top gold hairline
    slide.addShape("line", {
      x: gx,
      y: guardY,
      w: guardW,
      h: 0,
      line: { color: config.colors.gold, width: 1.5 }
    });

    // Title
    slide.addText(sg.title, {
      x: gx + 0.18,
      y: guardY + 0.12,
      w: guardW - 0.36,
      h: 0.2,
      fontFace: config.fonts.mono,
      fontSize: 7,
      bold: true,
      color: config.colors.gold,
      charSpacing: 0.8
    });

    // Subtitle
    slide.addText(sg.subtitle, {
      x: gx + 0.18,
      y: guardY + 0.32,
      w: guardW - 0.36,
      h: 0.22,
      fontFace: config.fonts.body,
      fontSize: 8.5,
      italic: true,
      color: config.colors.platinum
    });

    // Divider
    slide.addShape("line", {
      x: gx + 0.18,
      y: guardY + 0.56,
      w: guardW - 0.36,
      h: 0,
      line: { color: config.colors.border, width: 0.5 }
    });

    // Bullet points
    let ptY = guardY + 0.62;
    sg.points.forEach((pt) => {
      slide.addText(`•  ${pt}`, {
        x: gx + 0.18,
        y: ptY,
        w: guardW - 0.36,
        h: 0.28,
        fontFace: config.fonts.body,
        fontSize: 8,
        color: config.colors.muted,
        lineSpacingMultiple: 1.12
      });
      ptY += 0.3;
    });
  });

  addFooter(slide, "DATA PIPELINE PROVENANCE // PHASE 5A DISEASE AUDIT & HARMONIZATION", 3, 10);

  slide.addNotes(
    "VIVA SCRIPT (35s):\n" +
    "A foundational contribution of this project is our reproducible data harmonization pipeline.\n" +
    "We processed 237 weekly government PDF bulletins from the NCDC, extracting 809 raw outbreak rows for Maharashtra.\n" +
    "Because official reports lack standardized spelling, we encountered 116 unique disease strings. We harmonized these into 56 clean labels and 30 syndromic families, selecting five primary families that account for 93.9% of all baseline outbreak records.\n\n" +
    "CRITICAL VIVA POINT: Every transformation is additive. The original disease_raw string was never overwritten, and each record maintains forensic provenance back to its specific source PDF and page number."
  );

  return slide;
};
