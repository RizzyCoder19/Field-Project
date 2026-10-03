"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const NAV_SECTIONS = [
  { id: "question",       label: "01 · Question" },
  { id: "archive",        label: "02 · Archive" },
  { id: "extraction",     label: "03 · Extraction" },
  { id: "cleaning",       label: "04 · Taxonomy" },
  { id: "cohorts",        label: "05 · Cohorts" },
  { id: "seasonality",    label: "06 · Seasonality" },
  { id: "stability",      label: "07 · Stability" },
  { id: "geography",      label: "08 · Geography" },
  { id: "outlier",        label: "09 · Outlier" },
  { id: "year2026",       label: "10 · 2026" },
  { id: "fieldwork",      label: "11 · Fieldwork" },
  { id: "interview",      label: "12 · Interview" },
  { id: "comparison",     label: "13 · Comparison" },
  { id: "conclusion",     label: "14 · Conclusion" },
];

export default function PresentationNav() {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("question");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollPct(pct);
      setVisible(window.scrollY > 60);

      const offset = window.scrollY + 140;
      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_SECTIONS[i].id);
        if (el && el.offsetTop <= offset) {
          setActiveSection(NAV_SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentIdx = NAV_SECTIONS.findIndex(s => s.id === activeSection);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] bg-[#111411]">
        <div
          className="h-full bg-[#C7A75B] transition-all duration-75"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      {/* Top nav bar */}
      <header
        className="fixed top-2 left-0 right-0 z-[190] px-4 sm:px-6 pointer-events-none"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Left: identity */}
          <div className="pointer-events-auto bg-[#111411]/90 backdrop-blur-md border border-[#EEE8DA]/10 px-3 py-1.5 flex items-center gap-2 rounded-sm shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A75B]" />
            <span className="font-mono text-[9px] text-[#C7A75B] tracking-[0.2em] uppercase font-semibold">
              Field Project · 2026
            </span>
            <span className="font-mono text-[9px] text-[#EEE8DA]/25 hidden sm:inline">|</span>
            <span className="font-mono text-[9px] text-[#EEE8DA]/50 hidden sm:inline">Khan Umar</span>
          </div>

          {/* Right: progress + PDF export + menu */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Section counter */}
            {activeSection && (
              <div className="bg-[#111411]/90 backdrop-blur-md border border-[#EEE8DA]/10 px-3 py-1.5 rounded-sm hidden sm:flex items-center gap-2">
                <span className="font-mono text-[9px] text-[#C7A75B]">
                  {String(currentIdx >= 0 ? currentIdx + 1 : 1).padStart(2, "0")} / {String(NAV_SECTIONS.length).padStart(2, "0")}
                </span>
                <span className="font-mono text-[9px] text-[#EEE8DA]/40">
                  {NAV_SECTIONS[currentIdx >= 0 ? currentIdx : 0]?.label}
                </span>
              </div>
            )}

            {/* Export PDF Button */}
            <Link
              href="/print"
              target="_blank"
              className="bg-[#111A2B]/90 backdrop-blur-md border border-[#C7A75B]/40 hover:border-[#C7A75B] text-[#C7A75B] px-3 py-1.5 rounded-sm font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
              title="Open print & PDF view"
            >
              <span>📄</span>
              <span className="hidden sm:inline">Export</span> PDF
            </Link>

            {/* GitHub Repo Button */}
            <a
              href="https://github.com/RizzyCoder19/Field-Project/tree/master"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#111411]/90 backdrop-blur-md border border-[#EEE8DA]/15 hover:border-[#C7A75B] text-[#EEE8DA]/80 hover:text-[#C7A75B] px-2.5 py-1.5 rounded-sm font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
              title="Inspect raw dataset & GitHub repository"
            >
              <span className="hidden sm:inline">GitHub</span>
              <span>↗</span>
            </a>

            {/* Menu toggle */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Navigation menu"
              className="bg-[#111411]/90 backdrop-blur-md border border-[#EEE8DA]/10 px-3 py-1.5 rounded-sm flex items-center gap-1.5 hover:border-[#C7A75B]/30 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className={`block w-4 h-px bg-[#EEE8DA]/60 transition-all ${drawerOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block w-4 h-px bg-[#EEE8DA]/60 transition-all ${drawerOpen ? "opacity-0" : ""}`} />
                <span className={`block w-4 h-px bg-[#EEE8DA]/60 transition-all ${drawerOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[180] flex justify-end"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="relative h-full w-[min(340px,85vw)] bg-[#0d1209]/96 backdrop-blur-xl border-l border-[#EEE8DA]/08 overflow-y-auto flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#EEE8DA]/08">
              <div className="font-mono text-[8px] tracking-[0.3em] text-[#C7A75B] uppercase">Navigation</div>
              <div className="font-serif text-lg text-[#EEE8DA] mt-1">Research Documentary</div>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-0.5">
              {NAV_SECTIONS.map((s, i) => {
                const isActive = s.id === activeSection;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all hover:bg-[#EEE8DA]/05"
                    style={{
                      color: isActive ? "#C7A75B" : "#B5B0A4",
                      background: isActive ? "rgba(199,167,91,0.08)" : "transparent",
                    }}
                  >
                    <span className="font-mono text-[8px] text-[#B5B0A4]/40 w-5">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[11px] tracking-[0.15em] uppercase">{s.label}</span>
                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C7A75B]" />}
                  </a>
                );
              })}
            </nav>

            {/* Supporting routes */}
            <div className="p-4 border-t border-[#EEE8DA]/08">
              <div className="font-mono text-[7px] tracking-[0.25em] text-[#B5B0A4]/40 uppercase mb-2">Deep Exploration</div>
              <div className="flex flex-wrap gap-2">
                {[
                  ["/fieldwork", "Field"],
                  ["/fieldwork/interviews", "Interviews"],
                  ["/diseases/dengue", "Dengue"],
                  ["/diseases/malaria", "Malaria"],
                  ["/diseases/acute-diarrheal-disease", "ADD"],
                  ["/diseases/food-poisoning", "Food Poisoning"],
                  ["/methodology", "Method"],
                  ["/references", "References"],
                ].map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className="font-mono text-[8px] px-2 py-1 border border-[#EEE8DA]/10 text-[#B5B0A4]/60 hover:text-[#EEE8DA] hover:border-[#EEE8DA]/25 rounded-sm transition-all"
                  >{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom scroll indicator dots */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[180] flex gap-1 pointer-events-none"
        style={{ opacity: visible ? 0.6 : 0, transition: "opacity 0.4s ease" }}
      >
        {NAV_SECTIONS.map(s => (
          <div
            key={s.id}
            className="w-1 h-1 rounded-full transition-all"
            style={{
              background: s.id === activeSection ? "#C7A75B" : "rgba(238,232,218,0.25)",
              width: s.id === activeSection ? "12px" : "4px",
            }}
          />
        ))}
      </div>
    </>
  );
}
