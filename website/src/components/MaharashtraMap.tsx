"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { RefreshCw, CheckCircle2, ShieldAlert, MapPin } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export const DISEASE_DISTRICTS: Record<string, string[]> = {
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

export const DISEASE_COLORS: Record<string, string> = {
  dengue: "#38BDF8",
  add: "#10B981",
  malaria: "#F59E0B",
  foodPoisoning: "#EF4444",
  chikungunya: "#A78BFA",
};

export const DISEASE_LABELS: Record<string, string> = {
  dengue: "Dengue (31 Districts)",
  add: "ADD (33 Districts)",
  malaria: "Malaria (15 Districts · Vidarbha Focus)",
  foodPoisoning: "Food Poisoning (27 Districts)",
  chikungunya: "Chikungunya (15 Districts)",
};

const KEY_LABELED_DISTRICTS = [
  "Mumbai", "Pune", "Nagpur", "Gadchiroli", "Nashik", "Aurangabad", "Kolhapur", "Thane", "Amravati"
];

const MALARIA_CONCENTRATION = {
  districts: ["Gadchiroli", "Chandrapur"],
  events: 43,
  total: 70,
  pct: "61.4%",
};

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
  showControls?: boolean;
  title?: string;
  onDistrictSelect?: (districtName: string) => void;
}

