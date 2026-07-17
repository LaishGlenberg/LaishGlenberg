import { useState } from "react";

const PLACEHOLDER = "./assets/images/repos/repo-placeholder.JPG";

export default function RepoCard({ repo }) {
  const [imgSrc, setImgSrc] = useState(
    `./assets/images/repos/${repo.name}.JPG`,
  );

  const description =
    repo.description?.trim() || "No description provided.";

  return (
    <article className="repo-card">
      <img
        className="repo-card__image"
        src={imgSrc}
        alt={`${repo.name} repository preview`}
        onError={() => setImgSrc(PLACEHOLDER)}
      />
      <div className="repo-card__body">
        <h3 className="repo-card__title">{repo.name}</h3>
        <p className="repo-card__description">{description}</p>
        <a
          className="repo-card__link"
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Repository
        </a>
      </div>
    </article>
  );
}
