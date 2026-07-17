import Hero from "./components/Hero.jsx";
import RepoGrid from "./components/RepoGrid.jsx";
import FeaturedRepos from "./components/FeaturedRepos.jsx";
import repoData from "./repos-data.json";

const repos = repoData.repos;

export default function App() {
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
            <RepoGrid repos={repos} />
          </aside>
        </div>
      </main>
    </>
  );
}
