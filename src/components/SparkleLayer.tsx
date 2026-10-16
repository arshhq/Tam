import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './SparkleLayer.css';

export interface Sparkle {
  id: number;
  x: number;
  y: number;
}

interface SparkleLayerProps {
  sparkles: Sparkle[];
  onExpire: (id: number) => void;
}

export function SparkleLayer({ sparkles, onExpire }: SparkleLayerProps) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || sparkles.length === 0) return;
    const timers = sparkles.map((s) =>
      window.setTimeout(() => onExpire(s.id), 650),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [sparkles, onExpire, reduced]);

  if (reduced) return null;

  return (
    <div className="sparkles" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkles__dot"
          style={{ left: s.x, top: s.y }}
        />
      ))}
    </div>
  );
}

let sparkleId = 0;

export function useSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const reduced = usePrefersReducedMotion();

  const addSparkle = (x: number, y: number) => {
    if (reduced) return;
    const id = ++sparkleId;
    setSparkles((prev) => [...prev.slice(-8), { id, x, y }]);
  };

  const expire = (id: number) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id));
  };

  return { sparkles, addSparkle, expire };
}
