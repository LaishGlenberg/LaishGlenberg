import { FOOTER, SITE } from "../config.js";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="frame footer__frame">
        <p className="footer__note" data-reveal>
          {FOOTER.note}
        </p>

        <div className="footer__bottom">
          <p className="footer__name" data-reveal style={{ "--reveal-delay": 80 }}>
            <span>Laish</span>
            <span>Glenberg</span>
          </p>
          <div className="footer__row" data-reveal style={{ "--reveal-delay": 140 }}>
            <p className="footer__place">{SITE.location}</p>
            <ul className="footer__links">
              {FOOTER.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
              <li>
                <a href="#main">Back to top ↑</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
