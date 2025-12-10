[**ink-scroll-bar**](../README.md)

---

[ink-scroll-bar](../globals.md) / ScrollBarProps

# Interface: ScrollBarProps

Defined in: [src/ScrollBar.tsx:91](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L91)

⚙️ Props for the [ScrollBar](../functions/ScrollBar.md) component.

## Properties

### autoHide?

> `optional` **autoHide**: `boolean`

Defined in: [src/ScrollBar.tsx:176](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L176)

👻 Whether to hide the scroll bar when scrolling is not needed.

#### Remarks

Only applies to inset mode. When `true` and `contentHeight <= viewportHeight`,
the scroll bar is completely hidden.

In border mode, the track and corners are always displayed to maintain
the visual border, but the thumb is hidden when scrolling is not needed.

#### Default Value

`false`

---

### color?

> `optional` **color**: `string`

Defined in: [src/ScrollBar.tsx:192](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L192)

🌈 Color for the scroll bar characters.

#### Remarks

Accepts any color value supported by Ink's Text component,
including named colors ('red', 'blue'), hex codes ('#ff0000'),
and RGB values.

#### Example

```tsx
<ScrollBar color="cyan" ... />
<ScrollBar color="#00ff00" ... />
```

---

### contentHeight

> **contentHeight**: `number`

Defined in: [src/ScrollBar.tsx:99](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L99)

📏 Total height of the scrollable content in lines.

#### Remarks

This represents the full height of the content, including portions
that are not currently visible in the viewport.

---

### dimColor?

> `optional` **dimColor**: `boolean`

Defined in: [src/ScrollBar.tsx:203](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L203)

🌑 Whether to render the scroll bar with dimmed styling.

#### Remarks

When `true`, applies the `dimColor` prop to all Text elements,
resulting in a muted/grayed appearance.

#### Default Value

`false`

---

### placement?

> `optional` **placement**: [`ScrollBarPlacement`](../type-aliases/ScrollBarPlacement.md)

Defined in: [src/ScrollBar.tsx:127](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L127)

📍 Placement mode for the scroll bar.

#### Default Value

`'right'`

#### See

[ScrollBarPlacement](../type-aliases/ScrollBarPlacement.md) for available options

---

### scrollOffset

> **scrollOffset**: `number`

Defined in: [src/ScrollBar.tsx:118](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L118)

⬇️ Current scroll position (offset from top) in lines.

#### Remarks

A value of 0 means the content is scrolled to the top.
The maximum meaningful value is `contentHeight - viewportHeight`.

---

### style?

> `optional` **style**: [`ScrollBarStyle`](../type-aliases/ScrollBarStyle.md)

Defined in: [src/ScrollBar.tsx:138](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L138)

🎨 Visual style for the scroll bar.

#### Remarks

If not specified, defaults to `'single'` for border mode or
`'block'` for inset mode.

#### See

[ScrollBarStyle](../type-aliases/ScrollBarStyle.md) for available options

---

### thumbChar?

> `optional` **thumbChar**: `string`

Defined in: [src/ScrollBar.tsx:153](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L153)

👍 Custom character for the thumb indicator in inset mode.

#### Remarks

Only used when `placement` is `'inset'`. When specified, overrides
the thumb character defined by the style.

#### Example

```tsx
// Custom circular thumb
<ScrollBar placement="inset" thumbChar="●" trackChar="○" ... />
```

---

### trackChar?

> `optional` **trackChar**: `string`

Defined in: [src/ScrollBar.tsx:162](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L162)

🛤️ Custom character for the track background in inset mode.

#### Remarks

Only used when `placement` is `'inset'`. When specified, overrides
the track character defined by the style.

---

### viewportHeight

> **viewportHeight**: `number`

Defined in: [src/ScrollBar.tsx:109](https://github.com/ByteLandTechnology/ink-scroll-bar/blob/4391583c2e9fb0fa85e01d968fe5434953559e87/src/ScrollBar.tsx#L109)

👁️ Height of the visible viewport in lines.

#### Remarks

This is the number of lines that can be displayed at once.
The scroll bar's thumb size is proportional to the ratio
of viewportHeight to contentHeight.
