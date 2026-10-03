import Timeline, { type TimelineCopy, type TimelineSection } from '../components/Timeline';

const t = (h: number, m = 0) => h * 60 + m;

const copy: TimelineCopy = {
  en: {
    eyebrow: 'Jennifer & Jhonatan · Wedding Party',
    title: 'The Timeline',
    date: 'Friday · October 30, 2026 · Sequoia Mansion',
    note: 'Times are approximate',
  },
  es: {
    eyebrow: 'Jennifer & Jhonatan · Cortejo Nupcial',
    title: 'El Horario',
    date: 'Viernes · 30 de octubre de 2026 · Sequoia Mansion',
    note: 'Los horarios son aproximados',
  },
};

const sections: TimelineSection[] = [
  {
    title: { en: 'Getting Ready', es: 'Preparativos' },
    events: [
      {
        name: { en: 'Bridal Party Gets Ready', es: 'Las damas se preparan' },
        start: t(5, 55),
        end: t(12, 45),
        place: '72 Rio',
        link: { to: '/timeline-bridal', label: { en: 'Hair & makeup schedule', es: 'Horario de peinado y maquillaje' } },
      },
      {
        name: { en: 'Groomsmen Get Ready', es: 'Los padrinos se preparan' },
        start: t(10),
        end: t(13),
        place: 'Wild Ones Salon',
        link: { to: '/timeline-groomsmen', label: { en: 'Groomsmen schedule', es: 'Horario de los padrinos' } },
      },
      { name: { en: 'Travel to Sequoia Mansion', es: 'Traslado a Sequoia Mansion' }, start: t(13), end: t(14) },
    ],
  },
  {
    title: { en: 'Vendors On Site', es: 'Proveedores' },
    events: [
      { name: { en: 'DJ', es: 'DJ' }, start: t(15), end: t(22) },
      { name: { en: 'Photographer', es: 'Fotógrafo' }, start: t(15), end: t(22) },
      { name: { en: 'Mariachi', es: 'Mariachi' }, start: t(15, 30), end: t(17, 30) },
    ],
  },
  {
    title: { en: 'Ceremony', es: 'Ceremonia' },
    events: [
      { name: { en: 'Guests Arrive', es: 'Llegada de invitados' }, start: t(15, 30), end: t(16) },
      { name: { en: 'Ceremony', es: 'Ceremonia' }, start: t(16), end: t(16, 30) },
      { name: { en: 'Cocktail Hour', es: 'Hora del cóctel' }, start: t(16, 30), end: t(17, 30) },
    ],
  },
  {
    title: { en: 'Reception', es: 'Recepción' },
    events: [
      { name: { en: 'Grand Entrance', es: 'Gran entrada' }, start: t(17, 30), end: t(17, 35) },
      { name: { en: 'Speeches (Bride/Groom)', es: 'Discursos (Novios)' }, start: t(17, 35), end: t(17, 40) },
      { name: { en: 'First Dance', es: 'Primer baile' }, start: t(17, 40), end: t(17, 45) },
      { name: { en: 'Buffet Service', es: 'Servicio de buffet' }, start: t(17, 45), end: t(18, 30) },
      { name: { en: 'Speeches (Amelia, Carlos)', es: 'Discursos (Amelia, Carlos)' }, start: t(18, 30), end: t(18, 40) },
      { name: { en: 'Salazar Fam - Get Ready', es: 'Familia Salazar - Prepararse' }, start: t(18, 30), end: t(18, 45) },
      { name: { en: 'Dance - Father/Daughter', es: 'Baile - Padre/Hija' }, start: t(18, 40), end: t(18, 45) },
      { name: { en: 'Speeches (MOHs)', es: 'Discursos (Damas de honor)' }, start: t(18, 45), end: t(18, 55) },
      { name: { en: 'Dessert Service', es: 'Servicio de postres' }, start: t(18, 45), end: t(19, 30) },
      { name: { en: 'Dance - Mother/Son', es: 'Baile - Madre/Hijo' }, start: t(18, 55), end: t(19) },
      { name: { en: 'Speeches (BMs)', es: 'Discursos (Padrinos)' }, start: t(19), end: t(19, 10) },
      { name: { en: 'Peruvian Dancers', es: 'Bailarines peruanos' }, start: t(19, 10), end: t(19, 25) },
    ],
  },
  {
    title: { en: 'Fiesta', es: 'Fiesta' },
    events: [
      { name: { en: 'Open Dancing', es: 'Pista de baile abierta' }, start: t(19, 30), end: t(22) },
      { name: { en: 'Plushy Toss', es: 'Lanzamiento de peluche' }, start: t(20, 25), end: t(20, 35) },
      { name: { en: 'Piñata', es: 'Piñata' }, start: t(20, 35), end: t(21) },
      { name: { en: 'Private Last Dance', es: 'Último baile privado' }, start: t(21, 55), end: t(22) },
      { name: { en: 'Grand Exit', es: 'Gran salida' }, start: t(22), end: t(22, 5) },
    ],
  },
];

export default function TimelinePage() {
  return <Timeline copy={copy} sections={sections} />;
}
