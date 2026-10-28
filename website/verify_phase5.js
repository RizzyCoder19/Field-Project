const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log("=== VERIFYING PHASE 5 & TABLE CSS FIX ===");
  try {
    const res = await fetchUrl('http://localhost:3000/');
    console.log(`HTTP Status: ${res.statusCode}`);
    
    // Check key elements in HTML
    const checks = [
      { name: "Hero Section (#hero)", test: res.body.includes('id="hero"') },
      { name: "Website Guide / Blueprint Section (#website-guide)", test: res.body.includes('id="website-guide"') },
      { name: "Study Scope Section (#study-scope)", test: res.body.includes('id="study-scope"') },
      { name: "Drafting Surface / Field Guide heading", test: res.body.includes('THE INVESTIGATION — ARCHITECTURAL BLUEPRINT') || res.body.includes('THE INVESTIGATION — FIELD GUIDE') },
      { name: "Define The Question Station", test: res.body.includes('Define the Question') },
      { name: "The Evidence Pipeline", test: res.body.includes('The Evidence Pipeline') },
      { name: "The Seasonal Rhythm Station", test: res.body.includes('The Seasonal Rhythm') },
      { name: "Five Disease Signatures Station", test: res.body.includes('Five Disease Signatures') },
      { name: "Explore the Geography Station", test: res.body.includes('Explore the Geography') },
      { name: "Test Repeatability Station", test: res.body.includes('Test Repeatability') },
      { name: "Test Outlier Sensitivity Station", test: res.body.includes('Test Outlier Sensitivity') },
      { name: "Examine Provisional 2026 Station", test: res.body.includes('Examine Provisional 2026') },
      { name: "Connect Data to Fieldwork Station", test: res.body.includes('Connect Data to Fieldwork') },
      { name: "Findings & Limitations Station", test: res.body.includes('Findings &amp; Limitations') || res.body.includes('Findings & Limitations') },
      { name: "Blueprint Controls (Enter Research / Replay / Pause)", test: res.body.includes('Enter Research') && res.body.includes('Film') },
      { name: "Deep Dive Branches", test: res.body.includes('/seasonality') && res.body.includes('/outliers') && res.body.includes('/geography') },
    ];

    checks.forEach(c => {
      console.log(`[${c.test ? 'PASS' : 'FAIL'}] ${c.name}`);
    });

  } catch (err) {
    console.error("Verification error:", err.message);
  }
}

verify();
