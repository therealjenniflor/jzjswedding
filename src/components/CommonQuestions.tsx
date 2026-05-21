import { useState } from 'react';

const faqs = [
  {
    num: '01',
    q: 'I received this link from someone other than Jennifer & Jhonatan. Am I invited?',
    qes: 'Recibí este enlace de alguien que no es Jennifer ni Jhonatan. ¿Estoy invitado/a?',
    a: "If this link didn't come directly from us, unfortunately you are not on our guest list. Our celebration is intimate and invite-only and we ask that you kindly respect that.\n\nIf you believe there's been a mix-up, please be patient with us as we're still in the process of distributing invites. We kindly ask that you refrain from reaching out directly in the meantime. We will make sure to update the site letting you know all invitations have been sent out.",
    aes: 'Si este enlace no vino directamente de nosotros, lamentablemente no estás en nuestra lista de invitados. Nuestra celebración es íntima y solo por invitación, y te pedimos que lo respetes.\n\nSi crees que hubo un malentendido, por favor ten paciencia, ya que aún estamos en proceso de distribuir las invitaciones. Te pedimos que por el momento te abstengas de contactarnos directamente. Nos aseguraremos de actualizar el sitio para informarte cuando todas las invitaciones hayan sido enviadas.'
  },
  {
    num: '02',
    q: 'When can I RSVP, and when is it due?',
    qes: '¿Cuándo puedo confirmar mi asistencia?',
    a: 'We are working on the RSVP and will reach out to each person individually with their specific invitation details. Stay tuned!',
    aes: 'Estamos trabajando en el RSVP y nos pondremos en contacto con cada persona individualmente con los detalles de su invitación. ¡Pendientes!'
  },
  {
    num: '03',
    q: 'Is there parking at the venue?',
    qes: '¿Hay estacionamiento en el lugar?',
    a: 'Yes, but space is limited. Street parking is also available nearby. Note: depending on where you park on the street, there is a small incline.',
    aes: 'Sí, pero el espacio es limitado. También hay estacionamiento en la calle. Nota: dependiendo de dónde estaciones, hay una pequeña pendiente.'
  },
  {
    num: '04',
    q: 'Can I bring a plus-one?',
    qes: '¿Puedo traer un acompañante?',
    a: 'Your invite will have the names of all invitees. If your invite includes a plus-one, then yes! Otherwise, we ask that you come solo.',
    aes: 'Tu invitación tendrá los nombres de todos los invitados. Si tu invitación incluye un acompañante, ¡entonces sí! De lo contrario, te pedimos que vengas solo/a.'
  },
  {
    num: '05',
    q: 'Are kids allowed?',
    qes: '¿Se permiten niños?',
    a: 'This is an 18+ and invite-only event. We appreciate your understanding!',
    aes: 'Este es un evento solo para mayores de 18 años y con invitación. ¡Agradecemos su comprensión!'
  },
  {
    num: '06',
    q: 'Is there going to be an open bar?',
    qes: '¿Habrá barra libre?',
    a: "YOU ALREADY KNOW IT! Drinks are on us. The hangover is on you. Just don't be acting a mess. 🥂",
    aes: '¡YA LO SABES! Las bebidas corren por nuestra cuenta. La resaca corre por la tuya. Pero pórtate bien. 🥂'
  },
  {
    num: '07',
    q: "What's the dress code?",
    qes: '¿Cuál es el código de vestimenta?',
    a: "Wear any color you'd like, or take inspiration from our wedding colors below. Please come looking your absolute best!",
    aes: '¡Por favor ven luciendo lo mejor de ti! Usa el color que quieras, o inspírate en los colores de nuestra boda a continuación.',
    swatches: [
      { hex: '#8a3a1f', name: 'Sienna' },
      { hex: '#e8761f', name: 'Marigold' },
      { hex: '#4a121b', name: 'Burgundy' },
      { hex: '#1e0a2e', name: 'Deep Plum' },
      { hex: '#061428', name: 'Cobalt' },
    ],
  },
  {
    num: '08',
    q: 'Where will the ceremony and reception take place?',
    qes: '¿Dónde será la ceremonia y recepción?',
    a: 'The ceremony will be on the outdoor patio of the Mansion, not on the grass, so heels are totally fine! The reception will be held inside.',
    aes: 'La ceremonia será en el patio exterior de la Mansión, no en el césped, ¡así que los tacones están perfectos! La recepción será adentro.'
  }
];

export default function CommonQuestions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(prev => (prev === i ? null : i));
  }

  return (
    <section className="faq-section">
      <div className="faq-section__overlay" aria-hidden="true"></div>
      <div className="faq-section__inner">
        <div className="faq-section__title">Good to Know</div>
        <div className="faq-section__sub">Bueno Saber</div>
        <div className="faq-section__divider">
          <span className="faq-section__divider-line"></span>
          <span className="faq-section__divider-diamond"></span>
          <span className="faq-section__divider-line"></span>
        </div>
        <div className="faq-panel">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div className="faq-item" key={faq.num}>
                <button
                  className="faq-btn"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-btn__left">
                    <span
                      className="faq-diamond"
                      style={{ opacity: isOpen ? 1 : 0.55 }}
                    ></span>
                    <span
                      className="faq-num"
                      style={{ color: isOpen ? '#e8761f' : 'rgba(245,236,220,0.6)' }}
                    >{faq.num}</span>
                    <span className="faq-question-wrap">
                      <span>{faq.q}</span>
                      <span className="faq-question-es">{faq.qes}</span>
                    </span>
                  </span>
                  <span
                    className="faq-icon"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >+</span>
                </button>
                <div
                  className="faq-answer"
                  style={{ maxHeight: isOpen ? '600px' : '0px' }}
                >
                  {faq.a.split('\n\n').map((para, pi) => <p key={pi}>{para}</p>)}
                  {'swatches' in faq && (
                    <div className="faq-swatches">
                      {(faq as typeof faq & { swatches: { hex: string; name: string }[] }).swatches.map(s => (
                        <div className="faq-swatch" key={s.hex}>
                          <span className="faq-swatch__dot" style={{ background: s.hex }} />
                          <span className="faq-swatch__label">{s.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {faq.aes.split('\n\n').map((para, pi) => <p key={pi} className="faq-es">{para}</p>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
