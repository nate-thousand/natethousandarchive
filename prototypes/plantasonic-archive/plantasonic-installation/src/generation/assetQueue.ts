/**
 * assetQueue.ts
 * ----------------------------------------------------------------------------
 * MILESTONE 1 — Generative Asset Pipeline
 *
 * Purpose
 *   Orchestrates which assets need to be generated and in what order. The queue
 *   is the scheduling brain of the generation pipeline; it never talks to a
 *   model directly (that is the provider adapter's job) and never stores image
 *   bytes (that is the asset cache's job).
 *
 * Responsibilities
 *   - Scan definitions/botanical-assets.json for assets with a non-cached
 *     generationStatus and enqueue the missing ones.
 *   - Retry failed generations with backoff.
 *   - Batch generation requests for throughput.
 *   - Honor priorities (hero assets before background filler).
 *   - Expose hooks for future background workers / job runners.
 *
 * Dependencies
 *   - promptBuilder.ts (to construct prompts for queued jobs)
 *   - assetCache.ts (to skip already-cached assets and store results)
 *   - Future: provider adapters and a worker/runtime layer.
 *
 * Future implementation notes
 *   - No generation happens in this milestone. This defines the contract only.
 *   - The queue should be persistable so installations can resume generation
 *     across restarts.
 * ----------------------------------------------------------------------------
 */

export type JobStatus = "pending" | "queued" | "running" | "done" | "failed";

export type JobPriority = "low" | "normal" | "high" | "critical";

export interface GenerationJob {
  id: string;
  assetId: string;
  variant?: string;
  priority: JobPriority;
  status: JobStatus;
  attempts: number;
  maxAttempts: number;
  lastError?: string;
  createdAt: number;
  updatedAt: number;
}

export interface QueueOptions {
  batchSize?: number;
  maxAttempts?: number;
  /** Base delay used for exponential retry backoff, in milliseconds. */
  retryBaseDelayMs?: number;
}

export class AssetQueue {
  constructor(_options: QueueOptions = {}) {}

  /** Enqueue every asset that is not yet cached. */
  enqueueMissing(): GenerationJob[] {
    throw new Error("AssetQueue.enqueueMissing: not implemented (Milestone 1)");
  }

  /** Add a single asset/variant to the queue with a priority. */
  enqueue(_assetId: string, _priority: JobPriority = "normal"): GenerationJob {
    throw new Error("AssetQueue.enqueue: not implemented (Milestone 1)");
  }

  /** Re-queue a failed job, respecting maxAttempts and backoff. */
  retry(_jobId: string): GenerationJob {
    throw new Error("AssetQueue.retry: not implemented (Milestone 1)");
  }

  /** Pull the next batch of jobs ordered by priority then age. */
  nextBatch(): GenerationJob[] {
    throw new Error("AssetQueue.nextBatch: not implemented (Milestone 1)");
  }

  /** Snapshot of all jobs for inspection / persistence. */
  snapshot(): GenerationJob[] {
    throw new Error("AssetQueue.snapshot: not implemented (Milestone 1)");
  }
}
