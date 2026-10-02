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
import { StackedSlidesLayout } from "@/components/entrypoint-layouts/stacked-slides-layout";
import { SlidesNavigation } from "@/components/slides-navigation";
import { cardsBackgroundStyle } from "@/components/ui/cards-background-layer";
import { useCursorAutoHide } from "@/hooks/use-cursor-auto-hide";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import {
  CARDS_SLIDES_PER_VIEW_DEFAULT,
  MIN_CARDS_PEEK_SLIDES_PER_VIEW,
  useWindowScale,
} from "@/hooks/use-slides-scale";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import { useReclaimWheelScroll } from "@/hooks/use-wheel-scroll";
import { getFaceIdFromHash, setFaceIdInHash } from "@/utils/face-hash";
import {
  useRegisterFaceList,
  useRegisterFaceNavigation,
} from "@/utils/face-navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
} from "react";

const MOBILE_BREAKPOINT = 600;
const SLIDESHOW_MOUNT_PROXIMITY = 3;

interface NewSlidesLayoutProps {
  faces: FaceEntry[];
  componentMap: Record<string, ComponentType>;
  layout?: string;
  slidesDisplay?: string;
  stackedOrientation?: string;
  cardsSlidesPerView?: number;
  cardsBackgroundColor?: string;
  cardsBackgroundImage?: string;
  cardsCorners?: string;
  mobileCanvas?: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function useMatchMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (listener: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function getInitialSlideIndexFromHash(faces: FaceEntry[]): number {
  const faceId = getFaceIdFromHash(faces.map((face) => face.id));
  if (!faceId) return 0;
  const index = faces.findIndex((face) => face.id === faceId);
  return index === -1 ? 0 : index;
}

function useSlidesNavigation({ faces }: { faces: FaceEntry[] }) {
  const visibleFaces = useMemo(
    () => faces.filter((face) => !face.hidden),
    [faces],
  );
  const maxIndex = Math.max(0, visibleFaces.length - 1);

  const [slideIndex, setSlideIndex] = useState(() =>
    getInitialSlideIndexFromHash(visibleFaces),
  );

  useEffect(() => {
    const syncFromHash = () => {
      const faceId = getFaceIdFromHash(visibleFaces.map((face) => face.id));
      if (!faceId) return;
      const index = visibleFaces.findIndex((face) => face.id === faceId);
      if (index === -1) return;
      setSlideIndex(clamp(index, 0, maxIndex));
    };
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [visibleFaces, maxIndex]);

  const currentSlideIndex = clamp(slideIndex, 0, maxIndex);
  const navigationIndexRef = useRef(currentSlideIndex);
  navigationIndexRef.current = currentSlideIndex;

  const goToSlide = useCallback(
    (index: number) => {
      const clampedIndex = clamp(index, 0, maxIndex);
      navigationIndexRef.current = clampedIndex;
      setSlideIndex(clampedIndex);

      const targetFaceId = visibleFaces[clampedIndex]?.id;
      if (targetFaceId) {
        setFaceIdInHash(targetFaceId, { silent: true });
      }
    },
    [maxIndex, visibleFaces],
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

function SlideshowLayout({
  faces,
  componentMap,
  slidesDisplay,
  cardsBackgroundColor,
  cardsBackgroundImage,
  cornersMode,
}: {
  faces: FaceEntry[];
  componentMap: Record<string, ComponentType>;
  slidesDisplay: SlidesDisplay;
  cardsBackgroundColor: string;
  cardsBackgroundImage: string;
  cornersMode: CornersMode;
}) {
  const isFullscreen = slidesDisplay === "FULLSCREEN";
  const displayMode = isFullscreen ? "fullscreen" : "cards";

  const { currentSlideIndex, goToSlide, visibleFaces, touchHandlers } =
    useSlidesNavigation({ faces });

  const scale = useWindowScale({
    slideWidth: SLIDE_WIDTH,
    slideHeight: SLIDE_HEIGHT,
    isFullscreen,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleNavigateToFace = useCallback(
    ({ faceId }: { faceId: string }) => {
      const index = visibleFaces.findIndex((face) => face.id === faceId);
      if (index === -1) return;
      goToSlide(index);
    },
    [visibleFaces, goToSlide],
  );
  useRegisterFaceNavigation(handleNavigateToFace);

  useCursorAutoHide(containerRef);
  useReclaimWheelScroll(containerRef);

  const displayScale = scale ?? 0.5;
  useLayoutEffect(() => {
    window.__facePerformanceMode = "presentation";
    window.__faceDisplayScale = displayScale;
  }, [displayScale]);
  const scaledWidth = SLIDE_WIDTH * displayScale;
  const scaledHeight = SLIDE_HEIGHT * displayScale;

  return (
    <div
      ref={containerRef}
      className="slides-preview-container"
      data-slides-display={displayMode}
      data-cards-corners={cornersMode}
      style={cardsBackgroundStyle({
        color: cardsBackgroundColor,
        image: cardsBackgroundImage,
      })}
      {...touchHandlers}
    >
      <div
        className="slides-preview-content"
        data-slides-display={displayMode}
        data-cards-corners={cornersMode}
        style={{
          width: scaledWidth,
          height: scaledHeight,
          opacity: scale === null ? 0 : 1,
          transition: "opacity 0.1s ease-in-out",
        }}
      >
        {visibleFaces.map((face, index) => {
          const isCurrentSlide = index === currentSlideIndex;
          const shouldMount =
            Math.abs(index - currentSlideIndex) <= SLIDESHOW_MOUNT_PROXIMITY;

          return (
            <div
              key={face.id}
              className="slide-face-wrapper"
              data-face-id={face.id}
              data-active={isCurrentSlide ? "true" : undefined}
              data-allow-scroll="true"
            >
              <div style={{ width: "100%", height: "100%" }}>
                {shouldMount && (
                  <div
                    className="slides-preview-scaler relative"
                    style={{
                      width: SLIDE_WIDTH,
                      height: SLIDE_HEIGHT,
                      transform: `scale(${displayScale})`,
                      transformOrigin: "top left",
                    }}
                  >
                    <DynamicFaceRender
                      faceId={face.id}
                      slideWidth={SLIDE_WIDTH}
                      slideHeight={SLIDE_HEIGHT}
                      componentMap={componentMap}
                      isVisible={isCurrentSlide}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <SlidesNavigation
        faces={visibleFaces}
        currentSlideIndex={currentSlideIndex}
        onNavigate={goToSlide}
      />
    </div>
  );
}

export function NewSlidesLayout({
  faces,
  componentMap,
  layout = "SLIDESHOW",
  slidesDisplay,
  stackedOrientation = "VERTICAL",
  cardsSlidesPerView = CARDS_SLIDES_PER_VIEW_DEFAULT,
  cardsBackgroundColor = "#000000",
  cardsBackgroundImage = "",
  cardsCorners,
  mobileCanvas: mobileCanvasProp,
}: NewSlidesLayoutProps) {
  const matchesMobileBreakpoint = useMatchMediaQuery(
    `(max-width: ${MOBILE_BREAKPOINT}px)`,
  );
  const requestedViewport =
    typeof window === "undefined"
      ? null
      : new URLSearchParams(window.location.search).get("viewport");
  const isMobile =
    requestedViewport === "desktop" ? false : matchesMobileBreakpoint;
  const mobileCanvas: MobileCanvas =
    mobileCanvasProp === "COMPACT" ? "COMPACT" : "LEGACY";

  useRegisterFaceList({ faces });

  const resolvedSlidesDisplay: SlidesDisplay =
    slidesDisplay === "FULLSCREEN" || slidesDisplay === "CARDS"
      ? slidesDisplay
      : layout === "STACKED"
        ? "FULLSCREEN"
        : "CARDS";
  const cornersMode: CornersMode =
    cardsCorners === "SQUARE" ? "square" : "round";

  if (layout === "STACKED") {
    const orientation: StackedOrientation =
      stackedOrientation === "HORIZONTAL" ? "HORIZONTAL" : "VERTICAL";
    return (
      <StackedSlidesLayout
        faces={faces}
        componentMap={componentMap}
        slidesDisplay={resolvedSlidesDisplay}
        orientation={orientation}
        cardsSlidesPerView={cardsSlidesPerView}
        cardsBackgroundColor={cardsBackgroundColor}
        cardsBackgroundImage={cardsBackgroundImage}
        cornersMode={cornersMode}
        isMobile={isMobile}
        mobileCanvas={mobileCanvas}
      />
    );
  }

  if (isMobile) {
    return (
      <StackedSlidesLayout
        faces={faces}
        componentMap={componentMap}
        slidesDisplay="CARDS"
        orientation="VERTICAL"
        cardsSlidesPerView={MIN_CARDS_PEEK_SLIDES_PER_VIEW}
        cardsBackgroundColor={cardsBackgroundColor}
        cardsBackgroundImage={cardsBackgroundImage}
        cornersMode={cornersMode}
        isMobile
        mobileCanvas={mobileCanvas}
      />
    );
  }

  return (
    <SlideshowLayout
      faces={faces}
      componentMap={componentMap}
      slidesDisplay={resolvedSlidesDisplay}
      cardsBackgroundColor={cardsBackgroundColor}
      cardsBackgroundImage={cardsBackgroundImage}
      cornersMode={cornersMode}
    />
  );
}
