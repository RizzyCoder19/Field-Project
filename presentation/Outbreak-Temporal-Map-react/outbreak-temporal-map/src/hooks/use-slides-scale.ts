import type {
  SlidesDisplay,
  StackedOrientation,
} from "@/components/entrypoint-layouts/slides-layout-shared";
import { useEffect, useLayoutEffect, useState, type RefObject } from "react";

const MIN_MARGIN = 32;

const CARDS_SLIDES_PER_VIEW_MIN = 0.5;
const CARDS_SLIDES_PER_VIEW_MAX = 2;
export const CARDS_SLIDES_PER_VIEW_DEFAULT = 1.25;
export const MIN_CARDS_PEEK_SLIDES_PER_VIEW = 1.08;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function clampCardsSlidesPerView(value: number): number {
  return clamp(value, CARDS_SLIDES_PER_VIEW_MIN, CARDS_SLIDES_PER_VIEW_MAX);
}

function computeWindowScale({
  slideWidth,
  slideHeight,
  isFullscreen,
}: {
  slideWidth: number;
  slideHeight: number;
  isFullscreen: boolean;
}): number | null {
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  if (viewportWidth === 0 || viewportHeight === 0) return null;

  const margin = isFullscreen ? 0 : MIN_MARGIN;
  const availableWidth = viewportWidth - margin * 2;
  const availableHeight = viewportHeight - margin * 2;
  return Math.min(availableWidth / slideWidth, availableHeight / slideHeight);
}

export function useWindowScale({
  slideWidth,
  slideHeight,
  isFullscreen,
}: {
  slideWidth: number;
  slideHeight: number;
  isFullscreen: boolean;
}): number | null {
  const [scale, setScale] = useState<number | null>(() =>
    computeWindowScale({ slideWidth, slideHeight, isFullscreen }),
  );

  useEffect(() => {
    const calculateScale = () => {
      const result = computeWindowScale({
        slideWidth,
        slideHeight,
        isFullscreen,
      });
      if (result !== null) setScale(result);
    };

    calculateScale();

    window.addEventListener("resize", calculateScale);

    return () => {
      window.removeEventListener("resize", calculateScale);
    };
  }, [slideWidth, slideHeight, isFullscreen]);

  return scale;
}

interface ViewportSize {
  width: number;
  height: number;
}

function createViewportHeightResolver({
  stabilize,
}: {
  stabilize: boolean;
}): ({ width, height }: ViewportSize) => number {
  let stableViewportSize: ViewportSize | null = null;

  return function resolveViewportHeight({ width, height }: ViewportSize) {
    if (!stabilize) return height;

    if (!stableViewportSize || stableViewportSize.width !== width) {
      stableViewportSize = { width, height };
    }

    return stableViewportSize.height;
  };
}

export function useContainerDimensionScale({
  containerRef,
  orientation,
  slidesDisplay,
  cardsSlidesPerView,
  slideWidth,
  slideHeight,
  stabilizeViewportHeight = false,
}: {
  containerRef: RefObject<HTMLElement | null>;
  orientation: StackedOrientation;
  slidesDisplay: SlidesDisplay;
  cardsSlidesPerView: number;
  slideWidth: number;
  slideHeight: number;
  stabilizeViewportHeight?: boolean;
}): number | null {
  const [scale, setScale] = useState<number | null>(null);
  const slidesPerView = clampCardsSlidesPerView(cardsSlidesPerView);
  const isHorizontal = orientation === "HORIZONTAL";
  const isCards = slidesDisplay === "CARDS";
  const effectiveSlidesPerView =
    isCards && !isHorizontal
      ? Math.max(slidesPerView, MIN_CARDS_PEEK_SLIDES_PER_VIEW)
      : slidesPerView;

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const resolveViewportHeight = createViewportHeightResolver({
      stabilize: stabilizeViewportHeight,
    });
    const calculate = () => {
      const style = window.getComputedStyle(el);
      const padX =
        (parseFloat(style.paddingLeft) || 0) +
        (parseFloat(style.paddingRight) || 0);
      const padY =
        (parseFloat(style.paddingTop) || 0) +
        (parseFloat(style.paddingBottom) || 0);
      const gap =
        parseFloat(isHorizontal ? style.columnGap : style.rowGap) || 0;

      const scrollAxisAvail = isHorizontal
        ? window.innerWidth - padX
        : resolveViewportHeight({
            width: window.innerWidth,
            height: window.innerHeight,
          }) - padY;
      const crossAxisAvail = isHorizontal
        ? el.clientHeight - padY
        : el.clientWidth - padX;
      if (scrollAxisAvail <= 0 || crossAxisAvail <= 0) return;

      const slideScrollSize = isHorizontal ? slideWidth : slideHeight;
      const slideCrossSize = isHorizontal ? slideHeight : slideWidth;

      // Only reserve a gap once a second slide actually peeks in; at
      // slidesPerView <= 1 subtracting it would leave an empty strip.
      const gapAllowance = effectiveSlidesPerView > 1 ? gap : 0;
      const scrollAxisBudget = isCards
        ? (scrollAxisAvail - gapAllowance) / effectiveSlidesPerView
        : scrollAxisAvail;

      const scaleFromScrollAxis = isCards
        ? scrollAxisBudget / slideScrollSize
        : Infinity;
      const scaleFromCrossAxis = crossAxisAvail / slideCrossSize;
      setScale(Math.min(scaleFromScrollAxis, scaleFromCrossAxis));
    };
    calculate();
    const resizeObserver = new ResizeObserver(calculate);
    resizeObserver.observe(el);
    window.addEventListener("resize", calculate);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculate);
    };
  }, [
    containerRef,
    effectiveSlidesPerView,
    isCards,
    isHorizontal,
    slideWidth,
    slideHeight,
    stabilizeViewportHeight,
  ]);

  return scale;
}
