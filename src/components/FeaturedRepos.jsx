import { marked } from "marked";
import FEATURED_REPOS from "../config.js";

export default function FeaturedRepos({ repos }) {
  const featured = repos.filter((r) => FEATURED_REPOS.includes(r.name));

  if (featured.length === 0) {
    return (
      <div className="featured">
        <p className="status">
          No featured repos yet. Add repo names to{" "}
          <code>src/config.js</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="featured">
      <div className="featured__list">
        {featured.map((repo, index) => (
          <article
            key={repo.id}
            className="featured-card"
            style={{ "--card-index": index }}
          >
            <div className="featured-card__header">
              <h3 className="featured-card__name">{repo.name}</h3>
              {repo.language && (
                <span className="featured-card__lang">{repo.language}</span>
              )}
            </div>
            <p className="featured-card__description">
              {repo.description || "No description provided."}
            </p>
            {repo.readme && (
              <div className="featured-card__readme">
                <strong>README preview:</strong>
                <div
                  className="featured-card__markdown"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(repo.readme, { breaks: true }),
                  }}
                />
              </div>
            )}
            <div className="featured-card__footer">
              <a
                className="featured-card__link"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Repository <span className="featured-card__arrow">↗</span>
              </a>
              {repo.stargazers_count > 0 && (
                <span className="featured-card__stars">
                  ⭐ {repo.stargazers_count}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
