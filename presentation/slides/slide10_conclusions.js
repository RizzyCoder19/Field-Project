/**
 * SLIDE 10: CONCLUSIONS & SURVEILLANCE IMPLICATIONS — ROYAL SOVEREIGN
 * Five numbered conclusions and framed surveillance implication banner.
 */

const config = require("../presentation.config");
const { addHeader, addFooter, addCard } = require("../components/base");

module.exports = function createSlide10(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: config.colors.bg };

  addHeader(
    slide,
    "SYNTHESIS  //  RESEARCH CONCLUSIONS",
    "What the Four-Year Analysis Demonstrates",
    "Summary of empirical findings across 539 investigated outbreak events in Maharashtra"
  );

  const conclusions = [
    {
      num: "01",
      title: "DISTINCT TEMPORAL SIGNATURES",
      text: "The five disease families exhibit fundamentally different calendar distributions: Dengue concentrates in Jun–Oct (Oct peak); Malaria in May–Jul; ADD shows sustained Jun–Aug elevation with Oct secondary activity; Food Poisoning is bimodal (Jan–Feb, Apr–May); Chikungunya is dispersed."
    },
    {
      num: "02",
      title: "EVENT FREQUENCY VS. CASE VOLUME DIVERGENCE",
      text: "Outbreak event counts and patient case totals can diverge substantially. A small number of mass-exposure records can dominate aggregate case volumes without altering underlying event frequency distributions."
    },
    {
      num: "03",
      title: "STATISTICALLY SIGNIFICANT INTER-ANNUAL CONCORDANCE",
      text: "Acute Diarrheal Disease demonstrates the only statistically significant inter-annual monthly ranking stability (Kendall’s W = 0.530, p = 0.016). All other disease families return non-significant concordance values."
    },
    {
      num: "04",
      title: "OUTLIER SENSITIVITY IN CASE TOTALS",
      text: "Food Poisoning case totals are overwhelmingly driven by three mass-exposure records (1,615 cases) accounting for 74.7% of all February cases and 27.3% of four-year baseline cases across Maharashtra."
    },
    {
      num: "05",
      title: "PARTIAL-YEAR SURVEILLANCE BOUNDARIES",
      text: "2026 Weeks 01–32 provides a partial out-of-sample comparison, not a full annual validation. Diseases with historical post-Week 32 surge patterns (notably Dengue) cannot be evaluated over this partial observation window."
    }
  ];

  const startY = 1.44;
  const rowH = 0.54;
  const gap = 0.06;
  const cardW = 8.4;
  const cardX = 0.8;

  conclusions.forEach((c, i) => {
    const ry = startY + i * (rowH + gap);
    const isHighlight = i === 2; // ADD significance

    addCard(slide, {
      x: cardX,
      y: ry,
      w: cardW,
      h: rowH,
      fill: isHighlight ? config.colors.bgCardLight : config.colors.bgCard,
      border: isHighlight ? config.colors.emerald : config.colors.cardBorder,
      lineWeight: isHighlight ? 1.0 : 0.75
    });

    // Numeral
    slide.addText(c.num, {
      x: cardX + 0.15,
      y: ry + 0.06,
      w: 0.45,
      h: 0.42,
      fontFace: config.fonts.display,
      fontSize: 18,
      bold: true,
      color: isHighlight ? config.colors.emeraldLight : config.colors.gold
    });

    // Title
    slide.addText(c.title, {
      x: cardX + 0.65,
      y: ry + 0.06,
      w: 3.2,
      h: 0.2,
      fontFace: config.fonts.mono,
      fontSize: 7,
      bold: true,
      color: isHighlight ? config.colors.emeraldLight : config.colors.white,
      charSpacing: 0.5
    });

    // Text
    slide.addText(c.text, {
      x: cardX + 3.85,
      y: ry + 0.06,
      w: cardW - 4.0,
      h: rowH - 0.1,
      fontFace: config.fonts.body,
      fontSize: 7.5,
      color: config.colors.platinum,
      lineSpacingMultiple: 1.15
    });
  });

  // ── Surveillance Implication Banner ─────────────────────────────────────────
  const bannerY = startY + 5 * (rowH + gap) + 0.06;
  const bannerH = 0.64;

  addCard(slide, {
    x: cardX,
    y: bannerY,
    w: cardW,
    h: bannerH,
    fill: config.colors.bgCardLight,
    border: config.colors.gold,
    lineWeight: 1.0
  });

  slide.addShape("line", {
    x: cardX,
    y: bannerY,
    w: cardW,
    h: 0,
    line: { color: config.colors.gold, width: 2 }
  });

  slide.addText("SURVEILLANCE IMPLICATION", {
    x: cardX + 0.2,
    y: bannerY + 0.08,
    w: 2.2,
    h: 0.2,
    fontFace: config.fonts.mono,
    fontSize: 7.5,
    bold: true,
    color: config.colors.gold,
    charSpacing: 1
  });

  slide.addText(
    "Historical concentration windows can assist public health authorities in prioritizing surveillance vigilance and logistical pre-positioning, " +
    "while remaining strictly subject to reporting coverage constraints and source-data boundaries.",
    {
      x: cardX + 2.5,
      y: bannerY + 0.08,
      w: cardW - 2.7,
      h: 0.48,
      fontFace: config.fonts.body,
      fontSize: 8.5,
      italic: true,
      color: config.colors.white,
      lineSpacingMultiple: 1.18
    }
  );

  addFooter(slide, "RESEARCH SYNTHESIS // KHAN UMAR // B.SC. DATA SCIENCE, RP INSTITUTE", 10, 10);

  slide.addNotes(
    "VIVA SCRIPT (40s):\n" +
    "In conclusion, four completed years of NCDC outbreak surveillance data across Maharashtra demonstrates five findings:\n" +
    "1. Disease families exhibit distinct calendar distributions rather than a single shared monsoon surge.\n" +
    "2. Event frequency and case volume are distinct metrics that diverge substantially during mass outbreaks.\n" +
    "3. Acute Diarrheal Disease demonstrates the only statistically significant inter-annual rank stability (W = 0.530, p = 0.016).\n" +
    "4. Food Poisoning case totals are heavily influenced by three localized mass-case records (74.7% of February cases).\n" +
    "5. 2026 W01–W32 is a partial-year comparison, not a full annual validation.\n\n" +
    "The operational implication: historical concentration windows can inform pre-positioning and vigilance timing, subject to reporting limitations.\n" +
    "Thank you, examiners. I welcome your questions.\n\n" +
    "WHAT NOT TO SAY: Do not prescribe medical interventions, clinical treatments, or use the word 'proves'."
  );

  return slide;
};
