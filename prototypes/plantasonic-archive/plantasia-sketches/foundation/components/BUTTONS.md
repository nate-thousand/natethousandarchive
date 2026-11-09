# Buttons

## Purpose

Trigger actions: submit forms, navigate, open dialogs, confirm destructive operations.

## Usage

- One primary button per view section for the main action
- Secondary actions use outline or secondary variant
- Destructive actions use danger variant with confirmation when irreversible
- Link variant for tertiary inline actions only

## Variants

| Variant | Use |
|---------|-----|
| Primary | Main CTA |
| Secondary | Alternative actions |
| Outline | Lower emphasis actions |
| Link | Inline tertiary |
| Danger | Delete, remove, irreversible |

## Sizes

| Size | Use |
|------|-----|
| Default | Standard forms and toolbars |
| Small | Dense tables, compact UI |
| Large | Marketing, mobile hero CTAs |

## States

| State | Behavior |
|-------|----------|
| Default | Ready for interaction |
| Hover | Visual feedback |
| Focus | Visible focus ring |
| Active | Pressed |
| Disabled | No interaction; `aria-disabled` or `disabled` |
| Loading | Spinner inside button; label hidden or shortened; disabled |

## Accessibility

- Use `<button type="button|submit">` for actions — not `<div>`
- Icon-only buttons require `aria-label`
- Loading state: `aria-busy="true"` and disable interaction
- Destructive: clear label text — not icon alone

## Bootstrap Mapping

`.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline-*`, `.btn-danger`, `.btn-link`, `.btn-sm`, `.btn-lg`, `.disabled`

Loading: `.spinner-border spinner-border-sm` inside disabled `.btn`.

## Future Custom Component Notes

- Component API: `intent`, `size`, `loading`, `disabled`
- Class prefix: `.ds-btn`, `.ds-btn--primary`
- Preserve variant names across migration
