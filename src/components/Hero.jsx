import { HERO, SITE } from "../config.js";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="frame hero__frame">
        <h1 className="hero__title" id="hero-title">
          {HERO.lines.map((line, index) => (
            <span className="hero__line" key={line}>
              <span style={{ "--i": index }}>{line}</span>
            </span>
          ))}
        </h1>

        <div className="hero__aside">
          <figure className="hero__portrait">
            <img
              src={SITE.portrait}
              alt={`Portrait of ${SITE.name}`}
              width="440"
              height="586"
              fetchPriority="high"
            />
          </figure>

          <div className="hero__support">
            <p>{HERO.support}</p>
            <div className="hero__actions">
              <a className="button" href={HERO.action.href}>
                {HERO.action.label}
              </a>
              <a
                className="text-link"
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
