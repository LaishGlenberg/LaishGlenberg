import { useState, useEffect } from "react";
import Hero from "./components/Hero.jsx";
import RepoGrid from "./components/RepoGrid.jsx";
import FeaturedRepos from "./components/FeaturedRepos.jsx";

const OWNER = "LaishGlenberg";

export default function App() {
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
        setRepos(data.filter((repo) => !repo.fork));
        setStatus("loaded");
      } catch (err) {
        setStatus(`Unable to load repositories right now. ${err.message}`);
      }
    }
    fetchRepos();
  }, []);

  return (
    <>
      <Hero />
      <main className="container">
        <div className="repo-layout">
          <section className="repo-layout__main">
            <FeaturedRepos repos={repos} />
          </section>
          <aside className="repo-layout__sidebar">
            <h2>My Repositories</h2>
            <p className="section-intro">
              Each card includes a space for a project image. Replace
              placeholder files in <code>assets/images/</code> with your own
              screenshots.
            </p>
            <RepoGrid repos={repos} status={status} />
          </aside>
        </div>
      </main>
    </>
  );
}
