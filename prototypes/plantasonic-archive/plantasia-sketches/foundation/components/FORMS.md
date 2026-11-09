# Forms

## Purpose

Collect user input with clear labels, validation, and accessible error feedback.

## Usage

- One column on mobile; two columns at `md+` only when fields are short and related
- Group related fields visually with spacing — use `fieldset` for semantic groups
- Show validation after submit or on blur — be consistent per product
- Required fields marked with text and `required` attribute

## Variants

| Control | Use |
|---------|-----|
| Text input | Single-line text |
| Textarea | Multi-line text |
| Select | Choose from list |
| Checkbox | Multiple selections |
| Radio | Single selection from few options |
| Switch | Binary on/off settings |
| Input group | Prefix/suffix (currency, URL) |

## States

| State | Behavior |
|-------|----------|
| Default | Empty or filled, no validation message |
| Focus | Visible focus on control |
| Valid | Optional success indicator |
| Invalid | Error message linked via `aria-describedby` |
| Disabled | Grayed out, not submitted |
| Read-only | Visible but not editable |

## Accessibility

- Every input has `<label for="id">` or `aria-label`
- Error text in `.invalid-feedback` with `aria-describedby`
- `aria-invalid="true"` on invalid fields
- Do not disable submit without explaining why

## Bootstrap Mapping

`.form-label`, `.form-control`, `.form-select`, `.form-check`, `.form-switch`, `.input-group`, `.is-invalid`, `.invalid-feedback`, `.mb-3`

## Future Custom Component Notes

- Unified `Field` wrapper: label, control, hint, error
- Validation messages from shared copy tokens
- Server and client errors use same visual pattern
