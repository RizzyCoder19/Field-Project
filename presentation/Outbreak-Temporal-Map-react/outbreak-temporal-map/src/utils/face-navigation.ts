import { useEffect, useRef } from "react";

export type FaceScrollBehavior = "auto" | "instant" | "smooth";

export interface NavigateToOptions {
  faceId: string;
  behavior?: FaceScrollBehavior;
}

export interface SlideInfo {
  faceId: string;
  name: string;
  index: number;
}

interface RegisteredFace {
  id: string;
  name?: string;
  hidden?: boolean;
}

let registeredSlides: readonly SlideInfo[] = [];

function slidesEqual({
  a,
  b,
}: {
  a: readonly SlideInfo[];
  b: readonly SlideInfo[];
}): boolean {
  if (a.length !== b.length) return false;
  return a.every(
    (slide, index) =>
      slide.faceId === b[index].faceId && slide.name === b[index].name,
  );
}

export function registerFaceList({
  faces,
}: {
  faces: RegisteredFace[];
}): () => void {
  const nextSlides = Object.freeze(
    faces
      .filter((face) => !face.hidden)
      .map((face, index) =>
        Object.freeze({
          faceId: face.id,
          name: face.name ?? face.id,
          index,
        }),
      ),
  );
  const slides = slidesEqual({ a: registeredSlides, b: nextSlides })
    ? registeredSlides
    : nextSlides;
  registeredSlides = slides;
  return () => {
    if (registeredSlides === slides) {
      registeredSlides = [];
    }
  };
}

export function useRegisterFaceList({ faces }: { faces: RegisteredFace[] }) {
  const facesRef = useRef(faces);
  facesRef.current = faces;
  const facesKey = JSON.stringify(
    faces.map((face) => [face.id, face.name ?? null, face.hidden ?? false]),
  );
  useEffect(() => {
    const unregister = registerFaceList({ faces: facesRef.current });
    return unregister;
  }, [facesKey]);
}

export function getSlides(): readonly SlideInfo[] {
  return registeredSlides;
}

function normalizeSlideQuery({ value }: { value: string }): string {
  return value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}

export function resolveFaceId({ query }: { query: string }): string | null {
  if (typeof query !== "string") return null;
  const trimmed = query.trim();
  if (!trimmed) return null;
  const exactId = registeredSlides.find((slide) => slide.faceId === trimmed);
  if (exactId) return exactId.faceId;
  const normalized = normalizeSlideQuery({ value: trimmed });
  if (normalized) {
    const match = registeredSlides.find(
      (slide) =>
        normalizeSlideQuery({ value: slide.faceId }) === normalized ||
        normalizeSlideQuery({ value: slide.name }) === normalized,
    );
    if (match) return match.faceId;
  }
  return findFaceElement(trimmed) ? trimmed : null;
}

type NavigateHandler = (options: NavigateToOptions) => void;

const NAVIGATE_GUARD_MS = 300;

let activeHandler: NavigateHandler | null = null;
let lastNavigateAt = 0;

function registerFaceNavigationHandler(
  handler: NavigateHandler | null,
): () => void {
  activeHandler = handler;
  return () => {
    if (activeHandler === handler) {
      activeHandler = null;
    }
  };
}

export function useRegisterFaceNavigation(handler: NavigateHandler) {
  useEffect(() => {
    const unregister = registerFaceNavigationHandler(handler);
    return unregister;
  }, [handler]);
}

export function wasJustNavigated(ms: number = NAVIGATE_GUARD_MS): boolean {
  return Date.now() - lastNavigateAt < ms;
}

function findFaceElement(faceId: string): HTMLElement | null {
  if (typeof document === "undefined") return null;
  const escaped = CSS.escape(faceId);
  return document.querySelector<HTMLElement>(
    `[data-face-root-id="${escaped}"], [data-face-id="${escaped}"]`,
  );
}

export function notifyContentRevealState(_: unknown): void {}

export function notifyFaceRevealCompleted(_: unknown): void {}

export function notifyUserScrollTakeover(): void {}

export function scrollToFace({
  faceId,
  behavior = "smooth",
}: {
  faceId: string;
  behavior?: FaceScrollBehavior;
}): boolean {
  const element = findFaceElement(faceId);
  if (!element) return false;
  element.scrollIntoView({ behavior, block: "start" });
  return true;
}

export function scrollEditorToFace(..._: unknown[]): void {}

export function useScrollableNavigateToFace(..._: unknown[]): void {}

export function navigateTo(options: NavigateToOptions): void {
  lastNavigateAt = Date.now();
  const resolvedOptions: NavigateToOptions = {
    ...options,
    faceId: resolveFaceId({ query: options.faceId }) ?? options.faceId,
  };
  if (activeHandler) {
    activeHandler(resolvedOptions);
    return;
  }
  scrollToFace(resolvedOptions);
}
