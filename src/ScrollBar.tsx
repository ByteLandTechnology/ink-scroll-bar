/**
 * 📜 ScrollBar component for Ink CLI applications.
 *
 * This module provides a vertical scroll bar indicator that can be used
 * in terminal user interfaces built with Ink. It supports two rendering modes:
 * - **Border mode**: Integrates with container borders, showing corner characters
 * - **Inset mode**: Renders inside the content area without corners
 *
 * @packageDocumentation
 */

import { useMemo } from "react";
import { Box, BoxProps, Text } from "ink";

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * 📍 Placement mode for the scroll bar.
 *
 * @remarks
 * Determines how the scroll bar is rendered and positioned:
 *
 * - `'left'` 👈 - Border mode, left side. Renders with corner characters (┌, └)
 *   that integrate with a container's left border.
 *
 * - `'right'` 👉 - Border mode, right side. Renders with corner characters (┐, ┘)
 *   that integrate with a container's right border.
 *
 * - `'inset'` 📥 - Inset mode. Renders without corner characters, designed to be
 *   placed inside the content area alongside scrollable content.
 *
 * @example
 * ```tsx
 * // Border mode - replaces the right border of a container
 * <ScrollBar placement="right" ... />
 *
 * // Inset mode - placed inside a bordered container
 * <Box borderStyle="single">
 *   <Content />
 *   <ScrollBar placement="inset" ... />
 * </Box>
 * ```
 */
export type ScrollBarPlacement = "left" | "right" | "inset";

/**
 * 🎨 Visual style for the scroll bar.
 *
 * @remarks
 * Available styles vary by placement mode:
 *
 * **Border mode styles** (placement: 'left' | 'right'):
 * These match Ink's border styles for seamless integration.
 * - `'single'` - Single line characters (│, ┃)
 * - `'double'` - Double line characters (║, ┃)
 * - `'round'` - Rounded corners with single lines
 * - `'bold'` - Bold/thick line characters (┃, │)
 * - `'singleDouble'` - Single horizontal, double vertical
 * - `'doubleSingle'` - Double horizontal, single vertical
 * - `'classic'` - ASCII characters (|, +)
 * - `'arrow'` - Arrow-style indicators
 *
 * **Inset mode styles** (placement: 'inset'):
 * Designed for use inside content areas.
 * - `'block'` █ - Full block characters (█/░)
 * - `'line'` │ - Simple line with blank track (│/ )
 * - `'thick'` ┃ - Thick line with dashed track (┃/╏)
 * - `'dots'` ● - Dot characters (●/·)
 *
 * @example
 * ```tsx
 * // Border mode with bold style
 * <ScrollBar placement="right" style="bold" ... />
 *
 * // Inset mode with block style
 * <ScrollBar placement="inset" style="block" ... />
 * ```
 */
export type ScrollBarStyle =
  | BoxProps["borderStyle"]
  | "block"
  | "line"
  | "thick"
  | "dots";

/**
 * ⚙️ Props for the {@link ScrollBar} component.
 */
export interface ScrollBarProps {
  /**
   * 📏 Total height of the scrollable content in lines.
   *
   * @remarks
   * This represents the full height of the content, including portions
   * that are not currently visible in the viewport.
   */
  contentHeight: number;

  /**
   * 👁️ Height of the visible viewport in lines.
   *
   * @remarks
   * This is the number of lines that can be displayed at once.
   * The scroll bar's thumb size is proportional to the ratio
   * of viewportHeight to contentHeight.
   */
  viewportHeight: number;

  /**
   * ⬇️ Current scroll position (offset from top) in lines.
   *
   * @remarks
   * A value of 0 means the content is scrolled to the top.
   * The maximum meaningful value is `contentHeight - viewportHeight`.
   */
  scrollOffset: number;

  /**
   * 📍 Placement mode for the scroll bar.
   *
   * @defaultValue `'right'`
   *
   * @see {@link ScrollBarPlacement} for available options
   */
  placement?: ScrollBarPlacement;

  /**
   * 🎨 Visual style for the scroll bar.
   *
   * @remarks
   * If not specified, defaults to `'single'` for border mode or
   * `'block'` for inset mode.
   *
   * @see {@link ScrollBarStyle} for available options
   */
  style?: ScrollBarStyle;

