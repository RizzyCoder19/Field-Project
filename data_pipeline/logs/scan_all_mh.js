const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const baseDir = 'c:/Users/ADMIN/OneDrive/Desktop/Field Project/NCDC weekly outbreaks';
const years = ['2022', '2023', '2024', '2025', '2026'];

// Regex for IDSP Unique IDs for Maharashtra
// e.g. MH/CND/2022/27/522 or MH/AMR/2025/31/1424 or MH/AKL/2023/01/10
const mhIdRegex = /MH\/[A-Z0-9]{2,5}\/\d{4}\/[\s\S]{1,15}?\b/gi;

async function scanAll() {
  const summary = [];
  let totalMhRecords = 0;

  for (const year of years) {
    const yearDir = path.join(baseDir, year);
    if (!fs.existsSync(yearDir)) continue;
    const files = fs.readdirSync(yearDir).filter(f => f.endsWith('.pdf'));

    // Sort files by week number
    files.sort((a, b) => {
      const wa = parseInt(a.match(/week(\d+)/i)?.[1] || 0);
      const wb = parseInt(b.match(/week(\d+)/i)?.[1] || 0);
      return wa - wb;
    });

    for (const f of files) {
      const fullPath = path.join(yearDir, f);
      const weekMatch = f.match(/week(\d+)/i);
      const weekNum = weekMatch ? parseInt(weekMatch[1]) : null;

      try {
        const buf = fs.readFileSync(fullPath);
        const parser = new PDFParse({ data: buf });
        const res = await parser.getText();
        const text = res.text || '';

        // Normalize spaces and linebreaks around MH/ IDs
        // In some PDFs, linebreaks split MH/AMR/2025/31/142
        // 4 or Maharashtr\na
        const cleanText = text.replace(/(\r\n|\n|\r)/g, '\n');
        
        // Find all MH/ matches
        // Also look for explicit Maharashtra mentions if MH/ was somehow omitted
        const matches = [];
        const regex = /MH\/([A-Za-z0-9]{2,6})\/(\d{2,4})\/([0-9\s]{1,10})\/([0-9\s]{1,10})/g;
        let m;
        while ((m = regex.exec(cleanText)) !== null) {
          const id = m[0].replace(/\s+/g, '');
          matches.push(id);
        }

        // Also check general regex for MH/
        const generalMh = cleanText.match(/MH\/[A-Z0-9]{2,6}\/\d{2,4}\//gi) || [];

        // Check Maharashtra mention
        const hasMahaWord = /maharashtr/i.test(cleanText);

        summary.push({
          year,
          week: weekNum,
          file: f,
          pages: res.total,
          textLen: text.length,
          mhIdCount: matches.length,
          generalMhCount: generalMh.length,
          hasMahaWord,
          sampleIds: matches.slice(0, 3)
        });

        totalMhRecords += Math.max(matches.length, generalMh.length);
      } catch (e) {
        summary.push({
          year,
          week: weekNum,
          file: f,
          error: e.message
        });
      }
    }
  }

  console.log('Scan completed!');
  console.log('Estimated total MH outbreak records detected:', totalMhRecords);

  // Group by year
  for (const y of years) {
    const yRows = summary.filter(s => s.year === y);
    const withMh = yRows.filter(s => s.mhIdCount > 0 || s.generalMhCount > 0 || s.hasMahaWord);
    const nilWeeks = yRows.filter(s => s.mhIdCount === 0 && s.generalMhCount === 0 && !s.hasMahaWord);
    const totalYRecords = yRows.reduce((acc, cur) => acc + Math.max(cur.mhIdCount || 0, cur.generalMhCount || 0), 0);
    console.log(`Year ${y}: ${yRows.length} files | ${withMh.length} with MH data | ${nilWeeks.length} NIL weeks | ~${totalYRecords} records`);
  }

  fs.writeFileSync('data_pipeline/logs/scan_all_mh_summary.json', JSON.stringify(summary, null, 2));
}

scanAll();
