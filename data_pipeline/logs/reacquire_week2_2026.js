// Phase 3B: Re-download 2026 Week 2 PDF from official NCDC source
// DO NOT overwrite the original invalid file.
// Save replacement to data_pipeline/validation/2026_week2_replacement.pdf
// Record result in data_pipeline/logs/reacquisition_log.csv

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const pdfParse = require('pdf-parse');

const ROOT = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project';
const ORIGINAL_FILE = path.join(ROOT, 'NCDC weekly outbreaks/2026/week2_1788856445.pdf');
const REPLACEMENT_DEST = path.join(ROOT, 'data_pipeline/validation/2026_week2_replacement.pdf');
const LOG_FILE = path.join(ROOT, 'data_pipeline/logs/reacquisition_log.csv');

// URL derived from the numeric suffix in the filename (same pattern as all other 2026 files)
const SOURCE_URL = 'https://ncdc.mohfw.gov.in/uploads/weekly_outbreaks/2026/week2_1788856445.pdf';

function sha256file(fpath) {
  const buf = fs.readFileSync(fpath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { timeout: 30000 }, res => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} from ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(res.statusCode); });
    }).on('error', err => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  const ts = new Date().toISOString();
  const origSha = sha256file(ORIGINAL_FILE);
  const origSize = fs.statSync(ORIGINAL_FILE).size;

  console.log('Original file:', ORIGINAL_FILE);
  console.log('Original size:', origSize, 'bytes');
  console.log('Original SHA256:', origSha);
  console.log('\nAttempting download from:', SOURCE_URL);

  let outcome = 'FAILED';
  let notes = '';
  let repSha = '', repSize = 0, repValid = 'NO', repPages = 0, repMaha = 'NO';

  try {
    await downloadFile(SOURCE_URL, REPLACEMENT_DEST);
    repSize = fs.statSync(REPLACEMENT_DEST).size;
    repSha = sha256file(REPLACEMENT_DEST);
    console.log('Downloaded:', repSize, 'bytes, SHA256:', repSha);

    // Validate PDF
    const buf = fs.readFileSync(REPLACEMENT_DEST);
    const header = buf.slice(0, 5).toString('ascii');
    if (!header.startsWith('%PDF')) {
      outcome = 'INVALID_PDF_HEADER';
      notes = `File header: ${header}`;
    } else {
      try {
        const parsed = await pdfParse(buf);
        repPages = parsed.numpages;
        const text = parsed.text || '';
        repMaha = text.includes('Maharashtra') ? 'YES' : 'NO';
        repValid = repPages > 0 ? 'YES' : 'NO';
        const hasIDSP = text.toLowerCase().includes('idsp') || text.toLowerCase().includes('integrated disease');
        const weekMatch = text.match(/week\s*(\d+)/i);
        const weekNum = weekMatch ? parseInt(weekMatch[1]) : null;

        console.log('Pages:', repPages);
        console.log('IDSP identity confirmed:', hasIDSP);
        console.log('Week number found in PDF:', weekNum);
        console.log('Maharashtra present:', repMaha);
        console.log('SHA matches original:', repSha === origSha ? 'YES (identical file)' : 'NO (different file)');

        if (repPages > 0 && hasIDSP) {
          outcome = 'SUCCESS_VALID';
          notes = `Pages=${repPages}; IDSP=${hasIDSP}; Week=${weekNum}; Maha=${repMaha}; SHAmatch=${repSha===origSha}`;
        } else {
          outcome = 'DOWNLOADED_BUT_CONTENT_UNCERTAIN';
          notes = `Pages=${repPages}; IDSP=${hasIDSP}; Week=${weekNum}; Maha=${repMaha}`;
        }
      } catch (parseErr) {
        outcome = 'DOWNLOADED_PARSE_FAILED';
        notes = parseErr.message;
        repValid = 'NO';
      }
    }
  } catch (dlErr) {
    outcome = 'DOWNLOAD_FAILED';
    notes = dlErr.message;
    console.error('Download error:', dlErr.message);
  }

  // Append to log
  const logLine = [
    ts, 2026, 2, 'week2_1788856445.pdf', origSha, origSize, 'INVALID',
    SOURCE_URL,
    fs.existsSync(REPLACEMENT_DEST) ? 'data_pipeline/validation/2026_week2_replacement.pdf' : '',
    repSha, repSize, repValid, repPages, repMaha,
    outcome, `"${notes}"`
  ].join(',');

  fs.appendFileSync(LOG_FILE, logLine + '\n');
  console.log('\n=== OUTCOME:', outcome, '===');
  console.log('Log entry written to:', LOG_FILE);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
