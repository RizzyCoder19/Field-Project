import type { CSSProperties } from "react";

export function cardsBackgroundStyle({
  color,
  image,
}: {
  color: string;
  image: string;
}): CSSProperties {
  return {
    backgroundColor: color,
    ...(image
      ? {
          backgroundImage: `url(${JSON.stringify(image)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : null),
  };
}

export function CardsBackgroundLayer({
  color,
  image,
}: {
  color: string;
  image: string;
}) {
  return (
    <div
      aria-hidden
      data-cards-background=""
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        ...cardsBackgroundStyle({ color, image }),
      }}
    />
  );
}
