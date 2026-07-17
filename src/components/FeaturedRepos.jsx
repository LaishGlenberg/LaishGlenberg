import { useState, useEffect } from "react";
import FEATURED_REPOS from "../config.js";

const OWNER = "LaishGlenberg";

function truncateReadme(text, maxLen = 600) {
  if (!text) return "";
  // Strip markdown headings and links for a clean plain-text preview
  const clean = text
    .replace(/^#+\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/---+/g, "")
    .trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).replace(/\s\S*$/, "") + " …";
}

export default function FeaturedRepos({ repos }) {
  const [readmes, setReadmes] = useState({});
  const [loading, setLoading] = useState(true);

  const featured = repos.filter((r) => FEATURED_REPOS.includes(r.name));

  useEffect(() => {
    if (featured.length === 0) {
      setLoading(false);
      return;
    }

    async function fetchReadmes() {
      const results = {};
      for (const repo of featured) {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${OWNER}/${repo.name}/readme`,
            { headers: { Accept: "application/vnd.github.raw+json" } },
          );
          if (res.ok) {
            results[repo.name] = truncateReadme(await res.text());
          } else {
            results[repo.name] = null;
          }
        } catch {
          results[repo.name] = null;
        }
      }
      setReadmes(results);
      setLoading(false);
    }

    fetchReadmes();
  }, [featured]); // eslint-disable-line react-hooks/exhaustive-deps

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
            <div className="featured-card__readme">
              <strong>README preview:</strong>
              {loading ? (
                <p className="featured-card__loading">Loading…</p>
              ) : readmes[repo.name] ? (
                <p>{readmes[repo.name]}</p>
              ) : (
                <p className="featured-card__no-readme">
                  No README available.
                </p>
              )}
            </div>
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
