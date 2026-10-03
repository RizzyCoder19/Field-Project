"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const DISEASE_DISTRICTS: Record<string, string[]> = {
  dengue: [
    "Pune", "Thane", "Beed", "Raigad", "Kolhapur", "Nanded", "Aurangabad", "Akola",
    "Nashik", "Ahmednagar", "Satara", "Solapur", "Nagpur", "Latur", "Sangli",
    "Jalgaon", "Osmanabad", "Amravati", "Wardha", "Yavatmal", "Buldhana",
    "Chandrapur", "Palghar", "Mumbai Suburban", "Mumbai", "Ratnagiri", "Sindhudurg",
    "Hingoli", "Parbhani", "Dhule", "Gondia"
  ],
  add: [
    "Pune", "Thane", "Nagpur", "Amravati", "Kolhapur", "Nashik", "Ahmednagar",
    "Satara", "Solapur", "Nanded", "Aurangabad", "Latur", "Sangli", "Jalgaon",
    "Osmanabad", "Beed", "Wardha", "Yavatmal", "Buldhana", "Chandrapur",
    "Palghar", "Mumbai Suburban", "Mumbai", "Ratnagiri", "Sindhudurg",
    "Hingoli", "Parbhani", "Dhule", "Gondia", "Gadchiroli", "Akola", "Washim", "Raigad"
  ],
  malaria: [
    "Gadchiroli", "Chandrapur", "Gondia", "Nagpur", "Amravati",
    "Nandurbar", "Nashik", "Palghar", "Thane", "Raigad",
    "Yavatmal", "Wardha", "Bhandara", "Akola", "Buldhana"
  ],
  foodPoisoning: [
    "Kolhapur", "Parbhani", "Solapur", "Pune", "Nashik", "Ahmednagar",
    "Satara", "Sangli", "Latur", "Nanded", "Aurangabad", "Beed",
    "Osmanabad", "Jalgaon", "Dhule", "Nagpur", "Amravati", "Akola",
    "Buldhana", "Yavatmal", "Thane", "Palghar", "Mumbai Suburban",
    "Ratnagiri", "Wardha", "Chandrapur", "Gondia"
  ],
  chikungunya: [
    "Pune", "Nashik", "Ahmednagar", "Satara", "Kolhapur",
    "Sangli", "Solapur", "Thane", "Mumbai Suburban",
    "Nanded", "Latur", "Osmanabad", "Aurangabad", "Jalgaon", "Dhule"
  ]
};

const DISEASE_COLORS: Record<string, string> = {
  dengue: "#4F91B8",
  add: "#89947C",
  malaria: "#C7A75B",
  foodPoisoning: "#A94F3D",
  chikungunya: "#7A8BA0",
};

const DISEASE_LABELS: Record<string, string> = {
  dengue: "Dengue",
  add: "ADD",
  malaria: "Malaria",
  foodPoisoning: "Food Poisoning",
  chikungunya: "Chikungunya",
};

const MALARIA_CONCENTRATION = { districts: ["Gadchiroli", "Chandrapur"], events: 43, total: 70, pct: "61.4%" };

interface GeoFeature {
  properties: { district: string };
  geometry: { type: string; coordinates: unknown[] };
}

interface GeoData {
  type: string;
  features: GeoFeature[];
}

interface TooltipData {
  district: string;
  x: number;
  y: number;
  isActive: boolean;
}

interface MaharashtraMapProps {
  activeDisease?: string;
  className?: string;
  showLegend?: boolean;
  title?: string;
}

