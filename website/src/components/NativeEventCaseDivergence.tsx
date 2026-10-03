"use client";

import React, { useState } from "react";
import { PRIMARY_DISEASES } from "@/data/researchData";

const DATA = [
  {
    key: "foodPoisoning",
    label: "Food Poisoning",
    events: 69,
    cases: 5927,
    ratio: 85.9,
    color: "#EF4444",
    highlight: true,
    insight: "High cluster severity: large wedding/feast mass-exposure events skew case volume.",
  },
  {
    key: "add",
    label: "ADD",
    events: 153,
    cases: 9050,
    ratio: 59.2,
    color: "#10B981",
    highlight: false,
    insight: "High event count AND highest overall case burden across 33 districts.",
  },
  {
    key: "malaria",
    label: "Malaria",
    events: 70,
    cases: 2133,
    ratio: 30.5,
    color: "#D4AF37",
    highlight: false,
    insight: "Moderate cluster size, with 61.4% concentrated in Gadchiroli + Chandrapur.",
  },
  {
    key: "chikungunya",
    label: "Chikungunya",
    events: 43,
    cases: 701,
    ratio: 16.3,
    color: "#A78BFA",
    highlight: false,
    insight: "Lowest case density; localized household clusters without mass outbreaks.",
  },
  {
    key: "dengue",
    label: "Dengue",
    events: 204,
    cases: 3144,
    ratio: 15.4,
    color: "#38BDF8",
    highlight: false,
    insight: "Most frequent outbreak events (204), but smaller localized cluster sizes (15.4/event).",
  },
];

export default function NativeEventCaseDivergence({ className = "" }: { className?: string }) {
  const [selectedKey, setSelectedKey] = useState<string>("foodPoisoning");

  const maxEvents = 220;
  const maxCases = 10000;

  const activeItem = DATA.find((d) => d.key === selectedKey) || DATA[0];

  return (
    <div className={`w-full bg-[#0b0f0b] border border-[#EEE8DA]/08 rounded-sm p-6 flex flex-col ${className}`}>
      {/* Question Header */}
      <div className="mb-6">
        <div className="font-mono text-[9px] uppercase tracking-widest text-[#C7A75B]">
          Analytical Contrast · 2022–2025 Baseline
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#EEE8DA] mt-1">
          Are more events always more cases?
        </h3>
        <p className="font-mono text-xs text-[#B5B0A4] mt-1.5 max-w-2xl">
          Outbreak event count measures <span className="text-[#EEE8DA] font-bold">how often</span> clusters are reported. 
          Case count measures <span className="text-[#EEE8DA] font-bold">how many people</span> were affected.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-4 my-2">
        {DATA.map((item) => {
          const isSelected = selectedKey === item.key;
          const eventWidthPct = (item.events / maxEvents) * 100;
          const caseWidthPct = (item.cases / maxCases) * 100;

          return (
            <div
              key={item.key}
              onClick={() => setSelectedKey(item.key)}
              className={`p-4 rounded-sm border cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "border-[#C7A75B] bg-[#111A2B]/60 shadow-lg"
                  : "border-[#EEE8DA]/08 bg-[#111411]/40 hover:border-[#EEE8DA]/20"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="font-serif text-base font-bold text-[#EEE8DA]">{item.label}</span>
                </div>
                <div className="font-mono text-[10px] text-[#C7A75B] font-bold">
                  Avg. {item.ratio.toFixed(1)} cases / outbreak
                </div>
              </div>

              {/* Dual Bar Comparison */}
              <div className="space-y-2 mt-3">
                {/* Event Count Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[8px] text-[#B5B0A4]">
                    <span>OUTBREAK EVENTS</span>
                    <span className="text-[#EEE8DA] font-bold">{item.events} events</span>
                  </div>
                  <div className="w-full bg-[#EEE8DA]/06 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${eventWidthPct}%`, backgroundColor: item.color, opacity: 0.6 }}
                    />
                  </div>
                </div>

                {/* Case Volume Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[8px] text-[#B5B0A4]">
                    <span>REPORTED CASES</span>
                    <span className="text-[#EEE8DA] font-bold">{item.cases.toLocaleString()} cases</span>
                  </div>
                  <div className="w-full bg-[#EEE8DA]/06 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${caseWidthPct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytical Focus Detail Card */}
      <div className="mt-6 p-4 border border-[#EEE8DA]/10 bg-[#111411] rounded-sm">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-[#C7A75B]">
          <span>Focus Analysis:</span>
          <span className="font-bold text-[#EEE8DA]">{activeItem.label}</span>
        </div>
        <p className="font-mono text-xs text-[#B5B0A4] mt-2 leading-relaxed">
          {activeItem.insight}
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#EEE8DA]/06 pt-3 text-center">
          <div>
            <div className="font-serif text-lg font-bold text-[#EEE8DA]">{activeItem.events}</div>
            <div className="font-mono text-[7px] uppercase tracking-widest text-[#B5B0A4]/60">Events</div>
          </div>
          <div>
            <div className="font-serif text-lg font-bold" style={{ color: activeItem.color }}>
              {activeItem.cases.toLocaleString()}
            </div>
            <div className="font-mono text-[7px] uppercase tracking-widest text-[#B5B0A4]/60">Cases</div>
          </div>
          <div>
            <div className="font-serif text-lg font-bold text-[#C7A75B]">
              {activeItem.ratio.toFixed(1)}
            </div>
            <div className="font-mono text-[7px] uppercase tracking-widest text-[#B5B0A4]/60">Cases / Event</div>
          </div>
        </div>
      </div>
    </div>
  );
}
