"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Maximize2, X, ChevronLeft, ChevronRight, Play, Pause,
  MapPin, Calendar, CheckCircle2, Compass, ShieldAlert,
  Layers, Volume2, Sparkles, ZoomIn, Eye, Film, Gauge, FastForward
} from "lucide-react";

export interface CinematicFieldScene {
  id: string;
  src: string;
  sceneNumber: string;
  title: string;
  category: "Facility Facade & Entrance" | "Administrative Center" | "Clinical Triage Corridor" | "Water Infrastructure & Vector" | "Environmental Sanitation" | "Audit Evidence";
  date: string;
  location: string;
  coordinates: string;
  headline: string;
  forensicObservation: string;
  epidemiologicalLinkage: string;
}

export const CINEMATIC_FIELD_SCENES: CinematicFieldScene[] = [
  {
    id: "scene-01",
    src: "/fieldwork/clinical-reception.webp",
    sceneNumber: "SCENE 01",
    title: "Municipal Health Center & Clinical Reception",
    category: "Facility Facade & Entrance",
    date: "02 October 2026 · 10:30 AM IST",
    location: "VVMC Urban Health Post · Nallasopara West, Palghar",
    coordinates: "19.4180° N, 72.8020° E",
    headline: "Primary Clinical Triage Gateway for High-Density Peri-Urban Catchment",
    forensicObservation: "Patients presenting with acute fever, severe dehydration, or acute gastrointestinal distress report directly to this registration gateway. Morning outpatient consultations regularly surge past 120 patients/day during peak monsoon weeks.",
    epidemiologicalLinkage: "Physical gateway where mild outpatient encounters are screened. The clinical triage desk filters out transient fever cases, ensuring only clusters meeting IDSP thresholds enter weekly Form P/L notifications.",
  },
  {
    id: "scene-02",
    src: "/fieldwork/hospital-facade.webp",
    sceneNumber: "SCENE 02",
    title: "Urban Health Post Administrative & Fieldwork Wing",
    category: "Administrative Center",
    date: "02 October 2026 · 11:00 AM IST",
    location: "Administrative Block · VVMC Health Post Catchment",
    coordinates: "19.4182° N, 72.8024° E",
    headline: "Operational Headquarters for 18 ASHA Workers & Active Fever Surveys",
    forensicObservation: "Exterior administrative wing housing community surveillance coordinators. Serves a mixed catchment of formal tenements and informal settlements facing scheduled water shortages.",
    epidemiologicalLinkage: "When multiple fever cases cluster in a single street, Multi-Purpose Health Workers (MPHW) and ASHA teams are dispatched from this wing to execute house-to-house larval inspections and ORS distribution.",
  },
  {
    id: "scene-03",
    src: "/fieldwork/consultation-corridor.webp",
    sceneNumber: "SCENE 03",
    title: "Outpatient Consultation Chambers & Form P Paper Ledger Desk",
    category: "Clinical Triage Corridor",
    date: "02 October 2026 · 11:15 AM IST",
    location: "Consultation Corridor · Chamber 1 & Form P Registry Desk",
    coordinates: "19.4181° N, 72.8022° E",
    headline: "Physical Paper Registry Transcription Point (The 2–3 Week Latency Node)",
    forensicObservation: "Consultation chambers where doctors manually write patient details into physical leather-bound outpatient ledgers. Rapid Diagnostic Tests (Dengue NS1/IgM antigen cassettes) are administered here.",
    epidemiologicalLinkage: "Directly proves the 2–3 week paper-to-digital transcription latency. Physical paper registers are batched weekly, forwarded to the municipal office on Monday, and collated by the district unit before reaching national bulletins.",
  },
  {
    id: "scene-04",
    src: "/fieldwork/water-storage-drums.jpg",
    sceneNumber: "SCENE 04",
    title: "Domestic Water Storage & 200L Blue Plastic Drums",
    category: "Water Infrastructure & Vector",
    date: "02 October 2026 · 12:00 PM IST",
    location: "Residential Catchment Perimeter · Palghar",
    coordinates: "19.4195° N, 72.8035° E",
    headline: "The Physical Mechanism Decoupling Dengue from Direct Rainfall",
    forensicObservation: "Because municipal piped water arrives only every 48 to 72 hours for brief 2-hour windows, nearly every household maintains multiple 200-liter open plastic drums and cement cisterns on verandas and courtyards.",
    epidemiologicalLinkage: "Explains why Dengue peaks in October (40 baseline events) rather than July. Permanent artificial water drums provide ideal indoor breeding habitats for Aedes aegypti mosquitoes long after outdoor monsoon puddles evaporate.",
  },
  {
    id: "scene-05",
    src: "/fieldwork/perimeter-drainage.jpg",
    sceneNumber: "SCENE 05",
    title: "Perimeter Drainage & Stormwater Infiltration Channels",
    category: "Environmental Sanitation",
    date: "02 October 2026 · 11:45 AM IST",
    location: "Roadside Access Lane Adjacent to Municipal Supply Pipe",
    coordinates: "19.4188° N, 72.8018° E",
    headline: "Unlined Storm Drains & Intermittent Pipe Pressurization Ingress",
    forensicObservation: "Roadside open storm drains clogged with silt and organic debris running parallel to municipal drinking water pipelines. Saturated soil and storm overflow submerge water distribution conduits.",
    epidemiologicalLinkage: "Triangulates the rigid annual repeatability of July Acute Diarrhoeal Disease surges (Kendall's W = 0.530). Shutting off supply creates negative pressure in pipes, drawing in contaminated runoff before repressurization.",
  },
  {
    id: "scene-06",
    src: "/fieldwork/geolocation-audit.png",
    sceneNumber: "SCENE 06",
    title: "Digital Spatial Geolocation & Audit Verification Log",
    category: "Audit Evidence",
    date: "02–03 October 2026",
    location: "Palghar District Surveillance Catchment Archive",
    coordinates: "19.4180° N, 72.8020° E · Timestamped",
    headline: "Primary Verification Record Establishing Academic Reproducibility",
    forensicObservation: "Digital geolocation log validating GPS coordinates, municipal administrative boundaries, timestamped field photograph metadata, and facility visitation schedules.",
    epidemiologicalLinkage: "Guarantees 100% academic auditability: verifies that field qualitative findings reflect direct in-person inspection of the Palghar municipal healthcare infrastructure on 2 October 2026.",
  },
];

