import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { FaceEntry } from "@/components/entrypoint-layouts/dynamic-face-render";

const EDGE_HOVER_ZONE_WIDTH = 80;
const TOP_HOVER_ZONE_HEIGHT = 60;
const BOTTOM_HOVER_ZONE_HEIGHT = 30;
const AUTO_HIDE_DELAY = 1500;
const DOTS_COLLAPSE_DELAY = 2000;

const ARROW_SIZE = 32;
const ARROW_MARGIN = 16;

const HANDLE_WIDTH = 24;
const HANDLE_HEIGHT = 6;

const CELL_WIDTH = 32;
const CELL_HEIGHT = 20;
const MAX_VISIBLE_CELLS = 10;
const FADE_SCROLL_SPEED = 6;

export interface SlidesNavigationProps {
  faces: FaceEntry[];
  currentSlideIndex: number;
  onNavigate: (index: number) => void;
}

function ChevronIcon({ rotated = false }: { rotated?: boolean }): ReactNode {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={rotated ? { transform: "rotate(180deg)" } : undefined}
    >
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SegmentedControl({
  faces,
  currentSlideIndex,
  onNavigate,
  disabled = false,
}: {
  faces: FaceEntry[];
  currentSlideIndex: number;
  onNavigate: (index: number) => void;
  disabled?: boolean;
}) {
  const scrollDirRef = useRef(0);
  const scrollRafRef = useRef<number | null>(null);
  const maxScrollRef = useRef(0);

  const [scrollOffset, setScrollOffset] = useState(0);

  const total = faces.length;
  const visibleCount = Math.min(total, MAX_VISIBLE_CELLS);
  const viewportWidth = visibleCount * CELL_WIDTH;
  const trackWidth = total * CELL_WIDTH;
  const maxScroll = Math.max(0, trackWidth - viewportWidth);
  maxScrollRef.current = maxScroll;
  const clampedScroll = Math.min(scrollOffset, maxScroll);
  const hasLeftFade = clampedScroll > 0.5;
  const hasRightFade = clampedScroll < maxScroll - 0.5;

  const stopAutoScroll = useCallback(() => {
    scrollDirRef.current = 0;
    if (scrollRafRef.current !== null) {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback((direction: number) => {
    scrollDirRef.current = direction;
    if (scrollRafRef.current !== null) return;

    const step = () => {
      setScrollOffset((prev) => {
        const next = prev + scrollDirRef.current * FADE_SCROLL_SPEED;
        return Math.max(0, Math.min(maxScrollRef.current, next));
      });
      scrollRafRef.current = requestAnimationFrame(step);
    };

    scrollRafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => stopAutoScroll, [stopAutoScroll]);

  useEffect(() => {
    setScrollOffset((prev) =>
      Math.max(0, Math.min(maxScrollRef.current, prev)),
    );
  }, [total]);

  useEffect(() => {
    const cellLeft = currentSlideIndex * CELL_WIDTH;
    const cellRight = cellLeft + CELL_WIDTH;
    setScrollOffset((prev) => {
      let next = prev;
      if (cellLeft < prev) next = cellLeft;
      else if (cellRight > prev + viewportWidth)
        next = cellRight - viewportWidth;
      return Math.max(0, Math.min(maxScrollRef.current, next));
    });
  }, [currentSlideIndex, viewportWidth]);

  return (
    <div
      className="slides-seg-viewport"
      style={{ width: `${viewportWidth}px` }}
    >
      <div
        className="slides-seg-track"
        style={{ transform: `translateX(${-clampedScroll}px)` }}
      >
        <div
          className="slides-seg-thumb"
          style={{
            width: `${CELL_WIDTH}px`,
            height: `${CELL_HEIGHT}px`,
            transform: `translateX(${currentSlideIndex * CELL_WIDTH}px)`,
          }}
        />

        {faces.map((face, index) => {
          const isActive = index === currentSlideIndex;

          return (
            <button
              key={face.id}
              type="button"
              className="slides-seg-cell"
              data-active={isActive}
              style={{
                width: `${CELL_WIDTH}px`,
                height: `${CELL_HEIGHT}px`,
              }}
              tabIndex={disabled ? -1 : 0}
              onClick={(e) => {
                e.stopPropagation();
                if (index !== currentSlideIndex) onNavigate(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {hasLeftFade && (
        <div
          className="slides-seg-fade slides-seg-fade-left"
          onPointerEnter={() => startAutoScroll(-1)}
          onPointerLeave={stopAutoScroll}
        />
      )}

      {hasRightFade && (
        <div
          className="slides-seg-fade slides-seg-fade-right"
          onPointerEnter={() => startAutoScroll(1)}
          onPointerLeave={stopAutoScroll}
        />
      )}
    </div>
  );
}

type HoverZone = "top" | "bottom" | "dots";

export function SlidesNavigation({
  faces,
  currentSlideIndex,
  onNavigate,
}: SlidesNavigationProps) {
  const visibleFaces = faces.filter((face) => !face.hidden);
  const showNavigation = visibleFaces.length > 1;
  const hasPrev = currentSlideIndex > 0;
  const hasNext = currentSlideIndex < visibleFaces.length - 1;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeHoverZonesRef = useRef<Set<HoverZone>>(new Set());
  const isDotsHoveringRef = useRef(false);

  const updateVisibility = useCallback((expanded: boolean) => {
    setIsExpanded(expanded);

    if (expanded) {
      document.body.dataset.slidesNavigationVisible = "true";
    } else {
      delete document.body.dataset.slidesNavigationVisible;
    }
  }, []);

  const updateVisibilityFromZones = useCallback(() => {
    updateVisibility(activeHoverZonesRef.current.size > 0);
  }, [updateVisibility]);

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const startHideTimeout = useCallback(() => {
    clearHideTimeout();

    hideTimeoutRef.current = setTimeout(() => {
      if (activeHoverZonesRef.current.size > 0) {
        return;
      }
      updateVisibility(false);
    }, AUTO_HIDE_DELAY);
  }, [clearHideTimeout, updateVisibility]);

  const enterZone = useCallback(
    (zone: HoverZone) => {
      activeHoverZonesRef.current.add(zone);
      clearHideTimeout();
      updateVisibilityFromZones();
    },
    [clearHideTimeout, updateVisibilityFromZones],
  );

  const leaveZone = useCallback(
    (zone: HoverZone) => {
      activeHoverZonesRef.current.delete(zone);
      updateVisibilityFromZones();
    },
    [updateVisibilityFromZones],
  );

  const clearCollapseTimeout = useCallback(() => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
  }, []);

  const startCollapseTimeout = useCallback(() => {
    clearCollapseTimeout();
    collapseTimeoutRef.current = setTimeout(() => {
      setIsCollapsed(true);
    }, DOTS_COLLAPSE_DELAY);
  }, [clearCollapseTimeout]);

  const handleDotsEnter = useCallback(() => {
    isDotsHoveringRef.current = true;
    setIsCollapsed(false);
    clearCollapseTimeout();
    enterZone("dots");
  }, [clearCollapseTimeout, enterZone]);

  const handleDotsLeave = useCallback(() => {
    isDotsHoveringRef.current = false;
    startCollapseTimeout();
    leaveZone("dots");
  }, [leaveZone, startCollapseTimeout]);

  useEffect(() => {
    if (isExpanded) {
      setIsCollapsed(false);
      clearCollapseTimeout();
    } else if (!isDotsHoveringRef.current) {
      startCollapseTimeout();
    }
    return () => {
      clearCollapseTimeout();
    };
  }, [isExpanded, startCollapseTimeout, clearCollapseTimeout]);

  useEffect(() => {
    updateVisibility(true);
    startHideTimeout();

    return () => {
      delete document.body.dataset.slidesNavigationVisible;
    };
  }, [updateVisibility, startHideTimeout]);

  useEffect(() => {
    const zoneStates = { top: false, bottom: false, left: false, right: false };

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      const inTop = clientY < TOP_HOVER_ZONE_HEIGHT;
      if (inTop !== zoneStates.top) {
        zoneStates.top = inTop;
        if (inTop) enterZone("top");
        else leaveZone("top");
      }

      const inBottom = window.innerHeight - clientY < BOTTOM_HOVER_ZONE_HEIGHT;
      if (inBottom !== zoneStates.bottom) {
        zoneStates.bottom = inBottom;
        if (inBottom) enterZone("bottom");
        else leaveZone("bottom");
      }

      const inLeft = hasPrev && clientX < EDGE_HOVER_ZONE_WIDTH;
      if (inLeft !== zoneStates.left) {
        zoneStates.left = inLeft;
        setIsLeftHovered(inLeft);
      }

      const inRight =
        hasNext && window.innerWidth - clientX < EDGE_HOVER_ZONE_WIDTH;
      if (inRight !== zoneStates.right) {
        zoneStates.right = inRight;
        setIsRightHovered(inRight);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (zoneStates.top) leaveZone("top");
      if (zoneStates.bottom) leaveZone("bottom");
      setIsLeftHovered(false);
      setIsRightHovered(false);
    };
  }, [hasPrev, hasNext, enterZone, leaveZone]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest("[data-slides-navigation]")) {
        return;
      }

      activeHoverZonesRef.current.clear();
      clearHideTimeout();
      updateVisibility(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isExpanded, clearHideTimeout, updateVisibility]);

  if (!showNavigation) {
    return null;
  }

  return (
    <div data-slides-navigation>
      <div
        className="slides-dots-hover-zone"
        onPointerEnter={handleDotsEnter}
        onPointerLeave={handleDotsLeave}
      >
        <div className="slides-dots-stack" data-collapsed={isCollapsed}>
          <div
            className="slides-dots-indicator"
            style={{ opacity: isCollapsed ? 0 : 1 }}
            aria-hidden={isCollapsed}
          >
            <SegmentedControl
              faces={visibleFaces}
              currentSlideIndex={currentSlideIndex}
              onNavigate={onNavigate}
              disabled={isCollapsed}
            />
          </div>

          <div
            className="slides-bottom-indicator-handle"
            aria-hidden={!isCollapsed}
            style={{
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_HEIGHT}px`,
              opacity: isCollapsed ? 1 : 0,
            }}
          />
        </div>
      </div>

      {hasPrev && (
        <button
          type="button"
          className="slides-edge-arrow"
          data-visible={isLeftHovered}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentSlideIndex - 1);
          }}
          aria-label="Previous slide"
          style={{
            width: `${ARROW_SIZE}px`,
            height: `${ARROW_SIZE}px`,
            left: `${ARROW_MARGIN}px`,
          }}
        >
          <ChevronIcon />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          className="slides-edge-arrow"
          data-visible={isRightHovered}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentSlideIndex + 1);
          }}
          aria-label="Next slide"
          style={{
            width: `${ARROW_SIZE}px`,
            height: `${ARROW_SIZE}px`,
            right: `${ARROW_MARGIN}px`,
          }}
        >
          <ChevronIcon rotated />
        </button>
      )}
    </div>
  );
}
