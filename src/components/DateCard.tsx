export default function DateCard() {
  return (
    <section className="date-card-section">
      <div className="date-card">
        <div className="date-card__grid">
          <div className="date-card__photo-wrap">
            <div className="date-card__arch-frame">
              <div className="date-card__arch-outline"></div>
              <div className="date-card__arch-keystone"></div>
              <div className="date-card__photo-inner">
                <img id="couple-photo" className="date-card__photo" src="images/img-1.jpg" alt="Couple photo" />
              </div>
            </div>
          </div>

          <div className="date-card__info">
            <img
              src="images/llama-small-1.png"
              alt=""
              style={{ width: '90px', marginBottom: '16px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.3))' }}
            />
            <div className="date-card__date">October 30<sup>th</sup></div>
            <div className="date-card__at">at</div>
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
      <img className="date-card__calla" src="images/calla-lillies-1.png" alt="" />
    </section>
  );
}
