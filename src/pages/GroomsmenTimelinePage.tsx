import Timeline, { type TimelineCopy, type TimelineSection } from '../components/Timeline';

const t = (h: number, m = 0) => h * 60 + m;

const copy: TimelineCopy = {
  en: {
    eyebrow: 'Jennifer & Jhonatan · Groomsmen',
    title: 'Groomsmen',
    date: 'Friday · October 30, 2026 · Wild Ones Salon',
    note: 'Everyone at Sequoia Mansion by 1:00 PM',
  },
  es: {
    eyebrow: 'Jennifer & Jhonatan · Padrinos',
    title: 'Los Padrinos',
    date: 'Viernes · 30 de octubre de 2026 · Wild Ones Salon',
    note: 'Todos en Sequoia Mansion a la 1:00 PM',
  },
};

const sections: TimelineSection[] = [
  {
    title: { en: 'Getting Ready', es: 'Preparativos' },
    events: [
      {
        name: { en: 'Mike, Kevin & Jhonatan arrive', es: 'Llegan Mike, Kevin y Jhonatan' },
        start: t(10),
        end: t(12),
        place: 'Wild Ones Salon',
      },
    ],
  },
  {
    title: { en: 'Food Run & Travel to Sequoia', es: 'Recoger comida y viajar a Sequoia' },
    events: [
      { name: { en: 'Mike — Mexican Food', es: 'Mike — Comida mexicana' }, start: t(12), end: t(13) },
      { name: { en: 'Kevin — Peruvian Food', es: 'Kevin — Comida peruana' }, start: t(12), end: t(13) },
      { name: { en: 'Jhonatan — Pan Dulce', es: 'Jhonatan — Pan dulce' }, start: t(12), end: t(13) },
    ],
  },
];

export default function GroomsmenTimelinePage() {
  return (
    <Timeline
      copy={copy}
      sections={sections}
      nameFirst
      back={{ to: '/timeline', label: { en: 'Full timeline', es: 'Horario completo' } }}
    />
  );
}
