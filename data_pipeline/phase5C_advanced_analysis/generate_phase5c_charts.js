// Phase 5C — Chart Generator
// Produces 6 publication-quality charts using @napi-rs/canvas

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('pdfjs-dist/node_modules/@napi-rs/canvas');

const outDir = path.resolve('data_pipeline/phase5C_advanced_analysis');

function parseCsv(content) {
  const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
  const headers = parseCsvLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = parseCsvLine(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = vals[idx] !== undefined ? vals[idx] : ''; });
    rows.push(obj);
  }
  return rows;
}

function parseCsvLine(line) {
  const result = [];
  let cur = '', inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) { result.push(cur); cur = ''; }
    else cur += c;
  }
  result.push(cur);
  return result;
}

const diseases = ['Dengue', 'Acute Diarrheal Disease', 'Malaria', 'Food Poisoning', 'Chikungunya'];
const shortDiseases = ['Dengue', 'ADD', 'Malaria', 'Food\nPoison.', 'Chikungunya'];
const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// Disease colour palette
const palette = {
  'Dengue': '#E53935',
  'Acute Diarrheal Disease': '#1E88E5',
  'Malaria': '#43A047',
  'Food Poisoning': '#FB8C00',
  'Chikungunya': '#8E24AA',
};

function savePng(canvas, filename) {
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outDir, filename), buf);
  console.log(`Saved chart: ${filename} (${Math.round(buf.length / 1024)} KB)`);
}

function drawTitle(ctx, text, y, size = 15) {
  ctx.save();
  ctx.font = `bold ${size}px sans-serif`;
  ctx.fillStyle = '#1a1a2e';
  ctx.textAlign = 'center';
  ctx.fillText(text, ctx.canvas.width / 2, y);
  ctx.restore();
}

function drawSubtitle(ctx, text, y) {
  ctx.save();
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#555';
  ctx.textAlign = 'center';
  ctx.fillText(text, ctx.canvas.width / 2, y);
  ctx.restore();
}

