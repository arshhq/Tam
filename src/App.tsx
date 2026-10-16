import { useCallback, useEffect, useState } from 'react';
import { FinalReveal } from './components/FinalReveal';
import { GalaxyScene } from './components/GalaxyScene';
import { IntroScreen } from './components/IntroScreen';
import { SparkleLayer, useSparkles } from './components/SparkleLayer';
import { StarfieldBackground } from './components/StarfieldBackground';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { readStorage, writeStorage } from './hooks/useSafeLocalStorage';
import './App.css';

type Phase = 'intro' | 'transition' | 'galaxy' | 'finale';

const INTRO_KEY = 'tam-universe-intro-done';

function App() {
  const reduced = usePrefersReducedMotion();
  const { sparkles, addSparkle, expire } = useSparkles();

  const [phase, setPhase] = useState<Phase>('intro');
  const [brighten, setBrighten] = useState(false);
  const [exitingIntro, setExitingIntro] = useState(false);

  useEffect(() => {
    if (readStorage(INTRO_KEY) === '1') {
      setPhase('galaxy');
    }
  }, []);

  const enterUniverse = useCallback(() => {
    if (phase !== 'intro') return;
    setExitingIntro(true);
    setBrighten(true);
    setPhase('transition');

    const fadeMs = reduced ? 80 : 700;
    const revealMs = reduced ? 160 : 1100;

    window.setTimeout(() => setBrighten(false), fadeMs + 200);
    window.setTimeout(() => {
      writeStorage(INTRO_KEY, '1');
      setPhase('galaxy');
      setExitingIntro(false);
    }, revealMs);
  }, [phase, reduced]);

  const handleFinalStar = useCallback(() => {
    setPhase('finale');
  }, []);

  const handleBurst = useCallback(() => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.48;
    for (let i = 0; i < 6; i++) {
      window.setTimeout(() => {
        addSparkle(cx + (Math.random() - 0.5) * 80, cy + (Math.random() - 0.5) * 60);
      }, i * 60);
    }
  }, [addSparkle]);

  const showIntro = phase === 'intro' || phase === 'transition';
  const showGalaxy = phase === 'galaxy';
  const showFinale = phase === 'finale';

  return (
    <div className="app">
      <StarfieldBackground
        brighten={brighten}
        dimmed={showFinale}
        focusCluster={showFinale}
      />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <main id="main" className="app__main">
        {showIntro && (
          <IntroScreen onEnter={enterUniverse} exiting={exitingIntro} />
        )}

        {showGalaxy && (
          <GalaxyScene
            entering
            onFinalStar={handleFinalStar}
            onSparkle={addSparkle}
          />
        )}

        {showFinale && <FinalReveal onBurst={handleBurst} />}
      </main>

      <SparkleLayer sparkles={sparkles} onExpire={expire} />
    </div>
  );
}

export default App;
