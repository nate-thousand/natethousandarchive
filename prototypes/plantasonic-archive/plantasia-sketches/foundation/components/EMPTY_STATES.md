# Empty States

## Purpose

Guide users when no content exists yet — explain what belongs here and how to add it.

## Usage

- Every primary list or dashboard panel needs an empty state
- Include: illustration or icon, heading, short explanation, primary CTA
- Tone: helpful, not blaming ("No tasks yet" not "You have nothing")
- Center content vertically in available space when panel is large

## Variants

| Variant | Use |
|---------|-----|
| First use | Onboarding — create first item |
| No results | Search/filter returned nothing |
| No permission | User cannot view content |
| Error recovery | Failed load — retry CTA |

## States

| State | Behavior |
|-------|----------|
| Empty | Default zero-data |
| Cleared | User removed all items — confirm optional |

## Accessibility

- Heading describes state (`h2` or `h3`)
- CTA is real button or link — not div
- Icon decorative with `aria-hidden="true"` if redundant with text

## Bootstrap Mapping

Card pattern: `.card`, `.card-body`, `.text-center`, `.py-5`, `.text-muted`, `.btn-primary`

Icon: Bootstrap Icons large + `aria-hidden`

## Future Custom Component Notes

- `EmptyState` props: `title`, `description`, `action`, `variant`
- Illustration slot from brand assets
- Pair with LOADING_STATES — never flash empty during fetch
