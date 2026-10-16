import { useState, type MouseEvent } from 'react';
import { Sparkles } from 'lucide-react';
import { CHAOS_MESSAGES } from '../data/content';
import './ChaosMessage.css';

interface ChaosMessageProps {
  onSparkle?: (x: number, y: number) => void;
}

export function ChaosMessage({ onSparkle }: ChaosMessageProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const next = (index + Math.floor(Math.random() * (CHAOS_MESSAGES.length - 1)) + 1) %
      CHAOS_MESSAGES.length;
    setIndex(next);
    setMessage(CHAOS_MESSAGES[next]);
    onSparkle?.(e.clientX, e.clientY);
  };

  return (
    <div className="chaos">
      <button type="button" className="chaos__btn" onClick={handleClick}>
        <Sparkles size={14} strokeWidth={1.75} aria-hidden="true" />
        Need a little chaos?
      </button>
      {message && (
        <p className="chaos__msg" key={message} role="status" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
}
