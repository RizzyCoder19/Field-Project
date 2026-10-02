import {
  DynamicFaceRender,
  type FaceEntry,
} from "@/components/entrypoint-layouts/dynamic-face-render";
import {
  SLIDE_HEIGHT,
  SLIDE_WIDTH,
  type CornersMode,
  type MobileCanvas,
  type SlidesDisplay,
  type StackedOrientation,
} from "@/components/entrypoint-layouts/slides-layout-shared";
import { CardsBackgroundLayer } from "@/components/ui/cards-background-layer";
import { readKeyboardIntent } from "@/hooks/use-keyboard-navigation";
import {
  MIN_CARDS_PEEK_SLIDES_PER_VIEW,
  useContainerDimensionScale,
} from "@/hooks/use-slides-scale";
import {
  useHorizontalWheelScroll,
  useReclaimWheelScroll,
} from "@/hooks/use-wheel-scroll";
import {
  faceIdToHash,
  getFaceIdFromHash,
  setFaceIdInHash,
} from "@/utils/face-hash";
import { useRegisterFaceNavigation } from "@/utils/face-navigation";
import {
  clearProgrammaticStackedScroll,
  getCurrentStackedFaceId,
  isProgrammaticStackedScroll,
  scrollStackedFaceIntoView,
  setCurrentStackedFaceId,
  subscribeToStackedFace,
} from "@/utils/stacked-face-tracker";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";

const LEGACY_MOBILE_SLIDE_WIDTH = 720;
const LEGACY_MOBILE_SLIDE_HEIGHT = 1280;
const COMPACT_MOBILE_SLIDE_WIDTH = 384;
const COMPACT_MOBILE_SLIDE_HEIGHT = 683;

const CURRENT_FACE_MIN_VISIBLE_PX = 50;
const STACKED_MOUNT_ROOT_MARGIN = "150%";
const LAYOUT_SETTLE_TIMEOUT_MS = 1000;

function getMobileSlideDimensions(value: MobileCanvas): {
  width: number;
  height: number;
} {
  return value === "COMPACT"
    ? { width: COMPACT_MOBILE_SLIDE_WIDTH, height: COMPACT_MOBILE_SLIDE_HEIGHT }
    : { width: LEGACY_MOBILE_SLIDE_WIDTH, height: LEGACY_MOBILE_SLIDE_HEIGHT };
}

function useStackedHashScroll({
  faceIds,
  orientation,
}: {
  faceIds: string[];
  orientation: StackedOrientation;
}): void {
  useEffect(() => {
    if (faceIds.length === 0) return;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const elements = faceIds
      .map((id) =>
        document.querySelector<HTMLElement>(
          `[data-face-id="${CSS.escape(id)}"]`,
        ),
      )
      .filter((el): el is HTMLElement => el !== null);

    let rafId: number | null = null;
    let layoutSettleObserver: ResizeObserver | null = null;
    let layoutSettleTimeoutId: number | null = null;

    const initialFaceId = getFaceIdFromHash(faceIds);
    if (initialFaceId) {
      setCurrentStackedFaceId(initialFaceId);

      const performInitialScroll = () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          rafId = null;
          scrollStackedFaceIntoView(initialFaceId, "instant", orientation);
        });
      };

      performInitialScroll();

      layoutSettleObserver = new ResizeObserver(performInitialScroll);
      for (const el of elements) layoutSettleObserver.observe(el);
      layoutSettleObserver.observe(document.documentElement);

      layoutSettleTimeoutId = window.setTimeout(() => {
        layoutSettleObserver?.disconnect();
        layoutSettleObserver = null;
        layoutSettleTimeoutId = null;
      }, LAYOUT_SETTLE_TIMEOUT_MS);
    }

    const updateCurrentFromScroll = () => {
      if (isProgrammaticStackedScroll()) return;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        const visiblePastEdge =
          orientation === "HORIZONTAL" ? rect.right : rect.bottom;
        if (visiblePastEdge > CURRENT_FACE_MIN_VISIBLE_PX) {
          setCurrentStackedFaceId(el.getAttribute("data-face-id"));
          return;
        }
      }
    };

    const intersectionObserver =
      elements.length > 0
        ? new IntersectionObserver(updateCurrentFromScroll, { threshold: 0 })
        : null;
    if (intersectionObserver) {
      for (const el of elements) intersectionObserver.observe(el);
    }

    const unsubscribeFromTracker = subscribeToStackedFace(() => {
      const faceId = getCurrentStackedFaceId();
      if (faceId) setFaceIdInHash(faceId, { silent: true });
    });

    const syncFromHash = () => {
      const faceId = getFaceIdFromHash(faceIds);
      if (!faceId || faceId === getCurrentStackedFaceId()) return;
      setCurrentStackedFaceId(faceId);
      scrollStackedFaceIntoView(faceId, "smooth", orientation);
    };

    window.addEventListener("scrollend", clearProgrammaticStackedScroll);
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      intersectionObserver?.disconnect();
      layoutSettleObserver?.disconnect();
      unsubscribeFromTracker();
      window.removeEventListener("scrollend", clearProgrammaticStackedScroll);
      window.removeEventListener("hashchange", syncFromHash);
      if (layoutSettleTimeoutId !== null) {
        window.clearTimeout(layoutSettleTimeoutId);
      }
      window.history.scrollRestoration = previousScrollRestoration;
      setCurrentStackedFaceId(null);
      clearProgrammaticStackedScroll();
    };
  }, [faceIds, orientation]);
}

