import { useCallback, useMemo, useState, type MouseEvent } from 'react';
import {
  COMPLAINT_MESSAGES,
  EASTER_EGG_MESSAGE,
  STARS,
  TOTAL_STARS,
  type StarId,
} from '../data/content';
import { ChaosMessage } from './ChaosMessage';
import { InteractiveStar } from './InteractiveStar';
import { MessageModal } from './MessageModal';
import './GalaxyScene.css';

interface GalaxySceneProps {
  onFinalStar: () => void;
  onSparkle?: (x: number, y: number) => void;
  entering?: boolean;
}

export function GalaxyScene({ onFinalStar, onSparkle, entering }: GalaxySceneProps) {
  const [discovered, setDiscovered] = useState<Set<StarId>>(new Set());
  const [activeId, setActiveId] = useState<StarId | null>(null);
  const [complaintNote, setComplaintNote] = useState<string | null>(null);
  const [easterOpen, setEasterOpen] = useState(false);
  const [easterFound, setEasterFound] = useState(false);

  const activeStar = useMemo(
    () => STARS.find((s) => s.id === activeId) ?? null,
    [activeId],
  );

  const markDiscovered = useCallback((id: StarId) => {
    setDiscovered((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const handleSelect = (id: StarId, clientX?: number, clientY?: number) => {
    if (clientX != null && clientY != null) onSparkle?.(clientX, clientY);
    markDiscovered(id);

    if (id === 'final') {
      setActiveId(id);
      return;
    }

    setComplaintNote(null);
    setActiveId(id);
  };

  const handleComplaint = () => {
    const note =
      COMPLAINT_MESSAGES[Math.floor(Math.random() * COMPLAINT_MESSAGES.length)];
    setComplaintNote(note);
  };

  const handleEaster = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onSparkle?.(e.clientX, e.clientY);
    setEasterFound(true);
    setEasterOpen(true);
  };

  return (
    <section
      className={`galaxy ${entering ? 'galaxy--enter' : ''}`}
      aria-label="Explore the universe"
    >
      <header className="galaxy__hud">
        <p className="galaxy__hint">Tap a glowing star</p>
        <p className="galaxy__progress" aria-live="polite">
          Stars discovered: {discovered.size}/{TOTAL_STARS}
        </p>
      </header>

      <div className="galaxy__stage">
        {STARS.map((star) => (
          <InteractiveStar
            key={star.id}
            star={star}
            discovered={discovered.has(star.id)}
            onSelect={(id) => handleSelect(id)}
          />
        ))}

        <button
          type="button"
          className={`galaxy__egg ${easterFound ? 'galaxy__egg--found' : ''}`}
          style={{ left: '8%', top: '78%' }}
          onClick={handleEaster}
          aria-label="Tiny hidden star"
        />
      </div>

      <div className="galaxy__footer">
        <ChaosMessage onSparkle={onSparkle} />
      </div>

      {activeStar && activeStar.id !== 'final' && (
        <MessageModal
          open
          title={activeStar.title}
          body={activeStar.body}
          actionLabel={activeStar.actionLabel}
          onAction={activeStar.id === 'complaint' ? handleComplaint : undefined}
          actionResult={complaintNote}
          onClose={() => setActiveId(null)}
        />
      )}

      {activeStar?.id === 'final' && (
        <MessageModal
          open
          title={activeStar.title}
          body="Ready when you are."
          primaryLabel="I'm ready"
          onPrimary={() => {
            setActiveId(null);
            onFinalStar();
          }}
          onClose={() => setActiveId(null)}
        />
      )}

      {easterOpen && (
        <MessageModal
          open
          title="✦"
          body={EASTER_EGG_MESSAGE}
          onClose={() => setEasterOpen(false)}
        />
      )}
    </section>
  );
}
