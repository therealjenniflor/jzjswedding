import Timeline, { type TimelineCopy, type TimelineSection } from '../components/Timeline';

const t = (h: number, m = 0) => h * 60 + m;

const copy: TimelineCopy = {
  en: {
    eyebrow: 'Jennifer & Jhonatan · Bridal Party',
    title: 'Hair & Makeup',
    date: 'Friday · October 30, 2026 · 72 Rio',
    note: 'All services will be completed by 12:45 PM',
  },
  es: {
    eyebrow: 'Jennifer & Jhonatan · Damas de Honor',
    title: 'Peinado y Maquillaje',
    date: 'Viernes · 30 de octubre de 2026 · 72 Rio',
    note: 'Todos los servicios terminarán a las 12:45 p. m.',
  },
};

const arrival = { en: 'Arrival & Setup', es: 'Llegada y preparación' };
const hair = (who: string) => ({ en: `${who} - Hair`, es: `${who} - Peinado` });
const makeup = (who: string) => ({ en: `${who} - Makeup`, es: `${who} - Maquillaje` });
const both = (who: string) => ({ en: `${who} - Hair & Makeup`, es: `${who} - Peinado y maquillaje` });

const sections: TimelineSection[] = [
  {
    title: { en: 'Hairstylist', es: 'Estilista' },
    events: [
      { name: arrival, start: t(5, 50) },
      { name: hair('Karlee'), start: t(6), end: t(6, 45) },
      { name: hair('Naomi'), start: t(6, 45), end: t(7, 30) },
      { name: hair('Gaby'), start: t(7, 30), end: t(8, 15) },
      { name: both('Magdalena'), start: t(8, 15), end: t(9, 45) },
      { name: both('Jennifer'), start: t(9, 45), end: t(12) },
      { name: hair('Teresa'), start: t(12), end: t(12, 45) },
    ],
  },
  {
    title: { en: 'Second Makeup Artist', es: 'Segunda maquillista' },
    events: [
      { name: arrival, start: t(8, 5) },
      { name: makeup('Karlee'), start: t(8, 15), end: t(9, 15) },
      { name: makeup('Amelia'), start: t(9, 15), end: t(10, 15) },
      { name: makeup('Teresa'), start: t(10, 15), end: t(11, 15) },
      { name: makeup('Gaby'), start: t(11, 15), end: t(12, 15) },
    ],
  },
];

export default function BridalTimelinePage() {
  return (
    <Timeline
      copy={copy}
      sections={sections}
      nameFirst
      back={{ to: '/timeline', label: { en: 'Full timeline', es: 'Horario completo' } }}
    />
  );
}
