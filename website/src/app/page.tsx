"use client";

import React, { useState, lazy, Suspense } from "react";

const CinematicIntro = lazy(() => import("@/components/CinematicIntro"));
const ScrollStory    = lazy(() => import("@/components/ScrollStory"));

export default function MainPage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* ── CINEMATIC INTRO ── */}
      {!introComplete && (
        <Suspense fallback={<div className="fixed inset-0 bg-black z-[9999]" />}>
          <CinematicIntro onComplete={() => setIntroComplete(true)} />
        </Suspense>
      )}

      {/* ── SCROLL STORY (main presentation) ── */}
      <div
        className="w-full transition-opacity duration-700"
        style={{ opacity: introComplete ? 1 : 0 }}
      >
        <Suspense fallback={<div className="min-h-screen bg-[#111411]" />}>
          <ScrollStory />
        </Suspense>
      </div>
    </>
  );
}
