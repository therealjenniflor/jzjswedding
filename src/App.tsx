import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { otomiUrl, otomiStripUrl, P } from './utils/otomi';
import Hero from './components/Hero';
import DateCard from './components/DateCard';
import NuestroDia from './components/NuestroDia';
import TheDay from './components/TheDay';
import DressCode from './components/DressCode';
import WhereToStay from './components/WhereToStay';
import CommonQuestions from './components/CommonQuestions';
import StayTuned from './components/StayTuned';
import Footer from './components/Footer';
import RSVPPage from './pages/RSVPPage';
import RegistryPage from './pages/RegistryPage';

function HomePage() {
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
      <div className="picado-border" aria-hidden="true">
        <img src="images/tiles.png" alt="" loading="lazy" decoding="async" />
      </div>
      <TheDay />
      <div className="picado-border" aria-hidden="true">
        <img src="images/tiles.png" alt="" loading="lazy" decoding="async" />
      </div>
      <WhereToStay />
      <DressCode />
      <CommonQuestions />
      <StayTuned />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/rsvp" element={<RSVPPage />} />
      <Route path="/registry" element={<RegistryPage />} />
    </Routes>
  );
}
