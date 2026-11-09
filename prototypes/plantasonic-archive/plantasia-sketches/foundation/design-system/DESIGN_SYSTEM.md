# Design System

## Vision

A cohesive, accessible product experience built from shared tokens, components, and patterns — independent of any CSS framework.

## Current State

Bootstrap 5.0.2 implements the design system in code. Tokens in `foundation/tokens/` map to Bootstrap variables via `foundation/bootstrap/CUSTOM_VARIABLES.scss`.

## Future State

A custom design system will replace Bootstrap while preserving:

- Token names and semantic meaning
- Component APIs and variants documented in `foundation/components/`
- UX patterns in `foundation/patterns/`
- Accessibility and motion standards

## Layers

| Layer | Location | Changes when migrating |
|-------|----------|------------------------|
| Principles | `design-system/` | Rarely |
| Tokens | `tokens/` | Values may refine; semantics stay |
| Components | `components/` | Bootstrap mapping column updates |
| Patterns | `patterns/` | Implementation notes only |
| Implementation | `bootstrap/` → custom | Full swap |

## Visual Language

- **Clarity** — hierarchy through typography, spacing, and contrast
- **Consistency** — reuse tokens and components; avoid one-off styling
- **Restraint** — neutral surfaces, purposeful accent color, minimal decoration
- **Density** — comfortable defaults with compact variants for data-heavy views

## Interaction Principles

- Feedback is immediate and proportional (hover, focus, loading, success, error)
- Destructive actions require confirmation
- Empty and loading states are first-class — never blank screens
- Progressive disclosure over overwhelming forms

## Component Philosophy

- Components are specified by purpose, variants, states, and accessibility — not by CSS class names
- Prefer composition (layout + component + pattern) over monolithic widgets
- Every component doc includes a Bootstrap mapping and future custom notes

## Responsive Philosophy

- Mobile-first: design for smallest viewport, enhance upward
- Content reflows; navigation adapts (collapse, offcanvas) — never horizontal scroll for primary content
- Touch targets minimum 44×44px on interactive elements
- Breakpoints align with token standards (see `tokens/README.md`)

## Migration Checklist (Future)

When replacing Bootstrap:

1. Audit `bootstrap/COMPONENT_MAPPING.md` for all Bootstrap class dependencies
2. Build custom components matching `foundation/components/` specs
3. Point token SCSS/CSS to new implementation
4. Run accessibility and responsive regression against pattern docs
5. Update Figma library to match new components
