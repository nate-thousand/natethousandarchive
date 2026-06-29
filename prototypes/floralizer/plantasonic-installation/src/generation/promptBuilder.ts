/**
 * promptBuilder.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 1 — Generative Asset Pipeline
 *
 * Purpose
 *   Turns metadata-only asset definitions plus the Style DNA into complete,
 *   provider-ready generation prompts. This is the bridge between the
 *   data-driven definition layer and any AI image/video model.
 *
 * Responsibilities
 *   - Read the Style DNA (config/style-dna.json) as the single source of
 *     visual identity.
 *   - Read botanical asset definitions (definitions/botanical-assets.json).
 *   - Compose full prompts (subject + style suffix + negative prompts +
 *     provider parameters) for a requested asset / variant.
 *   - Support template variables (e.g. {{subject}}, {{palette}}, {{suffix}}).
 *   - Support multiple model providers behind a single interface.
 *   - Support prompt versioning so regenerations are reproducible.
 *
 * Dependencies
 *   - config/style-dna.json (StyleDNA)
 *   - definitions/botanical-assets.json (BotanicalAsset[])
 *   - Future: provider adapters (Midjourney, Flux, SDXL, Sora, ...).
 *
 * Future implementation notes
 *   - No API integration in this milestone. This file only constructs prompt
 *     strings/objects; network calls belong to provider adapters added later.
 *   - Provider-specific syntax (e.g. Midjourney "--ar 1:1 --stylize") must be
 *     encapsulated in adapters, never in the Style DNA or definitions.
 *   - Keep prompt construction pure and deterministic for caching/hashing.
 * ----------------------------------------------------------------------------
 */

export type ModelProvider =
  | "midjourney"
  | "flux"
  | "stable-diffusion-3"
  | "sdxl"
  | "sora"
  | "runway";

export interface PromptVariables {
  [key: string]: string | number | boolean;
}

export interface BuiltPrompt {
  /** Asset id this prompt was built for. */
  assetId: string;
  /** Optional variant name. */
  variant?: string;
  /** Target provider. */
  provider: ModelProvider;
  /** Final positive prompt text. */
  prompt: string;
  /** Negative prompt text, where supported. */
  negativePrompt?: string;
  /** Provider-specific parameters (aspect ratio, stylize, seed, ...). */
  parameters: Record<string, unknown>;
  /** Deterministic version hash for reproducibility and caching. */
  promptVersion: string;
}

export interface PromptBuilderOptions {
  provider: ModelProvider;
  variant?: string;
  variables?: PromptVariables;
  /** Optional explicit seed for reproducible generations. */
  seed?: number;
}

/**
 * Build a complete prompt for a single asset definition.
 *
 * Planned behavior:
 *   1. Resolve the asset's styleDNA reference (default config/style-dna.json).
 *   2. Merge promptSubject + Style DNA promptSuffix.
 *   3. Append negative prompts.
 *   4. Apply template variables.
 *   5. Delegate to the provider adapter to format parameters.
 *   6. Compute a promptVersion hash from the resolved inputs.
 */
export function buildPrompt(
  _assetId: string,
  _options: PromptBuilderOptions
): BuiltPrompt {
  throw new Error("promptBuilder.buildPrompt: not implemented (Milestone 1)");
}

/**
 * Build prompts for every asset (optionally filtered) — used by the asset
 * queue to plan batch generation.
 */
export function buildAllPrompts(
  _options: PromptBuilderOptions
): BuiltPrompt[] {
  throw new Error("promptBuilder.buildAllPrompts: not implemented (Milestone 1)");
}
