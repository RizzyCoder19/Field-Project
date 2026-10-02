"use client";

import React, { useState, useEffect } from "react";

export default function PresentationNav() {
  const [activeSection, setActiveSection] = useState("intro");
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    { id: "intro", label: "Intro" },
    { id: "question", label: "Question" },
    { id: "data", label: "Data" },
    { id: "pipeline", label: "Pipeline" },
    { id: "patterns", label: "Patterns" },
    { id: "outliers", label: "Outliers" },
    { id: "stability", label: "Stability" },
    { id: "fieldwork", label: "Fieldwork" },
    { id: "comparison", label: "Comparison" },
    { id: "limitations", label: "Limits" },
    { id: "conclusion", label: "Conclusion" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check which section is currently in view
      const scrollPos = window.scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 w-full h-[2.5px] bg-[#171A18]/80 z-50">
        <div
          className="h-full bg-[#B89B5E] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Presentation Anchor Strip */}
      <header className="fixed top-2.5 left-0 w-full z-40 px-4 sm:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Masthead Tag */}
          <div className="pointer-events-auto bg-[#171A18]/90 backdrop-blur-md border border-[#F1EBDD]/15 px-3 py-1.5 rounded text-[11px] font-mono text-[#F1EBDD] flex items-center gap-2 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89B5E] animate-pulse"></span>
            <span className="font-semibold tracking-wider text-[#B89B5E]">RP INSTITUTE · MUMBAI</span>
            <span className="hidden md:inline text-[#F1EBDD]/40">|</span>
            <span className="hidden md:inline text-[#F1EBDD]/80">Khan Umar · Sem III</span>
          </div>

          {/* Minimal Section Indicators */}
          <nav className="pointer-events-auto hidden lg:flex items-center gap-1 bg-[#171A18]/90 backdrop-blur-md border border-[#F1EBDD]/15 p-1 rounded shadow-lg">
            {sections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors ${
                    isActive
                      ? "bg-[#B89B5E] text-[#171A18] font-bold shadow-sm"
                      : "text-[#F1EBDD]/70 hover:text-[#F1EBDD] hover:bg-[#F1EBDD]/10"
                  }`}
                >
                  {sec.label}
                </a>
              );
            })}
          </nav>

          {/* Progress Percentage Indicator */}
          <div className="pointer-events-auto bg-[#171A18]/90 backdrop-blur-md border border-[#F1EBDD]/15 px-3 py-1.5 rounded text-[11px] font-mono text-[#B89B5E] shadow-lg">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      </header>
    </>
  );
}
