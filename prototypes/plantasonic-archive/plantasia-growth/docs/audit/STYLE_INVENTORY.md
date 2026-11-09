# Style Inventory

## Active Theme

The current active visual system is a black/white/neon-green terminal-inspired theme defined in `custom.css`.

The aesthetic is:

- Full-screen dark stage.
- Minimal black surfaces.
- White or off-white type.
- Neon green reserved for active, hover, focus, glow, and highlighted states.
- ASCII/terminal influence in the welcome screen and Juno visuals.
- Mostly flat surfaces with subtle borders, blur, and shadows.

## Active Color Tokens

Primary tokens in `custom.css`:

- `--color-bg`: `#0a0a0a`
- `--color-neon`: `#39ff14`
- `--color-neon-hover`: `#5dff3f`
- `--color-neon-muted`: `rgba(57, 255, 20, 0.55)`
- `--color-neon-glow`: `rgba(57, 255, 20, 0.42)`
- `--color-primary`: neon alias
- `--color-primary-hover`: hover neon alias
- `--color-primary-muted`: muted neon alias
- `--color-text`: `#f5f5f5`
- `--color-text-secondary`: `rgba(245, 245, 245, 0.58)`
- `--color-surface-raised`: `#141414`
- `--color-surface-sunken`: `#050505`
- `--color-surface-overlay`: `rgba(10, 10, 10, 0.97)`
- `--color-border`: `rgba(245, 245, 245, 0.14)`
- `--color-border-subtle`: `rgba(245, 245, 245, 0.08)`
- `--color-focus`: neon alias
- `--welcome-green`: neon alias
- `--welcome-green-dim`: `#2ee012`
- `--welcome-bg`: `#050505`
- `--welcome-glow`: neon glow alias

Additional hard-coded colors appear in CSS and canvas code:

- `#000000`
- `#111111`
- `#e8e8e8`
- `#ff9a5c`
- `#8fbc8f`
- `#ffb347`
- `#4ecdc4`
- `#82c8b8`
- `#58aca2`
- Juno palette RGB values for center, gold, inner, outer, stem, leaf, neon, and gray.

## Bootstrap Variable Overrides

`custom.css` maps the active theme into Bootstrap variables:

- Body background, color, font family, font size, line height.
- Primary/success set to neon green.
- Secondary/dark/light/status colors overridden.
- Link color and hover color.
- Border widths/radii.
- Bootstrap shadows.
- Bootstrap monospace font.

Bootstrap component overrides are used for:

- `.btn-primary`
- `.btn-outline-light`
- `.btn-outline-danger`
- `.form-control`
- `.form-select`
- `.form-range`
- `.form-label`
- `.card`
- `.text-muted`

## Typography

Active base font:

- `Inter`, loaded from Google Fonts, with system fallbacks.

Active monospace usage:

- `ui-monospace`, `Cascadia Code`, Menlo, Consolas, monospace for welcome ASCII, play-guide key labels, diagnostics, and canvas glyph rendering.

Older/alternate typography:

- `foundation/bootstrap/CUSTOM.css` imports `Roboto Mono` and sets it as the base font.
- `plantasia-vines.css` assumes the foundation token names and likely belongs to an earlier visual direction.

## Font Sizes

Tokenized sizes in `custom.css`:

- `--font-size-xs`: `0.75rem`
- `--font-size-sm`: `0.875rem`
- `--font-size-base`: `1rem`
- `--font-size-lg`: `1.125rem`

Hard-coded sizes also appear:

- Toolbar buttons around 13px.
- Drawer title 20px.
- Drawer subtitle 12px.
- Section titles 10px.
- Parameter labels 13px.
- Transport buttons 14px.
- Welcome ASCII `clamp(8px, 1.05vw, 12px)`.
- Welcome CTA `clamp(0.7rem, 2.4vw, 0.875rem)`.
- MPK legend text from 0.55rem to 0.6875rem.

## Spacing

Active spacing tokens:

- `--space-1`: `0.5rem`
- `--space-2`: `1rem`
- `--space-3`: `1.5rem`
- `--space-4`: `2rem`
- `--space-5`: `2.5rem`

