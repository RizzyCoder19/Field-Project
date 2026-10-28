"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FileText, ChevronDown, Play } from "lucide-react";

interface CinematicHeroProps {
  onReplayIntro?: () => void;
}

export default function CinematicHero({ onReplayIntro }: CinematicHeroProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Cursor-responsive subtle image zoom & slow camera drift
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !imageRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    const offsetX = x * -14;
    const offsetY = y * -9;

    imageRef.current.style.transform = `scale(1.065) translate3d(${offsetX}px, ${offsetY}px, 0)`;
  }, [reducedMotion]);

  const handleMouseEnter = useCallback(() => {
    if (reducedMotion) return;
    if (imageRef.current) {
      imageRef.current.style.transition = "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      imageRef.current.style.transform = "scale(1.065) translate3d(0, 0, 0)";
    }
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (reducedMotion) return;
    if (imageRef.current) {
      imageRef.current.style.transition = "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
      imageRef.current.style.transform = "scale(1) translate3d(0, 0, 0)";
    }
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[92svh] lg:min-h-[98svh] flex flex-col justify-between overflow-hidden border-b border-white/[0.08] select-none group"
      aria-label="Hero: Research Question and Mumbai Waterfront"
    >
      {/* ── Layer 0 & 1: Full-Bleed Photograph with Cursor Zoom ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          ref={imageRef}
          className="relative w-full h-full will-change-transform"
          style={{
            transform: "scale(1) translate3d(0, 0, 0)",
            transition: reducedMotion ? "none" : "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Image
            src="/hero-mumbai-waterfront.jpg"
            alt="Cinematic dusk photograph of Mumbai Bandra-Worli Sea Link waterfront"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_right] sm:object-[65%_center] filter brightness-[0.88] contrast-[1.08]"
          />
        </div>

        {/* ── Layer 2: Editorial Vignettes & Contrast Gradients ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A10] via-[#070A10]/85 via-45% to-[#070A10]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A10] via-[#070A10]/50 via-20% to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070A10]/75 to-transparent" />
        <div className="absolute inset-0 bg-contour-pattern opacity-30 mix-blend-screen" />
      </div>

      {/* ── Layer 3: Interactive Foreground & Creative Typography Overlap ── */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 sm:px-8 lg:pl-8 lg:pr-24 xl:pr-28 pt-16 sm:pt-24 lg:pt-28 pb-12 sm:pb-14 flex-1 flex flex-col justify-between pointer-events-auto">
        
        {/* Top Eyebrow / Subject Bar */}
        <div className="flex items-center gap-3 animate-fade-in">
          <span className="w-2 h-2 bg-[#5FB0A8] rotate-45 shrink-0" />
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-[#D7B56D] uppercase">
            SEASONAL DISEASE SURVEILLANCE / MAHARASHTRA
          </span>
          <div className="h-px bg-white/15 w-16 sm:w-28 hidden sm:block" />
          <span className="hidden md:inline text-[10px] font-mono text-[#87999E] uppercase tracking-wider">
            NCDC · IDSP 2022–2025 BASELINE
          </span>
        </div>

        {/* Central Display Typography (Composed Directly Over Image) */}
        <div className="my-auto py-8 sm:py-12 max-w-4xl space-y-6">
          <h1 className="font-serif text-[clamp(2.75rem,5.6vw,5.5rem)] font-bold text-[#F5F1E8] leading-[1.08] tracking-tight drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
            Do disease outbreaks<br />
            follow the seasons—<br />
            <span className="text-[#D7B56D] italic font-light font-serif">and do those rhythms repeat?</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#A8B6BA] max-w-2xl leading-relaxed drop-shadow-md">
            A quantitative investigation of NCDC / IDSP weekly outbreak-surveillance reports in Maharashtra (2022–2025), grounded by primary fieldwork in Palghar.
          </p>

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href="#study-scope"
              className="px-7 py-3.5 bg-[#D7B56D] hover:bg-[#E8C97D] text-[#070A10] font-bold text-xs uppercase tracking-wider rounded-xs transition-all shadow-[0_8px_24px_rgba(215,181,109,0.3)] hover:shadow-[0_12px_32px_rgba(215,181,109,0.45)] hover:-translate-y-0.5 flex items-center gap-2 active:translate-y-0 cursor-pointer"
            >
              <span>Begin the Investigation ↓</span>
            </a>

            <a
              href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
              download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
              className="px-6 py-3.5 bg-[#070A10]/70 hover:bg-[#070A10] border border-white/25 hover:border-[#D7B56D] text-[#F5F1E8] hover:text-[#D7B56D] font-medium text-xs font-mono uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#D7B56D]" />
              <span>View Full Report</span>
            </a>

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="px-5 py-3.5 bg-[#070A10]/70 hover:bg-[#070A10] border border-[#D7B56D]/40 hover:border-[#D7B56D] text-[#D7B56D] hover:text-[#FFF] font-medium text-xs font-mono uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer"
                title="Replay the cinematic audio-visual documentary prologue"
              >
                <Play className="w-3.5 h-3.5 fill-[#D7B56D]" />
                <span>Replay Film Intro</span>
              </button>
            )}
          </div>

          {/* Rapid Provenance Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono text-[#87999E]">
            <span className="flex items-center gap-1.5">
              <strong className="text-[#F5F1E8]">539</strong> Outbreak Records
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#F5F1E8]">20,955</strong> Reported Cases
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#F5F1E8]">266</strong> Deaths
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#5FB0A8]">36</strong> Districts Covered
            </span>
          </div>
        </div>

        {/* Bottom Exploration Cue Bar: Points to the Study Scope */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#87999E]">
          <a
            href="#study-scope"
            className="flex items-center gap-2 hover:text-[#D7B56D] transition-colors group/scroll uppercase tracking-wider font-semibold"
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#D7B56D] animate-bounce" />
            <span>Begin Investigation ↓ · Explore the Evidence</span>
          </a>

          <span className="hidden sm:inline tracking-wider uppercase text-white/40">
            Hover to explore photograph · Cursor responsive zoom
          </span>
        </div>

      </div>

      {/* ── Layer 4: Integrated Vertical Topic Rail on the Right Edge ── */}
      <aside
        className="hidden lg:flex absolute top-24 right-6 bottom-20 z-10 flex-col justify-between items-end text-[10px] font-mono tracking-[0.28em] text-[#F5F1E8]/60 pointer-events-none uppercase select-none"
        aria-hidden="true"
      >
        <span className="hover:text-[#D7B56D] transition-colors">DATA</span>
        <span className="hover:text-[#D7B56D] transition-colors">ANALYSIS</span>
        <span className="hover:text-[#D7B56D] transition-colors">FIELD EVIDENCE</span>
        <span className="hover:text-[#D7B56D] transition-colors">PUBLIC HEALTH</span>
        <span className="text-[#D7B56D] font-bold">MAHARASHTRA</span>
      </aside>

      {/* Subtle corner hairline accents */}
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D7B56D]/60 pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D7B56D]/60 pointer-events-none z-10" />
    </section>
  );
}