  /**
   * 👍 Custom character for the thumb indicator in inset mode.
   *
   * @remarks
   * Only used when `placement` is `'inset'`. When specified, overrides
   * the thumb character defined by the style.
   *
   * @example
   * ```tsx
   * // Custom circular thumb
   * <ScrollBar placement="inset" thumbChar="●" trackChar="○" ... />
   * ```
   */
  thumbChar?: string;

  /**
   * 🛤️ Custom character for the track background in inset mode.
   *
   * @remarks
   * Only used when `placement` is `'inset'`. When specified, overrides
   * the track character defined by the style.
   */
  trackChar?: string;

  /**
   * 👻 Whether to hide the scroll bar when scrolling is not needed.
   *
   * @remarks
   * Only applies to inset mode. When `true` and `contentHeight <= viewportHeight`,
   * the scroll bar is completely hidden.
   *
   * In border mode, the track and corners are always displayed to maintain
   * the visual border, but the thumb is hidden when scrolling is not needed.
   *
   * @defaultValue `false`
   */
  autoHide?: boolean;

  /**
   * 🌈 Color for the scroll bar characters.
   *
   * @remarks
   * Accepts any color value supported by Ink's Text component,
   * including named colors ('red', 'blue'), hex codes ('#ff0000'),
   * and RGB values.
   *
   * @example
   * ```tsx
   * <ScrollBar color="cyan" ... />
   * <ScrollBar color="#00ff00" ... />
   * ```
   */
  color?: string;

  /**
   * 🌑 Whether to render the scroll bar with dimmed styling.
   *
   * @remarks
   * When `true`, applies the `dimColor` prop to all Text elements,
   * resulting in a muted/grayed appearance.
   *
   * @defaultValue `false`
   */
  dimColor?: boolean;
}

// ============================================================================
// Character Definitions
// ============================================================================

/**
 * Character set for rendering scroll bar elements.
 * @internal
 */
interface StyleCharacters {
  /** Character for the track (non-thumb area) */
  track: string;
  /** Character for full thumb rows */
  thumb: string;
  /** Character for thumb starting in lower half of row */
  upperThumb?: string;
  /** Character for thumb ending in upper half of row */
  lowerThumb?: string;
}

/**
 * Character set for corner elements in border mode.
 * @internal
 */
interface CornerCharacters {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
}

/**
 * Style character mappings for all supported styles.
 * @internal
 */
const STYLE_CHARS: Record<string, StyleCharacters> = {
  // Border mode styles - designed to match Ink's border characters
  single: { track: "│", thumb: "┃", upperThumb: "╿", lowerThumb: "╽" },
  double: { track: "║", thumb: "┃" },
  round: { track: "│", thumb: "┃", upperThumb: "╿", lowerThumb: "╽" },
  bold: { track: "┃", thumb: "│", upperThumb: "╽", lowerThumb: "╿" },
  singleDouble: { track: "║", thumb: "┃" },
  doubleSingle: { track: "│", thumb: "┃", upperThumb: "╿", lowerThumb: "╽" },
  classic: { track: "|", thumb: "┃" },
  arrow: { track: "|", thumb: "┃", upperThumb: "╿", lowerThumb: "╽" },
  // Inset mode styles - designed for use inside content areas
  block: { track: "░", thumb: "█" },
  line: { track: " ", thumb: "│" },
  thick: { track: "╏", thumb: "┃" },
  dots: { track: "·", thumb: "●" },
};

/**
 * Corner character mappings for border mode styles.
 * @internal
 */
