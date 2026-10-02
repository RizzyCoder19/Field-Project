/**
 * PRESENTATION DESIGN SYSTEM & CONFIGURATION
 * Project: Analysis of Seasonal Disease Patterns Using Government Health Data
 * Candidate: Khan Umar | B.Sc. Data Science | University of Mumbai
 * Aesthetic: Royal Sovereign (Midnight Navy / Imperial Gold / Champagne / Diamond White / Sapphire)
 */

module.exports = {
  title: "Analysis of Seasonal Disease Patterns Using Government Health Data",
  subtitle: "A Four-Year Epidemiological Outbreak Surveillance Study in Maharashtra (2022–2025)",
  author: "Khan Umar",
  institution: "RP Institute, affiliated to University of Mumbai",
  degree: "B.Sc. Data Science — Semester III",
  academicYear: "2026–27",
  
  // Widescreen 16:9 standard dimensions in inches
  layout: {
    name: "LAYOUT_16x9",
    width: 10.0,
    height: 5.625,
    margin: {
      left: 0.8,
      right: 0.8,
      top: 0.5,
      bottom: 0.4
    }
  },

  // Royal Sovereign Color Palette (Hex without # prefix for PptxGenJS)
  colors: {
    bg: "0A1128",           // Royal Midnight Navy (deep, regal canvas)
    bgCard: "101C38",       // Rich Midnight Sapphire Card Fill
    bgCardLight: "16274D",  // Illuminated Sapphire for highlighted cards
    bgCardDark: "0C162E",   // Deep inset container
    cardBorder: "1E335E",   // Subtle Sapphire Card Border
    gold: "D4AF37",         // Imperial Regal Gold (accent, rules, key numbers)
    goldLight: "F3E5AB",    // Champagne Gold for highlighted titles/subtitles
    goldMuted: "997E30",    // Antique Gold for secondary badges/borders
    white: "FFFFFF",        // Crisp Diamond White for primary headers
    platinum: "E2E8F0",     // Bright Platinum for primary reading text
    muted: "94A3B8",        // Elegant Slate for descriptions and captions
    subtle: "64748B",       // Cool Graphite for secondary rules & ticks
    border: "1E2D4A",       // Structural hairline rule
    borderGold: "D4AF37",   // Regal Gold hairline rule
    ruby: "EF4444",         // Royal Ruby / Crimson for peaks & outlier alerts
    rubyLight: "F87171",    // Soft Ruby
    emerald: "10B981",      // Royal Emerald for statistically significant findings
    emeraldLight: "34D399", // Light Emerald
    azure: "38BDF8",        // Royal Azure Blue for secondary trends & markers
    chartBg: "FFFFFF",      // Pure White container for scientific charts
    black: "000000"
  },

  // Typography Families (Universally supported in Microsoft PowerPoint)
  fonts: {
    display: "Georgia",     // Regal editorial serif for titles, hero numbers, section marks
    body: "Calibri",        // Clean humanist sans for narrative, bullets, descriptions
    mono: "Consolas"        // Monospace for metadata, codes, citations, data labels
  },

  // Source Provenance Baseline Line
  defaultSource: "SOURCE: NCDC / IDSP Weekly Outbreak Reports | Maharashtra 2022–2025 Analytical Baseline | N=539 records, 21,955 cases"
};
