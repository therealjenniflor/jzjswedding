import { useState, useEffect } from 'react';

const slides = [
  'images/slideshow/img-1.jpg',
  'images/slideshow/img-2.jpg',
  'images/slideshow/img-3.jpg',
  'images/slideshow/img-4.jpg',
  'images/slideshow/img-5.jpg',
  'images/slideshow/img-6.jpg',
];

export default function DateCard() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(i => (i + 1) % slides.length), 3000);
    return () => clearInterval(id);
  }, []);

  function prev() { setCurrent(i => (i - 1 + slides.length) % slides.length); }
  function next() { setCurrent(i => (i + 1) % slides.length); }

  return (
    <section className="date-card-section">
      <div className="date-card">
        <div className="date-card__grid">
          <div className="date-card__photo-wrap">
            <div className="date-card__arch-frame">
              <div className="date-card__arch-outline"></div>
              <div className="date-card__arch-keystone"></div>
              <div className="date-card__photo-inner">
                {slides.map((src, i) => (
                  <img
                    key={src}
                    className="date-card__photo"
                    src={src}
                    alt={`Couple photo ${i + 1}`}
                    loading={i <= 1 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: i === current ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                      zIndex: i === current ? 1 : 0,
                    }}
                  />
                ))}
                <button className="slide-btn slide-btn--prev" onClick={prev} aria-label="Previous photo">&#8249;</button>
                <button className="slide-btn slide-btn--next" onClick={next} aria-label="Next photo">&#8250;</button>
                <div className="slide-dots">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      className={`slide-dot${i === current ? ' slide-dot--active' : ''}`}
                      onClick={() => setCurrent(i)}
                      aria-label={`Go to photo ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="date-card__info">
            <img
              src="images/llama-small-1.png"
              alt=""
              loading="lazy"
              decoding="async"
              style={{ width: '90px', marginBottom: '16px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.3))' }}
            />
            <div className="date-card__date">October 30<sup>th</sup></div>
            <div className="date-card__at">4:00 PM &middot; at</div>
            <div className="date-card__venue">Sequoia Mansion</div>
            <div className="date-card__location">
              <span>Placerville</span>
              <span className="meta-dot"></span>
              <span>California</span>
              <span className="meta-dot"></span>
              <span>2026</span>
            </div>
          </div>
        </div>
      </div>
      <img className="date-card__calla" src="images/calla-lillies-1.png" alt="" loading="lazy" decoding="async" />
    </section>
  );
}
