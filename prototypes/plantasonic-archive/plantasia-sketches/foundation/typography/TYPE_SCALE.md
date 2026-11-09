# Type Scale

Semantic type roles — independent of Bootstrap class names.

## Page Titles

| Role | Size (approx) | Weight | Use |
|------|---------------|--------|-----|
| Display | 2.5–3rem | Semibold | Marketing hero (rare in app UI) |
| H1 | 2rem | Semibold | Page title — one per page |
| H2 | 1.5rem | Semibold | Major sections |
| H3 | 1.25rem | Semibold | Subsections, card titles |
| H4 | 1.125rem | Medium | Group labels |
| H5 | 1rem | Medium | Compact section labels |
| H6 | 0.875rem | Medium | Eyebrow, overline |

Bootstrap: `<h1>`–`<h6>`, `.display-*` for marketing.

## Body

| Role | Size | Weight | Use |
|------|------|--------|-----|
| Body | 1rem | Normal | Default paragraph |
| Body small | 0.875rem | Normal | Secondary content |
| Lead | 1.125rem | Normal | Intro under page title |
| Caption | 0.75rem | Normal | Timestamps, footnotes |

Bootstrap: `.lead`, `.small`, `.text-muted` for secondary.

## UI Text

| Role | Size | Weight | Use |
|------|------|--------|-----|
| Label | 0.875rem | Medium | Form labels |
| Button | 1rem (0.875 sm) | Medium | Button labels |
| Nav | 1rem | Normal / Medium active | Navigation links |
| Badge | 0.75rem | Semibold | Tags, counts |

## Code

| Role | Font | Use |
|------|------|-----|
| Inline code | Mono | `code`, snippets |
| Code block | Mono | Multi-line examples |

Bootstrap: `<code>`, `.font-monospace`.

## Hierarchy Rules

- One H1 per page
- Do not skip heading levels for styling — use CSS classes if visual skip needed
- Prefer spacing over smaller headings for separation
- Truncate long titles with `.text-truncate` and provide full text in tooltip if needed

## Responsive

- Reduce Display and H1 on mobile (`display-6`, `fs-4` at sm)
- Maintain 16px minimum body on all viewports

## Bootstrap Mapping

| Role | Bootstrap |
|------|-----------|
| H1 | `h1` or `.h1` |
| Lead | `.lead` |
| Muted secondary | `.text-muted` |
| Truncate | `.text-truncate` |

## Future Custom System

Apply roles via `.ds-text-h1`, `.ds-text-body` — mapped from this scale, not from Bootstrap headings directly.
