"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileText, ChevronDown, Compass, ArrowUp, ExternalLink, BookOpen, Layers } from "lucide-react";

const PRIMARY_LINKS = [
  { label: "Overview", href: "/" },
  { label: "Data Archive", href: "/data" },
  { label: "5 Diseases", href: "/diseases" },
  { label: "Geography", href: "/geography" },
  { label: "Fieldwork", href: "/fieldwork" },
  { label: "Findings", href: "/findings" },
];

const EXPLORE_LINKS = [
  { label: "Seasonality & Radial Clock", href: "/seasonality" },
  { label: "Kendall's W Repeatability", href: "/stability" },
  { label: "Outlier Sensitivity Testing", href: "/outliers" },
  { label: "Matched 2026 Comparison", href: "/comparison-2026" },
  { label: "12-Stage Methodology", href: "/method" },
  { label: "Surveillance Bulletin Sources", href: "/sources" },
  { label: "Evidence Dossier", href: "/evidence" },
  { label: "Research Thesis", href: "/research" },
];

import { CANONICAL_RESEARCH_ACTS } from "@/data/researchJourney";

const NARRATIVE_ACTS = [
  { id: "hero", label: "Intro", shortTitle: "Introduction", actNumber: "00", category: "FOUNDATION", deepDiveUrl: "/" },
  ...CANONICAL_RESEARCH_ACTS.map((act) => ({
    id: act.id,
    label: `${act.actNumber} ${act.shortTitle}`,
    shortTitle: act.shortTitle,
    actNumber: act.actNumber,
    category: act.category,
    question: act.question,
    deepDiveUrl: act.deepDiveUrl,
  })),
];

