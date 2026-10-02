/**
 * MASTER PRESENTATION BUILDER
 * Generates the complete 10-slide PowerPoint prototype (.pptx)
 * Project: Analysis of Seasonal Disease Patterns Using Government Health Data
 * Candidate: Khan Umar | B.Sc. Data Science | University of Mumbai
 */

const PptxGenJS = require("pptxgenjs");
const path = require("path");
const fs = require("fs");
const config = require("./presentation.config");

// Import Slide Generator Modules
const createSlide01 = require("./slides/slide01_title");
const createSlide02 = require("./slides/slide02_question");
const createSlide03 = require("./slides/slide03_reportsToData");
const createSlide04 = require("./slides/slide04_baseline");
const createSlide05 = require("./slides/slide05_heroSeasonal");
const createSlide06 = require("./slides/slide06_diseaseComparison");
const createSlide07 = require("./slides/slide07_outlierSensitivity");
const createSlide08 = require("./slides/slide08_outOfSample2026");
const createSlide09 = require("./slides/slide09_limitations");
const createSlide10 = require("./slides/slide10_conclusions");

async function buildPresentation() {
  console.log("================================================================================");
  console.log("BUILDING EDITORIAL POWERPOINT PROTOTYPE (.PPTX)");
  console.log("Project: Analysis of Seasonal Disease Patterns Using Government Health Data");
  console.log("================================================================================");

  // Initialize PptxGenJS instance
  const pptx = new PptxGenJS();

  // Configure Widescreen 16:9 layout
  pptx.layout = config.layout.name; // 'LAYOUT_16x9' (10 x 5.625 inches)

  // Document Metadata & Properties
  pptx.title = config.title;
  pptx.subject = config.subtitle;
  pptx.author = config.author;
  pptx.company = config.institution;
  pptx.revision = "1.0";

  console.log("\nGenerating slides...");

  // Generate 10 Prototype Slides
  console.log(" - Generating Slide 01: Title & Academic Identity");
  createSlide01(pptx);

  console.log(" - Generating Slide 02: Central Research Question");
  createSlide02(pptx);

  console.log(" - Generating Slide 03: Data Engineering Pipeline");
  createSlide03(pptx);

  console.log(" - Generating Slide 04: Four-Year Empirical Baseline");
  createSlide04(pptx);

  console.log(" - Generating Slide 05: Hero Seasonal Visualization (5 Temporal Signatures)");
  createSlide05(pptx);

  console.log(" - Generating Slide 06: Comparative Analysis & Kendall's W Stability");
  createSlide06(pptx);

  console.log(" - Generating Slide 07: Outlier Sensitivity (Food Poisoning February)");
  createSlide07(pptx);

  console.log(" - Generating Slide 08: 2026 Out-of-Sample Surveillance Comparison");
  createSlide08(pptx);

  console.log(" - Generating Slide 09: Methodological Boundaries & Limitations");
  createSlide09(pptx);

  console.log(" - Generating Slide 10: Conclusions & Surveillance Implication");
  createSlide10(pptx);

  // Output destination path
  const outputDir = path.join(__dirname, "build");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, "Seasonal_Disease_Patterns_Maharashtra_FINAL.pptx");

  console.log(`\nWriting presentation file to: ${outputPath}`);
  await pptx.writeFile({ fileName: outputPath });

  const stats = fs.statSync(outputPath);
  console.log(`\nSUCCESS! Presentation successfully built.`);
  console.log(` - File Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(` - Slides Created: 10 slides`);
  console.log(` - Layout: Widescreen 16:9 (10" x 5.625")`);
  console.log("================================================================================");

  return outputPath;
}

if (require.main === module) {
  buildPresentation()
    .then(p => {
      console.log(`Ready for inspection and QC rendering: ${p}`);
      process.exit(0);
    })
    .catch(err => {
      console.error("BUILD ERROR:", err);
      process.exit(1);
    });
}

module.exports = buildPresentation;
