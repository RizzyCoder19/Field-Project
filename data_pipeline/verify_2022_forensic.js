const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { PDFParse } = require('pdf-parse');

async function pdfParse(data) {
  const parser = new PDFParse({ data });
  return parser.getText();
}


const FOLDER_2022 = 'c:\\Users\\ADMIN\\OneDrive\\Desktop\\Field Project\\NCDC weekly outbreaks\\2022';
const LOG_PATH = 'c:\\Users\\ADMIN\\OneDrive\\Desktop\\Field Project\\data_pipeline\\acquisition\\download_log.json';

// Load download log to get SHA256
const downloadLog = JSON.parse(fs.readFileSync(LOG_PATH, 'utf8'));
const sha256Map = {};
downloadLog.forEach(entry => {
  sha256Map[entry.filename] = entry.sha256;
});

async function verifyPdf(filePath, week, expectedSha256) {
  const filename = path.basename(filePath);
  
  // Check file exists
  if (!fs.existsSync(filePath)) {
    return { week, filename, status: 'MISSING', error: 'File not found' };
  }

  const data = fs.readFileSync(filePath);
  const fileSize = data.length;
  
  // Compute SHA256
  const sha256 = crypto.createHash('sha256').update(data).digest('hex');
  const sha256Match = expectedSha256 ? sha256 === expectedSha256 : 'N/A';
  
  // Try PDF parse
  let pageCount = 0;
  let textLength = 0;
  let maharashtraPresent = false;
  let nilStatus = false;
  let textExtractable = false;
  let error = null;
  let sampleText = '';
  
  try {
    const parsed = await pdfParse(data);
    pageCount = parsed.total || 0;
    const text = parsed.text || '';
    textLength = text.length;
    textExtractable = textLength > 100;
    maharashtraPresent = /maharashtra/i.test(text);
    nilStatus = /maharashtra.*?nil|nil.*?maharashtra/i.test(text);
    sampleText = text.substring(0, 200).replace(/\s+/g, ' ').trim();
  } catch (e) {
    error = e.message.substring(0, 100);
  }

  return {
    week,
    filename,
    fileSize,
    sha256,
    sha256Match,
    pageCount,
    textLength,
    textExtractable,
    maharashtraPresent,
    nilStatus,
    sampleText,
    status: error ? 'ERROR' : 'OK',
    error
  };
}

async function main() {
  console.log('=== FORENSIC VERIFICATION: 2022 W01-W24 ===\n');
  
  const results = [];
  let okCount = 0, maharashtraCount = 0, nilCount = 0, errorCount = 0;

  for (let w = 1; w <= 24; w++) {
    const filename = `week${w}.pdf`;
    const filePath = path.join(FOLDER_2022, filename);
    const sha256Expected = sha256Map[filename];
    
    process.stdout.write(`  W${String(w).padStart(2,'0')}: `);
    const result = await verifyPdf(filePath, w, sha256Expected);
    results.push(result);
    
    if (result.status === 'OK') {
      okCount++;
      if (result.maharashtraPresent) maharashtraCount++;
      if (result.nilStatus) nilCount++;
      const mhFlag = result.maharashtraPresent ? (result.nilStatus ? '[MH-NIL]' : '[MH-OUTBREAK]') : '[NO-MH]';
      console.log(`OK | ${(result.fileSize/1024).toFixed(0)}KB | ${result.pageCount}pp | ${result.textLength}chars | SHA256_OK:${result.sha256Match} | ${mhFlag}`);
    } else {
      errorCount++;
      console.log(`ERROR: ${result.error}`);
    }
  }

  console.log(`\nSUMMARY:`);
  console.log(`  Total files verified: ${results.length}`);
  console.log(`  OK: ${okCount} | Errors: ${errorCount}`);
  console.log(`  Maharashtra outbreak weeks: ${maharashtraCount}`);
  console.log(`  NIL weeks: ${nilCount}`);
  console.log(`  Non-Maharashtra weeks: ${results.length - maharashtraCount}`);

  // Save forensic report
  const reportPath = 'c:\\Users\\ADMIN\\OneDrive\\Desktop\\Field Project\\data_pipeline\\acquisition\\forensic_2022_verification.json';
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nForensic data saved: ${reportPath}`);
  
  return results;
}

main().catch(console.error);
