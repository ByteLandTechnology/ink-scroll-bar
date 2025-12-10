[**ink-scroll-bar**](README.md)

---

# ink-scroll-bar

ink-scroll-bar - Scroll bar components for Ink CLI applications.

This package provides visual scroll bar indicators for terminal user interfaces
built with Ink. It includes:

- [ScrollBar](functions/ScrollBar.md) - A standalone scroll bar indicator component
- [ScrollBarBox](functions/ScrollBarBox.md) - A container with integrated scroll bar

## Example

```tsx
import { ScrollBar, ScrollBarBox } from 'ink-scroll-bar';

// Standalone scroll bar
<ScrollBar
  placement="right"
  style="single"
  contentHeight={100}
  viewportHeight={20}
  scrollOffset={scrollOffset}
/>

// Container with integrated scroll bar
<ScrollBarBox
  borderStyle="single"
  contentHeight={100}
  viewportHeight={20}
  scrollOffset={scrollOffset}
>
  <Content />
</ScrollBarBox>
```

## Interfaces

- [ScrollBarBoxProps](interfaces/ScrollBarBoxProps.md)
- [ScrollBarProps](interfaces/ScrollBarProps.md)

## Type Aliases

- [ScrollBarPlacement](type-aliases/ScrollBarPlacement.md)
- [ScrollBarStyle](type-aliases/ScrollBarStyle.md)

## Functions

- [ScrollBar](functions/ScrollBar.md)
- [ScrollBarBox](functions/ScrollBarBox.md)
