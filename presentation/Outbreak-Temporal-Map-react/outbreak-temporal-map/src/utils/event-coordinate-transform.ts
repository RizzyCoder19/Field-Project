const ORIGINAL_GET_BOUNDING_CLIENT_RECT = Symbol(
  "originalGetBoundingClientRect",
);

const ORIGINAL_GET_CLIENT_RECTS = Symbol("originalGetClientRects");

type PatchableElement = Element & {
  [ORIGINAL_GET_BOUNDING_CLIENT_RECT]?: () => DOMRect;
  [ORIGINAL_GET_CLIENT_RECTS]?: () => DOMRectList;
};

const registeredFaceElements = new WeakSet<HTMLElement>();

/**
 * Returns the element's bounding rect in the iframe's VISUAL viewport coord
 * space — i.e. the coords you'd use with `position: fixed`. Inside a
 * registered face the normal `getBoundingClientRect()` returns coords in
 * the face's unscaled 1920×1080 layout space instead, which is the wrong
 * space for placing fixed overlays.
 *
 * Falls back to the standard rect for elements that aren't inside a
 * registered face.
 */
export function getVisualRect(element: Element): DOMRect {
  const patchable = element as PatchableElement;
  const original = patchable[ORIGINAL_GET_BOUNDING_CLIENT_RECT];
  if (original) return original();
  return element.getBoundingClientRect();
}

