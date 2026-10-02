import {
  DynamicIcon,
  dynamicIconImports,
  type IconName,
} from "lucide-react/dynamic";
import * as React from "react";

export interface IconProps extends Omit<
  React.SVGProps<SVGSVGElement>,
  "color" | "name"
> {
  readonly name?: string;
  readonly size?: number;
  readonly strokeWidth?: number;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly "data-content-keys"?: string | string[];
}

export function Icon({
  name,
  size = 24,
  strokeWidth = 1.5,
  className,
  style,
  "data-content-keys": dataContentKeys,
  ...props
}: IconProps): React.JSX.Element | null {
  if (!name) return null;

  const iconName = (name in dynamicIconImports ? name : "circle") as IconName;

  return (
    <DynamicIcon
      name={iconName}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      style={style}
      data-content-keys={dataContentKeys}
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    />
  );
}
