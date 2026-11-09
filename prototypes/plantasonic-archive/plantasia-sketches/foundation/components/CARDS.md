# Cards

## Purpose

Group related content: summaries, list items, settings sections, empty states.

## Usage

- One primary idea per card
- Use header/footer for actions or metadata
- Avoid nesting cards more than one level deep
- Prefer flat cards with shadow-sm on light backgrounds

## Variants

| Variant | Use |
|---------|-----|
| Default | Standard content block |
| Flush | List groups attached to edges |
| Horizontal | Media + content side by side (md+) |
| Borderless | Empty states on same surface as page |

## States

| State | Behavior |
|-------|----------|
| Default | Static content |
| Hover | Optional lift for clickable cards |
| Selected | Border or background emphasis |
| Disabled | Muted content, no interaction |

## Accessibility

- Clickable entire card: wrap in link or button with clear accessible name
- Do not nest interactive elements illegally (button inside link)
- Headings inside cards use appropriate level (`h2`–`h4`)

## Bootstrap Mapping

`.card`, `.card-body`, `.card-header`, `.card-footer`, `.card-title`, `.card-text`, `.border-0`, `.shadow-sm`

Horizontal: `.row`, `.col` inside card or `.card` with grid.

## Future Custom Component Notes

- Slots: `header`, `body`, `footer`, `media`
- Elevation via `shadow/sm` token
- Selected state via `aria-selected` for selectable cards
