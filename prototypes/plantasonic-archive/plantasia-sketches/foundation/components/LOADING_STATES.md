# Loading States

## Purpose

Communicate that content is in progress — reduce perceived wait and prevent duplicate actions.

## Usage

- Initial page load: skeleton or centered spinner
- Button action: inline spinner in button (see BUTTONS)
- Table refresh: overlay or skeleton rows
- Never block entire app unless critical bootstrap

## Variants

| Variant | Use |
|---------|-----|
| Spinner | Short waits (< 3s expected) |
| Skeleton | Content-shaped placeholders |
| Progress bar | Determinate multi-step or upload |
| Inline text | "Saving…" next to field |

## States

| State | Behavior |
|-------|----------|
| Loading | Content hidden or skeleton visible |
| Loaded | Content replaces loader |
| Error | Transition to error pattern — not infinite spinner |

## Accessibility

- `aria-busy="true"` on loading region
- `aria-live="polite"` for status text updates
- Do not focus trap in loading overlay unless modal
- Respect reduced motion — prefer opacity pulse over spin when reduced

## Bootstrap Mapping

Spinners: `.spinner-border`, `.spinner-grow`, `.spinner-border-sm`

Progress: `.progress`, `.progress-bar`

Placeholder skeleton (custom in `CUSTOM.css` or future component):

```css
.placeholder { /* Bootstrap 5.0 placeholder utility if enabled */ }
```

Use `.placeholder-glow` / `.placeholder-wave` where Bootstrap placeholders are available.

## Future Custom Component Notes

- `Skeleton`, `Spinner`, `ProgressBar` with token-based animation duration
- Suspense boundaries in React map to skeleton variants here