Hard-coded spacing also appears throughout:

- Toolbar 8px/14px button padding.
- Drawer width 360px.
- Drawer header padding `1rem 20px`.
- Drawer sections `12px 20px 16px`.
- Drawer scroll padding `8px 0`.
- Parameter row gap 12px.
- Slider thumb size 12px.
- MPK pad minimum height 44px.
- Modal width 420px.

Older foundation spacing uses a different scale:

- `--space-1`: `0.25rem`
- `--space-2`: `0.5rem`
- `--space-3`: `1rem`
- `--space-4`: `1.5rem`
- `--space-5`: `2rem`

## Radius

Active radius tokens:

- `--radius-sm`: `0.25rem`
- `--radius-md`: `0.375rem`
- `--radius-lg`: `0.5rem`
- `--radius-xl`: `0.75rem`

Hard-coded radius values:

- Slider tracks `2px`.
- Selects `4px`.
- Some older/alternate styles use larger bottom-sheet radii such as 20px, 28px.

## Shadows And Glow

Active shadow tokens:

- `--shadow-sm`: `0 1px 3px rgba(0, 0, 0, 0.45)`
- `--shadow-md`: `0 2px 12px rgba(0, 0, 0, 0.55)`
- `--shadow-lg`: `0 8px 32px rgba(0, 0, 0, 0.65)`
- `--shadow-glow`: `0 0 18px var(--color-neon-glow)`

Other glow/shadow patterns:

- Welcome ASCII multiple neon text shadows.
- Play-guide panel combines `--shadow-lg` with subtle neon glow.
- Canvas glyphs use shadow blur for neon characters.
- EQ waveform uses canvas shadow blur driven by brightness and echo.

## Layout Patterns

- Full viewport app using `100vh` and `100dvh`.
- Absolute/fixed canvas stage.
- Fixed top-right toolbar.
- Fixed right-side drawer on desktop.
- Bottom sheet-like full-width drawer behavior on small screens.
- Floating diagnostics panel with blurred overlay surface.
- Drawer sections separated by subtle borders.
- Parameter rows with fixed-width labels and flexible controls.
- Responsive collapse of parameter rows into vertical stacks under 700px.
- MIDI grid changes from two columns to one column under 700px.
- MPK legend uses 4-column grids.

## Repeated Component Styles

Repeated patterns suitable for design-system extraction:

- Icon/close button.
- Neon active button state.
- Outline button hover/focus state.
- Parameter row: label + slider/select.
- Drawer section.
- Collapsible section header.
- Floating inspector panel.
- Modal panel with header/body.
- Toolbar button.
- MPK pad/knob legend item.
- Range slider styling.

## Motion Styles

CSS motion:

- Welcome ASCII flicker keyframes.
- Welcome CTA pulse keyframes.
- Welcome terminal glow keyframes.
- General transitions for buttons, drawer, panels, toggles.
- Reduced motion media query forces short durations.

JS motion:

- GSAP welcome fade.
- GSAP play-guide fade.
- GSAP drawer slide and section stagger.
- GSAP diagnostics fade/translate.
- Canvas animation loops for visuals and particles.

## Style Inconsistencies And Drift

- `custom.css` is active, but `plantasia-vines.css` and `foundation/bootstrap/CUSTOM.css` define older styles and tokens that do not match the current active system.
- Active color token is `#39ff14`, while older foundation green is `#3af779` and `#00ff7f`.
- Active font is Inter, while older foundation styling uses Roboto Mono.
- Active spacing scale starts at `0.5rem`, while older foundation spacing starts at `0.25rem`.
- Some styles use CSS variables, while many important values remain hard-coded in CSS and canvas JavaScript.
- The README still says 14 presets in the meta/description language, while app UI and roadmap describe 16 implemented presets.
- The UI has both semantic Bootstrap classes and custom component classes, so a future system needs clear ownership of component primitives.
- The canvas visual palettes are not represented as CSS tokens, making brand changes harder to preview globally.
