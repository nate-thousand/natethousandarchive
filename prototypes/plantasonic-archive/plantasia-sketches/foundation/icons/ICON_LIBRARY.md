# Icon Library

## Default: Bootstrap Icons

Use [Bootstrap Icons](https://icons.getbootstrap.com/) as the default icon set for all new projects. Icons align visually with Bootstrap 5.0.2 components.

Pin icon version to match project Bootstrap version when using npm or CDN.

## Sizing

| Context | Size | Class / style |
|---------|------|---------------|
| Inline with body text | 1em | `width: 1em; height: 1em` |
| Button icon | 16–20px | `.bi` with font-size utility |
| Navigation | 20–24px | Consistent within nav |
| Empty state hero | 48–64px | Decorative or semantic |
| Touch target | 44×44px min | Padding on icon-only buttons |

Use consistent sizes within a component type — do not mix 16px and 24px in the same toolbar.

## Spacing

- Icon before label: `me-1` or `me-2` (4–8px)
- Icon after label: `ms-1` or `ms-2`
- Icon-only buttons: center icon; padding creates touch target

## Accessibility

- **Decorative icons** — `aria-hidden="true"` on `<i>` or SVG
- **Meaningful icons** — visible text label OR `aria-label` on parent button/link
- **Icon-only buttons** — required accessible name

```html
<button type="button" class="btn btn-primary" aria-label="Add item">
  <i class="bi bi-plus-lg" aria-hidden="true"></i>
</button>
```

Do not rely on icon shape alone for critical meaning — pair with text when possible.

## Consistency

- One icon per action concept across the product (e.g. always `bi-trash` for delete)
- Outline vs filled: pick one style per product; document in HANDOFF.md
- Status icons paired with text or badge (success, warning, error)

## Bootstrap Icons Usage

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">

<i class="bi bi-check-circle"></i>
```

Prefer SVG sprite or icon font consistently — not both mixed without reason.

## Future Custom Design System

Custom icon set may replace Bootstrap Icons. Maintain:

- Same size scale
- Same accessibility rules
- Mapping table in product repo (old icon → new icon)

Foundation component specs reference icon **roles** (add, delete, search) — not glyph names tied to Bootstrap forever.
