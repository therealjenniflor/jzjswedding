const dogs = [
  {
    name: 'Zeus',
    photo: 'images/reg-zeus-2.jpg',
    desc: 'First born, thus the King of the house and mama\'s favorite. Semi-blind, energetic when food is involved, and deeply committed to eating any scraps he can find. Costs a fortune in medication alone.',
  },
  {
    name: 'Mia',
    photo: 'images/reg-mia-1.jpg',
    desc: 'Our little princess and daddy\'s little girl. First to greet strangers and last one to walk them out the door. Loves cuddles, a nice groom session, and chasing squirrels.',
  },
  {
    name: 'Otis Redding',
    photo: 'images/reg-otis-1.jpg',
    desc: 'Our one-eye, zero-chill, talkative rescue. Named after a legend and costs like one with all his vet visits and lab tests. You can find him sun bathing all day in his garden.',
  },
];

export default function RegistryPage() {
  return (
    <div className="registry-page">
      <a href="https://www.jzjs.wedding" className="rsvp-home-link">← Wedding site</a>

      <div className="registry-page__inner">
        <header className="registry-header">
          <p className="registry-eyebrow">Jennifer & Jhonatan</p>
          <h1 className="registry-title">The Registry</h1>
          <p className="registry-subtitle">
            We don't need a thing, we really mean it. Your presence at our wedding is the only gift we want.
          </p>
          <p className="registry-subtitle registry-subtitle--es">
            No necesitamos nada, lo decimos en serio. Tu presencia en nuestra boda es el único regalo que queremos.
          </p>
        </header>

        <div className="registry-divider">
          <span className="registry-divider__line" />
          <span className="registry-divider__paw">🐶</span>
          <span className="registry-divider__line" />
        </div>

        <section className="registry-dogs">
          <h2 className="registry-dogs__title">But if you insist…</h2>
          <p className="registry-dogs__body">
            Meet Zeus, Mia, and Otis Redding, our three dogs, our chaos, our joy. Together they can run us about
            <strong> $1,000 a month</strong> in vet bills, grooming, food, and general mischief. If you'd like
            to contribute to their very expensive little lives, we won't stop you.
          </p>
          <p className="registry-dogs__body registry-dogs__body--es">
            Les presentamos a Zeus, Mia y Otis Redding, nuestros tres perros, nuestro caos, nuestra alegría.
            Entre los tres nos cuestan alrededor de <strong>$1,000 al mes</strong>. Si quieres contribuir a sus
            pequeñas vidas tan caras, no te lo impediremos.
          </p>

          <div className="registry-dogs__grid">
            {dogs.map(dog => (
              <div className="registry-dog-card" key={dog.name}>
                <div className="registry-dog-card__photo-wrap">
                  <img src={dog.photo} alt={dog.name} className="registry-dog-card__photo" loading="lazy" decoding="async" />
                </div>
                <div className="registry-dog-card__name">{dog.name}</div>
                <p className="registry-dog-card__desc">{dog.desc}</p>
              </div>
            ))}
          </div>

          <div className="registry-venmo">
            <p className="registry-venmo__label">Send your love via Zelle</p>
            <span className="registry-venmo__btn">
              650-315-3005
            </span>
            <p className="registry-venmo__note">No pressure, really. But if anything… Otis isn't covered by insurance.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
