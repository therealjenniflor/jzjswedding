import Timeline, {
  type Text,
  type TimelineCopy,
  type TimelineEvent,
  type TimelineSection,
  type TimelineView,
} from '../components/Timeline';
import { fmt } from '../utils/time';

const t = (h: number, m = 0) => h * 60 + m;

const copy: TimelineCopy = {
  en: {
    eyebrow: 'Jennifer & Jhonatan · Bridal Party',
    title: 'Hair & Makeup',
    date: 'Friday · October 30, 2026 · 72 Rio',
    note: 'All services will be completed by 1:45 PM',
  },
  es: {
    eyebrow: 'Jennifer & Jhonatan · Damas de Honor',
    title: 'Peinado y Maquillaje',
    date: 'Viernes · 30 de octubre de 2026 · 72 Rio',
    note: 'Todos los servicios terminarán a las 1:45 PM',
  },
};

type Service = 'hair' | 'makeup' | 'both';
type Slot = { who: string; service: Service; start: number; end: number };
type Artist = { name: string; title: Text; arrive: number; slots: Slot[] };

const arrival = { en: 'Arrival & Setup', es: 'Llegada y preparación' };
const serviceLabel: Record<Service, Text> = {
  hair: { en: 'Hair', es: 'Peinado' },
  makeup: { en: 'Makeup', es: 'Maquillaje' },
  both: { en: 'Hair & Makeup', es: 'Peinado y maquillaje' },
};
const freeTime = { en: 'Free time', es: 'Tiempo libre' };

const artists: Artist[] = [
  {
    name: 'Anna',
    title: { en: 'Hairstylist', es: 'Estilista' },
    arrive: t(6, 30),
    slots: [
      { who: 'Karlee', service: 'hair', start: t(6, 40), end: t(7, 25) },
      { who: 'Naomi', service: 'hair', start: t(7, 25), end: t(8, 10) },
      { who: 'Amelia', service: 'hair', start: t(8, 10), end: t(8, 50) },
      { who: 'Gaby', service: 'hair', start: t(8, 50), end: t(9, 30) },
      { who: 'Magdalena', service: 'both', start: t(9, 30), end: t(10, 55) },
      { who: 'Jennifer', service: 'both', start: t(10, 55), end: t(13, 10) },
      { who: 'Teresa', service: 'hair', start: t(13, 10), end: t(13, 45) },
    ],
  },
  {
    name: 'Evelina',
    title: { en: 'Second Makeup Artist', es: 'Segunda maquillista' },
    arrive: t(9, 5),
    slots: [
      { who: 'Karlee', service: 'makeup', start: t(9, 15), end: t(10, 15) },
      { who: 'Amelia', service: 'makeup', start: t(10, 15), end: t(11, 15) },
      { who: 'Teresa', service: 'makeup', start: t(11, 15), end: t(12, 15) },
      { who: 'Gaby', service: 'makeup', start: t(12, 15), end: t(13, 15) },
    ],
  },
];

const byArtist: TimelineSection[] = artists.map(a => ({
  title: a.title,
  events: [
    { name: arrival, start: a.arrive, end: a.arrive + 10 },
    ...a.slots.map(s => ({
      name: { en: `${s.who} - ${serviceLabel[s.service].en}`, es: `${s.who} - ${serviceLabel[s.service].es}` },
      start: s.start,
      end: s.end,
    })),
  ],
}));

// One section per person, ordered by when they first sit down,
// with any gap between their appointments shown as free time.
const people = new Map<string, (Slot & { artist: string })[]>();
for (const a of artists) {
  for (const s of a.slots) people.set(s.who, [...(people.get(s.who) ?? []), { ...s, artist: a.name }]);
}
const byPerson: TimelineSection[] = [...people.entries()]
  .map(([who, slots]) => ({ who, slots: slots.sort((x, y) => x.start - y.start) }))
  .sort((x, y) => x.slots[0].start - y.slots[0].start)
  .map(({ who, slots }) => {
    const first = slots[0].start;
    const last = slots[slots.length - 1].end;
    const events: TimelineEvent[] = [];
    slots.forEach((s, i) => {
      const prev = slots[i - 1];
      if (prev && s.start > prev.end) events.push({ name: freeTime, start: prev.end, end: s.start, muted: true });
      events.push({ name: serviceLabel[s.service], start: s.start, end: s.end, place: s.artist });
    });
    return {
      title: { en: who, es: who },
      highlight: { en: `Arrive by ${fmt(first - 10)}`, es: `Llegar a las ${fmt(first - 10)}` },
      subtitle: { en: `Start ${fmt(first)} · Done ${fmt(last)}`, es: `Inicio ${fmt(first)} · Lista ${fmt(last)}` },
      events,
    };
  });

const views: TimelineView[] = [
  { label: { en: 'By person', es: 'Por persona' }, sections: byPerson },
  { label: { en: 'By artist', es: 'Por estilista' }, sections: byArtist },
];

export default function BridalTimelinePage() {
  return (
    <Timeline
      copy={copy}
      views={views}
      nameFirst
      back={{ to: '/timeline', label: { en: 'Full timeline', es: 'Horario completo' } }}
    />
  );
}
