import { useState } from "react";
import repoData from "../repos-data.json";

const GROUPS = ["All", "TypeScript", "JavaScript", "Python", "Other"];
const LANGUAGES = new Set(["TypeScript", "JavaScript", "Python"]);

const groupFor = (language) => (LANGUAGES.has(language) ? language : "Other");

const repos = [...repoData.repos].sort(
  (a, b) =>
    (b.stargazers_count || 0) - (a.stargazers_count || 0) ||
    a.name.localeCompare(b.name),
);

export default function RepoIndex() {
  const [group, setGroup] = useState("All");
  const visible =
    group === "All" ? repos : repos.filter((repo) => groupFor(repo.language) === group);

  return (
    <section className="repos" id="repos" aria-labelledby="repos-title">
      <div className="frame">
        <div className="repos__head">
          <h2 className="section-title" id="repos-title" data-reveal>
            All repositories
          </h2>
          <div
            className="repos__filters"
            role="group"
            aria-label="Filter by language"
            data-reveal
            style={{ "--reveal-delay": 80 }}
          >
            {GROUPS.map((name) => (
              <button
                key={name}
                type="button"
                className="filter"
                aria-pressed={group === name}
                onClick={() => setGroup(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <p className="visually-hidden" aria-live="polite">
          {visible.length} repositories shown
        </p>
        <ul className="repo-list" data-reveal style={{ "--reveal-delay": 120 }}>
          {visible.map((repo, index) => (
            <li key={repo.id} style={{ "--i": Math.min(index, 12) }}>
              <a
                className="repo-row"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="repo-row__name">{repo.name}</span>
                {repo.description && (
                  <span className="repo-row__desc">{repo.description}</span>
                )}
                <span className="repo-row__lang">{repo.language || ""}</span>
                <span className="repo-row__stars">
                  {repo.stargazers_count
                    ? `${repo.stargazers_count} star${repo.stargazers_count === 1 ? "" : "s"}`
                    : ""}
                </span>
                <span className="repo-row__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