function getCurrentStackedFaceIndex({
  faceIds,
  orientation,
}: {
  faceIds: string[];
  orientation: StackedOrientation;
}): number {
  const trackedFaceId = getCurrentStackedFaceId();
  if (trackedFaceId) {
    const trackedIndex = faceIds.indexOf(trackedFaceId);
    if (trackedIndex !== -1) return trackedIndex;
  }
  for (let i = 0; i < faceIds.length; i++) {
    const faceId = faceIds[i];
    if (!faceId) continue;
    const element = document.querySelector<HTMLElement>(
      `[data-face-id="${CSS.escape(faceId)}"]`,
    );
    if (!element) continue;
    const rect = element.getBoundingClientRect();
    if (orientation === "HORIZONTAL") {
      if (rect.right > CURRENT_FACE_MIN_VISIBLE_PX) return i;
    } else if (rect.bottom > CURRENT_FACE_MIN_VISIBLE_PX) {
      return i;
    }
  }
  return 0;
}

function useStackedKeyboardNavigation({
  faceIds,
  orientation,
}: {
  faceIds: string[];
  orientation: StackedOrientation;
}): void {
  useEffect(() => {
    if (faceIds.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const intent = readKeyboardIntent(e);
      if (!intent) return;

      const current = getCurrentStackedFaceIndex({ faceIds, orientation });
      const next = intent.isNext
        ? Math.min(faceIds.length - 1, current + 1)
        : Math.max(0, current - 1);
      if (next === current) return;

      e.preventDefault();

      setTimeout(() => {
        if (e.cancelBubble) return;
        const faceId = faceIds[next];
        if (!faceId) return;
        setCurrentStackedFaceId(faceId);
        scrollStackedFaceIntoView(faceId, "smooth", orientation);
      }, 0);
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [faceIds, orientation]);
}

function useStackedNavigation({
  faceIds,
  orientation,
}: {
  faceIds: string[];
  orientation: StackedOrientation;
}): void {
  useStackedHashScroll({ faceIds, orientation });
  useStackedKeyboardNavigation({ faceIds, orientation });

  const handleNavigateToFace = useCallback(
    ({
      faceId,
      behavior = "smooth",
    }: {
      faceId: string;
      behavior?: ScrollBehavior;
    }) => {
      setCurrentStackedFaceId(faceId);
      scrollStackedFaceIntoView(faceId, behavior, orientation);
    },
    [orientation],
  );
  useRegisterFaceNavigation(handleNavigateToFace);
}

function useIntersection({
  rootMargin,
  threshold,
}: {
  rootMargin?: string;
  threshold?: number;
}): { ref: (node: HTMLElement | null) => void; isIntersecting: boolean } {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setIsIntersecting(entries.some((entry) => entry.isIntersecting));
      },
      { rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, rootMargin, threshold]);

  return { ref: setNode, isIntersecting };
}

