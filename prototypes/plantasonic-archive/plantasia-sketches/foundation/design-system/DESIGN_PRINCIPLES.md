# Design Principles

## 1. Tokens Before Utilities

Define semantic tokens (primary, surface, text-muted) before picking Bootstrap classes or custom CSS. Tokens survive implementation changes.

## 2. Semantic Structure

Use semantic HTML (`main`, `nav`, `header`, `section`, `button`, `label`). Presentation layers attach to structure — not the reverse.

## 3. Accessible by Default

Accessibility is not a polish pass. Every component and pattern doc includes accessibility requirements. WCAG 2.1 AA is the baseline target.

## 4. Progressive Enhancement

Core flows work without JavaScript where possible. Enhanced interactions (modals, dropdowns, collapse) degrade gracefully.

## 5. Consistent Density

Use spacing tokens for rhythm. Related elements cluster; unrelated sections breathe. Avoid arbitrary margins.

## 6. Purposeful Motion

Motion communicates state change — not decoration. Respect `prefers-reduced-motion`. See `MOTION.md`.

## 7. Bootstrap as Implementation

Use Bootstrap components when they match the spec. Do not rebuild what Bootstrap already provides well. Do not let Bootstrap dictate naming or token semantics.

## 8. Replaceability

No business logic in CSS class names. No hard dependency on Bootstrap markup in product requirements — reference component specs instead.

## 9. Brand Within Bounds

Brand expression lives in tokens, typography, imagery, and voice — not in breaking layout or accessibility rules.

## 10. Document Decisions

When deviating from a standard, record why in the project `HANDOFF.md` and plan to reconcile with Foundation.
