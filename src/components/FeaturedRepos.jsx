import { marked } from "marked";
import FEATURED_REPOS from "../config.js";

export default function FeaturedRepos({ repos }) {
  const featured = repos.filter((r) => FEATURED_REPOS.includes(r.name));

  if (featured.length === 0) {
    return (
      <aside className="featured">
        <h3 className="featured__title">Featured Repos</h3>
        <p className="status">
          No featured repos yet. Add repo names to{" "}
          <code>src/config.js</code>.
        </p>
      </aside>
    );
  }

  return (
    <aside className="featured">
      <h3 className="featured__title">Featured Repos</h3>
      <div className="featured__list">
        {featured.map((repo) => (
          <article key={repo.id} className="featured-card">
            <div className="featured-card__header">
              <h4 className="featured-card__name">{repo.name}</h4>
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
                Open Repository ↗
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
    </aside>
  );
}
