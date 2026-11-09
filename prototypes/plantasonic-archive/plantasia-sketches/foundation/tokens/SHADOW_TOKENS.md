# Shadow Tokens

Elevation expressed through box shadows — not arbitrary z-index alone.

| Token | Use | Bootstrap |
|-------|-----|-----------|
| `shadow/none` | Flat inline elements | none |
| `shadow/sm` | Subtle lift — cards at rest | `$box-shadow-sm`, `.shadow-sm` |
| `shadow/md` | Default card elevation | `$box-shadow`, `.shadow` |
| `shadow/lg` | Modals, popovers, dropdowns | `$box-shadow-lg`, `.shadow-lg` |
| `shadow/focus` | Focus ring (prefer outline) | Custom in `CUSTOM.css` |

## Elevation Guidelines

| Level | Shadow | Examples |
|-------|--------|----------|
| 0 | none | Body, flat lists |
| 1 | sm | Cards, static panels |
| 2 | md | Hover lift, sticky subheaders |
| 3 | lg | Modals, offcanvas, menus |

## Rules

- One elevation level per layered stack context
- Modals above dropdowns — manage z-index via Bootstrap stacks
- Do not combine heavy shadow with heavy border

## Future Custom System

`--shadow-sm`, `--shadow-md`, `--shadow-lg` with same semantic names.