export function setupEventCoordinateTransform({
  faceElement,
  expectedWidth,
}: {
  faceElement: HTMLElement;
  expectedWidth: number;
}): () => void {
  registeredFaceElements.add(faceElement);

  const patchedElements = new Set<PatchableElement>();
  const patchableFaceElement = faceElement as PatchableElement;

  let originalFaceGetBoundingClientRect =
    patchableFaceElement[ORIGINAL_GET_BOUNDING_CLIENT_RECT];
  if (!originalFaceGetBoundingClientRect) {
    originalFaceGetBoundingClientRect =
      faceElement.getBoundingClientRect.bind(faceElement);
    patchableFaceElement[ORIGINAL_GET_BOUNDING_CLIENT_RECT] =
      originalFaceGetBoundingClientRect;
  }

  const getScaleAndRect = () => {
    const rect = originalFaceGetBoundingClientRect();
    const scale = rect.width > 0 ? rect.width / expectedWidth : 1;
    return { rect, scale };
  };

  const restoreElement = (element: PatchableElement) => {
    const originalGetBoundingClientRect =
      element[ORIGINAL_GET_BOUNDING_CLIENT_RECT];
    if (originalGetBoundingClientRect) {
      element.getBoundingClientRect = originalGetBoundingClientRect;
      delete element[ORIGINAL_GET_BOUNDING_CLIENT_RECT];
    }

    const originalGetClientRects = element[ORIGINAL_GET_CLIENT_RECTS];
    if (originalGetClientRects) {
      element.getClientRects = originalGetClientRects;
      delete element[ORIGINAL_GET_CLIENT_RECTS];
    }
  };

  const patchElementRect = (element: Element) => {
    const patchableElement = element as PatchableElement;
    patchedElements.add(patchableElement);

    let originalGetBoundingClientRect =
      patchableElement[ORIGINAL_GET_BOUNDING_CLIENT_RECT];
    if (!originalGetBoundingClientRect) {
      originalGetBoundingClientRect =
        element.getBoundingClientRect.bind(element);
      patchableElement[ORIGINAL_GET_BOUNDING_CLIENT_RECT] =
        originalGetBoundingClientRect;
    }

    element.getBoundingClientRect = function (): DOMRect {
      const visualRect = originalGetBoundingClientRect();
      const { rect: faceRect, scale } = getScaleAndRect();

      if (scale === 1) return visualRect;

      const adjustedLeft = (visualRect.left - faceRect.left) / scale;
      const adjustedTop = (visualRect.top - faceRect.top) / scale;
      const adjustedWidth = visualRect.width / scale;
      const adjustedHeight = visualRect.height / scale;

      return new DOMRect(
        adjustedLeft,
        adjustedTop,
        adjustedWidth,
        adjustedHeight,
      );
    };

    let originalGetClientRects = patchableElement[ORIGINAL_GET_CLIENT_RECTS];
    if (!originalGetClientRects) {
      originalGetClientRects = element.getClientRects.bind(element);
      patchableElement[ORIGINAL_GET_CLIENT_RECTS] = originalGetClientRects;
    }

    element.getClientRects = function (): DOMRectList {
      const visualRects = originalGetClientRects();
      const { rect: faceRect, scale } = getScaleAndRect();

      if (scale === 1) return visualRects;

      const adjustedRects: DOMRect[] = [];
      for (let i = 0; i < visualRects.length; i++) {
        const visualRect = visualRects[i];
        const adjustedLeft = (visualRect.left - faceRect.left) / scale;
        const adjustedTop = (visualRect.top - faceRect.top) / scale;
        const adjustedWidth = visualRect.width / scale;
        const adjustedHeight = visualRect.height / scale;
        adjustedRects.push(
          new DOMRect(adjustedLeft, adjustedTop, adjustedWidth, adjustedHeight),
        );
      }

      const domRectList = {
        length: adjustedRects.length,
        item: (index: number) => adjustedRects[index] || null,
        [Symbol.iterator]: function* () {
          for (const rect of adjustedRects) {
            yield rect;
          }
        },
      };
      for (let i = 0; i < adjustedRects.length; i++) {
        (domRectList as unknown as Record<number, DOMRect>)[i] =
          adjustedRects[i];
      }
      return domRectList as unknown as DOMRectList;
    };
  };

  const patchAllElements = () => {
    const elements = faceElement.querySelectorAll("*");
    elements.forEach(patchElementRect);
    patchElementRect(faceElement);
  };

  patchAllElements();

  const mutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            patchElementRect(node);
            node.querySelectorAll("*").forEach(patchElementRect);
          }
        });
        mutation.removedNodes.forEach((node) => {
          if (node instanceof Element) {
            const patchable = node as PatchableElement;
            restoreElement(patchable);
            patchedElements.delete(patchable);
            node.querySelectorAll("*").forEach((child) => {
              const patchableChild = child as PatchableElement;
              restoreElement(patchableChild);
              patchedElements.delete(patchableChild);
            });
          }
        });
      }
    }
  });

  mutationObserver.observe(faceElement, {
    childList: true,
    subtree: true,
  });

  const mouseEventTypes = [
    "mousemove",
    "mousedown",
    "mouseup",
    "click",
    "dblclick",
    "mouseenter",
    "mouseleave",
    "mouseover",
    "mouseout",
    "contextmenu",
  ];

  const pointerEventTypes = [
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointerenter",
    "pointerleave",
    "pointerover",
    "pointerout",
    "pointercancel",
    "gotpointercapture",
    "lostpointercapture",
  ];

  const wheelEventTypes = ["wheel"];

  const dragEventTypes = [
    "dragstart",
    "drag",
    "dragend",
    "dragenter",
    "dragleave",
    "dragover",
    "drop",
  ];

  const touchEventTypes = [
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
  ];

  const patchMouseEvent = (event: MouseEvent) => {
    const { rect: currentFaceRect, scale: currentScale } = getScaleAndRect();

    if (currentScale === 1) {
      return;
    }

    const originalClientX = event.clientX;
    const originalClientY = event.clientY;

    const relativeX = originalClientX - currentFaceRect.left;
    const relativeY = originalClientY - currentFaceRect.top;

    const scaledRelativeX = relativeX / currentScale;
    const scaledRelativeY = relativeY / currentScale;

    const newClientX = scaledRelativeX;
    const newClientY = scaledRelativeY;
    const newPageX = scaledRelativeX;
    const newPageY = scaledRelativeY;
    const newMovementX = event.movementX / currentScale;
    const newMovementY = event.movementY / currentScale;

    let newOffsetX = scaledRelativeX;
    let newOffsetY = scaledRelativeY;
    const target = event.target as Element | null;
    if (target && typeof target.getBoundingClientRect === "function") {
      const targetRect = target.getBoundingClientRect();
      newOffsetX = scaledRelativeX - targetRect.left;
      newOffsetY = scaledRelativeY - targetRect.top;
    }

    try {
      Object.defineProperty(event, "clientX", {
        value: newClientX,
        writable: false,
        configurable: true,
      });
      Object.defineProperty(event, "clientY", {
        value: newClientY,
        writable: false,
        configurable: true,
      });
      Object.defineProperty(event, "pageX", {
        value: newPageX,
        writable: false,
        configurable: true,
      });
      Object.defineProperty(event, "pageY", {
        value: newPageY,
        writable: false,
        configurable: true,
      });
      Object.defineProperty(event, "offsetX", {
        value: newOffsetX,
        writable: false,
        configurable: true,
      });
      Object.defineProperty(event, "offsetY", {
        value: newOffsetY,
        writable: false,
        configurable: true,
      });
      Object.defineProperty(event, "movementX", {
        value: newMovementX,
        writable: false,
        configurable: true,
      });
      Object.defineProperty(event, "movementY", {
        value: newMovementY,
        writable: false,
        configurable: true,
      });
      Object.defineProperty(event, "__originalClientX", {
        value: originalClientX,
        configurable: true,
      });
      Object.defineProperty(event, "__originalClientY", {
        value: originalClientY,
        configurable: true,
      });
    } catch {
      // Ignore patching failures
    }
  };

  const patchTouchEvent = (event: TouchEvent) => {
    const { rect: currentFaceRect, scale: currentScale } = getScaleAndRect();

    if (currentScale === 1) return;

    if (typeof Touch === "undefined") return;

    const patchTouchList = (touchList: TouchList): Touch[] => {
      const patched: Touch[] = [];
      for (let i = 0; i < touchList.length; i++) {
        const touch = touchList[i];

        const relativeX = touch.clientX - currentFaceRect.left;
        const relativeY = touch.clientY - currentFaceRect.top;

        const scaledRelativeX = relativeX / currentScale;
        const scaledRelativeY = relativeY / currentScale;

        const patchedTouch = new Touch({
          identifier: touch.identifier,
          target: touch.target,
          clientX: scaledRelativeX,
          clientY: scaledRelativeY,
          pageX: scaledRelativeX,
          pageY: scaledRelativeY,
          screenX: touch.screenX,
          screenY: touch.screenY,
          radiusX: touch.radiusX,
          radiusY: touch.radiusY,
          rotationAngle: touch.rotationAngle,
          force: touch.force,
        });

        patched.push(patchedTouch);
      }
      return patched;
    };

    const createPatchedTouchList = (touches: Touch[]): TouchList => {
      const touchList = {
        length: touches.length,
        item: (index: number) => touches[index] || null,
        [Symbol.iterator]: function* () {
          for (const touch of touches) {
            yield touch;
          }
        },
      };
      for (let i = 0; i < touches.length; i++) {
        (touchList as unknown as Record<number, Touch>)[i] = touches[i];
      }
      return touchList as unknown as TouchList;
    };

    const patchedTouches = patchTouchList(event.touches);
    const patchedTargetTouches = patchTouchList(event.targetTouches);
    const patchedChangedTouches = patchTouchList(event.changedTouches);

    Object.defineProperties(event, {
      touches: {
        value: createPatchedTouchList(patchedTouches),
        configurable: true,
      },
      targetTouches: {
        value: createPatchedTouchList(patchedTargetTouches),
        configurable: true,
      },
      changedTouches: {
        value: createPatchedTouchList(patchedChangedTouches),
        configurable: true,
      },
    });
  };

  const handleMouseEvent = (event: Event) => {
    patchMouseEvent(event as MouseEvent);
  };

  const handleTouchEvent = (event: Event) => {
    patchTouchEvent(event as TouchEvent);
  };

  mouseEventTypes.forEach((type) => {
    faceElement.addEventListener(type, handleMouseEvent, { capture: true });
  });

  pointerEventTypes.forEach((type) => {
    faceElement.addEventListener(type, handleMouseEvent, { capture: true });
  });

  wheelEventTypes.forEach((type) => {
    faceElement.addEventListener(type, handleMouseEvent, { capture: true });
  });

  dragEventTypes.forEach((type) => {
    faceElement.addEventListener(type, handleMouseEvent, { capture: true });
  });

  touchEventTypes.forEach((type) => {
    faceElement.addEventListener(type, handleTouchEvent, { capture: true });
  });

  return () => {
    registeredFaceElements.delete(faceElement);
    mouseEventTypes.forEach((type) => {
      faceElement.removeEventListener(type, handleMouseEvent, {
        capture: true,
      });
    });
    pointerEventTypes.forEach((type) => {
      faceElement.removeEventListener(type, handleMouseEvent, {
        capture: true,
      });
    });
    wheelEventTypes.forEach((type) => {
      faceElement.removeEventListener(type, handleMouseEvent, {
        capture: true,
      });
    });
    dragEventTypes.forEach((type) => {
      faceElement.removeEventListener(type, handleMouseEvent, {
        capture: true,
      });
    });
    touchEventTypes.forEach((type) => {
      faceElement.removeEventListener(type, handleTouchEvent, {
        capture: true,
      });
    });
    mutationObserver.disconnect();

    patchedElements.forEach(restoreElement);
    patchedElements.clear();
  };
}
