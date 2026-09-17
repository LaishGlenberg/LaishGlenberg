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
        <section
          className="featured-section"
          aria-labelledby="featured-heading"
        >
          <div className="section-heading">
            <h2 id="featured-heading">Featured Repos</h2>
          </div>
          <FeaturedRepos repos={repos} />
        </section>
        <section
          className="repos-section"
          aria-labelledby="repos-heading"
        >
          <div className="section-heading">
            <h2 id="repos-heading">My Repositories</h2>
          </div>
          <p className="section-intro">
            Each card includes a space for a project image. Replace
            placeholder files in <code>assets/images/</code> with your own
            screenshots.
          </p>
          <RepoGrid repos={repos} />
        </section>
      </main>
    </>
  );
}
