import { useEffect, useRef } from "react";

function isEditableElement(element: Element | null): boolean {
  if (!element) return false;

  const tagName = element.tagName.toLowerCase();
  if (tagName === "input" || tagName === "textarea") {
    return true;
  }

  if (element.getAttribute("contenteditable") === "true") {
    return true;
  }

  return false;
}

export interface KeyboardIntent {
  isNext: boolean;
  isPrev: boolean;
  isSpace: boolean;
}

export function readKeyboardIntent(e: KeyboardEvent): KeyboardIntent | null {
  if (e.defaultPrevented || e.cancelBubble) return null;
  const active = document.activeElement;
  if (isEditableElement(active)) return null;

  const isSpace = e.code === "Space" || e.key === " ";
  const isNext =
    e.key === "ArrowDown" ||
    e.key === "ArrowRight" ||
    e.key === "PageDown" ||
    (isSpace && !e.shiftKey);
  const isPrev =
    e.key === "ArrowUp" ||
    e.key === "ArrowLeft" ||
    e.key === "PageUp" ||
    (isSpace && e.shiftKey);
  if (!isNext && !isPrev) return null;

  if (
    isSpace &&
    (active instanceof HTMLButtonElement ||
      active instanceof HTMLAnchorElement ||
      active?.getAttribute("role") === "button")
  ) {
    return null;
  }

  return { isNext, isPrev, isSpace };
}

export function useKeyboardNavigation({
  enabled,
  onNext,
  onPrev,
}: {
  enabled: boolean;
  onNext: () => void;
  onPrev: () => void;
}): void {
  const handlersRef = useRef({ onNext, onPrev });
  handlersRef.current = { onNext, onPrev };

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const intent = readKeyboardIntent(e);
      if (!intent) return;

      if (intent.isSpace) e.preventDefault();

      setTimeout(() => {
        if (e.cancelBubble) return;
        if (!intent.isSpace && e.defaultPrevented) return;
        if (intent.isNext) handlersRef.current.onNext();
        else handlersRef.current.onPrev();
      }, 0);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled]);
}
