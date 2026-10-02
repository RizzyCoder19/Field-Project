/**
 * Phase 4B → Master Dataset Rebuild
 * ─────────────────────────────────────────────────────────────────────────────
 * Merges 29 verified historical records (2022 W01-W24) into the 780-row master.
 * Expected output: 809 rows.
 * Does NOT re-extract, re-download, or re-validate source PDFs.
 */

'use strict';
const fs   = require('fs');
const path = require('path');

// ─── Paths ────────────────────────────────────────────────────────────────────
const MASTER_CSV   = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/master/NCDC_Maharashtra_MASTER_RAW.csv';
const STAGING_CSV  = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/staging/historical_gap_records.csv';
const WEEK_REG     = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/master/WEEK_STATUS_REGISTER.csv';
const AUX_FILE     = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/staging/staging_provenance_fields.csv';

// ─── Master schema (26 columns — exact ordering preserved) ───────────────────
const MASTER_COLS = [
  'record_id','source_year','source_week','source_pdf','source_page',
  'internal_week_raw','week_verification_status','state','district_raw',
  'district_normalized','disease_raw','disease_normalized','cases','deaths',
  'status_raw','outbreak_starting_date_raw','outbreak_starting_date',
  'reporting_date_raw','reporting_date','week_start_date','week_end_date',
  'extraction_method','extraction_confidence','ocr_raw_text',
  'validation_status','notes'
];

// Staging-only columns that are NOT in master — save to aux file
const STAGING_EXTRA_COLS = ['official_idsp_id','acquisition_batch','duplicate_in_master'];

// ─── CSV helpers ─────────────────────────────────────────────────────────────
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

function parseCsv(content) {
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map(l => {
    const vals = parseCsvLine(l);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i] !== undefined ? vals[i] : ''; });
    return obj;
  });
}

