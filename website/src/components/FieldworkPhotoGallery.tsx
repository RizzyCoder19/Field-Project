"use client";

import React, { useState, useEffect } from "react";
import { 
  Maximize2, X, ChevronLeft, ChevronRight, 
  MapPin, Calendar, RefreshCw, Crosshair, CheckCircle2 
} from "lucide-react";

export interface FieldPhoto {
  id: string;
  src: string;
  title: string;
  category: "Facility Facade" | "Clinical Triage" | "Infrastructure" | "Field Documentation";
  date: string;
  location: string;
  caption: string;
  analyticalAnnotation: string;
  focalPoints?: {
    x: number; // percentage
    y: number; // percentage
    label: string;
    description: string;
  }[];
}

export const REAL_FIELD_PHOTOS: FieldPhoto[] = [
  {
    id: "photo-01",
    src: "/fieldwork/vvmc-government-hospital-nalasopara-east-palghar-hospitals-WVNkfr7tUF.webp",
    title: "Municipal Health Center & Clinical Reception",
    category: "Facility Facade",
    date: "02 October 2026 · 10:30 AM",
    location: "VVMC Health Post · Nallasopara, Palghar District",
    caption: "Primary outpatient entrance and patient reception area of the municipal government healthcare facility during morning clinical triage hours.",
    analyticalAnnotation: "Public facility triage gateway: patients presenting with febrile complaints or acute diarrhea report directly to this municipal registration desk before clinical assignment.",
    focalPoints: [
      { x: 48, y: 56, label: "Triage Gateway", description: "Outpatient registration counter where syndromic fever complaints are entered." },
      { x: 22, y: 38, label: "Facility Access", description: "All-weather entry corridor linking waiting area to diagnostic testing wing." }
    ]
  },
  {
    id: "photo-02",
    src: "/fieldwork/nalasopara-vvcmc-hospital-nalasopara-west-palghar-hospitals-1jNorUByyf.webp",
    title: "Urban Health Post Administrative Wing",
    category: "Facility Facade",
    date: "02 October 2026 · 11:00 AM",
    location: "Nallasopara West · VVMC Health Post Catchment",
    caption: "Exterior view of the health post complex serving the high-density mixed peri-urban catchment of Nallasopara West.",
    analyticalAnnotation: "Catchment profile: facility coordinates community health workers (ASHAs) surveying informal settlements with irregular municipal water supply.",
    focalPoints: [
      { x: 50, y: 45, label: "Surveillance Desk", description: "Community reporting station for peri-urban informal settlements." }
    ]
  },
  {
    id: "photo-03",
    src: "/fieldwork/vasai-virar-municipal-corporation-hospital-nalasopara-east-palghar-public-hospitals-XH8OizMJfA-250.webp",
    title: "Outpatient Consultation & Corridor Triage",
    category: "Clinical Triage",
    date: "02 October 2026 · 11:15 AM",
    location: "VVMC Government Hospital Ward & Corridor",
    caption: "Corridor area leading to doctor consultation chambers, diagnostic testing room, and maternal immunization post.",
    analyticalAnnotation: "Daily physical registry entry point: suspected vector-borne fevers are logged manually into Form P (presumptive) or Form L (laboratory confirmed).",
    focalPoints: [
      { x: 42, y: 62, label: "Registry Station", description: "Manual ledger logging Form P (presumptive) and Form L (lab confirmed) cases." }
    ]
  },
  {
    id: "photo-04",
    src: "/fieldwork/screenshot-2026-10-03-011809.png",
    title: "Field Documentation & Spatial Geolocation Record",
    category: "Field Documentation",
    date: "02–03 October 2026",
    location: "Palghar District Surveillance Catchment",
    caption: "Primary digital log verifying site coordinates, facility administrative boundaries, and timestamped field observation schedule.",
    analyticalAnnotation: "Auditability confirmation: primary field verification record documenting facility visit on 2 October 2026.",
    focalPoints: [
      { x: 50, y: 50, label: "GPS Audit Lock", description: "Digital timestamp coordinates verifying on-site fieldwork execution." }
    ]
  },
  {
    id: "photo-05",
    src: "/fieldwork/images.jfif",
    title: "Perimeter Drainage & Stormwater Infrastructure",
    category: "Infrastructure",
    date: "02 October 2026 · 11:45 AM",
    location: "Facility Perimeter · Nallasopara West",
    caption: "Roadside storm drainage lines showing silt accumulation and stagnant surface water pools adjacent to municipal access roads.",
    analyticalAnnotation: "Environmental observation: open drains susceptible to overflow during early monsoon downpours, causing enteric transmission and ADD case surges.",
    focalPoints: [
      { x: 60, y: 68, label: "Silt Accumulation", description: "Unlined drainage section creating stagnant pooling conducive to enteric overflow." }
    ]
  },
  {
    id: "photo-06",
    src: "/fieldwork/images (1).jfif",
    title: "Domestic Water Storage & Peri-Domestic Context",
    category: "Infrastructure",
    date: "02 October 2026 · 12:00 PM",
    location: "Residential Catchment Perimeter · Palghar",
    caption: "Plastic water storage vessels utilized by local households due to scheduled municipal water supply intervals.",
    analyticalAnnotation: "Vector breeding mechanism: when drums remain uncovered between alternate-day supply schedules, they turn into artificial Aedes breeding habitats.",
    focalPoints: [
      { x: 45, y: 60, label: "Storage Vessels", description: "Peri-domestic storage drums where intermittent supply drives uncovered storage." }
    ]
  }
];

