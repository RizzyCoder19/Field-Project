const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const testFiles = [
  'NCDC weekly outbreaks/2022/week27.pdf',
  'NCDC weekly outbreaks/2023/week1.pdf',
  'NCDC weekly outbreaks/2024/week10_1788951380.pdf',
  'NCDC weekly outbreaks/2024/week34_1788951861.pdf',
  'NCDC weekly outbreaks/2025/week31_1788950885.pdf',
  'NCDC weekly outbreaks/2026/week12_1788856634.pdf'
];

async function inspectSamples() {
  for (const f of testFiles) {
    console.log(`\n==============================================`);
    console.log(`FILE: ${f}`);
    console.log(`==============================================`);
    const buf = fs.readFileSync(f);
    const parser = new PDFParse({ data: buf });
    const res = await parser.getText();
    const text = res.text || '';
    
    // Find all occurrences of MH/
    const re = /MH\/[A-Z0-9]{2,6}\/\d{2,4}\//gi;
    let match;
    const indices = [];
    while ((match = re.exec(text)) !== null) {
      indices.push(match.index);
    }
    console.log(`Found ${indices.length} MH/ occurrences`);
    
    // Print first 2 occurrences
    for (let i = 0; i < Math.min(2, indices.length); i++) {
      const idx = indices[i];
      const snippet = text.slice(idx, idx + 450);
      console.log(`--- Occurrence ${i + 1} ---`);
      console.log(snippet);
    }
  }
}

inspectSamples();
