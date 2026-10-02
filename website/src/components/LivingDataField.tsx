"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Layers, Filter, Calendar, Compass, ArrowRight } from "lucide-react";

interface Point {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  size: number;
  disease?: string;
  month?: number;
  alpha: number;
}

const STAGES = [
  {
    id: 1,
    title: "1. Raw PDF Bulletins",
    count: "237 Weekly Archive Bulletins",
    desc: "Unstructured epidemiological surveillance PDF reports published weekly by NCDC / IDSP.",
    icon: Layers
  },
  {
    id: 2,
    title: "2. Structured Tabular Rows",
    count: "809 Maharashtra Records Extracted",
    desc: "Additive cleaning normalizes 116 raw disease spelling variants into 56 canonical labels.",
    icon: Filter
  },
  {
    id: 3,
    title: "3. Five Primary Families",
    count: "539 Baseline Records (93.9%)",
    desc: "Dengue (Blue), ADD (Green), Malaria (Gold), Food Poisoning (Red), Chikungunya (Purple).",
    icon: Sparkles
  },
  {
    id: 4,
    title: "4. 12-Month Seasonal Matrix",
    count: "5 Temporal Signatures Formed",
    desc: "Points organize into 12 calendar months, revealing distinct non-uniform seasonal windows.",
    icon: Calendar
  },
  {
    id: 5,
    title: "5. Ground Fieldwork Linkage",
    count: "Macro Data Connected to Micro Realities",
    desc: "Surveillance clusters inform planned environmental audits and community interviews.",
    icon: Compass
  }
];

const DISEASE_COLORS = [
  "#38BDF8", // Dengue (analytical blue)
  "#10B981", // ADD (emerald)
  "#D4AF37", // Malaria (imperial gold)
  "#EF4444", // Food Poisoning (ruby)
  "#A78BFA"  // Chikungunya (purple)
];

