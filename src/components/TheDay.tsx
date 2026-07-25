export default function TheDay() {
  return (
    <section className="the-day-section">
      <div className="the-day__inner">
        <div className="the-day__section-title">
          <img src="images/marigold.png" alt="" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
          <h2 className="the-day__title">El Día <span className="the-day__title-dot">·</span> The Day</h2>
          <img src="images/marigold.png" alt="" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
        </div>
        <div className="the-day__divider">
          <span className="the-day__divider-line"></span>
          <span className="the-day__divider-diamond"></span>
          <span className="the-day__divider-line"></span>
        </div>
        <div className="the-day__grid">

          {/* Ceremony */}
          <div className="the-day__item">
            <div className="the-day__niche">
              <svg width="64" height="58" viewBox="0 0 48 44" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M24 4 L20 9 L24 14 L28 9 Z"/>
                <path d="M20 9 H28"/>
                <circle cx="18" cy="28" r="9"/>
                <circle cx="30" cy="28" r="9"/>
              </svg>
              <span className="the-day__keystone" aria-hidden="true"></span>
            </div>
            <div className="the-day__time">4 PM</div>
            <div className="the-day__label">ceremony</div>
          </div>

          {/* Drinks */}
          <div className="the-day__item">
            <div className="the-day__niche" style={{ flexDirection: 'column', gap: '4px', padding: '8px 6px 6px' }}>
              <div style={{
                width: '100%', height: '52px', flexShrink: 0, position: 'relative', top: '-8px',
                backgroundColor: '#e8761f',
                WebkitMaskImage: "url('images/papel-picado-icon.png')",
                maskImage: "url('images/papel-picado-icon.png')",
                WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain', maskSize: 'contain',
                WebkitMaskPosition: 'center', maskPosition: 'center'
              }}></div>
              <div style={{ position: 'relative', top: '-10px', left: '8px', width: '52px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  position: 'absolute', top: '-2px', right: '-2px',
                  width: '32px', height: '32px',
                  backgroundColor: 'currentColor',
                  transform: 'rotate(45deg)',
                  WebkitMaskImage: "url('images/sombrero.png')",
                  maskImage: "url('images/sombrero.png')",
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center'
                }}></div>
                <svg width="64" height="58" viewBox="0 0 52 44" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative' }}>
                  <path d="M6 14 L16 30 V36"/>
                  <path d="M17 13 L16 30"/>
                  <path d="M11 38 H21"/>
                  <path d="M16 36 V38"/>
                  <path d="M30 14 L20 30 V36"/>
                  <path d="M19 13 L20 30"/>
                  <path d="M15 38 H25"/>
                  <path d="M20 36 V38"/>
                  <path d="M18 10 V7"/>
                  <path d="M14 9 L12 7"/>
                  <path d="M22 9 L24 7"/>
                </svg>
              </div>
              <span className="the-day__keystone" aria-hidden="true"></span>
            </div>
            <div className="the-day__time">5 PM</div>
            <div className="the-day__label">drinks</div>
          </div>

          {/* Dinner */}
          <div className="the-day__item">
            <div className="the-day__niche">
              <svg width="64" height="58" viewBox="0 0 52 44" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="26" cy="22" r="12"/>
                <circle cx="26" cy="22" r="8"/>
                <path d="M8 4 V12"/>
                <path d="M11 4 V12"/>
                <path d="M14 4 V12"/>
                <path d="M8 12 Q11 14 11 17 V38"/>
                <path d="M14 12 Q11 14 11 17"/>
                <path d="M40 4 Q37 16 40 20 H44 V4 Z"/>
                <path d="M42 20 V38"/>
              </svg>
              <span className="the-day__keystone" aria-hidden="true"></span>
            </div>
            <div className="the-day__time">6 PM</div>
            <div className="the-day__label">dinner</div>
          </div>

          {/* Pan Dulce */}
          <div className="the-day__item">
            <div className="the-day__niche">
              <div
                className="the-day__mask-icon"
                style={{
                  WebkitMaskImage: "url('images/pan-dulce.png')",
                  maskImage: "url('images/pan-dulce.png')"
                }}
              ></div>
              <span className="the-day__keystone" aria-hidden="true"></span>
            </div>
            <div className="the-day__time">7 PM</div>
            <div className="the-day__label">pan dulce</div>
          </div>

          {/* Party */}
          <div className="the-day__item">
            <div className="the-day__niche" style={{ flexDirection: 'column', gap: '4px', padding: '8px 6px 6px' }}>
              <div style={{
                width: '28px', height: '30px', flexShrink: 0, position: 'relative', top: '-10px',
                backgroundColor: '#e8761f',
                WebkitMaskImage: "url('images/pinata-2.png'), url('images/pinata-2.png')",
                maskImage: "url('images/pinata-2.png'), url('images/pinata-2.png')",
                WebkitMaskRepeat: 'no-repeat, no-repeat', maskRepeat: 'no-repeat, no-repeat',
                WebkitMaskSize: '100% 100%, 86% 86%', maskSize: '100% 100%, 86% 86%',
                WebkitMaskPosition: 'center, center', maskPosition: 'center, center',
                WebkitMaskComposite: 'xor', maskComposite: 'exclude'
              }}></div>
              <div style={{
                width: '48px', height: '50px', flexShrink: 0, position: 'relative', top: '-4px',
                backgroundColor: '#e8761f',
                WebkitMaskImage: "url('images/peru-dance.png')",
                maskImage: "url('images/peru-dance.png')",
                WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain', maskSize: 'contain',
                WebkitMaskPosition: 'center', maskPosition: 'center'
              }}></div>
              <span className="the-day__keystone" aria-hidden="true"></span>
            </div>
            <div className="the-day__time">8 PM</div>
            <div className="the-day__label">party</div>
          </div>

          {/* Hometime */}
          <div className="the-day__item">
            <div className="the-day__niche">
              <svg width="64" height="58" viewBox="0 0 52 44" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 32 L8 22 Q10 18 14 18 H38 Q42 18 44 22 L48 32 V36 H4 Z"/>
                <path d="M12 22 L17 14 H35 L40 22"/>
                <path d="M26 14 V22"/>
                <circle cx="14" cy="36" r="2.5"/>
                <circle cx="38" cy="36" r="2.5"/>
                <path d="M26 25 c-1.2 -1.4 -3.4 -0.4 -3.4 1.2 c0 1.7 3.4 3.6 3.4 3.6 c0 0 3.4 -1.9 3.4 -3.6 c0 -1.6 -2.2 -2.6 -3.4 -1.2 z"/>
              </svg>
              <span className="the-day__keystone" aria-hidden="true"></span>
            </div>
            <div className="the-day__time">10 PM</div>
            <div className="the-day__label">hometime</div>
          </div>

        </div>
        <p className="the-day__note">
          This is a rough general schedule, subject to change slightly.
        </p>
        <p className="the-day__note the-day__note--es">
          Este es un horario general aproximado, sujeto a cambios ligeros.
        </p>
      </div>
    </section>
  );
}
