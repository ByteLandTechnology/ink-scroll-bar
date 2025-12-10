**ink-scroll-bar**

---

# 📜 ink-scroll-bar

A customizable, high-precision vertical scroll bar component for [Ink](https://github.com/vadimdemedes/ink) CLI applications.

![License](https://img.shields.io/npm/l/ink-scroll-bar)
![Version](https://img.shields.io/npm/v/ink-scroll-bar)

## ✨ Features

- **Two Rendering Modes**:
  - **Border Mode**: Seamlessly integrates with container borders (replaces one side).

    ![Border Mode Demo](_media/border.svg)

  - **Inset Mode**: Renders inside the content area, perfect for floating scroll bars.

    ![Inset Mode Demo](_media/inset.svg)
    - Supports `autoHide`: Completely hide the scroll bar when content fits the viewport.
    - If `autoHide` is `false` (default) and content fits, only the track is shown.

    ![Auto Hide Demo](_media/autohide.svg)

- **Rich Styling**:
  - Supports all standard Ink border styles (`single`, `double`, `round`, `bold`, etc.).
  - Special inset styles (`block`, `line`, `thick`, `dots`).
  - Customizable colors and dimming.
- **Flexible Integration**:
  - Standalone `ScrollBar` component for custom layouts.
  - `ScrollBarBox` wrapper for instant bordered containers with scroll bars.
- **Auto-hide**: Option to hide the scroll bar when content fits the viewport (inset mode).

## 📦 Installation

```bash
npm install ink-scroll-bar
```

## 🚀 Usage

### Basic Usage with `ScrollBarBox`

The easiest way to use `ink-scroll-bar` is with the `ScrollBarBox` component. It wraps your content in a bordered box and handles the scroll bar positioning for you.

```tsx
import React, { useState } from "react";
import { Text } from "ink";
import { ScrollBarBox } from "ink-scroll-bar";

const MyComponent = () => {
  const [offset, setOffset] = useState(0);
  const totalItems = 50;
  const viewportHeight = 10;

  return (
    <ScrollBarBox
      height={viewportHeight + 2} // +2 for borders
      width={40}
      borderStyle="single"
      scrollBarPosition="right"
      contentHeight={totalItems}
      viewportHeight={viewportHeight}
      scrollOffset={offset}
    >
      {/* Your scrollable content here */}
      <Text>Item 1...</Text>
    </ScrollBarBox>
  );
};
```

### Advanced Usage with `ScrollBar`

For more control over layout, use the standalone `ScrollBar` component.

#### Border Mode

In border mode, the scroll bar renders corner characters to connect with adjacent borders.

```tsx
import { Box } from "ink";
import { ScrollBar } from "ink-scroll-bar";

<Box flexDirection="row">
  {/* Content Box with right border removed */}
  <Box borderStyle="single" borderRight={false}>
    <Content />
  </Box>

  {/* ScrollBar completes the border */}
  <ScrollBar
    placement="right"
    style="single"
    contentHeight={100}
    viewportHeight={20}
    scrollOffset={offset}
  />
</Box>;
```

#### Inset Mode

Inset mode renders without corners, suitable for placing _inside_ a container.

```tsx
<Box borderStyle="round" padding={1}>
  <Box flexDirection="row">
    <Content />
    <ScrollBar
      placement="inset"
      style="block" // 'block', 'line', 'thick', 'dots'
      color="cyan"
      contentHeight={100}
      viewportHeight={20}
      scrollOffset={offset}
      autoHide // Hide if content fits
    />
  </Box>
</Box>
```

## 📚 API

### `ScrollBar` Props

| Prop             | Type                           | Default              | Description                                                                           |
| ---------------- | ------------------------------ | -------------------- | ------------------------------------------------------------------------------------- |
| `contentHeight`  | `number`                       | **Required**         | 📏 Total height of the scrollable content.                                            |
| Prop             | Type                           | Default              | Description                                                                           |
| ---------------- | ------------------------------ | -------------------- | ---------------------------------------------------------------------------           |
| `contentHeight`  | `number`                       | **Required**         | 📏 Total height of the scrollable content.                                            |
| `viewportHeight` | `number`                       | **Required**         | 👁️ Height of the visible area.                                                        |
| `scrollOffset`   | `number`                       | **Required**         | ⬇️ Current scroll position (0 to max).                                                |
| `placement`      | `'left' \| 'right' \| 'inset'` | `'right'`            | 📍 Rendering mode/position.                                                           |
| `style`          | `ScrollBarStyle`               | `'single'`/`'block'` | 🎨 Visual style (see below).                                                          |
| `color`          | `string`                       | `undefined`          | 🌈 Color of the scroll bar characters.                                                |
| `dimColor`       | `boolean`                      | `false`              | 🌑 Whether to dim the scroll bar.                                                     |
| `autoHide`       | `boolean`                      | `false`              | 👻 Hide when content fits (Inset mode only). If false, shows track when content fits. |
| `thumbChar`      | `string`                       | -                    | 👍 Custom thumb character (Inset mode only).                                          |
| `trackChar`      | `string`                       | -                    | 🛤️ Custom track character (Inset mode only).                                          |

### `ScrollBarBox` Props

Inherits all [Ink Box Props](https://github.com/vadimdemedes/ink#box), plus:

| Prop                | Type                | Default      | Description                                 |
| ------------------- | ------------------- | ------------ | ------------------------------------------- |
| `contentHeight`     | `number`            | **Required** | 📏 Total height of the content.             |
| `viewportHeight`    | `number`            | **Required** | 👁️ Height of the viewport.                  |
| `scrollOffset`      | `number`            | **Required** | ⬇️ Current scroll position.                 |
| `scrollBarPosition` | `'left' \| 'right'` | `'right'`    | 📍 Which border to replace with scroll bar. |
| `scrollBarAutoHide` | `boolean`           | `false`      | 👻 Hide thumb if content fits.              |

### 🎨 Styles

**Border Mode Styles** (matches Ink borders):

- `single`, `double`, `round`, `bold`, `singleDouble`, `doubleSingle`, `classic`, `arrow`

**Inset Mode Styles**:

- `block`: █ thumb, ░ track
- `line`: │ thumb, (blank) track
- `thick`: ┃ thumb, ╏ track
- `dots`: ● thumb, · track

## 📄 License

MIT
