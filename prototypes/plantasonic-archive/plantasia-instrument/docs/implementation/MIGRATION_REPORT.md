# Migration Report

## Summary

The repository has been reorganized into a clean active split:

| Area | Role |
| --- | --- |
| Root Plantasia folders | Product strategy, brand, design-system docs, prototypes, assets, app source, tests, and implementation notes. |
| `ai-product-framework/` | Reusable product-agnostic framework, foundation standards, templates, examples, system docs, and Bootstrap implementation references. |
| `docs/implementation/legacy/ai-native-design-system/` | Preserved legacy reference material from the previous top-level `ai-native-design-system/` tree. |

The repository is not currently initialized as Git, so file history could not be preserved with `git mv`. Files were moved in place where possible and the limitation is documented here.

## Files Moved

| From | To | Reason |
| --- | --- | --- |
| `ai-product-framework/docs/brand/ASCII_GRAMMAR.md` | `docs/design-system/ASCII_GRAMMAR.md` | Plantasia-specific ASCII grammar belongs to the product design system. |
| `ai-product-framework/foundation/bootstrap/CUSTOM.css` | `src/styles/plantasia.css` | Plantasia-specific organism, ASCII, and botanical styling belongs to product source. |
| `ai-product-framework/foundation/bootstrap/CUSTOM_VARIABLES.scss` | `src/tokens/plantasia-bootstrap.scss` | Plantasia-specific Bootstrap token values belong to product tokens. |
| `ai-product-framework/foundation/bootstrap/STARTER_TEMPLATE.html` | `prototypes/plantasia-bootstrap-starter.html` | Plantasia-specific starter markup is a product prototype, not a framework starter. |
| `DESIGN_SYSTEM_MAP.md` | `docs/design-system/DESIGN_SYSTEM_MAP.md` | Product design-system mapping belongs in product docs. |
| `ai-product-framework/foundation/design-system/MOTION.md` | `ai-product-framework/foundation/motion/MOTION.md` | Reusable motion standards now live in the requested foundation `motion/` folder. |
| `ai-product-framework/foundation/design-system/ACCESSIBILITY.md` | `ai-product-framework/foundation/accessibility/ACCESSIBILITY.md` | Reusable accessibility standards now live in the requested foundation `accessibility/` folder. |
| `ai-native-design-system/` | `docs/implementation/legacy/ai-native-design-system/` | Preserved legacy design-system material while removing the third top-level product-like tree. |

## Files Renamed

| Original | New Name |
| --- | --- |
| `CUSTOM.css` | `plantasia.css` |
| `CUSTOM_VARIABLES.scss` | `plantasia-bootstrap.scss` |
| `STARTER_TEMPLATE.html` | `plantasia-bootstrap-starter.html` |

## Files Created

| Path | Purpose |
| --- | --- |
| `docs/implementation/REPOSITORY_AUDIT.md` | Pre-migration repository audit. |
| `docs/implementation/MIGRATION_REPORT.md` | Migration summary and remaining recommendations. |
| `README.md`, `CHANGELOG.md`, `ROADMAP.md`, `LICENSE`, `.gitignore` | Required root project files. |
| `docs/product/*` | Plantasia product documentation skeleton. |
| `docs/brand/*` | Plantasia brand documentation skeleton. |
| `docs/design-system/*` | Plantasia design-system documentation skeleton. |
| `docs/case-study/*` | Plantasia case-study documentation skeleton. |
| `assets/*`, `figma/`, `prototypes/`, `public/`, `src/*`, `tests/` | Required product folders with README guidance. |
| `ai-product-framework/foundation/bootstrap/CUSTOM.css` | Restored generic framework branding override example. |
| `ai-product-framework/foundation/bootstrap/CUSTOM_VARIABLES.scss` | Restored generic framework Bootstrap variables example. |
| `ai-product-framework/foundation/bootstrap/STARTER_TEMPLATE.html` | Restored generic framework Bootstrap starter template. |
| `ai-product-framework/assets/`, `foundation/motion/`, `foundation/accessibility/` | Required reusable framework folders. |
| Folder `README.md` files | Purpose, contents, relationships, and AI usage guidance for each active folder. |

## Files Left Unchanged

The following existing framework areas were preserved except for path/link updates where required:

- `ai-product-framework/README.md`
- `ai-product-framework/AGENTS.md`
- `ai-product-framework/system/`
- `ai-product-framework/templates/`
- `ai-product-framework/examples/`
- `ai-product-framework/foundation/tokens/`
- `ai-product-framework/foundation/typography/`
- `ai-product-framework/foundation/components/`
- `ai-product-framework/foundation/patterns/`
- `ai-product-framework/foundation/branding/`
- `ai-product-framework/foundation/icons/`
- `ai-product-framework/foundation/figma/`
- `VISION.md`

The archived legacy tree under `docs/implementation/legacy/ai-native-design-system/` was moved as a whole and not rewritten.

## Internal Links Updated

- `prototypes/plantasia-bootstrap-starter.html` now links to `../src/styles/plantasia.css`.
- `docs/design-system/DESIGN_SYSTEM_MAP.md` now points to `src/tokens/plantasia-bootstrap.scss` and `src/styles/plantasia.css`.
- `src/styles/plantasia.css` now references `docs/design-system/MOTION.md`.
- `src/tokens/plantasia-bootstrap.scss` now references Plantasia docs under `docs/design-system/`.
- Framework references to motion/accessibility now point to `foundation/motion/` and `foundation/accessibility/`.
- `ai-product-framework/docs/README.md` no longer references Plantasia.

## Remaining Recommendations

1. Initialize Git for `plantasia-instrument` before further structural work so future moves preserve history with `git mv`.
2. Decide whether the archived `docs/implementation/legacy/ai-native-design-system/` material should be merged into `ai-product-framework/`, partially promoted, or kept as historical reference.
3. Fill the new Plantasia documentation skeletons with real product decisions only as development continues.
4. When application code is added, keep organism implementation under `src/organism/`; do not introduce a `visualizer/` folder unless it is explicitly non-instrument diagnostic tooling.
5. Keep `ai-product-framework/` product agnostic. Any Plantasia-specific tokens, ASCII rules, brand language, presets, audio logic, or prototype markup should stay outside the framework.

