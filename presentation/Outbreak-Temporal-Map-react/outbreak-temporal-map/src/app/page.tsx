import React from "react";
import { NewSlidesLayout } from "@/components/entrypoint-layouts/new-slides-layout";
import { faces } from "@/faces.config.json";
import CoverFace from "@/faces/cover/face.tsx";
import WhyquestionFace from "@/faces/why-question/face.tsx";
import ResearchquestionFace from "@/faces/research-question/face.tsx";
import EvidencearchitectureFace from "@/faces/evidence-architecture/face.tsx";
import CoverageauditFace from "@/faces/coverage-audit/face.tsx";
import DataengineeringFace from "@/faces/data-engineering/face.tsx";
import PrimarycohortFace from "@/faces/primary-cohort/face.tsx";
import SeasonalityframeworkFace from "@/faces/seasonality-framework/face.tsx";
import FaceefoeqlFace from "@/faces/face-efoeql/face.tsx";
import DengueFace from "@/faces/dengue/face.tsx";
import AdddiseaseFace from "@/faces/add-disease/face.tsx";
import MalariachikungunyaFace from "@/faces/malaria-chikungunya/face.tsx";
import FoodpoisoningFace from "@/faces/food-poisoning/face.tsx";
import StabilityFace from "@/faces/stability/face.tsx";
import DistrictvariationFace from "@/faces/district-variation/face.tsx";
import Partial2026Face from "@/faces/partial-2026/face.tsx";
import EvidenceboundariesFace from "@/faces/evidence-boundaries/face.tsx";
import ReferencesclosingFace from "@/faces/references-closing/face.tsx";


const visibleFaces = faces.filter((face) => !face.hidden);

export const componentMap = {
  "cover": CoverFace,
  "why-question": WhyquestionFace,
  "research-question": ResearchquestionFace,
  "evidence-architecture": EvidencearchitectureFace,
  "coverage-audit": CoverageauditFace,
  "data-engineering": DataengineeringFace,
  "primary-cohort": PrimarycohortFace,
  "seasonality-framework": SeasonalityframeworkFace,
  "face-efoeql": FaceefoeqlFace,
  "dengue": DengueFace,
  "add-disease": AdddiseaseFace,
  "malaria-chikungunya": MalariachikungunyaFace,
  "food-poisoning": FoodpoisoningFace,
  "stability": StabilityFace,
  "district-variation": DistrictvariationFace,
  "partial-2026": Partial2026Face,
  "evidence-boundaries": EvidenceboundariesFace,
  "references-closing": ReferencesclosingFace,
};

export const projectConfig = {"layout":"SLIDESHOW","slidesDisplay":"FULLSCREEN","stackedOrientation":"HORIZONTAL","cardsBackgroundColor":"#171A18","mobileCanvas":"COMPACT","tokens":{"palette":[{"name":"--bone","value":"#F1EBDD"},{"name":"--ink","value":"#171A18"},{"name":"--petrol","value":"#174A4A"},{"name":"--ember","value":"#C84B2F"},{"name":"--gold","value":"#B49A5A"},{"name":"--chartreuse","value":"#B6C43A"},{"name":"--rule","value":"#171A1826"},{"name":"--rule-strong","value":"#171A1859"},{"name":"--bone-deep","value":"#E6DEC9"}],"fonts":[{"name":"--font-editorial","family":"Spectral"},{"name":"--font-body","family":"Archivo"},{"name":"--font-mono","family":"IBM Plex Mono"}]}};

export default function Page() {
  return (
    <NewSlidesLayout
      faces={visibleFaces}
      componentMap={componentMap}
      layout="SLIDESHOW"
      slidesDisplay="FULLSCREEN"
      stackedOrientation="HORIZONTAL"
      cardsSlidesPerView={1.25}
      cardsBackgroundColor={"#171A18"}
      cardsBackgroundImage={""}
      cardsCorners="ROUND"
      mobileCanvas="COMPACT"
    />
  );
}