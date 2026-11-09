import { useRef } from 'react';
import { useOrganismRenderer } from '@hooks/useOrganismRenderer';
import './CenterCanvas.css';

/**
 * CenterCanvas — the living ecosystem.
 *
 * A full-bleed canvas that procedurally renders and animates the active
 * organism, reacting to audio in real time. It is the persistent backdrop of
 * the entire app; routed pages render above it. Marked aria-hidden because it is
 * decorative — all meaningful state is available in the textual panels.
 */
export function CenterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useOrganismRenderer(canvasRef);

  return (
    <div className="ecosystem-stage" aria-hidden="true">
      <canvas ref={canvasRef} className="ecosystem-canvas" />
      <div className="ecosystem-vignette" />
    </div>
  );
}
