let currentFaceId: string | null = null;
let isProgrammaticScroll = false;
let clearProgrammaticTimeoutId: number | null = null;

const PROGRAMMATIC_SCROLL_TIMEOUT_MS = 1000;

const listeners = new Set<() => void>();

export function getCurrentStackedFaceId(): string | null {
  return currentFaceId;
}

export function setCurrentStackedFaceId(faceId: string | null): void {
  if (currentFaceId === faceId) return;
  currentFaceId = faceId;
  for (const listener of listeners) listener();
}

export function subscribeToStackedFace(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function isProgrammaticStackedScroll(): boolean {
  return isProgrammaticScroll;
}

export function clearProgrammaticStackedScroll(): void {
  isProgrammaticScroll = false;
  if (clearProgrammaticTimeoutId !== null) {
    window.clearTimeout(clearProgrammaticTimeoutId);
    clearProgrammaticTimeoutId = null;
  }
}

function markProgrammaticStackedScroll(): void {
  isProgrammaticScroll = true;
  if (clearProgrammaticTimeoutId !== null) {
    window.clearTimeout(clearProgrammaticTimeoutId);
  }
  clearProgrammaticTimeoutId = window.setTimeout(() => {
    isProgrammaticScroll = false;
    clearProgrammaticTimeoutId = null;
  }, PROGRAMMATIC_SCROLL_TIMEOUT_MS);
}

export function scrollStackedFaceIntoView(
  faceId: string,
  behavior: ScrollBehavior,
  orientation: "VERTICAL" | "HORIZONTAL" = "VERTICAL",
): void {
  const element = document.querySelector<HTMLElement>(
    `[data-face-id="${CSS.escape(faceId)}"]`,
  );
  if (!element) return;
  markProgrammaticStackedScroll();

  if (orientation === "HORIZONTAL") {
    const container = element.closest<HTMLElement>(
      ".stacked-slides-container, .stacked-mobile-slides-container",
    );
    if (container) {
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const centerOffset = (container.clientWidth - elementRect.width) / 2;
      const left =
        container.scrollLeft +
        elementRect.left -
        containerRect.left -
        container.clientLeft -
        centerOffset;
      container.scrollTo({ left, behavior });
      return;
    }
  }

  element.scrollIntoView({ behavior, block: "center", inline: "nearest" });
}
