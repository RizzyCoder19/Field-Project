/**
 * Phase 4B: Historical Gap Extraction
 * Extract Maharashtra records from newly acquired 2022 W01-W24 PDFs
 * Using the same Phase 3 extraction methodology (read-only, no master modification)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { PDFParse } = require('pdf-parse');

const FOLDER_2022 = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/NCDC weekly outbreaks/2022';
const MASTER_CSV = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/master/NCDC_Maharashtra_MASTER_RAW.csv';
const STAGING_PATH = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/staging/historical_gap_records.csv';

// ─── District Normalization ───────────────────────────────────────────────────
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

function isMaharashtraDistrict(text) {
  if (!text) return false;
  if (/maharashtra/i.test(text)) return true;
  for (const d of MH_DISTRICTS) {
    if (new RegExp('\\b' + d + '\\b', 'i').test(text)) return true;
  }
  for (const code of Object.keys(DIST_CODE_MAP)) {
    if (new RegExp('\\b' + code + '\\b').test(text)) return true;
  }
  return false;
}

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
  if (/anthrax/i.test(c)) return 'Anthrax';
  if (/plague/i.test(c)) return 'Plague';
  if (/ebola|hemorrhagic/i.test(c)) return 'VHF';
  return c.replace(/\s+/g, ' ').trim();
}

// ─── PDF Text Extraction ──────────────────────────────────────────────────────
async function extractText(filePath) {
  const buf = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: buf });
  const res = await parser.getText();
  return { text: res.text || '', pages: res.total || 0, sha256: crypto.createHash('sha256').update(buf).digest('hex') };
}

// ─── Row Parser (Phase 3 methodology) ────────────────────────────────────────
function parseMaharashtraRows(text, year, week, pdfFilename, pdfPage) {
  const rows = [];
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  let inMaharashtraSection = false;
  let currentState = '';
  let rowBuffer = [];
  let rowIdx = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect Maharashtra section
    if (/^maharashtra\s*$/i.test(line)) {
      inMaharashtraSection = true;
      currentState = 'Maharashtra';
      continue;
    }
    
    // Detect another state header (exit Maharashtra)
    if (inMaharashtraSection && /^[A-Z][a-z]+ (?:Pradesh|Nadu|State|Rajasthan|Odisha|Bihar|Gujarat|Kerala|Karnataka|Punjab|Haryana|Bengal|Uttarakhand|Himachal|Jharkhand|Chhattisgarh|Assam|Goa|Manipur|Meghalaya|Mizoram|Nagaland|Sikkim|Tripura|Telangana|Andhra)\s*$/i.test(line)) {
      inMaharashtraSection = false;
      continue;
    }
    
    if (!inMaharashtraSection) continue;
    
    // Try to parse data row: Sl. No. | District | Disease | Cases | Deaths | Date | Date | Status
    // Pattern: starts with a number or has district name
    const rowMatch = line.match(/^(\d+)\s+(.+)/);
    if (rowMatch) {
      rowBuffer.push(line);
    } else if (rowBuffer.length > 0) {
      // continuation line for multi-line disease name
      rowBuffer[rowBuffer.length - 1] += ' ' + line;
    }
    
    // Try to parse accumulated row buffer
    if (rowBuffer.length > 0) {
      const fullRow = rowBuffer.join(' ');
      
      // Pattern: number district disease cases deaths date date status
      const parsed = parseDataRow(fullRow, rowIdx, year, week, pdfFilename, pdfPage || 1);
      if (parsed && isMaharashtraDistrict(parsed.district_raw)) {
        rows.push(parsed);
        rowIdx++;
        rowBuffer = [];
      } else if (parsed) {
        // Not Maharashtra - clear buffer
        rowBuffer = [];
      }
    }
  }
  
  return rows;
}

function parseDataRow(line, rowIdx, year, week, pdfFilename, page) {
  // Typical format: 1 Pune Dengue 120 2 01/01/2022 07/01/2022 Closed
  // or: 1 MUM/Nashik/etc.
  const pat = /^(\d+)\s+([A-Z][A-Za-z\s\/\-\.]+?)\s+([A-Za-z][A-Za-z\s&\/\-\.()]+?)\s+(\d+)\s+(\d+)\s+([\d\/\-\.]+)\s+([\d\/\-\.]+)\s+(Active|Closed|Open|Completed|Under\s*Investigation|Terminated|Pending|New|Ongoing)/i;
  const m = line.match(pat);
  if (!m) return null;
  
  const slNo = m[1];
  const district = m[2].trim();
  const disease = m[3].trim();
  const cases = m[4];
  const deaths = m[5];
  const startDate = m[6];
  const reportDate = m[7];
  const status = m[8];
  
  // Generate IDSP-style ID
  const idspId = `MH-${year}-W${String(week).padStart(2,'0')}-${String(rowIdx+1).padStart(3,'0')}`;
  
  return {
    record_id: idspId,
    source_year: year,
    source_week: week,
    source_pdf: `NCDC weekly outbreaks/2022/${pdfFilename}`,
    source_page: page,
    official_idsp_id: idspId,
    year,
    week,
    district_raw: district,
    disease_raw: disease,
    disease_normalized: normalizeDisease(disease),
    district_normalized: normalizeDistrict(district, null),
    cases: parseInt(cases) || 0,
    deaths: parseInt(deaths) || 0,
    outbreak_start_date: startDate,
    reporting_date: reportDate,
    status,
    is_new_acquisition: true,
    acquisition_batch: 'PHASE4B_2022_W01_W24'
  };
}

// ─── Main Extraction Logic ────────────────────────────────────────────────────
async function main() {
  console.log('=== PHASE 4B: Historical Gap Extraction — 2022 W01-W24 ===\n');
  
  const allRows = [];
  const weekSummary = [];
  
  for (let w = 1; w <= 24; w++) {
    const filename = `week${w}.pdf`;
    const filePath = path.join(FOLDER_2022, filename);
    
    process.stdout.write(`  W${String(w).padStart(2,'0')}: `);
    
    if (!fs.existsSync(filePath)) {
      console.log('MISSING FILE');
      weekSummary.push({ week: w, status: 'MISSING', rows: 0 });
      continue;
    }
    
    try {
      const { text, pages, sha256 } = await extractText(filePath);
      
      const hasMH = /maharashtra/i.test(text);
      
      if (!hasMH) {
        console.log(`NO-MH (${pages}pp, ${text.length}chars)`);
        weekSummary.push({ week: w, status: 'NIL_MAHARASHTRA', rows: 0, pages, textLen: text.length });
        continue;
      }
      
      // Extract rows using Phase 3 methodology
      const rows = parseMaharashtraRows(text, 2022, w, filename, 1);
      
      if (rows.length === 0) {
        // Maharashtra mentioned but may be in NIL context
        const nilMatch = /maharashtra.*?nil|nil.*?maharashtra/i.test(text);
        const status = nilMatch ? 'NIL_CONFIRMED' : 'MH_PRESENT_NO_ROWS';
        console.log(`${status} (${pages}pp, ${text.length}chars)`);
        weekSummary.push({ week: w, status, rows: 0, pages, textLen: text.length });
      } else {
        console.log(`${rows.length} rows extracted (${pages}pp)`);
        rows.forEach(r => allRows.push(r));
        weekSummary.push({ week: w, status: 'OUTBREAK_ROWS_EXTRACTED', rows: rows.length, pages, textLen: text.length });
      }
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
      weekSummary.push({ week: w, status: 'ERROR', rows: 0, error: e.message });
    }
    
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log('\n=== WEEK SUMMARY ===');
  weekSummary.forEach(s => {
    console.log(`  W${String(s.week).padStart(2,'0')}: ${s.status}${s.rows > 0 ? ` (${s.rows} rows)` : ''}`);
  });
  
  console.log(`\n=== TOTALS ===`);
  const outbreak = weekSummary.filter(s => s.rows > 0).length;
  const nilMH = weekSummary.filter(s => s.status === 'NIL_MAHARASHTRA' || s.status === 'NIL_CONFIRMED').length;
  const noMH = weekSummary.filter(s => s.status === 'MH_PRESENT_NO_ROWS').length;
  console.log(`  Weeks with MH outbreak rows: ${outbreak}`);
  console.log(`  NIL Maharashtra weeks: ${nilMH}`);
  console.log(`  MH present but no structured rows: ${noMH}`);
  console.log(`  Total extracted rows: ${allRows.length}`);
  
  // Write staging CSV
  if (allRows.length > 0) {
    const cols = Object.keys(allRows[0]);
    const csvLines = [cols.join(',')];
    allRows.forEach(row => {
      csvLines.push(cols.map(c => {
        const v = String(row[c] || '').replace(/"/g, '""');
        return v.includes(',') || v.includes('"') || v.includes('\n') ? `"${v}"` : v;
      }).join(','));
    });
    fs.writeFileSync(STAGING_PATH, csvLines.join('\n'), 'utf8');
    console.log(`\nStaging CSV written: ${STAGING_PATH}`);
  } else {
    console.log('\nNo rows to write to staging CSV.');
    // Write empty with headers for documentation
    const cols = ['record_id','source_year','source_week','source_pdf','source_page','official_idsp_id',
                  'year','week','district_raw','disease_raw','disease_normalized','district_normalized',
                  'cases','deaths','outbreak_start_date','reporting_date','status','is_new_acquisition','acquisition_batch'];
    fs.writeFileSync(STAGING_PATH, cols.join(',') + '\n', 'utf8');
    console.log(`Empty staging CSV written: ${STAGING_PATH}`);
  }
  
  // Save summary JSON
  const summaryPath = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/data_pipeline/acquisition/extraction_summary_2022.json';
  fs.writeFileSync(summaryPath, JSON.stringify({ weekSummary, totalRows: allRows.length, rows: allRows }, null, 2));
  console.log(`Extraction summary: ${summaryPath}`);
}

main().catch(console.error);
