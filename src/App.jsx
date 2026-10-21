import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import SelectedWork from "./components/SelectedWork.jsx";
import About from "./components/About.jsx";
import RepoIndex from "./components/RepoIndex.jsx";
import Footer from "./components/Footer.jsx";
import useReveal from "./lib/useReveal.js";

export default function App() {
  useReveal();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <SelectedWork />
        <About />
        <RepoIndex />
      </main>
      <Footer />
    </>
  );
}
