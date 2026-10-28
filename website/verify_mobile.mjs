import fs from 'fs';
import path from 'path';

console.log("--- STARTING DEDICATED MOBILE ARCHITECTURE AUDIT ---");

const checks = [
  {
    file: "src/components/CinematicBlueprintFilm.tsx",
    description: "Dedicated mobile vertical interactive blueprint track & cards",
    patterns: [
      /hidden md:block/, // Desktop D3 canvas
      /block md:hidden/, // Dedicated mobile route track
      /Mobile Station Cards with In-Place Dossier Expansion/,
    ]
  },
  {
    file: "src/components/HomepageSeasonalDual.tsx",
    description: "Dedicated mobile exhibit switcher (Radial Clock vs Monthly Bars)",
    patterns: [
      /mobileExhibit === "radial"/,
      /mobileExhibit === "bars"/,
      /Tap Month to Inspect Hub/,
      /block lg:hidden/,
    ]
  },
  {
    file: "src/components/SeasonalMatrix.tsx",
    description: "Dedicated mobile disease signature dossier cards with 12-month spark heatstrips",
    patterns: [
      /block lg:hidden/, // Mobile card deck
      /hidden lg:block/, // Desktop 720px table
      /12-Month Spark Heatstrip/,
      /All 5 Cohorts/,
    ]
  },
  {
    file: "src/components/PipelineFlow.tsx",
    description: "Dedicated mobile vertical harmonization stepper with collapsible audit points",
    patterns: [
      /block md:hidden/, // Mobile vertical stepper
      /hidden md:block/, // Desktop 6-col grid
      /border-l-2 border-\[#D7B56D\]/,
    ]
  },
  {
    file: "src/components/MaharashtraMap.tsx",
    description: "Dedicated mobile district inspection sheet & horizontal chip scroller",
    patterns: [
      /block sm:hidden/, // Mobile district inspection sheet
      /flex sm:hidden overflow-x-auto/, // Mobile horizontal disease selector chips
      /min-h-\[380px\]/, // Responsive mobile map height
    ]
  },
  {
    file: "src/components/NativeKendallAlignment.tsx",
    description: "Dedicated mobile annual rank alignment ladder",
    patterns: [
      /block lg:hidden/, // Mobile rank ladder
      /hidden lg:block/, // Desktop 720x260 bump chart
      /Top 4 Outbreak Months/,
    ]
  },
  {
    file: "src/components/NativeOutlierDecomposition.tsx",
    description: "Dedicated mobile arithmetic waterfall cascade deck",
    patterns: [
      /block sm:hidden/, // Mobile cascade cards
      /hidden sm:block/, // Desktop 800x280 waterfall SVG
      /February Arithmetic Cascade/,
    ]
  },
  {
    file: "src/components/PresentationNav.tsx",
    description: "Responsive route bar & 9 Canonical Acts jumping list in mobile drawer",
    patterns: [
      /Documentary Journey Acts \(Jump\)/,
      /setMobileOpen\(false\)/,
      /overflow-x-auto no-scrollbar/,
    ]
  }
];

let failed = false;

for (const check of checks) {
  const fullPath = path.resolve(check.file);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File not found: ${check.file}`);
    failed = true;
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  let fileOk = true;
  for (const pattern of check.patterns) {
    if (!pattern.test(content)) {
      console.error(`❌ In ${check.file}: missing pattern ${pattern}`);
      fileOk = false;
      failed = true;
    }
  }
  if (fileOk) {
    console.log(`✓ ${check.description} verified in ${check.file}`);
  }
}

if (failed) {
  console.error("--- MOBILE ARCHITECTURE VERIFICATION FAILED ---");
  process.exit(1);
} else {
  console.log("--- ALL DEDICATED MOBILE ARCHITECTURE CHECKS PASSED PERFECTLY ---");
  process.exit(0);
}
