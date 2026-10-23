"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";

const DATA = [
  {
    key: "foodPoisoning",
    label: "Food Poisoning",
    events: 69,
    cases: 5927,
    ratio: 85.9,
    color: "#EF4444",
    highlight: true,
    insight: "Extreme cluster severity: single mass-exposure events (weddings, banquets) heavily inflate case numbers despite modest outbreak event frequency.",
  },
  {
    key: "add",
    label: "Acute Diarrheal Disease (ADD)",
    events: 153,
    cases: 9050,
    ratio: 59.2,
    color: "#10B981",
    highlight: false,
    insight: "High event frequency (153 events) AND highest aggregate case volume (9,050 cases) across 33 districts; driven by widespread water infrastructure vulnerability.",
  },
  {
    key: "malaria",
    label: "Malaria",
    events: 70,
    cases: 2133,
    ratio: 30.5,
    color: "#F59E0B",
    highlight: false,
    insight: "Moderate cluster severity (30.5 cases/event), with 61.4% of all events geographically localized in Gadchiroli and Chandrapur districts.",
  },
  {
    key: "chikungunya",
    label: "Chikungunya",
    events: 43,
    cases: 701,
    ratio: 16.3,
    color: "#A78BFA",
    highlight: false,
    insight: "Lowest case volume and cluster density; localized household clusters with 0 recorded surveillance fatalities across the baseline.",
  },
  {
    key: "dengue",
    label: "Dengue Fever",
    events: 204,
    cases: 3144,
    ratio: 15.4,
    color: "#38BDF8",
    highlight: false,
    insight: "Highest outbreak event frequency (204 events), but smallest cluster size per event (15.4 cases/event), reflecting localized peri-domestic container breeding.",
  },
];

export default function NativeEventCaseDivergence({ className = "" }: { className?: string }) {
  const [selectedKey, setSelectedKey] = useState<string>("foodPoisoning");
  const [animKey, setAnimKey] = useState(0);

  const maxEvents = 220;
  const maxCases = 10000;

  const activeItem = DATA.find((d) => d.key === selectedKey) || DATA[0];

  const handleReplay = () => {
    setAnimKey(k => k + 1);
  };

  return (
    <div
      className={`w-full bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm p-4 sm:p-6 flex flex-col shadow-2xl ${className}`}
      role="region"
      aria-label="Outbreak Events versus Reported Cases Divergence"
    >
      {/* Question Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F8FAFC]/10">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
            Analytical Divergence · Events vs. Patient Volume (2022–2025)
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-1">
            Are more outbreak events always correlated with higher case counts?
          </h3>
          <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1.5 max-w-2xl leading-relaxed">
            Outbreak event count measures <span className="text-[#F8FAFC] font-bold">how often</span> investigated clusters are reported by surveillance officers. 
            Case count measures <span className="text-[#F8FAFC] font-bold">how many people</span> were enumerated in those outbreaks.
          </p>
        </div>

        <button
          onClick={handleReplay}
          className="px-3 py-1.5 bg-[#06080F] hover:bg-[#1A2234] border border-[#F8FAFC]/15 text-[#D4AF37] hover:text-[#F5D061] rounded-sm font-mono text-xs flex items-center gap-1.5 transition-colors"
          title="Reconstruct dual bar comparison"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reconstruct Bars</span>
        </button>
      </div>

      {/* Comparison Grid with Staggered Bar Construction */}
      <div key={animKey} className="space-y-3.5 my-2">
        {DATA.map((item, idx) => {
          const isSelected = selectedKey === item.key;
          const eventWidthPct = (item.events / maxEvents) * 100;
          const caseWidthPct = (item.cases / maxCases) * 100;
          const staggerDelay = idx * 90;

          return (
            <div
              key={item.key}
              onClick={() => setSelectedKey(item.key)}
              className={`p-4 rounded-sm border cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "border-[#00F0FF] bg-[#1E293B] shadow-2xl ring-1 ring-[#00F0FF]/40"
                  : "border-[#F8FAFC]/10 bg-[#06080F]/80 hover:border-[#F8FAFC]/25"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-serif text-lg font-bold text-[#F8FAFC]">{item.label}</span>
                </div>
                <div className="font-mono text-xs text-[#00F0FF] font-bold">
                  Avg. {item.ratio.toFixed(1)} cases / outbreak event
                </div>
              </div>

              {/* Dual Bar Comparison with Staggered Growth */}
              <div className="space-y-2.5 mt-3">
                {/* Event Count Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xs text-[#94A3B8]">
                    <span>OUTBREAK EVENTS (REPORTED CLUSTERS)</span>
                    <span className="text-[#F8FAFC] font-bold">{item.events} events</span>
                  </div>
                  <div className="w-full bg-[#06080F] h-2.5 rounded-sm overflow-hidden border border-[#F8FAFC]/10">
                    <div
                      className="h-full rounded-sm bar-construct"
                      style={{
                        width: `${eventWidthPct}%`,
                        backgroundColor: item.color,
                        opacity: 0.6,
                        animationDelay: `${staggerDelay}ms`,
                      }}
                    />
                  </div>
                </div>

                {/* Case Volume Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xs text-[#94A3B8]">
                    <span>REPORTED CASES (TOTAL PATIENTS ENUMERATED)</span>
                    <span className="text-[#F8FAFC] font-bold">{item.cases.toLocaleString()} cases</span>
                  </div>
                  <div className="w-full bg-[#06080F] h-2.5 rounded-sm overflow-hidden border border-[#F8FAFC]/10">
                    <div
                      className="h-full rounded-sm bar-construct"
                      style={{
                        width: `${caseWidthPct}%`,
                        backgroundColor: item.color,
                        animationDelay: `${staggerDelay + 40}ms`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytical Focus Detail Card */}
      <div className="mt-6 p-5 border border-[#F8FAFC]/15 bg-[#06080F] rounded-sm space-y-3">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider border-b border-[#F8FAFC]/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#00F0FF] font-bold">Epidemiological Focus:</span>
            <span className="font-bold text-[#F8FAFC]">{activeItem.label}</span>
          </div>
          <span className="text-[#D4AF37]">Click disease above to switch breakdown</span>
        </div>
        <p className="font-mono text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          {activeItem.insight}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#F8FAFC]/10 pt-4 text-center">
          <div>
            <div className="font-serif text-3xl font-bold text-[#F8FAFC]">{activeItem.events}</div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-[#94A3B8] mt-0.5">Total Outbreaks</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold" style={{ color: activeItem.color }}>
              {activeItem.cases.toLocaleString()}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-[#94A3B8] mt-0.5">Reported Cases</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-[#00F0FF]">
              {activeItem.ratio.toFixed(1)}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-[#94A3B8] mt-0.5">Mean Cluster Size</div>
          </div>
        </div>
      </div>
    </div>
  );
}