function StackedSlide({
  face,
  slideWidth,
  slideHeight,
  scaledWidth,
  scaledHeight,
  displayScale,
  componentMap,
}: {
  face: FaceEntry;
  slideWidth: number;
  slideHeight: number;
  scaledWidth: number;
  scaledHeight: number;
  displayScale: number;
  componentMap: Record<string, ComponentType>;
}) {
  const { ref: mountRef, isIntersecting: isNearViewport } = useIntersection({
    rootMargin: STACKED_MOUNT_ROOT_MARGIN,
  });
  const { ref: visibleRef, isIntersecting: isVisible } = useIntersection({
    threshold: 0.01,
  });

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      mountRef(node);
      visibleRef(node);
    },
    [mountRef, visibleRef],
  );

  const shouldMount = isNearViewport || isVisible;

  return (
    <div
      ref={setRefs}
      id={faceIdToHash(face.id)}
      data-face-id={face.id}
      className="stacked-slide-wrapper"
      style={{ width: scaledWidth, height: scaledHeight, zIndex: 1 }}
    >
      <div
        style={{
          width: slideWidth,
          height: slideHeight,
          transform: `scale(${displayScale})`,
          transformOrigin: "top left",
        }}
      >
        {shouldMount && (
          <DynamicFaceRender
            faceId={face.id}
            slideWidth={slideWidth}
            slideHeight={slideHeight}
            componentMap={componentMap}
            isVisible={isVisible}
          />
        )}
      </div>
    </div>
  );
}

export function StackedSlidesLayout({
  faces,
  componentMap,
  slidesDisplay,
  orientation,
  cardsSlidesPerView,
  cardsBackgroundColor,
  cardsBackgroundImage,
  cornersMode,
  isMobile,
  mobileCanvas,
}: {
  faces: FaceEntry[];
  componentMap: Record<string, ComponentType>;
  slidesDisplay: SlidesDisplay;
  orientation: StackedOrientation;
  cardsSlidesPerView: number;
  cardsBackgroundColor: string;
  cardsBackgroundImage: string;
  cornersMode: CornersMode;
  isMobile: boolean;
  mobileCanvas: MobileCanvas;
}) {
  const visibleFaces = useMemo(
    () => faces.filter((face) => !face.hidden),
    [faces],
  );
  const mobileSlide = getMobileSlideDimensions(mobileCanvas);
  const slideWidth = isMobile ? mobileSlide.width : SLIDE_WIDTH;
  const slideHeight = isMobile ? mobileSlide.height : SLIDE_HEIGHT;

  const containerRef = useRef<HTMLDivElement>(null);
  useReclaimWheelScroll(containerRef);
  useHorizontalWheelScroll({
    ref: containerRef,
    enabled: orientation === "HORIZONTAL",
  });

  const scale = useContainerDimensionScale({
    containerRef,
    orientation,
    slidesDisplay,
    cardsSlidesPerView: isMobile
      ? MIN_CARDS_PEEK_SLIDES_PER_VIEW
      : cardsSlidesPerView,
    slideWidth,
    slideHeight,
    stabilizeViewportHeight: isMobile && orientation === "VERTICAL",
  });
  const displayScale = scale ?? (isMobile ? 0.5 : 1);
  const scaledWidth = slideWidth * displayScale;
  const scaledHeight = slideHeight * displayScale;

  const faceIds = useMemo(
    () => visibleFaces.map((face) => face.id),
    [visibleFaces],
  );
  useStackedNavigation({ faceIds, orientation });

  const isHorizontal = orientation === "HORIZONTAL";
  const displayMode = slidesDisplay === "FULLSCREEN" ? "fullscreen" : "cards";
  const containerClass = isMobile
    ? "stacked-mobile-slides-container"
    : "stacked-slides-container";

  return (
    <div
      ref={containerRef}
      className={containerClass}
      data-slides-display={displayMode}
      data-cards-corners={cornersMode}
      data-orientation={isHorizontal ? "horizontal" : "vertical"}
      style={{ backgroundColor: "transparent" }}
    >
      <CardsBackgroundLayer
        color={cardsBackgroundColor}
        image={cardsBackgroundImage}
      />
      {visibleFaces.map((face) => (
        <StackedSlide
          key={face.id}
          face={face}
          slideWidth={slideWidth}
          slideHeight={slideHeight}
          scaledWidth={scaledWidth}
          scaledHeight={scaledHeight}
          displayScale={displayScale}
          componentMap={componentMap}
        />
      ))}
    </div>
  );
}
