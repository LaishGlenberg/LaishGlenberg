export default function Hero() {
  return (
    <header className="hero">
      <div className="hero__inner">
        <img
          src="./assets/images/profile-placeholder.JPG"
          alt="Profile photo placeholder"
          className="hero__avatar"
        />
        <div className="hero__content">
          <h1>Laish Glenberg</h1>
          <p>
            Welcome to my GitHub portfolio. Explore my repositories,
            descriptions, and project highlights.
          </p>
          <div className="hero__links">
            <a
              className="hero__cta"
              href="https://github.com/LaishGlenberg"
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub Profile
            </a>
            <a
              className="hero__cta hero__cta--linkedin"
              href="https://www.linkedin.com/in/laish-glenberg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://api.iconify.design/simple-icons:linkedin.svg"
                width="24"
                height="24"
                alt="LinkedIn"
              />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
