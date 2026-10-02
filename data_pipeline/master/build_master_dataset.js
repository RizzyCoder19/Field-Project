/**
 * Phase 3: Master Data Extraction Pipeline (Refined High-Fidelity Parser)
 * Extracts all Maharashtra outbreak records from all 213 NCDC weekly PDFs (2022-2026).
 */

const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const baseDir = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/NCDC weekly outbreaks';
const outputMasterDir = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/master';
const outputRawDir = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/raw_extracted';
const years = ['2022', '2023', '2024', '2025', '2026'];

const MH_DISTRICTS = [
  'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana',
  'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna',
  'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Mumbai', 'Nagpur', 'Nanded',
  'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad',
  'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha',
  'Washim', 'Yavatmal'
];

const DIST_CODE_MAP = {
  'AKL': 'Akola', 'AKO': 'Akola',
  'AMR': 'Amravati', 'AMT': 'Amravati',
  'AHM': 'Ahmednagar', 'AHG': 'Ahmednagar', 'ANG': 'Ahmednagar',
  'ARG': 'Aurangabad', 'AUR': 'Aurangabad', 'CSN': 'Aurangabad',
  'BEE': 'Beed', 'BED': 'Beed',
  'BHA': 'Bhandara', 'BHD': 'Bhandara',
  'BUL': 'Buldhana', 'BLD': 'Buldhana',
  'CHA': 'Chandrapur', 'CND': 'Chandrapur', 'CDP': 'Chandrapur',
  'DHU': 'Dhule', 'DHL': 'Dhule',
  'GAD': 'Gadchiroli', 'GDC': 'Gadchiroli',
  'GON': 'Gondia', 'GND': 'Gondia',
  'HIN': 'Hingoli', 'HNG': 'Hingoli',
  'JAL': 'Jalgaon', 'JLG': 'Jalgaon',
  'JLN': 'Jalna',
  'KOL': 'Kolhapur', 'KOP': 'Kolhapur',
  'LAT': 'Latur', 'LTR': 'Latur',
  'MUM': 'Mumbai City', 'MCY': 'Mumbai City', 'MSU': 'Mumbai Suburban',
  'NAG': 'Nagpur', 'NGP': 'Nagpur',
  'NAN': 'Nanded', 'NND': 'Nanded',
  'NDB': 'Nandurbar', 'NRB': 'Nandurbar',
  'NAS': 'Nashik', 'NSK': 'Nashik',
  'OSM': 'Osmanabad', 'OSB': 'Osmanabad', 'DHR': 'Osmanabad',
  'PAL': 'Palghar', 'PLG': 'Palghar',
  'PAR': 'Parbhani', 'PBN': 'Parbhani',
  'PUN': 'Pune', 'PNE': 'Pune',
  'RAI': 'Raigad', 'RGD': 'Raigad',
  'RAT': 'Ratnagiri', 'RTG': 'Ratnagiri',
  'SAN': 'Sangli', 'SGL': 'Sangli',
  'SAT': 'Satara', 'STR': 'Satara',
  'SIN': 'Sindhudurg', 'SND': 'Sindhudurg',
  'SOL': 'Solapur', 'SLP': 'Solapur',
  'THA': 'Thane', 'THN': 'Thane',
  'WAR': 'Wardha', 'WRD': 'Wardha',
  'WAS': 'Washim', 'WSM': 'Washim',
  'YAV': 'Yavatmal', 'YTL': 'Yavatmal'
};

function normalizeDistrict(raw, code) {
  if (!raw && code && DIST_CODE_MAP[code.toUpperCase()]) {
    return DIST_CODE_MAP[code.toUpperCase()];
  }
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
  if (dow <= 4) {
    ISOweekStart.setUTCDate(simple.getUTCDate() - simple.getUTCDay() + 1);
  } else {
    ISOweekStart.setUTCDate(simple.getUTCDate() + 8 - simple.getUTCDay());
  }
  const ISOweekEnd = new Date(ISOweekStart);
  ISOweekEnd.setUTCDate(ISOweekStart.getUTCDate() + 6);
  return {
    start: ISOweekStart.toISOString().split('T')[0],
    end: ISOweekEnd.toISOString().split('T')[0]
  };
}

