[**@byteland/ink-scroll-bar**](../README.md)

---

[@byteland/ink-scroll-bar](../globals.md) / ScrollBarPlacement

# Type Alias: ScrollBarPlacement

> **ScrollBarPlacement** = `"left"` \| `"right"` \| `"inset"`

Defined in: [src/ScrollBar.tsx:46](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/89874aa612af74fe42dbdaa08639e9f025046fea/src/ScrollBar.tsx#L46)

📍 Placement mode for the scroll bar.

## Remarks

Determines how the scroll bar is rendered and positioned:

- `'left'` 👈 - Border mode, left side. Renders with corner characters (┌, └)
  that integrate with a container's left border.

- `'right'` 👉 - Border mode, right side. Renders with corner characters (┐, ┘)
  that integrate with a container's right border.

- `'inset'` 📥 - Inset mode. Renders without corner characters, designed to be
  placed inside the content area alongside scrollable content.

## Example

```tsx
// Border mode - replaces the right border of a container
<ScrollBar placement="right" ... />

// Inset mode - placed inside a bordered container
<Box borderStyle="single">
  <Content />
  <ScrollBar placement="inset" ... />
</Box>
```
