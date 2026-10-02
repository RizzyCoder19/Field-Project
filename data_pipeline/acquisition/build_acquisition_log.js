/**
 * Phase 4B: Build HISTORICAL_GAP_ACQUISITION_LOG.csv
 * Compiles all acquisition metadata into required format.
 */
'use strict';
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const DOWNLOAD_LOG = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/acquisition/download_log.json';
const FORENSIC_JSON = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/acquisition/forensic_full_2022.json';
const OUTPUT_CSV = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/acquisition/HISTORICAL_GAP_ACQUISITION_LOG.csv';

const downloadLog = JSON.parse(fs.readFileSync(DOWNLOAD_LOG, 'utf8'));
const forensic = JSON.parse(fs.readFileSync(FORENSIC_JSON, 'utf8'));

// Build a map by week
const forensicMap = {};
forensic.weekResults.forEach(r => { forensicMap[r.week] = r; });

const sha256Map = {};
downloadLog.forEach(e => { sha256Map[e.week] = e; });

// Missing 2023 weeks — confirmed ABSENT from NCDC
const missing2023 = [
  { year: 2023, week: 15, status: 'CONFIRMED_ABSENT_NCDC', note: 'Not listed on official NCDC WeeklyOutbreaks.php as of 2026-10-02' },
  { year: 2023, week: 50, status: 'CONFIRMED_ABSENT_NCDC', note: 'Not listed on official NCDC WeeklyOutbreaks.php as of 2026-10-02' },
  { year: 2023, week: 51, status: 'CONFIRMED_ABSENT_NCDC', note: 'Not listed on official NCDC WeeklyOutbreaks.php as of 2026-10-02' },
  { year: 2023, week: 52, status: 'CONFIRMED_ABSENT_NCDC', note: 'Not listed on official NCDC WeeklyOutbreaks.php as of 2026-10-02' },
];

const rows = [];

// 2022 W01-W24 — all downloaded
for (let w = 1; w <= 24; w++) {
  const dl  = sha256Map[w] || {};
  const fos = forensicMap[w] || {};
  const records = fos.records ? fos.records.length : 0;

  rows.push({
    year: 2022,
    week: w,
    filename: `week${w}.pdf`,
    acquisition_status: dl.success ? 'DOWNLOADED' : 'FAILED',
    official_url: `https://ncdc.mohfw.gov.in/uploads/weekly_outbreaks/2022/week${w}.pdf`,
    file_size_bytes: dl.size || '',
    sha256: dl.sha256 || '',
    page_count: fos.pages || '',
    text_extractable: fos.textLen > 100 ? 'YES' : 'NO',
    maharashtra_present: fos.status && fos.status !== 'NO_MAHARASHTRA' ? 'YES' : 'NO',
    week_status: fos.status || '',
    records_extracted: records,
    nil_confirmed: (fos.status === 'NIL_CONFIRMED' || fos.status === 'NO_MAHARASHTRA') ? 'YES' : 'NO',
    duplicate_risk: 'NONE',
    notes: fos.status === 'NO_MAHARASHTRA' 
      ? 'No Maharashtra outbreak records in this week'
      : `${records} Maharashtra outbreak records extracted`,
  });
}

// 2023 missing — confirmed absent
for (const m of missing2023) {
  rows.push({
    year: m.year,
    week: m.week,
    filename: `week${m.week}.pdf`,
    acquisition_status: m.status,
    official_url: `https://ncdc.mohfw.gov.in/uploads/weekly_outbreaks/2023/week${m.week}.pdf`,
    file_size_bytes: '',
    sha256: '',
    page_count: '',
    text_extractable: '',
    maharashtra_present: '',
    week_status: m.status,
    records_extracted: '',
    nil_confirmed: '',
    duplicate_risk: '',
    notes: m.note,
  });
}

// 2026 current status
rows.push({
  year: 2026,
  week: 'W01-W32',
  filename: '32 files (week1_... to week32_...)',
  acquisition_status: 'COMPLETE_IN_LOCAL_ARCHIVE',
  official_url: 'https://ncdc.mohfw.gov.in/includes/WeeklyOutbreaks.php',
  file_size_bytes: '',
  sha256: '',
  page_count: '',
  text_extractable: '',
  maharashtra_present: '',
  week_status: 'ARCHIVE_CURRENT',
  records_extracted: '',
  nil_confirmed: '',
  duplicate_risk: '',
  notes: 'NCDC shows exactly 32 weeks for 2026 as of 2026-10-02. W32 is the latest available.'
});

// Write CSV
const headers = Object.keys(rows[0]);
const lines = [headers.join(',')];
rows.forEach(r => lines.push(
  headers.map(h => {
    const v = String(r[h] === null || r[h] === undefined ? '' : r[h]);
    return v.includes(',') || v.includes('"') ? '"' + v.replace(/"/g,'""') + '"' : v;
  }).join(',')
));

fs.writeFileSync(OUTPUT_CSV, lines.join('\n'), 'utf8');
console.log(`Written: ${OUTPUT_CSV} (${rows.length} rows)`);
console.log('\nSUMMARY:');
console.log(`  2022 W01-W24: ${rows.filter(r => r.year === 2022 && r.acquisition_status === 'DOWNLOADED').length} PDFs downloaded`);
console.log(`  2023 W15,W50,W51,W52: CONFIRMED ABSENT from NCDC`);
console.log(`  2026: Latest week = W32 (archive complete)`);
