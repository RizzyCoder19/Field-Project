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
    <footer className="w-full bg-[#05070B] border-t border-white/[0.08] mt-20 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#A8B6BA]">
            <span className="flex items-center gap-1.5 text-[#D7B56D] font-semibold tracking-wider uppercase">
              <BookOpen className="w-3.5 h-3.5 text-[#D7B56D]" />
              Research Investigation
            </span>
            <span>
              Chapter <strong className="text-[#F5F1E8]">{currentChapterNumber}</strong> of {totalChapters} ({progressPct}% of Journey)
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#0A1016] rounded-full overflow-hidden border border-white/[0.06]">
            <div
              className="h-full bg-gradient-to-r from-[#D7B56D] via-[#5FB0A8] to-[#4DA8D6] transition-all duration-300"
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
              className="group p-5 bg-[#0A1016] hover:bg-[#121922] border border-white/[0.08] hover:border-[#5FB0A8]/50 rounded-sm transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#A8B6BA] group-hover:text-[#5FB0A8] transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>PREVIOUS CHAPTER · {prevChapter.chapterCode}</span>
              </div>
              <div className="mt-2 font-serif text-lg font-bold text-[#F5F1E8] group-hover:text-[#5FB0A8] transition-colors">
                {prevChapter.title}
              </div>
              <div className="mt-1 text-xs text-[#A8B6BA] line-clamp-1">
                {prevChapter.shortTitle}
              </div>
            </Link>
          ) : (
            <Link
              href="/"
              className="group p-5 bg-[#0A1016] hover:bg-[#121922] border border-white/[0.08] hover:border-[#5FB0A8]/50 rounded-sm transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#A8B6BA] group-hover:text-[#5FB0A8] transition-colors">
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>PROJECT HOMEPAGE</span>
              </div>
              <div className="mt-2 font-serif text-lg font-bold text-[#F5F1E8] group-hover:text-[#5FB0A8] transition-colors">
                Research Overview & Mandate
              </div>
              <div className="mt-1 text-xs text-[#A8B6BA]">
                Return to opening introduction
              </div>
            </Link>
          )}

          {/* Central All Chapters Quick Link */}
          <Link
            href="/"
            className="p-5 bg-[#070A10] hover:bg-[#101720] border border-white/[0.08] hover:border-[#5FB0A8]/50 rounded-sm transition-all flex flex-col justify-between items-center text-center"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#5FB0A8] font-semibold uppercase tracking-wider">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Full Research Index</span>
            </div>
            <div className="font-serif text-base font-semibold text-[#F5F1E8] mt-1">
              Explore All 12 Investigation Chapters
            </div>
            <span className="text-xs font-mono text-[#A8B6BA] mt-1">
              Currently reading: {current?.shortTitle}
            </span>
          </Link>

          {/* Next Chapter */}
          {nextChapter ? (
            <Link
              href={nextChapter.path}
              className="group p-5 bg-[#0A1016] hover:bg-[#121922] border border-white/[0.08] hover:border-[#5FB0A8]/50 rounded-sm transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#A8B6BA] group-hover:text-[#5FB0A8] transition-colors">
                <span>NEXT CHAPTER · {nextChapter.chapterCode}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="mt-2 font-serif text-lg font-bold text-[#F5F1E8] group-hover:text-[#5FB0A8] transition-colors">
                {nextChapter.title}
              </div>
              <div className="mt-1 text-xs text-[#A8B6BA] line-clamp-1">
                {nextChapter.shortTitle}
              </div>
            </Link>
          ) : (
            <a
              href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
              download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
              className="group p-5 bg-[#0A1016] hover:bg-[#121922] border border-[#5FB0A8]/40 hover:border-[#5FB0A8] rounded-sm transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#5FB0A8] font-bold">
                <span>ACADEMIC REPORT</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="mt-2 font-serif text-lg font-bold text-[#F5F1E8] group-hover:text-[#5FB0A8] transition-colors">
                Export Printable Academic PDF
              </div>
              <div className="mt-1 text-xs text-[#A8B6BA]">
                Clean, standardized institutional report view
              </div>
            </a>
          )}
        </div>

        {/* Academic Attestation Footer */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A8B6BA]">
          <div className="text-center sm:text-left">
            <span className="text-[#F5F1E8]">Analysis of Seasonal Disease Patterns Using Government Health Data</span>
            <span className="text-white/20 mx-2">|</span>
            <span>Khan Umar · RP Institute, University of Mumbai</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/method" className="hover:text-[#5FB0A8] transition-colors">
              Methodology
            </Link>
            <span>·</span>
            <Link href="/sources" className="hover:text-[#5FB0A8] transition-colors">
              Sources
            </Link>
            <span>·</span>
            <Link href="/print" target="_blank" className="hover:text-[#5FB0A8] transition-colors">
              Print Report
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
