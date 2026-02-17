import { useEffect, useRef, useCallback } from 'react';

interface WaveLayer {
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  color: string;
  opacity: number;
  yOffset: number;
}

export const WaterWaveCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  const getColors = useCallback(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const primary = styles.getPropertyValue('--primary').trim();
    const ring = styles.getPropertyValue('--ring').trim();
    const bg = styles.getPropertyValue('--background').trim();
    return { primary, ring, bg };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    const w = rect.width;
    const h = rect.height;
    const t = timeRef.current;
    const { primary, ring } = getColors();

    ctx.clearRect(0, 0, w, h);

    // Wave layers from back to front
    const layers: WaveLayer[] = [
      // Deep background wave
      { amplitude: 12, frequency: 0.008, speed: 0.3, phase: 0, color: `hsla(${primary}, 0.06)`, opacity: 1, yOffset: h * 0.55 },
      { amplitude: 10, frequency: 0.012, speed: -0.2, phase: 1.5, color: `hsla(${primary}, 0.05)`, opacity: 1, yOffset: h * 0.58 },
      // Mid waves
      { amplitude: 15, frequency: 0.006, speed: 0.5, phase: 0.8, color: `hsla(${primary}, 0.08)`, opacity: 1, yOffset: h * 0.62 },
      { amplitude: 8, frequency: 0.015, speed: -0.4, phase: 2.2, color: `hsla(${ring}, 0.06)`, opacity: 1, yOffset: h * 0.65 },
      // Front waves
      { amplitude: 18, frequency: 0.005, speed: 0.6, phase: 1.2, color: `hsla(${primary}, 0.1)`, opacity: 1, yOffset: h * 0.7 },
      { amplitude: 6, frequency: 0.02, speed: -0.35, phase: 3.1, color: `hsla(${ring}, 0.07)`, opacity: 1, yOffset: h * 0.72 },
      // Surface waves
      { amplitude: 20, frequency: 0.004, speed: 0.7, phase: 0.5, color: `hsla(${primary}, 0.12)`, opacity: 1, yOffset: h * 0.76 },
      { amplitude: 5, frequency: 0.025, speed: -0.5, phase: 4.0, color: `hsla(${primary}, 0.08)`, opacity: 1, yOffset: h * 0.78 },
      // Foam/crest
      { amplitude: 22, frequency: 0.003, speed: 0.8, phase: 2.0, color: `hsla(${primary}, 0.15)`, opacity: 1, yOffset: h * 0.82 },
      { amplitude: 4, frequency: 0.03, speed: 0.9, phase: 1.0, color: `hsla(${ring}, 0.1)`, opacity: 1, yOffset: h * 0.85 },
    ];

    layers.forEach((layer) => {
      ctx.beginPath();
      ctx.moveTo(0, h);

      for (let x = 0; x <= w; x += 2) {
        // Combine multiple sine waves for organic feel
        const y =
          layer.yOffset +
          Math.sin(x * layer.frequency + t * layer.speed + layer.phase) * layer.amplitude +
          Math.sin(x * layer.frequency * 2.3 + t * layer.speed * 1.4 + layer.phase * 0.7) * (layer.amplitude * 0.4) +
          Math.sin(x * layer.frequency * 0.5 + t * layer.speed * 0.6 + layer.phase * 1.3) * (layer.amplitude * 0.6);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = layer.color;
      ctx.fill();
    });

    // Subtle foam dots along the top wave crest
    const foamLayer = layers[layers.length - 2];
    for (let x = 0; x < w; x += 12) {
      const baseY =
        foamLayer.yOffset +
        Math.sin(x * foamLayer.frequency + t * foamLayer.speed + foamLayer.phase) * foamLayer.amplitude +
        Math.sin(x * foamLayer.frequency * 2.3 + t * foamLayer.speed * 1.4 + foamLayer.phase * 0.7) * (foamLayer.amplitude * 0.4) +
        Math.sin(x * foamLayer.frequency * 0.5 + t * foamLayer.speed * 0.6 + foamLayer.phase * 1.3) * (foamLayer.amplitude * 0.6);

      const sparkle = Math.sin(x * 0.1 + t * 2) * 0.5 + 0.5;
      if (sparkle > 0.7) {
        ctx.beginPath();
        ctx.arc(x + Math.sin(t + x) * 3, baseY - 2, 1 + sparkle, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${primary}, ${0.08 + sparkle * 0.1})`;
        ctx.fill();
      }
    }

    timeRef.current += 0.02;
    animationRef.current = requestAnimationFrame(draw);
  }, [getColors]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
};
