/**
 * SLIDE 05: HERO SEASONAL VISUALIZATION — ROYAL SOVEREIGN
 * Five distinct temporal signatures with framed scientific chart exhibit.
 */

const path = require("path");
const config = require("../presentation.config");
const { addHeader, addFooter, addCard, addChartCard } = require("../components/base");

module.exports = function createSlide05(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: config.colors.bg };

  addHeader(
    slide,
    "SEASONAL PATTERN ANALYSIS  //  EMPIRICAL BASELINE 2022–2025",
    "Five Diseases.  Five Distinct Temporal Signatures.",
    "Calendar-month concentration curves derived from 539 investigated outbreak events"
  );

  // ── Left Column: Analytical Breakdown of the 5 Signatures ──────────────────
  const leftX = 0.8;
  const leftW = 3.7;
  const cardY = 1.48;
  const cardH = 3.52;

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

  slide.addText("OBSERVED TEMPORAL CONCENTRATIONS", {
    x: leftX + 0.16,
    y: cardY + 0.12,
    w: leftW - 0.32,
    h: 0.2,
    fontFace: config.fonts.mono,
    fontSize: 7,
    bold: true,
    color: config.colors.gold,
    charSpacing: 1
  });

  const signatures = [
    {
      name: "1. DENGUE",
      sub: "Late-Monsoon / Post-Monsoon Peak",
      desc: "October peak (40 events). 82.8% of all events occur Jun–Oct. Aug–Oct CR3 = 50.5%.",
      color: config.colors.azure
    },
    {
      name: "2. ACUTE DIARRHEAL DISEASE",
      sub: "Early Monsoon Plateau + Oct Rise",
      desc: "Sustained elevation Jun–Aug (18-20 events/mo) with secondary Oct rise. CR3 = 43.1%.",
      color: config.colors.emerald
    },
    {
      name: "3. MALARIA",
      sub: "Pre-Monsoon & Early Monsoon",
      desc: "Concentrates earlier in May–July (12–14 events/mo). May–Jul CR3 = 51.4%.",
      color: config.colors.azure
    },
    {
      name: "4. FOOD POISONING",
      sub: "Bimodal Non-Monsoon Windows",
      desc: "Two distinct peaks: Jan–Feb and Apr–May. Demonstrates no monsoon concentration.",
      color: config.colors.gold
    },
    {
      name: "5. CHIKUNGUNYA",
      sub: "Low-Count Dispersed Distribution",
      desc: "Low baseline frequency without a single dominant month (CR3 = 41.9%).",
      color: config.colors.rubyLight
    }
  ];

  let sigY = cardY + 0.34;
  signatures.forEach((sig) => {
    slide.addText(sig.name, {
      x: leftX + 0.16,
      y: sigY,
      w: 1.5,
      h: 0.18,
      fontFace: config.fonts.mono,
      fontSize: 7.5,
      bold: true,
      color: sig.color
    });

    slide.addText(sig.sub, {
      x: leftX + 1.55,
      y: sigY,
      w: leftW - 1.71,
      h: 0.18,
      align: "right",
      fontFace: config.fonts.body,
      fontSize: 7,
      italic: true,
      color: config.colors.goldLight
    });

    slide.addText(sig.desc, {
      x: leftX + 0.16,
      y: sigY + 0.18,
      w: leftW - 0.32,
      h: 0.34,
      fontFace: config.fonts.body,
      fontSize: 7.5,
      color: config.colors.platinum,
      lineSpacingMultiple: 1.1
    });

    sigY += 0.54;
  });

  // Boundary note inside left card
  slide.addShape("line", {
    x: leftX + 0.16,
    y: cardY + cardH - 0.52,
    w: leftW - 0.32,
    h: 0,
    line: { color: config.colors.border, width: 0.5 }
  });

  slide.addText("BOUNDARY: Calendar concentrations reflect surveillance reporting; no climate/rainfall causality is inferred.", {
    x: leftX + 0.16,
    y: cardY + cardH - 0.46,
    w: leftW - 0.32,
    h: 0.4,
    fontFace: config.fonts.body,
    fontSize: 7,
    italic: true,
    color: config.colors.muted,
    lineSpacingMultiple: 1.1
  });

  // ── Right Column: Scientific Chart Exhibit ──────────────────────────────────
  const chartPath = path.join(__dirname, "..", "..", "data_pipeline", "phase5B_seasonal_analysis", "chart_monthly_outbreak_events.png");
  const rightX = 4.65;
  const rightW = 4.55;

  addChartCard(slide, {
    x: rightX,
    y: cardY,
    w: rightW,
    h: cardH,
    imagePath: chartPath,
    title: "EXHIBIT: 4-YEAR MONTHLY EVENT DISTRIBUTIONS",
    caption: "Figure: Monthly outbreak event counts aggregated across 2022–2025 (Phase 5B Analysis)."
  });

  addFooter(slide, "SOURCE: Phase 5B Monthly Aggregation Matrix | NCDC Outbreak Records", 5, 10);

  slide.addNotes(
    "VIVA SCRIPT (40s):\n" +
    "This is our core empirical visualization: five disease families exhibit five fundamentally distinct temporal signatures across Maharashtra.\n" +
    "As shown in the official analytical chart on the right:\n" +
    "1. Dengue concentrates heavily in late monsoon and post-monsoon (August to October), peaking in October with 40 recorded events. 82.8% of all Dengue events fall between June and October.\n" +
    "2. Acute Diarrheal Disease maintains sustained elevation across June to August (18–20 events monthly) with an October secondary peak.\n" +
    "3. Malaria concentrates earlier, in May to July.\n" +
    "4. Food Poisoning exhibits a bimodal profile in non-monsoon months (Jan–Feb and Apr–May).\n" +
    "5. Chikungunya is dispersed at low event counts throughout the year.\n\n" +
    "ONE SENTENCE YOU MUST NOT SAY: Do not say 'Monsoon rainfall caused the Dengue outbreak.' Meteorological data was not co-modeled. We report observed calendar clustering."
  );

  return slide;
};
