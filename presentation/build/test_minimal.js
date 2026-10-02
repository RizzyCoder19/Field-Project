const PptxGenJS = require("pptxgenjs");
const path = require("path");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_16x9";
const slide = pptx.addSlide();
slide.background = { color: "F1EBDD" };
slide.addText("Hello World", { x: 1, y: 1, w: 5, h: 1, fontSize: 24, fontFace: "Georgia" });

const out = path.join(__dirname, "minimal.pptx");
pptx.writeFile({ fileName: out }).then(() => {
  console.log("Wrote minimal.pptx to", out);
});
