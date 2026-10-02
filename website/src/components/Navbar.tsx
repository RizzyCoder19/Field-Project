"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Data", href: "/data" },
    { name: "Seasonality", href: "/seasonality" },
    { name: "Fieldwork", href: "/fieldwork" },
    { name: "Method", href: "/method" },
    { name: "Sources", href: "/sources" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F3EFE6]/95 backdrop-blur-md border-b border-[#D8D1C5]">
      {/* Institutional Masthead Top Strip */}
      <div className="bg-[#E8E2D7] border-b border-[#D8D1C5] px-4 lg:px-8 py-1.5 text-xs text-[#565C58] flex justify-between items-center font-mono">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-[#174A4A] tracking-wider uppercase">RP INSTITUTE · UNIVERSITY OF MUMBAI</span>
          <span className="hidden sm:inline text-[#B8B0A2]">|</span>
          <span className="hidden sm:inline">B.Sc. Data Science · Sem III</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="text-[#171A18] font-medium">Khan Umar</span>
          <span className="text-[#B8B0A2]">·</span>
          <span className="text-[#565C58]">2022–2026 Archive</span>
        </div>
      </div>

      {/* Main Primary Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand / Project Name */}
        <Link href="/" className="group flex flex-col focus:outline-none">
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#171A18] group-hover:text-[#174A4A] transition-colors">
            From Data to the Ground
          </span>
          <span className="text-[11px] font-sans tracking-wide text-[#7A827D] uppercase">
            Seasonal Disease Surveillance · Maharashtra
          </span>
        </Link>

        {/* Desktop Primary Nav Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded text-sm font-medium transition-all ${
                  active
                    ? "bg-[#174A4A] text-[#F3EFE6] shadow-sm"
                    : "text-[#171A18] hover:bg-[#E8E2D7] hover:text-[#174A4A]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Primary CTA Button */}
        <div className="hidden md:flex items-center pl-2">
          <Link
            href="/seasonality"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C84B2F] hover:bg-[#A43920] text-white text-xs font-semibold tracking-wide uppercase rounded transition-colors shadow-sm"
          >
            <span>Explore Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#171A18] hover:bg-[#E8E2D7] rounded focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#D8D1C5] px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded text-base font-medium transition-colors ${
                  active
                    ? "bg-[#174A4A] text-[#F3EFE6]"
                    : "text-[#171A18] hover:bg-[#E8E2D7]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#D8D1C5]">
            <Link
              href="/seasonality"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C84B2F] text-white text-sm font-semibold rounded text-center"
            >
              <span>Explore Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
