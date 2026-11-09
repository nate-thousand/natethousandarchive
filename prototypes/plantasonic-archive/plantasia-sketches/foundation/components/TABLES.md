# Tables

## Purpose

Display structured data for scanning, comparison, and row actions.

## Usage

- Use when data is tabular — not for layout
- Wrap in `.table-responsive` when columns exceed viewport
- Prefer zebra or hover — not both heavily styled
- Row actions: icon buttons or dropdown at row end

## Variants

| Variant | Use |
|---------|-----|
| Default | Standard data |
| Striped | Long lists |
| Hover | Interactive rows |
| Bordered | Dense reference data |
| Small | Compact dashboards |

## States

| State | Behavior |
|-------|----------|
| Default | Static rows |
| Selected row | Background highlight |
| Empty | See EMPTY_STATES pattern |
| Loading | Skeleton rows or spinner overlay |

## Accessibility

- `<th scope="col">` and `<th scope="row">` as appropriate
- Caption or `aria-label` describing table purpose
- Sortable columns: `aria-sort` on header buttons
- Do not use table for non-tabular layout

## Bootstrap Mapping

`.table`, `.table-striped`, `.table-hover`, `.table-sm`, `.table-responsive`, `.table-responsive-md`

## Future Custom Component Notes

- `DataTable` with sort, select, pagination slots
- Virtualization for large datasets (custom — not Bootstrap)
- Empty and loading states as composable subcomponents
