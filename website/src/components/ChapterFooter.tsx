"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LayoutGrid, BookOpen } from "lucide-react";
import { RESEARCH_CHAPTERS, getChapterByNumber } from "@/data/chapters";

interface ChapterFooterProps {
  currentChapterNumber: number;
}

export default function ChapterFooter({ currentChapterNumber }: ChapterFooterProps) {
  const current = getChapterByNumber(currentChapterNumber);
  const prevChapter = getChapterByNumber(currentChapterNumber - 1);
  const nextChapter = getChapterByNumber(currentChapterNumber + 1);

  const totalChapters = RESEARCH_CHAPTERS.length;
  const progressPct = Math.round((currentChapterNumber / totalChapters) * 100);

  return (
    <footer className="w-full bg-[#030407] border-t border-[#F8FAFC]/15 mt-20 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <span className="flex items-center gap-1.5 text-[#F5D061] font-semibold tracking-wider uppercase">
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              Research Exhibition
            </span>
            <span>
              Chapter <strong className="text-[#F8FAFC]">{currentChapterNumber}</strong> of {totalChapters} ({progressPct}% of Journey)
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#0B111E] rounded-full overflow-hidden border border-[#D4AF37]/20">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] via-[#00F0FF] to-[#38BDF8] transition-all duration-300 shadow-[0_0_8px_rgba(0,240,255,0.35)]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Previous Chapter */}
          {prevChapter ? (
            <Link
              href={prevChapter.path}
              className="group p-5 bg-[#0B111E] hover:bg-[#162035] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] group-hover:text-[#00F0FF] transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>PREVIOUS CHAPTER · {prevChapter.chapterCode}</span>
              </div>
              <div className="mt-2 font-serif text-lg font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                {prevChapter.title}
              </div>
              <div className="mt-1 text-xs text-[#94A3B8] line-clamp-1">
                {prevChapter.shortTitle}
              </div>
            </Link>
          ) : (
            <Link
              href="/"
              className="group p-5 bg-[#0B111E] hover:bg-[#162035] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] group-hover:text-[#00F0FF] transition-colors">
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>PROJECT HOMEPAGE</span>
              </div>
              <div className="mt-2 font-serif text-lg font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                Research Overview & Mandate
              </div>
              <div className="mt-1 text-xs text-[#94A3B8]">
                Return to opening introduction
              </div>
            </Link>
          )}

          {/* Central All Chapters Quick Link */}
          <Link
            href="/"
            className="p-5 bg-[#06080F] hover:bg-[#161F30] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between items-center text-center"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#00F0FF] font-semibold uppercase tracking-wider">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Full Research Index</span>
            </div>
            <div className="font-serif text-base font-semibold text-[#F8FAFC] mt-1">
              Explore All 12 Exhibition Chapters
            </div>
            <span className="text-xs font-mono text-[#94A3B8] mt-1">
              Currently reading: {current?.shortTitle}
            </span>
          </Link>

          {/* Next Chapter */}
          {nextChapter ? (
            <Link
              href={nextChapter.path}
              className="group p-5 bg-[#0B111E] hover:bg-[#162035] border border-[#F8FAFC]/12 hover:border-[#00F0FF]/60 rounded-sm transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] group-hover:text-[#00F0FF] transition-colors">
                <span>NEXT CHAPTER · {nextChapter.chapterCode}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="mt-2 font-serif text-lg font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                {nextChapter.title}
              </div>
              <div className="mt-1 text-xs text-[#94A3B8] line-clamp-1">
                {nextChapter.shortTitle}
              </div>
            </Link>
          ) : (
            <a
              href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
              download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
              className="group p-5 bg-[#0B111E] hover:bg-[#162035] border border-[#00F0FF]/40 hover:border-[#00F0FF] rounded-sm transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#00F0FF] font-bold">
                <span>ACADEMIC REPORT</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="mt-2 font-serif text-lg font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                Export Printable Academic PDF
              </div>
              <div className="mt-1 text-xs text-[#94A3B8]">
                Clean, standardized institutional report view
              </div>
            </a>
          )}
        </div>

        {/* Academic Attestation Footer */}
        <div className="pt-6 border-t border-[#F8FAFC]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          <div className="text-center sm:text-left">
            <span className="text-[#F8FAFC]">Analysis of Seasonal Disease Patterns Using Government Health Data</span>
            <span className="text-[#94A3B8]/40 mx-2">|</span>
            <span>Khan Umar · RP Institute, University of Mumbai</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/method" className="hover:text-[#00F0FF] transition-colors">
              Methodology
            </Link>
            <span>·</span>
            <Link href="/sources" className="hover:text-[#00F0FF] transition-colors">
              Sources
            </Link>
            <span>·</span>
            <Link href="/print" target="_blank" className="hover:text-[#00F0FF] transition-colors">
              Print Report
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
