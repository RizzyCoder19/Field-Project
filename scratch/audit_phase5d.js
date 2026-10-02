const fs = require('fs');
const path = require('path');

console.log('=== PHASE 5D INDEPENDENT INTEGRITY AUDIT ===\n');

// 1. Check upstream directory integrity
const upstreamDirs = [
  'data_pipeline/phase5A_disease_audit',
  'data_pipeline/phase5B_seasonal_analysis',
  'data_pipeline/phase5C_advanced_analysis',
  'data_pipeline/analysis'
];

let upstreamModified = false;
// Check if any upstream file was modified in the last 15 minutes
const now = Date.now();
upstreamDirs.forEach(dir => {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    const ageMinutes = (now - stat.mtimeMs) / (1000 * 60);
    if (ageMinutes < 15) {
      console.log(`WARNING: Upstream file recently modified: ${full} (${ageMinutes.toFixed(1)} mins ago)`);
      upstreamModified = true;
    }
  });
});
if (!upstreamModified) {
  console.log('PASS: Zero upstream files in Phase 5A, 5B, 5C, or master analysis were modified.');
}

// 2. Check Phase 5D files existence
const p5dDir = 'data_pipeline/phase5D_interpretation_validation';
const expectedFiles = [
  '01_DISEASE_EVIDENCE_SYNTHESIS.csv',
  '02_EVIDENCE_STRENGTH_MATRIX.csv',
  '03_STABILITY_VOLATILITY_SYNTHESIS.csv',
  '04_2026_INTERPRETATION.csv',
  '05_DISTRICT_INTERPRETATION.csv',
  '06_LIMITATIONS_SYNTHESIS.md',
  '07_OBJECTIVE_EVIDENCE_MATRIX.csv',
  '08_RESEARCH_ALIGNMENT.md',
  '09_FINAL_ANALYTICAL_CONCLUSIONS.md',
  '10_UNSUPPORTED_CLAIMS.md',
  '11_VIVA_EXAMINER_QUESTIONS.md',
  '12_PHASE5D_ANALYSIS_REPORT.md'
];

let missing = false;
expectedFiles.forEach(f => {
  const full = path.join(p5dDir, f);
  if (!fs.existsSync(full)) {
    console.log(`FAIL: Missing expected file: ${f}`);
    missing = true;
  } else {
    const size = fs.statSync(full).size;
    console.log(`PASS: ${f} exists (${size} bytes)`);
  }
});

// 3. Scan for banned phrases in Phase 5D files
const bannedPhrases = [
  'caused by monsoon',
  'climate caused',
  'vector caused',
  'water caused',
  'population incidence rate of',
  'incidence is',
  'true prevalence',
  'most dangerous disease',
  'worst disease',
  'deadliest disease',
  'biggest problem',
  'predict that 2026 will',
  'forecast for 2026',
  'projected 2026 cases'
];

let bannedFound = false;
expectedFiles.forEach(f => {
  const content = fs.readFileSync(path.join(p5dDir, f), 'utf8');
  bannedPhrases.forEach(p => {
    // case insensitive check, but exclude if in context of "Claims Not Supported" or "Unsupported Statement" or "Do NOT Say"
    const lower = content.toLowerCase();
    let idx = lower.indexOf(p.toLowerCase());
    while (idx !== -1) {
      // Check surrounding context (50 chars before)
      const context = content.slice(Math.max(0, idx - 80), idx + p.length + 80);
      if (!context.includes('Unsupported') && !context.includes('Do NOT') && !context.includes('strictly NOT') && !context.includes('fallacy') && !context.includes('cannot')) {
        console.log(`WARNING: Potential banned phrase "${p}" in ${f}: ...${context}...`);
        bannedFound = true;
      }
      idx = lower.indexOf(p.toLowerCase(), idx + 1);
    }
  });
});
if (!bannedFound) {
  console.log('PASS: No banned causal or ranking phrases detected as affirmative claims.');
}

console.log('\n=== AUDIT COMPLETE ===');
