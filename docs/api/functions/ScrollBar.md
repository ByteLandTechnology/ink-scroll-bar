[**ink-scroll-bar**](../README.md)

---

[ink-scroll-bar](../globals.md) / ScrollBar

# Function: ScrollBar()

> **ScrollBar**(`props`): `Element` \| `null`

Defined in: [src/ScrollBar.tsx:420](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L420)

📜 A vertical scroll bar indicator for Ink CLI applications.

## Parameters

### props

[`ScrollBarProps`](../interfaces/ScrollBarProps.md)

Component props

## Returns

`Element` \| `null`

The rendered scroll bar, or null if hidden

## Remarks

ScrollBar displays a visual indicator of the current scroll position
within a scrollable content area. It provides visual feedback about:

- The current viewport position within the content
- The relative size of the viewport compared to total content

## Rendering Modes

**Border Mode** (`placement="left"` or `placement="right"`):

- Renders corner characters at top and bottom
- Designed to replace one side of a container's border
- When content fits the viewport, shows only the track (no thumb)
- The `autoHide` prop has no effect in this mode

**Inset Mode** (`placement="inset"`):

- No corner characters
- Designed to be placed inside the content area
- Supports `autoHide` to completely hide when scrolling is not needed
- Supports custom `thumbChar` and `trackChar` props

## Half-Line Precision

The scroll bar uses half-line precision with special Unicode characters
(╽ and ╿) to provide smoother visual feedback. Each row can represent
two discrete positions, allowing for more precise indication of scroll
position in content with many lines.

## Examples

### Border Mode (replacing container border)

```tsx
<Box flexDirection="row">
  <Box borderStyle="single" borderRight={false}>
    <Content />
  </Box>
  <ScrollBar
    placement="right"
    style="single"
    contentHeight={100}
    viewportHeight={20}
    scrollOffset={scrollOffset}
  />
</Box>
```

### Inset Mode (inside content area)

```tsx
<Box borderStyle="single">
  <Box flexDirection="row">
    <Content />
    <ScrollBar
      placement="inset"
      style="block"
      contentHeight={100}
      viewportHeight={20}
      scrollOffset={scrollOffset}
      autoHide
    />
  </Box>
</Box>
```

### Custom Characters

```tsx
<ScrollBar
  placement="inset"
  thumbChar="●"
  trackChar="○"
  color="cyan"
  contentHeight={50}
  viewportHeight={10}
  scrollOffset={scrollOffset}
/>
```

## See

- [ScrollBarProps](../interfaces/ScrollBarProps.md) for prop documentation
- [ScrollBarBox](ScrollBarBox.md) for a container with integrated scroll bar
