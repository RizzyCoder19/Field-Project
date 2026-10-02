import * as React from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export interface FaceContentContainerProps {
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}

export function FaceContentContainer({
  className,
  style,
  children,
}: FaceContentContainerProps) {
  return (
    <div
      data-face-content-container
      className={cn("mx-auto px-4", className)}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
}
