# Search

UX guidance for search interactions.

## Global Search

- Placement: header right — icon expanding to input or persistent field
- Placeholder describes scope ("Search projects…")
- Submit on Enter; optional search button for accessibility
- Clear button when query present

## Page-Level Search

- Full-width input above results list
- Debounce 300ms for live search — show loading indicator
- Minimum 2 characters before search optional — document per product

## Results

| Result | Pattern |
|--------|---------|
| Matches | Highlight query term in title (accessible — do not rely on color alone) |
| No results | Empty state with suggestion to broaden query |
| Loading | Skeleton list or spinner in results region |
| Error | Retry with message |

## Autocomplete (Optional Phase)

- Listbox below input — keyboard navigable
- `aria-autocomplete`, `aria-expanded`, active option `aria-selected`
- Limit suggestions to 8 items

## Mobile

- Full-screen search overlay acceptable for global search
- Sticky search bar above results when scrolling long lists

## Accessibility

- `role="search"` on form
- Label visually hidden or placeholder not sole label — use `aria-label`
- Announce result count on live search update

## Bootstrap Mapping

Input: `.form-control`, `.input-group`, search icon `.bi-search`

Results list: `.list-group` or `.table`

## Future Notes

Search combobox as dedicated component — API unchanged when replacing Bootstrap markup.
