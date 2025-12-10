[**ink-scroll-bar**](../README.md)

---

[ink-scroll-bar](../globals.md) / ScrollBarStyle

# Type Alias: ScrollBarStyle

> **ScrollBarStyle** = `BoxProps`\[`"borderStyle"`\] \| `"block"` \| `"line"` \| `"thick"` \| `"dots"`

Defined in: [src/ScrollBar.tsx:81](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L81)

🎨 Visual style for the scroll bar.

## Remarks

Available styles vary by placement mode:

**Border mode styles** (placement: 'left' | 'right'):
These match Ink's border styles for seamless integration.

- `'single'` - Single line characters (│, ┃)
- `'double'` - Double line characters (║, ┃)
- `'round'` - Rounded corners with single lines
- `'bold'` - Bold/thick line characters (┃, │)
- `'singleDouble'` - Single horizontal, double vertical
- `'doubleSingle'` - Double horizontal, single vertical
- `'classic'` - ASCII characters (|, +)
- `'arrow'` - Arrow-style indicators

**Inset mode styles** (placement: 'inset'):
Designed for use inside content areas.

- `'block'` █ - Full block characters (█/░)
- `'line'` │ - Simple line with blank track (│/ )
- `'thick'` ┃ - Thick line with dashed track (┃/╏)
- `'dots'` ● - Dot characters (●/·)

## Example

```tsx
// Border mode with bold style
<ScrollBar placement="right" style="bold" ... />

// Inset mode with block style
<ScrollBar placement="inset" style="block" ... />
```
