import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import SelectedWork from "./components/SelectedWork.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <SelectedWork />
      </main>
    </>
  );
}
