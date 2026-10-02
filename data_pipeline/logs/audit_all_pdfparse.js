const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const baseDir = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/NCDC weekly outbreaks';
const years = ['2022', '2023', '2024', '2025', '2026'];

async function run() {
  const results = [];
  let totalFiles = 0;

  for (const year of years) {
    const yearDir = path.join(baseDir, year);
    if (!fs.existsSync(yearDir)) continue;
    const files = fs.readdirSync(yearDir).filter(f => f.endsWith('.pdf'));

    for (const f of files) {
      totalFiles++;
      const fullPath = path.join(yearDir, f);
      const stats = fs.statSync(fullPath);
      let textLength = 0;
      let totalPages = 0;
      let hasMaharashtra = false;
      let error = null;

      try {
        const buf = fs.readFileSync(fullPath);
        const parser = new PDFParse({ data: buf });
        const res = await parser.getText();
        textLength = res.text ? res.text.length : 0;
        totalPages = res.total || 0;
        hasMaharashtra = /maharashtra/i.test(res.text || '');
      } catch (e) {
        error = e.message;
      }

      results.push({
        year,
        file: f,
        size: stats.size,
        totalPages,
        textLength,
        hasMaharashtra,
        error
      });
    }
  }

  console.log('Total files checked:', totalFiles);
  const withText = results.filter(r => r.textLength > 500);
  const withMaha = results.filter(r => r.hasMaharashtra);
  const errors = results.filter(r => r.error);
  console.log('Files with text > 500 chars:', withText.length);
  console.log('Files with Maharashtra found:', withMaha.length);
  console.log('Errors:', errors.length);

  // Group by year
  for (const y of years) {
    const yFiles = results.filter(r => r.year === y);
    const yText = yFiles.filter(r => r.textLength > 500);
    const yMaha = yFiles.filter(r => r.hasMaharashtra);
    console.log(`Year ${y}: ${yFiles.length} files | ${yText.length} text-readable | ${yMaha.length} has Maharashtra`);
  }

  fs.writeFileSync('data_pipeline/logs/pdfparse_audit_all.json', JSON.stringify(results, null, 2));
}

run();
