# Form Patterns

UX guidance for multi-field flows beyond single controls (see `components/FORMS.md`).

## Simple Form

- Single column, labels above inputs
- Primary submit at bottom left or full width on mobile
- Cancel as link or secondary button — returns without saving

## Multi-Section Form

- Sections with H2 or card headers
- Progress indicator for 3+ steps (stepper or "Step 2 of 4")
- Save draft optional — document in product requirements
- Validation per step before advancing

## Wizard

- One section visible at a time
- Back / Next / Submit in footer bar
- Summary step before final submit for irreversible actions

## Inline Edit

- Read view default; edit on explicit "Edit" action
- Save / Cancel inline — avoid auto-save without indicator

## Field-Level Help

- Hint below label — `.form-text`
- Errors replace hint when invalid
- Link to docs for complex fields

## Destructive Forms

- Confirm password or type-to-confirm for delete account
- Danger button separated from primary save

## Error Handling

| Level | Pattern |
|-------|---------|
| Field | Inline `.invalid-feedback` |
| Form | Alert at top summarizing errors + focus first invalid |
| Server | Preserve user input; show actionable message |

## Loading

- Disable submit with spinner during POST
- Prevent double submit

## Accessibility

- Tab order follows visual order
- Error summary: `role="alert"` on submit failure
- Required fields marked consistently

## Bootstrap Mapping

Sections: `.card` per section or `fieldset` + `legend`

Stepper: custom markup with `.nav-pills` or progress `.progress`

Alerts: `.alert-danger` for form-level errors

## Future Notes

`Form`, `FormSection`, `FormActions` compound components — wizard state machine independent of Bootstrap.
