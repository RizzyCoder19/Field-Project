/**
 * REUSABLE PRESENTATION COMPONENTS & LAYOUT PRIMITIVES
 * Built for PptxGenJS | Royal Sovereign Design System
 */

const config = require("../presentation.config");

/**
 * Standard Slide Header
 */
function addHeader(slide, category, title, subtitle = null) {
  // Top Tracker / Category in Imperial Gold
  slide.addText(category.toUpperCase(), {
    x: 0.8,
    y: 0.32,
    w: 8.4,
    h: 0.22,
    fontFace: config.fonts.mono,
    fontSize: 7.5,
    bold: true,
    color: config.colors.gold,
    charSpacing: 2
  });

  // Main Editorial Headline in Diamond White
  slide.addText(title, {
    x: 0.8,
    y: 0.54,
    w: 8.4,
    h: 0.48,
    fontFace: config.fonts.display,
    fontSize: 21,
    bold: true,
    color: config.colors.white,
    lineSpacingMultiple: 1.1
  });

  // Optional Subtitle
  let ruleY = 1.08;
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.8,
      y: 1.02,
      w: 8.4,
      h: 0.28,
      fontFace: config.fonts.body,
      fontSize: 10,
      color: config.colors.goldLight
    });
    ruleY = 1.34;
  }

  // Delicate Separator Rule Line with Gold accent
  slide.addShape("line", {
    x: 0.8,
    y: ruleY,
    w: 8.4,
    h: 0,
    line: { color: config.colors.borderGold, width: 0.75 }
  });

  return ruleY;
}

/**
 * Standard Slide Footer
 */
function addFooter(slide, sourceText, slideNum, totalSlides = 10) {
  const footerY = 5.22;

  // Bottom Border Rule Line
  slide.addShape("line", {
    x: 0.8,
    y: footerY,
    w: 8.4,
    h: 0,
    line: { color: config.colors.border, width: 0.75 }
  });

  // Source Provenance Notice (Bottom-Left)
  const source = sourceText || config.defaultSource;
  slide.addText(source.toUpperCase(), {
    x: 0.8,
    y: footerY + 0.08,
    w: 7.2,
    h: 0.22,
    fontFace: config.fonts.mono,
    fontSize: 6.5,
    color: config.colors.muted
  });

  // Slide Numbering (Bottom-Right) in Imperial Gold
  const formattedNum = String(slideNum).padStart(2, "0");
  const formattedTotal = String(totalSlides).padStart(2, "0");
  slide.addText(`${formattedNum} / ${formattedTotal}`, {
    x: 8.2,
    y: footerY + 0.08,
    w: 1.0,
    h: 0.22,
    align: "right",
    fontFace: config.fonts.mono,
    fontSize: 7.5,
    bold: true,
    color: config.colors.gold
  });
}

/**
 * Royal Content Card
 */
function addCard(slide, { x, y, w, h, fill = config.colors.bgCard, border = config.colors.cardBorder, lineWeight = 0.75 }) {
  const shapeOpts = { x, y, w, h, fill: { color: fill } };
  if (border) shapeOpts.line = { color: border, width: lineWeight };
  slide.addShape("rect", shapeOpts);
}

/**
 * Giant Royal Metric Block
 */
function addMetricCard(slide, { x, y, w, h, value, unit = "", label, subtitle = "", highlight = false, color = null, borderColor = null }) {
  const numColor = color || (highlight ? config.colors.gold : config.colors.white);
  const cardBg = highlight ? config.colors.bgCardLight : config.colors.bgCard;
  const bColor = borderColor || (highlight ? config.colors.gold : config.colors.cardBorder);

  // Background Panel
  addCard(slide, { x, y, w, h, fill: cardBg, border: bColor, lineWeight: highlight ? 1.0 : 0.75 });

  // Big Value Number
  slide.addText(`${value}`, {
    x: x + 0.15,
    y: y + 0.1,
    w: w - 0.3,
    h: 0.65,
    fontFace: config.fonts.display,
    fontSize: 28,
    bold: true,
    color: numColor
  });

  // Unit if present
  if (unit) {
    slide.addText(unit.toUpperCase(), {
      x: x + 0.15,
      y: y + 0.72,
      w: w - 0.3,
      h: 0.2,
      fontFace: config.fonts.mono,
      fontSize: 7.5,
      bold: true,
      color: highlight ? config.colors.goldLight : config.colors.muted,
      charSpacing: 1
    });
  }

  // Label
  slide.addText(label, {
    x: x + 0.15,
    y: y + (unit ? 0.92 : 0.78),
    w: w - 0.3,
    h: 0.35,
    fontFace: config.fonts.body,
    fontSize: 10.5,
    bold: true,
    color: config.colors.platinum
  });

  // Subtitle / Note
  if (subtitle) {
    const subtitleH = Math.max(0.1, h - (unit ? 1.35 : 1.2));
    slide.addText(subtitle, {
      x: x + 0.15,
      y: y + (unit ? 1.28 : 1.12),
      w: w - 0.3,
      h: subtitleH,
      fontFace: config.fonts.body,
      fontSize: 8.5,
      color: config.colors.muted,
      lineSpacingMultiple: 1.1
    });
  }
}

/**
 * Status Tag / Pill with Royal Styling
 */
function addBadge(slide, { x, y, w, h = 0.24, text, fill = config.colors.bgCardLight, color = config.colors.gold, border = config.colors.gold }) {
  slide.addShape("rect", {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    line: border ? { color: border, width: 0.75 } : undefined
  });

  slide.addText(text.toUpperCase(), {
    x,
    y: y + 0.02,
    w,
    h: h - 0.04,
    align: "center",
    valign: "middle",
    fontFace: config.fonts.mono,
    fontSize: 7,
    bold: true,
    color: color,
    charSpacing: 1
  });
}

/**
 * Framed Scientific Exhibit Card (for real charts/graphs)
 */
function addChartCard(slide, { x, y, w, h, imagePath, title = "", caption = "" }) {
  // Outer frame in royal sapphire
  addCard(slide, { x, y, w, h, fill: config.colors.bgCardDark, border: config.colors.borderGold, lineWeight: 0.75 });

  let curY = y + 0.08;
  if (title) {
    slide.addText(title.toUpperCase(), {
      x: x + 0.15,
      y: curY,
      w: w - 0.3,
      h: 0.22,
      fontFace: config.fonts.mono,
      fontSize: 7,
      bold: true,
      color: config.colors.gold,
      charSpacing: 1
    });
    curY += 0.24;
  }

  // Inner white canvas for maximum chart contrast & sharpness
  const imgW = w - 0.3;
  const captionH = caption ? 0.32 : 0;
  const imgH = h - (curY - y) - captionH - 0.1;

  slide.addShape("rect", {
    x: x + 0.15,
    y: curY,
    w: imgW,
    h: imgH,
    fill: { color: config.colors.chartBg },
    line: { color: config.colors.border, width: 0.5 }
  });

  // Embed Image directly inside the white container
  slide.addImage({
    path: imagePath,
    x: x + 0.18,
    y: curY + 0.04,
    w: imgW - 0.06,
    h: imgH - 0.08
  });

  // Caption at bottom
  if (caption) {
    slide.addText(caption, {
      x: x + 0.15,
      y: curY + imgH + 0.06,
      w: w - 0.3,
      h: captionH,
      fontFace: config.fonts.body,
      fontSize: 7.5,
      italic: true,
      color: config.colors.muted
    });
  }
}

module.exports = {
  addHeader,
  addFooter,
  addCard,
  addMetricCard,
  addBadge,
  addChartCard
};
