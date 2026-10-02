/**
 * SLIDE 09: METHODOLOGICAL BOUNDARIES — ROYAL SOVEREIGN
 * Five numbered research boundaries framed in royal sapphire cards with imperial gold numerals.
 */

const config = require("../presentation.config");
const { addHeader, addFooter, addCard } = require("../components/base");

module.exports = function createSlide09(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: config.colors.bg };

  addHeader(
    slide,
    "EPIDEMIOLOGICAL METHODOLOGY  //  RESEARCH BOUNDARIES",
    "Five Methodological Boundaries of This Analysis",
    "Explicit scientific scope constraints ensuring academic rigor and defensibility"
  );

  const boundaries = [
    {
      num: "01",
      title: "SURVEILLANCE ≠ POPULATION INCIDENCE",
      text: "Government outbreak bulletins capture officially investigated disease clusters through passive administrative channels. Mild, treated-at-home, or uninvestigated endemic cases across the broader community are not enumerated."
    },
    {
      num: "02",
      title: "NO CAUSAL OR CLIMATE ATTRIBUTION",
      text: "This analysis identifies observed calendar-month outbreak concentrations only. Meteorological covariates (precipitation, humidity, temperature) were not co-modeled, precluding direct causal attribution to weather variables."
    },
    {
      num: "03",
      title: "DIAGNOSTIC & REPORTING HETEROGENEITY",
      text: "Diagnostic thresholds vary across districts and seasons. Clinical syndromic labels (e.g. 'Suspected' food poisoning) coexist with serologically confirmed entries in source PDFs, producing inherent reporting variance."
    },
    {
      num: "04",
      title: "TEMPORAL TRUNCATION (2026 SURVEILLANCE)",
      text: "The 2026 dataset spans Weeks 01–32 only. Diseases exhibiting second-half seasonal surge dynamics (notably Dengue, where 55.4% of historical events occur after W32) cannot be evaluated across this truncated window."
    },
    {
      num: "05",
      title: "INSTITUTIONAL SURVEILLANCE SCOPE",
      text: "Surveillance records capture public-sector investigation alerts. Outpatient consultations and private-sector clinical encounters that do not trigger formal IDSP rapid-response team deployments are not captured in these data."
    }
  ];

  const startY = 1.48;
  const cardH = 0.65;
  const cardGap = 0.08;
  const cardW = 8.4;
  const cardX = 0.8;

  boundaries.forEach((b, i) => {
    const cy = startY + i * (cardH + cardGap);

    addCard(slide, {
      x: cardX,
      y: cy,
      w: cardW,
      h: cardH,
      fill: config.colors.bgCard,
      border: config.colors.cardBorder,
      lineWeight: 0.75
    });

    // Left indicator line
    slide.addShape("line", {
      x: cardX,
      y: cy,
      w: 0,
      h: cardH,
      line: { color: config.colors.gold, width: 2 }
    });

    // Big numeral
    slide.addText(b.num, {
      x: cardX + 0.15,
      y: cy + 0.08,
      w: 0.45,
      h: 0.48,
      fontFace: config.fonts.display,
      fontSize: 22,
      bold: true,
      color: config.colors.gold
    });

    // Title
    slide.addText(b.title, {
      x: cardX + 0.65,
      y: cy + 0.08,
      w: 3.2,
      h: 0.22,
      fontFace: config.fonts.mono,
      fontSize: 7.5,
      bold: true,
      color: config.colors.white,
      charSpacing: 0.5
    });

    // Text
    slide.addText(b.text, {
      x: cardX + 3.85,
      y: cy + 0.08,
      w: cardW - 4.0,
      h: cardH - 0.14,
      fontFace: config.fonts.body,
      fontSize: 8,
      color: config.colors.platinum,
      lineSpacingMultiple: 1.15
    });
  });

  addFooter(slide, "METHODOLOGICAL BOUNDARIES // RP INSTITUTE // B.SC. DATA SCIENCE VIVA DEFENSE", 9, 10);

  slide.addNotes(
    "VIVA SCRIPT (35s):\n" +
    "A rigorous scientific presentation must define its boundaries clearly.\n" +
    "We state five explicit limitations:\n" +
    "1. Surveillance data reflects investigated clusters, not community incidence.\n" +
    "2. We make no causal claims — we report calendar clustering without meteorological co-modeling.\n" +
    "3. Diagnostic thresholds vary, including syndromic versus confirmed classifications.\n" +
    "4. 2026 data is truncated at Week 32, precluding full-year evaluation for late-season diseases like Dengue.\n" +
    "5. The dataset reflects public health surveillance records; private clinic treatments are outside its scope.\n\n" +
    "DEFENSE STRENGTH: Stating these boundaries proactively demonstrates mature scientific methodology and statistical integrity to the viva examiners."
  );

  return slide;
};
