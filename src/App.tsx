import { useEffect } from 'react';
import { otomiUrl, otomiStripUrl, P } from './utils/otomi';
import Hero from './components/Hero';
import DateCard from './components/DateCard';
import NuestroDia from './components/NuestroDia';
import TheDay from './components/TheDay';
import CommonQuestions from './components/CommonQuestions';
import StayTuned from './components/StayTuned';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--otomi-url-cream', otomiUrl());
    root.style.setProperty('--otomi-url-dark', otomiUrl({ bg: P.burgundy, fg: P.gold }));
    root.style.setProperty('--otomi-url-strip', otomiStripUrl());
  }, []);

  return (
    <>
      <Hero />
      <DateCard />
      <NuestroDia />
      <TheDay />
      <div className="picado-border" aria-hidden="true">
        <img src="images/tiles.png" alt="" />
      </div>
      <CommonQuestions />
      <StayTuned />
      <Footer />
    </>
  );
}
