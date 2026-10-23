"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { RefreshCw, CheckCircle2 } from "lucide-react";

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
  dengue: "#38BDF8",
  add: "#10B981",
  malaria: "#F59E0B",
  foodPoisoning: "#EF4444",
  chikungunya: "#A78BFA",
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
  const [selectedDisease, setSelectedDisease] = useState(activeDisease);
  const [prevActiveDisease, setPrevActiveDisease] = useState(activeDisease);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [loaded, setLoaded] = useState(false);

  if (activeDisease !== prevActiveDisease) {
    setPrevActiveDisease(activeDisease);
    setSelectedDisease(activeDisease);
  }

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
      const containerH = svgRef.current!.clientHeight || 420;

      const projection = d3.geoMercator()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .fitSize([containerW, containerH], geoData as any);

      const pathGen = d3.geoPath().projection(projection);

      const activeDistricts = new Set(DISEASE_DISTRICTS[selectedDisease] ?? []);
      const color = DISEASE_COLORS[selectedDisease] ?? "#4F91B8";
      const isMalaria = selectedDisease === "malaria";

      // Group for Map Layers
      const g = svg.append("g").attr("class", "map-root");

      // Stage 1: Draw District Geographic Boundaries with Path Stroke Animation
      const paths = g.selectAll<SVGPathElement, GeoFeature>("path.district-path")
        .data(geoData.features)
        .join("path")
        .attr("class", "district-path")
        .attr("d", d => pathGen(d as unknown as d3.GeoPermissibleObjects) ?? "")
        .attr("stroke", d => {
          const name = d.properties.district;
          return activeDistricts.has(name) ? "rgba(212, 175, 55, 0.6)" : "rgba(148, 163, 184, 0.2)";
        })
        .attr("stroke-width", d => {
          const name = d.properties.district;
          return activeDistricts.has(name) ? 0.8 : 0.4;
        })
        .attr("fill", "rgba(6, 8, 15, 0.9)")
        .style("cursor", "pointer");

      // Stage 2: Staggered Data Fill Transition
      paths.transition()
        .delay((_, i) => i * 18)
        .duration(600)
        .attr("fill", d => {
          const name = d.properties.district;
          if (!activeDistricts.has(name)) return "rgba(148, 163, 184, 0.04)";
          if (isMalaria && MALARIA_CONCENTRATION.districts.includes(name)) return "#00F0FF";
          return color + "CC";
        });

      // Interactive Events
      paths
        .on("mouseenter", function(event, d) {
          const name = d.properties.district;
          const isActive = activeDistricts.has(name);
          if (isActive) {
            d3.select(this)
              .attr("stroke", "#00F0FF")
              .attr("stroke-width", 1.5)
              .attr("fill", isMalaria && MALARIA_CONCENTRATION.districts.includes(name) ? "#00F0FF" : color);
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
          d3.select(this)
            .attr("stroke", isActive ? "rgba(212, 175, 55, 0.6)" : "rgba(148, 163, 184, 0.2)")
            .attr("stroke-width", isActive ? 0.8 : 0.4)
            .attr("fill", !isActive ? "rgba(148, 163, 184, 0.04)" : isMalC ? "#00F0FF" : color + "CC");
          setTooltip(null);
        });

      // Stage 3: For Malaria, Construct Vidarbha Geographic Concentration Beacon
      if (isMalaria) {
        const gcFeature = geoData.features.find(f => f.properties.district === "Gadchiroli");
        if (gcFeature) {
          const centroid = pathGen.centroid(gcFeature as unknown as d3.GeoPermissibleObjects);
          
          // Beacon Pulse Ring
          g.append("circle")
            .attr("cx", centroid[0])
            .attr("cy", centroid[1])
            .attr("r", 20)
            .attr("fill", "none")
            .attr("stroke", "#00F0FF")
            .attr("stroke-width", 1.5)
            .attr("stroke-opacity", 0.8)
            .attr("class", "animate-ping");

          // Beacon Center Dot
          g.append("circle")
            .attr("cx", centroid[0])
            .attr("cy", centroid[1])
            .attr("r", 4)
            .attr("fill", "#00F0FF");

          // Concentration Callout Badge
          g.append("rect")
            .attr("x", centroid[0] - 32)
            .attr("y", centroid[1] - 32)
            .attr("width", 64)
            .attr("height", 18)
            .attr("rx", 3)
            .attr("fill", "#06080F")
            .attr("stroke", "#00F0FF")
            .attr("stroke-width", 1);

          g.append("text")
            .attr("x", centroid[0])
            .attr("y", centroid[1] - 20)
            .attr("text-anchor", "middle")
            .attr("fill", "#00F0FF")
            .attr("font-size", "10px")
            .attr("font-family", "JetBrains Mono, monospace")
            .attr("font-weight", "bold")
            .text("61.4% Focus");
        }
      }
    };

    run();
  }, [geoData, selectedDisease]);

  const handleReconstruct = () => {
    renderMap();
  };

  useEffect(() => { renderMap(); }, [renderMap]);

  const diseases = Object.keys(DISEASE_DISTRICTS);

  return (
    <div className={`relative flex flex-col bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm p-4 sm:p-6 shadow-2xl ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3 pb-3 border-b border-[#F8FAFC]/10">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
            {title}
          </div>
          {selectedDisease && (
            <div className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1">
              <span className="text-[#F8FAFC] font-bold">{DISEASE_DISTRICTS[selectedDisease]?.length ?? 0}</span> of 36 districts reporting outbreak records ·{" "}
              {selectedDisease === "malaria" && (
                <span className="text-[#00F0FF] font-semibold">Gadchiroli + Chandrapur = 61.4% of total events</span>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReconstruct}
            className="px-2.5 py-1 bg-[#06080F] hover:bg-[#1A2234] border border-[#F8FAFC]/15 text-[#D4AF37] hover:text-[#F5D061] rounded-sm font-mono text-xs flex items-center gap-1.5 transition-colors"
            title="Re-draw Maharashtra district boundaries"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reconstruct Geometry</span>
          </button>
        </div>
      </div>

      {/* Disease Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {diseases.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDisease(d)}
            className="font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-sm border transition-all"
            style={{
              borderColor: selectedDisease === d ? DISEASE_COLORS[d] : "rgba(212, 175, 55, 0.2)",
              color: selectedDisease === d ? DISEASE_COLORS[d] : "rgba(148, 163, 184, 0.7)",
              background: selectedDisease === d ? DISEASE_COLORS[d] + "20" : "#06080F",
              fontWeight: selectedDisease === d ? "bold" : "normal",
            }}
          >
            {DISEASE_LABELS[d]}
          </button>
        ))}
      </div>

      {/* Map SVG Stage */}
      <div className="relative flex-1 min-h-[340px] sm:min-h-[420px] bg-[#030407] rounded-sm overflow-hidden border border-[#F8FAFC]/10">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-mono text-xs text-[#00F0FF] tracking-widest animate-pulse">
              CALIBRATING DISTRICT GEOMETRY…
            </div>
          </div>
        )}
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />

        {/* Floating Tooltip */}
        {tooltip && (
          <div
            className="absolute pointer-events-none bg-[#0B111E]/95 backdrop-blur-md border border-[#00F0FF]/50 rounded-sm px-3.5 py-2.5 shadow-2xl z-50"
            style={{ left: tooltip.x + 12, top: tooltip.y }}
          >
            <div className="font-serif text-sm text-[#F8FAFC] font-bold">{tooltip.district} District</div>
            {tooltip.isActive ? (
              <div className="font-mono text-xs text-[#00F0FF] mt-0.5 uppercase tracking-wider flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                Reporting Surveillance Record
              </div>
            ) : (
              <div className="font-mono text-xs text-[#94A3B8] mt-0.5 uppercase tracking-wider">
                No Outbreak Record in Window
              </div>
            )}
            {selectedDisease === "malaria" && MALARIA_CONCENTRATION.districts.includes(tooltip.district) && (
              <div className="font-mono text-xs text-[#00F0FF] mt-1 font-bold">
                ★ Vidarbha Endemic Forest Cluster (61.4%)
              </div>
            )}
          </div>
        )}

        {/* Map Legend */}
        {showLegend && (
          <div className="absolute bottom-3 right-3 bg-[#06080F]/90 backdrop-blur-md border border-[#F8FAFC]/15 rounded-sm p-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-sm" style={{ background: DISEASE_COLORS[selectedDisease] + "CC" }} />
              <span className="font-mono text-xs text-[#F8FAFC] tracking-wider uppercase font-semibold">Reporting District</span>
            </div>
            {selectedDisease === "malaria" && (
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-sm bg-[#00F0FF]" />
                <span className="font-mono text-xs text-[#00F0FF] tracking-wider uppercase font-bold">Concentration Focus (61.4%)</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-sm bg-[#F8FAFC]/08 border border-[#F8FAFC]/20" />
              <span className="font-mono text-xs text-[#94A3B8] tracking-wider uppercase">Zero Outbreak Record</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
