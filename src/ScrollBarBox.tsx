/**
 * 📦 ScrollBarBox component for Ink CLI applications.
 *
 * A convenience component that combines a Box container with an integrated
 * scroll bar on one side. The scroll bar replaces one border of the container.
 *
 * @packageDocumentation
 */

import React from "react";
import { Box, BoxProps } from "ink";
import { ScrollBar, ScrollBarPlacement } from "./ScrollBar.js";

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * ⚙️ Props for the {@link ScrollBarBox} component.
 *
 * @remarks
 * Extends Ink's BoxProps to inherit all Box styling options.
 * Additional props control the scroll bar behavior and appearance.
 */
export interface ScrollBarBoxProps extends BoxProps {
  /**
   * 📏 Total height of the scrollable content in lines.
   */
  contentHeight: number;

  /**
   * 👁️ Height of the visible viewport in lines.
   */
  viewportHeight: number;

  /**
   * ⬇️ Current scroll position (offset from top) in lines.
   */
  scrollOffset: number;

  /**
   * 📍 Which side of the box to display the scroll bar.
   *
   * @remarks
   * The scroll bar replaces one border of the container.
   * - `'left'` 👈 - Scroll bar on the left side
   * - `'right'` 👉 - Scroll bar on the right side
   *
   * @defaultValue `'right'`
   */
  scrollBarPosition?: "left" | "right";

  /**
   * 👻 Whether to hide thumb indicator when content fits in viewport.
   *
   * @remarks
   * When `true` and content fits the viewport, only the track is shown
   * (no thumb indicator). The borders and corners are always displayed.
   *
   * @defaultValue `false`
   */
  scrollBarAutoHide?: boolean;

  /**
   * 📦 The content to display inside the box.
   */
  children?: React.ReactNode;
}

// ============================================================================
// Component
// ============================================================================

/**
 * 📦 A Box component with an integrated scroll bar on one border.
 *
 * @remarks
 * ScrollBarBox provides a convenient way to create bordered containers
 * with a built-in scroll bar indicator. The scroll bar replaces one
 * side of the border (left or right) and displays the current scroll
 * position relative to the total content height.
 *
 * ## Features
 *
 * - Seamless integration with Ink's Box component
 * - Automatic style matching between border and scroll bar
 * - Support for all Ink border styles
 * - Inherits border color properties for the scroll bar
 * - Half-line precision for smooth scroll position indication
 *
 * ## Color Inheritance
 *
 * The scroll bar inherits border colors from the Box props:
 * - `borderColor` applies to both sides unless overridden
 * - `borderLeftColor` / `borderRightColor` for side-specific colors
 * - `borderDimColor` for dimmed styling
 *
 * @example
 * ### Basic Usage
 * ```tsx
 * <ScrollBarBox
 *   height={12}
 *   borderStyle="single"
 *   contentHeight={50}
 *   viewportHeight={10}
 *   scrollOffset={scrollOffset}
 * >
 *   {visibleItems.map(item => (
 *     <Text key={item.id}>{item.label}</Text>
 *   ))}
 * </ScrollBarBox>
 * ```
 *
 * @example
 * ### Left-side Scroll Bar with Colors
 * ```tsx
 * <ScrollBarBox
 *   height={12}
 *   borderStyle="double"
 *   borderColor="cyan"
 *   scrollBarPosition="left"
 *   contentHeight={100}
 *   viewportHeight={10}
 *   scrollOffset={scrollOffset}
 * >
 *   <Content />
 * </ScrollBarBox>
 * ```
 *
 * @example
 * ### With ScrollView Integration
 * ```tsx
 * const App = () => {
 *   const scrollRef = useRef<ScrollViewRef>(null);
 *   const [scrollOffset, setScrollOffset] = useState(0);
 *   const [contentHeight, setContentHeight] = useState(0);
 *
 *   useInput((input, key) => {
 *     if (key.downArrow) scrollRef.current?.scrollBy(1);
 *     if (key.upArrow) scrollRef.current?.scrollBy(-1);
 *   });
 *
 *   return (
 *     <ScrollBarBox
 *       height={12}
 *       borderStyle="single"
 *       contentHeight={contentHeight}
 *       viewportHeight={10}
 *       scrollOffset={scrollOffset}
 *     >
 *       <ScrollView
 *         ref={scrollRef}
 *         onScroll={setScrollOffset}
 *         onContentHeightChange={setContentHeight}
 *       >
 *         {items.map(item => (
 *           <Text key={item.id}>{item.label}</Text>
 *         ))}
 *       </ScrollView>
 *     </ScrollBarBox>
 *   );
 * };
 * ```
 *
 * @param props - Component props
 * @returns The rendered scroll bar box
 *
 * @see {@link ScrollBarBoxProps} for prop documentation
 * @see {@link ScrollBar} for the underlying scroll bar component
 */
export const ScrollBarBox = ({
  contentHeight,
  viewportHeight,
  scrollOffset,
  scrollBarPosition = "right",
  scrollBarAutoHide = false,
  borderStyle = "single",
  borderColor,
  borderDimColor,
  borderLeftColor,
  borderRightColor,
  borderLeftDimColor,
  borderRightDimColor,
  height,
  children,
  ...boxProps
}: ScrollBarBoxProps) => {
  const isLeft = scrollBarPosition === "left";
  const scrollBarPlacement: ScrollBarPlacement = isLeft ? "left" : "right";

  // Determine scroll bar colors based on position and inherited border colors
  const scrollBarColor = isLeft
    ? (borderLeftColor ?? borderColor)
    : (borderRightColor ?? borderColor);

  const scrollBarDimColor = isLeft
    ? (borderLeftDimColor ?? borderDimColor)
    : (borderRightDimColor ?? borderDimColor);

  return (
    <Box flexDirection="row" height={height} {...boxProps}>
      {/* Left scroll bar (replaces left border) */}
      {isLeft && (
        <ScrollBar
          placement={scrollBarPlacement}
          style={borderStyle}
          color={scrollBarColor}
          dimColor={scrollBarDimColor}
          contentHeight={contentHeight}
          viewportHeight={viewportHeight}
          scrollOffset={scrollOffset}
        />
      )}

      {/* Content container with remaining borders */}
      <Box
        flexGrow={1}
        overflow="hidden"
        borderStyle={borderStyle}
        borderColor={borderColor}
        borderDimColor={borderDimColor}
        borderLeft={!isLeft}
        borderRight={isLeft}
      >
        {children}
      </Box>

      {/* Right scroll bar (replaces right border) */}
      {!isLeft && (
        <ScrollBar
          placement={scrollBarPlacement}
          style={borderStyle}
          color={scrollBarColor}
          dimColor={scrollBarDimColor}
          contentHeight={contentHeight}
          viewportHeight={viewportHeight}
          scrollOffset={scrollOffset}
        />
      )}
    </Box>
  );
};
