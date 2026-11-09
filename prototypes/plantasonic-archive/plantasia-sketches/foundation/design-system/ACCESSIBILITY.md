# Accessibility Standards

Baseline target: **WCAG 2.1 Level AA**.

## Structure

- One `h1` per page; heading levels do not skip
- Landmarks: `header`, `nav`, `main`, `footer`
- Lists use `ul`/`ol`/`dl` appropriately

## Keyboard

- All interactive elements reachable via Tab in logical order
- Visible focus indicators (Bootstrap `:focus-visible` or custom — never `outline: none` without replacement)
- Modals trap focus and restore on close
- Dropdowns and menus operable with arrow keys where Bootstrap provides behavior

## Forms

- Every input has an associated `<label>` or `aria-label`
- Required fields indicated visually and programmatically
- Error messages linked via `aria-describedby`
- Group related fields with `fieldset` and `legend`

## Color and Contrast

- Text contrast minimum 4.5:1 (normal), 3:1 (large text)
- UI component contrast minimum 3:1 against adjacent colors
- Do not rely on color alone for status — pair with icon or text

## Images and Icons

- Meaningful images: descriptive `alt`
- Decorative images: `alt=""`
- Icon-only buttons: accessible name via `aria-label` or visually hidden text

## Motion

- Honor `prefers-reduced-motion: reduce`
- No auto-playing animation essential to understanding content
- See `MOTION.md`

## Tables

- Use `<th scope="col|row">` for data tables
- Caption or `aria-label` for table purpose

## Bootstrap-Specific

- Prefer Bootstrap form validation classes with `aria-invalid` and feedback regions
- Use `.visually-hidden` for screen-reader-only text
- Test collapse, modal, dropdown, and offcanvas with keyboard and screen reader

## Testing Checklist

- [ ] Keyboard-only navigation through primary flows
- [ ] Screen reader spot-check (VoiceOver, NVDA, or equivalent)
- [ ] Zoom to 200% without horizontal scroll on main content
- [ ] Color contrast check on text and interactive states
