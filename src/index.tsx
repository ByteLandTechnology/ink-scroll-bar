/**
 * ink-scroll-bar - Scroll bar components for Ink CLI applications.
 *
 * This package provides visual scroll bar indicators for terminal user interfaces
 * built with Ink. It includes:
 *
 * - {@link ScrollBar} - A standalone scroll bar indicator component
 * - {@link ScrollBarBox} - A container with integrated scroll bar
 *
 * @example
 * ```tsx
 * import { ScrollBar, ScrollBarBox } from 'ink-scroll-bar';
 *
 * // Standalone scroll bar
 * <ScrollBar
 *   placement="right"
 *   style="single"
 *   contentHeight={100}
 *   viewportHeight={20}
 *   scrollOffset={scrollOffset}
 * />
 *
 * // Container with integrated scroll bar
 * <ScrollBarBox
 *   borderStyle="single"
 *   contentHeight={100}
 *   viewportHeight={20}
 *   scrollOffset={scrollOffset}
 * >
 *   <Content />
 * </ScrollBarBox>
 * ```
 *
 * @packageDocumentation
 */

export {
  ScrollBar,
  type ScrollBarProps,
  type ScrollBarPlacement,
  type ScrollBarStyle,
} from "./ScrollBar";

export { ScrollBarBox, type ScrollBarBoxProps } from "./ScrollBarBox";
