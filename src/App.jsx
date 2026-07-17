import Hero from "./components/Hero.jsx";
import RepoGrid from "./components/RepoGrid.jsx";

export default function App() {
  return (
    <>
      <Hero />
      <main className="container">
        <section>
          <h2>My Repositories</h2>
          <p className="section-intro">
            Each card includes a space for a project image. Replace
            placeholder files in <code>assets/images/</code> with your own
            screenshots.
          </p>
          <RepoGrid />
        </section>
      </main>
    </>
  );
}
