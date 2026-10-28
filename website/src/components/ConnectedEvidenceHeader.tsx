"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Grid3X3,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle2,
} from "lucide-react";
import { RESEARCH_CHAPTERS, getChapterByNumber } from "@/data/chapters";

interface ConnectedEvidenceHeaderProps {
  currentActNumber: number;
  className?: string;
}

export default function ConnectedEvidenceHeader({
  currentActNumber,
  className = "",
}: ConnectedEvidenceHeaderProps) {
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const current = getChapterByNumber(currentActNumber);
  const prevAct = getChapterByNumber(currentActNumber - 1);
  const nextAct = getChapterByNumber(currentActNumber + 1);

  if (!current) return null;

  return (
    <div className={`w-full bg-[#070A0F] border-b border-[#F0DECE]/12 text-[#F0DECE] ${className}`}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28 py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Act Sequence & Movement */}
          <div className="flex items-center gap-2.5 text-xs font-mono">
            <span className="w-2 h-2 bg-[#8B1414] rotate-45 shrink-0 ring-1 ring-[#F0DECE]/40" />
            <span className="text-[#8B1414] font-bold tracking-widest uppercase">
              {current.movementNumber}
            </span>
            <span className="text-[#F0DECE]/20">/</span>
            <span className="text-[#F0DECE] font-bold tracking-wider">
              ACT {current.chapterCode} OF 10
            </span>
            <span className="hidden sm:inline text-[#F0DECE]/20">|</span>
            <span className="hidden sm:inline text-[#BAC0B8] truncate max-w-xs">
              {current.shortTitle}
            </span>
          </div>

          {/* Right: Quick Previous / Next + Connected Evidence Map */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setShowNetworkModal(!showNetworkModal)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0E141D] hover:bg-[#8B1414]/20 border border-[#F0DECE]/20 hover:border-[#F0DECE]/40 rounded-xs text-[#F0DECE] transition-all cursor-pointer shadow-sm"
              title="View all 10 interconnected investigation acts"
            >
              <Grid3X3 className="w-3.5 h-3.5 text-[#8B1414]" />
              <span className="hidden md:inline font-bold">Connected Evidence Map</span>
              <span className="md:hidden font-bold">10 Acts</span>
            </button>

            {prevAct && (
              <Link
                href={prevAct.path}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#0E141D] hover:bg-[#180505] border border-[#F0DECE]/15 hover:border-[#8B1414] rounded-xs text-[#BAC0B8] hover:text-[#F0DECE] transition-all"
                title={`Previous: Act ${prevAct.chapterCode} · ${prevAct.shortTitle}`}
              >
                <ArrowLeft className="w-3 h-3 text-[#8B1414]" />
                <span className="hidden lg:inline">Act {prevAct.chapterCode}</span>
              </Link>
            )}

            {nextAct && (
              <Link
                href={nextAct.path}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#8B1414] hover:bg-[#A31818] border border-[#F0DECE]/30 rounded-xs text-[#F0DECE] font-bold transition-all shadow-sm"
                title={`Next: Act ${nextAct.chapterCode} · ${nextAct.shortTitle}`}
              >
                <span className="hidden lg:inline">Act {nextAct.chapterCode}:</span>
                <span className="truncate max-w-[120px]">{nextAct.shortTitle}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Connected 10-Act Investigation Map Drawer */}
      {showNetworkModal && (
        <div className="border-t border-[#F0DECE]/12 bg-[#0B0F15] py-6 px-4 sm:px-6 lg:pl-8 lg:pr-24 xl:pr-28 animate-fadeIn">
          <div className="max-w-[1360px] mx-auto space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="space-y-0.5">
                <div className="text-[11px] font-mono text-[#8B1414] font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>THE CONNECTED INVESTIGATION ARCHITECTURE · 10 ACTS</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#F0DECE]">
                  One Unified Epidemiological Dataset (237 Bulletins · 539 Records · 20,955 Cases)
                </h4>
              </div>
              <button
                onClick={() => setShowNetworkModal(false)}
                className="p-1.5 text-[#BAC0B8] hover:text-[#F0DECE] hover:bg-[#180505] rounded-xs transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 10 Acts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1">
              {RESEARCH_CHAPTERS.slice(0, 10).map((act) => {
                const isCurrent = act.actNumber === currentActNumber;
                return (
                  <Link
                    key={act.id}
                    href={act.path}
                    onClick={() => setShowNetworkModal(false)}
                    className={`p-3 rounded-xs border transition-all text-left flex flex-col justify-between space-y-2 group cursor-pointer ${
                      isCurrent
                        ? "bg-[#180505] border-[#8B1414] shadow-md ring-1 ring-[#8B1414]"
                        : "bg-[#0E141D] border-white/[0.08] hover:border-[#F0DECE]/30 hover:bg-[#151D2A]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span
                        className={`font-bold ${
                          isCurrent ? "text-[#8B1414]" : "text-[#BAC0B8] group-hover:text-[#F0DECE]"
                        }`}
                      >
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
        </div>
      )}
    </div>
  );
}
