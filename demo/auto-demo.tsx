import React, { useState, useEffect } from "react";
import { render, Box, Text, useApp } from "ink";
import { ScrollBar, ScrollBarBox, ScrollBarStyle } from "../src/index.js";

// Demo configuration
const VIEWPORT_HEIGHT = 8;
const CONTENT_HEIGHT = 50;
const SCROLL_SPEED = 100; // ms per step

// Parse command line args
const args = process.argv.slice(2);
const sceneArg = args[0] || "border";

type Scene = "border" | "inset" | "autohide";

const items = Array.from({ length: CONTENT_HEIGHT }, (_, i) => `Item ${i + 1}`);

const AutoDemo = () => {
  const { exit } = useApp();
  const [scrollOffset, setScrollOffset] = useState(0);
  const [scene, setScene] = useState<Scene>(sceneArg as Scene);
  const [step, setStep] = useState(0);
  const [autoHide, setAutoHide] = useState(false);
  const [dynamicContentHeight, setDynamicContentHeight] = useState(3);

  // Auto-scroll logic
  useEffect(() => {
    const runDemo = async () => {
      if (scene === "autohide") {
        // Initial state
        await new Promise((r) => setTimeout(r, 1500));

        // Grow content
        for (let i = 3; i <= 10; i++) {
          setDynamicContentHeight(i);
          await new Promise((r) => setTimeout(r, 400));
        }

        // Shrink content
        for (let i = 10; i >= 3; i--) {
          setDynamicContentHeight(i);
          await new Promise((r) => setTimeout(r, 400));
        }

        await new Promise((r) => setTimeout(r, 1000));
      } else {
        // Normal scroll demo for other scenes
        // Phase 1: Scroll down
        for (let i = 0; i <= CONTENT_HEIGHT - VIEWPORT_HEIGHT; i++) {
          setScrollOffset(i);
          await new Promise((r) => setTimeout(r, SCROLL_SPEED));
        }

        // Phase 2: Scroll up
        for (let i = CONTENT_HEIGHT - VIEWPORT_HEIGHT; i >= 0; i--) {
          setScrollOffset(i);
          await new Promise((r) => setTimeout(r, SCROLL_SPEED));
        }
      }

      exit();
    };

    runDemo();

    return () => {};
  }, [scene, exit]);

  const renderBorderScene = () => (
    <Box flexDirection="column" gap={1}>
      <Text bold color="cyan">
        Border Mode Styles
      </Text>
      <Box flexDirection="row" gap={2}>
        <StyleDemo
          style="single"
          label="single"
          offset={scrollOffset}
          placement="right"
        />
        <StyleDemo
          style="double"
          label="double"
          offset={scrollOffset}
          placement="right"
        />
        <StyleDemo
          style="round"
          label="round"
          offset={scrollOffset}
          placement="right"
        />
        <StyleDemo
          style="bold"
          label="bold"
          offset={scrollOffset}
          placement="right"
        />
      </Box>
    </Box>
  );

  const renderInsetScene = () => (
    <Box flexDirection="column" gap={1}>
      <Text bold color="cyan">
        Inset Mode Styles
      </Text>
      <Box flexDirection="row" gap={2}>
        <StyleDemo
          style="block"
          label="block"
          offset={scrollOffset}
          placement="inset"
          borderStyle="single"
        />
        <StyleDemo
          style="thick"
          label="thick"
          offset={scrollOffset}
          placement="inset"
          borderStyle="single"
        />
        <StyleDemo
          style="dots"
          label="dots"
          offset={scrollOffset}
          placement="inset"
          borderStyle="classic"
        />
        <StyleDemo
          style="line"
          label="line"
          offset={scrollOffset}
          placement="inset"
          borderStyle="single"
        />
      </Box>
    </Box>
  );

  const renderAutoHideScene = () => (
    <Box flexDirection="column" gap={1}>
      <Text bold color="cyan">
        Auto-Hide Feature (Dynamic Content)
      </Text>
      <Box flexDirection="row" gap={2}>
        {/* AutoHide = true */}
        <Box flexDirection="column">
          <Text color="yellow">autoHide=true</Text>
          <Box
            flexDirection="row"
            borderStyle="single"
            height={6}
            width={24}
            borderColor="gray"
          >
            <Box flexDirection="column" flexGrow={1}>
              {items.slice(scrollOffset, scrollOffset + 4).map((item, i) => {
                // Only show items that exist within dynamicContentHeight
                const itemIndex = scrollOffset + i;
                if (itemIndex >= dynamicContentHeight)
                  return <Text key={i}> </Text>;
                return <Text key={i}>{item}</Text>;
              })}
            </Box>
            <ScrollBar
              placement="inset"
              style="block"
              contentHeight={dynamicContentHeight}
              viewportHeight={4}
              scrollOffset={scrollOffset}
              autoHide={true}
            />
          </Box>
          <Text dimColor>
            {dynamicContentHeight <= 4 ? "Hidden (fits)" : "Visible (overflow)"}
          </Text>
        </Box>

        {/* AutoHide = false */}
        <Box flexDirection="column">
          <Text color="yellow">autoHide=false</Text>
          <Box
            flexDirection="row"
            borderStyle="single"
            height={6}
            width={24}
            borderColor="gray"
          >
            <Box flexDirection="column" flexGrow={1}>
              {items.slice(scrollOffset, scrollOffset + 4).map((item, i) => {
                const itemIndex = scrollOffset + i;
                if (itemIndex >= dynamicContentHeight)
                  return <Text key={i}> </Text>;
                return <Text key={i}>{item}</Text>;
              })}
            </Box>
            <ScrollBar
              placement="inset"
              style="block"
              contentHeight={dynamicContentHeight}
              viewportHeight={4}
              scrollOffset={scrollOffset}
              autoHide={false}
            />
          </Box>
          <Text dimColor>
            {dynamicContentHeight <= 4 ? "Track only" : "Thumb & Track"}
          </Text>
        </Box>
      </Box>
      <Text>Content Height: {dynamicContentHeight} / Viewport: 4</Text>
    </Box>
  );

  return (
    <Box flexDirection="column" padding={2}>
      {scene === "border" && renderBorderScene()}
      {scene === "inset" && renderInsetScene()}
      {scene === "autohide" && renderAutoHideScene()}
    </Box>
  );
};

