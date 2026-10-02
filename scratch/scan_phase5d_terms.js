const fs = require('fs');
const path = require('path');
const dir = 'data_pipeline/phase5D_interpretation_validation';
const files = fs.readdirSync(dir);

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

let totalHits = 0;
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  let fileHits = 0;
  terms.forEach(t => {
    let pos = 0;
    while ((pos = content.toLowerCase().indexOf(t.toLowerCase(), pos)) !== -1) {
      const snippet = content.slice(Math.max(0, pos - 60), Math.min(content.length, pos + t.length + 60)).replace(/\r?\n/g, ' ');
      console.log(`[${f}] (${t}) -> ...${snippet}...`);
      pos += t.length;
      fileHits++;
      totalHits++;
    }
  });
});
console.log(`\nTotal occurrences found: ${totalHits}`);
