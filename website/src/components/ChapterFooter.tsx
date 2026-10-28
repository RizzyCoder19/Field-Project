"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  BookOpen,
  Compass,
  FileText,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react";
import { RESEARCH_CHAPTERS, getChapterByNumber } from "@/data/chapters";

interface ChapterFooterProps {
  currentChapterNumber: number;
}

export default function ChapterFooter({ currentChapterNumber }: ChapterFooterProps) {
  const [showFullMatrix, setShowFullMatrix] = useState(false);
  const current = getChapterByNumber(currentChapterNumber);
  const prevChapter = getChapterByNumber(currentChapterNumber - 1);
  const nextChapter = getChapterByNumber(currentChapterNumber + 1);

  const totalActs = 10;
  const currentActNum = Math.min(Math.max(currentChapterNumber, 1), 10);
  const progressPct = Math.round((currentActNum / totalActs) * 100);

  return (
    <footer className="w-full bg-[#070A0F] border-t border-[#F0DECE]/12 mt-20 pt-12 pb-16 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28 text-[#F0DECE]">
      <div className="max-w-[1360px] mx-auto space-y-8">
        
        {/* Connected Investigation Journey Progress */}
        <div className="p-5 bg-[#0B0F15] border border-[#F0DECE]/12 rounded-xs space-y-3 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#8B1414] rotate-45 shrink-0 ring-1 ring-[#F0DECE]/40" />
              <span className="text-[#8B1414] font-bold tracking-widest uppercase">
                {current?.movementNumber || "INVESTIGATION JOURNEY"}
              </span>
              <span className="text-[#F0DECE]/20">|</span>
              <span className="text-[#F0DECE] font-bold">
                Act {current?.chapterCode || currentActNum} of {totalActs}: {current?.shortTitle}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#BAC0B8]">
                Investigation Progress: <strong className="text-[#F0DECE]">{progressPct}%</strong>
              </span>
              <button
                onClick={() => setShowFullMatrix(!showFullMatrix)}
                className="px-2.5 py-1 bg-[#0E141D] hover:bg-[#8B1414]/20 border border-[#F0DECE]/20 hover:border-[#8B1414] rounded-xs text-[11px] font-bold text-[#F0DECE] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <LayoutGrid className="w-3 h-3 text-[#8B1414]" />
                <span>{showFullMatrix ? "Hide Investigation Index" : "View All 10 Acts"}</span>
              </button>
            </div>
          </div>

          <div className="w-full h-1.5 bg-[#0E141D] rounded-full overflow-hidden border border-white/[0.06]">
            <div
              className="h-full bg-gradient-to-r from-[#8B1414] via-[#C9944A] to-[#F0DECE] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Narrative Bridge Sentence */}
          {current?.connectedLeadOut && (
            <div className="pt-1 flex items-start gap-2 text-xs text-[#BAC0B8] leading-relaxed">
              <Sparkles className="w-3.5 h-3.5 text-[#8B1414] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#F0DECE]">Epidemiological Line of Evidence:</strong>{" "}
                {current.connectedLeadOut}
              </div>
            </div>
          )}
        </div>

        {/* 10-Act Connected Grid (Expandable) */}
        {showFullMatrix && (
          <div className="p-6 bg-[#0B0F15] border border-[#8B1414]/40 rounded-xs space-y-4 animate-fadeIn shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="font-serif text-base font-bold text-[#F0DECE] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#8B1414]" />
                <span>The 10 Documentary Acts: One Connected Evidence Network</span>
              </div>
              <span className="text-xs font-mono text-[#BAC0B8]">Click any act to navigate</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
              {RESEARCH_CHAPTERS.slice(0, 10).map((act) => {
                const isCurrent = act.actNumber === currentChapterNumber;
                return (
                  <Link
                    key={act.id}
                    href={act.path}
                    className={`p-3.5 rounded-xs border transition-all text-left flex flex-col justify-between space-y-2 group cursor-pointer ${
                      isCurrent
                        ? "bg-[#180505] border-[#8B1414] ring-1 ring-[#8B1414] shadow-md"
                        : "bg-[#0E141D] border-white/[0.08] hover:border-[#F0DECE]/40 hover:bg-[#151D2A]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className={`font-bold ${isCurrent ? "text-[#8B1414]" : "text-[#BAC0B8] group-hover:text-[#F0DECE]"}`}>
                        ACT {act.chapterCode}
                      </span>
                      {isCurrent ? (
                        <span className="px-1.5 py-0.5 bg-[#8B1414] text-[9px] text-[#F0DECE] rounded-2xs font-bold uppercase">
                          Current
                        </span>
                      ) : (
                        <span className="text-[9px] text-[#BAC0B8]">{act.movementNumber.replace("MOVEMENT ", "M")}</span>
                      )}
                    </div>

                    <div>
                      <div className="font-serif text-xs font-bold text-[#F0DECE] group-hover:text-[#FFF] line-clamp-1">
                        {act.title}
                      </div>
                      <div className="text-[10px] text-[#BAC0B8] line-clamp-1 mt-0.5">
                        {act.keyMetric}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Previous & Next Chapter Bridge Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Previous Act Card */}
          {prevChapter ? (
            <Link
              href={prevChapter.path}
              className="group p-5 bg-[#0B0F15] hover:bg-[#151D2A] border border-[#F0DECE]/12 hover:border-[#F0DECE]/30 rounded-xs transition-all flex flex-col justify-between space-y-3 cursor-pointer shadow-md"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#BAC0B8] group-hover:text-[#F0DECE] transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 text-[#8B1414] transition-transform group-hover:-translate-x-1" />
                <span>PREVIOUS ACT · {prevChapter.chapterCode}</span>
              </div>
              <div>
                <div className="font-serif text-base font-bold text-[#F0DECE] group-hover:text-[#FFF] transition-colors">
                  {prevChapter.title}
                </div>
                <div className="text-xs text-[#BAC0B8] line-clamp-1 mt-1">
                  {prevChapter.shortTitle} · {prevChapter.keyMetric}
                </div>
              </div>
              <div className="text-[11px] font-mono text-[#BAC0B8] pt-1 border-t border-white/[0.06] flex items-center gap-1.5">
                <span>Return to previous proof</span>
              </div>
            </Link>
          ) : (
            <Link
              href="/"
              className="group p-5 bg-[#0B0F15] hover:bg-[#151D2A] border border-[#F0DECE]/12 hover:border-[#F0DECE]/30 rounded-xs transition-all flex flex-col justify-between space-y-3 cursor-pointer shadow-md"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#BAC0B8] group-hover:text-[#F0DECE] transition-colors">
                <LayoutGrid className="w-3.5 h-3.5 text-[#8B1414]" />
                <span>PROJECT HOMEPAGE</span>
              </div>
              <div>
                <div className="font-serif text-base font-bold text-[#F0DECE] group-hover:text-[#FFF] transition-colors">
                  Overview & Research Mandate
                </div>
                <div className="text-xs text-[#BAC0B8] mt-1">
                  Return to opening cinematic introduction and core thesis
                </div>
              </div>
              <div className="text-[11px] font-mono text-[#BAC0B8] pt-1 border-t border-white/[0.06]">
                <span>237 Bulletins · 4-Year Baseline</span>
              </div>
            </Link>
          )}

          {/* Central Full Project Hub Link */}
          <Link
            href="/"
            className="p-5 bg-[#0E141D] hover:bg-[#180505] border border-[#F0DECE]/12 hover:border-[#8B1414] rounded-xs transition-all flex flex-col justify-between items-center text-center space-y-2 cursor-pointer shadow-md group"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#8B1414] font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Full Research Index</span>
            </div>
            <div>
              <div className="font-serif text-base font-bold text-[#F0DECE] group-hover:text-[#FFF]">
                10-Act Connected Evidence Architecture
              </div>
              <div className="text-xs text-[#BAC0B8] mt-1">
                Currently examining Act {current?.chapterCode}: {current?.shortTitle}
              </div>
            </div>
            <span className="text-[11px] font-mono text-[#F0DECE]/80 flex items-center gap-1 pt-1">
              <span>Explore full documentary map</span>
              <ChevronRight className="w-3 h-3 text-[#8B1414]" />
            </span>
          </Link>

          {/* Next Act Card */}
          {nextChapter ? (
            <Link
              href={nextChapter.path}
              className="group p-5 bg-[#0B0F15] hover:bg-[#180505] border border-[#8B1414]/50 hover:border-[#8B1414] rounded-xs transition-all flex flex-col justify-between space-y-3 cursor-pointer shadow-lg sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#8B1414] font-bold">
                <span>NEXT ACT · {nextChapter.chapterCode}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <div>
                <div className="font-serif text-base font-bold text-[#F0DECE] group-hover:text-[#FFF] transition-colors">
                  {nextChapter.title}
                </div>
                <div className="text-xs text-[#BAC0B8] line-clamp-1 mt-1">
                  {nextChapter.shortTitle} · {nextChapter.keyMetric}
                </div>
              </div>
              <div className="text-[11px] font-mono text-[#BAC0B8] group-hover:text-[#F0DECE] pt-1 border-t border-white/[0.06] flex items-center justify-between">
                <span>Continue investigation</span>
                <span className="text-[#8B1414] font-bold">Proceed →</span>
              </div>
            </Link>
          ) : (
            <a
              href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
              download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
              className="group p-5 bg-[#0B0F15] hover:bg-[#180505] border border-[#8B1414]/50 hover:border-[#8B1414] rounded-xs transition-all flex flex-col justify-between space-y-3 cursor-pointer shadow-lg sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#8B1414] font-bold">
                <span>ACADEMIC MONOGRAPH</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <div>
                <div className="font-serif text-base font-bold text-[#F0DECE] group-hover:text-[#FFF] transition-colors">
                  Download Full Academic PDF
                </div>
                <div className="text-xs text-[#BAC0B8] mt-1">
                  Finalized Seasonal Disease Patterns Report (RP Institute)
                </div>
              </div>
              <div className="text-[11px] font-mono text-[#BAC0B8] pt-1 border-t border-white/[0.06] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#8B1414]" />
                <span>Audited Institutional Document</span>
              </div>
            </a>
          )}
        </div>

        {/* Academic Attestation Footer */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#BAC0B8]">
          <div className="text-center sm:text-left">
            <span className="text-[#F0DECE] font-bold">
              Analysis of Seasonal Disease Patterns Using Government Health Data
            </span>
            <span className="text-white/20 mx-2">|</span>
            <span>Khan Umar · RP Institute, University of Mumbai</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/method" className="hover:text-[#F0DECE] transition-colors">
              Methodology
            </Link>
            <span>·</span>
            <Link href="/sources" className="hover:text-[#F0DECE] transition-colors">
              Sources & Archive
            </Link>
            <span>·</span>
            <Link href="/stability" className="hover:text-[#F0DECE] transition-colors">
              Kendall&apos;s W
            </Link>
            <span>·</span>
            <Link href="/print" target="_blank" className="hover:text-[#F0DECE] transition-colors">
              Print Report
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
