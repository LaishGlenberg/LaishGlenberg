import { useState, useEffect } from "react";
import RepoCard from "./RepoCard.jsx";

const OWNER = "LaishGlenberg";

export default function RepoGrid() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function fetchRepos() {
      try {
        const url = `https://api.github.com/users/${OWNER}/repos?sort=updated&per_page=100`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(
            `GitHub API request failed with status ${res.status}`,
          );
        }

        const data = await res.json();
        const filtered = data.filter((repo) => !repo.fork);
        setRepos(filtered);
        setStatus("loaded");
      } catch (err) {
        setStatus(`Unable to load repositories right now. ${err.message}`);
      }
    }

    fetchRepos();
  }, []);

  if (status === "loading") {
    return <p className="status">Loading repositories...</p>;
  }

  if (status !== "loaded") {
    return <p className="status">{status}</p>;
  }

  if (repos.length === 0) {
    return <p className="status">No repositories found.</p>;
  }

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
