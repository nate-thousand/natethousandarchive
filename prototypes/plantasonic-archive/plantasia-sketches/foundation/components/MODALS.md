# Modals

## Purpose

Focus user attention on a single task: confirm action, short form, critical message — without leaving page context entirely.

## Usage

- Use for short interactions — not full multi-step wizards (use dedicated page or drawer)
- Always provide dismiss path (close button, Esc, backdrop click if appropriate)
- Destructive confirmations: explicit verb labels ("Delete project", not "OK")
- One modal open at a time

## Variants

| Variant | Use |
|---------|-----|
| Default | Standard dialog |
| Small | Confirmations |
| Large | Short forms, previews |
| Scrollable body | Long legal text |

## States

| State | Behavior |
|-------|----------|
| Closed | Not in tab order |
| Open | Focus trapped inside |
| Loading | Primary action shows spinner |
| Error | Inline alert in modal body |

## Accessibility

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title
- Focus moves to modal on open; restore on close
- Esc closes (unless destructive mid-process)
- Background inert while open (Bootstrap 5 handles baseline)

## Bootstrap Mapping

`.modal`, `.modal-dialog`, `.modal-content`, `.modal-header`, `.modal-body`, `.modal-footer`, `.modal-sm`, `.modal-lg`, `.btn-close`

Trigger: `data-bs-toggle="modal" data-bs-target="#id"` — requires Bootstrap JS.

## Future Custom Component Notes

- Portal-rendered overlay with focus trap hook
- Props: `open`, `onClose`, `title`, `size`
- Replace data-bs attributes with React/Vue state
