/**
 * SLIDE 06: COMPARATIVE PROFILES & STATISTICAL STABILITY — ROYAL SOVEREIGN
 * Five disease rows with Kendall's W Concordance & framed inter-annual heatmap exhibit.
 */

const path = require("path");
const config = require("../presentation.config");
const { addHeader, addFooter, addCard, addChartCard } = require("../components/base");

module.exports = function createSlide06(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: config.colors.bg };

  addHeader(
    slide,
    "COMPARATIVE PROFILES  //  INTER-ANNUAL CONCORDANCE",
    "Observed Calendar Concentration & Kendall’s W Stability",
    "Measuring four-year monthly ranking consistency across 2022–2025 (tested at α = 0.05)"
  );

  const cardY = 1.48;
  const cardH = 3.52;
  const leftX = 0.8;
  const leftW = 4.45;

  // ── Left Side: Structured Concordance Table ─────────────────────────────────
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

  slide.addText("KENDALL’S W CONCORDANCE ANALYSIS", {
    x: leftX + 0.15,
    y: cardY + 0.1,
    w: leftW - 0.3,
    h: 0.2,
    fontFace: config.fonts.mono,
    fontSize: 7,
    bold: true,
    color: config.colors.gold,
    charSpacing: 1
  });

  // Column headers
  const colX = [leftX + 0.15, leftX + 1.65, leftX + 2.7, leftX + 3.4];
  const headers = ["DISEASE FAMILY", "CR3 (TOP 3 MO)", "W-STAT", "p-VALUE"];
  headers.forEach((h, idx) => {
    slide.addText(h, {
      x: colX[idx],
      y: cardY + 0.32,
      w: idx === 0 ? 1.45 : (idx === 1 ? 1.0 : 0.65),
      h: 0.18,
      fontFace: config.fonts.mono,
      fontSize: 6.5,
      bold: true,
      color: config.colors.muted
    });
  });

  slide.addShape("line", {
    x: leftX + 0.15,
    y: cardY + 0.52,
    w: leftW - 0.3,
    h: 0,
    line: { color: config.colors.border, width: 0.5 }
  });

  const rows = [
    {
      name: "Acute Diarrheal Dis.",
      cr3: "43.1% (Jun–Aug)",
      w: "0.530",
      p: "0.016*",
      sig: true,
      note: "Statistically significant inter-annual concordance (p < 0.05)"
    },
    {
      name: "Dengue",
      cr3: "50.5% (Aug–Oct)",
      w: "0.405",
      p: "0.086",
      sig: false,
      note: "Non-significant (annual peak shifts between Sep and Oct)"
    },
    {
      name: "Malaria",
      cr3: "51.4% (May–Jul)",
      w: "0.319",
      p: "0.229",
      sig: false,
      note: "Non-significant (early-monsoon elevation with variable timing)"
    },
    {
      name: "Food Poisoning",
      cr3: "44.9% (Apr/May/Feb)",
      w: "0.260",
      p: "0.380",
      sig: false,
      note: "Non-significant (bimodal, sensitive to mass-case events)"
    },
    {
      name: "Chikungunya",
      cr3: "41.9% (May/Jun/Sep)",
      w: "0.221",
      p: "0.490",
      sig: false,
      note: "Non-significant (low baseline frequency across the year)"
    }
  ];

  let rY = cardY + 0.58;
  rows.forEach((r) => {
    // Row background highlight for ADD
    if (r.sig) {
      slide.addShape("rect", {
        x: leftX + 0.1,
        y: rY,
        w: leftW - 0.2,
        h: 0.48,
        fill: { color: "132845" },
        line: { color: config.colors.emerald, width: 0.75 }
      });
    }

    slide.addText(r.name, {
      x: colX[0],
      y: rY + 0.04,
      w: 1.45,
      h: 0.22,
      fontFace: config.fonts.body,
      fontSize: 8.5,
      bold: true,
      color: r.sig ? config.colors.emeraldLight : config.colors.white
    });

    slide.addText(r.cr3, {
      x: colX[1],
      y: rY + 0.04,
      w: 1.0,
      h: 0.22,
      fontFace: config.fonts.mono,
      fontSize: 7,
      color: config.colors.platinum
    });

    slide.addText(r.w, {
      x: colX[2],
      y: rY + 0.04,
      w: 0.65,
      h: 0.22,
      fontFace: config.fonts.mono,
      fontSize: 8,
      bold: r.sig,
      color: r.sig ? config.colors.emeraldLight : config.colors.goldLight
    });

    slide.addText(r.p, {
      x: colX[3],
      y: rY + 0.04,
      w: 0.65,
      h: 0.22,
      fontFace: config.fonts.mono,
      fontSize: 8,
      bold: r.sig,
      color: r.sig ? config.colors.emeraldLight : config.colors.muted
    });

    slide.addText(r.note, {
      x: colX[0],
      y: rY + 0.26,
      w: leftW - 0.4,
      h: 0.2,
      fontFace: config.fonts.body,
      fontSize: 7,
      italic: true,
      color: r.sig ? config.colors.goldLight : config.colors.muted
    });

    rY += 0.52;
  });

  // Table footnote
  slide.addText("* Kendall’s W measures rank concordance (0 = no agreement, 1 = complete concordance). Tested at α = 0.05 across 4 completed years.", {
    x: leftX + 0.15,
    y: cardY + cardH - 0.32,
    w: leftW - 0.3,
    h: 0.26,
    fontFace: config.fonts.body,
    fontSize: 6.5,
    italic: true,
    color: config.colors.muted
  });

  // ── Right Side: Framed Stability Heatmap Exhibit ────────────────────────────
  const heatmapPath = path.join(__dirname, "..", "..", "data_pipeline", "phase5C_advanced_analysis", "chart_seasonal_stability_heatmap.png");
  const rightX = 5.4;
  const rightW = 3.8;

  addChartCard(slide, {
    x: rightX,
    y: cardY,
    w: rightW,
    h: cardH,
    imagePath: heatmapPath,
    title: "EXHIBIT: INTER-ANNUAL STABILITY HEATMAP",
    caption: "Figure: Kendall's W Rank Concordance across 2022–2025 (Phase 5C Analysis)."
  });

  addFooter(slide, "SOURCE: Phase 5C Advanced Statistical Analysis | Kendall's W Testing", 6, 10);

  slide.addNotes(
    "VIVA SCRIPT (35s):\n" +
    "This slide presents the results of our non-parametric Kendall's W concordance test across the four baseline years.\n" +
    "The critical empirical finding:\n" +
    "Only Acute Diarrheal Disease demonstrates statistically significant inter-annual concordance (W = 0.530, p = 0.016). This means ADD's monthly ranking is the most reliably repeated year after year.\n" +
    "Dengue (W = 0.405, p = 0.086), Malaria (W = 0.319, p = 0.229), and Food Poisoning (W = 0.260, p = 0.380) did not meet the α = 0.05 significance threshold.\n\n" +
    "DEFENSE POINT: Why did Dengue not achieve statistical significance despite high seasonal concentration? Because its exact peak month oscillates between September and October in different years."
  );

  return slide;
};
