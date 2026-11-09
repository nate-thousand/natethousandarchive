# Brand Guidelines

Per-project brand docs live in the product repo. This document defines the framework standard for what to document.

## Logo

- Primary logo (full color)
- Reverse / mono variants for dark backgrounds
- Minimum clear space: height of logomark on all sides
- Minimum display size: 24px height digital
- Do not stretch, rotate, or apply effects

Document file formats: SVG (preferred), PNG @2x for raster fallback.

## Color Usage

Map brand colors to semantic tokens — not raw hex in components.

| Brand role | Token | Usage |
|------------|-------|-------|
| Primary brand | `color/primary` | CTAs, key links, focus accents |
| Secondary | `color/secondary` | Supporting actions |
| Neutral | `color/surface`, `color/text` | Backgrounds and body text |
| Accent | `color/accent` | Highlights sparingly |

Override Bootstrap `$primary` and related variables in `CUSTOM_VARIABLES.scss`. Never hard-code brand hex in markup.

## Voice

- **Clear** — plain language, short sentences
- **Helpful** — explain next steps in empty and error states
- **Confident** — active voice; avoid hedging in UI copy
- **Human** — professional but not corporate-stiff

Avoid jargon unless the audience expects it. Match reading level to primary users.

## Imagery

- Prefer authentic photography or consistent illustration style — not mixed stock clichés
- Maintain consistent aspect ratios in cards and heroes
- Alt text required for informative images

## Illustration

- Flat or lightly dimensional — consistent stroke weight and palette
- Use brand token colors only
- Empty states and onboarding are primary illustration surfaces

## Photography

- Natural lighting, diverse representation
- Overlay text requires contrast check (4.5:1 minimum)
- Hero images: provide mobile crop guidance

## Brand Principles

1. **Token-first** — brand colors are tokens, not one-off CSS
2. **Accessible** — brand never trades off contrast or focus visibility
3. **Consistent** — one illustration/photo style per product
4. **Restrained** — one primary CTA color per view
5. **Replaceable** — brand layers on Foundation; swapping Bootstrap does not rebrand from scratch

## Project Checklist

When kicking off a product, create `brand/` or section in README with:

- [ ] Logo assets in `public/` or `assets/`
- [ ] Token overrides in `CUSTOM_VARIABLES.scss`
- [ ] Voice examples (button labels, empty states, errors)
- [ ] Imagery direction one-pager
