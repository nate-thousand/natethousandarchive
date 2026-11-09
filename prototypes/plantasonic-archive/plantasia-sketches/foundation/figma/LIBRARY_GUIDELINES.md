# Figma Library Guidelines

## Publishing

- Publish libraries from the Foundation or product design file after token and component review
- Notify consumers before breaking changes
- Keep unpublished drafts in a `- WIP` page, not in the published library

## Naming Conventions

| Asset | Pattern | Example |
|-------|---------|---------|
| Color variable | `color/{semantic}` | `color/primary` |
| Text style | `text/{role}/{size}` | `text/heading/h1` |
| Component | `Component/{Name}` | `Component/Button` |
| Variant property | `State`, `Size`, `Intent` | Primary / Hover / Disabled |

## Component Build Rules

- Auto-layout for all components
- Min width/height respecting touch targets (44px)
- Include all states: default, hover, focus, active, disabled
- Dark mode variants when product requires (optional phase)

## Tokens vs Hard-Coded Values

- No hard-coded hex in components — bind to variables
- Spacing uses token variables only
- Typography uses text styles tied to variables

## Icons

- Use Bootstrap Icons as default glyph set in Figma (import or embed SVG grid)
- Size icons at 16px, 20px, 24px master frames
- See `foundation/icons/ICON_LIBRARY.md`

## Documentation Components

Include a **Doc / Callout** component for:

- Do
- Don't
- Accessibility note
- Dev note (Bootstrap class reference)

## Quality Checklist Before Publish

- [ ] All colors use semantic variables
- [ ] Components match `foundation/components/` specs
- [ ] Focus states visible
- [ ] Deprecated components moved to Archive page
- [ ] Cover page version incremented
- [ ] Changelog entry added

## Future Custom Design System

When Bootstrap is replaced, update dev notes and component descriptions — not token semantics. Figma library structure remains stable.
