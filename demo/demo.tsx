import React, { useState } from "react";
import { render, Box, Text, useInput } from "ink";
import { ScrollBar, ScrollBarBox } from "../src/index.js";

const ITEMS = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
const VIEWPORT_HEIGHT = 8;
const BOX_HEIGHT = VIEWPORT_HEIGHT + 2; // +2 for top/bottom borders

const Demo: React.FC = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [autoHide, setAutoHide] = useState(false);
  const [dimMode, setDimMode] = useState(false);
  const contentHeight = ITEMS.length;
  const maxScroll = Math.max(0, contentHeight - VIEWPORT_HEIGHT);

  useInput((input, key) => {
    if (input === "q") process.exit(0);
    if (key.downArrow) setScrollOffset((o) => Math.min(o + 1, maxScroll));
    if (key.upArrow) setScrollOffset((o) => Math.max(o - 1, 0));
    if (key.pageDown) setScrollOffset((o) => Math.min(o + 5, maxScroll));
    if (key.pageUp) setScrollOffset((o) => Math.max(o - 5, 0));
    if (input === "g") setScrollOffset(0);
    if (input === "G") setScrollOffset(maxScroll);
    if (input === "a") setAutoHide((p) => !p);
    if (input === "d") setDimMode((p) => !p);
  });

  // Get visible items
  const visibleItems = ITEMS.slice(
    scrollOffset,
    scrollOffset + VIEWPORT_HEIGHT,
  );

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        ink-scroll-bar Demo
      </Text>
      <Text dimColor>↑/↓: Scroll • PgUp/PgDn: Fast • g/G: Top/Bottom</Text>
      <Text dimColor>
        a: Toggle autoHide ({autoHide ? "on" : "off"}) • d: Toggle dimColor (
        {dimMode ? "on" : "off"}) • q: Quit
      </Text>
      <Text dimColor>
        Offset: {scrollOffset}/{maxScroll} | Content: {contentHeight} |
        Viewport: {VIEWPORT_HEIGHT}
      </Text>

      {/* Border Mode Styles */}
      <Box marginTop={1}>
        <Text bold color="magenta">
          Border Mode Styles (placement: left/right)
        </Text>
      </Box>
      <Box flexDirection="row" gap={1}>
        {/* Single style */}
        <Box flexDirection="column">
          <Text color="yellow">single</Text>
          <Box flexDirection="row" height={BOX_HEIGHT}>
            <Box
              flexDirection="column"
              borderStyle="single"
              borderRight={false}
            >
              {visibleItems.map((item, i) => (
                <Text key={i}>{item.padEnd(10)}</Text>
              ))}
            </Box>
            <ScrollBar
              placement="right"
              style="single"
              color="cyan"
              dimColor={dimMode}
              contentHeight={contentHeight}
              viewportHeight={VIEWPORT_HEIGHT}
              scrollOffset={scrollOffset}
            />
          </Box>
        </Box>

        {/* Double style */}
        <Box flexDirection="column">
          <Text color="yellow">double</Text>
          <Box flexDirection="row" height={BOX_HEIGHT}>
            <ScrollBar
              placement="left"
              style="double"
              color="green"
              dimColor={dimMode}
              contentHeight={contentHeight}
              viewportHeight={VIEWPORT_HEIGHT}
              scrollOffset={scrollOffset}
            />
            <Box flexDirection="column" borderStyle="double" borderLeft={false}>
              {visibleItems.map((item, i) => (
                <Text key={i}>{item.padEnd(10)}</Text>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Bold style */}
        <Box flexDirection="column">
          <Text color="yellow">bold</Text>
          <Box flexDirection="row" height={BOX_HEIGHT}>
            <Box flexDirection="column" borderStyle="bold" borderRight={false}>
              {visibleItems.map((item, i) => (
                <Text key={i}>{item.padEnd(10)}</Text>
              ))}
            </Box>
            <ScrollBar
              placement="right"
              style="bold"
              color="yellow"
              dimColor={dimMode}
              contentHeight={contentHeight}
              viewportHeight={VIEWPORT_HEIGHT}
              scrollOffset={scrollOffset}
            />
          </Box>
        </Box>

        {/* Round style */}
        <Box flexDirection="column">
          <Text color="yellow">round</Text>
          <Box flexDirection="row" height={BOX_HEIGHT}>
            <Box flexDirection="column" borderStyle="round" borderRight={false}>
              {visibleItems.map((item, i) => (
                <Text key={i}>{item.padEnd(10)}</Text>
              ))}
            </Box>
            <ScrollBar
              placement="right"
              style="round"
              color="magenta"
              dimColor={dimMode}
              contentHeight={contentHeight}
              viewportHeight={VIEWPORT_HEIGHT}
              scrollOffset={scrollOffset}
            />
          </Box>
        </Box>
      </Box>

      {/* Inset Mode Styles */}
      <Box marginTop={1}>
        <Text bold color="magenta">
          Inset Mode Styles (placement: inset)
        </Text>
      </Box>
      <Box flexDirection="row" gap={1}>
        {/* Block style */}
        <Box flexDirection="column">
          <Text color="yellow">block</Text>
          <Box flexDirection="row" borderStyle="single" height={BOX_HEIGHT}>
            <Box flexDirection="column">
              {visibleItems.map((item, i) => (
                <Text key={i}>{item.padEnd(10)}</Text>
              ))}
            </Box>
            <ScrollBar
              placement="inset"
              style="block"
              color="cyan"
              dimColor={dimMode}
              contentHeight={contentHeight}
              viewportHeight={VIEWPORT_HEIGHT}
              scrollOffset={scrollOffset}
              autoHide={autoHide}
            />
          </Box>
        </Box>

        {/* Thick style */}
        <Box flexDirection="column">
          <Text color="yellow">thick</Text>
          <Box flexDirection="row" borderStyle="single" height={BOX_HEIGHT}>
            <Box flexDirection="column">
              {visibleItems.map((item, i) => (
                <Text key={i}>{item.padEnd(10)}</Text>
              ))}
            </Box>
            <ScrollBar
              placement="inset"
              style="thick"
              color="green"
              dimColor={dimMode}
              contentHeight={contentHeight}
              viewportHeight={VIEWPORT_HEIGHT}
              scrollOffset={scrollOffset}
              autoHide={autoHide}
            />
          </Box>
        </Box>

        {/* Dots style */}
        <Box flexDirection="column">
          <Text color="yellow">dots</Text>
          <Box flexDirection="row" borderStyle="classic" height={BOX_HEIGHT}>
            <Box flexDirection="column">
              {visibleItems.map((item, i) => (
                <Text key={i}>{item.padEnd(10)}</Text>
              ))}
            </Box>
            <ScrollBar
              placement="inset"
              style="dots"
              dimColor={dimMode}
              contentHeight={contentHeight}
              viewportHeight={VIEWPORT_HEIGHT}
              scrollOffset={scrollOffset}
              autoHide={autoHide}
            />
          </Box>
        </Box>

        {/* Line style */}
        <Box flexDirection="column">
          <Text color="yellow">line</Text>
          <Box flexDirection="row" borderStyle="single" height={BOX_HEIGHT}>
            <Box flexDirection="column">
              {visibleItems.map((item, i) => (
                <Text key={i}>{item.padEnd(10)}</Text>
              ))}
            </Box>
            <ScrollBar
              placement="inset"
              style="line"
              color="yellow"
              dimColor={dimMode}
              contentHeight={contentHeight}
              viewportHeight={VIEWPORT_HEIGHT}
              scrollOffset={scrollOffset}
              autoHide={autoHide}
            />
          </Box>
        </Box>

        {/* Custom chars */}
        <Box flexDirection="column">
          <Text color="yellow">custom</Text>
          <Box flexDirection="row" borderStyle="single" height={BOX_HEIGHT}>
            <Box flexDirection="column">
              {visibleItems.map((item, i) => (
                <Text key={i}>{item.padEnd(10)}</Text>
              ))}
            </Box>
            <ScrollBar
              placement="inset"
              thumbChar="●"
              trackChar="○"
              color="red"
              dimColor={dimMode}
              contentHeight={contentHeight}
              viewportHeight={VIEWPORT_HEIGHT}
              scrollOffset={scrollOffset}
              autoHide={autoHide}
            />
          </Box>
        </Box>
      </Box>

      {/* ScrollBarBox Component */}
      <Box marginTop={1}>
        <Text bold color="magenta">
          ScrollBarBox Component
        </Text>
      </Box>
      <Box flexDirection="row" gap={1}>
        <Box flexDirection="column">
          <Text color="yellow">scrollBarPosition: right</Text>
          <ScrollBarBox
            height={BOX_HEIGHT}
            width={20}
            borderStyle="single"
            scrollBarPosition="right"
            scrollBarAutoHide={autoHide}
            contentHeight={contentHeight}
            viewportHeight={VIEWPORT_HEIGHT}
            scrollOffset={scrollOffset}
          >
            <Box flexDirection="column">
              {visibleItems.map((item, i) => (
                <Text key={i}>{item}</Text>
              ))}
            </Box>
          </ScrollBarBox>
        </Box>

        <Box flexDirection="column">
          <Text color="yellow">scrollBarPosition: left</Text>
          <ScrollBarBox
            height={BOX_HEIGHT}
            width={20}
            borderStyle="double"
            scrollBarPosition="left"
            scrollBarAutoHide={autoHide}
            contentHeight={contentHeight}
            viewportHeight={VIEWPORT_HEIGHT}
            scrollOffset={scrollOffset}
          >
            <Box flexDirection="column">
              {visibleItems.map((item, i) => (
                <Text key={i}>{item}</Text>
              ))}
            </Box>
          </ScrollBarBox>
        </Box>

        {/* Auto-hide demo (inset mode only) */}
        <Box flexDirection="column">
          <Text color="yellow">autoHide (inset)</Text>
          <Box flexDirection="row" borderStyle="single" height={6}>
            <Box flexDirection="column" flexGrow={1}>
              <Text>Short 1 </Text>
              <Text>Short 2 </Text>
              <Text>Short 3 </Text>
            </Box>
            <ScrollBar
              placement="inset"
              style="block"
              contentHeight={3}
              viewportHeight={4}
              scrollOffset={0}
              autoHide={autoHide}
            />
          </Box>
          <Text dimColor>autoHide: {autoHide ? "hidden" : "shown"}</Text>
        </Box>
      </Box>
    </Box>
  );
};

console.clear();
render(<Demo />);
