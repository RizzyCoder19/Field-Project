import { useRegisterFaceList } from "@/utils/face-navigation";
import type { ComponentType } from "react";
import {
  LegacyFaceRender,
  type FaceEntry,
} from "@/components/entrypoint-layouts/dynamic-face-render";

interface CardLayoutProps {
  faces: FaceEntry[];
  componentMap: Record<string, ComponentType>;
  width: string;
  simulateFixedDimensions: boolean;
}

export function CardLayout({
  faces,
  componentMap,
  width,
  simulateFixedDimensions,
}: CardLayoutProps) {
  useRegisterFaceList({ faces });
  const visibleFaces = faces.filter((face) => !face.hidden);

  return (
    <div className="scroll-container" data-layout="CARD" data-width={width}>
      <div className="page-container" data-layout="CARD" data-width={width}>
        <div className="faces-container">
          {visibleFaces.map((face, index) => {
            const isFirst = index === 0;

            return (
              <div key={face.id} data-face-id={face.id}>
                <LegacyFaceRender
                  faceId={face.id}
                  componentMap={componentMap}
                  simulateFixedDimensions={simulateFixedDimensions}
                  applyBorderRadiusToTop={isFirst}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