// ==================================================
// CHART 1: SEASONAL CONCENTRATION COMPARISON
// Multiple metrics grouped bar chart (Event CV, Case CV, Event CR3, Case CR3)
// ==================================================
function chart1() {
  const concData = parseCsv(fs.readFileSync(path.join(outDir, '01_SEASONAL_CONCENTRATION.csv'), 'utf8'));

  const W = 900, H = 540;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  drawTitle(ctx, 'Seasonal Concentration Metrics — 5 Primary Disease Families', 30);
  drawSubtitle(ctx, '2022–2025 Baseline (N = 539 outbreak records) | Two measures: CV (Coefficient of Variation) and CR3 (3-Month Concentration Ratio)', 50);

  const marginL = 60, marginR = 20, marginT = 70, marginB = 130;
  const plotW = W - marginL - marginR;
  const plotH = H - marginT - marginB;

  // Draw axes
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(marginL, marginT);
  ctx.lineTo(marginL, marginT + plotH);
  ctx.lineTo(marginL + plotW, marginT + plotH);
  ctx.stroke();

  // Y-axis: 0 to 1.4 (covers both CV and CR3 values)
  const maxY = 1.4;
  ctx.save();
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'right';
  for (let v = 0; v <= 14; v += 2) {
    const val = v / 10;
    const y = marginT + plotH - (val / maxY) * plotH;
    ctx.fillText(val.toFixed(1), marginL - 6, y + 4);
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(marginL, y);
    ctx.lineTo(marginL + plotW, y);
    ctx.stroke();
  }
  ctx.restore();

  // Add Y label
  ctx.save();
  ctx.translate(14, marginT + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.fillText('Metric Value', 0, 0);
  ctx.restore();

  const nD = diseases.length;
  const groupW = plotW / nD;
  const barW = groupW / 6; // 4 bars + 2 gaps per group
  const barColors = ['#E53935', '#FF8A80', '#1E88E5', '#90CAF9'];
  const barLabels = ['Event CV', 'Case CV', 'Event CR3', 'Case CR3'];
  const barKeys = ['event_cv', 'case_cv', 'event_cr3', 'case_cr3'];

  concData.forEach((row, di) => {
    const gX = marginL + di * groupW + groupW / 8;
    barKeys.forEach((key, bi) => {
      const val = parseFloat(row[key]);
      const bx = gX + bi * (barW + 1);
      const by = marginT + plotH - (val / maxY) * plotH;
      const bh = (val / maxY) * plotH;

      ctx.fillStyle = barColors[bi];
      ctx.fillRect(bx, by, barW, bh);

      // Value label on top
      ctx.save();
      ctx.font = '9px sans-serif';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText(val.toFixed(2), bx + barW / 2, by - 2);
      ctx.restore();
    });

    // Disease label
    ctx.save();
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#222';
    ctx.textAlign = 'center';
    const label = di === 1 ? 'ADD' : (di === 3 ? 'Food Poison.' : diseases[di]);
    ctx.fillText(label, marginL + di * groupW + groupW / 2, marginT + plotH + 18);
    ctx.restore();
  });

  // Legend
  const legendX = marginL + 5;
  const legendY = marginT + plotH + 40;
  barLabels.forEach((label, i) => {
    ctx.fillStyle = barColors[i];
    ctx.fillRect(legendX + i * 160, legendY, 14, 14);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';
    ctx.fillText(label, legendX + i * 160 + 18, legendY + 11);
  });

  // Threshold line at CR3 = 0.50
  const y50 = marginT + plotH - (0.50 / maxY) * plotH;
  ctx.save();
  ctx.strokeStyle = '#888';
  ctx.setLineDash([5, 4]);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(marginL, y50);
  ctx.lineTo(marginL + plotW, y50);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#666';
  ctx.textAlign = 'right';
  ctx.fillText('CR3 = 0.50 high-concentration threshold', marginL + plotW - 4, y50 - 4);
  ctx.restore();

  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#666';
  ctx.textAlign = 'left';
  ctx.fillText('CV = Coefficient of Variation (event count spread); CR3 = Top-3-Month share of annual events/cases. Period: 2022–2025 completed baseline.', marginL, H - 20);

  savePng(canvas, 'chart_seasonal_concentration.png');
}

// ==================================================
// CHART 2: SEASONAL STABILITY HEATMAP (Year × Month)
// ==================================================
function chart2() {
  const phase5bMonthly = parseCsv(fs.readFileSync('data_pipeline/phase5B_seasonal_analysis/01_MONTHLY_DISTRIBUTION.csv', 'utf8'));
  const mappingCsvPath = 'data_pipeline/phase5A_disease_audit/02_DISEASE_FAMILY_MAPPING.csv';
  const cleanCsvPath = 'data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv';

  function parseCSV(f) { return parseCsv(fs.readFileSync(f, 'utf8')); }
  const mapRows = parseCSV(mappingCsvPath);
  const allRows = parseCSV(cleanCsvPath);

  const familyMap = new Map();
  mapRows.forEach(r => familyMap.set(r.disease_clean, r.derived_disease_family));

  const primaryFamilies = ['Dengue', 'Acute Diarrheal Disease', 'Malaria', 'Food Poisoning', 'Chikungunya'];
  const baselineRows = [];
  allRows.forEach(r => {
    const fam = familyMap.get(r.disease_clean);
    if (!fam || !primaryFamilies.includes(fam)) return;
    r.disease_family = fam;
    r.month_num = parseInt(r.month, 10);
    r.year_num = parseInt(r.epi_year, 10);
    if (r.year_num >= 2022 && r.year_num <= 2025) baselineRows.push(r);
  });

  const years = [2022, 2023, 2024, 2025];

  const W = 960, H = 640;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  drawTitle(ctx, 'Year × Month Outbreak Event Heatmap — Seasonal Stability Audit', 28);
  drawSubtitle(ctx, '2022–2025 Baseline | Cell value = reported outbreak events per disease-year-month | Darker = higher activity', 46);

  const cellW = 44;
  const cellH = 34;
  const startX = 155;
  const startY = 68;

  // Month headers
  ctx.font = 'bold 11px sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  monthNames.forEach((m, mi) => {
    ctx.fillText(m, startX + mi * cellW + cellW / 2, startY - 6);
  });

  let rowIdx = 0;
  diseases.forEach((d, di) => {
    const dRows = baselineRows.filter(r => r.disease_family === d);

    // Disease label
    ctx.save();
    const labelX = startX - 8;
    const labelY = startY + rowIdx * cellH * (years.length + 0.7);

    ctx.font = `bold 11px sans-serif`;
    ctx.fillStyle = palette[d];
    ctx.textAlign = 'right';
    ctx.fillText(di === 1 ? 'ADD' : (di === 3 ? 'Food Poison.' : d), labelX, labelY + cellH * 2 + 5);
    ctx.restore();

    years.forEach((yr, yi) => {
      const monthlyCounts = new Array(12).fill(0);
      dRows.filter(r => r.year_num === yr).forEach(r => {
        monthlyCounts[r.month_num - 1]++;
      });

      const maxForDisease = Math.max(...diseases.flatMap(dd => {
        return years.map(y => {
          let count = 0;
          baselineRows.filter(r => r.disease_family === dd && r.year_num === y).forEach(r => count++);
          return count;
        });
      }));

      for (let m = 0; m < 12; m++) {
        const cellX = startX + m * cellW;
        const cellY = startY + rowIdx * cellH;
        const val = monthlyCounts[m];
        const intensity = maxForDisease > 0 ? val / maxForDisease : 0;

        // Color: white (0) → disease color
        const r = parseInt(palette[d].slice(1, 3), 16);
        const g = parseInt(palette[d].slice(3, 5), 16);
        const b = parseInt(palette[d].slice(5, 7), 16);
        const alpha = 0.1 + intensity * 0.9;
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fillRect(cellX + 1, cellY + 1, cellW - 2, cellH - 2);

        // Value
        ctx.save();
        ctx.font = `${val >= 10 ? 10 : 11}px sans-serif`;
        ctx.fillStyle = intensity > 0.5 ? '#fff' : '#333';
        ctx.textAlign = 'center';
        if (val > 0) ctx.fillText(val, cellX + cellW / 2, cellY + cellH / 2 + 4);
        ctx.restore();

        // Border
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(cellX + 1, cellY + 1, cellW - 2, cellH - 2);
      }

      // Year label
      ctx.save();
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#555';
      ctx.textAlign = 'right';
      ctx.fillText(yr, startX - 10, startY + rowIdx * cellH + cellH / 2 + 4);
      ctx.restore();

      rowIdx++;
    });

    rowIdx += 0.5; // gap between diseases
  });

  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#666';
  ctx.textAlign = 'left';
  ctx.fillText('Cell: Count of surveillance-reported outbreak events. ADD = Acute Diarrheal Disease. Food Poison. = Food Poisoning. Period: 2022–2025 completed calendar years.', 10, H - 12);

  savePng(canvas, 'chart_seasonal_stability_heatmap.png');
}

