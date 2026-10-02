import { useEffect, type RefObject } from "react";

const CURSOR_HIDE_DELAY = 2000;

export function useCursorAutoHide(
  containerRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timerId: ReturnType<typeof setTimeout> | null = null;

    const hideCursor = () => {
      el.style.cursor = "none";
    };

    const handleMouseMove = () => {
      el.style.cursor = "";
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(hideCursor, CURSOR_HIDE_DELAY);
    };

    el.addEventListener("mousemove", handleMouseMove);
    timerId = setTimeout(hideCursor, CURSOR_HIDE_DELAY);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      if (timerId) clearTimeout(timerId);
      el.style.cursor = "";
    };
  }, [containerRef]);
}