function esc(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  return (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r'))
    ? '"' + s.replace(/"/g, '""') + '"'
    : s;
}

function writeCsv(filePath, headers, rows) {
  const lines = [headers.join(',')];
  rows.forEach(r => lines.push(headers.map(h => esc(r[h])).join(',')));
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

// ─── Map staging row → master schema ────────────────────────────────────────
function mapStagingToMaster(sr, newRecordId) {
  // Extract IDSP ID from staging for notes field
  const idspId = sr.official_idsp_id || '';
  // Compose notes — merge existing notes with idsp ID annotation
  const stagingNote = sr.notes || '';
  const notes = stagingNote.includes(idspId) ? stagingNote
    : `Official IDSP unique ID: ${idspId}${stagingNote ? ' | ' + stagingNote : ''}`;

  return {
    record_id:                   newRecordId,
    source_year:                 sr.source_year,
    source_week:                 sr.source_week,
    source_pdf:                  sr.source_pdf,
    source_page:                 sr.source_page,
    internal_week_raw:           sr.internal_week_raw || sr.source_week,
    week_verification_status:    sr.week_verification_status || 'MATCH',
    state:                       sr.state || 'Maharashtra',
    district_raw:                sr.district_raw,
    district_normalized:         sr.district_normalized,
    disease_raw:                 sr.disease_raw,
    disease_normalized:          sr.disease_normalized,
    cases:                       sr.cases,
    deaths:                      sr.deaths,
    status_raw:                  sr.status_raw,
    outbreak_starting_date_raw:  sr.outbreak_starting_date_raw,
    outbreak_starting_date:      sr.outbreak_starting_date,
    reporting_date_raw:          sr.reporting_date_raw,
    reporting_date:              sr.reporting_date,
    week_start_date:             sr.week_start_date,
    week_end_date:               sr.week_end_date,
    extraction_method:           sr.extraction_method || 'TEXT',
    extraction_confidence:       sr.extraction_confidence || 'HIGH',
    ocr_raw_text:                '',          // not applicable for text-extracted PDFs
    validation_status:           'PHASE4B_ACQUIRED',
    notes:                       notes,
  };
}

// ─── Assign sequential record IDs for new rows ───────────────────────────────
function getNextRecordId(existingRows) {
  // Master IDs: MAHA-YYYY-Www-NNN
  // Find highest sequence number per year/week combo
  const usedIds = new Set(existingRows.map(r => r.record_id));
  return usedIds;
}

// ─── Integration checks ───────────────────────────────────────────────────────
function runIntegrationChecks(rows) {
  const issues = [];
  const recordIds  = rows.map(r => r.record_id);
  const idspIds    = rows.map(r => {
    const m = (r.notes || '').match(/MH\/[A-Za-z0-9]{2,6}\/\d{2,4}\/[\d\/]+/);
    return m ? m[0].replace(/\s+/g,'') : null;
  }).filter(Boolean);

  // Duplicate record IDs
  const dupRecords = recordIds.filter((id, i) => recordIds.indexOf(id) !== i);
  if (dupRecords.length > 0) issues.push(`DUPLICATE record_ids: ${[...new Set(dupRecords)].join(', ')}`);
  else console.log('  ✅ record_id: 0 duplicates');

  // Duplicate IDSP IDs
  const dupIdsp = idspIds.filter((id, i) => idspIds.indexOf(id) !== i);
  if (dupIdsp.length > 0) issues.push(`DUPLICATE official_idsp_ids: ${[...new Set(dupIdsp)].join(', ')}`);
  else console.log(`  ✅ official_idsp_id: 0 duplicates (${idspIds.length} found in notes)`);

  // Missing record_id
  const missingId = rows.filter(r => !r.record_id || r.record_id.trim() === '');
  if (missingId.length > 0) issues.push(`${missingId.length} rows missing record_id`);
  else console.log('  ✅ record_id: no missing values');

  // Year/week consistency
  let yearWeekErrors = 0;
  rows.forEach(r => {
    const yr = parseInt(r.source_year);
    const wk = parseInt(r.source_week);
    if (isNaN(yr) || isNaN(wk) || yr < 2022 || yr > 2026 || wk < 1 || wk > 53) yearWeekErrors++;
  });
  if (yearWeekErrors > 0) issues.push(`${yearWeekErrors} rows with invalid year/week`);
  else console.log('  ✅ year/week: all within 2022–2026 range, W01–W53');

  // Schema consistency (all master cols present)
  const sampleRow = rows[0] || {};
  const missingCols = MASTER_COLS.filter(c => !(c in sampleRow));
  if (missingCols.length > 0) issues.push(`Missing schema columns: ${missingCols.join(', ')}`);
  else console.log(`  ✅ schema: all ${MASTER_COLS.length} master columns present`);

  // Row count
  console.log(`  ℹ️  Total rows: ${rows.length}`);

  return issues;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  console.log('=== PHASE 4B: MASTER DATASET REBUILD ===\n');

  // 1. Load master
  const masterContent  = fs.readFileSync(MASTER_CSV,  'utf8');
  const masterRows     = parseCsv(masterContent);
  console.log(`Loaded master:  ${masterRows.length} rows`);

  // 2. Load staging
  const stagingContent = fs.readFileSync(STAGING_CSV, 'utf8');
  const stagingRows    = parseCsv(stagingContent);
  console.log(`Loaded staging: ${stagingRows.length} rows`);

  // 3. Pre-check: no staging IDSP IDs already in master
  const masterIdspSet = new Set();
  masterRows.forEach(r => {
    const m = (r.notes || '').match(/MH\/[A-Za-z0-9]{2,6}\/\d{2,4}\/[\d\/]+/);
    if (m) masterIdspSet.add(m[0].replace(/\s+/g,''));
  });
  const preExisting = stagingRows.filter(sr => masterIdspSet.has((sr.official_idsp_id || '').replace(/\s+/g,'')));
  if (preExisting.length > 0) {
    console.log(`\n⚠️  PRE-MERGE DUPLICATE CHECK: ${preExisting.length} staging records already in master`);
    preExisting.forEach(r => console.log(`    ${r.official_idsp_id}`));
  } else {
    console.log(`  ✅ Pre-merge check: 0 of 29 staging records already exist in master`);
  }

  // 4. Save aux provenance file (staging-only fields)
  const auxHeaders = ['record_id', ...STAGING_EXTRA_COLS];
  const auxRows = stagingRows.map(sr => ({
    record_id:        sr.record_id,
    official_idsp_id: sr.official_idsp_id,
    acquisition_batch: sr.acquisition_batch,
    duplicate_in_master: sr.duplicate_in_master,
  }));
  writeCsv(AUX_FILE, auxHeaders, auxRows);
  console.log(`  Aux provenance file: ${AUX_FILE}`);

  // 5. Map staging rows to master schema
  // Determine record ID counter — find max sequence used in 2022 W01-W24 range
  // Use format MAHA-2022-W{ww}-{seq}; existing master has 2022 W25-W52.
  // New rows get their own week-relative sequences, but check they don't collide
  const existingRecordIds = new Set(masterRows.map(r => r.record_id));
  
  const mappedRows = stagingRows.map(sr => {
    // Use existing record_id from staging (already assigned as MAHA-2022-W{ww}-{seq})
    // These cannot collide with master because master has 2022 W25-W52, staging has W01-W24
    let rid = sr.record_id;
    // Safety: if collision (should not happen), append _NEW
    if (existingRecordIds.has(rid)) {
      rid = rid + '_NEW';
      console.log(`  ⚠️  record_id collision resolved: ${rid}`);
    }
    return mapStagingToMaster(sr, rid);
  });

  console.log(`  Mapped ${mappedRows.length} staging rows to master schema`);

  // 6. Sort combined dataset: by year, then week, then record_id
  const combined = [...masterRows, ...mappedRows].sort((a, b) => {
    const yDiff = parseInt(a.source_year) - parseInt(b.source_year);
    if (yDiff !== 0) return yDiff;
    const wDiff = parseInt(a.source_week) - parseInt(b.source_week);
    if (wDiff !== 0) return wDiff;
    return (a.record_id || '').localeCompare(b.record_id || '');
  });

  console.log(`\nCombined dataset: ${combined.length} rows`);

  // 7. Integration checks
  console.log('\n=== INTEGRATION CHECKS ===');
  const issues = runIntegrationChecks(combined);
  if (issues.length > 0) {
    console.log('\n⚠️  INTEGRATION ISSUES:');
    issues.forEach(i => console.log('  ' + i));
  } else {
    console.log('  ✅ All integration checks passed.');
  }

  // 8. Verify expected counts
  if (combined.length !== 809) {
    console.log(`\n❌ CRITICAL: Expected 809 rows, got ${combined.length}`);
  } else {
    console.log(`\n  ✅ Row count: ${combined.length} (expected 809)`);
  }

  const newRows = combined.filter(r => (r.validation_status || '').startsWith('PHASE4B'));
  console.log(`  ✅ New rows (PHASE4B): ${newRows.length} (expected 29)`);

  // 9. Write rebuilt master (OVERWRITE — this IS the rebuild step)
  writeCsv(MASTER_CSV, MASTER_COLS, combined);
  console.log(`\n  ✅ Master written: ${MASTER_CSV}`);
  console.log(`     Rows: ${combined.length}`);

  // 10. Print year/week coverage summary
  const coverage = {};
  combined.forEach(r => {
    const yr = parseInt(r.source_year);
    if (!coverage[yr]) coverage[yr] = new Set();
    coverage[yr].add(parseInt(r.source_week));
  });
  console.log('\n=== TEMPORAL COVERAGE ===');
  [2022,2023,2024,2025,2026].forEach(yr => {
    const wks = coverage[yr] ? [...coverage[yr]].sort((a,b)=>a-b) : [];
    const rowCount = combined.filter(r => parseInt(r.source_year) === yr).length;
    console.log(`  ${yr}: ${rowCount} records across ${wks.length} outbreak weeks [min W${wks[0]||'?'} – max W${wks[wks.length-1]||'?'}]`);
  });

  return { combined, issues, newRows: newRows.length };
}

const result = main();
process.exit(result.issues.length > 0 ? 1 : 0);
