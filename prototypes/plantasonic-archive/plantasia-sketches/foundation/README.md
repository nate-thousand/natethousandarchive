# Foundation Module

The Foundation module establishes shared design standards, tokens, components, and patterns for every AI-assisted product project.

## Purpose

Foundation separates **what the product should look and feel like** from **how it is built**. Today, Bootstrap 5.0.2 is the default implementation layer. Tomorrow, a custom design system replaces Bootstrap without changing tokens, component specs, or UX patterns.

## Architecture

```
Design System (vision, principles, tokens)
        ↓
Bootstrap 5.0.2 (current implementation layer)
        ↓
Future Custom Design System (Bootstrap replacement)
```

## Folder Guide

| Folder | Purpose |
|--------|---------|
| `design-system/` | Long-term design vision and principles |
| `bootstrap/` | Bootstrap 5.0.2 standards, starter assets, component mapping |
| `tokens/` | Platform-agnostic design tokens |
| `typography/` | Type scale and text standards |
| `components/` | Component specifications (implementation-agnostic) |
| `patterns/` | Reusable UX patterns and page layouts |
| `figma/` | Figma library organization guidelines |
| `branding/` | Brand voice, color usage, imagery |
| `icons/` | Icon system standards |

## How Projects Use Foundation

1. Copy `foundation/` into a new product repo (or reference it from the DesignLabs repo root).
2. Apply tokens via `bootstrap/CUSTOM_VARIABLES.scss` and branding via `bootstrap/CUSTOM.css`.
3. Use `bootstrap/STARTER_TEMPLATE.html` as a static reference or starting point.
4. Implement UI using component and pattern docs — map to Bootstrap classes today, custom components later.
5. When migrating off Bootstrap, update `bootstrap/COMPONENT_MAPPING.md` targets only; tokens and component specs stay stable.

## Rules

- Bootstrap is replaceable. Never treat Bootstrap as the design system.
- Never modify Bootstrap source files.
- Override via SCSS variables first, `CUSTOM.css` for branding second.
- Document standards only in this module — no framework installs here.
