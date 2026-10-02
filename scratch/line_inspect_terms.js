const fs = require('fs');
const path = require('path');
const dir = 'data_pipeline/phase5D_interpretation_validation';
const files = fs.readdirSync(dir).sort();

const terms = [
  'transmission',
  'post-monsoon',
  'pre-monsoon',
  'early-monsoon',
  'monsoon',
  'waterborne',
  'vector',
  'biological',
  'ecological',
  'social gathering',
  'wedding',
  'banquet',
  'catering',
  'environmental cycle',
  'genuine',
  'administrative transition',
  'increased surveillance capture',
  'stable metric',
  'population burden',
  'community spread'
];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = content.split('\n');
  const fileHits = [];
  lines.forEach((line, idx) => {
    terms.forEach(t => {
      let pos = 0;
      while ((pos = line.toLowerCase().indexOf(t.toLowerCase(), pos)) !== -1) {
        fileHits.push({ lineNum: idx + 1, term: t, text: line.trim() });
        pos += t.length;
      }
    });
  });
  if (fileHits.length > 0) {
    console.log(`\n================== ${f} (${fileHits.length} hits) ==================`);
    fileHits.forEach(h => {
      console.log(`L${h.lineNum} [${h.term}]: ${h.text}`);
    });
  }
});
