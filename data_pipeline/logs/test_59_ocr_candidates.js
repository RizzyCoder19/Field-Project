const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const rows = require('C:/Users/ADMIN/.gemini/antigravity-ide/brain/8fb3efee-dfe4-4d79-bc84-43607f9a77d9/scratch/verification_rows.json');
const baseDir = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/NCDC weekly outbreaks';

const target59 = rows.filter(r => r.maharashtra_present === 'YES' && r.maharashtra_extractable === 'NO');

async function test59() {
  console.log(`Testing all ${target59.length} files that were flagged as requiring OCR...`);
  let textReadableCount = 0;
  let mahaFoundCount = 0;
  const details = [];

  for (const item of target59) {
    const fullPath = path.join(baseDir, String(item.year), item.filename);
    try {
      const buf = fs.readFileSync(fullPath);
      const parser = new PDFParse({ data: buf });
      const res = await parser.getText();
      const text = res.text || '';
      const textLen = text.length;
      const hasMaha = /maharashtra/i.test(text);
      const mahaLines = text.split('\n').filter(l => /maharashtra/i.test(l));

      if (textLen > 500) textReadableCount++;
      if (hasMaha) mahaFoundCount++;

      details.push({
        year: item.year,
        file: item.filename,
        textLen,
        hasMaha,
        mahaLineCount: mahaLines.length,
        firstMahaLine: mahaLines[0] || null
      });
    } catch (e) {
      details.push({
        year: item.year,
        file: item.filename,
        error: e.message
      });
    }
  }

  console.log(`Results of 59 files:`);
  console.log(`Text readable (> 500 chars): ${textReadableCount} / ${target59.length}`);
  console.log(`Maharashtra text found: ${mahaFoundCount} / ${target59.length}`);

  // Summary by year
  const byYear = {};
  for (const d of details) {
    byYear[d.year] = byYear[d.year] || { total: 0, textOk: 0, mahaOk: 0 };
    byYear[d.year].total++;
    if (d.textLen > 500) byYear[d.year].textOk++;
    if (d.hasMaha) byYear[d.year].mahaOk++;
  }
  console.log('Breakdown by year:', JSON.stringify(byYear, null, 2));

  fs.writeFileSync('data_pipeline/logs/test_59_ocr_candidates.json', JSON.stringify(details, null, 2));
}

test59();
