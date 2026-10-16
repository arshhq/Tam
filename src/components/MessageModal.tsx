import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';
import './MessageModal.css';

interface MessageModalProps {
  open: boolean;
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
  actionResult?: string | null;
  onClose: () => void;
  primaryLabel?: string;
  onPrimary?: () => void;
}

export function MessageModal({
  open,
  title,
  body,
  actionLabel,
  onAction,
  actionResult,
  onClose,
  primaryLabel,
  onPrimary,
}: MessageModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal" role="presentation">
      <button
        type="button"
        className="modal__backdrop"
        aria-label="Close message"
        onClick={onClose}
      />
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeRef}
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <h2 id={titleId} className="modal__title">
          {title}
        </h2>
        <p className="modal__body">{body}</p>

        {actionResult && <p className="modal__result">{actionResult}</p>}

        <div className="modal__actions">
          {actionLabel && onAction && (
            <button type="button" className="modal__btn modal__btn--ghost" onClick={onAction}>
              {actionLabel}
            </button>
          )}
          {primaryLabel && onPrimary && (
            <button type="button" className="modal__btn modal__btn--primary" onClick={onPrimary}>
              {primaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
