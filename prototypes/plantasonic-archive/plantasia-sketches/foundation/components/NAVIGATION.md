# Navigation

## Purpose

Help users move through the product: global nav, local tabs, breadcrumbs, pagination.

## Usage

- Global: navbar with brand + primary sections; collapse to toggler on mobile
- Local: tabs or pills for same-page section switching
- Breadcrumbs for deep hierarchy (3+ levels)
- Pagination for long lists — not infinite scroll by default

## Variants

| Type | Use |
|------|-----|
| Top navbar | App shell |
| Side nav | Dense apps, dashboards |
| Tabs | Related content panels |
| Pills | Filter-like section switch |
| Breadcrumb | Hierarchy wayfinding |
| Pagination | Page through data |

## States

| State | Behavior |
|-------|----------|
| Default | Link available |
| Active | Current page/section — `aria-current="page"` |
| Disabled | Unavailable destination |
| Expanded/collapsed | Mobile menu, offcanvas |

## Accessibility

- Wrap in `<nav aria-label="...">` — distinct labels for multiple nav regions
- Active item: `aria-current="page"` or `aria-selected` for tabs
- Mobile toggler: `aria-expanded`, `aria-controls`
- Skip link to main content on app pages

## Bootstrap Mapping

Navbar: `.navbar`, `.navbar-expand-lg`, `.navbar-brand`, `.navbar-nav`, `.navbar-toggler`

Tabs: `.nav-tabs`, `.nav-link.active`

Breadcrumb: `.breadcrumb`, `.breadcrumb-item.active`

Pagination: `.pagination`, `.page-item.active`

Offcanvas mobile nav: `.offcanvas`

## Future Custom Component Notes

- `NavBar`, `NavItem`, `Breadcrumb` components with routing integration
- Active state from router — not hard-coded classes in templates
