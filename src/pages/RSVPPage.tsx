import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';

type Phase = 'loading' | 'not-found' | 'form' | 'already-rsvpd' | 'submitting' | 'success' | 'error';

interface PlusOne {
  id: string;
  name: string;
  status: string | null;
  dietary: string;
}

interface Guest {
  name: string;
  status: string | null;
  dietary: string;
  song: string;
  plusOne: PlusOne | null;
}

function Florete({ color = '#b85530' }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={color} strokeWidth="1.1" aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map(r => (
        <ellipse key={r} cx="11" cy="8" rx="1.5" ry="3.5" transform={`rotate(${r} 11 11)`} />
      ))}
      <circle cx="11" cy="11" r="1.5" fill={color} />
    </svg>
  );
}


function fireWeddingConfetti() {
  const colors = ['#ffffff', '#c2185b', '#f48fb1', '#ffffff', '#ad1457'];
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors,
    scalar: 1.1,
  });
  setTimeout(() => confetti({ particleCount: 40, spread: 50, origin: { x: 0.2, y: 0.55 }, colors, angle: 60 }), 150);
  setTimeout(() => confetti({ particleCount: 40, spread: 50, origin: { x: 0.8, y: 0.55 }, colors, angle: 120 }), 150);
}

function RadioPair({
  name,
  value,
  onChange,
  onYes,
  yesLabel = 'Joyfully accepts',
  noLabel = 'Regretfully declines',
}: {
  name: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
  onYes?: () => void;
  yesLabel?: string;
  noLabel?: string;
}) {
  return (
    <div className="rsvp-radio-group">
      <label className={`rsvp-radio${value === true ? ' rsvp-radio--selected' : ''}`}>
        <input type="radio" name={name} checked={value === true} onChange={() => { onChange(true); if (value !== true) onYes?.(); }} />
        <span className="rsvp-radio__mark" />
        <span className="rsvp-radio__label">{yesLabel}</span>
      </label>
      <label className={`rsvp-radio${value === false ? ' rsvp-radio--selected' : ''}`}>
        <input type="radio" name={name} checked={value === false} onChange={() => onChange(false)} />
        <span className="rsvp-radio__mark" />
        <span className="rsvp-radio__label">{noLabel}</span>
      </label>
    </div>
  );
}

