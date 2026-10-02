import {
  SlidesNavigation,
  useSlidesNavigation,
} from "@/components/legacy-slides-navigation";
import {
  useRegisterFaceList,
  useRegisterFaceNavigation,
} from "@/utils/face-navigation";
import { useCallback, type ComponentType } from "react";
import {
  LegacyFaceRender,
  type FaceEntry,
} from "@/components/entrypoint-layouts/dynamic-face-render";

interface SlidesLayoutProps {
  faces: FaceEntry[];
  componentMap: Record<string, ComponentType>;
  layout: string;
  width: string;
  simulateFixedDimensions: boolean;
}

export function SlidesLayout({
  faces,
  componentMap,
  layout,
  width,
  simulateFixedDimensions,
}: SlidesLayoutProps) {
  useRegisterFaceList({ faces });
  const { currentSlideIndex, goToSlide, visibleFaces, touchHandlers } =
    useSlidesNavigation({
      faces,
      syncToUrl: true,
    });

  const handleNavigateToFace = useCallback(
    ({ faceId }: { faceId: string }) => {
      const index = visibleFaces.findIndex((face) => face.id === faceId);
      if (index !== -1) {
        goToSlide(index);
      }
    },
    [visibleFaces, goToSlide],
  );
  useRegisterFaceNavigation(handleNavigateToFace);

  return (
    <>
      <div
        className="scroll-container"
        data-layout={layout}
        data-width={width}
        {...touchHandlers}
      >
        <div className="page-container" data-layout={layout} data-width={width}>
          <div className="faces-container">
            {visibleFaces.map((face, index) => (
              <div
                key={face.id}
                data-face-id={face.id}
                style={{
                  display: index === currentSlideIndex ? undefined : "none",
                }}
              >
                <LegacyFaceRender
                  faceId={face.id}
                  backgroundColor={face.backgroundColor || undefined}
                  componentMap={componentMap}
                  simulateFixedDimensions={simulateFixedDimensions}
                  useFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <SlidesNavigation
        faces={faces}
        currentSlideIndex={currentSlideIndex}
        onSlideChange={goToSlide}
        autoOpen
      />
    </>
  );
}
