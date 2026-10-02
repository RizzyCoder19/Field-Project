import type { FaceEntry } from "@/components/entrypoint-layouts/dynamic-face-render";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const EDGE_HOVER_ZONE_WIDTH = 120;
const BOTTOM_HOVER_ZONE_HEIGHT = 60;
const AUTO_HIDE_DELAY = 1000;
const INITIAL_AUTO_HIDE_DELAY = 3000;
const URL_SYNC_DEBOUNCE_MS = 120;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function getVisibleFaces(faces: Array<FaceEntry>): Array<FaceEntry> {
  return faces.filter((face) => !face.hidden);
}

function getSlideIndexFromUrl(maxIndex: number): number {
  if (typeof window === "undefined") return 0;

  const slideParam = new URLSearchParams(window.location.search).get("slide");
  if (!slideParam) return 0;

  const parsed = parseInt(slideParam, 10);
  if (isNaN(parsed)) return 0;

  return clamp(parsed - 1, 0, maxIndex);
}

let replaceStateTimeout: ReturnType<typeof setTimeout> | null = null;
let pendingSlideIndex: number | null = null;

function setSlideIndexInUrl(index: number): void {
  if (typeof window === "undefined") return;

  pendingSlideIndex = index;

  if (replaceStateTimeout) return;

  replaceStateTimeout = setTimeout(() => {
    replaceStateTimeout = null;
    if (pendingSlideIndex === null) return;

    const params = new URLSearchParams(window.location.search);
    params.set("slide", String(pendingSlideIndex + 1));
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}${window.location.hash}`,
    );
    pendingSlideIndex = null;
  }, URL_SYNC_DEBOUNCE_MS);
}

interface UseSlidesNavigationParams {
  faces: Array<FaceEntry>;
  initialIndex?: number;
  syncToUrl?: boolean;
}

export function useSlidesNavigation({
  faces,
  initialIndex = 0,
  syncToUrl = false,
}: UseSlidesNavigationParams) {
  const visibleFaces = getVisibleFaces(faces);
  const maxIndex = Math.max(0, visibleFaces.length - 1);

  const [slideIndex, setSlideIndex] = useState(() =>
    syncToUrl ? getSlideIndexFromUrl(maxIndex) : initialIndex,
  );

  const currentSlideIndex = clamp(slideIndex, 0, maxIndex);
  const navigationIndexRef = useRef(currentSlideIndex);
  navigationIndexRef.current = currentSlideIndex;

  const goToSlide = useCallback(
    (index: number) => {
      const clampedIndex = clamp(index, 0, maxIndex);
      navigationIndexRef.current = clampedIndex;
      setSlideIndex(clampedIndex);

      if (syncToUrl) {
        setSlideIndexInUrl(clampedIndex);
      }
    },
    [maxIndex, syncToUrl],
  );

  const goToNextSlide = useCallback(() => {
    goToSlide(navigationIndexRef.current + 1);
  }, [goToSlide]);

  const goToPrevSlide = useCallback(() => {
    goToSlide(navigationIndexRef.current - 1);
  }, [goToSlide]);

  const canNavigate = visibleFaces.length > 1;

  useKeyboardNavigation({
    enabled: canNavigate,
    onNext: goToNextSlide,
    onPrev: goToPrevSlide,
  });

  const touchHandlers = useSwipeNavigation({
    enabled: canNavigate,
    onSwipeLeft: goToNextSlide,
    onSwipeRight: goToPrevSlide,
  });

  return {
    currentSlideIndex,
    visibleFaces,
    goToSlide,
    touchHandlers,
  };
}

function ChevronIcon({
  direction,
}: {
  direction: "left" | "right";
}): ReactNode {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={direction === "left" ? "M15 18L9 12L15 6" : "M9 18L15 12L9 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface SlidesNavigationProps {
  faces: Array<FaceEntry>;
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
  autoOpen?: boolean;
}

export function SlidesNavigation({
  faces,
  currentSlideIndex,
  onSlideChange,
  autoOpen = false,
}: SlidesNavigationProps) {
  const visibleFaces = getVisibleFaces(faces);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) =>
      setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const [isVisible, setIsVisible] = useState(autoOpen);
  const [hoveredEdge, setHoveredEdge] = useState<"left" | "right" | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasInitializedRef = useRef(false);

  const updateVisibility = useCallback((visible: boolean) => {
    setIsVisible(visible);

    if (visible) {
      document.body.dataset.slidesNavigationVisible = "true";
    } else {
      delete document.body.dataset.slidesNavigationVisible;
    }
  }, []);

  useEffect(() => {
    return () => {
      delete document.body.dataset.slidesNavigationVisible;
    };
  }, []);

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const startHideTimeout = useCallback(() => {
    if (isMobile) {
      return;
    }

    clearHideTimeout();

    hideTimeoutRef.current = setTimeout(() => {
      updateVisibility(false);
      setHoveredEdge(null);
    }, AUTO_HIDE_DELAY);
  }, [clearHideTimeout, updateVisibility, isMobile]);

  useEffect(() => {
    if (!autoOpen || hasInitializedRef.current) {
      return;
    }

    hasInitializedRef.current = true;
    document.body.dataset.slidesNavigationVisible = "true";

    if (!isMobile) {
      const timeout = setTimeout(() => {
        updateVisibility(false);
      }, INITIAL_AUTO_HIDE_DELAY);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [autoOpen, isMobile, updateVisibility]);

  const handleEdgeEnter = useCallback(
    (edge: "left" | "right") => {
      updateVisibility(true);
      setHoveredEdge(edge);
      clearHideTimeout();
    },
    [clearHideTimeout, updateVisibility],
  );

  const handleBottomEnter = useCallback(() => {
    updateVisibility(true);
    setHoveredEdge(null);
    clearHideTimeout();
  }, [clearHideTimeout, updateVisibility]);

  const handleEdgeLeave = useCallback(() => {
    startHideTimeout();
  }, [startHideTimeout]);

  const handleNavigationEnter = useCallback(() => {
    clearHideTimeout();
  }, [clearHideTimeout]);

  const handleNavigationLeave = useCallback(() => {
    startHideTimeout();
  }, [startHideTimeout]);

  if (visibleFaces.length <= 1) {
    return null;
  }

  const hasPrev = currentSlideIndex > 0;
  const hasNext = currentSlideIndex < visibleFaces.length - 1;

  return (
    <div data-slides-navigation>
      <div
        className="slides-bottom-zone"
        style={{ height: BOTTOM_HOVER_ZONE_HEIGHT }}
        onMouseEnter={handleBottomEnter}
        onMouseLeave={handleEdgeLeave}
      />

      {hasPrev && !isMobile && (
        <div
          className="slides-edge-zone slides-edge-zone-left"
          style={{ width: EDGE_HOVER_ZONE_WIDTH }}
          onMouseEnter={() => handleEdgeEnter("left")}
          onMouseLeave={handleEdgeLeave}
        />
      )}

      {hasNext && !isMobile && (
        <div
          className="slides-edge-zone slides-edge-zone-right"
          style={{ width: EDGE_HOVER_ZONE_WIDTH }}
          onMouseEnter={() => handleEdgeEnter("right")}
          onMouseLeave={handleEdgeLeave}
        />
      )}

      <div
        className="slides-navigation-bar"
        data-visible={isVisible}
        onMouseEnter={handleNavigationEnter}
        onMouseLeave={handleNavigationLeave}
      >
        {visibleFaces.map((face, index) => {
          const isActive = index === currentSlideIndex;

          return (
            <button
              key={face.id}
              type="button"
              className="slides-navigation-preview"
              data-active={isActive}
              onClick={(e) => {
                e.stopPropagation();
                onSlideChange(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="slides-navigation-preview-placeholder">
                {index + 1}
              </div>
            </button>
          );
        })}
      </div>

      {!isMobile && isVisible && hoveredEdge === "left" && hasPrev && (
        <button
          type="button"
          className="slides-arrow-indicator slides-arrow-indicator-left"
          onClick={() => onSlideChange(currentSlideIndex - 1)}
          onMouseEnter={() => handleEdgeEnter("left")}
          onMouseLeave={handleEdgeLeave}
        >
          <ChevronIcon direction="left" />
        </button>
      )}

      {!isMobile && isVisible && hoveredEdge === "right" && hasNext && (
        <button
          type="button"
          className="slides-arrow-indicator slides-arrow-indicator-right"
          onClick={() => onSlideChange(currentSlideIndex + 1)}
          onMouseEnter={() => handleEdgeEnter("right")}
          onMouseLeave={handleEdgeLeave}
        >
          <ChevronIcon direction="right" />
        </button>
      )}
    </div>
  );
}
