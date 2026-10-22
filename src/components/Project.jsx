const PLACEMENTS = ["left", "right"];

export default function Project({ project, index }) {
  const placement = PLACEMENTS[index % PLACEMENTS.length];

  return (
    <article className={`project project--${placement}`}>
      <div className="project__head" data-reveal>
        <h3 className="project__name">
          <a href={project.href} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        </h3>
        <span className="project__kind">{project.kind}</span>
      </div>

      <a
        className="project__media"
        data-reveal
        style={{ "--reveal-delay": 80 }}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name} on GitHub`}
      >
        <img
          src={project.image}
          alt={`${project.name} repository preview`}
          width="1200"
          height="675"
          loading="lazy"
        />
      </a>

      <div
        className="project__copy"
        data-reveal
        style={{ "--reveal-delay": 140 }}
      >
        <p className="project__description">{project.description}</p>
        <p className="project__note">{project.note}</p>
        <div className="project__foot">
          <ul className="project__stack">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a
            className="text-link"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            View repository <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
