"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { RefreshCw, CheckCircle2, ShieldAlert, MapPin, Compass } from "lucide-react";
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
  dengue: "#8B1414",       // Deep Crimson Burgundy
  add: "#5A7A72",          // Muted Sage Teal
  malaria: "#C9944A",      // Warm Amber Brass
  foodPoisoning: "#A83C28", // Terracotta Rust
  chikungunya: "#7E6080",  // Dusty Mauve Plum Slate
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

const VIEW_W = 940;
const VIEW_H = 640;

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
    if (!geoData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .attr("viewBox", `0 0 ${VIEW_W} ${VIEW_H}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // Setup D3 Mercator Projection fitted comfortably within 940x640 canvas
    const projection = d3.geoMercator()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .fitExtent([[42, 34], [VIEW_W - 42, VIEW_H - 34]], geoData as any);

    const pathGen = d3.geoPath().projection(projection);

    const activeDistricts = new Set(DISEASE_DISTRICTS[selectedDisease] ?? []);
    const color = DISEASE_COLORS[selectedDisease] ?? "#8B1414";
    const isMalaria = selectedDisease === "malaria";

    // SVG Definitions (Gradients & Filters)
    const defs = svg.append("defs");

    // Luxury Glow Filter for Hotspots
    const glowFilter = defs.append("filter")
      .attr("id", "d3-district-glow")
      .attr("x", "-30%")
      .attr("y", "-30%")
      .attr("width", "160%")
      .attr("height", "160%");
    glowFilter.append("feGaussianBlur")
      .attr("stdDeviation", "3.2")
      .attr("result", "coloredBlur");
    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Linear Gradient for Western Coast / Arabian Sea
    const seaGradient = defs.append("linearGradient")
      .attr("id", "sea-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    seaGradient.append("stop").attr("offset", "0%").attr("stop-color", "#0B1520").attr("stop-opacity", 0.55);
    seaGradient.append("stop").attr("offset", "80%").attr("stop-color", "#07090C").attr("stop-opacity", 0);

    // Map Container Group
    const mapContainer = svg.append("g").attr("class", "d3-map-container");

    // Layer 0: Arabian Sea Atmospheric Coastline Wash
    mapContainer.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 140)
      .attr("height", VIEW_H)
      .attr("fill", "url(#sea-gradient)")
      .attr("pointer-events", "none");

    // Arabian Sea Label along Western Margin
    mapContainer.append("text")
      .attr("transform", "translate(42, 340) rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("fill", "#A5A79B")
      .attr("font-size", "9.5px")
      .attr("font-family", "ui-monospace, SFMono-Regular, Menlo, monospace")
      .attr("letter-spacing", "0.32em")
      .attr("opacity", 0.35)
      .attr("pointer-events", "none")
      .text("ARABIAN SEA · WESTERN LITTORAL");

    // Layer 0.5: Precision Cartographic Grid Lines & Geodetic Crosshairs
    const gridGroup = mapContainer.append("g").attr("class", "d3-drafting-grid").attr("opacity", 0.12).attr("pointer-events", "none");
    const step = 70;
    for (let x = step; x < VIEW_W; x += step) {
      gridGroup.append("line")
        .attr("x1", x).attr("y1", 0)
        .attr("x2", x).attr("y2", VIEW_H)
        .attr("stroke", "#A5A79B")
        .attr("stroke-width", 0.5)
        .attr("stroke-dasharray", "2,6");
    }
    for (let y = step; y < VIEW_H; y += step) {
      gridGroup.append("line")
        .attr("x1", 0).attr("y1", y)
        .attr("x2", VIEW_W).attr("y2", y)
        .attr("stroke", "#A5A79B")
        .attr("stroke-width", 0.5)
        .attr("stroke-dasharray", "2,6");
    }

    // Geodetic Crosshairs (+) at key coordinate intersections
    const crosshairs = [
      [210, 140], [420, 140], [630, 140],
      [210, 350], [420, 350], [630, 350],
      [210, 560], [420, 560], [630, 560],
    ];
    crosshairs.forEach(([cx, cy]) => {
      gridGroup.append("line").attr("x1", cx - 4).attr("y1", cy).attr("x2", cx + 4).attr("y2", cy).attr("stroke", "#E8D2B5").attr("stroke-width", 0.8).attr("opacity", 0.3);
      gridGroup.append("line").attr("x1", cx).attr("y1", cy - 4).attr("x2", cx).attr("y2", cy + 4).attr("stroke", "#E8D2B5").attr("stroke-width", 0.8).attr("opacity", 0.3);
    });

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
        if (name === selectedDistrict) return "#E8D2B5";
        return activeDistricts.has(name) ? "rgba(232, 210, 181, 0.40)" : "rgba(165, 167, 155, 0.22)";
      })
      .attr("stroke-width", (d) => {
        const name = d.properties.district;
        if (name === selectedDistrict) return 2.6;
        return activeDistricts.has(name) ? 1.2 : 0.65;
      })
      .attr("fill", (d) => {
        const name = d.properties.district;
        if (!activeDistricts.has(name)) return "rgba(12, 16, 23, 0.90)";
        if (isMalaria && MALARIA_CONCENTRATION.districts.includes(name)) return "#590907";
        return `${color}D9`;
      })
      .style("cursor", "pointer")
      .style("transition", "fill 0.25s ease, stroke 0.25s ease");

    // D3 Interactive Hover & Click Listeners
    paths
      .on("mouseenter", function (event, d) {
        const name = d.properties.district;
        const isActive = activeDistricts.has(name);
        const isMalC = isMalaria && MALARIA_CONCENTRATION.districts.includes(name);

        d3.select(this)
          .attr("stroke", "#E8D2B5")
          .attr("stroke-width", 2.6)
          .attr("fill", !isActive ? "rgba(165, 167, 155, 0.22)" : isMalC ? "#7E1513" : color)
          .raise();

        if (containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          setTooltip({
            district: name,
            x: event.clientX - containerRect.left,
            y: event.clientY - containerRect.top - 14,
            isActive,
          });
        }
      })
      .on("mousemove", function (event) {
        if (containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          setTooltip((prev) => prev ? {
            ...prev,
            x: event.clientX - containerRect.left,
            y: event.clientY - containerRect.top - 14,
          } : null);
        }
      })
      .on("mouseleave", function (_, d) {
        const name = d.properties.district;
        const isActive = activeDistricts.has(name);
        const isMalC = isMalaria && MALARIA_CONCENTRATION.districts.includes(name);
        const isSelected = name === selectedDistrict;

        d3.select(this)
          .attr("stroke", isSelected ? "#E8D2B5" : isActive ? "rgba(232, 210, 181, 0.40)" : "rgba(165, 167, 155, 0.22)")
          .attr("stroke-width", isSelected ? 2.6 : isActive ? 1.2 : 0.65)
          .attr("fill", !isActive ? "rgba(12, 16, 23, 0.90)" : isMalC ? "#590907" : `${color}D9`);

        setTooltip(null);
      })
      .on("click", (_, d) => {
        const name = d.properties.district;
        setSelectedDistrict(name);
        if (onDistrictSelect) {
          onDistrictSelect(name);
        }
      });

    // Layer 2: District Centroid Labels for Key Hubs
    const labelGroup = mapContainer.append("g").attr("class", "d3-district-labels").attr("pointer-events", "none");

    geoData.features.forEach((feature) => {
      const name = feature.properties.district;
      if (KEY_LABELED_DISTRICTS.includes(name)) {
        const centroid = pathGen.centroid(feature as unknown as d3.GeoPermissibleObjects);
        if (centroid && !isNaN(centroid[0]) && !isNaN(centroid[1])) {
          const displayLabel = name === "Aurangabad" ? "Chh. Sambhajinagar" : name;

          // Charcoal halo for maximum readability against dark backgrounds
          labelGroup
            .append("text")
            .attr("x", centroid[0])
            .attr("y", centroid[1] + 3)
            .attr("text-anchor", "middle")
            .attr("fill", "#07090C")
            .attr("stroke", "#07090C")
            .attr("stroke-width", 3.2)
            .attr("stroke-linejoin", "round")
            .attr("font-size", "10.5px")
            .attr("font-family", "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif")
            .attr("font-weight", "700")
            .text(displayLabel);

          // Warm Cream foreground typography
          labelGroup
            .append("text")
            .attr("x", centroid[0])
            .attr("y", centroid[1] + 3)
            .attr("text-anchor", "middle")
            .attr("fill", "#E8D2B5")
            .attr("font-size", "10.5px")
            .attr("font-family", "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif")
            .attr("font-weight", "600")
            .text(displayLabel);
        }
      }
    });

    // Layer 3: Vidarbha Malaria Hotspot Beacon (when Malaria layer is active)
    if (isMalaria) {
      const gcFeature = geoData.features.find((f) => f.properties.district === "Gadchiroli");
      if (gcFeature) {
        const centroid = pathGen.centroid(gcFeature as unknown as d3.GeoPermissibleObjects);
        const beaconGroup = mapContainer.append("g").attr("class", "d3-malaria-beacon");

        // Primary Burgundy Pulsing Radar Wave via native SVG <animate> (zero CSS transform glitches)
        const wave1 = beaconGroup.append("circle")
          .attr("cx", centroid[0])
          .attr("cy", centroid[1])
          .attr("r", 12)
          .attr("fill", "none")
          .attr("stroke", "#590907")
          .attr("stroke-width", 2);
        wave1.append("animate")
          .attr("attributeName", "r")
          .attr("from", "10")
          .attr("to", "38")
          .attr("dur", "2.2s")
          .attr("repeatCount", "indefinite");
        wave1.append("animate")
          .attr("attributeName", "opacity")
          .attr("from", "0.9")
          .attr("to", "0")
          .attr("dur", "2.2s")
          .attr("repeatCount", "indefinite");

        // Secondary Cream Delayed Wave
        const wave2 = beaconGroup.append("circle")
          .attr("cx", centroid[0])
          .attr("cy", centroid[1])
          .attr("r", 8)
          .attr("fill", "none")
          .attr("stroke", "#E8D2B5")
          .attr("stroke-width", 1.5);
        wave2.append("animate")
          .attr("attributeName", "r")
          .attr("from", "6")
          .attr("to", "24")
          .attr("dur", "2.2s")
          .attr("begin", "0.5s")
          .attr("repeatCount", "indefinite");
        wave2.append("animate")
          .attr("attributeName", "opacity")
          .attr("from", "0.85")
          .attr("to", "0")
          .attr("dur", "2.2s")
          .attr("begin", "0.5s")
          .attr("repeatCount", "indefinite");

        // Steady Concentric Ring
        beaconGroup.append("circle")
          .attr("cx", centroid[0])
          .attr("cy", centroid[1])
          .attr("r", 13)
          .attr("fill", "none")
          .attr("stroke", "#E8D2B5")
          .attr("stroke-width", 1.6);

        // Core Focal Dot
        beaconGroup.append("circle")
          .attr("cx", centroid[0])
          .attr("cy", centroid[1])
          .attr("r", 5)
          .attr("fill", "#590907")
          .attr("stroke", "#E8D2B5")
          .attr("stroke-width", 1.2);

        // Callout Badge: 61.4% Focus
        const badgeX = centroid[0] - 65;
        const badgeY = centroid[1] - 44;

        beaconGroup.append("rect")
          .attr("x", badgeX)
          .attr("y", badgeY)
          .attr("width", 130)
          .attr("height", 24)
          .attr("rx", 3)
          .attr("fill", "#07090C")
          .attr("stroke", "#590907")
          .attr("stroke-width", 1.5)
          .attr("filter", "url(#d3-district-glow)");

        beaconGroup.append("text")
          .attr("x", centroid[0])
          .attr("y", badgeY + 16)
          .attr("text-anchor", "middle")
          .attr("fill", "#E8D2B5")
          .attr("font-size", "10.5px")
          .attr("font-family", "ui-monospace, SFMono-Regular, Menlo, monospace")
          .attr("font-weight", "bold")
          .text("61.4% Focus (43/70)");
      }
    }

    // Layer 4: Minimal Cartographic Scale & Cardinal Indicator
    const cartoGroup = mapContainer.append("g").attr("class", "d3-carto-scale").attr("pointer-events", "none");

    // Cardinal Indicator in Top-Right
    cartoGroup.append("text")
      .attr("x", VIEW_W - 60)
      .attr("y", 50)
      .attr("text-anchor", "middle")
      .attr("fill", "#E8D2B5")
      .attr("font-size", "12px")
      .attr("font-family", "ui-monospace, SFMono-Regular, Menlo, monospace")
      .attr("font-weight", "bold")
      .text("N");
    cartoGroup.append("path")
      .attr("d", `M ${VIEW_W - 60} 56 L ${VIEW_W - 64} 68 L ${VIEW_W - 60} 65 L ${VIEW_W - 56} 68 Z`)
      .attr("fill", "#590907")
      .attr("stroke", "#E8D2B5")
      .attr("stroke-width", 0.7);

    // Scale Bar in Bottom-Left
    const scaleX = 42;
    const scaleY = VIEW_H - 36;
    cartoGroup.append("line")
      .attr("x1", scaleX)
      .attr("y1", scaleY)
      .attr("x2", scaleX + 90)
      .attr("y2", scaleY)
      .attr("stroke", "#E8D2B5")
      .attr("stroke-width", 1.5);
    cartoGroup.append("line").attr("x1", scaleX).attr("y1", scaleY - 4).attr("x2", scaleX).attr("y2", scaleY + 4).attr("stroke", "#E8D2B5").attr("stroke-width", 1.5);
    cartoGroup.append("line").attr("x1", scaleX + 45).attr("y1", scaleY - 2.5).attr("x2", scaleX + 45).attr("y2", scaleY + 2.5).attr("stroke", "#E8D2B5").attr("stroke-width", 1);
    cartoGroup.append("line").attr("x1", scaleX + 90).attr("y1", scaleY - 4).attr("x2", scaleX + 90).attr("y2", scaleY + 4).attr("stroke", "#E8D2B5").attr("stroke-width", 1.5);
    cartoGroup.append("text")
      .attr("x", scaleX)
      .attr("y", scaleY + 16)
      .attr("fill", "#A5A79B")
      .attr("font-size", "9px")
      .attr("font-family", "ui-monospace, SFMono-Regular, Menlo, monospace")
      .text("0");
    cartoGroup.append("text")
      .attr("x", scaleX + 45)
      .attr("y", scaleY + 16)
      .attr("text-anchor", "middle")
      .attr("fill", "#A5A79B")
      .attr("font-size", "9px")
      .attr("font-family", "ui-monospace, SFMono-Regular, Menlo, monospace")
      .text("100 km");
    cartoGroup.append("text")
      .attr("x", scaleX + 90)
      .attr("y", scaleY + 16)
      .attr("text-anchor", "end")
      .attr("fill", "#A5A79B")
      .attr("font-size", "9px")
      .attr("font-family", "ui-monospace, SFMono-Regular, Menlo, monospace")
      .text("200 km");

  }, [geoData, selectedDisease, selectedDistrict, onDistrictSelect]);

  // Initial and reactive render
  useEffect(() => {
    renderMap();
  }, [renderMap]);

  const diseases = Object.keys(DISEASE_DISTRICTS);

  return (
    <div
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={`relative flex flex-col bg-[#07090C] transition-all duration-700 ease-out ${
        hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {/* Optional Standalone Header */}
      {showControls && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#E8D2B5] font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#590907] ring-1 ring-[#E8D2B5]/40 animate-pulse" />
              <span>{title} · D3.JS CARTOGRAPHIC VISUALIZATION</span>
            </div>
            <div className="font-mono text-xs text-[#A5A79B] mt-1">
              <span className="text-[#E8D2B5] font-bold">
                {DISEASE_DISTRICTS[selectedDisease]?.length ?? 0}
              </span>{" "}
              of 36 districts reporting outbreak events ·{" "}
              {selectedDisease === "malaria" ? (
                <span className="text-[#E8D2B5] font-semibold">
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
              className="px-3 py-1.5 bg-[#0B0E13] hover:bg-[#590907]/30 border border-[#E8D2B5]/25 text-[#E8D2B5] hover:text-[#FFF] rounded-xs font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Re-project D3 Maharashtra district boundaries"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Redraw Geometry</span>
            </button>
          </div>
        </div>
      )}

      {/* Optional Standalone Disease Filter Pills */}
      {showControls && (
        <div className="flex flex-wrap gap-2 mb-4">
          {diseases.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDisease(d)}
              className="font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-xs border transition-all cursor-pointer flex items-center gap-1.5"
              style={{
                borderColor: selectedDisease === d ? "#590907" : "rgba(232, 210, 181, 0.18)",
                color: selectedDisease === d ? "#E8D2B5" : "#A5A79B",
                background: selectedDisease === d ? "rgba(89, 9, 7, 0.35)" : "#0B0E13",
                fontWeight: selectedDisease === d ? "bold" : "normal",
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DISEASE_COLORS[d] }} />
              <span>{DISEASE_LABELS[d]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Spacious D3 SVG Map Stage */}
      <div className="relative w-full flex-1 min-h-[320px] sm:min-h-[480px] lg:min-h-[580px] bg-[#07090C] rounded-xs overflow-hidden flex items-center justify-center">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#07090C]/90 z-20">
            <div className="font-mono text-xs text-[#A5A79B] tracking-widest animate-pulse flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#590907] animate-bounce" />
              <span>D3.JS: COMPUTING MERCATOR PROJECTION & DISTRICT CENTROIDS…</span>
            </div>
          </div>
        )}

        <svg
          ref={svgRef}
          className="w-full h-full min-h-[320px] sm:min-h-[480px] lg:min-h-[580px] select-none"
          style={{ display: "block" }}
        />

        {/* Dynamic Responsive Floating Tooltip */}
        {tooltip && containerRef.current && (
          <div
            className="absolute pointer-events-none bg-[#0B0E13]/95 backdrop-blur-md border border-[#590907]/70 rounded-xs px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.95)] z-50 transition-all duration-75"
            style={{
              left: Math.min(Math.max(16, tooltip.x + 18), (containerRef.current?.clientWidth || 700) - 230),
              top: Math.max(16, tooltip.y - 10),
            }}
          >
            <div className="font-serif text-base text-[#E8D2B5] font-bold">
              {tooltip.district} District
            </div>
            {tooltip.isActive ? (
              <div className="font-mono text-xs text-[#E8D2B5] mt-1 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#590907]" />
                <span>Verified Outbreak Record</span>
              </div>
            ) : (
              <div className="font-mono text-xs text-[#A5A79B] mt-1 uppercase tracking-wider">
                Zero Outbreak Records
              </div>
            )}
            {selectedDisease === "malaria" && MALARIA_CONCENTRATION.districts.includes(tooltip.district) && (
              <div className="font-mono text-xs text-[#E8D2B5] mt-1.5 font-bold flex items-center gap-1 bg-[#590907]/30 border border-[#590907]/50 px-2 py-0.5 rounded-xs">
                <ShieldAlert className="w-3 h-3 text-[#590907]" />
                <span>Vidarbha Endemic Forest Cluster (61.4%)</span>
              </div>
            )}
          </div>
        )}

        {/* Map Legend */}
        {showLegend && (
          <div className="absolute bottom-3 right-3 bg-[#0B0E13]/95 backdrop-blur-md border border-[#E8D2B5]/20 rounded-xs p-2.5 sm:p-3 flex flex-col gap-2 shadow-2xl z-10 max-w-[210px] sm:max-w-xs text-[11px] sm:text-xs">
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#A5A79B] font-bold border-b border-white/[0.08] pb-1">
              SURVEILLANCE FOOTPRINT
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3.5 h-3.5 rounded-xs border border-white/20 shrink-0"
                style={{ background: `${DISEASE_COLORS[selectedDisease]}D9` }}
              />
              <span className="font-mono text-[11px] sm:text-xs text-[#E8D2B5] tracking-wider uppercase font-semibold">
                Reporting District
              </span>
            </div>
            {selectedDisease === "malaria" && (
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-xs bg-[#590907] border border-[#E8D2B5]/40 shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs text-[#E8D2B5] tracking-wider uppercase font-bold">
                  Vidarbha Clust. (61.4%)
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-xs bg-[#0C1017] border border-white/20 shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#A5A79B] tracking-wider uppercase">
                Zero Outbreaks
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Selected District Inspection Drawer */}
      {selectedDistrict && (
        <div className="p-3.5 bg-[#0B0E13] border border-[#590907]/60 rounded-xs shadow-xl animate-fade-in space-y-2 mt-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="font-serif text-lg font-bold text-[#E8D2B5]">
              {selectedDistrict} District
            </div>
            <button
              onClick={() => setSelectedDistrict(null)}
              className="text-xs font-mono text-[#A5A79B] hover:text-[#E8D2B5] px-2 py-0.5 bg-white/[0.04] rounded-xs cursor-pointer"
            >
              Clear ✕
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: DISEASE_COLORS[selectedDisease] }} />
            <span className="text-[#A5A79B] uppercase">{DISEASE_LABELS[selectedDisease]}:</span>
            <span className="font-bold text-[#E8D2B5]">
              {(DISEASE_DISTRICTS[selectedDisease] || []).includes(selectedDistrict) ? "Verified Outbreak Record" : "Zero Records"}
            </span>
          </div>

          {selectedDisease === "malaria" && MALARIA_CONCENTRATION.districts.includes(selectedDistrict) && (
            <div className="p-2 bg-[#590907]/20 border border-[#590907]/40 rounded-xs text-[11px] font-mono text-[#E8D2B5] flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-[#590907]" />
              <span>Vidarbha Endemic Focus: Part of 61.4% state malaria burden.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
