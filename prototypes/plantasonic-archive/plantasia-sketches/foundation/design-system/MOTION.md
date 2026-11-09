# Motion Standards

Motion supports understanding — loading, transition, feedback — without distracting from tasks.

## Principles

- **Purposeful** — animate state changes, not decoration
- **Fast** — UI feedback under 300ms; page transitions under 500ms
- **Respectful** — disable non-essential motion when `prefers-reduced-motion: reduce`

## Token Reference

| Token | Duration | Use |
|-------|----------|-----|
| `transition-fast` | 150ms | Hover, focus color changes |
| `transition-base` | 250ms | Expand/collapse, dropdown open |
| `transition-slow` | 400ms | Modal enter, large panel slide |

Easing: ease-out for enter, ease-in for exit, ease-in-out for repositioning.

## Bootstrap Mapping

| Interaction | Bootstrap |
|-------------|-----------|
| Collapse | `.collapse` transition |
| Modal | `.fade` + `.modal` |
| Dropdown | `.dropdown-menu` show transition |
| Alerts dismiss | `.fade` |

Do not add custom animation libraries for standard Bootstrap behaviors.

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Include this pattern in project `CUSTOM.css` when adding non-Bootstrap animations.

## Loading States

- Prefer skeleton placeholders or Bootstrap spinners over blocking full-page animation
- Do not animate content that users need to read immediately

## Future Custom System

Custom components should read duration and easing from the same token names. Implementation changes; token semantics stay.
