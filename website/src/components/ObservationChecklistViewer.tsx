"use client";

import React, { useState } from "react";
import { CheckSquare, Printer, Shield, Compass, AlertCircle } from "lucide-react";

export default function ObservationChecklistViewer() {
  const [activeCategory, setActiveCategory] = useState("drainage");

  const categories = [
    {
      id: "drainage",
      title: "Stormwater Drainage & Water Logging",
      indicators: [
        { code: "OBS-DR-01", item: "Open roadside gutters contain stagnant, silted, or blackened water.", options: ["Severe (Total blockage)", "Moderate (Slow flow)", "Clean / Free flowing", "Underground / Covered"] },
        { code: "OBS-DR-02", item: "Evidence of pre-monsoon desilting operations (dredged sludge on road margins).", options: ["Recent desilting evident", "Un-desilted / Full silt", "Not applicable"] },
        { code: "OBS-DR-03", item: "Water accumulation in hollow pavements, construction pits, or low-lying lanes.", options: ["Widespread ponding", "Isolated puddles", "Dry pavement"] }
      ]
    },
    {
      id: "water",
      title: "Domestic Water Storage Habitats",
      indicators: [
        { code: "OBS-WS-01", item: "Presence of unsealed plastic drums (200L) or open containers outside dwellings.", options: ["≥5 open drums observed per lane", "1–4 open drums", "All containers covered with tight lids"] },
        { code: "OBS-WS-02", item: "Visible mosquito larvae (wrigglers) in uncovered domestic or commercial containers.", options: ["Larvae visibly present", "Suspected / Unconfirmed", "No visible larvae"] },
        { code: "OBS-WS-03", item: "Overhead cement / plastic tanks without secure insect-proof lids.", options: ["Multiple open tanks", "Isolated open tank", "All tanks securely sealed"] }
      ]
    },
    {
      id: "sanitation",
      title: "Public Space & Pipeline Sanitation",
      indicators: [
        { code: "OBS-SN-01", item: "Municipal potable water supply pipes submerged inside or directly traversing open drains.", options: ["Direct immersion observed (High cross-contamination risk)", "Pipes elevated above drains", "Underground municipal mains"] },
        { code: "OBS-SN-02", item: "Accumulated uncollected municipal solid waste adjacent to residential lanes.", options: ["Major dump site within 50m", "Scattered litter only", "Clean / Daily collection"] }
      ]
    },
    {
      id: "abatement",
      title: "Visible Municipal Abatement Markers",
      indicators: [
        { code: "OBS-AB-01", item: "Presence of municipal chalk/stencil markings indicating indoor or outdoor insecticidal spraying.", options: ["Dated within current month", "Outdated marks (>3 months old)", "Zero abatement markings observed"] },
        { code: "OBS-AB-02", item: "Public health posters or banner advisories on Dengue/Malaria/Diarrhea prevention displayed in public places.", options: ["Visible in high-footfall spots", "Faded / damaged poster", "No public advisories observed"] }
      ]
    }
  ];

  const active = categories.find(c => c.id === activeCategory) || categories[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#080D1F] border border-[#1E335E] rounded-xl shadow-2xl p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#1E335E]/60 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#D4AF37]">
            <Compass className="w-3.5 h-3.5" />
            <span>Environmental Observation Transects · Standardized Audit Protocol</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#F8F5EC] mt-1">
            Physical Habitat & Sanitation Checklist
          </h3>
          <p className="text-xs text-[#AEB9D1]">
            Objective physical criteria designed to document vector habitats and water contamination vectors.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-3.5 py-1.5 rounded bg-[#101C38] hover:bg-[#16274D] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-mono flex items-center space-x-2 transition-all shadow-md"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Export Protocol</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3 py-2 rounded text-xs font-mono transition-all border ${
              activeCategory === c.id
                ? "bg-[#16274D] border-[#D4AF37] text-white font-bold shadow-lg"
                : "bg-[#0D162E] border-[#1E335E]/60 text-[#AEB9D1] hover:border-[#D4AF37]/30"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Active Category Checklist Cards */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-mono text-[#D4AF37] px-1">
          <span className="uppercase">{active.title}</span>
          <span>Protocol Rubric View</span>
        </div>

        {active.indicators.map((ind) => (
          <div key={ind.code} className="bg-[#0D162E] border border-[#1E335E] rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#38BDF8] font-bold">{ind.code}</span>
              <span className="text-[10px] uppercase text-[#F87171] bg-[#EF4444]/10 px-2 py-0.5 rounded border border-[#EF4444]/30">
                Audit Record: Not Yet Collected
              </span>
            </div>

            <div className="font-serif text-sm font-semibold text-[#F8F5EC]">
              {ind.item}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {ind.options.map((opt, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs text-[#AEB9D1] bg-[#0A1128]/80 p-2 rounded border border-[#1E335E]/40">
                  <span className="w-2 h-2 rounded border border-[#D4AF37]"></span>
                  <span>{opt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Academic Integrity Notice */}
      <div className="bg-[#060A17] p-3.5 rounded border border-[#1E335E]/60 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
        <span>All physical indicators are evaluated on public pedestrian transects with zero intrusion into private dwellings.</span>
        <span className="text-[#D4AF37]">Protocol Version: 1.0 (Ready for Deployment)</span>
      </div>
    </div>
  );
}
