# Page Layouts

UX guidance for common page structures.

## App Shell

- Persistent header with brand and primary nav
- Optional sidebar for apps with 5+ top-level sections
- Main content: `<main>` with max-width container or fluid for dashboards
- Footer optional in apps — required for marketing pages

**Mobile:** collapse nav to toggler or offcanvas; main content full width with `space/3` horizontal padding.

## Landing Pages

- Hero: H1, lead, primary CTA, optional secondary CTA
- Social proof or feature grid below fold
- Single primary action above fold
- Avoid auto-playing video with sound

Sections: hero → value props (3 columns at lg) → CTA band → footer.

## Marketing vs App

| Aspect | Marketing | App |
|--------|-----------|-----|
| Container | `.container` | `.container` or fluid dashboard |
| Nav | Anchor links + CTA | App navbar |
| Density | Airy | Efficient |
| Footer | Full | Minimal |

## Authentication

- Centered card on neutral background — max-width ~400px
- Logo above form
- Fields: email/username, password; remember me optional
- Primary submit full width
- Secondary links: forgot password, sign up — below form
- Error: alert at top of card — not toast only
- No sidebar or distracting nav

## Settings

- Page title + optional description
- Vertical sections with H2 headings
- Related fields grouped; save at section end or sticky footer bar on long pages
- Destructive settings (delete account) isolated at bottom with danger button

## Content Pages

- Article width ~65ch for long text
- Table of contents for docs (optional sidebar at lg)

## Error Pages (404, 500)

- Clear status and plain-language explanation
- Primary action: go home or retry
- No stack traces for users

## Responsive Rules

- Mobile-first column stack
- Sidebars become offcanvas or top tabs at `md` breakpoint
- Sticky headers: avoid covering focused inputs (scroll padding)

## Bootstrap Mapping

Shell: `.navbar`, `.container`, `.row`, `.col`, `.offcanvas`

Auth card: `.card`, `.card-body`, centered `.row justify-content-center`

## Future Notes

Layout primitives: `AppShell`, `PageHeader`, `PageSection` — Bootstrap grid replaced by custom layout tokens.
