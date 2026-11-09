# Dashboards

UX guidance for data-dense overview screens.

## Purpose

Surface key metrics and recent activity so users orient quickly and drill into detail.

## Layout

- Top: page title + date range or global actions
- Row of metric cards (2–4 columns at lg) — single primary KPI per card
- Main panel: chart or table (8 cols) + secondary panel (4 cols) at lg
- Below: recent activity list or secondary tables

Use fluid container when many columns; otherwise `.container-fluid px-4`.

## Metric Cards

- Label (muted), value (large), delta or trend (optional)
- Sparkline optional — do not require chart for every metric
- Click-through to detail when card is interactive (whole card clickable)

## Data Tables on Dashboards

- Show 5–10 rows max with "View all" link
- Loading: skeleton rows
- Empty: mini empty state in panel — not blank panel

## Filters on Dashboards

- Global date range in header
- Panel-specific filters inline above table
- See `FILTERS.md`

## Mobile

- Stack metric cards 2-column then 1-column
- Tables horizontal scroll or card-list alternative
- Move secondary panel below primary

## Accessibility

- Charts require text summary or data table alternative
- KPI numbers readable as text — not image-only
- Live regions for auto-refresh data (`aria-live="polite"`)

## Bootstrap Mapping

Grid: `.row`, `.col-6`, `.col-lg-3`, `.col-lg-8`

Cards: `.card`, `.card-body`

Tables: `.table`, `.table-sm`, `.table-responsive`

## Future Notes

Dashboard layout templates as composable regions — swap chart library without changing grid spec.