export default function FieldworkPhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [shutterState, setShutterState] = useState<"closed" | "opening" | "open">("open");
  const [activeFocalPoint, setActiveFocalPoint] = useState<number | null>(null);

  const currentPhoto = REAL_FIELD_PHOTOS[selectedPhotoIndex];

  // Trigger photographic aperture reveal whenever photo changes or replay is triggered
  const triggerReveal = () => {
    const timer0 = setTimeout(() => {
      setShutterState("closed");
      setActiveFocalPoint(null);
    }, 0);
    const timer1 = setTimeout(() => setShutterState("opening"), 80);
    const timer2 = setTimeout(() => setShutterState("open"), 750);
    return () => {
      clearTimeout(timer0);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  useEffect(() => {
    const cancel = triggerReveal();
    return cancel;
  }, [selectedPhotoIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : REAL_FIELD_PHOTOS.length - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) => (prev < REAL_FIELD_PHOTOS.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="w-full space-y-6">
      {/* Featured Photo: Photographic Presentation Stage */}
      <div className="bg-[#0B111E] border border-[#F8FAFC]/15 rounded-sm p-4 sm:p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F8FAFC]/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="font-mono text-xs uppercase text-[#00F0FF] font-bold tracking-wider">
              Self-Constructing Photographic Evidence · Palghar Fieldwork Record
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <button
              onClick={triggerReveal}
              className="px-2.5 py-1 bg-[#06080F] hover:bg-[#1A2234] border border-[#F8FAFC]/15 text-[#D4AF37] hover:text-[#F5D061] rounded-sm flex items-center gap-1.5 transition-colors"
              title="Replay photographic aperture reveal"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-open Aperture</span>
            </button>
            <button
              onClick={() => setLightboxOpen(true)}
              className="px-2.5 py-1 bg-[#06080F] hover:bg-[#1A2234] border border-[#F8FAFC]/15 text-[#F8FAFC] rounded-sm flex items-center gap-1.5 transition-colors"
              title="Expand full screen lightbox"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen</span>
            </button>
            <span className="text-[#94A3B8]">
              {selectedPhotoIndex + 1} / {REAL_FIELD_PHOTOS.length}
            </span>
          </div>
        </div>

        {/* Photographic Stage with Dual-Curtain Shutter Mechanism */}
        <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[540px] bg-[#030407] rounded-sm overflow-hidden select-none border border-[#F8FAFC]/10">
          {/* Authentic Unaltered Photograph */}
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
          />

          {/* Shutter Blade Left */}
          <div
            className="absolute top-0 bottom-0 left-0 bg-[#06080F] z-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-[#D4AF37]/50"
            style={{
              width: shutterState === "closed" ? "50%" : shutterState === "opening" ? "0%" : "0%",
              opacity: shutterState === "open" ? 0 : 1,
              pointerEvents: shutterState === "open" ? "none" : "auto",
            }}
          >
            <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-widest text-[#D4AF37]/60 rotate-90">
              SHUTTER·L
            </div>
          </div>

          {/* Shutter Blade Right */}
          <div
            className="absolute top-0 bottom-0 right-0 bg-[#06080F] z-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border-l border-[#00F0FF]/50"
            style={{
              width: shutterState === "closed" ? "50%" : shutterState === "opening" ? "0%" : "0%",
              opacity: shutterState === "open" ? 0 : 1,
              pointerEvents: shutterState === "open" ? "none" : "auto",
            }}
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-widest text-[#00F0FF]/60 -rotate-90">
              SHUTTER·R
            </div>
          </div>

          {/* Calibrated Optical Crosshairs Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Center Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2.5 bg-[#00F0FF]/60" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2.5 bg-[#00F0FF]/60" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-2.5 bg-[#00F0FF]/60" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-2.5 bg-[#00F0FF]/60" />
            </div>

            {/* Corner Framing Brackets */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37]/70" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37]/70" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37]/70" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37]/70" />

            {/* Optical Aspect Tag */}
            <div className="absolute top-4 left-12 font-mono text-[10px] text-[#F8FAFC]/80 uppercase tracking-wider bg-[#06080F]/70 px-2 py-0.5 rounded-sm border border-[#F8FAFC]/10">
              RAW SENSOR RECORD · UNAFFECTED PIXELS
            </div>
          </div>

          {/* Interactive Evidence Focal Pins */}
          {currentPhoto.focalPoints && (
            <div className="absolute inset-0 z-30">
              {currentPhoto.focalPoints.map((fp, idx) => {
                const isActive = activeFocalPoint === idx;
                return (
                  <div
                    key={fp.label}
                    className="absolute"
                    style={{ left: `${fp.x}%`, top: `${fp.y}%` }}
                  >
                    <button
                      onClick={() => setActiveFocalPoint(isActive ? null : idx)}
                      className={`relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-[#00F0FF] text-[#06080F] scale-110 shadow-[0_0_15px_#00F0FF]"
                          : "bg-[#06080F]/90 text-[#00F0FF] border-2 border-[#00F0FF] hover:scale-105"
                      }`}
                      title={fp.label}
                    >
                      <Crosshair className="w-4 h-4 animate-spin-slow" />
                      <span className="sr-only">{fp.label}</span>
                    </button>

                    {/* Popover Callout */}
                    {isActive && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-64 p-3 bg-[#06080F]/95 backdrop-blur-md border border-[#00F0FF]/50 rounded-sm shadow-2xl z-40 text-left pointer-events-auto">
                        <div className="font-mono text-[10px] text-[#00F0FF] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3" />
                          {fp.label}
                        </div>
                        <p className="font-mono text-xs text-[#F8FAFC] mt-1 leading-relaxed">
                          {fp.description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Archival Identification Stamp */}
          <div className="absolute bottom-4 left-4 z-20 bg-black/85 backdrop-blur-md px-3.5 py-2 rounded-sm border border-[#F8FAFC]/20 text-xs font-mono text-[#F8FAFC] max-w-sm">
            <span className="text-[#D4AF37] uppercase text-[9px] font-bold tracking-widest block">
              AUTHENTICATED FIELD DOCUMENTATION
            </span>
            <span className="font-bold text-sm block mt-0.5">{currentPhoto.title}</span>
            <span className="text-[#94A3B8] text-[10px] block mt-0.5">{currentPhoto.location}</span>
          </div>
        </div>

        {/* Coordinated Evidence Annotation & Analytical Breakdown */}
        <div className="mt-4 p-5 bg-[#06080F] border border-[#F8FAFC]/10 rounded-sm space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-b border-[#F8FAFC]/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 rounded-sm font-bold uppercase">
                {currentPhoto.category}
              </span>
              <span className="text-[#94A3B8] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                {currentPhoto.date}
              </span>
            </div>
            <span className="text-[#94A3B8] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
              {currentPhoto.location}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-sm sm:text-base text-[#F8FAFC] leading-relaxed">
              {currentPhoto.caption}
            </p>
            <div className="p-3 bg-[#0B111E] border-l-2 border-[#D4AF37] rounded-r-sm">
              <span className="font-mono text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider block">
                Fieldwork Analytical Annotation:
              </span>
              <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1 leading-relaxed">
                {currentPhoto.analyticalAnnotation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase text-[#94A3B8] tracking-wider flex items-center justify-between">
          <span>All Authenticated Field Records ({REAL_FIELD_PHOTOS.length} Photographic Documents)</span>
          <span className="text-[10px] text-[#00F0FF]">Click thumbnail to load &amp; open presentation</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {REAL_FIELD_PHOTOS.map((p, idx) => {
            const isSelected = selectedPhotoIndex === idx;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`group relative h-24 sm:h-28 rounded-sm overflow-hidden border text-left transition-all ${
                  isSelected
                    ? "border-[#00F0FF] ring-2 ring-[#00F0FF]/50 scale-[1.02]"
                    : "border-[#F8FAFC]/15 hover:border-[#D4AF37]/50 opacity-75 hover:opacity-100"
                }`}
              >
                <img
                  src={p.src}
                  alt={p.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-2">
                  <span className="text-[9px] font-mono font-bold text-[#F8FAFC] line-clamp-1">
                    {p.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessible Full Screen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Modal Header */}
          <div
            className="flex items-center justify-between text-[#F8FAFC] pb-4 border-b border-[#F8FAFC]/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider font-bold">
                Authenticated Fieldwork Lightbox · {selectedPhotoIndex + 1} of {REAL_FIELD_PHOTOS.length}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mt-0.5">
                {currentPhoto.title}
              </h3>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0B111E] rounded-sm transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Center Image */}
          <div
            className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto.src}
              alt={currentPhoto.title}
              className="max-h-[75vh] max-w-full object-contain rounded-sm border border-[#F8FAFC]/15 shadow-2xl"
            />

            {/* Left / Right Controls */}
            <button
              onClick={() => setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : REAL_FIELD_PHOTOS.length - 1))}
              className="absolute left-2 sm:left-6 p-3 bg-[#06080F]/80 hover:bg-[#0B111E] border border-[#F8FAFC]/20 text-[#F8FAFC] rounded-full transition-colors"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSelectedPhotoIndex((prev) => (prev < REAL_FIELD_PHOTOS.length - 1 ? prev + 1 : 0))}
              className="absolute right-2 sm:right-6 p-3 bg-[#06080F]/80 hover:bg-[#0B111E] border border-[#F8FAFC]/20 text-[#F8FAFC] rounded-full transition-colors"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Footer Caption */}
          <div
            className="p-4 bg-[#06080F] border border-[#F8FAFC]/15 rounded-sm max-w-4xl mx-auto w-full text-center sm:text-left space-y-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#00F0FF]">
              <span>{currentPhoto.location}</span>
              <span className="text-[#D4AF37]">{currentPhoto.date}</span>
            </div>
            <p className="text-sm text-[#F8FAFC]">
              {currentPhoto.caption}
            </p>
            <p className="text-xs font-mono text-[#94A3B8]">
              {currentPhoto.analyticalAnnotation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