export default function MaharashtraMap({
  activeDisease = "dengue",
  className = "",
  showLegend = true,
  title = "District Reporting Footprint"
}: MaharashtraMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [selectedDisease, setSelectedDisease] = useState(activeDisease);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSelectedDisease(activeDisease);
  }, [activeDisease]);

  // Load GeoJSON
  useEffect(() => {
    fetch("/data/maharashtra-districts.json")
      .then(r => r.json())
      .then((data: GeoData) => {
        setGeoData(data);
        setLoaded(true);
      })
      .catch(console.error);
  }, []);

  const renderMap = useCallback(() => {
    if (!geoData || !svgRef.current) return;

    const run = async () => {
      const d3 = await import("d3");
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const containerW = svgRef.current!.clientWidth || 600;
      const containerH = svgRef.current!.clientHeight || 400;

      const projection = d3.geoMercator()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .fitSize([containerW, containerH], geoData as any);

      const pathGen = d3.geoPath().projection(projection);

      const activeDistricts = new Set(DISEASE_DISTRICTS[selectedDisease] ?? []);
      const color = DISEASE_COLORS[selectedDisease] ?? "#4F91B8";
      const isMalaria = selectedDisease === "malaria";

      // Draw paths
      svg.selectAll<SVGPathElement, GeoFeature>("path")
        .data(geoData.features)
        .join("path")
        .attr("d", d => pathGen(d as unknown as d3.GeoPermissibleObjects) ?? "")
        .attr("fill", d => {
          const name = d.properties.district;
          if (!activeDistricts.has(name)) return "rgba(238,232,218,0.04)";
          if (isMalaria && MALARIA_CONCENTRATION.districts.includes(name)) return "#C7A75B";
          return color + "BB";
        })
        .attr("stroke", d => {
          const name = d.properties.district;
          return activeDistricts.has(name) ? "rgba(238,232,218,0.35)" : "rgba(238,232,218,0.08)";
        })
        .attr("stroke-width", d => {
          const name = d.properties.district;
          return activeDistricts.has(name) ? 0.6 : 0.3;
        })
        .attr("class", "district-path")
        .style("cursor", "pointer")
        .style("transition", "fill 0.2s ease, opacity 0.15s ease")
        .on("mouseenter", function(event, d) {
          const name = d.properties.district;
          const isActive = activeDistricts.has(name);
          if (isActive) {
            d3.select(this).attr("fill", color).attr("opacity", 0.85);
          }
          const rect = svgRef.current!.getBoundingClientRect();
          setTooltip({
            district: name,
            x: event.clientX - rect.left,
            y: event.clientY - rect.top - 10,
            isActive
          });
        })
        .on("mouseleave", function(_, d) {
          const name = d.properties.district;
          const isActive = activeDistricts.has(name);
          const isMalC = isMalaria && MALARIA_CONCENTRATION.districts.includes(name);
          d3.select(this).attr("fill",
            !isActive ? "rgba(238,232,218,0.04)" :
            isMalC ? "#C7A75B" :
            color + "BB"
          ).attr("opacity", 1);
          setTooltip(null);
        });

      // Malaria: concentration marker for Gadchiroli+Chandrapur
      if (isMalaria) {
        const gcFeature = geoData.features.find(f => f.properties.district === "Gadchiroli");
        if (gcFeature) {
          const centroid = pathGen.centroid(gcFeature as unknown as d3.GeoPermissibleObjects);
          svg.append("text")
            .attr("x", centroid[0])
            .attr("y", centroid[1] - 12)
            .attr("text-anchor", "middle")
            .attr("fill", "#C7A75B")
            .attr("font-size", "8px")
            .attr("font-family", "JetBrains Mono, monospace")
            .text("61.4%");
        }
      }
    };

    run();
  }, [geoData, selectedDisease]);

  useEffect(() => { renderMap(); }, [renderMap]);

  const diseases = Object.keys(DISEASE_DISTRICTS);

  return (
    <div className={`relative flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <div className="section-label">{title}</div>
          {selectedDisease && (
            <div className="font-mono text-[10px] text-[#B5B0A4] mt-1">
              {DISEASE_DISTRICTS[selectedDisease]?.length ?? 0} districts reporting ·{" "}
              {selectedDisease === "malaria" && <span className="text-[#C7A75B]">Gadchiroli + Chandrapur = 61.4% of events</span>}
            </div>
          )}
        </div>
        {/* Disease filter */}
        <div className="flex flex-wrap gap-1.5">
          {diseases.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDisease(d)}
              className="font-mono text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm border transition-all"
              style={{
                borderColor: selectedDisease === d ? DISEASE_COLORS[d] : "rgba(238,232,218,0.12)",
                color: selectedDisease === d ? DISEASE_COLORS[d] : "rgba(238,232,218,0.45)",
                background: selectedDisease === d ? DISEASE_COLORS[d] + "18" : "transparent",
              }}
            >{DISEASE_LABELS[d]}</button>
          ))}
        </div>
      </div>

      {/* Map SVG */}
      <div className="relative flex-1 min-h-[300px] bg-[#0a0f0a] rounded-sm overflow-hidden border border-[#EEE8DA]/06">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-mono text-[10px] text-[#B5B0A4] tracking-widest">LOADING MAP…</div>
          </div>
        )}
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute pointer-events-none bg-[#111A2B] border border-[#EEE8DA]/15 rounded-sm px-3 py-2 shadow-xl"
            style={{ left: tooltip.x + 10, top: tooltip.y, zIndex: 50 }}
          >
            <div className="font-serif text-sm text-[#EEE8DA] font-bold">{tooltip.district}</div>
            {tooltip.isActive ? (
              <div className="font-mono text-[9px] text-[#C7A75B] mt-0.5 uppercase tracking-wider">
                Reporting district
              </div>
            ) : (
              <div className="font-mono text-[9px] text-[#B5B0A4] mt-0.5 uppercase tracking-wider">
                No outbreak record
              </div>
            )}
            {selectedDisease === "malaria" && MALARIA_CONCENTRATION.districts.includes(tooltip.district) && (
              <div className="font-mono text-[9px] text-[#C7A75B] mt-1 font-bold">
                ★ High-concentration district
              </div>
            )}
          </div>
        )}

        {/* Legend */}
        {showLegend && (
          <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: DISEASE_COLORS[selectedDisease] + "BB" }} />
              <span className="font-mono text-[8px] text-[#B5B0A4] tracking-wider uppercase">Reporting district</span>
            </div>
            {selectedDisease === "malaria" && (
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#C7A75B]" />
                <span className="font-mono text-[8px] text-[#C7A75B] tracking-wider uppercase">Concentration cluster</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#EEE8DA]/05 border border-[#EEE8DA]/12" />
              <span className="font-mono text-[8px] text-[#B5B0A4]/50 tracking-wider uppercase">No record</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
