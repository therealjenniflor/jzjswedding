const hotels = [
  {
    name: 'Best Western Plus Placerville Inn',
    addr1: '6850 Green Leaf Dr',
    addr2: 'Placerville, CA',
    desc: 'Closest option to the venue, right in Placerville — pool, hot tub, and free hot breakfast.',
    photo: 'images/hotel-best-western-placerville.jpg',
    url: 'https://www.bestwestern.com/en_US/book/hotels-in-placerville/best-western-plus-placerville-inn/propertyCode.05478.html',
  },
  {
    name: 'Quality Inn & Suites Cameron Park Shingle Springs',
    addr1: '3361 Coach Ln',
    addr2: 'Cameron Park, CA',
    desc: 'A budget-friendly option about 10 minutes from the mansion, with free breakfast and parking.',
    photo: 'images/hotel-quality-inn-cameron-park.jpg',
    url: 'https://www.choicehotels.com/california/cameron-park/quality-inn-hotels/ca958',
  },
  {
    name: 'Oak Ridge Inn',
    addr1: '17674 Village Drive',
    addr2: 'Plymouth, CA',
    desc: 'A quiet wine-country retreat about 30 minutes away, set among the vineyards of Amador County.',
    photo: 'images/hotel-oak-ridge-inn.jpg',
    url: 'https://www.theoakridgeinn.com/',
  },
  {
    name: 'Holiday Inn Sacramento Rancho Cordova by IHG',
    addr1: '11269 Point East Drive',
    addr2: 'Rancho Cordova, CA',
    desc: 'Familiar full-service comfort about 35 minutes away, convenient to the Sacramento airport.',
    photo: 'images/hotel-holiday-inn-rancho-cordova.jpg',
    url: 'https://www.ihg.com/holidayinn/hotels/us/en/rancho-cordova/mhrrc/hoteldetail',
  },
];

export default function WhereToStay() {
  return (
    <section className="stay-section">
      <div className="stay-section__inner">
        <div className="section-title section-title--light">
          <div className="section-title__row">
            <img src="images/marigold.png" alt="" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
            <h2>Where to Stay</h2>
            <img src="images/marigold.png" alt="" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
          </div>
          <div className="section-title__rule">
            <span className="section-title__line"></span>
            <span className="section-title__diamond"></span>
            <span className="section-title__line"></span>
          </div>
          <div className="section-title__sub">Donde hospedarse</div>
        </div>

        <div className="stay-section__grid">
          {hotels.map(h => (
            <a className="stay-card" key={h.name} href={h.url} target="_blank" rel="noopener noreferrer">
              <div className="stay-card__photo-frame">
                <div className="stay-card__photo-wrap">
                  <img className="stay-card__photo" src={h.photo} alt={h.name} />
                </div>
                <span className="stay-card__keystone" aria-hidden="true"></span>
              </div>
              <div className="stay-card__name">{h.name}</div>
              <div className="stay-card__rule"></div>
              <div className="stay-card__addr">{h.addr1}<br />{h.addr2}</div>
              <p className="stay-card__desc">{h.desc}</p>
            </a>
          ))}
        </div>

        <p className="stay-section__note">
          These are just a few hotels close by, there are plenty more options throughout the area.
          <br />
          <span className="stay-section__note-es">Estos son solo algunos hoteles cercanos, hay muchas más opciones en la zona.</span>
        </p>
      </div>
    </section>
  );
}
