# Design Tokens

Platform-agnostic tokens define the visual language. Implementation (Bootstrap today, custom tomorrow) maps to these names — tokens do not change when Bootstrap is replaced.

## Token Categories

| Document | Tokens |
|----------|--------|
| `COLOR_TOKENS.md` | Semantic colors, surfaces, borders, status |
| `TYPOGRAPHY_TOKENS.md` | Font families, sizes, weights, line heights |
| `SPACING_TOKENS.md` | Spacing scale and layout rhythm |
| `RADIUS_TOKENS.md` | Border radius scale |
| `SHADOW_TOKENS.md` | Elevation and shadows |

## Additional Standards

### Elevation

Elevation is expressed through shadow tokens (`shadow/sm`, `shadow/md`, `shadow/lg`). Higher elevation = larger shadow — not arbitrary z-index stacks.

### Transitions

See `foundation/design-system/MOTION.md`:

- `transition/fast` — 150ms
- `transition/base` — 250ms
- `transition/slow` — 400ms

### Breakpoints

Responsive breakpoints (align with Bootstrap 5.0.2 defaults):

| Token | Min width | Use |
|-------|-----------|-----|
| `breakpoint/sm` | 576px | Large phones |
| `breakpoint/md` | 768px | Tablets |
| `breakpoint/lg` | 992px | Desktops |
| `breakpoint/xl` | 1200px | Large desktops |
| `breakpoint/xxl` | 1400px | Wide screens |

Design mobile-first; add layout complexity at `md` and `lg` unless product requires otherwise.

## Usage Rules

1. Reference token **names** in specs and Figma — not raw values in component docs
2. Override values in `bootstrap/CUSTOM_VARIABLES.scss` for Bootstrap projects
3. Do not invent one-off tokens without documenting them
4. When migrating off Bootstrap, keep token names; update implementation mapping only

## Bootstrap Mapping

| Token category | Bootstrap variable prefix |
|----------------|---------------------------|
| Color | `$primary`, `$body-bg`, `$theme-colors` |
| Typography | `$font-*`, `$headings-*` |
| Spacing | `$spacer`, utilities `m-*` / `p-*` |
| Radius | `$border-radius-*` |
| Shadow | `$box-shadow-*` |
| Breakpoints | `$grid-breakpoints` |
