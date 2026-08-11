const hotels = [
  {
    name: 'Holiday Inn Express El Dorado Hills',
    addr1: '4360 Town Center Blvd',
    addr2: 'El Dorado Hills, CA',
    desc: 'A comfortable, modern option about 25 minutes from the venue, near shops and restaurants.',
    photo: 'images/holiday-in-dorado-hills.jpg',
    url: 'https://www.ihg.com/holidayinnexpress/hotels/us/en/el-dorado-hills/edhls/hoteldetail',
    label: "Where we're staying",
    labelEs: 'Donde nos hospedamos',
  },
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
    photoPosition: 'left center',
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
            <a className={`stay-card${h.label ? ' stay-card--featured' : ''}`} key={h.name} href={h.url} target="_blank" rel="noopener noreferrer">
              <div className="stay-card__photo-frame">
                <div className="stay-card__photo-wrap">
                  <img className="stay-card__photo" src={h.photo} alt={h.name} style={h.photoPosition ? { objectPosition: h.photoPosition } : undefined} />
                </div>
                <span className="stay-card__keystone" aria-hidden="true"></span>
              </div>
              {h.label && (
                <div className="stay-card__our-pick">
                  <span>{h.label}</span>
                  <span className="stay-card__our-pick-es">{h.labelEs}</span>
                </div>
              )}
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