export default function RSVPPage() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';

  const [phase, setPhase] = useState<Phase>('loading');
  const [guest, setGuest] = useState<Guest | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [attending, setAttending]           = useState<boolean | null>(null);
  const [dietary, setDietary]               = useState('');
  const [song, setSong]                     = useState('');
  const [plusOneAttending, setPlusOneAttending] = useState<boolean | null>(null);
  const [plusOneDietary, setPlusOneDietary] = useState('');
  const [plusOneName, setPlusOneName] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [inviteConfirmed, setInviteConfirmed] = useState(false);

  useEffect(() => {
    if (!token) { setPhase('not-found'); return; }

    fetch(`/api/guest?token=${encodeURIComponent(token)}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then((data: Guest) => {
        setGuest(data);
        if (data.status && data.status !== 'Pending') {
          setPhase('already-rsvpd');
        } else {
          setPhase('form');
        }
      })
      .catch(code => setPhase(code === 404 ? 'not-found' : 'error'));
  }, [token]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (attending === null) return;
    if (attending && guest?.plusOne && plusOneAttending === null) return;
    setPhase('submitting');

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          attending,
          dietary,
          song,
          plusOneId: guest?.plusOne?.id ?? null,
          plusOneAttending: guest?.plusOne ? plusOneAttending : null,
          plusOneDietary,
          plusOneName: guest?.plusOne?.name.toLowerCase().includes('plus 1') ? plusOneName : undefined,
        }),
      });
      if (!res.ok) throw new Error('server error');
      setPhase('success');
      setTimeout(() => {
        const colors = ['#ffffff', '#c2185b', '#f48fb1', '#ffffff', '#ad1457', '#ffffff'];
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.7 }, colors, scalar: 1.2 });
        setTimeout(() => confetti({ particleCount: 60, spread: 70, origin: { x: 0.2, y: 0.65 }, colors, angle: 55 }), 200);
        setTimeout(() => confetti({ particleCount: 60, spread: 70, origin: { x: 0.8, y: 0.65 }, colors, angle: 125 }), 200);
        setTimeout(() => confetti({ particleCount: 80, spread: 100, origin: { y: 0.6 }, colors, scalar: 1.4 }), 500);
      }, 400);
    } catch {
      setPhase('error');
    }
  }

  const firstName = guest?.name.split(' ')[0] ?? '';

  return (
    <div className="rsvp-page">
      <div className="rsvp-page__inner">
        <header className="rsvp-header">
          <div className="rsvp-eyebrow">Jhonatan &amp; Jennifer</div>
          <h1 className="rsvp-title">
            <Florete color="#b85530" />
            RSVP
            <Florete color="#b85530" />
          </h1>
          <p className="rsvp-subtitle">Friday · October 30th, 2026</p>
        </header>

        <div
          className={`rsvp-pinata${phase === 'success' ? ' rsvp-pinata--burst' : ''}`}
          onAnimationEnd={e => { if (e.animationName === 'pinata-burst') e.currentTarget.classList.remove('rsvp-pinata--burst'); }}
        >
          <div className="rsvp-pinata__string" />
          <img src="/images/pinata.png" alt="Wedding piñata" />
        </div>

        <div className="rsvp-card" ref={cardRef}>

          {phase === 'loading' && (
            <div className="rsvp-state rsvp-state--loading">
              <p>Looking up your invitation…</p>
            </div>
          )}

          {phase === 'not-found' && (
            <div className="rsvp-state rsvp-state--error">
              <p className="rsvp-state__title">Invitation not found</p>
              <p className="rsvp-state__body">
                This link doesn't match any invitation in our records. Please check the link in your invitation and try again.
              </p>
            </div>
          )}

          {phase === 'already-rsvpd' && guest && (
            <div className="rsvp-state rsvp-state--done">
              <p className="rsvp-state__title">{"You're all set"}, {firstName}!</p>
              <p className="rsvp-state__body">
                We already have your RSVP —{' '}
                <strong>{guest.status === 'Attending' ? "you're attending" : "you're not attending"}</strong>.
                If something changed, please reach out to us directly.
              </p>
            </div>
          )}

          {(phase === 'form' || phase === 'submitting') && guest && (
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <p className="rsvp-form__greeting">
                Hello,{' '}
                <span className="rsvp-form__name">
                  {guest.plusOne
                    ? `${guest.name} & ${guest.plusOne.name.toLowerCase().includes('plus 1') ? 'Plus 1' : guest.plusOne.name}`
                    : guest.name}
                </span>
              </p>
              <p className="rsvp-form__lead">
                {"We'd"} love to celebrate with you. Please let us know if {"you'll"} be joining us.
              </p>

              {/* Primary guest attendance */}
              <fieldset className="rsvp-fieldset">
                <legend className="rsvp-field-label">Will you be attending?</legend>
                <RadioPair
                  name="attending"
                  value={attending}
                  onChange={v => {
                    setAttending(v);
                    setTimeout(() => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
                  }}
                  onYes={fireWeddingConfetti}
                />
              </fieldset>

              {attending === true && (
                <div className="rsvp-reveal">
                  <div className="rsvp-field">
                    <label className="rsvp-field-label" htmlFor="dietary">
                      Any dietary restrictions or allergies?
                    </label>
                    <textarea
                      id="dietary"
                      value={dietary}
                      onChange={e => setDietary(e.target.value)}
                      placeholder="e.g. vegetarian, gluten-free, nut allergy…"
                      className="rsvp-textarea"
                      rows={2}
                    />
                  </div>

                  {/* Plus one section */}
                  {guest.plusOne && (
                    <>
                      <div className="rsvp-section-divider">
                        <span className="rsvp-section-divider__line" />
                        <span className="rsvp-section-divider__label">Plus one</span>
                        <span className="rsvp-section-divider__line" />
                      </div>

                      <fieldset className="rsvp-fieldset">
                        <legend className="rsvp-field-label">
                          Will {guest.plusOne.name.toLowerCase().includes('plus 1') ? (plusOneName.trim() || 'your plus one') : guest.plusOne.name} be joining you?
                        </legend>
                        <RadioPair
                          name="plusOneAttending"
                          value={plusOneAttending}
                          onChange={setPlusOneAttending}
                          yesLabel="Yes, joining"
                          noLabel="No, not attending"
                        />
                      </fieldset>

                      {plusOneAttending === true && (
                        <div className="rsvp-field rsvp-reveal">
                          <label className="rsvp-field-label" htmlFor="plusOneDietary">
                            Any dietary restrictions for {guest.plusOne.name.toLowerCase().includes('plus 1') ? (plusOneName.trim() || 'your plus one') : guest.plusOne.name}?
                          </label>
                          <textarea
                            id="plusOneDietary"
                            value={plusOneDietary}
                            onChange={e => setPlusOneDietary(e.target.value)}
                            placeholder="e.g. vegetarian, gluten-free, nut allergy…"
                            className="rsvp-textarea"
                            rows={2}
                          />
                        </div>
                      )}
                    </>
                  )}

                  <div className="rsvp-field rsvp-reveal">
                    <label className="rsvp-field-label" htmlFor="song">
                      Song request for the dance floor?
                    </label>
                    <input
                      id="song"
                      type="text"
                      value={song}
                      onChange={e => setSong(e.target.value)}
                      placeholder="Artist — Song title"
                      className="rsvp-input"
                    />
                  </div>
                </div>
              )}

              {attending !== null && (
                <>
                  {attending === true && (
                    <>
                      <div className="rsvp-section-divider">
                        <span className="rsvp-section-divider__line" />
                        <span className="rsvp-section-divider__label">Before you go</span>
                        <span className="rsvp-section-divider__line" />
                      </div>
                      <label className="rsvp-age-check">
                        <input
                          type="checkbox"
                          checked={ageConfirmed}
                          onChange={e => setAgeConfirmed(e.target.checked)}
                        />
                        <span className="rsvp-age-check__box" />
                        <span className="rsvp-age-check__text">
                          I understand that everyone in this invite is 18+
                        </span>
                      </label>
                      <p className="rsvp-age-note">
                        Guests under 18 will be kindly asked to leave the venue.
                      </p>

                      {guest.plusOne && (
                        <label className="rsvp-age-check" style={{ marginTop: 16 }}>
                          <input
                            type="checkbox"
                            checked={inviteConfirmed}
                            onChange={e => setInviteConfirmed(e.target.checked)}
                          />
                          <span className="rsvp-age-check__box" />
                          <span className="rsvp-age-check__text">
                            Only those named in this invitation will be joining
                          </span>
                        </label>
                      )}
                    </>
                  )}

                  <button
                    type="submit"
                    className="rsvp-submit"
                    disabled={
                      phase === 'submitting' ||
                      (attending === true && !ageConfirmed) ||
                      (attending === true && guest.plusOne !== null && !inviteConfirmed) ||
                      (attending && guest.plusOne !== null && plusOneAttending === null)
                    }
                  >
                    {phase === 'submitting' ? 'Sending…' : 'Send my RSVP'}
                  </button>
                </>
              )}
            </form>
          )}

          {phase === 'success' && (
            <div className="rsvp-state rsvp-state--success">
              <div className="rsvp-state__floretes">
                <img src="/images/marigold.png" alt="" aria-hidden="true" className="rsvp-state__marigold" />
                <img src="/images/marigold.png" alt="" aria-hidden="true" className="rsvp-state__marigold" />
                <img src="/images/marigold.png" alt="" aria-hidden="true" className="rsvp-state__marigold" />
              </div>
              <p className="rsvp-state__title">
                {attending ? '¡Nos vemos!' : "We'll miss you!"}
              </p>
              <p className="rsvp-state__body">
                {attending
                  ? "We can't wait to celebrate with you. See you on October 4th!"
                  : "Thank you for letting us know. We'll be thinking of you!"}
              </p>
            </div>
          )}

          {phase === 'error' && (
            <div className="rsvp-state rsvp-state--error">
              <p className="rsvp-state__title">Something went wrong</p>
              <p className="rsvp-state__body">
                We couldn't save your RSVP. Please try again or reach out to us directly.
              </p>
              <button className="rsvp-submit rsvp-submit--outline" onClick={() => setPhase('form')}>
                Try again
              </button>
            </div>
          )}

        </div>

        {phase === 'success' && attending === true && (
          <footer className="rsvp-page-footer">
            <div className="rsvp-footer-dogs">
              <img src="/images/zeus.png" alt="Zeus" className="rsvp-footer-dog" />
              <img src="/images/mia.png" alt="Mia" className="rsvp-footer-dog" />
              <img src="/images/otis.png" alt="Otis" className="rsvp-footer-dog" />
            </div>
            <p className="rsvp-footer-dogs-note">We're so excited for our parents! We'll be home protecting the house but drinks are on us!</p>
          </footer>
        )}
      </div>
    </div>
  );
}
