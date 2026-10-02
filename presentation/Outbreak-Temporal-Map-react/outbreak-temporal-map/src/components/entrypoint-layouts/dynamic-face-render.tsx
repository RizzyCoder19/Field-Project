import { FaceShell } from "@/components/face-shell";
import {
  Component,
  memo,
  Suspense,
  type ComponentType,
  type ReactNode,
} from "react";

export interface FaceEntry {
  id: string;
  hidden?: boolean;
  backgroundColor?: string;
  name?: string;
  notes?: string;
}

interface EntrypointErrorBoundaryProps {
  children: ReactNode;
}

interface EntrypointErrorBoundaryState {
  hasError: boolean;
}

export class EntrypointErrorBoundary extends Component<
  EntrypointErrorBoundaryProps,
  EntrypointErrorBoundaryState
> {
  constructor(props: EntrypointErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): Partial<EntrypointErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ minHeight: "400px", background: "transparent" }} />;
    }

    return this.props.children;
  }
}

export function LegacyFaceRender({
  faceId,
  componentMap,
  simulateFixedDimensions,
  backgroundColor,
  applyBorderRadiusToTop,
  useFullScreen,
}: {
  faceId: string;
  componentMap: Record<string, ComponentType>;
  simulateFixedDimensions: boolean;
  backgroundColor?: string;
  applyBorderRadiusToTop?: boolean;
  useFullScreen?: boolean;
}) {
  const FaceComponent = componentMap[faceId];

  if (!FaceComponent) {
    return null;
  }

  return (
    <EntrypointErrorBoundary>
      <FaceShell
        faceId={faceId}
        isNewSlidesLayout={false}
        simulateFixedDimensions={simulateFixedDimensions}
        backgroundColor={backgroundColor}
        applyBorderRadiusToTop={applyBorderRadiusToTop}
        useFullScreen={useFullScreen}
      >
        <FaceComponent />
        <span data-face-rendered hidden />
      </FaceShell>
    </EntrypointErrorBoundary>
  );
}

export const DynamicFaceRender = memo(function DynamicFaceRender({
  faceId,
  slideWidth,
  slideHeight,
  componentMap,
  isVisible = true,
}: {
  faceId: string;
  slideWidth: number;
  slideHeight: number;
  componentMap: Record<string, ComponentType>;
  isVisible?: boolean;
}) {
  const FaceComponent = componentMap[faceId];

  if (!FaceComponent) {
    return null;
  }

  return (
    <EntrypointErrorBoundary>
      <FaceShell
        faceId={faceId}
        isNewSlidesLayout={true}
        isVisible={isVisible}
        simulateFixedDimensions={{ width: slideWidth, height: slideHeight }}
      >
        <Suspense fallback={null}>
          <FaceComponent />
          <span data-face-rendered hidden />
        </Suspense>
      </FaceShell>
    </EntrypointErrorBoundary>
  );
});
