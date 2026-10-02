/**
 * HERO SEASONAL DATA VISUALIZATION: FIVE TEMPORAL SIGNATURES
 * Custom shape-based vector matrix rendered directly via PptxGenJS
 * Displays exact monthly outbreak event record counts across 2022–2025 baseline.
 */

const config = require("../presentation.config");
const data = require("../data");

/**
 * Render the 5-Disease Temporal Matrix
 * @param {Object} slide - PptxGenJS slide instance
 * @param {Object} bounds - { x, y, w, h }
 */
function renderHeroSeasonalMatrix(slide, bounds = { x: 0.8, y: 1.4, w: 8.4, h: 3.5 }) {
  const { x, y, w, h } = bounds;
  const months = data.months;
  const diseaseKeys = ['dengue', 'add', 'malaria', 'foodPoisoning', 'chikungunya'];
  const diseaseList = diseaseKeys.map(k => data.baseline.byDisease[k]);

  const labelColWidth = 1.9;   // Width for disease name & stats on the left
  const summaryColWidth = 1.3; // Width for peak window & stability on the right
  const matrixWidth = w - labelColWidth - summaryColWidth; // Width for 12 months
  const colWidth = matrixWidth / 12;
  const rowHeight = (h - 0.45) / 5; // 5 rows plus header

  // 1. Seasonal Shading in Background (Pre-Monsoon, Monsoon, Post-Monsoon, Winter)
  // Monsoon is Jun (idx 5) to Sep (idx 8) -> 4 months
  const monsoonX = x + labelColWidth + (5 * colWidth);
  const monsoonW = colWidth * 4;
  slide.addShape("rect", {
    x: monsoonX,
    y: y + 0.35,
    w: monsoonW,
    h: h - 0.35,
    fill: { color: "E2DAC8" }, // Distinct monsoon band
    line: null
  });

  // Monsoon Label at top
  slide.addText("MONSOON SURVEILLANCE WINDOW (JUN–SEP)", {
    x: monsoonX,
    y: y + 0.05,
    w: monsoonW,
    h: 0.22,
    align: "center",
    fontFace: config.fonts.mono,
    fontSize: 6.5,
    bold: true,
    color: config.colors.petrol
  });

  // 2. Month Headers (Jan - Dec)
  for (let m = 0; m < 12; m++) {
    const colX = x + labelColWidth + (m * colWidth);
    slide.addText(months[m].toUpperCase(), {
      x: colX,
      y: y + 0.18,
      w: colWidth,
      h: 0.22,
      align: "center",
      fontFace: config.fonts.mono,
      fontSize: 7.5,
      bold: true,
      color: (m >= 5 && m <= 8) ? config.colors.ink : config.colors.muted
    });
  }

  // Summary Column Header
  slide.addText("PEAK WINDOW / CR3", {
    x: x + labelColWidth + matrixWidth,
    y: y + 0.18,
    w: summaryColWidth,
    h: 0.22,
    align: "right",
    fontFace: config.fonts.mono,
    fontSize: 7,
    bold: true,
    color: config.colors.muted
  });

  // 3. Render Each Disease Row
  diseaseList.forEach((dis, r) => {
    const rowY = y + 0.4 + (r * rowHeight);
    const maxVal = Math.max(...dis.monthlyEvents);

    // Subtle horizontal divider line
    slide.addShape("line", {
      x: x,
      y: rowY,
      w: w,
      h: 0,
      line: { color: config.colors.border, width: 0.5 }
    });

    // Left Column: Disease Name & Record Total
    slide.addText(dis.name, {
      x: x,
      y: rowY + 0.08,
      w: labelColWidth - 0.1,
      h: 0.26,
      fontFace: config.fonts.display,
      fontSize: 11,
      bold: true,
      color: config.colors.ink
    });

    slide.addText(`${dis.records} OUTBREAKS | ${dis.cases.toLocaleString()} CASES`, {
      x: x,
      y: rowY + 0.32,
      w: labelColWidth - 0.1,
      h: 0.2,
      fontFace: config.fonts.mono,
      fontSize: 6.5,
      color: config.colors.muted
    });

    // 12 Monthly Value Cells
    dis.monthlyEvents.forEach((val, m) => {
      const cellX = x + labelColWidth + (m * colWidth);
      
      // Determine if this month is a top peak month (highlight in burnt orange)
      const isPeak = val >= (maxVal * 0.75) && val > 5;
      const barColor = isPeak ? config.colors.orange : (val > 0 ? config.colors.petrol : config.colors.border);
      
      // Scaled bar height (proportional to event count)
      const maxBarH = rowHeight - 0.22;
      const barH = val === 0 ? 0.04 : Math.max(0.08, (val / 40) * maxBarH);
      const barY = rowY + rowHeight - 0.06 - barH;
      const barW = colWidth * 0.65;
      const barInsetX = cellX + ((colWidth - barW) / 2);

      // Render Bar
      slide.addShape("rect", {
        x: barInsetX,
        y: barY,
        w: barW,
        h: barH,
        fill: { color: barColor },
        line: null
      });

      // Data Value Label
      slide.addText(String(val), {
        x: cellX,
        y: barY - 0.18,
        w: colWidth,
        h: 0.18,
        align: "center",
        fontFace: config.fonts.mono,
        fontSize: isPeak ? 7.5 : 6.5,
        bold: isPeak,
        color: isPeak ? config.colors.orange : (val > 0 ? config.colors.ink : config.colors.subtle)
      });
    });

    // Right Column: Summary Metric Callout
    slide.addText(`${dis.peakWindow}`, {
      x: x + labelColWidth + matrixWidth,
      y: rowY + 0.08,
      w: summaryColWidth,
      h: 0.24,
      align: "right",
      fontFace: config.fonts.body,
      fontSize: 9.5,
      bold: true,
      color: config.colors.ink
    });

    slide.addText(`CR3: ${(dis.cr3 * 100).toFixed(1)}% (${dis.cr3Window})`, {
      x: x + labelColWidth + matrixWidth,
      y: rowY + 0.32,
      w: summaryColWidth,
      h: 0.2,
      align: "right",
      fontFace: config.fonts.mono,
      fontSize: 7,
      bold: true,
      color: config.colors.orange
    });
  });

  // Bottom Border Rule
  slide.addShape("line", {
    x: x,
    y: y + 0.4 + (5 * rowHeight),
    w: w,
    h: 0,
    line: { color: config.colors.border, width: 0.75 }
  });
}

module.exports = {
  renderHeroSeasonalMatrix
};
