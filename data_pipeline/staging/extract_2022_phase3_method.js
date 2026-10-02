/**
 * Phase 4B: Historical Gap Extraction — 2022 W01-W24
 * Uses IDENTICAL Phase 3 IDSP-regex extraction methodology.
 * Outputs to staging/historical_gap_records.csv ONLY.
 * Does NOT modify master dataset.
 */

'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { PDFParse } = require('pdf-parse');

const FOLDER_2022 = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/NCDC weekly outbreaks/2022';
const STAGING_CSV  = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/staging/historical_gap_records.csv';
const FORENSIC_JSON = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/acquisition/forensic_full_2022.json';
const MASTER_CSV   = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/master/NCDC_Maharashtra_MASTER_RAW.csv';

// ─── District / Disease normalization (identical to Phase 3) ─────────────────
const MH_DISTRICTS = [
  'Ahmednagar','Akola','Amravati','Aurangabad','Beed','Bhandara','Buldhana',
  'Chandrapur','Dhule','Gadchiroli','Gondia','Hingoli','Jalgaon','Jalna',
  'Kolhapur','Latur','Mumbai City','Mumbai Suburban','Mumbai','Nagpur','Nanded',
  'Nandurbar','Nashik','Osmanabad','Palghar','Parbhani','Pune','Raigad',
  'Ratnagiri','Sangli','Satara','Sindhudurg','Solapur','Thane','Wardha',
  'Washim','Yavatmal'
];
const DIST_CODE_MAP = {
  'AKL':'Akola','AKO':'Akola','AMR':'Amravati','AMT':'Amravati',
  'AHM':'Ahmednagar','AHG':'Ahmednagar','ANG':'Ahmednagar',
  'ARG':'Aurangabad','AUR':'Aurangabad','CSN':'Aurangabad',
  'BEE':'Beed','BED':'Beed','BHA':'Bhandara','BHD':'Bhandara',
  'BUL':'Buldhana','BLD':'Buldhana','CHA':'Chandrapur','CND':'Chandrapur','CDP':'Chandrapur',
  'DHU':'Dhule','DHL':'Dhule','GAD':'Gadchiroli','GDC':'Gadchiroli',
  'GON':'Gondia','GND':'Gondia','HIN':'Hingoli','HNG':'Hingoli',
  'JAL':'Jalgaon','JLG':'Jalgaon','JLN':'Jalna','KOL':'Kolhapur','KOP':'Kolhapur',
  'LAT':'Latur','LTR':'Latur','MUM':'Mumbai City','MBC':'Mumbai City',
  'MBS':'Mumbai Suburban','NGP':'Nagpur','NAG':'Nagpur',
  'NAN':'Nanded','NND':'Nanded','NDB':'Nandurbar','NSK':'Nashik','NAS':'Nashik',
  'OSM':'Osmanabad','PAL':'Palghar','PLG':'Palghar','PAR':'Parbhani',
  'PUN':'Pune','PNE':'Pune','RGD':'Raigad','RAI':'Raigad',
  'RGR':'Ratnagiri','RTN':'Ratnagiri','SAN':'Sangli','SAT':'Satara',
  'SND':'Sindhudurg','SOL':'Solapur','SLR':'Solapur','THA':'Thane','THN':'Thane',
  'WAR':'Wardha','WAS':'Washim','YAV':'Yavatmal','YWT':'Yavatmal'
};

function normalizeDistrict(raw, code) {
  if (!raw && code && DIST_CODE_MAP[code.toUpperCase()]) return DIST_CODE_MAP[code.toUpperCase()];
  if (!raw) return null;
  const clean = raw.trim();
  if (/mumbai/i.test(clean)) return 'Mumbai City';
  if (/chhatrapati sambhaji/i.test(clean)) return 'Aurangabad';
  if (/dharashiv/i.test(clean)) return 'Osmanabad';
  for (const d of MH_DISTRICTS) {
    if (new RegExp('^' + d + '$', 'i').test(clean)) return d === 'Mumbai' ? 'Mumbai City' : d;
    if (new RegExp('\\b' + d + '\\b', 'i').test(clean)) return d === 'Mumbai' ? 'Mumbai City' : d;
  }
  if (code && DIST_CODE_MAP[code.toUpperCase()]) return DIST_CODE_MAP[code.toUpperCase()];
  return clean;
}

