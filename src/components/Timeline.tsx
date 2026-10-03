import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Shared layout for the unlisted wedding-day timeline pages.
// Times are minutes after midnight on Oct 30, 2026 (Pacific).
export type Lang = 'en' | 'es';
export type Text = Record<Lang, string>;
export type TimelineEvent = {
  name: Text;
  start: number;
  end?: number;
  place?: string;
  link?: { to: string; label: Text };
};
export type TimelineSection = { title: Text; events: TimelineEvent[] };
export type TimelineCopy = Record<Lang, {
  eyebrow: string;
  title: string;
  date: string;
  note: string;
}>;

const LANG_KEY = 'timeline-lang';
const nowLabel: Text = { en: 'Now', es: 'Ahora' };

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch { /* storage unavailable */ }
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
}

function fmt(mins: number, lang: Lang) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const suffix = lang === 'es' ? (h < 12 ? 'a. m.' : 'p. m.') : (h < 12 ? 'AM' : 'PM');
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

// Minutes since midnight in Pacific time, but only on the wedding day.
function weddingDayMinutes(): number | null {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find(p => p.type === type)?.value;
  if (`${get('year')}-${get('month')}-${get('day')}` !== '2026-10-30') return null;
  return Number(get('hour')) * 60 + Number(get('minute'));
}

function useNoIndex(title: string) {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const prevTitle = document.title;
    document.title = `${title} • Jennifer & Jhonatan`;
    return () => {
      meta.remove();
      document.title = prevTitle;
    };
  }, [title]);
}

type Props = {
  copy: TimelineCopy;
  sections: TimelineSection[];
  back?: { to: string; label: Text };
  // Put the event name in the left column and the time on the right.
  nameFirst?: boolean;
};

export default function Timeline({ copy, sections, back, nameFirst }: Props) {
  const [now, setNow] = useState(weddingDayMinutes);
  const [lang, setLang] = useState<Lang>(initialLang);
  const text = copy[lang];
  useNoIndex(text.title);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* storage unavailable */ }
  }, [lang]);

  useEffect(() => {
    const id = setInterval(() => setNow(weddingDayMinutes()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const isNow = (e: TimelineEvent) =>
    now !== null && now >= e.start && now < (e.end ?? e.start + 5);
  const isPast = (e: TimelineEvent) =>
    now !== null && now >= (e.end ?? e.start + 5);

  return (
    <div className={'timeline-page' + (nameFirst ? ' timeline-page--name-first' : '')}>
      {back && (
        <Link to={back.to} className="rsvp-home-link">← {back.label[lang]}</Link>
      )}
      <div className="timeline-lang" role="group" aria-label="Language / Idioma">
        {(['en', 'es'] as const).map(l => (
          <button
            key={l}
            type="button"
            className={'timeline-lang__btn' + (lang === l ? ' timeline-lang__btn--active' : '')}
            aria-pressed={lang === l}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="timeline-page__inner">
        <header className="timeline-header">
          <p className="timeline-eyebrow">{text.eyebrow}</p>
          <h1 className="timeline-title">{text.title}</h1>
          <p className="timeline-date">{text.date}</p>
          <div className="the-day__divider">
            <span className="the-day__divider-line"></span>
            <span className="the-day__divider-diamond"></span>
            <span className="the-day__divider-line"></span>
          </div>
        </header>

        {sections.map(section => (
          <section className="timeline-section" key={section.title.en}>
            <h2 className="timeline-section__title">{section.title[lang]}</h2>
            <ol className="timeline-list">
              {section.events.map(e => (
                <li
                  key={`${e.start}-${e.name.en}`}
                  className={
                    'timeline-item' +
                    (isNow(e) ? ' timeline-item--now' : '') +
                    (isPast(e) ? ' timeline-item--past' : '')
                  }
                >
                  <span className="timeline-item__dot" aria-hidden="true" />
                  <div className="timeline-item__time">
                    {fmt(e.start, lang)}
                    {e.end !== undefined && (
                      <span className="timeline-item__end">– {fmt(e.end, lang)}</span>
                    )}
                  </div>
                  <div className="timeline-item__name">
                    {e.name[lang]}
                    {isNow(e) && <span className="timeline-item__badge">{nowLabel[lang]}</span>}
                    {e.place && <span className="timeline-item__place">{e.place}</span>}
                    {e.link && (
                      <Link to={e.link.to} className="timeline-item__link">
                        {e.link.label[lang]} →
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <p className="the-day__note">{text.note}</p>
      </div>
    </div>
  );
}
