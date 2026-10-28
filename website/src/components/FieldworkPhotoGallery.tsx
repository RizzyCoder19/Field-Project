"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Maximize2, X, ChevronLeft, ChevronRight, 
  MapPin, Calendar, CheckCircle2 
} from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export interface FieldPhoto {
  id: string;
  src: string;
  title: string;
  category: "Facility Facade" | "Clinical Triage" | "Infrastructure" | "Field Documentation";
  date: string;
  location: string;
  caption: string;
  analyticalAnnotation: string;
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
  },
  {
    id: "photo-06",
    src: "/fieldwork/images (1).jfif",
    title: "Domestic Water Storage & Peri-Domestic Context",
    category: "Infrastructure",
    date: "02 October 2026 · 12:00 PM",
    location: "Residential Catchment Perimeter · Palghar",
    caption: "Plastic water storage vessels utilized by local households due to scheduled municipal water supply intervals.",
    analyticalAnnotation: "Vector breeding hypothesis: when drums remain uncovered between alternate-day supply schedules, they turn into artificial Aedes breeding habitats.",
  }
];

export default function FieldworkPhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { ref, hasAnimated } = useInViewAnimation<HTMLDivElement>({ threshold: 0.15 });

  const currentPhoto = REAL_FIELD_PHOTOS[selectedPhotoIndex];

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : REAL_FIELD_PHOTOS.length - 1));
  };

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev < REAL_FIELD_PHOTOS.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div
      ref={ref}
      className="w-full space-y-4"
      style={{
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* Primary Display Stage */}
      <div className="bg-[#0A1016] border border-white/[0.08] rounded-sm p-4 sm:p-6 shadow-2xl">
        {/* Stage Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5FB0A8]" />
            <span className="font-mono text-xs uppercase text-[#5FB0A8] font-bold tracking-wider">
              Documentary Fieldwork Record · Palghar District
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <button
              onClick={() => setLightboxOpen(true)}
              className="px-3 py-1.5 bg-[#070A10] hover:bg-[#121922] border border-white/[0.08] text-[#F5F1E8] rounded-sm flex items-center gap-1.5 transition-colors"
              title="Expand full screen lightbox"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen</span>
            </button>
            <span className="text-[#A8B6BA] tabular-nums">
              {selectedPhotoIndex + 1} of {REAL_FIELD_PHOTOS.length}
            </span>
          </div>
        </div>

        {/* Featured Photo Viewer */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#070A10] rounded-sm overflow-hidden border border-white/[0.06]">
          {/* Main Photo */}
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title}
            className="w-full h-full object-cover object-center transition-all duration-300"
          />

          {/* Previous / Next Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-[#070A10]/80 hover:bg-[#070A10] border border-white/[0.1] text-[#F5F1E8] rounded-sm transition-colors"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#070A10]/80 hover:bg-[#070A10] border border-white/[0.1] text-[#F5F1E8] rounded-sm transition-colors"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Category Tag */}
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#070A10]/90 backdrop-blur-sm border border-white/[0.1] text-[#D7B56D] text-[10px] font-mono uppercase tracking-wider font-semibold rounded-xs">
            {currentPhoto.category}
          </div>
        </div>

        {/* Factual Caption & Metadata */}
        <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-serif text-xl font-bold text-[#F5F1E8]">
              {currentPhoto.title}
            </h3>
            <div className="flex items-center gap-4 text-xs font-mono text-[#A8B6BA]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#5FB0A8]" />
                {currentPhoto.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#D7B56D]" />
                {currentPhoto.date}
              </span>
            </div>
          </div>

          <p className="text-sm text-[#F5F1E8]/90 leading-relaxed">
            {currentPhoto.caption}
          </p>

          <div className="p-3 bg-[#070A10] border border-white/[0.06] rounded-sm text-xs font-mono text-[#A8B6BA] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5FB0A8] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F5F1E8]">Observational Note:</strong> {currentPhoto.analyticalAnnotation}
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="mt-6 pt-4 border-t border-white/[0.06] grid grid-cols-3 sm:grid-cols-6 gap-2">
          {REAL_FIELD_PHOTOS.map((photo, idx) => {
            const isSelected = idx === selectedPhotoIndex;
            return (
              <button
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`relative aspect-[4/3] rounded-sm overflow-hidden border transition-all text-left group ${
                  isSelected 
                    ? "border-[#5FB0A8] ring-1 ring-[#5FB0A8]" 
                    : "border-white/[0.08] opacity-60 hover:opacity-100 hover:border-white/[0.2]"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                  <span className="text-[10px] font-mono text-white/90 line-clamp-1">
                    0{idx + 1}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          role="dialog"
          aria-label="Full screen photograph view"
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-xs font-mono text-[#A8B6BA]">
            <div>
              <strong className="text-[#F5F1E8] font-serif text-base mr-3">{currentPhoto.title}</strong>
              <span>({selectedPhotoIndex + 1} of {REAL_FIELD_PHOTOS.length})</span>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 hover:bg-white/10 rounded-sm text-[#F5F1E8] transition-colors"
              aria-label="Close full screen view"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Image Stage */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={currentPhoto.src}
              alt={currentPhoto.title}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 p-3 bg-black/60 hover:bg-black/90 border border-white/20 text-white rounded-full transition-colors"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 p-3 bg-black/60 hover:bg-black/90 border border-white/20 text-white rounded-full transition-colors"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Caption */}
          <div className="max-w-3xl mx-auto text-center space-y-1">
            <p className="text-sm text-[#F5F1E8]">{currentPhoto.caption}</p>
            <p className="text-xs font-mono text-[#A8B6BA]">{currentPhoto.location} · {currentPhoto.date}</p>
          </div>
        </div>
      )}
    </div>
  );
}