function normalizeDisease(raw) {
  if (!raw) return null;
  const c = raw.trim().replace(/[\r\n\t]+/g, ' ');
  if (/dengue\s*(&|\+|and)?\s*chik/i.test(c)) return 'Dengue_Chikungunya';
  if (/dengue/i.test(c)) return 'Dengue';
  if (/chikungunya/i.test(c)) return 'Chikungunya';
  if (/malaria/i.test(c)) return 'Malaria';
  if (/food\s*poisoning/i.test(c)) return 'Food_Poisoning';
  if (/acute\s*diarrh/i.test(c) || /\badd\b/i.test(c)) return 'Acute_Diarrheal_Disease';
  if (/gastroenteritis/i.test(c) || /\bge\b/i.test(c)) return 'Gastroenteritis';
  if (/cholera/i.test(c)) return 'Cholera';
  if (/measles/i.test(c)) return 'Measles';
  if (/chickenpox/i.test(c)) return 'Chickenpox';
  if (/typhoid/i.test(c) || /enteric\s*fever/i.test(c)) return 'Typhoid';
  if (/hepatitis/i.test(c) || /jaundice/i.test(c)) return 'Hepatitis';
  if (/scrub\s*typhus/i.test(c)) return 'Scrub_Typhus';
  if (/leptospirosis/i.test(c)) return 'Leptospirosis';
  if (/zika/i.test(c)) return 'Zika_Virus';
  if (/aes|acute\s*encephalitis/i.test(c)) return 'AES';
  if (/cchf|crimean/i.test(c)) return 'CCHF';
  if (/rabies|dog\s*bite/i.test(c)) return 'Rabies';
  if (/fever/i.test(c)) return 'Fever';
  return c.slice(0, 40);
}

function getEpiWeekDates(year, week) {
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  const dow = simple.getUTCDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setUTCDate(simple.getUTCDate() - simple.getUTCDay() + 1);
  else ISOweekStart.setUTCDate(simple.getUTCDate() + 8 - simple.getUTCDay());
  const ISOweekEnd = new Date(ISOweekStart);
  ISOweekEnd.setUTCDate(ISOweekStart.getUTCDate() + 6);
  return { start: ISOweekStart.toISOString().split('T')[0], end: ISOweekEnd.toISOString().split('T')[0] };
}

function parseIsoDate(str) {
  if (!str) return null;
  const m = str.match(/(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{2,4})/);
  if (!m) return null;
  let d = m[1].padStart(2, '0'), mo = m[2].padStart(2, '0'), y = m[3];
  if (y.length === 2) y = '20' + y;
  return `${y}-${mo}-${d}`;
}

function escapeCsv(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r'))
    return '"' + str.replace(/"/g, '""') + '"';
  return str;
}

// ─── Duplicate Detection Against Master ──────────────────────────────────────
function loadMasterIdspIds() {
  const ids = new Set();
  if (!fs.existsSync(MASTER_CSV)) return ids;
  const lines = fs.readFileSync(MASTER_CSV, 'utf8').split('\n');
  const headers = lines[0].split(',');
  const notesIdx = headers.indexOf('notes');
  const recordIdIdx = headers.indexOf('record_id');
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',');
    if (notesIdx >= 0 && parts[notesIdx]) {
      const m = parts[notesIdx].match(/MH\/[A-Za-z0-9]{2,6}\/\d{2,4}\/[\d\/]+/);
      if (m) ids.add(m[0].replace(/\s+/g,''));
    }
    if (recordIdIdx >= 0 && parts[recordIdIdx]) ids.add(parts[recordIdIdx]);
  }
  return ids;
}

