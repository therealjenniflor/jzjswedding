export default function Hero() {
  return (
    <section className="hero" id="hero">
      <img id="hero-bg-img" className="hero__bg" src="images/hero.jpg" alt="" />
      <div className="hero__overlay"></div>
      <div className="hero__inner">
        <h1 className="hero__names">
          Jennifer<span className="hero__amp">&amp;</span> Jhonatan
        </h1>
        <div className="hero__subtitle">Are getting married!</div>
      </div>
    </section>
  );
}
