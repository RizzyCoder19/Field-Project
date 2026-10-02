'use strict';
const fs = require('fs');

const regPath = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/master/WEEK_STATUS_REGISTER.csv';
const acqLogPath = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/acquisition/HISTORICAL_GAP_ACQUISITION_LOG.csv';

function parseCsvLine(line) {
  const result = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i+1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (c === ',' && !inQ) { result.push(cur); cur = ''; }
    else cur += c;
  }
  result.push(cur);
  return result;
}

const regContent = fs.readFileSync(regPath, 'utf8');
const regLines = regContent.split('\n').filter(l => l.trim().length > 0);
const regHeaders = parseCsvLine(regLines[0]);

const acqContent = fs.readFileSync(acqLogPath, 'utf8');
const acqLines = acqContent.split('\n').filter(l => l.trim().length > 0);
const acqHeaders = parseCsvLine(acqLines[0]);

const new2022Rows = [];
for (let i = 1; i <= 24; i++) {
  const line = acqLines[i];
  if (!line) continue;
  const cols = parseCsvLine(line);
  const yr = parseInt(cols[0], 10);
  const wk = parseInt(cols[1], 10);
  const fn = cols[2];
  const count = parseInt(cols[11], 10) || 0;
  
  const status = count > 0 ? 'MAHARASHTRA_RECORDS_PRESENT' : 'NIL_CONFIRMED';
  const nilEv = count === 0 ? 'No Maharashtra (MH/) outbreak alert recorded in official table' : '';
  const notes = count === 0 ? 'Zero outbreaks notified for Maharashtra this week' : `${count} outbreak records extracted`;
  
  new2022Rows.push({
    year: yr,
    week: wk,
    pdf_filename: fn,
    pdf_valid: 'YES',
    week_status: status,
    records_extracted: count,
    nil_evidence: nilEv,
    notes: notes
  });
}

// Parse existing rows (skip header)
const existingRows = [];
for (let i = 1; i < regLines.length; i++) {
  const cols = parseCsvLine(regLines[i]);
  const yr = parseInt(cols[0], 10);
  const wk = parseInt(cols[1], 10);
  // Avoid duplicating any 2022 W01-W24 rows if run multiple times
  if (yr === 2022 && wk <= 24) continue;
  existingRows.push({
    year: yr,
    week: wk,
    pdf_filename: cols[2],
    pdf_valid: cols[3],
    week_status: cols[4],
    records_extracted: parseInt(cols[5], 10) || 0,
    nil_evidence: cols[6] || '',
    notes: cols[7] || ''
  });
}

const allRows = [...new2022Rows, ...existingRows].sort((a, b) => {
  if (a.year !== b.year) return a.year - b.year;
  return a.week - b.week;
});

console.log('Total combined weeks in register:', allRows.length);
const y2022 = allRows.filter(r => r.year === 2022);
console.log('2022 weeks count:', y2022.length, 'min week:', y2022[0].week, 'max week:', y2022[y2022.length - 1].week);

function esc(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  return (s.includes(',') || s.includes('"') || s.includes('\n')) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

const outLines = ['year,week,pdf_filename,pdf_valid,week_status,records_extracted,nil_evidence,notes'];
for (const r of allRows) {
  outLines.push([
    r.year,
    r.week,
    r.pdf_filename,
    r.pdf_valid,
    r.week_status,
    r.records_extracted,
    esc(r.nil_evidence),
    esc(r.notes)
  ].join(','));
}

fs.writeFileSync(regPath, outLines.join('\n'), 'utf8');
console.log('Successfully written updated WEEK_STATUS_REGISTER.csv');
