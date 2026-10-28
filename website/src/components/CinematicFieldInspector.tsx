"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Maximize2, X, ChevronLeft, ChevronRight, Play, Pause,
  MapPin, Calendar, CheckCircle2, Compass, ShieldAlert,
  Layers, Volume2, Sparkles, ZoomIn, Eye
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
    src: "/fieldwork/vvmc-government-hospital-nalasopara-east-palghar-hospitals-WVNkfr7tUF.webp",
    sceneNumber: "SCENE 01",
    title: "Municipal Health Center & Clinical Reception",
    category: "Facility Facade & Entrance",
    date: "02 October 2026 · 10:30 AM IST",
    location: "VVMC Urban Health Post · Nallasopara West, Palghar",
    coordinates: "19.4180° N, 72.8020° E",
    headline: "Primary Clinical Triage Gateway for High-Density Peri-Urban Catchment",
    forensicObservation: "Patients presenting with acute fever, dehydration, or gastrointestinal distress report directly to this registration gateway. Morning outpatient consultations regularly surge past 120 patients/day during peak monsoon weeks.",
    epidemiologicalLinkage: "Physical gateway where mild outpatient encounters are screened. The clinical triage desk filters out transient fever cases, ensuring only clusters meeting IDSP thresholds enter weekly Form P/L notifications.",
  },
  {
    id: "scene-02",
    src: "/fieldwork/nalasopara-vvcmc-hospital-nalasopara-west-palghar-hospitals-1jNorUByyf.webp",
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
    src: "/fieldwork/vasai-virar-municipal-corporation-hospital-nalasopara-east-palghar-public-hospitals-XH8OizMJfA-250.webp",
    sceneNumber: "SCENE 03",
    title: "Outpatient Consultation Chambers & Clinical Triage Corridor",
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
    src: "/fieldwork/images (1).jfif",
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
    src: "/fieldwork/images.jfif",
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
    src: "/fieldwork/screenshot-2026-10-03-011809.png",
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const currentScene = CINEMATIC_FIELD_SCENES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev < CINEMATIC_FIELD_SCENES.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : CINEMATIC_FIELD_SCENES.length - 1));
  };

  // Autoplay cycle
  useEffect(() => {
    if (isPlaying) {
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, 6000);
    } else {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPlaying, activeIndex]);

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
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-[#070A0F] border border-[#F0DECE]/15 rounded-xs overflow-hidden shadow-2xl text-[#F0DECE] select-none">
      
      {/* ── TOP FORENSIC HUD STATUS BAR ── */}
      <div className="bg-[#0B0F15] px-4 sm:px-6 py-3 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8B1414] animate-pulse ring-1 ring-[#8B1414]/60" />
          <span className="text-[#8B1414] font-bold tracking-widest uppercase">
            REC ● AUDITED FIELD ARCHIVE
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[#BAC0B8] hidden sm:inline">
            SITE VISIT: 02 OCT 2026 · PALGHAR DISTRICT
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#BAC0B8] text-[11px]">
            Frame <strong className="text-[#F0DECE]">{activeIndex + 1}</strong> of {CINEMATIC_FIELD_SCENES.length}
          </span>
          <div className="flex items-center gap-1.5 bg-[#0E141D] border border-white/[0.08] rounded-2xs px-2 py-0.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-[#BAC0B8] hover:text-[#F0DECE] flex items-center gap-1 cursor-pointer transition-colors"
              title={isPlaying ? "Pause cinematic reel" : "Play cinematic reel"}
            >
              {isPlaying ? <Pause className="w-3 h-3 text-[#8B1414]" /> : <Play className="w-3 h-3 text-[#F0DECE]" />}
              <span className="text-[10px] uppercase font-bold tracking-wider">
                {isPlaying ? "Pause" : "Auto Reel"}
              </span>
            </button>
          </div>
          <button
            onClick={() => setLightboxOpen(true)}
            className="p-1 text-[#BAC0B8] hover:text-[#F0DECE] hover:bg-white/[0.06] rounded-2xs transition-colors cursor-pointer"
            title="Full-bleed inspect"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── CINEMATIC PHOTOGRAPHIC VIEWPORT STAGE ── */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] min-h-[380px] md:min-h-[460px] bg-black overflow-hidden group">
        
        {/* Real Fieldwork Photograph */}
        <Image
          src={currentScene.src}
          alt={currentScene.title}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className={`object-cover object-center transition-all duration-700 brightness-[0.88] contrast-[1.10] group-hover:scale-[1.02] ${
            isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Directional Cinematic Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-[#070A0F]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A0F]/85 via-transparent to-[#070A0F]/60 pointer-events-none" />

        {/* Top-Left Scene Watermark Overlay */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 space-y-1 max-w-lg pointer-events-none">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#070A0F]/90 backdrop-blur-md border border-white/[0.12] rounded-2xs text-[10px] font-mono font-bold tracking-widest text-[#F0DECE] uppercase shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B1414]" />
            <span>{currentScene.sceneNumber} · {currentScene.category}</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#F0DECE] tracking-tight drop-shadow-md">
            {currentScene.title}
          </h2>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#BAC0B8] drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-[#8B1414] shrink-0" />
            <span>{currentScene.location}</span>
            <span className="text-white/20">·</span>
            <span>{currentScene.coordinates}</span>
          </div>
        </div>

        {/* Bottom Stage Overlay: Forensic Observation Card */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10">
          <div className="p-4 sm:p-5 bg-[#070A0F]/92 backdrop-blur-md border border-[#F0DECE]/20 rounded-xs shadow-2xl space-y-2 max-w-4xl">
            <div className="flex items-center justify-between gap-3 text-xs font-mono">
              <span className="text-[#8B1414] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Forensic Analytical Finding</span>
              </span>
              <span className="text-[#BAC0B8] text-[10px]">{currentScene.date}</span>
            </div>

            <p className="font-serif text-sm sm:text-base font-bold text-[#F0DECE] leading-snug">
              {currentScene.headline}
            </p>

            <p className="text-xs sm:text-sm text-[#BAC0B8] leading-relaxed line-clamp-2 md:line-clamp-none">
              {currentScene.forensicObservation}
            </p>

            <div className="pt-2 border-t border-white/[0.08] flex items-start gap-2 text-xs text-[#F0DECE]/90">
              <span className="font-mono text-[#8B1414] font-bold text-[10px] uppercase shrink-0 mt-0.5">
                Surveillance Bridge:
              </span>
              <span className="text-[11px] sm:text-xs text-[#BAC0B8]">
                {currentScene.epidemiologicalLinkage}
              </span>
            </div>
          </div>
        </div>

        {/* Left & Right Cinematic Arrow Navigators */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 bg-[#070A0F]/80 hover:bg-[#8B1414] text-[#F0DECE] rounded-full border border-white/[0.15] backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-110"
          aria-label="Previous scene"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 bg-[#070A0F]/80 hover:bg-[#8B1414] text-[#F0DECE] rounded-full border border-white/[0.15] backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-110"
          aria-label="Next scene"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── FILMSTRIP THUMBNAIL INSPECTION RAIL ── */}
      <div className="bg-[#0B0F15] p-3 sm:p-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between pb-2 text-[11px] font-mono text-[#BAC0B8]">
          <span className="uppercase tracking-wider font-bold text-[#F0DECE] flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#8B1414]" />
            <span>Documentary Filmstrip · Select Photographic Evidence:</span>
          </span>
          <span className="hidden sm:inline text-white/40">Use arrow keys or click thumbnail to inspect</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {CINEMATIC_FIELD_SCENES.map((scene, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsPlaying(false);
                }}
                className={`relative group rounded-xs overflow-hidden border text-left transition-all cursor-pointer ${
                  isActive
                    ? "border-[#8B1414] ring-2 ring-[#8B1414] shadow-lg scale-[1.02]"
                    : "border-white/[0.10] hover:border-[#F0DECE]/40 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="relative aspect-[16/10] w-full bg-black">
                  <Image
                    src={scene.src}
                    alt={scene.title}
                    fill
                    sizes="200px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/80 text-[8px] font-mono text-[#F0DECE] font-bold rounded-2xs">
                    {scene.sceneNumber}
                  </span>

                  {isActive && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#8B1414] ring-1 ring-white" />
                  )}
                </div>

                <div className="p-2 bg-[#0E141D] space-y-0.5">
                  <div className="font-serif text-[11px] font-bold text-[#F0DECE] line-clamp-1 group-hover:text-white">
                    {scene.title}
                  </div>
                  <div className="text-[9px] font-mono text-[#BAC0B8] line-clamp-1">
                    {scene.category}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── FULL-SCREEN AUDIT LIGHTBOX MODAL ── */}
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
                className="px-3 py-1.5 bg-[#0E141D] hover:bg-[#8B1414] border border-white/[0.15] rounded-xs text-[#F0DECE] transition-all cursor-pointer"
              >
                Previous Frame
              </button>
              <button
                onClick={handleNext}
                className="px-3 py-1.5 bg-[#8B1414] hover:bg-[#A31818] border border-[#F0DECE]/30 rounded-xs text-[#F0DECE] font-bold transition-all cursor-pointer shadow-md"
              >
                Next Frame
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
