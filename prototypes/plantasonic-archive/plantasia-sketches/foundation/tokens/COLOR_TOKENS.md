# Color Tokens

Semantic color tokens — not palette names alone. Map brand colors to these roles in `CUSTOM_VARIABLES.scss`.

## Brand / Action

| Token | Purpose | Bootstrap variable |
|-------|---------|-------------------|
| `color/primary` | Primary actions, key links | `$primary` |
| `color/secondary` | Secondary actions | `$secondary` |
| `color/accent` | Highlights, badges (optional) | Custom or `$info` |

## Surfaces

| Token | Purpose | Example value |
|-------|---------|-----------------|
| `color/surface/default` | Page background | `#ffffff` |
| `color/surface/raised` | Cards, panels | `#ffffff` + shadow |
| `color/surface/sunken` | Inset areas, wells | `#f8f9fa` |
| `color/surface/overlay` | Modals, dropdowns | `#ffffff` |

Bootstrap: `$body-bg`, `$light`, card backgrounds.

## Text

| Token | Purpose | Bootstrap utility |
|-------|---------|-------------------|
| `color/text/primary` | Body text | `$body-color` |
| `color/text/secondary` | Supporting text | `.text-muted` |
| `color/text/inverse` | Text on dark surfaces | `.text-white` |
| `color/text/link` | Links | `$link-color` |

## Borders

| Token | Purpose |
|-------|---------|
| `color/border/default` | Dividers, card borders |
| `color/border/subtle` | Hairline separators |
| `color/border/focus` | Focus rings |

Bootstrap: `$border-color`.

## Status

| Token | Purpose | Bootstrap |
|-------|---------|-----------|
| `color/status/success` | Success states | `$success`, `.text-success` |
| `color/status/warning` | Warnings | `$warning` |
| `color/status/error` | Errors, destructive | `$danger` |
| `color/status/info` | Informational | `$info` |

## Rules

- Meet WCAG AA contrast for text on surfaces
- Do not use status colors for non-status decoration
- Dark mode (if added): define parallel `color/*/dark` tokens in product brand doc

## Future Custom System

Custom CSS variables example (future):

```css
:root {
  --color-primary: ...;
  --color-surface-default: ...;
}
```

Token **names** remain stable; values and implementation change.
