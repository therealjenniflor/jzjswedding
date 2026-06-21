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
  const [lang, setLang] = useState<'en' | 'es'>(params.get('lang') === 'es' ? 'es' : 'en');
  const cardRef = useRef<HTMLDivElement>(null);

  const t = {
    eyebrow:       lang === 'es' ? 'Jhonatan y Jennifer' : 'Jhonatan & Jennifer',
    dueBy:         lang === 'es' ? 'Antes del 9 de octubre, 2026' : 'Due by October 9th, 2026',
    weddingDate:   lang === 'es' ? 'Boda · Viernes, 30 de octubre, 2026' : 'Wedding · Friday, October 30th, 2026',
    loading:       lang === 'es' ? 'Buscando tu invitación…' : 'Looking up your invitation…',
    notFoundTitle: lang === 'es' ? 'Invitación no encontrada' : 'Invitation not found',
    notFoundBody:  lang === 'es' ? 'Este enlace no coincide con ninguna invitación. Por favor verifica el enlace y vuelve a intentarlo.' : "This link doesn't match any invitation in our records. Please check the link in your invitation and try again.",
    alreadyTitle:  lang === 'es' ? '¡Ya estás confirmado!' : "You're all set",
    alreadyBody:   (status: string | null) => lang === 'es'
      ? `Ya tenemos tu confirmación — ${status === 'Attending' ? 'asistirás' : 'no asistirás'}. Si algo cambió, contáctanos directamente.`
      : `We already have your RSVP, ${status === 'Attending' ? "you're attending" : "you're not attending"}. If something changed, please reach out to us directly.`,
    greeting:      lang === 'es' ? 'Hola,' : 'Hi,',
    firstNameLabel: lang === 'es' ? 'Nombre' : 'First Name',
    lastNameLabel:  lang === 'es' ? 'Apellido' : 'Last Name',
    plusOneFirstNameLabel: lang === 'es' ? 'Nombre del acompañante' : "Plus One's First Name",
    plusOneLastNameLabel:  lang === 'es' ? 'Apellido del acompañante' : "Plus One's Last Name",
    lead:          lang === 'es' ? 'Nos encantaría celebrar contigo. Por favor haznos saber si podrás acompañarnos.' : "We'd love to celebrate with you. Please let us know if you'll be joining us.",
    willAttend:    lang === 'es' ? '¿Asistirás?' : 'Will you be attending?',
    joyfully:      lang === 'es' ? 'Con mucho gusto acepto' : 'Joyfully accepts',
    regretfully:   lang === 'es' ? 'Con pesar declino' : 'Regretfully declines',
    dietary:       lang === 'es' ? '¿Alguna restricción alimentaria o alergia?' : 'Any dietary restrictions or allergies?',
    dietaryPlaceholder: lang === 'es' ? 'ej. vegetariano, sin gluten, alergia a nueces…' : 'e.g. vegetarian, gluten-free, nut allergy…',
    plusOneSection: lang === 'es' ? 'Acompañante' : 'Plus one',
    willJoin:      (name: string) => lang === 'es' ? `¿${name} te acompañará?` : `Will ${name} be joining you?`,
    yesJoining:    lang === 'es' ? 'Sí, asistirá' : 'Yes, joining',
    noAttending:   lang === 'es' ? 'No, no asistirá' : 'No, not attending',
    dietaryFor:    (name: string) => lang === 'es' ? `¿Alguna restricción alimentaria para ${name}?` : `Any dietary restrictions for ${name}?`,
    emailLabel:    lang === 'es' ? 'Correo electrónico' : 'Email',
    emailHelper:   lang === 'es' ? 'Se usará para actualizaciones y recordatorios' : 'Will be used for updates and reminders',
    song:          lang === 'es' ? '¿Una canción para la pista de baile?' : 'Song request for the dance floor?',
    songPlaceholder: lang === 'es' ? 'Artista / Título de la canción' : 'Artist / Song title',
    beforeYouGo:   lang === 'es' ? 'Antes de continuar' : 'Before you go',
    ageCheck:      lang === 'es' ? 'Entiendo que todos en esta invitación son mayores de 18 años' : 'I understand that everyone in this invite is 18+',
    ageNote:       lang === 'es' ? 'Los menores de 18 años serán amablemente invitados a retirarse del lugar.' : 'Guests under 18 will be kindly asked to leave the venue.',
    inviteCheck:   lang === 'es' ? 'Solo las personas mencionadas en esta invitación asistirán' : 'Only those named in this invitation will be joining',
    send:          lang === 'es' ? 'Enviar mi confirmación' : 'Send my RSVP',
    sending:       lang === 'es' ? 'Enviando…' : 'Sending…',
    successTitle:  (attending: boolean | null) => attending ? '¡Nos vemos!' : (lang === 'es' ? '¡Te extrañaremos!' : "We'll miss you!"),
    successBody:   (attending: boolean | null) => attending
      ? (lang === 'es' ? '¡No podemos esperar para celebrar contigo! ¡Nos vemos el 30 de octubre!' : "We can't wait to celebrate with you. See you on October 30th!")
      : (lang === 'es' ? '¡Gracias por avisarnos. ¡Estaremos pensando en ti!' : "Thank you for letting us know. We'll be thinking of you!"),
    errorTitle:    lang === 'es' ? 'Algo salió mal' : 'Something went wrong',
    errorBody:     lang === 'es' ? 'No pudimos guardar tu confirmación. Por favor intenta de nuevo o contáctanos directamente.' : "We couldn't save your RSVP. Please try again or reach out to us directly.",
    tryAgain:      lang === 'es' ? 'Intentar de nuevo' : 'Try again',
    dogsNote:      lang === 'es' ? '¡Estamos muy emocionados por nuestros papás! Nosotros cuidaremos la casa, ¡pero las bebidas corren por nuestra cuenta!' : "We're so excited for our parents! We'll be home protecting the house but drinks are on us!",
  };

  const [attending, setAttending]           = useState<boolean | null>(null);
  const [dietary, setDietary]               = useState('');
  const [song, setSong]                     = useState('');
  const [plusOneAttending, setPlusOneAttending] = useState<boolean | null>(null);
  const [plusOneDietary, setPlusOneDietary] = useState('');
  const [guestFirstName, setGuestFirstName] = useState('');
  const [guestLastName, setGuestLastName]   = useState('');
  const [plusOneFirstName, setPlusOneFirstName] = useState('');
  const [plusOneLastName, setPlusOneLastName]   = useState('');
  const [email, setEmail]               = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [inviteConfirmed, setInviteConfirmed] = useState(false);

  useEffect(() => {
    if (!token) { setPhase('not-found'); return; }

    fetch(`/api/guest?token=${encodeURIComponent(token)}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then((data: Guest) => {
        setGuest(data);
        const parts = data.name.trim().split(/\s+/);
        setGuestFirstName(parts[0] ?? '');
        setGuestLastName(parts.slice(1).join(' '));
        if (data.plusOne && !data.plusOne.name.toLowerCase().includes('plus 1')) {
          const pp = data.plusOne.name.trim().split(/\s+/);
          setPlusOneFirstName(pp[0] ?? '');
          setPlusOneLastName(pp.slice(1).join(' '));
        }
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
          email,
          dietary,
          song,
          guestFirstName,
          guestLastName,
          plusOneId: guest?.plusOne?.id ?? null,
          plusOneAttending: guest?.plusOne ? plusOneAttending : null,
          plusOneDietary,
          plusOneFirstName: guest?.plusOne ? plusOneFirstName : undefined,
          plusOneLastName: guest?.plusOne ? plusOneLastName : undefined,
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

  const firstName = guestFirstName || (guest?.name?.split(' ')[0] ?? '');

  return (
    <div className="rsvp-page">
      <div className="rsvp-page__inner">
        <header className="rsvp-header">
          <div className="nuestro-dia__lang" style={{ marginBottom: 8 }}>
            <button className={`nuestro-dia__lang-btn${lang === 'en' ? ' nuestro-dia__lang-btn--active' : ''}`} onClick={() => setLang('en')}>EN</button>
            <span className="nuestro-dia__lang-pip" />
            <button className={`nuestro-dia__lang-btn${lang === 'es' ? ' nuestro-dia__lang-btn--active' : ''}`} onClick={() => setLang('es')}>ES</button>
          </div>
          <div className="rsvp-eyebrow">{t.eyebrow}</div>
          <h1 className="rsvp-title">
            <Florete color="#b85530" />
            R.S.V.P
            <Florete color="#b85530" />
          </h1>
          <p className="rsvp-subtitle">{t.dueBy}</p>
          <p className="rsvp-wedding-date">{t.weddingDate}</p>
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
              <p>{t.loading}</p>
            </div>
          )}

          {phase === 'not-found' && (
            <div className="rsvp-state rsvp-state--error">
              <p className="rsvp-state__title">{t.notFoundTitle}</p>
              <p className="rsvp-state__body">{t.notFoundBody}</p>
            </div>
          )}

          {phase === 'already-rsvpd' && guest && (
            <div className="rsvp-state rsvp-state--done">
              <p className="rsvp-state__title">{t.alreadyTitle}, {firstName}!</p>
              <p className="rsvp-state__body">{t.alreadyBody(guest.status)}</p>
            </div>
          )}

          {(phase === 'form' || phase === 'submitting') && guest && (
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <p className="rsvp-form__greeting">
                {t.greeting}{' '}
                <span className="rsvp-form__name">{guestFirstName || firstName}</span>
              </p>
              <p className="rsvp-form__lead">{t.lead}</p>

              {/* Primary guest attendance */}
              <fieldset className="rsvp-fieldset">
                <legend className="rsvp-field-label">{t.willAttend}</legend>
                <RadioPair
                  name="attending"
                  value={attending}
                  onChange={v => {
                    setAttending(v);
                    setTimeout(() => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
                  }}
                  onYes={fireWeddingConfetti}
                  yesLabel={t.joyfully}
                  noLabel={t.regretfully}
                />
              </fieldset>

              {attending === true && (
                <div className="rsvp-reveal">
                  <div className="rsvp-name-fields">
                    <div className="rsvp-field rsvp-field--inline">
                      <label className="rsvp-field-label" htmlFor="guestFirstName">{t.firstNameLabel}</label>
                      <input
                        id="guestFirstName"
                        type="text"
                        value={guestFirstName}
                        onChange={e => setGuestFirstName(e.target.value)}
                        className="rsvp-input"
                      />
                    </div>
                    <div className="rsvp-field rsvp-field--inline">
                      <label className="rsvp-field-label" htmlFor="guestLastName">{t.lastNameLabel}</label>
                      <input
                        id="guestLastName"
                        type="text"
                        value={guestLastName}
                        onChange={e => setGuestLastName(e.target.value)}
                        className="rsvp-input"
                      />
                    </div>
                  </div>

                  <div className="rsvp-field">
                    <label className="rsvp-field-label" htmlFor="email">{t.emailLabel}</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="rsvp-input"
                      required
                    />
                    <p className="rsvp-field-helper">{t.emailHelper}</p>
                  </div>

                  <div className="rsvp-field">
                    <label className="rsvp-field-label" htmlFor="dietary">
                      {t.dietary}
                    </label>
                    <textarea
                      id="dietary"
                      value={dietary}
                      onChange={e => setDietary(e.target.value)}
                      placeholder={t.dietaryPlaceholder}
                      className="rsvp-textarea"
                      rows={2}
                    />
                  </div>

                  {/* Plus one section */}
                  {guest.plusOne && (
                    <>
                      <div className="rsvp-section-divider">
                        <span className="rsvp-section-divider__line" />
                        <span className="rsvp-section-divider__label">{t.plusOneSection}</span>
                        <span className="rsvp-section-divider__line" />
                      </div>

                      <fieldset className="rsvp-fieldset">
                        <legend className="rsvp-field-label">
                          {t.willJoin(plusOneFirstName.trim() || (lang === 'es' ? 'tu acompañante' : 'your plus one'))}
                        </legend>
                        <RadioPair
                          name="plusOneAttending"
                          value={plusOneAttending}
                          onChange={setPlusOneAttending}
                          yesLabel={t.yesJoining}
                          noLabel={t.noAttending}
                        />
                      </fieldset>

                      {plusOneAttending === true && (
                        <div className="rsvp-reveal">
                          <div className="rsvp-name-fields">
                            <div className="rsvp-field rsvp-field--inline">
                              <label className="rsvp-field-label" htmlFor="plusOneFirstName">{t.plusOneFirstNameLabel}</label>
                              <input
                                id="plusOneFirstName"
                                type="text"
                                value={plusOneFirstName}
                                onChange={e => setPlusOneFirstName(e.target.value)}
                                className="rsvp-input"
                              />
                            </div>
                            <div className="rsvp-field rsvp-field--inline">
                              <label className="rsvp-field-label" htmlFor="plusOneLastName">{t.plusOneLastNameLabel}</label>
                              <input
                                id="plusOneLastName"
                                type="text"
                                value={plusOneLastName}
                                onChange={e => setPlusOneLastName(e.target.value)}
                                className="rsvp-input"
                              />
                            </div>
                          </div>
                          <div className="rsvp-field">
                            <label className="rsvp-field-label" htmlFor="plusOneDietary">
                              {t.dietaryFor(plusOneFirstName.trim() || (lang === 'es' ? 'tu acompañante' : 'your plus one'))}
                            </label>
                            <textarea
                              id="plusOneDietary"
                              value={plusOneDietary}
                              onChange={e => setPlusOneDietary(e.target.value)}
                              placeholder={t.dietaryPlaceholder}
                              className="rsvp-textarea"
                              rows={2}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="rsvp-field rsvp-reveal">
                    <label className="rsvp-field-label" htmlFor="song">
                      {t.song}
                    </label>
                    <input
                      id="song"
                      type="text"
                      value={song}
                      onChange={e => setSong(e.target.value)}
                      placeholder={t.songPlaceholder}
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
                        <span className="rsvp-section-divider__label">{t.beforeYouGo}</span>
                        <span className="rsvp-section-divider__line" />
                      </div>
                      <label className="rsvp-age-check">
                        <input
                          type="checkbox"
                          checked={ageConfirmed}
                          onChange={e => setAgeConfirmed(e.target.checked)}
                        />
                        <span className="rsvp-age-check__box" />
                        <span className="rsvp-age-check__text">{t.ageCheck}</span>
                      </label>
                      <p className="rsvp-age-note">{t.ageNote}</p>

                      {guest.plusOne && (
                        <label className="rsvp-age-check" style={{ marginTop: 16 }}>
                          <input
                            type="checkbox"
                            checked={inviteConfirmed}
                            onChange={e => setInviteConfirmed(e.target.checked)}
                          />
                          <span className="rsvp-age-check__box" />
                          <span className="rsvp-age-check__text">{t.inviteCheck}</span>
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
                    {phase === 'submitting' ? t.sending : t.send}
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
              <p className="rsvp-state__title">{t.successTitle(attending)}</p>
              <p className="rsvp-state__body">{t.successBody(attending)}</p>
              <a href="https://www.jzjs.wedding" className="rsvp-back-link">
                {lang === 'es' ? 'Visitar el sitio de la boda' : 'Visit the wedding site'}
              </a>
            </div>
          )}

          {phase === 'error' && (
            <div className="rsvp-state rsvp-state--error">
              <p className="rsvp-state__title">{t.errorTitle}</p>
              <p className="rsvp-state__body">{t.errorBody}</p>
              <button className="rsvp-submit rsvp-submit--outline" onClick={() => setPhase('form')}>
                {t.tryAgain}
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
            <p className="rsvp-footer-dogs-note">{t.dogsNote}</p>
          </footer>
        )}
      </div>
    </div>
  );
}
