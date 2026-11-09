import { useEffect, useRef } from 'react';
import { getWaveform } from '../audio/audioEngine';
import { prefersReducedMotion } from '../engine/animationSystem';

type VisualizationLayerProps = {
  active: boolean;
};

/**
 * Canvas waveform that lives behind the organism. It reads from the shared Tone
 * analyser so the line breathes with whatever the synth is doing, instead of
 * being a separate disconnected widget.
 */
export function VisualizationLayer({ active }: VisualizationLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let frame = 0;
    const reduced = prefersReducedMotion();

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      const waveform = active ? getWaveform() : new Float32Array(0);
      context.lineWidth = 1.5;
      context.strokeStyle = 'rgba(127, 216, 143, 0.55)';
      context.beginPath();

      if (waveform.length > 0) {
        for (let index = 0; index < waveform.length; index += 1) {
          const x = (index / waveform.length) * width;
          const y = height / 2 + waveform[index] * height * 0.4;
          if (index === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }
      } else {
        const time = reduced ? 0 : frame * 0.02;
        for (let x = 0; x <= width; x += 6) {
          const y = height / 2 + Math.sin(x * 0.02 + time) * height * 0.06;
          if (x === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }
      }
      context.stroke();

      frame += 1;
      if (!reduced) {
        animation = requestAnimationFrame(render);
      }
    };

    let animation = requestAnimationFrame(render);
    if (reduced) {
      render();
    }

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="visualization-layer" aria-hidden="true" />;
}
