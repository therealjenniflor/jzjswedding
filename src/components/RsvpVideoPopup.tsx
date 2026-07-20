import { useCallback, useEffect, useRef, useState } from 'react';

interface RsvpVideoPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function RsvpVideoPopup({ open, onClose }: RsvpVideoPopupProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClose = useCallback(() => {
    setPlaying(false);
    videoRef.current?.pause();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, handleClose]);

  function play() {
    setPlaying(true);
    videoRef.current?.play();
  }

  if (!open) return null;

  return (
    <div className="rsvp-video-overlay" onClick={handleClose}>
      <div className="rsvp-video-modal" onClick={e => e.stopPropagation()}>
        <button className="rsvp-video-close" onClick={handleClose} aria-label="Close">
          &times;
        </button>
        <div className={`rsvp-video-frame${playing ? ' rsvp-video-frame--playing' : ''}`}>
          <video
            ref={videoRef}
            className="rsvp-video"
            src="/videos/wedding-rsvp.mp4"
            poster="/videos/wedding-rsvp-poster.jpg"
            controls={playing}
            playsInline
            onEnded={() => setPlaying(false)}
          />
          {!playing && (
            <button className="rsvp-video-play" onClick={play} aria-label="Play video">
              <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
                <circle cx="32" cy="32" r="31" fill="rgba(58, 18, 15, 0.55)" stroke="var(--cream)" strokeWidth="1.5" />
                <path d="M26 20L46 32L26 44V20Z" fill="var(--cream)" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
