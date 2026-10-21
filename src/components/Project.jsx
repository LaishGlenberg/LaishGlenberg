const PLACEMENTS = ["left", "right", "inset"];

export default function Project({ project, index }) {
  const placement = PLACEMENTS[index % PLACEMENTS.length];

  return (
    <article className={`project project--${placement}`}>
      <div className="project__inner">
        <div className="project__head" data-reveal>
          <h3 className="project__name">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
            </a>
          </h3>
          <div className="project__meta">
            <span className="project__kind">{project.kind}</span>
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

        <p
          className="project__description"
          data-reveal
          style={{ "--reveal-delay": 140 }}
        >
          {project.description}
        </p>
      </div>
    </article>
  );
}
