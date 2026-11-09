# Tags

## Purpose

Compact labels for status, category, count, or metadata — not primary actions.

## Usage

- One or two tags per list item maximum for scanability
- Status tags use status color tokens
- Neutral tags for categories
- Do not use tags as buttons unless explicitly interactive (prefer badge + link)

## Variants

| Variant | Use |
|---------|-----|
| Solid | Strong status emphasis |
| Subtle | Background tint, muted text |
| Outline | Neutral categories |
| Pill | Counts, filters |

## States

| State | Behavior |
|-------|----------|
| Default | Display only |
| Removable | Close icon with accessible label |
| Selected | Filter chips — pressed state |

## Accessibility

- Decorative tags: text content sufficient
- Removable: button with `aria-label="Remove {tag}"`
- Status: include text — not color alone

## Bootstrap Mapping

`.badge`, `.bg-primary`, `.bg-secondary`, `.bg-success`, `.bg-danger`, `.bg-warning`, `.text-dark` (on warning)

Pill: `.rounded-pill`

## Future Custom Component Notes

- `.ds-tag`, `.ds-tag--success`, `.ds-tag--removable`
- Distinguish Tag (display) from Chip (interactive filter)
