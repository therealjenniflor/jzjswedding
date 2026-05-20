export default function StayTuned() {
  return (
    <section className="stay-tuned-section">
      <div className="stay-tuned__border-line stay-tuned__border-line--top"></div>
      <div className="section-title section-title--light">
        <div className="section-title__row">
          <svg className="florete" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#b85530" strokeWidth="1.1">
            <ellipse cx="11" cy="8" rx="1.5" ry="3.5" transform="rotate(0 11 11)"/>
            <ellipse cx="11" cy="8" rx="1.5" ry="3.5" transform="rotate(60 11 11)"/>
            <ellipse cx="11" cy="8" rx="1.5" ry="3.5" transform="rotate(120 11 11)"/>
            <ellipse cx="11" cy="8" rx="1.5" ry="3.5" transform="rotate(180 11 11)"/>
            <ellipse cx="11" cy="8" rx="1.5" ry="3.5" transform="rotate(240 11 11)"/>
            <ellipse cx="11" cy="8" rx="1.5" ry="3.5" transform="rotate(300 11 11)"/>
            <circle cx="11" cy="11" r="1.5" fill="#b85530"/>
          </svg>
          <h2>Stay Tuned</h2>
          <svg className="florete florete--flip" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#b85530" strokeWidth="1.1">
            <ellipse cx="11" cy="8" rx="1.5" ry="3.5" transform="rotate(0 11 11)"/>
            <ellipse cx="11" cy="8" rx="1.5" ry="3.5" transform="rotate(60 11 11)"/>
            <ellipse cx="11" cy="8" rx="1.5" ry="3.5" transform="rotate(120 11 11)"/>
            <ellipse cx="11" cy="8" rx="1.5" ry="3.5" transform="rotate(180 11 11)"/>
            <ellipse cx="11" cy="8" rx="1.5" ry="3.5" transform="rotate(240 11 11)"/>
            <ellipse cx="11" cy="8" rx="1.5" ry="3.5" transform="rotate(300 11 11)"/>
            <circle cx="11" cy="11" r="1.5" fill="#b85530"/>
          </svg>
        </div>
        <div className="section-title__rule">
          <span className="section-title__line"></span>
          <span className="section-title__diamond"></span>
          <span className="section-title__line"></span>
        </div>
        <div className="section-title__sub">más por venir</div>
      </div>
      <p className="stay-tuned__body">
        We'll continue to update this website as we get closer to the special date — please check back for the latest details, additions, and final schedule.
      </p>
      <div className="stay-tuned__border-line stay-tuned__border-line--bottom"></div>
    </section>
  );
}
