"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewAnimationOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px", triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setHasAnimated(true);
      setIsIntersecting(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // If already in view on mount (e.g. initial load at top or anchor navigation)
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setHasAnimated(true);
      setIsIntersecting(true);
      if (triggerOnce) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsIntersecting(inView);
        if (inView) {
          setHasAnimated(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, hasAnimated, isIntersecting };
}
