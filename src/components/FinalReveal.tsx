import { useEffect, useState } from 'react';
import { FINAL } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './FinalReveal.css';

interface FinalRevealProps {
  onBurst: () => void;
}

type Phase = 'line1' | 'line2' | 'tease' | 'button' | 'after';

export function FinalReveal({ onBurst }: FinalRevealProps) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>('line1');
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    const delays = reduced
      ? { line2: 200, tease: 400, button: 600 }
      : { line2: 1600, tease: 2800, button: 3600 };

    const t1 = window.setTimeout(() => setPhase('line2'), delays.line2);
    const t2 = window.setTimeout(() => setPhase('tease'), delays.tease);
    const t3 = window.setTimeout(() => setPhase('button'), delays.button);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [reduced]);

  const showLine2 = phase !== 'line1';
  const showTease = phase === 'tease' || phase === 'button' || phase === 'after';
  const showButton = phase === 'button' || phase === 'after';
  const showAfter = phase === 'after';

  const handleEnd = () => {
    setBursting(true);
    onBurst();
    window.setTimeout(() => setPhase('after'), reduced ? 100 : 700);
  };

  return (
    <section className={`final ${bursting ? 'final--burst' : ''}`} aria-label="Final message">
      <div className="final__inner">
        <p className="final__line final__line--1">{FINAL.line1}</p>

        {showLine2 && (
          <p className="final__line final__line--2" key="line2">
            {FINAL.line2}
          </p>
        )}

        {showTease && (
          <p className="final__tease" key="tease">
            {FINAL.tease}
          </p>
        )}

        {showButton && !showAfter && (
          <button type="button" className="final__btn" onClick={handleEnd}>
            {FINAL.button}
          </button>
        )}

        {showAfter && (
          <p className="final__after" key="after" role="status">
            {FINAL.after}
          </p>
        )}
      </div>

      {bursting && (
        <div className="final__burst" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span
              key={i}
              className={`final__particle final__particle--${i % 3 === 0 ? 'heart' : 'star'}`}
              style={{ ['--a' as string]: `${(i / 18) * 360}deg`, ['--d' as string]: `${0.4 + (i % 5) * 0.08}s` }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
