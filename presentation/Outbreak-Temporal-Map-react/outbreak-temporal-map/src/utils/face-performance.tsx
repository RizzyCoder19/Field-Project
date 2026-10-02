import React, {
  useCallback,
  useLayoutEffect,
  useSyncExternalStore,
} from "react";

declare global {
  interface Window {
    __faceDisplayScale?: number;
    __facePerformanceMode?: "editor" | "presentation";
  }
}

interface PaperShaderProps {
  speed?: number;
  maxPixelCount?: number;
  [key: string]: unknown;
}

const FACE_BASE_PIXEL_COUNT = 1920 * 1080;
const webglRegistrations = new Map<string, number>();

function findFaceRoot({ faceId }: { faceId: string }): Element | null {
  return document.querySelector(`[data-face-root-id="${CSS.escape(faceId)}"]`);
}

function readFaceVisibility({ faceId }: { faceId: string }): boolean {
  return (
    findFaceRoot({ faceId })?.getAttribute("data-face-visible") !== "false"
  );
}

export function useFaceVisibility({ faceId }: { faceId: string }): boolean {
  const subscribe = useCallback(
    (listener: () => void) => {
      const root = findFaceRoot({ faceId });
      if (!root) return () => undefined;

      const observer = new MutationObserver(listener);
      observer.observe(root, {
        attributes: true,
        attributeFilter: ["data-face-visible"],
      });
      return () => observer.disconnect();
    },
    [faceId],
  );
  const getSnapshot = useCallback(
    () => readFaceVisibility({ faceId }),
    [faceId],
  );
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}

export function useRegisterFaceWebgl({ faceId }: { faceId: string }): void {
  useLayoutEffect(() => {
    const root = findFaceRoot({ faceId });
    if (!root) return;

    webglRegistrations.set(faceId, (webglRegistrations.get(faceId) ?? 0) + 1);
    root.setAttribute("data-face-webgl", "true");

    return () => {
      const registrations = (webglRegistrations.get(faceId) ?? 1) - 1;
      if (registrations > 0) {
        webglRegistrations.set(faceId, registrations);
        return;
      }

      webglRegistrations.delete(faceId);
      root.removeAttribute("data-face-webgl");
    };
  }, [faceId]);
}

function clampPixelCount({
  requested,
  maximum,
}: {
  requested: number | undefined;
  maximum: number;
}): number {
  return requested === undefined ? maximum : Math.min(requested, maximum);
}

export function getFaceDisplayPixelRatio({
  maximum,
}: {
  maximum: number;
}): number {
  const displayScale = window.__faceDisplayScale ?? 1;
  return Math.max(
    0.1,
    Math.min(maximum, displayScale * window.devicePixelRatio),
  );
}

export function getFaceMaxPixelCount({
  requested,
  isVisible = true,
}: {
  requested?: number;
  isVisible?: boolean;
}): number | undefined {
  const isEditor = window.__facePerformanceMode === "editor";
  if (!isEditor && isVisible) return requested;

  const displayPixelRatio = getFaceDisplayPixelRatio({
    maximum: 2,
  });
  const maximum = Math.round(FACE_BASE_PIXEL_COUNT * displayPixelRatio ** 2);
  return clampPixelCount({ requested, maximum });
}

export function createFaceAwarePaperShader({
  Component,
  faceId,
}: {
  Component: React.ComponentType<PaperShaderProps>;
  faceId: string;
}) {
  return React.forwardRef<unknown, PaperShaderProps>(
    function FaceAwarePaperShader(props, ref) {
      useRegisterFaceWebgl({ faceId });
      const isVisible = useFaceVisibility({ faceId });
      const requestedSpeed =
        typeof props.speed === "number" ? props.speed : undefined;
      const requestedPixelCount =
        typeof props.maxPixelCount === "number"
          ? props.maxPixelCount
          : undefined;

      return (
        <Component
          {...props}
          ref={ref}
          speed={isVisible ? requestedSpeed : 0}
          maxPixelCount={getFaceMaxPixelCount({
            requested: requestedPixelCount,
            isVisible,
          })}
        />
      );
    },
  );
}
