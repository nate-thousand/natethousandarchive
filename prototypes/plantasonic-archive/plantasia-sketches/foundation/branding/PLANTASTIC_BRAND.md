# Plantastic Brand Guidelines

Plant-inspired generative synth experiments. Dark ambient aesthetic with organic green accents.

## Voice

- **Clear** — short labels, uppercase control names
- **Playful** — preset names reference living organisms (Plants, Mold, Bacteria, Mushrooms)
- **Confident** — direct action labels: Play, Stop, Data

## Color Mapping

| Brand role | Token | Value | Usage |
|------------|-------|-------|-------|
| Primary | `color/primary` | `#3af779` | CTAs, accents, waveform glow, active states |
| Primary muted | — | `#00ff7f` | Preset swatches, hover states |
| Accent | `color/accent` | `#00ffff` | Harmony preset, secondary highlights |
| Surface | `color/surface/default` | `#000000` | App background, canvas |
| Raised | `color/surface/raised` | `#111111` | Cards, nav, panels |
| Sunken | `color/surface/sunken` | `#121212` | Form controls |
| Text | `color/text/primary` | `#ffffff` | Body text on dark |
| Secondary text | `color/text/secondary` | `#adb5bd` | Labels, descriptions |

Preset-specific colors (waveform only — not UI tokens):

| Preset | Color |
|--------|-------|
| Plants | `#00FF7F` |
| Mold | `#8A2BE2` |
| Bacteria | `#FF4500` |
| Mushrooms | `#FFD700` |
| Lifeform Harmony | `#00FFFF` |

## Typography

- **Font:** Roboto Mono (monospace synth aesthetic)
- **Labels:** uppercase, 12px, semibold, wide letter-spacing
- **Values:** tabular nums, primary color

## Implementation

- Tokens defined in `foundation/bootstrap/CUSTOM.css`
- App layout in `plantasia-app.css`
- Bootstrap 5.0.2 as implementation layer per Foundation architecture
