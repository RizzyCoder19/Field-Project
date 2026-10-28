"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SiteConstructionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Register GSAP plugins in browser context
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Initialize AOS for declarative scroll animations
      AOS.init({
        duration: 850,
        easing: "ease-out-cubic",
        once: false,
        offset: 50,
        delay: 50,
        mirror: true,
      });

      // GSAP Self-Construction Pipeline: Animate cards, metrics, and structural panels
      const ctx = gsap.context(() => {
        // 1. Initial Page Load Blueprint Assembly
        gsap.fromTo(
          "header, nav, .construct-initial",
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          }
        );

        // 2. Structural Section Self-Construction on Scroll
        const sections = document.querySelectorAll("section");
        sections.forEach((sec) => {
          gsap.fromTo(
            sec,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // 3. Staggered Assembly for Metric Grids & Cards
        const cardContainers = document.querySelectorAll(
          ".grid, .flex-wrap, [data-construct='stagger']"
        );
        cardContainers.forEach((container) => {
          const directCards = container.querySelectorAll(
            ":scope > div, :scope > article, :scope > .card-bg"
          );
          if (directCards.length > 0) {
            gsap.fromTo(
              directCards,
              { opacity: 0, y: 35, scale: 0.97 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.75,
                stagger: 0.06,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: container,
                  start: "top 86%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });

        // 4. Subtle Forensic Pulse Line Assembly
        const borders = document.querySelectorAll(
          ".border-b, .border-t, hr, .forensic-divider"
        );
        borders.forEach((b) => {
          gsap.fromTo(
            b,
            { opacity: 0, scaleX: 0.92, transformOrigin: "left center" },
            {
              opacity: 1,
              scaleX: 1,
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: b,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });

      return () => {
        ctx.revert();
      };
    }
  }, [pathname]);

  // Route change refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh();
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
