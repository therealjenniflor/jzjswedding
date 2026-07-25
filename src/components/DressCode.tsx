import { useState } from 'react';

const wearSwatches = [
  {
    hex: '#111111', name: 'Black',
    shades: [
      { hex: '#000000', name: 'Jet' },
      { hex: '#2b2b2b', name: 'Charcoal' },
      { hex: '#454545', name: 'Graphite' },
    ],
  },
  {
    hex: '#0E1E07', name: 'Forest Green',
    shades: [
      { hex: '#16330f', name: 'Pine' },
      { hex: '#1f4d17', name: 'Hunter' },
      { hex: '#2b1d14', name: 'Espresso' },
    ],
  },
  {
    hex: '#1e0a2e', name: 'Deep Plum',
    shades: [
      { hex: '#2d1240', name: 'Aubergine' },
      { hex: '#3a1a4a', name: 'Wine Plum' },
      { hex: '#5c3a6b', name: 'Mauve' },
    ],
  },
  {
    hex: '#3d0c14', name: 'Burgundy',
    shades: [
      { hex: '#5c1220', name: 'Wine' },
      { hex: '#6b1a1a', name: 'Maroon' },
      { hex: '#4a1010', name: 'Oxblood' },
    ],
  },
];

const avoidSwatches = [
  {
    hex: '#061428', name: 'Navy',
    shades: [
      { hex: '#0a1f3d', name: 'Ink' },
      { hex: '#1a3a5c', name: 'Steel Blue' },
      { hex: '#2c4a6b', name: 'Slate' },
    ],
  },
  {
    hex: '#6B2900', name: 'Burnt Sienna',
    shades: [
      { hex: '#a8511a', name: 'Rust' },
      { hex: '#8a4a1f', name: 'Terracotta' },
      { hex: '#9c5a2a', name: 'Copper' },
    ],
  },
  {
    hex: '#ffffff', name: 'Any Shade or Tone of White', darkX: true,
    shades: [
      { hex: '#f8f4e8', name: 'Ivory' },
      { hex: '#f0ead6', name: 'Eggshell' },
      { hex: '#eae6dc', name: 'Pearl' },
    ],
  },
  {
    hex: '#6B6B3A', name: 'Olive',
    shades: [
      { hex: '#6b5a2e', name: 'Moss Brown' },
      { hex: '#5c4a1f', name: 'Umber' },
      { hex: '#4a3018', name: 'Chestnut Brown' },
    ],
  },
];

export default function DressCode() {
  const [openHex, setOpenHex] = useState<string | null>(null);

  function toggle(hex: string) {
    setOpenHex(prev => (prev === hex ? null : hex));
  }

  return (
    <section className="dress-code-section">
      <div className="dress-code__inner">
        <div className="section-title">
          <div className="section-title__row">
            <h2>Dress Code</h2>
          </div>
          <div className="section-title__rule">
            <span className="section-title__line"></span>
            <span className="section-title__diamond"></span>
            <span className="section-title__line"></span>
          </div>
          <div className="section-title__sub">Código de Vestimenta</div>
        </div>

        <h3 className="dress-code__theme">Dark, Neutral Tones</h3>
        <div className="dress-code__theme-es">Tonos Oscuros y Neutros</div>

        <p className="dress-code__intro">
          Wear any color you'd like, or take inspiration from the 4 colors below.
          Please come looking your absolute best! And no, it doesn't have to be one of these four. We're not trying
          to put the whole rainbow on here, but you get the idea.
        </p>
        <p className="dress-code__intro dress-code__intro--es">
          Usa el color que quieras, o inspírate en los 4 colores a
          continuación. ¡Por favor ven luciendo lo mejor de ti!
        </p>

        <p className="dress-code__hint">
          Tap on mobile, hover on desktop for more shades
          <span className="dress-code__hint-es">Toca en el celular, o pasa el cursor en la computadora para ver más tonos</span>
        </p>

        <div className="dress-code__swatches">
          {wearSwatches.map(s => {
            const isOpen = openHex === s.hex;
            return (
              <div
                className={`dress-code__swatch${isOpen ? ' dress-code__swatch--open' : ''}`}
                key={s.hex}
                onMouseEnter={() => setOpenHex(s.hex)}
                onMouseLeave={() => setOpenHex(prev => (prev === s.hex ? null : prev))}
                onClick={() => toggle(s.hex)}
              >
                <span className="dress-code__dot" style={{ background: s.hex }} />
                <span className="dress-code__label">{s.name}</span>
                <div className="dress-code__shades" aria-hidden={!isOpen}>
                  {s.shades.map(sh => (
                    <div className="dress-code__shade" key={sh.hex}>
                      <span className="dress-code__shade-dot" style={{ background: sh.hex }} />
                      <span className="dress-code__shade-label">{sh.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="dress-code__avoid">
          <p className="dress-code__avoid-note">
            Below are the colors we ask to avoid, as they're a little too close to our bridal party. We appreciate it so much!
          </p>
          <p className="dress-code__avoid-note dress-code__avoid-note--es">
            Les pedimos amablemente que eviten estos colores, ya que se parecen un poco demasiado a nuestra paleta de boda. ¡Se los agradecemos mucho!
          </p>
          <div className="dress-code__swatches dress-code__swatches--avoid">
            {avoidSwatches.map(s => {
              const isOpen = openHex === s.hex;
              return (
                <div
                  className={`dress-code__swatch${isOpen ? ' dress-code__swatch--open' : ''}`}
                  key={s.hex}
                  onMouseEnter={() => setOpenHex(s.hex)}
                  onMouseLeave={() => setOpenHex(prev => (prev === s.hex ? null : prev))}
                  onClick={() => toggle(s.hex)}
                >
                  <span
                    className={`dress-code__dot dress-code__dot--avoid${s.darkX ? ' dress-code__dot--dark-x' : ''}`}
                    style={{ background: s.hex }}
                  />
                  <span className="dress-code__label">{s.name}</span>
                  <div className="dress-code__shades" aria-hidden={!isOpen}>
                    {s.shades.map(sh => (
                      <div className="dress-code__shade" key={sh.hex}>
                        <span className="dress-code__shade-dot" style={{ background: sh.hex }} />
                        <span className="dress-code__shade-label">{sh.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
