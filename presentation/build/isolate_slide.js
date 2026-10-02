const PptxGenJS = require("pptxgenjs");
const path = require("path");
const fs = require("fs");
const config = require("../presentation.config");

const slideModules = [
  { name: "slide01", fn: require("../slides/slide01_title") },
  { name: "slide02", fn: require("../slides/slide02_question") },
  { name: "slide03", fn: require("../slides/slide03_reportsToData") },
  { name: "slide04", fn: require("../slides/slide04_baseline") },
  { name: "slide05", fn: require("../slides/slide05_heroSeasonal") },
  { name: "slide06", fn: require("../slides/slide06_diseaseComparison") },
  { name: "slide07", fn: require("../slides/slide07_outlierSensitivity") },
  { name: "slide08", fn: require("../slides/slide08_outOfSample2026") },
  { name: "slide09", fn: require("../slides/slide09_limitations") },
  { name: "slide10", fn: require("../slides/slide10_conclusions") },
];

async function run() {
  for (let i = 0; i < slideModules.length; i++) {
    const mod = slideModules[i];
    const pptx = new PptxGenJS();
    pptx.layout = config.layout.name;
    mod.fn(pptx);
    const outPath = path.join(__dirname, `test_${mod.name}.pptx`);
    await pptx.writeFile({ fileName: outPath });
    console.log(`Generated test_${mod.name}.pptx`);
  }
}

run();
