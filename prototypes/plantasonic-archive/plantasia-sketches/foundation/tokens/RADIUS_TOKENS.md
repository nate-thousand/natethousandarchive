# Radius Tokens

Border radius scale for components and surfaces.

| Token | Value | Use |
|-------|-------|-----|
| `radius/none` | 0 | Tables flush to edge, full-bleed media |
| `radius/sm` | 0.25rem (4px) | Badges, small chips |
| `radius/md` | 0.375rem (6px) | Buttons, inputs, cards (default) |
| `radius/lg` | 0.5rem (8px) | Large cards, modals |
| `radius/xl` | 1rem (16px) | Marketing panels, hero cards |
| `radius/full` | 9999px | Pills, avatars, circular buttons |

Bootstrap: `$border-radius`, `$border-radius-sm`, `$border-radius-lg`, `.rounded-pill`.

## Rules

- One default radius (`radius/md`) for interactive components
- Cards and inputs share radius for visual alignment
- Do not mix many radius sizes on one screen

## Future Custom System

`--radius-sm`, `--radius-md`, `--radius-lg` CSS variables.
