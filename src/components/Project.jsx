import ArrowIcon from "./ArrowIcon.jsx";

const PLACEMENTS = ["left", "right"];

export default function Project({ project, index }) {
  const placement = PLACEMENTS[index % PLACEMENTS.length];
  const [width, height] = project.imageSize ?? [1200, 675];

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
          width={width}
          height={height}
          loading="lazy"
          className={project.imageFit === "contain" ? "is-contain" : undefined}
        />
      </a>

      <div
        className="project__copy"
        data-reveal
        style={{ "--reveal-delay": 140 }}
      >
        <div className="project__text">
          <p className="project__description">{project.description}</p>
          <p className="project__note">{project.note}</p>
        </div>
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
            View repository <ArrowIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