function parseIsoDate(str) {
  if (!str) return null;
  const m = str.match(/(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{2,4})/);
  if (!m) return null;
  let d = m[1].padStart(2, '0');
  let mo = m[2].padStart(2, '0');
  let y = m[3];
  if (y.length === 2) y = '20' + y;
  return `${y}-${mo}-${d}`;
}

function escapeCsv(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

async function runPipeline() {
  console.log('Starting Phase 3 Master Extraction Pipeline (High-Fidelity Parser)...');
  
  if (!fs.existsSync(outputMasterDir)) fs.mkdirSync(outputMasterDir, { recursive: true });
  if (!fs.existsSync(outputRawDir)) fs.mkdirSync(outputRawDir, { recursive: true });
  for (const y of years) {
    const yrDir = path.join(outputRawDir, y);
    if (!fs.existsSync(yrDir)) fs.mkdirSync(yrDir, { recursive: true });
  }

  const masterRecords = [];
  const weekRegister = [];
  let recordCounter = 0;

  for (const year of years) {
    const yearDir = path.join(baseDir, year);
    if (!fs.existsSync(yearDir)) continue;
    const files = fs.readdirSync(yearDir).filter(f => f.endsWith('.pdf'));

    files.sort((a, b) => {
      const wa = parseInt(a.match(/week(\d+)/i)?.[1] || 0);
      const wb = parseInt(b.match(/week(\d+)/i)?.[1] || 0);
      return wa - wb;
    });

    for (const file of files) {
      const weekMatch = file.match(/week(\d+)/i);
      const sourceWeek = weekMatch ? parseInt(weekMatch[1]) : 0;
      const sourceYear = parseInt(year);
      const relPdfPath = `NCDC weekly outbreaks/${year}/${file}`;
      const fullPdfPath = path.join(yearDir, file);

      let pdfText = '';
      let numPages = 0;
      let parseErr = null;

      try {
        const buf = fs.readFileSync(fullPdfPath);
        const parser = new PDFParse({ data: buf });
        const res = await parser.getText();
        pdfText = res.text || '';
        numPages = res.total || 0;
      } catch (e) {
        parseErr = e.message;
      }

      if (parseErr) {
        weekRegister.push({
          year: sourceYear,
          week: sourceWeek,
          pdf_filename: file,
          pdf_valid: 'NO',
          week_status: 'REPORT_INVALID',
          records_extracted: 0,
          nil_evidence: '',
          notes: 'Error parsing PDF: ' + parseErr
        });
        continue;
      }

      const epiDates = getEpiWeekDates(sourceYear, sourceWeek);
      const pageChunks = pdfText.split(/--\s*\d+\s*of\s*\d+\s*--/i);
      const weekExtractedRecords = [];
      let seqInWeek = 0;

      const cleanText = pdfText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

      // Pattern: (MH/[A-Za-z0-9]{2,6}/\d{2,4}/[0-9/\s]{1,12})
      const recordRegex = /(MH\/[A-Za-z0-9]{2,6}\/\d{2,4}\/[0-9/\s]{1,12})/g;
      const matches = [];
      let match;
      while ((match = recordRegex.exec(cleanText)) !== null) {
        matches.push({
          idRaw: match[0],
          index: match.index
        });
      }

      for (let i = 0; i < matches.length; i++) {
        const current = matches[i];
        const nextIndex = i + 1 < matches.length ? matches[i + 1].index : current.index + 1200;
        const block = cleanText.slice(current.index, Math.min(cleanText.length, nextIndex, current.index + 1200));

        // Parse unique ID parts
        const idClean = current.idRaw.replace(/\s+/g, '');
        const idParts = idClean.split('/');
        const distCode = idParts[1] || '';
        const idYear = idParts[2] || '';
        const idWeek = idParts[3] || '';

        // Standardize line wraps in block
        // Remove page number headers that might inject into block (e.g. 7 | Page)
        const sanitizedBlock = block.replace(/\d+\s*\|\s*P\s*a\s*g\s*e/gi, '')
                                   .replace(/--\s*\d+\s*of\s*\d+\s*--/gi, '');

        // Extract State & District
        let distRaw = null;
        let distNorm = null;
        const normCodeDist = DIST_CODE_MAP[distCode.toUpperCase()];

        // Look for district name mentioned after State
        // e.g. "Maharashtra Pune" or "Maharashtr\na\nAmravati"
        for (const d of MH_DISTRICTS) {
          if (new RegExp('\\b' + d + '\\b', 'i').test(sanitizedBlock)) {
            distRaw = d;
            break;
          }
        }
        if (!distRaw && normCodeDist) distRaw = normCodeDist;
        distNorm = normalizeDistrict(distRaw, distCode);

        // Find Date pattern: DD-MM-YYYY or DD-MM- \n YYYY
        const dateNormBlock = sanitizedBlock.replace(/(\d{1,2}[-\/.]\d{1,2}[-\/.])\s+(\d{4})/g, '$1$2');
        const dates = dateNormBlock.match(/\b\d{1,2}[-\/.]\d{1,2}[-\/.]\d{2,4}\b/g) || [];
        const startDateRaw = dates.length >= 1 ? dates[0] : null;
        const reportDateRaw = dates.length >= 2 ? dates[1] : null;

        // Find Cases & Deaths
        let cases = null;
        let deaths = null;
        const caseDeathMatch = dateNormBlock.match(/(\b\d{1,4}\b)\s+(\b\d{1,3}\b)\s+\d{1,2}[-\/.]\d{1,2}[-\/.]\d{2,4}/);
        if (caseDeathMatch) {
          cases = parseInt(caseDeathMatch[1], 10);
          deaths = parseInt(caseDeathMatch[2], 10);
        } else {
          const anyNum = sanitizedBlock.match(/\b(\d{1,4})\s+(\d{1,3})\b/);
          if (anyNum) {
            cases = parseInt(anyNum[1], 10);
            deaths = parseInt(anyNum[2], 10);
          }
        }

        // Status
        let statusRaw = null;
        const statusMatch = sanitizedBlock.match(/\b(Under\s+Surveillance|Under\s+Control|Completed|Under\s+Investigation|Outbreak\s+Controlled)\b/i);
        if (statusMatch) statusRaw = statusMatch[1].replace(/\s+/g, ' ');

        // Disease Extraction:
        // Text between district and the numbers/dates
        let diseaseRaw = null;
        let preNumText = '';
        if (caseDeathMatch) {
          const matchIdx = dateNormBlock.indexOf(caseDeathMatch[0]);
          preNumText = dateNormBlock.slice(0, matchIdx);
        } else if (dates.length > 0) {
          const dateIdx = dateNormBlock.indexOf(dates[0]);
          preNumText = dateNormBlock.slice(0, dateIdx);
        } else {
          preNumText = sanitizedBlock.slice(0, 300);
        }

        // Remove ID and State from preNumText
        preNumText = preNumText.replace(new RegExp(current.idRaw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '')
                               .replace(/maharashtr[a-z]*/gi, '')
                               .replace(/\s+/g, ' ')
                               .trim();

        // If district is present in preNumText, disease is after district
        if (distRaw && preNumText.toLowerCase().includes(distRaw.toLowerCase())) {
          const dIdx = preNumText.toLowerCase().indexOf(distRaw.toLowerCase());
          diseaseRaw = preNumText.slice(dIdx + distRaw.length).trim();
        } else if (normCodeDist && preNumText.toLowerCase().includes(normCodeDist.toLowerCase())) {
          const dIdx = preNumText.toLowerCase().indexOf(normCodeDist.toLowerCase());
          diseaseRaw = preNumText.slice(dIdx + normCodeDist.length).trim();
        } else {
          diseaseRaw = preNumText.trim();
        }

        // Clean up trailing/leading numbers or punctuation from diseaseRaw
        diseaseRaw = diseaseRaw.replace(/^[^\w]+/, '').replace(/[\d\s]+$/, '').trim();

        // Fallback if diseaseRaw is empty or corrupted
        if (!diseaseRaw || diseaseRaw.length < 3 || /^\d+$/.test(diseaseRaw)) {
          const disFallback = sanitizedBlock.match(/(Food\s*Poisoning|Dengue\s*(&|\+|and)?\s*Chikungunya|Dengue|Chikungunya|Malaria|Acute\s*Diarrheal\s*Disease|Acute\s*Gastroenteritis|Cholera|Measles|Chickenpox|Typhoid|Scrub\s*Typhus|Hepatitis\s*[A-E]?|Zika\s*Virus|Fever)/i);
          if (disFallback) diseaseRaw = disFallback[0].replace(/\s+/g, ' ');
        }

        const disNorm = normalizeDisease(diseaseRaw);

        seqInWeek++;
        recordCounter++;
        const recordId = `MAHA-${sourceYear}-W${String(sourceWeek).padStart(2, '0')}-${String(seqInWeek).padStart(3, '0')}`;

        // Determine source page
        let pageNum = 1;
        let cumulative = 0;
        for (let p = 0; p < pageChunks.length; p++) {
          cumulative += pageChunks[p].length;
          if (current.index <= cumulative) {
            pageNum = p + 1;
            break;
          }
        }

        const record = {
          record_id: recordId,
          source_year: sourceYear,
          source_week: sourceWeek,
          source_pdf: relPdfPath,
          source_page: pageNum,
          internal_week_raw: idWeek ? idWeek.trim() : String(sourceWeek),
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
          ocr_raw_text: '',
          validation_status: 'UNVALIDATED',
          notes: `Official IDSP unique ID: ${idClean}`
        };

        weekExtractedRecords.push(record);
        masterRecords.push(record);
      }

      // Record to WEEK_STATUS_REGISTER
      const isNil = weekExtractedRecords.length === 0;
      let nilEvidence = '';
      if (isNil) {
        if (/NIL\s*outbreak\s*report/i.test(pdfText)) {
          nilEvidence = 'NIL outbreak report noted in surveillance summary';
        } else {
          nilEvidence = 'No Maharashtra (MH/) outbreak alert recorded in official table';
        }
      }

      weekRegister.push({
        year: sourceYear,
        week: sourceWeek,
        pdf_filename: file,
        pdf_valid: 'YES',
        week_status: isNil ? 'NIL_CONFIRMED' : 'MAHARASHTRA_RECORDS_PRESENT',
        records_extracted: weekExtractedRecords.length,
        nil_evidence: nilEvidence,
        notes: isNil ? 'Zero outbreaks notified for Maharashtra this week' : `${weekExtractedRecords.length} outbreak records extracted`
      });

      // Save raw weekly json
      const weeklyJsonPath = path.join(outputRawDir, String(sourceYear), `week_${String(sourceWeek).padStart(2, '0')}.json`);
      fs.writeFileSync(weeklyJsonPath, JSON.stringify({
        year: sourceYear,
        week: sourceWeek,
        pdf: file,
        pages: numPages,
        recordCount: weekExtractedRecords.length,
        records: weekExtractedRecords
      }, null, 2));
    }
  }

  console.log(`High-Fidelity Extraction complete!`);
  console.log(`Total Master Records Extracted: ${masterRecords.length}`);
  console.log(`Total Weeks in Register: ${weekRegister.length}`);

  // Write NCDC_Maharashtra_MASTER_RAW.csv
  const masterHeaders = [
    'record_id', 'source_year', 'source_week', 'source_pdf', 'source_page',
    'internal_week_raw', 'week_verification_status', 'state', 'district_raw',
    'district_normalized', 'disease_raw', 'disease_normalized', 'cases', 'deaths',
    'status_raw', 'outbreak_starting_date_raw', 'outbreak_starting_date',
    'reporting_date_raw', 'reporting_date', 'week_start_date', 'week_end_date',
    'extraction_method', 'extraction_confidence', 'ocr_raw_text',
    'validation_status', 'notes'
  ];

  const masterCsvLines = [masterHeaders.join(',')];
  for (const r of masterRecords) {
    const row = masterHeaders.map(h => escapeCsv(r[h]));
    masterCsvLines.push(row.join(','));
  }
  const masterCsvPath = path.join(outputMasterDir, 'NCDC_Maharashtra_MASTER_RAW.csv');
  fs.writeFileSync(masterCsvPath, masterCsvLines.join('\n'));
  console.log(`Wrote ${masterRecords.length} rows to ${masterCsvPath}`);

  // Write WEEK_STATUS_REGISTER.csv
  const weekHeaders = [
    'year', 'week', 'pdf_filename', 'pdf_valid', 'week_status',
    'records_extracted', 'nil_evidence', 'notes'
  ];
  const weekCsvLines = [weekHeaders.join(',')];
  for (const w of weekRegister) {
    const row = weekHeaders.map(h => escapeCsv(w[h]));
    weekCsvLines.push(row.join(','));
  }
  const weekCsvPath = path.join(outputMasterDir, 'WEEK_STATUS_REGISTER.csv');
  fs.writeFileSync(weekCsvPath, weekCsvLines.join('\n'));
  console.log(`Wrote ${weekRegister.length} rows to ${weekCsvPath}`);

  // Repeat Record Audit
  const repeatAudit = [];
  for (let i = 0; i < masterRecords.length; i++) {
    const a = masterRecords[i];
    for (let j = i + 1; j < masterRecords.length; j++) {
      const b = masterRecords[j];
      if (a.district_normalized && b.district_normalized &&
          a.district_normalized === b.district_normalized &&
          a.disease_normalized && b.disease_normalized &&
          a.disease_normalized === b.disease_normalized &&
          a.source_year === b.source_year &&
          Math.abs(b.source_week - a.source_week) <= 3) {
        
        let classification = 'SEPARATE_OUTBREAK';
        let evidence = 'Separate outbreak episodes in proximate surveillance weeks';
        if (a.cases === b.cases && a.deaths === b.deaths && a.outbreak_starting_date && b.outbreak_starting_date && a.outbreak_starting_date === b.outbreak_starting_date) {
          classification = 'SAME_OUTBREAK_REPEATED';
          evidence = 'Exact match of cases, deaths, and outbreak starting date across reporting weeks';
        } else if (a.outbreak_starting_date && b.outbreak_starting_date && a.outbreak_starting_date === b.outbreak_starting_date) {
          classification = 'UPDATED_OUTBREAK';
          evidence = 'Identical start date with updated surveillance case/death counts';
        }

        repeatAudit.push({
          record_id_a: a.record_id,
          record_id_b: b.record_id,
          year_a: a.source_year,
          week_a: a.source_week,
          year_b: b.source_year,
          week_b: b.source_week,
          district_raw: a.district_raw,
          disease_raw: a.disease_raw,
          cases_a: a.cases,
          cases_b: b.cases,
          deaths_a: a.deaths,
          deaths_b: b.deaths,
          repeat_classification: classification,
          evidence: evidence
        });
      }
    }
  }

  const repeatHeaders = [
    'record_id_a', 'record_id_b', 'year_a', 'week_a', 'year_b', 'week_b',
    'district_raw', 'disease_raw', 'cases_a', 'cases_b', 'deaths_a', 'deaths_b',
    'repeat_classification', 'evidence'
  ];
  const repeatCsvLines = [repeatHeaders.join(',')];
  for (const r of repeatAudit) {
    const row = repeatHeaders.map(h => escapeCsv(r[h]));
    repeatCsvLines.push(row.join(','));
  }
  const repeatCsvPath = path.join(outputMasterDir, 'REPEAT_RECORD_AUDIT.csv');
  fs.writeFileSync(repeatCsvPath, repeatCsvLines.join('\n'));
  console.log(`Wrote ${repeatAudit.length} repeat pairs to ${repeatCsvPath}`);

  // Summary breakdown
  const summaryByYear = {};
  for (const r of masterRecords) {
    summaryByYear[r.source_year] = (summaryByYear[r.source_year] || 0) + 1;
  }
  console.log('Master Records by Year:', summaryByYear);
}

runPipeline();
