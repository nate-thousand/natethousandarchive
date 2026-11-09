# Repository Audit

## Current Structure

The repository currently contains three top-level content areas:

| Path | Current Role |
| --- | --- |
| `ai-product-framework/` | Reusable AI-assisted product framework with system prompts, templates, examples, workflow docs, and foundation standards. |
| `ai-native-design-system/` | Separate reusable Design OS / design-system documentation tree with templates, examples, rules, and foundation methodology. |
| Root Plantasia files | Product-specific Plantasia v2 files, currently `VISION.md` and `DESIGN_SYSTEM_MAP.md`. |

The intended architecture is two products:

| Product | Responsibility |
| --- | --- |
| `ai-product-framework/` | Product-agnostic reusable knowledge, standards, templates, and implementation-layer references. |
| Plantasia v2 | Product strategy, brand, ASCII system, visual language, sound/instrument concepts, app source, assets, prototypes, and case study. |

## Files In The Wrong Location

These files currently live inside `ai-product-framework/` but contain Plantasia-specific product knowledge:

| Current Path | Issue | Recommended Destination |
| --- | --- | --- |
| `ai-product-framework/docs/brand/ASCII_GRAMMAR.md` | Plantasia ASCII visual grammar and organism rules reference Plantasia directly. | `docs/design-system/ASCII_GRAMMAR.md` and `docs/brand/ASCII_GRAMMAR.md` as product documentation. |
| `ai-product-framework/foundation/bootstrap/CUSTOM.css` | Contains Plantasia tokens, organism styles, ASCII classes, dark botanical surfaces, and Plantasia class names. | `src/styles/plantasia.css` or equivalent product style layer. |
| `ai-product-framework/foundation/bootstrap/CUSTOM_VARIABLES.scss` | Contains Plantasia-specific color, typography, surface, and component token values. | `src/tokens/plantasia-bootstrap.scss` or product token layer. |
| `ai-product-framework/foundation/bootstrap/STARTER_TEMPLATE.html` | Contains Plantasia v2 title, copy, organism markup, cultivation actions, and product navigation. | `prototypes/plantasia-bootstrap-starter.html`. |
| `DESIGN_SYSTEM_MAP.md` | Correctly product-specific, but it sits at repository root instead of the requested Plantasia docs structure. | `docs/design-system/DESIGN_SYSTEM_MAP.md`. |

## Duplicate Files

No exact duplicate files were identified during the audit, but there are overlapping concepts:

| Area | Overlap |
| --- | --- |
| `ai-product-framework/foundation/` and `ai-native-design-system/design-system/` | Both describe reusable tokens, components, and patterns. |
| `ai-product-framework/templates/` and `ai-native-design-system/templates/` | Both provide reusable project/documentation templates. |
| `ai-product-framework/examples/` and `ai-native-design-system/examples/plantasia/` | Framework examples are generic; Design OS examples include Plantasia-specific example material. |

These overlaps should be preserved for now. A later consolidation pass can decide whether `ai-native-design-system/` remains a separate reusable product or is promoted/merged into `ai-product-framework/`.

## Conflicting Documentation

| Documentation | Conflict |
| --- | --- |
| `ai-product-framework/README.md` | States the framework contains no application code and is product-agnostic, but Plantasia-specific Bootstrap assets currently live under its foundation layer. |
| `ai-product-framework/foundation/bootstrap/README.md` | Defines `CUSTOM.css` as generic project branding overrides, but the current file is Plantasia-specific. |
| `ai-product-framework/foundation/README.md` | Says Foundation documents reusable standards only, while Plantasia ASCII grammar and Plantasia Bootstrap token values are currently inside the framework. |
| Root `DESIGN_SYSTEM_MAP.md` | Documents Plantasia inheritance correctly, but references framework Bootstrap files that should become generic again. |

## Recommendations

1. Move Plantasia-specific CSS, SCSS, starter markup, ASCII grammar, and design-system mapping out of `ai-product-framework/`.
2. Restore `ai-product-framework/foundation/bootstrap/` to generic Bootstrap implementation-layer examples only.
3. Create the requested Plantasia folder structure for product docs, brand docs, design-system docs, case study, assets, prototypes, source, tests, and Figma work.
4. Add README files to every new folder describing purpose, contents, relationships, and how AI should use the folder.
5. Preserve the existing `ai-native-design-system/` tree as existing work. Do not delete it during this migration.
6. Document that the repository is not currently initialized as Git, so Git history cannot be preserved with `git mv`. Use moves/copies carefully and record all migrated files in `docs/implementation/MIGRATION_REPORT.md`.

