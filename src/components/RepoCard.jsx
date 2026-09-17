const ACCENT_HUES = [260, 190, 30, 150, 340, 60];

export default function RepoCard({ repo, index }) {
  const [imgFailed, setImgFailed] = React.useState(false);
  const accentHue = ACCENT_HUES[index % 6];

  const description =
    repo.description?.trim() || "No description provided.";

  return (
    <article
      className="repo-card"
      style={{ "--card-index": index, "--accent-hue": accentHue }}
    >
      <a
        className="repo-card__link"
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {!imgFailed && (
          <img
            className="repo-card__image"
            src={`./assets/images/repos/${repo.name}.JPG`}
            alt={`${repo.name} repository preview`}
            onError={() => setImgFailed(true)}
          />
        )}
        {imgFailed && (
          <div
            className="repo-card__cover"
            aria-hidden="true"
          />
        )}
        <div className="repo-card__body">
          <h3 className="repo-card__title">{repo.name}</h3>
          <p
            className="repo-card__description"
            title={description}
          >
            {description}
          </p>
          <span className="repo-card__link-text">
            Open Repository{" "}
            <span className="repo-card__arrow">↗</span>
          </span>
        </div>
      </a>
    </article>
  );
}
