import type { StarContent } from '../data/content';
import './InteractiveStar.css';

interface InteractiveStarProps {
  star: StarContent;
  discovered: boolean;
  onSelect: (id: StarContent['id']) => void;
}

export function InteractiveStar({ star, discovered, onSelect }: InteractiveStarProps) {
  const isFinal = star.variant === 'final';

  return (
    <button
      type="button"
      className={[
        'istar',
        `istar--${star.size}`,
        isFinal ? 'istar--final' : '',
        discovered ? 'istar--discovered' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ left: `${star.position.x}%`, top: `${star.position.y}%` }}
      onClick={() => onSelect(star.id)}
      aria-label={`Open star: ${star.title}`}
    >
      <span className="istar__core" />
      <span className="istar__ring" />
      {isFinal && <span className="istar__pulse" />}
    </button>
  );
}
