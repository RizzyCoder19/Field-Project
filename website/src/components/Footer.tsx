import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#E8E2D7] border-t border-[#D8D1C5] mt-24 text-[#565C58] text-sm">
      {/* Editorial Narrative Ribbon */}
      <div className="border-b border-[#D8D1C5] py-6 px-4 lg:px-8 bg-[#F3EFE6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-serif italic text-base lg:text-lg text-[#171A18]">
              “From Data to the Ground: Examining seasonal disease patterns in Maharashtra alongside local health-facility realities.”
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#174A4A]">
            <CheckCircle2 className="w-4 h-4 text-[#AEBB55]" />
            <span>NCDC / IDSP Verified Baseline (N=539 primary records)</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Academic Identity */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-lg font-bold text-[#171A18]">
              Seasonal Disease Patterns in Maharashtra
            </span>
          </div>
          <p className="text-xs text-[#565C58] leading-relaxed max-w-md">
            An undergraduate data science field investigation synthesizing 4 baseline years (2022–2025) of official government outbreak notices with an out-of-sample comparison (2026 W01–W32) and primary qualitative evidence from one local health facility in Nallasopara West.
          </p>
          <div className="text-xs font-mono text-[#565C58] space-y-1 pt-2">
            <div><span className="text-[#171A18] font-medium">Candidate:</span> Khan Umar · B.Sc. Data Science (Semester III)</div>
            <div><span className="text-[#171A18] font-medium">Institution:</span> RP Institute · Affiliated to University of Mumbai</div>
            <div><span className="text-[#171A18] font-medium">Fieldwork:</span> 02 October 2026 · Nallasopara West, Palghar</div>
          </div>
        </div>

        {/* Column 2: Consolidated Navigation */}
        <div className="space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Primary Navigation
          </div>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/" className="text-[#171A18] hover:text-[#C84B2F] transition-colors">Home (Overview)</Link></li>
            <li><Link href="/data" className="text-[#171A18] hover:text-[#C84B2F] transition-colors">The Data (Explorer & Metadata)</Link></li>
            <li><Link href="/seasonality" className="text-[#171A18] hover:text-[#C84B2F] transition-colors">Seasonality (5 Disease Profiles)</Link></li>
            <li><Link href="/fieldwork" className="text-[#171A18] hover:text-[#C84B2F] transition-colors">Fieldwork (Nallasopara West)</Link></li>
            <li><Link href="/method" className="text-[#171A18] hover:text-[#C84B2F] transition-colors">Methodology & Ethics</Link></li>
            <li><Link href="/sources" className="text-[#171A18] hover:text-[#C84B2F] transition-colors">Sources & References</Link></li>
          </ul>
        </div>

        {/* Column 3: Analytical Boundaries */}
        <div className="space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Research Boundaries
          </div>
          <p className="text-xs text-[#565C58] leading-relaxed">
            Data reflects reported outbreak notifications and suspected case tallies. It does not measure population incidence, clinical prevalence, or complete epidemiological burden. Field observation is qualitative contextual evidence from one visit to one facility, not generalizable ground truth.
          </p>
        </div>
      </div>

      {/* Bottom Legal / Institutional Strip */}
      <div className="border-t border-[#D8D1C5] py-4 px-4 lg:px-8 text-center text-xs text-[#7A827D] font-mono">
        B.Sc. Data Science Semester III Field Project · University of Mumbai · Academic Use Only
      </div>
    </footer>
  );
}
