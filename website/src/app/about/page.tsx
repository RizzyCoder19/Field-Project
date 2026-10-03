"use client";

import React from "react";
import Link from "next/link";
import { User, Building2, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="border-b border-[#D8D1C5] bg-[#FAF7F2] py-16 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[#174A4A] font-semibold">
            Institutional Attestation & Authorship
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#171A18]">
            About the Project
          </h1>
          <p className="text-base sm:text-lg text-[#565C58] leading-relaxed">
            Analysis of Seasonal Disease Patterns Using Government Health Data: An Interactive Surveillance & Fieldwork Archive for Maharashtra.
          </p>
        </div>
      </section>

      {/* 2. CANDIDATE & INSTITUTION DETAILS */}
      <section className="py-14 px-4 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Candidate Card */}
          <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-6 rounded space-y-4">
            <div className="flex items-center gap-3 border-b border-[#D8D1C5] pb-3">
              <div className="w-10 h-10 rounded bg-[#E8E2D7] flex items-center justify-center text-[#174A4A]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase text-[#7A827D]">Candidate / Investigator</div>
                <h3 className="font-serif text-xl font-bold text-[#171A18]">Khan Umar</h3>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono divide-y divide-[#D8D1C5]/60 text-[#565C58]">
              <div className="flex justify-between py-1.5">
                <span>Degree</span>
                <span className="font-bold text-[#171A18]">B.Sc. Data Science</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Semester</span>
                <span className="font-bold text-[#171A18]">Semester III</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Academic Session</span>
                <span className="font-bold text-[#171A18]">2026–2027</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Fieldwork Location</span>
                <span className="font-bold text-[#174A4A]">Nallasopara West, Palghar</span>
              </div>
            </div>
          </div>

          {/* Institution Card */}
          <div className="bg-[#FAF7F2] border border-[#D8D1C5] p-6 rounded space-y-4">
            <div className="flex items-center gap-3 border-b border-[#D8D1C5] pb-3">
              <div className="w-10 h-10 rounded bg-[#E8E2D7] flex items-center justify-center text-[#174A4A]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase text-[#7A827D]">Affiliated Institution</div>
                <h3 className="font-serif text-xl font-bold text-[#171A18]">RP Institute</h3>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono divide-y divide-[#D8D1C5]/60 text-[#565C58]">
              <div className="flex justify-between py-1.5">
                <span>University</span>
                <span className="font-bold text-[#171A18]">University of Mumbai</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Professor / Guide</span>
                <span className="font-bold text-[#171A18]">Prof. Angelin</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Curriculum Course</span>
                <span className="font-bold text-[#171A18]">Field Project (USDS306)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Jurisdiction</span>
                <span className="font-bold text-[#171A18]">Maharashtra, India</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Primary Dataset</span>
                <span className="font-bold text-[#174A4A]">NCDC / IDSP Surveillance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Purpose Statement */}
        <div className="bg-[#E8E2D7] p-6 rounded border border-[#D8D1C5] space-y-2">
          <h4 className="font-serif text-lg font-bold text-[#171A18]">
            Project Statement & Research Scope
          </h4>
          <p className="text-xs sm:text-sm text-[#565C58] leading-relaxed">
            This field project bridges macroeconomic public health data science with ground-level community healthcare realities. By scrutinizing four complete baseline years of weekly epidemic notifications, environmental observations, and publicly documented disease trajectories, it reconstructs how seasonal disease patterns emerge and why surveillance reporting often understates community burden.
          </p>
        </div>

        <div className="pt-4 flex justify-between items-center text-xs">
          <Link href="/" className="text-[#174A4A] hover:underline font-semibold">
            ← Back to Home
          </Link>
          <Link href="/seasonality" className="inline-flex items-center gap-1 text-[#C84B2F] hover:underline font-semibold">
            <span>Explore Seasonal Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
