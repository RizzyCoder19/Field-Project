import { setupEventCoordinateTransform } from "./event-coordinate-transform";

/**
 * Converts viewport units in CSS values to use custom CSS variables.
 * Skips units that are already inside var(--v*, ...) fallbacks to prevent infinite nesting.
 */
export function convertViewportUnits(cssValue: string): string {
  const unitToVariable = {
    dvmax: "vmax",
    dvmin: "vmin",
    dvh: "vh",
    dvw: "vw",
    lvmax: "vmax",
    lvmin: "vmin",
    lvh: "vh",
    lvw: "vw",
    svmax: "vmax",
    svmin: "vmin",
    svh: "vh",
    svw: "vw",
    vmax: "vmax",
    vmin: "vmin",
    vh: "vh",
    vw: "vw",
  } as const;

  const viewportUnitPattern =
    /(-?\d*\.?\d+)(dvmax|dvmin|dvh|dvw|lvmax|lvmin|lvh|lvw|svmax|svmin|svh|svw|vmax|vmin|vh|vw)\b/g;

  return cssValue.replace(viewportUnitPattern, (match, value, unit, offset) => {
    const variableName = unitToVariable[unit as keyof typeof unitToVariable];
    const before = cssValue.substring(0, offset);
    // Skip a unit that is already a var(--v*, 1vw) fallback. The optional
    // backslashes also match the CSS-escaped form var\(--vw\, found inside the
    // injected :where() selectors, so reprocessing never corrupts them.
    if (/var\\?\(--(?:vh|vw|vmin|vmax)\\?[,_ ]\s*$/.test(before)) {
      return match;
    }
    return `calc(var(--${variableName}, 1${unit}) * ${value})`;
  });
}

/**
 * Tailwind breakpoint media queries (mobile-first order)
 */
const BREAKPOINT_MEDIA_QUERIES: Record<string, string> = {
  "": "", // Base (no media query)
  "sm:": "@media (min-width: 640px)",
  "md:": "@media (min-width: 768px)",
  "lg:": "@media (min-width: 1024px)",
  "xl:": "@media (min-width: 1280px)",
  "2xl:": "@media (min-width: 1536px)",
};

const CONTAINER_BREAKPOINT_QUERIES: Record<string, string> = {
  "@xs:": "@container (min-width: 20rem)",
  "@sm:": "@container (min-width: 24rem)",
  "@md:": "@container (min-width: 28rem)",
  "@lg:": "@container (min-width: 32rem)",
  "@xl:": "@container (min-width: 36rem)",
  "@2xl:": "@container (min-width: 42rem)",
  "@3xl:": "@container (min-width: 48rem)",
  "@4xl:": "@container (min-width: 56rem)",
  "@5xl:": "@container (min-width: 64rem)",
  "@6xl:": "@container (min-width: 72rem)",
  "@7xl:": "@container (min-width: 80rem)",
};

/**
 * Maps Tailwind property prefixes to CSS properties
 */
const PROPERTY_MAP: Record<string, string[]> = {
  basis: ["flex-basis"],
  bottom: ["bottom"],
  gap: ["gap"],
  "gap-x": ["column-gap"],
  "gap-y": ["row-gap"],
  h: ["height"],
  inset: ["inset"],
  "inset-x": ["left", "right"],
  "inset-y": ["top", "bottom"],
  leading: ["line-height"],
  left: ["left"],
  m: ["margin"],
  "max-h": ["max-height"],
  "max-w": ["max-width"],
  "min-h": ["min-height"],
  "min-w": ["min-width"],
  ml: ["margin-left"],
  mr: ["margin-right"],
  mt: ["margin-top"],
  mb: ["margin-bottom"],
  mx: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  p: ["padding"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
  pr: ["padding-right"],
  pt: ["padding-top"],
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  right: ["right"],
  size: ["width", "height"],
  text: ["font-size"],
  top: ["top"],
  tracking: ["letter-spacing"],
  w: ["width"],
};

/**
 * Escapes a class name for use in a CSS selector
 */
function escapeClassForSelector(className: string): string {
  return className.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

const SELECTOR_VARIANTS: Record<string, string> = {
  active: ":active",
  checked: ":checked",
  disabled: ":disabled",
  focus: ":focus",
  "focus-visible": ":focus-visible",
  "focus-within": ":focus-within",
  hover: ":hover",
  visited: ":visited",
};

interface ClassVariantInfo {
  classWithoutPrefix: string;
  responsiveQuery: string;
  responsivePrefix: string;
  selectorSuffix: string;
  variantPrefix: string;
}

function getResponsiveQuery(variant: string): string {
  const prefix = `${variant}:`;
  const configuredQuery =
    BREAKPOINT_MEDIA_QUERIES[prefix] ?? CONTAINER_BREAKPOINT_QUERIES[prefix];
  if (configuredQuery) {
    return configuredQuery;
  }

  const arbitraryContainerMatch = variant.match(
    /^@\[(-?(?:\d+|\d*\.\d+)(?:px|rem|em|ch|ex|vw|vh|vmin|vmax))\]$/,
  );
  return arbitraryContainerMatch
    ? `@container (min-width: ${arbitraryContainerMatch[1]})`
    : "";
}

function getClassVariantInfo(className: string): ClassVariantInfo | null {
  const segments: string[] = [];
  let bracketDepth = 0;
  let segmentStart = 0;
  for (let index = 0; index < className.length; index++) {
    const character = className[index];
    if (character === "[") bracketDepth++;
    if (character === "]") bracketDepth--;
    if (character === ":" && bracketDepth === 0) {
      segments.push(className.slice(segmentStart, index));
      segmentStart = index + 1;
    }
  }
  segments.push(className.slice(segmentStart));

  const classWithoutPrefix = segments.pop();
  if (!classWithoutPrefix) {
    return null;
  }

  const responsiveVariants = segments.filter((variant) =>
    Boolean(getResponsiveQuery(variant)),
  );
  if (responsiveVariants.length > 1) {
    return null;
  }

  const selectorVariants = segments.filter(
    (variant) => !responsiveVariants.includes(variant),
  );
  if (selectorVariants.some((variant) => !SELECTOR_VARIANTS[variant])) {
    return null;
  }

  return {
    classWithoutPrefix,
    responsiveQuery: responsiveVariants[0]
      ? getResponsiveQuery(responsiveVariants[0])
      : "",
    responsivePrefix: responsiveVariants[0] ? `${responsiveVariants[0]}:` : "",
    selectorSuffix: selectorVariants
      .map((variant) => SELECTOR_VARIANTS[variant])
      .join(""),
    variantPrefix: segments.length > 0 ? `${segments.join(":")}:` : "",
  };
}

interface ViewportClassConversion {
  originalClass: string;
  convertedClass: string;
  responsivePrefix: string;
  responsiveQuery: string;
  selectorSuffix: string;
  cssProperties: string[];
  cssValue: string;
}

/**
 * Checks if a value has already been converted (contains var(--vh, var(--vw, etc.)
 * Also handles underscore versions from older conversions and CSS-escaped commas
 */
function isAlreadyConverted(value: string): boolean {
  // Match var(--vh followed by comma, underscore, space, or CSS-escaped comma (\2c)
  return /var\(--(?:vh|vw|vmin|vmax)[,_ ]/.test(value) || /\\2c/.test(value);
}

/**
 * Converts a Tailwind class with viewport units to use CSS variables.
 * Returns conversion info including the CSS needed for the new class.
 *
 * Examples:
 * - h-[50vh] → h-[calc(var(--vh,1vh)*50)]
 * - md:h-[60vh] → md:h-[calc(var(--vh,1vh)*60)]
 * - h-screen → h-[calc(var(--vh,1vh)*100)]
 */
export function convertViewportClass(
  className: string,
): ViewportClassConversion | null {
  const variantInfo = getClassVariantInfo(className);
  if (!variantInfo) {
    return null;
  }
  const {
    classWithoutPrefix,
    responsiveQuery,
    responsivePrefix,
    selectorSuffix,
    variantPrefix,
  } = variantInfo;

  // Handle arbitrary value classes like h-[50vh], w-[100vw], min-h-[50vh], etc.
  const arbitraryMatch = classWithoutPrefix.match(
    /^(h|w|min-h|max-h|min-w|max-w)-\[(.+)\]$/,
  );
  if (arbitraryMatch) {
    const [, property, value] = arbitraryMatch;
    // Skip if already converted (contains var(--vh, etc.)
    if (isAlreadyConverted(value)) {
      return null;
    }
    // Check if the value contains viewport units
    if (!/(vh|vw|vmin|vmax)/.test(value)) {
      return null;
    }
    const cssValue = convertViewportUnits(value);
    if (cssValue === value) {
      return null;
    }
    // Use the CSS value directly in the class (Tailwind v3+ supports commas)
    // Just remove extra spaces around operators for cleaner class names
    const classValue = cssValue
      .replace(/\s*\*\s*/g, "*")
      .replace(/\s*,\s*/g, ",");
    const convertedClass = `${variantPrefix}${property}-[${classValue}]`;

    return {
      originalClass: className,
      convertedClass,
      responsivePrefix,
      responsiveQuery,
      selectorSuffix,
      cssProperties: PROPERTY_MAP[property] || [property],
      cssValue,
    };
  }

  const genericArbitraryMatch = classWithoutPrefix.match(
    /^(-?[a-zA-Z][\w-]*)-\[(.+)\]$/,
  );
  if (genericArbitraryMatch) {
    const [, rawUtility, value] = genericArbitraryMatch;
    const isNegative = rawUtility.startsWith("-");
    const utility = isNegative ? rawUtility.slice(1) : rawUtility;
    const cssProperties = PROPERTY_MAP[utility];
    if (!cssProperties) {
      return null;
    }
    if (isAlreadyConverted(value)) {
      return null;
    }
    if (
      !/(dvh|dvw|dvmin|dvmax|svh|svw|svmin|svmax|lvh|lvw|lvmin|lvmax|vh|vw|vmin|vmax)/.test(
        value,
      )
    ) {
      return null;
    }
    const convertedValue = convertViewportUnits(value);
    if (convertedValue === value) {
      return null;
    }
    const cssValue = isNegative
      ? `calc(${convertedValue} * -1)`
      : convertedValue;
    const classValue = cssValue
      .replace(/\s*\*\s*/g, "*")
      .replace(/\s*,\s*/g, ",");
    const convertedClass = `${variantPrefix}${rawUtility}-[${classValue}]`;

    return {
      originalClass: className,
      convertedClass,
      responsivePrefix,
      responsiveQuery,
      selectorSuffix,
      cssProperties,
      cssValue,
    };
  }

  // Handle standard viewport classes like h-screen, h-dvh, w-screen, etc.
  const standardClassPatterns: Array<{
    pattern: RegExp;
    property: string;
    cssProperty: string;
    unit: string;
  }> = [
    {
      pattern: /^(h)-(screen|dvh|svh|lvh)$/,
      property: "h",
      cssProperty: "height",
      unit: "vh",
    },
    {
      pattern: /^(min-h)-(screen|dvh|svh|lvh)$/,
      property: "min-h",
      cssProperty: "min-height",
      unit: "vh",
    },
    {
      pattern: /^(max-h)-(screen|dvh|svh|lvh)$/,
      property: "max-h",
      cssProperty: "max-height",
      unit: "vh",
    },
    {
      pattern: /^(w)-(screen|dvw|svw|lvw)$/,
      property: "w",
      cssProperty: "width",
      unit: "vw",
    },
    {
      pattern: /^(min-w)-(screen|dvw|svw|lvw)$/,
      property: "min-w",
      cssProperty: "min-width",
      unit: "vw",
    },
    {
      pattern: /^(max-w)-(screen|dvw|svw|lvw)$/,
      property: "max-w",
      cssProperty: "max-width",
      unit: "vw",
    },
  ];

  for (const {
    pattern,
    property,
    cssProperty,
    unit,
  } of standardClassPatterns) {
    if (pattern.test(classWithoutPrefix)) {
      const cssValue = `calc(var(--${unit}, 1${unit}) * 100)`;
      // Use the CSS value directly (Tailwind v3+ supports commas)
      const classValue = cssValue
        .replace(/\s*\*\s*/g, "*")
        .replace(/\s*,\s*/g, ",");
      const convertedClass = `${variantPrefix}${property}-[${classValue}]`;

      return {
        originalClass: className,
        convertedClass,
        responsivePrefix,
        responsiveQuery,
        selectorSuffix,
        cssProperties: [cssProperty],
        cssValue,
      };
    }
  }

  return null;
}

/**
 * Generates CSS for converted viewport classes, properly ordered by breakpoint
 */
export function generateViewportCSS(
  conversions: ViewportClassConversion[],
): string {
  const queryByBreakpoint = new Map([
    ...Object.entries(BREAKPOINT_MEDIA_QUERIES),
    ...Object.entries(CONTAINER_BREAKPOINT_QUERIES),
    ...conversions.map(
      (conversion) =>
        [conversion.responsivePrefix, conversion.responsiveQuery] as const,
    ),
  ]);
  const containerBreakpoints = [...queryByBreakpoint.keys()]
    .filter((prefix) => prefix.startsWith("@"))
    .sort((first, second) => {
      const firstWidth = Number.parseFloat(
        queryByBreakpoint.get(first)?.match(/min-width: ([\d.]+)/)?.[1] ?? "0",
      );
      const secondWidth = Number.parseFloat(
        queryByBreakpoint.get(second)?.match(/min-width: ([\d.]+)/)?.[1] ?? "0",
      );
      return firstWidth - secondWidth;
    });
  const breakpointOrder = [
    "",
    ...Object.keys(BREAKPOINT_MEDIA_QUERIES).filter(Boolean),
    ...containerBreakpoints,
  ];
  // Group conversions by breakpoint
  const byBreakpoint = Object.fromEntries(
    breakpointOrder.map((prefix) => [prefix, []]),
  ) as Record<string, ViewportClassConversion[]>;

  for (const conversion of conversions) {
    const prefix = conversion.responsivePrefix || "";
    if (byBreakpoint[prefix]) {
      byBreakpoint[prefix].push(conversion);
    }
  }

  // Generate CSS in mobile-first order
  // Use :where() wrapper to give our selectors 0 specificity, allowing
  // Tailwind's responsive classes (like md:h-full) to override our converted classes
  const cssRules: string[] = [];
  for (const prefix of breakpointOrder) {
    const breakpointConversions = byBreakpoint[prefix];
    if (breakpointConversions.length === 0) continue;

    const rules = breakpointConversions.map((c) => {
      // Use :where() to give 0 specificity so other classes can override
      const selector = `:where(.${escapeClassForSelector(c.convertedClass)}${c.selectorSuffix})`;
      const declarations = c.cssProperties
        .map((property) => `${property}: ${c.cssValue};`)
        .join(" ");
      return `${selector} { ${declarations} }`;
    });

    const breakpointQuery = queryByBreakpoint.get(prefix);
    if (breakpointQuery) {
      cssRules.push(`${breakpointQuery} { ${rules.join(" ")} }`);
    } else {
      cssRules.push(...rules);
    }
  }

  return cssRules.join("\n");
}

/**
 * Extracts conversion info from an already-converted class.
 * This handles classes that were previously converted or came from AI-generated code.
 */
function extractConversionFromAlreadyConverted(
  className: string,
): ViewportClassConversion | null {
  const variantInfo = getClassVariantInfo(className);
  if (!variantInfo) {
    return null;
  }
  const {
    classWithoutPrefix,
    responsivePrefix,
    responsiveQuery,
    selectorSuffix,
  } = variantInfo;

  // Match already-converted arbitrary value classes
  const alreadyConvertedMatch = classWithoutPrefix.match(
    /^(-?[a-zA-Z][\w-]*)-\[(.+)\]$/,
  );

  if (!alreadyConvertedMatch) {
    return null;
  }

  const [, rawUtility, value] = alreadyConvertedMatch;
  const utility = rawUtility.startsWith("-") ? rawUtility.slice(1) : rawUtility;
  const cssProperties = PROPERTY_MAP[utility];
  if (!cssProperties) {
    return null;
  }

  // Check if this looks like an already-converted value
  if (!isAlreadyConverted(value)) {
    return null;
  }

  // The CSS value is the bracket content (may need to restore spaces from underscores)
  const cssValue = value.replace(/_/g, " ");

  return {
    originalClass: className,
    convertedClass: className, // Already in converted form
    responsivePrefix,
    responsiveQuery,
    selectorSuffix,
    cssProperties,
    cssValue,
  };
}

/**
 * Processes Tailwind classes that use viewport units and replaces them with
 * converted classes that use CSS variables. Also injects the necessary CSS
 * for the converted classes. This preserves the responsive cascade so classes
 * like md:h-full can override h-[50vh].
 */
function processViewportTailwindClasses(
  element: HTMLElement,
  conversions: ViewportClassConversion[],
): void {
  const classList = Array.from(element.classList);

  classList.forEach((className) => {
    const existingConversion = extractConversionFromAlreadyConverted(className);
    if (existingConversion) {
      conversions.push(existingConversion);
      return;
    }

    const conversion = convertViewportClass(className);
    if (conversion && conversion.convertedClass !== className) {
      element.classList.remove(className);
      // Keep the full class name including responsive prefix (e.g., md:h-[calc...])
      element.classList.add(conversion.convertedClass);
      conversions.push(conversion);
    }
  });
}

/**
 * Processes all stylesheets and inline styles to convert viewport units.
 * Collects class conversions for CSS injection.
 */
function processViewportUnitsForElement(
  element: HTMLElement,
  conversions: ViewportClassConversion[],
): void {
  if (element.style.cssText) {
    const originalCssText = element.style.cssText;
    const modifiedCssText = convertViewportUnits(originalCssText);

    if (modifiedCssText !== originalCssText) {
      element.style.cssText = modifiedCssText;
    }
  }

  processViewportTailwindClasses(element, conversions);
}

function processViewportUnitsInElement(
  element: HTMLElement,
  conversions: ViewportClassConversion[],
): void {
  processViewportUnitsForElement(element, conversions);

  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i];
    if (child instanceof HTMLElement) {
      processViewportUnitsInElement(child, conversions);
    }
  }
}

/**
 * Processes stylesheets to convert viewport units
 */
function processViewportUnitsInStylesheets(faceRoot: HTMLElement): void {
  // Process all style elements within the face, except our own injected
  // stylesheet. Its selectors embed the converted class names with
  // backslash-escaped parens/commas (e.g. var\(--vw\,1vw\)), which the
  // already-converted guard cannot detect, so re-running the conversion would
  // double-convert the 1vw/1vh fallback inside the selector and break it.
  const styleElements = faceRoot.querySelectorAll(
    "style:not([data-viewport-converted-css])",
  );

  styleElements.forEach((styleElement) => {
    if (styleElement.textContent) {
      const originalCSS = styleElement.textContent;
      const modifiedCSS = convertViewportUnits(originalCSS);

      if (modifiedCSS !== originalCSS) {
        styleElement.textContent = modifiedCSS;
      }
    }
  });
}

/**
 * Creates a throttled version of a function
 */
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number,
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecTime = 0;

  return ((...args: Parameters<T>) => {
    const currentTime = Date.now();

    const execute = () => {
      func(...args);
      lastExecTime = currentTime;
      timeoutId = null;
    };

    if (currentTime - lastExecTime > delay) {
      execute();
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(execute, delay - (currentTime - lastExecTime));
    }
  }) as T;
}

/**
 * Stores ResizeObserver instances for cleanup
 */
const resizeObserverMap = new WeakMap<HTMLElement, ResizeObserver>();

interface SimulateFixedDimensions {
  width: number;
  height: number;
}

type SimulateFixedDimensionsOption = boolean | SimulateFixedDimensions;

const DEFAULT_SIMULATED_WIDTH = 1920;
const DEFAULT_SIMULATED_HEIGHT = 1080;

/**
 * Updates viewport CSS variables based on element dimensions
 */
function updateFaceViewport(
  element: HTMLElement,
  simulateFixedDimensions: SimulateFixedDimensionsOption,
): void {
  const currentPreviewWidth = element.clientWidth; // We take the face width which is the same as the preview width
  const currentPreviewHeight = window.innerHeight; // We take the window height which is the same as the preview height

  let vw: number;
  let vh: number;

  if (typeof simulateFixedDimensions === "object") {
    vw = simulateFixedDimensions.width / 100;
    vh = simulateFixedDimensions.height / 100;
  } else if (simulateFixedDimensions === true) {
    vw = DEFAULT_SIMULATED_WIDTH / 100;
    vh = DEFAULT_SIMULATED_HEIGHT / 100;
  } else {
    vw = currentPreviewWidth / 100;
    vh = currentPreviewHeight / 100;
  }

  const vmin = Math.min(vw, vh);
  const vmax = Math.max(vw, vh);

  element.style.setProperty("--vw", `${vw}px`);
  element.style.setProperty("--vh", `${vh}px`);
  element.style.setProperty("--vmin", `${vmin}px`);
  element.style.setProperty("--vmax", `${vmax}px`);
}

/**
 * Registers a Face element and sets up viewport variables for desktop/mobile simulation.
 *
 * This is the core of Face viewport simulation:
 * 1. Sets --vh/--vw CSS variables based on Face dimensions (not window)
 * 2. Sets data attributes for responsive breakpoints per Face
 * 3. Updates automatically when Face resizes (when simulateFixedDimensions is false)
 * 4. Converts all viewport units (vh, vw, vmin, vmax) to use the custom CSS variables
 * 5. Uses mobile dimensions (393x852) when viewport width is less than 640px
 *
 * @param el - The Face element to register
 * @param simulateFixedDimensions - Either:
 *   - `false` (default): Use actual element/window dimensions with resize observer
 *   - `true`: Use default fixed dimensions (1512x982)
 *   - `{ width, height }`: Use custom fixed dimensions
 *
 * @returns A cleanup function to disconnect the resize observer
 */
/**
 * Injects CSS for converted viewport classes into the face element
 */
function injectViewportCSS(
  faceRoot: HTMLElement,
  conversions: ViewportClassConversion[],
): HTMLStyleElement | null {
  if (conversions.length === 0) return null;

  // Deduplicate conversions by converted class name
  const seen = new Set<string>();
  const uniqueConversions = conversions.filter((c) => {
    if (seen.has(c.convertedClass)) return false;
    seen.add(c.convertedClass);
    return true;
  });

  const css = generateViewportCSS(uniqueConversions);
  if (!css) return null;

  // Check if we already have a viewport CSS style element
  const existingStyle = faceRoot.querySelector(
    'style[data-viewport-converted-css="true"]',
  ) as HTMLStyleElement | null;

  if (existingStyle) {
    existingStyle.textContent = css;
    return existingStyle;
  }

  // Create and inject new style element
  const styleElement = document.createElement("style");
  styleElement.setAttribute("data-viewport-converted-css", "true");
  styleElement.textContent = css;
  faceRoot.insertBefore(styleElement, faceRoot.firstChild);

  return styleElement;
}

export function registerFace({
  el,
  simulateFixedDimensions = false,
}: {
  el: HTMLElement;
  simulateFixedDimensions?: boolean | SimulateFixedDimensions;
}): () => void {
  // Accumulates all class conversions so the stylesheet is always rebuilt from
  // the complete set, never a partial list from a single mutation.
  const conversions: ViewportClassConversion[] = [];
  const seenConvertedClasses = new Set<string>();

  function mergeAndInjectConversions(
    newConversions: ViewportClassConversion[],
  ): void {
    let hasNewConversions = false;
    for (const conversion of newConversions) {
      if (seenConvertedClasses.has(conversion.convertedClass)) continue;
      seenConvertedClasses.add(conversion.convertedClass);
      conversions.push(conversion);
      hasNewConversions = true;
    }
    if (hasNewConversions) {
      injectViewportCSS(el, conversions);
    }
  }

  const initialConversions: ViewportClassConversion[] = [];
  processViewportUnitsInElement(el, initialConversions);
  processViewportUnitsInStylesheets(el);

  // Inject CSS for converted classes
  mergeAndInjectConversions(initialConversions);

  // Initial update
  updateFaceViewport(el, simulateFixedDimensions);

  // Set up event coordinate transformation when simulating fixed dimensions
  let eventCoordCleanup: (() => void) | null = null;
  if (simulateFixedDimensions) {
    const expectedWidth =
      typeof simulateFixedDimensions === "object"
        ? simulateFixedDimensions.width
        : DEFAULT_SIMULATED_WIDTH;

    eventCoordCleanup = setupEventCoordinateTransform({
      faceElement: el,
      expectedWidth,
    });
  }

  // Convert nodes that mount or whose style/class changes after registration
  // (e.g. cold artifact load, remount, control edits), before they paint.
  const mutationObserverOptions: MutationObserverInit = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class"],
  };
  const viewportMutationObserver = new MutationObserver((records) => {
    const addedSubtrees: HTMLElement[] = [];
    const changedElements = new Set<HTMLElement>();
    for (const record of records) {
      if (record.type === "childList") {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            addedSubtrees.push(node);
          }
        });
      } else if (record.target instanceof HTMLElement) {
        changedElements.add(record.target);
      }
    }
    if (addedSubtrees.length === 0 && changedElements.size === 0) return;

    viewportMutationObserver.disconnect();
    const newConversions: ViewportClassConversion[] = [];
    for (const addedSubtree of addedSubtrees) {
      processViewportUnitsInElement(addedSubtree, newConversions);
    }
    for (const changedElement of changedElements) {
      processViewportUnitsForElement(changedElement, newConversions);
    }
    processViewportUnitsInStylesheets(el);
    mergeAndInjectConversions(newConversions);
    viewportMutationObserver.observe(el, mutationObserverOptions);
  });
  viewportMutationObserver.observe(el, mutationObserverOptions);

  const shouldObserveResize =
    simulateFixedDimensions === false || simulateFixedDimensions === undefined;

  // Set up resize observer if not simulating fixed desktop
  if (shouldObserveResize) {
    // Clean up any existing observer
    const existingObserver = resizeObserverMap.get(el);
    if (existingObserver) {
      existingObserver.disconnect();
    }

    // Create throttled update function (throttle to ~16ms for ~60fps)
    const throttledUpdate = throttle(() => {
      const newConversions: ViewportClassConversion[] = [];
      processViewportUnitsInElement(el, newConversions);
      processViewportUnitsInStylesheets(el);

      mergeAndInjectConversions(newConversions);

      updateFaceViewport(el, simulateFixedDimensions);
    }, 16);

    // Create and store resize observer
    const resizeObserver = new ResizeObserver(() => {
      throttledUpdate();
    });

    resizeObserver.observe(el);
    resizeObserverMap.set(el, resizeObserver);

    // Return cleanup function
    return () => {
      resizeObserver.disconnect();
      resizeObserverMap.delete(el);
      viewportMutationObserver.disconnect();
      eventCoordCleanup?.();
      // Query for the style element at cleanup time to handle dynamically created elements
      const styleToRemove = el.querySelector(
        'style[data-viewport-converted-css="true"]',
      );
      if (styleToRemove && styleToRemove.parentNode) {
        styleToRemove.parentNode.removeChild(styleToRemove);
      }
    };
  }

  // Return cleanup function when simulating fixed desktop
  return () => {
    viewportMutationObserver.disconnect();
    eventCoordCleanup?.();
    // Remove injected style element if it exists
    const styleToRemove = el.querySelector(
      'style[data-viewport-converted-css="true"]',
    );
    if (styleToRemove && styleToRemove.parentNode) {
      styleToRemove.parentNode.removeChild(styleToRemove);
    }
  };
}
