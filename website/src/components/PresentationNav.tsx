"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, BookOpen, ExternalLink, FileText 
} from "lucide-react";
import { RESEARCH_CHAPTERS, getChapterByPath } from "@/data/chapters";

export default function PresentationNav() {
  const pathname = usePathname();
  const [scrollPct, setScrollPct] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentChapter = getChapterByPath(pathname);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollPct(pct);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] bg-[#06080F]">
        <div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#00F0FF] to-[#38BDF8] transition-all duration-75 shadow-[0_0_8px_rgba(0,240,255,0.4)]"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      {/* Top Floating Editorial Nav Bar */}
      <header className="sticky top-0 left-0 right-0 z-[190] px-3 sm:px-6 py-2.5 bg-[#06080F]/94 backdrop-blur-md border-b border-[#D4AF37]/18 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left Brand Identity */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] rounded-sm py-1"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col">
              <span className="font-mono text-[10px] sm:text-xs text-[#F5D061] tracking-[0.24em] uppercase font-bold group-hover:text-[#FFF] transition-colors">
                From Data to the Ground
              </span>
              <span className="text-[11px] sm:text-xs text-[#94A3B8] hidden md:inline">
                Seasonal Disease Surveillance in Maharashtra · Khan Umar
              </span>
            </div>
          </Link>

          {/* Center: Current Chapter Badge (Medium+ screens) */}
          {currentChapter && (
            <div className="hidden lg:flex items-center gap-2 bg-[#0B111E] border border-[#D4AF37]/30 px-3.5 py-1.5 rounded-sm shadow-sm">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">
                {currentChapter.chapterCode} / 12
              </span>
              <span className="text-[#94A3B8]/40">·</span>
              <span className="text-xs font-serif font-semibold text-[#F8FAFC] truncate max-w-[220px]">
                {currentChapter.shortTitle}
              </span>
            </div>
          )}

          {/* Right Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Chapter Links */}
            <nav className="hidden xl:flex items-center gap-1 text-xs font-mono text-[#94A3B8]">
              <Link
                href="/data"
                className={`px-2.5 py-1.5 rounded-sm transition-colors ${
                  pathname === "/data"
                    ? "text-[#00F0FF] bg-[#141E34] border border-[#00F0FF]/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    : "hover:text-[#F8FAFC] hover:bg-[#0B111E]/70"
                }`}
              >
                Data
              </Link>
              <Link
                href="/diseases"
                className={`px-2.5 py-1.5 rounded-sm transition-colors ${
                  pathname === "/diseases"
                    ? "text-[#00F0FF] bg-[#141E34] border border-[#00F0FF]/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    : "hover:text-[#F8FAFC] hover:bg-[#0B111E]/70"
                }`}
              >
                Diseases
              </Link>
              <Link
                href="/seasonality"
                className={`px-2.5 py-1.5 rounded-sm transition-colors ${
                  pathname === "/seasonality"
                    ? "text-[#00F0FF] bg-[#141E34] border border-[#00F0FF]/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    : "hover:text-[#F8FAFC] hover:bg-[#0B111E]/70"
                }`}
              >
                Seasonality
              </Link>
              <Link
                href="/geography"
                className={`px-2.5 py-1.5 rounded-sm transition-colors ${
                  pathname === "/geography"
                    ? "text-[#00F0FF] bg-[#141E34] border border-[#00F0FF]/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    : "hover:text-[#F8FAFC] hover:bg-[#0B111E]/70"
                }`}
              >
                Geography
              </Link>
              <Link
                href="/fieldwork"
                className={`px-2.5 py-1.5 rounded-sm transition-colors ${
                  pathname === "/fieldwork"
                    ? "text-[#00F0FF] bg-[#141E34] border border-[#00F0FF]/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    : "hover:text-[#F8FAFC] hover:bg-[#0B111E]/70"
                }`}
              >
                Fieldwork
              </Link>
            </nav>

            {/* Explore Committed Version on GitHub Button */}
            <a
              href="https://github.com/RizzyCoder19/Field-Project/tree/previous-version"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B111E] border border-[#38BDF8]/40 hover:border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8]/15 px-2.5 sm:px-3 py-1.5 rounded-sm font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md focus:outline-none focus:ring-1 focus:ring-[#38BDF8]"
              title="Explore the previous committed version on GitHub (previous-version branch)"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span> Archive
            </a>

            {/* Export PDF Button */}
            <a
              href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
              download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
              className="bg-[#0B111E] border border-[#D4AF37]/50 hover:border-[#F5D061] text-[#F5D061] hover:bg-[#D4AF37]/15 px-2.5 sm:px-3 py-1.5 rounded-sm font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              title="Download the finalized academic report PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Report</span> PDF
            </a>

            {/* Navigation Drawer Menu Toggle */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle exhibition chapter menu"
              aria-expanded={drawerOpen}
              className="bg-[#0B111E] border border-[#F8FAFC]/20 hover:border-[#00F0FF]/60 text-[#F8FAFC] px-3 py-1.5 rounded-sm flex items-center gap-2 transition-colors focus:outline-none focus:ring-1 focus:ring-[#00F0FF]"
            >
              <span className="font-mono text-xs uppercase tracking-wider font-semibold hidden sm:inline">
                Chapters
              </span>
              {drawerOpen ? <X className="w-4 h-4 text-[#00F0FF]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[210] flex justify-end bg-black/75 backdrop-blur-sm transition-opacity"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="relative h-full w-[min(480px,92vw)] bg-[#06080F] border-l border-[#F8FAFC]/15 overflow-y-auto flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-[#F8FAFC]/15 flex items-center justify-between sticky top-0 bg-[#06080F]/98 z-10">
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-[#00F0FF] uppercase font-bold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Research Chapters Index
                </div>
                <div className="font-serif text-lg sm:text-xl font-bold text-[#F8FAFC] mt-0.5">
                  12 Exhibition Chapters
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0B111E] rounded-sm transition-colors"
                aria-label="Close navigation drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chapters List */}
            <div className="p-4 sm:p-6 space-y-2 flex-1">
              {RESEARCH_CHAPTERS.map((ch) => {
                const isActive = pathname === ch.path;
                return (
                  <Link
                    key={ch.id}
                    href={ch.path}
                    onClick={() => setDrawerOpen(false)}
                    className={`block p-3.5 sm:p-4 rounded-sm border transition-all ${
                      isActive
                        ? "bg-[#0B111E] border-[#00F0FF] shadow-md ring-1 ring-[#00F0FF]/30"
                        : "bg-[#06080F] hover:bg-[#0B111E]/70 border-[#F8FAFC]/10 hover:border-[#F8FAFC]/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span
                          className={`font-bold ${
                            isActive ? "text-[#00F0FF]" : "text-[#94A3B8]"
                          }`}
                        >
                          CHAPTER {ch.chapterCode}
                        </span>
                        <span className="text-[#94A3B8]/40">·</span>
                        <span className="text-[10px] uppercase text-[#94A3B8]/80 tracking-wider">
                          {ch.category}
                        </span>
                      </div>
                      {isActive && (
                        <span className="text-[10px] font-mono font-bold bg-[#00F0FF]/20 text-[#00F0FF] px-1.5 py-0.5 rounded-sm">
                          Current
                        </span>
                      )}
                    </div>
                    <div
                      className={`font-serif text-base sm:text-lg font-bold mt-1.5 leading-snug ${
                        isActive ? "text-[#00F0FF]" : "text-[#F8FAFC]"
                      }`}
                    >
                      {ch.title}
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed line-clamp-2">
                      {ch.question}
                    </p>
                    {ch.keyMetric && (
                      <div className="mt-2 text-[11px] font-mono text-[#00F0FF]/80 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#00F0FF]" />
                        <span>{ch.keyMetric}</span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 border-t border-[#F8FAFC]/15 bg-[#030407] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span>Candidate: Khan Umar</span>
                <span>University of Mumbai</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <Link
                  href="/print"
                  target="_blank"
                  className="p-2 text-center bg-[#0B111E] hover:bg-[#162035] text-[#00F0FF] border border-[#00F0FF]/40 rounded-sm font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>Print</span>
                </Link>
                <a
                  href="https://github.com/RizzyCoder19/Field-Project/tree/previous-version"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-center bg-[#0B111E] hover:bg-[#162035] text-[#38BDF8] border border-[#38BDF8]/40 rounded-sm font-semibold transition-colors flex items-center justify-center gap-1"
                  title="Explore previous committed version on GitHub"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Archive</span>
                </a>
                <a
                  href="https://github.com/RizzyCoder19/Field-Project/tree/master"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-center bg-[#06080F] hover:bg-[#0B111E] text-[#F8FAFC] border border-[#F8FAFC]/15 rounded-sm transition-colors flex items-center justify-center gap-1"
                >
                  <span>Master</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