const StyleDemo = ({
  style,
  label,
  offset,
  placement,
  borderStyle,
}: {
  style: ScrollBarStyle;
  label: string;
  offset: number;
  placement: "right" | "inset";
  borderStyle?: any;
}) => {
  const visibleItems = items.slice(offset, offset + VIEWPORT_HEIGHT);

  if (placement === "inset") {
    return (
      <Box flexDirection="column">
        <Text color="yellow">{label}</Text>
        <Box
          flexDirection="row"
          borderStyle={borderStyle}
          height={VIEWPORT_HEIGHT + 2}
          width={16}
        >
          <Box flexDirection="column" flexGrow={1}>
            {visibleItems.map((item, i) => (
              <Text key={i}>{item}</Text>
            ))}
          </Box>
          <ScrollBar
            placement="inset"
            style={style}
            contentHeight={CONTENT_HEIGHT}
            viewportHeight={VIEWPORT_HEIGHT}
            scrollOffset={offset}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      <Text color="yellow">{label}</Text>
      <ScrollBarBox
        height={VIEWPORT_HEIGHT + 2}
        width={16}
        borderStyle={style as any}
        scrollBarPosition="right"
        contentHeight={CONTENT_HEIGHT}
        viewportHeight={VIEWPORT_HEIGHT}
        scrollOffset={offset}
      >
        <Box flexDirection="column">
          {visibleItems.map((item, i) => (
            <Text key={i}>{item}</Text>
          ))}
        </Box>
      </ScrollBarBox>
    </Box>
  );
};

render(<AutoDemo />, { incrementalRendering: true });
