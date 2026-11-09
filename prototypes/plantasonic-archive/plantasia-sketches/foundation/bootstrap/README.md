# Bootstrap Implementation Layer

Bootstrap 5.0.2 is the default CSS framework for new projects. It implements Foundation tokens and component specs — it is not the design system itself.

## Contents

| File | Purpose |
|------|---------|
| `BOOTSTRAP_5.0.2.md` | Best practices and Bootstrap feature reference |
| `STARTER_TEMPLATE.html` | Minimal HTML starter linking Bootstrap 5.0.2 CDN |
| `CUSTOM_VARIABLES.scss` | SCSS overrides mapped to design tokens |
| `CUSTOM.css` | Project branding overrides only |
| `COMPONENT_MAPPING.md` | Maps Foundation components to Bootstrap classes |

## Philosophy

- Use Bootstrap 5.0.2
- Never modify Bootstrap source files
- Override variables in `CUSTOM_VARIABLES.scss` first
- Use `CUSTOM.css` only for branding gaps variables cannot cover
- Prefer Bootstrap components over custom rebuilds
- Keep custom CSS minimal

## Version Pin

Always pin **Bootstrap 5.0.2** in CDN links, npm, or package references until a deliberate upgrade is documented.