export default function LivingDataField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeStage, setActiveStage] = useState(1);
  const pointsRef = useRef<Point[]>([]);

  // Initialize 300 representative points
  useEffect(() => {
    const totalPoints = 280;
    const initialPoints: Point[] = [];

    for (let i = 0; i < totalPoints; i++) {
      const diseaseIdx = i % 5;
      const monthIdx = (i * 7) % 12;
      initialPoints.push({
        x: Math.random() * 800,
        y: Math.random() * 400,
        targetX: Math.random() * 800,
        targetY: Math.random() * 400,
        color: "#D4AF37",
        size: Math.random() * 2 + 2,
        disease: ["Dengue", "ADD", "Malaria", "Food Poisoning", "Chikungunya"][diseaseIdx],
        month: monthIdx,
        alpha: 0.8
      });
    }

    pointsRef.current = initialPoints;
  }, []);

  // Update target positions based on active stage
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;
    const points = pointsRef.current;

    points.forEach((pt, idx) => {
      if (activeStage === 1) {
        // Raw Scattered field
        pt.targetX = 60 + Math.random() * (width - 120);
        pt.targetY = 40 + Math.random() * (height - 80);
        pt.color = "#AEB9D1";
        pt.alpha = 0.45;
      } else if (activeStage === 2) {
        // Structured Grid Rows
        const cols = 20;
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        pt.targetX = 60 + (col / cols) * (width - 120);
        pt.targetY = 60 + (row / 15) * (height - 120);
        pt.color = "#D4AF37";
        pt.alpha = 0.7;
      } else if (activeStage === 3) {
        // Five Disease Family Clusters
        const diseaseIdx = ["Dengue", "ADD", "Malaria", "Food Poisoning", "Chikungunya"].indexOf(pt.disease || "Dengue");
        const clusterCenterX = 100 + (diseaseIdx / 4) * (width - 200);
        const clusterCenterY = height / 2;
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 55;
        pt.targetX = clusterCenterX + Math.cos(angle) * radius;
        pt.targetY = clusterCenterY + Math.sin(angle) * radius;
        pt.color = DISEASE_COLORS[diseaseIdx];
        pt.alpha = 0.85;
      } else if (activeStage === 4) {
        // 12 Monthly Calendar Columns
        const month = pt.month ?? 0;
        const colX = 70 + (month / 11) * (width - 140);
        const diseaseIdx = ["Dengue", "ADD", "Malaria", "Food Poisoning", "Chikungunya"].indexOf(pt.disease || "Dengue");
        const rowY = 80 + (diseaseIdx / 4) * (height - 160) + (Math.random() * 20 - 10);
        pt.targetX = colX + (Math.random() * 16 - 8);
        pt.targetY = rowY;
        pt.color = DISEASE_COLORS[diseaseIdx];
        pt.alpha = 0.9;
      } else if (activeStage === 5) {
        // Ground Connection: Macro points converging to micro field transects
        const group = idx % 3; // 3 field study transects
        const tx = 140 + group * ((width - 280) / 2);
        const ty = height - 90 - (idx % 25) * 8;
        pt.targetX = tx + (Math.random() * 60 - 30);
        pt.targetY = ty;
        pt.color = group === 0 ? "#38BDF8" : group === 1 ? "#10B981" : "#D4AF37";
        pt.alpha = 0.85;
      }
    });
  }, [activeStage]);

  // Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Stage Guides
      if (activeStage === 4) {
        // Draw 12 month guide lines
        ctx.strokeStyle = "rgba(212, 175, 55, 0.12)";
        ctx.lineWidth = 1;
        const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
        for (let m = 0; m < 12; m++) {
          const x = 70 + (m / 11) * (canvas.width - 140);
          ctx.beginPath();
          ctx.moveTo(x, 40);
          ctx.lineTo(x, canvas.height - 40);
          ctx.stroke();

          ctx.fillStyle = m >= 5 && m <= 8 ? "#D4AF37" : "#64748B";
          ctx.font = "10px JetBrains Mono, monospace";
          ctx.textAlign = "center";
          ctx.fillText(months[m], x, canvas.height - 22);
        }
      }

      // Smooth point physics & rendering
      const points = pointsRef.current;
      points.forEach((pt) => {
        // Linear interpolation towards target
        pt.x += (pt.targetX - pt.x) * 0.08;
        pt.y += (pt.targetY - pt.y) * 0.08;

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeStage]);

  return (
    <div className="w-full bg-[#080D1F] border border-[#1E335E] rounded-xl overflow-hidden shadow-2xl p-6 lg:p-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1E335E]/60 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#D4AF37]">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
            <span>Living Data Field · Transformation Simulator</span>
          </div>
          <h3 className="font-serif text-xl lg:text-2xl font-bold text-[#F8F5EC] mt-1">
            From Raw PDFs to Physical Ground Context
          </h3>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center space-x-1.5 bg-[#0D162E] p-1.5 rounded-lg border border-[#D4AF37]/30">
          {STAGES.map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStage(st.id)}
              className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                activeStage === st.id
                  ? "bg-[#D4AF37] text-[#0A1128] font-bold shadow-md"
                  : "text-[#AEB9D1] hover:text-[#F8F5EC] hover:bg-[#16274D]"
              }`}
            >
              Stage {st.id}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full h-[360px] my-4 bg-[#0A1128] rounded-lg border border-[#1E335E]/40 overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={860}
          height={360}
          className="w-full h-full object-contain"
        />

        {/* Overlay Current Stage Caption */}
        <div className="absolute top-4 left-4 bg-[#0D162E]/90 border border-[#D4AF37]/40 px-3.5 py-2 rounded shadow-lg backdrop-blur-md max-w-sm">
          <div className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
            {STAGES[activeStage - 1].title}
          </div>
          <div className="text-xs text-[#F8F5EC] font-semibold mt-0.5">
            {STAGES[activeStage - 1].count}
          </div>
          <div className="text-[11px] text-[#AEB9D1] mt-1 leading-relaxed">
            {STAGES[activeStage - 1].desc}
          </div>
        </div>

        {/* Disease Legend for Stages 3, 4, 5 */}
        {activeStage >= 3 && (
          <div className="absolute bottom-4 right-4 bg-[#0D162E]/90 border border-[#1E335E] px-3 py-2 rounded text-[11px] font-mono flex flex-wrap gap-3 backdrop-blur-md">
            <span className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span><span>Dengue</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span><span>ADD</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span><span>Malaria</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-[#EF4444]"></span><span>Food Poisoning</span></span>
            <span className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-[#A78BFA]"></span><span>Chikungunya</span></span>
          </div>
        )}
      </div>

      {/* Stage Progression Carousel Controls */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
        {STAGES.map((st) => {
          const Icon = st.icon;
          const isSelected = activeStage === st.id;
          return (
            <div
              key={st.id}
              onClick={() => setActiveStage(st.id)}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#16274D] border-[#D4AF37] text-white shadow-lg"
                  : "bg-[#0D162E] border-[#1E335E]/60 text-[#AEB9D1] hover:border-[#D4AF37]/50"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className={isSelected ? "text-[#D4AF37] font-bold" : "text-[#64748B]"}>
                  0{st.id}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#D4AF37]" : "text-[#64748B]"}`} />
              </div>
              <div className="font-serif text-xs font-bold text-[#F8F5EC] mt-1.5 line-clamp-1">
                {st.title.split(". ")[1]}
              </div>
              <div className="text-[10px] text-[#AEB9D1] line-clamp-1 mt-0.5">
                {st.count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
