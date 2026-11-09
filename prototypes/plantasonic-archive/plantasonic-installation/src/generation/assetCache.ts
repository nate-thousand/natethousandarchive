/**
 * assetCache.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 1 — Generative Asset Pipeline
 *
 * Purpose
 *   Tracks generated assets by content hash so the installation never
 *   regenerates or duplicates work. The cache is metadata-first: it indexes
 *   what exists, where it lives, and how it was produced. Binary files live in
 *   assets/cache/ and assets/generated/, but the index itself is data.
 *
 * Responsibilities
 *   - Hash checking: derive a stable key from (assetId, variant, promptVersion,
 *     styleDNA version) and look up existing results.
 *   - Duplicate detection: identical hashes resolve to a single stored file.
 *   - Version tracking: keep multiple versions of an asset as Style DNA or
 *     prompts evolve.
 *   - Metadata: store provider, parameters, dimensions, createdAt.
 *   - Asset history: maintain a chronological record per asset.
 *
 * Dependencies
 *   - promptBuilder.ts (promptVersion contributes to the cache key)
 *   - assets/cache/ and assets/generated/ (storage locations)
 *
 * Future implementation notes
 *   - No image generation here. The cache only records and resolves entries.
 *   - Hashing should be deterministic and content-addressable so the same
 *     inputs always map to the same key.
 * ----------------------------------------------------------------------------
 */

import type { ModelProvider } from "./promptBuilder";

export interface CacheKeyInput {
  assetId: string;
  variant?: string;
  promptVersion: string;
  styleDNAVersion: string;
  provider: ModelProvider;
}

export interface CacheEntry {
  /** Content-addressable hash key. */
  hash: string;
  assetId: string;
  variant?: string;
  provider: ModelProvider;
  promptVersion: string;
  styleDNAVersion: string;
  /** Relative path under assets/cache or assets/generated. */
  location: string;
  width?: number;
  height?: number;
  createdAt: number;
  metadata: Record<string, unknown>;
}

export class AssetCache {
  /** Compute the deterministic content hash for a set of inputs. */
  computeHash(_input: CacheKeyInput): string {
    throw new Error("AssetCache.computeHash: not implemented (Milestone 1)");
  }

  /** True if an entry with this hash already exists. */
  has(_hash: string): boolean {
    throw new Error("AssetCache.has: not implemented (Milestone 1)");
  }

  /** Look up a single entry by hash. */
  get(_hash: string): CacheEntry | undefined {
    throw new Error("AssetCache.get: not implemented (Milestone 1)");
  }

  /** Record a newly generated asset, returning the stored entry. */
  put(_entry: CacheEntry): CacheEntry {
    throw new Error("AssetCache.put: not implemented (Milestone 1)");
  }

  /** Full chronological history of versions for one asset id. */
  history(_assetId: string): CacheEntry[] {
    throw new Error("AssetCache.history: not implemented (Milestone 1)");
  }
}
