# Spacing Tokens

4px base grid. Bootstrap `$spacer` = 1rem (16px) aligns with `space/4`.

## Scale

| Token | Value | rem | Bootstrap utility |
|-------|-------|-----|-------------------|
| `space/0` | 0 | 0 | `m-0`, `p-0` |
| `space/1` | 4px | 0.25rem | `*-1` |
| `space/2` | 8px | 0.5rem | `*-2` |
| `space/3` | 16px | 1rem | `*-3` |
| `space/4` | 24px | 1.5rem | `*-4` |
| `space/5` | 32px | 2rem | `*-5` (approx) |
| `space/6` | 48px | 3rem | `*-5` Bootstrap max = 3rem |
| `space/8` | 64px | 4rem | Custom if needed |

Bootstrap 5 spacing utilities use 0–5 scale; map `space/6` and above via custom utilities or CSS variables when required.

## Usage

| Context | Recommended spacing |
|---------|---------------------|
| Inline icon to label | `space/1` or `space/2` |
| Form field vertical gap | `space/3` |
| Card internal padding | `space/4` |
| Section vertical rhythm | `space/5`–`space/6` |
| Page section separation | `space/6`–`space/8` |

## Layout Rhythm

- Related items: `space/1`–`space/2`
- Component internal padding: `space/3`–`space/4`
- Between components in a section: `space/4`–`space/5`
- Between major page sections: `space/6`+

## Rules

- Use spacing tokens — avoid arbitrary `margin: 13px`
- Prefer margin collapsing patterns (single-direction spacing in stacks)
- Responsive: reduce section spacing on mobile (`py-4` → `py-5` at `md`)

## Future Custom System

Expose as `--space-1` through `--space-8` CSS variables with identical semantic names.
