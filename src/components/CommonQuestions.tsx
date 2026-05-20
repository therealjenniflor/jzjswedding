import { useState } from 'react';

const faqs = [
  {
    num: '01',
    q: 'Is there parking at the venue?',
    qes: '¿Hay estacionamiento en el lugar?',
    a: 'Yes, but space is limited. Street parking is also available nearby. Note: depending on where you park on the street, there is a small incline.',
    aes: 'Sí, pero el espacio es limitado. También hay estacionamiento en la calle. Nota: dependiendo de dónde estaciones, hay una pequeña pendiente.'
  },
  {
    num: '02',
    q: 'Can I bring a plus-one?',
    qes: '¿Puedo traer un acompañante?',
    a: 'Your invite will have the names of all invitees. If your invite includes a plus-one, then yes! Otherwise, we ask that you come solo.',
    aes: 'Tu invitación tendrá los nombres de todos los invitados. Si tu invitación incluye un acompañante, ¡entonces sí! De lo contrario, te pedimos que vengas solo/a.'
  },
  {
    num: '03',
    q: 'Are kids allowed?',
    qes: '¿Se permiten niños?',
    a: 'This is an 18+ and invite-only event. We appreciate your understanding!',
    aes: 'Este es un evento solo para mayores de 18 años y con invitación. ¡Agradecemos su comprensión!'
  },
  {
    num: '04',
    q: 'Is there going to be an open bar?',
    qes: '¿Habrá barra libre?',
    a: "YOU ALREADY KNOW IT! Drinks are on us. The hangover is on you. Just don't be acting a mess. 🥂",
    aes: '¡YA LO SABES! Las bebidas corren por nuestra cuenta. La resaca corre por la tuya. Pero pórtate bien. 🥂'
  },
  {
    num: '05',
    q: "What's the dress code?",
    qes: '¿Cuál es el código de vestimenta?',
    a: "Wear any color you'd like, or take inspiration from the wedding colors above. Please come looking your absolute best!",
    aes: '¡Por favor ven luciendo lo mejor de ti! Usa el color que quieras, o inspírate en los colores de la boda arriba.'
  },
  {
    num: '06',
    q: 'Where will the ceremony and reception take place?',
    qes: '¿Dónde será la ceremonia y recepción?',
    a: 'The ceremony will be on the outdoor patio of the Mansion, not on the grass, so heels are totally fine! The reception will be held inside.',
    aes: 'La ceremonia será en el patio exterior de la Mansión, no en el césped, ¡así que los tacones están perfectos! La recepción será adentro.'
  },
  {
    num: '07',
    q: 'When can I RSVP, and when is it due?',
    qes: '¿Cuándo puedo confirmar mi asistencia?',
    a: 'We are working on the RSVP and will reach out to each person individually with their specific invitation details. Stay tuned!',
    aes: 'Estamos trabajando en el RSVP y nos pondremos en contacto con cada persona individualmente con los detalles de su invitación. ¡Pendientes!'
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
        <div className="faq-section__title">Common Questions</div>
        <div className="faq-section__sub">Preguntas frecuentes</div>
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
                  style={{ maxHeight: isOpen ? '240px' : '0px' }}
                >
                  <p>{faq.a}</p>
                  <p className="faq-es">{faq.aes}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
