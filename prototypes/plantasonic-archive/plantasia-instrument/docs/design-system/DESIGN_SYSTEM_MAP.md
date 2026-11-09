# Plantasia v2 Design System Map

## Inherited From AI-Native Design System

Plantasia v2 uses the AI-native system as a decision framework rather than a copied component library. Bootstrap 5.0.2 remains the implementation layer for now; semantic tokens and component intentions should survive any future framework migration.

## Inherited Tokens

| Token Area | Plantasia v2 Application |
| --- | --- |
| Color | Semantic roles map to growth, spore, root, canopy, status, surface, border, and text values in `src/tokens/plantasia-bootstrap.scss` and `src/styles/plantasia.css`. |
| Typography | Monospace-first UI supports the product vision: minimal, Swiss, terminal-inspired, procedural, and generated. |
| Spacing | Bootstrap spacing utilities stay on the documented 4px-derived rhythm; organism and control surfaces use comfortable section spacing. |
| Radius | Tight default radii keep the interface restrained; larger radii are reserved for organism and major panel surfaces. |
| Elevation | Dark organic shadows create depth around living-system surfaces without heavy decoration. |
| Motion | Reduced-motion rules remain mandatory; botanical motion should be procedural and calm when introduced. |

## Inherited Components

| Component | Current Mapping |
| --- | --- |
| Button | Bootstrap `.btn` variants, tuned for lowercase cultivation actions such as plant, bloom, mutate, prune, and nourish. |
| Card / Panel | Bootstrap `.card` plus `.plantasia-control` for calm, bordered instrument controls. |
| Navigation | Bootstrap navbar with progressive layers: explore, sculpt, advanced. |
| Empty / Loading State | Cards and organism panels should always communicate system state; avoid blank screens. |
| Form Controls | Bootstrap form controls inherit dark surface and focus tokens. |

## Inherited Patterns

| Pattern | Plantasia v2 Application |
| --- | --- |
| Landing / first-run hero | Organism-first layout with controls beside or beneath the living surface. |
| Progressive disclosure | Three layers: explore, sculpt, advanced. Beginners cultivate; advanced users can reveal synthesis details. |
| AI interaction | Any generated suggestion should feel like a collaborator inside the ecosystem, not a generic chat overlay. |
| Case study / documentation | Keep product-specific learnings here; promote reusable decisions back to `ai-native-design-system` only after reuse is proven. |

## Product-Specific Decisions

- Plantasia-specific language: plant, grow, bloom, mutate, prune, cross-pollinate, connect, nourish, observe, evolve.
- The primary visual surface is a procedural ASCII organism, not an illustration or decorative visualizer.
- The interface should feel calm, meditative, mathematical, and alive.
- Botanical color, sound metaphors, oscillator behavior, and organism state belong in this product until another product needs them.

## Gaps

- A dedicated organism viewport component needs anatomy, states, accessibility behavior, and motion rules.
- Cultivation controls need a final component API once real instrument actions exist.
- Sound and visual state tokens need validation against actual synthesis parameters.

## Promotion Candidates

- Organism-first hero pattern for other generative tools.
- Progressive disclosure from simple conceptual controls to advanced technical controls.
- Monospace dark-mode instrument surface tokens if reused by another AI-native product.
