import { useEffect, type RefObject } from "react";

export function useReclaimWheelScroll(
  ref: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;

      const target = event.target as Element | null;
      if (target?.closest('[data-allow-wheel-zoom="true"]')) return;
      if (target?.closest('[data-contain-scroll="true"]')) return;

      event.stopPropagation();
    };

    el.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: true,
    });

    return () => {
      el.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, [ref]);
}

const LINE_DELTA_PX = 16;

function getWheelDeltaInPixels({
  event,
  pageSize,
}: {
  event: WheelEvent;
  pageSize: number;
}): number {
  const delta =
    Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;

  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return delta * LINE_DELTA_PX;
  }
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return delta * pageSize;
  }
  return delta;
}

function canScrollHorizontally({
  element,
  delta,
}: {
  element: HTMLElement;
  delta: number;
}): boolean {
  if (delta === 0) return false;

  const maxScrollLeft = element.scrollWidth - element.clientWidth;
  if (maxScrollLeft <= 0) return false;

  if (delta > 0) return element.scrollLeft < maxScrollLeft;
  return element.scrollLeft > 0;
}

export function useHorizontalWheelScroll({
  ref,
  enabled = true,
}: {
  ref: RefObject<HTMLElement | null>;
  enabled?: boolean;
}): void {
  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;

      const target = event.target as Element | null;
      if (target?.closest('[data-allow-wheel-zoom="true"]')) return;
      if (target?.closest('[data-contain-scroll="true"]')) return;

      const delta = getWheelDeltaInPixels({
        event,
        pageSize: element.clientWidth,
      });
      if (!canScrollHorizontally({ element, delta })) return;

      event.preventDefault();
      element.scrollLeft += delta;
    };

    element.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: false,
    });

    return () => {
      element.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, [ref, enabled]);
}
