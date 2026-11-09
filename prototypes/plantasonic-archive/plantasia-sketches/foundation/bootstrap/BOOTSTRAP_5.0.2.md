# Bootstrap 5.0.2 Reference

Official docs: https://getbootstrap.com/docs/5.0/

Pin version **5.0.2** for all projects until a documented upgrade.

---

## Grid System

- 12-column flexbox grid
- Use `.container` or `.container-fluid` as the outer wrapper
- Rows: `.row`; columns: `.col`, `.col-{breakpoint}-{span}`
- Gutters via `.g-*`, `.gx-*`, `.gy-*` (Bootstrap 5 gutter utilities)

**Best practices:**

- Prefer `.container` for marketing and app shells; `.container-fluid` for full-bleed dashboards
- Nest rows only when necessary — avoid deep grid nesting
- Use column offsets (`.offset-*`) sparingly; prefer flex alignment utilities

---

## Responsive Utilities

- Breakpoints: `sm` 576px, `md` 768px, `lg` 992px, `xl` 1200px, `xxl` 1400px
- Display: `.d-none`, `.d-{bp}-block`, `.d-{bp}-flex`
- Visibility: `.visible`, `.invisible`
- Stack columns on mobile by default; add `.col-md-*` for larger layouts

---

## Utility Classes

Bootstrap utilities implement token-like spacing, color, and layout. Prefer utilities for one-off layout; use component classes for repeated UI.

Common groups: spacing (`m-*`, `p-*`), flex (`d-flex`, `justify-content-*`, `align-items-*`), text (`text-*`, `fw-*`), borders, shadows, sizing.

---

## Containers

| Class | Behavior |
|-------|----------|
| `.container` | Responsive max-width per breakpoint |
| `.container-sm` … `.container-xxl` | Container at specific breakpoint and up |
| `.container-fluid` | Full width at all breakpoints |

---

## Flex Utilities

- `.d-flex`, `.d-inline-flex`
- Direction: `.flex-row`, `.flex-column`, `.flex-{bp}-row`
- Alignment: `.justify-content-*`, `.align-items-*`, `.align-self-*`
- Wrap: `.flex-wrap`, `.flex-nowrap`
- Gap: `.gap-*` (Bootstrap 5)

Use flex utilities for component internal layout; use grid for page-level columns.

---

## Spacing Utilities

Scale: `0`, `1` (0.25rem), `2` (0.5rem), `3` (1rem), `4` (1.5rem), `5` (3rem).

- Margin: `.m-*`, `.mt-*`, `.mx-*`, `.my-*`
- Padding: `.p-*`, `.pt-*`, `.px-*`, `.py-*`
- Responsive: `.mt-md-4`, `.px-lg-5`

Map to Foundation spacing tokens in `tokens/SPACING_TOKENS.md`.

---

## Typography

- Headings: `.h1`–`.h6` or semantic `<h1>`–`<h6>`
- Body: default on `<body>`; `.lead` for intro text
- Utilities: `.text-muted`, `.text-truncate`, `.fw-bold`, `.fs-*`
- Lists: `.list-unstyled`, `.list-inline`

See `foundation/typography/TYPE_SCALE.md` for semantic type roles.

---

## Forms

- Structure: `.mb-3` groups, `.form-label`, `.form-control`, `.form-select`
- Validation: `.is-invalid`, `.invalid-feedback`, `.is-valid`
- Checks: `.form-check`, `.form-switch`
- Input groups: `.input-group`, `.input-group-text`
- Floating labels: `.form-floating` (use when spec calls for it)

Always pair inputs with labels. See `foundation/components/FORMS.md`.

---

## Buttons

- Base: `.btn`
- Variants: `.btn-primary`, `.btn-secondary`, `.btn-outline-*`, `.btn-link`
- Sizes: `.btn-sm`, `.btn-lg`
- States: `:disabled`, `.disabled`
- Groups: `.btn-group`, `.btn-toolbar`

See `foundation/components/BUTTONS.md`.

---

## Navigation

- Nav: `.nav`, `.nav-tabs`, `.nav-pills`, `.nav-link`
- Navbar: `.navbar`, `.navbar-expand-{bp}`, `.navbar-brand`, `.navbar-nav`
- Breadcrumb: `.breadcrumb`, `.breadcrumb-item`
- Pagination: `.pagination`, `.page-item`, `.page-link`

See `foundation/components/NAVIGATION.md`.

---

## Cards

- `.card`, `.card-body`, `.card-header`, `.card-footer`, `.card-title`, `.card-text`
- Layout: `.card-group`, `.card-deck` (5.0 uses grid patterns — prefer row/col for groups)

See `foundation/components/CARDS.md`.

---

## Tables

- `.table`, `.table-striped`, `.table-hover`, `.table-bordered`
- Responsive wrapper: `.table-responsive`, `.table-responsive-{bp}`
- Contextual: `.table-primary`, etc. (use sparingly)

See `foundation/components/TABLES.md`.

---

## Alerts

- `.alert`, `.alert-primary`, `.alert-success`, `.alert-danger`, `.alert-warning`, `.alert-info`
- Dismissible: `.alert-dismissible`, `.btn-close`

Use for inline page-level messages — not toasts (Bootstrap 5.0.2 has no native toast component; use custom pattern or JS plugin carefully).

---

## Modals

- Structure: `.modal`, `.modal-dialog`, `.modal-content`, `.modal-header`, `.modal-body`, `.modal-footer`
- Sizes: `.modal-sm`, `.modal-lg`, `.modal-xl`
- Requires Bootstrap JS for behavior

See `foundation/components/MODALS.md`.

---

## Collapse

- Trigger: `[data-bs-toggle="collapse"]`
- Target: `.collapse`, `.collapsing`
- Accordion: `.accordion`, `.accordion-item`, `.accordion-header`, `.accordion-button`

Requires Bootstrap JS.

---

## Dropdowns

- `.dropdown`, `.dropdown-toggle`, `.dropdown-menu`, `.dropdown-item`
- Directions: `.dropup`, `.dropend`, `.dropstart`
- Requires Bootstrap JS and Popper

---

## Offcanvas

- `.offcanvas`, `.offcanvas-start|end|top|bottom`
- Mobile navigation and filter panels
- Requires Bootstrap JS

---

## Accessibility Considerations

- Bootstrap components include baseline ARIA patterns — do not remove them
- Modals: ensure `aria-labelledby`, focus trap, Esc to close
- Dropdowns: keyboard navigation via Bootstrap JS
- Forms: use `.form-label`, validation feedback, `aria-describedby`
- Color contrast: verify after overriding `$theme-colors` in SCSS
- Test with keyboard and screen reader after customization

See `foundation/design-system/ACCESSIBILITY.md`.

---

## Rules Summary

| Rule | Detail |
|------|--------|
| Version | Bootstrap 5.0.2 only |
| Source | Never edit `bootstrap.css` / `bootstrap.min.css` |
| Variables | Override in `CUSTOM_VARIABLES.scss` |
| Branding | `CUSTOM.css` for gaps only |
| Responsive | Preserve Bootstrap breakpoint behavior |
| Components | Prefer Bootstrap over custom rebuilds |
| HTML | Semantic elements first |
| Custom CSS | Minimal — justify in handoff notes |
