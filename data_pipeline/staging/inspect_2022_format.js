const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function dumpPdf(filePath, weekNum) {
  const buf = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: buf });
  const res = await parser.getText();
  const text = res.text || '';
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`WEEK ${weekNum} — ${filePath}`);
  console.log(`Pages: ${res.total}, Text length: ${text.length}`);
  console.log(`${'='.repeat(80)}`);
  
  // Find Maharashtra section
  const mhIdx = text.search(/maharashtra/i);
  if (mhIdx >= 0) {
    // Print 3000 chars around Maharashtra
    const start = Math.max(0, mhIdx - 200);
    const end = Math.min(text.length, mhIdx + 3000);
    console.log(`\n--- MAHARASHTRA SECTION (chars ${start}-${end}) ---`);
    console.log(text.substring(start, end));
  } else {
    console.log('\nNo Maharashtra found');
    // Print first 1000 chars
    console.log('\n--- FIRST 1000 CHARS ---');
    console.log(text.substring(0, 1000));
  }
}

async function main() {
  const folder = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/NCDC weekly outbreaks/2022';
  
  // Inspect weeks with MH_PRESENT_NO_ROWS
  const testWeeks = [2, 9, 13, 22, 23]; // representative
  
  for (const w of testWeeks) {
    await dumpPdf(`${folder}/week${w}.pdf`, w);
  }
}

main().catch(console.error);
