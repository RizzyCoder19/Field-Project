import { useRegisterFaceList } from "@/utils/face-navigation";
import type { ComponentType } from "react";
import {
  LegacyFaceRender,
  type FaceEntry,
} from "@/components/entrypoint-layouts/dynamic-face-render";

interface RegularLayoutProps {
  faces: FaceEntry[];
  componentMap: Record<string, ComponentType>;
  width: string;
  simulateFixedDimensions: boolean;
}

export function RegularLayout({
  faces,
  componentMap,
  width,
  simulateFixedDimensions,
}: RegularLayoutProps) {
  useRegisterFaceList({ faces });
  const visibleFaces = faces.filter((face) => !face.hidden);

  return (
    <div className="scroll-container" data-layout="REGULAR" data-width={width}>
      <div className="page-container" data-layout="REGULAR" data-width={width}>
        <div className="faces-container">
          {visibleFaces.map((face) => (
            <div key={face.id} data-face-id={face.id}>
              <LegacyFaceRender
                faceId={face.id}
                componentMap={componentMap}
                simulateFixedDimensions={simulateFixedDimensions}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