export default function PresentationNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomepage = pathname === "/";

  // Track scroll position to transition from top nav to cinematic side rail
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setExploreOpen(false);
    setSideMenuOpen(false);
  }

  // Close explore dropdown when clicking outside
  useEffect(() => {
    if (!exploreOpen) return;
    const handleClick = () => setExploreOpen(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [exploreOpen]);

  // Track active section on homepage using IntersectionObserver
  useEffect(() => {
    if (!isHomepage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      }
    );

    NARRATIVE_ACTS.forEach((act) => {
      const el = document.getElementById(act.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomepage]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const currentAct = NARRATIVE_ACTS.find((a) => a.id === activeSection) || NARRATIVE_ACTS[0];

  return (
    <>
      {/* ── Top Navigation Bar: Displays on non-homepage, and at the top of homepage before scrolling ── */}
      <header
        className={`z-[190] bg-[#070A10]/95 backdrop-blur-md border-b border-white/[0.08] transition-all duration-500 ${
          isHomepage
            ? `fixed top-0 left-0 right-0 ${
                isScrolled
                  ? "-translate-y-full opacity-0 pointer-events-none"
                  : "translate-y-0 opacity-100"
              }`
            : "sticky top-0 left-0 right-0"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Left: Project Title */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#590907] rounded-sm py-1 shrink-0"
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#E8D2B5] tracking-[0.16em] uppercase group-hover:text-[#F7EAD7] transition-colors">
                From Data to the Ground
              </span>
              <span className="text-[11px] text-[#A5A79B] hidden sm:inline tracking-normal">
                Seasonal Disease Surveillance in Maharashtra
              </span>
            </div>
          </Link>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {PRIMARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-colors ${
                  isActive(link.href)
                    ? "text-[#E8D2B5] font-bold bg-[#590907]/30 border border-[#590907]/50"
                    : "text-[#A5A79B] hover:text-[#E8D2B5]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Deep Dives Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExploreOpen(!exploreOpen);
                }}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1 cursor-pointer ${
                  EXPLORE_LINKS.some((l) => isActive(l.href))
                    ? "text-[#E8D2B5] font-bold bg-[#590907]/20"
                    : "text-[#A5A79B] hover:text-[#E8D2B5]"
                }`}
                aria-expanded={exploreOpen}
                aria-haspopup="true"
              >
                <span>Deep Dives</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
              </button>

              {exploreOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-64 bg-[#0B0E13] border border-[#E8D2B5]/20 rounded-sm shadow-2xl py-1 z-50 divide-y divide-white/[0.04]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-3 py-2 text-[10px] font-mono uppercase text-[#E8D2B5] tracking-widest font-semibold">
                    Academic Chapters & Archives
                  </div>
                  <div className="py-1">
                    {EXPLORE_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2 text-xs font-mono transition-colors ${
                          isActive(link.href)
                            ? "text-[#E8D2B5] bg-[#590907]/30"
                            : "text-[#A5A79B] hover:text-[#E8D2B5] hover:bg-white/[0.04]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Academic Report Trigger + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
              download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#590907] hover:bg-[#590907] text-[#E8D2B5] hover:text-[#FFF] text-xs font-mono uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#E8D2B5]" />
              <span className="hidden sm:inline">Academic PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#A5A79B] hover:text-[#E8D2B5] focus:outline-none cursor-pointer"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* ── CINEMATIC DOCKED SIDE RAIL (DESKTOP: Follows user on the right panel, never overlapping content) ── */}
      {isHomepage && (
        <aside
          className={`hidden lg:flex fixed right-3 xl:right-6 top-1/2 -translate-y-1/2 z-[140] flex-col items-center select-none transition-all duration-500 ease-out ${
            isScrolled
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-6 pointer-events-none"
          }`}
          aria-label="Documentary Acts Timeline Rail"
        >
          <div className="bg-[#0B0E13]/95 backdrop-blur-xl border border-[#E8D2B5]/20 p-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.9)] flex flex-col items-center gap-1.5">
            
            {/* Chapters / Menu Drawer Trigger */}
            <button
              onClick={() => setSideMenuOpen(!sideMenuOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#E8D2B5] hover:text-[#FFF] hover:bg-[#590907]/30 transition-all cursor-pointer relative group"
              title="Open Research Chapters & Navigation Drawer"
              aria-label="Open Chapters Menu"
            >
              <Menu className="w-4 h-4" />
              {/* Tooltip */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1.5 px-2.5 py-1 bg-[#0B0E13]/95 border border-[#590907]/60 text-[#E8D2B5] font-mono text-[10px] uppercase tracking-wider rounded-xs whitespace-nowrap shadow-xl pointer-events-none">
                <span>Chapters & Navigation</span>
              </div>
            </button>

            {/* Hairline Divider Track */}
            <div className="w-px h-2.5 bg-gradient-to-b from-[#590907]/80 to-[#A5A79B]/20" />

            {/* Canonical 9 Acts Rail Beads */}
            <nav className="flex flex-col items-center gap-1" aria-label="Acts jump navigation">
              {CANONICAL_RESEARCH_ACTS.map((act) => {
                const isCurrent = activeSection === act.id;
                return (
                  <Link
                    key={act.id}
                    href={act.deepDiveUrl}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono transition-all relative group cursor-pointer ${
                      isCurrent
                        ? "bg-[#590907] text-[#E8D2B5] font-bold shadow-[0_0_14px_rgba(89,9,7,0.8)] scale-110 ring-2 ring-[#E8D2B5]/40"
                        : "text-[#A5A79B] hover:text-[#E8D2B5] hover:bg-white/[0.06]"
                    }`}
                    aria-label={`Enter Act ${act.actNumber}: ${act.shortTitle}`}
                    aria-current={isCurrent ? "true" : undefined}
                  >
                    <span>{act.actNumber}</span>

                    {/* Smooth Floating Tooltip on Hover */}
                    <div className="absolute right-9 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 px-3 py-1.5 bg-[#0B0E13]/95 backdrop-blur-md border border-[#590907]/60 rounded-xs shadow-2xl whitespace-nowrap z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                      <span className="text-[10px] font-mono font-bold text-[#E8D2B5]">
                        ACT {act.actNumber}
                      </span>
                      <span className="h-2.5 w-px bg-white/20" />
                      <span className="text-xs font-serif font-bold text-[#E8D2B5]">
                        {act.shortTitle}
                      </span>
                      <span className="text-[9px] font-mono text-[#A5A79B] uppercase tracking-wider px-1.5 py-0.5 bg-[#590907]/30 rounded-2xs">
                        {act.category}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Hairline Divider Track */}
            <div className="w-px h-2.5 bg-gradient-to-t from-[#590907]/80 to-[#A5A79B]/20" />

            {/* Smooth Return to Top Trigger */}
            <a
              href="#hero"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#A5A79B] hover:text-[#E8D2B5] hover:bg-white/[0.08] transition-all cursor-pointer relative group"
              title="Return to Research Question (Top)"
              aria-label="Return to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              {/* Tooltip */}
              <div className="absolute right-9 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center px-2 py-1 bg-[#0B0E13]/95 border border-white/20 text-[#E8D2B5] font-mono text-[10px] uppercase tracking-wider rounded-xs whitespace-nowrap shadow-xl pointer-events-none">
                <span>Top</span>
              </div>
            </a>

          </div>
        </aside>
      )}

      {/* ── MOBILE SCROLLING PILL (Displays active act cleanly at bottom-right on mobile when scrolled) ── */}
      {isHomepage && isScrolled && (
        <div className="lg:hidden fixed bottom-5 right-4 z-[140] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#0B0E13]/95 backdrop-blur-xl border border-[#590907]/80 text-[#E8D2B5] rounded-full shadow-[0_8px_24px_rgba(89,9,7,0.6)] text-xs font-mono font-bold active:scale-95 transition-all cursor-pointer"
            aria-label="Open acts navigation"
          >
            <Compass className="w-3.5 h-3.5 text-[#590907]" />
            <span>{currentAct.actNumber !== "00" ? `Act ${currentAct.actNumber}` : "Intro"}</span>
            <ChevronDown className="w-3 h-3 text-[#A5A79B]" />
          </button>
        </div>
      )}

      {/* ── DESKTOP SIDE SLIDE-OUT CHAPTER DRAWER ── */}
      {sideMenuOpen && (
        <div className="hidden lg:block fixed inset-0 z-[200]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSideMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="absolute top-0 right-0 bottom-0 w-96 bg-[#0A1016]/98 backdrop-blur-2xl border-l border-white/[0.10] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D7B56D] uppercase tracking-widest">
                  <Compass className="w-4 h-4 text-[#D7B56D]" />
                  <span>Research Chapters</span>
                </div>
                <button
                  onClick={() => setSideMenuOpen(false)}
                  className="p-1 text-[#87999E] hover:text-[#FFF] transition-colors cursor-pointer rounded-xs"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 9 Acts Direct Links */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#A5A79B] font-bold">
                  9 Canonical Research Stages
                </div>
                <div className="space-y-1">
                  {CANONICAL_RESEARCH_ACTS.map((act) => {
                    const isCurrent = activeSection === act.id;
                    return (
                      <Link
                        key={act.id}
                        href={act.deepDiveUrl}
                        onClick={() => setSideMenuOpen(false)}
                        className={`flex items-center justify-between p-2 rounded-xs text-xs font-mono transition-colors ${
                          isCurrent
                            ? "bg-[#590907] text-[#E8D2B5] font-bold shadow-md"
                            : "text-[#A5A79B] hover:text-[#E8D2B5] hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isCurrent ? "bg-[#0B0E13] text-[#E8D2B5]" : "bg-white/10"}`}>
                            {act.actNumber}
                          </span>
                          <span>{act.shortTitle}</span>
                        </div>
                        <span className="text-[9px] opacity-60 uppercase">{act.category}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Primary Pages */}
              <div className="space-y-1 pt-4 border-t border-white/[0.08]">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#A5A79B] font-bold">
                  Academic Pages
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {PRIMARY_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSideMenuOpen(false)}
                      className={`px-2 py-1.5 rounded-xs text-xs font-mono uppercase tracking-wider ${
                        isActive(link.href) ? "text-[#E8D2B5] font-bold bg-[#590907]/30" : "text-[#A5A79B] hover:text-[#FFF]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Footer: Academic Report Download */}
            <div className="pt-6 border-t border-white/[0.08]">
              <a
                href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
                download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
                className="w-full py-2.5 bg-[#590907] hover:bg-[#7E1513] text-[#E8D2B5] font-bold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-lg border border-[#E8D2B5]/30 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Download Academic Report (PDF)</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* ── MOBILE FULL NAVIGATION DRAWER ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#07090C]/98 backdrop-blur-2xl z-[200] overflow-y-auto p-5 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#E8D2B5] tracking-[0.16em] uppercase">
                From Data to the Ground
              </span>
              <span className="text-[10px] text-[#A5A79B]">
                Seasonal Disease Surveillance in Maharashtra
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 text-[#A5A79B] hover:text-[#FFF] rounded-xs cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Canonical Research Documentary Acts (Direct Jump) */}
          {isHomepage && (
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-[#E8D2B5] uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#590907]" />
                <span>Documentary Journey Acts (Jump)</span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {NARRATIVE_ACTS.map((act) => {
                  const isCurrent = activeSection === act.id;
                  return (
                    <Link
                      key={act.id}
                      href={act.deepDiveUrl}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors ${
                        isCurrent
                          ? "bg-[#590907] text-[#E8D2B5] font-bold"
                          : "text-[#A5A79B] hover:text-[#E8D2B5] bg-white/[0.02]"
                      }`}
                    >
                      <span>{act.label}</span>
                      <span className="text-[10px] opacity-60">Enter →</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Primary Top Pages */}
          <div className="space-y-1 pt-3 border-t border-white/[0.08]">
            <div className="text-[10px] font-mono text-[#A5A79B] uppercase tracking-widest mb-2 font-bold">
              Primary Navigation
            </div>
            {PRIMARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 text-sm font-mono uppercase tracking-wider ${
                  isActive(link.href) ? "text-[#E8D2B5] font-bold" : "text-[#A5A79B]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Deep Dives */}
          <div className="space-y-1 pt-4 border-t border-white/[0.08]">
            <div className="text-[10px] font-mono text-[#A5A79B] uppercase tracking-widest mb-2 font-bold">
              Research Chapters & Deep Dives
            </div>
            {EXPLORE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-1.5 text-xs font-mono text-[#A5A79B] hover:text-[#E8D2B5]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <a
              href="/reports/Finalized_Seasonal_Disease_Patterns_Report.pdf"
              download="Finalized_Seasonal_Disease_Patterns_Report.pdf"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#590907] hover:bg-[#7E1513] text-[#E8D2B5] font-bold text-xs uppercase tracking-wider rounded-xs border border-[#E8D2B5]/30 shadow-lg cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Download Academic PDF</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}