export default function MaharashtraMap({
  activeDisease = "dengue",
  className = "",
  showLegend = true,
  showControls = true,
  title = "District Reporting Footprint",
  onDistrictSelect,
}: MaharashtraMapProps) {
  const { ref: inViewRef, hasAnimated } = useInViewAnimation({ threshold: 0.1 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [selectedDisease, setSelectedDisease] = useState(activeDisease);
  const [prevActiveDisease, setPrevActiveDisease] = useState(activeDisease);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  if (prevActiveDisease !== activeDisease) {
    setPrevActiveDisease(activeDisease);
    setSelectedDisease(activeDisease);
  }

  // Load Maharashtra GeoJSON
  useEffect(() => {
    fetch("/data/maharashtra-districts.json")
      .then((r) => r.json())
      .then((data: GeoData) => {
        setGeoData(data);
        setLoaded(true);
      })
      .catch((err) => console.error("Error loading Maharashtra GeoJSON:", err));
  }, []);

  // Primary D3.js Cartographic Visualization Engine
  const renderMap = useCallback(() => {
    if (!geoData || !svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Determine dimensions with robust fallback
    const rect = svgRef.current.getBoundingClientRect();
    const containerW = Math.max(rect.width || containerRef.current.clientWidth || 700, 320);
    const containerH = Math.max(rect.height || 540, 480);

    // Setup D3 Mercator Projection fitted comfortably within canvas
    const projection = d3.geoMercator()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .fitExtent([[32, 32], [containerW - 32, containerH - 32]], geoData as any);

    const pathGen = d3.geoPath().projection(projection);

    const activeDistricts = new Set(DISEASE_DISTRICTS[selectedDisease] ?? []);
    const color = DISEASE_COLORS[selectedDisease] ?? "#38BDF8";
    const isMalaria = selectedDisease === "malaria";

    // Setup SVG Definitions (Gradients & Glow Filters)
    const defs = svg.append("defs");

    const filter = defs.append("filter")
      .attr("id", "d3-district-glow")
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "140%")
      .attr("height", "140%");
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "3.5")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Static Map Group (no zoom transform hijacking)
    const mapContainer = svg.append("g").attr("class", "d3-map-container");

    // Background Subtle Drafting Grid
    const gridGroup = mapContainer.append("g").attr("class", "d3-drafting-grid").attr("opacity", 0.15);
    const step = 60;
    for (let x = 0; x < containerW; x += step) {
      gridGroup.append("line")
        .attr("x1", x)
        .attr("y1", 0)
        .attr("x2", x)
        .attr("y2", containerH)
        .attr("stroke", "#D7B56D")
        .attr("stroke-width", 0.5)
        .attr("stroke-dasharray", "2,6");
    }
    for (let y = 0; y < containerH; y += step) {
      gridGroup.append("line")
        .attr("x1", 0)
        .attr("y1", y)
        .attr("x2", containerW)
        .attr("y2", y)
        .attr("stroke", "#D7B56D")
        .attr("stroke-width", 0.5)
        .attr("stroke-dasharray", "2,6");
    }

    // Layer 1: District Polygons via D3 Data Join
    const districtsGroup = mapContainer.append("g").attr("class", "d3-districts");

    const paths = districtsGroup
      .selectAll<SVGPathElement, GeoFeature>("path.district-path")
      .data(geoData.features, (d) => d.properties.district)
      .join("path")
      .attr("class", "district-path")
      .attr("d", (d) => pathGen(d as unknown as d3.GeoPermissibleObjects) ?? "")
      .attr("stroke", (d) => {
        const name = d.properties.district;
        if (name === selectedDistrict) return "#F5F1E8";
        return activeDistricts.has(name) ? "rgba(215, 181, 109, 0.65)" : "rgba(255, 255, 255, 0.12)";
      })
      .attr("stroke-width", (d) => {
        const name = d.properties.district;
        if (name === selectedDistrict) return 2.4;
        return activeDistricts.has(name) ? 1.1 : 0.6;
      })
      .attr("fill", (d) => {
        const name = d.properties.district;
        if (!activeDistricts.has(name)) return "rgba(10, 16, 22, 0.78)";
        if (isMalaria && MALARIA_CONCENTRATION.districts.includes(name)) return "#5FB0A8";
        return `${color}B3`; // ~70% opacity
      })
      .style("cursor", "pointer")
      .style("transition", "fill 0.35s ease, stroke 0.25s ease");

    // D3 Interactive Hover & Click Listeners
    paths
      .on("mouseenter", function (event, d) {
        const name = d.properties.district;
        const isActive = activeDistricts.has(name);
        const isMalC = isMalaria && MALARIA_CONCENTRATION.districts.includes(name);

        d3.select(this)
          .attr("stroke", "#5FB0A8")
          .attr("stroke-width", 2.4)
          .attr("fill", !isActive ? "rgba(255, 255, 255, 0.15)" : isMalC ? "#6EE7B7" : color)
          .raise();

        const svgBounding = svgRef.current!.getBoundingClientRect();
        setTooltip({
          district: name,
          x: event.clientX - svgBounding.left,
          y: event.clientY - svgBounding.top - 12,
          isActive,
        });
      })
      .on("mouseleave", function (_, d) {
        const name = d.properties.district;
        const isActive = activeDistricts.has(name);
        const isMalC = isMalaria && MALARIA_CONCENTRATION.districts.includes(name);
        const isSelected = name === selectedDistrict;

        d3.select(this)
          .attr("stroke", isSelected ? "#F5F1E8" : isActive ? "rgba(215, 181, 109, 0.65)" : "rgba(255, 255, 255, 0.12)")
          .attr("stroke-width", isSelected ? 2.4 : isActive ? 1.1 : 0.6)
          .attr("fill", !isActive ? "rgba(10, 16, 22, 0.78)" : isMalC ? "#5FB0A8" : `${color}B3`);

        setTooltip(null);
      })
      .on("click", (_, d) => {
        const name = d.properties.district;
        setSelectedDistrict(name);
        if (onDistrictSelect) {
          onDistrictSelect(name);
        }
      });

    // Layer 2: D3 Centroid District Labels
    const labelGroup = mapContainer.append("g").attr("class", "d3-district-labels").attr("pointer-events", "none");

    geoData.features.forEach((feature) => {
      const name = feature.properties.district;
      if (KEY_LABELED_DISTRICTS.includes(name)) {
        const centroid = pathGen.centroid(feature as unknown as d3.GeoPermissibleObjects);
        if (centroid && !isNaN(centroid[0]) && !isNaN(centroid[1])) {
          // Label shadow/halo for maximum legibility
          labelGroup
            .append("text")
            .attr("x", centroid[0])
            .attr("y", centroid[1] + 3)
            .attr("text-anchor", "middle")
            .attr("fill", "#070A10")
            .attr("stroke", "#070A10")
            .attr("stroke-width", 3.2)
            .attr("stroke-linejoin", "round")
            .attr("font-size", "11px")
            .attr("font-family", "ui-sans-serif, system-ui, sans-serif")
            .attr("font-weight", "700")
            .text(name);

          // Label crisp foreground text
          labelGroup
            .append("text")
            .attr("x", centroid[0])
            .attr("y", centroid[1] + 3)
            .attr("text-anchor", "middle")
            .attr("fill", "#F5F1E8")
            .attr("font-size", "11px")
            .attr("font-family", "ui-sans-serif, system-ui, sans-serif")
            .attr("font-weight", "600")
            .text(name);
        }
      }
    });

    // Layer 3: D3 Vidarbha Malaria Hotspot Beacon (when Malaria layer is active)
    if (isMalaria) {
      const gcFeature = geoData.features.find((f) => f.properties.district === "Gadchiroli");
      if (gcFeature) {
        const centroid = pathGen.centroid(gcFeature as unknown as d3.GeoPermissibleObjects);

        const beaconGroup = mapContainer.append("g").attr("class", "d3-malaria-beacon");

        // Animated Ping Ring
        beaconGroup.append("circle")
          .attr("cx", centroid[0])
          .attr("cy", centroid[1])
          .attr("r", 28)
          .attr("fill", "none")
          .attr("stroke", "#5FB0A8")
          .attr("stroke-width", 2)
          .attr("stroke-opacity", 0.9)
          .attr("class", "animate-ping");

        // Outer Highlight Ring
        beaconGroup.append("circle")
          .attr("cx", centroid[0])
          .attr("cy", centroid[1])
          .attr("r", 14)
          .attr("fill", "none")
          .attr("stroke", "#5FB0A8")
          .attr("stroke-width", 2);

        // Core Focal Dot
        beaconGroup.append("circle")
          .attr("cx", centroid[0])
          .attr("cy", centroid[1])
          .attr("r", 5)
          .attr("fill", "#5FB0A8");

        // High-visibility Callout Badge
        const badgeX = centroid[0] - 55;
        const badgeY = centroid[1] - 40;

        beaconGroup.append("rect")
          .attr("x", badgeX)
          .attr("y", badgeY)
          .attr("width", 110)
          .attr("height", 24)
          .attr("rx", 3)
          .attr("fill", "#070A10")
          .attr("stroke", "#5FB0A8")
          .attr("stroke-width", 1.5)
          .attr("filter", "url(#d3-district-glow)");

        beaconGroup.append("text")
          .attr("x", centroid[0])
          .attr("y", badgeY + 16)
          .attr("text-anchor", "middle")
          .attr("fill", "#5FB0A8")
          .attr("font-size", "11px")
          .attr("font-family", "JetBrains Mono, monospace")
          .attr("font-weight", "bold")
          .text("61.4% Focus (43/70)");
      }
    }
  }, [geoData, selectedDisease, selectedDistrict, onDistrictSelect]);

  // Initial and reactive render
  useEffect(() => {
    renderMap();
  }, [renderMap]);

  // ResizeObserver for dynamic responsiveness
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      renderMap();
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [renderMap]);

  const diseases = Object.keys(DISEASE_DISTRICTS);

  return (
    <div
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={`relative flex flex-col bg-[#0A1016] border border-white/[0.1] rounded-sm p-4 sm:p-6 shadow-2xl transition-all duration-700 ease-out ${
        hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {/* In-Map Header */}
      {showControls && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#D7B56D] font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D7B56D] animate-pulse" />
              <span>{title} · D3.JS CARTOGRAPHIC VISUALIZATION</span>
            </div>
            <div className="font-mono text-xs text-[#A8B6BA] mt-1">
              <span className="text-[#F5F1E8] font-bold">
                {DISEASE_DISTRICTS[selectedDisease]?.length ?? 0}
              </span>{" "}
              of 36 districts reporting outbreak events ·{" "}
              {selectedDisease === "malaria" ? (
                <span className="text-[#5FB0A8] font-semibold">
                  Gadchiroli (29) + Chandrapur (14) = 61.4% of total events
                </span>
              ) : (
                <span>Hover or tap any district to inspect surveillance history</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => renderMap()}
              className="px-3 py-1.5 bg-[#070A10] hover:bg-white/[0.06] border border-white/15 text-[#D7B56D] hover:text-[#F5F1E8] rounded-xs font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Re-project D3 Maharashtra district boundaries"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Redraw Geometry</span>
            </button>
          </div>
        </div>
      )}

      {/* Disease Filter Pills */}
      {showControls && (
        <>
          {/* Mobile Horizontal Scrollable Chips */}
          <div className="flex sm:hidden overflow-x-auto gap-2 pb-2 mb-3 no-scrollbar">
            {diseases.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDisease(d)}
                className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-xs border transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                style={{
                  borderColor: selectedDisease === d ? DISEASE_COLORS[d] : "rgba(255, 255, 255, 0.12)",
                  color: selectedDisease === d ? DISEASE_COLORS[d] : "#A8B6BA",
                  background: selectedDisease === d ? `${DISEASE_COLORS[d]}20` : "#070A10",
                  fontWeight: selectedDisease === d ? "bold" : "normal",
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DISEASE_COLORS[d] }} />
                <span>{DISEASE_LABELS[d]}</span>
              </button>
            ))}
          </div>

          {/* Desktop Wrap Pills */}
          <div className="hidden sm:flex flex-wrap gap-2 mb-4">
            {diseases.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDisease(d)}
                className="font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-xs border transition-all cursor-pointer flex items-center gap-1.5"
                style={{
                  borderColor: selectedDisease === d ? DISEASE_COLORS[d] : "rgba(255, 255, 255, 0.12)",
                  color: selectedDisease === d ? DISEASE_COLORS[d] : "#A8B6BA",
                  background: selectedDisease === d ? `${DISEASE_COLORS[d]}20` : "#070A10",
                  fontWeight: selectedDisease === d ? "bold" : "normal",
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DISEASE_COLORS[d] }} />
                <span>{DISEASE_LABELS[d]}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Spacious D3 SVG Map Stage (Height min 380px on mobile, 560px on tablet, 620px on desktop) */}
      <div className="relative flex-1 min-h-[380px] sm:min-h-[520px] lg:min-h-[620px] bg-[#070A10] rounded-xs overflow-hidden border border-white/[0.06] flex items-center justify-center">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#070A10]/90 z-20">
            <div className="font-mono text-xs text-[#5FB0A8] tracking-widest animate-pulse flex items-center gap-2">
              <MapPin className="w-4 h-4 animate-bounce" />
              <span>D3.JS: COMPUTING MERCATOR PROJECTION & DISTRICT CENTROIDS…</span>
            </div>
          </div>
        )}

        <svg
          ref={svgRef}
          className="w-full h-full min-h-[380px] sm:min-h-[520px] lg:min-h-[620px]"
          style={{ display: "block" }}
        />

        {/* Floating Tooltip */}
        {tooltip && (
          <div
            className="absolute pointer-events-none bg-[#0A1016]/95 backdrop-blur-md border border-[#5FB0A8]/60 rounded-xs px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.8)] z-50 transition-transform"
            style={{ left: Math.min(tooltip.x + 16, 520), top: Math.max(tooltip.y, 20) }}
          >
            <div className="font-serif text-base text-[#F5F1E8] font-bold">
              {tooltip.district} District
            </div>
            {tooltip.isActive ? (
              <div className="font-mono text-xs text-[#5FB0A8] mt-1 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5FB0A8]" />
                <span>Reporting Outbreak Record</span>
              </div>
            ) : (
              <div className="font-mono text-xs text-[#87999E] mt-1 uppercase tracking-wider">
                Zero Outbreak Records in Cohort
              </div>
            )}
            {selectedDisease === "malaria" && MALARIA_CONCENTRATION.districts.includes(tooltip.district) && (
              <div className="font-mono text-xs text-[#D7B56D] mt-1.5 font-bold flex items-center gap-1 bg-[#D7B56D]/10 px-2 py-0.5 rounded-xs">
                <ShieldAlert className="w-3 h-3 text-[#D7B56D]" />
                <span>Vidarbha Endemic Forest Cluster (61.4%)</span>
              </div>
            )}
          </div>
        )}

        {/* Map Legend */}
        {showLegend && (
          <div className="absolute bottom-3 right-3 bg-[#0A1016]/95 backdrop-blur-md border border-white/15 rounded-xs p-2.5 sm:p-3.5 flex flex-col gap-2 shadow-2xl z-10 max-w-[210px] sm:max-w-xs text-[11px] sm:text-xs">
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#87999E] font-bold border-b border-white/[0.08] pb-1">
              SURVEILLANCE LEGEND (D3.JS)
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3.5 h-3.5 rounded-xs border border-white/20 shrink-0"
                style={{ background: `${DISEASE_COLORS[selectedDisease]}CC` }}
              />
              <span className="font-mono text-[11px] sm:text-xs text-[#F5F1E8] tracking-wider uppercase font-semibold">
                Reporting District
              </span>
            </div>
            {selectedDisease === "malaria" && (
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-xs bg-[#5FB0A8] border border-white/30 shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs text-[#5FB0A8] tracking-wider uppercase font-bold">
                  Vidarbha Clust. (61.4%)
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-xs bg-[#0A1016] border border-white/20 shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#87999E] tracking-wider uppercase">
                Zero Outbreaks
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Selected District Inspection Sheet (block sm:hidden) */}
      {selectedDistrict && (
        <div className="block sm:hidden p-3.5 bg-[#0B111E] border border-[#5FB0A8]/50 rounded-xs shadow-xl animate-fade-in space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="font-serif text-lg font-bold text-[#F5F1E8]">
              {selectedDistrict} District
            </div>
            <button
              onClick={() => setSelectedDistrict(null)}
              className="text-xs font-mono text-[#87999E] hover:text-[#F5F1E8] px-2 py-0.5 bg-white/[0.04] rounded-xs"
            >
              Clear ✕
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: DISEASE_COLORS[selectedDisease] }} />
            <span className="text-[#A8B6BA] uppercase">{DISEASE_LABELS[selectedDisease]}:</span>
            <span className="font-bold text-[#F5F1E8]">
              {(DISEASE_DISTRICTS[selectedDisease] || []).includes(selectedDistrict) ? "Verified Outbreak Record" : "Zero Records"}
            </span>
          </div>

          {selectedDisease === "malaria" && MALARIA_CONCENTRATION.districts.includes(selectedDistrict) && (
            <div className="p-2 bg-[#D7B56D]/10 border border-[#D7B56D]/30 rounded-xs text-[11px] font-mono text-[#D7B56D] flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-[#D7B56D]" />
              <span>Vidarbha Endemic Focus: Part of 61.4% state malaria burden.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
