const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const fpath = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/NCDC weekly outbreaks/2026/week2_1788856445.pdf';
const buf = fs.readFileSync(fpath);

console.log('File size:', buf.length);
console.log('Header bytes:', buf.slice(0, 8).toString('ascii'));

async function test() {
  try {
    const parser = new PDFParse({ data: buf });
    const res = await parser.getText();
    console.log('Success! Total pages:', res.total);
    console.log('Text length:', res.text.length);
    console.log('Sample text:', res.text.slice(0, 300));
  } catch (err) {
    console.error('PDFParse error:', err.message);
  }
}

test();