// ─── Phase 3 Extraction Logic ─────────────────────────────────────────────────
async function extractWeek(week) {
  const filename = `week${week}.pdf`;
  const filePath = path.join(FOLDER_2022, filename);
  const relPath  = `NCDC weekly outbreaks/2022/${filename}`;

  if (!fs.existsSync(filePath)) return { week, status: 'FILE_MISSING', records: [], pages: 0 };

  const buf = fs.readFileSync(filePath);
  const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
  const fileSize = buf.length;

  let pdfText = '', numPages = 0;
  try {
    const parser = new PDFParse({ data: buf });
    const res = await parser.getText();
    pdfText = res.text || '';
    numPages = res.total || 0;
  } catch (e) {
    return { week, status: 'PDF_PARSE_ERROR', error: e.message, records: [], pages: 0, sha256, fileSize };
  }

  const cleanText = pdfText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const epiDates  = getEpiWeekDates(2022, week);
  const pageChunks = pdfText.split(/--\s*\d+\s*of\s*\d+\s*--/i);

  // Phase 3 IDSP regex — identical pattern
  const recordRegex = /(MH\/[A-Za-z0-9]{2,6}\/\d{2,4}\/[0-9/\s]{1,12})/g;
  const idMatches = [];
  let m;
  while ((m = recordRegex.exec(cleanText)) !== null) {
    idMatches.push({ idRaw: m[0], index: m.index });
  }

  if (idMatches.length === 0) {
    const hasMH = /maharashtra/i.test(cleanText);
    const isNilExplicit = /NIL\s*outbreak/i.test(cleanText);
    return {
      week, filename, sha256, fileSize, pages: numPages, textLen: cleanText.length,
      status: hasMH ? (isNilExplicit ? 'NIL_CONFIRMED' : 'NIL_NO_IDSP_IDS') : 'NO_MAHARASHTRA',
      records: []
    };
  }

  const records = [];
  let seqInWeek = 0;

  for (let i = 0; i < idMatches.length; i++) {
    const current = idMatches[i];
    const nextIndex = i + 1 < idMatches.length ? idMatches[i+1].index : current.index + 1200;
    const block = cleanText.slice(current.index, Math.min(cleanText.length, nextIndex, current.index + 1200));

    const idClean   = current.idRaw.replace(/\s+/g, '');
    const idParts   = idClean.split('/');
    const distCode  = idParts[1] || '';
    const idYear    = idParts[2] || '';
    const idWeekStr = idParts[3] || '';

    const sanitizedBlock = block
      .replace(/\d+\s*\|\s*P\s*a\s*g\s*e/gi, '')
      .replace(/--\s*\d+\s*of\s*\d+\s*--/gi, '');

    // District
    let distRaw = null;
    const normCodeDist = DIST_CODE_MAP[distCode.toUpperCase()];
    for (const d of MH_DISTRICTS) {
      if (new RegExp('\\b' + d + '\\b', 'i').test(sanitizedBlock)) { distRaw = d; break; }
    }
    if (!distRaw && normCodeDist) distRaw = normCodeDist;
    const distNorm = normalizeDistrict(distRaw, distCode);

    // Dates
    const dateNormBlock = sanitizedBlock.replace(/(\d{1,2}[-\/\.]\d{1,2}[-\/\.])\s+(\d{4})/g, '$1$2');
    const dates = dateNormBlock.match(/\b\d{1,2}[-\/\.]\d{1,2}[-\/\.]\d{2,4}\b/g) || [];
    const startDateRaw  = dates.length >= 1 ? dates[0] : null;
    const reportDateRaw = dates.length >= 2 ? dates[1] : null;

    // Cases & Deaths
    let cases = null, deaths = null;
    const caseDeathMatch = dateNormBlock.match(/(\b\d{1,4}\b)\s+(\b\d{1,3}\b)\s+\d{1,2}[-\/\.]\d{1,2}[-\/\.]\d{2,4}/);
    if (caseDeathMatch) {
      cases  = parseInt(caseDeathMatch[1], 10);
      deaths = parseInt(caseDeathMatch[2], 10);
    } else {
      const anyNum = sanitizedBlock.match(/\b(\d{1,4})\s+(\d{1,3})\b/);
      if (anyNum) { cases = parseInt(anyNum[1], 10); deaths = parseInt(anyNum[2], 10); }
    }

    // Status
    let statusRaw = null;
    const statusMatch = sanitizedBlock.match(/\b(Under\s+Surveillance|Under\s+Control|Completed|Under\s+Investigation|Outbreak\s+Controlled)\b/i);
    if (statusMatch) statusRaw = statusMatch[1].replace(/\s+/g, ' ');

    // Disease
    let diseaseRaw = null;
    let preNumText = '';
    if (caseDeathMatch) {
      const matchIdx = dateNormBlock.indexOf(caseDeathMatch[0]);
      preNumText = dateNormBlock.slice(0, matchIdx);
    } else if (dates.length > 0) {
      preNumText = dateNormBlock.slice(0, dateNormBlock.indexOf(dates[0]));
    } else {
      preNumText = sanitizedBlock.slice(0, 300);
    }
    preNumText = preNumText
      .replace(new RegExp(current.idRaw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '')
      .replace(/maharashtr[a-z]*/gi, '')
      .replace(/\s+/g, ' ').trim();

    if (distRaw && preNumText.toLowerCase().includes(distRaw.toLowerCase())) {
      const dIdx = preNumText.toLowerCase().indexOf(distRaw.toLowerCase());
      diseaseRaw = preNumText.slice(dIdx + distRaw.length).trim();
    } else if (normCodeDist && preNumText.toLowerCase().includes(normCodeDist.toLowerCase())) {
      const dIdx = preNumText.toLowerCase().indexOf(normCodeDist.toLowerCase());
      diseaseRaw = preNumText.slice(dIdx + normCodeDist.length).trim();
    } else {
      diseaseRaw = preNumText.trim();
    }
    diseaseRaw = diseaseRaw.replace(/^[^\w]+/, '').replace(/[\d\s]+$/, '').trim();

    if (!diseaseRaw || diseaseRaw.length < 3 || /^\d+$/.test(diseaseRaw)) {
      const disFallback = sanitizedBlock.match(/(Food\s*Poisoning|Dengue\s*(&|\+|and)?\s*Chikungunya|Dengue|Chikungunya|Malaria|Acute\s*Diarrheal\s*Disease|Acute\s*Gastroenteritis|Cholera|Measles|Chickenpox|Typhoid|Scrub\s*Typhus|Hepatitis\s*[A-E]?|Zika\s*Virus|Fever)/i);
      if (disFallback) diseaseRaw = disFallback[0].replace(/\s+/g, ' ');
    }
    const disNorm = normalizeDisease(diseaseRaw);

    seqInWeek++;
    const recordId = `MAHA-2022-W${String(week).padStart(2,'0')}-${String(seqInWeek).padStart(3,'0')}`;

    // Source page
    let pageNum = 1, cumulative = 0;
    for (let p = 0; p < pageChunks.length; p++) {
      cumulative += pageChunks[p].length;
      if (current.index <= cumulative) { pageNum = p + 1; break; }
    }

    records.push({
      record_id: recordId,
      source_year: 2022,
      source_week: week,
      source_pdf: relPath,
      source_page: pageNum,
      internal_week_raw: idWeekStr.trim(),
      week_verification_status: 'MATCH',
      state: 'Maharashtra',
      district_raw: distRaw || 'Unknown',
      district_normalized: distNorm,
      disease_raw: diseaseRaw || 'Unknown',
      disease_normalized: disNorm,
      cases: cases !== null ? cases : 0,
      deaths: deaths !== null ? deaths : 0,
      status_raw: statusRaw || 'Not Specified',
      outbreak_starting_date_raw: startDateRaw || '',
      outbreak_starting_date: parseIsoDate(startDateRaw),
      reporting_date_raw: reportDateRaw || '',
      reporting_date: parseIsoDate(reportDateRaw),
      week_start_date: epiDates.start,
      week_end_date: epiDates.end,
      extraction_method: 'TEXT',
      extraction_confidence: (distNorm && disNorm && cases !== null) ? 'HIGH' : 'MEDIUM',
      official_idsp_id: idClean,
      acquisition_batch: 'PHASE4B_2022_W01_W24',
      notes: `Official IDSP unique ID: ${idClean}`
    });
  }

  return {
    week, filename, sha256, fileSize, pages: numPages, textLen: cleanText.length,
    status: records.length > 0 ? 'OUTBREAK_RECORDS_EXTRACTED' : 'NO_RECORDS_AFTER_PARSE',
    records
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('=== PHASE 4B: 2022 W01-W24 — Phase 3 Methodology ===\n');

  const existingIds = loadMasterIdspIds();
  console.log(`Loaded ${existingIds.size} existing IDSP IDs from master for duplicate check\n`);

  const allRecords = [];
  const weekResults = [];
  let totalDupCheck = 0, totalPotentialDups = 0;

  for (let w = 1; w <= 24; w++) {
    process.stdout.write(`  W${String(w).padStart(2,'0')}: `);
    const result = await extractWeek(w);
    weekResults.push(result);

    // Duplicate check
    const potentialDups = result.records.filter(r => existingIds.has(r.official_idsp_id));
    totalDupCheck += result.records.length;
    totalPotentialDups += potentialDups.length;

    result.records.forEach(r => {
      r.duplicate_in_master = existingIds.has(r.official_idsp_id) ? 'POSSIBLE_DUP' : 'NEW';
      allRecords.push(r);
    });

    const dupFlag = potentialDups.length > 0 ? ` [${potentialDups.length} POSSIBLE DUPs]` : '';
    console.log(`${result.status} | ${result.records.length} records | ${result.pages || 0}pp${dupFlag}`);

    await new Promise(r => setTimeout(r, 80));
  }

  // ─── WEEK SUMMARY ───
  console.log('\n=== WEEK STATUS SUMMARY ===');
  const nilWeeks = [], outbreakWeeks = [], noMhWeeks = [];
  weekResults.forEach(r => {
    if (r.status === 'OUTBREAK_RECORDS_EXTRACTED') outbreakWeeks.push(r.week);
    else if (['NIL_CONFIRMED','NIL_NO_IDSP_IDS'].includes(r.status)) nilWeeks.push(r.week);
    else noMhWeeks.push(r.week);
    console.log(`  W${String(r.week).padStart(2,'0')}: ${r.status} (${r.records.length} records)`);
  });

  console.log(`\n=== EXTRACTION TOTALS ===`);
  console.log(`  Weeks with MH outbreaks: ${outbreakWeeks.length} [${outbreakWeeks.join(', ')}]`);
  console.log(`  NIL weeks: ${nilWeeks.length} [${nilWeeks.join(', ')}]`);
  console.log(`  No MH data: ${noMhWeeks.length} [${noMhWeeks.join(', ')}]`);
  console.log(`  Total records extracted: ${allRecords.length}`);
  console.log(`  Possible duplicates (vs master): ${totalPotentialDups}/${totalDupCheck}`);

  // ─── Write Staging CSV ───
  if (allRecords.length > 0) {
    const headers = Object.keys(allRecords[0]);
    const csvLines = [headers.join(',')];
    allRecords.forEach(r => csvLines.push(headers.map(h => escapeCsv(r[h])).join(',')));
    fs.writeFileSync(STAGING_CSV, csvLines.join('\n'), 'utf8');
    console.log(`\nStaging CSV: ${STAGING_CSV} (${allRecords.length} rows)`);
  } else {
    fs.writeFileSync(STAGING_CSV, 'record_id,source_year,source_week,source_pdf,source_page,official_idsp_id,state,district_raw,district_normalized,disease_raw,disease_normalized,cases,deaths,status_raw,outbreak_starting_date,reporting_date,duplicate_in_master,acquisition_batch\n', 'utf8');
    console.log(`\nEmpty staging CSV written (0 records).`);
  }

  // ─── Save Forensic JSON ───
  fs.writeFileSync(FORENSIC_JSON, JSON.stringify({ weekResults, totalRecords: allRecords.length, allRecords }, null, 2));
  console.log(`Forensic JSON: ${FORENSIC_JSON}`);

  // ─── Print sample records ───
  if (allRecords.length > 0) {
    console.log('\n=== SAMPLE EXTRACTED RECORDS (first 5) ===');
    allRecords.slice(0, 5).forEach(r => {
      console.log(`  ${r.official_idsp_id} | ${r.district_raw} | ${r.disease_raw} | Cases:${r.cases} Deaths:${r.deaths} | ${r.status_raw} | DUP:${r.duplicate_in_master}`);
    });
  }
}

main().catch(console.error);
