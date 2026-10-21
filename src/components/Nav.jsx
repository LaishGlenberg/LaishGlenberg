export default function Nav() {
  return (
    <header className="nav">
      <div className="frame nav__frame">
        <a className="nav__mark" href="#" aria-label="Laish Glenberg, top of page">
          LG
        </a>
        <nav aria-label="Primary">
          <ul className="nav__links">
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#repos">Repos</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
