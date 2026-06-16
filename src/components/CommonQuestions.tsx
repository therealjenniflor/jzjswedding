import { useState } from 'react';

const faqs = [
  {
    num: '01',
    q: 'What is a Save the Date, and what does it mean that I got this link from Jennifer & Jhonatan?',
    qes: '¿Qué es un Save the Date y qué significa que recibí este enlace de Jennifer y Jhonatan?',
    a: "A Save the Date is an early announcement letting you know you're invited to our wedding. The Save the Date text we send IS your invitation — there is no separate formal invite coming.\n\nIf Jennifer or Jhonatan sent you this link directly, you are on our guest list and we are so excited to celebrate with you. When we officially send out Save the Dates, if we have everyone's phone numbers in your party, they will all be added to the group text. If we don't, we'll include all invited names in the text so there's no question about who is included. From there, an RSVP link will follow so you can confirm your attendance.",
    aes: 'Un Save the Date es un aviso anticipado que te hace saber que estás invitado/a a nuestra boda. El mensaje de texto del Save the Date que enviaremos ES tu invitación — no habrá una invitación formal por separado.\n\nSi Jennifer o Jhonatan te enviaron este enlace directamente, estás en nuestra lista de invitados y estamos muy emocionados de celebrar contigo. Cuando enviemos oficialmente los Save the Dates, si tenemos los números de todos en tu grupo, los agregaremos al mensaje grupal. Si no los tenemos, incluiremos todos los nombres invitados en el texto para que no haya dudas sobre quién está incluido. Después de eso, llegará un enlace para confirmar tu asistencia.'
  },
  {
    num: '02',
    q: 'When can I RSVP, and when is it due?',
    qes: '¿Cuándo puedo confirmar mi asistencia?',
    a: 'Expect to receive an official RSVP request within a month or two of receiving this link. We will be sending it via text and email, so we will reach out to collect your email address closer to that time.\n\nWhen we send out Save the Dates, the text will include the names of everyone in your party who is invited — the Save the Date is essentially your invitation. The RSVP will be a link that also lists all the names in your party, or a +1 if applicable. Stay tuned!',
    aes: 'Espera recibir una solicitud oficial de confirmación de asistencia dentro de uno o dos meses de haber recibido este enlace. La enviaremos por texto y correo electrónico, así que nos pondremos en contacto para pedirte tu información más cerca de esa fecha.\n\nCuando enviemos los Save the Dates, el mensaje de texto incluirá los nombres de todos en tu grupo que están invitados — el Save the Date es esencialmente tu invitación. El enlace para confirmar asistencia también incluirá todos los nombres de tu grupo, o un +1 si aplica. ¡Pendientes!'
  },
  {
    num: '03',
    q: 'I received this link from someone other than Jennifer & Jhonatan. Am I invited?',
    qes: 'Recibí este enlace de alguien que no es Jennifer ni Jhonatan. ¿Estoy invitado/a?',
    a: "If this link didn't come directly from us, unfortunately you are not on our guest list. Our celebration is intimate and invite-only and we ask that you kindly respect that.\n\nWhen Save the Dates go out, each one will explicitly list the names of everyone invited in that party — so there will be no ambiguity about who is included.\n\nIf you believe there's been a mix-up, please be patient with us as we're still in the process of distributing invites. We kindly ask that you refrain from reaching out directly in the meantime. We will make sure to update the site letting you know all invitations have been sent out.",
    aes: 'Si este enlace no vino directamente de nosotros, lamentablemente no estás en nuestra lista de invitados. Nuestra celebración es íntima y solo por invitación, y te pedimos que lo respetes.\n\nCuando se envíen los Save the Dates, cada uno incluirá explícitamente los nombres de todos los invitados en ese grupo, así que no habrá ambigüedad sobre quién está incluido.\n\nSi crees que hubo un malentendido, por favor ten paciencia, ya que aún estamos en proceso de distribuir las invitaciones. Te pedimos que por el momento te abstengas de contactarnos directamente. Nos aseguraremos de actualizar el sitio para informarte cuando todas las invitaciones hayan sido enviadas.'
  },
  {
    num: '04',
    q: 'Is there parking at the venue?',
    qes: '¿Hay estacionamiento en el lugar?',
    a: 'Yes, but space is limited. Street parking is also available nearby. Note: depending on where you park on the street, there is a small incline.',
    aes: 'Sí, pero el espacio es limitado. También hay estacionamiento en la calle. Nota: dependiendo de dónde estaciones, hay una pequeña pendiente.'
  },
  {
    num: '05',
    q: 'Can I bring a plus-one?',
    qes: '¿Puedo traer un acompañante?',
    a: 'When we shared this link with you, we were intentional about who was included. When you receive your RSVP, it will explicitly list the names of everyone invited in your party.',
    aes: 'Al compartir este enlace contigo, fuimos intencionales sobre quién fue incluido. Cuando recibas tu RSVP, indicará explícitamente los nombres de todos los invitados en tu grupo.'
  },
  {
    num: '06',
    q: 'Are kids allowed?',
    qes: '¿Se permiten niños?',
    a: 'This is an 18+ and invite-only event. We appreciate your understanding!',
    aes: 'Este es un evento solo para mayores de 18 años y con invitación. ¡Agradecemos su comprensión!'
  },
  {
    num: '07',
    q: 'Is there going to be an open bar?',
    qes: '¿Habrá barra libre?',
    a: "YOU ALREADY KNOW IT! Drinks are on us. The hangover is on you. Just don't be acting a mess. 🥂",
    aes: '¡YA LO SABES! Las bebidas corren por nuestra cuenta. La resaca corre por la tuya. Pero pórtate bien. 🥂'
  },
  {
    num: '08',
    q: "What's the dress code?",
    qes: '¿Cuál es el código de vestimenta?',
    a: "Our theme is dark, neutral tones. Wear any color you'd like, or take inspiration from the 4 colors below. Please come looking your absolute best!",
    aes: '¡Nuestro tema son los tonos oscuros y neutros! Usa el color que quieras, o inspírate en los colores de nuestra boda a continuación. ¡Por favor ven luciendo lo mejor de ti!',
    swatches: [
      { hex: '#111111', name: 'Black' },
      { hex: '#0E1E07', name: 'Forest Green' },
      { hex: '#1e0a2e', name: 'Deep Plum' },
      { hex: '#3d0c14', name: 'Burgundy' },
    ],
    avoidSwatches: [
      { hex: '#061428', name: 'Navy' },
      { hex: '#6B2900', name: 'Burnt Sienna' },
      { hex: '#ffffff', name: 'Any Shade or Tone of White', darkX: true },
    ],
  },
  {
    num: '09',
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
                  {'avoidSwatches' in faq && (
                    <div className="faq-avoid">
                      <p className="faq-avoid__note">Below are the colors we ask to avoid, as they're a little too close to our bridal party. We appreciate it so much!</p>
                      <p className="faq-avoid__note faq-es">Les pedimos amablemente que eviten estos colores, ya que se parecen un poco demasiado a nuestra paleta de boda. ¡Se los agradecemos mucho!</p>
                      <div className="faq-swatches faq-swatches--avoid">
                        {(faq as typeof faq & { avoidSwatches: { hex: string; name: string; darkX?: boolean }[] }).avoidSwatches.map(s => (
                          <div className="faq-swatch" key={s.hex}>
                            <span className={`faq-swatch__dot faq-swatch__dot--avoid${s.darkX ? ' faq-swatch__dot--dark-x' : ''}`} style={{ background: s.hex }} />
                            <span className="faq-swatch__label">{s.name}</span>
                          </div>
                        ))}
                      </div>
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
