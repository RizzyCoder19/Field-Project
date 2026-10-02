import { registerFace } from "@/utils/face-runtime";
import { useLayoutEffect, useRef, type ReactNode } from "react";

interface SimulateFixedDimensions {
  width: number;
  height: number;
}

export interface FaceShellProps {
  faceId: string;
  children: ReactNode;
  hidden?: boolean;
  backgroundColor?: string;
  simulateFixedDimensions?: boolean | SimulateFixedDimensions;
  applyBorderRadiusToTop?: boolean;
  useFullScreen?: boolean;
  isNewSlidesLayout: boolean;
  isVisible?: boolean;
}

function resolveArtboardSize(
  simulateFixedDimensions?: boolean | SimulateFixedDimensions,
): SimulateFixedDimensions {
  if (
    typeof simulateFixedDimensions === "object" &&
    simulateFixedDimensions.width &&
    simulateFixedDimensions.height
  ) {
    return {
      width: simulateFixedDimensions.width,
      height: simulateFixedDimensions.height,
    };
  }
  return { width: 1920, height: 1080 };
}

function FaceArtboard({
  faceId,
  children,
  width,
  height,
  hidden = false,
  isVisible = true,
}: {
  faceId: string;
  children: ReactNode;
  width: number;
  height: number;
  hidden?: boolean;
  isVisible?: boolean;
}) {
  const innerFaceRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!innerFaceRef.current) return;

    return registerFace({
      el: innerFaceRef.current,
      simulateFixedDimensions: { width, height },
    });
  }, [faceId, width, height]);

  return (
    <div
      className="face-shell-container"
      style={{ position: "relative", width: "100%" }}
    >
      <div
        data-face-root-id={faceId}
        data-face-root
        data-face-visible={isVisible ? "true" : "false"}
        style={{
          display: hidden ? "none" : "flex",
          transform: "translateZ(0)",
          color: "var(--foreground)",
          containerType: "inline-size",
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <div
          style={{ marginBlock: "auto", width: "100%", height: "100%" }}
          ref={innerFaceRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function LegacyFaceShell({
  faceId,
  children,
  hidden,
  backgroundColor,
  simulateFixedDimensions,
  applyBorderRadiusToTop = false,
  useFullScreen = false,
  isVisible = true,
}: {
  faceId: string;
  children: ReactNode;
  hidden?: boolean;
  backgroundColor?: string;
  simulateFixedDimensions?: boolean | SimulateFixedDimensions;
  applyBorderRadiusToTop?: boolean;
  useFullScreen?: boolean;
  isVisible?: boolean;
}) {
  const innerFaceRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!innerFaceRef.current) return;

    return registerFace({
      el: innerFaceRef.current,
      simulateFixedDimensions,
    });
  }, [faceId, simulateFixedDimensions]);

  const dimensionStyles = useFullScreen
    ? { width: "100vw", height: "100dvh", overflowY: "auto" as const }
    : {};

  return (
    <div
      className="face-shell-container"
      style={{
        position: "relative",
        width: "100%",
        ...(applyBorderRadiusToTop
          ? {
              clipPath: "inset(0 0 0 0 round var(--radius) var(--radius) 0 0)",
              borderTopLeftRadius: "var(--radius)",
              borderTopRightRadius: "var(--radius)",
            }
          : { clipPath: "inset(0 round 0)" }),
      }}
    >
      <div
        data-face-root-id={faceId}
        data-face-root
        data-face-visible={isVisible ? "true" : "false"}
        style={{
          display: hidden ? "none" : "flex",
          transform: "translateZ(0)",
          backgroundColor,
          color: "var(--foreground)",
          containerType: "inline-size",
          ...dimensionStyles,
        }}
      >
        <div style={{ marginBlock: "auto", width: "100%" }} ref={innerFaceRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function FaceShell({
  faceId,
  children,
  hidden,
  backgroundColor,
  simulateFixedDimensions,
  applyBorderRadiusToTop,
  useFullScreen,
  isNewSlidesLayout,
  isVisible,
}: FaceShellProps) {
  if (!isNewSlidesLayout) {
    return (
      <LegacyFaceShell
        faceId={faceId}
        hidden={hidden}
        backgroundColor={backgroundColor}
        simulateFixedDimensions={simulateFixedDimensions}
        applyBorderRadiusToTop={applyBorderRadiusToTop}
        useFullScreen={useFullScreen}
        isVisible={isVisible}
      >
        {children}
      </LegacyFaceShell>
    );
  }

  const { width, height } = resolveArtboardSize(simulateFixedDimensions);

  return (
    <FaceArtboard
      faceId={faceId}
      width={width}
      height={height}
      hidden={hidden}
      isVisible={isVisible}
    >
      {children}
    </FaceArtboard>
  );
}
