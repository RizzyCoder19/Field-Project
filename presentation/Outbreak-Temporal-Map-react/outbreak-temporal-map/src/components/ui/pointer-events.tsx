interface PointerNativeEventLike {
  clientX: number;
  clientY: number;
  __originalClientX?: number;
  __originalClientY?: number;
}

interface PointerEventLike extends PointerNativeEventLike {
  nativeEvent?: PointerNativeEventLike;
}

interface PointerPoint {
  x: number;
  y: number;
}

function hasOriginalPointerCoordinates({
  event,
}: {
  event: PointerNativeEventLike;
}): boolean {
  return (
    typeof event.__originalClientX === "number" &&
    typeof event.__originalClientY === "number"
  );
}

function isHTMLElementElement(element: Element): element is HTMLElement {
  return typeof HTMLElement !== "undefined" && element instanceof HTMLElement;
}

function isRectLikelyInComponentSpace({
  element,
  rect,
}: {
  element: Element;
  rect: DOMRect;
}): boolean {
  if (!isHTMLElementElement(element)) {
    return true;
  }

  const widthRatio =
    element.offsetWidth > 0 ? rect.width / element.offsetWidth : null;
  const heightRatio =
    element.offsetHeight > 0 ? rect.height / element.offsetHeight : null;

  const isNearOne = (ratio: number | null): boolean =>
    ratio != null && Math.abs(ratio - 1) <= 0.1;

  if (widthRatio == null && heightRatio == null) {
    return true;
  }

  if (widthRatio != null && heightRatio != null) {
    return isNearOne(widthRatio) || isNearOne(heightRatio);
  }

  return isNearOne(widthRatio) || isNearOne(heightRatio);
}

function getNativePointerEvent({
  event,
}: {
  event: PointerEventLike;
}): PointerNativeEventLike {
  if (event.nativeEvent) {
    return event.nativeEvent;
  }

  return event;
}

export function getComponentPointerPoint({
  event,
}: {
  event: PointerEventLike;
}): PointerPoint {
  const nativeEvent = getNativePointerEvent({ event });

  return {
    x: nativeEvent.clientX,
    y: nativeEvent.clientY,
  };
}

export function getViewportPointerPoint({
  event,
}: {
  event: PointerEventLike;
}): PointerPoint {
  const nativeEvent = getNativePointerEvent({ event });

  return {
    x: nativeEvent.__originalClientX ?? nativeEvent.clientX,
    y: nativeEvent.__originalClientY ?? nativeEvent.clientY,
  };
}

export function getComponentPointerPointInElement({
  event,
  element,
}: {
  event: PointerEventLike;
  element: Element;
}): PointerPoint {
  const nativeEvent = getNativePointerEvent({ event });
  const rect = element.getBoundingClientRect();
  const shouldUseViewportPointer =
    hasOriginalPointerCoordinates({ event: nativeEvent }) &&
    !isRectLikelyInComponentSpace({ element, rect });
  const pointerPoint = shouldUseViewportPointer
    ? getViewportPointerPoint({ event })
    : getComponentPointerPoint({ event });

  return {
    x: pointerPoint.x - rect.left,
    y: pointerPoint.y - rect.top,
  };
}
