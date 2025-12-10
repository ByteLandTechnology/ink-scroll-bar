[**ink-scroll-bar**](../README.md)

---

[ink-scroll-bar](../globals.md) / ScrollBarBox

# Function: ScrollBarBox()

> **ScrollBarBox**(`props`): `Element`

Defined in: [src/ScrollBarBox.tsx:171](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBarBox.tsx#L171)

📦 A Box component with an integrated scroll bar on one border.

## Parameters

### props

[`ScrollBarBoxProps`](../interfaces/ScrollBarBoxProps.md)

Component props

## Returns

`Element`

The rendered scroll bar box

## Remarks

ScrollBarBox provides a convenient way to create bordered containers
with a built-in scroll bar indicator. The scroll bar replaces one
side of the border (left or right) and displays the current scroll
position relative to the total content height.

## Features

- Seamless integration with Ink's Box component
- Automatic style matching between border and scroll bar
- Support for all Ink border styles
- Inherits border color properties for the scroll bar
- Half-line precision for smooth scroll position indication

## Color Inheritance

The scroll bar inherits border colors from the Box props:

- `borderColor` applies to both sides unless overridden
- `borderLeftColor` / `borderRightColor` for side-specific colors
- `borderDimColor` for dimmed styling

## Examples

### Basic Usage

```tsx
<ScrollBarBox
  height={12}
  borderStyle="single"
  contentHeight={50}
  viewportHeight={10}
  scrollOffset={scrollOffset}
>
  {visibleItems.map((item) => (
    <Text key={item.id}>{item.label}</Text>
  ))}
</ScrollBarBox>
```

### Left-side Scroll Bar with Colors

```tsx
<ScrollBarBox
  height={12}
  borderStyle="double"
  borderColor="cyan"
  scrollBarPosition="left"
  contentHeight={100}
  viewportHeight={10}
  scrollOffset={scrollOffset}
>
  <Content />
</ScrollBarBox>
```

### With ScrollView Integration

```tsx
const App = () => {
  const scrollRef = useRef<ScrollViewRef>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  useInput((input, key) => {
    if (key.downArrow) scrollRef.current?.scrollBy(1);
    if (key.upArrow) scrollRef.current?.scrollBy(-1);
  });

  return (
    <ScrollBarBox
      height={12}
      borderStyle="single"
      contentHeight={contentHeight}
      viewportHeight={10}
      scrollOffset={scrollOffset}
    >
      <ScrollView
        ref={scrollRef}
        onScroll={setScrollOffset}
        onContentHeightChange={setContentHeight}
      >
        {items.map((item) => (
          <Text key={item.id}>{item.label}</Text>
        ))}
      </ScrollView>
    </ScrollBarBox>
  );
};
```

## See

- [ScrollBarBoxProps](../interfaces/ScrollBarBoxProps.md) for prop documentation
- [ScrollBar](ScrollBar.md) for the underlying scroll bar component
