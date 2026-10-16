import { useEffect, useState } from 'react';
import { INTRO } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './IntroScreen.css';

interface IntroScreenProps {
  onEnter: () => void;
  exiting: boolean;
}

export function IntroScreen({ onEnter, exiting }: IntroScreenProps) {
  const reduced = usePrefersReducedMotion();
  const [showSkip, setShowSkip] = useState(reduced);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => setShowSkip(true), 2200);
    return () => window.clearTimeout(t);
  }, [reduced]);

  const handleEnter = () => {
    if (exiting) return;
    setPressed(true);
    onEnter();
  };

  return (
    <section
      className={`intro ${exiting ? 'intro--exit' : ''} ${pressed ? 'intro--pressed' : ''}`}
      aria-label="Welcome"
    >
      <div className="intro__content">
        <p className="intro__eyebrow">A little universe</p>
        <h1 className="intro__heading">{INTRO.heading}</h1>
        <p className="intro__support">{INTRO.support}</p>
        <p className="intro__aside">{INTRO.aside}</p>

        <button
          type="button"
          className="intro__cta"
          onClick={handleEnter}
          disabled={exiting}
          aria-label={INTRO.cta}
        >
          <span>{INTRO.cta}</span>
        </button>

        {showSkip && !exiting && (
          <button type="button" className="intro__skip" onClick={handleEnter}>
            {INTRO.skip}
          </button>
        )}
      </div>
    </section>
  );
}
