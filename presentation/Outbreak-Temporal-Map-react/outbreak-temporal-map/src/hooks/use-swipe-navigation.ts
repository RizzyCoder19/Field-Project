import { useCallback, useRef, type TouchEvent as ReactTouchEvent } from "react";

const SWIPE_THRESHOLD = 50;
const SWIPE_VELOCITY_THRESHOLD = 0.3;

export interface SwipeHandlers {
  onTouchStart: (e: ReactTouchEvent) => void;
  onTouchEnd: (e: ReactTouchEvent) => void;
  onTouchCancel: () => void;
}

export function useSwipeNavigation({
  enabled,
  onSwipeLeft,
  onSwipeRight,
}: {
  enabled: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}): SwipeHandlers {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );

  const onTouchStart = useCallback(
    (e: ReactTouchEvent) => {
      if (!enabled) return;

      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
    },
    [enabled],
  );

  const onTouchEnd = useCallback(
    (e: ReactTouchEvent) => {
      if (!enabled || !touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;
      const velocityX = Math.abs(deltaX) / deltaTime;

      const isHorizontalSwipe =
        Math.abs(deltaX) > Math.abs(deltaY) &&
        (Math.abs(deltaX) > SWIPE_THRESHOLD ||
          velocityX > SWIPE_VELOCITY_THRESHOLD);

      if (isHorizontalSwipe) {
        if (deltaX > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }

      touchStartRef.current = null;
    },
    [enabled, onSwipeLeft, onSwipeRight],
  );

  const onTouchCancel = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  return { onTouchStart, onTouchEnd, onTouchCancel };
}