// ==================================================
// CHART 3: PEAK TIMING SHIFTS (Annual Peak Month per Disease)
// ==================================================
function chart3() {
  const W = 840, H = 460;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  drawTitle(ctx, 'Annual Peak Month Shifts — All 5 Disease Families', 30);
  drawSubtitle(ctx, '2022–2025 Baseline | Peak = highest outbreak-event count month each year | Ties shown with horizontal segment', 50);

  const marginL = 70, marginR = 30, marginT = 70, marginB = 100;
  const plotW = W - marginL - marginR;
  const plotH = H - marginT - marginB;

  // Y axis: months 1–12
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(marginL, marginT);
  ctx.lineTo(marginL, marginT + plotH);
  ctx.lineTo(marginL + plotW, marginT + plotH);
  ctx.stroke();

  for (let m = 1; m <= 12; m++) {
    const y = marginT + plotH - ((m - 1) / 11) * plotH;
    ctx.save();
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'right';
    ctx.fillText(monthNames[m - 1], marginL - 6, y + 4);
    ctx.strokeStyle = '#eeeeee';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(marginL, y);
    ctx.lineTo(marginL + plotW, y);
    ctx.stroke();
    ctx.restore();
  }

  // Y axis label
  ctx.save();
  ctx.translate(14, marginT + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.fillText('Peak Month (Calendar)', 0, 0);
  ctx.restore();

  const years = [2022, 2023, 2024, 2025];

  // Peak data (from 04_PEAK_TIMING_SHIFTS.csv records)
  const peakData = {
    'Dengue':                    { 2022: [9], 2023: [10], 2024: [6, 7], 2025: [8] },
    'Acute Diarrheal Disease':   { 2022: [12], 2023: [6, 8], 2024: [7], 2025: [10] },
    'Malaria':                   { 2022: [5], 2023: [5, 8, 9, 12], 2024: [7], 2025: [6] },
    'Food Poisoning':            { 2022: [5], 2023: [2, 5], 2024: [2], 2025: [1, 4] },
    'Chikungunya':               { 2022: [5], 2023: [7, 9, 10], 2024: [6, 11], 2025: [8] },
  };

  const xPositions = years.map((yr, i) => marginL + (i / 3) * plotW);

  diseases.forEach(d => {
    const color = palette[d];
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // Draw connecting line through mean peak months
    const meanMonths = years.map(yr => {
      const peaks = peakData[d][yr];
      return peaks.reduce((a, b) => a + b, 0) / peaks.length;
    });

    ctx.beginPath();
    years.forEach((yr, i) => {
      const x = xPositions[i];
      const meanM = meanMonths[i];
      const y = marginT + plotH - ((meanM - 1) / 11) * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw individual year marks
    years.forEach((yr, i) => {
      const peaks = peakData[d][yr];
      const x = xPositions[i];

      peaks.forEach(m => {
        const y = marginT + plotH - ((m - 1) / 11) * plotH;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Tie indicator
      if (peaks.length > 1) {
        const ys = peaks.map(m => marginT + plotH - ((m - 1) / 11) * plotH);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, minY);
        ctx.lineTo(x, maxY);
        ctx.stroke();
      }
    });

    ctx.restore();
  });

  // X axis: year labels
  years.forEach((yr, i) => {
    const x = xPositions[i];
    ctx.save();
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(yr, x, marginT + plotH + 18);
    ctx.restore();
  });

  // Legend
  const legendY = marginT + plotH + 40;
  diseases.forEach((d, i) => {
    const lx = marginL + i * 160;
    ctx.fillStyle = palette[d];
    ctx.beginPath();
    ctx.arc(lx + 7, legendY + 7, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';
    const label = d === 'Acute Diarrheal Disease' ? 'ADD' : (d === 'Food Poisoning' ? 'Food Poison.' : d);
    ctx.fillText(label, lx + 17, legendY + 12);
  });

  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#666';
  ctx.textAlign = 'left';
  ctx.fillText('Dots: annual peak month(s). Vertical segments indicate tied peak months. Lines connect mean peak month across years.', marginL, H - 12);

  savePng(canvas, 'chart_peak_timing_shifts.png');
}

// ==================================================
// CHART 4: EVENT vs CASE BURDEN DIVERGENCE (clustered by disease)
// ==================================================
function chart4() {
  const divData = parseCsv(fs.readFileSync(path.join(outDir, '05_EVENT_CASE_DIVERGENCE.csv'), 'utf8'));

  const W = 1000, H = 520;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  drawTitle(ctx, 'Event Frequency vs. Case Burden Divergence by Month', 28);
  drawSubtitle(ctx, '2022–2025 Baseline | Bar = Monthly Case Share (%) | Diamond = Monthly Event Share (%) | Divergence highlights data artefacts', 46);

  const marginL = 55, marginR = 15, marginT = 65, marginB = 115;
  const plotW = W - marginL - marginR;
  const plotH = H - marginT - marginB;

  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(marginL, marginT);
  ctx.lineTo(marginL, marginT + plotH);
  ctx.lineTo(marginL + plotW, marginT + plotH);
  ctx.stroke();

  // Y axis: 0–80%
  const maxY = 80;
  ctx.save();
  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'right';
  for (let v = 0; v <= maxY; v += 10) {
    const y = marginT + plotH - (v / maxY) * plotH;
    ctx.fillText(v + '%', marginL - 5, y + 4);
    ctx.strokeStyle = '#eeeeee';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(marginL, y);
    ctx.lineTo(marginL + plotW, y);
    ctx.stroke();
  }
  ctx.restore();

  // Uniform baseline line: 8.33%
  const yUnif = marginT + plotH - (8.33 / maxY) * plotH;
  ctx.save();
  ctx.strokeStyle = '#aaa';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(marginL, yUnif);
  ctx.lineTo(marginL + plotW, yUnif);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#888';
  ctx.textAlign = 'left';
  ctx.fillText('Uniform = 8.33%', marginL + 4, yUnif - 3);
  ctx.restore();

  const nGroups = diseases.length;
  const groupW = plotW / nGroups;
  const barW = (groupW - 20) / 12;

  diseases.forEach((d, di) => {
    const dRows = divData.filter(r => r.disease_family === d).sort((a, b) => parseInt(a.month) - parseInt(b.month));
    const gX = marginL + di * groupW + 10;

    dRows.forEach((row, mi) => {
      const evShare = parseFloat(row.event_share_pct.replace('%', ''));
      const caShare = parseFloat(row.case_share_pct.replace('%', ''));
      const bx = gX + mi * barW;

      // Case share bar
      const caY = marginT + plotH - Math.min(caShare, maxY) / maxY * plotH;
      const caH = Math.min(caShare, maxY) / maxY * plotH;
      ctx.fillStyle = `${palette[d]}88`;
      ctx.fillRect(bx, caY, barW - 1, caH);

      // Event share diamond
      const evY = marginT + plotH - Math.min(evShare, maxY) / maxY * plotH;
      const dSize = Math.max(3, barW / 2 - 1);
      ctx.fillStyle = palette[d];
      ctx.beginPath();
      ctx.moveTo(bx + barW / 2, evY - dSize);
      ctx.lineTo(bx + barW - 1, evY);
      ctx.lineTo(bx + barW / 2, evY + dSize);
      ctx.lineTo(bx, evY);
      ctx.closePath();
      ctx.fill();
    });

    // Disease label
    ctx.save();
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = palette[d];
    ctx.textAlign = 'center';
    const label = d === 'Acute Diarrheal Disease' ? 'ADD' : (d === 'Food Poisoning' ? 'Food Poison.' : d);
    ctx.fillText(label, marginL + di * groupW + groupW / 2, marginT + plotH + 18);
    ctx.restore();
  });

  // Legend
  const ly = marginT + plotH + 38;
  ctx.fillStyle = '#88888888';
  ctx.fillRect(marginL, ly, 16, 14);
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'left';
  ctx.fillText('Case Share % (bar)', marginL + 20, ly + 11);

  ctx.fillStyle = '#555';
  ctx.beginPath();
  ctx.moveTo(marginL + 180, ly + 7);
  ctx.lineTo(marginL + 187, ly);
  ctx.lineTo(marginL + 194, ly + 7);
  ctx.lineTo(marginL + 187, ly + 14);
  ctx.closePath();
  ctx.fill();
  ctx.fillText('Event Share % (diamond)', marginL + 200, ly + 11);

  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#666';
  ctx.fillText('Months run Jan–Dec within each disease group. Case Share >> Event Share indicates disproportionate case burden (e.g., Food Poisoning Feb).', marginL, H - 12);

  savePng(canvas, 'chart_event_case_divergence.png');
}

// ==================================================
// CHART 5: OUTLIER SENSITIVITY COMPARISON
// ==================================================
function chart5() {
  const sensData = parseCsv(fs.readFileSync(path.join(outDir, '06_OUTLIER_SENSITIVITY.csv'), 'utf8'));

  const W = 860, H = 480;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  drawTitle(ctx, 'Outlier Sensitivity Analysis — Baseline vs. Exclusion Monthly Case Distribution', 28);
  drawSubtitle(ctx, '2022–2025 Baseline | Peak month comparison before and after excluding top-influencing outbreak records', 46);

  const phase5bMonthly = parseCsv(fs.readFileSync('data_pipeline/phase5B_seasonal_analysis/01_MONTHLY_DISTRIBUTION.csv', 'utf8'));
  const mappingCsvPath = 'data_pipeline/phase5A_disease_audit/02_DISEASE_FAMILY_MAPPING.csv';
  const cleanCsvPath = 'data_pipeline/analysis/NCDC_Maharashtra_CLEAN_ANALYTICAL.csv';

  const mapRows = parseCsv(fs.readFileSync(mappingCsvPath, 'utf8'));
  const allRows = parseCsv(fs.readFileSync(cleanCsvPath, 'utf8'));
  const familyMap = new Map();
  mapRows.forEach(r => familyMap.set(r.disease_clean, r.derived_disease_family));
  const primaryFamilies = ['Dengue', 'Acute Diarrheal Disease', 'Malaria', 'Food Poisoning', 'Chikungunya'];

  const baselineRows = [];
  allRows.forEach(r => {
    const fam = familyMap.get(r.disease_clean);
    if (!fam || !primaryFamilies.includes(fam)) return;
    r.disease_family = fam;
    r.cases_num = parseInt(r.cases, 10) || 0;
    r.month_num = parseInt(r.month, 10);
    r.year_num = parseInt(r.epi_year, 10);
    if (r.year_num >= 2022 && r.year_num <= 2025) baselineRows.push(r);
  });

  const exclusions = {
    'Food Poisoning': ['MAHA-2025-W06-002', 'MAHA-2024-W06-005', 'MAHA-2024-W06-006'],
    'Acute Diarrheal Disease': ['MAHA-2024-W06-001'],
    'Malaria': ['MAHA-2024-W01-002'],
    'Dengue': [],
    'Chikungunya': ['MAHA-2023-W42-007'],
  };

  const marginL = 55, marginR = 15, marginT = 65, marginB = 100;
  const plotW = W - marginL - marginR;
  const plotH = H - marginT - marginB;
  const groupW = plotW / diseases.length;

  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(marginL, marginT);
  ctx.lineTo(marginL, marginT + plotH);
  ctx.lineTo(marginL + plotW, marginT + plotH);
  ctx.stroke();

  const maxCasePct = 45;

  ctx.save();
  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'right';
  for (let v = 0; v <= maxCasePct; v += 5) {
    const y = marginT + plotH - (v / maxCasePct) * plotH;
    ctx.fillText(v + '%', marginL - 5, y + 4);
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(marginL, y);
    ctx.lineTo(marginL + plotW, y);
    ctx.stroke();
  }
  ctx.restore();

  // Y label
  ctx.save();
  ctx.translate(14, marginT + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.fillText('Monthly Case Share (%)', 0, 0);
  ctx.restore();

  diseases.forEach((d, di) => {
    const dRows = baselineRows.filter(r => r.disease_family === d);
    const exIds = exclusions[d];

    const baseline = new Array(12).fill(0);
    const sensitivity = new Array(12).fill(0);
    dRows.forEach(r => {
      baseline[r.month_num - 1] += r.cases_num;
      if (!exIds.includes(r.record_id)) sensitivity[r.month_num - 1] += r.cases_num;
    });

    const baseTotal = baseline.reduce((a, b) => a + b, 0);
    const sensTotal = sensitivity.reduce((a, b) => a + b, 0);

    const gX = marginL + di * groupW + 8;
    const barW = (groupW - 20) / 12;
    const halfW = barW / 2 - 0.5;

    for (let m = 0; m < 12; m++) {
      const bx = gX + m * barW;
      const bPct = baseTotal > 0 ? (baseline[m] / baseTotal) * 100 : 0;
      const sPct = sensTotal > 0 ? (sensitivity[m] / sensTotal) * 100 : 0;

      // Baseline bar
      const bH = Math.min(bPct, maxCasePct) / maxCasePct * plotH;
      ctx.fillStyle = `${palette[d]}88`;
      ctx.fillRect(bx, marginT + plotH - bH, halfW, bH);

      // Sensitivity bar
      const sH = Math.min(sPct, maxCasePct) / maxCasePct * plotH;
      ctx.fillStyle = palette[d];
      ctx.fillRect(bx + halfW + 1, marginT + plotH - sH, halfW, sH);
    }

    ctx.save();
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = palette[d];
    ctx.textAlign = 'center';
    const label = d === 'Acute Diarrheal Disease' ? 'ADD' : (d === 'Food Poisoning' ? 'Food Poison.' : d);
    ctx.fillText(label, marginL + di * groupW + groupW / 2, marginT + plotH + 18);
    ctx.restore();
  });

  const ly = marginT + plotH + 38;
  ctx.fillStyle = '#88888888';
  ctx.fillRect(marginL, ly, 14, 14);
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'left';
  ctx.fillText('Baseline (with outlier events)', marginL + 18, ly + 11);

  ctx.fillStyle = '#555';
  ctx.fillRect(marginL + 220, ly, 14, 14);
  ctx.fillText('Sensitivity (outlier events excluded)', marginL + 238, ly + 11);

  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#666';
  ctx.fillText('Pairs of bars per month (Jan–Dec) within each disease group. Outlier records excluded for sensitivity only; validated dataset remains unchanged.', marginL, H - 12);

  savePng(canvas, 'chart_outlier_sensitivity.png');
}

// ==================================================
// CHART 6: 2026 W01-W32 COMPARISON
// ==================================================
function chart6() {
  const compData = parseCsv(fs.readFileSync(path.join(outDir, '07_2026_OUT_OF_SAMPLE_COMPARISON.csv'), 'utf8'));

  const W = 900, H = 480;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  drawTitle(ctx, '2026 W01–W32 Out-of-Sample Comparison vs. Historical Baselines', 28);
  drawSubtitle(ctx, 'Surveillance-reported outbreak events only | W01–W32 equivalent period compared | Full-year 2022–2025 bars shown for reference', 46);

  const marginL = 60, marginR = 20, marginT = 65, marginB = 110;
  const plotW = W - marginL - marginR;
  const plotH = H - marginT - marginB;
  const nD = diseases.length;
  const groupW = plotW / nD;

  const maxCount = 55;

  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(marginL, marginT);
  ctx.lineTo(marginL, marginT + plotH);
  ctx.lineTo(marginL + plotW, marginT + plotH);
  ctx.stroke();

  ctx.save();
  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'right';
  for (let v = 0; v <= maxCount; v += 10) {
    const y = marginT + plotH - (v / maxCount) * plotH;
    ctx.fillText(v, marginL - 5, y + 4);
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(marginL, y);
    ctx.lineTo(marginL + plotW, y);
    ctx.stroke();
  }
  ctx.restore();

  // Y label
  ctx.save();
  ctx.translate(14, marginT + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.fillText('Outbreak Events (W01–W32)', 0, 0);
  ctx.restore();

  const barColors22to25 = ['#BBDEFB', '#90CAF9', '#42A5F5', '#1565C0'];
  const years = [2022, 2023, 2024, 2025];
  const barCount = 6; // 4 years + mean line + 2026

  diseases.forEach((d, di) => {
    const row = compData.find(r => r.disease_family === d);
    const vals = [
      parseInt(row.events_2022_w01_w32, 10),
      parseInt(row.events_2023_w01_w32, 10),
      parseInt(row.events_2024_w01_w32, 10),
      parseInt(row.events_2025_w01_w32, 10),
    ];
    const mean2026 = parseFloat(row.historical_mean_w01_w32);
    const val2026 = parseInt(row.events_2026_w01_w32, 10);

    const gX = marginL + di * groupW + 6;
    const bW = (groupW - 16) / (barCount);

    // Historical year bars
    vals.forEach((v, yi) => {
      const bx = gX + yi * (bW + 1);
      const bH = (Math.min(v, maxCount) / maxCount) * plotH;
      ctx.fillStyle = barColors22to25[yi];
      ctx.fillRect(bx, marginT + plotH - bH, bW, bH);
      if (v > 0) {
        ctx.save();
        ctx.font = '9px sans-serif';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(v, bx + bW / 2, marginT + plotH - bH - 2);
        ctx.restore();
      }
    });

    // Mean line
    const mX = gX + 4 * (bW + 1);
    const mY = marginT + plotH - (Math.min(mean2026, maxCount) / maxCount) * plotH;
    ctx.save();
    ctx.strokeStyle = '#666';
    ctx.setLineDash([4, 3]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mX - 1, mY);
    ctx.lineTo(mX + bW + 1, mY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = '9px sans-serif';
    ctx.fillStyle = '#444';
    ctx.textAlign = 'center';
    ctx.fillText(`μ=${mean2026.toFixed(1)}`, mX + bW / 2, mY - 3);
    ctx.restore();

    // 2026 bar
    const bx2026 = gX + 5 * (bW + 1);
    const bH2026 = (Math.min(val2026, maxCount) / maxCount) * plotH;
    ctx.fillStyle = palette[d];
    ctx.fillRect(bx2026, marginT + plotH - bH2026, bW, bH2026);
    ctx.save();
    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = palette[d];
    ctx.textAlign = 'center';
    ctx.fillText(val2026, bx2026 + bW / 2, marginT + plotH - bH2026 - 2);
    ctx.restore();

    // Disease label
    ctx.save();
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    const label = d === 'Acute Diarrheal Disease' ? 'ADD' : (d === 'Food Poisoning' ? 'Food Poison.' : d);
    ctx.fillText(label, gX + (groupW - 12) / 2, marginT + plotH + 18);
    ctx.restore();
  });

  // X sub-labels
  diseases.forEach((d, di) => {
    const gX = marginL + di * groupW + 6;
    const bW = (groupW - 16) / barCount;
    const labels = ["'22", "'23", "'24", "'25", 'μ', "'26"];
    labels.forEach((lb, i) => {
      ctx.save();
      ctx.font = '9px sans-serif';
      ctx.fillStyle = i === 5 ? palette[d] : '#666';
      ctx.textAlign = 'center';
      ctx.fillText(lb, gX + i * (bW + 1) + bW / 2, marginT + plotH + 32);
      ctx.restore();
    });
  });

  // Legend
  const ly = marginT + plotH + 56;
  const lItems = [
    { color: '#1565C0', label: '2022–2025 Historical W01–W32 (bars)' },
    { color: '#555', label: 'Historical Mean μ (dashed line)' },
  ];
  lItems.forEach((item, i) => {
    ctx.fillStyle = item.color;
    ctx.fillRect(marginL + i * 320, ly, 14, 12);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';
    ctx.fillText(item.label, marginL + i * 320 + 18, ly + 11);
  });
  ctx.fillStyle = palette['Dengue'];
  ctx.fillRect(marginL + 640, ly, 14, 12);
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#333';
  ctx.fillText("2026 W01–W32 (disease-colored)", marginL + 658, ly + 11);

  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#666';
  ctx.textAlign = 'left';
  ctx.fillText('Comparison: W01–W32 equivalent window only. Full-year 2022–2025 not comparable to partial 2026. ADD = Acute Diarrheal Disease.', marginL, H - 12);

  savePng(canvas, 'chart_2026_comparison.png');
}

// Run all charts
chart1();
chart2();
chart3();
chart4();
chart5();
chart6();

console.log('\nAll 6 Phase 5C charts generated successfully!');
