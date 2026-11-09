# Typography Tokens

Typography tokens define font families, sizes, weights, and line heights. See `foundation/typography/TYPE_SCALE.md` for semantic roles.

## Font Families

| Token | Use | Default stack |
|-------|-----|---------------|
| `font/family/sans` | UI and body | system-ui, sans-serif |
| `font/family/mono` | Code, IDs | ui-monospace, monospace |

Bootstrap: `$font-family-sans-serif`, `$font-family-monospace`.

## Font Sizes

| Token | Size | Use |
|-------|------|-----|
| `font/size/xs` | 0.75rem (12px) | Captions, meta |
| `font/size/sm` | 0.875rem (14px) | Secondary UI |
| `font/size/base` | 1rem (16px) | Body |
| `font/size/lg` | 1.125rem (18px) | Lead, emphasis |
| `font/size/xl` | 1.25rem (20px) | Small headings |

Heading sizes defined in TYPE_SCALE.md map to `h1`–`h6`.

## Font Weights

| Token | Weight | Use |
|-------|--------|-----|
| `font/weight/normal` | 400 | Body |
| `font/weight/medium` | 500 | UI emphasis |
| `font/weight/semibold` | 600 | Headings, labels |
| `font/weight/bold` | 700 | Strong emphasis |

Bootstrap: `$font-weight-normal`, `.fw-semibold`, `.fw-bold`.

## Line Heights

| Token | Value | Use |
|-------|-------|-----|
| `line-height/tight` | 1.25 | Headings |
| `line-height/base` | 1.5 | Body |
| `line-height/relaxed` | 1.75 | Long-form reading |

Bootstrap: `$line-height-base`, `$headings-line-height`.

## Letter Spacing

| Token | Use |
|-------|-----|
| `letter-spacing/tight` | Large headings |
| `letter-spacing/normal` | Body |
| `letter-spacing/wide` | Uppercase labels (use sparingly) |

## Rules

- Maximum two font families per product
- Body minimum 16px on mobile
- Do not use font size alone for hierarchy — combine weight and spacing

## Bootstrap Mapping

Override in `CUSTOM_VARIABLES.scss`: `$font-size-base`, `$h1-font-size`, etc.

## Future Custom System

CSS variables: `--font-size-base`, `--font-weight-semibold`, etc.