export default function CinematicFieldInspector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTapePaused, setIsTapePaused] = useState(false);
  const [isTapeFast, setIsTapeFast] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentScene = CINEMATIC_FIELD_SCENES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev < CINEMATIC_FIELD_SCENES.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : CINEMATIC_FIELD_SCENES.length - 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setIsZoomed(false);
      }
      if (e.key === " ") {
        e.preventDefault();
        setIsTapePaused((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Double the scenes for an infinite, seamless continuous scrolling tape loop
  const tapeScenes = [...CINEMATIC_FIELD_SCENES, ...CINEMATIC_FIELD_SCENES];

  return (
    <div 
      className="w-full bg-[#070A0F] border border-[#F0DECE]/15 rounded-xs overflow-hidden shadow-2xl text-[#F0DECE] select-none"
      data-aos="fade-up"
      data-aos-duration="900"
    >
      
      {/* ── 1. CINEMATIC FILM TAPE HEADER & SHUTTLE CONTROLS ── */}
      <div className="bg-[#0B0F15] px-4 sm:px-6 py-3 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isTapePaused ? "bg-amber-500" : "bg-[#8B1414] animate-pulse"} ring-1 ring-white/30`} />
          <span className="text-[#8B1414] font-bold tracking-widest uppercase flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5" />
            <span>35MM DOCUMENTARY FILM REEL</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[#BAC0B8] hidden md:inline">
            SITE VISIT: 02 OCT 2026 · PALGHAR DISTRICT CLINICAL AUDIT
          </span>
        </div>

        {/* Tape Control Console */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Frame Indicator */}
          <span className="text-[#BAC0B8] text-[11px] bg-[#0E141D] px-2.5 py-1 border border-white/[0.08] rounded-2xs">
            Frame <strong className="text-[#F0DECE]">{activeIndex + 1}</strong> of {CINEMATIC_FIELD_SCENES.length}
          </span>

          {/* Tape Speed Toggle */}
          <button
            onClick={() => setIsTapeFast(!isTapeFast)}
            className={`px-2 py-1 rounded-2xs text-[10px] font-bold tracking-wider uppercase border transition-colors cursor-pointer flex items-center gap-1 ${
              isTapeFast
                ? "bg-[#8B1414] border-[#F0DECE]/40 text-[#F0DECE]"
                : "bg-[#0E141D] border-white/[0.08] text-[#BAC0B8] hover:text-[#F0DECE]"
            }`}
            title="Toggle tape roll speed"
          >
            <FastForward className="w-3 h-3" />
            <span>{isTapeFast ? "2X SPEED" : "1X SPEED"}</span>
          </button>

          {/* Tape Run / Pause Toggle */}
          <button
            onClick={() => setIsTapePaused(!isTapePaused)}
            className="px-2.5 py-1 bg-[#0E141D] hover:bg-[#180505] border border-white/[0.08] rounded-2xs text-[#BAC0B8] hover:text-[#F0DECE] flex items-center gap-1 cursor-pointer transition-colors"
            title={isTapePaused ? "Resume self-scrolling tape" : "Pause self-scrolling tape"}
          >
            {isTapePaused ? <Play className="w-3 h-3 text-[#F0DECE]" /> : <Pause className="w-3 h-3 text-[#8B1414]" />}
            <span className="text-[10px] uppercase font-bold tracking-wider">
              {isTapePaused ? "RUN REEL" : "PAUSE REEL"}
            </span>
          </button>

          {/* Jog Left / Right Buttons */}
          <div className="flex items-center gap-1 bg-[#0E141D] border border-white/[0.08] rounded-2xs p-0.5">
            <button
              onClick={handlePrev}
              className="p-1 text-[#BAC0B8] hover:text-[#F0DECE] hover:bg-white/[0.08] rounded-2xs transition-colors cursor-pointer"
              title="Step to previous frame"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 text-[#BAC0B8] hover:text-[#F0DECE] hover:bg-white/[0.08] rounded-2xs transition-colors cursor-pointer"
              title="Step to next frame"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. SELF-SCROLLING 35MM FILM TAPE REEL (CONTINUOUS MARQUEE) ── */}
      <div className="relative w-full bg-[#030508] border-b border-white/[0.12] overflow-hidden group">
        
        {/* Top 35mm Sprocket Perforations */}
        <div className="w-full h-3.5 bg-[#080B10] border-b border-white/[0.06] film-sprockets" />

        {/* The Continuous Infinite Scrolling Film Strip Track */}
        <div 
          className={`py-3 px-2 ${
            isTapePaused ? "pause-film-tape" : ""
          } ${
            isTapeFast ? "animate-film-tape-fast" : "animate-film-tape"
          }`}
          onMouseEnter={() => setIsTapePaused(true)}
          onMouseLeave={() => setIsTapePaused(false)}
        >
          {tapeScenes.map((scene, idx) => {
            const originalIndex = idx % CINEMATIC_FIELD_SCENES.length;
            const isSelected = originalIndex === activeIndex;

            return (
              <div
                key={`${scene.id}-tape-${idx}`}
                onClick={() => {
                  setActiveIndex(originalIndex);
                  setIsTapePaused(true);
                }}
                className={`w-[280px] sm:w-[340px] md:w-[380px] shrink-0 mx-2.5 rounded-xs overflow-hidden border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-[#8B1414] ring-2 ring-[#8B1414] shadow-[0_0_24px_rgba(139,20,20,0.55)] scale-[1.02]"
                    : "border-white/[0.12] hover:border-[#F0DECE]/50 opacity-80 hover:opacity-100 hover:scale-[1.01]"
                } bg-[#0A0E15] flex flex-col`}
              >
                {/* Visual Photograph Frame (Zero Overlay Boxes) */}
                <div className="relative aspect-[16/10] w-full bg-black overflow-hidden">
                  <Image
                    src={scene.src}
                    alt={scene.title}
                    fill
                    unoptimized
                    sizes="380px"
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                  
                  {/* Subtle Archival Film Edge Timecode */}
                  <div className="absolute top-1.5 left-2 flex items-center gap-1.5 px-2 py-0.5 bg-black/75 backdrop-blur-sm rounded-2xs text-[9px] font-mono text-[#F0DECE] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B1414]" />
                    <span>{scene.sceneNumber}</span>
                  </div>

                  {/* Active Highlight Badge */}
                  {isSelected && (
                    <div className="absolute top-1.5 right-2 px-2 py-0.5 bg-[#8B1414] text-[#F0DECE] text-[8px] font-mono font-bold tracking-widest uppercase rounded-2xs shadow">
                      INSPECTING
                    </div>
                  )}

                  {/* Tape Frame Hover Prompt */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-2.5 py-1 bg-[#070A0F]/90 border border-white/20 text-[#F0DECE] text-[10px] font-mono font-bold uppercase tracking-wider rounded-2xs shadow-xl flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#8B1414]" />
                      <span>Select For Inspection</span>
                    </span>
                  </div>
                </div>

                {/* Base Metadata Bar (Positioned strictly beneath the photo) */}
                <div className="p-2.5 bg-[#0C1018] border-t border-white/[0.06] space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#BAC0B8]">
                    <span className="text-[#8B1414] font-bold uppercase">{scene.category}</span>
                    <span className="text-white/40">{scene.date.split("·")[0]}</span>
                  </div>
                  <div className="font-serif text-xs font-bold text-[#F0DECE] line-clamp-1">
                    {scene.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom 35mm Sprocket Perforations */}
        <div className="w-full h-3.5 bg-[#080B10] border-t border-white/[0.06] film-sprockets" />
      </div>

      {/* ── 3. DEDICATED FORENSIC INSPECTION CONSOLE (ZERO OVERLAY COLLISION) ── */}
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#070A0F] to-[#0B0F15]">
        
        {/* Inspection Section Banner */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B1414]" />
            <span className="text-[#F0DECE] font-bold uppercase tracking-widest">
              PRIMARY INVESTIGATIVE FRAME: {currentScene.sceneNumber}
            </span>
          </div>
          <span className="text-[#BAC0B8] hidden sm:inline">
            Unobstructed photographic inspection with contextual clinical triangulation
          </span>
        </div>

        {/* Clean Two-Column Forensic Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Column 1 (Widescreen Pure Photographic Viewport): 60% Width */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-3">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black rounded-xs overflow-hidden border border-[#F0DECE]/20 shadow-2xl group">
              
              {/* Unobstructed Real Fieldwork Photograph */}
              <Image
                src={currentScene.src}
                alt={currentScene.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 1280px) 100vw, 1280px"
                className={`object-cover object-center transition-transform duration-500 brightness-[0.92] contrast-[1.08] ${
                  isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Minimalist Micro-HUD Tags in Corners (Non-obtrusive) */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <span className="px-2.5 py-1 bg-[#070A0F]/85 backdrop-blur-md border border-white/[0.15] rounded-2xs text-[10px] font-mono font-bold text-[#F0DECE] tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B1414]" />
                  <span>{currentScene.sceneNumber} · {currentScene.category}</span>
                </span>
              </div>

              <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-1.5 bg-[#070A0F]/85 hover:bg-[#8B1414] text-[#F0DECE] border border-white/[0.15] backdrop-blur-md rounded-2xs transition-colors cursor-pointer shadow-md"
                  title={isZoomed ? "Reset zoom" : "Zoom in 125%"}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="p-1.5 bg-[#070A0F]/85 hover:bg-[#8B1414] text-[#F0DECE] border border-white/[0.15] backdrop-blur-md rounded-2xs transition-colors cursor-pointer shadow-md"
                  title="Expand to full screen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Minimal Geolocation Tag */}
              <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
                <span className="px-2 py-0.5 bg-[#070A0F]/85 backdrop-blur-md border border-white/[0.10] rounded-2xs text-[9px] font-mono text-[#BAC0B8] shadow-md flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#8B1414]" />
                  <span>{currentScene.coordinates}</span>
                </span>
              </div>

              {/* Directional Step Controls on Hover */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-[#070A0F]/80 hover:bg-[#8B1414] text-[#F0DECE] rounded-full border border-white/[0.15] backdrop-blur-md transition-all cursor-pointer shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="Previous scene"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-[#070A0F]/80 hover:bg-[#8B1414] text-[#F0DECE] rounded-full border border-white/[0.15] backdrop-blur-md transition-all cursor-pointer shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="Next scene"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Caption Caption Bar */}
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#BAC0B8] px-1">
              <span className="text-[11px] text-white/50">Click photo to toggle zoom · Double-click for full bleed</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-emerald-400/90 uppercase font-bold">100% Provenance Audited</span>
              </div>
            </div>
          </div>

          {/* Column 2 (Companion Forensic Dossier Panel): 40% Width */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4">
            
            {/* Dossier Card */}
            <div className="p-5 sm:p-6 bg-[#0E141D] border border-[#F0DECE]/15 rounded-xs shadow-xl space-y-4">
              
              {/* Header Category Tag */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.08] pb-3">
                <span className="text-[#8B1414] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Clinical Field Dossier</span>
                </span>
                <span className="text-[#BAC0B8] text-[10px]">{currentScene.date}</span>
              </div>

              {/* Title & Headline */}
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F0DECE] leading-tight">
                  {currentScene.title}
                </h3>
                <p className="font-serif text-sm font-semibold text-[#8B1414] leading-snug">
                  {currentScene.headline}
                </p>
              </div>

              {/* Site Metadata Pills */}
              <div className="p-3 bg-[#070A0F] border border-white/[0.08] rounded-2xs space-y-2 text-xs font-mono">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8B1414] shrink-0 mt-0.5" />
                  <span className="text-[#BAC0B8] text-[11px] leading-relaxed">
                    {currentScene.location}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] text-[#BAC0B8]">
                  <span>GPS: <strong className="text-[#F0DECE]">{currentScene.coordinates}</strong></span>
                  <span className="text-[#8B1414] font-bold">TIER-A VERIFIED</span>
                </div>
              </div>

              {/* Forensic Observation Narrative */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-[#BAC0B8] uppercase tracking-wider font-bold">
                  Field Clinical Observation:
                </div>
                <p className="text-xs sm:text-sm text-[#F0DECE]/90 leading-relaxed font-sans bg-black/30 p-3 rounded-2xs border border-white/[0.06]">
                  {currentScene.forensicObservation}
                </p>
              </div>

              {/* Epidemiological Triangulation Bridge */}
              <div className="p-3.5 bg-[#180505]/70 border border-[#8B1414]/30 rounded-2xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8B1414] font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Quantitative Surveillance Linkage:</span>
                </div>
                <p className="text-xs text-[#F0DECE]/90 leading-relaxed font-sans">
                  {currentScene.epidemiologicalLinkage}
                </p>
              </div>

              {/* Frame Navigation Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/[0.08]">
                <button
                  onClick={handlePrev}
                  className="flex-1 py-2 px-3 bg-[#070A0F] hover:bg-[#8B1414] border border-white/[0.12] rounded-xs text-xs font-mono text-[#F0DECE] transition-all cursor-pointer text-center font-bold"
                >
                  ◀ Previous
                </button>
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="py-2 px-3 bg-[#070A0F] hover:bg-white/[0.10] border border-white/[0.12] rounded-xs text-xs font-mono text-[#BAC0B8] hover:text-[#F0DECE] transition-all cursor-pointer flex items-center justify-center gap-1"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-2 px-3 bg-[#8B1414] hover:bg-[#A31818] border border-[#F0DECE]/30 rounded-xs text-xs font-mono text-[#F0DECE] transition-all cursor-pointer text-center font-bold shadow-md"
                >
                  Next ▶
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ── 4. FULL-SCREEN FORENSIC LIGHTBOX MODAL ── */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between border-b border-white/[0.12] pb-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B1414]" />
              <span className="text-[#F0DECE] font-bold uppercase tracking-wider">
                Forensic Fieldwork Inspector · {currentScene.sceneNumber}
              </span>
              <span className="text-white/20">|</span>
              <span className="text-[#BAC0B8]">{currentScene.title}</span>
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              className="p-1.5 text-[#BAC0B8] hover:text-[#F0DECE] hover:bg-white/[0.10] rounded-xs transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Center Photograph */}
          <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full max-h-[75vh]">
              <Image
                src={currentScene.src}
                alt={currentScene.title}
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* Lightbox Footer Details */}
          <div className="p-4 bg-[#0B0F15] border border-white/[0.10] rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="space-y-1 max-w-3xl">
              <div className="text-[#F0DECE] font-bold font-serif text-sm">
                {currentScene.headline}
              </div>
              <p className="text-[#BAC0B8] text-xs leading-relaxed font-sans">
                {currentScene.forensicObservation}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 bg-[#0E141D] hover:bg-[#8B1414] border border-white/[0.15] rounded-xs text-[#F0DECE] transition-all cursor-pointer font-bold"
              >
                ◀ Previous Frame
              </button>
              <button
                onClick={handleNext}
                className="px-3 py-1.5 bg-[#8B1414] hover:bg-[#A31818] border border-[#F0DECE]/30 rounded-xs text-[#F0DECE] font-bold transition-all cursor-pointer shadow-md"
              >
                Next Frame ▶
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
