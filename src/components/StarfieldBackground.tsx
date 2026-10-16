import { useMemo } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './StarfieldBackground.css';

interface StarfieldBackgroundProps {
  brighten?: boolean;
  dimmed?: boolean;
  focusCluster?: boolean;
}

function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function StarfieldBackground({
  brighten = false,
  dimmed = false,
  focusCluster = false,
}: StarfieldBackgroundProps) {
  const reduced = usePrefersReducedMotion();

  const stars = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: seeded(i + 1) * 100,
        top: seeded(i + 40) * 100,
        size: 1 + seeded(i + 80) * 2.2,
        delay: seeded(i + 120) * 6,
        duration: 2.8 + seeded(i + 160) * 4,
        opacity: 0.35 + seeded(i + 200) * 0.55,
      })),
    [],
  );

  const drifts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: seeded(i + 300) * 100,
        top: seeded(i + 340) * 100,
        size: 3 + seeded(i + 380) * 5,
        delay: seeded(i + 420) * 8,
        duration: 14 + seeded(i + 460) * 12,
        kind: seeded(i + 500) > 0.7 ? 'heart' : 'dot',
      })),
    [],
  );

  return (
    <div
      className={[
        'starfield',
        brighten ? 'starfield--bright' : '',
        dimmed ? 'starfield--dim' : '',
        focusCluster ? 'starfield--focus' : '',
        reduced ? 'starfield--reduced' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <div className="starfield__nebula starfield__nebula--a" />
      <div className="starfield__nebula starfield__nebula--b" />
      <div className="starfield__nebula starfield__nebula--c" />
      <div className="starfield__vignette" />

      {stars.map((s) => (
        <span
          key={s.id}
          className="starfield__star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {drifts.map((d) => (
        <span
          key={`d-${d.id}`}
          className={`starfield__drift starfield__drift--${d.kind}`}
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}

      {focusCluster && (
        <div className="starfield__cluster">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={`c-${i}`}
              className="starfield__cluster-star"
              style={{
                ['--i' as string]: i,
                left: `${42 + seeded(i + 600) * 16}%`,
                top: `${36 + seeded(i + 640) * 18}%`,
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
