# Filters

UX guidance for narrowing lists and datasets.

## Inline Filters

- Horizontal row above content: dropdowns, date range, toggles
- "Clear all" link when any filter active
- Show active filter count or chips for applied filters

## Sidebar Filters

- Left column at lg; offcanvas on mobile with "Filters" button
- Apply button when filters are expensive; instant apply for simple toggles
- Sticky sidebar within viewport when list is long

## Filter Chips

- Applied filters shown as removable tags (see `components/TAGS.md`)
- Removing chip updates results immediately

## Sort + Filter

- Sort control separate from filters — dropdown "Sort by: Date"
- Do not hide sort inside filter panel without label

## Empty Results

- Distinguish "no data" from "no matches" — different copy
- Suggest clearing filters with one-click action

## Loading

- Disable filter controls or show subtle loading on results panel only
- Preserve filter selections during reload

## Accessibility

- Each control labeled; filter panel `aria-label="Filters"`
- Offcanvas filters: focus trap and return focus to trigger on close
- Announce result count change when filters apply

## Bootstrap Mapping

Dropdown filters: `.dropdown`, `.dropdown-menu`, `.form-check` inside menu

Offcanvas: `.offcanvas-start` for mobile filter drawer

Chips: `.badge` with close button

Date range: two `.form-control type="date"` or future date picker component

## Future Notes

`FilterBar`, `FilterChip`, `FilterDrawer` — state stored in URL query params for shareable filtered views.
