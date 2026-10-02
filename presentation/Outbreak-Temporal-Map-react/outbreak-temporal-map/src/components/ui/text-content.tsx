import type { CSSProperties } from "react";

interface TextContentProps {
  "data-content-keys"?: string | string[];
  "data-design-node-id"?: string;
  "data-design-source-path"?: string;
  "data-design-node-index"?: string;
  content: string;
  className?: string;
  style?: CSSProperties;
  as?: "p" | "span";
}

export function TextContent({
  "data-content-keys": dataContentKeys,
  "data-design-node-id": dataDesignNodeId,
  "data-design-source-path": dataDesignSourcePath,
  "data-design-node-index": dataDesignNodeIndex,
  content,
  className,
  style,
  as = "p",
}: TextContentProps) {
  const baseClasses = "[&_a]:underline [&_em]:italic [&_strong]:font-bold";
  const combinedClassName = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  const Component = as;
  const contentKeyPath = getContentKeyPath(dataContentKeys);
  const fallbackDesignSourcePath = contentKeyPath
    ? `content:${contentKeyPath}`
    : undefined;
  const resolvedDesignSourcePath =
    dataDesignSourcePath ?? fallbackDesignSourcePath;
  const resolvedDesignNodeIndex = dataDesignNodeIndex ?? "0";
  const resolvedDesignNodeId =
    dataDesignNodeId ??
    (resolvedDesignSourcePath
      ? `${resolvedDesignSourcePath}::design-node::${resolvedDesignNodeIndex}`
      : undefined);

  return (
    <Component
      data-content-keys={dataContentKeys}
      data-design-node-id={resolvedDesignNodeId}
      data-design-source-path={resolvedDesignSourcePath}
      data-design-node-index={
        resolvedDesignNodeId ? resolvedDesignNodeIndex : undefined
      }
      dangerouslySetInnerHTML={{ __html: content }}
      className={combinedClassName}
      style={style}
    />
  );
}

function getContentKeyPath(dataContentKeys: string | string[] | undefined) {
  if (Array.isArray(dataContentKeys)) {
    return dataContentKeys.length > 0 ? dataContentKeys.join(".") : null;
  }
  return dataContentKeys && dataContentKeys.length > 0 ? dataContentKeys : null;
}