const CORNER_CHARS: Record<string, CornerCharacters> = {
  single: { topLeft: "┌", topRight: "┐", bottomLeft: "└", bottomRight: "┘" },
  double: { topLeft: "╔", topRight: "╗", bottomLeft: "╚", bottomRight: "╝" },
  round: { topLeft: "╭", topRight: "╮", bottomLeft: "╰", bottomRight: "╯" },
  bold: { topLeft: "┏", topRight: "┓", bottomLeft: "┗", bottomRight: "┛" },
  singleDouble: {
    topLeft: "╓",
    topRight: "╖",
    bottomLeft: "╙",
    bottomRight: "╜",
  },
  doubleSingle: {
    topLeft: "╒",
    topRight: "╕",
    bottomLeft: "╘",
    bottomRight: "╛",
  },
  classic: { topLeft: "+", topRight: "+", bottomLeft: "+", bottomRight: "+" },
  arrow: { topLeft: "┌", topRight: "┐", bottomLeft: "└", bottomRight: "┘" },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Gets the character set for a given style and mode.
 *
 * @param style - The style to get characters for
 * @param isInset - Whether the scroll bar is in inset mode
 * @returns The character set for the specified style
 *
 * @internal
 */
function getStyleChars(
  style: ScrollBarStyle | undefined,
  isInset: boolean,
): Required<StyleCharacters> {
  const defaultStyle = isInset ? "block" : "single";
  const chars = style
    ? (STYLE_CHARS[style as string] ?? STYLE_CHARS[defaultStyle]!)
    : STYLE_CHARS[defaultStyle]!;

  return {
    track: chars.track,
    thumb: chars.thumb,
    upperThumb: chars.upperThumb ?? chars.thumb,
    lowerThumb: chars.lowerThumb ?? chars.thumb,
  };
}

/**
 * Gets the corner characters for a given style.
 *
 * @param style - The style to get corners for
 * @returns The corner character set for the specified style
 *
 * @internal
 */
function getCornerChars(style: ScrollBarStyle | undefined): CornerCharacters {
  const defaultCorners: CornerCharacters = {
    topLeft: "┌",
    topRight: "┐",
    bottomLeft: "└",
    bottomRight: "┘",
  };
  if (!style) return defaultCorners;
  return CORNER_CHARS[style as string] ?? defaultCorners;
}

// ============================================================================
// Component
// ============================================================================

/**
 * 📜 A vertical scroll bar indicator for Ink CLI applications.
 *
 * @remarks
 * ScrollBar displays a visual indicator of the current scroll position
 * within a scrollable content area. It provides visual feedback about:
 * - The current viewport position within the content
 * - The relative size of the viewport compared to total content
 *
 * ## Rendering Modes
 *
 * **Border Mode** (`placement="left"` or `placement="right"`):
 * - Renders corner characters at top and bottom
 * - Designed to replace one side of a container's border
 * - When content fits the viewport, shows only the track (no thumb)
 * - The `autoHide` prop has no effect in this mode
 *
 * **Inset Mode** (`placement="inset"`):
 * - No corner characters
 * - Designed to be placed inside the content area
 * - Supports `autoHide` to completely hide when scrolling is not needed
 * - Supports custom `thumbChar` and `trackChar` props
 *
 * ## Half-Line Precision
 *
 * The scroll bar uses half-line precision with special Unicode characters
 * (╽ and ╿) to provide smoother visual feedback. Each row can represent
 * two discrete positions, allowing for more precise indication of scroll
 * position in content with many lines.
 *
 * @example
 * ### Border Mode (replacing container border)
 * ```tsx
 * <Box flexDirection="row">
 *   <Box borderStyle="single" borderRight={false}>
 *     <Content />
 *   </Box>
 *   <ScrollBar
 *     placement="right"
 *     style="single"
 *     contentHeight={100}
 *     viewportHeight={20}
 *     scrollOffset={scrollOffset}
 *   />
 * </Box>
 * ```
 *
 * @example
 * ### Inset Mode (inside content area)
 * ```tsx
 * <Box borderStyle="single">
 *   <Box flexDirection="row">
 *     <Content />
 *     <ScrollBar
 *       placement="inset"
 *       style="block"
 *       contentHeight={100}
 *       viewportHeight={20}
 *       scrollOffset={scrollOffset}
 *       autoHide
 *     />
 *   </Box>
 * </Box>
 * ```
 *
 * @example
 * ### Custom Characters
 * ```tsx
 * <ScrollBar
 *   placement="inset"
 *   thumbChar="●"
 *   trackChar="○"
 *   color="cyan"
 *   contentHeight={50}
 *   viewportHeight={10}
 *   scrollOffset={scrollOffset}
 * />
 * ```
 *
 * @param props - Component props
 * @returns The rendered scroll bar, or null if hidden
 *
 * @see {@link ScrollBarProps} for prop documentation
 * @see {@link ScrollBarBox} for a container with integrated scroll bar
 */
export const ScrollBar = ({
  contentHeight,
  viewportHeight,
  scrollOffset,
  placement = "right",
  style,
  thumbChar,
  trackChar,
  autoHide = false,
  color,
  dimColor,
}: ScrollBarProps) => {
  // Determine mode flags
  const isInset = placement === "inset";
  const isLeft = placement === "left";
  const needsScrolling = contentHeight > viewportHeight;

  // autoHide only applies to inset mode
  const shouldHide = isInset && autoHide && !needsScrolling;

  // Build the scroll bar character array
  const scrollBarChars = useMemo(() => {
    if (shouldHide || viewportHeight <= 0) {
      return [];
    }

    // Get character set based on style and mode
    const styleChars = getStyleChars(style, isInset);
    const chars = isInset
      ? {
          track: trackChar ?? styleChars.track,
          thumb: thumbChar ?? styleChars.thumb,
          upperThumb: thumbChar ?? styleChars.upperThumb,
          lowerThumb: thumbChar ?? styleChars.lowerThumb,
        }
      : styleChars;

    // Build character array for each row
    const result: { char: string; isThumb: boolean }[] = [];

    // If content fits viewport, show only track
    // (This runs if not hidden by autoHide logic above)
    if (!needsScrolling) {
      for (let i = 0; i < viewportHeight; i++) {
        result.push({ char: chars.track, isThumb: false });
      }
      return result;
    }

    // Check if we have distinct characters for half-line rendering
    const hasHalfLinePrecision =
      chars.upperThumb !== chars.thumb || chars.lowerThumb !== chars.thumb;

    // Calculate scroll bar dimensions
    const totalHalfSteps = viewportHeight * 2;
    const effectiveContentHeight = Math.max(contentHeight, viewportHeight, 1);
    const viewportRatio = Math.min(viewportHeight / effectiveContentHeight, 1);

    // Calculate thumb length
    let thumbLengthHalf = Math.max(
      2,
      Math.round(totalHalfSteps * viewportRatio),
    );

    // If no half-line precision, ensure length is even (full lines)
    if (!hasHalfLinePrecision) {
      thumbLengthHalf = Math.max(2, Math.round(thumbLengthHalf / 2) * 2);
    }

    // Calculate thumb position based on available track space
    const maxScrollOffset = Math.max(contentHeight - viewportHeight, 1);
    const scrollProgress = Math.min(
      Math.max(scrollOffset / maxScrollOffset, 0),
      1,
    );
    const maxThumbStartHalf = totalHalfSteps - thumbLengthHalf;
    let thumbStartHalf = Math.round(scrollProgress * maxThumbStartHalf);

    // If no half-line precision, align start to full rows
    if (!hasHalfLinePrecision) {
      thumbStartHalf = Math.round(thumbStartHalf / 2) * 2;
    }

    const thumbEndHalf = thumbStartHalf + thumbLengthHalf;

    // Generate character for each row
    for (let row = 0; row < viewportHeight; row++) {
      const rowUpperHalf = row * 2;
      const rowLowerHalf = row * 2 + 1;

      const hasThumbInUpper =
        thumbStartHalf <= rowUpperHalf && rowUpperHalf < thumbEndHalf;
      const hasThumbInLower =
        thumbStartHalf <= rowLowerHalf && rowLowerHalf < thumbEndHalf;

      if (hasThumbInUpper && hasThumbInLower) {
        result.push({ char: chars.thumb, isThumb: true });
      } else if (!hasThumbInUpper && !hasThumbInLower) {
        result.push({ char: chars.track, isThumb: false });
      } else if (hasThumbInLower && !hasThumbInUpper) {
        result.push({ char: chars.lowerThumb, isThumb: true });
      } else {
        result.push({ char: chars.upperThumb, isThumb: true });
      }
    }

    return result;
  }, [
    shouldHide,
    viewportHeight,
    contentHeight,
    scrollOffset,
    style,
    thumbChar,
    trackChar,
    isInset,
    needsScrolling,
  ]);

  // Don't render if hidden
  if (shouldHide || viewportHeight <= 0) {
    return null;
  }

  // Render inset mode (no corners)
  if (isInset) {
    return (
      <Box flexDirection="column" width={1} flexShrink={0}>
        {scrollBarChars.map((item, index) => (
          <Text key={index} color={color} dimColor={dimColor}>
            {item.char}
          </Text>
        ))}
      </Box>
    );
  }

  // Render border mode (with corners)
  const corners = getCornerChars(style);
  const topCorner = isLeft ? corners.topLeft : corners.topRight;
  const bottomCorner = isLeft ? corners.bottomLeft : corners.bottomRight;

  return (
    <Box flexDirection="column" width={1} flexShrink={0}>
      <Text color={color} dimColor={dimColor}>
        {topCorner}
      </Text>
      {scrollBarChars.map((item, index) => (
        <Text key={index} color={color} dimColor={dimColor}>
          {item.char}
        </Text>
      ))}
      <Text color={color} dimColor={dimColor}>
        {bottomCorner}
      </Text>
    </Box>
  );
};
