# Figma Structure

## File Organization

One primary Figma file per product (or per design system version). Recommended pages:

| Page | Contents |
|------|----------|
| **Cover** | Project name, version, last updated, links to Foundation docs |
| **Tokens** | Color, typography, spacing, radius, shadow swatches |
| **Icons** | Icon grid aligned with `foundation/icons/` |
| **Components** | Buttons, forms, cards, navigation, etc. |
| **Patterns** | Page layouts, dashboards, empty states |
| **Documentation** | Usage notes, do/don't examples |
| **Archive** | Deprecated components (do not delete — mark deprecated) |

## Libraries

Publish shared assets as Figma libraries:

- **Foundation Tokens** — colors, type, spacing (variables)
- **Foundation Components** — UI building blocks
- **Foundation Icons** — icon set (Bootstrap Icons baseline)

Product files consume libraries — do not detach components without reason.

## Tokens in Figma

Use Figma variables (or styles during migration) for:

- Color semantics: `color/primary`, `color/surface`, `color/text-muted`
- Spacing: `space/1` through `space/8`
- Radius: `radius/sm`, `radius/md`, `radius/lg`
- Typography: `font/size/body`, `font/weight/semibold`

Map variable names to `foundation/tokens/` documents.

## Components

- One master component per Foundation component spec
- Variants for size, state, and intent (primary, secondary, danger)
- Include accessibility annotations (focus ring, min touch target)

## Documentation Page

Each component frame should link to:

- Purpose and usage
- When not to use
- Accessibility notes
- Bootstrap mapping (for dev handoff) — separate text layer or dev notes

## Versioning

- Semantic versioning on library publishes: `1.0.0`, `1.1.0`, `2.0.0`
- Changelog in Cover page when library updates
- Breaking changes require major version bump and migration notes

## Handoff to Development

- Dev mode inspect should show token names, not hex hunting
- Reference `foundation/bootstrap/COMPONENT_MAPPING.md` in dev notes
- Export specs — do not rely on Figma alone for motion; reference `MOTION.md`
