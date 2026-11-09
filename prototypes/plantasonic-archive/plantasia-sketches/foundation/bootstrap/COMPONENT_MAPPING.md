# Component Mapping

Maps Foundation component specs to Bootstrap 5.0.2 classes. When migrating to a custom design system, replace the Bootstrap column — keep Foundation component names stable.

| Foundation Component | Bootstrap 5.0.2 | Notes |
|---------------------|-----------------|-------|
| Button — primary | `.btn .btn-primary` | |
| Button — secondary | `.btn .btn-secondary` | |
| Button — outline | `.btn .btn-outline-*` | |
| Button — link | `.btn .btn-link` | |
| Button — sizes | `.btn-sm`, `.btn-lg` | |
| Card | `.card`, `.card-body`, `.card-header`, `.card-footer` | |
| Form — text input | `.form-control` | |
| Form — select | `.form-select` | |
| Form — checkbox | `.form-check`, `.form-check-input` | |
| Form — switch | `.form-check`, `.form-switch` | |
| Form — validation | `.is-invalid`, `.invalid-feedback` | |
| Nav — tabs | `.nav`, `.nav-tabs`, `.nav-link` | |
| Nav — pills | `.nav`, `.nav-pills` | |
| Navbar | `.navbar`, `.navbar-expand-*` | |
| Breadcrumb | `.breadcrumb` | |
| Modal | `.modal`, `.modal-dialog`, `.modal-content` | Requires JS |
| Table | `.table`, `.table-responsive` | |
| Tag / Badge | `.badge`, `.bg-*` | See TAGS.md |
| Alert | `.alert`, `.alert-*` | |
| Spinner / loading | `.spinner-border`, `.spinner-grow` | See LOADING_STATES.md |
| Empty state | `.card` + typography utilities | Pattern doc |
| Dropdown | `.dropdown`, `.dropdown-menu` | Requires JS |
| Offcanvas | `.offcanvas` | Mobile nav, filters |
| Collapse / accordion | `.collapse`, `.accordion` | Requires JS |

## Custom Component Prefix (Future)

When building a custom design system, use a consistent prefix (e.g. `ds-`) for new classes:

| Foundation | Future custom |
|------------|---------------|
| Button primary | `.ds-btn .ds-btn--primary` |
| Card | `.ds-card` |
| Modal | `.ds-modal` |

Document project-specific mappings in the product repo `HANDOFF.md` during migration.
